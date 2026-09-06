'use client';

import { useState } from 'react';

export default function EdmAspectRatioExperiment() {
  const [diameter, setDiameter] = useState(0.2);
  const [depth, setDepth] = useState(10);
  const ratio = depth / diameter;
  const relativeWidth = Math.max(3, Math.min(80, diameter * 35));
  const relativeDepth = Math.max(20, Math.min(180, depth * 5));

  return <div style={{border:'1px solid #d8d4ca',borderRadius:12,padding:16,background:'#fff'}}>
    <h4 style={{marginTop:0}}>EDM-Bohrung: Aspektverhältnis statt Werkzeughärte</h4>
    <p>Das Aspektverhältnis einer Bohrung ist Tiefe/Durchmesser. Verändere beide Größen und beobachte, wie schnell eine sehr schlanke Geometrie entsteht.</p>
    <label>Durchmesser: <strong>{diameter.toFixed(2)} mm</strong><input type="range" min="0.05" max="2" step="0.05" value={diameter} onChange={e=>setDiameter(+e.target.value)} style={{width:'100%'}} /></label>
    <label>Tiefe: <strong>{depth.toFixed(1)} mm</strong><input type="range" min="1" max="40" step="1" value={depth} onChange={e=>setDepth(+e.target.value)} style={{width:'100%'}} /></label>
    <div style={{display:'flex',gap:20,alignItems:'center',margin:'14px 0'}}>
      <div style={{width:120,height:200,border:'1px solid #bbb',display:'flex',justifyContent:'center',alignItems:'flex-start',paddingTop:8}}><div aria-label="schematische Bohrung" style={{width:relativeWidth,height:relativeDepth,maxHeight:180,background:'#333',borderRadius:'0 0 8px 8px'}} /></div>
      <div>Aspektverhältnis<br/><strong>{ratio.toFixed(0)} : 1</strong></div>
    </div>
    <p style={{marginBottom:0}}>Das Verhältnis allein entscheidet nicht, welches Fertigungsverfahren eine konkrete Bohrung sicher herstellen kann. Werkstoff, Elektrodengeometrie, Spülung, Prozessparameter, Toleranz und Oberflächenanforderung gehören zur Verfahrenswahl. Deshalb gibt das Modell keine universellen Machbarkeitsgrenzen vor.</p>
  </div>;
}
