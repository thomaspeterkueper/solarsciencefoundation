import { getLegalProjectInfo } from '../../../lib/legal';

const sections = [
  ['Controller', 'The responsible operator is shown below. Contact and postal details must be completed from the KUEPER Knowledge Graph before public launch.'],
  ['Project purpose', 'SSF provides science learning modules, exercises, progress tracking, achievements and partner-project unlocks.'],
  ['Records used by the service', 'The service may store account identity, email address, login state, session metadata, completed modules, exercise attempts, achievements, unlocks and technical access logs.'],
  ['Why records are used', 'Records are used to operate accounts, store progress, evaluate module completion, grant achievements and provide limited unlock signals to partner projects such as NOXIA.'],
  ['Service providers', 'The site is deployed on Vercel. Authentication and database functions use Supabase. GitHub is used for source control and deployment integration.'],
  ['Partner signals', 'Partner projects should receive only required learning signals such as completed modules, active unlocks and next recommended modules. Email addresses, passwords and individual wrong answers are not partner-game signals.'],
  ['Retention', 'Account and progress records are kept while the account exists or while they are needed for the learning functions. A user may request access, correction or deletion.'],
  ['Rights', 'Users may request access, correction, deletion, restriction, portability and objection where applicable. Consent-based processing can be withdrawn for the future.'],
  ['Local storage', 'The platform may use technically necessary cookies or local storage for login state, session handling and local demo progress.'],
  ['Test operation', 'This notice describes the current test operation and must be updated when payments, newsletters, analytics, community features or public profiles are added.']
];

export default async function Page() {
  const info = await getLegalProjectInfo();

  return (
    <div className="container reading" style={{ paddingTop: 56 }}>
      <p className="kicker">Privacy</p>
      <h1 className="hero" style={{ fontSize: 56 }}>Privacy notice</h1>
      <div className="card" style={{ marginTop: 28 }}>
        <p className="section-title">Project</p>
        <p><strong>{info.projectName}</strong></p>
        <p>{info.statusNote}</p>
        <p className="section-title" style={{ marginTop: 28 }}>Operator</p>
        <p>{info.operatorName}</p>
        <p>Contact: TO BE COMPLETED IN KUEPER KNOWLEDGE GRAPH</p>
        <p>Imprint: <a href={info.imprintUrl}>{info.imprintUrl}</a></p>

        {sections.map(([title, body], index) => (
          <section key={title} style={{ marginTop: 28 }}>
            <p className="section-title">{index + 1}. {title}</p>
            <p>{body}</p>
          </section>
        ))}

        <p className="mono" style={{ color: 'var(--steel)', marginTop: 28 }}>Updated: 2026-06-28 · Source: {info.source}</p>
      </div>
    </div>
  );
}
