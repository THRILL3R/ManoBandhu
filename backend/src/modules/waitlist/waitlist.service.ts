import { pool } from '../../config/db.js';
import { WaitlistInput } from './waitlist.schemas.js';
import { logger } from '../../utils/logger.js';



export async function joinWaitlist(
  data: WaitlistInput
): Promise<{ alreadyRegistered: boolean; id: string }> {
  const { full_name, email, mobile, occupation, city } = data;

  // Check for duplicate (case-insensitive)
  const existing = await pool.query<{ id: string }>(
    'SELECT id FROM pilot_waitlist WHERE LOWER(email) = LOWER($1)',
    [email]
  );
  if (existing.rowCount && existing.rowCount > 0) {
    return { alreadyRegistered: true, id: existing.rows[0].id };
  }

  // Normalize optional fields: empty string -> null
  const normalizedOccupation = occupation?.trim() || null;
  const normalizedCity = city?.trim() || null;

  // Insert
  const { rows } = await pool.query<{ id: string }>(
    `INSERT INTO pilot_waitlist (full_name, email, mobile, occupation, city)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (email) DO NOTHING
     RETURNING id`,
    [full_name, email, mobile, normalizedOccupation, normalizedCity]
  );

  // If insert returned nothing because of conflict
  if (rows.length === 0) {
    const retry = await pool.query<{ id: string }>(
      'SELECT id FROM pilot_waitlist WHERE LOWER(email) = LOWER($1)',
      [email]
    );
    const existingId = retry.rows[0]?.id || 'duplicated';
    return { alreadyRegistered: true, id: existingId };
  }

  const id = rows[0].id;
  logger.info(`[waitlist] New signup: ${email}`);


  return { alreadyRegistered: false, id };
}

export async function getPilotWaitlist(page = 1, limit = 50) {
  const offset = (page - 1) * limit;
  const { rows } = await pool.query(
    `SELECT id, full_name, email, mobile, occupation, city, created_at
     FROM pilot_waitlist
     ORDER BY created_at DESC
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
  const { rows: c } = await pool.query('SELECT COUNT(*) AS total FROM pilot_waitlist');
  return { data: rows, total: Number(c[0].total), page, limit };
}
