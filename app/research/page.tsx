import type { Metadata } from 'next';
import Link from 'next/link';
import { getResearchOverview } from '../../lib/ota';

export const metadata: Metadata = {
  title: 'Research · Solar Science Foundation',
  description: 'Primary source documents from the archive — what you need to understand first, and what they lead to.',
};

export default async function ResearchPage() {
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
        }}>Modules lead somewhere. This is where.</h1>
        <p style={{
          color: 'var(--muted)', fontSize: 17, lineHeight: 1.7,
          maxWidth: '58ch', marginBottom: 0
        }}>
          The archive is not the starting point — it&apos;s the destination.
          Every source document below states what you need to understand
          first. Complete that, and the document opens.
        </p>
      </div>

      {/* Available */}
      <div className="container" style={{ marginTop: 52 }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: 10,
          color: 'var(--muted)', letterSpacing: '1.8px',
          textTransform: 'uppercase', marginBottom: 20
        }}>Available now</p>

        {featured.length > 0 ? (
          <div style={{ display: 'grid', gap: 20 }}>
            {featured.map(({ documentId, view }) => (
              <Link
                key={documentId}
                href={`/ota/${encodeURIComponent(documentId)}`}
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
                    }}>See what leads here →</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--muted)' }}>
            No document currently has a published prerequisite path — check back soon.
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
          }}>The archive is larger than this.</p>
          <p style={{
            color: 'var(--muted)', fontSize: 15, lineHeight: 1.7,
            maxWidth: '62ch', margin: 0
          }}>
            {registeredCount} documents are registered in the Knowledge
            Graph. Most don&apos;t have a published prerequisite path yet —
            registering a document and connecting it to what you need to
            know first are two different steps, moving at different speeds.
            This page only shows documents that are genuinely ready to lead
            somewhere. More will appear here as that connective work continues.
          </p>
        </div>
      </div>

    </div>
  );
}
