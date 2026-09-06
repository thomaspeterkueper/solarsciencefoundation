'use client';

import { useState } from 'react';

export default function DmsMeasurementChainExperiment() {
  const [uab, setUab] = useState(1.2);
  const [uv, setUv] = useState(5);
  const [k, setK] = useState(2.0);
  const [young, setYoung] = useState(210);

  // Idealized quarter-bridge small-signal relation: Uab/Uv ≈ k*epsilon/4.
  const epsilon = uv > 0 && k > 0 ? 4 * (uab / 1000) / uv / k : 0;
  const microstrain = epsilon * 1e6;
  const stressMpa = young * 1000 * epsilon;

  return <div style={{border:'1px solid #d8d4ca',borderRadius:12,padding:16,background:'#fff'}}>
    <h4 style={{marginTop:0}}>DMS-Messkette: von Millivolt zu mechanischer Spannung</h4>
    <p>Verfolge eine idealisierte Viertelbrücke: Brückenspannung → Dehnung → mechanische Spannung.</p>
    <label>Brückenspannung Uab: <strong>{uab.toFixed(2)} mV</strong><input type="range" min="0.05" max="5" step="0.05" value={uab} onChange={e=>setUab(+e.target.value)} style={{width:'100%'}} /></label>
    <label>Speisespannung Uv: <strong>{uv.toFixed(1)} V</strong><input type="range" min="1" max="10" step="0.5" value={uv} onChange={e=>setUv(+e.target.value)} style={{width:'100%'}} /></label>
    <label>k-Faktor: <strong>{k.toFixed(2)}</strong><input type="range" min="1.5" max="2.5" step="0.05" value={k} onChange={e=>setK(+e.target.value)} style={{width:'100%'}} /></label>
    <label>E-Modul: <strong>{young} GPa</strong><input type="range" min="20" max="220" step="5" value={young} onChange={e=>setYoung(+e.target.value)} style={{width:'100%'}} /></label>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,margin:'14px 0'}}><div style={{padding:10,border:'1px solid #ddd',borderRadius:8}}>Dehnung ε<br/><strong>{microstrain.toFixed(0)} µm/m</strong></div><div style={{padding:10,border:'1px solid #ddd',borderRadius:8}}>σ = E·ε<br/><strong>{stressMpa.toFixed(1)} MPa</strong></div></div>
    <p style={{marginBottom:0}}>Das ist bewusst eine idealisierte Kleinsignal-Viertelbrücke und ein linear-elastischer, einachsiger Zusammenhang. Reale Messketten benötigen passende Brückenschaltung, Temperaturkompensation, Kalibrierung und eine Unsicherheitsanalyse.</p>
  </div>;
}
