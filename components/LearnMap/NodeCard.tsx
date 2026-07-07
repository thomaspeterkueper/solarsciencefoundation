'use client';

import type { KxfLearningModule, SubjectCode } from './types';
import { STATUS_LABEL } from './types';
import { SUBJECT_CONFIG, assetCount } from '@/lib/learning-modules';
import { Badge, Card } from '@/components/ui';

export function NodeCard({ module, onClick }: { module: KxfLearningModule; onClick: () => void }) {
  const subject = SUBJECT_CONFIG[module.meta.subject as SubjectCode];
  const totalAssets = assetCount(module);
  const requirementCount = module.dependencies.requires.length;
  const unlockCount = module.dependencies.module_unlocks.length + module.dependencies.path_unlocks.length + module.dependencies.archive_unlocks.length;

  return (
    <button className="learn-node-button" onClick={onClick} type="button">
      <Card className="learn-node-card">
        <div className="learn-node-accent" />
        <div className="learn-node-topline">
          <Badge className="learn-node-subject">{subject.name}</Badge>
          <span className="learn-node-status">{STATUS_LABEL[module.meta.status]}</span>
        </div>
        <h3>{module.meta.title}</h3>
        <p>{module.meta.entry_question}</p>
        <div className="learn-node-meta">
          <span>{module.meta.duration_min}–{module.meta.duration_max} min</span>
          <span>{totalAssets} Assets</span>
          <span>{requirementCount} Voraussetzungen</span>
        </div>
        <div className="learn-node-footer">
          <span>{unlockCount > 0 ? unlockCount + ' Verbindungen' : 'Offener Einstieg'}</span>
          <strong>Öffnen →</strong>
        </div>
      </Card>
    </button>
  );
}
