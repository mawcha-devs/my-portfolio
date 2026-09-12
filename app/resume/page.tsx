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
import {
  getPortfolioData,
  priorEducation,
} from '@/lib/data/portfolio';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Resume',
  description:
    'Online resume for Mawcha Haftu, covering software development experience, projects, skills, education, certifications, and recognition.',
  path: '/resume',
});

export default async function ResumePage() {
  const {
    profile,
    experiences,
    projects,
    skillGroups,
    education,
    certifications,
    achievements,
  } = await getPortfolioData();
  const degree = education[0];

  return (
    <>
      <PageHeader
        eyebrow="Professional"
        title="Resume"
        description="An online resume view of my software development background, project work, technical toolkit, education, and recognition."
      />
      <section className="section-shell pt-0">
        <div className="container-shell space-y-6">
          <Card className="border-primary/25 p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
              <div>
                <p className="eyebrow">
                  Software Developer
                </p>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  {profile.name}
                </h2>
                <p className="mt-3 text-lg text-primary">
                  {profile.role}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {profile.location} · {profile.email}
                </p>
              </div>
              <div className="shrink-0">
                <Button
                  variant="outline"
                  disabled
                  title="Add a verified PDF to enable this action"
                >
                  Download Resume [ADD RESUME PDF]
                </Button>
                <p className="mt-2 text-right text-xs text-muted-foreground">
                  No verified PDF is available yet.
                </p>
              </div>
            </div>
          </Card>

          <section
            className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]"
            id="summary"
          >
            <div>
              <p className="eyebrow">01 · Summary</p>
              <h2 className="section-title">
                Practical software, thoughtfully built.
              </h2>
            </div>
            <p className="text-lg leading-8 text-muted-foreground">
              {profile.summary}
            </p>
          </section>

          <section id="experience">
            <div className="mb-6">
              <p className="eyebrow">02 · Experience</p>
              <h2 className="section-title">
                Professional experience.
              </h2>
            </div>
            <div className="space-y-4">
              {experiences.map((experience) => (
                <Card key={experience.id}>
                  <CardHeader>
                    <div className="flex flex-col justify-between gap-2 sm:flex-row">
                      <div>
                        <CardTitle>
                          {experience.role}
                        </CardTitle>
                        <CardDescription className="mt-1 text-primary">
                          {experience.company} ·{' '}
                          {experience.location}
                        </CardDescription>
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        {experience.period}
                      </span>
                    </div>
                  </CardHeader>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {experience.description}
                  </p>
                </Card>
              ))}
            </div>
          </section>

          <section id="projects">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="eyebrow">03 · Projects</p>
                <h2 className="section-title">
                  Selected project work.
                </h2>
              </div>
              <Link
                href="/projects"
                className="text-sm font-semibold text-primary hover:text-foreground"
              >
                View all projects -&gt;
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {projects.slice(0, 4).map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription className="mt-1 text-primary">
                      {project.type} ·{' '}
                      {project.contribution}
                    </CardDescription>
                  </CardHeader>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {project.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies
                      .slice(0, 5)
                      .map((technology) => (
                        <Badge key={technology}>
                          {technology}
                        </Badge>
                      ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section
            className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]"
            id="skills"
          >
            <div>
              <p className="eyebrow">04 · Skills</p>
              <h2 className="section-title">
                Technical toolkit.
              </h2>
              <Link
                href="/skills"
                className="mt-5 inline-flex"
              >
                <Button variant="outline">
                  View skills
                </Button>
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {skillGroups.map((group) => (
                <Card key={group.title} className="p-5">
                  <h3 className="font-semibold">
                    {group.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section id="education">
            <div className="mb-6">
              <p className="eyebrow">05 · Education</p>
              <h2 className="section-title">
                Academic background.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {degree ? (
                <Card className="border-primary/35 md:col-span-2">
                  <CardHeader>
                    <CardTitle>{degree.degree}</CardTitle>
                    <CardDescription className="mt-1 text-primary">
                      {degree.institution}
                    </CardDescription>
                  </CardHeader>
                  <p className="text-sm text-muted-foreground">
                    Graduated {degree.graduation} · CGPA{' '}
                    {degree.cgpa}
                  </p>
                </Card>
              ) : null}
              {priorEducation.map((item) => (
                <Card key={item.institution}>
                  <CardTitle className="text-lg">
                    {item.institution}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    No dates provided
                  </CardDescription>
                </Card>
              ))}
            </div>
          </section>

          <section id="certifications">
            <div className="mb-6">
              <p className="eyebrow">06 · Certifications</p>
              <h2 className="section-title">
                Continued learning.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {certifications.map((certification) => (
                <Card
                  key={certification.name}
                  className="p-5"
                >
                  <CardTitle className="text-lg">
                    {certification.name}
                  </CardTitle>
                  <CardDescription className="mt-2 text-primary">
                    {certification.issuer}
                  </CardDescription>
                </Card>
              ))}
            </div>
          </section>

          <section id="recognition">
            <div className="mb-6">
              <p className="eyebrow">07 · Recognition</p>
              <h2 className="section-title">
                Leadership and membership.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {achievements.map((achievement) => (
                <Card
                  key={`${achievement.title}-${achievement.period}`}
                  className="p-5"
                >
                  <CardTitle className="text-lg">
                    {achievement.title}
                  </CardTitle>
                  <CardDescription className="mt-2 text-primary">
                    {achievement.organization}
                  </CardDescription>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {achievement.category} ·{' '}
                    {achievement.period}
                  </p>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
