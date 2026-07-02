'use client';

import type { KxfLearningModule, SubjectCode } from './types';
import { groupBySubject, SUBJECT_CONFIG } from '@/lib/learning-modules';
import { NodeCard } from './NodeCard';

export function GridView({ modules, onSelect }: { modules: KxfLearningModule[]; onSelect: (module: KxfLearningModule) => void }) {
  const grouped = groupBySubject(modules);
  const subjectOrder = Object.keys(SUBJECT_CONFIG) as SubjectCode[];
  const orderedSubjects = subjectOrder.filter((subject) => grouped[subject]?.length);

  return (
    <div className="learn-grid-view">
      {orderedSubjects.map((subject) => (
        <section className="learn-subject-section" key={subject}>
          <div className="learn-subject-heading">
            <h2>{SUBJECT_CONFIG[subject].name}</h2>
            <span>{grouped[subject].length} Module</span>
          </div>
          <div className="learn-card-grid">
            {grouped[subject].map((module) => (
              <NodeCard key={module.id} module={module} onClick={() => onSelect(module)} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
