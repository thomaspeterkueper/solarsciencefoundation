import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { getKxfLearningModuleById } from '../../../../lib/kxf';
import { getRegisteredLearningPathForModule } from '../../../../lib/learningPathRegistry';
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

  const path = getRegisteredLearningPathForModule(learningModule.id);
  if (path) {
    redirect(`/de/learning-paths/${encodeURIComponent(path.id)}`);
  }

  const hasExercises = learningModule.exercises && learningModule.exercises.length > 0;

  return (
    <div className="container reading" style={{ paddingTop: 46, paddingBottom: 80 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
        <span className="code">{learningModule.id}</span>
        <span className="mono" style={{ fontSize: 13, color: 'var(--steel)' }}>
          {learningModule.domain} · Schwierigkeit {learningModule.difficulty} · {learningModule.durationMinutes} min
        </span>
      </div>

      <h1 className="module-title" style={{ fontSize: 40 }}>{learningModule.title}</h1>
      <p style={{ color: 'var(--steel)', maxWidth: '62ch', fontSize: 20 }}>{learningModule.summary}</p>

      {hasExercises ? (
        <ModuleRunner learningModule={learningModule} />
      ) : (
        <div style={{
          marginTop: 28,
          border: '1px solid var(--border)',
          borderRadius: 14,
          padding: '24px 26px',
          background: 'var(--panel)'
        }}>
          <p style={{ color: 'var(--steel)', fontSize: 17, lineHeight: 1.7, maxWidth: '58ch', marginBottom: 16 }}>
            Für dieses Wissensmodul ist noch kein vollständiger Lernpfad veröffentlicht.
            Die vorhandenen interaktiven Pfade findest du in der Lernpfadübersicht.
          </p>
          <Link href="/de/learning-paths" className="btn">Zu den Lernpfaden →</Link>
        </div>
      )}
    </div>
  );
}
