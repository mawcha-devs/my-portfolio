import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import type { Database } from '@/lib/supabase/types';

const accessCookie = 'portfolio-access-token';
const refreshCookie = 'portfolio-refresh-token';

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && anonKey ? { url, anonKey } : null;
}

export function createSupabaseAuthClient() {
  const config = getSupabaseConfig();
  if (!config) return null;

  return createClient<Database>(
    config.url,
    config.anonKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    },
  );
}

export async function getAuthSession() {
  const client = createSupabaseAuthClient();
  if (!client)
    return { client: null, session: null, user: null };

  const cookieStore = await cookies();
  const accessToken = cookieStore.get(accessCookie)?.value;
  const refreshToken =
    cookieStore.get(refreshCookie)?.value;

  if (!accessToken || !refreshToken) {
    return { client, session: null, user: null };
  }

  const { data, error } = await client.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (error || !data.session) {
    return { client, session: null, user: null };
  }

  return { client, session: data.session, user: data.user };
}

export async function getAuthorizedSupabaseClient() {
  const { client, user } = await getAuthSession();
  if (!client || !user) return null;

  const { data: profileData, error } = await client
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();
  const profile = profileData as {
    role: 'admin' | 'editor';
  } | null;

  if (
    error ||
    !profile ||
    !['admin', 'editor'].includes(profile.role)
  ) {
    return null;
  }

  return client;
}

export function authCookieNames() {
  return { accessCookie, refreshCookie };
}

export function authCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge,
  };
}
