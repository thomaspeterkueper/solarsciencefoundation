import { notFound } from 'next/navigation';
import { getLearningPathById } from '../../../lib/learningPaths';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function LearningPathDetailPage({ params }: PageProps) {
  const { id } = await params;
  const path = getLearningPathById(decodeURIComponent(id));

  if (!path) notFound();

  const totalDepth = path.units.flatMap((unit) => unit.sections).reduce((sum, section) => sum + (section.depthPoints ?? 0), 0);

  return (
    <div className="container reading" style={{ paddingTop: 56 }}>
      <p className="kicker">Learning path prototype</p>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <span className="code">{path.id}</span>
        <span className="mono" style={{ color: 'var(--steel)', fontSize: 13 }}>{path.kxfModuleId}</span>
      </div>
      <h1 className="hero" style={{ fontSize: 56, marginTop: 16 }}>{path.title}</h1>
      <p style={{ color: 'var(--steel)', maxWidth: '68ch', fontSize: 20 }}>{path.subtitle}</p>

      <div className="card" style={{ marginTop: 28 }}>
        <p className="section-title">Systemrollen</p>
        <RoleBlock title="Knowledge Graph" items={path.suppliedBy.knowledgeGraph} />
        <RoleBlock title="kueper.com" items={path.suppliedBy.kueperCom} />
        <RoleBlock title="OverTime Archive" items={path.suppliedBy.overtimeArchive} />
        <RoleBlock title="SSF" items={path.suppliedBy.ssf} />
      </div>

      <div className="card" style={{ marginTop: 18 }}>
        <p className="section-title">Lerntiefe und Unlocks</p>
        <p className="mono" style={{ color: 'var(--steel)' }}>Maximale Roh-Tiefe: {totalDepth}</p>
        <p className="mono" style={{ color: 'var(--link)' }}>Unlocks: {path.unlocks.join(' · ')}</p>
        <p className="mono" style={{ color: 'var(--steel)' }}>Domains: {path.domainsNeeded.join(' · ')}</p>
      </div>

      <div style={{ display: 'grid', gap: 18, marginTop: 28 }}>
        {path.units.map((unit, index) => (
          <article key={unit.id} className="card">
            <p className="section-title">Einheit {index + 1}</p>
            <h2 className="module-title" style={{ fontSize: 30 }}>{unit.title}</h2>
            {unit.gate && <p className="mono" style={{ color: 'var(--steel)' }}>Gate: {unit.gate.type} → {unit.gate.unlocksUnitId}</p>}
            <div style={{ display: 'grid', gap: 10, marginTop: 18 }}>
              {unit.sections.map((section) => (
                <div key={section.id} style={{ border: '1px solid var(--border)', borderRadius: 12, padding: 14 }}>
                  <div className="module-meta">
                    <span className="code">{section.kind}</span>
                    <span className="mono" style={{ color: 'var(--steel)', fontSize: 12 }}>
                      {section.optional ? 'optional' : 'main'} · depth {section.depthPoints ?? 0}
                    </span>
                  </div>
                  <strong>{section.title}</strong>
                  <p style={{ color: 'var(--steel)', marginBottom: 0 }}>{section.summary}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function RoleBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div style={{ marginTop: 18 }}>
      <strong>{title}</strong>
      <ul style={{ color: 'var(--steel)', marginTop: 8 }}>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}
