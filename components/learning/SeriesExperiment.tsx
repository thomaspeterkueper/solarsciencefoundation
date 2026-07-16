'use client';
/**
 * SeriesExperiment — EXP:REIHE
 * Geometric series: q slider, bars shrink live, limit line
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

function drawSeries(canvas: HTMLCanvasElement, q: number, N: number) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr; canvas.height = 160 * dpr;
  const ctx = canvas.getContext('2d')!; ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = 160;
  ctx.fillStyle = '#0a1628'; ctx.fillRect(0, 0, W, H);
  const pad = 16, barW = Math.max(3, (W - pad * 2 - (N - 1) * 3) / N);
  const maxH = H - 40;
  let sum = 0;
  for (let i = 0; i < N; i++) {
    const val = Math.pow(Math.abs(q), i);
    const h = val * maxH;
    const x = pad + i * (barW + 3);
    const y = H - 24 - h;
    const hue = q < 0 && i % 2 === 1 ? '#DC143C' : '#C9A84C';
    ctx.fillStyle = hue + 'CC'; ctx.fillRect(x, y, barW, h);
    sum += Math.pow(q, i);
  }
  // Limit line
  if (Math.abs(q) < 1) {
    const limit = 1 / (1 - q);
    const limY = H - 24 - Math.min(limit, 3) * maxH / 3;
    ctx.strokeStyle = '#7AAD7A'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(pad, limY); ctx.lineTo(W - pad, limY); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#7AAD7A'; ctx.font = '9px monospace'; ctx.textAlign = 'right';
    ctx.fillText('→ 1/(1−q) = ' + limit.toFixed(2), W - pad - 2, limY - 3);
  }
  ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.font = '9px monospace'; ctx.textAlign = 'left';
  ctx.fillText('S_' + N + ' = ' + sum.toFixed(3), pad, H - 6);
}

export default function SeriesExperiment() {
  const [q, setQ] = useState(0.6);
  const [N, setN] = useState(12);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => { if (canvasRef.current) drawSeries(canvasRef.current, q, N); }, [q, N]);
  useEffect(() => {
    const obs = new ResizeObserver(() => { if (canvasRef.current) drawSeries(canvasRef.current, q, N); });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [q, N]);

  const converges = Math.abs(q) < 1;
  const limit = converges ? (1 / (1 - q)).toFixed(4) : '∞';
  const partialSum = Array.from({ length: N }, (_, i) => Math.pow(q, i)).reduce((a, b) => a + b, 0);

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Geometrische Reihe — Σ qⁿ</strong></div>
      <label className={styles.sliderLabel} htmlFor="sr-q"><span>Quotient q</span><strong>{q.toFixed(2)}</strong></label>
      <input id="sr-q" type="range" min="-0.99" max="0.99" step="0.01" value={q} onChange={e => setQ(+e.target.value)} />
      <label className={styles.sliderLabel} htmlFor="sr-n" style={{ marginTop: 8 }}><span>Terme N</span><strong>{N}</strong></label>
      <input id="sr-n" type="range" min="2" max="24" value={N} onChange={e => setN(+e.target.value)} />
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 160, borderRadius: 6, border: '1px solid var(--border)', marginTop: 12, background: '#0a1628' }} />
      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>Konvergenz</span><strong style={{ color: converges ? 'var(--ok-t)' : '#DC143C' }}>{converges ? '|q| < 1 → konvergent' : '|q| ≥ 1 → divergent'}</strong></div>
        <div><span>Grenzwert</span><strong style={{ color: converges ? 'var(--ok-t)' : '#DC143C' }}>{limit}</strong></div>
        <div><span>S_{N}</span><strong>{partialSum.toFixed(4)}</strong></div>
        <div><span>Fehler</span><strong>{converges ? Math.abs(+limit - partialSum).toFixed(4) : '—'}</strong></div>
      </div>
    </div>
  );
}
