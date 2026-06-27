import { createServerSupabaseClient } from './supabase/server';

export function getBearerTokenFromRequest(request: Request) {
  const authHeader = request.headers.get('authorization');
  return authHeader?.startsWith('Bearer ') ? authHeader.slice('Bearer '.length) : null;
}

export async function getSupabaseUserFromRequest(request: Request) {
  const token = getBearerTokenFromRequest(request);

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
