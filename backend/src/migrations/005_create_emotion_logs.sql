-- 005_create_emotion_logs.sql

CREATE TABLE IF NOT EXISTS emotion_logs (
  id               UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id          UUID          NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  log_date         DATE          NOT NULL,
  emotion_category VARCHAR(50)   NOT NULL,
  intensity        SMALLINT      NOT NULL CHECK (intensity BETWEEN 1 AND 10),
  -- note is stored encrypted at the application layer; this field holds ciphertext
  note             TEXT,
  source           VARCHAR(30)   NOT NULL DEFAULT 'manual'
                     CHECK (source IN ('manual', 'ai_suggestion', 'wearable')),
  created_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_emotion_logs_user_date UNIQUE (user_id, log_date)
);

CREATE INDEX IF NOT EXISTS idx_emotion_logs_user_id  ON emotion_logs (user_id);
CREATE INDEX IF NOT EXISTS idx_emotion_logs_log_date ON emotion_logs (log_date);
