import Link from 'next/link';
import Image from 'next/image';
import { getKxfLearningModules } from '../lib/kxf';
import { subjects } from '../lib/subjects';
import HeroBackground from '../components/HeroBackground';
import RandomPathEntry from '../components/RandomPathEntry';
import ObservationTeaser from '../components/ObservationTeaser';

export default async function HomePage() {
  const modules  = await getKxfLearningModules();
  const featured = modules.find(m => m.summary && !m.summary.startsWith('A learning')) ?? modules[0];

  return (
    <>
      {/* ── HERO ──────────────────────────────────────── */}
      <section className="hero-section">
        <HeroBackground />
        <div className="hero-panel">
          <h1 className="hero">Knowledge must keep flowing.</h1>
          <p className="lede">
            An independent institution for scientific curiosity —
            physics, chemistry, mathematics, history, language and beyond.
          </p>
          <RandomPathEntry />
        </div>
      </section>

      {/* ── MISSION ───────────────────────────────────── */}
      <section className="mission-strip">
        <div className="container">
          <div>
            <h2 className="mission-headline">
              Science begins with a question.
            </h2>
            <p className="mission-body">
              The SSF connects everyday observations to the knowledge behind them.
              No curriculum. No grades. Follow what you want to understand —
              for as long as you want to understand it.
              Students from Generation Mars began here.
            </p>
            <div style={{ marginTop: 28 }}>
              <Link className="btn" href="/membership"
                style={{ background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.25)', color: '#fff' }}>
                Apply for membership →
              </Link>
            </div>
          </div>
          <div className="mission-stats">
            {[
              ['∞',   'Depth levels'],
              ['7',   'Fields of inquiry'],
              ['NOχ¹Δ', 'Connected universe'],
              ['Free', 'Always'],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="mission-stat-n">{n}</div>
                <div className="mission-stat-l">{l}</div>
              </div>
            ))}
          </div>
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
                <p>Structured sequences from foundations to advanced topics — at your own pace, stop when you want.</p>
                <span className="entry-link">View paths →</span>
              </div>
            </Link>
            <a href="https://noxiagame.vercel.app" style={{ color: 'inherit', textDecoration: 'none' }}>
              <div className="entry-card">
                <div className="entry-icon">🎮</div>
                <h3>NOχ¹Δ</h3>
                <p>What you understand here unlocks capabilities in the NOχ¹Δ universe. Knowledge has consequences.</p>
                <span className="entry-link">Enter NOχ¹Δ →</span>
              </div>
            </a>
          </div>
        </section>

        {/* ── FEATURED MODULE ───────────────────────────── */}
        <section className="featured-section">
          <p className="section-eyebrow">Start here</p>
          <h2 className="section-headline" style={{ marginBottom: 24 }}>A question worth asking</h2>
          <Link href={`/modules/${featured.id}`} className="featured-card">
            <div className="featured-card-stripe" />
            <div className="featured-card-body">
              <p className="featured-eyebrow">{featured.domain} · {featured.durationMinutes} min</p>
              <h3 className="featured-question">{featured.summary}</h3>
              <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.6, maxWidth: '58ch', margin: 0 }}>
                Begin with the observation. The explanation follows from what you already know.
              </p>
              <div className="featured-meta">
                <span className="featured-begin">Begin this exploration →</span>
              </div>
            </div>
          </Link>
        </section>

        {/* ── OBSERVATION TEASER ──────────────────────── */}
        <section style={{ marginBottom: 80 }}>
          <ObservationTeaser />
        </section>

                {/* ── FIELDS ────────────────────────────────────── */}
        <section className="fields-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28 }}>
            <div>
              <p className="section-eyebrow">Fields of inquiry</p>
              <h2 className="section-headline" style={{ marginBottom: 0 }}>Choose your world</h2>
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
                Students of Generation Mars earned their mission clearances through the SSF.
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
