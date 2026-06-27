/**
 * KUEPER - Solar Science Foundation (SSF)
 * Path: app/subjects/[slug]/page.tsx
 * Repo: github.com/thomaspeterkueper/solarsciencefoundation/blob/main/app/subjects/[slug]/page.tsx
 * Name: SubjectPage
 * Version: 0.1.0
 * Created: 2026-06-27
 * Modified: 2026-06-27 09:00 CEST
 * Depends: next/link, next/navigation, lib/kxf, lib/subjects
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getKxfLearningModules } from '../../../lib/kxf';
import { getModulesForSubject, getPathsForSubject, getSubjectBySlug } from '../../../lib/subjects';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SubjectPage({ params }: PageProps) {
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
            <h2 className="section-title" style={{ fontSize: 34 }}>Learning paths</h2>
          </div>
          <div className="platform-grid" style={{ marginTop: 0 }}>
            {paths.map((path) => (
              <div className="platform-card" key={path.id}>
                <p className="section-title">{path.title}</p>
                <p>{path.description}</p>
                <p className="mono" style={{ marginTop: 12, color: 'var(--muted)' }}>
                  {path.moduleIds.length} modules
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="subject-section">
        <div className="section-row">
          <h2 className="section-title" style={{ fontSize: 34 }}>Modules</h2>
          <span className="mono" style={{ color: 'var(--steel)' }}>{subjectModules.length} available</span>
        </div>
        <div className="subject-grid">
          {subjectModules.map((module) => (
            <Link key={module.id} href={`/modules/${module.id}`} style={{ color: 'inherit' }}>
              <article className="subject-card">
                <span className="code">{module.id}</span>
                <strong style={{ marginTop: 16 }}>{module.title}</strong>
                <small>{module.durationMinutes} min · difficulty {module.difficulty}</small>
                <p>{module.summary}</p>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
