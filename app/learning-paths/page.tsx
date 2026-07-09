import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { learningPaths } from '../../lib/learningPaths';

export const metadata: Metadata = {
  title: 'Learning Paths · Solar Science Foundation',
  description: 'Structured paths through connected knowledge — from everyday observations to deeper understanding.',
};

// Paths that are coming next — shown as locked previews
// These grow organically from the prerequisites of existing paths
const HORIZON_PATHS = [
  {
    title: 'Wie alt ist ein Stern — und wie kann man das wissen?',
    tag: 'Astronomie · Zeit',
    dependsOn: 'PATH:SSF:PHY-WAVE-SPECTRUM-0001',
    note: 'Baut auf Absorptionslinien und Lichtlaufzeit auf',
  },
  {
    title: 'Warum klingen manche Akkorde schön — und andere nicht?',
    tag: 'Klang · Mathematik',
    dependsOn: 'PATH:SSF:PHY-WAVE-SPECTRUM-0001',
    note: 'Baut auf Obertönen und Frequenzverhältnissen auf',
  },
  {
    title: 'Warum ist Wasser flüssig — obwohl H₂ und O₂ beide Gase sind?',
    tag: 'Chemie · Bindungen',
    dependsOn: 'PATH:SSF:PHY-SKY-0001',
    note: 'Öffnet sich nach dem Atmosphären-Pfad',
  },
];

// Observation images associated with each active path
const PATH_IMAGES: Record<string, { src: string; alt: string }> = {
  'PATH:SSF:PHY-WAVE-SPECTRUM-0001': {
    src: '/images/observations/kaffeetasse-tku.jpg',
    alt: 'Kaffeetasse mit Löffel — Einstieg in Klang und Schwingungen',
  },
  'PATH:SSF:PHY-SKY-0001': {
    src: '/images/observations/rolladen-tku.jpg',  // placeholder until sky photo arrives
    alt: 'Lichtspektren durch Rolladen — Einstieg in Licht und Streuung',
  },
};

