'use client';

import { useState } from 'react';

export default function BatteryTemperatureExperiment() {
  const [temperature,setTemperature]=useState(20);
  const [rate,setRate]=useState(1);
  const cold = Math.max(0,(15-temperature)/35);
  const hot = Math.max(0,(temperature-35)/20);
  const resistanceIndex = Math.min(2.5, 1 + 1.2*cold + .15*hot);
  const chargeLimit = Math.max(.15, Math.min(1, 1-cold*.8-hot*.45));
  const stress = Math.min(100, Math.round(18*rate*rate*resistanceIndex + 45*hot));

  return <div style={{border:'1px solid #d8d4ca',borderRadius:12,padding:16,background:'#fff'}}>
    <h4 style={{marginTop:0}}>Batterietemperatur und BMS: Grenzen statt fixer Prozentwerte</h4>
    <p>Erkunde qualitativ, warum ein Batteriemanagementsystem Stromgrenzen von Temperatur, Zellzustand und Betriebsbedingungen abhängig macht.</p>
    <label>Zelltemperatur: <strong>{temperature} °C</strong><input type="range" min="-20" max="55" value={temperature} onChange={e=>setTemperature(+e.target.value)} style={{width:'100%'}} /></label>
    <label>angeforderte C-Rate: <strong>{rate.toFixed(1)} C</strong><input type="range" min="0.1" max="3" step="0.1" value={rate} onChange={e=>setRate(+e.target.value)} style={{width:'100%'}} /></label>
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,margin:'14px 0'}}>
      <div style={{padding:10,border:'1px solid #ddd',borderRadius:8}}>relativer Widerstand<br/><strong>{resistanceIndex.toFixed(2)}×</strong></div>
      <div style={{padding:10,border:'1px solid #ddd',borderRadius:8}}>qualitative Ladefreigabe<br/><strong>{Math.round(chargeLimit*100)}%</strong></div>
      <div style={{padding:10,border:'1px solid #ddd',borderRadius:8}}>Belastungsindex<br/><strong>{stress}/100</strong></div>
    </div>
    <p><strong>{rate > 1.2*chargeLimit ? 'Das Modell würde die Anforderung begrenzen.' : 'Die Anforderung liegt im vereinfachten Freigabebereich.'}</strong></p>
    <p style={{marginBottom:0}}>Die Zahlen sind dimensionslose Lehrmodell-Indizes, keine Kennwerte eines realen Akkupacks. Reale Grenzwerte hängen unter anderem von Zellchemie, SOC, Alterung, Zelltemperaturverteilung und Herstellerstrategie ab. Insbesondere gibt es keinen universellen Wert wie „−20 °C = 65 % Kapazität“.</p>
  </div>;
}
