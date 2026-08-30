import Image from 'next/image';
import Link from 'next/link';
import { registeredLearningPaths } from '../lib/learningPathRegistry';
import FeaturedQuestionCard from '../components/FeaturedQuestionCard';
import FoundationHighlights from '../components/FoundationHighlights';

const FEATURED_QUESTIONS = [
  { q: 'Why is the sky blue?', path: 'PATH:SSF:PHY-SKY-0001', cluster: 'Physics' },
  { q: 'Why does dish soap remove grease when water alone does not?', path: 'PATH:SSF:CHE-REINIGUNG-TENSIDE-0001', cluster: 'Chemistry' },
  { q: 'Why can water pipes burst from the inside in winter?', path: 'PATH:SSF:PHY-WASSER-ANOMALIE-0001', cluster: 'Physics' },
  { q: 'Why does slowly cooked meat become tender?', path: 'PATH:SSF:CHE-KUECHE-KOLLAGEN-0001', cluster: 'Kitchen science' },
  { q: 'How do you cut steel that is harder than the tool?', path: 'PATH:SSF:ENG-EDM-0001', cluster: 'Engineering' },
  { q: 'Why does sugar caramelize only around 160 °C?', path: 'PATH:SSF:CHE-KUECHE-KARAMELL-0001', cluster: 'Kitchen science' },
];

export default async function HomePage() {
  const totalPaths = registeredLearningPaths.length;

  return (
    <>
      <section className="home-hero">
        <Image src="/images/hero/discover-hero.png" alt="Solar Science Foundation" fill priority sizes="100vw" className="home-hero-bg" />
        <div className="home-hero-overlay" aria-hidden="true" />
        <div className="home-hero-inner">
          <div className="home-hero-copy">
            <p className="section-eyebrow">Solar Science Foundation · Fictional science project</p>
            <h1 className="home-hero-title">Science begins with a question.</h1>
            <p className="home-hero-lede">
              Learn, research, contribute knowledge and support an open platform for scientific understanding.
              {` ${totalPaths}`} learning journeys are the beginning — not the whole Foundation.
            </p>
            <div className="home-hero-actions">
              <Link className="btn" href="/learning">Learn →</Link>
              <Link className="btn secondary" href="/participate">Participate</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <section style={{ paddingTop: 64, paddingBottom: 48 }}>
          <p className="section-eyebrow">Where would you like to begin?</p>
          <h2 className="section-headline" style={{ maxWidth: '24ch', marginBottom: 8 }}>Six questions — six ways into the network.</h2>
          <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.7, maxWidth: '52ch', marginBottom: 36 }}>
            Every question opens a learning journey. Every journey opens new questions. There is no single correct starting point.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
            {FEATURED_QUESTIONS.map(({ q, path, cluster }) => <FeaturedQuestionCard key={path} q={q} path={path} cluster={cluster} />)}
          </div>
        </section>

        <section style={{ paddingTop: 32, paddingBottom: 56, borderTop: '1px solid var(--border)' }}>
          <p className="section-eyebrow">The Foundation</p>
          <h2 className="section-headline" style={{ maxWidth: '22ch', marginBottom: 36 }}>Four clear areas instead of four variants of “learning”.</h2>
          <div className="entries-grid">
            <Link href="/learning" style={{ color: 'inherit', textDecoration: 'none' }}><div className="entry-card"><h3>Learn</h3><p>Learning paths, subjects and the knowledge map in one place.</p><span className="entry-link">Start learning →</span></div></Link>
            <Link href="/research" style={{ color: 'inherit', textDecoration: 'none' }}><div className="entry-card"><h3>Research</h3><p>Research Watch, sources and new scientific developments.</p><span className="entry-link">Explore research →</span></div></Link>
            <Link href="/participate" style={{ color: 'inherit', textDecoration: 'none' }}><div className="entry-card"><h3>Participate</h3><p>Membership, supporting membership and contributions from additional authors.</p><span className="entry-link">Participate →</span></div></Link>
            <Link href="/foundation" style={{ color: 'inherit', textDecoration: 'none' }}><div className="entry-card"><h3>Foundation</h3><p>Mission, people, transparency and the institutional model of SSF.</p><span className="entry-link">Understand the Foundation →</span></div></Link>
          </div>
        </section>

        <FoundationHighlights locale="en" placement="home" />

        <section style={{ paddingTop: 48, paddingBottom: 64, borderTop: '1px solid var(--border)', maxWidth: '60ch' }}>
          <p className="section-eyebrow">The principle</p>
          <h2 className="section-headline" style={{ marginBottom: 20 }}>Not content coverage — understanding.</h2>
          <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>
            SSF begins where many explanations stop: not with the formula, but with the question you ask when you look at the world around you.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>
            Learning is the core, but not the only purpose. Knowledge should emerge transparently, be extendable by people and remain openly accessible.
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.06em' }}>
            Fictional science project · Solar Science Foundation · founded in Sundern in 2045
          </p>
        </section>
      </div>
    </>
  );
}
