'use client';

import { useState } from 'react';
import styles from './RayleighExperiment.module.css';

export default function ChlorineCleaningExperiment() {
  const [mode, setMode] = useState<'bleach' | 'acid'>('bleach');

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}>
        <span className={styles.label}>Sicherheitsmodell</span>
        <strong>Hypochlorit: Bleichen verstehen, gefährliches Mischen vermeiden</strong>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '12px 0' }}>
        <button type="button" onClick={() => setMode('bleach')} aria-pressed={mode === 'bleach'}>Bleicheffekt</button>
        <button type="button" onClick={() => setMode('acid')} aria-pressed={mode === 'acid'}>Säure + Hypochlorit</button>
      </div>

      {mode === 'bleach' ? (
        <div>
          <p style={{ fontFamily: 'var(--font-serif)', lineHeight: 1.65 }}>
            Hypochlorithaltige Bleichmittel können farbgebende Molekülstrukturen oxidativ verändern. Dadurch kann ein Chromophor seine Fähigkeit verlieren, sichtbares Licht wie zuvor zu absorbieren. „Farbe weg“ bedeutet deshalb nicht automatisch „Stoff entfernt“.
          </p>
          <div style={{ padding: 12, border: '1px solid var(--border)', borderRadius: 8 }}>
            <strong>Didaktische Vereinfachung</strong>
            <p style={{ margin: '6px 0 0' }}>Bleichen umfasst unterschiedliche Oxidationsreaktionen. Es gibt keinen einzigen universellen Mechanismus, der für jeden Farbstoff identisch ist.</p>
          </div>
        </div>
      ) : (
        <div>
          <p style={{ fontFamily: 'var(--font-serif)', lineHeight: 1.65 }}>
            Wird eine hypochlorithaltige Reinigungslösung angesäuert, verschiebt sich das chemische Gleichgewicht. Unter geeigneten Bedingungen kann dabei molekulares Chlor freigesetzt werden. Das ist ein Atemgift.
          </p>
          <div role="alert" style={{ padding: 12, border: '1px solid var(--border)', borderRadius: 8 }}>
            <strong>Nicht mischen.</strong>
            <p style={{ margin: '6px 0 0' }}>Hypochlorithaltige Chlorreiniger niemals mit Essig, Entkalkern oder anderen sauren Reinigern kombinieren. Diese Visualisierung nennt bewusst keinen universellen pH-Grenzwert.</p>
          </div>
        </div>
      )}
    </div>
  );
}
