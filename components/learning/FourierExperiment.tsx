'use client';
/**
 * FourierExperiment — Fourier synthesizer with Web Audio + canvas
 * Covers: EXP:FOURIER
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

type WaveType = 'saw' | 'square' | 'triangle';

function getFourierTerms(wave: WaveType, N: number): {n:number;amp:number}[] {
  const terms: {n:number;amp:number}[] = [];
  for (let n = 1; n <= N; n++) {
    let amp = 0;
    if (wave === 'saw')      amp = 2 * Math.pow(-1, n+1) / n;
    else if (wave === 'square' && n%2===1) amp = 4 / (Math.PI * n);
    else if (wave === 'triangle' && n%2===1) amp = 8 / (Math.PI**2 * n**2) * Math.pow(-1,(n-1)/2);
    if (amp !== 0) terms.push({n, amp});
  }
  return terms;
}

function drawFourier(canvas: HTMLCanvasElement, wave: WaveType, N: number) {
  const dpr = window.devicePixelRatio||1;
  canvas.width = canvas.offsetWidth*dpr; canvas.height = 110*dpr;
  const ctx = canvas.getContext('2d')!; ctx.scale(dpr,dpr);
  const W = canvas.offsetWidth, H = 110;
  ctx.fillStyle='#0a1628'; ctx.fillRect(0,0,W,H);
  ctx.strokeStyle='rgba(255,255,255,.06)'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(0,H/2); ctx.lineTo(W,H/2); ctx.stroke();
  const terms = getFourierTerms(wave,N);
  const maxAmp = wave==='saw'?2:wave==='square'?4/Math.PI:8/Math.PI**2;
  // Target waveform (grey)
  ctx.beginPath(); ctx.strokeStyle='rgba(255,255,255,.15)'; ctx.lineWidth=1.5;
  for(let px=0;px<W;px++){
    const t=px/W*2*Math.PI;
    let y = wave==='saw' ? t/Math.PI-1
           : wave==='square' ? (t<Math.PI?1:-1)
           : 1-2*Math.abs(t-Math.PI)/Math.PI;
    const py=H/2-y*(H/2-8);
    px===0?ctx.moveTo(px,py):ctx.lineTo(px,py);
  }
  ctx.stroke();
  // Fourier sum (gold)
  ctx.beginPath(); ctx.strokeStyle='#C9A84C'; ctx.lineWidth=2;
  ctx.shadowColor='#C9A84C'; ctx.shadowBlur=4;
  for(let px=0;px<W;px++){
    const t=px/W*2*Math.PI;
    const y=terms.reduce((s,{n,amp})=>s+amp*Math.sin(n*t),0)/maxAmp;
    const py=H/2-y*(H/2-8);
    px===0?ctx.moveTo(px,py):ctx.lineTo(px,py);
  }
  ctx.stroke(); ctx.shadowBlur=0;
  ctx.fillStyle='rgba(255,255,255,.3)'; ctx.font='9px monospace'; ctx.textAlign='left';
  ctx.fillText(`N=${N} Oberton${N!==1?'e':''}`,6,H-6);
  ctx.textAlign='right';
  ctx.fillText('— Ziel  — Fourier-Summe',W-6,H-6);
}

const FREQS = [55,110,165,220,330,440];

export default function FourierExperiment() {
  const [wave, setWave] = useState<WaveType>('saw');
  const [N, setN]       = useState(1);
  const [freqIdx, setFreqIdx] = useState(3);
  const [playing, setPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef  = useRef<AudioContext|null>(null);
  const oscsRef   = useRef<OscillatorNode[]>([]);
  const masterRef = useRef<GainNode|null>(null);

  useEffect(()=>{ if(canvasRef.current) drawFourier(canvasRef.current,wave,N); },[wave,N]);
  useEffect(()=>{
    const obs=new ResizeObserver(()=>{ if(canvasRef.current) drawFourier(canvasRef.current,wave,N); });
    if(canvasRef.current) obs.observe(canvasRef.current);
    return()=>obs.disconnect();
  },[wave,N]);

  const stopAudio = useCallback(()=>{
    if(masterRef.current){ masterRef.current.gain.setTargetAtTime(0,masterRef.current.context.currentTime,0.05); }
    setTimeout(()=>{ oscsRef.current.forEach(o=>{try{o.stop();}catch{}}); oscsRef.current=[]; },200);
    setPlaying(false);
  },[]);

  const startAudio = useCallback(()=>{
    const ctx = audioRef.current ??= new AudioContext();
    if(ctx.state==='suspended') ctx.resume();
    const master = ctx.createGain(); master.gain.value=0;
    master.gain.setTargetAtTime(0.18,ctx.currentTime,0.05);
    master.connect(ctx.destination); masterRef.current=master;
    const f0 = FREQS[freqIdx];
    const terms = getFourierTerms(wave,N);
    oscsRef.current = terms.map(({n,amp})=>{
      const osc=ctx.createOscillator(); const g=ctx.createGain();
      osc.type='sine'; osc.frequency.value=f0*n; g.gain.value=Math.abs(amp)/2;
      osc.connect(g); g.connect(master); osc.start(); return osc;
    });
    setPlaying(true);
  },[wave,N,freqIdx]);

  useEffect(()=>{ if(playing){stopAudio();setTimeout(startAudio,250);} },[wave,N,freqIdx]);
  useEffect(()=>{ return()=>stopAudio(); },[]);

  const waveLabels: Record<WaveType,string> = {saw:'Sägezahn',square:'Rechteck',triangle:'Dreieck'};
  const noteLabel = N===1?'Nur Grundton — reiner Sinuston.'
    :N<=3?'Erste Obertöne — leichte Eckigkeit.'
    :N<=8?'Charakteristischer Klang entsteht.'
    :'Nah am Original — Gibbs-Phänomen sichtbar.';

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}>
        <span className={styles.label}>Interaktives Experiment</span>
        <strong>Fourier-Synthesizer</strong>
      </div>

      {/* Wave selector */}
      <div style={{display:'flex',gap:6,marginBottom:14}}>
        {(['saw','square','triangle'] as WaveType[]).map(w=>(
          <button key={w} onClick={()=>setWave(w)} style={{
            padding:'5px 12px',fontFamily:'var(--font-mono)',fontSize:10,
            letterSpacing:'.05em',textTransform:'uppercase',
            border:`1.5px solid ${wave===w?'var(--gold)':'var(--border)'}`,
            borderRadius:4,
            background:wave===w?'var(--gold-bg)':'var(--soft)',
            color:wave===w?'var(--navy)':'var(--muted)',cursor:'pointer'
          }}>{waveLabels[w]}</button>
        ))}
      </div>

      {/* N slider */}
      <label className={styles.sliderLabel} htmlFor="fourier-n">
        <span>Obertöne N</span><strong>{N}</strong>
      </label>
      <input id="fourier-n" type="range" min="1" max="20" value={N}
        onChange={e=>setN(+e.target.value)} />

      {/* Freq slider */}
      <label className={styles.sliderLabel} htmlFor="fourier-freq" style={{marginTop:8}}>
        <span>Grundfrequenz</span><strong>{FREQS[freqIdx]} Hz</strong>
      </label>
      <input id="fourier-freq" type="range" min="0" max="5" value={freqIdx}
        onChange={e=>setFreqIdx(+e.target.value)} />

      {/* Canvas */}
      <canvas ref={canvasRef} style={{display:'block',width:'100%',height:110,borderRadius:6,
        border:'1px solid var(--border)',marginTop:14,background:'#0a1628'}} />

      {/* Play button */}
      <button onClick={playing?stopAudio:startAudio} style={{
        marginTop:12,width:'100%',padding:'9px 0',
        background:playing?'var(--gold)':'var(--navy)',
        color:playing?'var(--navy)':'#fff',
        border:'none',borderRadius:6,cursor:'pointer',
        fontFamily:'var(--font-mono)',fontSize:13,letterSpacing:'.04em'
      }}>
        {playing ? '■ Stopp' : '▶ Klang abspielen'}
      </button>

      <p style={{marginTop:10,fontSize:12.5,color:'var(--muted)',lineHeight:1.5}}>{noteLabel}</p>
    </div>
  );
}
