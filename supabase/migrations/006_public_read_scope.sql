BEGIN;

DROP POLICY IF EXISTS "Public can read published skills" ON public.skills;
CREATE POLICY "Public can read published skills"
ON public.skills FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.project_technologies pt
    JOIN public.projects p ON p.id = pt.project_id
    WHERE pt.skill_id = skills.id
      AND p.published = true
  )
  OR is_featured = true
);

DROP POLICY IF EXISTS "Public can read published project technologies" ON public.project_technologies;
CREATE POLICY "Public can read published project technologies"
ON public.project_technologies FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.projects p
    WHERE p.id = project_technologies.project_id
      AND p.published = true
  )
);

COMMIT;