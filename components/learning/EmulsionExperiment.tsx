'use client';
/**
 * EmulsionExperiment — EXP:EMULSION-TRENNUNG / EXP:EMULGATOR-WIRKUNG
 * Oil/water separation and emulsifier stabilization
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

function draw(canvas: HTMLCanvasElement, emulsifier: number, time: number) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr; canvas.height = 180 * dpr;
  const ctx = canvas.getContext('2d')!; ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = 180;
  ctx.fillStyle = '#F9F8F5'; ctx.fillRect(0, 0, W, H);

  // Jar
  const jx = W * 0.15, jw = W * 0.7, jh = H - 30, jy = 15;
  ctx.strokeStyle = '#C0BEBA'; ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(jx, jy); ctx.lineTo(jx, jy + jh);
  ctx.lineTo(jx + jw, jy + jh); ctx.lineTo(jx + jw, jy); ctx.stroke();

  // Separation over time
  const separation = emulsifier > 0.5 ? 0 : Math.min(1, time / 5);
  const oilFraction = 0.4;
  const waterH = jh * (1 - oilFraction) * (1 - separation * 0.3);
  const oilH = jh * oilFraction;
  const mixH = jh - waterH - oilH * separation;

  // Water layer
  ctx.fillStyle = 'rgba(68,136,187,0.4)';
  ctx.fillRect(jx + 1, jy + oilH * separation + mixH, jw - 2, waterH);

  // Mixed / emulsified zone
  if (emulsifier > 0.3 || separation < 0.8) {
    const mixColor = emulsifier > 0.5 ? 'rgba(200,180,100,0.6)' : 'rgba(150,130,80,0.4)';
    ctx.fillStyle = mixColor;
    ctx.fillRect(jx + 1, jy + oilH * separation, jw - 2, mixH + (separation < 0.8 ? 5 : 0));
    // Droplets
    const dropCount = emulsifier > 0.5 ? 40 : Math.round(20 * (1 - separation));
    for (let i = 0; i < dropCount; i++) {
      const dx = jx + 5 + Math.random() * (jw - 10);
      const dy = jy + oilH * separation + Math.random() * (mixH + 10);
      const dr = emulsifier > 0.5 ? 3 + Math.random() * 3 : 2 + Math.random() * 6;
      ctx.beginPath(); ctx.arc(dx, dy, dr, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(218,165,32,0.7)'; ctx.fill();
      // Emulsifier coat
      if (emulsifier > 0.3) {
        ctx.beginPath(); ctx.arc(dx, dy, dr + 2, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(220,20,60,0.4)'; ctx.lineWidth = 1; ctx.stroke();
      }
    }
  }

  // Oil layer (top when separated)
  if (separation > 0.2) {
    ctx.fillStyle = 'rgba(218,165,32,0.6)';
    ctx.fillRect(jx + 1, jy, jw - 2, oilH * separation);
  }

  // Labels
  ctx.fillStyle = '#8A8880'; ctx.font = '9px monospace'; ctx.textAlign = 'left';
  if (separation > 0.5) {
    ctx.fillText('Öl', jx + jw + 4, jy + oilH * separation * 0.5 + 3);
    ctx.fillText('Wasser', jx + jw + 4, jy + oilH * separation + mixH + waterH * 0.5 + 3);
  } else {
    ctx.fillText('Emulsion', jx + jw + 4, jy + jh / 2);
  }
}

export default function EmulsionExperiment() {
  const [emulsifier, setEmulsifier] = useState(0);
  const [time, setTime] = useState(0);
  const [shaken, setShaken] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (canvasRef.current) draw(canvasRef.current, emulsifier, time);
  }, [emulsifier, time]);

  useEffect(() => {
    const obs = new ResizeObserver(() => { if (canvasRef.current) draw(canvasRef.current, emulsifier, time); });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [emulsifier, time]);

  const shake = () => {
    setShaken(true); setTime(0);
    if (timerRef.current) clearInterval(timerRef.current);
    if (emulsifier < 0.5) {
      timerRef.current = setInterval(() => {
        setTime(prev => { if (prev >= 8) { clearInterval(timerRef.current!); return 8; } return prev + 0.2; });
      }, 200);
    }
  };

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Emulsion — Öl und Wasser</strong></div>

      <label className={styles.sliderLabel} htmlFor="em-e">
        <span>Emulgator (Lecithin)</span>
        <strong style={{ color: emulsifier > 0.5 ? 'var(--ok-t)' : 'var(--muted)' }}>
          {emulsifier < 0.2 ? 'keiner' : emulsifier < 0.5 ? 'wenig' : emulsifier < 0.8 ? 'genug' : 'viel'}
        </strong>
      </label>
      <input id="em-e" type="range" min="0" max="1" step="0.05" value={emulsifier} onChange={e => { setEmulsifier(+e.target.value); setTime(0); setShaken(false); }} />

      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 180, borderRadius: 6, border: '1px solid var(--border)', marginTop: 12 }} />

      <button onClick={shake} style={{
        marginTop: 10, width: '100%', padding: '8px 0', borderRadius: 6,
        border: '1px solid var(--border)', background: 'var(--navy)', color: '#fff',
        fontFamily: 'var(--font-mono)', fontSize: 12, cursor: 'pointer',
      }}>🫙 Schütteln</button>

      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>Stabilität</span><strong style={{ color: emulsifier > 0.5 ? 'var(--ok-t)' : '#DC143C' }}>
          {emulsifier > 0.5 ? 'stabil (Mayonnaise)' : shaken && time < 3 ? 'kurzfristig' : 'trennt sich'}
        </strong></div>
        <div><span>Emulgator</span><strong>{emulsifier > 0.5 ? 'Lecithin aktiv ✓' : 'kein Emulgator'}</strong></div>
      </div>
    </div>
  );
}
