'use client';

import { useState } from 'react';

export default function WaterHardnessExperiment() {
  const [calcium, setCalcium] = useState(80);
  const [magnesium, setMagnesium] = useState(20);
  const hardness = (calcium / 40.078 + magnesium / 24.305) * 5.6;
  const label = hardness < 8.4 ? 'weich' : hardness <= 14 ? 'mittel' : 'hart';

  return <div style={{border:'1px solid #d8d4ca',borderRadius:12,padding:16,background:'#fff'}}>
    <h4 style={{marginTop:0}}>Wasserhärte: Calcium und Magnesium</h4>
    <p>Verändere die Konzentrationen der beiden wichtigsten Härtebildner. Das Modell berechnet daraus näherungsweise die Gesamthärte in °dH.</p>
    <label>Calcium: <strong>{calcium} mg/L</strong><input type="range" min="0" max="200" value={calcium} onChange={e=>setCalcium(+e.target.value)} style={{width:'100%'}} /></label>
    <label>Magnesium: <strong>{magnesium} mg/L</strong><input type="range" min="0" max="80" value={magnesium} onChange={e=>setMagnesium(+e.target.value)} style={{width:'100%'}} /></label>
    <div style={{margin:'14px 0',padding:12,border:'1px solid #ddd',borderRadius:10}}><strong>{hardness.toFixed(1)} °dH · {label}</strong><div style={{height:12,background:'#eee',marginTop:8,borderRadius:8}}><div style={{height:'100%',width:`${Math.min(100,hardness/30*100)}%`,background:'currentColor',borderRadius:8}} /></div></div>
    <p style={{marginBottom:0}}>Wichtig: Wasserhärte beschreibt vor allem gelöste Calcium- und Magnesiumionen. Ob und wie schnell daraus Calciumcarbonat ausfällt, hängt zusätzlich vom Carbonatsystem, pH, Temperatur, CO₂-Gleichgewicht und weiteren Bedingungen ab. „Hartes Wasser“ ist deshalb nicht identisch mit einer festen Kalkmenge.</p>
  </div>;
}
