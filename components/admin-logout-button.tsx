'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

export function AdminLogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  async function logout() {
    setLoading(true);
    await fetch('/api/admin/auth/logout', {
      method: 'POST',
    });
    router.replace('/admin/login');
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={loading}
      className="font-medium text-primary hover:text-foreground disabled:opacity-50"
    >
      {loading ? 'Signing out...' : 'Sign out'}
    </button>
  );
}
