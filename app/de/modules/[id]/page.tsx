import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { getKxfLearningModuleById } from '../../../../lib/kxf';
import { getRegisteredLearningPathForModule } from '../../../../lib/learningPathRegistry';
import { getModuleLesson } from '../../../../lib/moduleLessons';
import ModuleExperience from '../../../../components/ModuleExperience';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function GermanModulePage({ params }: PageProps) {
  const { id } = await params;
  const learningModule = await getKxfLearningModuleById(id);

  if (!learningModule) notFound();

  const path = getRegisteredLearningPathForModule(learningModule.id);
  if (path) redirect(`/de/learning-paths/${encodeURIComponent(path.id)}`);

  const lesson = getModuleLesson(learningModule);
  const hasExercises = learningModule.exercises && learningModule.exercises.length > 0;
  const headline = learningModule.summary && !learningModule.summary.startsWith('A learning module')
    ? learningModule.summary
    : learningModule.title;

  return (
    <div className="container reading" style={{ paddingTop: 52, paddingBottom: 96 }}>
      <p className="mono" style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {learningModule.domain} · {learningModule.durationMinutes} min · Lernmodul
      </p>

      <h1 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(30px, 5vw, 48px)',
        fontWeight: 600,
        color: 'var(--navy)',
        lineHeight: 1.12,
        letterSpacing: '-0.02em',
        maxWidth: '19em',
        marginBottom: 16,
      }}>
        {headline}
      </h1>

      <p style={{ color: 'var(--muted)', fontSize: 17, lineHeight: 1.7, maxWidth: '62ch', marginBottom: 0 }}>
        Lerne zuerst den Zusammenhang, probiere ihn am Modell aus und prüfe anschließend dein Verständnis.
      </p>

      {hasExercises ? (
        <ModuleExperience learningModule={learningModule} lesson={lesson} />
      ) : (
        <div style={{ marginTop: 32, border: '1px solid var(--border)', borderRadius: 14, padding: '24px 26px', background: 'var(--panel)' }}>
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
