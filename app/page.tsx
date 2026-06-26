import { learningModules } from '../lib/modules';

export default function HomePage() {
  const firstModule = learningModules[0];

  return (
    <main style={{ padding: '56px', maxWidth: 1080, margin: '0 auto' }}>
      <p className="badge">Solar Science Foundation</p>
      <h1 style={{ fontSize: 56, lineHeight: 1.05, margin: '24px 0 16px' }}>
        Scientific learning between the KUEPER Knowledge Graph and NOXIA.
      </h1>
      <p style={{ color: 'var(--muted)', fontSize: 20, lineHeight: 1.6, maxWidth: 760 }}>
        SSF translates foundational science into short learning modules, stores progress and exposes game-compatible unlocks for NOXIA.
      </p>

      <section className="card" style={{ marginTop: 36 }}>
        <p className="badge">First proof module</p>
        <h2>{firstModule.id}: {firstModule.title}</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>{firstModule.summary}</p>
        <p><strong>Unlock:</strong> {firstModule.unlocks.join(', ')}</p>
        <p><strong>API:</strong> /api/modules · /api/modules/SSF-PHY-1101 · /api/noxia/unlocks/demo</p>
      </section>
    </main>
  );
}
