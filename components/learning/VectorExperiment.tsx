'use client';
/**
 * VectorExperiment — 2D vector addition with parallelogram canvas
 * Covers: EXP:VEC-RECHNER
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

function drawVectors(canvas: HTMLCanvasElement, ax:number, ay:number, bx:number, by:number) {
  const dpr = window.devicePixelRatio||1;
  canvas.width = canvas.offsetWidth*dpr; canvas.height = 260*dpr;
  const ctx = canvas.getContext('2d')!; ctx.scale(dpr,dpr);
  const W = canvas.offsetWidth, H = 260;
  const cx = W/2, cy = H/2, s = 22;
  ctx.fillStyle='#0a1628'; ctx.fillRect(0,0,W,H);
  // Grid
  ctx.strokeStyle='rgba(255,255,255,.05)'; ctx.lineWidth=1;
  for(let i=-7;i<=7;i++){
    ctx.beginPath();ctx.moveTo(cx+i*s,0);ctx.lineTo(cx+i*s,H);ctx.stroke();
    ctx.beginPath();ctx.moveTo(0,cy+i*s);ctx.lineTo(W,cy+i*s);ctx.stroke();
  }
  ctx.strokeStyle='rgba(255,255,255,.12)'; ctx.lineWidth=1.5;
  ctx.beginPath();ctx.moveTo(0,cy);ctx.lineTo(W,cy);ctx.stroke();
  ctx.beginPath();ctx.moveTo(cx,0);ctx.lineTo(cx,H);ctx.stroke();

  const sx=ax+bx, sy=ay+by;
  // Parallelogram ghost
  ctx.strokeStyle='rgba(255,255,255,.08)'; ctx.lineWidth=1; ctx.setLineDash([4,4]);
  ctx.beginPath();ctx.moveTo(cx+ax*s,cy-ay*s);ctx.lineTo(cx+sx*s,cy-sy*s);ctx.stroke();
  ctx.beginPath();ctx.moveTo(cx+bx*s,cy-by*s);ctx.lineTo(cx+sx*s,cy-sy*s);ctx.stroke();
  ctx.setLineDash([]);

  function arrow(x1:number,y1:number,x2:number,y2:number,col:string,lbl:string){
    ctx.strokeStyle=col; ctx.fillStyle=col; ctx.lineWidth=2.5;
    ctx.shadowColor=col; ctx.shadowBlur=5;
    ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
    const ang=Math.atan2(y2-y1,x2-x1);
    ctx.beginPath(); ctx.moveTo(x2,y2);
    ctx.lineTo(x2-10*Math.cos(ang-.4),y2-10*Math.sin(ang-.4));
    ctx.lineTo(x2-10*Math.cos(ang+.4),y2-10*Math.sin(ang+.4));
    ctx.closePath(); ctx.fill(); ctx.shadowBlur=0;
    ctx.font='bold 11px monospace'; ctx.fillText(lbl,x2+6,y2-4);
  }
  arrow(cx,cy,cx+bx*s,cy-by*s,'#5B8FB9','b⃗');
  arrow(cx,cy,cx+ax*s,cy-ay*s,'#C9A84C','a⃗');
  arrow(cx,cy,cx+sx*s,cy-sy*s,'#7AAD7A','a+b');
  ctx.fillStyle='rgba(255,255,255,.25)'; ctx.font='9px monospace'; ctx.textAlign='center';
  ctx.fillText('— a⃗  — b⃗  — a⃗+b⃗', W/2, H-6);
}

export default function VectorExperiment() {
  const [v, setV] = useState({ax:3,ay:2,bx:1,by:3});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(()=>{ if(canvasRef.current) drawVectors(canvasRef.current,v.ax,v.ay,v.bx,v.by); },[v]);
  useEffect(()=>{
    const obs=new ResizeObserver(()=>{ if(canvasRef.current) drawVectors(canvasRef.current,v.ax,v.ay,v.bx,v.by); });
    if(canvasRef.current) obs.observe(canvasRef.current);
    return()=>obs.disconnect();
  },[v]);

  const magA = Math.sqrt(v.ax**2+v.ay**2).toFixed(2);
  const magB = Math.sqrt(v.bx**2+v.by**2).toFixed(2);
  const magS = Math.sqrt((v.ax+v.bx)**2+(v.ay+v.by)**2).toFixed(2);

  type Key = 'ax'|'ay'|'bx'|'by';
  const sliders: {label:string;key:Key;color:string}[] = [
    {label:'ax',key:'ax',color:'#C9A84C'},{label:'ay',key:'ay',color:'#C9A84C'},
    {label:'bx',key:'bx',color:'#5B8FB9'},{label:'by',key:'by',color:'#5B8FB9'},
  ];

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}>
        <span className={styles.label}>Interaktives Experiment</span>
        <strong>Vektoraddition — Parallelogramm</strong>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:10}}>
        {sliders.map(({label,key,color})=>(
          <div key={key}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}>
              <span style={{fontFamily:'var(--font-mono)',fontSize:11,color}}>{label}</span>
              <strong style={{fontFamily:'var(--font-mono)',fontSize:12,color:'var(--navy)'}}>{v[key]}</strong>
            </div>
            <input type="range" min="-5" max="5" step="1" value={v[key]}
              onChange={e=>setV(p=>({...p,[key]:+e.target.value}))}
              style={{width:'100%',accentColor:color}} />
          </div>
        ))}
      </div>
      <canvas ref={canvasRef} style={{display:'block',width:'100%',height:260,borderRadius:6,
        border:'1px solid var(--border)',background:'#0a1628'}} />
      <div className={styles.stats} style={{marginTop:10}}>
        <div><span>|a⃗|</span><strong>{magA}</strong></div>
        <div><span>|b⃗|</span><strong>{magB}</strong></div>
        <div style={{gridColumn:'span 2'}}>
          <span>a⃗ + b⃗</span>
          <strong>({v.ax+v.bx}, {v.ay+v.by}) &nbsp;|= {magS}</strong>
        </div>
      </div>
    </div>
  );
}
