import { NextResponse } from 'next/server';
import { getSupabaseUserFromRequest } from '../../../../../lib/auth';
import { getDbProgress } from '../../../../../lib/dbProgress';
import { getPlayerProgress } from '../../../../../lib/progress';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const user = await getSupabaseUserFromRequest(request);
  const effectiveId = user?.id ?? id;
  const dbProgress = user ? await getDbProgress(user.id) : null;

  return NextResponse.json({
    schema: 'SSF-API-0.1',
    source: dbProgress ? 'supabase' : 'memory',
    progress: dbProgress ?? getPlayerProgress(effectiveId)
  });
}
