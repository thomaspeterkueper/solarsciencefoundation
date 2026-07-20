import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * POST /api/noxia/completion
 * Called by PathRunner when a NOXIA player completes a learning path.
 * Saves completion under the NOXIA uid so NOXIA sync_from_ssf can find it.
 *
 * SSF-0008: NOXIA uid-Parameter — Abschluss dem richtigen Spieler zuordnen
 */
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://noxiagame.vercel.app',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(req: NextRequest) {
  try {
    const { uid, pathId } = await req.json();

    if (!uid || !pathId) {
      return NextResponse.json({ error: 'uid and pathId required' }, { status: 400 });
    }

    // Validate pathId format
    if (!pathId.startsWith('PATH:SSF:')) {
      return NextResponse.json({ error: 'Invalid pathId format' }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Upsert completion record
    const { error } = await supabase
      .from('ssf_completions')
      .upsert({
        noxia_uid: uid,
        path_id: pathId,
        completed_at: new Date().toISOString(),
        source: 'noxia',
      }, {
        onConflict: 'noxia_uid,path_id',
      });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({ ok: true, uid, pathId }, { headers: CORS_HEADERS });
  } catch (e) {
    console.error('NOXIA completion error:', e);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

/**
 * GET /api/noxia/completion?uid=xxx
 * Used by NOXIA sync_from_ssf to check completed paths for a player.
 */
export async function GET(req: NextRequest) {
  const uid = req.nextUrl.searchParams.get('uid');
  if (!uid) {
    return NextResponse.json({ error: 'uid required' }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from('ssf_completions')
    .select('path_id, completed_at')
    .eq('noxia_uid', uid)
    .order('completed_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }

  return NextResponse.json({ uid, completions: data ?? [] }, { headers: CORS_HEADERS });
}
