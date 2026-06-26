/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      app/api/player/[id]/unlocks/route.ts
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/app/api/player/[id]/unlocks/route.ts
 * Name:      GET /api/player/[id]/unlocks
 * Version:   0.1.0
 * Created:   2026-06-26
 * Modified:  2026-06-26 13:00 CEST
 * Depends:   next/server, lib/progress
 */

import { NextResponse } from 'next/server';
import { getCompletedModuleIds, getPlayerUnlocks } from '../../../../../lib/progress';

type RouteContext = {
  params: Promise<{ id: string }>;
};

// NOXIA points at this endpoint for a real player. Same shape as the demo
// unlock endpoint, but driven by stored progress instead of a fixed list.
export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  return NextResponse.json({
    schema: 'SSF-NOXIA-0.1',
    playerId: id,
    completedModules: getCompletedModuleIds(id),
    unlocks: getPlayerUnlocks(id)
  });
}
