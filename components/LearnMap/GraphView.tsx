'use client';

import type { KxfLearningModule, SubjectCode } from './types';
import { SUBJECT_CONFIG } from '@/lib/learning-modules';

export function GraphView({ modules, onSelect }: { modules: KxfLearningModule[]; onSelect: (module: KxfLearningModule) => void }) {
  const byId = new Map(modules.map((module) => [module.id, module]));

  return (
    <div className="learn-graph-view">
      <div className="learn-graph-scroll">
        {modules.map((module, index) => {
          const subject = SUBJECT_CONFIG[module.meta.subject as SubjectCode];
          const x = 10 + (index % 4) * 220;
          const y = 30 + Math.floor(index / 4) * 170;

          return (
            <button
              key={module.id}
              className="learn-graph-node"
              onClick={() => onSelect(module)}
              style={{ left: x, top: y, borderColor: subject.border, background: subject.bg }}
              type="button"
            >
              <span style={{ color: subject.color }}>{module.meta.subject}</span>
              <strong>{module.meta.title}</strong>
              {module.dependencies.requires.some((required) => byId.has(required)) && <small>hat Voraussetzungen</small>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
