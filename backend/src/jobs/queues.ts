import { Queue } from 'bullmq';
import { env } from '../config/env.js';

// ── Shared Redis connection options for BullMQ ────────────────────────────────
const redisUrl = new URL(env.REDIS_URL);

export const redisConnection = {
  host:     redisUrl.hostname,
  port:     Number(redisUrl.port) || 6379,
  password: redisUrl.password || undefined,
} as const;

// ── Queue instances ───────────────────────────────────────────────────────────
export const notificationsQueue = new Queue('notifications', {
  connection: redisConnection,
  defaultJobOptions: { removeOnComplete: 100, removeOnFail: 500 },
});

export const aiInsightsQueue = new Queue('ai-insights', {
  connection: redisConnection,
  defaultJobOptions: { removeOnComplete: 50, removeOnFail: 200, attempts: 3,
    backoff: { type: 'exponential', delay: 60_000 } },
});

export const paymentsQueue = new Queue('payments', {
  connection: redisConnection,
  defaultJobOptions: { removeOnComplete: 100, removeOnFail: 500, attempts: 5,
    backoff: { type: 'exponential', delay: 10_000 } },
});

export const mediaCleanupQueue = new Queue('media-cleanup', {
  connection: redisConnection,
  defaultJobOptions: { removeOnComplete: 200, removeOnFail: 500, attempts: 3,
    backoff: { type: 'exponential', delay: 30_000 } },
});

export const eventRemindersQueue = new Queue('event-reminders', {
  connection: redisConnection,
  defaultJobOptions: { removeOnComplete: 100, removeOnFail: 200 },
});
