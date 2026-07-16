'use client';
/**
 * PoissonExperiment — EXP:QUERKONTRAKTION
 * Longitudinal strain slider → transverse strain via Poisson ratio, rod canvas
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

const MATS_P = {
  stahl:  { nu: 0.30, label: 'Stahl',      color: '#5B8FB9' },
  alu:    { nu: 0.33, label: 'Aluminium',  color: '#C9A84C' },
  beton:  { nu: 0.20, label: 'Beton',      color: '#8A8880' },
  kork:   { nu: 0.00, label: 'Kork ≈ 0',  color: '#7AAD7A' },
  gummi:  { nu: 0.49, label: 'Gummi',     color: '#DC143C' },
} as const;
type PMatKey = keyof typeof MATS_P;

function drawPoisson(canvas: HTMLCanvasElement, eps_l: number, nu: number, color: string) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr; canvas.height = 160 * dpr;
  const ctx = canvas.getContext('2d')!; ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = 160;
  ctx.fillStyle = '#F9F8F5'; ctx.fillRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2;
  const origW = W * 0.22, origH = H * 0.52;
  const newW = origW * (1 + eps_l * 3);
  const eps_q = -nu * eps_l;
  const newH = origH * (1 + eps_q * 3);
  // Original (dashed)
  ctx.strokeStyle = 'rgba(150,150,150,.35)'; ctx.lineWidth = 1; ctx.setLineDash([4, 3]);
  ctx.strokeRect(cx - origW / 2, cy - origH / 2, origW, origH); ctx.setLineDash([]);
  // New rod
  const grad = ctx.createLinearGradient(cx - newW / 2, 0, cx + newW / 2, 0);
  grad.addColorStop(0, color + '55'); grad.addColorStop(0.4, color + 'AA'); grad.addColorStop(0.6, color + 'AA'); grad.addColorStop(1, color + '55');
  ctx.fillStyle = grad; ctx.fillRect(cx - newW / 2, cy - newH / 2, newW, newH);
  ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.strokeRect(cx - newW / 2, cy - newH / 2, newW, newH);
  // Dimension arrows
  const aw = 6;
  const drawArrow = (x1: number, y1: number, x2: number, y2: number, c: string) => {
    ctx.strokeStyle = c; ctx.fillStyle = c; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    const ang = Math.atan2(y2 - y1, x2 - x1);
    ctx.beginPath(); ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - aw * Math.cos(ang - .4), y2 - aw * Math.sin(ang - .4));
    ctx.lineTo(x2 - aw * Math.cos(ang + .4), y2 - aw * Math.sin(ang + .4));
    ctx.closePath(); ctx.fill();
  };
  // Length arrow (horizontal)
  drawArrow(cx - newW / 2 - 10, cy, cx + newW / 2 + 10, cy, eps_l > 0 ? '#DC143C' : '#1a7a4a');
  // Width arrow (vertical)
  drawArrow(cx, cy - newH / 2 - 8, cx, cy + newH / 2 + 8, nu > 0.01 ? '#5B8FB9' : '#8A8880');
  ctx.fillStyle = '#8A8880'; ctx.font = '9px monospace'; ctx.textAlign = 'center';
  ctx.fillText('ε_l = ' + (eps_l * 1000).toFixed(1) + ' ‰', cx, H - 6);
}

export default function PoissonExperiment() {
  const [mat, setMat] = useState<PMatKey>('stahl');
  const [eps_l, setEpsL] = useState(2);  // in ‰
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const m = MATS_P[mat];
  const eps_l_val = eps_l / 1000;
  const eps_q = -m.nu * eps_l_val;

  useEffect(() => { if (canvasRef.current) drawPoisson(canvasRef.current, eps_l_val, m.nu, m.color); }, [eps_l, mat]);
  useEffect(() => {
    const obs = new ResizeObserver(() => { if (canvasRef.current) drawPoisson(canvasRef.current, eps_l_val, m.nu, m.color); });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [eps_l_val, m]);

  const korkNote = mat === 'kork' ? ' — deshalb ideal als Flaschenverschluss!' : '';

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Querkontraktion ε_quer = −ν · ε_längs</strong></div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {(Object.keys(MATS_P) as PMatKey[]).map(k => (
          <button key={k} onClick={() => setMat(k)} style={{
            padding: '4px 10px', fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '.05em', textTransform: 'uppercase',
            border: `1.5px solid ${mat === k ? MATS_P[k].color : 'var(--border)'}`,
            borderRadius: 4, background: mat === k ? MATS_P[k].color + '22' : 'var(--soft)',
            color: mat === k ? 'var(--navy)' : 'var(--muted)', cursor: 'pointer',
          }}>{MATS_P[k].label}</button>
        ))}
      </div>
      <label className={styles.sliderLabel} htmlFor="po-eps"><span>Längsdehnung ε_l</span><strong>{eps_l} ‰</strong></label>
      <input id="po-eps" type="range" min="0" max="15" step="0.5" value={eps_l} onChange={e => setEpsL(+e.target.value)} />
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 160, borderRadius: 6, border: '1px solid var(--border)', marginTop: 12 }} />
      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>Poisson-Zahl ν</span><strong>{m.nu.toFixed(2)}</strong></div>
        <div><span>ε_quer</span><strong style={{ color: '#5B8FB9' }}>{(eps_q * 1000).toFixed(2)} ‰</strong></div>
        <div style={{ gridColumn: 'span 2' }}><span>Hinweis</span><strong style={{ fontSize: 12 }}>ε_q = −{m.nu} · {eps_l} = {(eps_q * 1000).toFixed(2)} ‰{korkNote}</strong></div>
      </div>
    </div>
  );
}
