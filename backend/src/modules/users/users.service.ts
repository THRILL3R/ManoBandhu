import { pool } from '../../config/db.js';
import type { UpdateProfileInput } from './users.schemas.js';

// ── Shared user columns (never expose password_hash or deleted_at) ────────────
const USER_COLUMNS = `
  id, email, phone, name, date_of_birth, gender, city,
  companion_name, onboarding_completed, plan_type, auth_provider,
  notification_preferences, timezone, created_at, updated_at
`;

// ── getMe ─────────────────────────────────────────────────────────────────────
export async function getMe(userId: string) {
  const { rows } = await pool.query(
    `SELECT ${USER_COLUMNS} FROM users WHERE id = $1 AND deleted_at IS NULL`,
    [userId]
  );

  if (!rows[0]) {
    const err = new Error('User not found');
    (err as { statusCode?: number }).statusCode = 404;
    throw err;
  }

  return rows[0];
}

// ── updateMe ──────────────────────────────────────────────────────────────────
export async function updateMe(userId: string, data: UpdateProfileInput) {
  // Build SET clause dynamically from only provided fields
  const fields = Object.keys(data) as (keyof UpdateProfileInput)[];

  if (fields.length === 0) {
    return getMe(userId);
  }

  const setClauses = fields.map((f, i) => `${f} = $${i + 1}`);
  const values: unknown[] = fields.map((f) => data[f]);

  // updated_at is handled by the DB trigger, but we force it explicitly too
  setClauses.push(`updated_at = NOW()`);
  values.push(userId); // for the WHERE clause

  const { rows } = await pool.query(
    `UPDATE users
     SET ${setClauses.join(', ')}
     WHERE id = $${values.length} AND deleted_at IS NULL
     RETURNING ${USER_COLUMNS}`,
    values
  );

  if (!rows[0]) {
    const err = new Error('User not found');
    (err as { statusCode?: number }).statusCode = 404;
    throw err;
  }

  return rows[0];
}

// ── deleteMe ──────────────────────────────────────────────────────────────────
export async function deleteMe(userId: string) {
  // Soft-delete the user
  await pool.query(
    `UPDATE users SET deleted_at = NOW() WHERE id = $1 AND deleted_at IS NULL`,
    [userId]
  );

  // Revoke all active refresh tokens
  await pool.query(
    `UPDATE refresh_tokens SET revoked_at = NOW()
     WHERE user_id = $1 AND revoked_at IS NULL`,
    [userId]
  );

  return { message: 'Account scheduled for deletion' };
}

// ── getStats ──────────────────────────────────────────────────────────────────
export async function getStats(userId: string) {
  const [streakResult, pointsResult, morningResult, nightResult, diaryResult] =
    await Promise.all([
      // ── Current streak: consecutive days with an emotion_log or ritual ──────
      pool.query<{ streak: string }>(
        `WITH daily AS (
           SELECT log_date AS day FROM emotion_logs WHERE user_id = $1
           UNION
           SELECT ritual_date AS day FROM morning_rituals WHERE user_id = $1
           UNION
           SELECT ritual_date AS day FROM night_rituals WHERE user_id = $1
         ),
         numbered AS (
           SELECT day,
                  day - (ROW_NUMBER() OVER (ORDER BY day))::INT AS grp
           FROM daily
           WHERE day <= CURRENT_DATE
         ),
         groups AS (
           SELECT grp, MAX(day) AS last_day, COUNT(*) AS cnt
           FROM numbered
           GROUP BY grp
         )
         SELECT COALESCE((
           SELECT cnt FROM groups
           WHERE last_day >= CURRENT_DATE - 1  -- allow yesterday's to count
           ORDER BY last_day DESC LIMIT 1
         ), 0) AS streak`,
        [userId]
      ),

      // ── Total regulation points ───────────────────────────────────────────
      pool.query<{ total: string }>(
        `SELECT COALESCE(SUM(points), 0) AS total
         FROM regulation_points WHERE user_id = $1`,
        [userId]
      ),

      // ── Morning ritual completion % — last 30 days ────────────────────────
      pool.query<{ pct: string }>(
        `SELECT ROUND(
           COUNT(mr.id)::NUMERIC / 30 * 100, 1
         ) AS pct
         FROM generate_series(
           CURRENT_DATE - 29, CURRENT_DATE, INTERVAL '1 day'
         ) d(day)
         LEFT JOIN morning_rituals mr
           ON mr.user_id = $1 AND mr.ritual_date = d.day::DATE`,
        [userId]
      ),

      // ── Night ritual completion % — last 30 days ──────────────────────────
      pool.query<{ pct: string }>(
        `SELECT ROUND(
           COUNT(nr.id)::NUMERIC / 30 * 100, 1
         ) AS pct
         FROM generate_series(
           CURRENT_DATE - 29, CURRENT_DATE, INTERVAL '1 day'
         ) d(day)
         LEFT JOIN night_rituals nr
           ON nr.user_id = $1 AND nr.ritual_date = d.day::DATE`,
        [userId]
      ),

      // ── Total diary entries ───────────────────────────────────────────────
      pool.query<{ total: string }>(
        `SELECT COUNT(*) AS total FROM diary_entries WHERE user_id = $1`,
        [userId]
      ),
    ]);

  return {
    streak: Number(streakResult.rows[0]?.streak ?? 0),
    regulationPoints: Number(pointsResult.rows[0]?.total ?? 0),
    morningRitualPct: Number(morningResult.rows[0]?.pct ?? 0),
    nightRitualPct: Number(nightResult.rows[0]?.pct ?? 0),
    totalDiaryEntries: Number(diaryResult.rows[0]?.total ?? 0),
  };
}
