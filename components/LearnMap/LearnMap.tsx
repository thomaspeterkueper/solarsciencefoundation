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

  const visible = filter === 'ALL' ? modules : modules.filter((m) => m.meta.subject === filter);
  const availableCount = modules.filter((m) => m.meta.status === 'built').length;
  const comingCount = modules.filter((m) => m.meta.status === 'in_progress' || m.meta.status === 'planned').length;

  return (
    <main className="learn-map">
      <header className="learn-header">
        <p className="learn-eyebrow">Solar Science Foundation · Entdecken</p>
        <h1 className="learn-title">Womit willst du beginnen?</h1>
        <p className="learn-desc">
          Folge deiner Neugier. Jede Entdeckung öffnet weitere. Es gibt keinen vorgeschriebenen Weg —
          nur Fragen, die zu anderen Fragen führen.
        </p>
      </header>

      <section className="learn-stats" aria-label="Überblick">
        <div><strong>{availableCount}</strong><span>verfügbar</span></div>
        <div><strong>{comingCount}</strong><span>in Vorbereitung</span></div>
      </section>

      <section className="learn-toolbar" aria-label="Ansicht und Filter">
        <div className="learn-tabs">
          <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')} type="button">Übersicht</button>
          <button className={view === 'graph' ? 'active' : ''} onClick={() => setView('graph')} type="button">Zusammenhänge</button>
        </div>
        <div className="learn-filter">
          <button className={filter === 'ALL' ? 'active' : ''} onClick={() => setFilter('ALL')} type="button">Alle</button>
          {(Object.keys(SUBJECT_CONFIG) as SubjectCode[]).map((subject) => (
            <button key={subject} className={filter === subject ? 'active' : ''} onClick={() => setFilter(subject as SubjectCode)} type="button">
              {SUBJECT_CONFIG[subject].name}
            </button>
          ))}
        </div>
      </section>

      {view === 'grid'
        ? <GridView modules={visible} onSelect={setDetail} />
        : <GraphView modules={visible} onSelect={setDetail} />
      }
      <DetailPanel module={detail} onClose={() => setDetail(null)} />
    </main>
  );
}
