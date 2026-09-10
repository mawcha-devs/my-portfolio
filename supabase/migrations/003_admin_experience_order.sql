BEGIN;

ALTER TABLE public.experiences
  ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_experiences_sort_order
ON public.experiences (sort_order, start_date DESC);

COMMIT;
