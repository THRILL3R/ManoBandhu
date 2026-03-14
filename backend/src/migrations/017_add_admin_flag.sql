-- 017_add_admin_flag.sql
-- Add is_admin boolean column to users table for admin role checks

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT false;

COMMENT ON COLUMN users.is_admin IS 'True for platform administrators; checked by requireRole(admin) middleware';

-- Optionally add an index to quickly find admin users
CREATE INDEX IF NOT EXISTS idx_users_is_admin ON users (is_admin) WHERE is_admin = true;
