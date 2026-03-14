-- 003_create_subscriptions.sql

CREATE TABLE IF NOT EXISTS subscriptions (
  id                          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id                     UUID        NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  plan_type                   VARCHAR(20) NOT NULL
                                CHECK (plan_type IN ('free', 'premium', 'premium_plus')),
  status                      VARCHAR(20) NOT NULL DEFAULT 'active'
                                CHECK (status IN ('active', 'paused', 'cancelled', 'expired')),
  razorpay_subscription_id    VARCHAR(100),
  razorpay_plan_id            VARCHAR(100),
  billing_cycle               VARCHAR(20) DEFAULT 'monthly'
                                CHECK (billing_cycle IN ('monthly', 'yearly')),
  started_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  current_period_start        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  current_period_end          TIMESTAMPTZ NOT NULL,
  cancelled_at                TIMESTAMPTZ,
  created_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id   ON subscriptions (user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status    ON subscriptions (status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_razorpay  ON subscriptions (razorpay_subscription_id);

CREATE TRIGGER set_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();
