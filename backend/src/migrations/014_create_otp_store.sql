-- 014_create_otp_store.sql

CREATE TABLE IF NOT EXISTS otp_store (
  id          UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone       VARCHAR(20)   NOT NULL,
  otp_hash    VARCHAR(255)  NOT NULL,
  expires_at  TIMESTAMPTZ   NOT NULL,
  attempts    SMALLINT      NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_otp_store_phone      ON otp_store (phone);
CREATE INDEX IF NOT EXISTS idx_otp_store_expires_at ON otp_store (expires_at);
