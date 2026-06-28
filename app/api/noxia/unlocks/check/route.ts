import { NextResponse } from 'next/server';
import { getNoxiaDemoUnlockState } from '../../../../../lib/noxiaBridge';

type CheckBody = {
  completedModules?: unknown;
  unlockId?: unknown;
};

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
    schema: 'SSF-NOXIA-UNLOCK-CHECK-0.1',
    unlockId,
    granted: unlockId ? state.unlocks.some((unlock) => unlock.id === unlockId) : false,
    ...state
  });
}
