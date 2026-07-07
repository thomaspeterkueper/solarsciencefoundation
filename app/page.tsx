import Link from 'next/link';
import { getKxfLearningModules } from '../lib/kxf';
import { subjects } from '../lib/subjects';
import HeroBackground from '../components/HeroBackground';

export default async function HomePage() {
  const modules  = await getKxfLearningModules();
  const featured = modules.find(m => m.summary && !m.summary.startsWith('A learning')) ?? modules[0];

  return (
    <>
      {/* ── HERO ──────────────────────────────────────── */}
      <section className="home-hero">
        <HeroBackground />
        <div className="home-hero-inner">
          <div className="home-hero-copy">
            <p className="section-eyebrow">Independent science learning</p>
            <h1 className="home-hero-title">Science begins with a question.</h1>
            <p className="home-hero-lede">
              Follow curiosity. Explore physics, chemistry, mathematics, astronomy,
              biology, Earth science and history through connected knowledge instead
              of fixed curricula.
            </p>
            <div className="home-hero-actions">
              <Link className="btn" href="/learn">Explore the knowledge map →</Link>
              <Link className="btn secondary" href={`/modules/${featured.id}`}>Start learning</Link>
            </div>
          </div>

          <aside className="home-hero-map" aria-label="Knowledge flow example">
            <p className="section-eyebrow">Connected knowledge</p>
            <div className="hero-flow">
              <span>Question</span>
              <i />
              <span>Knowledge</span>
              <i />
              <span>Connections</span>
              <i />
              <span>Application</span>
            </div>
            <p>
              A question opens a path. Each concept reveals what it depends on —
              and where it can be used next.
            </p>
          </aside>
        </div>
      </section>

      <div className="container">
        {/* ── THREE ENTRIES ─────────────────────────────── */}
        <section className="entries-section">
          <p className="section-eyebrow">Where to begin</p>
          <h2 className="section-headline">Three ways in</h2>
          <div className="entries-grid">
            <Link href="/learn" style={{ color: 'inherit', textDecoration: 'none' }}>
              <div className="entry-card">
                <div className="entry-icon">📚</div>
                <h3>Explore</h3>
                <p>Follow a question. Each discovery opens three more. No fixed path — only curiosity.</p>
                <span className="entry-link">Explore all topics →</span>
              </div>
            </Link>
            <Link href="/learning-paths" style={{ color: 'inherit', textDecoration: 'none' }}>
              <div className="entry-card">
                <div className="entry-icon">🔭</div>
                <h3>Learning paths</h3>
                <p>Structured sequences from foundations to advanced topics — at your own pace.</p>
                <span className="entry-link">View paths →</span>
              </div>
            </Link>
            <Link href="/subjects" style={{ color: 'inherit', textDecoration: 'none' }}>
              <div className="entry-card">
                <div className="entry-icon">🧭</div>
                <h3>Subjects</h3>
                <p>Browse astronomy, physics, chemistry, mathematics, biology, Earth science and history.</p>
                <span className="entry-link">Browse subjects →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* ── FIELDS ────────────────────────────────────── */}
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

      {/* ── NOXIA STRIP ───────────────────────────────── */}
      <section className="noxia-strip">
        <div className="container">
          <div className="noxia-inner">
            <div>
              <p className="noxia-eyebrow">NOχ¹Δ Universe</p>
              <h2 className="noxia-headline">
                What you learn here<br />has consequences.
              </h2>
              <p className="noxia-body" style={{ marginBottom: 28 }}>
                NOχ¹Δ is a science-exploration universe where knowledge unlocks capabilities.
                Your understanding is your equipment.
              </p>
              <a href="https://noxiagame.vercel.app" className="btn gold">Enter NOχ¹Δ →</a>
            </div>
            <div className="noxia-keys">
              {[
                { icon: '🔬', key: 'SENSOR:SPECTRAL', desc: 'Unlocked by completing the light module' },
                { icon: '⚗️', key: 'MISSION:LAB-ALPHA', desc: 'Unlocked by the chemistry foundations' },
                { icon: '🌍', key: 'MISSION:ORBITAL', desc: 'Unlocked by understanding gravity and orbits' },
              ].map(({ icon, key, desc }) => (
                <div key={key} className="noxia-key">
                  <span className="noxia-key-icon">{icon}</span>
                  <div>
                    <span className="noxia-key-label">{key}</span>
                    <span className="noxia-key-desc">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
