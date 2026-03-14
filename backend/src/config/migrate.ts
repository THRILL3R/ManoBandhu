/**
 * migrate.ts — Simple sequential SQL migration runner
 *
 * Reads all *.sql files from src/migrations/ in ascending filename order,
 * tracks which have already been applied in the `_migrations` table,
 * and runs new ones inside a single transaction.
 *
 * Usage:  npm run migrate
 */

import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pool } from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = path.resolve(__dirname, '../migrations');

async function ensureMigrationsTable(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id          SERIAL      PRIMARY KEY,
      filename    VARCHAR(255) NOT NULL UNIQUE,
      applied_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

async function getAppliedMigrations(): Promise<Set<string>> {
  const { rows } = await pool.query<{ filename: string }>(
    'SELECT filename FROM _migrations ORDER BY id'
  );
  return new Set(rows.map((r) => r.filename));
}

async function run() {
  await ensureMigrationsTable();
  const applied = await getAppliedMigrations();

  const files = (await fs.readdir(MIGRATIONS_DIR))
    .filter((f) => f.endsWith('.sql'))
    .sort(); // lexicographic = numeric order given 001_, 002_, …

  const pending = files.filter((f) => !applied.has(f));

  if (pending.length === 0) {
    console.log('✅ All migrations are up to date.');
    await pool.end();
    return;
  }

  console.log(`🔄 Running ${pending.length} pending migration(s)…`);

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    for (const file of pending) {
      const filePath = path.join(MIGRATIONS_DIR, file);
      const sql = await fs.readFile(filePath, 'utf-8');
      console.log(`  → ${file}`);
      await client.query(sql);
      await client.query(
        'INSERT INTO _migrations (filename) VALUES ($1)',
        [file]
      );
    }

    await client.query('COMMIT');
    console.log(`✅ Applied ${pending.length} migration(s) successfully.`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Migration failed. Transaction rolled back.');
    console.error(err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

run();
