'use client';
/**
 * EarlyEarthExperiment — EXP:KLIMA-EFFEKT
 * Early Earth atmosphere configurator: life-friendliness meter
 */
import { useState } from 'react';
import styles from './RayleighExperiment.module.css';

export default function EarlyEarthExperiment() {
  const [co2, setCo2]   = useState(95);  // % atmosphere
  const [temp, setTemp] = useState(80);  // °C ocean
  const [uv, setUv]     = useState(80);  // % UV (no ozone)
  const [meteor, setMeteor] = useState(50); // meteorite rate

  // Life-friendliness score (higher = more prebiotic chemistry possible)
  // Too hot or too cold is bad, UV drives reactions but too much destroys, meteors deliver molecules
  const tempScore = temp < 20 ? 20 : temp > 200 ? 5 : temp > 80 ? 60 : 85;
  const uvScore   = uv < 10 ? 30 : uv > 90 ? 40 : 75; // moderate UV is good
  const co2Score  = co2 > 50 ? 70 : 90; // CO2 helps warm early Earth
  const meteorScore = Math.min(100, meteor * 1.2);
  const total = Math.round((tempScore + uvScore + co2Score + meteorScore) / 4);

  const era = temp > 150 ? 'Hadaikum (4.5-4 Mrd. J.)' :
    meteor > 70 ? 'Late Heavy Bombardment (~3.9 Mrd. J.)' :
    uv > 60 ? 'Frühes Archaikum (4-3.5 Mrd. J.)' :
    'Spätes Archaikum (3.5-2.5 Mrd. J.) — erstes Leben';

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Frühe Erde konfigurieren</strong></div>

      <label className={styles.sliderLabel} htmlFor="ee-co2"><span>CO₂-Anteil Atmosphäre</span><strong>{co2}%</strong></label>
      <input id="ee-co2" type="range" min="0" max="98" value={co2} onChange={e => setCo2(+e.target.value)} />

      <label className={styles.sliderLabel} htmlFor="ee-t" style={{ marginTop: 8 }}><span>Ozeantemperatur</span><strong>{temp}°C</strong></label>
      <input id="ee-t" type="range" min="20" max="300" value={temp} onChange={e => setTemp(+e.target.value)} />

      <label className={styles.sliderLabel} htmlFor="ee-uv" style={{ marginTop: 8 }}><span>UV-Intensität</span><strong>{uv}% (kein Ozon = 100%)</strong></label>
      <input id="ee-uv" type="range" min="0" max="100" value={uv} onChange={e => setUv(+e.target.value)} />

      <label className={styles.sliderLabel} htmlFor="ee-m" style={{ marginTop: 8 }}><span>Meteoritenbeschuss</span><strong>{meteor}%</strong></label>
      <input id="ee-m" type="range" min="0" max="100" value={meteor} onChange={e => setMeteor(+e.target.value)} />

      {/* Life-friendliness meter */}
      <div style={{ marginTop: 14, background: 'var(--navy)', borderRadius: 8, padding: '14px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,.6)' }}>
            Präbiotische Chemie möglich
          </span>
          <strong style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: total > 70 ? '#7AAD7A' : total > 40 ? '#C9A84C' : '#DC143C' }}>
            {total}%
          </strong>
        </div>
        <div style={{ height: 12, background: 'rgba(255,255,255,.1)', borderRadius: 6, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: total + '%', borderRadius: 6, transition: 'width .4s',
            background: total > 70 ? '#7AAD7A' : total > 40 ? '#C9A84C' : '#DC143C' }} />
        </div>
        <div style={{ marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,.5)' }}>
          Geologische Ära: {era}
        </div>
      </div>

      <div className={styles.stats} style={{ marginTop: 10 }}>
        {[
          { label: 'Temperatur', val: tempScore, note: temp > 200 ? 'zu heiß' : temp < 30 ? 'zu kalt' : 'günstig' },
          { label: 'UV-Energie', val: uvScore,   note: uv > 90 ? 'zerstört Moleküle' : 'treibt Reaktionen' },
          { label: 'Atmosphäre', val: co2Score,  note: 'CO₂ = Wärmespeicher' },
          { label: 'Meteoriten', val: meteorScore, note: 'liefern Bausteine' },
        ].map(({ label, val, note }) => (
          <div key={label}>
            <span>{label}</span>
            <strong style={{ color: val > 70 ? 'var(--ok-t)' : val > 40 ? '#C9A84C' : '#DC143C', fontSize: 12 }}>
              {val}% — {note}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}