export default function LearningPathsPage() {
  return (
    <div style={{ paddingBottom: 96 }}>

      {/* ── Header ── */}
      <div className="container" style={{ paddingTop: 56, paddingBottom: 0 }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: 11,
          color: 'var(--gold-2)', letterSpacing: '2.2px',
          textTransform: 'uppercase', fontWeight: 600, marginBottom: 12
        }}>Lernpfade</p>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(30px, 4vw, 48px)',
          color: 'var(--navy)', fontWeight: 600,
          lineHeight: 1.1, letterSpacing: '-0.8px',
          marginBottom: 16, maxWidth: '18ch'
        }}>Wissen ist kein Weg.<br />Es ist ein Netz.</h1>
        <p style={{
          color: 'var(--muted)', fontSize: 17, lineHeight: 1.7,
          maxWidth: '58ch', marginBottom: 0
        }}>
          Jeder Pfad beginnt mit einer Alltagsbeobachtung. Er endet nicht —
          er verzweigt. Was du hier lernst, öffnet drei neue Fragen.
          Und manche Pfade führen in NOχ¹Δ.
        </p>
      </div>

      {/* ── Active paths ── */}
      <div className="container" style={{ marginTop: 52 }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: 10,
          color: 'var(--muted)', letterSpacing: '1.8px',
          textTransform: 'uppercase', marginBottom: 20
        }}>Verfügbar</p>

        <div style={{ display: 'grid', gap: 20 }}>
          {learningPaths.map((path) => {
            const img = PATH_IMAGES[path.id];
            const firstUnit = path.units[0];
            const totalSections = path.units.reduce((s, u) => s + u.sections.length, 0);
            const hasExperiments = path.units.some(u =>
              u.sections.some(s => s.interactive)
            );

            return (
              <Link
                key={path.id}
                href={`/learning-paths/${encodeURIComponent(path.id)}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <article style={{
                  display: 'grid',
                  gridTemplateColumns: img ? '280px 1fr' : '1fr',
                  borderRadius: 16,
                  overflow: 'hidden',
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
                  {/* Image */}
                  {img && (
                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                      <Image
                        src={img.src} alt={img.alt} fill
                        style={{ objectFit: 'cover' }}
                        sizes="280px"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', gap: 12 }}>

                    {/* Status + units */}
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: 10,
                        color: path.status === 'active' ? 'var(--success)' : 'var(--gold-2)',
                        letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600
                      }}>
                        {path.status === 'active' ? '● Aktiv' : '◐ Prototyp'}
                      </span>
                      <span style={{ color: 'var(--border)' }}>·</span>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: 10,
                        color: 'var(--muted)', letterSpacing: '1px'
                      }}>
                        {path.units.length} Einheiten · {totalSections} Abschnitte
                        {hasExperiments ? ' · Experimente' : ''}
                      </span>
                    </div>

                    {/* Entry question */}
                    {firstUnit?.entryQuestion && (
                      <h2 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(18px, 2vw, 24px)',
                        color: 'var(--navy)', fontWeight: 600,
                        lineHeight: 1.25, margin: 0
                      }}>{firstUnit.entryQuestion}</h2>
                    )}

                    <p style={{
                      color: 'var(--muted)', fontSize: 15,
                      lineHeight: 1.65, margin: 0, maxWidth: '52ch'
                    }}>{path.subtitle}</p>

                    {/* Units preview */}
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
                      {path.units.map((u, i) => (
                        <span key={u.id} style={{
                          fontSize: 12, color: 'var(--muted)',
                          background: 'var(--soft)',
                          border: '1px solid var(--border)',
                          borderRadius: 6, padding: '3px 9px',
                          fontFamily: 'var(--font-mono)'
                        }}>
                          {i + 1}. {u.title}
                        </span>
                      ))}
                    </div>

                    {/* NOXIA unlocks */}
                    {path.unlocks.length > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
                        <span style={{
                          fontFamily: 'var(--font-mono)', fontSize: 10,
                          color: 'var(--muted)', letterSpacing: '1px'
                        }}>NOχ¹Δ</span>
                        {path.unlocks.map(key => (
                          <span key={key} style={{
                            fontFamily: 'var(--font-mono)', fontSize: 10,
                            color: 'var(--navy)',
                            background: '#FFF8E7',
                            border: '1px solid rgba(244,163,0,.4)',
                            padding: '2px 7px', borderRadius: 4
                          }}>{key}</span>
                        ))}
                      </div>
                    )}

                    <div style={{ marginTop: 'auto', paddingTop: 8 }}>
                      <span style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 14, fontWeight: 600,
                        color: 'var(--navy)'
                      }}>Pfad beginnen →</span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Horizon — locked paths ── */}
      <div className="container" style={{ marginTop: 64 }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: 10,
          color: 'var(--muted)', letterSpacing: '1.8px',
          textTransform: 'uppercase', marginBottom: 8
        }}>Nächster Horizont</p>
        <p style={{
          color: 'var(--muted)', fontSize: 15,
          lineHeight: 1.6, maxWidth: '54ch', marginBottom: 24
        }}>
          Diese Pfade entstehen aus dem was du bereits gelernt hast.
          Sie warten bis die Voraussetzungen erfüllt sind.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {HORIZON_PATHS.map((h) => (
            <div key={h.title} style={{
              border: '1.5px dashed var(--border)',
              borderRadius: 14, padding: '24px 26px',
              background: 'var(--soft)',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Blur overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                backdropFilter: 'blur(0px)',
                background: 'rgba(250,250,248,0.0)',
              }} />

              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 10,
                color: 'var(--gold-2)', letterSpacing: '1.5px',
                textTransform: 'uppercase', fontWeight: 600,
                display: 'block', marginBottom: 10
              }}>{h.tag}</span>

              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 17, color: 'var(--navy)',
                lineHeight: 1.35, fontWeight: 600,
                marginBottom: 14
              }}>{h.title}</p>

              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: 12, color: 'var(--muted)',
                fontFamily: 'var(--font-mono)'
              }}>
                <span style={{ opacity: 0.6 }}>⟳</span>
                <span>{h.note}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Graph note ── */}
      <div className="container" style={{ marginTop: 64 }}>
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: 32,
          display: 'flex', gap: 48, flexWrap: 'wrap', alignItems: 'flex-start'
        }}>
          <div style={{ flex: '1 1 280px' }}>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 18, color: 'var(--navy)',
              lineHeight: 1.5, fontWeight: 600, marginBottom: 8
            }}>Pfade entstehen nicht geplant.</p>
            <p style={{
              color: 'var(--muted)', fontSize: 15, lineHeight: 1.7, margin: 0
            }}>
              Jedes Modul hat Voraussetzungen. Aus diesen Voraussetzungen
              ergibt sich automatisch, welche Pfade möglich werden.
              Kein Lehrplan — ein wachsendes Netz.
            </p>
          </div>
          <div style={{ flex: '1 1 280px' }}>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 18, color: 'var(--navy)',
              lineHeight: 1.5, fontWeight: 600, marginBottom: 8
            }}>Tiefe ist asymptotisch.</p>
            <p style={{
              color: 'var(--muted)', fontSize: 15, lineHeight: 1.7, margin: 0
            }}>
              100% wird nie erreicht. Nicht weil etwas fehlt —
              sondern weil jede Antwort drei neue Fragen öffnet.
              Das ist kein Fehler. Das ist Ehrlichkeit.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
