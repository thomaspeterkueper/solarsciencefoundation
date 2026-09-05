'use client';

import { useState } from 'react';

export default function BatteryManagementExperiment() {
  const [soc, setSoc] = useState(50);
  const [temperature, setTemperature] = useState(25);
  const [cellSpread, setCellSpread] = useState(12);
  const [request, setRequest] = useState<'charge' | 'drive'>('charge');

  const cold = temperature < 5;
  const hot = temperature > 45;
  const highSoc = soc > 90;
  const lowSoc = soc < 10;
  const imbalance = cellSpread > 35;

  const constraints = [
    cold && request === 'charge' ? 'Ladestrom wegen niedriger Zelltemperatur begrenzen' : null,
    hot ? 'Leistung wegen hoher Zelltemperatur begrenzen' : null,
    highSoc && request === 'charge' ? 'Ladestrom bei hohem SOC reduzieren' : null,
    lowSoc && request === 'drive' ? 'Entladeleistung bei niedrigem SOC reduzieren' : null,
    imbalance ? 'Zellabweichung beachten; Balancing bzw. weitere Begrenzung erforderlich' : null,
  ].filter(Boolean) as string[];

  const state = hot || (cold && request === 'charge') || imbalance ? 'begrenzen' : constraints.length ? 'moderat begrenzen' : 'freigeben';

  return <div style={{ border: '1px solid #d8d4ca', borderRadius: 12, padding: 16, background: '#fff' }}>
    <h4 style={{ marginTop: 0 }}>Was macht ein BMS eigentlich?</h4>
    <p>Ein Batteriemanagementsystem ist kein einzelner Temperaturschalter. Es beobachtet mehrere Zustände und setzt daraus Betriebsgrenzen für Laden und Entladen.</p>

    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
      <button type="button" onClick={() => setRequest('charge')} aria-pressed={request === 'charge'}>Laden anfordern</button>
      <button type="button" onClick={() => setRequest('drive')} aria-pressed={request === 'drive'}>Leistung anfordern</button>
    </div>

    <label>SOC: <strong>{soc} %</strong><input type="range" min="2" max="98" value={soc} onChange={e => setSoc(+e.target.value)} style={{ width: '100%' }} /></label>
    <label>Zelltemperatur: <strong>{temperature} °C</strong><input type="range" min="-15" max="60" value={temperature} onChange={e => setTemperature(+e.target.value)} style={{ width: '100%' }} /></label>
    <label>Zellspannungs-Streuung (Lehrwert): <strong>{cellSpread} mV</strong><input type="range" min="2" max="60" value={cellSpread} onChange={e => setCellSpread(+e.target.value)} style={{ width: '100%' }} /></label>

    <div style={{ margin: '14px 0', padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
      BMS-Entscheidung: <strong>{state}</strong>
      {constraints.length > 0
        ? <ul>{constraints.map(item => <li key={item}>{item}</li>)}</ul>
        : <p style={{ marginBottom: 0 }}>In diesem vereinfachten Zustand greift keine der modellierten Begrenzungen.</p>}
    </div>

    <p style={{ marginBottom: 0 }}>Didaktisches Zustandsmodell: Reale BMS überwachen unter anderem Zellspannungen, Ströme und Temperaturen und berücksichtigen die konkrete Batteriearchitektur. Die hier verwendeten Schwellen dienen nur dazu, Entscheidungslogik sichtbar zu machen; sie sind keine universellen Sicherheits- oder Herstellergrenzen.</p>
  </div>;
}
