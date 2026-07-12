import type { Metadata } from 'next';
import Link from 'next/link';
import { getResearchOverview } from '../../../lib/ota';

export const metadata: Metadata = {
  title: 'Research · Solar Science Foundation',
  description: 'Primärquellen aus dem Archiv — was du vorher verstehen musst, und wohin es führt.',
};

export default async function ResearchPageDe() {
  const { featured, registeredCount } = await getResearchOverview();

  return (
    <div style={{ paddingBottom: 96 }}>

      {/* Header */}
      <div className="container" style={{ paddingTop: 56, paddingBottom: 0 }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: 11,
          color: 'var(--gold-2)', letterSpacing: '2.2px',
          textTransform: 'uppercase', fontWeight: 600, marginBottom: 12
        }}>Research</p>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(30px, 4vw, 48px)',
          color: 'var(--navy)', fontWeight: 600,
          lineHeight: 1.1, letterSpacing: '-0.8px',
          marginBottom: 16, maxWidth: '20ch'
        }}>Module führen irgendwohin. Hierhin.</h1>
        <p style={{
          color: 'var(--muted)', fontSize: 17, lineHeight: 1.7,
          maxWidth: '58ch', marginBottom: 0
        }}>
          Das Archiv ist nicht der Einstieg — es ist das Ziel. Jedes
          Quelldokument unten sagt, was du vorher verstehen musst. Erfüllst
          du das, öffnet sich das Dokument.
        </p>
      </div>

      {/* Available */}
      <div className="container" style={{ marginTop: 52 }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: 10,
          color: 'var(--muted)', letterSpacing: '1.8px',
          textTransform: 'uppercase', marginBottom: 20
        }}>Verfügbar</p>

        {featured.length > 0 ? (
          <div style={{ display: 'grid', gap: 20 }}>
            {featured.map(({ documentId, view }) => (
              <Link
                key={documentId}
                href={`/de/ota/${encodeURIComponent(documentId)}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <article style={{
                  borderRadius: 16,
                  padding: '32px 36px',
                  border: '1.5px solid var(--border)',
                  background: 'var(--panel)',
                  boxShadow: '0 4px 20px rgba(30,78,140,.06)',
                  transition: 'box-shadow .2s, border-color .2s',
                  cursor: 'pointer',
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = '0 12px 40px rgba(30,78,140,.13)';
                    el.style.borderColor = 'var(--gold)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = '0 4px 20px rgba(30,78,140,.06)';
                    el.style.borderColor = 'var(--border)';
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10,
                    color: 'var(--muted)', letterSpacing: '1.5px',
                  }}>{view.canonicalId}</span>

                  <h2 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(18px, 2vw, 24px)',
                    color: 'var(--navy)', fontWeight: 600,
                    lineHeight: 1.25, margin: '10px 0 12px'
                  }}>{view.title}</h2>

                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {view.prerequisites.map((p) => (
                      <span key={`${p.domainId}-${p.level}`} style={{
                        fontSize: 12, color: 'var(--muted)',
                        background: 'var(--soft)',
                        border: '1px solid var(--border)',
                        borderRadius: 6, padding: '3px 9px',
                        fontFamily: 'var(--font-mono)'
                      }}>
                        {p.level} · {p.domain?.name ?? p.code}
                      </span>
                    ))}
                  </div>

                  <div style={{ marginTop: 16 }}>
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 14, fontWeight: 600,
                      color: 'var(--navy)'
                    }}>Zeigen, was hierher führt →</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--muted)' }}>
            Für kein Dokument ist aktuell ein Lernpfad veröffentlicht — schau bald wieder vorbei.
          </p>
        )}
      </div>

      {/* Archive scale */}
      <div className="container" style={{ marginTop: 64 }}>
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: 32,
        }}>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 18, color: 'var(--navy)',
            lineHeight: 1.5, fontWeight: 600, marginBottom: 8
          }}>Das Archiv ist größer als das hier.</p>
          <p style={{
            color: 'var(--muted)', fontSize: 15, lineHeight: 1.7,
            maxWidth: '62ch', margin: 0
          }}>
            {registeredCount} Dokumente sind im Knowledge Graph registriert.
            Die meisten haben noch keinen veröffentlichten Lernpfad —
            Registrierung und Verknüpfung mit dem nötigen Vorwissen sind
            zwei getrennte Schritte, die unterschiedlich schnell vorangehen.
            Diese Seite zeigt nur Dokumente, die wirklich irgendwohin führen.
            Mehr kommt dazu, sobald diese Verknüpfungsarbeit weitergeht.
          </p>
        </div>
      </div>

    </div>
  );
}
