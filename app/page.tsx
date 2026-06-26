/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      app/page.tsx
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/app/page.tsx
 * Name:      HomePage
 * Version:   0.1.0
 * Created:   2026-06-26
 * Modified:  2026-06-26 14:55 CEST
 * Depends:   next/link, lib/modules
 */

import Link from 'next/link';
import { learningModules } from '../lib/modules';

const subjects = [
  {
    mark: '☉',
    name: 'Astronomy',
    count: '24 modules',
    text: 'From the Solar System to galaxies and the structure of the cosmos.'
  },
  {
    mark: 'α',
    name: 'Physics',
    count: '36 modules',
    text: 'Matter, energy, motion and the laws that govern the universe.'
  },
  {
    mark: 'Σ',
    name: 'Mathematics',
    count: '28 modules',
    text: 'The language of science: logic, numbers, structures and models.'
  },
  {
    mark: 'φ',
    name: 'Biology',
    count: '22 modules',
    text: 'Life, systems, evolution and living worlds beyond Earth.'
  },
  {
    mark: '△',
    name: 'Earth science',
    count: '18 modules',
    text: 'Our planet, its systems and our place within them.'
  }
];

export default function HomePage() {
  const featured = learningModules[0];

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
            Astronomy <span>·</span> Physics <span>·</span> Mathematics <span>·</span> Biology <span>·</span> Earth science
          </p>
          <div className="hero-actions">
            <Link className="btn" href={`/modules/${featured.id}`}>Start learning →</Link>
            <Link className="btn secondary" href="#subjects">Browse modules →</Link>
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
          <a href="#" style={{ fontWeight: 600 }}>View all subjects →</a>
        </div>
        <div className="subject-grid">
          {subjects.map((subject) => (
            <article key={subject.name} className="subject-card">
              <div className="subject-mark">{subject.mark}</div>
              <strong>{subject.name}</strong>
              <small>{subject.count}</small>
              <p>{subject.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
