-- 020_waitlist_case_insensitive.sql
-- Drop the original email unique index if it exists to replace it with a case-insensitive one
-- Note: 'pilot_waitlist_email_key' is the default name for UNIQUE constraint on a column named 'email'
-- We use DO blocks or simple drops for idempotency

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pilot_waitlist_email_key') THEN
        ALTER TABLE pilot_waitlist DROP CONSTRAINT pilot_waitlist_email_key;
    END IF;
END $$;

-- Create a functional unique index for case-insensitive email check
CREATE UNIQUE INDEX IF NOT EXISTS idx_pilot_waitlist_email_lower ON pilot_waitlist (LOWER(email));
