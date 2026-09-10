BEGIN;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio-assets',
  'portfolio-assets',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "Public can read portfolio assets" ON storage.objects;
CREATE POLICY "Public can read portfolio assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-assets');

DROP POLICY IF EXISTS "Admins can upload portfolio assets" ON storage.objects;
CREATE POLICY "Admins can upload portfolio assets"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'portfolio-assets' AND public.is_admin());

DROP POLICY IF EXISTS "Admins can update portfolio assets" ON storage.objects;
CREATE POLICY "Admins can update portfolio assets"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'portfolio-assets' AND public.is_admin())
WITH CHECK (bucket_id = 'portfolio-assets' AND public.is_admin());

DROP POLICY IF EXISTS "Admins can delete portfolio assets" ON storage.objects;
CREATE POLICY "Admins can delete portfolio assets"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'portfolio-assets' AND public.is_admin());

COMMIT;
