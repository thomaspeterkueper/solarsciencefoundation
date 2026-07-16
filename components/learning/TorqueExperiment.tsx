'use client';
/**
 * TorqueExperiment — EXP:DREHMOMENT
 * Lever arm, force, angle → M = r × F · sin(α), canvas
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

function drawTorque(canvas: HTMLCanvasElement, r: number, F: number, alpha: number, M: number) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr; canvas.height = 200 * dpr;
  const ctx = canvas.getContext('2d')!; ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = 200;
  ctx.fillStyle = '#0a1628'; ctx.fillRect(0, 0, W, H);
  const px = W * 0.28, py = H * 0.55, armScale = 110;
  // Pivot
  ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI * 2);
  ctx.fillStyle = '#fff'; ctx.fill();
  ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2);
  ctx.fillStyle = '#0a1628'; ctx.fill();
  // Arm
  const armEndX = px + r * armScale, armEndY = py;
  ctx.strokeStyle = '#8A8880'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(armEndX, armEndY); ctx.stroke();
  // Force arrow
  const aRad = (90 - alpha) * Math.PI / 180;
  const fLen = Math.min(F * 0.55, 90);
  const fEndX = armEndX + Math.cos(aRad) * fLen, fEndY = armEndY - Math.sin(aRad) * fLen;
  ctx.strokeStyle = '#DC143C'; ctx.fillStyle = '#DC143C'; ctx.lineWidth = 2.5;
  ctx.shadowColor = '#DC143C'; ctx.shadowBlur = 5;
  ctx.beginPath(); ctx.moveTo(armEndX, armEndY); ctx.lineTo(fEndX, fEndY); ctx.stroke();
  const ang = Math.atan2(fEndY - armEndY, fEndX - armEndX);
  ctx.beginPath(); ctx.moveTo(fEndX, fEndY);
  ctx.lineTo(fEndX - 10 * Math.cos(ang - .4), fEndY - 10 * Math.sin(ang - .4));
  ctx.lineTo(fEndX - 10 * Math.cos(ang + .4), fEndY - 10 * Math.sin(ang + .4));
  ctx.closePath(); ctx.fill(); ctx.shadowBlur = 0;
  ctx.fillStyle = '#DC143C'; ctx.font = '10px monospace'; ctx.textAlign = 'left';
  ctx.fillText('F = ' + F + ' N', fEndX + 6, fEndY);
  // Moment arc
  const sinA = Math.sin(alpha * Math.PI / 180);
  const mColor = Math.abs(M) > 0.1 ? '#7AAD7A' : 'rgba(120,120,120,.4)';
  ctx.strokeStyle = mColor; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(px, py, 32, -Math.PI / 2, Math.PI / 2, M < 0); ctx.stroke();
  // Efficiency bar
  const effW = (W * 0.6) * sinA;
  ctx.fillStyle = 'rgba(255,255,255,.06)'; ctx.fillRect(W * 0.35, H - 20, W * 0.6, 7);
  ctx.fillStyle = mColor; ctx.fillRect(W * 0.35, H - 20, effW, 7);
  // Labels
  ctx.fillStyle = mColor; ctx.font = 'bold 14px monospace'; ctx.textAlign = 'center';
  ctx.fillText('M = ' + M.toFixed(2) + ' N·m', W * 0.65, H - 28);
  ctx.fillStyle = '#8A8880'; ctx.font = '9px monospace';
  ctx.fillText('r = ' + r.toFixed(2) + ' m', px + r * armScale / 2, py - 10);
  ctx.fillText('sin(' + alpha + '°) = ' + sinA.toFixed(2), W * 0.65, H - 10);
}

export default function TorqueExperiment() {
  const [r, setR] = useState(0.30);
  const [F, setF] = useState(50);
  const [alpha, setAlpha] = useState(90);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const M = r * F * Math.sin(alpha * Math.PI / 180);

  useEffect(() => { if (canvasRef.current) drawTorque(canvasRef.current, r, F, alpha, M); }, [r, F, alpha]);
  useEffect(() => {
    const obs = new ResizeObserver(() => { if (canvasRef.current) drawTorque(canvasRef.current, r, F, alpha, M); });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [r, F, alpha, M]);

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Drehmoment M = r × F · sin α</strong></div>
      <label className={styles.sliderLabel} htmlFor="tq-r"><span>Hebelarm r</span><strong>{r.toFixed(2)} m</strong></label>
      <input id="tq-r" type="range" min="0.05" max="1.0" step="0.01" value={r} onChange={e => setR(+e.target.value)} />
      <label className={styles.sliderLabel} htmlFor="tq-f" style={{ marginTop: 8 }}><span>Kraft F</span><strong>{F} N</strong></label>
      <input id="tq-f" type="range" min="5" max="200" value={F} onChange={e => setF(+e.target.value)} />
      <label className={styles.sliderLabel} htmlFor="tq-a" style={{ marginTop: 8 }}><span>Winkel α</span><strong>{alpha}°</strong></label>
      <input id="tq-a" type="range" min="0" max="180" value={alpha} onChange={e => setAlpha(+e.target.value)} />
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 200, borderRadius: 6, border: '1px solid var(--border)', marginTop: 12, background: '#0a1628' }} />
      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>M</span><strong style={{ color: Math.abs(M) > 0.1 ? 'var(--ok-t)' : 'var(--muted)', fontSize: 18 }}>{M.toFixed(2)} N·m</strong></div>
        <div><span>Effizienz</span><strong>{Math.round(Math.abs(Math.sin(alpha * Math.PI / 180)) * 100)} %</strong></div>
      </div>
    </div>
  );
}
