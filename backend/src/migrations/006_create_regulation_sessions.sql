-- 006_create_regulation_sessions.sql

CREATE TABLE IF NOT EXISTS regulation_sessions (
  id                  UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id             UUID          NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  technique_id        VARCHAR(50)   NOT NULL,
  technique_name      VARCHAR(100)  NOT NULL,
  category            VARCHAR(50)   NOT NULL
                        CHECK (category IN ('breathing', 'grounding', 'somatic', 'mindfulness', 'other')),
  duration_seconds    INT           NOT NULL CHECK (duration_seconds > 0),
  emotion_before      VARCHAR(50),
  emotion_after       VARCHAR(50),
  intensity_before    SMALLINT      CHECK (intensity_before BETWEEN 1 AND 10),
  intensity_after     SMALLINT      CHECK (intensity_after BETWEEN 1 AND 10),
  completed           BOOLEAN       NOT NULL DEFAULT false,
  notes               TEXT,
  points_earned       SMALLINT      NOT NULL DEFAULT 0,
  session_date        DATE          NOT NULL DEFAULT CURRENT_DATE,
  created_at          TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_regulation_sessions_user_id   ON regulation_sessions (user_id);
CREATE INDEX IF NOT EXISTS idx_regulation_sessions_date      ON regulation_sessions (session_date);
CREATE INDEX IF NOT EXISTS idx_regulation_sessions_category  ON regulation_sessions (category);
