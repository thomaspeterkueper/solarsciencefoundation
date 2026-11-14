'use client';

/**
 * EggSetExperiment — EXP:REZEPTE:EI-BINDET
 * Lernpfad PATH:SSF:CHE-KUECHE-ALTE-REZEPTE-0001, Einheit „Was einen Teig zusammenhält“.
 * Didaktisches Modell: Eiweiße entfalten sich beim Erhitzen und vernetzen sich.
 * Grobe Richtwerte der Küchenchemie: Ovotransferrin im Eiklar ab etwa 62 °C,
 * Eigelb etwa 65–70 °C, Ovalbumin (Hauptteil des Eiklars) erst um 80 °C.
 * Stärke aus Mehl quillt je nach Sorte etwa zwischen 55 und 70 °C (Verkleisterung).
 * Qualitative Darstellung, keine kalibrierte Vorhersage.
 */
import { useState } from 'react';
import styles from './RayleighExperiment.module.css';

const ramp = (t: number, start: number, end: number) => Math.max(0, Math.min(1, (t - start) / (end - start)));

const COMPONENTS = [
  { name: 'Eiklar – erster Teil (Ovotransferrin)', start: 60, end: 66 },
  { name: 'Eigelb', start: 63, end: 72 },
  { name: 'Eiklar – Hauptteil (Ovalbumin)', start: 76, end: 84 },
  { name: 'Stärke im Mehl (Quellen, „Verkleistern“)', start: 55, end: 72 },
];

export default function EggSetExperiment() {
  const [temperature, setTemperature] = useState(50);
  const set = COMPONENTS.map(c => ({ ...c, p: ramp(temperature, c.start, c.end) }));
  const firmness = set.reduce((sum, c) => sum + c.p, 0) / set.length;

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}>
        <span className={styles.label}>Experiment</span>
        <strong>Was hält Catos Teig zusammen?</strong>
      </div>

      <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, lineHeight: 1.65 }}>
        Käse, Mehl und ein Ei: Erhöhe die Temperatur im Inneren des Teigs und beobachte,
        welcher Bestandteil wann fest wird.
      </p>

      <label className={styles.sliderLabel} htmlFor="egg-temp">
        <span>Temperatur im Inneren</span><strong>{temperature} °C</strong>
      </label>
      <input id="egg-temp" type="range" min="20" max="100" value={temperature} onChange={e => setTemperature(+e.target.value)} />

      <div style={{ display: 'grid', gap: 8, marginTop: 16 }}>
        {set.map(c => (
          <div key={c.name}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <span>{c.name}</span>
              <strong>{c.p < 0.05 ? 'flüssig/roh' : c.p < 0.95 ? 'stockt' : 'fest'}</strong>
            </div>
            <div style={{ height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }} aria-hidden="true">
              <div style={{ width: `${Math.round(c.p * 100)}%`, height: '100%', background: 'var(--gold, #C9A84C)' }} />
            </div>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 14, fontSize: 13, lineHeight: 1.6 }}>
        <strong>Zusammenhalt des Teigs (Modell): {Math.round(firmness * 100)} %.</strong>{' '}
        {firmness < 0.1 ? 'Noch ein weicher Teig – er würde zerfließen.' : firmness < 0.7 ? 'Die Eiweiße beginnen ein Netz zu bilden, die Stärke quillt.' : 'Ein festes Netz aus geronnenem Eiweiß und gequollener Stärke hält alles zusammen.'}
      </p>

      <div style={{ marginTop: 14, padding: '12px 14px', background: 'var(--navy)', borderRadius: 8 }}>
        <p style={{ color: 'rgba(255,255,255,.86)', fontSize: 12, lineHeight: 1.65, margin: 0 }}>
          <strong>Richtwerte, keine Schalter:</strong> Eiweiße entfalten sich beim Erhitzen und verhaken sich miteinander.
          Die Temperaturen sind grobe Bereiche aus der Küchenchemie; Zeit, Zucker, Salz und Säure verschieben sie.
        </p>
      </div>
    </div>
  );
}
