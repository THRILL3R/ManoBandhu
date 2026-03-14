import { Worker } from 'bullmq';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import OpenAI from 'openai';
import { pool } from '../config/db.js';
import { env } from '../config/env.js';
import { logger } from '../utils/logger.js';
import { redisConnection } from './queues.js';
import { InsightReportJsonSchema } from '../modules/insights/insights.schemas.js';

// ── S3 client (media cleanup) ─────────────────────────────────────────────────
const s3 = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId:     env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

// ── OpenAI client ─────────────────────────────────────────────────────────────
const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

// ── Prohibited terms guard ────────────────────────────────────────────────────
const PROHIBITED_TERMS = [
  'diagnose', 'disorder', 'medication', 'clinical',
  'therapy', 'psychiatrist', 'prescription', 'symptom',
];

function containsProhibitedTerms(text: string): boolean {
  const lower = text.toLowerCase();
  return PROHIBITED_TERMS.some((t) => lower.includes(t));
}

// ── System prompt ─────────────────────────────────────────────────────────────
const INSIGHT_SYSTEM_PROMPT = `You are a warm, supportive wellness reflection assistant.
Generate a concise weekly emotional wellness summary based on the following aggregate data.
Never use clinical terms, diagnoses, or medication references.
Tone: warm, encouraging, non-judgmental.
Output valid JSON only with these keys:
  dominant_emotion, emotion_distribution_pct, trend_sentence,
  sessions_count, avg_recovery_sec, recovery_trend_sentence,
  morning_pct, night_pct, gratitude_count, encouragement_sentence`;

// ── Aggregate DB data for a user's week ──────────────────────────────────────
async function aggregateWeekData(userId: string, weekStart: string, weekEnd: string) {
  const [emotionRows, regulationRows, morningRows, nightRows, pointsRows] = await Promise.all([
    pool.query<{ emotion_category: string; cnt: string; avg_intensity: string }>(
      `SELECT emotion_category, COUNT(*) AS cnt, AVG(intensity)::NUMERIC(4,1) AS avg_intensity
       FROM emotion_logs
       WHERE user_id = $1 AND log_date BETWEEN $2 AND $3
       GROUP BY emotion_category
       ORDER BY cnt DESC`,
      [userId, weekStart, weekEnd]
    ),
    pool.query<{ cnt: string; avg_dur: string }>(
      `SELECT COUNT(*) AS cnt,
              COALESCE(AVG(EXTRACT(EPOCH FROM (ended_at - started_at))), 0)::INTEGER AS avg_dur
       FROM regulation_sessions
       WHERE user_id = $1 AND started_at::DATE BETWEEN $2 AND $3 AND completed = true`,
      [userId, weekStart, weekEnd]
    ),
    pool.query<{ cnt: string; gratitude_total: string }>(
      `SELECT COUNT(*) AS cnt,
              COALESCE(SUM(gratitude_count), 0) AS gratitude_total
       FROM morning_rituals
       WHERE user_id = $1 AND ritual_date BETWEEN $2 AND $3`,
      [userId, weekStart, weekEnd]
    ),
    pool.query<{ cnt: string }>(
      `SELECT COUNT(*) AS cnt FROM night_rituals
       WHERE user_id = $1 AND ritual_date BETWEEN $2 AND $3`,
      [userId, weekStart, weekEnd]
    ),
    pool.query<{ total_points: string }>(
      `SELECT COALESCE(SUM(points_earned), 0) AS total_points
       FROM regulation_points
       WHERE user_id = $1 AND earned_at::DATE BETWEEN $2 AND $3`,
      [userId, weekStart, weekEnd]
    ),
  ]);

  const emotionDist: Record<string, number> = {};
  let totalEmotionLogs = 0;
  for (const row of emotionRows.rows) {
    emotionDist[row.emotion_category] = Number(row.cnt);
    totalEmotionLogs += Number(row.cnt);
  }
  const emotionDistPct: Record<string, number> = {};
  for (const [k, v] of Object.entries(emotionDist)) {
    emotionDistPct[k] = totalEmotionLogs > 0 ? Math.round((v / totalEmotionLogs) * 100) : 0;
  }

  const weekDays = 7;
  const morningCount = Number(morningRows.rows[0]?.cnt ?? 0);
  const nightCount   = Number(nightRows.rows[0]?.cnt ?? 0);

  return {
    dominant_emotion:   emotionRows.rows[0]?.emotion_category ?? 'neutral',
    emotion_dist_pct:   emotionDistPct,
    total_emotion_logs: totalEmotionLogs,
    regulation_sessions_count: Number(regulationRows.rows[0]?.cnt ?? 0),
    avg_recovery_sec:          Number(regulationRows.rows[0]?.avg_dur ?? 0),
    morning_pct: Math.round((morningCount / weekDays) * 100),
    night_pct:   Math.round((nightCount   / weekDays) * 100),
    gratitude_count: Number(morningRows.rows[0]?.gratitude_total ?? 0),
    total_regulation_points: Number(pointsRows.rows[0]?.total_points ?? 0),
    week_start: weekStart,
    week_end:   weekEnd,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// WORKER 1: ai-insights — generateWeeklyInsight
// ─────────────────────────────────────────────────────────────────────────────
export const aiInsightsWorker = new Worker(
  'ai-insights',
  async (job) => {
    const { userId, weekStart, weekEnd } = job.data as {
      userId: string; weekStart: string; weekEnd: string;
    };

    logger.info(`[aiInsightsWorker] job ${job.id} — user ${userId} week ${weekStart}`);

    // 1. Mark as processing
    await pool.query(
      `INSERT INTO insight_reports (user_id, week_start, week_end, generation_status)
       VALUES ($1, $2, $3, 'processing')
       ON CONFLICT (user_id, week_start)
       DO UPDATE SET generation_status = 'processing', generated_at = NULL`,
      [userId, weekStart, weekEnd]
    );

    // 2. Aggregate data (no raw diary content, no PII names)
    const stats = await aggregateWeekData(userId, weekStart, weekEnd);

    // 3. Call GPT-4o
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 600,
      messages: [
        { role: 'system', content: INSIGHT_SYSTEM_PROMPT },
        {
          role: 'user',
          content: JSON.stringify({
            dominant_emotion:       stats.dominant_emotion,
            emotion_distribution:   stats.emotion_dist_pct,
            regulation_sessions:    stats.regulation_sessions_count,
            avg_recovery_seconds:   stats.avg_recovery_sec,
            morning_ritual_days_pct: stats.morning_pct,
            night_ritual_days_pct:  stats.night_pct,
            gratitude_entries:      stats.gratitude_count,
            regulation_points:      stats.total_regulation_points,
          }),
        },
      ],
    });

    const rawContent = completion.choices[0]?.message?.content ?? '';

    // 4. Parse and validate JSON
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(rawContent) as Record<string, unknown>;
    } catch {
      throw new Error(`GPT returned invalid JSON: ${rawContent.slice(0, 200)}`);
    }

    // 5. Prohibited terms guard — check all string values
    const allStrings = Object.values(parsed)
      .filter((v): v is string => typeof v === 'string')
      .join(' ');
    if (containsProhibitedTerms(allStrings)) {
      throw new Error('GPT response contained prohibited clinical terms — discarding');
    }

    // 6. Validate shape with Zod
    const validated = InsightReportJsonSchema.parse(parsed);

    // 7. Upsert into insight_reports
    await pool.query(
      `INSERT INTO insight_reports (user_id, week_start, week_end, report_json, generation_status, generated_at)
       VALUES ($1, $2, $3, $4, 'completed', NOW())
       ON CONFLICT (user_id, week_start)
       DO UPDATE SET
         report_json       = EXCLUDED.report_json,
         generation_status = 'completed',
         generated_at      = NOW()`,
      [userId, weekStart, weekEnd, validated]
    );

    logger.info(`[aiInsightsWorker] ✅ insight saved — user ${userId} week ${weekStart}`);
    return { userId, weekStart, status: 'completed' };
  },
  {
    connection: redisConnection,
    concurrency: 3,
  }
);

