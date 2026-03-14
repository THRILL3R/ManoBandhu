-- 018_create_waitlist.sql
-- Stores pilot study waitlist signups from the frontend form

CREATE TABLE IF NOT EXISTS waitlist (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(120)  NOT NULL,
  email       VARCHAR(255)  NOT NULL,
  phone       VARCHAR(20),
  occupation  VARCHAR(120),
  city        VARCHAR(100),
  source      VARCHAR(60)   NOT NULL DEFAULT 'homepage',  -- 'homepage' | 'pilot-study-page'
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist (email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at  ON waitlist (created_at DESC);
