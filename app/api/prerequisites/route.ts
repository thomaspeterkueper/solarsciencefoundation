import { NextResponse } from 'next/server';
import { getPrerequisites } from '../../../lib/prerequisites';

export async function GET() {
  const prerequisites = await getPrerequisites();

  return NextResponse.json({
    schema: 'SSF-PREREQUISITES-0.1',
    source: 'KUEPER Knowledge Graph / KXF',
    count: prerequisites.length,
    prerequisites
  });
}
