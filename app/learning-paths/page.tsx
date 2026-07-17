'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { registeredLearningPaths } from '../../lib/learningPathRegistry';

// ── Cluster-Zuordnung ──────────────────────────────────────
const CLUSTERS: Record<string, { label: string; icon: string; color: string; ids: string[] }> = {
  wasser: {
    label: 'Wasser', icon: '💧', color: '#4488BB',
    ids: [
      'PATH:SSF:PHY-WASSER-MOLEKUEL-0001',
      'PATH:SSF:PHY-WASSER-AGGREGAT-0001',
      'PATH:SSF:PHY-WASSER-ANOMALIE-0001',
      'PATH:SSF:PHY-WASSER-OBERFLAECHE-0001',
      'PATH:SSF:PHY-WASSER-DAMPF-0001',
      'PATH:SSF:CHE-WASSER-LOESUNG-0001',
      'PATH:SSF:PHY-WASSER-WAERME-0001',
    ],
  },
  haushalt: {
    label: 'Reinigung & Materialien', icon: '🧹', color: '#7AAD7A',
    ids: [
      'PATH:SSF:CHE-REINIGUNG-TENSIDE-0001',
      'PATH:SSF:CHE-REINIGUNG-KALK-0001',
      'PATH:SSF:CHE-REINIGUNG-CHLOR-0001',
      'PATH:SSF:PHY-REINIGUNG-OBERFLAECHEN-0001',
      'PATH:SSF:CHE-REINIGUNG-FENSTER-0001',
      'PATH:SSF:CHE-REINIGUNG-ROTWEIN-0001',
      'PATH:SSF:PHY-REINIGUNG-FLIESEN-HOLZ-0001',
      'PATH:SSF:PHY-REINIGUNG-SIEDEPUNKT-0001',
      'PATH:SSF:PHY-REINIGUNG-WAERME-0001',
    ],
  },
  kueche: {
    label: 'Küche & Kochen', icon: '🍳', color: '#C9A84C',
    ids: [
      'PATH:SSF:CHE-KUECHE-KARAMELL-0001',
      'PATH:SSF:CHE-REINIGUNG-EMULSION-0001',
      'PATH:SSF:CHE-REINIGUNG-OSMOSE-0001',
      'PATH:SSF:PHY-KUECHE-SIEDEPUNKT-0001',
      'PATH:SSF:PHY-KUECHE-EMULSION-0001',
      'PATH:SSF:CHE-KUECHE-KOLLAGEN-0001',
    ],
  },
  auto: {
    label: 'Auto & Antrieb', icon: '🚗', color: '#888',
    ids: [
      'PATH:SSF:PHY-AUTO-MOTOR-0001',
      'PATH:SSF:PHY-AUTO-KOLBEN-0001',
      'PATH:SSF:PHY-AUTO-BESCHLEUNIGUNG-0001',
      'PATH:SSF:PHY-AUTO-BREMSE-0001',
      'PATH:SSF:PHY-AUTO-BATTERIE-0001',
      'PATH:SSF:CHE-AUTO-VERBRENNUNG-0001',
      'PATH:SSF:PHY-AUTO-DIFFERENTIAL-0001',
      'PATH:SSF:PHY-ELEKTROMOTOR-BASICS-0001',
      'PATH:SSF:PHY-PUMPE-WASSER-0001',
    ],
  },
  physik: {
    label: 'Physik & Natur', icon: '🌤', color: '#5B8FB9',
    ids: [
      'PATH:SSF:PHY-SKY-0001',
      'PATH:SSF:PHY-WAVE-SPECTRUM-0001',
    ],
  },
  mathematik: {
    label: 'Mathematik', icon: '📐', color: '#DC143C',
    ids: [
      'PATH:SSF:MAT-VEC-0001',
      'PATH:SSF:MAT-LGS-0001',
      'PATH:SSF:MAT-ERROR-0001',
      'PATH:SSF:MAT-SERIES-0001',
      'PATH:SSF:MAT-DIFFGEO-0001',
    ],
  },
  ingenieur: {
    label: 'Ingenieurwesen', icon: '⚙️', color: '#8B6914',
    ids: [
      'PATH:SSF:ENG-DMS-0001',
      'PATH:SSF:ENG-EDM-0001',
      'PATH:SSF:EL-DIODE-0001',
    ],
  },
};

