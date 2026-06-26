/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      app/page.tsx
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/app/page.tsx
 * Name:      HomePage
 * Version:   0.1.0
 * Created:   2026-06-26
 * Modified:  2026-06-26 14:25 CEST
 * Depends:   next/link, lib/modules
 */

import Link from 'next/link';
import { learningModules } from '../lib/modules';

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
            Astronomy &nbsp;·&nbsp; Physics &nbsp;·&nbsp; Mathematics &nbsp;·&nbsp; Biology &nbsp;·&nbsp; Earth science
          </p>
          <div className="hero-actions">
            <Link className="btn" href={`/modules/${featured.id}`}>Start learning</Link>
            <Link className="btn secondary" href="/about">About SSF</Link>
          </div>
        </div>

        <Link href={`/modules/${featured.id}`} style={{ color: 'inherit' }}>
          <div className="card prominent">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <span className="code">{featured.id}</span>
              <span className="mono" style={{ fontSize: 12, color: 'var(--steel)' }}>
                {featured.domain} · {featured.durationMinutes} min
              </span>
            </div>
            <div className="module-title">{featured.title}</div>
            <p style={{ color: 'var(--steel)', margin: 0 }}>{featured.summary}</p>
            <p style={{ color: 'var(--link)', fontSize: 16, marginTop: 18, marginBottom: 0 }}>
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
    </div>
  );
}
