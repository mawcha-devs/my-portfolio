import { redirect } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { AdminAuthForm } from '@/components/admin-auth-form';
import { getAuthSession } from '@/lib/supabase/auth';

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({
  searchParams,
}: LoginPageProps) {
  const { user } = await getAuthSession();
  if (user) redirect('/admin/dashboard');
  const { error } = await searchParams;
  const message =
    error === 'unauthorized'
      ? 'This account is not authorized for admin access.'
      : error === 'configuration'
        ? 'Authentication is not configured yet.'
        : '';

  return (
    <section className="section-shell min-h-[calc(100vh-4rem)] pt-16">
      <div className="container-shell">
        <Card className="mx-auto max-w-md p-7 sm:p-9">
          <p className="eyebrow">Admin access</p>
          <h1 className="text-3xl font-semibold tracking-tight">
            Sign in to the workspace
          </h1>
          <p className="mt-3 leading-7 text-muted-foreground">
            Use your approved Supabase Auth account. No
            credentials are stored in this application.
          </p>
          {message ? (
            <p
              role="alert"
              className="mt-5 text-sm text-danger"
            >
              {message}
            </p>
          ) : null}
          <div className="mt-7">
            <AdminAuthForm />
          </div>
        </Card>
      </div>
    </section>
  );
}