aiInsightsWorker.on('failed', (job, err) => {
  logger.error(`[aiInsightsWorker] job ${job?.id} failed:`, err.message);
  // Mark as failed in DB (best-effort)
  if (job?.data?.userId && job?.data?.weekStart) {
    pool.query(
      `UPDATE insight_reports SET generation_status = 'failed'
       WHERE user_id = $1 AND week_start = $2`,
      [job.data.userId, job.data.weekStart]
    ).catch(() => { /* ignore */ });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// WORKER 2: media-cleanup — delete S3 object by key
// ─────────────────────────────────────────────────────────────────────────────
export const mediaCleanupWorker = new Worker(
  'media-cleanup',
  async (job) => {
    const { bucket, key } = job.data as { bucket: string; key: string };
    logger.info(`[mediaCleanupWorker] deleting s3://${bucket}/${key}`);

    await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));

    logger.info(`[mediaCleanupWorker] ✅ deleted ${key}`);
    return { deleted: key };
  },
  { connection: redisConnection, concurrency: 5 }
);

mediaCleanupWorker.on('failed', (job, err) => {
  logger.error(`[mediaCleanupWorker] job ${job?.id} failed — key: ${job?.data?.key}`, err.message);
});

// ─────────────────────────────────────────────────────────────────────────────
// WORKER 3: notifications — placeholder
// ─────────────────────────────────────────────────────────────────────────────
export const notificationsWorker = new Worker(
  'notifications',
  async (job) => {
    logger.info(`[notificationsWorker] job ${job.id} received — type: ${job.name}`, job.data);
    // TODO Phase 2: integrate MSG91 SMS + AWS SES email dispatch
    return { acknowledged: true };
  },
  { connection: redisConnection, concurrency: 10 }
);

notificationsWorker.on('failed', (job, err) => {
  logger.error(`[notificationsWorker] job ${job?.id} failed:`, err.message);
});

logger.info('🔧 BullMQ workers initialized (ai-insights, media-cleanup, notifications)');
