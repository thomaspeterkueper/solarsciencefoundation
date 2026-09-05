'use client';

import { useState } from 'react';

export default function HydrogenBondExperiment() {
  const [distance,setDistance]=useState(45);
  const [aligned,setAligned]=useState(true);
  const favorable = aligned && distance >= 30 && distance <= 60;
  return <div style={{border:'1px solid #d8d4ca',borderRadius:12,padding:16,background:'#fff'}}>
    <h4 style={{marginTop:0}}>Wasserstoffbrücke: Donor, Akzeptor und Geometrie</h4>
    <p>Eine Wasserstoffbrücke ist keine beliebige Verbindung zwischen Molekülen. Erkunde qualitativ, warum Abstand und Orientierung eine Rolle spielen.</p>
    <label>Abstand im Schema: <strong>{distance}</strong><input type="range" min="10" max="100" value={distance} onChange={e=>setDistance(+e.target.value)} style={{width:'100%'}} /></label>
    <button onClick={()=>setAligned(v=>!v)} style={{margin:'12px 0',padding:'8px 12px'}}>Orientierung: {aligned?'günstig':'ungünstig'}</button>
    <div style={{height:130,display:'flex',alignItems:'center',justifyContent:'center'}}><span style={{fontSize:30}}>O—H</span><span style={{width:distance*2,borderTop:favorable?'4px dotted #54789b':'2px dashed #bbb',margin:'0 8px',transform:aligned?'none':'rotate(22deg)'}}/><span style={{fontSize:30}}>O</span></div>
    <p><strong>{favorable?'Das Schema zeigt eine geometrisch günstige Donor–H···Akzeptor-Anordnung.':'Die gewählte schematische Anordnung ist für die dargestellte Wechselwirkung ungünstiger.'}</strong></p>
    <p style={{marginBottom:0}}>Das ist ein didaktisches Geometriemodell, keine Potentialenergiekurve und kein universeller Grenzwert für reale Wasserstoffbrücken.</p>
  </div>;
}
