'use client';

import { useState } from 'react';

export default function SurfaceTensionExperiment() {
  const [temperature, setTemperature] = useState(20);
  const [surfactant, setSurfactant] = useState(0);
  const thermalFactor = Math.max(0.55, 1 - (temperature - 20) * 0.0045);
  const surfactantFactor = 1 / (1 + 1.8 * surfactant / 100);
  const relativeGamma = thermalFactor * surfactantFactor;

  return <div style={{border:'1px solid #d8d4ca',borderRadius:12,padding:16,background:'#fff'}}>
    <h4 style={{marginTop:0}}>Oberflächenspannung: Energie an einer Grenzfläche</h4>
    <p>Teilchen an einer Flüssigkeitsoberfläche befinden sich in einer anderen Wechselwirkungsumgebung als Teilchen im Inneren. Die Grenzfläche besitzt deshalb eine freie Oberflächenenergie; ihre Verkleinerung ist energetisch günstig.</p>
    <label>Temperatur: <strong>{temperature} °C</strong><input type="range" min="5" max="80" value={temperature} onChange={e=>setTemperature(+e.target.value)} style={{width:'100%'}} /></label>
    <label>relative Tensidzugabe: <strong>{surfactant} %</strong><input type="range" min="0" max="100" value={surfactant} onChange={e=>setSurfactant(+e.target.value)} style={{width:'100%'}} /></label>
    <div style={{margin:'14px 0',padding:12,border:'1px solid #ddd',borderRadius:8}}>relative Oberflächenspannung im Lehrmodell: <strong>{Math.round(relativeGamma*100)} %</strong></div>
    <div style={{display:'flex',gap:6,alignItems:'flex-end',height:100,marginBottom:12}}>{Array.from({length:12}).map((_,i)=><span key={i} style={{display:'inline-block',width:16,height:16,borderRadius:'50%',background:'#777',transform:`translateY(${i%2===0?0:Math.round((1-relativeGamma)*20)}px)`}} />)}</div>
    <p style={{marginBottom:0}}>Temperatur und Tenside können die Oberflächenspannung verändern, aber die Kurve ist hier nur qualitativ. Reale Werte hängen von Stoff, Konzentration, Temperatur und Grenzfläche ab. Kapillarität ist eine Anwendung, nicht dasselbe wie Oberflächenspannung.</p>
  </div>;
}
