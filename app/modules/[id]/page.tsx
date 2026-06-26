/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      app/modules/[id]/page.tsx
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/app/modules/[id]/page.tsx
 * Name:      ModulePage
 * Version:   0.1.0
 * Created:   2026-06-26
 * Modified:  2026-06-26 13:00 CEST
 * Depends:   next/navigation, lib/modules, components/ModuleRunner
 */

import { notFound } from 'next/navigation';
import { getModuleById } from '../../../lib/modules';
import ModuleRunner from '../../../components/ModuleRunner';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ModulePage({ params }: PageProps) {
  const { id } = await params;
  const learningModule = getModuleById(id);

  if (!learningModule) {
    notFound();
  }

  return (
    <div className="container" style={{ paddingTop: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
        <span className="code">{learningModule.id}</span>
        <span className="mono" style={{ fontSize: 11, color: 'var(--steel)' }}>
          {learningModule.domain} · difficulty {learningModule.difficulty} · {learningModule.durationMinutes} min
        </span>
      </div>

      <h1 className="module-title" style={{ fontSize: 28 }}>{learningModule.title}</h1>
      <p style={{ color: 'var(--ink)', maxWidth: '62ch' }}>{learningModule.summary}</p>

      <p className="mono" style={{ fontSize: 11, color: 'var(--steel)', marginTop: 18 }}>
        Completing this module grants {learningModule.unlocks.join(', ')} in partner projects.
      </p>

      <ModuleRunner learningModule={learningModule} />
    </div>
  );
}
