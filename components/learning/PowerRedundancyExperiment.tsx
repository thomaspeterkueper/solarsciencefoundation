'use client';

import { useState } from 'react';

export default function PowerRedundancyExperiment() {
  const [night, setNight] = useState(false);
  const [dust, setDust] = useState(false);
  const [battery, setBattery] = useState(true);
  const [generator, setGenerator] = useState(true);
  const [sharedBus, setSharedBus] = useState(true);
  const solar = !night && !dust && sharedBus;
  const batt = battery && sharedBus;
  const gen = generator && sharedBus;
  const available = solar || batt || gen;
  const toggle = (label:string, value:boolean, fn:(v:boolean)=>void) => <button onClick={() => fn(!value)} style={{ padding:'8px 10px', border:'1px solid #bbb', borderRadius:8, background:value?'#e9f4ec':'#f7eaea', cursor:'pointer' }}>{label}: {value?'ja':'nein'}</button>;
  return (
    <div style={{ border:'1px solid #d8d4ca', borderRadius:12, padding:16, background:'#f8f6f1' }}>
      <h4 style={{ marginTop:0 }}>Ausfallversuch: Wann ist Redundanz wirklich unabhängig?</h4>
      <p>Schalte Bedingungen und Komponenten um. Der gemeinsame Leistungsbus demonstriert eine gemeinsame Fehlerursache: Fällt er aus, helfen mehrere Erzeuger allein nicht.</p>
      <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>{toggle('Nacht',night,setNight)}{toggle('Staubsturm',dust,setDust)}{toggle('Batterie verfügbar',battery,setBattery)}{toggle('Reservegenerator verfügbar',generator,setGenerator)}{toggle('gemeinsamer Bus intakt',sharedBus,setSharedBus)}</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))', gap:8, marginTop:14 }}>
        {[['Solar',solar],['Batterie',batt],['Generator',gen]].map(([name,on]) => <div key={String(name)} style={{padding:12,border:'1px solid #ccc',borderRadius:8,background:on?'#e8f5ec':'#f7e7e7'}}><strong>{name}</strong><div>{on?'verfügbar':'nicht verfügbar'}</div></div>)}
      </div>
      <p style={{ fontSize:'1.1rem' }}><strong>{available?'Mindestens ein Versorgungspfad ist verfügbar.':'Versorgungsausfall: kein Pfad kann Leistung liefern.'}</strong></p>
      <p style={{ marginBottom:0 }}>Erkenntnis: Redundanz muss gemeinsame Fehlerursachen berücksichtigen. Mehrere Komponenten hinter demselben kritischen Single Point of Failure bilden keine vollständig unabhängigen Reservepfade.</p>
    </div>
  );
}
