import { NextRequest, NextResponse } from 'next/server';
import {
  getRegisteredLearningPathById,
  getRegisteredLearningPathForModule,
} from '../../../../lib/learningPathRegistry';

/**
 * GET /api/noxia/redirect
 * SSF-0019: Deep-Link API for NOXIA
 *
 * Query params:
 *   path   = PATH:SSF:ECO-KREDIT-NOXIA-0001  (learning path ID)
 *   module = ECO-L0-000001                    (KXF module ID)
 *   uid    = <noxia-user-id>                  (preserved on redirect)
 *   ref    = noxia                            (preserved on redirect)
 *
 * Returns: 302 redirect to /learning-paths/[encoded-id]?uid=...&ref=...
 * Or:      200 JSON with { url } if Accept: application/json
 */
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const pathParam   = sp.get('path')   ?? '';
  const moduleParam = sp.get('module') ?? '';
  const uid         = sp.get('uid')    ?? '';
  const ref         = sp.get('ref')    ?? 'noxia';

  const CORS = {
    'Access-Control-Allow-Origin':  'https://noxiagame.vercel.app',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-vercel-protection-bypass',
  };

  // Resolve path
  let found = null;
  if (pathParam) {
    found = getRegisteredLearningPathById(decodeURIComponent(pathParam));
  }
  if (!found && moduleParam) {
    found = getRegisteredLearningPathForModule(decodeURIComponent(moduleParam));
  }

  if (!found) {
    return NextResponse.json(
      { error: 'Path not found', path: pathParam, module: moduleParam },
      { status: 404, headers: CORS }
    );
  }

  const qs = new URLSearchParams();
  if (uid) qs.set('uid', uid);
  qs.set('ref', ref);

  const targetUrl = new URL(
    '/learning-paths/' + encodeURIComponent(found.id) + '?' + qs.toString(),
    'https://solarsciencefoundation.vercel.app'
  ).toString();

  // If JSON requested (e.g. from NOXIA server), return URL
  const acceptJson = (req.headers.get('accept') ?? '').includes('application/json');
  if (acceptJson) {
    return NextResponse.json({ url: targetUrl, pathId: found.id, title: found.title }, { headers: CORS });
  }

  // Otherwise redirect
  return NextResponse.redirect(targetUrl, { headers: CORS });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin':  'https://noxiagame.vercel.app',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-vercel-protection-bypass',
    },
  });
}
