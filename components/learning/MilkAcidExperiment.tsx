'use client';

/**
 * MilkAcidExperiment — EXP:REZEPTE:MILCH-SAEURE
 * Lernpfad PATH:SSF:CHE-KUECHE-ALTE-REZEPTE-0001, Einheit „Was nicht zusammenpasst“.
 * Didaktisches Modell: Casein-Mizellen tragen bei frischer Milch (pH etwa 6,7) negative
 * Ladung und stoßen sich ab. Je näher der pH-Wert dem isoelektrischen Punkt von Casein
 * (etwa 4,6) kommt, desto schwächer die Abstoßung; Wärme beschleunigt das Zusammenlagern.
 * Die Kurve ist qualitativ, keine kalibrierte Vorhersage für eine bestimmte Milch.
 */
import { useMemo, useState } from 'react';
import styles from './RayleighExperiment.module.css';

function repulsion(pH: number) {
  // 1 bei frischer Milch, 0 am isoelektrischen Punkt von Casein (≈ 4,6)
  return Math.max(0, Math.min(1, (pH - 4.6) / (6.7 - 4.6)));
}

function flocculation(pH: number, temperature: number) {
  const charge = repulsion(pH);
  const heat = Math.max(0, (temperature - 20) / 70); // 0 bei 20 °C, 1 bei 90 °C
  // Schwelle: Je wärmer, desto früher (bei höherem pH) flockt es.
  const threshold = 0.35 + 0.35 * heat;
  return Math.max(0, Math.min(1, (threshold - charge) / threshold));
}

function stateLabel(f: number) {
  if (f < 0.05) return 'glatt – die Mizellen bleiben einzeln in der Schwebe';
  if (f < 0.35) return 'erste feine Flocken möglich – die Milch wird „grieselig“';
  if (f < 0.75) return 'deutliches Ausflocken – Bruch und trübe Molke';
  return 'vollständig geronnen – fester Bruch, klare grünliche Molke: so entsteht Frischkäse';
}

export default function MilkAcidExperiment() {
  const [pH, setPH] = useState(6.7);
  const [temperature, setTemperature] = useState(20);
  const f = useMemo(() => flocculation(pH, temperature), [pH, temperature]);
  const flecks = Math.round(f * 26);

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}>
        <span className={styles.label}>Experiment</span>
        <strong>Milch und Säure: wann sie nicht mehr zusammenpassen</strong>
      </div>

      <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, lineHeight: 1.65 }}>
        Gib in Gedanken Saures zur Milch – Zitronensaft, Essig oder saures Bier – und erwärme sie.
        Beobachte, wann aus der glatten Flüssigkeit Flocken werden.
      </p>

      <label className={styles.sliderLabel} htmlFor="ma-ph">
        <span>Säuregrad (pH-Wert)</span><strong>pH {pH.toFixed(1)}</strong>
      </label>
      <input id="ma-ph" type="range" min="4" max="6.8" step="0.1" value={pH} onChange={e => setPH(+e.target.value)} />

      <label className={styles.sliderLabel} htmlFor="ma-temp" style={{ marginTop: 14 }}>
        <span>Temperatur im Topf</span><strong>{temperature} °C</strong>
      </label>
      <input id="ma-temp" type="range" min="20" max="90" step="5" value={temperature} onChange={e => setTemperature(+e.target.value)} />

      <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 14, alignItems: 'center', marginTop: 16 }}>
        <svg viewBox="0 0 140 110" role="img" aria-label={`Modellbild Milch: ${stateLabel(f)}`} style={{ width: 140, height: 110 }}>
          <rect x="10" y="10" width="120" height="90" rx="10" fill={f > 0.75 ? 'hsl(70 30% 88%)' : 'hsl(45 30% 96%)'} stroke="var(--border)" />
          {Array.from({ length: flecks }).map((_, i) => (
            <circle key={i} cx={20 + ((i * 37) % 100)} cy={22 + ((i * 53) % 70)} r={3 + f * 6} fill="hsl(45 25% 99%)" stroke="hsl(40 15% 75%)" />
          ))}
        </svg>
        <div>
          <strong>{stateLabel(f)}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 13, lineHeight: 1.6, color: 'var(--muted)' }}>
            Abstoßung zwischen den Eiweißteilchen: {Math.round(repulsion(pH) * 100)} % des Werts frischer Milch.
            Modellbild, keine Messung an einer bestimmten Milch.
          </p>
        </div>
      </div>

      <div style={{ marginTop: 14, padding: '12px 14px', background: 'var(--navy)', borderRadius: 8 }}>
        <p style={{ color: 'rgba(255,255,255,.86)', fontSize: 12, lineHeight: 1.65, margin: 0 }}>
          <strong>Was du siehst:</strong> Frische Milch hat etwa pH 6,7. Ihr Haupteiweiß Casein bildet winzige Kügelchen,
          die gleich geladen sind und sich deshalb abstoßen. Säure nimmt ihnen diese Ladung; um pH 4,6 ist sie fast weg,
          und die Kügelchen lagern sich zusammen. Wärme beschleunigt das. Im Eintopf ist das ein Fehler –
          beim Käsemachen ist es genau das Ziel.
        </p>
      </div>
    </div>
  );
}
