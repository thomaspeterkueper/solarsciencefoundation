'use client';
/**
 * StressExperiment — EXP:SPANNUNG
 * F and d sliders → σ = F/A, rod canvas with force arrows, status color
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

function draw(canvas: HTMLCanvasElement, d: number, sigma: number) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr; canvas.height = 200 * dpr;
  const ctx = canvas.getContext('2d')!; ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = 200;
  ctx.fillStyle = '#F9F8F5'; ctx.fillRect(0, 0, W, H);
  const cx = W / 2, stabH = 120, dScale = Math.min(50, Math.max(6, d * 2.2));
  const stabY = (H - stabH) / 2;
  const danger = sigma > 235;
  const ac = danger ? '#DC143C' : '#1a7a4a';
  // Force arrows
  [20, H - 20].forEach((y, i) => {
    const dir = i === 0 ? 1 : -1;
    ctx.strokeStyle = ac; ctx.fillStyle = ac; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx, y); ctx.lineTo(cx, y + dir * 28); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, y + dir * 28);
    ctx.lineTo(cx - 6, y + dir * 18); ctx.lineTo(cx + 6, y + dir * 18);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = ac; ctx.font = '10px monospace'; ctx.textAlign = 'left'; ctx.fillText('F', cx + 8, y + dir * 4);
  });
  // Rod
  const grad = ctx.createLinearGradient(cx - dScale, 0, cx + dScale, 0);
  grad.addColorStop(0, '#D0D0D0'); grad.addColorStop(0.35, '#F2F2F2'); grad.addColorStop(0.65, '#F2F2F2'); grad.addColorStop(1, '#D0D0D0');
  ctx.fillStyle = grad; ctx.fillRect(cx - dScale / 2, stabY, dScale, stabH);
  ctx.strokeStyle = '#AAA'; ctx.lineWidth = 1; ctx.strokeRect(cx - dScale / 2, stabY, dScale, stabH);
  const alpha = Math.min(0.55, sigma / 470);
  ctx.fillStyle = danger ? `rgba(220,20,60,${alpha})` : `rgba(26,122,74,${alpha * 0.6})`;
  ctx.fillRect(cx - dScale / 2, stabY, dScale, stabH);
  ctx.fillStyle = danger ? '#DC143C' : '#1a7a4a';
  ctx.font = 'bold 12px monospace'; ctx.textAlign = 'center';
  ctx.fillText('σ = ' + sigma.toFixed(0) + ' MPa', cx, H / 2 + 4);
}

export default function StressExperiment() {
  const [F, setF] = useState(10);   // kN
  const [d, setD] = useState(10);   // mm
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const A = Math.PI / 4 * d * d;
  const sigma = (F * 1000) / A;
  const status = sigma < 100 ? 'Gut' : sigma < 235 ? 'Sicher (S235)' : sigma < 355 ? 'S355 nötig' : sigma < 500 ? 'Hochfest nötig' : '⚠ Überlastet';

  useEffect(() => { if (canvasRef.current) draw(canvasRef.current, d, sigma); }, [F, d]);
  useEffect(() => {
    const obs = new ResizeObserver(() => { if (canvasRef.current) draw(canvasRef.current, d, sigma); });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [d, sigma]);

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Normalspannung σ = F / A</strong></div>
      <label className={styles.sliderLabel} htmlFor="st-f"><span>Kraft F</span><strong>{F} kN</strong></label>
      <input id="st-f" type="range" min="1" max="200" value={F} onChange={e => setF(+e.target.value)} />
      <label className={styles.sliderLabel} htmlFor="st-d" style={{ marginTop: 8 }}><span>Durchmesser d</span><strong>{d} mm</strong></label>
      <input id="st-d" type="range" min="2" max="60" value={d} onChange={e => setD(+e.target.value)} />
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 200, borderRadius: 6, border: '1px solid var(--border)', marginTop: 14 }} />
      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>Fläche A</span><strong>{A.toFixed(1)} mm²</strong></div>
        <div><span>σ</span><strong style={{ color: sigma > 235 ? '#DC143C' : 'var(--ok-t)', fontSize: 16 }}>{sigma.toFixed(0)} MPa</strong></div>
        <div style={{ gridColumn: 'span 2' }}><span>Bewertung</span><strong>{status}</strong></div>
      </div>
    </div>
  );
}
