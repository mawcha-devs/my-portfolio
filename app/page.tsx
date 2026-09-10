import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getPortfolioData } from '@/lib/data/portfolio';

const featuredProjectSlugs = [
  'project-management-system',
  'sheqlee-freelance-marketplace',
  'pharmacy-management-system',
  'tigrigna-fake-news-detection',
];

const credibilityPoints = [
  {
    label: 'Mobile',
    title: 'Flutter application development',
    description:
      'Practical mobile interfaces, offline-first workflows, local persistence, and team-based delivery.',
  },
  {
    label: 'Full-stack',
    title: 'Product work across the stack',
    description:
      'React.js and Node.js applications supported by REST APIs and database-backed systems.',
  },
  {
    label: 'Systems',
    title: 'Structure that stays understandable',
    description:
      'Clean Architecture, responsive UI, state management, and maintainable implementation decisions.',
  },
];

const engineeringNotes = [
  {
    title: 'Portfolio foundation and engineering decisions',
    description:
      'A structured place for future notes about software architecture, implementation choices, and lessons from project work.',
  },
  {
    title:
      'Mobile development practices and project lessons',
    description:
      'Future technical notes will document practical mobile development workflows and project lessons.',
  },
];

function projectStatus(status: string) {
  if (status === 'in_progress') {
    return 'In progress';
  }

  return status.replace('_', ' ');
}

