import { NextResponse } from 'next/server';
import { getNoxiaKnowledgeModule } from '../../../../../lib/noxiaBridge';

export async function GET(_request: Request, context: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = await context.params;
  const module = await getNoxiaKnowledgeModule(decodeURIComponent(moduleId));
  if (!module) return NextResponse.json({ error: 'module_not_found' }, { status: 404 });
  return NextResponse.json({
    schema: 'SSF-NOXIA-MODULE-1.0',
    source: 'Solar Science Foundation',
    consumer: 'NOXIA',
    module
  });
}
