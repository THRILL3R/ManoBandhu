import crypto from 'node:crypto';
import { v4 as uuidv4 } from 'uuid';
import { pool } from '../../config/db.js';
import { env } from '../../config/env.js';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Queue } from 'bullmq';
import type { CreateDiaryInput, UpdateDiaryInput } from './diary.schemas.js';

// ── S3 client ─────────────────────────────────────────────────────────────────
const s3 = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

// ── BullMQ queue for media cleanup ────────────────────────────────────────────
const redisUrl = new URL(env.REDIS_URL);
const mediaCleanupQueue = new Queue('media-cleanup', {
  connection: {
    host: redisUrl.hostname,
    port: Number(redisUrl.port) || 6379,
    password: redisUrl.password || undefined,
  } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
});

// ── AES-256-GCM encryption helpers ────────────────────────────────────────────
// Per-user key derived via HKDF(JWT_ACCESS_SECRET + userId) — 32 bytes for AES-256
function deriveKey(userId: string): Buffer {
  const raw = crypto.hkdfSync(
    'sha256',
    Buffer.from(env.JWT_ACCESS_SECRET, 'utf8'), // IKM
    Buffer.from(userId, 'utf8'),                 // salt (per-user)
    Buffer.from('manobandhu-diary-v1', 'utf8'),  // info
    32                                            // 256-bit key
  );
  return Buffer.from(raw); // hkdfSync returns ArrayBuffer; convert to Buffer
}

const GCM_IV_LEN  = 12; // 96-bit nonce recommended for GCM
const GCM_TAG_LEN = 16; // 128-bit auth tag

/** Returns base64 string: [iv(12) | tag(16) | ciphertext] */
function encryptText(plaintext: string, userId: string): string {
  const key       = deriveKey(userId);
  const iv        = crypto.randomBytes(GCM_IV_LEN);
  const cipher    = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag       = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]).toString('base64');
}

/** Decrypts base64 blob produced by encryptText; returns '[decryption failed]' on error */
function decryptText(ciphertext: string, userId: string): string {
  try {
    const buf  = Buffer.from(ciphertext, 'base64');
    const iv   = buf.subarray(0, GCM_IV_LEN);
    const tag  = buf.subarray(GCM_IV_LEN, GCM_IV_LEN + GCM_TAG_LEN);
    const data = buf.subarray(GCM_IV_LEN + GCM_TAG_LEN);
    const key  = deriveKey(userId);
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8');
  } catch {
    return '[decryption failed]';
  }
}

// ── Ownership guard ───────────────────────────────────────────────────────────
async function getOwnedEntry(userId: string, entryId: string) {
  const { rows } = await pool.query(
    `SELECT * FROM diary_entries WHERE id = $1`,
    [entryId]
  );
  const entry = rows[0];
  if (!entry) {
    const err = new Error('Diary entry not found');
    (err as { statusCode?: number }).statusCode = 404;
    throw err;
  }
  if (entry.user_id !== userId) {
    const err = new Error('Forbidden');
    (err as { statusCode?: number }).statusCode = 403;
    throw err;
  }
  return entry;
}

