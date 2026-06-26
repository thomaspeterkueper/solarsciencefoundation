/**
 * KUEPER - Solar Science Foundation (SSF)
 * Path: app/api/modules/[id]/route.ts
 * Repo: github.com/thomaspeterkueper/solarsciencefoundation/blob/main/app/api/modules/[id]/route.ts
 * Name: GET /api/modules/[id]
 * Version: 0.1.0
 * Created: 2026-06-26
 * Modified: 2026-06-26 18:25 CEST
 * Depends: next/server, lib/kxf
 */

import { NextResponse } from 'next/server';
import { getKxfLearningModuleById } from '../../../../lib/kxf';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const module = await getKxfLearningModuleById(id);

  if (!module) {
    return NextResponse.json({ error: 'Module not found' }, { status: 404 });
  }

  return NextResponse.json({
    schema: 'SSF-API-0.1',
    module
  });
}
