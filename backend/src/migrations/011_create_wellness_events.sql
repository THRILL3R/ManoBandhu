-- 011_create_wellness_events.sql

CREATE TABLE IF NOT EXISTS wellness_events (
  id              UUID            PRIMARY KEY DEFAULT uuid_generate_v4(),
  title           VARCHAR(255)    NOT NULL,
  description     TEXT,
  organiser_name  VARCHAR(150)    NOT NULL,
  event_type      VARCHAR(30)     NOT NULL
                    CHECK (event_type IN ('workshop', 'webinar', 'retreat', 'meetup', 'class', 'other')),
  city            VARCHAR(100),
  address         TEXT,
  coordinates     POINT,
  start_datetime  TIMESTAMPTZ     NOT NULL,
  end_datetime    TIMESTAMPTZ     NOT NULL,
  price_inr       DECIMAL(10,2)   NOT NULL DEFAULT 0,
  total_capacity  INT             NOT NULL DEFAULT 0,
  booked_count    INT             NOT NULL DEFAULT 0,
  banner_url      TEXT,
  status          VARCHAR(20)     NOT NULL DEFAULT 'draft'
                    CHECK (status IN ('draft', 'published', 'cancelled', 'completed')),
  tags            TEXT[]          NOT NULL DEFAULT '{}',
  created_by      UUID            NOT NULL REFERENCES users (id),
  created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_wellness_events_status         ON wellness_events (status);
CREATE INDEX IF NOT EXISTS idx_wellness_events_start_datetime ON wellness_events (start_datetime);
CREATE INDEX IF NOT EXISTS idx_wellness_events_city           ON wellness_events (city);
CREATE INDEX IF NOT EXISTS idx_wellness_events_tags           ON wellness_events USING GIN (tags);

CREATE TRIGGER set_wellness_events_updated_at
  BEFORE UPDATE ON wellness_events
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TABLE IF NOT EXISTS event_bookings (
  id                    UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id               UUID          NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  event_id              UUID          NOT NULL REFERENCES wellness_events (id) ON DELETE CASCADE,
  razorpay_order_id     VARCHAR(100),
  payment_status        VARCHAR(20)   NOT NULL DEFAULT 'pending'
                          CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  qr_code_url           TEXT,
  booked_at             TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_event_bookings_user_event UNIQUE (user_id, event_id)
);

CREATE INDEX IF NOT EXISTS idx_event_bookings_user_id    ON event_bookings (user_id);
CREATE INDEX IF NOT EXISTS idx_event_bookings_event_id   ON event_bookings (event_id);
CREATE INDEX IF NOT EXISTS idx_event_bookings_payment    ON event_bookings (payment_status);
