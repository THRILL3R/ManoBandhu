-- 009_create_diary_entries.sql

CREATE TABLE IF NOT EXISTS diary_entries (
  id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID          NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  entry_date      DATE          NOT NULL DEFAULT CURRENT_DATE,
  title           VARCHAR(255),
  -- body is AES-256 encrypted at the application layer using KMS-managed data key
  body_encrypted  TEXT          NOT NULL,
  kms_data_key    TEXT,         -- encrypted data key reference (AWS KMS envelope encryption)
  mood            VARCHAR(50),
  tags            TEXT[]        NOT NULL DEFAULT '{}',
  word_count      INT           NOT NULL DEFAULT 0,
  is_favourite    BOOLEAN       NOT NULL DEFAULT false,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_diary_entries_user_id    ON diary_entries (user_id);
CREATE INDEX IF NOT EXISTS idx_diary_entries_entry_date ON diary_entries (entry_date);
CREATE INDEX IF NOT EXISTS idx_diary_entries_tags       ON diary_entries USING GIN (tags);

CREATE TRIGGER set_diary_entries_updated_at
  BEFORE UPDATE ON diary_entries
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();
