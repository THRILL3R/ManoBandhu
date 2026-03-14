-- 019_create_pilot_waitlist.sql

CREATE TABLE IF NOT EXISTS pilot_waitlist (
  id          UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name   VARCHAR(100)  NOT NULL,
  email       VARCHAR(255)  NOT NULL UNIQUE,
  mobile      VARCHAR(20)   NOT NULL,
  occupation  VARCHAR(100),
  city        VARCHAR(100),
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pilot_waitlist_created_at ON pilot_waitlist (created_at DESC);
