import { NextResponse } from 'next/server';
import {
  authCookieNames,
  authCookieOptions,
  createSupabaseAuthClient,
} from '@/lib/supabase/auth';

export async function POST() {
  const client = createSupabaseAuthClient();
  if (client) await client.auth.signOut();

  const response = NextResponse.json({ ok: true });
  const names = authCookieNames();
  const options = authCookieOptions(0);
  response.cookies.set(names.accessCookie, '', options);
  response.cookies.set(names.refreshCookie, '', options);
  return response;
}
