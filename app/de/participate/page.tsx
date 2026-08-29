import ParticipationApplicationPanel from '../../../components/ParticipationApplicationPanel';
import { editorialWorkflow, participationRoles } from '../../../lib/participationModel';

const roleOrder = ['learner', 'member', 'supporting-member', 'author', 'reviewer', 'editor'];
const workflowLabels: Record<string, string> = {
  proposal: 'Vorschlag',
  'editorial-screening': 'Redaktionelle Vorprüfung',
  'scientific-review': 'Fachreview',
  revision: 'Überarbeitung',
  'editorial-approval': 'Redaktionelle Freigabe',
  publication: 'Veröffentlichung',
};

export default function GermanParticipatePage() {
  const roles = roleOrder.map((id) => participationRoles.find((role) => role.id === id)!).filter(Boolean);

  return (
    <div className="container" style={{ paddingTop: 64, paddingBottom: 80 }}>
      <p className="section-eyebrow">Mitwirken</p>
      <h1 className="section-headline" style={{ maxWidth: '18ch' }}>Lernen ist offen. Mitwirkung hat klare Rollen.</h1>
      <p style={{ maxWidth: '66ch', color: 'var(--muted)', lineHeight: 1.8, fontSize: 17 }}>
        Die Solar Science Foundation soll Wissen frei zugänglich machen und zugleich eine belastbare Gemeinschaft für Mitgliedschaft, Förderung und Autorenschaft aufbauen. Diese Rollen sind bewusst getrennt: Geld kauft keine fachliche Autorität, und Autorenschaft bedeutet nicht ungeprüfte Veröffentlichung.
      </p>

      <section style={{ paddingTop: 48 }}>
        <p className="section-eyebrow">Rollenmodell</p>
        <h2 className="section-headline">Sechs Rollen, unterschiedliche Verantwortung</h2>
        <div className="entries-grid" style={{ marginTop: 28 }}>
          {roles.map((role) => (
            <article className="entry-card" key={role.id}>
              <p className="section-eyebrow">{role.requiresAdmission ? 'Aufnahme erforderlich' : 'Offener Zugang'}</p>
              <h3>{role.titleDe}</h3>
              <p>{role.purposeDe}</p>
              <small>{role.mayPublishDirectly ? 'Kann nach redaktioneller Verantwortung veröffentlichen.' : 'Keine direkte Veröffentlichung ohne Freigabe.'}</small>
            </article>
          ))}
        </div>
      </section>

      <section style={{ paddingTop: 64, maxWidth: '72ch' }}>
        <p className="section-eyebrow">Autorenschaft</p>
        <h2 className="section-headline">Ein Beitrag wird nicht durch Hochladen zu SSF-Wissen.</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
          Autorinnen und Autoren entwickeln die didaktische Ebene: Erklärungen, Beispiele, Aufgaben, Lernwege und Quellenhinweise. Fachliche Aussagen werden geprüft; kanonische wissenschaftliche Fakten und Identifikatoren bleiben im KUEPER Knowledge Graph verankert. Erst die Redaktion veröffentlicht einen Beitrag als SSF-Inhalt.
        </p>
        <ol style={{ lineHeight: 1.9, paddingLeft: 24 }}>
          {editorialWorkflow.map((step) => <li key={step}>{workflowLabels[step]}</li>)}
        </ol>
      </section>

      <section style={{ paddingTop: 56, maxWidth: '72ch' }}>
        <p className="section-eyebrow">Mitgliedschaft & Förderung</p>
        <h2 className="section-headline">Zugehörigkeit und Unterstützung sind nicht dasselbe.</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
          Eine reguläre Mitgliedschaft ist für gemeinschaftliche Beteiligung gedacht. Eine Fördermitgliedschaft unterstützt die Arbeit finanziell oder organisatorisch. Beide können nebeneinander bestehen; keine davon verleiht automatisch Autoren-, Review- oder Redaktionsrechte.
        </p>
      </section>

      <ParticipationApplicationPanel locale="de" />

      <section style={{ marginTop: 56, padding: 28, border: '1px solid var(--border)', borderRadius: 18 }}>
        <p className="section-eyebrow">Status</p>
        <h2 style={{ marginTop: 8 }}>Anträge sind aktiv, Zahlungen noch nicht.</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: 0 }}>
          Mitgliedschaft, Fördermitgliedschaft und Autorenschaft können jetzt beantragt werden. Ein Antrag vergibt keine Rolle automatisch. Mitgliedsbeiträge, Zahlungsabwicklung und formale Governance-Rechte werden erst aktiviert, wenn diese Regeln verbindlich festgelegt sind.
        </p>
      </section>
    </div>
  );
}
