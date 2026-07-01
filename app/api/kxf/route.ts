import { NextResponse } from 'next/server';
import { findUnresolvedRequirements } from '../../../lib/kxfDiagnostics';
import { fetchKxfSnapshot, normaliseKxfModules } from '../../../lib/kxf';

export async function GET() {
  const snapshot = await fetchKxfSnapshot();
  const unresolvedRequirements = await findUnresolvedRequirements();

  return NextResponse.json({
    schema: 'SSF-KXF-ADAPTER-0.1',
    sourceUrl: snapshot.sourceUrl,
    loaded: snapshot.loaded,
    error: snapshot.error ?? null,
    kxf: snapshot.data ?? null,
    normalised: snapshot.data
      ? {
          modules: normaliseKxfModules(snapshot.data),
          unresolvedRequirements
        }
      : null
  });
}
