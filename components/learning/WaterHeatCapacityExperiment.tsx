'use client';
/**
 * WaterHeatCapacityExperiment — EXP:WAERMEKAPAZITAET
 * Compare specific heat capacity of water, sand, iron, air
 * Q = m·c·ΔT — same energy, different temperature rise
 */
import { useState } from 'react';
import styles from './RayleighExperiment.module.css';

const MATERIALS = [
  { id: 'wasser', label: 'Wasser', c: 4186, color: '#4488BB', note: 'Ozean, Körper, Kühlmittel' },
  { id: 'sand',   label: 'Sand',   c: 830,  color: '#DAA520', note: 'Strand, Wüste' },
  { id: 'eisen',  label: 'Eisen',  c: 449,  color: '#888',    note: 'Topf, Schienen' },
  { id: 'luft',   label: 'Luft',   c: 1005, color: '#B0D4F1', note: 'Atmosphäre' },
] as const;

export default function WaterHeatCapacityExperiment() {
  const [Q, setQ]  = useState(10000); // Joule
  const [m, setM]  = useState(1);     // kg

  const maxDT = MATERIALS.reduce((max, mat) => Math.max(max, Q / (mat.c * m)), 0);

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Spezifische Wärmekapazität im Vergleich</strong></div>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginBottom: 10 }}>Q = m · c · ΔT — gleiche Energie Q, verschiedene Materialien</p>

      <label className={styles.sliderLabel} htmlFor="hc-q"><span>Energie Q</span><strong>{(Q / 1000).toFixed(1)} kJ</strong></label>
      <input id="hc-q" type="range" min="1000" max="100000" step="1000" value={Q} onChange={e => setQ(+e.target.value)} />

      <label className={styles.sliderLabel} htmlFor="hc-m" style={{ marginTop: 8 }}><span>Masse m</span><strong>{m} kg</strong></label>
      <input id="hc-m" type="range" min="0.1" max="5" step="0.1" value={m} onChange={e => setM(+e.target.value)} />

      {/* Comparison bars */}
      <div style={{ background: 'var(--navy)', borderRadius: 8, padding: '14px 16px', marginTop: 14 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#E8D9A8', marginBottom: 10 }}>
          Temperaturanstieg ΔT = Q / (m · c)
        </div>
        {MATERIALS.map(mat => {
          const dT = Q / (mat.c * m);
          const w = Math.min(100, (dT / maxDT) * 100);
          return (
            <div key={mat.id} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,.6)' }}>{mat.label}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: mat.color }}>
                  +{dT.toFixed(1)} K &nbsp; c = {mat.c} J/(kg·K)
                </span>
              </div>
              <div style={{ height: 10, background: 'rgba(255,255,255,.08)', borderRadius: 5, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${w}%`, background: mat.color, borderRadius: 5, transition: 'width .3s' }} />
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 10, padding: '10px 12px', background: 'var(--surface)', borderRadius: 6, border: '1px solid var(--border)', fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
        Bei gleicher Energiezufuhr erwärmt sich Eisen <strong>{(Q / (449 * m) / (Q / (4186 * m))).toFixed(1)}×</strong> stärker als Wasser.
        Deshalb verbrennt man sich eher an einem heißen Topf als an heißem Wasser mit gleicher Temperatur —
        der Topf gibt seine Wärme schneller ab.
      </div>
    </div>
  );
}
