'use client';
/**
 * SpinExperiment — EXP:POLARITAET
 * Electron spins: alignment slider → net magnetic field, Curie temperature
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

function drawSpins(canvas: HTMLCanvasElement, alignment: number, T: number) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr; canvas.height = 180 * dpr;
  const ctx = canvas.getContext('2d')!; ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = 180;
  ctx.fillStyle = '#0a1628'; ctx.fillRect(0, 0, W, H);

  const cols = 8, rows = 4;
  const cw = (W - 40) / cols, ch = (H - 40) / rows;
  const curie = T > 770; // Iron Curie temp ~770°C
  const effectiveAlignment = curie ? 0 : alignment;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = 20 + c * cw + cw / 2;
      const cy = 20 + r * ch + ch / 2;
      // Random deviation based on alignment
      const deviation = (1 - effectiveAlignment) * Math.PI;
      const baseAngle = -Math.PI / 2; // up = aligned
      const angle = baseAngle + (Math.random() - 0.5) * deviation * 2;
      const len = 14;

      // Electron circle
      ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(91,143,185,0.3)'; ctx.fill();

      // Spin arrow
      const aligned = Math.abs(angle - baseAngle) < 0.3;
      ctx.strokeStyle = aligned ? '#C9A84C' : '#5B8FB9';
      ctx.fillStyle = aligned ? '#C9A84C' : '#5B8FB9';
      ctx.lineWidth = 2;
      const ex = cx + Math.cos(angle) * len, ey = cy + Math.sin(angle) * len;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ex, ey); ctx.stroke();
      // Arrowhead
      const aang = angle;
      ctx.beginPath();
      ctx.moveTo(ex, ey);
      ctx.lineTo(ex - 6 * Math.cos(aang - 0.4), ey - 6 * Math.sin(aang - 0.4));
      ctx.lineTo(ex - 6 * Math.cos(aang + 0.4), ey - 6 * Math.sin(aang + 0.4));
      ctx.closePath(); ctx.fill();
    }
  }

  // Net field arrow (right side)
  const netX = W - 24, netTop = 30, netBot = H - 30;
  const netLen = (netBot - netTop) * effectiveAlignment;
  ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(netX, netTop); ctx.lineTo(netX, netBot); ctx.stroke();
  if (netLen > 5) {
    ctx.strokeStyle = '#C9A84C'; ctx.lineWidth = 3;
    ctx.shadowColor = '#C9A84C'; ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(netX, netBot - netLen); ctx.lineTo(netX, netTop + 10); ctx.stroke();
    ctx.fillStyle = '#C9A84C';
    ctx.beginPath(); ctx.moveTo(netX, netTop + 10);
    ctx.lineTo(netX - 6, netTop + 22); ctx.lineTo(netX + 6, netTop + 22);
    ctx.closePath(); ctx.fill(); ctx.shadowBlur = 0;
  }
  ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.font = '8px monospace'; ctx.textAlign = 'center';
  ctx.fillText('Netto-B', netX, H - 8);

  if (curie) {
    ctx.fillStyle = '#DC143C'; ctx.font = 'bold 11px monospace'; ctx.textAlign = 'center';
    ctx.fillText('Curie-Temperatur erreicht — Magnetismus weg', W / 2, H - 10);
  }
}

export default function SpinExperiment() {
  const [alignment, setAlignment] = useState(0.1);
  const [T, setT] = useState(20);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => { if (canvasRef.current) drawSpins(canvasRef.current, alignment, T); }, [alignment, T]);
  useEffect(() => {
    const obs = new ResizeObserver(() => { if (canvasRef.current) drawSpins(canvasRef.current, alignment, T); });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [alignment, T]);

  const curie = T > 770;
  const netField = curie ? 0 : Math.round(alignment * 100);

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Elektronenspin und Netto-Magnetfeld</strong></div>

      <label className={styles.sliderLabel} htmlFor="sp-a">
        <span>Spin-Ausrichtung</span>
        <strong style={{ color: alignment > 0.7 ? '#C9A84C' : 'var(--muted)' }}>
          {alignment < 0.2 ? 'chaotisch' : alignment < 0.5 ? 'teilweise' : alignment < 0.8 ? 'stark' : 'vollständig'}
        </strong>
      </label>
      <input id="sp-a" type="range" min="0" max="1" step="0.01" value={alignment}
        onChange={e => setAlignment(+e.target.value)} disabled={curie} />

      <label className={styles.sliderLabel} htmlFor="sp-t" style={{ marginTop: 8 }}>
        <span>Temperatur</span>
        <strong style={{ color: curie ? '#DC143C' : 'var(--ok-t)' }}>{T}°C {curie ? '— Curie-Punkt überschritten!' : ''}</strong>
      </label>
      <input id="sp-t" type="range" min="0" max="900" value={T} onChange={e => setT(+e.target.value)} />

      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 180, borderRadius: 6, border: '1px solid var(--border)', marginTop: 12, background: '#0a1628' }} />

      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>Netto-Magnetfeld</span><strong style={{ color: netField > 50 ? '#C9A84C' : 'var(--muted)', fontSize: 16 }}>{netField}%</strong></div>
        <div><span>Curie-Temp. Eisen</span><strong>770°C</strong></div>
        <div style={{ gridColumn: 'span 2' }}>
          <span>Erkenntnis</span>
          <strong style={{ fontSize: 12 }}>
            {curie ? 'Über 770°C: Wärmebewegung zerstört Spin-Ausrichtung — kein Permanentmagnet mehr' :
             alignment < 0.3 ? 'Spins heben sich auf — kein Netto-Magnetfeld sichtbar' :
             'Gleichgerichtete Spins addieren sich zu einem messbaren Magnetfeld'}
          </strong>
        </div>
      </div>
    </div>
  );
}
