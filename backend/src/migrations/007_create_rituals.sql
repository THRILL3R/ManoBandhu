-- 007_create_rituals.sql

CREATE TABLE IF NOT EXISTS morning_rituals (
  id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID          NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  ritual_date     DATE          NOT NULL,
  gratitude_json  JSONB         NOT NULL DEFAULT '[]',
  intention       TEXT,
  goals           JSONB         NOT NULL DEFAULT '[]',
  completed_at    TIMESTAMPTZ,
  points_earned   SMALLINT      NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_morning_rituals_user_date UNIQUE (user_id, ritual_date)
);

CREATE INDEX IF NOT EXISTS idx_morning_rituals_user_id    ON morning_rituals (user_id);
CREATE INDEX IF NOT EXISTS idx_morning_rituals_date       ON morning_rituals (ritual_date);

CREATE TABLE IF NOT EXISTS night_rituals (
  id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID          NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  ritual_date     DATE          NOT NULL,
  reflection      TEXT,
  triggers_json   JSONB         NOT NULL DEFAULT '[]',
  mood_rating     SMALLINT      NOT NULL CHECK (mood_rating BETWEEN 1 AND 5),
  completed_at    TIMESTAMPTZ,
  points_earned   SMALLINT      NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_night_rituals_user_date UNIQUE (user_id, ritual_date)
);

CREATE INDEX IF NOT EXISTS idx_night_rituals_user_id  ON night_rituals (user_id);
CREATE INDEX IF NOT EXISTS idx_night_rituals_date     ON night_rituals (ritual_date);
