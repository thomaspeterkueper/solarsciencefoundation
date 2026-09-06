'use client';

import { useMemo, useState } from 'react';

function saturationPressureBar(tC: number) {
  const c = tC <= 99
    ? { A: 8.07131, B: 1730.63, C: 233.426 }
    : { A: 8.14019, B: 1810.94, C: 244.485 };
  const mmHg = 10 ** (c.A - c.B / (c.C + tC));
  return mmHg * 0.00133322;
}

export default function VaporPressureBoilingExperiment() {
  const [temperature, setTemperature] = useState(80);
  const [ambientPressure, setAmbientPressure] = useState(1.013);
  const psat = useMemo(() => saturationPressureBar(temperature), [temperature]);
  const boiling = psat >= ambientPressure;
  const ratio = Math.min(1.5, psat / ambientPressure);

  return <div style={{border:'1px solid #d8d4ca',borderRadius:12,padding:16,background:'#fff'}}>
    <h4 style={{marginTop:0}}>Dampfdruck und Sieden: zwei Drücke treffen sich</h4>
    <p>Eine Flüssigkeit siedet, wenn ihr Sättigungsdampfdruck den Umgebungsdruck erreicht. Damit lässt sich derselbe Zusammenhang für Meereshöhe, Gebirge und Drucktopf lesen.</p>
    <label>Wassertemperatur: <strong>{temperature} °C</strong><input type="range" min="5" max="150" value={temperature} onChange={e=>setTemperature(+e.target.value)} style={{width:'100%'}} /></label>
    <label>Umgebungsdruck: <strong>{ambientPressure.toFixed(2)} bar</strong><input type="range" min="0.2" max="3" step="0.05" value={ambientPressure} onChange={e=>setAmbientPressure(+e.target.value)} style={{width:'100%'}} /></label>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,margin:'14px 0'}}>
      <div style={{padding:10,border:'1px solid #ddd',borderRadius:8}}>Sättigungsdampfdruck<br/><strong>{psat.toFixed(2)} bar</strong></div>
      <div style={{padding:10,border:'1px solid #ddd',borderRadius:8}}>Zustand<br/><strong>{boiling ? 'Siedebedingung erreicht' : 'noch unter Siedebedingung'}</strong></div>
    </div>
    <div style={{height:18,border:'1px solid #bbb',borderRadius:9,overflow:'hidden'}}><div style={{height:'100%',width:`${Math.min(100,ratio/1.5*100)}%`,background:'#777'}} /></div>
    <p style={{marginBottom:0}}>Die Dampfdruckwerte werden mit einer Antoine-Näherung für Wasser berechnet. Blasenbildung in realen Flüssigkeiten hängt zusätzlich von Keimbildung, Oberflächen und lokalen Druckverhältnissen ab; das Modell ist keine Simulation einzelner Moleküle.</p>
  </div>;
}
