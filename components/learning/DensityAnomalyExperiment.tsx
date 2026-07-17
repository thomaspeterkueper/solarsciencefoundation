'use client';
/**
 * DensityAnomalyExperiment — EXP:DICHTE-KURVE
 * Water density vs temperature — maximum at 4°C, ice floats
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

function waterDensity(T: number): number {
  if (T < 0) return 0.9168; // ice
  // Polynomial approximation for liquid water density
  return 0.999842 + 6.793e-5 * T - 9.095e-6 * T * T + 1.001e-7 * T * T * T - 1.12e-9 * T * T * T * T;
}

function draw(canvas: HTMLCanvasElement, T: number) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr; canvas.height = 200 * dpr;
  const ctx = canvas.getContext('2d')!; ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = 200;
  const pad = { l: 52, r: 14, t: 14, b: 28 };
  ctx.fillStyle = '#F9F8F5'; ctx.fillRect(0, 0, W, H);
  const gW = W - pad.l - pad.r, gH = H - pad.t - pad.b;
  const tMin = -10, tMax = 30;
  const dMin = 0.914, dMax = 1.001;
  const tX = (t: number) => pad.l + ((t - tMin) / (tMax - tMin)) * gW;
  const dY = (d: number) => H - pad.b - ((d - dMin) / (dMax - dMin)) * gH;

  // Grid
  [0.915, 0.92, 0.95, 0.98, 1.000].forEach(d => {
    ctx.strokeStyle = '#E8E6DE'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(pad.l, dY(d)); ctx.lineTo(W - pad.r, dY(d)); ctx.stroke();
    ctx.fillStyle = '#8A8880'; ctx.font = '8px monospace'; ctx.textAlign = 'right';
    ctx.fillText(d.toFixed(3), pad.l - 3, dY(d) + 3);
  });
  // Axes
  ctx.strokeStyle = '#C0BEBA'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(pad.l, pad.t); ctx.lineTo(pad.l, H - pad.b); ctx.lineTo(W - pad.r, H - pad.b); ctx.stroke();
  ctx.fillStyle = '#8A8880'; ctx.font = '9px monospace'; ctx.textAlign = 'left';
  ctx.fillText('ρ (g/cm³)', pad.l + 2, pad.t + 8);
  ctx.textAlign = 'center'; ctx.fillText('T (°C)', W / 2, H - 4);
  // Temperature labels
  [-10, 0, 4, 10, 20, 30].forEach(t => {
    ctx.fillStyle = t === 4 ? '#C9A84C' : t === 0 ? '#5B8FB9' : '#8A8880';
    ctx.font = t === 4 ? 'bold 8px monospace' : '8px monospace';
    ctx.textAlign = 'center'; ctx.fillText(t + '', tX(t), H - pad.b + 12);
  });

  // Ice density line (dashed)
  ctx.strokeStyle = '#5B8FB9'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]);
  ctx.beginPath(); ctx.moveTo(tX(-10), dY(0.9168)); ctx.lineTo(tX(0), dY(0.9168)); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#5B8FB9'; ctx.font = '8px monospace'; ctx.textAlign = 'left';
  ctx.fillText('Eis: 0.917', pad.l + 3, dY(0.9168) - 4);

  // Water density curve
  ctx.beginPath(); ctx.strokeStyle = '#1C2B3A'; ctx.lineWidth = 2.5;
  for (let t = 0; t <= tMax; t += 0.2) {
    const d = waterDensity(t);
    t === 0 ? ctx.moveTo(tX(t), dY(d)) : ctx.lineTo(tX(t), dY(d));
  }
  ctx.stroke();

  // Maximum marker at 4°C
  ctx.strokeStyle = '#C9A84C'; ctx.lineWidth = 1; ctx.setLineDash([4, 3]);
  ctx.beginPath(); ctx.moveTo(tX(4), pad.t); ctx.lineTo(tX(4), dY(waterDensity(4))); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#C9A84C'; ctx.font = 'bold 9px monospace'; ctx.textAlign = 'center';
  ctx.fillText('Max: 4°C', tX(4), pad.t + 10);

  // Current point
  const curD = waterDensity(T);
  const isIce = T < 0;
  const px = tX(T), py = isIce ? dY(0.9168) : dY(curD);
  ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI * 2);
  ctx.fillStyle = isIce ? '#B0D4F1' : '#4488BB';
  ctx.strokeStyle = '#1C2B3A'; ctx.lineWidth = 1.5;
  ctx.fill(); ctx.stroke();

  // Lake visualization on right side
  const lakeX = W - 80, lakeW = 60, lakeH = 90, lakeY = (H - lakeH) / 2;
  // Gradient for lake layers
  const lakeGrad = ctx.createLinearGradient(0, lakeY, 0, lakeY + lakeH);
  if (T < 0) {
    lakeGrad.addColorStop(0, '#E8F4FF'); // ice on top
    lakeGrad.addColorStop(0.15, '#B0D4F1');
    lakeGrad.addColorStop(0.16, '#4488BB'); // water below
    lakeGrad.addColorStop(1, '#1C4A7A'); // 4°C at bottom
  } else {
    lakeGrad.addColorStop(0, '#88BBDD');
    lakeGrad.addColorStop(1, '#1C4A7A');
  }
  ctx.fillStyle = lakeGrad;
  ctx.fillRect(lakeX, lakeY, lakeW, lakeH);
  ctx.strokeStyle = '#8A8880'; ctx.lineWidth = 1;
  ctx.strokeRect(lakeX, lakeY, lakeW, lakeH);
  // Labels
  ctx.fillStyle = '#1C2B3A'; ctx.font = '8px monospace'; ctx.textAlign = 'center';
  if (T < 0) {
    ctx.fillStyle = '#fff'; ctx.fillText('Eis', lakeX + lakeW / 2, lakeY + 10);
    ctx.fillStyle = '#fff'; ctx.fillText('4°C', lakeX + lakeW / 2, lakeY + lakeH - 8);
    ctx.fillText('(dichtestes', lakeX + lakeW / 2, lakeY + lakeH - 19);
    ctx.fillText('Wasser)', lakeX + lakeW / 2, lakeY + lakeH - 30);
  }
}

export default function DensityAnomalyExperiment() {
  const [T, setT] = useState(4);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const density = T < 0 ? 0.9168 : waterDensity(T);
  const isIce = T < 0;

  useEffect(() => { if (canvasRef.current) draw(canvasRef.current, T); }, [T]);
  useEffect(() => {
    const obs = new ResizeObserver(() => { if (canvasRef.current) draw(canvasRef.current, T); });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [T]);

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Dichte-Temperatur-Kurve des Wassers</strong></div>
      <label className={styles.sliderLabel} htmlFor="da-t"><span>Temperatur</span><strong style={{ color: T === 4 ? 'var(--ok-t)' : T < 0 ? '#5B8FB9' : 'var(--navy)' }}>{T}°C</strong></label>
      <input id="da-t" type="range" min="-10" max="30" value={T} onChange={e => setT(+e.target.value)} />
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 200, borderRadius: 6, border: '1px solid var(--border)', marginTop: 12 }} />
      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>Dichte ρ</span><strong style={{ fontSize: 16, color: T === 4 ? 'var(--ok-t)' : 'var(--navy)' }}>{density.toFixed(4)} g/cm³</strong></div>
        <div><span>Zustand</span><strong>{isIce ? 'Eis ❄' : T === 4 ? 'Maximum — dichtestes Wasser' : 'flüssig'}</strong></div>
        <div style={{ gridColumn: 'span 2' }}>
          <span>Beobachtung</span>
          <strong style={{ fontSize: 12 }}>
            {isIce ? 'Eis (0,917 g/cm³) ist leichter als Wasser → schwimmt oben' :
             T === 4 ? 'Bei 4°C ist Wasser am dichtesten — sinkt auf Seegrund' :
             T < 4 ? 'Kühler als 4°C: Wasser wird leichter, steigt auf' :
             'Wärmer als 4°C: Wasser wird leichter, steigt auf'}
          </strong>
        </div>
      </div>
    </div>
  );
}
