import Image from 'next/image';
import Link from 'next/link';
import { registeredLearningPaths } from '../lib/learningPathRegistry';

// Ausgewählte Einstiegsfragen für die Startseite
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
      {/* ── Hero ── */}
      <section className="home-hero">
        <Image
          src="/images/hero/discover-hero.png"
          alt="Solar Science Foundation"
          fill priority sizes="100vw"
          className="home-hero-bg"
        />
        <div className="home-hero-overlay" aria-hidden="true" />
        <div className="home-hero-inner">
          <div className="home-hero-copy">
            <p className="section-eyebrow">Solar Science Foundation · Fiktives Wissenschaftsprojekt</p>
            <h1 className="home-hero-title">
              Wissenschaft beginnt mit einer Frage.
            </h1>
            <p className="home-hero-lede">
              Entdecke die Physik und Chemie hinter dem Alltag —
              ohne Prüfungsdruck, ohne Noten, ohne Vorwissen.
              {totalPaths} Lernreisen warten auf dich.
            </p>
            <div className="home-hero-actions">
              <Link className="btn" href="/learning-paths">Alle Lernreisen →</Link>
              <Link className="btn secondary" href="/learn">Wissensnetz erkunden</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container">

        {/* ── Einstiegsfragen ── */}
        <section style={{ paddingTop: 64, paddingBottom: 48 }}>
          <p className="section-eyebrow">Womit möchtest du beginnen?</p>
          <h2 className="section-headline" style={{ maxWidth: '24ch', marginBottom: 8 }}>
            Sechs Fragen — sechs Wege ins Netz.
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.7, maxWidth: '52ch', marginBottom: 36 }}>
            Jede Frage öffnet eine Lernreise. Jede Lernreise öffnet neue Fragen.
            Es gibt keinen richtigen Startpunkt.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 14,
          }}>
            {FEATURED_QUESTIONS.map(({ q, path, cluster }) => (
              <Link
                key={path}
                href={'/learning-paths/' + encodeURIComponent(path)}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{
                  padding: '20px 22px',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  background: 'var(--panel)',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s, transform 0.15s',
                  height: '100%',
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--ink)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLElement).style.transform = 'none';
                  }}
                >
                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    color: 'var(--muted)',
                    letterSpacing: '.08em',
                    textTransform: 'uppercase',
                    marginBottom: 10,
                  }}>{cluster}</p>
                  <p style={{
                    fontFamily: 'var(--font-serif, Georgia, serif)',
                    fontSize: 17,
                    lineHeight: 1.35,
                    color: 'var(--ink)',
                    marginBottom: 14,
                  }}>{q}</p>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: 'var(--muted)',
                    letterSpacing: '.06em',
                  }}>Lernreise öffnen →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Drei Wege ── */}
        <section style={{ paddingTop: 32, paddingBottom: 56, borderTop: '1px solid var(--border)' }}>
          <p className="section-eyebrow">Drei Wege</p>
          <h2 className="section-headline" style={{ maxWidth: '20ch', marginBottom: 36 }}>
            Wie möchtest du lernen?
          </h2>
          <div className="entries-grid">
            <Link href="/learning-paths" style={{ color: 'inherit', textDecoration: 'none' }}>
              <div className="entry-card">
                <p style={{ fontSize: 28, marginBottom: 10 }}>🗺</p>
                <h3>Lernreisen</h3>
                <p>Strukturierte Pfade von der Alltagsbeobachtung zum Verständnis. {totalPaths} Reisen, jede mit Experimenten und Quiz.</p>
                <span className="entry-link">Alle Lernreisen →</span>
              </div>
            </Link>
            <Link href="/learn" style={{ color: 'inherit', textDecoration: 'none' }}>
              <div className="entry-card">
                <p style={{ fontSize: 28, marginBottom: 10 }}>🕸</p>
                <h3>Wissensnetz</h3>
                <p>Erkunde den Zusammenhang zwischen Themen. Folge Verbindungen — jede Entdeckung öffnet neue Wege.</p>
                <span className="entry-link">Netz erkunden →</span>
              </div>
            </Link>
            <Link href="/subjects" style={{ color: 'inherit', textDecoration: 'none' }}>
              <div className="entry-card">
                <p style={{ fontSize: 28, marginBottom: 10 }}>📚</p>
                <h3>Nach Thema</h3>
                <p>Physik, Chemie, Mathematik, Ingenieurwesen — falls du weißt wo du suchen willst.</p>
                <span className="entry-link">Themen ansehen →</span>
              </div>
            </Link>
          </div>
        </section>

        {/* ── Prinzip ── */}
        <section style={{
          paddingTop: 48, paddingBottom: 64,
          borderTop: '1px solid var(--border)',
          maxWidth: '60ch',
        }}>
          <p className="section-eyebrow">Das Prinzip</p>
          <h2 className="section-headline" style={{ marginBottom: 20 }}>
            Nicht Stoff — Verständnis.
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>
            Die SSF beginnt dort wo andere aufhören zu erklären.
            Nicht bei der Formel — sondern bei der Frage die man sich stellt
            wenn man aus dem Fenster schaut.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>
            Jede Lernreise folgt demselben Muster: Beobachtung → Experiment → Erklärung → Entdeckung.
            Nach jedem Abschnitt sollte das Gefühl bleiben: <em>Das habe ich selbst herausgefunden.</em>
          </p>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--muted)',
            letterSpacing: '.06em',
          }}>
            Fiktives Wissenschaftsprojekt · Solar Science Foundation · gegründet 2045 in Sundern
          </p>
        </section>

      </div>
    </>
  );
}
