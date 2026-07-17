'use client';
/**
 * OriginOfLifeTimeline — EXP:OSMOSE (origin-of-life context)
 * 13.8 billion year timeline: from Big Bang to first cell
 * Click on stages to explore what was present
 */
import { useState } from 'react';
import styles from './RayleighExperiment.module.css';

const STAGES = [
  {
    time: '13.8 Mrd. J.',
    label: 'Urknall',
    color: '#DC143C',
    molecules: [],
    desc: 'Nur Wasserstoff und Helium. Keine Kohlenstoffatome, kein Sauerstoff — die werden erst in Sternen geschmiedet.',
    icon: '💥',
  },
  {
    time: '13.5 Mrd. J.',
    label: 'Erste Sterne',
    color: '#C9A84C',
    molecules: ['H', 'He'],
    desc: 'In Sternen entstehen durch Kernfusion schwerere Elemente: C, O, N, Fe. Bei Supernovae werden sie ins All geschleudert.',
    icon: '⭐',
  },
  {
    time: '10 Mrd. J.',
    label: 'Molekülwolken',
    color: '#7AAD7A',
    molecules: ['CO', 'H₂O', 'NH₃', 'HCN'],
    desc: 'Interstellare Gaswolken entstehen. Auf Staubteilchen bilden sich erste organische Moleküle. UV-Strahlung liefert Energie.',
    icon: '☁️',
  },
  {
    time: '4.6 Mrd. J.',
    label: 'Sonnensystem',
    color: '#5B8FB9',
    molecules: ['Aminosäuren', 'Zucker', 'Nukleobasen'],
    desc: 'Sonne und Planeten entstehen aus einer Molekülwolke. Meteoriten und Kometen enthalten fertige organische Moleküle.',
    icon: '🌍',
  },
  {
    time: '4.0 Mrd. J.',
    label: 'Frühe Erde',
    color: '#8B6914',
    molecules: ['Aminosäuren', 'Zucker', 'RNA?'],
    desc: 'Heiße Ozeane, kein Sauerstoff, intensive UV-Strahlung. Miller-Urey-Chemie läuft ab. Meteoriten liefern zusätzliche Bausteine.',
    icon: '🌋',
  },
  {
    time: '3.8 Mrd. J.',
    label: 'Erstes Leben',
    color: '#4488BB',
    molecules: ['RNA', 'Vesikel', 'Zelle?'],
    desc: 'Erste selbstreplizierende RNA-Moleküle. Fettsäure-Vesikel als primitive Membranen. Irgendwo hier überschreitet Chemie die Grenze zum Leben.',
    icon: '🦠',
  },
  {
    time: 'Heute',
    label: 'Erythrulose-Fund',
    color: '#C9A84C',
    molecules: ['Erythrulose in G+0.693-0.027'],
    desc: '2026: Erstmals Zucker im interstellaren Medium nachgewiesen. Erythrulose entsteht auf Staubteilchen — 450 Lj. vom Milchstraßenzentrum.',
    icon: '🔭',
  },
];

export default function OriginOfLifeTimeline() {
  const [selected, setSelected] = useState(5);

  const s = STAGES[selected];

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>13,8 Milliarden Jahre — vom Urknall zum Leben</strong></div>

      {/* Timeline */}
      <div style={{ position: 'relative', marginBottom: 20, paddingTop: 8 }}>
        <div style={{ position: 'absolute', top: 24, left: 16, right: 16, height: 2, background: 'var(--border)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
          {STAGES.map((st, i) => (
            <button key={i} onClick={() => setSelected(i)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              background: 'none', border: 'none', cursor: 'pointer', flex: 1,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                border: '2px solid ' + (selected === i ? st.color : 'var(--border)'),
                background: selected === i ? st.color + '33' : 'var(--panel)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, transition: 'all .15s', zIndex: 1, position: 'relative',
              }}>{st.icon}</div>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 8, color: selected === i ? st.color : 'var(--muted)',
                textAlign: 'center', lineHeight: 1.2, letterSpacing: '.04em',
              }}>{st.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Detail */}
      <div style={{ padding: '16px 18px', background: 'var(--navy)', borderRadius: 8, border: '1px solid ' + s.color + '44' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
          <strong style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: s.color }}>{s.label}</strong>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,.4)' }}>{s.time}</span>
        </div>
        <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,.75)', lineHeight: 1.65, marginBottom: 12 }}>{s.desc}</p>
        {s.molecules.length > 0 && (
          <>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,.4)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 6 }}>Vorhanden:</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {s.molecules.map(m => (
                <span key={m} style={{
                  padding: '3px 10px', borderRadius: 12,
                  background: s.color + '22', border: '1px solid ' + s.color + '55',
                  fontFamily: 'var(--font-mono)', fontSize: 10, color: s.color,
                }}>{m}</span>
              ))}
            </div>
          </>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
        <button onClick={() => setSelected(Math.max(0, selected - 1))} disabled={selected === 0} style={{
          padding: '6px 14px', borderRadius: 6, border: '1px solid var(--border)',
          background: 'none', color: selected === 0 ? 'var(--muted)' : 'var(--ink)',
          fontFamily: 'var(--font-mono)', fontSize: 11, cursor: selected === 0 ? 'default' : 'pointer',
        }}>← Früher</button>
        <button onClick={() => setSelected(Math.min(STAGES.length - 1, selected + 1))} disabled={selected === STAGES.length - 1} style={{
          padding: '6px 14px', borderRadius: 6, border: '1px solid var(--border)',
          background: 'none', color: selected === STAGES.length - 1 ? 'var(--muted)' : 'var(--ink)',
          fontFamily: 'var(--font-mono)', fontSize: 11, cursor: selected === STAGES.length - 1 ? 'default' : 'pointer',
        }}>Später →</button>
      </div>
    </div>
  );
}
