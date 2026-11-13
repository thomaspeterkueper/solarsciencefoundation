import type { Metadata } from 'next';
import { getExperimentDefinition } from '../../../../components/learning/experimentRegistry';
import { resolveExperimentComponent } from '../../../../components/learning/experimentResolver';

export const metadata: Metadata = {
  title: 'SSF-Experiment',
  robots: { index: false, follow: false },
};

type PageProps = { params: Promise<{ id: string }> };

/**
 * Einbettbare Einzelansicht eines SSF-Experiments ohne Kopf- und Fußzeile.
 * NOXIA zeigt sie im Lernraum in einem Rahmen an (siehe /api/noxia/modules/{id}, Sektionstyp `embed`).
 */
export default async function EmbeddedExperimentPage({ params }: PageProps) {
  const { id: rawId } = await params;
  const id = decodeURIComponent(rawId);
  const Experiment =
    resolveExperimentComponent({ id, kind: 'experiment', title: id, summary: '', interactiveId: id } as never) ??
    getExperimentDefinition(id)?.component;

  return (
    <>
      <style>{`
        .site-header, footer { display: none !important; }
        body { background: #fff; }
        main { padding: 0 !important; margin: 0 !important; }
      `}</style>
      <div style={{ padding: 12, maxWidth: 960, margin: '0 auto' }}>
        {Experiment ? (
          <Experiment />
        ) : (
          <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: 13, color: '#6b6357' }}>
            Für „{id}“ ist in SSF noch kein interaktives Modell hinterlegt.
          </p>
        )}
      </div>
    </>
  );
}
