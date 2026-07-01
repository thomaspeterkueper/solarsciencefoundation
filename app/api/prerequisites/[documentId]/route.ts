import { NextResponse } from 'next/server';
import { getPrerequisiteView } from '../../../../lib/prerequisites';

type RouteContext = {
  params: Promise<{ documentId: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { documentId } = await context.params;
  const decodedDocumentId = decodeURIComponent(documentId);
  const view = await getPrerequisiteView(decodedDocumentId);

  return NextResponse.json({
    schema: 'SSF-DOCUMENT-PREREQUISITES-0.1',
    source: 'KUEPER Knowledge Graph / KXF',
    ...view
  });
}
