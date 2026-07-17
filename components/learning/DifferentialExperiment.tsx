'use client';
/**
 * DifferentialExperiment — EXP:DIFFERENTIAL-MECHANIK/SIMULATION/VERGLEICH
 * Differential gear: inner/outer wheels rotate at different speeds in curves
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

function drawDiff(canvas: HTMLCanvasElement, curve: number, locked: boolean, tick: number) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr; canvas.height = 190 * dpr;
  const ctx = canvas.getContext('2d')!; ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = 190;
  ctx.fillStyle = '#0a1628'; ctx.fillRect(0,0,W,H);

  const roadY = H * 0.62;
  // Road
  ctx.fillStyle = '#2A2A2A'; ctx.fillRect(0, roadY-20, W, 50);
  ctx.strokeStyle = '#555'; ctx.lineWidth = 1; ctx.setLineDash([12,8]);
  ctx.beginPath(); ctx.moveTo(0,roadY); ctx.lineTo(W,roadY); ctx.stroke();
  ctx.setLineDash([]);

  // Car
  const cx = W/2, cy = roadY-28;
  ctx.fillStyle = '#5B8FB9'; ctx.fillRect(cx-44, cy-14, 88, 26);
  ctx.fillStyle = '#4A7A9B'; ctx.fillRect(cx-30, cy-28, 60, 16);

  // Differential
  const outerRpm = curve === 0 ? 60 : 60 * (1 + Math.abs(curve)/80);
  const innerRpm = curve === 0 ? 60 : locked ? outerRpm : 60 * (1 - Math.abs(curve)/80);
  const slipping = locked && curve !== 0 && Math.abs(innerRpm - outerRpm) > 8;

  const diffColor = slipping ? '#DC143C' : curve === 0 ? '#7AAD7A' : '#C9A84C';
  ctx.beginPath(); ctx.arc(cx, cy+8, 9, 0, Math.PI*2);
  ctx.fillStyle = diffColor+'44'; ctx.fill();
  ctx.strokeStyle = diffColor; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = diffColor; ctx.font = 'bold 9px monospace'; ctx.textAlign = 'center';
  ctx.fillText(locked ? '⚡' : 'Δ', cx, cy+12);

  // Wheels
  const track = 42;
  ([[-track,'L',innerRpm],[track,'R',outerRpm]] as [number,string,number][]).forEach(([dx,side,rpm]) => {
    const wx = cx+dx, wy = roadY+6;
    const isSlip = slipping && dx < 0;
    ctx.beginPath(); ctx.arc(wx, wy, 14, 0, Math.PI*2);
    ctx.fillStyle = isSlip ? '#DC143C33' : '#333'; ctx.fill();
    ctx.strokeStyle = isSlip ? '#DC143C' : '#888'; ctx.lineWidth = 2; ctx.stroke();
    const ang = tick * rpm * 0.002;
    ctx.strokeStyle = isSlip ? '#DC143C' : '#C9A84C'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(wx,wy); ctx.lineTo(wx+Math.cos(ang)*11, wy+Math.sin(ang)*11); ctx.stroke();
    ctx.fillStyle = isSlip ? '#DC143C' : 'rgba(255,255,255,.55)';
    ctx.font = '8px monospace'; ctx.textAlign = 'center';
    ctx.fillText(Math.round(rpm)+' rpm', wx, wy+24);
    ctx.fillStyle = 'rgba(255,255,255,.3)';
    ctx.fillText(side, wx, wy+33);
    if (isSlip) { ctx.fillStyle='#DC143C'; ctx.fillText('SLIP',wx,wy+42); }
  });
}

export default function DifferentialExperiment() {
  const [curve, setCurve] = useState(0);
  const [locked, setLocked] = useState(false);
  const [tick, setTick] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<ReturnType<typeof setInterval>|null>(null);

  useEffect(() => {
    animRef.current = setInterval(() => setTick(t=>t+1), 50);
    return () => { if (animRef.current) clearInterval(animRef.current); };
  }, []);
  useEffect(() => { if (canvasRef.current) drawDiff(canvasRef.current, curve, locked, tick); }, [curve,locked,tick]);
  useEffect(() => {
    const obs = new ResizeObserver(() => { if (canvasRef.current) drawDiff(canvasRef.current, curve, locked, tick); });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [curve,locked,tick]);

  const outerRpm = curve===0 ? 60 : 60*(1+Math.abs(curve)/80);
  const innerRpm = curve===0 ? 60 : locked ? outerRpm : 60*(1-Math.abs(curve)/80);
  const slip = locked && curve!==0;

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Ausgleichsgetriebe — Kurvenfahrt</strong></div>
      <label className={styles.sliderLabel} htmlFor="df-c">
        <span>Kurve</span>
        <strong>{curve===0?'Geradeaus':curve>0?'Rechtskurve':'Linkskurve'} ({Math.abs(curve)})</strong>
      </label>
      <input id="df-c" type="range" min="-70" max="70" value={curve} onChange={e=>setCurve(+e.target.value)} />
      <button onClick={()=>setLocked(!locked)} style={{
        marginTop:10, width:'100%', padding:'8px', borderRadius:6,
        border:'1.5px solid '+(locked?'#DC143C':'var(--border)'),
        background:locked?'#DC143C22':'var(--soft)', color:locked?'#DC143C':'var(--muted)',
        fontFamily:'var(--font-mono)', fontSize:11, cursor:'pointer',
      }}>{locked?'🔒 Differential gesperrt (starr)':'✓ Differential offen (normal)'}</button>
      <canvas ref={canvasRef} style={{display:'block',width:'100%',height:190,borderRadius:6,border:`2px solid ${slip?'#DC143C':'var(--border)'}`,marginTop:10,background:'#0a1628'}} />
      <div className={styles.stats} style={{marginTop:10}}>
        <div><span>Innenrad</span><strong style={{color:slip?'#DC143C':'var(--ok-t)'}}>{Math.round(innerRpm)} rpm</strong></div>
        <div><span>Außenrad</span><strong>{Math.round(outerRpm)} rpm</strong></div>
        <div style={{gridColumn:'span 2'}}>
          <span>Ergebnis</span>
          <strong style={{fontSize:12,color:slip?'#DC143C':'var(--ok-t)'}}>
            {slip?'⚠ Innenrad schleift — Reifenverschleiß, Untersteuern':
             curve===0?'Geradeaus: beide Räder identisch':'✓ Differential gleicht Drehzahl aus'}
          </strong>
        </div>
      </div>
    </div>
  );
}
