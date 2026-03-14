import { pool } from '../../config/db.js';
import { logger } from '../../utils/logger.js';
import { aiInsightsQueue } from '../../jobs/queues.js';
import { dispatchInsightJobs } from '../../jobs/scheduler.js';
import type { InsightReportJson } from './insights.schemas.js';

// ── getLatestWeeklyInsight ─────────────────────────────────────────────────────
export async function getLatestWeeklyInsight(userId: string) {
  const { rows } = await pool.query(
    `SELECT id, week_start, week_end, report_json, generated_at
     FROM insight_reports
     WHERE user_id = $1 AND generation_status = 'completed'
     ORDER BY week_start DESC
     LIMIT 1`,
    [userId]
  );

  if (rows.length === 0) {
    return {
      available: false,
      message: 'Your first insight will be ready after 7 days of logging.',
    };
  }

  const row = rows[0];
  return {
    available: true,
    report: {
      id:           row.id,
      weekStart:    row.week_start,
      weekEnd:      row.week_end,
      generatedAt:  row.generated_at,
      ...(row.report_json as InsightReportJson),
    },
  };
}

// ── getWeeklyInsightById ───────────────────────────────────────────────────────
export async function getWeeklyInsightById(userId: string, weekId: string) {
  const { rows } = await pool.query(
    `SELECT id, week_start, week_end, report_json, generation_status, generated_at
     FROM insight_reports
     WHERE id = $1`,
    [weekId]
  );

  const row = rows[0];
  if (!row) {
    const err = new Error('Insight report not found');
    (err as { statusCode?: number }).statusCode = 404;
    throw err;
  }
  if (row.user_id !== userId) {
    const err = new Error('Forbidden');
    (err as { statusCode?: number }).statusCode = 403;
    throw err;
  }

  return {
    id:              row.id,
    weekStart:       row.week_start,
    weekEnd:         row.week_end,
    generationStatus: row.generation_status,
    generatedAt:     row.generated_at,
    ...(row.report_json as InsightReportJson),
  };
}

// ── getMonthlyInsight ─────────────────────────────────────────────────────────
export async function getMonthlyInsight(userId: string) {
  const { rows } = await pool.query(
    `SELECT report_json, week_start, week_end
     FROM insight_reports
     WHERE user_id = $1
       AND generation_status = 'completed'
     ORDER BY week_start DESC
     LIMIT 4`,
    [userId]
  );

  if (rows.length === 0) {
    return {
      available: false,
      message: 'No completed weekly insights found for this month.',
    };
  }

  // Aggregate the last 4 weekly reports by averaging numeric metrics
  const reports = rows.map((r) => r.report_json as InsightReportJson);

  const numericKeys: (keyof InsightReportJson)[] = [
    'sessions_count', 'avg_recovery_sec', 'morning_pct',
    'night_pct', 'gratitude_count',
  ];

  const averaged: Record<string, number> = {};
  for (const key of numericKeys) {
    const sum = reports.reduce((acc, r) => acc + (Number(r[key]) || 0), 0);
    averaged[key] = Math.round((sum / reports.length) * 10) / 10;
  }

  // Dominant emotion: most frequent across all weeks
  const emotionCounts: Record<string, number> = {};
  for (const r of reports) {
    emotionCounts[r.dominant_emotion] = (emotionCounts[r.dominant_emotion] ?? 0) + 1;
  }
  const dominant_emotion = Object.entries(emotionCounts)
    .sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'neutral';

  // Merge emotion_distribution_pct by averaging
  const allEmotions = new Set(reports.flatMap((r) => Object.keys(r.emotion_distribution_pct)));
  const merged_emotion_distribution_pct: Record<string, number> = {};
  for (const emotion of allEmotions) {
    const vals = reports.map((r) => r.emotion_distribution_pct[emotion] ?? 0);
    merged_emotion_distribution_pct[emotion] =
      Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10;
  }

  // Latest trend & encouragement sentences from most recent report
  const latest = reports[0];

  return {
    available: true,
    period: {
      start: rows[rows.length - 1].week_start,
      end:   rows[0].week_end,
      weeks: rows.length,
    },
    report: {
      dominant_emotion,
      emotion_distribution_pct: merged_emotion_distribution_pct,
      trend_sentence:            latest?.trend_sentence ?? '',
      recovery_trend_sentence:   latest?.recovery_trend_sentence ?? '',
      encouragement_sentence:    latest?.encouragement_sentence ?? '',
      ...averaged,
    },
  };
}

// ── triggerInsightGeneration (admin) ──────────────────────────────────────────
export async function triggerInsightGeneration(adminUserId: string, targetUserId?: string) {
  const now       = new Date();
  const weekEnd   = new Date(now);
  const weekStart = new Date(now);
  // Current week Mon–Sun
  const dayOfWeek = now.getDay(); // 0=Sun
  weekStart.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
  weekEnd.setDate(weekStart.getDate() + 6);

  const fmt = (d: Date) => d.toISOString().split('T')[0]!;

  if (targetUserId) {
    // Single user
    const job = await aiInsightsQueue.add(
      'generateWeeklyInsight',
      { userId: targetUserId, weekStart: fmt(weekStart), weekEnd: fmt(weekEnd) },
      { jobId: `insight:admin:${targetUserId}:${fmt(weekStart)}` }
    );
    logger.info(`[insights] Admin ${adminUserId} triggered insight for user ${targetUserId}`);
    return { message: 'Insight generation queued', jobId: job.id };
  }

  // Fan out all eligible users
  const dispatched = await dispatchInsightJobs(fmt(weekStart), fmt(weekEnd));
  logger.info(`[insights] Admin ${adminUserId} triggered batch dispatch — ${dispatched} users`);
  return { message: `Insight generation queued for ${dispatched} users`, jobId: null };
}
