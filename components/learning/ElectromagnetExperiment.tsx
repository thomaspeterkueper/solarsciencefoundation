'use client';
/**
 * ElectromagnetExperiment — EXP:DRAHT
 * Current through wire/coil → magnetic field, iron core amplification
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

function draw(canvas: HTMLCanvasElement, current: number, turns: number, hasCore: boolean) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr; canvas.height = 200 * dpr;
  const ctx = canvas.getContext('2d')!; ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = 200;
  ctx.fillStyle = '#0a1628'; ctx.fillRect(0, 0, W, H);

  if (current < 0.1) {
    ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.font = '12px monospace'; ctx.textAlign = 'center';
    ctx.fillText('Kein Strom — kein Magnetfeld', W/2, H/2);
    return;
  }

  const cx = W/2, cy = H/2;
  const coilW = 60, coilH = 80;

  // Iron core
  if (hasCore) {
    ctx.fillStyle = '#C9A84C44';
    ctx.fillRect(cx - 8, cy - coilH/2 - 5, 16, coilH + 10);
    ctx.strokeStyle = '#C9A84C'; ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - 8, cy - coilH/2 - 5, 16, coilH + 10);
    ctx.fillStyle = '#C9A84C'; ctx.font = '8px monospace'; ctx.textAlign = 'center';
    ctx.fillText('Fe', cx, cy - coilH/2 - 8);
  }

  // Coil windings
  const winding_count = Math.min(turns, 12);
  const spacing = coilH / winding_count;
  ctx.strokeStyle = '#C9A84C'; ctx.lineWidth = 2.5;
  for (let i = 0; i < winding_count; i++) {
    const wy = cy - coilH/2 + i * spacing;
    ctx.beginPath();
    ctx.ellipse(cx, wy, coilW/2, 8, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Magnetic field lines
  const B = current * turns * (hasCore ? 5 : 1);
  const fieldStrength = Math.min(1, B / 200);
  const lineCount = Math.round(3 + fieldStrength * 5);
  ctx.shadowBlur = 8;

  for (let i = 0; i < lineCount; i++) {
    const offset = (i - lineCount/2) * 20;
    const alpha = Math.max(0.1, fieldStrength - Math.abs(offset)/120);
    ctx.strokeStyle = 'rgba(91,143,185,' + alpha.toFixed(2) + ')';
    ctx.shadowColor = '#5B8FB9';
    ctx.lineWidth = 1.5;
    // Field line: exits top, curves around, enters bottom
    ctx.beginPath();
    ctx.moveTo(cx + offset*0.3, cy - coilH/2 - 5);
    ctx.bezierCurveTo(
      cx + offset*0.3 + (offset > 0 ? 60 : -60), cy - 80,
      cx + offset*0.3 + (offset > 0 ? 80 : -80), cy + 80,
      cx + offset*0.3, cy + coilH/2 + 5
    );
    ctx.stroke();
  }
  ctx.shadowBlur = 0;

  // Field strength indicator
  ctx.fillStyle = '#5B8FB9'; ctx.font = 'bold 11px monospace'; ctx.textAlign = 'center';
  ctx.fillText('B ≈ ' + B.toFixed(0) + ' mT', cx, H - 10);

  // Pole labels
  ctx.fillStyle = '#DC143C'; ctx.font = 'bold 12px monospace';
  ctx.fillText('N', cx, 16);
  ctx.fillStyle = '#5B8FB9';
  ctx.fillText('S', cx, H - 22);
}

export default function ElectromagnetExperiment() {
  const [current, setCurrent] = useState(2);
  const [turns, setTurns] = useState(5);
  const [hasCore, setHasCore] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => { if (canvasRef.current) draw(canvasRef.current, current, turns, hasCore); }, [current, turns, hasCore]);
  useEffect(() => {
    const obs = new ResizeObserver(() => { if (canvasRef.current) draw(canvasRef.current, current, turns, hasCore); });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [current, turns, hasCore]);

  const B = current * turns * (hasCore ? 5 : 1);

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Elektromagnet — Strom erzeugt Magnetfeld</strong></div>

      <label className={styles.sliderLabel} htmlFor="em-i"><span>Stromstärke I</span><strong>{current} A</strong></label>
      <input id="em-i" type="range" min="0" max="10" step="0.5" value={current} onChange={e => setCurrent(+e.target.value)} />

      <label className={styles.sliderLabel} htmlFor="em-n" style={{ marginTop: 8 }}><span>Windungen N</span><strong>{turns}</strong></label>
      <input id="em-n" type="range" min="1" max="20" value={turns} onChange={e => setTurns(+e.target.value)} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, marginBottom: 4 }}>
        <button onClick={() => setHasCore(!hasCore)} style={{
          padding: '6px 14px', borderRadius: 6,
          border: '1.5px solid ' + (hasCore ? '#C9A84C' : 'var(--border)'),
          background: hasCore ? '#C9A84C22' : 'var(--soft)',
          color: hasCore ? 'var(--navy)' : 'var(--muted)',
          fontFamily: 'var(--font-mono)', fontSize: 11, cursor: 'pointer',
        }}>
          {hasCore ? '✓ Eisenkern (5× Verstärkung)' : 'Eisenkern hinzufügen'}
        </button>
      </div>

      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 200, borderRadius: 6, border: '1px solid var(--border)', marginTop: 10, background: '#0a1628' }} />

      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>Magnetfeld B</span><strong style={{ fontSize: 16, color: B > 50 ? '#C9A84C' : 'var(--muted)' }}>{B.toFixed(0)} mT</strong></div>
        <div><span>Formel</span><strong style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>B = μ₀ · N · I / L</strong></div>
        <div style={{ gridColumn: 'span 2' }}>
          <span>Strom aus →</span><strong style={{ fontSize: 12 }}>Magnetfeld verschwindet sofort — Permanentmagnet dagegen behält sein Feld.</strong>
        </div>
      </div>
    </div>
  );
}
