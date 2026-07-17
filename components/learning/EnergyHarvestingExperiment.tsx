'use client';
/**
 * EnergyHarvestingExperiment — EXP:WIRKUNGSGRAD
 * Steps → energy → what can it power? Realistic power calculator
 */
import { useState } from 'react';
import styles from './RayleighExperiment.module.css';

const CONSUMERS = [
  { id: 'led',      label: 'LED (Fahrradhelm)',    power_mW: 0.1,  icon: '💡', desc: 'Sicherheitsbeleuchtung — realistisch!' },
  { id: 'temp',     label: 'Temperatursensor',     power_mW: 0.5,  icon: '🌡', desc: 'IoT-Sensor — sehr realistisch.' },
  { id: 'bt',       label: 'Bluetooth Beacon',     power_mW: 5,    icon: '📡', desc: 'Kurze Datenpakete — machbar.' },
  { id: 'gps',      label: 'GPS-Tracker',          power_mW: 50,   icon: '📍', desc: 'Grenzbereich — braucht Kondensator.' },
  { id: 'phone',    label: 'Smartphone laden',     power_mW: 5000, icon: '📱', desc: 'Nicht realistisch — 1000× zu viel.' },
  { id: 'lamp',     label: 'Straßenlaterne',       power_mW: 60000,icon: '🏮', desc: 'Völlig unrealistisch ohne riesige Fläche.' },
] as const;
type ConsumerId = (typeof CONSUMERS)[number]['id'];

export default function EnergyHarvestingExperiment() {
  const [steps, setSteps]   = useState(100);   // steps/min
  const [area, setArea]     = useState(25);    // cm²
  const [consumer, setConsumer] = useState<ConsumerId>('led');

  // Realistic: ~1-3 mW per step per cm² for good piezo material
  const power_per_step_mW = 0.015; // mW per step/min per cm²
  const generated_mW = steps * area * power_per_step_mW;
  const con = CONSUMERS.find(c => c.id === consumer)!;
  const ratio = generated_mW / con.power_mW;
  const feasible = ratio >= 0.8;
  const steps_needed = Math.ceil(con.power_mW / (area * power_per_step_mW));

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Energy Harvesting — Schritte als Stromquelle</strong></div>

      <label className={styles.sliderLabel} htmlFor="eh-s"><span>Schrittfrequenz</span><strong>{steps} Schritte/min</strong></label>
      <input id="eh-s" type="range" min="10" max="200" value={steps} onChange={e => setSteps(+e.target.value)} />

      <label className={styles.sliderLabel} htmlFor="eh-a" style={{ marginTop: 8 }}><span>Piezo-Fläche</span><strong>{area} cm²</strong></label>
      <input id="eh-a" type="range" min="1" max="200" step="1" value={area} onChange={e => setArea(+e.target.value)} />

      {/* Consumer selector */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 12 }}>
        {CONSUMERS.map(c => (
          <button key={c.id} onClick={() => setConsumer(c.id)} style={{
            padding: '6px 10px', fontFamily: 'var(--font-mono)', fontSize: 10,
            textAlign: 'left',
            border: '1.5px solid ' + (consumer === c.id ? 'var(--gold)' : 'var(--border)'),
            borderRadius: 6, background: consumer === c.id ? 'var(--gold-bg)' : 'var(--soft)',
            color: consumer === c.id ? 'var(--navy)' : 'var(--muted)', cursor: 'pointer',
          }}>
            <span>{c.icon} {c.label}</span><br/>
            <span style={{ fontSize: 9, opacity: .7 }}>{c.power_mW >= 1000 ? (c.power_mW/1000).toFixed(0) + ' W' : c.power_mW + ' mW'}</span>
          </button>
        ))}
      </div>

      {/* Result */}
      <div style={{ marginTop: 14, background: feasible ? '#0A1F0A' : '#1F0A0A', borderRadius: 8, padding: '14px 16px', border: '1px solid ' + (feasible ? '#7AAD7A44' : '#DC143C44') }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,.5)' }}>Erzeugte Leistung</span>
          <strong style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: feasible ? '#7AAD7A' : '#DC143C' }}>
            {generated_mW >= 1000 ? (generated_mW/1000).toFixed(1) + ' W' : generated_mW.toFixed(1) + ' mW'}
          </strong>
        </div>
        <div style={{ height: 10, background: 'rgba(255,255,255,.1)', borderRadius: 5, overflow: 'hidden', marginBottom: 10 }}>
          <div style={{
            height: '100%', width: Math.min(100, ratio * 100) + '%',
            background: feasible ? '#7AAD7A' : '#DC143C', borderRadius: 5, transition: 'width .4s',
          }} />
        </div>
        <strong style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: feasible ? '#7AAD7A' : '#DC143C' }}>
          {feasible
            ? '✓ ' + con.icon + ' ' + con.label + ' wird versorgt!'
            : '✗ ' + (ratio * 100).toFixed(1) + '% — ' + steps_needed.toLocaleString('de') + ' Schritte/min nötig'}
        </strong>
        <p style={{ marginTop: 6, fontSize: 12, color: 'rgba(255,255,255,.55)' }}>{con.desc}</p>
      </div>

      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>Erzeugt</span><strong>{generated_mW.toFixed(2)} mW</strong></div>
        <div><span>Benötigt</span><strong>{con.power_mW >= 1000 ? (con.power_mW/1000) + ' W' : con.power_mW + ' mW'}</strong></div>
        <div style={{ gridColumn: 'span 2' }}>
          <span>Fazit</span>
          <strong style={{ fontSize: 12 }}>Piezo-Harvesting: ideal für Kleinsensoren, LEDs, Beacons — nicht für Smartphones oder Laternen.</strong>
        </div>
      </div>
    </div>
  );
}
