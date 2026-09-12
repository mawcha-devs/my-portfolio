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
  title: 'Certifications',
  description:
    'Professional learning credentials in AI fundamentals, data analytics, Android development, and UI/UX design.',
  path: '/certifications',
});

export default async function CertificationsPage() {
  const { certifications } = await getPortfolioData();

  return (
    <>
      <PageHeader
        eyebrow="Learning"
        title="Certifications"
        description="Focused learning credentials that complement my software development, data, mobile, and design work."
      />
      <section className="section-shell pt-0">
        <div className="container-shell">
          <div className="mb-9 max-w-2xl">
            <p className="eyebrow">Continued learning</p>
            <h2 className="section-title">
              Focused study across technology and design.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {certifications.map((certification, index) => (
              <Card
                key={certification.name}
                className={
                  index === 0
                    ? 'border-primary/35'
                    : undefined
                }
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle>
                        {certification.name}
                      </CardTitle>
                      <CardDescription className="mt-2 text-primary">
                        {certification.issuer}
                      </CardDescription>
                    </div>
                    <Badge>
                      {String(index + 1).padStart(2, '0')}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
