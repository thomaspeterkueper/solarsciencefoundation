import { createClient } from '@supabase/supabase-js';

function getPublicSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publicKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publicKey) {
    throw new Error('Missing Supabase public environment variables');
  }

  return { url, publicKey };
}

export function createServerSupabaseClient() {
  const { url, publicKey } = getPublicSupabaseConfig();
  return createClient(url, publicKey);
}

export function createUserScopedSupabaseClient(accessToken: string) {
  const { url, publicKey } = getPublicSupabaseConfig();
  return createClient(url, publicKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
