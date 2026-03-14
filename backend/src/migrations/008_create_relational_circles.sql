-- 008_create_relational_circles.sql

CREATE TABLE IF NOT EXISTS relational_circles (
  id            UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID          NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  name          VARCHAR(100)  NOT NULL,
  relationship  VARCHAR(50)   NOT NULL,
  ring          SMALLINT      NOT NULL CHECK (ring BETWEEN 1 AND 5),
  -- ring 1 = innermost (closest), ring 5 = outermost
  notes         TEXT,
  avatar_url    TEXT,
  created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_relational_circles_user_id ON relational_circles (user_id);

CREATE TRIGGER set_relational_circles_updated_at
  BEFORE UPDATE ON relational_circles
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

-- Circle interactions log
CREATE TABLE IF NOT EXISTS circle_interactions (
  id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID          NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  circle_id       UUID          NOT NULL REFERENCES relational_circles (id) ON DELETE CASCADE,
  interaction_type VARCHAR(50)  NOT NULL,
  quality_rating  SMALLINT      CHECK (quality_rating BETWEEN 1 AND 5),
  notes           TEXT,
  interacted_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_circle_interactions_user_id   ON circle_interactions (user_id);
CREATE INDEX IF NOT EXISTS idx_circle_interactions_circle_id ON circle_interactions (circle_id);
