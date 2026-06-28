import { NextResponse } from 'next/server';
import { getNoxiaKnowledgeModules } from '../../../../lib/noxiaBridge';

export async function GET() {
  const modules = await getNoxiaKnowledgeModules();

  return NextResponse.json({
    schema: 'SSF-NOXIA-MODULES-0.1',
    source: 'Solar Science Foundation',
    consumer: 'NOXIA',
    modules
  });
}
