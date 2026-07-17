'use client';
/**
 * EvaporationExperiment — EXP:VERDUNSTUNG-RATE
 * Wind, temperature, humidity → evaporation rate, laundry drying time
 */
import { useState } from 'react';
import styles from './RayleighExperiment.module.css';

export default function EvaporationExperiment() {
  const [Tair,  setTair]  = useState(20);
  const [wind,  setWind]  = useState(2);
  const [rh,    setRh]    = useState(60);
  const [mass,  setMass]  = useState(1.5); // kg wet laundry

  // Simplified evaporation model
  const satPressure = 0.611 * Math.exp(17.27 * Tair / (Tair + 237.3)); // kPa
  const actualPressure = satPressure * (rh / 100);
  const vpdKPa = satPressure - actualPressure; // vapor pressure deficit
  const rate_g_m2_h = Math.max(0, vpdKPa * (12 + wind * 8) * (1 + Tair / 50));
  const surfaceArea = 2.0; // m² typical laundry
  const rate_g_h = rate_g_m2_h * surfaceArea;
  const waterInClothes = mass * 0.6 * 1000; // g
  const dryingHours = waterInClothes / rate_g_h;

  const rateLabel = rate_g_h < 50 ? 'sehr langsam' : rate_g_h < 150 ? 'langsam' : rate_g_h < 350 ? 'mittel' : rate_g_h < 600 ? 'schnell' : 'sehr schnell';
  const barW = Math.min(100, rate_g_h / 8);

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Verdunstungsrate — Wäsche trocknen</strong></div>

      <label className={styles.sliderLabel} htmlFor="ev-t"><span>Lufttemperatur</span><strong>{Tair}°C</strong></label>
      <input id="ev-t" type="range" min="0" max="40" value={Tair} onChange={e => setTair(+e.target.value)} />

      <label className={styles.sliderLabel} htmlFor="ev-w" style={{ marginTop: 8 }}><span>Wind</span><strong>{wind} m/s</strong></label>
      <input id="ev-w" type="range" min="0" max="10" step="0.5" value={wind} onChange={e => setWind(+e.target.value)} />

      <label className={styles.sliderLabel} htmlFor="ev-rh" style={{ marginTop: 8 }}><span>Relative Feuchte</span><strong>{rh}%</strong></label>
      <input id="ev-rh" type="range" min="10" max="95" value={rh} onChange={e => setRh(+e.target.value)} />

      <label className={styles.sliderLabel} htmlFor="ev-m" style={{ marginTop: 8 }}><span>Wäschemenge</span><strong>{mass} kg</strong></label>
      <input id="ev-m" type="range" min="0.5" max="5" step="0.5" value={mass} onChange={e => setMass(+e.target.value)} />

      {/* Rate bar */}
      <div style={{ marginTop: 14, background: 'var(--navy)', borderRadius: 8, padding: '14px 16px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#E8D9A8', marginBottom: 8 }}>
          Verdunstungsrate
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, height: 12, background: 'rgba(255,255,255,.1)', borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${barW}%`, background: barW > 70 ? '#7AAD7A' : barW > 30 ? '#C9A84C' : '#5B8FB9', borderRadius: 6, transition: 'width .3s' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#fff', minWidth: 80, textAlign: 'right' }}>
            {rate_g_h.toFixed(0)} g/h
          </span>
        </div>
        <div style={{ marginTop: 6, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,.5)' }}>{rateLabel}</div>
      </div>

      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>Dampfdruckdefizit</span><strong>{vpdKPa.toFixed(2)} kPa</strong></div>
        <div><span>Rate</span><strong>{rate_g_h.toFixed(0)} g/h</strong></div>
        <div style={{ gridColumn: 'span 2' }}>
          <span>Trockenzeit {mass} kg Wäsche</span>
          <strong style={{ color: dryingHours < 3 ? 'var(--ok-t)' : dryingHours > 10 ? '#DC143C' : 'var(--navy)' }}>
            {dryingHours > 48 ? '>48 h (kaum möglich)' : `~${dryingHours.toFixed(1)} h`}
          </strong>
        </div>
      </div>
      <p style={{ marginTop: 8, fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
        {rh > 85 ? '⚠ Sehr hohe Luftfeuchtigkeit — Wäsche trocknet kaum.' :
         wind === 0 && rh > 70 ? 'Tipp: Schon leichter Wind verdoppelt die Trockenrate.' :
         Tair < 5 ? 'Im Winter bei Frost: Sublimation möglich — Wäsche kann trotzdem trocknen.' :
         'Optimum: warm, trocken, windig.'}
      </p>
    </div>
  );
}
