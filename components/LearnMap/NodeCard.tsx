'use client';

import type { KxfLearningModule, SubjectCode } from './types';
import { STATUS_LABEL } from './types';
import { SUBJECT_CONFIG, assetCount } from '@/lib/learning-modules';

export function NodeCard({ module, onClick }: { module: KxfLearningModule; onClick: () => void }) {
  const subject = SUBJECT_CONFIG[module.meta.subject as SubjectCode];
  const totalAssets = assetCount(module);

  return (
    <button className="learn-node-card" onClick={onClick} type="button" style={{ borderColor: subject.border }}>
      <div className="learn-node-topline">
        <span className="learn-node-subject" style={{ color: subject.color, background: subject.bg }}>{subject.name}</span>
        <span className="learn-node-status">{STATUS_LABEL[module.meta.status]}</span>
      </div>
      <h3>{module.meta.title}</h3>
      <p>{module.meta.entry_question}</p>
      <div className="learn-node-meta">
        <span>{module.meta.duration_min}–{module.meta.duration_max} min</span>
        <span>{totalAssets} Assets</span>
        <span>{module.dependencies.requires.length} Voraussetzungen</span>
      </div>
    </button>
  );
}
