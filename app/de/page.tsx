import Link from 'next/link';
import { getKxfLearningModules } from '../../lib/kxf';
import { subjects } from '../../lib/subjects';
import HeroBackground from '../../components/HeroBackground';

export default async function GermanHomePage() {
  const modules  = await getKxfLearningModules();
  const featured = modules.find(m => m.summary && !m.summary.startsWith('A learning')) ?? modules[0];

  return (
    <>
      <section className="home-hero">
        <HeroBackground />
        <div className="home-hero-inner">
          <div className="home-hero-copy">
            <p className="section-eyebrow">Unabhängiges Wissenschaftslernen</p>
            <h1 className="home-hero-title">Wissenschaft beginnt mit einer Frage.</h1>
            <p className="home-hero-lede">
              Folge deiner Neugier. Erkunde Physik, Chemie, Mathematik, Astronomie,
              Biologie, Geowissenschaften und Geschichte als verbundenes Wissen —
              nicht als festen Lehrplan.
            </p>
            <div className="home-hero-actions">
              <Link className="btn" href="/de/learn">Wissenskarte erkunden →</Link>
              <Link className="btn secondary" href={`/de/modules/${featured.id}`}>Lernen starten</Link>
            </div>
          </div>

          <aside className="home-hero-map" aria-label="Beispiel für Wissensfluss">
            <p className="section-eyebrow">Verbundenes Wissen</p>
            <div className="hero-flow">
              <span>Frage</span>
              <i />
              <span>Wissen</span>
              <i />
              <span>Verbindungen</span>
              <i />
              <span>Anwendung</span>
            </div>
            <p>
              Eine Frage öffnet einen Pfad. Jedes Konzept zeigt, worauf es aufbaut —
              und wo es später verwendet werden kann.
            </p>
          </aside>
        </div>
      </section>

      <div className="container">
        <section className="entries-section">
          <p className="section-eyebrow">Wo beginnen?</p>
          <h2 className="section-headline">Drei Einstiege</h2>
          <div className="entries-grid">
            <Link href="/de/learn" style={{ color: 'inherit', textDecoration: 'none' }}>
              <div className="entry-card">
                <div className="entry-icon">📚</div>
                <h3>Entdecken</h3>
                <p>Folge einer Frage. Jede Entdeckung öffnet drei weitere. Kein fester Weg — nur Neugier.</p>
                <span className="entry-link">Alle Themen erkunden →</span>
              </div>
            </Link>
            <Link href="/de/learning-paths" style={{ color: 'inherit', textDecoration: 'none' }}>
              <div className="entry-card">
                <div className="entry-icon">🔭</div>
                <h3>Lernpfade</h3>
                <p>Strukturierte Wege von Grundlagen zu fortgeschrittenen Themen — in deinem Tempo.</p>
                <span className="entry-link">Lernpfade ansehen →</span>
              </div>
            </Link>
            <Link href="/de/subjects" style={{ color: 'inherit', textDecoration: 'none' }}>
              <div className="entry-card">
                <div className="entry-icon">🧭</div>
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

      <section className="noxia-strip">
        <div className="container">
          <div className="noxia-inner">
            <div>
              <p className="noxia-eyebrow">NOχ¹Δ Universe</p>
              <h2 className="noxia-headline">
                Was du hier lernst,<br />hat Folgen.
              </h2>
              <p className="noxia-body" style={{ marginBottom: 28 }}>
                NOχ¹Δ ist ein Science-Exploration-Universum, in dem Wissen Fähigkeiten freischaltet.
                Dein Verständnis ist deine Ausrüstung.
              </p>
              <a href="https://noxiagame.vercel.app" className="btn gold">NOχ¹Δ betreten →</a>
            </div>
            <div className="noxia-keys">
              {[
                { icon: '🔬', key: 'SENSOR:SPECTRAL', desc: 'Freigeschaltet durch das Lichtmodul' },
                { icon: '⚗️', key: 'MISSION:LAB-ALPHA', desc: 'Freigeschaltet durch Chemie-Grundlagen' },
                { icon: '🌍', key: 'MISSION:ORBITAL', desc: 'Freigeschaltet durch Gravitation und Umlaufbahnen' },
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
