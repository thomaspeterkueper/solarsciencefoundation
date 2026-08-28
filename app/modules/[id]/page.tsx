import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getKxfLearningModuleById } from '../../../lib/kxf';
import { getRegisteredLearningPathForModule } from '../../../lib/learningPathRegistry';
import { getDidacticModuleContent } from '../../../lib/didacticContent';
import { getScienceFoundationContent } from '../../../lib/didacticScienceFoundations';

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
    Mathematics: 'mathematics', Physics: 'physics', Chemistry: 'chemistry',
    Astronomy: 'astronomy', Biology: 'biology', 'Earth science': 'earth-science', Engineering: 'engineering'
  };
  const slug = slugs[domain];
  return slug ? `/subjects/${slug}` : '/subjects';
}

export default async function ModulePage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const mod = await getKxfLearningModuleById(id);
  if (!mod) notFound();

  const didactic = getDidacticModuleContent(mod.id)
    ?? getDidacticModuleContent(id)
    ?? getScienceFoundationContent(mod.id)
    ?? getScienceFoundationContent(id);
  const path = getRegisteredLearningPathForModule(id) ?? getRegisteredLearningPathForModule(mod.id);
  const qs = new URLSearchParams();
  if (searchParams?.uid) qs.set('uid', searchParams.uid);
  if (searchParams?.ref) qs.set('ref', searchParams.ref);
  const q = qs.toString() ? `?${qs.toString()}` : '';
  const duration = didactic?.durationMinutes ?? mod.durationMinutes;

  return (
    <div className="container" style={{ paddingTop: 56, paddingBottom: 80 }}>
      <nav aria-label="Breadcrumb" style={{ marginBottom: 28 }}>
        <Link href={subjectHref(mod.domain)} style={{ color: 'var(--steel)' }}>{mod.domain}</Link>
        <span aria-hidden="true" style={{ margin: '0 10px', color: 'var(--muted)' }}>→</span>
        <span className="mono" style={{ color: 'var(--muted)' }}>{mod.id}</span>
      </nav>

      <header style={{ maxWidth: '78ch' }}>
        <p className="kicker">Learning module · {mod.domain}</p>
        <h1 className="hero" style={{ fontSize: 52 }}>{mod.title}</h1>
        <p className="lede" style={{ maxWidth: '66ch' }}>{mod.summary}</p>
        <div className="mono" style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginTop: 20, color: 'var(--muted)' }}>
          <span>{duration} min</span><span>difficulty {mod.difficulty}</span><span>{mod.id}</span>
        </div>
      </header>

      {didactic ? (
        <>
          <section className="subject-section" style={{ maxWidth: 900 }}>
            <h2 className="section-title" style={{ fontSize: 34 }}>Lernziel</h2>
            <div className="platform-card">
              <ul style={{ margin: 0, paddingLeft: 22 }}>
                {didactic.learningGoals.map((goal) => <li key={goal} style={{ marginBottom: 8 }}>{goal}</li>)}
              </ul>
            </div>
          </section>

          <section className="subject-section" style={{ maxWidth: 900 }}>
            <h2 className="section-title" style={{ fontSize: 34 }}>Entdecken</h2>
            <div className="platform-card">
              {didactic.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>

          <section className="subject-section" style={{ maxWidth: 900 }}>
            <h2 className="section-title" style={{ fontSize: 34 }}>Beispiele</h2>
            <div className="subject-grid">
              {didactic.examples.map((example) => (
                <article className="subject-card" key={example.title}>
                  <strong>{example.title}</strong><p>{example.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="subject-section" style={{ maxWidth: 900 }}>
            <h2 className="section-title" style={{ fontSize: 34 }}>Jetzt du</h2>
            <div className="platform-card">
              <p style={{ fontWeight: 600 }}>{didactic.task.prompt}</p>
              {didactic.task.hint && <details style={{ marginTop: 18 }}><summary>Hinweis</summary><p>{didactic.task.hint}</p></details>}
              <details style={{ marginTop: 18 }}><summary>Lösung prüfen</summary><p>{didactic.task.solution}</p></details>
            </div>
          </section>

          <section className="subject-section" style={{ maxWidth: 900 }}>
            <h2 className="section-title" style={{ fontSize: 34 }}>Kurz geprüft</h2>
            <div className="platform-card">
              <p style={{ fontWeight: 600 }}>{didactic.check.question}</p>
              <ol style={{ paddingLeft: 22 }}>
                {didactic.check.options.map((option) => <li key={option} style={{ marginBottom: 8 }}>{option}</li>)}
              </ol>
              <details style={{ marginTop: 18 }}><summary>Antwort anzeigen</summary><p>{didactic.check.explanation}</p></details>
            </div>
          </section>
        </>
      ) : (
        <section className="subject-section" style={{ maxWidth: 900 }}>
          <div className="platform-card">
            <h2 className="section-title" style={{ fontSize: 30 }}>Didaktischer Inhalt in Vorbereitung</h2>
            <p>Dieses kanonische Wissensmodul ist bereits verfügbar. Die eigenständige SSF-Lerneinheit wird noch didaktisch ausgearbeitet.</p>
          </div>
        </section>
      )}

      {mod.exercises.length > 0 && (
        <section className="subject-section" style={{ maxWidth: 900 }}>
          <h2 className="section-title" style={{ fontSize: 34 }}>Weitere Übungen</h2>
          <div className="subject-grid">
            {mod.exercises.map((exercise, index) => (
              <article className="subject-card" key={exercise.id}>
                <span className="code">Exercise {index + 1}</span>
                <strong style={{ marginTop: 16 }}>{exercise.question}</strong>
                <ol style={{ margin: '16px 0 0', paddingLeft: 22 }}>
                  {exercise.options.map((option) => <li key={option} style={{ marginBottom: 8 }}>{option}</li>)}
                </ol>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="subject-section" style={{ maxWidth: 900 }}>
        <div className="platform-card">
          <p className="mono" style={{ color: 'var(--muted)', marginTop: 0 }}>Knowledge source</p>
          <p>{mod.source.authority}</p>
          {mod.source.kxfEntityIds.length > 0 && <p className="mono">{mod.source.kxfEntityIds.join(' · ')}</p>}
          {path && <p style={{ marginTop: 18 }}><Link href={`/learning-paths/${encodeURIComponent(path.id)}${q}`}>Open in learning path: {path.title} →</Link></p>}
        </div>
      </section>
    </div>
  );
}
