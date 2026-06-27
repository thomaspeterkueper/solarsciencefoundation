import { membershipRoles } from '../../lib/membership';

export default function MembershipPage() {
  return (
    <div className="container" style={{ paddingTop: 56 }}>
      <p className="kicker">Membership</p>
      <h1 className="hero" style={{ fontSize: 56 }}>Learn, support, contribute.</h1>
      <p className="lede" style={{ maxWidth: '68ch' }}>
        SSF membership is designed for the wider KUEPER ecosystem. Learning progress can be used by
        partner projects such as NOXIA, but paid support never buys scientific or game power.
      </p>

      <section className="subject-section">
        <div className="section-row">
          <h2 className="section-title" style={{ fontSize: 34 }}>Roles</h2>
          <span className="mono" style={{ color: 'var(--steel)' }}>{membershipRoles.length} roles</span>
        </div>
        <div className="subject-grid">
          {membershipRoles.map((role) => (
            <article key={role.id} className="subject-card">
              <span className="code">{role.id}</span>
              <strong style={{ marginTop: 16 }}>{role.publicLabel}</strong>
              <small>{role.scopes.length} scopes</small>
              <p>{role.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="platform-grid" style={{ marginTop: 58 }}>
        <div className="platform-card">
          <p className="section-title">Learning unlocks</p>
          <p>Game-relevant unlocks come from completed learning modules, not from payments.</p>
        </div>
        <div className="platform-card">
          <p className="section-title">Support</p>
          <p>Supporting members and donors help keep SSF independent and bilingual.</p>
        </div>
        <div className="platform-card">
          <p className="section-title">Co-authorship</p>
          <p>Contributors and co-authors can help build modules, exercises, corrections and translations.</p>
        </div>
      </section>
    </div>
  );
}
