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
          <p className="kicker">Fictional NOXIA universe academy - founded 2164, Luna Prime</p>
          <h1 className="hero">Learn how the universe works.</h1>
          <p className="lede">
            The Solar Science Foundation is a fictional science learning platform within the NOXIA universe.
            It turns connected knowledge from the KUEPER Knowledge Graph into short modules in German and English.
          </p>
          <p className="subjects">
            Mathematics <span>·</span> Physics <span>·</span> Chemistry <span>·</span> Astronomy <span>·</span> Biology
          </p>
          <div className="hero-actions">
            <Link className="btn" href={`/modules/${featured.id}`}>Start learning →</Link>
            <Link className="btn secondary" href="/subjects">Browse subjects →</Link>
          </div>
          <p style={{ color: 'var(--steel)', maxWidth: 760, lineHeight: 1.55, marginTop: 22, fontSize: 14 }}>
            SSF is educational worldbuilding for learning modules and optional NOXIA progress integration.
          </p>
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
          <p className="section-title">NOXIA unlocks</p>
          <p>Progress earned here can optionally unlock capabilities in NOXIA.</p>
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
