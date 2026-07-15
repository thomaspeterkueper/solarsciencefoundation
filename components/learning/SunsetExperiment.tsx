'use client';
/**
 * SunsetExperiment — Sonnenwinkel → Wegstrecke → Sonnenfarbe
 * Covers: EXP:ATMOSPHAERE-PFAD, EXP:WEGLAENGE
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

function getSunColor(angle: number): string {
  if (angle > 60) return 'rgb(255,255,240)';
  if (angle > 30) return 'rgb(255,240,180)';
  if (angle > 15) return 'rgb(255,200,80)';
  if (angle > 8)  return 'rgb(255,140,30)';
  if (angle > 4)  return 'rgb(240,80,20)';
  return 'rgb(200,40,10)';
}
function getSunLabel(angle: number): string {
  if (angle > 60) return 'Weißlich — Mittagssonne';
  if (angle > 30) return 'Gelblich — Nachmittag';
  if (angle > 15) return 'Gold — Spätnachmittag';
  if (angle > 8)  return 'Orange — Abend';
  if (angle > 4)  return 'Tieforange — Kurz vor Untergang';
  return 'Tiefrot — Untergang';
}

function drawSunset(canvas: HTMLCanvasElement, angle: number) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = 180 * dpr;
  const ctx = canvas.getContext('2d')!;
  ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = 180;
  const earthY = H - 30;

  ctx.fillStyle = '#0a1628'; ctx.fillRect(0, 0, W, H);
  // Earth
  ctx.beginPath();
  ctx.ellipse(W/2, earthY+200, 380, 200, 0, 0, Math.PI*2);
  ctx.fillStyle = '#1a3a1a'; ctx.fill();
  // Atmosphere glow
  const atmoGrad = ctx.createLinearGradient(0, earthY-60, 0, earthY);
  atmoGrad.addColorStop(0, 'rgba(135,206,235,0)');
  atmoGrad.addColorStop(1, 'rgba(135,206,235,0.15)');
  ctx.fillStyle = atmoGrad; ctx.fillRect(0, earthY-60, W, 60);
  // Sun
  const sunColor = getSunColor(angle);
  const rad = angle * Math.PI / 180;
  const sunX = W * 0.75;
  const sunY = earthY - Math.sin(rad) * (H * 0.7);
  const glow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 55);
  glow.addColorStop(0, sunColor.replace('rgb','rgba').replace(')',',0.5)'));
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(sunX, sunY, 55, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(sunX, sunY, 11, 0, Math.PI*2);
  ctx.fillStyle = sunColor; ctx.fill();
  // Path line
  ctx.beginPath(); ctx.moveTo(sunX, sunY); ctx.lineTo(30, earthY-14);
  ctx.strokeStyle = 'rgba(255,255,200,0.2)'; ctx.lineWidth = 1.5;
  ctx.setLineDash([5,4]); ctx.stroke(); ctx.setLineDash([]);
  // Label
  const pathLen = angle < 5 ? '~11×' : (1/Math.sin(rad)).toFixed(1)+'×';
  ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '9px monospace'; ctx.textAlign = 'center';
  ctx.fillText('Lichtweg: ' + pathLen + ' Atmosphärendicke', W/2, H-8);
}

export default function SunsetExperiment() {
  const [angle, setAngle] = useState(45);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) drawSunset(canvasRef.current, angle);
  }, [angle]);

  useEffect(() => {
    const obs = new ResizeObserver(() => { if (canvasRef.current) drawSunset(canvasRef.current, angle); });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [angle]);

  const pathLen = angle < 5 ? '~11' : (1/Math.sin(angle*Math.PI/180)).toFixed(1);
  const blueLeft = Math.max(0, Math.round(Math.pow(0.75, +pathLen) * 100));

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}>
        <span className={styles.label}>Interaktives Experiment</span>
        <strong>Sonnenwinkel und Lichtfarbe</strong>
      </div>
      <label className={styles.sliderLabel} htmlFor="sunset-angle">
        <span>Sonnenwinkel</span>
        <strong>{angle}°</strong>
      </label>
      <input id="sunset-angle" type="range" min="2" max="90" value={angle}
        onChange={e => setAngle(+e.target.value)} />
      <canvas ref={canvasRef}
        style={{ display:'block', width:'100%', height:180, borderRadius:6,
          border:'1px solid var(--border)', marginTop:14 }} />
      <div className={styles.stats} style={{ marginTop: 12 }}>
        <div><span>Sonnenfarbe</span><strong>{getSunLabel(angle)}</strong></div>
        <div><span>Relative Wegstrecke</span><strong>{pathLen}×</strong></div>
        <div><span>Blau-Rest</span><strong>{blueLeft} %</strong></div>
        <div><span>Tageszeit</span><strong>
          {angle > 60 ? 'Mittag' : angle > 30 ? 'Nachmittag' : angle > 15 ? 'Spätnachmittag' : angle > 5 ? 'Abend' : 'Untergang'}
        </strong></div>
      </div>
    </div>
  );
}
