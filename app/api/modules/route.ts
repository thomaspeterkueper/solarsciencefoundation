/**
 * KUEPER - Solar Science Foundation (SSF)
 * Path: app/api/modules/route.ts
 * Repo: github.com/thomaspeterkueper/solarsciencefoundation/blob/main/app/api/modules/route.ts
 * Name: GET /api/modules
 * Version: 0.1.0
 * Created: 2026-06-26
 * Modified: 2026-06-26 18:25 CEST
 * Depends: next/server, lib/kxf
 */

import { NextResponse } from 'next/server';
import { fetchKxfSnapshot, getKxfLearningModules } from '../../../lib/kxf';

export async function GET() {
  const [modules, snapshot] = await Promise.all([
    getKxfLearningModules(),
    fetchKxfSnapshot()
  ]);

  return NextResponse.json({
    schema: 'SSF-API-0.1',
    source: {
      authority: 'kueper-knowledge-graph',
      kxfUrl: snapshot.sourceUrl,
      loaded: snapshot.loaded,
      error: snapshot.error ?? null
    },
    modules
  });
}
