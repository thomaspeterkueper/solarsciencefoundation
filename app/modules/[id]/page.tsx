import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getKxfLearningModuleById } from '../../../lib/kxf';
import { getRegisteredLearningPathForModule } from '../../../lib/learningPathRegistry';
import { getModuleLesson } from '../../../lib/moduleLessons';
import ModuleExperience from '../../../components/ModuleExperience';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const mod = await getKxfLearningModuleById(id);
  if (!mod) return { title: 'Solar Science Foundation' };
  const question = mod.summary && !mod.summary.startsWith('A learning module') ? mod.summary : mod.title;
  return { title: `${question} · Solar Science Foundation` };
}

export default async function ModulePage({ params }: PageProps) {
  const { id } = await params;
  const mod = await getKxfLearningModuleById(id);

  if (!mod) notFound();

  const path = getRegisteredLearningPathForModule(mod.id);
  if (path) redirect(`/learning-paths/${encodeURIComponent(path.id)}`);

  const lesson = getModuleLesson(mod);
  const headline = mod.summary && !mod.summary.startsWith('A learning module') ? mod.summary : mod.title;
  const hasExercises = mod.exercises && mod.exercises.length > 0;

  return (
    <div className="container reading" style={{ paddingTop: 52, paddingBottom: 96 }}>
      <p className="mono" style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {mod.domain} · {mod.durationMinutes} min · Lernmodul
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
        <ModuleExperience learningModule={mod} lesson={lesson} />
      ) : (
        <div style={{ border: '1px solid var(--border)', borderRadius: 14, padding: '24px 26px', background: 'var(--panel)', marginTop: 32 }}>
          <p style={{ color: 'var(--steel)', fontSize: 17, lineHeight: 1.7, maxWidth: '58ch', marginBottom: 16 }}>
            Für dieses Wissensmodul ist noch kein vollständiger Lernpfad veröffentlicht.
            Die vorhandenen interaktiven Pfade findest du in der Lernpfadübersicht.
          </p>
          <Link href="/learning-paths" className="btn">Zu den Lernpfaden →</Link>
        </div>
      )}
    </div>
  );
}
