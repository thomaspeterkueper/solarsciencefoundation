'use client';
import { useState } from 'react';

const materials = {
  Glas: { open: 5, note: 'Die Oberfläche ist im Modell nahezu dicht.' },
  'glasierte Fliese': { open: 10, note: 'Die Glasur begrenzt das Eindringen; Fugen sind ein eigener Werkstoff.' },
  Marmor: { open: 35, note: 'Naturstein kann Flüssigkeit aufnehmen; Gefüge und Oberflächenbehandlung variieren.' },
  Sandstein: { open: 75, note: 'Ein offeneres Porensystem kann deutlich mehr Flüssigkeit aufnehmen.' },
};
export default function SurfacePorosityExperiment(){
 const [material,setMaterial]=useState<keyof typeof materials>('Glas'); const [time,setTime]=useState(20); const m=materials[material]; const penetration=Math.round(m.open*time/100);
 return <div style={{display:'grid',gap:12}}><strong>Porosität: Material statt Staubmodell</strong><label>Material <select value={material} onChange={e=>setMaterial(e.target.value as keyof typeof materials)}>{Object.keys(materials).map(x=><option key={x}>{x}</option>)}</select></label><label>Kontaktzeit: {time}<input type="range" min="0" max="100" value={time} onChange={e=>setTime(+e.target.value)} style={{width:'100%'}}/></label><div style={{height:24,border:'1px solid currentColor'}}><div style={{width:`${penetration}%`,height:'100%',background:'currentColor',opacity:.25}}/></div><p style={{margin:0}}>{m.note} Die Balkenlänge ist eine didaktische, qualitative Darstellung und kein Messwert für reale Eindringtiefe.</p></div>;
}
