/**
 * KUEPER - Solar Science Foundation (SSF)
 * Path: app/api/kxf/route.ts
 * Repo: github.com/thomaspeterkueper/solarsciencefoundation/blob/main/app/api/kxf/route.ts
 * Name: GET /api/kxf
 * Version: 0.1.0
 * Created: 2026-06-26
 * Modified: 2026-06-26 18:25 CEST
 * Depends: next/server, lib/kxf
 */

import { NextResponse } from 'next/server';
import { fetchKxfSnapshot, normaliseKxfModules } from '../../../lib/kxf';

export async function GET() {
  const snapshot = await fetchKxfSnapshot();

  return NextResponse.json({
    schema: 'SSF-KXF-ADAPTER-0.1',
    sourceUrl: snapshot.sourceUrl,
    loaded: snapshot.loaded,
    error: snapshot.error ?? null,
    kxf: snapshot.data ?? null,
    normalised: snapshot.data
      ? {
          modules: normaliseKxfModules(snapshot.data)
        }
      : null
  });
}
