import { pool } from '../../config/db.js';
import { env } from '../../config/env.js';
import { logger } from '../../utils/logger.js';
import {
  hashPassword,
  comparePassword,
  hashToken,
  generateOtp,
  hashOtp,
} from '../../utils/crypto.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../../utils/jwt.js';
import type {
  RegisterInput,
  LoginInput,
  OtpSendInput,
  OtpVerifyInput,
  RefreshInput,
} from './auth.schemas.js';

// ── Helpers ──────────────────────────────────────────────────────────────────

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthUser {
  id: string;
  name: string;
  email: string | null;
  planType: string;
}

async function issueTokens(userId: string, planType: string): Promise<AuthTokens> {
  const accessToken = generateAccessToken(userId, planType);
  const refreshToken = generateRefreshToken(userId);

  const tokenHash = hashToken(refreshToken);
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1_000); // 30 days

  // Fetch is_admin to embed in JWT (avoids extra DB call on every request)
  const { rows: adminRows } = await pool.query<{ is_admin: boolean }>(
    `SELECT is_admin FROM users WHERE id = $1`,
    [userId]
  );
  const isAdmin = adminRows[0]?.is_admin ?? false;

  const accessTokenFinal = generateAccessToken(userId, planType, isAdmin);

  await pool.query(
    `INSERT INTO refresh_tokens (user_id, token_hash, expires_at)
     VALUES ($1, $2, $3)`,
    [userId, tokenHash, expiresAt]
  );

  return { accessToken: accessTokenFinal, refreshToken };
}

// ── Service Methods ─────────────────────────────────────────────────────────

export async function register(data: RegisterInput) {
  // Check email uniqueness (non-deleted users)
  const existing = await pool.query(
    `SELECT id FROM users WHERE email = $1 AND deleted_at IS NULL`,
    [data.email]
  );
  if (existing.rowCount && existing.rowCount > 0) {
    const err = new Error('Email is already registered');
    (err as { statusCode?: number }).statusCode = 409;
    throw err;
  }

  const passwordHash = await hashPassword(data.password);

  const { rows } = await pool.query<{ id: string; name: string; email: string; plan_type: string }>(
    `INSERT INTO users (name, email, password_hash, plan_type, auth_provider)
     VALUES ($1, $2, $3, $4, 'email')
     RETURNING id, name, email, plan_type`,
    [data.name, data.email, passwordHash, data.plan_type ?? 'free']
  );

  const user = rows[0];
  const tokens = await issueTokens(user.id, user.plan_type);

  return {
    user: { id: user.id, name: user.name, email: user.email, planType: user.plan_type },
    ...tokens,
  };
}

export async function login(data: LoginInput) {
  const { rows } = await pool.query<{
    id: string; name: string; email: string;
    password_hash: string; plan_type: string;
  }>(
    `SELECT id, name, email, password_hash, plan_type
     FROM users
     WHERE email = $1 AND deleted_at IS NULL`,
    [data.email]
  );

  const user = rows[0];
  if (!user || !user.password_hash) {
    const err = new Error('Invalid email or password');
    (err as { statusCode?: number }).statusCode = 401;
    throw err;
  }

  const valid = await comparePassword(data.password, user.password_hash);
  if (!valid) {
    const err = new Error('Invalid email or password');
    (err as { statusCode?: number }).statusCode = 401;
    throw err;
  }

  const tokens = await issueTokens(user.id, user.plan_type);

  return {
    user: { id: user.id, name: user.name, email: user.email, planType: user.plan_type },
    ...tokens,
  };
}

export async function sendOtp(data: OtpSendInput) {
  // Check existing OTP count in the last 10 minutes
  const { rows: recentOtps } = await pool.query(
    `SELECT COUNT(*) as cnt FROM otp_store
     WHERE phone = $1 AND created_at > NOW() - INTERVAL '10 minutes'`,
    [data.phone]
  );
  if (parseInt(recentOtps[0].cnt, 10) >= 3) {
    const err = new Error('Too many OTP requests. Please wait 10 minutes and try again.');
    (err as { statusCode?: number }).statusCode = 429;
    throw err;
  }

  const otp = generateOtp();
  const otpHash = hashOtp(otp);
  const expiresAt = new Date(Date.now() + 5 * 60 * 1_000); // 5 minutes

  await pool.query(
    `INSERT INTO otp_store (phone, otp_hash, expires_at) VALUES ($1, $2, $3)`,
    [data.phone, otpHash, expiresAt]
  );

  if (env.NODE_ENV !== 'production') {
    logger.info(`[DEV] OTP for ${data.phone}: ${otp}`);
  } else {
    // TODO: Call MSG91 API
    // await sendMsg91Sms(data.phone, otp);
    logger.warn('MSG91 SMS not yet integrated — OTP not sent in production.');
  }

  return { message: 'OTP sent successfully' };
}

