'use client';
/**
 * HookeExperiment — EXP:HOOKE
 * sigma = E * epsilon — stress-strain diagram with elastic limit
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

const MATS_H = {
  stahl: { E: 210000, Re: 355, Rm: 510, label: 'Stahl S355', color: '#5B8FB9' },
  alu:   { E: 70000,  Re: 270, Rm: 310, label: 'Aluminium', color: '#C9A84C' },
  gummi: { E: 5,      Re: 8,   Rm: 25,  label: 'Gummi', color: '#7AAD7A' },
  titan: { E: 114000, Re: 880, Rm: 950, label: 'Titan', color: '#DC143C' },
} as const;
type HMatKey = keyof typeof MATS_H;

function drawHooke(canvas: HTMLCanvasElement, E: number, Re: number, Rm: number, sigma: number, color: string) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr; canvas.height = 200 * dpr;
  const ctx = canvas.getContext('2d')!; ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = 200;
  const pad = { l: 44, r: 16, t: 14, b: 28 };
  ctx.fillStyle = '#F9F8F5'; ctx.fillRect(0, 0, W, H);
  const gW = W - pad.l - pad.r, gH = H - pad.t - pad.b;
  const epMax = Math.min(Rm / E * 3.5, 0.5);
  const sigMax = Rm * 1.05;
  const tX = (ep: number) => pad.l + (ep / epMax) * gW;
  const tY = (sg: number) => H - pad.b - (sg / sigMax) * gH;
  // Grid
  ctx.strokeStyle = '#E8E6DE'; ctx.lineWidth = 1;
  for (let i = 1; i <= 4; i++) {
    const y = H - pad.b - (i / 4) * gH;
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(W - pad.r, y); ctx.stroke();
    ctx.fillStyle = '#8A8880'; ctx.font = '8px monospace'; ctx.textAlign = 'right';
    ctx.fillText(Math.round(sigMax * i / 4) + '', pad.l - 3, y + 3);
  }
  // Axes
  ctx.strokeStyle = '#C0BEBA'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(pad.l, pad.t); ctx.lineTo(pad.l, H - pad.b); ctx.lineTo(W - pad.r, H - pad.b); ctx.stroke();
  ctx.fillStyle = '#8A8880'; ctx.font = '9px monospace'; ctx.textAlign = 'center';
  ctx.fillText('ε', W - pad.r + 6, H - pad.b);
  ctx.save(); ctx.translate(10, H / 2); ctx.rotate(-Math.PI / 2);
  ctx.fillText('σ [MPa]', 0, 0); ctx.restore();
  // Curve: elastic → plastic → fracture
  ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.shadowColor = color; ctx.shadowBlur = 3;
  const eRe = Re / E, eRm = eRe + (Rm - Re) / E * 8;
  const pts: [number, number][] = [[0, 0], [eRe, Re], [eRm, Rm], [eRm * 1.3, Rm * 0.92]];
  pts.forEach(([ep, sg], i) => { const x = tX(ep), y = tY(sg); i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); });
  ctx.stroke(); ctx.shadowBlur = 0;
  // Re marker
  ctx.strokeStyle = '#C9A84C'; ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
  ctx.beginPath(); ctx.moveTo(pad.l, tY(Re)); ctx.lineTo(tX(eRe), tY(Re)); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(tX(eRe), H - pad.b); ctx.lineTo(tX(eRe), tY(Re)); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#C9A84C'; ctx.font = '8px monospace'; ctx.textAlign = 'left';
  ctx.fillText('R_e', pad.l + 2, tY(Re) - 3);
  // Current point
  const curEp = Math.min(sigma / E, eRm * 1.3);
  const curSig = sigma <= Re ? sigma : sigma <= Rm ? sigma : Rm * 0.92;
  ctx.beginPath(); ctx.arc(tX(curEp), tY(curSig), 5, 0, Math.PI * 2);
  ctx.fillStyle = sigma > Re ? '#DC143C' : '#1a7a4a'; ctx.fill();
  ctx.font = '8px monospace'; ctx.textAlign = 'left'; ctx.fillStyle = sigma > Re ? '#DC143C' : '#1a7a4a';
  ctx.fillText('aktuell', tX(curEp) + 8, tY(curSig) + 3);
}

export default function HookeExperiment() {
  const [mat, setMat] = useState<HMatKey>('stahl');
  const [sigma, setSigma] = useState(150);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const m = MATS_H[mat];
  const epsilon = sigma / m.E;
  const plastic = sigma > m.Re;

  useEffect(() => { if (canvasRef.current) drawHooke(canvasRef.current, m.E, m.Re, m.Rm, sigma, m.color); }, [mat, sigma]);
  useEffect(() => {
    const obs = new ResizeObserver(() => { if (canvasRef.current) drawHooke(canvasRef.current, m.E, m.Re, m.Rm, sigma, m.color); });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [mat, sigma, m]);

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Hookesches Gesetz σ = E · ε</strong></div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {(Object.keys(MATS_H) as HMatKey[]).map(k => (
          <button key={k} onClick={() => { setMat(k); setSigma(Math.min(sigma, MATS_H[k].Rm * 0.9)); }} style={{
            padding: '4px 10px', fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '.05em', textTransform: 'uppercase',
            border: `1.5px solid ${mat === k ? MATS_H[k].color : 'var(--border)'}`,
            borderRadius: 4, background: mat === k ? MATS_H[k].color + '22' : 'var(--soft)',
            color: mat === k ? 'var(--navy)' : 'var(--muted)', cursor: 'pointer',
          }}>{MATS_H[k].label}</button>
        ))}
      </div>
      <label className={styles.sliderLabel} htmlFor="hk-sigma"><span>Spannung σ</span><strong>{sigma} MPa</strong></label>
      <input id="hk-sigma" type="range" min="0" max={Math.round(m.Rm * 0.98)} value={Math.min(sigma, Math.round(m.Rm * 0.98))}
        onChange={e => setSigma(+e.target.value)} />
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 200, borderRadius: 6, border: '1px solid var(--border)', marginTop: 12 }} />
      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>E-Modul</span><strong>{(m.E / 1000).toFixed(0)} GPa</strong></div>
        <div><span>ε</span><strong style={{ color: plastic ? '#DC143C' : 'var(--ok-t)' }}>{(epsilon * 1000).toFixed(2)} ‰</strong></div>
        <div><span>Streckgrenze R_e</span><strong>{m.Re} MPa</strong></div>
        <div><span>Bereich</span><strong style={{ color: plastic ? '#DC143C' : 'var(--ok-t)' }}>{plastic ? 'plastisch ⚠' : 'elastisch ✓'}</strong></div>
      </div>
    </div>
  );
}
