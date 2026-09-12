import { PageHeader } from '@/components/page-shell';
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
  deleteExperience,
  reorderExperience,
  saveExperience,
} from '@/app/admin/actions';

type Experience = {
  id: string;
  company_name: string;
  role: string;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  description: string;
  published: boolean;
  sort_order: number;
};
function ExperienceForm({ item }: { item?: Experience }) {
  return (
    <form
      action={saveExperience}
      className="grid gap-3 md:grid-cols-2"
    >
      {item ? (
        <input type="hidden" name="id" value={item.id} />
      ) : null}
      <input
        aria-label="Company name"
        name="company_name"
        required
        defaultValue={item?.company_name}
        placeholder="Company"
        className="field"
      />
      <input
        aria-label="Role"
        name="role"
        required
        defaultValue={item?.role}
        placeholder="Role"
        className="field"
      />
      <input
        aria-label="Location"
        name="location"
        defaultValue={item?.location ?? ''}
        placeholder="Location"
        className="field"
      />
      <input
        aria-label="Sort order"
        name="sort_order"
        type="number"
        defaultValue={item?.sort_order ?? 0}
        placeholder="Order"
        className="field"
      />
      <input
        aria-label="Start date"
        name="start_date"
        type="date"
        defaultValue={item?.start_date ?? ''}
        className="field"
      />
      <input
        aria-label="End date"
        name="end_date"
        type="date"
        defaultValue={item?.end_date ?? ''}
        className="field"
      />
      <textarea
        aria-label="Experience description"
        name="description"
        required
        defaultValue={item?.description}
        placeholder="Responsibilities and work completed"
        className="field min-h-28 md:col-span-2"
      />
      <label className="text-sm text-muted-foreground">
        <input
          type="checkbox"
          name="published"
          defaultChecked={item?.published ?? true}
        />{' '}
        Published
      </label>
      <div className="md:justify-self-end">
        <AdminSubmitButton>
          {item ? 'Update experience' : 'Create experience'}
        </AdminSubmitButton>
      </div>
    </form>
  );
}
export default async function AdminExperiencePage() {
  const client = await getAuthorizedSupabaseClient();
  const { data } = client
    ? await client
        .from('experiences')
        .select('*')
        .order('sort_order', { ascending: true })
    : { data: null };
  const items = (data ?? []) as Experience[];
  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Experience"
        description="Create, edit, delete, publish, and reorder experience entries."
      />
      <section className="section-shell pt-0">
        <div className="container-shell space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create experience</CardTitle>
              <CardDescription>
                Use order numbers to control the public
                timeline.
              </CardDescription>
            </CardHeader>
            <ExperienceForm />
          </Card>
          {items.length ? (
            <form
              action={reorderExperience}
              className="space-y-4"
            >
              <input
                type="hidden"
                name="ids"
                value={items
                  .map((item) => item.id)
                  .join(',')}
              />
              <p className="text-sm text-muted-foreground">
                Current order:{' '}
                {items
                  .map((item) => item.company_name)
                  .join(' -> ')}
              </p>
              <AdminSubmitButton pendingLabel="Reordering...">
                Save order
              </AdminSubmitButton>
            </form>
          ) : null}
          {items.length ? (
            items.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle>{item.role}</CardTitle>
                  <CardDescription>
                    {item.company_name} · {item.location}
                  </CardDescription>
                </CardHeader>
                <ExperienceForm item={item} />
                <form
                  action={deleteExperience}
                  className="mt-4"
                >
                  <input
                    type="hidden"
                    name="id"
                    value={item.id}
                  />
                  <AdminActionButton
                    confirmMessage={`Delete ${item.role} at ${item.company_name}?`}
                  >
                    Delete experience
                  </AdminActionButton>
                </form>
              </Card>
            ))
          ) : (
            <Card>
              <p className="text-muted-foreground">
                No experience entries yet.
              </p>
            </Card>
          )}
        </div>
      </section>
    </>
  );
}
