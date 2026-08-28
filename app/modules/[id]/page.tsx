import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getKxfLearningModuleById } from '../../../lib/kxf';
import { getRegisteredLearningPathForModule } from '../../../lib/learningPathRegistry';

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams?: { uid?: string; ref?: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const mod = await getKxfLearningModuleById(id);
  const question = mod?.summary && !mod.summary.startsWith('A learning module')
    ? mod.summary : (mod?.title ?? id);
  return { title: `${question} · Solar Science Foundation` };
}

function subjectHref(domain: string) {
  const slugs: Record<string, string> = {
    Mathematics: 'mathematics',
    Physics: 'physics',
    Chemistry: 'chemistry',
    Astronomy: 'astronomy',
    Biology: 'biology',
    'Earth science': 'earth-science',
    Engineering: 'engineering'
  };
  const slug = slugs[domain];
  return slug ? `/subjects/${slug}` : '/subjects';
}

export default async function ModulePage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const mod = await getKxfLearningModuleById(id);

  if (!mod) {
    notFound();
  }

  const path = getRegisteredLearningPathForModule(id)
    ?? getRegisteredLearningPathForModule(mod.id);

  const qs = new URLSearchParams();
  if (searchParams?.uid) qs.set('uid', searchParams.uid);
  if (searchParams?.ref) qs.set('ref', searchParams.ref);
  const q = qs.toString() ? `?${qs.toString()}` : '';

  return (
    <div className="container" style={{ paddingTop: 56, paddingBottom: 80 }}>
      <nav aria-label="Breadcrumb" style={{ marginBottom: 28 }}>
        <Link href={subjectHref(mod.domain)} style={{ color: 'var(--steel)' }}>
          {mod.domain}
        </Link>
        <span aria-hidden="true" style={{ margin: '0 10px', color: 'var(--muted)' }}>→</span>
        <span className="mono" style={{ color: 'var(--muted)' }}>{mod.id}</span>
      </nav>

      <header style={{ maxWidth: '78ch' }}>
        <p className="kicker">Learning module · {mod.domain}</p>
        <h1 className="hero" style={{ fontSize: 52 }}>{mod.title}</h1>
        <p className="lede" style={{ maxWidth: '66ch' }}>{mod.summary}</p>
        <div className="mono" style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginTop: 20, color: 'var(--muted)' }}>
          <span>{mod.durationMinutes} min</span>
          <span>difficulty {mod.difficulty}</span>
          <span>{mod.id}</span>
        </div>
      </header>

      <section className="subject-section" style={{ maxWidth: 900 }}>
        <div className="section-row">
          <h2 className="section-title" style={{ fontSize: 34 }}>What you will work with</h2>
        </div>
        <div className="platform-card">
          <p style={{ marginTop: 0 }}>
            Start with the question above. The module is an independent SSF learning object; a learning path may place it in a larger sequence, but the direct module URL always opens this module.
          </p>
          {mod.source.kxfEntityIds.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <p className="mono" style={{ color: 'var(--muted)', marginBottom: 10 }}>Knowledge references</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {mod.source.kxfEntityIds.map((entityId) => (
                  <span className="code" key={entityId}>{entityId}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {mod.exercises.length > 0 && (
        <section className="subject-section" style={{ maxWidth: 900 }}>
          <div className="section-row">
            <h2 className="section-title" style={{ fontSize: 34 }}>Exercises</h2>
            <span className="mono" style={{ color: 'var(--steel)' }}>{mod.exercises.length}</span>
          </div>
          <div className="subject-grid">
            {mod.exercises.map((exercise, index) => (
              <article className="subject-card" key={exercise.id}>
                <span className="code">Exercise {index + 1}</span>
                <strong style={{ marginTop: 16 }}>{exercise.question}</strong>
                <ol style={{ margin: '16px 0 0', paddingLeft: 22 }}>
                  {exercise.options.map((option) => (
                    <li key={option} style={{ marginBottom: 8 }}>{option}</li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="subject-section" style={{ maxWidth: 900 }}>
        <div className="platform-card">
          <p className="mono" style={{ color: 'var(--muted)', marginTop: 0 }}>Source</p>
          <p>{mod.source.authority}</p>
          {path && (
            <p style={{ marginTop: 18 }}>
              <Link href={`/learning-paths/${encodeURIComponent(path.id)}${q}`}>
                Open in learning path: {path.title} →
              </Link>
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
