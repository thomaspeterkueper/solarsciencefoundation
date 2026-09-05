'use client';

import { useState } from 'react';

export default function OsmosisExperiment(){
  const [left,setLeft]=useState(2); const [right,setRight]=useState(8); const [permeable,setPermeable]=useState(true);
  const direction=!permeable?'kein Nettofluss im Modell':left===right?'kein bevorzugter Nettofluss':left<right?'Wasser bevorzugt nach rechts':'Wasser bevorzugt nach links';
  const delta=Math.abs(right-left);
  return <div style={{border:'1px solid #d8d4ca',borderRadius:12,padding:16,background:'#f8f6f1'}}>
    <h4 style={{marginTop:0}}>Osmose: Was kann die Membran passieren?</h4>
    <p>Dieses qualitative Modell betrachtet zwei Lösungen, getrennt durch eine Membran, die Wasser passieren lässt, die dargestellten gelösten Teilchen aber nicht.</p>
    <label>Gelöste Teilchen links: {left}<input type="range" min="0" max="10" value={left} onChange={e=>setLeft(+e.target.value)} style={{width:'100%'}}/></label>
    <label>Gelöste Teilchen rechts: {right}<input type="range" min="0" max="10" value={right} onChange={e=>setRight(+e.target.value)} style={{width:'100%'}}/></label>
    <button onClick={()=>setPermeable(v=>!v)} style={{margin:'10px 0',padding:'8px 12px'}}>Membran für Wasser: {permeable?'durchlässig':'undurchlässig'}</button>
    <div style={{display:'grid',gridTemplateColumns:'1fr 8px 1fr',height:150,border:'1px solid #bbb'}}><div style={{display:'grid',placeItems:'center',background:`rgba(70,130,180,${.12+left*.025})`}}>links<br/>{'• '.repeat(left)}</div><div style={{background:permeable?'repeating-linear-gradient(0deg,#777 0 5px,transparent 5px 10px)':'#555'}}/><div style={{display:'grid',placeItems:'center',background:`rgba(70,130,180,${.12+right*.025})`}}>rechts<br/>{'• '.repeat(right)}</div></div>
    <p><strong>{direction}</strong>{permeable&&delta>0?` · Konzentrationsunterschied im Schema: ${delta}`:''}</p>
    <p style={{marginBottom:0}}>Erkenntnis: Osmose hängt von einer selektiv permeablen Membran und Unterschieden im chemischen Potential des Wassers ab. Die Teilchenkonzentration dient hier nur als anschaulicher Spezialfall; Druck, weitere gelöste Stoffe und Nichtidealität sind nicht modelliert.</p>
  </div>;
}
