import { PageHeader } from '@/components/page-shell';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AdminActionButton,
  AdminSubmitButton,
} from '@/components/admin-controls';
import { getAuthorizedSupabaseClient } from '@/lib/supabase/auth';
import {
  deleteProject,
  saveProject,
  toggleProjectPublished,
} from '@/app/admin/actions';

type Project = {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  description: string;
  status: string;
  contribution_type: string;
  repository_url: string | null;
  live_url: string | null;
  published: boolean;
  featured: boolean;
  screenshots: string[];
};

function ProjectForm({ project }: { project?: Project }) {
  return (
    <form
      action={saveProject}
      className="grid gap-3 md:grid-cols-2"
    >
      {project ? (
        <input type="hidden" name="id" value={project.id} />
      ) : null}
      <input
        name="title"
        aria-label="Project title"
        required
        defaultValue={project?.title}
        placeholder="Title"
        className="field"
      />
      <input
        name="slug"
        aria-label="Project slug"
        required
        defaultValue={project?.slug}
        placeholder="Slug"
        className="field"
      />
      <input
        name="short_description"
        aria-label="Short project description"
        defaultValue={project?.short_description ?? ''}
        placeholder="Short description"
        className="field md:col-span-2"
      />
      <textarea
        name="description"
        aria-label="Project description"
        required
        defaultValue={project?.description}
        placeholder="Description"
        className="field min-h-28 md:col-span-2"
      />
      <select
        name="status"
        aria-label="Project status"
        defaultValue={project?.status ?? 'draft'}
        className="field"
      >
        <option value="draft">Draft</option>
        <option value="in_progress">In progress</option>
        <option value="completed">Completed</option>
        <option value="planned">Planned</option>
      </select>
      <select
        name="contribution_type"
        aria-label="Contribution type"
        defaultValue={
          project?.contribution_type ?? 'individual'
        }
        className="field"
      >
        <option value="individual">Individual</option>
        <option value="team">Team</option>
        <option value="group">Group</option>
        <option value="mixed">Mixed</option>
      </select>
      <input
        name="repository_url"
        aria-label="Repository URL"
        defaultValue={project?.repository_url ?? ''}
        placeholder="Repository URL"
        className="field"
      />
      <input
        name="live_url"
        aria-label="Live demo URL"
        defaultValue={project?.live_url ?? ''}
        placeholder="Verified live URL only"
        className="field"
      />
      <input
        name="technologies"
        aria-label="Project technologies"
        placeholder="Technologies, comma separated"
        className="field md:col-span-2"
      />
      <textarea
        name="features"
        aria-label="Project features"
        placeholder="Features, one per line"
        className="field min-h-24 md:col-span-2"
      />
      <textarea
        name="screenshots"
        aria-label="Screenshot URLs"
        defaultValue={project?.screenshots.join('\n')}
        placeholder="Screenshot URLs, one per line"
        className="field min-h-20 md:col-span-2"
      />
      <label className="text-sm text-muted-foreground md:col-span-2">
        Upload screenshots (JPEG, PNG, WebP, or AVIF; up to
        5 MB each)
          <input
            aria-label="Upload project screenshots"
          name="screenshot_files"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          multiple
          className="field mt-2"
        />
      </label>
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <label>
          <input
            type="checkbox"
            name="published"
            defaultChecked={project?.published}
          />{' '}
          Published
        </label>
        <label>
          <input
            type="checkbox"
            name="featured"
            defaultChecked={project?.featured}
          />{' '}
          Featured
        </label>
      </div>
      <div className="md:justify-self-end">
        <AdminSubmitButton>
          {project ? 'Update project' : 'Create project'}
        </AdminSubmitButton>
      </div>
    </form>
  );
}

export default async function AdminProjectsPage() {
  const client = await getAuthorizedSupabaseClient();
  const { data } = client
    ? await client
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
    : { data: null };
  const projects = (data ?? []) as Project[];
  const { data: screenshotRows } = client
    ? await client
        .from('project_screenshots')
        .select('project_id, image_url')
        .order('sort_order', { ascending: true })
    : { data: null };
  const screenshots = (screenshotRows ?? []) as Array<{
    project_id: string;
    image_url: string;
  }>;
  for (const project of projects)
    project.screenshots = screenshots
      .filter((item) => item.project_id === project.id)
      .map((item) => item.image_url);
  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Projects"
        description="Create, edit, publish, and manage project relationships from one protected workspace."
      />
      <section className="section-shell pt-0">
        <div className="container-shell space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create project</CardTitle>
              <CardDescription>
                Technology, feature, and screenshot lists
                are synchronized when saved.
              </CardDescription>
            </CardHeader>
            <ProjectForm />
          </Card>
          {projects.length ? (
            projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>
                        {project.slug}
                      </CardDescription>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {project.published
                        ? 'Published'
                        : 'Draft'}
                    </span>
                  </div>
                </CardHeader>
                <ProjectForm project={project} />
                <div className="mt-4 flex flex-wrap gap-3">
                  <form action={toggleProjectPublished}>
                    <input
                      type="hidden"
                      name="id"
                      value={project.id}
                    />
                    <input
                      type="hidden"
                      name="published"
                      value={String(project.published)}
                    />
                    <AdminActionButton>
                      {project.published
                        ? 'Unpublish'
                        : 'Publish'}
                    </AdminActionButton>
                  </form>
                  <form action={deleteProject}>
                    <input
                      type="hidden"
                      name="id"
                      value={project.id}
                    />
                    <AdminActionButton
                      confirmMessage={`Delete ${project.title}? This cannot be undone.`}
                    >
                      Delete project
                    </AdminActionButton>
                  </form>
                </div>
              </Card>
            ))
          ) : (
            <Card>
              <p className="text-muted-foreground">
                No projects found. Create the first project
                above.
              </p>
            </Card>
          )}
        </div>
      </section>
    </>
  );
}