// ── Hilfsfunktion: Einstiegsfrage aus erstem Unit ──────────
function getEntryQuestion(path: (typeof registeredLearningPaths)[number]): string {
  return path.units?.[0]?.entryQuestion ?? path.subtitle ?? path.title;
}

function getClusterForPath(id: string): string {
  for (const [key, cluster] of Object.entries(CLUSTERS)) {
    if (cluster.ids.includes(id)) return key;
  }
  return 'andere';
}

// ── Path card ──────────────────────────────────────────────
function PathCard({ path, clusterColor }: {
  path: (typeof registeredLearningPaths)[number];
  clusterColor: string;
}) {
  const question = getEntryQuestion(path);
  const unitCount = path.units?.length ?? 0;

  return (
    <Link
      href={'/learning-paths/' + encodeURIComponent(path.id)}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <article style={{
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: '20px 22px',
        background: 'var(--panel, #F5F4F0)',
        cursor: 'pointer',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.borderColor = clusterColor;
          (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.07)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
          (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        }}
      >
        {/* Einstiegsfrage */}
        <h3 style={{
          fontFamily: 'var(--font-serif, Georgia, serif)',
          fontSize: 16,
          fontWeight: 'normal',
          lineHeight: 1.35,
          color: 'var(--ink)',
          marginBottom: 10,
          flex: 1,
        }}>
          {question}
        </h3>

        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 'auto', flexWrap: 'wrap' }}>
          {unitCount > 0 && (
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: clusterColor,
              letterSpacing: '.08em',
              textTransform: 'uppercase',
            }}>
              {unitCount} {unitCount === 1 ? 'Kapitel' : 'Kapitel'}
            </span>
          )}
          {path.unlocks?.length > 0 && (
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'var(--muted)',
              letterSpacing: '.06em',
            }}>
              → {path.unlocks[0]}
            </span>
          )}
        </div>
      </article>
    </Link>
  );
}

