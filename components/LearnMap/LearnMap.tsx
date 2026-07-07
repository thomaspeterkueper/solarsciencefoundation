'use client';

import { useState } from 'react';
import type { KxfLearningModule, SubjectCode } from './types';
import { SUBJECT_CONFIG } from '@/lib/learning-modules';
import { Container, PageHeader, Stat, Tabs } from '@/components/ui';
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
  const subjectCount = new Set(modules.map((m) => m.meta.subject)).size;

  const viewTabs = [
    { id: 'grid', label: 'Übersicht' },
    { id: 'graph', label: 'Zusammenhänge' },
  ];

  const subjectTabs = [
    { id: 'ALL', label: 'Alle' },
    ...(Object.keys(SUBJECT_CONFIG) as SubjectCode[]).map((subject) => ({ id: subject, label: SUBJECT_CONFIG[subject].name })),
  ];

  return (
    <main className="learn-page">
      <Container size="wide">
        <PageHeader
          eyebrow="Solar Science Foundation · Entdecken"
          title="Womit möchtest du beginnen?"
          lead="Folge deiner Neugier. Jede Antwort öffnet neue Fragen. Es gibt keinen vorgeschriebenen Weg — nur Wissen, das sich verbindet."
        >
          <div className="ui-stat-row">
            <Stat value={availableCount} label="verfügbar" />
            <Stat value={comingCount} label="in Vorbereitung" />
            <Stat value={subjectCount} label="Fachgebiete" />
          </div>
        </PageHeader>

        <section className="learn-control-panel" aria-label="Ansicht und Filter">
          <Tabs tabs={viewTabs} active={view} onChange={(id) => setView(id as View)} label="Ansicht" />
          <Tabs tabs={subjectTabs} active={filter} onChange={(id) => setFilter(id as Filter)} label="Fachfilter" />
        </section>

        {view === 'grid'
          ? <GridView modules={visible} onSelect={setDetail} />
          : <GraphView modules={visible} onSelect={setDetail} />
        }
      </Container>
      <DetailPanel module={detail} onClose={() => setDetail(null)} />
    </main>
  );
}
