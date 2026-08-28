import Link from 'next/link';
import { notFound } from 'next/navigation';
import MathDailyChallenge from '../../../components/MathDailyChallenge';
import { getKxfLearningModules } from '../../../lib/kxf';
import { getModulesForSubject, getPathsForSubject, getSubjectBySlug } from '../../../lib/subjects';
import { getDidacticModuleContent } from '../../../lib/didacticContent';
import { getScienceFoundationContent } from '../../../lib/didacticScienceFoundations';

type PageProps = {
  params: Promise<{ slug: string }>;
};

function didacticDuration(id: string, fallback: number) {
  return getDidacticModuleContent(id)?.durationMinutes
    ?? getScienceFoundationContent(id)?.durationMinutes
    ?? fallback;
}

function difficultyLabel(difficulty: number) {
  if (difficulty <= 1) return 'Grundlage';
  if (difficulty === 2) return 'Aufbau';
  return 'Vertiefung';
}

const mathHighlights = [
  { id: 'MAT-L0-000001', symbol: '+3', teaser: 'Finde Regeln, vergleiche Zahlen und erkenne Muster.' },
  { id: 'MAT-L1-000001', symbol: 'f(x)', teaser: 'Verstehe, wie Eingaben nach einer Regel zu Ausgaben werden.' },
  { id: 'MAT-L1-000003', symbol: '%', teaser: 'Ordne Zufall ein und lerne, Unsicherheit zu quantifizieren.' }
];

const mathRoute = ['MAT-L0-000001', 'MAT-L1-000001', 'MAT-L1-000002', 'MAT-L1-000003'];

export default async function SubjectPage({ params }: PageProps) {
  const { slug } = await params;
  const subject = getSubjectBySlug(slug);
  if (!subject) notFound();

  const modules = await getKxfLearningModules();
  const subjectModules = getModulesForSubject(modules, slug);
  const paths = getPathsForSubject(slug);
  const isMathematics = slug === 'mathematics';
  const highlightedModules = isMathematics
    ? mathHighlights.map((highlight) => {
        const module = subjectModules.find((item) => item.id === highlight.id);
        return module ? { module, ...highlight } : null;
      }).filter((item): item is NonNullable<typeof item> => Boolean(item))
    : [];
  const routeModules = isMathematics
    ? mathRoute.map((id) => subjectModules.find((module) => module.id === id)).filter((module): module is NonNullable<typeof module> => Boolean(module))
    : [];

  return (
    <div className="container" style={{ paddingTop: 56, paddingBottom: 80 }}>
      <header style={{ maxWidth: 1000, padding: isMathematics ? '36px 38px' : 0, borderRadius: 30, background: isMathematics ? 'color-mix(in srgb, var(--steel) 7%, var(--paper))' : undefined }}>
        <p className="kicker">{subject.levelRange}</p>
        <h1 className="hero" style={{ fontSize: 56 }}>{subject.title}</h1>
        <p className="lede" style={{ maxWidth: '66ch' }}>{subject.longDescription}</p>
        {isMathematics && <p style={{ marginTop: 20, fontWeight: 650 }}>Womit möchtest du heute anfangen?</p>}
      </header>

      {isMathematics && highlightedModules.length > 0 && (
        <section className="subject-section" style={{ marginTop: 40 }}>
          <div className="subject-grid">
            {highlightedModules.map(({ module, symbol, teaser }) => (
              <Link key={module.id} href={`/modules/${module.id}`} style={{ color: 'inherit' }}>
                <article className="subject-card" style={{ minHeight: 230, padding: 26, background: 'color-mix(in srgb, var(--steel) 5%, var(--paper))' }}>
                  <span aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 58, height: 58, borderRadius: 18, background: 'color-mix(in srgb, var(--steel) 13%, var(--paper))', fontSize: 23, fontWeight: 800 }}>{symbol}</span>
                  <strong style={{ marginTop: 20, fontSize: 21 }}>{module.title}</strong>
                  <p>{teaser}</p>
                  <span style={{ marginTop: 'auto', fontWeight: 700, color: 'var(--steel)' }}>Starten →</span>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      {isMathematics && routeModules.length > 0 && (
        <section className="subject-section">
          <div className="section-row">
            <div>
              <p className="kicker">Lernroute</p>
              <h2 className="section-title" style={{ fontSize: 34 }}>Von Mustern zu Wahrscheinlichkeit</h2>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'stretch', gap: 10, flexWrap: 'wrap' }}>
            {routeModules.map((module, index) => (
              <div key={module.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Link href={`/modules/${module.id}`} className="platform-card" style={{ color: 'inherit', minWidth: 190, padding: 20 }}>
                  <span className="code">Schritt {index + 1}</span>
                  <strong style={{ display: 'block', marginTop: 10 }}>{module.title}</strong>
                  <small>{didacticDuration(module.id, module.durationMinutes)} min · {difficultyLabel(module.difficulty)}</small>
                </Link>
                {index < routeModules.length - 1 && <span aria-hidden="true" style={{ color: 'var(--steel)', fontSize: 24 }}>→</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {isMathematics && <MathDailyChallenge />}

      {paths.length > 0 && (
        <section className="subject-section">
          <div className="section-row">
            <h2 className="section-title" style={{ fontSize: 34 }}>Lernpfade</h2>
          </div>
          <div className="platform-grid" style={{ marginTop: 0 }}>
            {paths.map((path) => (
              <div className="platform-card" key={path.id}>
                <p className="section-title">{path.title}</p>
                <p>{path.description}</p>
                <p className="mono" style={{ marginTop: 12, color: 'var(--muted)' }}>{path.moduleIds.length} Module</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="subject-section">
        <div className="section-row">
          <h2 className="section-title" style={{ fontSize: 34 }}>Alle Module</h2>
          <span className="mono" style={{ color: 'var(--steel)' }}>{subjectModules.length} verfügbar</span>
        </div>
        <div className="subject-grid">
          {subjectModules.map((module) => (
            <Link key={module.id} href={`/modules/${module.id}`} style={{ color: 'inherit' }}>
              <article className="subject-card" style={{ minHeight: 210 }}>
                <strong style={{ fontSize: 20 }}>{module.title}</strong>
                <small style={{ marginTop: 8 }}>{didacticDuration(module.id, module.durationMinutes)} min · {difficultyLabel(module.difficulty)}</small>
                <p>{module.summary}</p>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  <span className="code">{module.id}</span>
                  <span style={{ fontWeight: 700, color: 'var(--steel)' }}>Starten →</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
