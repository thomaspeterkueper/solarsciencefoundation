'use client';
/**
 * BatteryExperiment — EXP:BATTERIE-LADEN-ENTLADEN / EXP:BATTERIE-WAERMEENTWICKLUNG
 * Battery charge/discharge cycles, internal resistance, heat development
 */
import { useState } from 'react';
import styles from './RayleighExperiment.module.css';

export default function BatteryExperiment() {
  const [charge, setCharge]   = useState(80);   // %
  const [current, setCurrent] = useState(1.0);  // C-rate
  const [temp, setTemp]       = useState(25);   // °C ambient

  // Internal resistance (increases at low charge and low temp)
  const Ri = 0.05 * (1 + (1 - charge/100) * 2) * (1 + Math.max(0, (10 - temp) / 20));
  // Heat: P = I² * Ri (simplified, I = current * capacity_A)
  const I = current * 50; // A (assuming 50Ah cell)
  const heatPower = I * I * Ri;
  const cellTemp = temp + heatPower * 0.3;
  const isHot = cellTemp > 45;
  const isCold = temp < 10;

  // Capacity available (temp and charge dependent)
  const availCapacity = Math.round(charge * (isCold ? 0.75 : 1.0) * (isHot ? 0.9 : 1.0));
  const voltage = 3.2 + (charge / 100) * 0.9 - current * Ri * 5;

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Batterie — Laden, Entladen, Wärme</strong></div>

      <label className={styles.sliderLabel} htmlFor="ba-c"><span>Ladezustand (SOC)</span><strong>{charge}%</strong></label>
      <input id="ba-c" type="range" min="5" max="100" value={charge} onChange={e => setCharge(+e.target.value)} />

      <label className={styles.sliderLabel} htmlFor="ba-i" style={{ marginTop: 8 }}><span>Ladestrom (C-Rate)</span><strong>{current.toFixed(1)} C</strong></label>
      <input id="ba-i" type="range" min="0.1" max="3" step="0.1" value={current} onChange={e => setCurrent(+e.target.value)} />

      <label className={styles.sliderLabel} htmlFor="ba-t" style={{ marginTop: 8 }}><span>Umgebungstemperatur</span><strong>{temp}°C</strong></label>
      <input id="ba-t" type="range" min="-20" max="45" value={temp} onChange={e => setTemp(+e.target.value)} />

      {/* Battery visualization */}
      <div style={{ marginTop: 14, position: 'relative', height: 40, background: 'var(--surface)', borderRadius: 6, border: '2px solid ' + (isHot ? '#DC143C' : isCold ? '#5B8FB9' : 'var(--border)'), overflow: 'hidden' }}>
        <div style={{ height: '100%', width: charge + '%', background: charge < 20 ? '#DC143C' : charge < 50 ? '#C9A84C' : '#7AAD7A', transition: 'width .3s, background .3s' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: '#fff', mixBlendMode: 'difference' }}>
          {charge}% — {availCapacity} Ah verfügbar
        </div>
      </div>

      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>Zelltemperatur</span><strong style={{ color: isHot ? '#DC143C' : 'var(--ok-t)', fontSize: 16 }}>{cellTemp.toFixed(1)}°C</strong></div>
        <div><span>Wärmeleistung</span><strong>{heatPower.toFixed(1)} W</strong></div>
        <div><span>Innenwiderstand</span><strong>{(Ri * 1000).toFixed(0)} mΩ</strong></div>
        <div><span>Spannung</span><strong>{Math.max(2.8, voltage).toFixed(2)} V</strong></div>
        <div style={{ gridColumn: 'span 2' }}>
          <span>Status</span>
          <strong style={{ fontSize: 12, color: isHot ? '#DC143C' : isCold ? '#5B8FB9' : 'var(--ok-t)' }}>
            {isHot ? '⚠ Zu heiß — Ladung reduzieren!' : isCold ? '❄ Kalt — Kapazität reduziert, mehr Widerstand' : '✓ Optimaler Betriebsbereich'}
          </strong>
        </div>
      </div>
    </div>
  );
}
