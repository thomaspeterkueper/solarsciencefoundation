import { NextResponse } from 'next/server';
import { getBearerTokenFromRequest, getSupabaseUserFromRequest } from '../../../../../lib/auth';
import { createUserScopedSupabaseClient } from '../../../../../lib/supabase/server';

const REVIEW_STATUSES = new Set([
  'screening',
  'review',
  'revision_requested',
  'approved',
  'rejected',
]);

async function getAdminClient(request: Request) {
  const token = getBearerTokenFromRequest(request);
  const user = await getSupabaseUserFromRequest(request);
  if (!token || !user) return null;
  return createUserScopedSupabaseClient(token);
}

export async function GET(request: Request) {
  const supabase = await getAdminClient(request);
  if (!supabase) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });

  const url = new URL(request.url);
  const status = url.searchParams.get('status');
  const { data, error } = await supabase.rpc('ssf_admin_list_participation_applications', {
    p_status: status || null,
  });

  if (error) {
    const forbidden = error.code === '42501' || /admin role required/i.test(error.message ?? '');
    return NextResponse.json(
      { error: forbidden ? 'SSF admin role required' : 'Could not load applications' },
      { status: forbidden ? 403 : 500 }
    );
  }

  return NextResponse.json({
    schema: 'SSF-PARTICIPATION-ADMIN-1.0',
    applications: data ?? [],
  });
}

export async function POST(request: Request) {
  const supabase = await getAdminClient(request);
  if (!supabase) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const applicationId = body.applicationId;
  const status = body.status;
  const note = typeof body.note === 'string' ? body.note.trim() : '';

  if (typeof applicationId !== 'string' || typeof status !== 'string' || !REVIEW_STATUSES.has(status)) {
    return NextResponse.json({ error: 'applicationId and a supported status are required' }, { status: 400 });
  }
  if (note.length > 4000) {
    return NextResponse.json({ error: 'Decision note must not exceed 4000 characters' }, { status: 400 });
  }
  if (status === 'revision_requested' && !note) {
    return NextResponse.json({ error: 'Revision requests require a note' }, { status: 400 });
  }

  const { data, error } = await supabase.rpc('ssf_admin_review_participation_application', {
    p_application_id: applicationId,
    p_status: status,
    p_note: note || null,
  });

  if (error) {
    const forbidden = error.code === '42501' || /admin role required/i.test(error.message ?? '');
    const notFound = error.code === 'P0002';
    const invalid = error.code === '22023';
    return NextResponse.json(
      { error: error.message || 'Could not update application' },
      { status: forbidden ? 403 : notFound ? 404 : invalid ? 409 : 500 }
    );
  }

  return NextResponse.json({
    schema: 'SSF-PARTICIPATION-ADMIN-DECISION-1.0',
    application: data,
  });
}
