'use client';

/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:     components/learning/LGSExperiment.tsx
 * Name:     LGSExperiment — interactive 2x2 linear equation system
 * Version:  0.1.0
 * Created:  2026-07-15
 *
 * Renders two lines on a coordinate system.
 * Sliders control a1,b1,c1,a2,b2,c2.
 * Shows intersection point, determinant, solution status.
 */

import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css'; // reuse same card style

type Coeff = { a1:number; b1:number; c1:number; a2:number; b2:number; c2:number };

function solve(c: Coeff) {
  const det = c.a1 * c.b2 - c.a2 * c.b1;
  if (Math.abs(det) < 0.001) {
    const cross = c.c1 * c.b2 - c.c2 * c.b1;
    return { status: Math.abs(cross) < 0.001 ? 'identical' : 'parallel', det, x: null, y: null };
  }
  const x = (c.c1 * c.b2 - c.c2 * c.b1) / det;
  const y = (c.a1 * c.c2 - c.a2 * c.c1) / det;
  return { status: 'unique', det, x, y };
}

function drawCanvas(canvas: HTMLCanvasElement, c: Coeff) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = 260 * dpr;
  const ctx = canvas.getContext('2d')!;
  ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = 260;
  const cx = W / 2, cy = H / 2, scale = 20;

  // Background
  ctx.fillStyle = '#F9F8F5'; ctx.fillRect(0, 0, W, H);

  // Grid
  ctx.strokeStyle = '#E8E6DE'; ctx.lineWidth = 1;
  for (let i = -7; i <= 7; i++) {
    ctx.beginPath(); ctx.moveTo(cx + i * scale, 0); ctx.lineTo(cx + i * scale, H); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, cy + i * scale); ctx.lineTo(W, cy + i * scale); ctx.stroke();
  }

  // Axes
  ctx.strokeStyle = '#C0BEBA'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke();
  ctx.fillStyle = '#8A8880'; ctx.font = '9px monospace'; ctx.textAlign = 'center';
  ctx.fillText('x', W - 8, cy - 4); ctx.fillText('y', cx + 8, 8);

  function drawLine(a: number, b: number, cc: number, color: string, label: string) {
    ctx.strokeStyle = color; ctx.lineWidth = 2.5;
    ctx.shadowColor = color; ctx.shadowBlur = 3;
    ctx.beginPath();
    if (Math.abs(b) > 0.001) {
      const x1 = -W / scale, y1 = (cc - a * x1) / b;
      const x2 = W / scale, y2 = (cc - a * x2) / b;
      ctx.moveTo(cx + x1 * scale, cy - y1 * scale);
      ctx.lineTo(cx + x2 * scale, cy - y2 * scale);
    } else if (Math.abs(a) > 0.001) {
      const xc = cc / a;
      ctx.moveTo(cx + xc * scale, 0); ctx.lineTo(cx + xc * scale, H);
    }
    ctx.stroke(); ctx.shadowBlur = 0;
    ctx.fillStyle = color; ctx.font = 'bold 10px monospace'; ctx.textAlign = 'left';
    ctx.fillText(label, 6, color === '#5B8FB9' ? 14 : 26);
  }

  drawLine(c.a1, c.b1, c.c1, '#5B8FB9', `${c.a1}x + ${c.b1}y = ${c.c1}`);
  drawLine(c.a2, c.b2, c.c2, '#DC143C', `${c.a2}x + ${c.b2}y = ${c.c2}`);

  const sol = solve(c);
  if (sol.status === 'unique' && sol.x !== null && sol.y !== null) {
    const px = cx + sol.x * scale, py = cy - sol.y * scale;
    if (px > 5 && px < W - 5 && py > 5 && py < H - 5) {
      ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#C9A84C'; ctx.shadowColor = '#C9A84C'; ctx.shadowBlur = 8; ctx.fill(); ctx.shadowBlur = 0;
      ctx.strokeStyle = '#1C2B3A'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = '#1C2B3A'; ctx.font = 'bold 10px monospace'; ctx.textAlign = 'left';
      ctx.fillText(`(${sol.x.toFixed(1)}, ${sol.y.toFixed(1)})`, px + 10, py - 4);
    }
  }
}

