import { NextResponse } from 'next/server';
import { getModuleById } from '../../../../lib/modules';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const module = getModuleById(id);

  if (!module) {
    return NextResponse.json({ error: 'Module not found' }, { status: 404 });
  }

  return NextResponse.json({
    schema: 'SSF-API-0.1',
    module
  });
}
