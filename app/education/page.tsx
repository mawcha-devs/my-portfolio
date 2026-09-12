import { PageHeader } from '@/components/page-shell';
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
  title: 'Education',
  description:
    'Computer science and engineering education, academic background, and earlier school education.',
  path: '/education',
});

export default async function EducationPage() {
  const { education } = await getPortfolioData();
  const degree = education[0];

  return (
    <>
      <PageHeader
        eyebrow="Education"
        title="Education"
        description="Academic foundations in computer science and engineering, together with earlier school education."
      />
      <section className="section-shell pt-0">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="eyebrow">Academic path</p>
            <h2 className="section-title">
              Building the foundations for software
              engineering.
            </h2>
            <p className="mt-5 leading-7 text-muted-foreground">
              My formal education combines computer science
              and engineering study with the earlier school
              education that led to it.
            </p>
          </div>
          <div className="relative space-y-5 before:absolute before:bottom-6 before:left-[0.55rem] before:top-6 before:w-px before:bg-border">
            {degree ? (
              <Card className="relative ml-6 border-primary/35 p-6 sm:p-7">
                <span className="absolute -left-[1.72rem] top-8 h-3 w-3 rounded-full border-2 border-background bg-primary ring-4 ring-primary/15" />
                <CardHeader className="mb-5 p-0">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    Bachelor&apos;s degree
                  </span>
                  <CardTitle>{degree.degree}</CardTitle>
                  <CardDescription className="text-primary">
                    {degree.institution}
                  </CardDescription>
                </CardHeader>
                <div className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em]">
                      Graduation
                    </p>
                    <p className="mt-1 font-medium text-foreground">
                      {degree.graduation}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em]">
                      CGPA
                    </p>
                    <p className="mt-1 font-medium text-foreground">
                      {degree.cgpa}
                    </p>
                  </div>
                </div>
              </Card>
            ) : null}
            {priorEducation.map((item) => (
              <Card
                key={item.institution}
                className="relative ml-6 p-6 sm:p-7"
              >
                <span className="absolute -left-[1.72rem] top-8 h-3 w-3 rounded-full border-2 border-background bg-muted-foreground ring-4 ring-muted" />
                <CardHeader className="mb-0 p-0">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Earlier education
                  </span>
                  <CardTitle>{item.institution}</CardTitle>
                  <CardDescription>
                    No dates provided
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
