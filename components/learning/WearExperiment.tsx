'use client';

import { useMemo, useState } from 'react';

export default function WearExperiment() {
  const [load, setLoad] = useState(5);
  const [distance, setDistance] = useState(5);
  const [abrasive, setAbrasive] = useState(3);
  const [lubrication, setLubrication] = useState(6);

  const index = useMemo(() => {
    const raw = load * distance * (1 + abrasive / 5) * (1.5 - lubrication / 10);
    return Math.max(0, raw);
  }, [load, distance, abrasive, lubrication]);

  const level = index < 20 ? 'niedrig' : index < 55 ? 'mittel' : 'hoch';

  return <div style={{border:'1px solid #d8d4ca',borderRadius:12,padding:16,background:'#f8f6f1'}}>
    <h4 style={{marginTop:0}}>Verschleiß: Warum Kilometer allein nichts vorhersagen</h4>
    <p>Verändere vier Einflussgrößen. Das Modell erzeugt nur einen relativen Verschleißindex und keine reale Lebensdauerprognose.</p>
    <label>Kontaktlast {load}/10<input type="range" min="1" max="10" value={load} onChange={e=>setLoad(+e.target.value)} style={{width:'100%'}}/></label>
    <label>Gleit-/Betriebsstrecke {distance}/10<input type="range" min="1" max="10" value={distance} onChange={e=>setDistance(+e.target.value)} style={{width:'100%'}}/></label>
    <label>Abrasive Partikel {abrasive}/10<input type="range" min="0" max="10" value={abrasive} onChange={e=>setAbrasive(+e.target.value)} style={{width:'100%'}}/></label>
    <label>Schmierwirkung {lubrication}/10<input type="range" min="0" max="10" value={lubrication} onChange={e=>setLubrication(+e.target.value)} style={{width:'100%'}}/></label>
    <div style={{marginTop:14,height:16,background:'#e5e5e5',borderRadius:8}}><div style={{height:'100%',width:`${Math.min(100,index)}%`,background:'#777',borderRadius:8}}/></div>
    <p><strong>Relativer Verschleißindex: {index.toFixed(1)} · {level}</strong></p>
    <p style={{marginBottom:0}}>Erkenntnis: Verschleiß entsteht aus Kontaktbedingungen, Materialpaarung, Last, Bewegung, Temperatur, Schmierung und Verunreinigungen. Feste Kilometergrenzen sind deshalb kein allgemeines physikalisches Gesetz.</p>
  </div>;
}
