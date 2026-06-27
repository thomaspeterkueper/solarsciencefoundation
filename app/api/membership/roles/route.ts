/**
 * KUEPER - Solar Science Foundation (SSF)
 * Path: app/api/membership/roles/route.ts
 * Repo: github.com/thomaspeterkueper/solarsciencefoundation/blob/main/app/api/membership/roles/route.ts
 * Name: GET /api/membership/roles
 * Version: 0.1.0
 * Created: 2026-06-27
 * Modified: 2026-06-27 09:20 CEST
 * Depends: next/server, lib/membership
 */

import { NextResponse } from 'next/server';
import { membershipRoles } from '../../../../lib/membership';

export function GET() {
  return NextResponse.json({
    schema: 'SSF-MEMBERSHIP-0.1',
    roles: membershipRoles
  });
}
