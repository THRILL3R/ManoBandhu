-- 002_create_users.sql

-- Trigger function to auto-update updated_at
CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS users (
  id                        UUID            PRIMARY KEY DEFAULT uuid_generate_v4(),
  email                     VARCHAR(255)    UNIQUE NOT NULL,
  phone                     VARCHAR(20)     UNIQUE,
  password_hash             VARCHAR(255),
  name                      VARCHAR(100)    NOT NULL,
  date_of_birth             DATE,
  gender                    VARCHAR(20),
  city                      VARCHAR(100),
  companion_name            VARCHAR(50),
  onboarding_completed      BOOLEAN         NOT NULL DEFAULT false,
  plan_type                 VARCHAR(20)     NOT NULL DEFAULT 'free'
                              CHECK (plan_type IN ('free', 'premium', 'premium_plus')),
  auth_provider             VARCHAR(30)     NOT NULL DEFAULT 'email',
  notification_preferences  JSONB           NOT NULL DEFAULT '{}',
  timezone                  VARCHAR(50)     NOT NULL DEFAULT 'Asia/Kolkata',
  created_at                TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  updated_at                TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  deleted_at                TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_users_email       ON users (email);
CREATE INDEX IF NOT EXISTS idx_users_phone       ON users (phone);
CREATE INDEX IF NOT EXISTS idx_users_plan_type   ON users (plan_type);
CREATE INDEX IF NOT EXISTS idx_users_deleted_at  ON users (deleted_at) WHERE deleted_at IS NULL;

CREATE TRIGGER set_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();
