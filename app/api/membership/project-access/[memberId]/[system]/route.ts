/**
 * KUEPER - Solar Science Foundation (SSF)
 * Path: app/api/membership/project-access/[memberId]/[system]/route.ts
 * Repo: github.com/thomaspeterkueper/solarsciencefoundation/blob/main/app/api/membership/project-access/[memberId]/[system]/route.ts
 * Name: GET /api/membership/project-access/[memberId]/[system]
 * Version: 0.1.0
 * Created: 2026-06-27
 * Modified: 2026-06-27 09:20 CEST
 * Depends: next/server, lib/membership
 */

import { NextResponse } from 'next/server';
import { getMemberById, toProjectAccess, type EcosystemSystemId } from '../../../../../../lib/membership';

type RouteContext = {
  params: Promise<{ memberId: string; system: string }>;
};

function normaliseSystem(system: string): EcosystemSystemId | null {
  const decoded = decodeURIComponent(system);
  if (decoded.startsWith('SYS:KUEPER:')) return decoded as EcosystemSystemId;
  if (decoded === 'ssf') return 'SYS:KUEPER:ssf';
  if (decoded === 'noxia') return 'SYS:KUEPER:noxia';
  if (decoded === 'kueper-com') return 'SYS:KUEPER:kueper-com';
  if (decoded === 'knowledge-graph') return 'SYS:KUEPER:knowledge-graph';
  if (decoded === 'ota') return 'SYS:KUEPER:ota';
  return null;
}

export async function GET(_request: Request, context: RouteContext) {
  const { memberId, system } = await context.params;
  const member = getMemberById(memberId);
  const normalisedSystem = normaliseSystem(system);

  if (!member) {
    return NextResponse.json({ error: 'Member not found' }, { status: 404 });
  }

  if (!normalisedSystem) {
    return NextResponse.json({ error: 'Unknown system' }, { status: 400 });
  }

  return NextResponse.json({
    schema: 'KUEPER-PROJECT-ACCESS-0.1',
    access: toProjectAccess(member, normalisedSystem)
  });
}
