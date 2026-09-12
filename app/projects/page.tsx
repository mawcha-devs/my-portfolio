import Link from 'next/link';
import { PageHeader } from '@/components/page-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getPortfolioData } from '@/lib/data/portfolio';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Projects',
  description:
    'Selected mobile, full-stack, backend, and applied machine learning projects by Mawcha Haftu.',
  path: '/projects',
});

function formatStatus(status: string) {
  return status === 'in_progress'
    ? 'In progress'
    : status.replace('_', ' ');
}

export default async function ProjectsPage() {
  const { projects } = await getPortfolioData();
  const featuredProjects = projects.filter((project) =>
    [
      'project-management-system',
      'sheqlee-freelance-marketplace',
      'pharmacy-management-system',
      'tigrigna-fake-news-detection',
    ].includes(project.slug),
  );
  const otherProjects = projects.filter(
    (project) => !featuredProjects.includes(project),
  );

  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Projects"
        description="A focused portfolio of mobile, full-stack, backend, and applied machine learning work. Each project is presented with its scope, contribution, status, and technical context."
      />

      <section className="section-shell pt-0">
        <div className="container-shell">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow">Featured work</p>
            <h2 className="section-title">
              Selected engineering projects.
            </h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <Card
                key={project.slug}
                className={
                  index === 0
                    ? 'border-primary/35'
                    : undefined
                }
              >
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                      {project.category}
                    </span>
                    <Badge>
                      {formatStatus(project.status)}
                    </Badge>
                  </div>
                  <CardTitle className="mt-2">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="leading-6">
                    {project.summary}
                  </CardDescription>
                </CardHeader>
                <div className="flex flex-wrap gap-2">
                  {project.technologies
                    .slice(0, 6)
                    .map((technology) => (
                      <Badge
                        key={technology}
                        className="bg-transparent text-foreground/80"
                      >
                        {technology}
                      </Badge>
                    ))}
                </div>
                <p className="mt-5 border-t border-border pt-4 text-sm leading-6 text-muted-foreground">
                  <span className="font-medium text-foreground">
                    My contribution:
                  </span>{' '}
                  {project.contribution}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={`/projects/${project.slug}`}>
                    <Button>View project</Button>
                  </Link>
                  {project.repository ? (
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button variant="outline">
                        Repository
                      </Button>
                    </a>
                  ) : null}
                  {project.liveDemo ? (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button variant="ghost">
                        Live demo
                      </Button>
                    </a>
                  ) : null}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {otherProjects.length ? (
        <section className="section-shell border-y border-border/70 bg-card/25 pt-0">
          <div className="container-shell">
            <div className="mb-8 max-w-2xl">
              <p className="eyebrow">More work</p>
              <h2 className="section-title">
                Additional project work.
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {otherProjects.map((project) => (
                <Card key={project.slug}>
                  <CardHeader>
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                      {project.category}
                    </span>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>
                      {project.summary}
                    </CardDescription>
                  </CardHeader>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-sm font-semibold text-primary hover:text-foreground"
                  >
                    View project{' '}
                    <span className="ml-2">-&gt;</span>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
