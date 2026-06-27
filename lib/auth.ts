import { createServerSupabaseClient } from './supabase/server';

export async function getSupabaseUserFromRequest(request: Request) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice('Bearer '.length) : null;

  if (!token) return null;

  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) return null;
    return data.user;
  } catch {
    return null;
  }
}

export async function upsertProfile(userId: string, displayName?: string | null) {
  try {
    const supabase = createServerSupabaseClient();
    await supabase.from('profiles').upsert({
      id: userId,
      display_name: displayName ?? null,
      updated_at: new Date().toISOString()
    });
  } catch {
    // Schema may not be pushed yet. Auth should still work as far as possible.
  }
}