export async function verifyOtp(data: OtpVerifyInput) {
  const { rows } = await pool.query<{
    id: string; otp_hash: string; expires_at: string; attempts: number;
  }>(
    `SELECT id, otp_hash, expires_at, attempts
     FROM otp_store
     WHERE phone = $1 AND expires_at > NOW()
     ORDER BY created_at DESC
     LIMIT 1`,
    [data.phone]
  );

  const record = rows[0];
  if (!record) {
    const err = new Error('OTP has expired or does not exist. Please request a new one.');
    (err as { statusCode?: number }).statusCode = 400;
    throw err;
  }

  // Increment attempt counter
  const { rows: updated } = await pool.query<{ attempts: number }>(
    `UPDATE otp_store SET attempts = attempts + 1 WHERE id = $1 RETURNING attempts`,
    [record.id]
  );

  if (updated[0].attempts > 3) {
    const err = new Error('Too many incorrect OTP attempts. Please request a new OTP.');
    (err as { statusCode?: number }).statusCode = 429;
    throw err;
  }

  if (record.otp_hash !== hashOtp(data.otp)) {
    const err = new Error('Invalid OTP.');
    (err as { statusCode?: number }).statusCode = 400;
    throw err;
  }

  // Invalidate used OTP
  await pool.query(`DELETE FROM otp_store WHERE id = $1`, [record.id]);

  // Find or create user by phone
  let dbUser: AuthUser;
  const { rows: existingUsers } = await pool.query<{
    id: string; name: string; email: string | null; plan_type: string;
  }>(
    `SELECT id, name, email, plan_type FROM users WHERE phone = $1 AND deleted_at IS NULL`,
    [data.phone]
  );

  if (existingUsers.length > 0) {
    const u = existingUsers[0];
    dbUser = { id: u.id, name: u.name, email: u.email, planType: u.plan_type };
  } else {
    const { rows: newUsers } = await pool.query<{
      id: string; name: string; email: string | null; plan_type: string;
    }>(
      `INSERT INTO users (name, phone, auth_provider, plan_type)
       VALUES ($1, $2, 'phone', 'free')
       RETURNING id, name, email, plan_type`,
      [`User_${data.phone.slice(-4)}`, data.phone]
    );
    const u = newUsers[0];
    dbUser = { id: u.id, name: u.name, email: u.email, planType: u.plan_type };
  }

  const tokens = await issueTokens(dbUser.id, dbUser.planType);
  return { user: dbUser, ...tokens };
}

export async function refresh(data: RefreshInput) {
  // Verify JWT signature first (throws if invalid / expired)
  const payload = verifyRefreshToken(data.refreshToken);

  const tokenHash = hashToken(data.refreshToken);

  const { rows } = await pool.query<{ id: string; user_id: string }>(
    `SELECT id, user_id FROM refresh_tokens
     WHERE token_hash = $1
       AND revoked_at IS NULL
       AND expires_at > NOW()`,
    [tokenHash]
  );

  const stored = rows[0];
  if (!stored) {
    const err = new Error('Refresh token is invalid or has been revoked.');
    (err as { statusCode?: number }).statusCode = 401;
    throw err;
  }

  // Revoke old token (rotation)
  await pool.query(
    `UPDATE refresh_tokens SET revoked_at = NOW() WHERE id = $1`,
    [stored.id]
  );

  // Fetch current plan type
  const { rows: userRows } = await pool.query<{ plan_type: string }>(
    `SELECT plan_type FROM users WHERE id = $1`,
    [payload.userId]
  );

  const planType = userRows[0]?.plan_type ?? 'free';
  const tokens = await issueTokens(payload.userId, planType);

  return tokens;
}

export async function logout(userId: string, refreshToken: string) {
  const tokenHash = hashToken(refreshToken);

  await pool.query(
    `UPDATE refresh_tokens
     SET revoked_at = NOW()
     WHERE user_id = $1 AND token_hash = $2 AND revoked_at IS NULL`,
    [userId, tokenHash]
  );

  return { message: 'Logged out successfully' };
}
