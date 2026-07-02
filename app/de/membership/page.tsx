import { membershipRoles } from '../../../lib/membership';

export default function GermanMembershipPage() {
  return (
    <div className="container" style={{ paddingTop: 56 }}>
      <p className="kicker">Mitgliedschaft</p>
      <h1 className="hero" style={{ fontSize: 56 }}>Lernen, unterstuetzen, beitragen.</h1>
      <p className="lede" style={{ maxWidth: '68ch' }}>
        Die SSF-Mitgliedschaft ist fuer das weitere KUEPER-Oekosystem gedacht. Lernfortschritt kann von
        Partnerprojekten wie NO&#967;&#185;&#916; genutzt werden, aber finanzielle Unterstuetzung kauft keine wissenschaftliche oder spielerische Macht.
      </p>

      <section className="subject-section">
        <div className="section-row">
          <h2 className="section-title" style={{ fontSize: 34 }}>Rollen</h2>
          <span className="mono" style={{ color: 'var(--steel)' }}>{membershipRoles.length} Rollen</span>
        </div>
        <div className="subject-grid">
          {membershipRoles.map((role) => (
            <article key={role.id} className="subject-card">
              <span className="code">{role.id}</span>
              <strong style={{ marginTop: 16 }}>{role.publicLabel}</strong>
              <small>{role.scopes.length} Bereiche</small>
              <p>{role.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="platform-grid" style={{ marginTop: 58 }}>
        <div className="platform-card">
          <p className="section-title">Lern-Freischaltungen</p>
          <p>Spielrelevante Freischaltungen entstehen durch abgeschlossene Lernmodule, nicht durch Zahlungen.</p>
        </div>
        <div className="platform-card">
          <p className="section-title">Unterstuetzung</p>
          <p>Unterstuetzende Mitglieder und Spender helfen, SSF unabhaengig und zweisprachig zu halten.</p>
        </div>
        <div className="platform-card">
          <p className="section-title">Mitautorenschaft</p>
          <p>Beitragende und Mitautoren koennen Module, Uebungen, Korrekturen und Uebersetzungen mitentwickeln.</p>
        </div>
      </section>
    </div>
  );
}
