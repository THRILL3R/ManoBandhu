import { pool } from '../config/db.js';
import { logger } from '../utils/logger.js';
import { aiInsightsQueue } from './queues.js';

// ── Weekly cron: Sunday 02:00 IST (20:30 UTC Saturday) ───────────────────────
// IST = UTC+5:30, so 02:00 IST = 20:30 UTC previous day
// Cron expression (UTC): 30 20 * * 0   (Sunday 20:30 UTC = Monday 02:00 IST)
// We use BullMQ's built-in repeat scheduler so we just need to add
// a repeatable job — BullMQ handles the timing.

const WEEKLY_INSIGHT_CRON = '30 20 * * 0'; // Sunday 20:30 UTC = Monday 02:00 IST

async function scheduleWeeklyInsights() {
  logger.info('[scheduler] Registering weekly insights cron...');

  // BullMQ removeRepeatableByKey clears stale definitions before re-adding
  // In BullMQ v5 RepeatOptions uses 'pattern' instead of 'cron'
  const repeatableJobs = await aiInsightsQueue.getRepeatableJobs();
  for (const job of repeatableJobs) {
    if (job.name === 'weekly-insight-dispatch') {
      await aiInsightsQueue.removeRepeatableByKey(job.key);
    }
  }

  // Add a single "dispatch" job that wakes up every week and fans out
  // individual generateWeeklyInsight jobs per eligible user
  await aiInsightsQueue.add(
    'weekly-insight-dispatch',
    { dispatch: true },
    {
      repeat: { pattern: WEEKLY_INSIGHT_CRON }, // BullMQ v5: pattern (not cron)
      jobId: 'weekly-insight-dispatch',          // idempotent key
    }
  );

  logger.info(`[scheduler] ✅ Weekly insight cron registered (${WEEKLY_INSIGHT_CRON} UTC)`);
}

// ── Dispatch logic: called by the aiInsightsWorker when it sees dispatch:true ─
export async function dispatchInsightJobs(weekStart: string, weekEnd: string) {
  // Fetch all premium/premium_plus users who have >= 3 data points this week
  const { rows: eligibleUsers } = await pool.query<{ id: string }>(
    `SELECT DISTINCT u.id
     FROM users u
     WHERE u.plan_type IN ('premium', 'premium_plus')
       AND u.deleted_at IS NULL
       AND (
         SELECT COUNT(*) FROM (
           SELECT log_date AS d FROM emotion_logs    WHERE user_id = u.id AND log_date BETWEEN $1 AND $2
           UNION ALL
           SELECT ritual_date FROM morning_rituals   WHERE user_id = u.id AND ritual_date BETWEEN $1 AND $2
           UNION ALL
           SELECT ritual_date FROM night_rituals     WHERE user_id = u.id AND ritual_date BETWEEN $1 AND $2
           UNION ALL
           SELECT started_at::DATE FROM regulation_sessions WHERE user_id = u.id AND started_at::DATE BETWEEN $1 AND $2
         ) sub
       ) >= 3`,
    [weekStart, weekEnd]
  );

  logger.info(`[scheduler] Dispatching insight jobs for ${eligibleUsers.length} eligible users`);

  for (const user of eligibleUsers) {
    await aiInsightsQueue.add(
      'generateWeeklyInsight',
      { userId: user.id, weekStart, weekEnd },
      {
        // Idempotent per user per week
        jobId:    `insight:${user.id}:${weekStart}`,
        attempts: 3,
        backoff:  { type: 'exponential', delay: 60_000 },
      }
    );
  }

  return eligibleUsers.length;
}

export { scheduleWeeklyInsights };
