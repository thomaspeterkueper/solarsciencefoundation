import { notFound } from 'next/navigation';
import PathRunner from '../../../components/learning/PathRunner';
import MaillardJourney from '../../../components/learning/MaillardJourney';
import {
  getLearningPathStatus,
  getRegisteredLearningPathById,
} from '../../../lib/learningPathRegistry';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function LearningPathDetailPage({ params }: PageProps) {
  const { id } = await params;
  const path = getRegisteredLearningPathById(decodeURIComponent(id));

  if (!path) notFound();

  const lifecycle = getLearningPathStatus(path.status);
  const isMaillard = path.id === 'PATH:SSF:CHE-KUECHE-MAILLARD-0001';

  return (
    <div className="container reading" style={{ paddingTop: 40, paddingBottom: 96 }}>
      <p className="kicker" style={{ marginBottom: 8 }}>{path.title}</p>
      <p style={{ color: 'var(--muted)', maxWidth: '60ch', fontSize: 17, lineHeight: 1.7, marginBottom: 16 }}>
        {path.subtitle}
      </p>

      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '6px 12px',
        border: '1px solid var(--border)',
        borderRadius: 6,
        background: 'var(--soft)',
        marginBottom: 12,
      }}>
        <span style={{
          width: 7, height: 7, borderRadius: '50%',
          background: path.status === 'active' ? 'var(--success)' : 'var(--gold)',
          flexShrink: 0,
        }} />
        <strong style={{ color: 'var(--ink)', fontSize: 13 }}>{lifecycle.label}</strong>
        <span style={{ color: 'var(--muted)', fontSize: 12 }}>— {lifecycle.description}</span>
      </div>

      {path.unlocks.length > 0 && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
          marginBottom: 8, padding: '8px 12px',
          background: 'var(--gold-bg, #FFF8E7)',
          border: '1px solid #DFC87A',
          borderRadius: 6,
        }}>
          <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
            NOχ¹Δ
          </span>
          {path.unlocks.map((key) => (
            <span key={key} style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              background: 'var(--gold-bg, #FFF8E7)',
              border: '1px solid #DFC87A',
              color: 'var(--navy)',
              padding: '2px 8px', borderRadius: 4,
            }}>{key}</span>
          ))}
        </div>
      )}

      {isMaillard ? <MaillardJourney path={path} /> : <PathRunner path={path} />}
    </div>
  );
}
