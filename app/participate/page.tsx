import ParticipationApplicationPanel from '../../components/ParticipationApplicationPanel';
import { editorialWorkflow, participationRoles } from '../../lib/participationModel';

const roleOrder = ['learner', 'member', 'supporting-member', 'author', 'reviewer', 'editor'];
const workflowLabels: Record<string, string> = {
  proposal: 'Proposal',
  'editorial-screening': 'Editorial screening',
  'scientific-review': 'Scientific review',
  revision: 'Revision',
  'editorial-approval': 'Editorial approval',
  publication: 'Publication',
};

export default function ParticipatePage() {
  const roles = roleOrder.map((id) => participationRoles.find((role) => role.id === id)!).filter(Boolean);

  return (
    <div className="container" style={{ paddingTop: 64, paddingBottom: 80 }}>
      <p className="section-eyebrow">Participate</p>
      <h1 className="section-headline" style={{ maxWidth: '18ch' }}>Learning is open. Participation has clear roles.</h1>
      <p style={{ maxWidth: '66ch', color: 'var(--muted)', lineHeight: 1.8, fontSize: 17 }}>
        Solar Science Foundation is intended to keep knowledge openly accessible while building a reliable community for membership, support and authorship. These roles are deliberately separate: money does not buy scientific authority, and authorship does not mean unreviewed publication.
      </p>

      <section style={{ paddingTop: 48 }}>
        <p className="section-eyebrow">Role model</p>
        <h2 className="section-headline">Six roles, different responsibilities</h2>
        <div className="entries-grid" style={{ marginTop: 28 }}>
          {roles.map((role) => (
            <article className="entry-card" key={role.id}>
              <p className="section-eyebrow">{role.requiresAdmission ? 'Admission required' : 'Open access'}</p>
              <h3>{role.titleEn}</h3>
              <p>{role.purposeEn}</p>
              <small>{role.mayPublishDirectly ? 'May publish under editorial responsibility.' : 'No direct publication without approval.'}</small>
            </article>
          ))}
        </div>
      </section>

      <section style={{ paddingTop: 64, maxWidth: '72ch' }}>
        <p className="section-eyebrow">Authorship</p>
        <h2 className="section-headline">Uploading a contribution does not make it SSF knowledge.</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
          Authors develop the didactic layer: explanations, examples, exercises, learning paths and source notes. Scientific claims are reviewed; canonical scientific facts and identifiers remain governed by the KUEPER Knowledge Graph. Publication as SSF content remains an editorial decision.
        </p>
        <ol style={{ lineHeight: 1.9, paddingLeft: 24 }}>
          {editorialWorkflow.map((step) => <li key={step}>{workflowLabels[step]}</li>)}
        </ol>
      </section>

      <section style={{ paddingTop: 56, maxWidth: '72ch' }}>
        <p className="section-eyebrow">Membership & support</p>
        <h2 className="section-headline">Belonging and supporting are not the same thing.</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
          Regular membership is intended for community participation. Supporting membership strengthens the work financially or organizationally. Neither automatically grants author, reviewer or editorial rights.
        </p>
      </section>

      <ParticipationApplicationPanel locale="en" />

      <section style={{ marginTop: 56, padding: 28, border: '1px solid var(--border)', borderRadius: 18 }}>
        <p className="section-eyebrow">Status</p>
        <h2 style={{ marginTop: 8 }}>Applications are active; payments are not.</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: 0 }}>
          Membership, supporting membership and authorship can now be applied for. An application never grants a role automatically. Membership fees, payment processing and formal governance rights remain inactive until those rules are explicitly defined.
        </p>
      </section>
    </div>
  );
}
