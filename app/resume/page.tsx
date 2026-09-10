import { PageHeader } from '@/components/page-shell';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ResumePage() {
  return (
    <>
      <PageHeader
        eyebrow="Professional"
        title="Resume"
        description="The resume section is ready for a downloadable document or a structured summary view."
      />

      <section className="section-shell pt-0">
        <div className="container-shell">
          <Card className="mx-auto max-w-3xl p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              Resume placeholder
            </h2>
            <p className="mt-4 text-muted-foreground">
              A resume PDF or summary page will be connected
              here when the final portfolio content is
              ready.
            </p>
            <div className="mt-6">
              <Button variant="outline" disabled>
                Download resume [placeholder]
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
