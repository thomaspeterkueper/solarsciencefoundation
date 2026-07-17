'use client';
/**
 * PumpExperiment — EXP:KOLBENPUMPE-SIMULATION / EXP:UNTERDRUCK-SAUGEN
 * Piston pump: suction height, pressure, flow rate
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

function draw(canvas: HTMLCanvasElement, stroke: number, suctionH: number, maxH: number) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr; canvas.height = 200 * dpr;
  const ctx = canvas.getContext('2d')!; ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = 200;
  ctx.fillStyle = '#0a1628'; ctx.fillRect(0, 0, W, H);

  const possible = suctionH <= maxH;

  // Cylinder
  const cylX = W * 0.55, cylY = 20, cylW = 50, cylH = 120;
  ctx.strokeStyle = '#888'; ctx.lineWidth = 2;
  ctx.strokeRect(cylX, cylY, cylW, cylH);

  // Piston
  const pistonY = cylY + 10 + stroke * (cylH - 30);
  ctx.fillStyle = '#C9A84C'; ctx.fillRect(cylX + 2, pistonY, cylW - 4, 14);

  // Pipe going down
  const pipeX = cylX + cylW / 2;
  ctx.strokeStyle = '#5B8FB9'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(pipeX, cylY + cylH); ctx.lineTo(pipeX, H - 10); ctx.stroke();

  // Water level (source)
  const waterY = H - 10 - suctionH * 5;
  ctx.fillStyle = 'rgba(68,136,187,0.4)';
  ctx.fillRect(W * 0.3, waterY, W * 0.6, H - 10 - waterY);

  // Water rising in pipe (during suction stroke)
  if (stroke < 0.5 && possible) {
    const riseH = (0.5 - stroke) * suctionH * 8;
    ctx.fillStyle = 'rgba(68,136,187,0.7)';
    ctx.fillRect(pipeX - 5, H - 10 - riseH, 10, riseH);
  }

  // Pressure indicator
  ctx.fillStyle = possible ? '#7AAD7A' : '#DC143C';
  ctx.font = 'bold 10px monospace'; ctx.textAlign = 'center';
  ctx.fillText(possible ? '✓ Wasser steigt' : '✗ Zu hoch!', W * 0.25, H / 2);
  ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '9px monospace';
  ctx.fillText(suctionH.toFixed(1) + ' m', W * 0.25, H / 2 + 14);
  ctx.fillText('max: ' + maxH.toFixed(1) + ' m', W * 0.25, H / 2 + 26);
}

export default function PumpExperiment() {
  const [suctionH, setSuctionH] = useState(4);
  const [playing, setPlaying] = useState(false);
  const [stroke, setStroke] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Max suction height = atmospheric pressure / (rho * g) ≈ 10.3m theoretical, ~7-8m practical
  const altitude = 0; // sea level
  const pAtm = 101325 * Math.exp(-altitude / 8500);
  const maxH = pAtm / (1000 * 9.81);
  const practical = maxH * 0.75;

  useEffect(() => { if (canvasRef.current) draw(canvasRef.current, stroke, suctionH, practical); }, [stroke, suctionH, practical]);

  useEffect(() => {
    if (playing) {
      animRef.current = setInterval(() => {
        setStroke(prev => (prev + 0.05) % 1);
      }, 80);
    } else if (animRef.current) clearInterval(animRef.current);
    return () => { if (animRef.current) clearInterval(animRef.current); };
  }, [playing]);

  useEffect(() => {
    const obs = new ResizeObserver(() => { if (canvasRef.current) draw(canvasRef.current, stroke, suctionH, practical); });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [stroke, suctionH, practical]);

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Kolbenpumpe — Unterdruck und Saughöhe</strong></div>

      <label className={styles.sliderLabel} htmlFor="pu-h">
        <span>Saughöhe</span>
        <strong style={{ color: suctionH > practical ? '#DC143C' : 'var(--ok-t)' }}>{suctionH.toFixed(1)} m</strong>
      </label>
      <input id="pu-h" type="range" min="0.5" max="12" step="0.1" value={suctionH} onChange={e => setSuctionH(+e.target.value)} />

      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 200, borderRadius: 6, border: '1px solid var(--border)', marginTop: 12, background: '#0a1628' }} />

      <button onClick={() => setPlaying(!playing)} style={{
        marginTop: 10, width: '100%', padding: '8px 0', borderRadius: 6, border: 'none',
        background: playing ? '#DC143C' : 'var(--navy)', color: '#fff',
        fontFamily: 'var(--font-mono)', fontSize: 12, cursor: 'pointer',
      }}>{playing ? '⏸ Stop' : '▶ Pumpe starten'}</button>

      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>Max. Saughöhe (theor.)</span><strong>{maxH.toFixed(1)} m</strong></div>
        <div><span>Praktisch max.</span><strong>{practical.toFixed(1)} m</strong></div>
        <div><span>Aktuell</span><strong style={{ color: suctionH > practical ? '#DC143C' : 'var(--ok-t)' }}>
          {suctionH > practical ? '✗ nicht möglich' : '✓ möglich'}
        </strong></div>
        <div><span>Unterdruck</span><strong>{(suctionH * 1000 * 9.81 / 100).toFixed(0)} mbar</strong></div>
      </div>
      <p style={{ marginTop: 8, fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
        {suctionH > practical ? '⚠ Atmosphärendruck reicht nicht — Pumpe saugt Luft statt Wasser. Lösung: Pumpe tiefer setzen.' :
         'Der Atmosphärendruck drückt das Wasser von unten in den Unterdruck-Bereich — nicht die Pumpe saugt, der Luftdruck schiebt.'}
      </p>
    </div>
  );
}
