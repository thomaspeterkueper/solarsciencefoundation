'use client';

import { useState } from 'react';

export default function SurfaceVolumeExperiment() {
  const [size, setSize] = useState(2);
  const [count, setCount] = useState(1);
  const totalVolume = count * size ** 3;
  const totalSurface = count * 6 * size ** 2;
  const ratio = totalSurface / totalVolume;
  return <div style={{border:'1px solid #d8d4ca',borderRadius:12,padding:16,background:'#fff'}}>
    <h4 style={{marginTop:0}}>Oberfläche und Volumen: Warum Größe zählt</h4>
    <p>Das geometrische Verhältnis Oberfläche/Volumen beeinflusst, wie stark ein Körper über seine Grenze mit der Umgebung gekoppelt ist.</p>
    <label>Kantenlänge eines Würfels: <strong>{size.toFixed(1)}</strong><input type="range" min="0.5" max="5" step="0.1" value={size} onChange={e=>setSize(+e.target.value)} style={{width:'100%'}} /></label>
    <label>Anzahl gleich großer Würfel: <strong>{count}</strong><input type="range" min="1" max="20" value={count} onChange={e=>setCount(+e.target.value)} style={{width:'100%'}} /></label>
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:8,margin:'14px 0'}}>
      <div style={{padding:10,border:'1px solid #ddd',borderRadius:8}}>Gesamtvolumen<br/><strong>{totalVolume.toFixed(1)}</strong></div>
      <div style={{padding:10,border:'1px solid #ddd',borderRadius:8}}>Gesamtoberfläche<br/><strong>{totalSurface.toFixed(1)}</strong></div>
      <div style={{padding:10,border:'1px solid #ddd',borderRadius:8}}>O/V<br/><strong>{ratio.toFixed(2)}</strong></div>
    </div>
    <p style={{marginBottom:0}}>Bei gleicher Form sinkt Oberfläche/Volumen mit wachsender Kantenlänge. Das ist zunächst reine Geometrie. Welche physikalische Wirkung daraus folgt, hängt zusätzlich etwa von Material, Temperaturdifferenz und Wärmeübergang ab.</p>
  </div>;
}
