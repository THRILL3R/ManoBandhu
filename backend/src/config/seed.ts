/**
 * seed.ts — Bootstrap ManoBandhu database with initial data.
 *
 * Run: npm run seed
 *
 * Creates:
 *   - 1 admin user  (admin@manobandhu.in / Admin@1234)
 *   - 3 sample wellness events (published)
 */
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { pool } from './db.js';
import { logger } from '../utils/logger.js';

// ── Admin user ────────────────────────────────────────────────────────────────
async function seedAdminUser() {
  const email        = 'admin@manobandhu.in';
  const rawPassword  = 'Admin@1234';
  const passwordHash = await bcrypt.hash(rawPassword, 12);

  await pool.query(
    `INSERT INTO users
       (name, email, password_hash, plan_type, is_admin, auth_provider, onboarding_completed)
     VALUES ($1, $2, $3, 'premium_plus', true, 'email', true)
     ON CONFLICT (email) DO UPDATE
       SET is_admin       = true,
           plan_type      = 'premium_plus',
           password_hash  = EXCLUDED.password_hash,
           updated_at     = NOW()`,
    ['ManoBandhu Admin', email, passwordHash]
  );

  logger.info(`✅ Admin user seeded: ${email}`);
}

// ── Sample wellness events ────────────────────────────────────────────────────
async function seedWellnessEvents() {
  // Get admin user id for created_by
  const { rows } = await pool.query<{ id: string }>(
    `SELECT id FROM users WHERE email = 'admin@manobandhu.in'`
  );
  const adminId = rows[0]?.id;
  if (!adminId) throw new Error('Admin user not found — run seedAdminUser first');

  const events = [
    {
      title:          'Morning Mindfulness Walk',
      description:    'Start your day with a guided mindfulness walk through the heart of Mumbai. Connect with nature, breathe deeply, and reset your emotional compass.',
      organiser_name: 'ManoBandhu Wellness',
      event_type:     'meetup',
      city:           'Mumbai',
      address:        'Shivaji Park, Dadar West, Mumbai, Maharashtra',
      start_datetime: '2027-01-18T06:30:00+05:30',
      end_datetime:   '2027-01-18T08:00:00+05:30',
      price_inr:      0,
      total_capacity: 50,
      banner_url:     null,
      tags:           ['mindfulness', 'walk', 'morning', 'free', 'mumbai'],
    },
    {
      title:          'Emotional Intelligence Workshop',
      description:    'A half-day experiential workshop exploring the four pillars of emotional intelligence — self-awareness, self-regulation, empathy, and social skill.',
      organiser_name: 'EQ India Foundation',
      event_type:     'workshop',
      city:           'Bengaluru',
      address:        'The Leela Palace, Old Airport Road, Bengaluru, Karnataka',
      start_datetime: '2027-02-14T09:00:00+05:30',
      end_datetime:   '2027-02-14T13:00:00+05:30',
      price_inr:      499,
      total_capacity: 80,
      banner_url:     null,
      tags:           ['emotional-intelligence', 'workshop', 'bengaluru', 'eq'],
    },
    {
      title:          'Nature Expedition — Sahyadri',
      description:    'A full-day guided expedition into the Sahyadri mountains. Combine physical activity with digital detox, journaling, and group reflection sessions.',
      organiser_name: 'Wilderness Wellness Co.',
      event_type:     'retreat',
      city:           'Pune',
      address:        'Rajmachi Village, Sahyadri Range, Maharashtra',
      start_datetime: '2027-03-07T05:30:00+05:30',
      end_datetime:   '2027-03-07T20:00:00+05:30',
      price_inr:      1499,
      total_capacity: 30,
      banner_url:     null,
      tags:           ['nature', 'trek', 'sahyadri', 'pune', 'retreat', 'digital-detox'],
    },
  ];

  for (const evt of events) {
    await pool.query(
      `INSERT INTO wellness_events
         (title, description, organiser_name, event_type, city, address,
          start_datetime, end_datetime, price_inr, total_capacity,
          banner_url, tags, status, created_by)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,'published',$13)
       ON CONFLICT DO NOTHING`,
      [
        evt.title, evt.description, evt.organiser_name, evt.event_type,
        evt.city, evt.address, evt.start_datetime, evt.end_datetime,
        evt.price_inr, evt.total_capacity, evt.banner_url, evt.tags, adminId,
      ]
    );
    logger.info(`✅ Event seeded: "${evt.title}"`);
  }
}

// ── Run ───────────────────────────────────────────────────────────────────────
async function main() {
  logger.info('🌱 Running seed script...');
  try {
    await seedAdminUser();
    await seedWellnessEvents();
    logger.info('🎉 Seed complete.');
  } catch (err) {
    logger.error('❌ Seed failed:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
