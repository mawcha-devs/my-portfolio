BEGIN;

ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS tags text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS published_at timestamptz;

DROP POLICY IF EXISTS "Public can read published blog posts"
ON public.blog_posts;

CREATE POLICY "Public can read published blog posts"
ON public.blog_posts FOR SELECT
USING (published = true AND (published_at IS NULL OR published_at <= now()));

CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at
ON public.blog_posts (published, published_at DESC, created_at DESC);

COMMIT;
