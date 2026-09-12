import { PageHeader } from '@/components/page-shell';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AdminActionButton,
  AdminSubmitButton,
} from '@/components/admin-controls';
import { getAuthorizedSupabaseClient } from '@/lib/supabase/auth';
import {
  deleteTestimonial,
  saveTestimonial,
  toggleTestimonialPublished,
} from '@/app/admin/actions';

type Testimonial = {
  id: string;
  quote: string;
  author_name: string;
  author_role: string | null;
  organization: string | null;
  avatar_url: string | null;
  published: boolean;
  sort_order: number;
};

function TestimonialForm({
  testimonial,
}: {
  testimonial?: Testimonial;
}) {
  return (
    <form
      action={saveTestimonial}
      className="grid gap-3 md:grid-cols-2"
    >
      {testimonial ? (
        <input
          type="hidden"
          name="id"
          value={testimonial.id}
        />
      ) : null}
      <textarea
        aria-label="Testimonial quote"
        name="quote"
        required
        defaultValue={testimonial?.quote}
        placeholder="Verified testimonial quote"
        className="field min-h-28 md:col-span-2"
      />
      <input
        aria-label="Author name"
        name="author_name"
        required
        defaultValue={testimonial?.author_name}
        placeholder="Author name"
        className="field"
      />
      <input
        aria-label="Author role"
        name="author_role"
        defaultValue={testimonial?.author_role ?? ''}
        placeholder="Role"
        className="field"
      />
      <input
        aria-label="Organization"
        name="organization"
        defaultValue={testimonial?.organization ?? ''}
        placeholder="Organization"
        className="field"
      />
      <input
        aria-label="Avatar URL"
        name="avatar_url"
        defaultValue={testimonial?.avatar_url ?? ''}
        placeholder="Optional avatar URL"
        className="field"
      />
      <input
        aria-label="Testimonial sort order"
        name="sort_order"
        type="number"
        defaultValue={testimonial?.sort_order ?? 0}
        className="field"
      />
      <label className="text-sm text-muted-foreground">
        <input
          type="checkbox"
          name="published"
          defaultChecked={testimonial?.published}
        />{' '}
        Published
      </label>
      <div className="md:justify-self-end">
        <AdminSubmitButton>
          {testimonial
            ? 'Update testimonial'
            : 'Save testimonial'}
        </AdminSubmitButton>
      </div>
    </form>
  );
}

export default async function AdminTestimonialsPage() {
  const client = await getAuthorizedSupabaseClient();
  const { data } = client
    ? await client
        .from('testimonials')
        .select('*')
        .order('sort_order', { ascending: true })
    : { data: null };
  const testimonials = (data ?? []) as Testimonial[];
  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Testimonials"
        description="Add verified feedback from collaborators or clients. Nothing is published until explicitly approved."
      />
      <section className="section-shell pt-0">
        <div className="container-shell space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add testimonial</CardTitle>
              <CardDescription>
                Only enter real, permissioned feedback. No
                placeholder quotes are seeded.
              </CardDescription>
            </CardHeader>
            <TestimonialForm />
          </Card>
          {testimonials.length ? (
            testimonials.map((testimonial) => (
              <Card key={testimonial.id}>
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <CardTitle>
                        {testimonial.author_name}
                      </CardTitle>
                      <CardDescription>
                        {[
                          testimonial.author_role,
                          testimonial.organization,
                        ]
                          .filter(Boolean)
                          .join(' · ')}
                      </CardDescription>
                    </div>
                    <Badge>
                      {testimonial.published
                        ? 'Published'
                        : 'Draft'}
                    </Badge>
                  </div>
                </CardHeader>
                <p className="mb-5 leading-7 text-muted-foreground">
                  “{testimonial.quote}”
                </p>
                <TestimonialForm
                  testimonial={testimonial}
                />
                <div className="mt-4 flex flex-wrap gap-3">
                  <form action={toggleTestimonialPublished}>
                    <input
                      type="hidden"
                      name="id"
                      value={testimonial.id}
                    />
                    <input
                      type="hidden"
                      name="published"
                      value={String(testimonial.published)}
                    />
                    <AdminActionButton>
                      {testimonial.published
                        ? 'Unpublish'
                        : 'Publish'}
                    </AdminActionButton>
                  </form>
                  <form action={deleteTestimonial}>
                    <input
                      type="hidden"
                      name="id"
                      value={testimonial.id}
                    />
                    <AdminActionButton confirmMessage="Delete this testimonial?">
                      Delete testimonial
                    </AdminActionButton>
                  </form>
                </div>
              </Card>
            ))
          ) : (
            <Card>
              <p className="text-muted-foreground">
                No testimonials yet. The public placeholder
                will remain visible.
              </p>
            </Card>
          )}
        </div>
      </section>
    </>
  );
}
