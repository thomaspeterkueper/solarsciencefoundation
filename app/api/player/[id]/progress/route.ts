import { NextResponse } from 'next/server';
import { getBearerTokenFromRequest, getSupabaseUserFromRequest } from '../../../../../lib/auth';
import { getDbProgress } from '../../../../../lib/dbProgress';
import { getPlayerProgress } from '../../../../../lib/progress';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const token = getBearerTokenFromRequest(request);
  const user = await getSupabaseUserFromRequest(request);
  const effectiveId = user?.id ?? id;
  const dbProgress = user && token ? await getDbProgress(user.id, token) : null;

  return NextResponse.json({
    schema: 'SSF-API-0.1',
    source: dbProgress ? 'supabase' : 'memory',
    progress: dbProgress ?? getPlayerProgress(effectiveId)
  });
}
