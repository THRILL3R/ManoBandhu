import crypto from 'node:crypto';
import { pool } from '../../config/db.js';
import { env } from '../../config/env.js';
import dayjs from 'dayjs';
import type { SaveCircleInput } from './circles.schemas.js';

// ── Per-user AES-256 key derived from userId + JWT_ACCESS_SECRET ──────────────
// For MVP: deterministic key derivation. Production upgrade: KMS envelope encryption.
function deriveUserKey(userId: string): Buffer {
  return crypto
    .createHash('sha256')
    .update(`${userId}:${env.JWT_ACCESS_SECRET}`)
    .digest(); // 32 bytes → perfect for AES-256
}

const IV_LENGTH = 16;
const CIPHER = 'aes-256-cbc';

function encryptName(name: string, userId: string): string {
  const key = deriveUserKey(userId);
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(CIPHER, key, iv);
  const encrypted = Buffer.concat([cipher.update(name, 'utf8'), cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

function decryptName(ciphertext: string, userId: string): string {
  try {
    const [ivHex, dataHex] = ciphertext.split(':');
    const key = deriveUserKey(userId);
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(CIPHER, key, iv);
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(dataHex, 'hex')),
      decipher.final(),
    ]);
    return decrypted.toString('utf8');
  } catch {
    return '[encrypted]'; // graceful fallback
  }
}

// ── Row type ──────────────────────────────────────────────────────────────────
interface CircleRow {
  id: string;
  person_name: string; // stored encrypted
  circle_level: number;
  emotion_linked: string | null;
  entry_date: Date;
  ring: number;
}

// ── getTodayCircle ────────────────────────────────────────────────────────────
export async function getTodayCircle(userId: string) {
  const today = dayjs().format('YYYY-MM-DD');
  const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');

  let { rows } = await pool.query<CircleRow>(
    `SELECT id, name AS person_name, ring AS circle_level,
            notes AS emotion_linked, created_at AS entry_date
     FROM relational_circles
     WHERE user_id = $1 AND created_at::DATE = $2`,
    [userId, today]
  );

  let isPreFill = false;
  if (rows.length === 0) {
    // Fall back to yesterday's entries as pre-fill suggestions
    const prev = await pool.query<CircleRow>(
      `SELECT id, name AS person_name, ring AS circle_level,
              notes AS emotion_linked, created_at AS entry_date
       FROM relational_circles
       WHERE user_id = $1 AND created_at::DATE = $2`,
      [userId, yesterday]
    );
    rows = prev.rows;
    isPreFill = rows.length > 0;
  }

  const entries = rows.map((r) => ({
    id: r.id,
    person_name: decryptName(r.person_name, userId),
    circle_level: r.circle_level,
    emotion_linked: r.emotion_linked,
  }));

  return { date: today, entries, isPreFill };
}

