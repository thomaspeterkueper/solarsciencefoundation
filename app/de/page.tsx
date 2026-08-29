import Image from 'next/image';
import Link from 'next/link';
import { getKxfLearningModules } from '../../lib/kxf';

export default async function GermanHomePage() {
  const modules = await getKxfLearningModules();
  const featured = modules.find((m) => m.summary && !m.summary.startsWith('A learning')) ?? modules[0];

  return (
    <>
      <section className="home-hero">
        <Image src="/images/hero/discover-hero.png" alt="Solar Science Foundation Discovery Hall" fill priority sizes="100vw" className="home-hero-bg" />
        <div className="home-hero-overlay" aria-hidden="true" />
        <div className="home-hero-inner">
          <div className="home-hero-copy">
            <p className="section-eyebrow">Unabhängiges Wissenschaftslernen</p>
            <h1 className="home-hero-title">Wissenschaft beginnt mit Neugier.</h1>
            <p className="home-hero-lede">Lerne, forsche, trage Wissen bei und unterstütze eine offene Plattform für wissenschaftliches Verständnis.</p>
            <div className="home-hero-actions">
              <Link className="btn" href="/de/learning">Lernen →</Link>
              <Link className="btn secondary" href="/de/participate">Mitwirken</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <section className="entries-section">
          <p className="section-eyebrow">Die Foundation</p>
          <h2 className="section-headline">Vier klare Bereiche</h2>
          <div className="entries-grid">
            <Link href="/de/learning" style={{ color: 'inherit', textDecoration: 'none' }}><div className="entry-card"><h3>Lernen</h3><p>Lernpfade, Fächer und Wissenskarte gebündelt an einem Ort.</p><span className="entry-link">Zum Lernen →</span></div></Link>
            <Link href="/de/research" style={{ color: 'inherit', textDecoration: 'none' }}><div className="entry-card"><h3>Forschung</h3><p>Research Watch, Quellen und neue wissenschaftliche Entwicklungen.</p><span className="entry-link">Zur Forschung →</span></div></Link>
            <Link href="/de/participate" style={{ color: 'inherit', textDecoration: 'none' }}><div className="entry-card"><h3>Mitwirken</h3><p>Mitgliedschaft, Fördermitgliedschaft und Beiträge weiterer Autorinnen und Autoren.</p><span className="entry-link">Mitwirken →</span></div></Link>
            <Link href="/de/foundation" style={{ color: 'inherit', textDecoration: 'none' }}><div className="entry-card"><h3>Stiftung</h3><p>Auftrag, Menschen, Transparenz und das institutionelle Modell der SSF.</p><span className="entry-link">Stiftung ansehen →</span></div></Link>
          </div>
        </section>

        <section style={{ paddingTop: 48, paddingBottom: 64, borderTop: '1px solid var(--border)', maxWidth: '60ch' }}>
          <p className="section-eyebrow">Schnellstart</p>
          <h2 className="section-headline">Direkt in ein Modul</h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
            Wenn du sofort loslegen möchtest, kannst du direkt in ein verfügbares Lernmodul einsteigen.
          </p>
          <Link className="btn" href={`/de/modules/${featured.id}`}>Lernen starten →</Link>
        </section>
      </div>
    </>
  );
}
