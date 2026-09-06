'use client';

import { useMemo, useState } from 'react';

export default function DmsRosetteExperiment() {
  const [ea,setEa]=useState(500);
  const [eb,setEb]=useState(250);
  const [ec,setEc]=useState(-100);

  const result = useMemo(() => {
    const ex = ea;
    const ey = ec;
    const gxy = 2 * eb - ea - ec;
    const mean = (ex + ey) / 2;
    const radius = Math.sqrt(Math.pow((ex - ey) / 2, 2) + Math.pow(gxy / 2, 2));
    const e1 = mean + radius;
    const e2 = mean - radius;
    const theta = 0.5 * Math.atan2(gxy, ex - ey) * 180 / Math.PI;
    return { ex, ey, gxy, e1, e2, theta };
  }, [ea,eb,ec]);

  return <div style={{border:'1px solid #d8d4ca',borderRadius:12,padding:16,background:'#fff'}}>
    <h4 style={{marginTop:0}}>DMS-Rosette 0°/45°/90°</h4>
    <p>Aus drei Dehnungen lässt sich im ebenen Dehnungszustand die Dehnungstransformation rekonstruieren.</p>
    <label>εa bei 0°: <strong>{ea} µm/m</strong><input type="range" min="-1000" max="1500" step="25" value={ea} onChange={e=>setEa(+e.target.value)} style={{width:'100%'}}/></label>
    <label>εb bei 45°: <strong>{eb} µm/m</strong><input type="range" min="-1000" max="1500" step="25" value={eb} onChange={e=>setEb(+e.target.value)} style={{width:'100%'}}/></label>
    <label>εc bei 90°: <strong>{ec} µm/m</strong><input type="range" min="-1000" max="1500" step="25" value={ec} onChange={e=>setEc(+e.target.value)} style={{width:'100%'}}/></label>
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:8,margin:'14px 0'}}>
      <div style={{padding:10,border:'1px solid #ddd',borderRadius:8}}>ε₁<br/><strong>{result.e1.toFixed(0)} µm/m</strong></div>
      <div style={{padding:10,border:'1px solid #ddd',borderRadius:8}}>ε₂<br/><strong>{result.e2.toFixed(0)} µm/m</strong></div>
      <div style={{padding:10,border:'1px solid #ddd',borderRadius:8}}>Richtung ε₁<br/><strong>{result.theta.toFixed(1)}°</strong></div>
    </div>
    <p style={{marginBottom:0}}>Das Modell rekonstruiert Hauptdehnungen, nicht automatisch Hauptspannungen. Für Spannungen braucht man zusätzlich ein geeignetes Materialgesetz, zum Beispiel E-Modul, Querkontraktionszahl und eine Annahme über den Spannungszustand.</p>
  </div>;
}
