'use client';
/**
 * PiezoMaterialExperiment — EXP:HAERTE
 * Compare piezoelectric materials: voltage output vs. environmental score
 */
import { useState } from 'react';
import styles from './RayleighExperiment.module.css';

const MATERIALS = [
  { id: 'quarz',   label: 'Quarz (SiO₂)',       voltage: 18,  eco: 95, toxic: false, color: '#5B8FB9', desc: 'Natürlich vorkommend, erste Entdeckung 1880 (Curie). Schwaches Signal aber sehr stabil. Wird in Uhren und GPS genutzt.' },
  { id: 'pzt',     label: 'PZT (Blei)',           voltage: 90,  eco: 15, toxic: true,  color: '#DC143C', desc: 'Leistungsstärkstes Material. Enthält 60% Blei — hochgiftig, in EU zunehmend verboten. Standard in Ultraschall und Aktoren.' },
  { id: 'pvdf',    label: 'PVDF-Polymer',         voltage: 30,  eco: 70, toxic: false, color: '#7AAD7A', desc: 'Flexibles Kunststoff-Polymer. Ideal für Wearables und gebogene Flächen. Schwächeres Signal als PZT.' },
  { id: 'rpi',     label: 'Chalkogenid-Perowskit (RPI 2024)', voltage: 75, eco: 88, toxic: false, color: '#C9A84C', desc: 'Neues Material vom RPI: bleifrei, 0.3mm dünn, aus weit verbreiteten Elementen. Fast so stark wie PZT — ohne das Blei-Problem.' },
  { id: 'bn',      label: 'Bornitrid (BN)',        voltage: 12,  eco: 90, toxic: false, color: '#888',    desc: 'Sehr dünn auftragbar, hitzebeständig. Interessant für Hochtemperatur-Anwendungen. Signal noch schwach.' },
] as const;
type MatId = (typeof MATERIALS)[number]['id'];

export default function PiezoMaterialExperiment() {
  const [selected, setSelected] = useState<MatId>('rpi');
  const [force, setForce] = useState(50);

  const mat = MATERIALS.find(m => m.id === selected)!;
  const actualVoltage = Math.round(mat.voltage * force / 100);
  const power_mW = Math.round(actualVoltage * actualVoltage / 10000 * 100) / 100;

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Piezo-Materialien im Vergleich</strong></div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 6, marginBottom: 12 }}>
        {MATERIALS.map(m => (
          <button key={m.id} onClick={() => setSelected(m.id)} style={{
            padding: '8px 12px', fontFamily: 'var(--font-mono)', fontSize: 10,
            textAlign: 'left', letterSpacing: '.03em',
            border: '1.5px solid ' + (selected === m.id ? m.color : 'var(--border)'),
            borderRadius: 6, background: selected === m.id ? m.color + '18' : 'var(--soft)',
            color: selected === m.id ? 'var(--navy)' : 'var(--muted)', cursor: 'pointer',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span>{m.label}</span>
            {m.toxic && <span style={{ color: '#DC143C', fontSize: 9 }}>⚠ giftig</span>}
          </button>
        ))}
      </div>

      <label className={styles.sliderLabel} htmlFor="pm-f"><span>Druckkraft</span><strong>{force} N</strong></label>
      <input id="pm-f" type="range" min="0" max="100" value={force} onChange={e => setForce(+e.target.value)} />

      {/* 2D comparison chart */}
      <div style={{ position: 'relative', marginTop: 14, height: 160, background: 'var(--navy)', borderRadius: 8, padding: 12 }}>
        <div style={{ position: 'absolute', bottom: 24, left: 16, right: 16, height: 1, background: 'rgba(255,255,255,.15)' }} />
        <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 8, color: 'rgba(255,255,255,.3)' }}>
            <span>giftig</span><span>↔ Umweltfreundlichkeit</span><span>sauber</span>
          </div>
        </div>
        <div style={{ position: 'absolute', top: 8, left: 8, fontFamily: 'var(--font-mono)', fontSize: 8, color: 'rgba(255,255,255,.3)', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Spannung ↑</div>
        {MATERIALS.map(m => {
          const x = 16 + (m.eco / 100) * (280 - 32);
          const y = 8 + (1 - m.voltage / 100) * (120 - 16);
          const isSelected = m.id === selected;
          return (
            <div key={m.id} onClick={() => setSelected(m.id)} style={{
              position: 'absolute', left: x, top: y,
              width: isSelected ? 18 : 12, height: isSelected ? 18 : 12,
              borderRadius: '50%', background: m.color,
              border: isSelected ? '2px solid #fff' : 'none',
              cursor: 'pointer', transform: 'translate(-50%, -50%)',
              boxShadow: isSelected ? '0 0 12px ' + m.color : 'none',
              transition: 'all .15s',
              zIndex: isSelected ? 2 : 1,
            }} title={m.label} />
          );
        })}
        {/* Ideal zone label */}
        <div style={{ position: 'absolute', right: 20, top: 12, fontFamily: 'var(--font-mono)', fontSize: 8, color: '#C9A84C', border: '1px dashed #C9A84C44', padding: '2px 6px', borderRadius: 4 }}>Ideal-Zone</div>
      </div>

      <div style={{ marginTop: 10, padding: '10px 14px', background: 'var(--surface)', borderRadius: 6, border: '1px solid var(--border)', fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
        {mat.desc}
      </div>

      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>Spannung</span><strong style={{ fontSize: 16, color: mat.color }}>{actualVoltage} V</strong></div>
        <div><span>Leistung</span><strong>{power_mW} mW</strong></div>
        <div><span>Umwelt-Score</span><strong style={{ color: mat.eco > 70 ? 'var(--ok-t)' : '#DC143C' }}>{mat.eco}/100</strong></div>
        <div><span>Blei</span><strong style={{ color: mat.toxic ? '#DC143C' : 'var(--ok-t)' }}>{mat.toxic ? '⚠ enthält Blei' : '✓ bleifrei'}</strong></div>
      </div>
    </div>
  );
}
