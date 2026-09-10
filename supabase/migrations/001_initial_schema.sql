BEGIN;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  email text,
  role text NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  category text NOT NULL,
  description text,
  sort_order integer NOT NULL DEFAULT 0,
  is_featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  short_description text,
  description text NOT NULL,
  status text NOT NULL CHECK (status IN ('draft', 'in_progress', 'completed', 'planned')),
  published boolean NOT NULL DEFAULT false,
  featured boolean NOT NULL DEFAULT false,
  repository_url text,
  live_url text,
  contribution_type text NOT NULL DEFAULT 'individual' CHECK (contribution_type IN ('individual', 'team', 'mixed', 'group')),
  start_date date,
  end_date date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.project_technologies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  skill_id uuid NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (project_id, skill_id)
);

CREATE TABLE IF NOT EXISTS public.project_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (project_id, sort_order)
);

CREATE TABLE IF NOT EXISTS public.project_screenshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  alt_text text,
  caption text,
  is_cover boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (project_id, sort_order)
);

CREATE TABLE IF NOT EXISTS public.experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  role text NOT NULL,
  location text,
  start_date date,
  end_date date,
  is_current boolean NOT NULL DEFAULT false,
  description text NOT NULL,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_name text NOT NULL,
  program_name text NOT NULL,
  degree text,
  location text,
  graduation_date date,
  cgpa text,
  description text,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  issuer text NOT NULL,
  credential_type text NOT NULL DEFAULT 'certificate',
  description text,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  organization text NOT NULL,
  category text NOT NULL,
  period text,
  description text,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text,
  content text NOT NULL,
  cover_image_url text,
  tags text[] NOT NULL DEFAULT '{}',
  published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
      AND role = 'admin'
  );
$$;

CREATE TRIGGER set_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_skills_updated_at
BEFORE UPDATE ON public.skills
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_project_technologies_updated_at
BEFORE UPDATE ON public.project_technologies
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_project_features_updated_at
BEFORE UPDATE ON public.project_features
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_project_screenshots_updated_at
BEFORE UPDATE ON public.project_screenshots
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_experiences_updated_at
BEFORE UPDATE ON public.experiences
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_education_updated_at
BEFORE UPDATE ON public.education
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_certifications_updated_at
BEFORE UPDATE ON public.certifications
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_achievements_updated_at
BEFORE UPDATE ON public.achievements
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_contact_messages_updated_at
BEFORE UPDATE ON public.contact_messages
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_screenshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published projects"
ON public.projects FOR SELECT
USING (published = true);

CREATE POLICY "Public can read published skills"
ON public.skills FOR SELECT
USING (true);

CREATE POLICY "Public can read published project technologies"
ON public.project_technologies FOR SELECT
USING (TRUE);

CREATE POLICY "Public can read project features for published projects"
ON public.project_features FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.projects p
    WHERE p.id = project_features.project_id
      AND p.published = true
  )
);

CREATE POLICY "Public can read screenshots for published projects"
ON public.project_screenshots FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.projects p
    WHERE p.id = project_screenshots.project_id
      AND p.published = true
  )
);

CREATE POLICY "Public can read published experiences"
ON public.experiences FOR SELECT
USING (published = true);

CREATE POLICY "Public can read published education"
ON public.education FOR SELECT
USING (published = true);

CREATE POLICY "Public can read published certifications"
ON public.certifications FOR SELECT
USING (published = true);

CREATE POLICY "Public can read published achievements"
ON public.achievements FOR SELECT
USING (published = true);

CREATE POLICY "Public can read published blog posts"
ON public.blog_posts FOR SELECT
USING (published = true AND (published_at IS NULL OR published_at <= now()));

CREATE POLICY "Public can submit contact messages"
ON public.contact_messages FOR INSERT
WITH CHECK (true);

CREATE POLICY "Authenticated users can read own profile"
ON public.profiles FOR SELECT
USING (id = auth.uid());

CREATE POLICY "Admin can manage all profile rows"
ON public.profiles FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admin can manage all skills"
ON public.skills FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admin can manage all projects"
ON public.projects FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admin can manage all project technologies"
ON public.project_technologies FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admin can manage all project features"
ON public.project_features FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admin can manage all screenshots"
ON public.project_screenshots FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admin can manage all experiences"
ON public.experiences FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admin can manage all education"
ON public.education FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admin can manage all certifications"
ON public.certifications FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admin can manage all achievements"
ON public.achievements FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admin can manage all blog posts"
ON public.blog_posts FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admin can manage all contact messages"
ON public.contact_messages FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE INDEX IF NOT EXISTS idx_projects_published_featured
ON public.projects (published, featured, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_projects_slug
ON public.projects (slug);

CREATE INDEX IF NOT EXISTS idx_skills_category
ON public.skills (category, sort_order);

CREATE INDEX IF NOT EXISTS idx_project_technologies_project
ON public.project_technologies (project_id);

CREATE INDEX IF NOT EXISTS idx_project_features_project
ON public.project_features (project_id, sort_order);

CREATE INDEX IF NOT EXISTS idx_project_screenshots_project
ON public.project_screenshots (project_id, is_cover, sort_order);

CREATE INDEX IF NOT EXISTS idx_experiences_published
ON public.experiences (published, start_date DESC);

CREATE INDEX IF NOT EXISTS idx_education_published
ON public.education (published, graduation_date DESC);

CREATE INDEX IF NOT EXISTS idx_certifications_published
ON public.certifications (published, name);

CREATE INDEX IF NOT EXISTS idx_achievements_published
ON public.achievements (published, category);

CREATE INDEX IF NOT EXISTS idx_blog_posts_published_slug
ON public.blog_posts (published, slug);

CREATE INDEX IF NOT EXISTS idx_contact_messages_read_created
ON public.contact_messages (is_read, created_at DESC);

COMMIT;
