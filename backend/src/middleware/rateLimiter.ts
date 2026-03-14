import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import { Request, Response } from 'express';
import { redis } from '../config/redis.js';
import { sendError } from '../utils/response.js';

// ── Shared handler ──────────────────────────────────────────────────────────
const limitExceededHandler = (code: string, message: string) =>
  (_req: Request, res: Response) =>
    sendError(res, code, message, 429);

// ── 1. General limiter — 100 req/min per authenticated user ─────────────────
export const generalLimiter = rateLimit({
  windowMs: 60 * 1_000, // 1 minute
  max: 100,
  keyGenerator: (req: Request, res: Response) => req.user?.userId ?? ipKeyGenerator(req as any, res as any),
  standardHeaders: true,
  legacyHeaders: false,
  handler: limitExceededHandler('RATE_LIMIT', 'Too many requests. Please slow down.'),
});

// ── 2. Auth limiter — 10 req/min per IP (for login / register) ───────────────
export const authLimiter = rateLimit({
  windowMs: 60 * 1_000,
  max: 10,
  keyGenerator: (req: Request, res: Response) => ipKeyGenerator(req as any, res as any),
  standardHeaders: true,
  legacyHeaders: false,
  handler: limitExceededHandler(
    'AUTH_RATE_LIMIT',
    'Too many auth attempts. Please wait a minute and try again.'
  ),
});

// ── 3. OTP limiter — 3 attempts per 10 min per phone (Redis-backed) ──────────
const OTP_WINDOW_SECONDS = 10 * 60; // 10 minutes
const OTP_MAX_ATTEMPTS = 3;

export async function otpLimiter(
  req: Request,
  res: Response,
  next: () => void
): Promise<void> {
  const phone: string = req.body?.phone as string;

  if (!phone) {
    next();
    return;
  }

  const key = `otp_limit:${phone}`;
  const attempts = await redis.incr(key);

  if (attempts === 1) {
    // Set TTL only on first attempt
    await redis.expire(key, OTP_WINDOW_SECONDS);
  }

  if (attempts > OTP_MAX_ATTEMPTS) {
    const ttl = await redis.ttl(key);
    sendError(
      res,
      'OTP_RATE_LIMIT',
      `Too many OTP requests. Try again in ${Math.ceil(ttl / 60)} minute(s).`,
      429
    );
    return;
  }

  next();
}
