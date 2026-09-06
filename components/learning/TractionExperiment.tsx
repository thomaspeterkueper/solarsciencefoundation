'use client';

import { useState } from 'react';

export default function TractionExperiment() {
  const [mu,setMu]=useState(0.8);
  const [mass,setMass]=useState(1600);
  const [accel,setAccel]=useState(4);
  const [cgHeight,setCgHeight]=useState(0.55);
  const [wheelbase,setWheelbase]=useState(2.7);
  const weight=mass*9.81;
  const loadTransfer=mass*accel*cgHeight/wheelbase;
  const rearNormal=weight/2+loadTransfer;
  const frontNormal=weight/2-loadTransfer;
  const totalTraction=mu*weight;

  return <div style={{border:'1px solid #d8d4ca',borderRadius:12,padding:16,background:'#fff'}}>
    <h4 style={{marginTop:0}}>Traktion: Reibgrenze und Lastverlagerung</h4>
    <p>Ein vereinfachtes Fahrzeugmodell trennt zwei Dinge: die verfügbare Reibkraft und die dynamische Verlagerung der Radlasten beim Beschleunigen.</p>
    <label>Reibwert μ: <strong>{mu.toFixed(2)}</strong><input type="range" min="0.1" max="1.2" step="0.05" value={mu} onChange={e=>setMu(+e.target.value)} style={{width:'100%'}}/></label>
    <label>Fahrzeugmasse: <strong>{mass} kg</strong><input type="range" min="800" max="2600" step="50" value={mass} onChange={e=>setMass(+e.target.value)} style={{width:'100%'}}/></label>
    <label>Beschleunigung: <strong>{accel.toFixed(1)} m/s²</strong><input type="range" min="0" max="9" step="0.2" value={accel} onChange={e=>setAccel(+e.target.value)} style={{width:'100%'}}/></label>
    <label>Schwerpunkthöhe: <strong>{cgHeight.toFixed(2)} m</strong><input type="range" min="0.3" max="0.9" step="0.05" value={cgHeight} onChange={e=>setCgHeight(+e.target.value)} style={{width:'100%'}}/></label>
    <label>Radstand: <strong>{wheelbase.toFixed(2)} m</strong><input type="range" min="2" max="3.5" step="0.1" value={wheelbase} onChange={e=>setWheelbase(+e.target.value)} style={{width:'100%'}}/></label>
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:8,margin:'14px 0'}}>
      <div style={{padding:10,border:'1px solid #ddd',borderRadius:8}}>vereinfachte Gesamt-Reibgrenze<br/><strong>{(totalTraction/1000).toFixed(1)} kN</strong></div>
      <div style={{padding:10,border:'1px solid #ddd',borderRadius:8}}>Vorderachse<br/><strong>{(frontNormal/1000).toFixed(1)} kN</strong></div>
      <div style={{padding:10,border:'1px solid #ddd',borderRadius:8}}>Hinterachse<br/><strong>{(rearNormal/1000).toFixed(1)} kN</strong></div>
    </div>
    <p style={{marginBottom:0}}>F≈μN ist hier nur ein Lehrmodell. Reale Reifen sind last-, temperatur-, schlupf- und geschwindigkeitsabhängig; Aerodynamik, Fahrwerk und Antriebsregelung spielen ebenfalls mit. Lastverlagerung erhöht nicht die gesamte Gewichtskraft, sondern verteilt die Normalkräfte zwischen den Achsen um.</p>
  </div>;
}
