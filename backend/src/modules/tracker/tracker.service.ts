import { pool } from '../../config/db.js';
import type { LogEmotionInput } from './tracker.schemas.js';
import dayjs from 'dayjs';

// ── getGrid ───────────────────────────────────────────────────────────────────
export async function getGrid(userId: string, year: number) {
  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;

  const { rows } = await pool.query<{
    log_date: Date;
    emotion_category: string;
    intensity: number;
    source: string;
  }>(
    `SELECT log_date, emotion_category, intensity, source
     FROM emotion_logs
     WHERE user_id = $1
       AND log_date BETWEEN $2 AND $3
     ORDER BY log_date ASC`,
    [userId, startDate, endDate]
  );

  // Build a lookup map keyed by YYYY-MM-DD
  const logMap = new Map<string, { emotion: string; intensity: number; source: string }>();
  for (const row of rows) {
    const key = dayjs(row.log_date).format('YYYY-MM-DD');
    logMap.set(key, {
      emotion: row.emotion_category,
      intensity: row.intensity,
      source: row.source,
    });
  }

  // Generate all calendar days for the year, fill gaps with null
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const totalDays = isLeap ? 366 : 365;
  const grid: Array<{ date: string; emotion: string | null; intensity: number | null; source: string | null }> = [];

  for (let i = 0; i < totalDays; i++) {
    const date = dayjs(`${year}-01-01`).add(i, 'day').format('YYYY-MM-DD');
    const entry = logMap.get(date);
    grid.push(
      entry
        ? { date, emotion: entry.emotion, intensity: entry.intensity, source: entry.source }
        : { date, emotion: null, intensity: null, source: null }
    );
  }

  return { year, grid };
}

// ── logEmotion ────────────────────────────────────────────────────────────────
export async function logEmotion(userId: string, data: LogEmotionInput) {
  const { rows } = await pool.query<{
    id: string; log_date: Date; emotion_category: string;
    intensity: number; note: string; source: string; created_at: Date;
  }>(
    `INSERT INTO emotion_logs (user_id, log_date, emotion_category, intensity, note, source)
     VALUES ($1, $2, $3, $4, $5, $6)
     ON CONFLICT (user_id, log_date) DO UPDATE
       SET emotion_category = EXCLUDED.emotion_category,
           intensity        = EXCLUDED.intensity,
           note             = EXCLUDED.note,
           source           = EXCLUDED.source
     RETURNING id, log_date, emotion_category, intensity, note, source, created_at`,
    [userId, data.log_date, data.emotion_category, data.intensity, data.note ?? null, data.source]
  );

  return rows[0];
}

// ── getLogByDate ──────────────────────────────────────────────────────────────
export async function getLogByDate(userId: string, date: string) {
  const { rows } = await pool.query(
    `SELECT id, log_date, emotion_category, intensity, note, source, created_at
     FROM emotion_logs
     WHERE user_id = $1 AND log_date = $2`,
    [userId, date]
  );
  return rows[0] ?? null;
}

// ── getStreak ─────────────────────────────────────────────────────────────────
export async function getStreak(userId: string) {
  const { rows } = await pool.query<{ current_streak: string; longest_streak: string }>(
    `WITH active_days AS (
       SELECT log_date AS day FROM emotion_logs WHERE user_id = $1
       UNION
       SELECT ritual_date AS day FROM morning_rituals WHERE user_id = $1
       UNION
       SELECT ritual_date AS day FROM night_rituals WHERE user_id = $1
     ),
     numbered AS (
       SELECT day,
              (day - (ROW_NUMBER() OVER (ORDER BY day) * INTERVAL '1 day')::DATE) AS grp
       FROM active_days
       WHERE day <= CURRENT_DATE
     ),
     groups AS (
       SELECT grp, MIN(day) AS start_day, MAX(day) AS end_day, COUNT(*) AS cnt
       FROM numbered
       GROUP BY grp
     )
     SELECT
       COALESCE((
         SELECT cnt FROM groups
         WHERE end_day >= CURRENT_DATE - 1
         ORDER BY end_day DESC LIMIT 1
       ), 0) AS current_streak,
       COALESCE(MAX(cnt), 0) AS longest_streak
     FROM groups`,
    [userId]
  );

  return {
    currentStreak: Number(rows[0]?.current_streak ?? 0),
    longestStreak: Number(rows[0]?.longest_streak ?? 0),
  };
}

// ── getPatterns (Premium) ─────────────────────────────────────────────────────
export async function getPatterns(userId: string, days: 30 | 90) {
  const { rows } = await pool.query<{
    emotion_category: string;
    cnt: string;
    avg_intensity: string;
  }>(
    `SELECT emotion_category, COUNT(*) AS cnt, AVG(intensity)::NUMERIC(4,1) AS avg_intensity
     FROM emotion_logs
     WHERE user_id = $1
       AND log_date >= CURRENT_DATE - ($2 || ' days')::INTERVAL
     GROUP BY emotion_category
     ORDER BY cnt DESC`,
    [userId, days]
  );

  if (rows.length === 0) {
    return {
      emotionCounts: {},
      dominantEmotion: null,
      avgIntensity: null,
      moodTrend: 'stable' as const,
    };
  }

  const emotionCounts: Record<string, number> = {};
  let totalWeightedIntensity = 0;
  let totalLogs = 0;

  for (const row of rows) {
    emotionCounts[row.emotion_category] = Number(row.cnt);
    totalWeightedIntensity += Number(row.avg_intensity) * Number(row.cnt);
    totalLogs += Number(row.cnt);
  }

  const avgIntensity = totalLogs > 0
    ? Math.round((totalWeightedIntensity / totalLogs) * 10) / 10
    : null;

  // Trend: compare avg intensity of first half vs second half of the window
  const midDate = dayjs().subtract(Math.floor(days / 2), 'day').format('YYYY-MM-DD');

  const { rows: trendRows } = await pool.query<{ half: string; avg: string }>(
    `SELECT
       CASE WHEN log_date >= $3 THEN 'recent' ELSE 'older' END AS half,
       AVG(intensity) AS avg
     FROM emotion_logs
     WHERE user_id = $1
       AND log_date >= CURRENT_DATE - ($2 || ' days')::INTERVAL
     GROUP BY half`,
    [userId, days, midDate]
  );

  let moodTrend: 'improving' | 'stable' | 'declining' = 'stable';
  const recentAvg = Number(trendRows.find((r) => r.half === 'recent')?.avg ?? 0);
  const olderAvg = Number(trendRows.find((r) => r.half === 'older')?.avg ?? 0);
  const diff = recentAvg - olderAvg;
  if (diff > 0.5) moodTrend = 'improving';
  else if (diff < -0.5) moodTrend = 'declining';

  return {
    emotionCounts,
    dominantEmotion: rows[0].emotion_category,
    avgIntensity,
    moodTrend,
  };
}