// ── getDiaryList ──────────────────────────────────────────────────────────────
/** Paginated metadata list — text_content is NEVER returned here */
export async function getDiaryList(userId: string, page = 1, limit = 20) {
  const offset = (page - 1) * limit;

  const [dataResult, countResult] = await Promise.all([
    pool.query(
      `SELECT id, entry_date, content_type, tags, word_count, is_favourite, created_at
       FROM diary_entries
       WHERE user_id = $1
       ORDER BY entry_date DESC
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    ),
    pool.query<{ total: string }>(
      `SELECT COUNT(*) AS total FROM diary_entries WHERE user_id = $1`,
      [userId]
    ),
  ]);

  return {
    data:  dataResult.rows,
    total: Number(countResult.rows[0].total),
    page,
    limit,
  };
}

// ── createEntry ───────────────────────────────────────────────────────────────
export async function createEntry(userId: string, data: CreateDiaryInput) {
  let bodyEncrypted = '';
  let wordCount     = 0;

  if (data.text_content) {
    bodyEncrypted = encryptText(data.text_content, userId);
    wordCount     = data.text_content.trim().split(/\s+/).filter(Boolean).length;
  }

  const { rows } = await pool.query(
    `INSERT INTO diary_entries
       (user_id, entry_date, content_type, body_encrypted, kms_data_key,
        media_url, media_key, tags, word_count)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING id, user_id, entry_date, content_type,
               media_url, media_key, tags, word_count,
               is_favourite, created_at`,
    [
      userId,
      data.entry_date,
      data.content_type,
      bodyEncrypted,
      `hkdf:${userId}`, // MVP reference; Phase 2 → real AWS KMS ARN
      data.media_url  ?? null,
      data.media_key  ?? null,
      data.tags       ?? [],
      wordCount,
    ]
  );

  const entry = rows[0];
  return {
    ...entry,
    text_content: data.text_content ?? null, // return plaintext for immediate display
  };
}

// ── getEntry ──────────────────────────────────────────────────────────────────
export async function getEntry(userId: string, entryId: string) {
  const entry = await getOwnedEntry(userId, entryId);
  return {
    ...entry,
    text_content:   entry.body_encrypted ? decryptText(entry.body_encrypted, userId) : null,
    body_encrypted: undefined, // strip raw ciphertext from API response
  };
}

// ── updateEntry ───────────────────────────────────────────────────────────────
export async function updateEntry(
  userId:  string,
  entryId: string,
  data:    UpdateDiaryInput
) {
  await getOwnedEntry(userId, entryId); // verify ownership first

  const setClauses: string[]  = [];
  const values:     unknown[] = [];
  let   i = 1;

  if (data.text_content !== undefined) {
    const encrypted = encryptText(data.text_content, userId);
    const count     = data.text_content.trim().split(/\s+/).filter(Boolean).length;
    setClauses.push(`body_encrypted = $${i++}`, `word_count = $${i++}`);
    values.push(encrypted, count);
  }

  if (data.tags !== undefined) {
    setClauses.push(`tags = $${i++}`);
    values.push(data.tags);
  }

  // Nothing to change → just return fresh decrypted entry
  if (setClauses.length === 0) {
    return getEntry(userId, entryId);
  }

  setClauses.push(`updated_at = NOW()`);
  values.push(entryId);

  const { rows } = await pool.query(
    `UPDATE diary_entries
     SET ${setClauses.join(', ')}
     WHERE id = $${i}
     RETURNING id, entry_date, content_type,
               media_url, media_key, tags, word_count,
               is_favourite, body_encrypted, updated_at`,
    values
  );

  const updated = rows[0];
  return {
    ...updated,
    text_content:   updated.body_encrypted ? decryptText(updated.body_encrypted, userId) : null,
    body_encrypted: undefined,
  };
}

// ── deleteEntry ───────────────────────────────────────────────────────────────
export async function deleteEntry(userId: string, entryId: string) {
  const entry = await getOwnedEntry(userId, entryId);

  // Enqueue S3 media-cleanup job if an associated media key exists
  if (entry.media_key) {
    await mediaCleanupQueue.add('delete-s3-object', {
      bucket: env.AWS_S3_BUCKET,
      key:    entry.media_key,
    });
  }

  await pool.query(`DELETE FROM diary_entries WHERE id = $1`, [entryId]);

  return { deleted: true };
}

// ── getMediaUploadUrl ─────────────────────────────────────────────────────────
/**
 * Generates a presigned S3 PUT URL valid for 10 minutes.
 * Key pattern: diary/{userId}/{uuid}.{ext}
 */
export async function getMediaUploadUrl(userId: string, ext = 'bin') {
  const mediaKey = `diary/${userId}/${uuidv4()}.${ext}`;

  const uploadUrl = await getSignedUrl(
    s3,
    new PutObjectCommand({
      Bucket:      env.AWS_S3_BUCKET,
      Key:         mediaKey,
      ContentType: 'application/octet-stream',
    }),
    { expiresIn: 600 } // 10 minutes
  );

  return { uploadUrl, mediaKey };
}

// ── searchEntries ─────────────────────────────────────────────────────────────
/**
 * Filters diary_entries by tags (GIN array overlap) and/or date range.
 * Returns metadata only — no text_content.
 */
export async function searchEntries(
  userId:  string,
  filters: { tags?: string[]; startDate?: string; endDate?: string }
) {
  const conditions: string[] = ['user_id = $1'];
  const values:     unknown[] = [userId];
  let   i = 2;

  if (filters.tags && filters.tags.length > 0) {
    conditions.push(`tags && $${i}::text[]`); // array overlap operator
    values.push(filters.tags);
    i++;
  }
  if (filters.startDate) {
    conditions.push(`entry_date >= $${i}`);
    values.push(filters.startDate);
    i++;
  }
  if (filters.endDate) {
    conditions.push(`entry_date <= $${i}`);
    values.push(filters.endDate);
    i++;
  }

  const { rows } = await pool.query(
    `SELECT id, entry_date, content_type, tags, word_count, is_favourite, created_at
     FROM diary_entries
     WHERE ${conditions.join(' AND ')}
     ORDER BY entry_date DESC`,
    values
  );

  return { data: rows, total: rows.length };
}
