'use client';

import { useMemo, useState } from 'react';
import styles from './RayleighExperiment.module.css';

type SugarId = 'fructose' | 'glucose' | 'sucrose';

const SUGARS: Record<SugarId, {
  label: string;
  molecule: string;
  context: string;
  dscExample: string;
}> = {
  fructose: {
    label: 'Fructose',
    molecule: 'C₆H₁₂O₆',
    context: 'β-D-Fructopyranose in der zitierten DSC-Messung',
    dscExample: 'Beispiel-Onset bei 1 °C/min: ca. 112,7 °C',
  },
  glucose: {
    label: 'Glucose',
    molecule: 'C₆H₁₂O₆',
    context: 'α-D-Glucopyranose in der zitierten DSC-Messung',
    dscExample: 'Beispiel-Onset bei 1 °C/min: ca. 146,5 °C',
  },
  sucrose: {
    label: 'Saccharose',
    molecule: 'C₁₂H₂₂O₁₁',
    context: 'D-Saccharose in der zitierten DSC-Messung',
    dscExample: 'Beispiel-Onset bei 1 °C/min: ca. 184,5 °C',
  },
};

function relativeRate(temperature: number, minutes: number, sugar: SugarId) {
  // Didactic comparison only. Offsets make the qualitative point that different
  // sugars need not react at the same rate; they are not measured rate constants.
  const offset = sugar === 'fructose' ? -12 : sugar === 'glucose' ? 0 : 10;
  const factor = Math.exp((temperature - 150 - offset) / 24);
  return Math.max(0, Math.min(1, 1 - Math.exp(-(minutes / 20) * factor)));
}

export default function ZuckerartenExperiment() {
  const [selected, setSelected] = useState<SugarId>('sucrose');
  const [temperature, setTemperature] = useState(155);
  const [minutes, setMinutes] = useState(8);

  const rates = useMemo(() => (Object.keys(SUGARS) as SugarId[]).map((id) => ({
    id,
    progress: relativeRate(temperature, minutes, id),
  })), [temperature, minutes]);
  const selectedProgress = rates.find((entry) => entry.id === selected)?.progress ?? 0;
  const sugar = SUGARS[selected];

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}>
        <span className={styles.label}>Experiment</span>
        <strong>Verschiedene Zucker — unterschiedliche Kinetik</strong>
      </div>

      <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, lineHeight: 1.65 }}>
        Vergleiche Zucker bei <strong>derselben Temperatur und derselben Zeit</strong>. Die qualitative Aussage ist belastbar:
        verschiedene Zucker können sich thermisch unterschiedlich verhalten. Die Anzeige ist bewusst keine Tabelle fester „Karamellisierungstemperaturen“.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 7, marginBottom: 14 }}>
        {(Object.keys(SUGARS) as SugarId[]).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setSelected(id)}
            style={{
              padding: '9px 8px', borderRadius: 7, cursor: 'pointer',
              border: `1.5px solid ${selected === id ? '#C9A84C' : 'var(--border)'}`,
              background: selected === id ? 'rgba(201,168,76,.12)' : 'var(--soft)',
              color: 'var(--ink)',
            }}
          >
            <strong>{SUGARS[id].label}</strong>
            <div style={{ marginTop: 3, fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{SUGARS[id].molecule}</div>
          </button>
        ))}
      </div>

      <label className={styles.sliderLabel} htmlFor="za-temperature"><span>Temperatur</span><strong>{temperature} °C</strong></label>
      <input id="za-temperature" type="range" min="100" max="200" value={temperature} onChange={e => setTemperature(+e.target.value)} />

      <label className={styles.sliderLabel} htmlFor="za-time" style={{ marginTop: 14 }}><span>Zeit</span><strong>{minutes} min</strong></label>
      <input id="za-time" type="range" min="0" max="40" value={minutes} onChange={e => setMinutes(+e.target.value)} />

      <div style={{ marginTop: 14, background: 'var(--navy)', borderRadius: 8, padding: '14px 16px' }}>
        {rates.map(({ id, progress }) => (
          <div key={id} style={{ display: 'grid', gridTemplateColumns: '90px 1fr 48px', gap: 8, alignItems: 'center', marginBottom: 9 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,.65)' }}>{SUGARS[id].label}</span>
            <div style={{ height: 10, background: 'rgba(255,255,255,.08)', borderRadius: 5, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress * 100}%`, background: '#C9A84C', borderRadius: 5, transition: 'width .25s' }} />
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,.45)' }}>Modell</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12, padding: '12px 14px', border: '1px solid var(--border)', borderRadius: 8 }}>
        <strong>{sugar.label}: Messwert richtig lesen</strong>
        <p style={{ margin: '6px 0 0', lineHeight: 1.6, fontSize: 13 }}>
          {sugar.dscExample}. Das gilt für {sugar.context}. Es handelt sich um ein DSC-Ereignis unter konkreten Messbedingungen,
          nicht um eine universelle Karamellisierungstemperatur. Bei 10 °C/min verschieben sich die Onsets deutlich.
        </p>
        <p style={{ margin: '7px 0 0', lineHeight: 1.6, fontSize: 12, color: 'var(--muted)' }}>
          Aktueller Modellfortschritt: {Math.round(selectedProgress * 100)} %. Dieser Prozentwert illustriert ausschließlich den Vergleich innerhalb der Simulation und ist kein experimentell gemessener Umsatz.
        </p>
      </div>

      <div style={{ marginTop: 12, padding: '10px 12px', background: 'var(--soft)', borderRadius: 8 }}>
        <strong>Warum fehlt Maltose?</strong>
        <p style={{ margin: '4px 0 0', fontSize: 12.5, lineHeight: 1.6 }}>
          Ein universeller Wert von 180 °C für „Maltose-Karamellisierung“ ist im freigegebenen Faktenlayer nicht ausreichend belegt. SSF lehrt ihn deshalb nicht.
        </p>
      </div>
    </div>
  );
}
