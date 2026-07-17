'use client';
/**
 * FourStrokeExperiment — EXP:VIERTAKT
 * Four-stroke engine animation: intake, compression, combustion, exhaust
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

type Stroke = 0 | 1 | 2 | 3;
const STROKES = [
  { name: 'Ansaugen', color: '#5B8FB9', desc: 'Kolben fährt runter, Einlassventil öffnet — Luft-Kraftstoff-Gemisch strömt ein.', valve: 'in' },
  { name: 'Verdichten', color: '#C9A84C', desc: 'Beide Ventile geschlossen, Kolben fährt hoch — Gemisch wird auf ~1/10 komprimiert. Druck steigt auf ~12 bar.', valve: 'none' },
  { name: 'Zündung & Arbeit', color: '#DC143C', desc: 'Zündkerze feuert — Explosion treibt Kolben runter. Das ist der einzige Takt der Kraft erzeugt.', valve: 'none' },
  { name: 'Ausstoßen', color: '#7AAD7A', desc: 'Auslassventil öffnet, Kolben fährt hoch — Abgase werden ausgestoßen.', valve: 'out' },
];

function draw(canvas: HTMLCanvasElement, stroke: Stroke, progress: number) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr; canvas.height = 220 * dpr;
  const ctx = canvas.getContext('2d')!; ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = 220;
  ctx.fillStyle = '#0a1628'; ctx.fillRect(0, 0, W, H);

  const cx = W / 2, cyTop = 30, cyBot = H - 20;
  const cylW = 60, cylH = cyBot - cyTop - 40;
  const cylX = cx - cylW / 2;

  // Kolben position: strokes 0,3 go down then up; stroke 1,2 go up then down
  let pistonPos: number; // 0=top, 1=bottom
  if (stroke === 0) pistonPos = progress;       // down
  else if (stroke === 1) pistonPos = 1 - progress; // up
  else if (stroke === 2) pistonPos = progress;   // down (power)
  else pistonPos = 1 - progress;                  // up

  const pistonY = cyTop + 40 + pistonPos * (cylH - 30);

  // Cylinder walls
  ctx.strokeStyle = '#888'; ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cylX, cyTop + 40); ctx.lineTo(cylX, cyBot - 10);
  ctx.moveTo(cylX + cylW, cyTop + 40); ctx.lineTo(cylX + cylW, cyBot - 10);
  ctx.stroke();

  // Cylinder top
  ctx.fillStyle = '#555'; ctx.fillRect(cylX - 4, cyTop + 36, cylW + 8, 8);

  // Valves
  const s = STROKES[stroke];
  const inOpen = s.valve === 'in';
  const outOpen = s.valve === 'out';

  // Intake valve (left)
  ctx.fillStyle = inOpen ? '#5B8FB9' : '#444';
  ctx.fillRect(cylX - 12, cyTop + 30, 8, inOpen ? 12 : 6);
  ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.font = '8px monospace'; ctx.textAlign = 'center';
  ctx.fillText('IN', cylX - 8, cyTop + 22);

  // Exhaust valve (right)
  ctx.fillStyle = outOpen ? '#7AAD7A' : '#444';
  ctx.fillRect(cylX + cylW + 4, cyTop + 30, 8, outOpen ? 12 : 6);
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.fillText('OUT', cylX + cylW + 8, cyTop + 22);

  // Gas fill
  const gasH = pistonY - cyTop - 44;
  if (gasH > 0) {
    let gasColor: string;
    if (stroke === 0) gasColor = 'rgba(91,143,185,0.4)'; // air/fuel mix (blue)
    else if (stroke === 1) gasColor = 'rgba(201,168,76,0.5)'; // compressed (gold)
    else if (stroke === 2) {
      gasColor = progress < 0.15 ? 'rgba(255,255,100,0.8)' : 'rgba(220,20,60,0.4)'; // explosion then exhaust
    } else gasColor = 'rgba(120,120,120,0.3)'; // exhaust gas
    ctx.fillStyle = gasColor;
    ctx.fillRect(cylX + 1, cyTop + 44, cylW - 2, gasH);

    // Spark at combustion start
    if (stroke === 2 && progress < 0.12) {
      ctx.beginPath(); ctx.arc(cx, cyTop + 48, 4 + progress * 20, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,0,0.8)'; ctx.shadowColor = '#FF0'; ctx.shadowBlur = 15;
      ctx.fill(); ctx.shadowBlur = 0;
    }
  }

  // Piston
  const pistonGrad = ctx.createLinearGradient(cylX, pistonY, cylX + cylW, pistonY);
  pistonGrad.addColorStop(0, '#666'); pistonGrad.addColorStop(0.5, '#AAA'); pistonGrad.addColorStop(1, '#666');
  ctx.fillStyle = pistonGrad;
  ctx.fillRect(cylX + 2, pistonY, cylW - 4, 18);

  // Connecting rod
  const crankY = cyBot - 15;
  const crankAngle = (stroke * Math.PI / 2) + progress * Math.PI / 2;
  const crankR = 18;
  const crankX = cx + Math.sin(crankAngle) * crankR;
  ctx.strokeStyle = '#888'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(cx, pistonY + 9); ctx.lineTo(crankX, crankY); ctx.stroke();

  // Crank circle
  ctx.strokeStyle = '#666'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(cx, crankY, crankR, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(crankX, crankY, 4, 0, Math.PI * 2);
  ctx.fillStyle = '#C9A84C'; ctx.fill();

  // Stroke label
  ctx.fillStyle = STROKES[stroke].color; ctx.font = 'bold 12px monospace'; ctx.textAlign = 'center';
  ctx.fillText(STROKES[stroke].name, cx, H - 6);
}

export default function FourStrokeExperiment() {
  const [stroke, setStroke] = useState<Stroke>(0);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const animRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => { if (canvasRef.current) draw(canvasRef.current, stroke, progress); }, [stroke, progress]);

  const animate = useCallback((ts: number) => {
    if (!startRef.current) startRef.current = ts;
    const elapsed = (ts - startRef.current) / 800;
    const totalProgress = elapsed % 4;
    const newStroke = Math.floor(totalProgress) as Stroke;
    const newProgress = totalProgress - Math.floor(totalProgress);
    setStroke(newStroke); setProgress(newProgress);
    animRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (playing) { startRef.current = 0; animRef.current = requestAnimationFrame(animate); }
    else if (animRef.current) cancelAnimationFrame(animRef.current);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [playing, animate]);

  useEffect(() => {
    const obs = new ResizeObserver(() => { if (canvasRef.current) draw(canvasRef.current, stroke, progress); });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [stroke, progress]);

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Viertakt-Motor</strong></div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
        {STROKES.map((s, i) => (
          <button key={i} onClick={() => { setPlaying(false); setStroke(i as Stroke); setProgress(0.5); }} style={{
            padding: '4px 10px', fontFamily: 'var(--font-mono)', fontSize: 10,
            border: '1.5px solid ' + (stroke === i ? s.color : 'var(--border)'),
            borderRadius: 4, background: stroke === i ? s.color + '22' : 'var(--soft)',
            color: stroke === i ? 'var(--navy)' : 'var(--muted)', cursor: 'pointer',
          }}>{i + 1}. {s.name}</button>
        ))}
      </div>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 220, borderRadius: 6, border: '1px solid var(--border)', background: '#0a1628' }} />
      <button onClick={() => setPlaying(!playing)} style={{
        marginTop: 10, width: '100%', padding: '9px 0', borderRadius: 6, border: 'none',
        background: playing ? '#DC143C' : 'var(--navy)', color: '#fff',
        fontFamily: 'var(--font-mono)', fontSize: 12, cursor: 'pointer',
      }}>{playing ? '⏸ Pause' : '▶ Motor starten'}</button>
      <div style={{ marginTop: 10, padding: '10px 14px', background: 'var(--surface)', borderRadius: 6, border: '1px solid var(--border)', fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.6 }}>
        <strong style={{ color: STROKES[stroke].color }}>{STROKES[stroke].name}:</strong> {STROKES[stroke].desc}
      </div>
    </div>
  );
}
