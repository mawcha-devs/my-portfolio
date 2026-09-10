import { NextResponse } from 'next/server';
import {
  authCookieNames,
  authCookieOptions,
  createSupabaseAuthClient,
} from '@/lib/supabase/auth';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: unknown;
      password?: unknown;
    };
    const email =
      typeof body.email === 'string'
        ? body.email.trim().toLowerCase()
        : '';
    const password =
      typeof body.password === 'string'
        ? body.password
        : '';

    if (
      !email ||
      !password ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { error: 'Enter a valid email and password.' },
        { status: 400 },
      );
    }

    const client = createSupabaseAuthClient();
    if (!client) {
      return NextResponse.json(
        { error: 'Authentication is not configured yet.' },
        { status: 503 },
      );
    }

    const { data, error } =
      await client.auth.signInWithPassword({
        email,
        password,
      });
    if (error || !data.session || !data.user) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 },
      );
    }

    const { data: profileData, error: profileError } =
      await client
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .maybeSingle();
    const profile = profileData as {
      role: 'admin' | 'editor';
    } | null;

    if (
      profileError ||
      !profile ||
      !['admin', 'editor'].includes(profile.role)
    ) {
      await client.auth.signOut();
      return NextResponse.json(
        {
          error:
            'This account is not authorized for admin access.',
        },
        { status: 403 },
      );
    }

    const response = NextResponse.json({ ok: true });
    const names = authCookieNames();
    const options = authCookieOptions(60 * 60 * 8);
    response.cookies.set(
      names.accessCookie,
      data.session.access_token,
      options,
    );
    response.cookies.set(
      names.refreshCookie,
      data.session.refresh_token,
      options,
    );
    return response;
  } catch {
    return NextResponse.json(
      { error: 'Unable to sign in right now.' },
      { status: 400 },
    );
  }
}
