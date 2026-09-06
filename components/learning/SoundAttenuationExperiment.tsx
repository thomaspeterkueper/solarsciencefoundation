'use client';

import { useState } from 'react';

export default function SoundAttenuationExperiment() {
  const [lowLoss,setLowLoss]=useState(8);
  const [highLoss,setHighLoss]=useState(22);
  const bands=[125,250,500,1000,2000,4000];
  const input=[72,76,78,76,71,68];
  const output=input.map((level,i)=>level-(lowLoss+(highLoss-lowLoss)*i/(bands.length-1)));

  return <div style={{border:'1px solid #d8d4ca',borderRadius:12,padding:16,background:'#fff'}}>
    <h4 style={{marginTop:0}}>Schalldämmung: Ein- und Ausgangsspektrum vergleichen</h4>
    <p>Eine Dämmwirkung ist frequenzabhängig. Das Modell zeigt deshalb nicht nur „weniger Schall“, sondern wie ein Eingangsspektrum bandweise abgeschwächt wird.</p>
    <label>Dämpfung tiefer Frequenzen: <strong>{lowLoss} dB</strong><input type="range" min="0" max="40" value={lowLoss} onChange={e=>setLowLoss(+e.target.value)} style={{width:'100%'}}/></label>
    <label>Dämpfung hoher Frequenzen: <strong>{highLoss} dB</strong><input type="range" min="0" max="50" value={highLoss} onChange={e=>setHighLoss(+e.target.value)} style={{width:'100%'}}/></label>
    <div style={{display:'grid',gridTemplateColumns:'repeat(6,minmax(0,1fr))',gap:6,alignItems:'end',height:180,margin:'16px 0'}}>{bands.map((f,i)=><div key={f} style={{textAlign:'center'}}><div style={{display:'flex',gap:3,alignItems:'end',justifyContent:'center',height:130}}><span title="Eingang" style={{display:'inline-block',width:12,height:`${input[i]}%`,background:'#999'}}/><span title="Ausgang" style={{display:'inline-block',width:12,height:`${Math.max(5,output[i])}%`,background:'#444'}}/></div><small>{f} Hz</small></div>)}</div>
    <p style={{marginBottom:0}}>Die Pegel sind didaktische Beispielwerte, keine Materialdaten. Reale Schalldämmung hängt von Frequenz, Bauteilaufbau, Masse, Steifigkeit, Fugen, Resonanzen und Flankenwegen ab. Eine Fourier-Analyse kann Spektren zerlegen; sie ersetzt kein Dämmmodell.</p>
  </div>;
}
