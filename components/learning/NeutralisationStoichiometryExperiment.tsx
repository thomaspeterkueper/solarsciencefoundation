'use client';

import { useMemo, useState } from 'react';
import styles from './RayleighExperiment.module.css';

export default function NeutralisationStoichiometryExperiment() {
  const [acidVolume, setAcidVolume] = useState(50);
  const [acidConcentration, setAcidConcentration] = useState(0.1);
  const [baseVolume, setBaseVolume] = useState(50);
  const [baseConcentration, setBaseConcentration] = useState(0.1);

  const result = useMemo(() => {
    const acidMmol = acidVolume * acidConcentration;
    const baseMmol = baseVolume * baseConcentration;
    const delta = acidMmol - baseMmol;
    return { acidMmol, baseMmol, delta };
  }, [acidVolume, acidConcentration, baseVolume, baseConcentration]);

  const conclusion = Math.abs(result.delta) < 0.02
    ? 'In diesem vereinfachten 1:1-Modell sind die Stoffmengen nahezu äquivalent.'
    : result.delta > 0
      ? `Säure im Überschuss: etwa ${result.delta.toFixed(2)} mmol.`
      : `Base im Überschuss: etwa ${Math.abs(result.delta).toFixed(2)} mmol.`;

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}>
        <span className={styles.label}>Erkundung</span>
        <strong>Gleiche Volumina sind nicht automatisch gleiche Stoffmengen</strong>
      </div>

      <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, lineHeight: 1.65 }}>
        Vergleiche eine idealisierte einprotonige starke Säure mit einer einwertigen starken Base. Verändere Volumen und Konzentration getrennt.
      </p>

      <label className={styles.sliderLabel} htmlFor="acid-volume"><span>Säure · Volumen</span><strong>{acidVolume} mL</strong></label>
      <input id="acid-volume" type="range" min="10" max="100" step="5" value={acidVolume} onChange={e => setAcidVolume(+e.target.value)} />

      <label className={styles.sliderLabel} htmlFor="acid-concentration" style={{ marginTop: 12 }}><span>Säure · Konzentration</span><strong>{acidConcentration.toFixed(2)} mol/L</strong></label>
      <input id="acid-concentration" type="range" min="0.05" max="0.5" step="0.05" value={acidConcentration} onChange={e => setAcidConcentration(+e.target.value)} />

      <label className={styles.sliderLabel} htmlFor="base-volume" style={{ marginTop: 12 }}><span>Base · Volumen</span><strong>{baseVolume} mL</strong></label>
      <input id="base-volume" type="range" min="10" max="100" step="5" value={baseVolume} onChange={e => setBaseVolume(+e.target.value)} />

      <label className={styles.sliderLabel} htmlFor="base-concentration" style={{ marginTop: 12 }}><span>Base · Konzentration</span><strong>{baseConcentration.toFixed(2)} mol/L</strong></label>
      <input id="base-concentration" type="range" min="0.05" max="0.5" step="0.05" value={baseConcentration} onChange={e => setBaseConcentration(+e.target.value)} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 }}>
        <div style={{ padding: 12, border: '1px solid var(--border)', borderRadius: 8 }}>
          <strong>Säure</strong>
          <p style={{ margin: '5px 0 0', fontFamily: 'var(--font-mono)', fontSize: 13 }}>{result.acidMmol.toFixed(2)} mmol</p>
        </div>
        <div style={{ padding: 12, border: '1px solid var(--border)', borderRadius: 8 }}>
          <strong>Base</strong>
          <p style={{ margin: '5px 0 0', fontFamily: 'var(--font-mono)', fontSize: 13 }}>{result.baseMmol.toFixed(2)} mmol</p>
        </div>
      </div>

      <div style={{ marginTop: 10, padding: 12, border: '1px solid var(--border)', borderRadius: 8 }}>
        <strong>Ergebnis</strong>
        <p style={{ margin: '5px 0 0', fontSize: 13, lineHeight: 1.55 }}>{conclusion}</p>
      </div>

      <p style={{ marginTop: 14, fontSize: 12, lineHeight: 1.6, color: 'var(--muted)' }}>
        Das ist bewusst ein Foundation-Modell für eine 1:1-Reaktion. Bei mehrprotonigen Säuren, schwachen Säuren/Basen,
        Puffersystemen oder Carbonaten muss die tatsächliche Reaktionsstöchiometrie und das Gleichgewicht berücksichtigt werden.
        Äquivalente Stoffmengen bedeuten außerdem nicht für jedes reale System automatisch pH 7.
      </p>
    </div>
  );
}
