import { PageHeader } from '@/components/page-shell';
import { AdminSubmitButton } from '@/components/admin-controls';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { uploadCv } from '@/app/admin/actions';

export default function AdminResumePage() {
  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Resume"
        description="Upload the PDF CV used by the download links across the public website."
      />
      <section className="section-shell pt-0">
        <div className="container-shell">
          <Card>
            <CardHeader>
              <CardTitle>Upload CV PDF</CardTitle>
              <CardDescription>
                Uploading a new file replaces the current public CV. PDF files up to 10 MB are accepted.
              </CardDescription>
            </CardHeader>
            <form action={uploadCv} className="space-y-4">
              <input
                aria-label="CV PDF"
                name="cv"
                type="file"
                accept="application/pdf,.pdf"
                required
                className="field"
              />
              <AdminSubmitButton pendingLabel="Uploading...">
                Upload CV
              </AdminSubmitButton>
            </form>
          </Card>
        </div>
      </section>
    </>
  );
}
