import { pool } from '../../config/db.js';
import type {
  StartSessionInput,
  UpdateStepInput,
  CompleteSessionInput,
} from './regulation.schemas.js';

// Points by closure outcome
const POINTS_MAP: Record<string, number> = {
  settled: 10,
  processing: 7,
  need_support: 5,
};

// ── Shared: fetch & verify session ownership ─────────────────────────────────
async function getOwnedSession(userId: string, sessionId: string) {
  const { rows } = await pool.query<{
    id: string;
    user_id: string;
    completed: boolean;
    started_at: Date;
  }>(
    `SELECT id, user_id,
            (completed_at IS NOT NULL) AS completed,
            started_at
     FROM regulation_sessions
     WHERE id = $1`,
    [sessionId]
  );

  const session = rows[0];
  if (!session) {
    const err = new Error('Session not found');
    (err as { statusCode?: number }).statusCode = 404;
    throw err;
  }
  if (session.user_id !== userId) {
    const err = new Error('Forbidden');
    (err as { statusCode?: number }).statusCode = 403;
    throw err;
  }
  return session;
}

// ── startSession ──────────────────────────────────────────────────────────────
export async function startSession(userId: string, data: StartSessionInput) {
  const { rows } = await pool.query<{ id: string; started_at: Date }>(
    `INSERT INTO regulation_sessions
       (user_id, emotion_selected, technique_id, technique_name, category, duration_seconds, session_date)
     VALUES ($1, $2, 'flow_v1', 'I''m Not Okay Flow', 'mindfulness', 0, CURRENT_DATE)
     RETURNING id, started_at`,
    [userId, data.emotion_selected]
  );

  return { sessionId: rows[0].id, startedAt: rows[0].started_at };
}

// ── updateStep ────────────────────────────────────────────────────────────────
export async function updateStep(
  userId: string,
  sessionId: string,
  data: UpdateStepInput
) {
  const session = await getOwnedSession(userId, sessionId);
  if (session.completed) {
    const err = new Error('Session is already completed');
    (err as { statusCode?: number }).statusCode = 409;
    throw err;
  }

  const fields = Object.keys(data) as (keyof UpdateStepInput)[];
  if (fields.length === 0) {
    // Nothing to update — return current session
    const { rows } = await pool.query(
      `SELECT * FROM regulation_sessions WHERE id = $1`,
      [sessionId]
    );
    return rows[0];
  }

  const setClauses = fields.map((f, i) => `${f} = $${i + 1}`);
  const values: unknown[] = fields.map((f) => data[f]);
  values.push(sessionId); // for WHERE

  const { rows } = await pool.query(
    `UPDATE regulation_sessions
     SET ${setClauses.join(', ')}
     WHERE id = $${values.length}
     RETURNING *`,
    values
  );

  return rows[0];
}

// ── completeSession ───────────────────────────────────────────────────────────
export async function completeSession(
  userId: string,
  sessionId: string,
  data: CompleteSessionInput
) {
  const session = await getOwnedSession(userId, sessionId);

  const pointsEarned = POINTS_MAP[data.closure_outcome] ?? 5;
  const now = new Date();
  const durationSeconds = Math.round(
    (now.getTime() - new Date(session.started_at).getTime()) / 1_000
  );

  // Update the session row atomically
  const { rows } = await pool.query<{ id: string }>(
    `UPDATE regulation_sessions
     SET closure_outcome   = $1,
         completed         = true,
         completed_at      = NOW(),
         points_earned     = $2,
         duration_seconds  = $3,
         emotion_after     = $1
     WHERE id = $4
     RETURNING id`,
    [data.closure_outcome, pointsEarned, durationSeconds, sessionId]
  );

  if (!rows[0]) {
    const err = new Error('Session not found');
    (err as { statusCode?: number }).statusCode = 404;
    throw err;
  }

  // Record in regulation_points
  await pool.query(
    `INSERT INTO regulation_points (user_id, session_id, points)
     VALUES ($1, $2, $3)`,
    [userId, sessionId, pointsEarned]
  );

  return { sessionId, pointsEarned, durationSeconds, closureOutcome: data.closure_outcome };
}

// ── getHistory ────────────────────────────────────────────────────────────────
export async function getHistory(userId: string, page = 1, limit = 10) {
  const offset = (page - 1) * limit;

  const [dataResult, countResult] = await Promise.all([
    pool.query(
      `SELECT id, emotion_selected, closure_outcome, points_earned,
              duration_seconds, session_date, started_at, completed_at
       FROM regulation_sessions
       WHERE user_id = $1 AND completed_at IS NOT NULL
       ORDER BY completed_at DESC
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    ),
    pool.query<{ total: string }>(
      `SELECT COUNT(*) AS total
       FROM regulation_sessions
       WHERE user_id = $1 AND completed_at IS NOT NULL`,
      [userId]
    ),
  ]);

  return {
    data: dataResult.rows,
    total: Number(countResult.rows[0].total),
    page,
    limit,
  };
}

// ── getStats ──────────────────────────────────────────────────────────────────
export async function getStats(userId: string) {
  const [summaryResult, topEmotionsResult, weeklyResult, pointsResult] =
    await Promise.all([
      // Overall count + avg duration
      pool.query<{ total: string; avg_duration: string }>(
        `SELECT COUNT(*) AS total,
                ROUND(AVG(duration_seconds)) AS avg_duration
         FROM regulation_sessions
         WHERE user_id = $1 AND completed_at IS NOT NULL`,
        [userId]
      ),

      // Top 3 emotions by frequency
      pool.query<{ emotion_selected: string; cnt: string }>(
        `SELECT emotion_selected, COUNT(*) AS cnt
         FROM regulation_sessions
         WHERE user_id = $1 AND completed_at IS NOT NULL
         GROUP BY emotion_selected
         ORDER BY cnt DESC
         LIMIT 3`,
        [userId]
      ),

      // Weekly sessions: last 4 ISO calendar weeks
      pool.query<{ week: string; cnt: string }>(
        `SELECT TO_CHAR(DATE_TRUNC('week', completed_at), 'YYYY-MM-DD') AS week,
                COUNT(*) AS cnt
         FROM regulation_sessions
         WHERE user_id = $1
           AND completed_at >= NOW() - INTERVAL '4 weeks'
           AND completed_at IS NOT NULL
         GROUP BY week
         ORDER BY week ASC`,
        [userId]
      ),

      // Total points
      pool.query<{ total_points: string }>(
        `SELECT COALESCE(SUM(points), 0) AS total_points
         FROM regulation_points
         WHERE user_id = $1`,
        [userId]
      ),
    ]);

  return {
    totalSessions: Number(summaryResult.rows[0]?.total ?? 0),
    avgDurationSeconds: Number(summaryResult.rows[0]?.avg_duration ?? 0),
    topEmotions: topEmotionsResult.rows.map((r) => ({
      emotion: r.emotion_selected,
      count: Number(r.cnt),
    })),
    weeklySessions: weeklyResult.rows.map((r) => ({
      week: r.week,
      count: Number(r.cnt),
    })),
    totalPointsEarned: Number(pointsResult.rows[0]?.total_points ?? 0),
  };
}
