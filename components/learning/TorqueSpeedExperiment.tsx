'use client';

import { useState } from 'react';

export default function TorqueSpeedExperiment() {
  const [rpm,setRpm]=useState(3000);
  const [peakTorque,setPeakTorque]=useState(280);
  const [peakRpm,setPeakRpm]=useState(3500);
  const width=2200;
  const shape=Math.max(0.35,1-Math.pow((rpm-peakRpm)/width,2));
  const torque=peakTorque*shape;
  const omega=rpm*2*Math.PI/60;
  const power=torque*omega/1000;

  return <div style={{border:'1px solid #d8d4ca',borderRadius:12,padding:16,background:'#fff'}}>
    <h4 style={{marginTop:0}}>Drehmoment, Drehzahl und Leistung</h4>
    <p>Ein vereinfachtes Kennlinienmodell zeigt: Drehmoment und Leistung sind verschiedene Größen. Leistung ergibt sich aus Drehmoment × Winkelgeschwindigkeit.</p>
    <label>Drehzahl: <strong>{rpm} min⁻¹</strong><input type="range" min="800" max="6500" step="100" value={rpm} onChange={e=>setRpm(+e.target.value)} style={{width:'100%'}}/></label>
    <label>Peak-Drehmoment: <strong>{peakTorque} Nm</strong><input type="range" min="120" max="500" step="10" value={peakTorque} onChange={e=>setPeakTorque(+e.target.value)} style={{width:'100%'}}/></label>
    <label>Drehzahl des Drehmomentmaximums: <strong>{peakRpm} min⁻¹</strong><input type="range" min="1800" max="5000" step="100" value={peakRpm} onChange={e=>setPeakRpm(+e.target.value)} style={{width:'100%'}}/></label>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,margin:'14px 0'}}><div style={{padding:10,border:'1px solid #ddd',borderRadius:8}}>Drehmoment<br/><strong>{torque.toFixed(0)} Nm</strong></div><div style={{padding:10,border:'1px solid #ddd',borderRadius:8}}>Leistung<br/><strong>{power.toFixed(0)} kW</strong></div></div>
    <p style={{marginBottom:0}}>Die Kurvenform ist absichtlich generisch. Reale Motoren haben stark typabhängige Kennfelder; Gangübersetzung, Verluste, Luftwiderstand und Reifen bestimmen daraus erst die Fahrzeugbeschleunigung. „Mehr Drehzahl = mehr Kraft“ gilt daher nicht allgemein.</p>
  </div>;
}
