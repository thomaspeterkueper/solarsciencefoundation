import Link from 'next/link';
import type { Metadata } from 'next';
import { getOtaDocumentView } from '../../../../lib/ota';

type PageProps = {
  params: Promise<{ documentId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { documentId } = await params;
  const view = await getOtaDocumentView(decodeURIComponent(documentId));
  return { title: `${view.title} · OTA · Solar Science Foundation` };
}

export default async function GermanOtaDocumentPage({ params }: PageProps) {
  const { documentId } = await params;
  const view = await getOtaDocumentView(decodeURIComponent(documentId));

  return (
    <div className="container reading" style={{ paddingTop: 64, paddingBottom: 96 }}>
      <p className="section-eyebrow">OTA-Dokument-Bridge</p>
      <h1 className="section-headline" style={{ marginBottom: 14 }}>{view.title}</h1>
      <p style={{ color: 'var(--muted)', fontSize: 18, lineHeight: 1.65, marginBottom: 28 }}>
        Diese Seite zeigt, welches Vorwissen nötig ist, um das Archivdokument zu lesen,
        und welche SSF-Module auf dem Weg dorthin helfen können.
      </p>

      <div className="entry-card" style={{ marginBottom: 28 }}>
        <p className="mono" style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>Dokument</p>
        <strong style={{ color: 'var(--navy)' }}>{view.canonicalId}</strong>
        <p style={{ color: 'var(--muted)', marginTop: 12, marginBottom: 0 }}>
          Quelle: {view.source === 'kg-live-api' ? 'KG Live API' : 'SSF-Fallback bis zur KG-Live-Auflösung'}
        </p>
      </div>

      <section style={{ marginTop: 44 }}>
        <p className="section-eyebrow">Voraussetzungen</p>
        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-2)', fontSize: 32, marginBottom: 18 }}>
          Was du vorher verstehen solltest
        </h2>
        {view.prerequisites.length > 0 ? (
          <div style={{ display: 'grid', gap: 14 }}>
            {view.prerequisites.map((item) => (
              <div key={`${item.domainId}-${item.level}-${item.purpose}`} className="field-card">
                <small>{item.level} · {item.purpose === 'create' ? 'Zum Erstellen' : item.purpose === 'recommended' ? 'Empfohlen' : 'Zum Lesen'}</small>
                <strong>{item.domain?.name ?? item.code}</strong>
                <p>{item.description ?? item.domain?.description ?? 'Dieses Wissensgebiet wird als Voraussetzung referenziert.'}</p>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--muted)' }}>Für dieses Dokument sind noch keine Voraussetzungen im KG veröffentlicht.</p>
        )}
      </section>

      <section style={{ marginTop: 56 }}>
        <p className="section-eyebrow">Lernpfad</p>
        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-2)', fontSize: 32, marginBottom: 18 }}>
          Mögliche SSF-Module auf dem Weg
        </h2>
        {view.suggestedModules.length > 0 ? (
          <div style={{ display: 'grid', gap: 14 }}>
            {view.suggestedModules.map((module) => (
              <Link key={module.id} href={`/de/modules/${module.id}`} className="field-card">
                <small>{module.domain} · {module.durationMinutes} min</small>
                <strong>{module.title}</strong>
                <p>{module.summary || 'Dieses Modul gehört zum empfohlenen Vorwissen.'}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--muted)' }}>
            Der konkrete Lernpfad wird angezeigt, sobald der KG passende PATH-/Modulbezüge veröffentlicht.
          </p>
        )}
      </section>
    </div>
  );
}
