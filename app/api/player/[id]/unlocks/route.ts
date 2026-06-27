import { NextResponse } from 'next/server';
import { getBearerTokenFromRequest, getSupabaseUserFromRequest } from '../../../../../lib/auth';
import { getDbCompletedModuleIds, getDbUnlocks } from '../../../../../lib/dbProgress';
import { getCompletedModuleIds, getPlayerUnlocks } from '../../../../../lib/progress';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const token = getBearerTokenFromRequest(request);
  const user = await getSupabaseUserFromRequest(request);
  const effectiveId = user?.id ?? id;
  const dbCompleted = user && token ? await getDbCompletedModuleIds(user.id, token) : null;
  const dbUnlocks = user && token ? await getDbUnlocks(user.id, token) : null;

  return NextResponse.json({
    schema: 'SSF-NOXIA-0.1',
    source: dbUnlocks ? 'supabase' : 'memory',
    playerId: effectiveId,
    completedModules: dbCompleted ?? getCompletedModuleIds(effectiveId),
    unlocks: dbUnlocks ?? getPlayerUnlocks(effectiveId)
  });
}
