-- 015_alter_diary_entries_add_media.sql
-- Add content_type, media_url, media_key columns to diary_entries (missing from initial schema)

ALTER TABLE diary_entries
  ADD COLUMN IF NOT EXISTS content_type VARCHAR(20) NOT NULL DEFAULT 'text'
    CHECK (content_type IN ('text','voice','drawing','image','mixed')),
  ADD COLUMN IF NOT EXISTS media_url  TEXT,
  ADD COLUMN IF NOT EXISTS media_key  TEXT;

COMMENT ON COLUMN diary_entries.content_type IS 'Type of diary entry: text | voice | drawing | image | mixed';
COMMENT ON COLUMN diary_entries.media_url     IS 'Public/CDN URL of attached media';
COMMENT ON COLUMN diary_entries.media_key     IS 'S3 object key — used for deletion via BullMQ';
