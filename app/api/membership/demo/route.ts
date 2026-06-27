/**
 * KUEPER - Solar Science Foundation (SSF)
 * Path: app/api/membership/demo/route.ts
 * Repo: github.com/thomaspeterkueper/solarsciencefoundation/blob/main/app/api/membership/demo/route.ts
 * Name: GET /api/membership/demo
 * Version: 0.1.0
 * Created: 2026-06-27
 * Modified: 2026-06-27 09:20 CEST
 * Depends: next/server, lib/membership
 */

import { NextResponse } from 'next/server';
import { demoMembers, expandMemberRoles } from '../../../../lib/membership';

export function GET() {
  return NextResponse.json({
    schema: 'SSF-MEMBERSHIP-0.1',
    members: demoMembers.map((member) => ({
      ...member,
      expandedRoles: expandMemberRoles(member)
    }))
  });
}
