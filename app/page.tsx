import Image from 'next/image';
import Link from 'next/link';
import { registeredLearningPaths } from '../lib/learningPathRegistry';
import FeaturedQuestionCard from '../components/FeaturedQuestionCard';
import FoundationHighlights from '../components/FoundationHighlights';

const FEATURED_QUESTIONS = [
  { q: 'Warum ist der Himmel blau?', path: 'PATH:SSF:PHY-SKY-0001', cluster: 'Physik' },
  { q: 'Warum löst Spülmittel Fett — aber Wasser allein nicht?', path: 'PATH:SSF:CHE-REINIGUNG-TENSIDE-0001', cluster: 'Chemie' },
  { q: 'Warum platzen Wasserleitungen im Winter von innen?', path: 'PATH:SSF:PHY-WASSER-ANOMALIE-0001', cluster: 'Physik' },
  { q: 'Warum wird Gulasch zart — wenn man es lange kocht?', path: 'PATH:SSF:CHE-KUECHE-KOLLAGEN-0001', cluster: 'Küche' },
  { q: 'Wie schneidet man Stahl der härter ist als jedes Werkzeug?', path: 'PATH:SSF:ENG-EDM-0001', cluster: 'Ingenieurwesen' },
  { q: 'Warum karamellisiert Zucker erst bei 160°C?', path: 'PATH:SSF:CHE-KUECHE-KARAMELL-0001', cluster: 'Küche' },
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
            <p className="section-eyebrow">Solar Science Foundation · Fiktives Wissenschaftsprojekt</p>
            <h1 className="home-hero-title">Wissenschaft beginnt mit einer Frage.</h1>
            <p className="home-hero-lede">
              Lerne, forsche, trage Wissen bei und unterstütze eine offene Plattform für wissenschaftliches Verständnis.
              {` ${totalPaths}`} Lernreisen bilden den Anfang — nicht die ganze Foundation.
            </p>
            <div className="home-hero-actions">
              <Link className="btn" href="/learning">Lernen →</Link>
              <Link className="btn secondary" href="/participate">Mitwirken</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <section style={{ paddingTop: 64, paddingBottom: 48 }}>
          <p className="section-eyebrow">Womit möchtest du beginnen?</p>
          <h2 className="section-headline" style={{ maxWidth: '24ch', marginBottom: 8 }}>Sechs Fragen — sechs Wege ins Netz.</h2>
          <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.7, maxWidth: '52ch', marginBottom: 36 }}>
            Jede Frage öffnet eine Lernreise. Jede Lernreise öffnet neue Fragen. Es gibt keinen richtigen Startpunkt.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
            {FEATURED_QUESTIONS.map(({ q, path, cluster }) => <FeaturedQuestionCard key={path} q={q} path={path} cluster={cluster} />)}
          </div>
        </section>

        <section style={{ paddingTop: 32, paddingBottom: 56, borderTop: '1px solid var(--border)' }}>
          <p className="section-eyebrow">Die Foundation</p>
          <h2 className="section-headline" style={{ maxWidth: '22ch', marginBottom: 36 }}>Vier Bereiche statt vier Varianten von „Lernen“.</h2>
          <div className="entries-grid">
            <Link href="/learning" style={{ color: 'inherit', textDecoration: 'none' }}><div className="entry-card"><h3>Lernen</h3><p>Lernpfade, Fächer und Wissenskarte gebündelt an einem Ort.</p><span className="entry-link">Zum Lernen →</span></div></Link>
            <Link href="/research" style={{ color: 'inherit', textDecoration: 'none' }}><div className="entry-card"><h3>Forschung</h3><p>Research Watch, Quellen und neue wissenschaftliche Entwicklungen.</p><span className="entry-link">Zur Forschung →</span></div></Link>
            <Link href="/participate" style={{ color: 'inherit', textDecoration: 'none' }}><div className="entry-card"><h3>Mitwirken</h3><p>Mitgliedschaft, Fördermitgliedschaft und Beiträge weiterer Autorinnen und Autoren.</p><span className="entry-link">Mitwirken →</span></div></Link>
            <Link href="/foundation" style={{ color: 'inherit', textDecoration: 'none' }}><div className="entry-card"><h3>Stiftung</h3><p>Auftrag, Menschen, Transparenz und das institutionelle Modell der SSF.</p><span className="entry-link">Foundation verstehen →</span></div></Link>
          </div>
        </section>

        <FoundationHighlights locale="de" placement="home" />

        <section style={{ paddingTop: 48, paddingBottom: 64, borderTop: '1px solid var(--border)', maxWidth: '60ch' }}>
          <p className="section-eyebrow">Das Prinzip</p>
          <h2 className="section-headline" style={{ marginBottom: 20 }}>Nicht Stoff — Verständnis.</h2>
          <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>
            Die SSF beginnt dort, wo andere aufhören zu erklären. Nicht bei der Formel, sondern bei der Frage, die man sich stellt, wenn man aus dem Fenster schaut.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>
            Lernen ist der Kern, aber nicht der einzige Zweck: Wissen soll nachvollziehbar entstehen, von Menschen erweitert werden können und dauerhaft offen zugänglich bleiben.
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '.06em' }}>
            Fiktives Wissenschaftsprojekt · Solar Science Foundation · gegründet 2045 in Sundern
          </p>
        </section>
      </div>
    </>
  );
}
