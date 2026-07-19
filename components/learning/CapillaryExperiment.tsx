'use client';
/**
 * CapillaryExperiment — EXP:KAPILLAR
 * Capillary rise: tube diameter slider → height, tree analogy
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

function capillaryHeight(r_mm: number, liquid: 'water' | 'mercury'): number {
  // h = 2γcosθ / (ρgr)
  const gamma = liquid === 'water' ? 0.0728 : 0.487; // N/m
  const cosTheta = liquid === 'water' ? 1.0 : -0.766; // contact angle
  const rho = liquid === 'water' ? 1000 : 13600; // kg/m³
  const g = 9.81;
  const r = r_mm / 1000;
  return (2 * gamma * cosTheta) / (rho * g * r) * 1000; // mm
}

function draw(canvas: HTMLCanvasElement, r: number, h: number, liquid: 'water' | 'mercury') {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr; canvas.height = 200 * dpr;
  const ctx = canvas.getContext('2d')!; ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = 200;
  ctx.fillStyle = '#0a1628'; ctx.fillRect(0, 0, W, H);

  const isWater = liquid === 'water';
  const liqColor = isWater ? '#4488BB' : '#AAA';
  const maxH = 180;
  const baseY = H - 20;
  const hPx = Math.min(maxH, Math.abs(h) / 30 * maxH);
  const rPx = Math.max(3, Math.min(30, r * 10));

  // Beaker (background liquid)
  ctx.fillStyle = liqColor + '44';
  ctx.fillRect(W * 0.1, baseY - 30, W * 0.8, 30);
  ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1;
  ctx.strokeRect(W * 0.1, baseY - 30, W * 0.8, 30);

  // Multiple tubes
  const tubes = [0.1, 0.5, 1, 2, 5]; // mm radius
  const spacing = (gW: number) => gW / (tubes.length + 1);
  const sp = (W * 0.8) / (tubes.length + 1);

  tubes.forEach((tr, i) => {
    const tx = W * 0.1 + sp * (i + 1);
    const th = capillaryHeight(tr, liquid);
    const thPx = Math.min(maxH - 35, Math.abs(th) / 30 * (maxH - 35));
    const trPx = Math.max(2, Math.min(20, tr * 8));
    const isSelected = Math.abs(tr - r) < 0.4;

    // Tube walls
    ctx.strokeStyle = isSelected ? 'rgba(201,168,76,0.8)' : 'rgba(255,255,255,0.2)';
    ctx.lineWidth = isSelected ? 2 : 1;
    ctx.beginPath();
    ctx.moveTo(tx - trPx, baseY - 30);
    ctx.lineTo(tx - trPx, baseY - 30 - 140);
    ctx.moveTo(tx + trPx, baseY - 30);
    ctx.lineTo(tx + trPx, baseY - 30 - 140);
    ctx.stroke();

    // Liquid column
    if (isWater) {
      ctx.fillStyle = '#4488BB' + (isSelected ? 'CC' : '66');
      ctx.fillRect(tx - trPx + 1, baseY - 30 - thPx, trPx * 2 - 2, thPx);
      // Meniscus (concave for water)
      ctx.beginPath();
      ctx.ellipse(tx, baseY - 30 - thPx, trPx - 1, trPx * 0.5, 0, Math.PI, 0);
      ctx.fillStyle = '#5599CC' + (isSelected ? 'CC' : '66'); ctx.fill();
    } else {
      // Mercury: convex meniscus, goes DOWN
      const downPx = Math.min(30, thPx);
      ctx.fillStyle = '#AAA' + (isSelected ? 'CC' : '44');
      ctx.fillRect(tx - trPx + 1, baseY - 30, trPx * 2 - 2, downPx);
    }

    // Height label for selected
    if (isSelected) {
      ctx.fillStyle = '#C9A84C'; ctx.font = 'bold 9px monospace'; ctx.textAlign = 'center';
      const labelY = isWater ? baseY - 30 - thPx - 8 : baseY - 30 + thPx + 16;
      ctx.fillText(th > 0 ? '+' + th.toFixed(0) + 'mm' : th.toFixed(0) + 'mm', tx, labelY);
    }

    // Radius label below
    ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.font = '8px monospace'; ctx.textAlign = 'center';
    ctx.fillText('r=' + tr, tx, H - 6);
  });
}

export default function CapillaryExperiment() {
  const [r, setR] = useState(0.5);
  const [liquid, setLiquid] = useState<'water' | 'mercury'>('water');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const h = capillaryHeight(r, liquid);

  useEffect(() => { if (canvasRef.current) draw(canvasRef.current, r, h, liquid); }, [r, h, liquid]);
  useEffect(() => {
    const obs = new ResizeObserver(() => { if (canvasRef.current) draw(canvasRef.current, r, h, liquid); });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [r, h, liquid]);

  const treeHeight = capillaryHeight(0.01, 'water');

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Kapillarsteigung h = 2γcosθ / (ρgr)</strong></div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {(['water', 'mercury'] as const).map(l => (
          <button key={l} onClick={() => setLiquid(l)} style={{
            padding: '5px 12px', fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '.05em', textTransform: 'uppercase',
            border: `1.5px solid ${liquid === l ? (l === 'water' ? '#4488BB' : '#AAA') : 'var(--border)'}`,
            borderRadius: 4, background: liquid === l ? (l === 'water' ? '#4488BB22' : '#AAA22') : 'var(--soft)',
            color: liquid === l ? 'var(--navy)' : 'var(--muted)', cursor: 'pointer',
          }}>{l === 'water' ? 'Wasser (steigt)' : 'Quecksilber (sinkt)'}</button>
        ))}
      </div>
      <label className={styles.sliderLabel} htmlFor="ca-r">
        <span>Rohrradius</span><strong>{r} mm</strong>
      </label>
      <input id="ca-r" type="range" min="0.05" max="5" step="0.05" value={r} onChange={e => setR(+e.target.value)} />
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 200, borderRadius: 6, border: '1px solid var(--border)', marginTop: 12, background: '#0a1628' }} />
      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>Steighöhe h</span>
          <strong style={{ color: h > 0 ? 'var(--ok-t)' : '#DC143C', fontSize: 16 }}>
            {h > 0 ? '+' : ''}{h.toFixed(1)} mm
          </strong>
        </div>
        <div><span>Richtung</span><strong>{liquid === 'water' ? '↑ steigt (hydrophil)' : '↓ sinkt (hydrophob)'}</strong></div>
        <div style={{ gridColumn: 'span 2' }}>
          <span>Baum-Analogie</span>
          <strong style={{ fontSize: 12 }}>Holz-Kapillaren: r ≈ 0,01 mm → h ≈ {treeHeight.toFixed(0)} mm = {(treeHeight / 1000).toFixed(1)} m</strong>
        </div>
      </div>
    </div>
  );
}
