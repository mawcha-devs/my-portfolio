import { PageHeader } from '@/components/page-shell';
import { Card } from '@/components/ui/card';
import { getPortfolioData } from '@/lib/data/portfolio';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'About',
  description:
    'About Mawcha Haftu, a software developer focused on mobile, full-stack, backend, database, and applied AI/ML work.',
  path: '/about',
});

export default async function AboutPage() {
  const { profile, skillGroups } = await getPortfolioData();

  const focusAreas = [
    {
      title: 'Mobile development',
      description:
        'Building Flutter mobile applications and translating UI designs into functional interfaces.',
    },
    {
      title: 'Full-stack development',
      description:
        'Working across React.js frontends, Node.js services, REST APIs, and database-backed workflows.',
    },
    {
      title: 'Backend and databases',
      description:
        'Experience with Node.js, Express.js, MySQL, SQLite, MongoDB, and Mongoose.',
    },
    {
      title: 'AI/ML exposure',
      description:
        'Exposure through NLP, Tigrigna fake news detection, CNN image classification, and Python workflows.',
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Profile"
        title="About"
        description="A detail-oriented software developer interested in solving practical problems with simple, effective, and maintainable software."
      />

      <section className="section-shell pt-0">
        <div className="container-shell space-y-10">
          <Card className="p-6 sm:p-8 lg:p-10">
            <p className="eyebrow">Professional summary</p>
            <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
              <p className="text-xl leading-9 text-muted-foreground">
                {profile.summary}
              </p>
              <div className="border-l border-border pl-6">
                <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                  Engineering lens
                </p>
                <p className="mt-3 text-lg font-semibold leading-7">
                  Clean architecture, maintainable code, and
                  useful interfaces.
                </p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  I enjoy breaking complex requirements into
                  clear, practical software that can be
                  understood and improved over time.
                </p>
              </div>
            </div>
          </Card>

          <div>
            <div className="mb-7 max-w-2xl">
              <p className="eyebrow">What I work with</p>
              <h2 className="section-title">
                A broad foundation with a practical center.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {focusAreas.map((area) => (
                <Card key={area.title}>
                  <h3 className="text-xl font-semibold tracking-tight">
                    {area.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {area.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          <Card>
            <p className="eyebrow">Working principles</p>
            <div className="grid gap-5 sm:grid-cols-3">
              {[
                'Solve the actual problem first.',
                'Prefer clear structure over unnecessary complexity.',
                'Keep learning through real implementation work.',
              ].map((principle) => (
                <div
                  key={principle}
                  className="flex gap-3 text-sm leading-6 text-muted-foreground"
                >
                  <span className="text-primary">+</span>
                  <span>{principle}</span>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex flex-wrap gap-2">
            {skillGroups
              .flatMap((group) => group.items)
              .filter(
                (item, index, items) =>
                  items.indexOf(item) === index,
              )
              .slice(0, 12)
              .map((skill) => (
                <span
                  key={skill}
                  className="text-sm text-muted-foreground"
                >
                  {skill}
                  <span className="mx-2 text-primary">
                    ·
                  </span>
                </span>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
