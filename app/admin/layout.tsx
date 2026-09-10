import Link from 'next/link';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { getAuthSession } from '@/lib/supabase/auth';
import { AdminLogoutButton } from '@/components/admin-logout-button';
import { AdminNotice } from '@/components/admin-notice';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { client, user } = await getAuthSession();
  const pathname =
    (await headers()).get('x-pathname') ?? '';
  const isLoginRoute =
    pathname === '/admin/login' ||
    pathname.startsWith('/admin/login?');

  if (!client && !isLoginRoute)
    redirect('/admin/login?error=configuration');

  if (user) {
    const { data: profileData } = await client!
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();
    const profile = profileData as {
      role: 'admin' | 'editor';
    } | null;
    if (
      !profile ||
      !['admin', 'editor'].includes(profile.role)
    )
      redirect('/admin/login?error=unauthorized');
  } else if (!isLoginRoute) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/60">
        <div className="container-shell flex min-h-16 items-center justify-between gap-5">
          <Link
            href="/admin/dashboard"
            className="font-display text-sm font-semibold uppercase tracking-[0.16em]"
          >
            Admin workspace
          </Link>
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link
              href="/admin/dashboard"
              className="hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/blog"
              className="hover:text-foreground"
            >
              Blog
            </Link>
            <Link
              href="/admin/projects"
              className="hover:text-foreground"
            >
              Projects
            </Link>
            <Link
              href="/admin/experience"
              className="hover:text-foreground"
            >
              Experience
            </Link>
            <Link
              href="/admin/messages"
              className="hover:text-foreground"
            >
              Messages
            </Link>
            <AdminLogoutButton />
          </nav>
        </div>
      </div>
      <main>
        <div className="container-shell pt-6">
          <AdminNotice />
        </div>
        {children}
      </main>
    </div>
  );
}
