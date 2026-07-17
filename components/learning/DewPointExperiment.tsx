'use client';
/**
 * DewPointExperiment — EXP:TAUPUNKT
 * Indoor temp + humidity + window temp → dew point, condensation risk
 */
import { useState } from 'react';
import styles from './RayleighExperiment.module.css';

function dewPoint(T: number, rh: number): number {
  // Magnus formula approximation
  const a = 17.27, b = 237.7;
  const alpha = (a * T) / (b + T) + Math.log(rh / 100);
  return (b * alpha) / (a - alpha);
}

export default function DewPointExperiment() {
  const [Tin,  setTin]  = useState(21);
  const [rh,   setRh]   = useState(55);
  const [Twin, setTwin] = useState(8);

  const Td = dewPoint(Tin, rh);
  const condenses = Twin <= Td;
  const moldRisk = rh > 70 || (condenses && Twin < 14);

  const barW = (val: number, min: number, max: number) => Math.max(0, Math.min(100, (val - min) / (max - min) * 100));

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Taupunkt und Kondensation</strong></div>

      <label className={styles.sliderLabel} htmlFor="dp-tin"><span>Raumtemperatur</span><strong>{Tin}°C</strong></label>
      <input id="dp-tin" type="range" min="14" max="28" value={Tin} onChange={e => setTin(+e.target.value)} />

      <label className={styles.sliderLabel} htmlFor="dp-rh" style={{ marginTop: 8 }}><span>Relative Feuchte</span><strong>{rh}%</strong></label>
      <input id="dp-rh" type="range" min="20" max="90" value={rh} onChange={e => setRh(+e.target.value)} />

      <label className={styles.sliderLabel} htmlFor="dp-twin" style={{ marginTop: 8 }}><span>Scheibentemperatur</span><strong>{Twin}°C</strong></label>
      <input id="dp-twin" type="range" min="-5" max="20" value={Twin} onChange={e => setTwin(+e.target.value)} />

      {/* Window visualization */}
      <div style={{ position: 'relative', marginTop: 14, height: 100, background: condenses ? '#E8F4FF' : '#F9F8F5', borderRadius: 8, border: `2px solid ${condenses ? '#5B8FB9' : 'var(--border)'}`, overflow: 'hidden' }}>
        {/* Condensation droplets */}
        {condenses && Array.from({ length: 18 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${10 + (i % 6) * 15}%`,
            top: `${15 + Math.floor(i / 6) * 30}%`,
            width: 6 + (i % 3) * 3,
            height: 8 + (i % 3) * 3,
            borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
            background: 'rgba(91,143,185,0.5)',
          }} />
        ))}
        <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--font-mono)', fontSize: 11, color: condenses ? '#1C4A7A' : '#8A8880', textAlign: 'center', whiteSpace: 'nowrap' }}>
          {condenses ? '💧 Kondensation sichtbar' : '✓ Scheibe trocken'}
        </div>
      </div>

      {/* Status bar */}
      <div style={{ marginTop: 10, padding: '12px 14px', background: condenses ? '#EEF0F8' : moldRisk ? '#FFF8E7' : 'var(--surface)', borderRadius: 6, border: `1px solid ${condenses ? '#5B8FB9' : moldRisk ? '#DFC87A' : 'var(--border)'}` }}>
        <strong style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: condenses ? '#1C4A7A' : moldRisk ? '#8B6000' : 'var(--ok-t)' }}>
          {condenses ? '⚠ Kondensation — Scheibentemperatur unter Taupunkt' : moldRisk ? '⚠ Hohe Raumfeuchte — Schimmelrisiko' : '✓ Kein Beschlag — Scheibe über Taupunkt'}
        </strong>
        <p style={{ marginTop: 4, fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
          {condenses ? `Warme Innenluft (${rh}% Feuchte) trifft auf kalte Scheibe (${Twin}°C). Der Taupunkt liegt bei ${Td.toFixed(1)}°C — Wasser kondensiert.` :
           moldRisk ? 'Feuchte über 70%: Schimmel kann auf kalten Oberflächen wachsen. Mehr lüften.' :
           `Taupunkt: ${Td.toFixed(1)}°C. Scheibe bei ${Twin}°C — noch ${(Twin - Td).toFixed(1)}°C Sicherheitsmarge.`}
        </p>
      </div>

      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>Taupunkt</span><strong style={{ color: condenses ? '#DC143C' : 'var(--ok-t)', fontSize: 16 }}>{Td.toFixed(1)}°C</strong></div>
        <div><span>Sicherheitsmarge</span><strong style={{ color: condenses ? '#DC143C' : 'var(--ok-t)' }}>{condenses ? '— (Beschlag!)' : `+${(Twin - Td).toFixed(1)} K`}</strong></div>
        <div><span>Schimmelrisiko</span><strong style={{ color: moldRisk ? '#DC143C' : 'var(--ok-t)' }}>{moldRisk ? 'erhöht ⚠' : 'gering ✓'}</strong></div>
        <div><span>Empfehlung</span><strong style={{ fontSize: 11 }}>{condenses ? 'Lüften, Heizen, Innendämmung' : rh > 65 ? 'Mehr lüften' : 'Alles gut'}</strong></div>
      </div>
    </div>
  );
}
