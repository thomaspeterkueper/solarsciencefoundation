/**
 * KUEPER - Solar Science Foundation (SSF)
 * Path: app/modules/[id]/page.tsx
 * Version: 0.3.0
 * Modified: 2026-07-15
 */

import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getKxfLearningModuleById } from '../../../lib/kxf';
import { getRegisteredLearningPathForModule } from '../../../lib/learningPathRegistry';
import ModuleRunner from '../../../components/ModuleRunner';
import Link from 'next/link';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const mod = await getKxfLearningModuleById(id);
  if (!mod) return { title: 'Solar Science Foundation' };
  const question = mod.summary && !mod.summary.startsWith('A learning module') ? mod.summary : mod.title;
  return {
    title: `${question} · Solar Science Foundation`,
  };
}

export default async function ModulePage({ params }: PageProps) {
  const { id } = await params;
  const mod = await getKxfLearningModuleById(id);

  if (!mod) notFound();

  const path = getRegisteredLearningPathForModule(mod.id);
  if (path) {
    redirect(`/learning-paths/${encodeURIComponent(path.id)}`);
  }

  const headline = mod.summary && !mod.summary.startsWith('A learning module')
    ? mod.summary
    : mod.title;

  const hasExercises = mod.exercises && mod.exercises.length > 0;

  return (
    <div className="container reading" style={{ paddingTop: 52, paddingBottom: 80 }}>
      <p className="mono" style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 18, letterSpacing: '0.04em' }}>
        {mod.domain} · {mod.durationMinutes} min
      </p>

      <h1 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(28px, 5vw, 46px)',
        fontWeight: 600,
        color: 'var(--navy)',
        lineHeight: 1.15,
        letterSpacing: '-0.015em',
        maxWidth: '20em',
        marginBottom: 32
      }}>
        {headline}
      </h1>

      {hasExercises
        ? <ModuleRunner learningModule={mod} />
        : (
          <div style={{
            border: '1px solid var(--border)',
            borderRadius: 14,
            padding: '24px 26px',
            background: 'var(--panel)'
          }}>
            <p style={{ color: 'var(--steel)', fontSize: 17, lineHeight: 1.7, maxWidth: '58ch', marginBottom: 16 }}>
              Für dieses Wissensmodul ist noch kein vollständiger Lernpfad veröffentlicht.
              Die vorhandenen interaktiven Pfade findest du in der Lernpfadübersicht.
            </p>
            <Link href="/learning-paths" className="btn">Zu den Lernpfaden →</Link>
          </div>
        )
      }
    </div>
  );
}
