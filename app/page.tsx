import Image from 'next/image';
import Link from 'next/link';
import { getKxfLearningModules } from '../lib/kxf';
import { subjects } from '../lib/subjects';

export default async function HomePage() {
  const modules = await getKxfLearningModules();
  const featured = modules.find((m) => m.summary && !m.summary.startsWith('A learning')) ?? modules[0];

  return (
    <>
      <section className="home-hero editorial-hero">
        <div className="home-hero-inner editorial-hero-inner">
          <div className="home-hero-copy">
            <p className="section-eyebrow">Independent science learning</p>
            <h1 className="home-hero-title">Science begins with curiosity.</h1>
            <p className="home-hero-lede">
              Explore the connected knowledge behind our universe. Learn at your own pace,
              without grades and without pressure.
            </p>
            <div className="home-hero-actions">
              <Link className="btn" href="/learn">Explore the knowledge map →</Link>
              <Link className="btn secondary" href={`/modules/${featured.id}`}>Start learning</Link>
            </div>
          </div>

          <div className="editorial-hero-visual" aria-label="Solar Science Foundation Discovery Hall">
            <Image
              src="/images/hero/discover-hero.png"
              alt="Solar Science Foundation Discovery Hall"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 56vw"
              className="editorial-hero-image"
            />
            <div className="editorial-hero-fade" aria-hidden="true" />
          </div>
        </div>
      </section>

      <div className="container">
        <section className="entries-section">
          <p className="section-eyebrow">Where to begin</p>
          <h2 className="section-headline">Three ways in</h2>
          <div className="entries-grid">
            <Link href="/learn" style={{ color: 'inherit', textDecoration: 'none' }}>
              <div className="entry-card">
                <h3>Explore</h3>
                <p>Follow a question. Each discovery opens three more. No fixed path — only curiosity.</p>
                <span className="entry-link">Explore all topics →</span>
              </div>
            </Link>
            <Link href="/learning-paths" style={{ color: 'inherit', textDecoration: 'none' }}>
              <div className="entry-card">
                <h3>Learning paths</h3>
                <p>Structured sequences from foundations to advanced topics — at your own pace.</p>
                <span className="entry-link">View paths →</span>
              </div>
            </Link>
            <Link href="/subjects" style={{ color: 'inherit', textDecoration: 'none' }}>
              <div className="entry-card">
                <h3>Subjects</h3>
                <p>Browse astronomy, physics, chemistry, mathematics, biology, Earth science and history.</p>
                <span className="entry-link">Browse subjects →</span>
              </div>
            </Link>
          </div>
        </section>

        <section className="fields-section">
          <div className="section-row">
            <div>
              <p className="section-eyebrow">Fields of inquiry</p>
              <h2 className="section-headline">Choose your world</h2>
            </div>
            <Link href="/subjects" style={{ fontWeight: 600, fontSize: 15 }}>All fields →</Link>
          </div>
          <div className="fields-grid">
            {subjects.map((s) => (
              <Link key={s.id} href={`/subjects/${s.slug}`} className="field-card">
                <div className="field-mark">{s.mark}</div>
                <strong>{s.title}</strong>
                <small>{s.levelRange}</small>
                <p>{s.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
