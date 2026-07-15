'use client';
/**
 * DensityErrorExperiment — error propagation for sphere density
 * Covers: EXP:KUGELDICHTE
 */
import { useState } from 'react';
import styles from './RayleighExperiment.module.css';

export default function DensityErrorExperiment() {
  const [m, setM]   = useState(100);
  const [dm, setDm] = useState(0.5);
  const [r, setR]   = useState(3.0);
  const [dr, setDr] = useState(0.05);

  const errM = (dm/m)*100;
  const errR = 3*(dr/r)*100;
  const total = errM + errR;
  const maxBar = Math.max(errM, errR, 0.01);

  const note = errR > errM*2
    ? 'Radius dominiert — r genauer messen hilft am meisten.'
    : errM > errR*2
    ? 'Masse dominiert — m genauer messen hilft am meisten.'
    : 'Beide tragen ähnlich bei.';

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}>
        <span className={styles.label}>Interaktives Experiment</span>
        <strong>Kugeldichte — Fehlerfortpflanzung</strong>
      </div>
      <p className={styles.copy}>ρ = 3m/(4πr³) &nbsp;→&nbsp; Δρ/ρ = Δm/m + 3·Δr/r</p>

      {([
        {label:'Masse m',val:m,set:setM,min:50,max:500,step:10,unit:'g'},
        {label:'Fehler Δm',val:dm,set:setDm,min:0.1,max:10,step:0.1,unit:'g'},
        {label:'Radius r',val:r,set:setR,min:1,max:10,step:0.1,unit:'cm'},
        {label:'Fehler Δr',val:dr,set:setDr,min:0.01,max:1,step:0.01,unit:'cm'},
      ] as const).map(({label,val,set,min,max,step,unit})=>(
        <div key={label} style={{marginBottom:10}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}>
            <span className={styles.sliderLabel} style={{marginBottom:0}}><span>{label}</span></span>
            <strong style={{fontFamily:'var(--font-mono)',fontSize:12,color:'var(--navy)'}}>{val.toFixed(2)} {unit}</strong>
          </div>
          <input type="range" min={min} max={max} step={step} value={val}
            onChange={e => (set as (v:number)=>void)(+e.target.value)} />
        </div>
      ))}

      {/* Error bars */}
      <div style={{background:'var(--navy)',borderRadius:8,padding:'14px 16px',marginTop:8}}>
        <div style={{fontFamily:'var(--font-mono)',fontSize:12,color:'#E8D9A8',marginBottom:10}}>
          Δρ/ρ = Δm/m + 3·Δr/r
        </div>
        {[
          {label:'Δm/m ×1',val:errM,color:'#C9A84C'},
          {label:'Δr/r ×3',val:errR,color:'#5B8FB9'},
        ].map(({label,val,color})=>(
          <div key={label} style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
            <span style={{fontFamily:'var(--font-mono)',fontSize:10,color:'rgba(255,255,255,.6)',width:64}}>{label}</span>
            <div style={{flex:1,height:8,background:'rgba(255,255,255,.1)',borderRadius:4,overflow:'hidden'}}>
              <div style={{height:'100%',borderRadius:4,background:color,
                width:`${Math.min(100,(val/maxBar)*100)}%`,transition:'width .3s'}} />
            </div>
            <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'rgba(255,255,255,.8)',minWidth:50,textAlign:'right'}}>
              {val.toFixed(2)} %
            </span>
          </div>
        ))}
        <div style={{borderTop:'1px solid rgba(255,255,255,.1)',paddingTop:8,marginTop:4,
          fontFamily:'var(--font-mono)',fontSize:16,color:'#fff'}}>
          Δρ/ρ = <strong style={{color:'#C9A84C'}}>{total.toFixed(2)} %</strong>
        </div>
      </div>
      <p style={{marginTop:10,fontSize:12.5,color:'var(--muted)',lineHeight:1.5}}>{note}</p>
    </div>
  );
}
