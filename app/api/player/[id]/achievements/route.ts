import { NextResponse } from 'next/server';
import { deriveAchievementStates } from '../../../../../lib/achievements';
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
  const db = user && token ? await getDbProgress(user.id, token) : null;
  const progress = db ?? getPlayerProgress(effectiveId);

  return NextResponse.json({
    schema: 'SSF-ACHIEVEMENTS-0.1',
    source: db ? 'supabase' : 'memory',
    playerId: effectiveId,
    achievements: deriveAchievementStates(progress)
  });
}
