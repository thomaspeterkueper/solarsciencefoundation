'use client';

import { useState } from 'react';
import type { KxfLearningModule, SubjectCode } from './types';
import { SUBJECT_CONFIG } from '@/lib/learning-modules';
import { GridView } from './GridView';
import { GraphView } from './GraphView';
import { DetailPanel } from './DetailPanel';

type View = 'grid' | 'graph';
type Filter = SubjectCode | 'ALL';

export function LearnMap({ modules }: { modules: KxfLearningModule[] }) {
  const [view, setView] = useState<View>('grid');
  const [filter, setFilter] = useState<Filter>('ALL');
  const [detail, setDetail] = useState<KxfLearningModule | null>(null);

  const visible = filter === 'ALL' ? modules : modules.filter((module) => module.meta.subject === filter);
  const builtCount = modules.filter((module) => module.meta.status === 'built').length;
  const inProgressCount = modules.filter((module) => module.meta.status === 'in_progress').length;

  return (
    <main className="learn-map">
      <header className="learn-header">
        <p className="learn-eyebrow">Solar Science Foundation</p>
        <h1 className="learn-title">Themenkarte</h1>
        <p className="learn-desc">Alle Lernmodule der Solar Science Foundation: verfügbar, in Entwicklung und geplant. Die Karte liest ihren Modulstand aus dem KUEPER Knowledge Graph.</p>
      </header>

      <section className="learn-stats" aria-label="Modulstatistik">
        <div><strong>{modules.length}</strong><span>Module</span></div>
        <div><strong>{builtCount}</strong><span>verfügbar</span></div>
        <div><strong>{inProgressCount}</strong><span>in Entwicklung</span></div>
      </section>

      <section className="learn-toolbar" aria-label="Ansicht und Filter">
        <div className="learn-tabs">
          <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')} type="button">Raster</button>
          <button className={view === 'graph' ? 'active' : ''} onClick={() => setView('graph')} type="button">Graph</button>
        </div>
        <div className="learn-filter">
          <button className={filter === 'ALL' ? 'active' : ''} onClick={() => setFilter('ALL')} type="button">Alle</button>
          {(Object.keys(SUBJECT_CONFIG) as SubjectCode[]).map((subject) => (
            <button key={subject} className={filter === subject ? 'active' : ''} onClick={() => setFilter(subject)} type="button">
              {SUBJECT_CONFIG[subject].name}
            </button>
          ))}
        </div>
      </section>

      {view === 'grid' ? <GridView modules={visible} onSelect={setDetail} /> : <GraphView modules={visible} onSelect={setDetail} />}
      <DetailPanel module={detail} onClose={() => setDetail(null)} />
    </main>
  );
}