// ── Haupt-Seite ────────────────────────────────────────────
export default function LearningPathsPage() {
  const [activeCluster, setActiveCluster] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const allPaths = registeredLearningPaths;

  // Paths nach Cluster + Suche filtern
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

  // Gruppiert nach Cluster
  const grouped = useMemo(() => {
    const result: Record<string, typeof filtered> = {};
    const clusterOrder = Object.keys(CLUSTERS).concat(['andere']);
    for (const key of clusterOrder) {
      const paths = filtered.filter(p => getClusterForPath(p.id) === key);
      if (paths.length > 0) result[key] = paths;
    }
    return result;
  }, [filtered]);

  return (
    <div style={{ paddingBottom: 96 }}>

      {/* Header */}
      <header className="container" style={{ paddingTop: 56, paddingBottom: 40 }}>
        <p className="section-eyebrow">Lernreisen</p>
        <h1 className="section-headline" style={{ maxWidth: '22ch', marginBottom: 16 }}>
          Jede Entdeckung beginnt mit einer Frage.
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 17, lineHeight: 1.7, maxWidth: '56ch', marginBottom: 32 }}>
          {allPaths.length} Lernreisen — von der Küche bis zur Physik des Wassers.
          Keine Disziplinlabels, keine Noten. Nur Fragen, die neugierig machen.
        </p>

        {/* Suchfeld */}
        <div style={{ position: 'relative', maxWidth: 480, marginBottom: 28 }}>
          <input
            type="search"
            placeholder="Frage suchen — z.B. 'Warum rostet Eisen' ..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 16px 10px 40px',
              borderRadius: 8,
              border: '1.5px solid var(--border)',
              background: 'var(--panel)',
              fontSize: 15,
              color: 'var(--ink)',
              outline: 'none',
              fontFamily: 'var(--font-sans)',
            }}
          />
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', fontSize: 16 }}>🔍</span>
        </div>

        {/* Cluster-Filter */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveCluster(null)}
            style={{
              padding: '6px 14px',
              borderRadius: 20,
              border: '1.5px solid ' + (activeCluster === null ? 'var(--ink)' : 'var(--border)'),
              background: activeCluster === null ? 'var(--ink)' : 'transparent',
              color: activeCluster === null ? '#fff' : 'var(--muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '.06em',
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
          >
            Alle ({allPaths.length})
          </button>
          {Object.entries(CLUSTERS).map(([key, c]) => {
            const count = allPaths.filter(p => getClusterForPath(p.id) === key).length;
            if (count === 0) return null;
            return (
              <button
                key={key}
                onClick={() => setActiveCluster(activeCluster === key ? null : key)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 20,
                  border: '1.5px solid ' + (activeCluster === key ? c.color : 'var(--border)'),
                  background: activeCluster === key ? c.color + '22' : 'transparent',
                  color: activeCluster === key ? c.color : 'var(--muted)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '.06em',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  transition: 'all 0.15s',
                }}
              >
                {c.icon} {c.label} ({count})
              </button>
            );
          })}
        </div>
      </header>

      {/* Inhalt */}
      <div className="container">
        {Object.keys(grouped).length === 0 ? (
          <p style={{ color: 'var(--muted)', padding: '40px 0' }}>
            Keine Lernreise gefunden für „{search}".
          </p>
        ) : (
          Object.entries(grouped).map(([clusterKey, paths]) => {
            const cluster = CLUSTERS[clusterKey];
            const color = cluster?.color ?? '#888';
            const label = cluster?.label ?? 'Weitere';
            const icon = cluster?.icon ?? '📚';
            return (
              <section key={clusterKey} style={{ marginBottom: 56 }}>
                {/* Cluster-Header */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  marginBottom: 20, paddingBottom: 12,
                  borderBottom: '2px solid ' + color + '44',
                }}>
                  <span style={{ fontSize: 22 }}>{icon}</span>
                  <h2 style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    color,
                    fontWeight: 600,
                  }}>{label}</h2>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: 'var(--muted)',
                  }}>{paths.length} {paths.length === 1 ? 'Lernreise' : 'Lernreisen'}</span>
                </div>

                {/* Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: 14,
                }}>
                  {paths.map(p => (
                    <PathCard key={p.id} path={p} clusterColor={color} />
                  ))}
                </div>
              </section>
            );
          })
        )}

        {/* Horizont */}
        <section style={{ marginTop: 32, paddingTop: 32, borderTop: '1px solid var(--border)' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 16 }}>
            Nächste Horizonte — in Entwicklung
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
            {[
              { q: 'Warum rostet Eisen — aber nicht Edelstahl?', tag: 'Chemie · Korrosion' },
              { q: 'Wie entsteht der Klang einer Geige?', tag: 'Physik · Akustik' },
              { q: 'Warum sind LEDs so effizient?', tag: 'Elektronik · Halbleiter' },
              { q: 'Wie alt ist ein Stern — und woher wissen wir das?', tag: 'Astronomie · Spektren' },
              { q: 'Warum wächst Schimmel in Ecken?', tag: 'Biologie · Pilze' },
              { q: 'Wie speichert ein Kondensator Energie?', tag: 'Elektrotechnik' },
            ].map(h => (
              <div key={h.q} style={{
                padding: '14px 16px',
                border: '1.5px dashed var(--border)',
                borderRadius: 8,
                opacity: 0.6,
              }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 6 }}>{h.tag}</p>
                <p style={{ fontFamily: 'var(--font-serif, Georgia)', fontSize: 15, color: 'var(--ink)', lineHeight: 1.4 }}>{h.q}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
