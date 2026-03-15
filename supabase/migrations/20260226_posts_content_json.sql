-- Migration: convert posts.content to JSONB and ensure slug uniqueness/index

-- Ensure pgcrypto extension available for gen_random_uuid (Supabase usually enables it)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- convert existing HTML/text content to a simple paragraph block
ALTER TABLE posts
    ALTER COLUMN content TYPE jsonb
    USING (
        CASE
            WHEN content IS NULL OR content = '' THEN '[]'::jsonb
            ELSE to_jsonb(array[
                jsonb_build_object(
                    'id', gen_random_uuid(),
                    'type', 'paragraph',
                    'data', jsonb_build_object('text', content)
                )
            ])
        END
    );

-- Add unique constraint on slug if not already present
ALTER TABLE IF EXISTS posts
    ADD CONSTRAINT IF NOT EXISTS posts_slug_unique UNIQUE (slug);

-- Add index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
