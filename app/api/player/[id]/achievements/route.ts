/**
 * KUEPER - Solar Science Foundation (SSF)
 * Path: app/api/player/[id]/achievements/route.ts
 * Repo: github.com/thomaspeterkueper/solarsciencefoundation/blob/main/app/api/player/[id]/achievements/route.ts
 * Name: GET /api/player/[id]/achievements
 * Version: 0.1.0
 * Created: 2026-06-27
 * Modified: 2026-06-27 10:25 CEST
 * Depends: next/server, lib/progress, lib/achievements
 */

import { NextResponse } from 'next/server';
import { deriveAchievementStates } from '../../../../../lib/achievements';
import { getPlayerProgress } from '../../../../../lib/progress';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const progress = getPlayerProgress(id);

  return NextResponse.json({
    schema: 'SSF-ACHIEVEMENTS-0.1',
    playerId: id,
    achievements: deriveAchievementStates(progress)
  });
}
