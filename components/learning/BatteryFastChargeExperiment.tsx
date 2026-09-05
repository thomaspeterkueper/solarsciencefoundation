'use client';

import { useState } from 'react';

/**
 * Didactic CC/CV-inspired charging model.
 * Values are normalized teaching-model quantities, not a pack specification.
 */
export default function BatteryFastChargeExperiment() {
  const [soc, setSoc] = useState(35);
  const [temperature, setTemperature] = useState(25);
  const [requestedRate, setRequestedRate] = useState(2);

  const coldFactor = temperature < 15 ? Math.max(0.12, (temperature + 20) / 35) : 1;
  const hotFactor = temperature > 40 ? Math.max(0.25, 1 - (temperature - 40) / 25) : 1;
  const temperatureFactor = Math.min(coldFactor, hotFactor);

  // Illustrates the transition from a broad constant-current region to tapering
  // near high SOC. The thresholds are deliberately qualitative.
  const socFactor = soc <= 55 ? 1 : soc >= 95 ? 0.12 : 1 - ((soc - 55) / 40) * 0.88;
  const allowedRate = Math.max(0.1, Math.min(3, 3 * temperatureFactor * socFactor));
  const actualRate = Math.min(requestedRate, allowedRate);
  const limited = actualRate + 0.01 < requestedRate;
  const heatIndex = Math.min(100, Math.round(12 * actualRate * actualRate * (temperature < 10 ? 1.7 : 1)));

  const reason = temperature < 15
    ? 'Die Zelle ist kalt: Das Lehrmodell reduziert den Ladestrom deutlich.'
    : temperature > 40
      ? 'Die Zelle ist warm: Das Lehrmodell reduziert den Ladestrom zum thermischen Schutz.'
      : soc > 55
        ? 'Mit steigendem Ladezustand beginnt die Stromfreigabe im Modell zu sinken.'
        : 'Temperatur und Ladezustand erlauben im Lehrmodell eine hohe Ladeleistung.';

  return <div style={{ border: '1px solid #d8d4ca', borderRadius: 12, padding: 16, background: '#fff' }}>
    <h4 style={{ marginTop: 0 }}>Schnellladen: Warum 10–80 % nicht gleich schnell sind</h4>
    <p>Verändere Ladezustand, Temperatur und gewünschte C-Rate. Das BMS-Modell entscheidet daraus, wie viel Ladestrom tatsächlich freigegeben wird.</p>

    <label>Ladezustand (SOC): <strong>{soc} %</strong>
      <input type="range" min="5" max="98" value={soc} onChange={e => setSoc(+e.target.value)} style={{ width: '100%' }} />
    </label>
    <label>Zelltemperatur: <strong>{temperature} °C</strong>
      <input type="range" min="-10" max="55" value={temperature} onChange={e => setTemperature(+e.target.value)} style={{ width: '100%' }} />
    </label>
    <label>angeforderte Ladeleistung: <strong>{requestedRate.toFixed(1)} C</strong>
      <input type="range" min="0.2" max="3" step="0.1" value={requestedRate} onChange={e => setRequestedRate(+e.target.value)} style={{ width: '100%' }} />
    </label>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 8, margin: '14px 0' }}>
      <div style={{ padding: 10, border: '1px solid #ddd', borderRadius: 8 }}>BMS-Freigabe<br/><strong>{allowedRate.toFixed(2)} C</strong></div>
      <div style={{ padding: 10, border: '1px solid #ddd', borderRadius: 8 }}>tatsächliche Rate<br/><strong>{actualRate.toFixed(2)} C</strong></div>
      <div style={{ padding: 10, border: '1px solid #ddd', borderRadius: 8 }}>Wärmeindex<br/><strong>{heatIndex}/100</strong></div>
    </div>

    <div style={{ height: 14, borderRadius: 7, background: '#ece9e2', overflow: 'hidden', marginBottom: 10 }}>
      <div style={{ height: '100%', width: `${Math.min(100, (actualRate / 3) * 100)}%`, background: 'currentColor', transition: 'width 180ms ease' }} />
    </div>

    <p><strong>{limited ? 'BMS begrenzt: ' : 'Keine zusätzliche Begrenzung: '}</strong>{reason}</p>
    <p style={{ marginBottom: 0 }}>Das Modell zeigt das Prinzip einer ladezustands- und temperaturabhängigen Ladekurve. Reale Ladegrenzen hängen von Zellchemie, Zellspannung, Packdesign, Kühlung, Alterung und Herstellerstrategie ab. Es behauptet weder einen universellen 80-%-Knick noch eine universelle C-Rate.</p>
  </div>;
}
