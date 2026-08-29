import { NextResponse } from 'next/server';
import { getBearerTokenFromRequest, getSupabaseUserFromRequest } from '../../../../lib/auth';
import { createUserScopedSupabaseClient } from '../../../../lib/supabase/server';

export async function GET(request: Request) {
  const token = getBearerTokenFromRequest(request);
  const user = await getSupabaseUserFromRequest(request);
  if (!token || !user) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  const supabase = createUserScopedSupabaseClient(token);
  const { data, error } = await supabase.from('author_contributions').select('*, profiles!author_contributions_author_id_fkey(display_name)').order('updated_at', { ascending: false });
  if (error) return NextResponse.json({ error: 'Editorial access required' }, { status: 403 });
  return NextResponse.json({ schema: 'SSF-EDITORIAL-CONTRIBUTIONS-1.0', contributions: data });
}

export async function POST(request: Request) {
  const token = getBearerTokenFromRequest(request);
  const user = await getSupabaseUserFromRequest(request);
  if (!token || !user) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  let body: { id?: unknown; status?: unknown; note?: unknown };
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 }); }
  if (typeof body.id !== 'string' || typeof body.status !== 'string') return NextResponse.json({ error: 'id and status are required' }, { status: 400 });
  const note = typeof body.note === 'string' ? body.note.slice(0, 4000) : null;
  const supabase = createUserScopedSupabaseClient(token);
  const { data, error } = await supabase.rpc('ssf_editorial_transition_author_contribution', { p_contribution_id: body.id, p_status: body.status, p_note: note });
  if (error) return NextResponse.json({ error: error.message }, { status: error.code === '42501' ? 403 : 409 });
  return NextResponse.json({ schema: 'SSF-EDITORIAL-CONTRIBUTION-TRANSITION-1.0', contribution: data });
}
