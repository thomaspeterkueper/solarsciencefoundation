'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { KxfLearningModule, SubjectCode } from './types';
import { SUBJECT_CONFIG } from '../../lib/learning-modules';
import { GridView } from './GridView';
import { GraphView } from './GraphView';
import { DetailPanel } from './DetailPanel';
import { registeredLearningPaths } from '../../lib/learningPathRegistry';

// ── Cluster-Farben (konsistent mit learning-paths/page.tsx) ──
const CLUSTER_COLORS: Record<string, string> = {
  PHY: '#5B8FB9', CHE: '#7AAD7A', MAT: '#DC143C',
  ENG: '#8B6914', BIO: '#7AAD7A', AST: '#4488BB', EAR: '#5B8FB9',
};

// Größen für die Frage-Cloud: 5 Gewichtsklassen
function questionWeight(path: (typeof registeredLearningPaths)[number]): number {
  const expCount = path.units?.reduce((n, u) =>
    n + (u.sections?.filter(s => s.kind === 'experiment').length ?? 0), 0) ?? 0;
  const unitCount = path.units?.length ?? 0;
  return Math.min(5, 1 + Math.floor((expCount + unitCount) / 3));
}

const WEIGHT_SIZES = [14, 16, 17, 19, 21]; // px font-size per weight class

type View = 'cloud' | 'grid' | 'graph';
type Filter = SubjectCode | 'ALL';

// ── Cluster-Zuordnung (IDs → Subject) ──
const PATH_SUBJECT: Record<string, SubjectCode> = {};
// Automatisch aus Path-IDs ableiten
for (const p of []) { void p; } // populated below

function getSubjectFromPathId(id: string): SubjectCode {
  if (id.includes(':CHE:') || id.includes('CHE-')) return 'CHE';
  if (id.includes(':MAT:') || id.includes('MAT-')) return 'MAT';
  if (id.includes(':ENG:') || id.includes('ENG-') || id.includes('EL-')) return 'ENG';
  if (id.includes(':BIO:') || id.includes('BIO-')) return 'BIO';
  return 'PHY';
}

