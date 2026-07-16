'use client';
/**
 * CoolingExperiment — EXP:KAFFEETASSE
 * Newton cooling law: T(t) = T_env + (T0 - T_env) * exp(-k*t)
 * Sliders for T0, T_env, k — cooling curve canvas + time to drink temp
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

function drawCooling(canvas: HTMLCanvasElement, T0: number, Tenv: number, k: number, tDrink: number) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr; canvas.height = 180 * dpr;
  const ctx = canvas.getContext('2d')!; ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = 180;
  const pad = { l: 40, r: 14, t: 14, b: 28 };
  ctx.fillStyle = '#F9F8F5'; ctx.fillRect(0, 0, W, H);
  const gW = W - pad.l - pad.r, gH = H - pad.t - pad.b;

  const tMax = Math.max(30, -Math.log(0.02) / k);
  const Tmax = T0 + 5, Tmin = Math.min(Tenv - 5, 10);
  const tX = (t: number) => pad.l + (t / tMax) * gW;
  const tY = (T: number) => H - pad.b - ((T - Tmin) / (Tmax - Tmin)) * gH;

  // Grid
  ctx.strokeStyle = '#E8E6DE'; ctx.lineWidth = 1;
  for (let i = 1; i <= 4; i++) {
    const y = H - pad.b - (i / 4) * gH;
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(W - pad.r, y); ctx.stroke();
    ctx.fillStyle = '#8A8880'; ctx.font = '8px monospace'; ctx.textAlign = 'right';
    ctx.fillText(Math.round(Tmin + (Tmax - Tmin) * i / 4) + '°', pad.l - 3, y + 3);
  }
  // Axes
  ctx.strokeStyle = '#C0BEBA'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(pad.l, pad.t); ctx.lineTo(pad.l, H - pad.b); ctx.lineTo(W - pad.r, H - pad.b); ctx.stroke();
  ctx.fillStyle = '#8A8880'; ctx.font = '9px monospace'; ctx.textAlign = 'left';
  ctx.fillText('T (°C)', pad.l + 2, pad.t + 9);
  ctx.textAlign = 'center'; ctx.fillText('t (min)', W / 2, H - 4);

  // Env temperature line
  ctx.strokeStyle = '#5B8FB9'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
  ctx.beginPath(); ctx.moveTo(pad.l, tY(Tenv)); ctx.lineTo(W - pad.r, tY(Tenv)); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#5B8FB9'; ctx.font = '8px monospace'; ctx.textAlign = 'right';
  ctx.fillText('T_umg = ' + Tenv + '°', W - pad.r - 2, tY(Tenv) - 3);

  // Drink temperature line
  ctx.strokeStyle = '#7AAD7A'; ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
  ctx.beginPath(); ctx.moveTo(pad.l, tY(tDrink)); ctx.lineTo(W - pad.r, tY(tDrink)); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#7AAD7A'; ctx.font = '8px monospace'; ctx.textAlign = 'right';
  ctx.fillText('T_trink = ' + tDrink + '°', W - pad.r - 2, tY(tDrink) + 9);

  // Cooling curve
  ctx.beginPath(); ctx.strokeStyle = '#C9A84C'; ctx.lineWidth = 2.5;
  ctx.shadowColor = '#C9A84C'; ctx.shadowBlur = 4;
  let tCross = -1;
  for (let px = 0; px <= gW; px++) {
    const t = (px / gW) * tMax;
    const T = Tenv + (T0 - Tenv) * Math.exp(-k * t);
    if (T <= tDrink && tCross < 0) tCross = t;
    const x = pad.l + px, y = tY(T);
    px === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke(); ctx.shadowBlur = 0;

  // Crossing point
  if (tCross > 0 && tCross < tMax) {
    const cx = tX(tCross), cy = tY(tDrink);
    ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#7AAD7A'; ctx.fill();
    ctx.fillStyle = '#7AAD7A'; ctx.font = 'bold 9px monospace'; ctx.textAlign = 'left';
    ctx.fillText(tCross.toFixed(1) + ' min', cx + 8, cy - 3);
  }
}

export default function CoolingExperiment() {
  const [T0,    setT0]    = useState(95);
  const [Tenv,  setTenv]  = useState(20);
  const [k,     setK]     = useState(0.08);
  const [tDrink, setTDrink] = useState(55);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const timeToTemp = (T0 - Tenv) > 0 && (tDrink - Tenv) > 0 && tDrink < T0
    ? -Math.log((tDrink - Tenv) / (T0 - Tenv)) / k
    : null;

  useEffect(() => {
    if (canvasRef.current) drawCooling(canvasRef.current, T0, Tenv, k, tDrink);
  }, [T0, Tenv, k, tDrink]);

  useEffect(() => {
    const obs = new ResizeObserver(() => {
      if (canvasRef.current) drawCooling(canvasRef.current, T0, Tenv, k, tDrink);
    });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [T0, Tenv, k, tDrink]);

  const note = k < 0.05 ? 'Breite Tasse — langsame Abkühlung (kleine Oberfläche).'
    : k < 0.12 ? 'Typische Tasse.'
    : 'Schmale hohe Tasse — schnelle Abkühlung (große Oberfläche relativ zu Volumen).';

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}>
        <span className={styles.label}>Experiment</span>
        <strong>Abkühlungskurve — Newton'sches Gesetz</strong>
      </div>
      <label className={styles.sliderLabel} htmlFor="co-T0">
        <span>Anfangstemperatur T₀</span><strong>{T0} °C</strong>
      </label>
      <input id="co-T0" type="range" min="60" max="100" value={T0}
        onChange={e => setT0(+e.target.value)} />
      <label className={styles.sliderLabel} htmlFor="co-Tenv" style={{ marginTop: 8 }}>
        <span>Umgebungstemperatur</span><strong>{Tenv} °C</strong>
      </label>
      <input id="co-Tenv" type="range" min="5" max="35" value={Tenv}
        onChange={e => setTenv(+e.target.value)} />
      <label className={styles.sliderLabel} htmlFor="co-k" style={{ marginTop: 8 }}>
        <span>Abkühlkonstante k</span><strong>{k.toFixed(3)} /min</strong>
      </label>
      <input id="co-k" type="range" min="0.02" max="0.25" step="0.005" value={k}
        onChange={e => setK(+e.target.value)} />
      <label className={styles.sliderLabel} htmlFor="co-td" style={{ marginTop: 8 }}>
        <span>Trinktemperatur</span><strong>{tDrink} °C</strong>
      </label>
      <input id="co-td" type="range" min="35" max="75" value={tDrink}
        onChange={e => setTDrink(+e.target.value)} />
      <canvas ref={canvasRef}
        style={{ display: 'block', width: '100%', height: 180, borderRadius: 6,
          border: '1px solid var(--border)', marginTop: 14 }} />
      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>T(t) = </span>
          <strong style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>
            {Tenv} + {T0 - Tenv}·e^(−{k.toFixed(3)}·t)
          </strong>
        </div>
        <div><span>Wartezeit</span>
          <strong style={{ color: timeToTemp ? 'var(--ok-t)' : 'var(--muted)' }}>
            {timeToTemp ? timeToTemp.toFixed(1) + ' min' : '— (zu kalt)'}
          </strong>
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <span>Tassen-Typ</span><strong style={{ fontSize: 12 }}>{note}</strong>
        </div>
      </div>
    </div>
  );
}
