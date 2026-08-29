import { NextResponse } from 'next/server';
import { getBearerTokenFromRequest, getSupabaseUserFromRequest } from '../../../../lib/auth';
import { createUserScopedSupabaseClient } from '../../../../lib/supabase/server';

function clean(value: unknown, max: number) {
  if (value == null) return null;
  if (typeof value !== 'string') return undefined;
  const text = value.trim();
  if (text.length > max) return undefined;
  return text || null;
}

export async function GET(request: Request) {
  const token = getBearerTokenFromRequest(request);
  const user = await getSupabaseUserFromRequest(request);
  if (!token || !user) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  const supabase = createUserScopedSupabaseClient(token);
  const { data, error } = await supabase.from('author_contributions').select('*').eq('author_id', user.id).order('updated_at', { ascending: false });
  if (error) return NextResponse.json({ error: 'Could not load contributions' }, { status: 500 });
  return NextResponse.json({ schema: 'SSF-AUTHOR-CONTRIBUTIONS-1.0', contributions: data });
}

export async function POST(request: Request) {
  const token = getBearerTokenFromRequest(request);
  const user = await getSupabaseUserFromRequest(request);
  if (!token || !user) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 }); }

  const title = clean(body.title, 180);
  const summary = clean(body.summary, 1200);
  const bodyMarkdown = clean(body.bodyMarkdown, 60000) ?? '';
  const subjectCode = clean(body.subjectCode, 32);
  const targetModuleId = clean(body.targetModuleId, 120);
  const sourceNotes = clean(body.sourceNotes, 12000);
  const kgRequestRef = clean(body.kgRequestRef, 240);
  if (title === undefined || summary === undefined || bodyMarkdown === undefined || subjectCode === undefined || targetModuleId === undefined || sourceNotes === undefined || kgRequestRef === undefined) return NextResponse.json({ error: 'Invalid field value' }, { status: 400 });
  if (!title || title.length < 3 || !summary || summary.length < 20) return NextResponse.json({ error: 'Title and summary are required' }, { status: 400 });

  const supabase = createUserScopedSupabaseClient(token);
  const { data, error } = await supabase.from('author_contributions').insert({
    author_id: user.id,
    title,
    summary,
    body_markdown: bodyMarkdown,
    subject_code: subjectCode,
    target_module_id: targetModuleId,
    source_notes: sourceNotes,
    canonical_change_required: body.canonicalChangeRequired === true,
    kg_request_ref: kgRequestRef,
    status: 'draft',
  }).select('*').single();
  if (error) return NextResponse.json({ error: 'Could not create contribution' }, { status: error.code === '42501' ? 403 : 500 });
  return NextResponse.json({ schema: 'SSF-AUTHOR-CONTRIBUTION-1.0', contribution: data }, { status: 201 });
}

export async function PATCH(request: Request) {
  const token = getBearerTokenFromRequest(request);
  const user = await getSupabaseUserFromRequest(request);
  if (!token || !user) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 }); }
  if (typeof body.id !== 'string') return NextResponse.json({ error: 'id is required' }, { status: 400 });

  const fields = {
    title: clean(body.title, 180), summary: clean(body.summary, 1200), body_markdown: clean(body.bodyMarkdown, 60000),
    subject_code: clean(body.subjectCode, 32), target_module_id: clean(body.targetModuleId, 120), source_notes: clean(body.sourceNotes, 12000),
    kg_request_ref: clean(body.kgRequestRef, 240), canonical_change_required: body.canonicalChangeRequired === true,
    updated_at: new Date().toISOString(),
  };
  if (Object.values(fields).some((value) => value === undefined)) return NextResponse.json({ error: 'Invalid field value' }, { status: 400 });
  if (!fields.title || fields.title.length < 3 || !fields.summary || fields.summary.length < 20) return NextResponse.json({ error: 'Title and summary are required' }, { status: 400 });

  const supabase = createUserScopedSupabaseClient(token);
  const { data, error } = await supabase.from('author_contributions').update(fields).eq('id', body.id).eq('author_id', user.id).select('*').single();
  if (error) return NextResponse.json({ error: 'Contribution is not editable' }, { status: 409 });
  return NextResponse.json({ schema: 'SSF-AUTHOR-CONTRIBUTION-1.0', contribution: data });
}
