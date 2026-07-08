import { NextResponse } from 'next/server';
import { getOtaDocumentView } from '../../../../lib/ota';

type RouteContext = {
  params: Promise<{ documentId: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { documentId } = await context.params;
  const decodedDocumentId = decodeURIComponent(documentId);
  const document = await getOtaDocumentView(decodedDocumentId);

  return NextResponse.json({
    schema: 'SSF-OTA-BRIDGE-0.1',
    source: document.source === 'kg-live-api' ? 'KUEPER Knowledge Graph Live API' : 'SSF fallback derived from prerequisites',
    document
  });
}
