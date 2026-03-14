-- 016_alter_subscriptions_add_pending.sql
-- Add 'pending' and 'cancelling' states to the subscriptions.status CHECK constraint.
-- The initial migration only contained: active | paused | cancelled | expired

ALTER TABLE subscriptions
  DROP CONSTRAINT IF EXISTS subscriptions_status_check;

ALTER TABLE subscriptions
  ADD CONSTRAINT subscriptions_status_check
    CHECK (status IN ('pending', 'active', 'paused', 'cancelling', 'cancelled', 'expired'));
