import type { Metadata } from 'next';
import Link from 'next/link';
import { getOtaDocumentView } from '../../../lib/ota';

type PageProps = {
  params: Promise<{ documentId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { documentId } = await params;
  const view = await getOtaDocumentView(decodeURIComponent(documentId));
  return { title: `${view.title} · OTA · Solar Science Foundation` };
}

export default async function OtaDocumentPage({ params }: PageProps) {
  const { documentId } = await params;
  const view = await getOtaDocumentView(decodeURIComponent(documentId));

  return (
    <div className="container reading" style={{ paddingTop: 64, paddingBottom: 96 }}>
      <p className="section-eyebrow">OTA document bridge</p>
      <h1 className="section-headline" style={{ marginBottom: 14 }}>{view.title}</h1>
      <p style={{ color: 'var(--muted)', fontSize: 18, lineHeight: 1.65, marginBottom: 28 }}>
        This page shows what prior knowledge is needed to read this archive document,
        and which SSF modules can help you get there.
      </p>

      <div className="entry-card" style={{ marginBottom: 28 }}>
        <p className="mono" style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>Document</p>
        <strong style={{ color: 'var(--navy)' }}>{view.canonicalId}</strong>
        <p style={{ color: 'var(--muted)', marginTop: 12, marginBottom: 0 }}>
          Source: {view.source === 'kg-live-api' ? 'KG Live API' : 'SSF fallback until the KG live resolution lands'}
        </p>
      </div>

      <section style={{ marginTop: 44 }}>
        <p className="section-eyebrow">Prerequisites</p>
        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-2)', fontSize: 32, marginBottom: 18 }}>
          What you should understand first
        </h2>
        {view.prerequisites.length > 0 ? (
          <div style={{ display: 'grid', gap: 14 }}>
            {view.prerequisites.map((item) => (
              <div key={`${item.domainId}-${item.level}-${item.purpose}`} className="field-card">
                <small>{item.level} · {item.purpose === 'create' ? 'To create' : item.purpose === 'recommended' ? 'Recommended' : 'To read'}</small>
                <strong>{item.domain?.name ?? item.code}</strong>
                <p>{item.description ?? item.domain?.description ?? 'This knowledge domain is referenced as a prerequisite.'}</p>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--muted)' }}>No prerequisites have been published in the Knowledge Graph for this document yet.</p>
        )}
      </section>

      <section style={{ marginTop: 56 }}>
        <p className="section-eyebrow">Learning path</p>
        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy-2)', fontSize: 32, marginBottom: 18 }}>
          Possible SSF modules on the way
        </h2>
        {view.suggestedModules.length > 0 ? (
          <div style={{ display: 'grid', gap: 14 }}>
            {view.suggestedModules.map((module) => (
              <Link key={module.id} href={`/modules/${module.id}`} className="field-card">
                <small>{module.domain} · {module.durationMinutes} min</small>
                <strong>{module.title}</strong>
                <p>{module.summary || 'This module is part of the recommended prior knowledge.'}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--muted)' }}>
            A concrete learning path will appear here once the Knowledge Graph publishes matching PATH/module references.
          </p>
        )}
      </section>
    </div>
  );
}
