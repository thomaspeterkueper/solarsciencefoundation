'use client';
/**
 * ZuckerartenExperiment — EXP:ZUCKERARTEN
 * Compare caramelization temperatures of different sugar types
 */
import { useState } from 'react';
import styles from './RayleighExperiment.module.css';

const SUGARS = [
  { id: 'frucht', label: 'Fruchtzucker', temp: 110, color: '#FFD700', source: 'Honig, Obst', molecule: 'Fructose (C₆H₁₂O₆)', note: 'Einfachster Zucker — zersetzt sich am leichtesten. Deshalb karamellisiert Honig schnell.' },
  { id: 'traube', label: 'Traubenzucker', temp: 150, color: '#DAA520', source: 'Trauben, Mais-Sirup', molecule: 'Glucose (C₆H₁₂O₆)', note: 'Selbe Formel wie Fruchtzucker, andere Struktur — braucht mehr Energie.' },
  { id: 'haus',   label: 'Haushaltszucker', temp: 160, color: '#C9A84C', source: 'Zuckerrübe, Zuckerrohr', molecule: 'Saccharose (C₁₂H₂₂O₁₁)', note: 'Doppelmolekül aus Frucht- + Traubenzucker. Muss erst gespalten werden — höhere Schwelle.' },
  { id: 'malz',   label: 'Malzzucker', temp: 180, color: '#8B6914', source: 'Malz, Bier', molecule: 'Maltose (C₁₂H₂₂O₁₁)', note: 'Zwei Traubenzucker-Einheiten — stabile Bindung, höchste Karamellisierungstemperatur.' },
] as const;
type SugarId = (typeof SUGARS)[number]['id'];

export default function ZuckerartenExperiment() {
  const [selected, setSelected] = useState<SugarId>('haus');
  const [T, setT] = useState(160);
  const sugar = SUGARS.find(s => s.id === selected)!;
  const isCaramelizing = T >= sugar.temp;
  const progress = Math.max(0, Math.min(100, (T - sugar.temp) / 30 * 100));

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Zuckerarten und ihre Temperaturschwellen</strong></div>

      {/* Sugar selector */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 12 }}>
        {SUGARS.map(s => (
          <button key={s.id} onClick={() => { setSelected(s.id); setT(s.temp - 20); }} style={{
            padding: '8px 10px', fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '.04em', textTransform: 'uppercase', textAlign: 'left',
            border: `1.5px solid ${selected === s.id ? s.color : 'var(--border)'}`,
            borderRadius: 6, background: selected === s.id ? s.color + '22' : 'var(--soft)',
            color: selected === s.id ? 'var(--navy)' : 'var(--muted)', cursor: 'pointer',
          }}>
            <div style={{ fontWeight: 600 }}>{s.label}</div>
            <div style={{ marginTop: 2, color: selected === s.id ? s.color : 'var(--muted)' }}>{s.temp}°C</div>
          </button>
        ))}
      </div>

      {/* Temperature slider */}
      <label className={styles.sliderLabel} htmlFor="za-t"><span>Temperatur</span><strong>{T}°C</strong></label>
      <input id="za-t" type="range" min="80" max="210" value={T} onChange={e => setT(+e.target.value)} />

      {/* Visual comparison bar */}
      <div style={{ marginTop: 14, background: 'var(--navy)', borderRadius: 8, padding: '14px 16px' }}>
        {SUGARS.map(s => {
          const active = T >= s.temp;
          const w = Math.max(0, Math.min(100, (T - s.temp) / 30 * 100));
          return (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,.55)', width: 110, flexShrink: 0 }}>{s.label}</span>
              <div style={{ width: 32, textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,.4)', flexShrink: 0 }}>{s.temp}°</div>
              <div style={{ flex: 1, height: 10, background: 'rgba(255,255,255,.08)', borderRadius: 5, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${w}%`, background: s.color, borderRadius: 5, transition: 'width .25s' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: active ? s.color : 'rgba(255,255,255,.3)', width: 60, textAlign: 'right' }}>
                {active ? '✓ aktiv' : `−${s.temp - T}°`}
              </span>
            </div>
          );
        })}
      </div>

      {/* Selected sugar info */}
      <div style={{ marginTop: 10, padding: '12px 14px', background: isCaramelizing ? '#EEF3EE' : 'var(--surface)', borderRadius: 6, border: `1px solid ${isCaramelizing ? '#7AAD7A' : 'var(--border)'}` }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: isCaramelizing ? 'var(--ok-t)' : 'var(--muted)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 4 }}>
          {sugar.molecule} — {isCaramelizing ? 'karamellisiert ✓' : `noch ${sugar.temp - T}°C bis Karamellisierung`}
        </div>
        <div style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.6 }}>{sugar.note}</div>
        <div style={{ marginTop: 6, fontSize: 12, color: 'var(--muted)' }}>Quelle: {sugar.source}</div>
      </div>
    </div>
  );
}
