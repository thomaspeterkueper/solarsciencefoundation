'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { registeredLearningPaths } from '../../lib/learningPathRegistry';

// ── Cluster-Definition ─────────────────────────────────────
const CLUSTERS: Record<string, {
  label: string; icon: string; color: string;
  horizon: string; ids: string[];
}> = {
  wasser: {
    label: 'Wasser', icon: '💧', color: '#4488BB',
    horizon: 'Als nächstes: Wie kühlt ein Kühlschrank? — Verdampfungswärme und Kreisprozesse',
    ids: [
      'PATH:SSF:PHY-WASSER-MOLEKUEL-0001','PATH:SSF:PHY-WASSER-AGGREGAT-0001',
      'PATH:SSF:PHY-WASSER-ANOMALIE-0001','PATH:SSF:PHY-WASSER-OBERFLAECHE-0001',
      'PATH:SSF:PHY-WASSER-DAMPF-0001','PATH:SSF:CHE-WASSER-LOESUNG-0001',
      'PATH:SSF:PHY-WASSER-WAERME-0001',
    ],
  },
  haushalt: {
    label: 'Reinigung & Materialien', icon: '🧹', color: '#7AAD7A',
    horizon: 'Als nächstes: Warum rostet Eisen — aber nicht Edelstahl? — Korrosion und Passivschicht',
    ids: [
      'PATH:SSF:CHE-REINIGUNG-TENSIDE-0001','PATH:SSF:CHE-REINIGUNG-KALK-0001',
      'PATH:SSF:CHE-REINIGUNG-CHLOR-0001','PATH:SSF:PHY-REINIGUNG-OBERFLAECHEN-0001',
      'PATH:SSF:CHE-REINIGUNG-FENSTER-0001','PATH:SSF:CHE-REINIGUNG-ROTWEIN-0001',
      'PATH:SSF:PHY-REINIGUNG-FLIESEN-HOLZ-0001','PATH:SSF:PHY-REINIGUNG-SIEDEPUNKT-0001',
      'PATH:SSF:PHY-REINIGUNG-WAERME-0001',
    ],
  },
  kueche: {
    label: 'Küche & Kochen', icon: '🍳', color: '#C9A84C',
    horizon: 'Als nächstes: Warum schmeckt eine Prise Salz Schokolade besser? — Geschmack und Sensorik',
    ids: [
      'PATH:SSF:CHE-KUECHE-KARAMELL-0001','PATH:SSF:CHE-REINIGUNG-EMULSION-0001',
      'PATH:SSF:CHE-REINIGUNG-OSMOSE-0001','PATH:SSF:PHY-KUECHE-SIEDEPUNKT-0001',
      'PATH:SSF:PHY-KUECHE-EMULSION-0001','PATH:SSF:CHE-KUECHE-KOLLAGEN-0001',
    ],
  },
  auto: {
    label: 'Auto & Antrieb', icon: '🚗', color: '#888',
    horizon: 'Als nächstes: Wie speichert ein Schwungrad Energie? — Trägheitsmoment und Rotationsenergie',
    ids: [
      'PATH:SSF:PHY-AUTO-MOTOR-0001','PATH:SSF:PHY-AUTO-KOLBEN-0001',
      'PATH:SSF:PHY-AUTO-BESCHLEUNIGUNG-0001','PATH:SSF:PHY-AUTO-BREMSE-0001',
      'PATH:SSF:PHY-AUTO-BATTERIE-0001','PATH:SSF:CHE-AUTO-VERBRENNUNG-0001',
      'PATH:SSF:PHY-AUTO-DIFFERENTIAL-0001','PATH:SSF:PHY-ELEKTROMOTOR-BASICS-0001',
      'PATH:SSF:PHY-PUMPE-WASSER-0001',
    ],
  },
  energie: {
    label: 'Energie & Rohstoffe', icon: '⚡', color: '#C9A84C',
    horizon: 'Als nächstes: Wie funktioniert ein Solarpanel? — Photoelektrischer Effekt und Halbleiter',
    ids: [
      'PATH:SSF:PHY-PIEZO-0001',
      'PATH:SSF:CHE-IRIDIUM-0001',
      'PATH:SSF:PHY-ELEKTROLYSE-0001',
      'PATH:SSF:ENV-ROHSTOFFE-ENERGIEWENDE-0001',
    ],
  },
  // REMOVED
    label: 'Energie & neue Materialien', icon: '⚡', color: '#C9A84C',
    horizon: 'Als nächstes: Wie funktioniert ein Solarpanel? — Photoelektrischer Effekt und Halbleiter',
    ids: ['PATH:SSF:PHY-PIEZO-0001'],
  },
  physik: {
    label: 'Physik & Natur', icon: '🌤', color: '#5B8FB9',
    horizon: 'Als nächstes: Wie entsteht ein Regenbogen? — Brechung, Dispersion und Totalreflexion',
    ids: [
      'PATH:SSF:PHY-SKY-0001',
      'PATH:SSF:PHY-WAVE-SPECTRUM-0001',
      'PATH:SSF:PHY-MAGNETISMUS-0001',
    ],
  },
  mathematik: {
    label: 'Mathematik', icon: '📐', color: '#DC143C',
    horizon: 'Als nächstes: Wie transformiert man viele Vektoren gleichzeitig? — Matrizen und lineare Abbildungen',
    ids: [
      'PATH:SSF:MAT-VEC-0001','PATH:SSF:MAT-LGS-0001','PATH:SSF:MAT-ERROR-0001',
      'PATH:SSF:MAT-SERIES-0001','PATH:SSF:MAT-DIFFGEO-0001',
    ],
  },
  astrobiologie: {
    label: 'Astrobiologie & Ursprung', icon: '🔭', color: '#B464FF',
    horizon: 'Als nächstes: Wie sucht James Webb nach Leben? — Biosignaturen und Exoplaneten-Atmosphären',
    ids: [
      'PATH:SSF:CHE-ZUCKER-MOLEKUEL-0001',
      'PATH:SSF:CHE-ZUCKER-WELTALL-0001',
      'PATH:SSF:BIO-LEBEN-URSPRUNG-0001',
    ],
  },
  wirtschaft: {
    label: 'Wirtschaft & Finanzen', icon: '📈', color: '#7AAD7A',
    horizon: 'Als nächstes: Wie funktioniert Inflation? — Kaufkraft, Geldmenge und Preise',
    ids: [
      'PATH:SSF:ECO-KREDIT-0001',
      'PATH:SSF:ECO-ZINS-0001',
    ],
  },
  ingenieur: {
    label: 'Ingenieurwesen', icon: '⚙️', color: '#8B6914',
    horizon: 'Als nächstes: Wie entsteht der Entladekreis beim Erodieren? — Kondensatoren und RC-Glieder',
    ids: ['PATH:SSF:ENG-DMS-0001','PATH:SSF:ENG-EDM-0001','PATH:SSF:EL-DIODE-0001'],
  },
};

