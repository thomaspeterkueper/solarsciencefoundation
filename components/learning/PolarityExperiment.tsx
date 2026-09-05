'use client';

import { useState } from 'react';

export default function PolarityExperiment() {
  const [difference, setDifference] = useState(1.4);
  const [symmetric, setSymmetric] = useState(false);
  const bondDipole = Math.min(1, difference / 2.5);
  const molecularDipole = symmetric ? 0 : bondDipole;

  return (
    <div style={{border:'1px solid #d8d4ca',borderRadius:12,padding:16,background:'#fff'}}>
      <h4 style={{marginTop:0}}>Polarität: Bindungspol und Molekülgeometrie</h4>
      <p>Verändere die vereinfachte Elektronegativitätsdifferenz und schalte zwischen asymmetrischer und symmetrischer Anordnung um.</p>
      <label>Elektronegativitätsdifferenz: <strong>{difference.toFixed(1)}</strong><input type="range" min="0" max="2.5" step="0.1" value={difference} onChange={e=>setDifference(+e.target.value)} style={{width:'100%'}} /></label>
      <button onClick={()=>setSymmetric(v=>!v)} style={{margin:'12px 0',padding:'8px 12px'}}>{symmetric?'Symmetrische Anordnung':'Asymmetrische Anordnung'} → wechseln</button>
      <div style={{height:150,position:'relative',border:'1px solid #ddd',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',gap:symmetric?70:25}}>
        <div style={{width:48,height:48,borderRadius:'50%',background:'#eee',display:'grid',placeItems:'center'}}>δ+</div>
        <div style={{height:8,width:100,background:'linear-gradient(90deg,#bbb,#555)',position:'relative'}}><span style={{position:'absolute',top:-28,left:`${15 + bondDipole*55}%`}}>→</span></div>
        <div style={{width:58,height:58,borderRadius:'50%',background:'#ddd',display:'grid',placeItems:'center'}}>δ−</div>
        {symmetric&&<><div style={{height:8,width:100,background:'linear-gradient(90deg,#555,#bbb)',position:'relative'}}><span style={{position:'absolute',top:-28,right:`${15 + bondDipole*55}%`}}>←</span></div><div style={{width:48,height:48,borderRadius:'50%',background:'#eee',display:'grid',placeItems:'center'}}>δ+</div></>}
      </div>
      <p><strong>Vereinfachtes resultierendes Dipolmaß: {(molecularDipole*100).toFixed(0)}%</strong></p>
      <p style={{marginBottom:0}}>Erkenntnis: Polare Bindungen allein garantieren kein permanentes Moleküldipolmoment. Die räumliche Anordnung der Bindungsdipole entscheidet mit. Das Modell visualisiert das Prinzip qualitativ und berechnet keine reale Moleküleigenschaft.</p>
    </div>
  );
}
