/**
 * KUEPER - Solar Science Foundation (SSF)
 * Path: app/modules/[id]/page.tsx
 * Version: 0.2.0
 * Modified: 2026-07-04
 */

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getKxfLearningModuleById } from '../../../lib/kxf';
import ModuleRunner from '../../../components/ModuleRunner';

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

  // Use entry question as headline if available and meaningful.
  // The internal module ID and domain are not shown to visitors.
  const headline = mod.summary && !mod.summary.startsWith('A learning module')
    ? mod.summary
    : mod.title;

  const hasExercises = mod.exercises && mod.exercises.length > 0;

  return (
    <div className="container reading" style={{ paddingTop: 52, paddingBottom: 80 }}>

      {/* Field label — subtle, no ID, no difficulty number */}
      <p className="mono" style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 18, letterSpacing: '0.04em' }}>
        {mod.domain} · {mod.durationMinutes} min
      </p>

      {/* The question or title — this is what the visitor sees first */}
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
          <p style={{ color: 'var(--steel)', fontSize: 18, lineHeight: 1.7, maxWidth: '58ch' }}>
            Dieser Bereich wird gerade vorbereitet. Schau bald wieder vorbei.
          </p>
        )
      }
    </div>
  );
}
