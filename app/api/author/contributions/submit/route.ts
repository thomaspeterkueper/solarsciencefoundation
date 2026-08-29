import { NextResponse } from 'next/server';
import { getBearerTokenFromRequest, getSupabaseUserFromRequest } from '../../../../../lib/auth';
import { createUserScopedSupabaseClient } from '../../../../../lib/supabase/server';

export async function POST(request: Request) {
  const token = getBearerTokenFromRequest(request);
  const user = await getSupabaseUserFromRequest(request);
  if (!token || !user) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  let body: { id?: unknown };
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 }); }
  if (typeof body.id !== 'string') return NextResponse.json({ error: 'id is required' }, { status: 400 });

  const supabase = createUserScopedSupabaseClient(token);
  const { data, error } = await supabase.rpc('ssf_submit_author_contribution', { p_contribution_id: body.id });
  if (error) return NextResponse.json({ error: error.message }, { status: error.code === '42501' ? 403 : 409 });
  return NextResponse.json({ schema: 'SSF-AUTHOR-CONTRIBUTION-TRANSITION-1.0', contribution: data });
}
