import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PageHeader } from '@/components/page-shell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getPortfolioData } from '@/lib/data/portfolio';
import { createPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { projects } = await getPortfolioData();
  const project = projects.find(
    (item) => item.slug === slug,
  );
  if (!project) return {};

  return createPageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: project.screenshots[0] ?? null,
  });
}

function formatStatus(status: string) {
  return status === 'in_progress'
    ? 'In progress'
    : status.replace('_', ' ');
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { projects } = await getPortfolioData();
  const project = projects.find(
    (item) => item.slug === slug,
  );

  if (!project) {
    notFound();
  }

  return (
    <>
      <PageHeader
        eyebrow={project.category}
        title={project.title}
        description={project.summary}
      />

      <section className="section-shell pt-0">
        <div className="container-shell space-y-5">
          <Card className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{formatStatus(project.status)}</Badge>
              {project.technologies.map((technology) => (
                <Badge
                  key={technology}
                  className="bg-transparent text-foreground/80"
                >
                  {technology}
                </Badge>
              ))}
            </div>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">
              {project.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {project.repository ? (
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button>View repository</Button>
                </a>
              ) : null}
              {project.liveDemo ? (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="outline">
                    View live demo
                  </Button>
                </a>
              ) : null}
            </div>
          </Card>

          <div className="grid gap-5 lg:grid-cols-2">
            <Card>
              <p className="eyebrow">
                01 · Project overview
              </p>
              <p className="leading-7 text-muted-foreground">
                {project.summary}
              </p>
            </Card>
            <Card>
              <p className="eyebrow">
                02 · Problem / purpose
              </p>
              <p className="leading-7 text-muted-foreground">
                {project.purpose}
              </p>
            </Card>
            <Card>
              <p className="eyebrow">03 · My role</p>
              <p className="leading-7 text-muted-foreground">
                {project.contribution}
              </p>
            </Card>
            <Card>
              <p className="eyebrow">04 · Architecture</p>
              <p className="leading-7 text-muted-foreground">
                {project.architecture}
              </p>
            </Card>
          </div>

          <Card>
            <p className="eyebrow">05 · Technology stack</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <Badge key={technology}>{technology}</Badge>
              ))}
            </div>
          </Card>

          <div className="grid gap-5 lg:grid-cols-2">
            <Card>
              <p className="eyebrow">06 · Key features</p>
              <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span className="text-primary">+</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <p className="eyebrow">
                07 · Engineering decisions
              </p>
              <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
                {project.engineeringDecisions.map(
                  (decision) => (
                    <li
                      key={decision}
                      className="flex gap-3"
                    >
                      <span className="text-primary">
                        +
                      </span>
                      <span>{decision}</span>
                    </li>
                  ),
                )}
              </ul>
            </Card>
          </div>

          <Card>
            <p className="eyebrow">08 · Challenges</p>
            <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
              {project.challenges.map((challenge) => (
                <li key={challenge} className="flex gap-3">
                  <span className="text-primary">+</span>
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <p className="eyebrow">09 · Current status</p>
            <p className="text-lg font-semibold capitalize">
              {formatStatus(project.status)}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {project.status === 'in_progress'
                ? 'The project is still in progress. Pending integration work is called out above rather than presented as complete.'
                : 'This project is presented as completed based on the available project information.'}
            </p>
          </Card>

          <Card>
            <p className="eyebrow">10 · Screenshots</p>
            {project.screenshots.length ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {project.screenshots.map((screenshot) => (
                  <Image
                    key={screenshot}
                    src={screenshot}
                    alt={`${project.title} screenshot`}
                    className="rounded-lg border border-border"
                    width={1200}
                    height={800}
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-border bg-muted/40 p-6 text-sm leading-6 text-muted-foreground">
                Screenshots are not available for this
                project yet. No image has been fabricated.
              </div>
            )}
          </Card>

          <div className="grid gap-5 sm:grid-cols-2">
            <Card>
              <p className="eyebrow">11 · Repository</p>
              {project.repository ? (
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all text-sm font-semibold text-primary hover:text-foreground"
                >
                  {project.repository}
                </a>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Repository link not available.
                </p>
              )}
            </Card>
            <Card>
              <p className="eyebrow">12 · Live demo</p>
              {project.liveDemo ? (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all text-sm font-semibold text-primary hover:text-foreground"
                >
                  {project.liveDemo}
                </a>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No verified live demo is available.
                </p>
              )}
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
