import { NextRequest, NextResponse } from 'next/server';
import { learningPaths } from '../../../../lib/learningPaths';

/**
 * GET /api/noxia/modules
 * SSF canonical module index for NOXIA.
 *
 * Source: learningPaths.ts (authoritative, 67+ paths)
 * NOT the KG KXF export (which is sparse/stale).
 *
 * Each entry maps a SSF path to its NOXIA unlock IDs.
 * NOXIA queries by unlock: find module where unlocks[] includes UNL:NOX:X
 *
 * Fix: NOX-SSF-REQ-20260829-water-processing-live-api-not-visible
 * Root cause: previous implementation read from KXF export (4 records).
 * Now reads directly from learningPaths (67+ paths, always current).
 */

const CORS = {
  'Access-Control-Allow-Origin':  'https://noxiagame.vercel.app',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-vercel-protection-bypass',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

export async function GET(req: NextRequest) {
  // Build module list directly from learningPaths.ts
  const modules = learningPaths
    .filter(p => p.status !== 'hidden')
    .map(p => {
      // Collect all unlock IDs from the path
      const unlocks: string[] = p.unlocks ?? [];

      // Derive a display title from the path title
      const title = p.title ?? p.id;

      // Duration estimate from unit count
      const unitCount = p.units?.length ?? 1;
      const durationMinutes = Math.max(5, unitCount * 7);

      // Domain from first domainsNeeded or sourceModuleId prefix
      const domain = (p.domainsNeeded?.[0] ?? p.sourceModuleId ?? 'PHY')
        .replace(/^KNOW:/, '').split('-')[0].split(':')[0];

      return {
        id:              p.kxfModuleId ?? p.sourceModuleId ?? p.id,
        legacyId:        p.sourceModuleId,
        pathId:          p.id,
        title,
        domain,
        difficulty:      1,
        durationMinutes,
        unlocks,
        ssfUrl:          `https://solarsciencefoundation.vercel.app/learning-paths/${encodeURIComponent(p.id)}`,
        status:          p.status ?? 'prototype',
      };
    });

  return NextResponse.json(
    {
      schema:   'SSF-NOXIA-MODULES-1.1',
      source:   'Solar Science Foundation',
      consumer: 'NOXIA',
      version:  '1.1.0',
      count:    modules.length,
      generated: new Date().toISOString(),
      modules,
    },
    { headers: CORS }
  );
}
