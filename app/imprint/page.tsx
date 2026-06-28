import { getLegalProjectInfo } from '../../lib/legal';

export default async function ImprintPage() {
  const info = await getLegalProjectInfo();

  return (
    <div className="container reading" style={{ paddingTop: 56 }}>
      <p className="kicker">Legal</p>
      <h1 className="hero" style={{ fontSize: 56 }}>Impressum</h1>

      <div className="card" style={{ marginTop: 28 }}>
        <p className="section-title">Angaben zum Projekt</p>
        <p><strong>{info.projectName}</strong></p>
        <p>{info.statusNote}</p>

        <p className="section-title" style={{ marginTop: 28 }}>Verantwortlich</p>
        <p>{info.operatorName}</p>

        <p className="section-title" style={{ marginTop: 28 }}>Website</p>
        <p><a href={info.websiteUrl}>{info.websiteUrl}</a></p>

        <p className="mono" style={{ color: 'var(--steel)', marginTop: 28 }}>
          Source: {info.source === 'kxf' ? 'KUEPER Knowledge Graph / KXF' : 'SSF fallback until KXF legal fields are complete'}
        </p>
      </div>
    </div>
  );
}
