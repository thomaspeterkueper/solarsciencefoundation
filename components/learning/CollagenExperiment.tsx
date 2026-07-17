'use client';
/**
 * CollagenExperiment — EXP:KOLLAGEN-TEMP / EXP:GELATINE-BILDUNG
 * Collagen → gelatin conversion: temperature, time, tenderness
 */
import { useState } from 'react';
import styles from './RayleighExperiment.module.css';

export default function CollagenExperiment() {
  const [T, setT] = useState(80);
  const [hours, setHours] = useState(2);

  // Collagen conversion rate (simplified Arrhenius)
  const rateAt = (temp: number) => temp < 60 ? 0 : temp < 70 ? 0.02 : temp < 80 ? 0.08 : temp < 90 ? 0.25 : temp < 100 ? 0.6 : 1.0;
  const rate = rateAt(T);
  const conversion = Math.min(1, rate * hours / 3);
  const tenderness = Math.round(conversion * 100);

  // Texture description
  const texture = tenderness < 15 ? 'zäh — Kollagen noch intakt' :
    tenderness < 40 ? 'leicht weicher — Hydrolyse beginnt' :
    tenderness < 70 ? 'merklich zarter — Gelatine entsteht' :
    tenderness < 90 ? 'sehr zart — Fleisch fällt auseinander' :
    'perfekt geschmort — Gelatine löst sich im Mund';

  const barW = tenderness;
  const barColor = tenderness < 30 ? '#DC143C' : tenderness < 60 ? '#C9A84C' : '#7AAD7A';

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Kollagen → Gelatine — Warum Gulasch zart wird</strong></div>

      <label className={styles.sliderLabel} htmlFor="co-t"><span>Temperatur</span><strong style={{ color: T < 70 ? '#DC143C' : T < 85 ? '#C9A84C' : 'var(--ok-t)' }}>{T}°C</strong></label>
      <input id="co-t" type="range" min="50" max="100" value={T} onChange={e => setT(+e.target.value)} />

      <label className={styles.sliderLabel} htmlFor="co-h" style={{ marginTop: 8 }}><span>Kochzeit</span><strong>{hours} h</strong></label>
      <input id="co-h" type="range" min="0.5" max="8" step="0.5" value={hours} onChange={e => setHours(+e.target.value)} />

      {/* Tenderness bar */}
      <div style={{ marginTop: 14, background: 'var(--navy)', borderRadius: 8, padding: '14px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,.55)' }}>Zartheit</span>
          <strong style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: barColor }}>{tenderness}%</strong>
        </div>
        <div style={{ height: 12, background: 'rgba(255,255,255,.08)', borderRadius: 6, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: barW + '%', background: barColor, borderRadius: 6, transition: 'width .4s' }} />
        </div>
        <div style={{ marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,.55)' }}>{texture}</div>
      </div>

      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>Umwandlungsrate</span><strong>{(rate * 100).toFixed(0)} %/h</strong></div>
        <div><span>Kollagen → Gelatine</span><strong style={{ color: barColor }}>{(conversion * 100).toFixed(0)} %</strong></div>
        <div style={{ gridColumn: 'span 2' }}>
          <span>Optimum</span>
          <strong style={{ fontSize: 12 }}>80–90°C, 3–5 h — Sous-vide oder Schmoren im Ofen</strong>
        </div>
      </div>
      <p style={{ marginTop: 8, fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
        {T > 95 ? '⚠ Über 95°C: Fleisch wird trocken — Muskelproteine ziehen sich zusammen.' :
         T < 65 ? 'Unter 65°C: Kollagen wandelt sich kaum um — Fleisch bleibt zäh.' :
         'Kollagen braucht Zeit und Temperatur — nicht Hitze allein.'}
      </p>
    </div>
  );
}
