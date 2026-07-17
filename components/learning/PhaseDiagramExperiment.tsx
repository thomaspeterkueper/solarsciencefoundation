'use client';
/**
 * PhaseDiagramExperiment — EXP:PHASENDIAGRAMM
 * Water phase diagram: pressure/temperature canvas, moveable point
 * Shows solid/liquid/gas regions, triple point, critical point, sublimation
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

function draw(canvas: HTMLCanvasElement, T: number, P: number) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr; canvas.height = 220 * dpr;
  const ctx = canvas.getContext('2d')!; ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = 220;
  const pad = { l: 52, r: 16, t: 16, b: 32 };
  ctx.fillStyle = '#0a1628'; ctx.fillRect(0, 0, W, H);
  const gW = W - pad.l - pad.r, gH = H - pad.t - pad.b;

  // Log scale for pressure: 0.001 to 220 bar
  const Tmin = -60, Tmax = 380;
  const Pmin = 0.001, Pmax = 220;
  const tX = (t: number) => pad.l + ((t - Tmin) / (Tmax - Tmin)) * gW;
  const pY = (p: number) => {
    const logMin = Math.log10(Pmin), logMax = Math.log10(Pmax);
    return H - pad.b - ((Math.log10(Math.max(Pmin, p)) - logMin) / (logMax - logMin)) * gH;
  };

  // Phase regions
  // Solid (left/high pressure)
  ctx.fillStyle = 'rgba(91,143,185,0.25)';
  ctx.fillRect(pad.l, pad.t, tX(0) - pad.l, gH);
  // Liquid (middle)
  ctx.fillStyle = 'rgba(68,136,187,0.2)';
  const liqPath = new Path2D();
  liqPath.moveTo(tX(0), pY(0.006)); liqPath.lineTo(tX(374), pY(220.64));
  liqPath.lineTo(tX(374), pad.t); liqPath.lineTo(tX(0), pad.t); liqPath.closePath();
  ctx.fill(liqPath);
  // Gas (right/low pressure)
  ctx.fillStyle = 'rgba(176,212,241,0.1)';
  ctx.fillRect(tX(0), pY(0.006), W - pad.r - tX(0), pY(Pmin) - pY(0.006));

  // Phase boundaries
  // Melting curve (solid-liquid): nearly vertical at 0°C, slight negative slope
  ctx.strokeStyle = '#5B8FB9'; ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (let p = 0.006; p <= 220; p *= 1.1) {
    const t = -p * 0.0075; // slight negative slope (anomaly)
    ctx.lineTo(tX(t), pY(p));
  }
  ctx.stroke();

  // Boiling curve (liquid-gas): 0°C/0.006 bar to 374°C/220.64 bar
  ctx.strokeStyle = '#88BBDD'; ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (let t = 0; t <= 374; t += 2) {
    const p = 0.006 * Math.exp(0.0555 * t);
    ctx.lineTo(tX(t), pY(p));
  }
  ctx.stroke();

  // Sublimation curve (solid-gas)
  ctx.strokeStyle = '#B0D4F1'; ctx.lineWidth = 1.5; ctx.setLineDash([4,3]);
  ctx.beginPath();
  for (let t = -60; t <= 0; t += 2) {
    const p = 0.006 * Math.exp(0.072 * t);
    ctx.lineTo(tX(t), pY(p));
  }
  ctx.stroke(); ctx.setLineDash([]);

  // Triple point (0.01°C, 0.00611 bar)
  ctx.beginPath(); ctx.arc(tX(0.01), pY(0.00611), 5, 0, Math.PI * 2);
  ctx.fillStyle = '#C9A84C'; ctx.fill();
  ctx.fillStyle = '#C9A84C'; ctx.font = '8px monospace'; ctx.textAlign = 'left';
  ctx.fillText('Tripelpunkt', tX(2), pY(0.006) - 6);

  // Critical point (374°C, 220.64 bar)
  ctx.beginPath(); ctx.arc(tX(374), pY(220.64), 5, 0, Math.PI * 2);
  ctx.fillStyle = '#FF6B6B'; ctx.fill();
  ctx.fillStyle = '#FF6B6B'; ctx.font = '8px monospace'; ctx.textAlign = 'right';
  ctx.fillText('Kritischer Punkt', tX(372), pY(220.64) - 6);

  // Axis labels
  ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '8px monospace';
  [0, 100, 200, 300].forEach(t => {
    ctx.textAlign = 'center';
    ctx.fillText(t + '°C', tX(t), H - pad.b + 12);
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(tX(t), pad.t); ctx.lineTo(tX(t), H - pad.b); ctx.stroke();
  });
  [0.01, 0.1, 1, 10, 100].forEach(p => {
    ctx.textAlign = 'right';
    ctx.fillText(p + 'b', pad.l - 3, pY(p) + 3);
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(pad.l, pY(p)); ctx.lineTo(W - pad.r, pY(p)); ctx.stroke();
  });

  // Region labels
  ctx.fillStyle = 'rgba(91,143,185,0.7)'; ctx.font = 'bold 11px monospace'; ctx.textAlign = 'center';
  ctx.fillText('EIS', tX(-30), pY(10));
  ctx.fillStyle = 'rgba(68,136,187,0.7)';
  ctx.fillText('WASSER', tX(150), pY(5));
  ctx.fillStyle = 'rgba(176,212,241,0.5)';
  ctx.fillText('DAMPF', tX(200), pY(0.02));

  // Current point
  const curPhase = T < -0.0075 * P ? 'Eis' : (0.006 * Math.exp(0.0555 * T) > P && T < 374) ? 'Dampf' : T >= 374 && P >= 220.64 ? 'überkritisch' : 'Wasser';
  const ptColor = curPhase === 'Eis' ? '#B0D4F1' : curPhase === 'Dampf' ? '#88CCFF' : curPhase === 'überkritisch' ? '#FF6B6B' : '#4488BB';
  ctx.beginPath(); ctx.arc(tX(T), pY(P), 7, 0, Math.PI * 2);
  ctx.fillStyle = ptColor; ctx.shadowColor = ptColor; ctx.shadowBlur = 10; ctx.fill(); ctx.shadowBlur = 0;
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke();
}

export default function PhaseDiagramExperiment() {
  const [T, setT] = useState(20);
  const [P, setP] = useState(1.013);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getPhase = (): string => {
    if (T < 0 && P > 0.00611) return 'Eis ❄';
    if (T < 0 && P <= 0.00611) return 'Sublimation';
    if (T >= 374 && P >= 220.64) return 'Überkritisches Fluid';
    if (0.006 * Math.exp(0.0555 * T) > P) return 'Wasserdampf 💨';
    return 'Flüssiges Wasser 💧';
  };

  useEffect(() => { if (canvasRef.current) draw(canvasRef.current, T, P); }, [T, P]);
  useEffect(() => {
    const obs = new ResizeObserver(() => { if (canvasRef.current) draw(canvasRef.current, T, P); });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [T, P]);

  const scenarios = [
    { label: 'Zimmer', T: 20, P: 1.013 },
    { label: 'Everest', T: -30, P: 0.33 },
    { label: 'Kochtopf', T: 100, P: 1.013 },
    { label: 'Schnellkochtopf', T: 121, P: 2.1 },
    { label: 'Tripelpunkt', T: 0.01, P: 0.00611 },
  ];

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Phasendiagramm Wasser</strong></div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {scenarios.map(s => (
          <button key={s.label} onClick={() => { setT(s.T); setP(s.P); }} style={{
            padding: '4px 10px', fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '.04em', textTransform: 'uppercase',
            border: '1px solid var(--border)', borderRadius: 4,
            background: 'var(--soft)', color: 'var(--muted)', cursor: 'pointer',
          }}>{s.label}</button>
        ))}
      </div>
      <label className={styles.sliderLabel} htmlFor="pd-t"><span>Temperatur</span><strong>{T}°C</strong></label>
      <input id="pd-t" type="range" min="-60" max="380" value={T} onChange={e => setT(+e.target.value)} />
      <label className={styles.sliderLabel} htmlFor="pd-p" style={{ marginTop: 8 }}>
        <span>Druck</span><strong>{P < 0.1 ? P.toFixed(4) : P.toFixed(2)} bar</strong>
      </label>
      <input id="pd-p" type="range" min="-3" max="2.35" step="0.05" value={Math.log10(P)}
        onChange={e => setP(+Math.pow(10, +e.target.value).toFixed(5))} />
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 220, borderRadius: 6, border: '1px solid var(--border)', marginTop: 12, background: '#0a1628' }} />
      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>Aggregatzustand</span><strong style={{ color: '#5B8FB9', fontSize: 15 }}>{getPhase()}</strong></div>
        <div><span>Druck (log)</span><strong>{P < 0.01 ? P.toExponential(2) : P.toFixed(3)} bar</strong></div>
      </div>
    </div>
  );
}