// ── saveTodayCircle ───────────────────────────────────────────────────────────
export async function saveTodayCircle(userId: string, data: SaveCircleInput) {
  const { entry_date, entries } = data;
  const yesterday = dayjs(entry_date).subtract(1, 'day').format('YYYY-MM-DD');

  // Fetch yesterday's circle for moved_from detection
  const { rows: yesterdayRows } = await pool.query<CircleRow>(
    `SELECT name AS person_name, ring AS circle_level
     FROM relational_circles
     WHERE user_id = $1 AND created_at::DATE = $2`,
    [userId, yesterday]
  );

  const yesterdayMap = new Map<string, number>();
  for (const row of yesterdayRows) {
    try {
      const decrypted = decryptName(row.person_name, userId);
      yesterdayMap.set(decrypted.toLowerCase(), row.circle_level);
    } catch { /* skip undecryptable */ }
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Delete existing entries for this date
    await client.query(
      `DELETE FROM relational_circles WHERE user_id = $1 AND created_at::DATE = $2`,
      [userId, entry_date]
    );

    // Bulk insert new entries
    for (const entry of entries) {
      const encrypted = encryptName(entry.person_name, userId);
      const previousLevel = yesterdayMap.get(entry.person_name.toLowerCase());
      const movedFrom =
        previousLevel !== undefined && previousLevel !== entry.circle_level
          ? previousLevel
          : null;

      await client.query(
        `INSERT INTO relational_circles
           (user_id, name, ring, notes)
         VALUES ($1, $2, $3, $4)`,
        [
          userId,
          encrypted,
          entry.circle_level,
          // Pack emotion_linked and moved_from together in notes as JSON for MVP
          JSON.stringify({ emotion: entry.emotion_linked ?? null, moved_from: movedFrom }),
        ]
      );
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }

  return { saved: entries.length, date: entry_date };
}

// ── getHistory ────────────────────────────────────────────────────────────────
export async function getHistory(userId: string, startDate: string, endDate: string) {
  const { rows } = await pool.query<CircleRow>(
    `SELECT id, name AS person_name, ring AS circle_level,
            notes AS emotion_linked, created_at AS entry_date
     FROM relational_circles
     WHERE user_id = $1
       AND created_at::DATE BETWEEN $2 AND $3
     ORDER BY created_at ASC`,
    [userId, startDate, endDate]
  );

  // Group by date, decrypting names
  const grouped = new Map<string, Array<{ id: string; person_name: string; circle_level: number; emotion_linked: string | null }>>();
  for (const row of rows) {
    const dateKey = dayjs(row.entry_date).format('YYYY-MM-DD');
    if (!grouped.has(dateKey)) grouped.set(dateKey, []);
    grouped.get(dateKey)!.push({
      id: row.id,
      person_name: decryptName(row.person_name, userId),
      circle_level: row.circle_level,
      emotion_linked: row.emotion_linked,
    });
  }

  return Array.from(grouped.entries()).map(([date, entries]) => ({ date, entries }));
}

// ── getTrends ─────────────────────────────────────────────────────────────────
export async function getTrends(userId: string) {
  const since = dayjs().subtract(13, 'day').format('YYYY-MM-DD');

  const { rows } = await pool.query<CircleRow>(
    `SELECT name AS person_name, ring AS circle_level, created_at AS entry_date
     FROM relational_circles
     WHERE user_id = $1 AND created_at::DATE >= $2
     ORDER BY created_at ASC`,
    [userId, since]
  );

  // Group by date
  const byDate = new Map<string, Array<{ name: string; level: number }>>();
  for (const row of rows) {
    const dateKey = dayjs(row.entry_date).format('YYYY-MM-DD');
    if (!byDate.has(dateKey)) byDate.set(dateKey, []);
    byDate.get(dateKey)!.push({
      name: decryptName(row.person_name, userId),
      level: row.circle_level,
    });
  }

  // Isolation risk: 0 people in levels 1-2 for 3+ consecutive days
  const dates = Array.from(byDate.keys()).sort();
  let isolationStreak = 0;
  let isolationRiskFlag = false;
  for (const date of dates) {
    const hasSafe = (byDate.get(date) ?? []).some((e) => e.level <= 2 && e.level >= 1);
    if (!hasSafe) {
      isolationStreak += 1;
      if (isolationStreak >= 3) { isolationRiskFlag = true; break; }
    } else {
      isolationStreak = 0;
    }
  }

  // Draining people: consistently level 4 for 3+ days
  const personDrainingCount = new Map<string, number>();
  for (const entries of byDate.values()) {
    for (const e of entries) {
      if (e.level === 4) {
        personDrainingCount.set(e.name, (personDrainingCount.get(e.name) ?? 0) + 1);
      }
    }
  }
  const drainingPeople = [...personDrainingCount.entries()]
    .filter(([, cnt]) => cnt >= 3)
    .map(([name]) => name);

  const driftingSummary = drainingPeople.length > 0
    ? `${drainingPeople.length} person(s) have been consistently draining for 3+ days.`
    : 'No concerning patterns detected.';

  // Circle stability: per-day summary of level distribution
  const circleStability = dates.map((date) => {
    const entries = byDate.get(date) ?? [];
    return {
      date,
      safeCount: entries.filter((e) => e.level === 1).length,
      comfortableCount: entries.filter((e) => e.level === 2).length,
      limitedCount: entries.filter((e) => e.level === 3).length,
      drainingCount: entries.filter((e) => e.level === 4).length,
    };
  });

  return { circleStability, isolationRiskFlag, driftingSummary };
}
