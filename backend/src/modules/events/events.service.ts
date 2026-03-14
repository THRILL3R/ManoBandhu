import Razorpay from 'razorpay';
import { pool } from '../../config/db.js';
import { env } from '../../config/env.js';
import type { EventFilterInput, CreateEventInput, BookEventInput } from './events.schemas.js';

// ── Razorpay client (reused for paid event bookings) ─────────────────────────
const razorpay = new Razorpay({
  key_id:     env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET,
});

// ── listEvents ────────────────────────────────────────────────────────────────
export async function listEvents(filters: EventFilterInput, userId?: string) {
  const { city, category, date_from, date_to, page, limit } = filters;
  const offset = (page - 1) * limit;

  const conditions: string[] = [`w.status = 'published'`];
  const values: unknown[]    = [];
  let   i = 1;

  if (city) {
    conditions.push(`LOWER(w.city) = LOWER($${i++})`);
    values.push(city);
  }
  if (category) {
    conditions.push(`w.event_type = $${i++}`);
    values.push(category);
  }
  if (date_from) {
    conditions.push(`w.start_datetime >= $${i++}`);
    values.push(date_from);
  }
  if (date_to) {
    conditions.push(`w.start_datetime <= $${i++}`);
    values.push(date_to + 'T23:59:59.999Z');
  }

  const whereClause = conditions.join(' AND ');

  // is_booked sub-select only if userId is known
  const isBookedSelect = userId
    ? `(SELECT EXISTS(
         SELECT 1 FROM event_bookings eb
         WHERE eb.event_id = w.id AND eb.user_id = '${userId}'
       )) AS is_booked`
    : `false AS is_booked`;

  const [dataResult, countResult] = await Promise.all([
    pool.query(
      `SELECT w.id, w.title, w.organiser_name, w.event_type,
              w.city, w.start_datetime, w.end_datetime,
              w.price_inr, w.total_capacity, w.booked_count,
              w.banner_url, w.tags,
              (w.total_capacity - w.booked_count) AS spots_remaining,
              ${isBookedSelect}
       FROM wellness_events w
       WHERE ${whereClause}
       ORDER BY w.start_datetime ASC
       LIMIT $${i} OFFSET $${i + 1}`,
      [...values, limit, offset]
    ),
    pool.query<{ total: string }>(
      `SELECT COUNT(*) AS total FROM wellness_events w WHERE ${whereClause}`,
      values
    ),
  ]);

  return {
    data:  dataResult.rows,
    total: Number(countResult.rows[0].total),
    page,
    limit,
  };
}

// ── getEventById ──────────────────────────────────────────────────────────────
export async function getEventById(eventId: string, userId?: string) {
  const isBookedSelect = userId
    ? `(SELECT EXISTS(
         SELECT 1 FROM event_bookings eb
         WHERE eb.event_id = w.id AND eb.user_id = '${userId}'
       )) AS is_booked`
    : `false AS is_booked`;

  const { rows } = await pool.query(
    `SELECT w.*,
            (w.total_capacity - w.booked_count) AS spots_remaining,
            ${isBookedSelect}
     FROM wellness_events w
     WHERE w.id = $1 AND w.status = 'published'`,
    [eventId]
  );

  const event = rows[0];
  if (!event) {
    const err = new Error('Event not found');
    (err as { statusCode?: number }).statusCode = 404;
    throw err;
  }

  return event;
}

