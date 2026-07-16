'use client';
/**
 * DiodeExperiment — EXP:KENNLINIE
 * Diode IV curve — Us and rD sliders, live canvas
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

const DIODE_TYPES = {
  si:      { Us: 0.65, label: 'Silizium (Si)', color: '#5B8FB9' },
  ge:      { Us: 0.25, label: 'Germanium (Ge)', color: '#C9A84C' },
  schottky:{ Us: 0.35, label: 'Schottky', color: '#7AAD7A' },
  led:     { Us: 2.0,  label: 'LED (rot)', color: '#DC143C' },
} as const;
type DiodeKey = keyof typeof DIODE_TYPES;

function drawKennlinie(canvas: HTMLCanvasElement, Us: number, color: string) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr; canvas.height = 200 * dpr;
  const ctx = canvas.getContext('2d')!; ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = 200;
  const pad = { l: 38, r: 14, t: 12, b: 32 };
  ctx.fillStyle = '#F9F8F5'; ctx.fillRect(0, 0, W, H);
  const gW = W - pad.l - pad.r, gH = H - pad.t - pad.b;
  const Vmax = 3.5, Imax = 200; // mA
  const tX = (v: number) => pad.l + (v / Vmax) * gW;
  const tY = (i: number) => H - pad.b - (i / Imax) * gH;
  // Grid
  ctx.strokeStyle = '#E8E6DE'; ctx.lineWidth = 1;
  for (let i = 1; i <= 4; i++) {
    const y = H - pad.b - (i / 4) * gH;
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(W - pad.r, y); ctx.stroke();
    ctx.fillStyle = '#8A8880'; ctx.font = '8px monospace'; ctx.textAlign = 'right';
    ctx.fillText((Imax * i / 4).toFixed(0), pad.l - 3, y + 3);
  }
  for (let i = 1; i <= 3; i++) {
    const x = pad.l + (i / 3) * gW;
    ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, H - pad.b); ctx.stroke();
    ctx.fillStyle = '#8A8880'; ctx.font = '8px monospace'; ctx.textAlign = 'center';
    ctx.fillText((Vmax * i / 3).toFixed(1) + 'V', x, H - pad.b + 12);
  }
  // Axes
  ctx.strokeStyle = '#C0BEBA'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(pad.l, pad.t); ctx.lineTo(pad.l, H - pad.b); ctx.lineTo(W - pad.r, H - pad.b); ctx.stroke();
  ctx.fillStyle = '#8A8880'; ctx.font = '9px monospace'; ctx.textAlign = 'right';
  ctx.fillText('I (mA)', pad.l - 2, pad.t + 8);
  ctx.textAlign = 'center'; ctx.fillText('U (V)', W - pad.r, H - pad.b + 22);
  // Diode curve: I = Is*(exp(U/Ut)-1), simplified as exponential after Us
  ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 2.5;
  ctx.shadowColor = color; ctx.shadowBlur = 4;
  let first = true;
  for (let px = 0; px <= gW; px++) {
    const U = (px / gW) * Vmax;
    const I = U < Us ? 0 : Math.min(Imax * 1.05, Math.pow((U - Us) / 0.05, 2.2) * 0.8);
    const x = pad.l + px, y = tY(I);
    if (y < pad.t) break;
    first ? (ctx.moveTo(x, y), first = false) : ctx.lineTo(x, y);
  }
  ctx.stroke(); ctx.shadowBlur = 0;
  // Us marker
  ctx.strokeStyle = '#C9A84C'; ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
  ctx.beginPath(); ctx.moveTo(tX(Us), H - pad.b); ctx.lineTo(tX(Us), pad.t); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#C9A84C'; ctx.font = '9px monospace'; ctx.textAlign = 'center';
  ctx.fillText('U_S = ' + Us.toFixed(2) + ' V', tX(Us), pad.t + 8);
}

export default function DiodeExperiment() {
  const [dtype, setDtype] = useState<DiodeKey>('si');
  const [Us, setUs] = useState(0.65);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const d = DIODE_TYPES[dtype];

  useEffect(() => { if (canvasRef.current) drawKennlinie(canvasRef.current, Us, d.color); }, [Us, dtype]);
  useEffect(() => { setUs(d.Us); }, [dtype]);
  useEffect(() => {
    const obs = new ResizeObserver(() => { if (canvasRef.current) drawKennlinie(canvasRef.current, Us, d.color); });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [Us, d]);

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Diodenkennlinie</strong></div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {(Object.keys(DIODE_TYPES) as DiodeKey[]).map(k => (
          <button key={k} onClick={() => setDtype(k)} style={{
            padding: '4px 10px', fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '.05em', textTransform: 'uppercase',
            border: `1.5px solid ${dtype === k ? DIODE_TYPES[k].color : 'var(--border)'}`,
            borderRadius: 4, background: dtype === k ? DIODE_TYPES[k].color + '22' : 'var(--soft)',
            color: dtype === k ? 'var(--navy)' : 'var(--muted)', cursor: 'pointer',
          }}>{DIODE_TYPES[k].label}</button>
        ))}
      </div>
      <label className={styles.sliderLabel} htmlFor="di-us"><span>Schwellenspannung U_S</span><strong>{Us.toFixed(2)} V</strong></label>
      <input id="di-us" type="range" min="0.1" max="3.0" step="0.05" value={Us} onChange={e => setUs(+e.target.value)} />
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 200, borderRadius: 6, border: '1px solid var(--border)', marginTop: 12 }} />
      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>Typ</span><strong>{d.label}</strong></div>
        <div><span>U_S typisch</span><strong>{d.Us.toFixed(2)} V</strong></div>
      </div>
    </div>
  );
}
