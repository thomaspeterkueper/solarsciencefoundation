'use client';

import { useState } from 'react';

const solutes = [
  { name: 'Kochsalz', type: 'ionisch', water: 'gut', oil: 'schlecht', note: 'Hydratation der Ionen ist entscheidend.' },
  { name: 'Zucker', type: 'polar', water: 'gut', oil: 'schlecht', note: 'Viele polare OH-Gruppen wechselwirken mit Wasser.' },
  { name: 'Speiseöl', type: 'überwiegend unpolar', water: 'schlecht', oil: 'gut', note: 'Unpolare Molekülbereiche werden in unpolarer Umgebung günstiger solvatisiert.' },
  { name: 'Ethanol', type: 'amphiphil', water: 'gut', oil: 'begrenzt', note: 'Polare OH-Gruppe und unpolarer Alkylrest machen einfache Kategorien unvollständig.' },
];

export default function PolaritySolubilityExperiment() {
  const [index, setIndex] = useState(0);
  const solute = solutes[index];
  return <div style={{border:'1px solid #d8d4ca',borderRadius:12,padding:16,background:'#fff'}}>
    <h4 style={{marginTop:0}}>Polarität und Löslichkeit: eine Faustregel, kein Naturgesetz</h4>
    <p>Wähle einen Stoff und vergleiche qualitativ seine Wechselwirkungen mit Wasser und einer unpolaren Phase.</p>
    <label>Stoff: <select value={index} onChange={e=>setIndex(+e.target.value)}>{solutes.map((s,i)=><option key={s.name} value={i}>{s.name}</option>)}</select></label>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,margin:'14px 0'}}>
      <div style={{padding:12,border:'1px solid #ddd',borderRadius:8}}>in Wasser<br/><strong>{solute.water}</strong></div>
      <div style={{padding:12,border:'1px solid #ddd',borderRadius:8}}>in unpolarer Phase<br/><strong>{solute.oil}</strong></div>
    </div>
    <p>Stoffcharakter: <strong>{solute.type}</strong>. {solute.note}</p>
    <p style={{marginBottom:0}}>„Gleiches löst sich in Gleichem“ ist eine nützliche Heuristik, aber keine vollständige Löslichkeitstheorie. Temperatur, konkrete Molekülstruktur, Mischungsenthalpie/-entropie, Ionisierung und Konzentration können entscheidend sein.</p>
  </div>;
}
