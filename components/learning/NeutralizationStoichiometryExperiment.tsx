'use client';

import { useMemo, useState } from 'react';
import styles from './RayleighExperiment.module.css';

export default function NeutralizationStoichiometryExperiment() {
  const [acidVolume, setAcidVolume] = useState(50);
  const [acidConcentration, setAcidConcentration] = useState(0.1);
  const [baseVolume, setBaseVolume] = useState(50);
  const [baseConcentration, setBaseConcentration] = useState(0.1);

  const result = useMemo(() => {
    const acidMmol = acidVolume * acidConcentration;
    const baseMmol = baseVolume * baseConcentration;
    const delta = acidMmol - baseMmol;
    if (Math.abs(delta) < 0.001) return { acidMmol, baseMmol, text: 'Im vereinfachten 1:1-Modell sind die Stoffmengen stöchiometrisch ausgeglichen.' };
    return { acidMmol, baseMmol, text: delta > 0 ? `Säure im Überschuss: ${delta.toFixed(2)} mmol` : `Base im Überschuss: ${Math.abs(delta).toFixed(2)} mmol` };
  }, [acidVolume, acidConcentration, baseVolume, baseConcentration]);

  const slider = (id: string, label: string, value: number, min: number, max: number, step: number, setValue: (n: number) => void, unit: string) => (
    <label className={styles.sliderLabel} htmlFor={id} style={{ display: 'grid', gap: 5 }}>
      <span>{label}: <strong>{value} {unit}</strong></span>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={e => setValue(+e.target.value)} />
    </label>
  );

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Erkundung</span><strong>Stoffmenge statt „gleich viel“</strong></div>
      <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, lineHeight: 1.65 }}>Verändere Volumen und Konzentration einer einprotonigen starken Säure und einer einwertigen starken Base. Das Modell betrachtet ausschließlich die vereinfachte 1:1-Stöchiometrie.</p>
      <div style={{ display: 'grid', gap: 14 }}>
        {slider('acid-volume', 'Säurevolumen', acidVolume, 10, 100, 5, setAcidVolume, 'mL')}
        {slider('acid-concentration', 'Säurekonzentration', acidConcentration, 0.05, 0.5, 0.05, setAcidConcentration, 'mol/L')}
        {slider('base-volume', 'Basevolumen', baseVolume, 10, 100, 5, setBaseVolume, 'mL')}
        {slider('base-concentration', 'Basekonzentration', baseConcentration, 0.05, 0.5, 0.05, setBaseConcentration, 'mol/L')}
      </div>
      <div style={{ marginTop: 16, padding: 12, border: '1px solid var(--border)', borderRadius: 8 }}>
        <div>Säure: <strong>{result.acidMmol.toFixed(2)} mmol</strong> · Base: <strong>{result.baseMmol.toFixed(2)} mmol</strong></div>
        <p style={{ margin: '7px 0 0' }}><strong>{result.text}</strong></p>
      </div>
      <p style={{ marginTop: 14, fontSize: 12, lineHeight: 1.6, color: 'var(--muted)' }}>Ein stöchiometrischer Ausgleich bedeutet nicht allgemein „pH = 7“. Schwache Säuren/Basen, mehrprotonige Systeme, Aktivitäten und Temperatur erfordern ein erweitertes Modell.</p>
    </div>
  );
}
