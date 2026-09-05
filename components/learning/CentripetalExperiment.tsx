'use client';

import { useState } from 'react';

export default function CentripetalExperiment(){
  const [speed,setSpeed]=useState(5);
  const [radius,setRadius]=useState(3);
  const [mass,setMass]=useState(1);
  const acceleration=speed*speed/radius;
  const force=mass*acceleration;
  return <div style={{border:'1px solid #d8d4ca',borderRadius:12,padding:16,background:'#fff'}}>
    <h4 style={{marginTop:0}}>Kreisbewegung: Was hält den Körper auf der Bahn?</h4>
    <p>Bei einer Kreisbewegung ändert sich ständig die Richtung der Geschwindigkeit. Dafür ist eine zum Zentrum gerichtete Beschleunigung nötig.</p>
    <label>Geschwindigkeit: <strong>{speed.toFixed(1)} m/s</strong><input type="range" min="1" max="15" step="0.5" value={speed} onChange={e=>setSpeed(+e.target.value)} style={{width:'100%'}}/></label>
    <label>Radius: <strong>{radius.toFixed(1)} m</strong><input type="range" min="0.5" max="10" step="0.5" value={radius} onChange={e=>setRadius(+e.target.value)} style={{width:'100%'}}/></label>
    <label>Masse: <strong>{mass.toFixed(1)} kg</strong><input type="range" min="0.2" max="5" step="0.2" value={mass} onChange={e=>setMass(+e.target.value)} style={{width:'100%'}}/></label>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,margin:'14px 0'}}><div style={{padding:10,border:'1px solid #ddd',borderRadius:8}}>a = v²/r<br/><strong>{acceleration.toFixed(1)} m/s²</strong></div><div style={{padding:10,border:'1px solid #ddd',borderRadius:8}}>F = m·v²/r<br/><strong>{force.toFixed(1)} N</strong></div></div>
    <p style={{marginBottom:0}}>Das Modell beschreibt die Zentripetalbeschleunigung in einem Inertialsystem. Eine sogenannte Zentrifugalkraft kann als Scheinkraft in einem mitrotierenden Bezugssystem eingeführt werden; sie ist nicht dasselbe wie Drehmoment.</p>
  </div>;
}
