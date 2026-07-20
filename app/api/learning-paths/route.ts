import { NextRequest, NextResponse } from 'next/server';
import { learningPaths } from '../../../lib/learningPaths';

/**
 * GET /api/learning-paths
 * Public API — no auth required.
 * CORS: allowed from noxiagame.vercel.app and localhost
 *
 * NOXIA reads this to discover available SSF learning paths
 * and their unlock keys.
 */
export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin') ?? '';
  const allowed = [
    'https://noxiagame.vercel.app',
    'https://solarsciencefoundation.vercel.app',
    'http://localhost:3000',
    'http://localhost:3001',
  ];
  const corsOrigin = allowed.includes(origin) ? origin : allowed[0];

  return NextResponse.json(
    {
      schema: 'SSF-LEARNING-PATHS-0.1',
      generated: new Date().toISOString(),
      count: learningPaths.length,
      paths: learningPaths.map(p => ({
        id: p.id,
        title: p.title,
        subtitle: p.subtitle,
        status: p.status,
        unlocks: p.unlocks ?? [],
        kxfModuleId: p.kxfModuleId,
      })),
    },
    {
      headers: {
        'Access-Control-Allow-Origin': corsOrigin,
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
      },
    }
  );
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin') ?? '';
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
