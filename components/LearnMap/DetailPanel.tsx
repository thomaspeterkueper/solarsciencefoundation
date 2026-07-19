'use client';

import { useEffect } from 'react';
import type { KxfLearningModule, SubjectCode } from './types';
import { STATUS_LABEL } from './types';
import { SUBJECT_CONFIG, assetCount } from '../../lib/learning-modules';

const MODULE_URLS: Record<string, string> = {
  'LRN:SSF:PHY-1101': '/modules/SSF-PHY-1101',
  'LRN:SSF:PHY-1102': '/modules/SSF-PHY-1102',
  'LRN:SSF:CHE-1101': '/modules/SSF-CHE-1101'
};

export function DetailPanel({ module, onClose }: { module: KxfLearningModule | null; onClose: () => void }) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!module) return null;

  const subject = SUBJECT_CONFIG[module.meta.subject as SubjectCode];
  const moduleUrl = MODULE_URLS[module.id];

  return (
    <div className="learn-detail-backdrop" onClick={onClose} role="presentation">
      <aside className="learn-detail-panel" onClick={(event) => event.stopPropagation()}>
        <button className="learn-detail-close" onClick={onClose} type="button">Schließen</button>
        <p className="learn-eyebrow">{module.id}</p>
        <h2>{((module.title as any)?.de ?? (module.title as any)?.en ?? module.meta.title)}</h2>
        <span className="learn-node-subject" style={{ color: subject.color, background: subject.bg }}>{subject.name}</span>
        <p className="learn-detail-question">{module.meta.entry_question}</p>

        <dl className="learn-detail-list">
          <dt>Status</dt><dd>{STATUS_LABEL[module.meta.status]}</dd>
          <dt>Dauer</dt><dd>{module.meta.duration_min}–{module.meta.duration_max} Minuten</dd>
          <dt>Assets</dt><dd>{assetCount(module)}</dd>
          <dt>Voraussetzungen</dt><dd>{module.dependencies.requires.length ? module.dependencies.requires.join(', ') : 'Keine'}</dd>
          <dt>Schaltet frei</dt><dd>{module.dependencies.module_unlocks.length ? module.dependencies.module_unlocks.join(', ') : 'Noch keine Module'}</dd>
          <dt>NOXIA</dt><dd>{module.noxia.grants.length ? module.noxia.grants.join(', ') : 'Keine Freischaltung'}</dd>
        </dl>

        {module.branches.length > 0 && (
          <div className="learn-detail-branches">
            <h3>Vertiefungen</h3>
            <ul>{module.branches.map((branch) => <li key={branch.id}>{branch.label}</li>)}</ul>
          </div>
        )}

        {moduleUrl ? <a className="btn" href={moduleUrl}>Modul öffnen</a> : <p className="learn-muted">Modulseite folgt.</p>}
      </aside>
    </div>
  );
}
