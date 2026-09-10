import { redirect } from 'next/navigation';
import { PageHeader } from '@/components/page-shell';
import { Card } from '@/components/ui/card';
import { getAuthSession } from '@/lib/supabase/auth';

export default async function AdminDashboardPage() {
  const { user } = await getAuthSession();
  if (!user) redirect('/admin/login');

  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Dashboard"
        description="A protected workspace for managing portfolio content and reviewing incoming messages."
      />
      <section className="section-shell pt-0">
        <div className="container-shell grid gap-5 md:grid-cols-3">
          <Card>
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
              Projects
            </p>
            <p className="mt-4 text-3xl font-semibold">
              Manage
            </p>
          </Card>
          <Card>
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
              Engineering Notes
            </p>
            <p className="mt-4 text-3xl font-semibold">
              Manage
            </p>
          </Card>
          <Card>
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
              Messages
            </p>
            <p className="mt-4 text-3xl font-semibold">
              Review
            </p>
          </Card>
        </div>
        <div className="container-shell mt-6">
          <Card>
            <p className="text-sm text-muted-foreground">
              Signed in as{' '}
              {user.email ?? 'authenticated user'}.
            </p>
          </Card>
        </div>
      </section>
    </>
  );
}
