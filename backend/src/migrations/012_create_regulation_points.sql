-- 012_create_regulation_points.sql

CREATE TABLE IF NOT EXISTS regulation_points (
  id          UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID          NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  session_id  UUID          NOT NULL REFERENCES regulation_sessions (id) ON DELETE CASCADE,
  points      INT           NOT NULL CHECK (points > 0),
  earned_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_regulation_points_user_id    ON regulation_points (user_id);
CREATE INDEX IF NOT EXISTS idx_regulation_points_session_id ON regulation_points (session_id);
CREATE INDEX IF NOT EXISTS idx_regulation_points_earned_at  ON regulation_points (earned_at);
