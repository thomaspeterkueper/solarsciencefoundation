import { notFound } from 'next/navigation';
import { getKxfLearningModuleById } from '../../../../lib/kxf';
import ModuleRunner from '../../../../components/ModuleRunner';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function GermanModulePage({ params }: PageProps) {
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
          {learningModule.domain} · Schwierigkeit {learningModule.difficulty} · {learningModule.durationMinutes} min
        </span>
      </div>

      <h1 className="module-title" style={{ fontSize: 40 }}>{learningModule.title}</h1>
      <p style={{ color: 'var(--steel)', maxWidth: '62ch', fontSize: 20 }}>{learningModule.summary}</p>

      <p className="mono" style={{ fontSize: 13, color: 'var(--steel)', marginTop: 22 }}>
        Quelle: KUEPER Knowledge Graph · vermittelt {learningModule.source.kxfEntityIds.join(', ') || 'noch nicht zugeordnetes Konzept'}
      </p>
      <p className="mono" style={{ fontSize: 13, color: 'var(--steel)', marginTop: 8 }}>
        Der Abschluss dieses Moduls gewaehrt {learningModule.unlocks.join(', ') || 'noch keine Freischaltung'} in Partnerprojekten.
      </p>

      <ModuleRunner learningModule={learningModule} />
    </div>
  );
}