function getEntryQuestion(path: (typeof registeredLearningPaths)[number]): string {
  return path.units?.[0]?.entryQuestion ?? path.subtitle ?? path.title;
}

function getClusterForPath(id: string): string {
  for (const [key, c] of Object.entries(CLUSTERS)) {
    if (c.ids.includes(id)) return key;
  }
  return 'andere';
}

function estimateMinutes(path: (typeof registeredLearningPaths)[number]): number {
  const sections = path.units?.reduce((n, u) => n + (u.sections?.length ?? 0), 0) ?? 0;
  return Math.max(10, sections * 4);
}

function countExperiments(path: (typeof registeredLearningPaths)[number]): number {
  return path.units?.reduce((n, u) =>
    n + (u.sections?.filter(s => s.kind === 'experiment').length ?? 0), 0) ?? 0;
}

// ── Path Card ──────────────────────────────────────────────
function PathCard({ path, color }: {
  path: (typeof registeredLearningPaths)[number];
  color: string;
}) {
  const question = getEntryQuestion(path);
  const mins = estimateMinutes(path);
  const expCount = countExperiments(path);

  return (
    <Link
      href={'/learning-paths/' + encodeURIComponent(path.id)}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
    >
      <article style={{
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: '22px 22px 18px',
        background: 'var(--panel, #F5F4F0)',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        transition: 'border-color 0.15s, box-shadow 0.15s, transform 0.15s',
      }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = color;
          el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
          el.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = 'var(--border)';
          el.style.boxShadow = 'none';
          el.style.transform = 'none';
        }}
      >
        {/* Einstiegsfrage — visuell dominant */}
        <h3 style={{
          fontFamily: 'var(--font-serif, Georgia, serif)',
          fontSize: 17,
          fontWeight: 'normal',
          lineHeight: 1.35,
          color: 'var(--ink)',
          flex: 1,
          margin: 0,
        }}>
          {question}
        </h3>

        {/* Meta-Zeile */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          flexWrap: 'wrap', marginTop: 'auto',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10,
            color: 'var(--muted)', letterSpacing: '.06em',
          }}>⏱ ca. {mins} Min.</span>
          {expCount > 0 && (
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              color: color, letterSpacing: '.06em',
            }}>🧪 {expCount} {expCount === 1 ? 'Experiment' : 'Experimente'}</span>
          )}
          <span style={{
            marginLeft: 'auto',
            fontFamily: 'var(--font-mono)', fontSize: 10,
            color: 'var(--muted)',
          }}>Entdecken →</span>
        </div>
      </article>
    </Link>
  );
}

