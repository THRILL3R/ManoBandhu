import { pool } from '../../config/db.js';
import dayjs from 'dayjs';
import type { CompleteMorningInput, CompleteNightInput } from './rituals.schemas.js';

const RITUAL_POINTS = 5;

// ── getMorningToday ───────────────────────────────────────────────────────────
export async function getMorningToday(userId: string) {
  const today = dayjs().format('YYYY-MM-DD');
  const { rows } = await pool.query(
    `SELECT id, ritual_date, gratitude_json, intention, goals,
            completed_at, points_earned, created_at
     FROM morning_rituals
     WHERE user_id = $1 AND ritual_date = $2`,
    [userId, today]
  );
  return {
    completed: rows.length > 0,
    data: rows[0] ?? null,
  };
}

// ── completeMorning ───────────────────────────────────────────────────────────
export async function completeMorning(userId: string, data: CompleteMorningInput) {
  // 409 if already completed for that date
  const { rows: existing } = await pool.query(
    `SELECT id FROM morning_rituals WHERE user_id = $1 AND ritual_date = $2`,
    [userId, data.ritual_date]
  );
  if (existing.length > 0) {
    const err = new Error('Morning ritual already completed for this date');
    (err as { statusCode?: number }).statusCode = 409;
    throw err;
  }

  const { rows } = await pool.query(
    `INSERT INTO morning_rituals
       (user_id, ritual_date, gratitude_json, intention, goals, completed_at, points_earned)
     VALUES ($1, $2, $3, $4, $5, NOW(), $6)
     RETURNING *`,
    [
      userId,
      data.ritual_date,
      JSON.stringify(data.gratitude_json),
      data.intention,
      JSON.stringify(data.goals),
      RITUAL_POINTS,
    ]
  );

  return { ritual: rows[0], pointsEarned: RITUAL_POINTS };
}

// ── getNightToday ─────────────────────────────────────────────────────────────
export async function getNightToday(userId: string) {
  const today = dayjs().format('YYYY-MM-DD');
  const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');

  const [nightResult, circleResult] = await Promise.all([
    // Today's night ritual (if any)
    pool.query(
      `SELECT id, ritual_date, reflection, triggers_json, mood_rating,
              completed_at, points_earned, created_at
       FROM night_rituals
       WHERE user_id = $1 AND ritual_date = $2`,
      [userId, today]
    ),
    // Yesterday's relational circles as pre-fill hints
    pool.query(
      `SELECT ci.interaction_type, ci.quality_rating, rc.name, rc.relationship
       FROM circle_interactions ci
       JOIN relational_circles rc ON rc.id = ci.circle_id
       WHERE ci.user_id = $1
         AND ci.interacted_at::DATE = $2
       ORDER BY ci.interacted_at DESC
       LIMIT 5`,
      [userId, yesterday]
    ),
  ]);

  return {
    completed: nightResult.rows.length > 0,
    data: nightResult.rows[0] ?? null,
    preFillCircle: circleResult.rows,
  };
}

// ── completeNight ─────────────────────────────────────────────────────────────
export async function completeNight(userId: string, data: CompleteNightInput) {
  // 409 if already completed for that date
  const { rows: existing } = await pool.query(
    `SELECT id FROM night_rituals WHERE user_id = $1 AND ritual_date = $2`,
    [userId, data.ritual_date]
  );
  if (existing.length > 0) {
    const err = new Error('Night ritual already completed for this date');
    (err as { statusCode?: number }).statusCode = 409;
    throw err;
  }

  const { rows } = await pool.query(
    `INSERT INTO night_rituals
       (user_id, ritual_date, reflection, triggers_json, mood_rating, completed_at, points_earned)
     VALUES ($1, $2, $3, $4, $5, NOW(), $6)
     RETURNING *`,
    [
      userId,
      data.ritual_date,
      data.reflection,
      JSON.stringify(data.triggers_json),
      data.mood_rating,
      RITUAL_POINTS,
    ]
  );

  return { ritual: rows[0], pointsEarned: RITUAL_POINTS };
}

// ── getCompletionStats ────────────────────────────────────────────────────────
export async function getCompletionStats(userId: string) {
  const today = dayjs();

  // Generate last 7 day dates
  const last7Days = Array.from({ length: 7 }, (_, i) =>
    today.subtract(6 - i, 'day').format('YYYY-MM-DD')
  );

  const [morningLast7, nightLast7, morningLast30, nightLast30] = await Promise.all([
    // Morning completions last 7 days
    pool.query<{ ritual_date: Date }>(
      `SELECT ritual_date FROM morning_rituals
       WHERE user_id = $1 AND ritual_date >= $2
       ORDER BY ritual_date`,
      [userId, last7Days[0]]
    ),
    // Night completions last 7 days
    pool.query<{ ritual_date: Date }>(
      `SELECT ritual_date FROM night_rituals
       WHERE user_id = $1 AND ritual_date >= $2
       ORDER BY ritual_date`,
      [userId, last7Days[0]]
    ),
    // Morning completion % last 30 days
    pool.query<{ pct: string }>(
      `SELECT ROUND(COUNT(*)::NUMERIC / 30 * 100, 1) AS pct
       FROM morning_rituals
       WHERE user_id = $1 AND ritual_date >= CURRENT_DATE - 29`,
      [userId]
    ),
    // Night completion % last 30 days
    pool.query<{ pct: string }>(
      `SELECT ROUND(COUNT(*)::NUMERIC / 30 * 100, 1) AS pct
       FROM night_rituals
       WHERE user_id = $1 AND ritual_date >= CURRENT_DATE - 29`,
      [userId]
    ),
  ]);

  const morningSet = new Set(
    morningLast7.rows.map((r) => dayjs(r.ritual_date).format('YYYY-MM-DD'))
  );
  const nightSet = new Set(
    nightLast7.rows.map((r) => dayjs(r.ritual_date).format('YYYY-MM-DD'))
  );

  const last7 = last7Days.map((date) => ({
    date,
    morningCompleted: morningSet.has(date),
    nightCompleted: nightSet.has(date),
  }));

  return {
    last7Days: last7,
    last30Days: {
      morningCompletionPct: Number(morningLast30.rows[0]?.pct ?? 0),
      nightCompletionPct: Number(nightLast30.rows[0]?.pct ?? 0),
    },
  };
}
