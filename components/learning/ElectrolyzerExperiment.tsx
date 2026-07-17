'use client';
/**
 * ElectrolyzerExperiment — EXP:BATTERIE-LADEN-ENTLADEN (electrolysis context)
 * PEM electrolyzer cross-section: voltage, bubble production, efficiency
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

function draw(canvas: HTMLCanvasElement, voltage: number, t: number) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr; canvas.height = 200 * dpr;
  const ctx = canvas.getContext('2d')!; ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = 200;
  ctx.fillStyle = '#0a1628'; ctx.fillRect(0, 0, W, H);

  const active = voltage >= 1.23;
  const rate = active ? Math.min(1, (voltage - 1.23) / 0.8) : 0;

  // Background water
  ctx.fillStyle = 'rgba(68,136,187,0.15)'; ctx.fillRect(0, 0, W, H);

  // Cell walls
  const cellX = W * 0.2, cellW = W * 0.6, cellY = 20, cellH = H - 40;
  ctx.strokeStyle = '#555'; ctx.lineWidth = 2;
  ctx.strokeRect(cellX, cellY, cellW, cellH);

  // Membrane in center
  const memX = W / 2;
  ctx.fillStyle = '#C9A84C88';
  ctx.fillRect(memX - 4, cellY + 4, 8, cellH - 8);
  ctx.fillStyle = '#C9A84C'; ctx.font = '8px monospace'; ctx.textAlign = 'center';
  ctx.fillText('PEM', memX, cellY + cellH / 2 + 3);

  // Cathode (left, -) — H2 bubbles
  ctx.fillStyle = '#5B8FB9'; ctx.fillRect(cellX + 4, cellY + 4, 18, cellH - 8);
  ctx.fillStyle = '#fff'; ctx.font = 'bold 9px monospace'; ctx.textAlign = 'center';
  ctx.fillText('−', cellX + 13, H / 2 + 4);
  ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.font = '8px monospace';
  ctx.fillText('H₂', cellX + 13, H / 2 + 18);

  // Anode (right, +) — O2 bubbles
  ctx.fillStyle = '#DC143C55'; ctx.fillRect(memX + 8, cellY + 4, cellX + cellW - memX - 12, cellH - 8);
  ctx.fillStyle = '#fff'; ctx.font = 'bold 9px monospace'; ctx.textAlign = 'center';
  ctx.fillText('+', cellX + cellW - 13, H / 2 + 4);
  ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.font = '8px monospace';
  ctx.fillText('IrO₂', cellX + cellW - 20, cellY + 16);
  ctx.fillText('O₂', cellX + cellW - 13, H / 2 + 18);

  // Bubbles
  if (active) {
    const bubblesH2 = Math.round(rate * 8);
    const bubblesO2 = Math.round(rate * 4); // half as many O2
    const rng = (seed: number) => ((seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;

    for (let i = 0; i < bubblesH2; i++) {
      const bx = cellX + 8 + rng(i * 7 + t) * 12;
      const by = cellY + 10 + ((rng(i * 3 + t * 0.3) + t * 0.02) % 1) * (cellH - 20);
      ctx.beginPath(); ctx.arc(bx, by, 2 + rng(i) * 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(100,180,255,0.6)'; ctx.fill();
    }
    for (let i = 0; i < bubblesO2; i++) {
      const bx = cellX + cellW - 8 - rng(i * 5 + t) * 20;
      const by = cellY + 10 + ((rng(i * 11 + t * 0.2) + t * 0.015) % 1) * (cellH - 20);
      ctx.beginPath(); ctx.arc(bx, by, 2 + rng(i + 100) * 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,100,100,0.5)'; ctx.fill();
    }

    // Proton arrows through membrane
    for (let i = 0; i < 3; i++) {
      const ay = cellY + 40 + i * 40;
      ctx.strokeStyle = 'rgba(201,168,76,0.6)'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(memX - 15, ay); ctx.lineTo(memX + 15, ay); ctx.stroke();
      ctx.fillStyle = '#C9A84C'; ctx.font = '8px monospace'; ctx.textAlign = 'center';
      ctx.fillText('H⁺', memX, ay - 4);
    }
  }

  // Voltage label
  ctx.fillStyle = active ? '#7AAD7A' : '#DC143C';
  ctx.font = 'bold 12px monospace'; ctx.textAlign = 'center';
  ctx.fillText(voltage.toFixed(2) + ' V', W / 2, H - 10);
  if (!active) ctx.fillText('(mind. 1,23 V nötig)', W / 2, H - 24);
}

export default function ElectrolyzerExperiment() {
  const [voltage, setVoltage] = useState(1.0);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => { if (canvasRef.current) draw(canvasRef.current, voltage, t); }, [voltage, t]);
  useEffect(() => {
    if (playing) { animRef.current = setInterval(() => setT(p => p + 1), 100); }
    else if (animRef.current) clearInterval(animRef.current);
    return () => { if (animRef.current) clearInterval(animRef.current); };
  }, [playing]);
  useEffect(() => {
    const obs = new ResizeObserver(() => { if (canvasRef.current) draw(canvasRef.current, voltage, t); });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [voltage, t]);

  const active = voltage >= 1.23;
  const rate = active ? Math.min(100, (voltage - 1.23) / 0.8 * 100) : 0;
  const efficiency = active ? Math.max(60, 85 - (voltage - 1.8) * 30) : 0;

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>PEM-Elektrolyseur</strong></div>
      <label className={styles.sliderLabel} htmlFor="el-v">
        <span>Spannung</span>
        <strong style={{ color: active ? '#7AAD7A' : '#DC143C' }}>{voltage.toFixed(2)} V</strong>
      </label>
      <input id="el-v" type="range" min="0.5" max="2.5" step="0.01" value={voltage} onChange={e => setVoltage(+e.target.value)} />
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button onClick={() => setPlaying(!playing)} style={{
          flex: 1, padding: '7px 0', borderRadius: 6, border: 'none',
          background: playing ? '#DC143C' : 'var(--navy)', color: '#fff',
          fontFamily: 'var(--font-mono)', fontSize: 11, cursor: 'pointer',
        }}>{playing ? '⏸ Stop' : '▶ Blasen animieren'}</button>
      </div>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 200, borderRadius: 6, border: '1px solid var(--border)', marginTop: 10, background: '#0a1628' }} />
      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>Reaktion</span><strong style={{ color: active ? '#7AAD7A' : '#DC143C' }}>{active ? 'H₂O → H₂ + ½O₂ ✓' : 'keine (zu wenig Spannung)'}</strong></div>
        <div><span>Produktionsrate</span><strong>{rate.toFixed(0)}%</strong></div>
        <div><span>Wirkungsgrad</span><strong>{active ? efficiency.toFixed(0) + '%' : '—'}</strong></div>
        <div><span>Iridium-Bedarf</span><strong style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>0,1–1,5 g/kW</strong></div>
      </div>
    </div>
  );
}
