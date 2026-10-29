BEGIN;

UPDATE storage.buckets
SET file_size_limit = 10485760,
    allowed_mime_types = ARRAY[
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/avif',
      'application/pdf'
    ]
WHERE id = 'portfolio-assets';

COMMIT;
