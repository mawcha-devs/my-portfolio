'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function AdminAuthForm() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  async function submit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        '/api/admin/auth/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        },
      );
      const result = (await response.json()) as {
        error?: string;
      };
      if (!response.ok) {
        setError(result.error ?? 'Unable to sign in.');
        return;
      }
      router.replace('/admin/dashboard');
      router.refresh();
    } catch {
      setError(
        'Unable to reach the authentication service.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-5"
      noValidate
    >
      <div>
        <label
          htmlFor="admin-email"
          className="mb-2 block text-sm font-medium"
        >
          Email
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="field"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label
          htmlFor="admin-password"
          className="mb-2 block text-sm font-medium"
        >
          Password
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          className="field"
          placeholder="Your password"
        />
      </div>
      {error ? (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      ) : null}
      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  );
}
