import { PageHeader } from '@/components/page-shell';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getPortfolioData } from '@/lib/data/portfolio';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Experience',
  description:
    'Mobile application development experience, internships, collaboration, and practical software engineering work by Mawcha Haftu.',
  path: '/experience',
});

export default async function ExperiencePage() {
  const { experiences } = await getPortfolioData();

  return (
    <>
      <PageHeader
        eyebrow="Career"
        title="Experience"
        description="A record of mobile-development work, team collaboration, and practical software engineering exposure."
      />

      <section className="section-shell pt-0">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="eyebrow">Practical experience</p>
            <h2 className="section-title">
              Learning through real team-based work.
            </h2>
            <p className="mt-5 leading-7 text-muted-foreground">
              My experience has centered on mobile
              application development, UI implementation,
              collaboration, and working through practical
              development challenges.
            </p>
          </div>

          <div className="relative space-y-5 before:absolute before:bottom-6 before:left-[0.55rem] before:top-6 before:w-px before:bg-border">
            {experiences.map((experience) => (
              <Card
                key={`${experience.company}-${experience.period}`}
                className="relative ml-6 p-6 sm:p-7"
              >
                <span className="absolute -left-[1.72rem] top-8 h-3 w-3 rounded-full border-2 border-background bg-primary ring-4 ring-primary/15" />
                <CardHeader className="mb-5 p-0">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <CardTitle>
                        {experience.role}
                      </CardTitle>
                      <CardDescription className="mt-2 text-primary">
                        {experience.company} ·{' '}
                        {experience.location}
                      </CardDescription>
                    </div>
                    <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
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
        </div>
      </section>
    </>
  );
}
