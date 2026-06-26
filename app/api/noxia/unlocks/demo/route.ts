/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      app/api/noxia/unlocks/demo/route.ts
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/app/api/noxia/unlocks/demo/route.ts
 * Name:      GET /api/noxia/unlocks/demo
 * Version:   0.1.0
 * Created:   2026-06-26
 * Modified:  2026-06-26 13:00 CEST
 * Depends:   next/server, lib/progress
 */

import { NextResponse } from 'next/server';
import { buildUnlocks } from '../../../../../lib/progress';

const DEMO_COMPLETED = ['SSF-PHY-1101'];

// Fixed demo unlock for the first proof loop. Now sourced from the shared
// unlock builder so the demo and real player endpoints can never drift apart.
export function GET() {
  return NextResponse.json({
    schema: 'SSF-NOXIA-0.1',
    playerId: 'demo',
    completedModules: DEMO_COMPLETED,
    unlocks: buildUnlocks(DEMO_COMPLETED)
  });
}
