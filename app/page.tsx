import Link from 'next/link';
import { getKxfLearningModules } from '../lib/kxf';
import { subjects } from '../lib/subjects';
import HeroBackground from '../components/HeroBackground';

export default async function HomePage() {
  const modules = await getKxfLearningModules();
  const featured = modules[0];

  return (
    <div className="container" style={{ paddingTop: 58, paddingBottom: 8 }}>
      <section
        className="hero-grid"
        style={{ position: 'relative', overflow: 'hidden', borderRadius: 24, padding: '48px 48px 48px 0', marginLeft: -48 }}
      >
        <HeroBackground />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p className="kicker">Geneva · Est. 2045 · NOχ¹Δ universe</p>
          <h1 className="hero">Knowledge must keep flowing.</h1>
          <p className="lede">
            The Solar Science Foundation is an independent institution for scientific curiosity.
            We connect questions to knowledge — in physics, chemistry, mathematics, history, language, and beyond.
          </p>
          <p className="subjects">
            Mathematics <span>·</span> Physics <span>·</span> Chemistry <span>·</span> Astronomy <span>·</span> Biology <span>·</span> History <span>·</span> Language
          </p>
          <div className="hero-actions">
            <Link className="btn" href="/learn">Start exploring →</Link>
            <Link className="btn secondary" href="/membership">Apply for membership →</Link>
          </div>
        </div>

        <Link href={`/modules/${featured.id}`} style={{ color: 'inherit', position: 'relative', zIndex: 1 }}>
          <div className="card prominent">
            <div className="module-meta">
              <span className="mono" style={{ fontSize: 13, color: 'var(--steel)' }}>
                {featured.domain} · {featured.durationMinutes} min
              </span>
            </div>
            <div className="module-title">{featured.title}</div>
            <p style={{ color: 'var(--steel)', margin: 0 }}>{featured.summary}</p>
            <p style={{ color: 'var(--link)', fontSize: 17, marginTop: 22, marginBottom: 0, fontWeight: 600 }}>
              Begin →
            </p>
          </div>
        </Link>
      </section>

      <section className="platform-grid">
        <div className="platform-card">
          <p className="section-title">Explore</p>
          <p>Follow your curiosity through physics, chemistry, mathematics, history, language — wherever the questions lead.</p>
        </div>
        <div className="platform-card">
          <p className="section-title">Exchange programmes</p>
          <p>Apply for SSF fellowships and exchange programmes. Students from Generation Mars began here.</p>
        </div>
        <div className="platform-card">
          <p className="section-title">NO&#967;&#185;&#916;</p>
          <p>What you learn here can open new capabilities in the NOχ¹Δ universe.</p>
        </div>
      </section>

      <section id="subjects" className="subject-section">
        <div className="section-row">
          <h2 className="section-title" style={{ fontSize: 34 }}>Fields of inquiry</h2>
          <Link href="/subjects" style={{ fontWeight: 600 }}>All fields →</Link>
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
