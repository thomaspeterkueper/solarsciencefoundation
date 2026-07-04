import Link from 'next/link';
import { getKxfLearningModules } from '../lib/kxf';
import { subjects } from '../lib/subjects';
import HeroBackground from '../components/HeroBackground';

export default async function HomePage() {
  const modules = await getKxfLearningModules();
  const featured = modules[0];

  return (
    <>
      {/* Hero — full viewport width, image bleeds edge to edge */}
      <section className="hero-section">
        <HeroBackground />

        {/* Single content panel — floated left, image visible right */}
        <div className="hero-panel">
          <p className="kicker">Geneva · Est. 2045 · NOχ¹Δ universe</p>
          <h1 className="hero">Knowledge must keep flowing.</h1>
          <p className="lede">
            An independent institution for scientific curiosity.
            Questions connected to knowledge.
          </p>
          <div className="hero-actions">
            <Link className="btn" href="/learn">Start exploring →</Link>
            <Link className="btn secondary" href="/membership">Membership →</Link>
          </div>
        </div>
      </section>

      <div className="container" style={{ paddingBottom: 8 }}>
        {/* Featured module — below the hero */}
        <div className="featured-module-row">
          <Link href={`/modules/${featured.id}`} style={{ color: 'inherit' }}>
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
        </div>

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
    </>
  );
}
