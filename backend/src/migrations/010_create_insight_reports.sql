-- 010_create_insight_reports.sql

CREATE TABLE IF NOT EXISTS insight_reports (
  id                  UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id             UUID          NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  week_start          DATE          NOT NULL,
  week_end            DATE          NOT NULL,
  report_json         JSONB         NOT NULL DEFAULT '{}',
  generated_at        TIMESTAMPTZ,
  generation_status   VARCHAR(20)   NOT NULL DEFAULT 'pending'
                        CHECK (generation_status IN ('pending', 'processing', 'completed', 'failed')),
  created_at          TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_insight_reports_user_week UNIQUE (user_id, week_start)
);

CREATE INDEX IF NOT EXISTS idx_insight_reports_user_id    ON insight_reports (user_id);
CREATE INDEX IF NOT EXISTS idx_insight_reports_week_start ON insight_reports (week_start);
CREATE INDEX IF NOT EXISTS idx_insight_reports_status     ON insight_reports (generation_status);