// ── Hauptseite ─────────────────────────────────────────────
export default function LearningPathsPage() {
  const router = useRouter();
  const [activeCluster, setActiveCluster] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const allPaths = registeredLearningPaths;

  // Zufallsfrage
  const goRandom = useCallback(() => {
    const idx = Math.floor(Math.random() * allPaths.length);
    const p = allPaths[idx];
    router.push('/learning-paths/' + encodeURIComponent(p.id));
  }, [allPaths, router]);

  const filtered = useMemo(() => {
    return allPaths.filter(p => {
      const q = getEntryQuestion(p).toLowerCase();
      const t = p.title.toLowerCase();
      const matchSearch = !search || q.includes(search.toLowerCase()) || t.includes(search.toLowerCase());
      const cluster = getClusterForPath(p.id);
      const matchCluster = !activeCluster || cluster === activeCluster;
      return matchSearch && matchCluster;
    });
  }, [allPaths, search, activeCluster]);

  const grouped = useMemo(() => {
    const result: Record<string, typeof filtered> = {};
    for (const key of [...Object.keys(CLUSTERS), 'andere']) {
      const paths = filtered.filter(p => getClusterForPath(p.id) === key);
      if (paths.length > 0) result[key] = paths;
    }
    return result;
  }, [filtered]);

  return (
    <div style={{ paddingBottom: 96 }}>

      {/* ── Header ── */}
      <header className="container" style={{ paddingTop: 56, paddingBottom: 40 }}>
        <p className="section-eyebrow">Lernreisen</p>
        <h1 className="section-headline" style={{ maxWidth: '26ch', marginBottom: 12 }}>
          Stell dir die Frage, die dir beim Kochen, Autofahren oder Basteln kommt.
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.7, maxWidth: '58ch', marginBottom: 32 }}>
          {allPaths.length} Lernreisen — von der Küche bis zur Physik des Wassers.
          Keine Disziplinlabels. Keine Noten. Nur Fragen, die neugierig machen.
          Wir helfen dir, sie selbst zu beantworten — mit Experimenten und Entdeckungen.
        </p>

        {/* Suche + Zufall */}
        <div style={{ display: 'flex', gap: 10, maxWidth: 600, marginBottom: 24, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
            <input
              type="search"
              placeholder="Frage suchen — z.B. 'Warum friert Wasser' ..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '10px 16px 10px 38px',
                borderRadius: 8, border: '1.5px solid var(--border)',
                background: 'var(--panel)', fontSize: 14,
                color: 'var(--ink)', outline: 'none',
                fontFamily: 'var(--font-sans)',
                boxSizing: 'border-box',
              }}
            />
            <span style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }}>🔍</span>
          </div>
          <button
            onClick={goRandom}
            title="Zufällige Lernreise"
            style={{
              padding: '10px 18px',
              borderRadius: 8,
              border: '1.5px solid var(--border)',
              background: 'var(--panel)',
              color: 'var(--ink)',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              cursor: 'pointer',
              letterSpacing: '.04em',
              whiteSpace: 'nowrap',
            }}
          >
            🎲 Zufallsfrage
          </button>
        </div>

        {/* Cluster-Filter */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveCluster(null)}
            style={{
              padding: '5px 14px', borderRadius: 20,
              border: '1.5px solid ' + (activeCluster === null ? 'var(--ink)' : 'var(--border)'),
              background: activeCluster === null ? 'var(--ink)' : 'transparent',
              color: activeCluster === null ? '#fff' : 'var(--muted)',
              fontFamily: 'var(--font-mono)', fontSize: 11,
              letterSpacing: '.06em', cursor: 'pointer', textTransform: 'uppercase',
            }}
          >Alle ({allPaths.length})</button>
          {Object.entries(CLUSTERS).map(([key, c]) => {
            const count = allPaths.filter(p => getClusterForPath(p.id) === key).length;
            if (!count) return null;
            const active = activeCluster === key;
            return (
              <button key={key}
                onClick={() => setActiveCluster(active ? null : key)}
                style={{
                  padding: '5px 14px', borderRadius: 20,
                  border: '1.5px solid ' + (active ? c.color : 'var(--border)'),
                  background: active ? c.color + '22' : 'transparent',
                  color: active ? c.color : 'var(--muted)',
                  fontFamily: 'var(--font-mono)', fontSize: 11,
                  letterSpacing: '.06em', cursor: 'pointer', textTransform: 'uppercase',
                  transition: 'all .15s',
                }}
              >{c.icon} {c.label} ({count})</button>
            );
          })}
        </div>
      </header>

      {/* ── Inhalt ── */}
      <div className="container">
        {Object.keys(grouped).length === 0 ? (
          <div style={{ padding: '60px 0', textAlign: 'center' }}>
            <p style={{ fontSize: 28, marginBottom: 12 }}>🔍</p>
            <p style={{ color: 'var(--muted)', fontSize: 16 }}>
              Keine Lernreise gefunden für „{search}".
            </p>
            <button onClick={() => setSearch('')} style={{
              marginTop: 12, padding: '8px 18px', borderRadius: 6,
              border: '1px solid var(--border)', background: 'none',
              color: 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 12,
            }}>Suche zurücksetzen</button>
          </div>
        ) : (
          Object.entries(grouped).map(([key, paths]) => {
            const c = CLUSTERS[key];
            const color = c?.color ?? '#888';
            return (
              <section key={key} style={{ marginBottom: 60 }}>

                {/* Cluster-Header */}
                <div style={{
                  display: 'flex', alignItems: 'baseline', gap: 10,
                  marginBottom: 18, paddingBottom: 10,
                  borderBottom: '2px solid ' + color + '55',
                }}>
                  <span style={{ fontSize: 20 }}>{c?.icon ?? '📚'}</span>
                  <h2 style={{
                    fontFamily: 'var(--font-mono)', fontSize: 12,
                    letterSpacing: '.1em', textTransform: 'uppercase',
                    color, fontWeight: 600, margin: 0,
                  }}>{c?.label ?? 'Weitere'}</h2>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>
                    {paths.length} {paths.length === 1 ? 'Lernreise' : 'Lernreisen'}
                  </span>
                </div>

                {/* Karten-Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
                  gap: 12,
                  marginBottom: 16,
                }}>
                  {paths.map(p => <PathCard key={p.id} path={p} color={color} />)}
                </div>

                {/* Horizont-Hinweis */}
                {c?.horizon && !search && !activeCluster && (
                  <div style={{
                    padding: '10px 14px',
                    border: '1.5px dashed ' + color + '55',
                    borderRadius: 8,
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <span style={{ color, fontSize: 14 }}>→</span>
                    <p style={{
                      fontFamily: 'var(--font-mono)', fontSize: 11,
                      color: 'var(--muted)', letterSpacing: '.04em', margin: 0,
                    }}>{c.horizon}</p>
                  </div>
                )}
              </section>
            );
          })
        )}

        {/* ── Horizont-Sektion ── */}
        {!search && !activeCluster && (
          <section style={{ marginTop: 8, paddingTop: 36, borderTop: '1px solid var(--border)' }}>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em',
              textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 16,
            }}>Nächste Horizonte — in Entwicklung</p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: 10,
            }}>
              {[
                { q: 'Warum rostet Eisen — aber nicht Edelstahl?', tag: 'Chemie · Korrosion' },
                { q: 'Wie entsteht ein Regenbogen?', tag: 'Physik · Optik' },
                { q: 'Warum sind LEDs so effizient?', tag: 'Elektronik · Halbleiter' },
                { q: 'Warum wächst Schimmel in Ecken?', tag: 'Biologie · Pilze' },
                { q: 'Wie speichert ein Kondensator Energie?', tag: 'Elektrotechnik' },
                { q: 'Warum schmeckt eine Prise Salz Schokolade besser?', tag: 'Chemie · Sensorik' },
              ].map(h => (
                <div key={h.q} style={{
                  padding: '14px 16px',
                  border: '1.5px dashed var(--border)',
                  borderRadius: 8, opacity: 0.55,
                }}>
                  <p style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10,
                    color: 'var(--muted)', letterSpacing: '.06em',
                    textTransform: 'uppercase', marginBottom: 6,
                  }}>{h.tag}</p>
                  <p style={{
                    fontFamily: 'var(--font-serif, Georgia)', fontSize: 14,
                    color: 'var(--ink)', lineHeight: 1.4, margin: 0,
                  }}>{h.q}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
