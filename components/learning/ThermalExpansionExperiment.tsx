'use client';
/**
 * ThermalExpansionExperiment — EXP:DEHNUNG-WAERME
 * Material selector + L0 + ΔT sliders → ΔL live, bar canvas
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

const MATS = {
  stahl:  { alpha: 12,   label: 'Stahl',     color: '#5B8FB9' },
  alu:    { alpha: 23,   label: 'Aluminium', color: '#C9A84C' },
  beton:  { alpha: 10,   label: 'Beton',     color: '#8A8880' },
  invar:  { alpha: 1.2,  label: 'Invar',     color: '#7AAD7A' },
  glas:   { alpha: 9,    label: 'Glas',      color: '#B0C4DE' },
} as const;
type MatKey = keyof typeof MATS;

function draw(canvas: HTMLCanvasElement, L0: number, dL: number, color: string, dT: number) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr; canvas.height = 110 * dpr;
  const ctx = canvas.getContext('2d')!; ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = 110;
  ctx.fillStyle = '#F9F8F5'; ctx.fillRect(0, 0, W, H);
  const pad = 20, barH = 24, cy = H / 2;
  const maxLen = W - pad * 2;
  const origW = maxLen * 0.68;
  const newW = Math.max(4, origW + dL * 800);
  // Original
  ctx.fillStyle = 'rgba(100,120,140,.18)'; ctx.fillRect(pad, cy - barH / 2, origW, barH);
  ctx.strokeStyle = 'rgba(100,120,140,.4)'; ctx.lineWidth = 1; ctx.setLineDash([4, 3]);
  ctx.strokeRect(pad, cy - barH / 2, origW, barH); ctx.setLineDash([]);
  // New
  ctx.fillStyle = color + '55'; ctx.fillRect(pad, cy - barH / 2, newW, barH);
  ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.strokeRect(pad, cy - barH / 2, newW, barH);
  // ΔL arrow
  if (Math.abs(dL) > 1e-6) {
    const x1 = pad + origW, x2 = pad + newW;
    const ac = dT >= 0 ? '#DC143C' : '#1a7a4a';
    ctx.strokeStyle = ac; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(x1, cy - barH / 2 - 10); ctx.lineTo(x2, cy - barH / 2 - 10); ctx.stroke();
    ctx.fillStyle = ac; ctx.font = '9px monospace'; ctx.textAlign = 'center';
    ctx.fillText('ΔL', (x1 + x2) / 2, cy - barH / 2 - 13);
  }
  ctx.fillStyle = '#8A8880'; ctx.font = '9px monospace'; ctx.textAlign = 'left';
  ctx.fillText('L₀ = ' + L0.toFixed(0) + ' m', pad, H - 6);
  ctx.fillStyle = color; ctx.textAlign = 'right';
  ctx.fillText('L₀ + ΔL', Math.min(W - 4, pad + newW), cy + barH / 2 + 12);
}

export default function ThermalExpansionExperiment() {
  const [mat, setMat] = useState<MatKey>('stahl');
  const [L0, setL0] = useState(10);
  const [dT, setDT] = useState(30);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const m = MATS[mat];
  const dL = m.alpha * 1e-6 * L0 * dT;
  const dL_str = Math.abs(dL * 1000) < 1 ? (dL * 1e6).toFixed(1) + ' μm' : (dL * 1000).toFixed(2) + ' mm';

  useEffect(() => { if (canvasRef.current) draw(canvasRef.current, L0, dL, m.color, dT); }, [L0, dT, mat]);
  useEffect(() => {
    const obs = new ResizeObserver(() => { if (canvasRef.current) draw(canvasRef.current, L0, dL, m.color, dT); });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [L0, dL, m.color, dT]);

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Thermische Dehnung ΔL = α · L₀ · ΔT</strong></div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
        {(Object.keys(MATS) as MatKey[]).map(k => (
          <button key={k} onClick={() => setMat(k)} style={{
            padding: '4px 10px', fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '.05em', textTransform: 'uppercase',
            border: `1.5px solid ${mat === k ? MATS[k].color : 'var(--border)'}`,
            borderRadius: 4, background: mat === k ? MATS[k].color + '22' : 'var(--soft)',
            color: mat === k ? 'var(--navy)' : 'var(--muted)', cursor: 'pointer',
          }}>{MATS[k].label}</button>
        ))}
      </div>
      <label className={styles.sliderLabel} htmlFor="th-l0"><span>Länge L₀</span><strong>{L0} m</strong></label>
      <input id="th-l0" type="range" min="1" max="100" value={L0} onChange={e => setL0(+e.target.value)} />
      <label className={styles.sliderLabel} htmlFor="th-dt" style={{ marginTop: 8 }}><span>ΔT</span><strong>{dT > 0 ? '+' : ''}{dT} K</strong></label>
      <input id="th-dt" type="range" min="-50" max="100" value={dT} onChange={e => setDT(+e.target.value)} />
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 110, borderRadius: 6, border: '1px solid var(--border)', marginTop: 14 }} />
      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>α</span><strong>{m.alpha} × 10⁻⁶/K</strong></div>
        <div><span>ΔL</span><strong style={{ color: Math.abs(dL) > 0.005 ? '#DC143C' : 'var(--ok-t)' }}>{dL_str}</strong></div>
        <div style={{ gridColumn: 'span 2' }}>
          <span>Formel</span>
          <strong style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>
            {m.alpha}×10⁻⁶ · {L0} · {dT > 0 ? '+' : ''}{dT} = {(dL * 1000).toFixed(3)} mm
          </strong>
        </div>
      </div>
    </div>
  );
}