// ── bookEvent ─────────────────────────────────────────────────────────────────
export async function bookEvent(userId: string, data: BookEventInput) {
  const { event_id } = data;

  // Fetch event with capacity check (use SELECT FOR UPDATE to prevent race conditions)
  const { rows: eventRows } = await pool.query(
    `SELECT id, title, price_inr, total_capacity, booked_count
     FROM wellness_events
     WHERE id = $1 AND status = 'published'
     FOR UPDATE`,
    [event_id]
  );
  const event = eventRows[0];
  if (!event) {
    const err = new Error('Event not found or not available for booking');
    (err as { statusCode?: number }).statusCode = 404;
    throw err;
  }

  if (event.booked_count >= event.total_capacity) {
    const err = new Error('This event is fully booked');
    (err as { statusCode?: number }).statusCode = 409;
    throw err;
  }

  // Check for duplicate booking
  const { rows: existing } = await pool.query(
    `SELECT id FROM event_bookings WHERE user_id = $1 AND event_id = $2`,
    [userId, event_id]
  );
  if (existing.length > 0) {
    const err = new Error('You have already booked this event');
    (err as { statusCode?: number }).statusCode = 409;
    throw err;
  }

  const isFree = Number(event.price_inr) === 0;

  if (isFree) {
    // ── Free event: create booking immediately ─────────────────────────────
    const { rows: bookingRows } = await pool.query(
      `WITH ins AS (
         INSERT INTO event_bookings (user_id, event_id, payment_status, qr_code_url)
         VALUES ($1, $2, 'paid', NULL)
         RETURNING id, user_id, event_id, payment_status, booked_at
       ),
       bump AS (
         UPDATE wellness_events
         SET booked_count = booked_count + 1, updated_at = NOW()
         WHERE id = $2
       )
       SELECT * FROM ins`,
      [userId, event_id]
    );

    const booking = bookingRows[0];
    // Set QR code URL after we have the booking ID
    const qrUrl = `/qr/${booking.id}`;
    await pool.query(
      `UPDATE event_bookings SET qr_code_url = $1 WHERE id = $2`,
      [qrUrl, booking.id]
    );
    booking.qr_code_url = qrUrl;

    return { booking, paymentRequired: false, razorpayOrder: null };
  }

  // ── Paid event: create Razorpay order ─────────────────────────────────────
  const amountPaise = Math.round(Number(event.price_inr) * 100);
  const order = await razorpay.orders.create({
    amount:   amountPaise,
    currency: 'INR',
    receipt:  `evt_${event_id.slice(0, 8)}_${userId.slice(0, 8)}`,
    notes:    { userId, event_id },
  });

  // Insert pending booking record
  const { rows: pendingRows } = await pool.query(
    `INSERT INTO event_bookings (user_id, event_id, razorpay_order_id, payment_status)
     VALUES ($1, $2, $3, 'pending')
     ON CONFLICT (user_id, event_id) DO NOTHING
     RETURNING id, user_id, event_id, razorpay_order_id, payment_status, booked_at`,
    [userId, event_id, order.id]
  );

  return {
    booking:        pendingRows[0] ?? null,
    paymentRequired: true,
    razorpayOrder: {
      orderId:  order.id,
      amount:   amountPaise,
      currency: 'INR',
      keyId:    env.RAZORPAY_KEY_ID,
    },
  };
}

// ── getMyBookings ─────────────────────────────────────────────────────────────
export async function getMyBookings(userId: string) {
  const { rows } = await pool.query(
    `SELECT
       eb.id              AS booking_id,
       eb.payment_status,
       eb.qr_code_url,
       eb.booked_at,
       w.id               AS event_id,
       w.title,
       w.event_type,
       w.city,
       w.address,
       w.start_datetime,
       w.end_datetime,
       w.banner_url
     FROM event_bookings eb
     JOIN wellness_events w ON w.id = eb.event_id
     WHERE eb.user_id = $1
     ORDER BY eb.booked_at DESC`,
    [userId]
  );

  return { data: rows, total: rows.length };
}

// ── createEvent (admin only) ──────────────────────────────────────────────────
export async function createEvent(adminUserId: string, data: CreateEventInput) {
  const { rows } = await pool.query(
    `INSERT INTO wellness_events
       (title, description, organiser_name, event_type, city, address,
        start_datetime, end_datetime, price_inr, total_capacity,
        banner_url, tags, status, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,'published',$13)
     RETURNING *`,
    [
      data.title,
      data.description   ?? null,
      data.organiser_name,
      data.event_type,
      data.city          ?? null,
      data.address       ?? null,
      data.start_datetime,
      data.end_datetime,
      data.price_inr,
      data.total_capacity,
      data.banner_url    ?? null,
      data.tags          ?? [],
      adminUserId,
    ]
  );

  return rows[0];
}

// ── submitListingRequest (any authenticated user) ─────────────────────────────
export async function submitListingRequest(userId: string, data: CreateEventInput) {
  await pool.query(
    `INSERT INTO wellness_events
       (title, description, organiser_name, event_type, city, address,
        start_datetime, end_datetime, price_inr, total_capacity,
        banner_url, tags, status, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,'pending_review',$13)`,
    [
      data.title,
      data.description   ?? null,
      data.organiser_name,
      data.event_type,
      data.city          ?? null,
      data.address       ?? null,
      data.start_datetime,
      data.end_datetime,
      data.price_inr,
      data.total_capacity,
      data.banner_url    ?? null,
      data.tags          ?? [],
      userId,
    ]
  );

  return { message: 'Listing request submitted for review' };
}
