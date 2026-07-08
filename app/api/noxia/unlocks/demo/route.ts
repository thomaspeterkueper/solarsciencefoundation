/**
 * KUEPER - Solar Science Foundation (SSF)
 * Path: app/api/noxia/unlocks/demo/route.ts
 * Name: POST /api/noxia/unlocks/demo — Demo unlock check (no auth)
 * Version: 0.2.0
 */
import { NextResponse } from 'next/server';
import { getNoxiaDemoUnlockState } from '../../../../../lib/noxiaBridge';

type CheckBody = {
  completedModules?: unknown;
  unlockId?: unknown;
};

/**
 * Demo endpoint — no authentication required.
 * For testing only. Do not use in production NOXIA integration.
 */
export async function POST(request: Request) {
  let body: CheckBody;
  try {
    body = (await request.json()) as CheckBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const completedModules = Array.isArray(body.completedModules)
    ? body.completedModules.filter((item): item is string => typeof item === 'string')
    : [];
  const unlockId = typeof body.unlockId === 'string' ? body.unlockId : null;
  const state = getNoxiaDemoUnlockState(completedModules);

  return NextResponse.json({
    schema: 'SSF-NOXIA-UNLOCK-CHECK-DEMO-0.1',
    mode: 'demo',
    warning: 'This endpoint accepts unverified completedModules from the request body. Use /api/noxia/unlocks/check for production.',
    unlockId,
    granted: unlockId ? state.unlocks.some((unlock) => unlock.id === unlockId) : false,
    ...state
  });
}
