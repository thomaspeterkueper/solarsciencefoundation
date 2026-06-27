import { NextResponse } from 'next/server';
import { getSupabaseUserFromRequest } from '../../../../../lib/auth';
import { getDbCompletedModuleIds, getDbUnlocks } from '../../../../../lib/dbProgress';
import { getCompletedModuleIds, getPlayerUnlocks } from '../../../../../lib/progress';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const user = await getSupabaseUserFromRequest(request);
  const effectiveId = user?.id ?? id;
  const dbCompleted = user ? await getDbCompletedModuleIds(user.id) : null;
  const dbUnlocks = user ? await getDbUnlocks(user.id) : null;

  return NextResponse.json({
    schema: 'SSF-NOXIA-0.1',
    source: dbUnlocks ? 'supabase' : 'memory',
    playerId: effectiveId,
    completedModules: dbCompleted ?? getCompletedModuleIds(effectiveId),
    unlocks: dbUnlocks ?? getPlayerUnlocks(effectiveId)
  });
}
