import { createClient } from '@supabase/supabase-js';

function getPublicSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error('Missing Supabase public environment variables');
  }

  return { url, anonKey };
}

export function createServerSupabaseClient() {
  const { url, anonKey } = getPublicSupabaseConfig();
  return createClient(url, anonKey);
}

export function createUserScopedSupabaseClient(accessToken: string) {
  const { url, anonKey } = getPublicSupabaseConfig();
  return createClient(url, anonKey, {
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
