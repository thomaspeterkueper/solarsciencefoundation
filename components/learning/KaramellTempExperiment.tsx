'use client';
/**
 * KaramellTempExperiment — EXP:KARAMELL-TEMP
 * Temperature slider 100-200°C → sugar state, color, aroma live on canvas
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

type Stage = {
  label: string;
  color: string;
  aroma: string;
  desc: string;
  warning?: boolean;
};

function getStage(T: number): Stage {
  if (T < 140) return { label: 'Kristalliner Zucker', color: '#FAFAF5', aroma: '—', desc: 'Nichts passiert. Zucker bleibt weiss und fest.' };
  if (T < 155) return { label: 'Zucker schmilzt', color: '#FFF8DC', aroma: 'neutral', desc: 'Zucker wird flüssig. Noch keine Reaktion — nur Schmelzen.' };
  if (T < 165) return { label: 'Karamellisierung beginnt', color: '#FFD700', aroma: 'süss-karamellig', desc: 'Saccharose zerfällt in Frucht- und Traubenzucker. Erste Aromamoleküle entstehen.' };
  if (T < 175) return { label: 'Goldkaramell', color: '#DAA520', aroma: 'reich, nussig', desc: 'Hunderte Aromastoffe bilden sich. Das klassische Karamell-Aroma. Ideal für Desserts.' };
  if (T < 185) return { label: 'Dunkles Karamell', color: '#8B6914', aroma: 'intensiv, leicht bitter', desc: 'Komplexes Aroma. Ideal für Soßen und Crème brûlée. Vorsicht: nur Sekunden bis zur Verbrennung.' };
  if (T < 195) return { label: '⚠ Verbrennung', color: '#3D2000', aroma: 'bitter, verbrannt', desc: 'Kohlenstoff bildet sich. Nicht mehr verwendbar — wegwerfen.', warning: true };
  return { label: '⚠ Verbrannt', color: '#1A0A00', aroma: 'Rauch', desc: 'Komplett verbrannt. Fenster auf.', warning: true };
}

function draw(canvas: HTMLCanvasElement, T: number, stage: Stage) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr; canvas.height = 160 * dpr;
  const ctx = canvas.getContext('2d')!; ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = 160;
  ctx.fillStyle = '#F9F8F5'; ctx.fillRect(0, 0, W, H);

  // Pot
  const px = W * 0.5, py = H * 0.72, pw = W * 0.55, ph = H * 0.42;
  ctx.strokeStyle = '#888'; ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(px - pw / 2, py - ph);
  ctx.lineTo(px - pw / 2, py);
  ctx.quadraticCurveTo(px - pw / 2, py + 14, px, py + 14);
  ctx.quadraticCurveTo(px + pw / 2, py + 14, px + pw / 2, py);
  ctx.lineTo(px + pw / 2, py - ph);
  ctx.stroke();

  // Sugar fill
  const fillH = ph * 0.65;
  const grad = ctx.createLinearGradient(0, py - fillH, 0, py + 14);
  grad.addColorStop(0, stage.color);
  grad.addColorStop(1, stage.color + 'CC');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(px - pw / 2 + 3, py - fillH + 3);
  ctx.lineTo(px + pw / 2 - 3, py - fillH + 3);
  ctx.lineTo(px + pw / 2 - 3, py);
  ctx.quadraticCurveTo(px + pw / 2 - 3, py + 12, px, py + 12);
  ctx.quadraticCurveTo(px - pw / 2 + 3, py + 12, px - pw / 2 + 3, py);
  ctx.closePath(); ctx.fill();

  // Bubbles if hot enough
  if (T > 155) {
    const count = Math.min(12, Math.round((T - 155) / 4));
    for (let i = 0; i < count; i++) {
      const bx = px - pw * 0.3 + Math.sin(i * 2.1) * pw * 0.28;
      const by = py - fillH * 0.2 - (i * 7 % (fillH * 0.5));
      ctx.beginPath(); ctx.arc(bx, by, 2 + i % 3, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 1; ctx.stroke();
    }
  }

  // Temperature scale on right
  const scaleX = W * 0.88, scaleTop = 16, scaleH = H - 32;
  ctx.fillStyle = '#E8E6DE'; ctx.fillRect(scaleX - 3, scaleTop, 6, scaleH);
  const tMin = 100, tMax = 200;
  const markerY = scaleTop + (1 - (T - tMin) / (tMax - tMin)) * scaleH;
  ctx.fillStyle = stage.warning ? '#DC143C' : '#C9A84C';
  ctx.beginPath(); ctx.arc(scaleX, markerY, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#1C2B3A'; ctx.font = 'bold 11px monospace'; ctx.textAlign = 'right';
  ctx.fillText(T + '°C', scaleX - 10, markerY + 4);
  [100, 140, 160, 180, 200].forEach(t => {
    const y = scaleTop + (1 - (t - tMin) / (tMax - tMin)) * scaleH;
    ctx.fillStyle = '#C0BEBA'; ctx.font = '8px monospace'; ctx.textAlign = 'right';
    ctx.fillText(t + '°', scaleX - 10, y + 3);
    ctx.fillStyle = '#E8E6DE'; ctx.fillRect(scaleX - 8, y, 16, 1);
  });
}

export default function KaramellTempExperiment() {
  const [T, setT] = useState(130);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stage = getStage(T);

  useEffect(() => { if (canvasRef.current) draw(canvasRef.current, T, stage); }, [T]);
  useEffect(() => {
    const obs = new ResizeObserver(() => { if (canvasRef.current) draw(canvasRef.current, T, stage); });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [T, stage]);

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Die Temperatur-Schwelle</strong></div>
      <label className={styles.sliderLabel} htmlFor="ka-t"><span>Temperatur</span><strong style={{ color: stage.warning ? '#DC143C' : 'var(--navy)' }}>{T} °C</strong></label>
      <input id="ka-t" type="range" min="100" max="200" value={T} onChange={e => setT(+e.target.value)} />
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 160, borderRadius: 6, border: `2px solid ${stage.warning ? '#DC143C' : 'var(--border)'}`, marginTop: 12 }} />
      <div style={{ marginTop: 10, padding: '12px 14px', background: stage.warning ? '#F5EEEE' : 'var(--surface)', borderRadius: 6, border: `1px solid ${stage.warning ? '#C49090' : 'var(--border)'}` }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: stage.warning ? '#6B2222' : 'var(--gold-2, #E09400)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 4 }}>{stage.label}</div>
        <div style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>{stage.desc}</div>
      </div>
      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>Aroma</span><strong>{stage.aroma}</strong></div>
        <div><span>Status</span><strong style={{ color: stage.warning ? '#DC143C' : T > 164 ? 'var(--ok-t)' : 'var(--muted)' }}>{T < 140 ? 'noch nichts' : T < 160 ? 'schmelzend' : T < 185 ? 'karamellisiert' : 'verbrannt'}</strong></div>
      </div>
    </div>
  );
}
