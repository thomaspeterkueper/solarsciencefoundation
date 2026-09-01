'use client';

import { useMemo, useState } from 'react';
import styles from './RayleighExperiment.module.css';

function kineticIndex(temperature: number, minutes: number) {
  // Purely didactic response surface: warmer + longer means faster progress.
  // It intentionally does NOT encode a material constant or a reaction onset.
  const temperatureFactor = Math.exp((temperature - 150) / 22);
  return Math.max(0, Math.min(1, 1 - Math.exp(-(minutes / 18) * temperatureFactor)));
}

function progressLabel(progress: number) {
  if (progress < 0.08) return 'unter diesen Modellbedingungen wenig sichtbare Bräunung';
  if (progress < 0.3) return 'erste sichtbare Veränderungen möglich';
  if (progress < 0.65) return 'deutliche Bräunungsreaktionen';
  if (progress < 0.9) return 'fortgeschrittene Bräunung';
  return 'sehr weit fortgeschritten — Nebenreaktionen/Überhitzung werden relevant';
}

export default function KaramellTempExperiment() {
  const [temperature, setTemperature] = useState(160);
  const [minutes, setMinutes] = useState(8);
  const progress = useMemo(() => kineticIndex(temperature, minutes), [temperature, minutes]);

  const lightness = Math.round(94 - progress * 68);
  const saturation = Math.round(35 + progress * 45);
  const sampleColor = `hsl(38 ${saturation}% ${lightness}%)`;

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}>
        <span className={styles.label}>Experiment</span>
        <strong>Temperatur × Zeit: keine magische Karamell-Grenze</strong>
      </div>

      <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, lineHeight: 1.65 }}>
        Verändere <strong>Temperatur und Zeit gemeinsam</strong>. Das Modell zeigt den zentralen kinetischen Gedanken:
        höhere Temperatur beschleunigt thermische Reaktionen, aber ein einzelner Temperaturwert schaltet
        „Karamellisierung“ nicht einfach an oder aus.
      </p>

      <label className={styles.sliderLabel} htmlFor="ka-temperature">
        <span>Temperatur</span><strong>{temperature} °C</strong>
      </label>
      <input id="ka-temperature" type="range" min="100" max="200" value={temperature} onChange={e => setTemperature(+e.target.value)} />

      <label className={styles.sliderLabel} htmlFor="ka-time" style={{ marginTop: 14 }}>
        <span>Zeit bei dieser Temperatur</span><strong>{minutes} min</strong>
      </label>
      <input id="ka-time" type="range" min="0" max="40" value={minutes} onChange={e => setMinutes(+e.target.value)} />

      <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 14, alignItems: 'center', marginTop: 16 }}>
        <div style={{
          height: 110, borderRadius: 10, background: sampleColor,
          border: '1px solid var(--border)', display: 'grid', placeItems: 'center',
          fontFamily: 'var(--font-mono)', fontSize: 11, color: progress > 0.65 ? '#fff' : 'var(--ink)',
        }}>
          Modellbild
        </div>
        <div>
          <strong>{progressLabel(progress)}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 13, lineHeight: 1.6, color: 'var(--muted)' }}>
            Der dargestellte Fortschritt ist eine didaktische Reaktionsfläche, keine kalibrierte Vorhersage für eine konkrete Zuckerprobe.
            Reale Verläufe hängen unter anderem von Zuckerart und Kristallform, Heizrate, Wassergehalt und Matrix ab.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 8, marginTop: 16 }}>
        <div style={{ padding: 10, border: '1px solid var(--border)', borderRadius: 8 }}>
          <strong>1 · Verlust kristalliner Struktur / DSC-Ereignis</strong>
          <p style={{ margin: '4px 0 0', fontSize: 13, lineHeight: 1.55 }}>
            Ein thermisches Messereignis sagt, was unter den jeweiligen Messbedingungen mit der Probe geschieht. Es ist nicht automatisch eine Karamellisierungstemperatur.
          </p>
        </div>
        <div style={{ padding: 10, border: '1px solid var(--border)', borderRadius: 8 }}>
          <strong>2 · Thermische Zersetzung</strong>
          <p style={{ margin: '4px 0 0', fontSize: 13, lineHeight: 1.55 }}>
            Zucker können sich beim Erhitzen chemisch zersetzen. Dieses Ereignis ist von bloßem Strukturverlust und von der sichtbaren Bräunungsentwicklung zu unterscheiden.
          </p>
        </div>
        <div style={{ padding: 10, border: '1px solid var(--border)', borderRadius: 8 }}>
          <strong>3 · Karamellisierungs-/Bräunungskinetik</strong>
          <p style={{ margin: '4px 0 0', fontSize: 13, lineHeight: 1.55 }}>
            Farbe und Aroma entstehen über ein Netzwerk thermischer Reaktionen. Entscheidend ist deshalb nicht nur „wie heiß?“, sondern auch „wie lange?“ und „in welcher Matrix?“.
          </p>
        </div>
      </div>

      <div style={{ marginTop: 14, padding: '12px 14px', background: 'var(--navy)', borderRadius: 8 }}>
        <p style={{ color: 'rgba(255,255,255,.86)', fontSize: 12, lineHeight: 1.65, margin: 0 }}>
          <strong>Messbeispiel, nicht Küchenregel:</strong> Bei einer DSC-Heizrate von 1 °C/min wurden für konkrete Proben ungefähr
          112,7 °C (β-D-Fructopyranose), 146,5 °C (α-D-Glucopyranose) und 184,5 °C (D-Saccharose) als Onsets berichtet.
          Bei anderer Heizrate verschieben sich solche Werte. Sie sind weder universelle Schmelzpunkte noch universelle Karamellisierungstemperaturen.
        </p>
      </div>
    </div>
  );
}
