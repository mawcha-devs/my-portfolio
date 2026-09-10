import { PageHeader } from '@/components/page-shell';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getPortfolioData } from '@/lib/data/portfolio';

export default async function SkillsPage() {
  const { skillGroups } = await getPortfolioData();

  return (
    <>
      <PageHeader
        eyebrow="Capabilities"
        title="Skills"
        description="A categorized view of the technologies and engineering practices I have worked with across mobile, full-stack, backend, database, and machine learning projects."
      />

      <section className="section-shell pt-0">
        <div className="container-shell">
          <div className="mb-9 max-w-2xl">
            <p className="eyebrow">Technical toolkit</p>
            <h2 className="section-title">
              Organized by how I use it.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              These are tools and practices from my project
              work. No artificial proficiency scores,
              rankings, or percentage bars.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, index) => (
              <Card
                key={group.title}
                className={
                  index === 0
                    ? 'border-primary/35'
                    : undefined
                }
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl font-semibold tracking-tight">
                    {group.title}
                  </h2>
                  <span className="text-xs font-semibold text-primary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
