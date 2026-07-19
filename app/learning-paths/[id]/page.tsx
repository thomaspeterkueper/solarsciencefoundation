import { notFound } from 'next/navigation';
import PathRunner from '../../../components/learning/PathRunner';
import MaillardJourney from '../../../components/learning/MaillardJourney';
import {
  getLearningPathStatus,
  getRegisteredLearningPathById,
} from '../../../lib/learningPathRegistry';

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ uid?: string; ref?: string }>;
};

export default async function LearningPathDetailPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const sp = searchParams ? await searchParams : {};
  const noxiaUid = sp?.uid ?? null;
  const fromNoxia = sp?.ref === 'noxia';
  const path = getRegisteredLearningPathById(decodeURIComponent(id));

  if (!path) notFound();

  const lifecycle = getLearningPathStatus(path.status);
  const isMaillard = path.id === 'PATH:SSF:CHE-KUECHE-MAILLARD-0001';

  return (
    <div className="container reading" style={{ paddingTop: 40, paddingBottom: 96 }}>
      {/* NOXIA context banner */}
      {fromNoxia && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 12, marginBottom: 24, padding: '10px 16px',
          background: '#0A1628', borderRadius: 8,
          border: '1px solid rgba(201,168,76,0.3)',
          flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 16 }}>🎮</span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.7)',
              letterSpacing: '.06em',
            }}>
              Abschluss dieser Lernreise schaltet Fähigkeiten in NOXIA frei
            </span>
          </div>
          <a href="https://noxiagame.vercel.app/dashboard" style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, color: '#C9A84C',
            letterSpacing: '.06em', textDecoration: 'none', whiteSpace: 'nowrap',
          }}>← Zurück zu NOXIA</a>
        </div>
      )}
      {/* Page header: title as small eyebrow, subtitle as the headline */}
      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10,
      }}>
        Lernreise
      </p>
      <h1 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(26px, 4vw, 40px)',
        fontWeight: 'normal',
        color: 'var(--ink)',
        lineHeight: 1.18,
        letterSpacing: '-0.02em',
        maxWidth: '22em',
        marginBottom: 14,
      }}>
        {path.title}
      </h1>
      <p style={{ color: 'var(--muted)', maxWidth: '58ch', fontSize: 16, lineHeight: 1.75, marginBottom: 20 }}>
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