export default async function HomePage() {
  const {
    profile,
    projects,
    experiences,
    education,
    certifications,
    skillGroups,
  } = await getPortfolioData();
  const featuredProjects = featuredProjectSlugs
    .map((slug) =>
      projects.find((project) => project.slug === slug),
    )
    .filter((project) => project !== undefined);
  const primaryEducation =
    education[0] ?? profile.education;

  return (
    <>
      <section className="section-shell pb-20 pt-16 sm:pt-20 lg:pb-28 lg:pt-28">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-20">
          <div className="reveal">
            <Badge className="mb-5">
              Software Developer
            </Badge>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Mawcha Haftu
              <span className="mt-3 block text-primary">
                builds practical software.
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              A software developer focused on mobile
              development, full-stack applications, backend
              systems, and applied AI/ML work.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/projects">
                <Button size="lg">View Projects</Button>
              </Link>
              <Link href="/resume">
                <Button variant="outline" size="lg">
                  View Resume
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" size="lg">
                  Contact Me
                </Button>
              </Link>
            </div>
          </div>

          <div className="surface reveal reveal-delay-1 relative overflow-hidden p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full border border-primary/20" />
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full border border-primary/20" />
            <p className="eyebrow">Current focus</p>
            <div className="relative space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                  Building with
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    'Flutter',
                    'React.js',
                    'Node.js',
                    'MySQL',
                    'Python',
                  ].map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              </div>
              <div className="border-t border-border pt-6">
                <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                  Based in
                </p>
                <p className="mt-2 text-lg font-semibold">
                  {profile.location}
                </p>
              </div>
              <div className="border-t border-border pt-6">
                <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                  Approach
                </p>
                <p className="mt-2 leading-7 text-muted-foreground">
                  Simple, effective applications with modern
                  design techniques and maintainable
                  engineering practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell border-y border-border/70 bg-card/25">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="eyebrow">Introduction</p>
            <h2 className="section-title">
              A detail-oriented developer who likes useful
              software.
            </h2>
          </div>
          <div className="max-w-3xl">
            <p className="text-lg leading-8 text-muted-foreground">
              {profile.summary}
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex text-sm font-semibold text-primary hover:text-foreground"
            >
              More about my approach{' '}
              <span className="ml-2">-&gt;</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-shell">
          <div className="mb-9 max-w-2xl">
            <p className="eyebrow">Technical credibility</p>
            <h2 className="section-title">
              From interface to implementation.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Experience across the layers that make an
              application useful, understandable, and ready
              to evolve.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {credibilityPoints.map((point, index) => (
              <Card
                key={point.label}
                className={
                  index === 1
                    ? 'border-primary/30'
                    : undefined
                }
              >
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  {point.label}
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">
                  {point.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {point.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-card/25">
        <div className="container-shell">
          <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="section-title">
                Featured projects.
              </h2>
            </div>
            <Link href="/projects">
              <Button variant="outline">
                View all projects
              </Button>
            </Link>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <Card
                key={project.id}
                className={
                  index === 0
                    ? 'border-primary/35'
                    : undefined
                }
              >
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                      {project.type}
                    </span>
                    <Badge>
                      {projectStatus(project.status)}
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
                    .slice(0, 5)
                    .map((technology) => (
                      <Badge
                        key={technology}
                        className="bg-transparent text-foreground/80"
                      >
                        {technology}
                      </Badge>
                    ))}
                </div>
                <p className="mt-5 border-t border-border pt-4 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    Contribution:
                  </span>{' '}
                  {project.contribution}
                </p>
                <Link
                  href={`/projects/${project.slug}`}
                  className="mt-5 inline-flex text-sm font-semibold text-primary hover:text-foreground"
                >
                  View project{' '}
                  <span className="ml-2">-&gt;</span>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="eyebrow">Technical expertise</p>
            <h2 className="section-title">
              Tools for thoughtful delivery.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              A working toolkit shaped by mobile
              development, full-stack application work,
              databases, and applied machine learning.
            </p>
            <Link
              href="/skills"
              className="mt-6 inline-flex"
            >
              <Button variant="outline">
                Explore skills
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {skillGroups.slice(0, 6).map((group) => (
              <Card key={group.title} className="p-5">
                <h3 className="font-semibold">
                  {group.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.slice(0, 6).map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell border-y border-border/70 bg-card/25">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <p className="eyebrow">Experience preview</p>
            <h2 className="section-title">
              Learning through real project work.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Mobile development internships shaped my
              experience with collaboration, requirements,
              implementation, and delivery.
            </p>
            <Link
              href="/experience"
              className="mt-6 inline-flex"
            >
              <Button variant="outline">
                View experience
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {experiences.map((experience) => (
              <Card
                key={experience.id}
                className="p-5 sm:p-6"
              >
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {experience.role}
                    </h3>
                    <p className="mt-1 text-sm text-primary">
                      {experience.company} ·{' '}
                      {experience.location}
                    </p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {experience.period}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {experience.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-shell grid gap-5 lg:grid-cols-2">
          <Card className="p-6 sm:p-8">
            <p className="eyebrow">About preview</p>
            <h2 className="text-2xl font-semibold tracking-tight">
              Practical, detail-oriented, and always
              learning.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              I focus on building simple and effective
              applications with modern design techniques,
              thoughtful structure, and tools that support
              maintainable software.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex"
            >
              <Button variant="outline">
                Read about me
              </Button>
            </Link>
          </Card>
          <Card className="p-6 sm:p-8">
            <p className="eyebrow">
              Education & certifications
            </p>
            <h2 className="text-2xl font-semibold tracking-tight">
              Foundations for continued growth.
            </h2>
            <div className="mt-5 border-t border-border pt-5">
              <p className="font-semibold">
                {primaryEducation.degree}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {primaryEducation.institution}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Graduation: {primaryEducation.graduation} ·
                CGPA: {primaryEducation.cgpa}
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {certifications
                .slice(0, 4)
                .map((certification) => (
                  <Badge key={certification.name}>
                    {certification.name} ·{' '}
                    {certification.issuer}
                  </Badge>
                ))}
            </div>
            <Link
              href="/education"
              className="mt-6 inline-flex"
            >
              <Button variant="outline">
                View education
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      <section className="section-shell border-y border-border/70 bg-card/25">
        <div className="container-shell">
          <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Engineering Notes</p>
              <h2 className="section-title">
                Writing is coming next.
              </h2>
            </div>
            <Link href="/blog">
              <Button variant="outline">Visit notes</Button>
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {engineeringNotes.map((note) => (
              <Card key={note.title} className="p-6">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Draft topic
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">
                  {note.title}
                </h3>
                <p className="mt-3 leading-6 text-muted-foreground">
                  {note.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-shell">
          <div className="surface relative overflow-hidden px-6 py-10 sm:px-10 sm:py-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full border border-primary/20" />
            <div className="relative max-w-3xl">
              <p className="eyebrow">Let&apos;s connect</p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Have a product, problem, or idea to discuss?
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
                I&apos;m open to conversations about
                software development, mobile applications,
                full-stack systems, and opportunities to
                contribute.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/contact">
                  <Button size="lg">Contact Me</Button>
                </Link>
                <a href={`mailto:${profile.email}`}>
                  <Button variant="outline" size="lg">
                    Email Me
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
