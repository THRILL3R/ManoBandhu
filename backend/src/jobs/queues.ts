import { env } from '../config/env.js';

// ── Redis availability check ──────────────────────────────────────────────────
const REDIS_URL = env.REDIS_URL ?? '';
const isLocal   = !REDIS_URL || REDIS_URL.includes('localhost') || REDIS_URL.includes('127.0.0.1');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyQueue = {
  add:                    (...args: any[]) => Promise<any>;
  close:                  () => Promise<void>;
  on:                     (...args: any[]) => any;
  getRepeatableJobs:      () => Promise<any[]>;
  removeRepeatableByKey:  (key: string) => Promise<boolean | void>;
};

const noopQueue = (): AnyQueue => ({
  add:                   async () => null,
  close:                 async () => {},
  on:                    ()       => {},
  getRepeatableJobs:     async () => [],
  removeRepeatableByKey: async () => {},
});

export const redisConnection = isLocal
  ? { host: 'localhost', port: 6379 }
  : (() => { const u = new URL(REDIS_URL); return { host: u.hostname, port: Number(u.port) || 6379, password: u.password || undefined }; })();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function makeQueue(name: string, opts: Record<string, any> = {}): Promise<AnyQueue> {
  if (isLocal) return noopQueue();
  const { Queue } = await import('bullmq');
  const u = new URL(REDIS_URL);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Queue(name, { connection: { host: u.hostname, port: Number(u.port) || 6379, password: u.password || undefined } as any, ...opts });
}

// ── Queue instances (resolved lazily — no connection on module load) ───────────
export const notificationsQueue  = await makeQueue('notifications',   { defaultJobOptions: { removeOnComplete: 100, removeOnFail: 500 } });
export const aiInsightsQueue     = await makeQueue('ai-insights',     { defaultJobOptions: { removeOnComplete: 50,  removeOnFail: 200, attempts: 3, backoff: { type: 'exponential', delay: 60_000 } } });
export const paymentsQueue       = await makeQueue('payments',        { defaultJobOptions: { removeOnComplete: 100, removeOnFail: 500, attempts: 5, backoff: { type: 'exponential', delay: 10_000 } } });
export const mediaCleanupQueue   = await makeQueue('media-cleanup',   { defaultJobOptions: { removeOnComplete: 200, removeOnFail: 500, attempts: 3, backoff: { type: 'exponential', delay: 30_000 } } });
export const eventRemindersQueue = await makeQueue('event-reminders', { defaultJobOptions: { removeOnComplete: 100, removeOnFail: 200 } });
