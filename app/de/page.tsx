import Link from 'next/link';
import { getKxfLearningModules } from '../../lib/kxf';
import { subjects } from '../../lib/subjects';

export default async function GermanHomePage() {
  const modules = await getKxfLearningModules();
  const featured = modules[0];

  return (
    <div className="container" style={{ paddingTop: 58, paddingBottom: 8 }}>
      <section className="hero-grid">
        <div>
          <p className="kicker">Fiktives NO&#967;&#185;&#916;-Universumsarchiv - gegruendet 2045 in Genf</p>
          <h1 className="hero">Wissen muss im Fluss bleiben.</h1>
          <p className="lede">
            Die Solar Science Foundation ist eine fiktive Wissenschafts-, Lern- und Archivplattform innerhalb des NO&#967;&#185;&#916;-Universums.
            Sie uebersetzt verbundenes Wissen aus dem KUEPER Knowledge Graph in kurze Lernmodule auf Deutsch und Englisch.
          </p>
          <p className="subjects">
            Mathematik <span>·</span> Physik <span>·</span> Chemie <span>·</span> Astronomie <span>·</span> Biologie
          </p>
          <div className="hero-actions">
            <Link className="btn" href={`/modules/${featured.id}`}>Lernen starten →</Link>
            <Link className="btn secondary" href="/subjects">Faecher ansehen →</Link>
          </div>
          <p style={{ color: 'var(--steel)', maxWidth: 760, lineHeight: 1.55, marginTop: 22, fontSize: 14 }}>
            SSF ist Bildungs-Worldbuilding fuer Lernmodule, Archivdokumente und optionale NO&#967;&#185;&#916;-Fortschritte.
          </p>
        </div>

        <Link href={`/modules/${featured.id}`} style={{ color: 'inherit' }}>
          <div className="card prominent">
            <div className="module-meta">
              <span className="code">{featured.id}</span>
              <span className="mono" style={{ fontSize: 13, color: 'var(--steel)' }}>
                {featured.domain} · {featured.durationMinutes} min
              </span>
            </div>
            <div className="module-title">{featured.title}</div>
            <p style={{ color: 'var(--steel)', margin: 0 }}>{featured.summary}</p>
            <p style={{ color: 'var(--link)', fontSize: 17, marginTop: 22, marginBottom: 0, fontWeight: 600 }}>
              Modul beginnen →
            </p>
          </div>
        </Link>
      </section>

      <section className="platform-grid">
        <div className="platform-card">
          <p className="section-title">Knowledge Graph</p>
          <p>Kanonische Konzepte, Dokumente und Zuordnungen kommen aus dem KUEPER Knowledge Graph.</p>
        </div>
        <div className="platform-card">
          <p className="section-title">Lernfortschritt</p>
          <p>SSF macht aus Wissen Module, Uebungen und wiederverwendbare Fortschrittsdaten.</p>
        </div>
        <div className="platform-card">
          <p className="section-title">NO&#967;&#185;&#916; Freischaltungen</p>
          <p>Fortschritt kann optional Faehigkeiten in NO&#967;&#185;&#916; freischalten.</p>
        </div>
      </section>

      <section id="subjects" className="subject-section">
        <div className="section-row">
          <h2 className="section-title" style={{ fontSize: 34 }}>Nach Fach suchen</h2>
          <Link href="/subjects" style={{ fontWeight: 600 }}>Alle Faecher ansehen →</Link>
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