// ── Haupt-Komponente ──────────────────────────────────────
export function LearnMap({ modules }: { modules: KxfLearningModule[] }) {
  const router = useRouter();
  const [view, setView]     = useState<View>('cloud');
  const [filter, setFilter] = useState<Filter>('ALL');
  const [search, setSearch] = useState('');
  const [detail, setDetail] = useState<KxfLearningModule | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const paths = registeredLearningPaths;

  // Zufallsfrage
  const goRandom = useCallback(() => {
    const visible = filter === 'ALL' ? paths
      : paths.filter(p => getSubjectFromPathId(p.id) === filter);
    if (!visible.length) return;
    const p = visible[Math.floor(Math.random() * visible.length)];
    router.push('/learning-paths/' + encodeURIComponent(p.id));
  }, [paths, filter, router]);

  // Gefilterte Pfade für Frage-Cloud
  const cloudPaths = useMemo(() => {
    return paths.filter(p => {
      const q = (p.units?.[0]?.entryQuestion ?? p.title).toLowerCase();
      const matchSearch = !search || q.includes(search.toLowerCase());
      const matchFilter = filter === 'ALL' || getSubjectFromPathId(p.id) === filter;
      return matchSearch && matchFilter;
    });
  }, [paths, search, filter]);

  // KXF module stats
  const availableCount = modules.filter(m => m.meta.status === 'built').length;
  const totalPaths = paths.length;

  // Subject filter tabs
  const subjectTabs: { id: Filter; label: string; color: string; count: number }[] = [
    { id: 'ALL', label: 'Alle', color: 'var(--ink)', count: paths.length },
    ...(['PHY','CHE','MAT','ENG'] as SubjectCode[]).map(s => ({
      id: s as Filter,
      label: SUBJECT_CONFIG[s]?.name ?? s,
      color: CLUSTER_COLORS[s] ?? '#888',
      count: paths.filter(p => getSubjectFromPathId(p.id) === s).length,
    })).filter(t => t.count > 0),
  ];

  return (
    <main style={{ minHeight: '80vh', paddingBottom: 96 }}>

      {/* ── Hero ── */}
      <div className="container" style={{ paddingTop: 56, paddingBottom: 36 }}>
        <p className="section-eyebrow">Wissensnetz · Solar Science Foundation</p>
        <h1 className="section-headline" style={{ maxWidth: '24ch', marginBottom: 12 }}>
          Was hast du heute schon gefragt?
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.7, maxWidth: '54ch', marginBottom: 28 }}>
          {totalPaths} Einstiegsfragen — jede öffnet eine Lernreise.
          Keine Disziplinlabels. Folge deiner Neugier.
        </p>

        {/* Suche + Zufall */}
        <div style={{ display: 'flex', gap: 10, maxWidth: 560, marginBottom: 20, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
            <input
              type="search"
              placeholder="Frage suchen ..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '9px 14px 9px 36px',
                borderRadius: 8, border: '1.5px solid var(--border)',
                background: 'var(--panel)', fontSize: 14, color: 'var(--ink)',
                outline: 'none', fontFamily: 'var(--font-sans)', boxSizing: 'border-box',
              }}
            />
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }}>🔍</span>
          </div>
          <button onClick={goRandom} style={{
            padding: '9px 16px', borderRadius: 8,
            border: '1.5px solid var(--border)', background: 'var(--panel)',
            color: 'var(--ink)', fontFamily: 'var(--font-mono)', fontSize: 11,
            cursor: 'pointer', letterSpacing: '.04em', whiteSpace: 'nowrap',
          }}>🎲 Zufallsfrage</button>
        </div>

        {/* Subject filter + View switcher */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {subjectTabs.map(t => {
              const active = filter === t.id;
              return (
                <button key={t.id} onClick={() => setFilter(active ? 'ALL' : t.id)} style={{
                  padding: '5px 12px', borderRadius: 20,
                  border: '1.5px solid ' + (active ? t.color : 'var(--border)'),
                  background: active ? t.color + '22' : 'transparent',
                  color: active ? t.color : 'var(--muted)',
                  fontFamily: 'var(--font-mono)', fontSize: 11,
                  letterSpacing: '.06em', cursor: 'pointer', textTransform: 'uppercase',
                  transition: 'all .15s',
                }}>{t.label} ({t.count})</button>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {([['cloud','☁ Fragen'],['grid','▦ Raster'],['graph','⬡ Netz']] as const).map(([v, label]) => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: '5px 12px', borderRadius: 6,
                border: '1.5px solid ' + (view === v ? 'var(--ink)' : 'var(--border)'),
                background: view === v ? 'var(--ink)' : 'transparent',
                color: view === v ? '#fff' : 'var(--muted)',
                fontFamily: 'var(--font-mono)', fontSize: 11,
                cursor: 'pointer', letterSpacing: '.04em', transition: 'all .15s',
              }}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Frage-Cloud ── */}
      {view === 'cloud' && (
        <div className="container">
          {cloudPaths.length === 0 ? (
            <div style={{ padding: '60px 0', textAlign: 'center' }}>
              <p style={{ fontSize: 32, marginBottom: 12 }}>🔍</p>
              <p style={{ color: 'var(--muted)', fontSize: 16 }}>Keine Frage gefunden für „{search}".</p>
              <button onClick={() => { setSearch(''); setFilter('ALL'); }} style={{
                marginTop: 12, padding: '8px 18px', borderRadius: 6,
                border: '1px solid var(--border)', background: 'none',
                color: 'var(--muted)', cursor: 'pointer',
                fontFamily: 'var(--font-mono)', fontSize: 11,
              }}>Filter zurücksetzen</button>
            </div>
          ) : (
            <>
              {/* Cloud */}
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: '10px 14px',
                padding: '8px 0 40px',
                alignItems: 'flex-start',
              }}>
                {cloudPaths.map(p => {
                  const q = p.units?.[0]?.entryQuestion ?? p.title;
                  const w = questionWeight(p);
                  const subject = getSubjectFromPathId(p.id);
                  const color = CLUSTER_COLORS[subject] ?? '#5B8FB9';
                  const isHovered = hoveredId === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => router.push('/learning-paths/' + encodeURIComponent(p.id))}
                      onMouseEnter={() => setHoveredId(p.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      style={{
                        display: 'inline-block',
                        padding: '6px 14px',
                        borderRadius: 20,
                        border: '1.5px solid ' + (isHovered ? color : 'var(--border)'),
                        background: isHovered ? color + '18' : 'var(--panel)',
                        color: isHovered ? color : 'var(--ink)',
                        fontFamily: 'var(--font-serif, Georgia, serif)',
                        fontSize: WEIGHT_SIZES[w - 1] + 'px',
                        lineHeight: 1.3,
                        cursor: 'pointer',
                        transition: 'all .15s',
                        textAlign: 'left',
                        maxWidth: 380,
                      }}
                    >
                      {q}
                    </button>
                  );
                })}
              </div>

              {/* Stats */}
              <div style={{
                display: 'flex', gap: 28, paddingTop: 20, paddingBottom: 12,
                borderTop: '1px solid var(--border)',
                flexWrap: 'wrap',
              }}>
                {[
                  { val: totalPaths, label: 'Lernreisen' },
                  { val: cloudPaths.length, label: 'sichtbar' },
                  { val: availableCount, label: 'KXF-Module' },
                ].map(({ val, label }) => (
                  <div key={label}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: 'var(--ink)' }}>{val}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '.08em', textTransform: 'uppercase' }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* NOXIA-Brücke */}
              <div style={{
                marginTop: 24, padding: '16px 20px',
                border: '1px solid var(--border)', borderRadius: 10,
                background: 'var(--panel)',
                display: 'flex', alignItems: 'center', gap: 16,
              }}>
                <span style={{ fontSize: 28 }}>🎮</span>
                <div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 4 }}>NOXIA · Verbindung</p>
                  <p style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.5, margin: 0 }}>
                    Jede Lernreise schaltet Fähigkeiten im Spiel frei — Sensoren, Werkzeuge, Missionen.
                    <span style={{ color: 'var(--muted)' }}> Das Wissen, das du hier erwirbst, kannst du dort einsetzen.</span>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Grid/Graph Views ── */}
      {view === 'grid' && (
        <div className="container">
          <GridView
            modules={filter === 'ALL' ? modules : modules.filter(m => m.meta.subject === filter)}
            onSelect={setDetail}
          />
        </div>
      )}
      {view === 'graph' && (
        <div className="container">
          <GraphView
            modules={filter === 'ALL' ? modules : modules.filter(m => m.meta.subject === filter)}
            onSelect={setDetail}
          />
        </div>
      )}

      <DetailPanel module={detail} onClose={() => setDetail(null)} />
    </main>
  );
}
