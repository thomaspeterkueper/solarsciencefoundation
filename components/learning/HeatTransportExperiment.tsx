'use client';

import { useState } from 'react';

export default function HeatTransportExperiment() {
  const [deltaT,setDeltaT]=useState(30);
  const [area,setArea]=useState(2);
  const [thickness,setThickness]=useState(10);
  const [conductivity,setConductivity]=useState(1);
  const relativeFlux = conductivity * area * deltaT / thickness;
  return <div style={{border:'1px solid #d8d4ca',borderRadius:12,padding:16,background:'#fff'}}>
    <h4 style={{marginTop:0}}>Wärmetransport durch eine Schicht</h4>
    <p>Erkunde die Richtung des stationären Wärmeleitungs-Zusammenhangs: größere Temperaturdifferenz, Fläche und Wärmeleitfähigkeit erhöhen den Wärmestrom; größere Schichtdicke vermindert ihn.</p>
    <label>Temperaturdifferenz: <strong>{deltaT} K</strong><input type="range" min="1" max="80" value={deltaT} onChange={e=>setDeltaT(+e.target.value)} style={{width:'100%'}}/></label>
    <label>relative Fläche: <strong>{area.toFixed(1)}</strong><input type="range" min="0.5" max="5" step="0.1" value={area} onChange={e=>setArea(+e.target.value)} style={{width:'100%'}}/></label>
    <label>relative Dicke: <strong>{thickness}</strong><input type="range" min="2" max="30" value={thickness} onChange={e=>setThickness(+e.target.value)} style={{width:'100%'}}/></label>
    <label>relative Wärmeleitfähigkeit: <strong>{conductivity.toFixed(1)}</strong><input type="range" min="0.1" max="3" step="0.1" value={conductivity} onChange={e=>setConductivity(+e.target.value)} style={{width:'100%'}}/></label>
    <div style={{margin:'14px 0',padding:12,border:'1px solid #ddd',borderRadius:8}}>relativer Wärmeleitungsstrom: <strong>{relativeFlux.toFixed(2)}</strong></div>
    <p style={{marginBottom:0}}>Das Modell zeigt Wärmeleitung nach dem Fourier-Zusammenhang qualitativ. Es ist kein Modell der Wärmekapazität und bildet Konvektion, Strahlung, Kontaktwiderstände und zeitabhängige Temperaturfelder nicht ab.</p>
  </div>;
}
