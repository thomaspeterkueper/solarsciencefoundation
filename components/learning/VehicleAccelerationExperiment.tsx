'use client';

import { useState } from 'react';

export default function VehicleAccelerationExperiment() {
  const [power,setPower]=useState(150);
  const [mass,setMass]=useState(1600);
  const [mu,setMu]=useState(0.9);
  const [speed,setSpeed]=useState(50);
  const v=Math.max(1,speed/3.6);
  const forceByPower=power*1000/v;
  const forceByGrip=mu*mass*9.81;
  const driveForce=Math.min(forceByPower,forceByGrip);
  const accel=driveForce/mass;
  const limiter=forceByPower<forceByGrip?'Leistung':'Traktion';

  return <div style={{border:'1px solid #d8d4ca',borderRadius:12,padding:16,background:'#fff'}}>
    <h4 style={{marginTop:0}}>Beschleunigung: Leistung, Masse und Traktion zusammen</h4>
    <p>Ein vereinfachtes Momentanmodell vergleicht die durch Leistung verfügbare Antriebskraft P/v mit einer Reibgrenze μmg.</p>
    <label>Antriebsleistung: <strong>{power} kW</strong><input type="range" min="50" max="450" step="10" value={power} onChange={e=>setPower(+e.target.value)} style={{width:'100%'}}/></label>
    <label>Masse: <strong>{mass} kg</strong><input type="range" min="800" max="2600" step="50" value={mass} onChange={e=>setMass(+e.target.value)} style={{width:'100%'}}/></label>
    <label>Reibwert μ: <strong>{mu.toFixed(2)}</strong><input type="range" min="0.2" max="1.2" step="0.05" value={mu} onChange={e=>setMu(+e.target.value)} style={{width:'100%'}}/></label>
    <label>Geschwindigkeit: <strong>{speed} km/h</strong><input type="range" min="10" max="160" step="5" value={speed} onChange={e=>setSpeed(+e.target.value)} style={{width:'100%'}}/></label>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,margin:'14px 0'}}><div style={{padding:10,border:'1px solid #ddd',borderRadius:8}}>Momentanbeschleunigung<br/><strong>{accel.toFixed(1)} m/s²</strong></div><div style={{padding:10,border:'1px solid #ddd',borderRadius:8}}>aktuelle Grenze<br/><strong>{limiter}</strong></div></div>
    <p style={{marginBottom:0}}>Das ist kein 0–100-Rechner. Getriebe, Drehmomentkennfeld, Luft- und Rollwiderstand, Schlupfregelung, Achslasten und Antriebswirkungsgrad fehlen. Das Modell zeigt nur, warum mehr Leistung allein nicht automatisch mehr Beschleunigung bedeutet.</p>
  </div>;
}
