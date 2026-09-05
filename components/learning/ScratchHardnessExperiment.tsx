'use client';

import { useState } from 'react';

const materials = [
  { name: 'Gips', mohs: 2 },
  { name: 'Calcit', mohs: 3 },
  { name: 'Fluorit', mohs: 4 },
  { name: 'Apatit', mohs: 5 },
  { name: 'Feldspat', mohs: 6 },
  { name: 'Quarz', mohs: 7 },
  { name: 'Topas', mohs: 8 },
  { name: 'Korund', mohs: 9 },
];

export default function ScratchHardnessExperiment() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(5);
  const harder = materials[a].mohs > materials[b].mohs ? materials[a].name : materials[a].mohs < materials[b].mohs ? materials[b].name : 'gleich eingeordnet';

  return <div style={{border:'1px solid #d8d4ca',borderRadius:12,padding:16,background:'#fff'}}>
    <h4 style={{marginTop:0}}>Ritzhärte: Was die Mohs-Skala wirklich sagt</h4>
    <p>Wähle zwei Referenzminerale. Die Mohs-Skala ordnet ihre <strong>Ritzhärte</strong> relativ ein; sie ist keine lineare Skala und kein allgemeines Schadensmodell für technische Oberflächen.</p>
    <label>Material A<select value={a} onChange={e=>setA(+e.target.value)} style={{marginLeft:8}}>{materials.map((m,i)=><option key={m.name} value={i}>{m.name} · Mohs {m.mohs}</option>)}</select></label>
    <br />
    <label>Material B<select value={b} onChange={e=>setB(+e.target.value)} style={{marginLeft:8}}>{materials.map((m,i)=><option key={m.name} value={i}>{m.name} · Mohs {m.mohs}</option>)}</select></label>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginTop:16}}>
      {[materials[a],materials[b]].map(m=><div key={m.name} style={{padding:12,border:'1px solid #ccc',borderRadius:8}}><strong>{m.name}</strong><div>Mohs {m.mohs}</div><div style={{height:12,background:'#eee',borderRadius:6,marginTop:8}}><div style={{height:'100%',width:`${m.mohs*10}%`,background:'#777',borderRadius:6}}/></div></div>)}
    </div>
    <p><strong>Relativ härter eingeordnet: {harder}</strong></p>
    <p style={{marginBottom:0}}>Für Kratzer auf Glas, Beschichtungen, Metallen oder Glaskeramik reichen Mohs-Zahlen allein nicht. Partikelhärte, Geometrie, Anpresskraft, Beschichtung und vorhandene Verschmutzungen wirken ebenfalls mit.</p>
  </div>;
}
