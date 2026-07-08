/**
 * KUEPER - Solar Science Foundation (SSF)
 * Path: app/api/noxia/unlocks/check/route.ts
 * Name: POST /api/noxia/unlocks/check — Production unlock check (API-Key auth)
 * Version: 0.2.0
 * Security: API-Key via X-NOXIA-API-Key header
 */
import { NextResponse } from 'next/server';
import { getNoxiaDemoUnlockState } from '../../../../../lib/noxiaBridge';

type CheckBody = {
  completedModules?: unknown;
  unlockId?: unknown;
  playerId?: unknown;
};

const ALLOWED_ORIGINS = [
  'https://noxiagame.vercel.app',
  'https://noxia.kueper.com',
  process.env.NOXIA_ORIGIN ?? '',
].filter(Boolean);

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  return ALLOWED_ORIGINS.some(allowed => origin === allowed);
}

function validateApiKey(request: Request): boolean {
  const apiKey = request.headers.get('X-NOXIA-API-KEY');
  const expected = process.env.NOXIA_API_KEY;
  if (!expected) {
    // No key configured — fall back to demo mode with warning
    return false;
  }
  return apiKey === expected;
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get('origin');
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-NOXIA-API-KEY',
  };
  if (origin && isAllowedOrigin(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }
  return new Response(null, { status: 204, headers });
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin');

  // CORS check
  const corsHeaders: Record<string, string> = {};
  if (origin && isAllowedOrigin(origin)) {
    corsHeaders['Access-Control-Allow-Origin'] = origin;
  }

  // Auth check
  const authenticated = validateApiKey(request);
  if (!authenticated) {
    const noxiaKey = process.env.NOXIA_API_KEY;
    if (noxiaKey) {
      // Key is configured but not provided / wrong
      return NextResponse.json(
        { error: 'Unauthorized', hint: 'Provide X-NOXIA-API-KEY header' },
        { status: 401, headers: corsHeaders }
      );
    }
    // No key configured — demo mode with explicit warning
    return NextResponse.json(
      {
        error: 'Demo mode',
        hint: 'Set NOXIA_API_KEY env var to enable production auth. Use /api/noxia/unlocks/demo for testing.',
        schema: 'SSF-NOXIA-UNLOCK-CHECK-0.2',
        mode: 'unconfigured'
      },
      { status: 503, headers: corsHeaders }
    );
  }

  let body: CheckBody;
  try {
    body = (await request.json()) as CheckBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400, headers: corsHeaders });
  }

  // TODO: When Supabase progress tracking is ready, resolve playerId → completedModules
  // from server-side DB instead of trusting the request body.
  // For now: accept completedModules from body but require API-Key.
  const completedModules = Array.isArray(body.completedModules)
    ? body.completedModules.filter((item): item is string => typeof item === 'string')
    : [];
  const unlockId = typeof body.unlockId === 'string' ? body.unlockId : null;
  const playerId = typeof body.playerId === 'string' ? body.playerId : null;

  const state = getNoxiaDemoUnlockState(completedModules);

  return NextResponse.json(
    {
      schema: 'SSF-NOXIA-UNLOCK-CHECK-0.2',
      mode: 'authenticated',
      playerId,
      unlockId,
      granted: unlockId ? state.unlocks.some((unlock) => unlock.id === unlockId) : false,
      ...state
    },
    { headers: corsHeaders }
  );
}
