/**
 * KUEPER - Solar Science Foundation (SSF)
 * Path: app/page.tsx
 * Repo: github.com/thomaspeterkueper/solarsciencefoundation/blob/main/app/page.tsx
 * Name: HomePage
 * Version: 0.1.0
 * Created: 2026-06-26
 * Modified: 2026-06-27 09:00 CEST
 * Depends: next/link, lib/kxf, lib/subjects
 */

import Link from 'next/link';
import { getKxfLearningModules } from '../lib/kxf';
import { subjects } from '../lib/subjects';

export default async function HomePage() {
  const modules = await getKxfLearningModules();
  const featured = modules[0];

  return (
    <div className="container" style={{ paddingTop: 58, paddingBottom: 8 }}>
      <section className="hero-grid">
        <div>
          <p className="kicker">Independent science learning</p>
          <h1 className="hero">Learn how the universe works.</h1>
          <p className="lede">
            Short, connected science learning modules. Built on the KUEPER Knowledge Graph.
            Available in German and English.
          </p>
          <p className="subjects">
            Mathematics <span>·</span> Physics <span>·</span> Chemistry <span>·</span> Astronomy <span>·</span> Biology
          </p>
          <div className="hero-actions">
            <Link className="btn" href={`/modules/${featured.id}`}>Start learning →</Link>
            <Link className="btn secondary" href="/subjects">Browse subjects →</Link>
          </div>
        </div>

        <Link href={`/modules/${featured.id}`} style={{ color: 'inherit' }}>
          <div className="card prominent">
            <div className="module-meta">
              <span className="code">{featured.id}</span>
              <span className="mono" style={{ fontSize: 13, color: 'var(--steel)' }}>
                {featured.domain} · {featured.durationMinutes} min
              </span>
            </div>
            <div className="module-title">{featured.title}</div>
            <p style={{ color: 'var(--steel)', margin: 0 }}>{featured.summary}</p>
            <p style={{ color: 'var(--link)', fontSize: 17, marginTop: 22, marginBottom: 0, fontWeight: 600 }}>
              Begin module →
            </p>
          </div>
        </Link>
      </section>

      <section className="platform-grid">
        <div className="platform-card">
          <p className="section-title">Knowledge graph</p>
          <p>Canonical concepts, documents and mappings come from the KUEPER Knowledge Graph.</p>
        </div>
        <div className="platform-card">
          <p className="section-title">Learning progress</p>
          <p>SSF turns knowledge into modules, exercises and reusable progress records.</p>
        </div>
        <div className="platform-card">
          <p className="section-title">Partner unlocks</p>
          <p>Progress earned here can unlock capabilities in partner projects. NOXIA is first.</p>
        </div>
      </section>

      <section id="subjects" className="subject-section">
        <div className="section-row">
          <h2 className="section-title" style={{ fontSize: 34 }}>Browse by subject</h2>
          <Link href="/subjects" style={{ fontWeight: 600 }}>View all subjects →</Link>
        </div>
        <div className="subject-grid">
          {subjects.slice(0, 5).map((subject) => (
            <Link key={subject.id} href={`/subjects/${subject.slug}`} style={{ color: 'inherit' }}>
              <article className="subject-card">
                <div className="subject-mark">{subject.mark}</div>
                <strong>{subject.title}</strong>
                <small>{subject.levelRange}</small>
                <p>{subject.description}</p>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
