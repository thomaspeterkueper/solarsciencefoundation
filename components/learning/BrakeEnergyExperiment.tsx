'use client';
/**
 * BrakeEnergyExperiment — EXP:BREMSENERGIE / EXP:REIBUNG-WAERME
 * Kinetic energy → heat in brakes: mass, speed, brake force sliders
 */
import { useState } from 'react';
import styles from './RayleighExperiment.module.css';

export default function BrakeEnergyExperiment() {
  const [mass, setMass] = useState(1400);  // kg
  const [speed, setSpeed] = useState(100); // km/h
  const [stops, setStops] = useState(1);

  const v = speed / 3.6; // m/s
  const Ekin = 0.5 * mass * v * v; // J
  const Ekin_kJ = Ekin / 1000;
  const heatPerStop = Ekin_kJ;
  const totalHeat = heatPerStop * stops;

  // Brake disc temp rise (simplified: 4 discs, ~2 kg each, c_steel = 460 J/kg/K)
  const discMass = 4 * 2.0;
  const deltaT = Ekin / (discMass * 460);
  const discTemp = 20 + deltaT;

  // Comparison
  const kettleEnergy = 4186 * 1 * 80; // 1L water 20→100°C in J
  const ratio = Ekin / kettleEnergy;

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Bremsenergie — kinetische Energie wird Wärme</strong></div>

      <label className={styles.sliderLabel} htmlFor="br-m"><span>Fahrzeugmasse</span><strong>{mass} kg</strong></label>
      <input id="br-m" type="range" min="500" max="3000" step="50" value={mass} onChange={e => setMass(+e.target.value)} />

      <label className={styles.sliderLabel} htmlFor="br-v" style={{ marginTop: 8 }}><span>Geschwindigkeit</span><strong>{speed} km/h</strong></label>
      <input id="br-v" type="range" min="10" max="200" value={speed} onChange={e => setSpeed(+e.target.value)} />

      <label className={styles.sliderLabel} htmlFor="br-s" style={{ marginTop: 8 }}><span>Vollbremsungen</span><strong>{stops}×</strong></label>
      <input id="br-s" type="range" min="1" max="20" value={stops} onChange={e => setStops(+e.target.value)} />

      <div style={{ background: 'var(--navy)', borderRadius: 8, padding: '14px 16px', marginTop: 14 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#E8D9A8', marginBottom: 10 }}>
          E_kin = ½ · m · v² → Wärme in Bremsscheiben
        </div>
        {[
          { label: 'Kinetische Energie', val: Ekin_kJ.toFixed(1) + ' kJ', color: '#C9A84C', w: Math.min(100, Ekin_kJ / 5) },
          { label: 'Scheibentemperatur', val: Math.min(999, discTemp).toFixed(0) + ' °C', color: discTemp > 400 ? '#DC143C' : '#7AAD7A', w: Math.min(100, discTemp / 7) },
          { label: 'Gesamtwärme × ' + stops, val: totalHeat.toFixed(0) + ' kJ', color: '#5B8FB9', w: Math.min(100, totalHeat / 50) },
        ].map(({ label, val, color, w }) => (
          <div key={label} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,.55)' }}>{label}</span>
              <strong style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color }}>{val}</strong>
            </div>
            <div style={{ height: 8, background: 'rgba(255,255,255,.08)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: w + '%', background: color, borderRadius: 4, transition: 'width .3s' }} />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>E_kin</span><strong style={{ fontSize: 16 }}>{Ekin_kJ.toFixed(1)} kJ</strong></div>
        <div><span>Scheibentemp.</span><strong style={{ color: discTemp > 400 ? '#DC143C' : 'var(--ok-t)' }}>{Math.min(999, discTemp).toFixed(0)} °C</strong></div>
        <div style={{ gridColumn: 'span 2' }}>
          <span>Vergleich</span>
          <strong style={{ fontSize: 12 }}>= Energie für {ratio.toFixed(1)} × 1L Wasser von 20→100°C</strong>
        </div>
      </div>
      {discTemp > 400 && (
        <p style={{ marginTop: 8, fontSize: 12, color: '#DC143C' }}>⚠ Bremsscheibe über 400°C — Bremsflüssigkeit kann kochen (Dampfblasen → Bremsversagen).</p>
      )}
    </div>
  );
}
