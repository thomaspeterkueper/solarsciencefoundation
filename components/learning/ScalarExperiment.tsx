'use client';
/**
 * ScalarExperiment — EXP:SKALAR
 * Dot product: angle slider, projection canvas
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

function drawScalar(canvas: HTMLCanvasElement, alpha: number, magA: number, magB: number) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr; canvas.height = 180 * dpr;
  const ctx = canvas.getContext('2d')!; ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = 180;
  ctx.fillStyle = '#0a1628'; ctx.fillRect(0, 0, W, H);
  const cx = W * 0.3, cy = H * 0.65, s = 28;
  const aRad = alpha * Math.PI / 180;
  const bx = magB * s, by = 0;
  const ax = magA * Math.cos(aRad) * s, ay = -magA * Math.sin(aRad) * s;
  const proj = magA * Math.cos(aRad);
  // Projection dashed
  ctx.strokeStyle = 'rgba(201,168,76,.3)'; ctx.lineWidth = 1; ctx.setLineDash([4, 3]);
  ctx.beginPath(); ctx.moveTo(cx + ax, cy + ay); ctx.lineTo(cx + proj * s, cy); ctx.stroke();
  ctx.setLineDash([]);
  // Projection bracket
  if (Math.abs(proj) > 0.3) {
    ctx.strokeStyle = 'rgba(201,168,76,.5)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(cx, cy + 10); ctx.lineTo(cx + proj * s, cy + 10); ctx.stroke();
  }
  // Angle arc
  ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(cx, cy, 26, 0, -aRad, aRad < 0); ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,.45)'; ctx.font = '10px monospace'; ctx.textAlign = 'left';
  ctx.fillText('α', cx + 30 * Math.cos(aRad / 2) - 4, cy - 30 * Math.sin(aRad / 2) + 4);
  // Vectors
  const arrow = (x1: number, y1: number, x2: number, y2: number, col: string, lbl: string) => {
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 2.5;
    ctx.shadowColor = col; ctx.shadowBlur = 5;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    const ang = Math.atan2(y2 - y1, x2 - x1);
    ctx.beginPath(); ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - 10 * Math.cos(ang - .4), y2 - 10 * Math.sin(ang - .4));
    ctx.lineTo(x2 - 10 * Math.cos(ang + .4), y2 - 10 * Math.sin(ang + .4));
    ctx.closePath(); ctx.fill(); ctx.shadowBlur = 0;
    ctx.font = 'bold 11px monospace'; ctx.fillText(lbl, x2 + 6, y2 - 4);
  };
  arrow(cx, cy, cx + bx, cy + by, '#5B8FB9', 'b⃗');
  arrow(cx, cy, cx + ax, cy + ay, '#C9A84C', 'a⃗');
  const dot = magA * magB * Math.cos(aRad);
  ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.font = '10px monospace'; ctx.textAlign = 'center';
  ctx.fillText('a⃗ · b⃗ = ' + dot.toFixed(2), W * 0.75, H - 10);
}

export default function ScalarExperiment() {
  const [alpha, setAlpha] = useState(45);
  const [magA, setMagA] = useState(4);
  const [magB, setMagB] = useState(3);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cosA = Math.cos(alpha * Math.PI / 180);
  const dot = magA * magB * cosA;

  useEffect(() => { if (canvasRef.current) drawScalar(canvasRef.current, alpha, magA, magB); }, [alpha, magA, magB]);
  useEffect(() => {
    const obs = new ResizeObserver(() => { if (canvasRef.current) drawScalar(canvasRef.current, alpha, magA, magB); });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [alpha, magA, magB]);

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Skalarprodukt a⃗ · b⃗ = |a||b|cos α</strong></div>
      <label className={styles.sliderLabel} htmlFor="sc-a"><span>Winkel α</span><strong>{alpha}°</strong></label>
      <input id="sc-a" type="range" min="0" max="180" value={alpha} onChange={e => setAlpha(+e.target.value)} />
      <label className={styles.sliderLabel} htmlFor="sc-ma" style={{ marginTop: 8 }}><span>|a⃗|</span><strong>{magA.toFixed(1)}</strong></label>
      <input id="sc-ma" type="range" min="1" max="6" step="0.5" value={magA} onChange={e => setMagA(+e.target.value)} />
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 180, borderRadius: 6, border: '1px solid var(--border)', marginTop: 12, background: '#0a1628' }} />
      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>a⃗ · b⃗</span><strong style={{ color: Math.abs(dot) < 0.05 ? '#DC143C' : 'var(--ok-t)', fontSize: 16 }}>{dot.toFixed(3)}</strong></div>
        <div><span>cos α</span><strong>{cosA.toFixed(3)}</strong></div>
        <div><span>Orthogonal?</span><strong style={{ color: Math.abs(dot) < 0.05 ? '#DC143C' : 'var(--muted)' }}>{Math.abs(dot) < 0.05 ? 'ja ⊥' : 'nein'}</strong></div>
        <div><span>Projektion</span><strong>{(magA * cosA).toFixed(3)}</strong></div>
      </div>
    </div>
  );
}
