/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      app/about/page.tsx
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/app/about/page.tsx
 * Name:      AboutPage
 * Version:   0.1.0
 * Created:   2026-06-26
 * Modified:  2026-06-26 13:00 CEST
 * Depends:   —
 */

export default function AboutPage() {
  return (
    <div className="container" style={{ paddingTop: 40 }}>
      <p className="kicker">About</p>
      <h1 className="hero" style={{ fontSize: 26 }}>An independent science learning project.</h1>
      <p style={{ color: 'var(--steel)', maxWidth: '60ch', marginTop: 18 }}>
        The Solar Science Foundation is an independent science learning project created and
        maintained by Thomas Peter Küper. It turns knowledge from the KUEPER Knowledge Graph into
        short learning modules in German and English.
      </p>
      <p style={{ color: 'var(--steel)', maxWidth: '60ch' }}>
        It is not an accredited educational institution and issues no formal qualifications.
        Progress earned here can be used by partner projects — the NOXIA science and exploration
        universe is the first of these.
      </p>
    </div>
  );
}
