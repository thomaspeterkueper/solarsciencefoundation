import { NextRequest, NextResponse } from 'next/server';
import { registeredLearningPaths } from '../../../../lib/learningPathRegistry';

/**
 * GET /api/noxia/modules
 * SSF canonical module index for NOXIA.
 *
 * Source: governed learning-path registry.
 * This is intentionally not the raw legacy learningPaths array: specialized
 * governed paths (for example NOXIA power generation) live outside that file
 * and must still be visible to consumers.
 */

const CORS = {
  'Access-Control-Allow-Origin':  'https://noxiagame.vercel.app',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-vercel-protection-bypass',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

export async function GET(_req: NextRequest) {
  const modules = registeredLearningPaths.map(p => {
    const unlocks: string[] = p.unlocks ?? [];
    const title = p.title ?? p.id;
    const unitCount = p.units?.length ?? 1;
    const durationMinutes = Math.max(5, unitCount * 7);
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
      summary:         p.subtitle ?? '',
      unlocks,
      sourceEntityIds: p.suppliedBy?.knowledgeGraph ?? [],
      ssfUrl:          `https://solarsciencefoundation.vercel.app/learning-paths/${encodeURIComponent(p.id)}`,
      detailUrl:       `https://solarsciencefoundation.vercel.app/api/noxia/modules/${encodeURIComponent(p.kxfModuleId ?? p.sourceModuleId ?? p.id)}`,
      status:          p.status,
    };
  });

  return NextResponse.json(
    {
      schema:   'SSF-NOXIA-MODULES-1.2',
      source:   'Solar Science Foundation',
      consumer: 'NOXIA',
      version:  '1.2.0',
      count:    modules.length,
      generated: new Date().toISOString(),
      modules,
    },
    { headers: CORS }
  );
}
