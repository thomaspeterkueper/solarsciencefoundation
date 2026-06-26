/**
 * KUEPER - Solar Science Foundation (SSF)
 * Path: app/modules/[id]/page.tsx
 * Repo: github.com/thomaspeterkueper/solarsciencefoundation/blob/main/app/modules/[id]/page.tsx
 * Name: ModulePage
 * Version: 0.1.0
 * Created: 2026-06-26
 * Modified: 2026-06-26 18:25 CEST
 * Depends: next/navigation, lib/kxf, components/ModuleRunner
 */

import { notFound } from 'next/navigation';
import { getKxfLearningModuleById } from '../../../lib/kxf';
import ModuleRunner from '../../../components/ModuleRunner';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ModulePage({ params }: PageProps) {
  const { id } = await params;
  const learningModule = await getKxfLearningModuleById(id);

  if (!learningModule) {
    notFound();
  }

  return (
    <div className="container reading" style={{ paddingTop: 46 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
        <span className="code">{learningModule.id}</span>
        <span className="mono" style={{ fontSize: 13, color: 'var(--steel)' }}>
          {learningModule.domain} · difficulty {learningModule.difficulty} · {learningModule.durationMinutes} min
        </span>
      </div>

      <h1 className="module-title" style={{ fontSize: 40 }}>{learningModule.title}</h1>
      <p style={{ color: 'var(--steel)', maxWidth: '62ch', fontSize: 20 }}>{learningModule.summary}</p>

      <p className="mono" style={{ fontSize: 13, color: 'var(--steel)', marginTop: 22 }}>
        Source: KUEPER Knowledge Graph · teaches {learningModule.source.kxfEntityIds.join(', ') || 'unmapped concept'}
      </p>
      <p className="mono" style={{ fontSize: 13, color: 'var(--steel)', marginTop: 8 }}>
        Completing this module grants {learningModule.unlocks.join(', ') || 'no unlock yet'} in partner projects.
      </p>

      <ModuleRunner learningModule={learningModule} />
    </div>
  );
}
