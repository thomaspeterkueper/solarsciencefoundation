'use client';

import type { KxfLearningModule, SubjectCode } from './types';
import { groupBySubject, SUBJECT_CONFIG } from '../../lib/learning-modules';
import { Section } from '../ui';
import { NodeCard } from './NodeCard';

export function GridView({ modules, onSelect }: { modules: KxfLearningModule[]; onSelect: (module: KxfLearningModule) => void }) {
  const grouped = groupBySubject(modules);
  const subjectOrder = Object.keys(SUBJECT_CONFIG) as SubjectCode[];
  const orderedSubjects = subjectOrder.filter((subject) => grouped[subject]?.length);

  return (
    <div className="learn-grid-view">
      {orderedSubjects.map((subject) => {
        const countLabel = grouped[subject].length + ' Module';
        return (
          <Section className="learn-subject-section" key={subject} eyebrow={countLabel} title={SUBJECT_CONFIG[subject].name}>
            <div className="learn-card-grid">
              {grouped[subject].map((module) => (
                <NodeCard key={module.id} module={module} onClick={() => onSelect(module)} />
              ))}
            </div>
          </Section>
        );
      })}
    </div>
  );
}
