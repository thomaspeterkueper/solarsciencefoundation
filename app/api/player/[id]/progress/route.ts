/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      app/api/player/[id]/progress/route.ts
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/app/api/player/[id]/progress/route.ts
 * Name:      GET /api/player/[id]/progress
 * Version:   0.1.0
 * Created:   2026-06-26
 * Modified:  2026-06-26 13:00 CEST
 * Depends:   next/server, lib/progress
 */

import { NextResponse } from 'next/server';
import { getPlayerProgress } from '../../../../../lib/progress';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  return NextResponse.json({
    schema: 'SSF-API-0.1',
    progress: getPlayerProgress(id)
  });
}
