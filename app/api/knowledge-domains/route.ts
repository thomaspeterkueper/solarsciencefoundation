import { NextResponse } from 'next/server';
import { getKnowledgeDomains } from '../../../lib/prerequisites';

export async function GET() {
  const knowledgeDomains = await getKnowledgeDomains();

  return NextResponse.json({
    schema: 'SSF-KNOWLEDGE-DOMAINS-0.1',
    source: 'KUEPER Knowledge Graph / KXF',
    count: knowledgeDomains.length,
    knowledgeDomains
  });
}
