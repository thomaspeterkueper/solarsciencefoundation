/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      app/page.tsx
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/app/page.tsx
 * Name:      HomePage
 * Version:   0.1.0
 * Created:   2026-06-26
 * Modified:  2026-06-26 13:00 CEST
 * Depends:   next/link, lib/modules
 */

import Link from 'next/link';
import { learningModules } from '../lib/modules';

export default function HomePage() {
  const featured = learningModules[0];

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 8 }}>
      <p className="kicker">Independent science learning</p>
      <h1 className="hero">Learn how the universe works.</h1>
      <p className="lede">
        Short, connected science learning modules. Built on the KUEPER Knowledge Graph.
        Available in German and English.
      </p>
      <p className="subjects">
        Astronomy &nbsp;·&nbsp; Physics &nbsp;·&nbsp; Mathematics &nbsp;·&nbsp; Biology &nbsp;·&nbsp; Earth science
      </p>

      <div style={{ marginTop: 30 }}>
        <Link href={`/modules/${featured.id}`} style={{ color: 'inherit' }}>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <span className="code">{featured.id}</span>
              <span className="mono" style={{ fontSize: 11, color: 'var(--steel)' }}>
                {featured.domain} · {featured.durationMinutes} min
              </span>
            </div>
            <div className="module-title">{featured.title}</div>
            <p style={{ color: 'var(--steel)', margin: 0 }}>{featured.summary}</p>
            <p style={{ color: 'var(--link)', fontSize: 13, marginTop: 14, marginBottom: 0 }}>
              Begin module →
            </p>
          </div>
        </Link>
      </div>

      <div style={{ marginTop: 36, borderTop: '0.5px solid var(--border)', paddingTop: 22 }}>
        <p className="section-title">Applications</p>
        <p style={{ color: 'var(--steel)', maxWidth: '58ch', margin: 0 }}>
          Progress earned here can unlock capabilities in partner projects. The NOXIA universe is
          the first; others may follow.
        </p>
      </div>
    </div>
  );
}
