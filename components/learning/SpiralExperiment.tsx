'use client';
/**
 * SpiralExperiment — EXP:POLARKURVEN + EXP:SCHMIEGEKREIS
 * Three modes:
 * 1. Spiralen-Baukasten: a, b sliders, nature presets, live canvas
 * 2. Schmiegekreis: curvature visualization on parametric curve
 * 3. Natur-Vergleich: Schnecke / Sonnenblume / Galaxie presets
 *
 * Math:
 * Logarithmische Spirale: r(φ) = a * e^(b*φ)
 * Archimedische Spirale:  r(φ) = a + b*φ
 * Krümmung: κ = |r²+2(r')²-r*r''| / (r²+(r')²)^(3/2)
 * Schmiegekreis-Radius: R = 1/κ
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

type SpiralType = 'log' | 'arch' | 'fermat';

const NATURE_PRESETS = [
  { name: '🐚 Nautilus', type: 'log' as SpiralType, a: 1, b: 0.17, label: 'Nautilus-Muschel — goldene logarithmische Spirale' },
  { name: '🌻 Sonnenblume', type: 'log' as SpiralType, a: 0.5, b: 0.25, label: 'Sonnenblume — Fibonacci-Wachstum' },
  { name: '🌀 Galaxie', type: 'log' as SpiralType, a: 0.3, b: 0.12, label: 'Spiralgalaxie — flache logarithmische Spirale' },
  { name: '🏛️ Archimedisch', type: 'arch' as SpiralType, a: 0, b: 0.15, label: 'Archimedische Spirale — gleichmäßige Spirale (Uhrfeder, Schallplatte)' },
  { name: '🌿 Fermat', type: 'fermat' as SpiralType, a: 1, b: 0.4, label: 'Fermat-Spirale — r²=a²φ, Samen in Sonnenblumenköpfen' },
];

function computeSpiral(type: SpiralType, a: number, b: number, maxPhi: number, steps = 600): [number, number][] {
  const pts: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const phi = (i / steps) * maxPhi * Math.PI * 2;
    let r: number;
    if (type === 'log')    r = a * Math.exp(b * phi);
    else if (type === 'arch') r = a + b * phi;
    else                   r = a * Math.sqrt(phi) * b;
    pts.push([r * Math.cos(phi), r * Math.sin(phi)]);
  }
  return pts;
}

function curvatureAt(type: SpiralType, a: number, b: number, phi: number): number {
  const h = 0.001;
  function r(p: number) {
    if (type === 'log')  return a * Math.exp(b * p);
    if (type === 'arch') return a + b * p;
    return a * Math.sqrt(p) * b;
  }
  const rv = r(phi), rp = (r(phi+h)-r(phi-h))/(2*h), rpp = (r(phi+h)-2*rv+r(phi-h))/(h*h);
  const num = Math.abs(rv*rv + 2*rp*rp - rv*rpp);
  const den = Math.pow(rv*rv + rp*rp, 1.5);
  return den < 1e-10 ? 0 : num / den;
}

function drawSpiral(
  canvas: HTMLCanvasElement,
  type: SpiralType, a: number, b: number,
  showOsculating: boolean, phi0: number
) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  const ctx = canvas.getContext('2d')!;
  ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = canvas.offsetHeight;
  ctx.fillStyle = '#0a1628'; ctx.fillRect(0, 0, W, H);

  const pts = computeSpiral(type, a, b, 4);
  if (pts.length < 2) return;

  // Auto-scale
  const maxR = Math.max(...pts.map(([x,y]) => Math.sqrt(x*x+y*y)));
  const scale = maxR > 0 ? Math.min(W, H) * 0.44 / maxR : 1;
  const cx = W/2, cy = H/2;

  // Grid
  ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 0.5;
  for (let r = scale; r < Math.max(W,H); r += scale) {
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.stroke();
  }

  // Spiral
  ctx.strokeStyle = '#C9A84C'; ctx.lineWidth = 2;
  ctx.shadowColor = '#C9A84C'; ctx.shadowBlur = 6;
  ctx.beginPath();
  pts.forEach(([x, y], i) => {
    const sx = cx + x * scale, sy = cy - y * scale;
    i === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
  });
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Osculating circle
  if (showOsculating) {
    const phi = phi0 * Math.PI * 2;
    let rv: number;
    if (type === 'log')  rv = a * Math.exp(b * phi);
    else if (type === 'arch') rv = a + b * phi;
    else rv = a * Math.sqrt(phi) * b;

    const px = cx + rv * Math.cos(phi) * scale;
    const py = cy - rv * Math.sin(phi) * scale;
    const kappa = curvatureAt(type, a, b, phi);
    const R = kappa > 0.001 ? 1/kappa : 999;
    const Rscaled = Math.min(R * scale, 200);

    // Point on curve
    ctx.fillStyle = '#DC143C'; ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI*2); ctx.fill();

    // Osculating circle
    ctx.strokeStyle = 'rgba(91,143,185,0.6)'; ctx.lineWidth = 1.5;
    ctx.setLineDash([4,4]);
    ctx.beginPath(); ctx.arc(px, py, Rscaled, 0, Math.PI*2); ctx.stroke();
    ctx.setLineDash([]);

    // Labels
    ctx.fillStyle = '#DC143C'; ctx.font = '10px monospace'; ctx.textAlign = 'left';
    ctx.fillText('P(φ=' + (phi0*360).toFixed(0) + '°)', px+8, py-8);
    ctx.fillStyle = 'rgba(91,143,185,0.8)'; ctx.font = '9px monospace';
    ctx.fillText('R=' + (R < 100 ? R.toFixed(2) : '∞'), px+8, py+14);
    ctx.fillText('κ=' + kappa.toFixed(3), px+8, py+26);
  }

  // Center dot
  ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.beginPath(); ctx.arc(cx, cy, 3, 0, Math.PI*2); ctx.fill();
}

type Mode = 'baukasten' | 'nature' | 'osculating';

export default function SpiralExperiment() {
  const [mode, setMode] = useState<Mode>('baukasten');
  const [spiralType, setSpiralType] = useState<SpiralType>('log');
  const [a, setA] = useState(1.0);
  const [b, setB] = useState(0.17);
  const [preset, setPreset] = useState(0);
  const [phi0, setPhi0] = useState(1.5);
  const [showOsc, setShowOsc] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Apply preset
  function applyPreset(idx: number) {
    const p = NATURE_PRESETS[idx];
    setPreset(idx); setSpiralType(p.type); setA(p.a); setB(p.b);
  }

  useEffect(() => {
    if (canvasRef.current)
      drawSpiral(canvasRef.current, spiralType, a, b, showOsc, phi0);
  }, [spiralType, a, b, showOsc, phi0]);

  useEffect(() => {
    const obs = new ResizeObserver(() => {
      if (canvasRef.current)
        drawSpiral(canvasRef.current, spiralType, a, b, showOsc, phi0);
    });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [spiralType, a, b, showOsc, phi0]);

  const MODES: { id: Mode; emoji: string; label: string }[] = [
    { id: 'baukasten',  emoji: '🎨', label: 'Baukasten' },
    { id: 'nature',     emoji: '🐚', label: 'Natur' },
    { id: 'osculating', emoji: '⭕', label: 'Schmiegekreis' },
  ];

  const kappa = showOsc ? curvatureAt(spiralType, a, b, phi0 * Math.PI * 2) : 0;

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}>
        <span className={styles.label}>Experiment</span>
        <strong>Spiralen — Baukasten, Natur & Schmiegekreis</strong>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:6, marginBottom:12 }}>
        {MODES.map(m => (
          <button key={m.id} onClick={() => { setMode(m.id); setShowOsc(m.id === 'osculating'); }} style={{
            padding:'7px 4px', borderRadius:7, textAlign:'center',
            border:'1.5px solid '+(mode===m.id ? '#C9A84C':'var(--border)'),
            background: mode===m.id ? '#C9A84C22':'var(--soft)',
            color: mode===m.id ? 'var(--navy)':'var(--muted)',
            fontFamily:'var(--font-mono)', fontSize:10, cursor:'pointer',
          }}>
            <span style={{ display:'block', fontSize:16, marginBottom:2 }}>{m.emoji}</span>
            {m.label}
          </button>
        ))}
      </div>

      {/* Baukasten controls */}
      {mode === 'baukasten' && (
        <>
          <div style={{ display:'flex', gap:8, marginBottom:10, flexWrap:'wrap' }}>
            {(['log','arch','fermat'] as SpiralType[]).map(t => (
              <button key={t} onClick={() => setSpiralType(t)} style={{
                padding:'4px 10px', borderRadius:5, fontSize:10,
                fontFamily:'var(--font-mono)', letterSpacing:'.04em',
                border:'1.5px solid '+(spiralType===t ? '#C9A84C':'var(--border)'),
                background: spiralType===t ? '#C9A84C22':'var(--soft)',
                color: spiralType===t ? 'var(--navy)':'var(--muted)', cursor:'pointer',
              }}>
                {t === 'log' ? 'Logarithmisch' : t === 'arch' ? 'Archimedisch' : 'Fermat'}
              </button>
            ))}
          </div>
          <label className={styles.sliderLabel} htmlFor="sp-a">
            <span>Wachstumsfaktor a</span><strong>{a.toFixed(2)}</strong>
          </label>
          <input id="sp-a" type="range" min={0.1} max={2} step={0.05} value={a}
            onChange={e => setA(+e.target.value)} />
          <label className={styles.sliderLabel} htmlFor="sp-b" style={{ marginTop:6 }}>
            <span>Drehgeschwindigkeit b</span><strong>{b.toFixed(3)}</strong>
          </label>
          <input id="sp-b" type="range" min={0.05} max={0.6} step={0.005} value={b}
            onChange={e => setB(+e.target.value)} />
        </>
      )}

      {/* Nature presets */}
      {mode === 'nature' && (
        <div style={{ display:'grid', gap:6, marginBottom:10 }}>
          {NATURE_PRESETS.map((p, i) => (
            <button key={i} onClick={() => applyPreset(i)} style={{
              padding:'8px 12px', borderRadius:7, textAlign:'left',
              border:'1.5px solid '+(preset===i ? '#C9A84C':'var(--border)'),
              background: preset===i ? '#C9A84C18':'var(--soft)',
              fontFamily:'var(--font-mono)', fontSize:11, cursor:'pointer',
              display:'flex', gap:8, alignItems:'center',
            }}>
              <span style={{ fontSize:18 }}>{p.name.split(' ')[0]}</span>
              <span style={{ color: preset===i ? 'var(--navy)':'var(--muted)' }}>{p.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Osculating circle controls */}
      {mode === 'osculating' && (
        <>
          <label className={styles.sliderLabel} htmlFor="phi-sl">
            <span>Punkt auf Kurve φ</span>
            <strong>{(phi0*360).toFixed(0)}°</strong>
          </label>
          <input id="phi-sl" type="range" min={0.1} max={3.8} step={0.05} value={phi0}
            onChange={e => setPhi0(+e.target.value)} />
          <div style={{ display:'flex', gap:8, marginTop:8, flexWrap:'wrap' }}>
            {(['log','arch'] as SpiralType[]).map(t => (
              <button key={t} onClick={() => setSpiralType(t)} style={{
                padding:'4px 10px', borderRadius:5, fontSize:10,
                fontFamily:'var(--font-mono)',
                border:'1.5px solid '+(spiralType===t ? '#5B8FB9':'var(--border)'),
                background: spiralType===t ? '#5B8FB922':'var(--soft)',
                color: spiralType===t ? '#5B8FB9':'var(--muted)', cursor:'pointer',
              }}>{t === 'log' ? 'Logarithmisch' : 'Archimedisch'}</button>
            ))}
          </div>
        </>
      )}

      <canvas ref={canvasRef} style={{
        display:'block', width:'100%', height:220,
        borderRadius:8, border:'1px solid var(--border)',
        marginTop:10, background:'#0a1628',
      }} />

      <div className={styles.stats} style={{ marginTop:10 }}>
        {mode === 'osculating' ? (
          <>
            <div><span>Krümmung κ</span>
              <strong style={{ color: kappa > 1 ? '#DC143C' : kappa > 0.3 ? '#C9A84C' : '#7AAD7A' }}>
                {kappa.toFixed(4)}
              </strong>
            </div>
            <div><span>Schmiegekreis-R</span>
              <strong>{kappa > 0.001 ? (1/kappa).toFixed(2) : '∞'}</strong>
            </div>
            <div style={{ gridColumn:'span 2' }}>
              <span>Bedeutung</span>
              <strong style={{ fontSize:11 }}>
                {kappa > 1 ? 'Starke Krümmung — enger Bogen, kleiner Schmiegekreis'
                  : kappa > 0.3 ? 'Mittlere Krümmung — wie eine weite Kurve auf der Autobahn'
                  : 'Flache Krümmung — fast eine Gerade, großer Schmiegekreis'}
              </strong>
            </div>
          </>
        ) : (
          <>
            <div><span>Spiraltyp</span>
              <strong>{spiralType === 'log' ? 'r = a·eᵇᵠ' : spiralType === 'arch' ? 'r = a + b·φ' : 'r = a·√φ·b'}</strong>
            </div>
            <div><span>Parameter</span>
              <strong>a={a.toFixed(2)}, b={b.toFixed(3)}</strong>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
