import { NextResponse } from 'next/server';
import { getBearerTokenFromRequest, getSupabaseUserFromRequest } from '../../../../../lib/auth';
import { createUserScopedSupabaseClient } from '../../../../../lib/supabase/server';

type Body = {
  contributionId?: unknown;
  note?: unknown;
};

export async function POST(request: Request) {
  const token = getBearerTokenFromRequest(request);
  const user = await getSupabaseUserFromRequest(request);
  if (!token || !user) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (typeof body.contributionId !== 'string' || !body.contributionId.trim()) {
    return NextResponse.json({ error: 'contributionId is required' }, { status: 400 });
  }
  if (body.note != null && typeof body.note !== 'string') {
    return NextResponse.json({ error: 'note must be a string' }, { status: 400 });
  }

  const supabase = createUserScopedSupabaseClient(token);
  const { data, error } = await supabase.rpc('ssf_materialize_author_contribution', {
    p_contribution_id: body.contributionId,
    p_note: typeof body.note === 'string' ? body.note.trim() || null : null,
  });

  if (error) {
    const forbidden = error.code === '42501';
    return NextResponse.json(
      { error: forbidden ? 'Curator or admin role required' : error.message },
      { status: forbidden ? 403 : 400 },
    );
  }

  return NextResponse.json({ schema: 'SSF-PUBLICATION-MATERIALIZATION-1.0', publication: data });
}
