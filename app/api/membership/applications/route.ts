import { NextResponse } from 'next/server';
import { getBearerTokenFromRequest, getSupabaseUserFromRequest } from '../../../../lib/auth';
import { createUserScopedSupabaseClient } from '../../../../lib/supabase/server';

type ApplicationType = 'member' | 'supporting_member' | 'author';

const APPLICATION_TYPES = new Set<ApplicationType>(['member', 'supporting_member', 'author']);

function cleanOptionalText(value: unknown, maxLength: number) {
  if (value == null || value === '') return null;
  if (typeof value !== 'string') return undefined;
  const cleaned = value.trim();
  if (!cleaned || cleaned.length > maxLength) return undefined;
  return cleaned;
}

export async function GET(request: Request) {
  const token = getBearerTokenFromRequest(request);
  const user = await getSupabaseUserFromRequest(request);
  if (!token || !user) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });

  const supabase = createUserScopedSupabaseClient(token);
  const { data, error } = await supabase
    .from('participation_applications')
    .select('id, application_type, motivation, expertise, contribution_interest, status, submitted_at, updated_at, decided_at, decision_note')
    .eq('user_id', user.id)
    .order('submitted_at', { ascending: false });

  if (error) return NextResponse.json({ error: 'Could not load applications' }, { status: 500 });
  return NextResponse.json({ schema: 'SSF-PARTICIPATION-APPLICATIONS-1.0', applications: data });
}

export async function POST(request: Request) {
  const token = getBearerTokenFromRequest(request);
  const user = await getSupabaseUserFromRequest(request);
  if (!token || !user) return NextResponse.json({ error: 'Authentication required' }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const applicationType = body.applicationType;
  const motivation = typeof body.motivation === 'string' ? body.motivation.trim() : '';
  const expertise = cleanOptionalText(body.expertise, 4000);
  const contributionInterest = cleanOptionalText(body.contributionInterest, 4000);

  if (typeof applicationType !== 'string' || !APPLICATION_TYPES.has(applicationType as ApplicationType)) {
    return NextResponse.json({ error: 'Unknown application type' }, { status: 400 });
  }
  if (motivation.length < 20 || motivation.length > 4000) {
    return NextResponse.json({ error: 'Motivation must contain between 20 and 4000 characters' }, { status: 400 });
  }
  if (expertise === undefined || contributionInterest === undefined) {
    return NextResponse.json({ error: 'Optional text fields must not exceed 4000 characters' }, { status: 400 });
  }
  if (applicationType === 'author' && (!expertise || !contributionInterest)) {
    return NextResponse.json({ error: 'Author applications require expertise and contributionInterest' }, { status: 400 });
  }

  const supabase = createUserScopedSupabaseClient(token);
  const { data, error } = await supabase
    .from('participation_applications')
    .insert({
      user_id: user.id,
      application_type: applicationType,
      motivation,
      expertise,
      contribution_interest: contributionInterest,
      status: 'submitted',
    })
    .select('id, application_type, status, submitted_at')
    .single();

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'An application of this type is already submitted' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Could not submit application' }, { status: 500 });
  }

  return NextResponse.json({ schema: 'SSF-PARTICIPATION-APPLICATION-1.0', application: data }, { status: 201 });
}
