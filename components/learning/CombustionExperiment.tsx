'use client';
/**
 * CombustionExperiment — EXP:VERBRENNUNG-CHEMIE / EXP:VERBRENNUNG-TEMP
 * Octane combustion: fuel/air ratio, products, temperature, efficiency
 */
import { useState } from 'react';
import styles from './RayleighExperiment.module.css';

export default function CombustionExperiment() {
  const [lambda, setLambda] = useState(1.0);  // air-fuel ratio (1 = stoich)
  const [fuel, setFuel] = useState<'benzin'|'diesel'|'wasserstoff'>('benzin');

  const fuels = {
    benzin:      { formula: 'C₈H₁₈', energy: 44.4, stoich: 14.7, co2: 3.09, name: 'Benzin (Oktan)' },
    diesel:      { formula: 'C₁₄H₃₀', energy: 43.1, stoich: 14.5, co2: 3.17, name: 'Diesel' },
    wasserstoff: { formula: 'H₂', energy: 120,  stoich: 34.3, co2: 0,    name: 'Wasserstoff' },
  };
  const f = fuels[fuel];

  // Rich = lambda < 1 (more fuel than air)
  // Lean = lambda > 1 (more air than fuel)
  const isRich = lambda < 0.95;
  const isLean = lambda > 1.05;
  const isStoich = !isRich && !isLean;

  // CO output: only when rich (incomplete combustion)
  const coPercent = isRich ? Math.round((1 - lambda) * 100 * 2) : 0;
  const co2Percent = isStoich ? 100 : isRich ? Math.round(lambda * 80) : Math.round(100 / lambda);
  const efficiencyBase = fuel === 'wasserstoff' ? 60 : 35;
  const efficiency = Math.round(efficiencyBase * (isStoich ? 1 : isLean ? 0.92 : 0.75));
  const temp = Math.round((isStoich ? 2000 : isRich ? 1700 : 1600) * (f.energy / 44));

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Verbrennung — Kraftstoff + Luft</strong></div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        {(Object.keys(fuels) as (keyof typeof fuels)[]).map(k => (
          <button key={k} onClick={() => setFuel(k)} style={{
            padding: '4px 10px', fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '.04em', textTransform: 'uppercase',
            border: '1.5px solid ' + (fuel === k ? 'var(--gold)' : 'var(--border)'),
            borderRadius: 4, background: fuel === k ? 'var(--gold-bg)' : 'var(--soft)',
            color: fuel === k ? 'var(--navy)' : 'var(--muted)', cursor: 'pointer',
          }}>{fuels[k].name.split(' ')[0]}</button>
        ))}
      </div>

      <label className={styles.sliderLabel} htmlFor="co-l">
        <span>Luftzahl λ</span>
        <strong style={{ color: isRich ? '#DC143C' : isLean ? '#5B8FB9' : 'var(--ok-t)' }}>
          {lambda.toFixed(2)} — {isRich ? 'fett (zu viel Kraftstoff)' : isLean ? 'mager (zu viel Luft)' : 'stöchiometrisch'}
        </strong>
      </label>
      <input id="co-l" type="range" min="0.7" max="1.5" step="0.01" value={lambda} onChange={e => setLambda(+e.target.value)} />

      <div style={{ marginTop: 14, padding: '12px 14px', background: 'var(--surface)', borderRadius: 6, border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
        <div style={{ marginBottom: 6, color: 'var(--muted)' }}>Reaktionsgleichung (vereinfacht):</div>
        <div style={{ color: 'var(--navy)', fontSize: 13 }}>
          {f.formula} + {(f.stoich * lambda).toFixed(1)} O₂/N₂
          {' → '}
          CO₂ + H₂O {isRich ? '+ CO ⚠' : ''} {isLean ? '+ O₂' : ''} + Wärme
        </div>
      </div>

      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>Flammentemp.</span><strong style={{ fontSize: 16, color: temp > 1900 ? '#DC143C' : 'var(--ok-t)' }}>{temp} °C</strong></div>
        <div><span>Wirkungsgrad</span><strong>{efficiency} %</strong></div>
        <div><span>CO-Anteil</span><strong style={{ color: coPercent > 0 ? '#DC143C' : 'var(--ok-t)' }}>{coPercent > 0 ? coPercent + '% ⚠' : 'kein CO ✓'}</strong></div>
        <div><span>CO₂ Abgas</span><strong>{fuel === 'wasserstoff' ? 'kein CO₂ ✓' : co2Percent + ' %'}</strong></div>
        <div><span>Heizwert</span><strong>{f.energy} MJ/kg</strong></div>
        <div><span>Kraftstoff</span><strong>{f.formula}</strong></div>
      </div>
    </div>
  );
}
