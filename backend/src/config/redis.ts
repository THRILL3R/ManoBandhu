import { env } from './env.js';

const REDIS_URL = env.REDIS_URL ?? '';
const isLocal = !REDIS_URL || REDIS_URL.includes('localhost') || REDIS_URL.includes('127.0.0.1');

// ── No-op stub used when Redis is not available locally ──────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stub: any = {
  on:      (_e: string, _fn: unknown) => stub,
  ping:    async ()                   => 'PONG',
  quit:    async ()                   => {},
  get:     async ()                   => null,
  set:     async ()                   => null,
  del:     async ()                   => null,
  incr:    async ()                   => 0,
  expire:  async ()                   => 0,
  ttl:     async ()                   => 0,
  connect: async ()                   => {},
};

// Only import ioredis when a real Redis URL is configured
import type { Redis as IORedis } from 'ioredis';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _redis: any = stub;

if (!isLocal) {
  // Dynamic require so ioredis is never evaluated on localhost
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Redis } = require('ioredis') as { Redis: new (...args: unknown[]) => IORedis };
  _redis = new Redis(REDIS_URL, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    lazyConnect: true,
  });
  _redis.on('error', () => {});
  _redis.on('connect', () => console.log('✅ Redis connected'));
}

export const redis = _redis;

export async function connectRedis(): Promise<void> {
  if (isLocal) {
    console.warn('⚠️  Redis skipped (localhost). Emails still work.');
    return;
  }
  try {
    await redis.connect();
    console.log('✅ Redis ready');
  } catch {
    console.warn('⚠️  Redis unavailable — continuing without it.');
  }
}
