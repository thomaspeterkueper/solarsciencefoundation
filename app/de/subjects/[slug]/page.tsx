import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getKxfLearningModules } from '../../../../lib/kxf';
import { getModulesForSubject, getPathsForSubject, getSubjectBySlug } from '../../../../lib/subjects';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function GermanSubjectPage({ params }: PageProps) {
  const { slug } = await params;
  const subject = getSubjectBySlug(slug);

  if (!subject) {
    notFound();
  }

  const modules = await getKxfLearningModules();
  const subjectModules = getModulesForSubject(modules, slug);
  const paths = getPathsForSubject(slug);

  return (
    <div className="container" style={{ paddingTop: 56 }}>
      <p className="kicker">{subject.levelRange}</p>
      <h1 className="hero" style={{ fontSize: 56 }}>{subject.title}</h1>
      <p className="lede" style={{ maxWidth: '66ch' }}>{subject.longDescription}</p>

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
                <p className="mono" style={{ marginTop: 12, color: 'var(--muted)' }}>
                  {path.moduleIds.length} Module
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="subject-section">
        <div className="section-row">
          <h2 className="section-title" style={{ fontSize: 34 }}>Module</h2>
          <span className="mono" style={{ color: 'var(--steel)' }}>{subjectModules.length} verfuegbar</span>
        </div>
        <div className="subject-grid">
          {subjectModules.map((module) => (
            <Link key={module.id} href={`/modules/${module.id}`} style={{ color: 'inherit' }}>
              <article className="subject-card">
                <span className="code">{module.id}</span>
                <strong style={{ marginTop: 16 }}>{module.title}</strong>
                <small>{module.durationMinutes} min · Schwierigkeit {module.difficulty}</small>
                <p>{module.summary}</p>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
