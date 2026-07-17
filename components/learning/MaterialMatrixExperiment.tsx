'use client';
/**
 * MaterialMatrixExperiment — EXP:MATERIAL-MATRIX
 * Which materials respond to magnets and why — electron structure
 */
import { useState } from 'react';
import styles from './RayleighExperiment.module.css';

const MATERIALS = [
  { id: 'eisen',    label: 'Eisen',      force: 95,  type: 'ferromagnetisch', color: '#C9A84C', reason: 'Elektronen richten ihre Spins gleichgerichtet aus — starkes Netto-Magnetfeld entsteht.' },
  { id: 'nickel',   label: 'Nickel',     force: 60,  type: 'ferromagnetisch', color: '#C9A84C', reason: 'Wie Eisen, aber schwächere Spin-Ausrichtung — mittlere Anziehung.' },
  { id: 'kobalt',   label: 'Kobalt',     force: 75,  type: 'ferromagnetisch', color: '#C9A84C', reason: 'Ferromagnetisch wie Eisen, höchste Curie-Temperatur aller Metalle.' },
  { id: 'kupfer',   label: 'Kupfer',     force: 0,   type: 'diamagnetisch',   color: '#5B8FB9', reason: 'Alle Elektronenspins sind paarweise entgegengesetzt — heben sich auf. Kein Netto-Feld.' },
  { id: 'alu',      label: 'Aluminium',  force: 1,   type: 'paramagnetisch',  color: '#7AAD7A', reason: 'Sehr schwach paramagnetisch — reagiert kaum messbar.' },
  { id: 'holz',     label: 'Holz',       force: 0,   type: 'diamagnetisch',   color: '#5B8FB9', reason: 'Organisches Material, keine freien Elektronen — kein Magnetismus.' },
  { id: 'wasser',   label: 'Wasser',     force: 0,   type: 'diamagnetisch',   color: '#5B8FB9', reason: 'Leicht diamagnetisch — wird sogar minimal abgestoßen (Levitation möglich bei starken Magneten).' },
  { id: 'neodym',   label: 'Neodym-Magnet', force: 100, type: 'ferromagnetisch', color: '#DC143C', reason: 'Stärkster bekannter Permanentmagnet — extrem dichte Spin-Ausrichtung in Nd₂Fe₁₄B.' },
] as const;
type MatId = (typeof MATERIALS)[number]['id'];

export default function MaterialMatrixExperiment() {
  const [selected, setSelected] = useState<MatId>('eisen');
  const [magnetStrength, setMagnetStrength] = useState(50);

  const mat = MATERIALS.find(m => m.id === selected)!;
  const actualForce = Math.round(mat.force * magnetStrength / 100);

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Welche Stoffe reagieren auf Magnete?</strong></div>

      {/* Material selector */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 6, marginBottom: 14 }}>
        {MATERIALS.map(m => (
          <button key={m.id} onClick={() => setSelected(m.id)} style={{
            padding: '6px 8px', fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '.04em', textAlign: 'center',
            border: '1.5px solid ' + (selected === m.id ? m.color : 'var(--border)'),
            borderRadius: 6, background: selected === m.id ? m.color + '22' : 'var(--soft)',
            color: selected === m.id ? 'var(--navy)' : 'var(--muted)', cursor: 'pointer',
          }}>{m.label}</button>
        ))}
      </div>

      <label className={styles.sliderLabel} htmlFor="mm-s">
        <span>Magnetstärke</span><strong>{magnetStrength}%</strong>
      </label>
      <input id="mm-s" type="range" min="0" max="100" value={magnetStrength}
        onChange={e => setMagnetStrength(+e.target.value)} />

      {/* Force visualization */}
      <div style={{ marginTop: 14, background: 'var(--navy)', borderRadius: 8, padding: '14px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,.55)' }}>Anziehungskraft</span>
          <strong style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: mat.color }}>
            {actualForce > 0 ? actualForce + '%' : 'keine'}
          </strong>
        </div>
        <div style={{ height: 14, background: 'rgba(255,255,255,.1)', borderRadius: 7, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: actualForce + '%', borderRadius: 7,
            background: actualForce > 50 ? '#C9A84C' : actualForce > 0 ? '#7AAD7A' : '#444',
            transition: 'width .4s',
          }} />
        </div>
        <div style={{ marginTop: 10, fontFamily: 'var(--font-mono)', fontSize: 10, color: '#E8D9A8', letterSpacing: '.06em', textTransform: 'uppercase' }}>
          {mat.type}
        </div>
      </div>

      <div style={{ marginTop: 10, padding: '12px 14px', background: 'var(--surface)', borderRadius: 6, border: '1px solid var(--border)', fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.6 }}>
        {mat.reason}
      </div>
    </div>
  );
}
