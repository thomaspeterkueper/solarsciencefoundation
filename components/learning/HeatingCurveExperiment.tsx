'use client';
/**
 * HeatingCurveExperiment — EXP:ERWAERMUNGSKURVE
 * Time slider → heating curve with plateaus at 0°C and 100°C, latent heat visualization
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

function getState(T: number): { label: string; color: string } {
  if (T < 0)   return { label: 'Eis', color: '#B0D4F1' };
  if (T === 0)  return { label: 'Schmelzen (Eis + Wasser)', color: '#7FAACC' };
  if (T < 100) return { label: 'Flüssiges Wasser', color: '#4488BB' };
  if (T === 100) return { label: 'Sieden (Wasser + Dampf)', color: '#88BBDD' };
  return { label: 'Wasserdampf', color: '#CCDDEE' };
}

function getTemp(t: number): number {
  // t: 0-20 min
  if (t < 2)   return -20 + t * 10;           // -20 → 0 °C (Eis erwärmt sich)
  if (t < 5)   return 0;                        // Plateau: Schmelzen
  if (t < 12)  return (t - 5) * (100 / 7);    // 0 → 100 °C (Wasser erwärmt sich)
  if (t < 17)  return 100;                      // Plateau: Sieden
  return 100 + (t - 17) * 10;                  // >100 °C (Dampf erwärmt sich)
}

function draw(canvas: HTMLCanvasElement, t: number) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr; canvas.height = 200 * dpr;
  const ctx = canvas.getContext('2d')!; ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = 200;
  const pad = { l: 42, r: 14, t: 14, b: 28 };
  ctx.fillStyle = '#F9F8F5'; ctx.fillRect(0, 0, W, H);
  const gW = W - pad.l - pad.r, gH = H - pad.t - pad.b;
  const tMax = 20, TMin = -25, TMax = 120;
  const tX = (time: number) => pad.l + (time / tMax) * gW;
  const tY = (temp: number) => H - pad.b - ((temp - TMin) / (TMax - TMin)) * gH;

  // Grid lines
  [-20, 0, 50, 100].forEach(temp => {
    ctx.strokeStyle = temp === 0 || temp === 100 ? '#C9A84C33' : '#E8E6DE';
    ctx.lineWidth = temp === 0 || temp === 100 ? 1.5 : 1;
    ctx.setLineDash(temp === 0 || temp === 100 ? [5, 4] : []);
    ctx.beginPath(); ctx.moveTo(pad.l, tY(temp)); ctx.lineTo(W - pad.r, tY(temp)); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = temp === 0 || temp === 100 ? '#C9A84C' : '#8A8880';
    ctx.font = temp === 0 || temp === 100 ? 'bold 8px monospace' : '8px monospace';
    ctx.textAlign = 'right'; ctx.fillText(temp + '°C', pad.l - 3, tY(temp) + 3);
  });

  // Axes
  ctx.strokeStyle = '#C0BEBA'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(pad.l, pad.t); ctx.lineTo(pad.l, H - pad.b); ctx.lineTo(W - pad.r, H - pad.b); ctx.stroke();
  ctx.fillStyle = '#8A8880'; ctx.font = '9px monospace'; ctx.textAlign = 'left';
  ctx.fillText('T (°C)', pad.l + 2, pad.t + 8);
  ctx.textAlign = 'center'; ctx.fillText('Zeit (min)', W / 2, H - 4);

  // Heating curve up to t
  ctx.beginPath(); ctx.strokeStyle = '#5B8FB9'; ctx.lineWidth = 2.5;
  ctx.shadowColor = '#5B8FB9'; ctx.shadowBlur = 3;
  for (let ti = 0; ti <= Math.min(t, tMax); ti += 0.1) {
    const T = getTemp(ti);
    ti === 0 ? ctx.moveTo(tX(ti), tY(T)) : ctx.lineTo(tX(ti), tY(T));
  }
  ctx.stroke(); ctx.shadowBlur = 0;

  // Plateau labels
  if (t > 2) {
    ctx.fillStyle = '#C9A84C'; ctx.font = 'bold 9px monospace'; ctx.textAlign = 'center';
    ctx.fillText('Latente Wärme', tX(3.5), tY(0) - 8);
    ctx.fillText('(Schmelzen)', tX(3.5), tY(0) - 18);
  }
  if (t > 12) {
    ctx.fillStyle = '#C9A84C'; ctx.font = 'bold 9px monospace'; ctx.textAlign = 'center';
    ctx.fillText('Latente Wärme', tX(14.5), tY(100) - 8);
    ctx.fillText('(Sieden)', tX(14.5), tY(100) - 18);
  }

  // Current point
  const curT = getTemp(Math.min(t, tMax));
  const state = getState(Math.round(curT));
  ctx.beginPath(); ctx.arc(tX(Math.min(t, tMax)), tY(curT), 6, 0, Math.PI * 2);
  ctx.fillStyle = state.color; ctx.strokeStyle = '#1C2B3A'; ctx.lineWidth = 1.5;
  ctx.fill(); ctx.stroke();
}

export default function HeatingCurveExperiment() {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const curT = Math.round(getTemp(Math.min(t, 20)));
  const state = getState(curT);

  useEffect(() => { if (canvasRef.current) draw(canvasRef.current, t); }, [t]);
  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setT(prev => { if (prev >= 20) { setPlaying(false); return 20; } return +(prev + 0.1).toFixed(1); });
      }, 80);
    } else if (intervalRef.current) clearInterval(intervalRef.current);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing]);

  useEffect(() => {
    const obs = new ResizeObserver(() => { if (canvasRef.current) draw(canvasRef.current, t); });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [t]);

  const latentNote = curT === 0 ? '⟵ 334 J/g werden für das Schmelzen verbraucht — Temperatur steigt nicht!' :
    curT === 100 ? '⟵ 2260 J/g werden für das Sieden verbraucht — Temperatur steigt nicht!' : '';

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Erwärmungskurve mit Plateaus</strong></div>
      <label className={styles.sliderLabel} htmlFor="hc-t"><span>Zeit</span><strong>{t.toFixed(1)} min</strong></label>
      <input id="hc-t" type="range" min="0" max="20" step="0.1" value={t} onChange={e => { setT(+e.target.value); setPlaying(false); }} />
      <div style={{ display: 'flex', gap: 8, margin: '10px 0' }}>
        <button onClick={() => setPlaying(!playing)} style={{
          flex: 1, padding: '8px 0', borderRadius: 6, border: 'none',
          background: playing ? '#DC143C' : 'var(--navy)', color: '#fff',
          fontFamily: 'var(--font-mono)', fontSize: 12, cursor: 'pointer',
        }}>{playing ? '⏸ Pause' : '▶ Animieren'}</button>
        <button onClick={() => { setT(0); setPlaying(false); }} style={{
          padding: '8px 14px', borderRadius: 6, border: '1px solid var(--border)',
          background: 'var(--soft)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 12, cursor: 'pointer',
        }}>Neu</button>
      </div>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 200, borderRadius: 6, border: '1px solid var(--border)', marginBottom: 10 }} />
      {latentNote && (
        <div style={{ padding: '8px 12px', background: '#FFF8E7', border: '1px solid #DFC87A', borderRadius: 6, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--navy)' }}>
          {latentNote}
        </div>
      )}
      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>Temperatur</span><strong style={{ fontSize: 18 }}>{curT}°C</strong></div>
        <div><span>Zustand</span><strong style={{ color: '#5B8FB9' }}>{state.label}</strong></div>
      </div>
    </div>
  );
}
