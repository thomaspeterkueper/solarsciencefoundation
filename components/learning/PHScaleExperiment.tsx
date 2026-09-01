'use client';

import { useMemo, useState } from 'react';
import styles from './RayleighExperiment.module.css';

export default function PHScaleExperiment() {
  const [ph, setPh] = useState(7);
  const activity = useMemo(() => Math.pow(10, -ph), [ph]);
  const factorVsNeutral = useMemo(() => Math.pow(10, Math.abs(7 - ph)), [ph]);

  const relation = ph < 7
    ? `${factorVsNeutral.toLocaleString('de-DE')}× höhere Oxoniumionen-Aktivität als bei pH 7 (idealisiert)`
    : ph > 7
      ? `${factorVsNeutral.toLocaleString('de-DE')}× niedrigere Oxoniumionen-Aktivität als bei pH 7 (idealisiert)`
      : 'Referenzpunkt pH 7 in dieser vereinfachten Darstellung';

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}>
        <span className={styles.label}>Erkundung</span>
        <strong>pH ist logarithmisch, nicht linear</strong>
      </div>

      <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, lineHeight: 1.65 }}>
        Verschiebe den pH-Wert. Beobachte nicht nur die Zahl auf der Skala, sondern die zugehörige Größenordnung.
        Eine pH-Einheit entspricht idealisiert einem Faktor zehn.
      </p>

      <label className={styles.sliderLabel} htmlFor="ph-scale">
        <span>pH-Wert</span><strong>{ph.toFixed(1)}</strong>
      </label>
      <input id="ph-scale" type="range" min="0" max="14" step="0.1" value={ph} onChange={e => setPh(+e.target.value)} />

      <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
        <div style={{ padding: 12, border: '1px solid var(--border)', borderRadius: 8 }}>
          <strong>Oxoniumionen-Aktivität, idealisiert</strong>
          <p style={{ margin: '5px 0 0', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
            10<sup>−{ph.toFixed(1)}</sup> ≈ {activity.toExponential(2)}
          </p>
        </div>
        <div style={{ padding: 12, border: '1px solid var(--border)', borderRadius: 8 }}>
          <strong>Vergleich mit pH 7</strong>
          <p style={{ margin: '5px 0 0', fontSize: 13, lineHeight: 1.55 }}>{relation}</p>
        </div>
      </div>

      <p style={{ marginTop: 14, fontSize: 12, lineHeight: 1.6, color: 'var(--muted)' }}>
        Diese Darstellung dient dem Verständnis der logarithmischen Skala. Reale pH-Messungen beruhen auf Aktivität,
        nicht auf einer simplen Teilchenzählung, und hängen unter anderem von Temperatur und Zusammensetzung der Lösung ab.
      </p>
    </div>
  );
}
