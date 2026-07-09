import Image from 'next/image';
import Link from 'next/link';
import { getKxfLearningModules } from '../../lib/kxf';
import { subjects } from '../../lib/subjects';

export default async function GermanHomePage() {
  const modules = await getKxfLearningModules();
  const featured = modules.find((m) => m.summary && !m.summary.startsWith('A learning')) ?? modules[0];

  return (
    <>
      <section className="home-hero">
        <Image
          src="/images/hero/discover-hero.png"
          alt="Solar Science Foundation Discovery Hall"
          fill
          priority
          sizes="100vw"
          className="home-hero-bg"
        />
        <div className="home-hero-overlay" aria-hidden="true" />
        <div className="home-hero-inner">
          <div className="home-hero-copy">
            <p className="section-eyebrow">Unabhängiges Wissenschaftslernen</p>
            <h1 className="home-hero-title">Wissenschaft beginnt mit Neugier.</h1>
            <p className="home-hero-lede">
              Erkunde das verbundene Wissen hinter unserem Universum. Lerne in deinem Tempo,
              ohne Noten und ohne Druck.
            </p>
            <div className="home-hero-actions">
              <Link className="btn" href="/de/learn">Wissenskarte erkunden →</Link>
              <Link className="btn secondary" href={`/de/modules/${featured.id}`}>Lernen starten</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <section className="entries-section">
          <p className="section-eyebrow">Wo beginnen?</p>
          <h2 className="section-headline">Drei Einstiege</h2>
          <div className="entries-grid">
            <Link href="/de/learn" style={{ color: 'inherit', textDecoration: 'none' }}>
              <div className="entry-card">
                <h3>Entdecken</h3>
                <p>Folge einer Frage. Jede Entdeckung öffnet drei weitere. Kein fester Weg — nur Neugier.</p>
                <span className="entry-link">Alle Themen erkunden →</span>
              </div>
            </Link>
            <Link href="/de/learning-paths" style={{ color: 'inherit', textDecoration: 'none' }}>
              <div className="entry-card">
                <h3>Lernpfade</h3>
                <p>Strukturierte Wege von Grundlagen zu fortgeschrittenen Themen — in deinem Tempo.</p>
                <span className="entry-link">Lernpfade ansehen →</span>
              </div>
            </Link>
            <Link href="/de/subjects" style={{ color: 'inherit', textDecoration: 'none' }}>
              <div className="entry-card">
                <h3>Fächer</h3>
                <p>Erkunde Astronomie, Physik, Chemie, Mathematik, Biologie, Erde und Geschichte.</p>
                <span className="entry-link">Fächer ansehen →</span>
              </div>
            </Link>
          </div>
        </section>

        <section className="fields-section">
          <div className="section-row">
            <div>
              <p className="section-eyebrow">Felder der Neugier</p>
              <h2 className="section-headline">Wähle deine Welt</h2>
            </div>
            <Link href="/de/subjects" style={{ fontWeight: 600, fontSize: 15 }}>Alle Fächer →</Link>
          </div>
          <div className="fields-grid">
            {subjects.map((s) => (
              <Link key={s.id} href={`/de/subjects/${s.slug}`} className="field-card">
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