type SliderRow = { label: string; id: keyof Coeff; min: number; max: number; step: number; color: string };

const SLIDERS: SliderRow[] = [
  { label: 'a₁', id: 'a1', min: -5, max: 5, step: 1, color: '#5B8FB9' },
  { label: 'b₁', id: 'b1', min: -5, max: 5, step: 1, color: '#5B8FB9' },
  { label: 'c₁', id: 'c1', min: -10, max: 10, step: 1, color: '#5B8FB9' },
  { label: 'a₂', id: 'a2', min: -5, max: 5, step: 1, color: '#DC143C' },
  { label: 'b₂', id: 'b2', min: -5, max: 5, step: 1, color: '#DC143C' },
  { label: 'c₂', id: 'c2', min: -10, max: 10, step: 1, color: '#DC143C' },
];

export default function LGSExperiment() {
  const [coeff, setCoeff] = useState<Coeff>({ a1:2, b1:1, c1:5, a2:1, b2:-1, c2:1 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) drawCanvas(canvasRef.current, coeff);
  }, [coeff]);

  useEffect(() => {
    const obs = new ResizeObserver(() => {
      if (canvasRef.current) drawCanvas(canvasRef.current, coeff);
    });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [coeff]);

  const sol = solve(coeff);
  const statusLabel = sol.status === 'unique' ? 'eindeutig' : sol.status === 'parallel' ? 'keine Lösung' : '∞ Lösungen';
  const statusColor = sol.status === 'unique' ? '#2A5C2A' : sol.status === 'parallel' ? '#DC143C' : '#C9A84C';

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}>
        <span className={styles.label}>Interaktives Experiment</span>
        <strong>Zwei Geraden — ein Schnittpunkt</strong>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Controls */}
        <div>
          {(['a1','b1','c1'] as const).map((id) => {
            const s = SLIDERS.find(sl => sl.id === id)!;
            return (
              <div key={id} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: s.color }}>{s.label}</span>
                  <strong style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--navy)' }}>{coeff[id]}</strong>
                </div>
                <input type="range" min={s.min} max={s.max} step={s.step} value={coeff[id]}
                  onChange={e => setCoeff(prev => ({ ...prev, [id]: +e.target.value }))}
                  style={{ width: '100%', accentColor: s.color }} />
              </div>
            );
          })}
          {(['a2','b2','c2'] as const).map((id) => {
            const s = SLIDERS.find(sl => sl.id === id)!;
            return (
              <div key={id} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: s.color }}>{s.label}</span>
                  <strong style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--navy)' }}>{coeff[id]}</strong>
                </div>
                <input type="range" min={s.min} max={s.max} step={s.step} value={coeff[id]}
                  onChange={e => setCoeff(prev => ({ ...prev, [id]: +e.target.value }))}
                  style={{ width: '100%', accentColor: s.color }} />
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className={styles.stats} style={{ marginTop: 0 }}>
            <div>
              <span>Status</span>
              <strong style={{ color: statusColor }}>{statusLabel}</strong>
            </div>
            <div>
              <span>det A</span>
              <strong>{sol.det.toFixed(0)}</strong>
            </div>
            {sol.status === 'unique' && (
              <>
                <div>
                  <span>x</span>
                  <strong>{sol.x?.toFixed(2)}</strong>
                </div>
                <div>
                  <span>y</span>
                  <strong>{sol.y?.toFixed(2)}</strong>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: 260, borderRadius: 6,
          border: '1px solid var(--border)', marginTop: 16, background: '#F9F8F5' }}
      />
    </div>
  );
}
