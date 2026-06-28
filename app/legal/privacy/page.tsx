import { getLegalProjectInfo } from '../../../lib/legal';

export default async function Page() {
  const info = await getLegalProjectInfo();
  return (
    <div className="container reading" style={{ paddingTop: 56 }}>
      <p className="kicker">Privacy</p>
      <h1 className="hero" style={{ fontSize: 56 }}>Privacy</h1>
      <div className="card" style={{ marginTop: 28 }}>
        <p className="section-title">Project</p>
        <p><strong>{info.projectName}</strong></p>
        <p>{info.statusNote}</p>
        <p className="section-title" style={{ marginTop: 28 }}>Operator</p>
        <p>{info.operatorName}</p>
        <p className="section-title" style={{ marginTop: 28 }}>Imprint</p>
        <p><a href={info.imprintUrl}>{info.imprintUrl}</a></p>
        <p className="mono" style={{ color: 'var(--steel)', marginTop: 28 }}>Source: {info.source}</p>
      </div>
    </div>
  );
}
