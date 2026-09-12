import { PageHeader } from '@/components/page-shell';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getPortfolioData } from '@/lib/data/portfolio';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Recognition',
  description:
    'Recognition and membership records for Mawcha Haftu, including leadership in education sector involvement.',
  path: '/achievements',
});

export default async function AchievementsPage() {
  const { achievements } = await getPortfolioData();

  return (
    <>
      <PageHeader
        eyebrow="Recognition"
        title="Achievements"
        description="Recognition and membership records presented exactly as supplied, without adding unverified awards or claims."
      />
      <section className="section-shell pt-0">
        <div className="container-shell">
          <div className="mb-9 max-w-2xl">
            <p className="eyebrow">Recognition timeline</p>
            <h2 className="section-title">
              Leadership and community involvement.
            </h2>
          </div>
          <div className="relative max-w-4xl space-y-5 before:absolute before:bottom-6 before:left-[0.55rem] before:top-6 before:w-px before:bg-border">
            {achievements.map((achievement, index) => (
              <Card
                key={`${achievement.title}-${achievement.period}`}
                className="relative ml-6 p-6 sm:p-7"
              >
                <span className="absolute -left-[1.72rem] top-8 h-3 w-3 rounded-full border-2 border-background bg-primary ring-4 ring-primary/15" />
                <CardHeader className="mb-5 p-0">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <CardTitle>
                        {achievement.title}
                      </CardTitle>
                      <CardDescription className="mt-2 text-primary">
                        {achievement.organization}
                      </CardDescription>
                    </div>
                    <Badge>{achievement.period}</Badge>
                  </div>
                </CardHeader>
                <p className="text-sm leading-7 text-muted-foreground">
                  {achievement.category}
                </p>
                {index === 0 ? (
                  <p className="mt-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    Recognition
                  </p>
                ) : null}
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
