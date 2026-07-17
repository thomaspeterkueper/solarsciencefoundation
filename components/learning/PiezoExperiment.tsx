'use client';
/**
 * PiezoExperiment — EXP:FUNKE
 * Pressure on crystal → voltage, charge separation, dipole moment live
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

function draw(canvas: HTMLCanvasElement, force: number, freq: number, t: number) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr; canvas.height = 200 * dpr;
  const ctx = canvas.getContext('2d')!; ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = 200;
  ctx.fillStyle = '#0a1628'; ctx.fillRect(0, 0, W, H);

  // Crystal (deformed by force)
  const cx = W * 0.38, cy = H / 2;
  const baseW = 70, baseH = 50;
  const squeeze = force / 100 * 18; // how much compressed
  const crystalW = baseW + squeeze * 1.2;
  const crystalH = baseH - squeeze;

  // Crystal shape
  const grad = ctx.createLinearGradient(cx - crystalW/2, 0, cx + crystalW/2, 0);
  grad.addColorStop(0, '#2A4A6B');
  grad.addColorStop(0.5, '#4A7A9B');
  grad.addColorStop(1, '#2A4A6B');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.roundRect(cx - crystalW/2, cy - crystalH/2, crystalW, crystalH, 4);
  ctx.fill();
  ctx.strokeStyle = '#7AADCC'; ctx.lineWidth = 1.5; ctx.stroke();

  // Atom lattice inside crystal
  const rows = 3, cols = 4;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const ax = cx - crystalW/2 + 12 + c * (crystalW - 24) / (cols - 1);
      const ay = cy - crystalH/2 + 8 + r * (crystalH - 16) / (rows - 1);
      // Positive ions shift right under pressure
      const shift = (r % 2 === 0 ? 1 : -1) * squeeze * 0.15;
      ctx.beginPath(); ctx.arc(ax + shift, ay, 4, 0, Math.PI * 2);
      ctx.fillStyle = r % 2 === 0 ? '#DC143C' : '#5B8FB9'; ctx.fill();
    }
  }

  // Force arrows (top/bottom)
  if (force > 0) {
    const arrowLen = 20 + force * 0.3;
    [[-1, cy - crystalH/2 - 8], [1, cy + crystalH/2 + 8]].forEach(([dir, y]) => {
      ctx.strokeStyle = '#C9A84C'; ctx.fillStyle = '#C9A84C'; ctx.lineWidth = 2.5;
      ctx.shadowColor = '#C9A84C'; ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.moveTo(cx, y as number);
      ctx.lineTo(cx, (y as number) + (dir as number) * arrowLen);
      ctx.stroke();
      const ey = (y as number) + (dir as number) * arrowLen;
      ctx.beginPath();
      ctx.moveTo(cx, ey);
      ctx.lineTo(cx - 7, ey - (dir as number) * 12);
      ctx.lineTo(cx + 7, ey - (dir as number) * 12);
      ctx.closePath(); ctx.fill(); ctx.shadowBlur = 0;
    });
    ctx.fillStyle = '#C9A84C'; ctx.font = '9px monospace'; ctx.textAlign = 'center';
    ctx.fillText('F = ' + force + ' N', cx, cy - crystalH/2 - 28);
  }

  // Voltage output (right side) — oscillates with freq
  const voltage = force / 100 * (1 + Math.sin(t * freq * 0.2) * 0.3) * 80; // V
  const barH = Math.abs(voltage) / 80 * 70;
  const barY = H/2 - barH/2;
  const vColor = voltage > 0 ? '#7AAD7A' : '#DC143C';
  ctx.fillStyle = vColor + '33';
  ctx.fillRect(W * 0.78, barY, 18, barH);
  ctx.fillStyle = vColor;
  ctx.fillRect(W * 0.78, barY, 18, 2);
  ctx.fillRect(W * 0.78, barY + barH - 2, 18, 2);
  ctx.font = 'bold 11px monospace'; ctx.textAlign = 'center';
  ctx.fillStyle = vColor;
  ctx.fillText(voltage.toFixed(0) + ' V', W * 0.87, H/2 + 4);
  ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.font = '8px monospace';
  ctx.fillText('Spannung', W * 0.87, H - 8);

  // LED if high enough voltage
  if (voltage > 50) {
    ctx.beginPath(); ctx.arc(W * 0.87, 20, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#C9A84C'; ctx.shadowColor = '#C9A84C'; ctx.shadowBlur = 15; ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#0a1628'; ctx.font = 'bold 9px monospace'; ctx.textAlign = 'center';
    ctx.fillText('LED', W * 0.87, 23);
  }
}

export default function PiezoExperiment() {
  const [force, setForce] = useState(0);
  const [freq, setFreq] = useState(1);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => { if (canvasRef.current) draw(canvasRef.current, force, freq, t); }, [force, freq, t]);
  useEffect(() => {
    if (playing) {
      animRef.current = setInterval(() => setT(prev => prev + 1), 100);
    } else if (animRef.current) clearInterval(animRef.current);
    return () => { if (animRef.current) clearInterval(animRef.current); };
  }, [playing]);
  useEffect(() => {
    const obs = new ResizeObserver(() => { if (canvasRef.current) draw(canvasRef.current, force, freq, t); });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [force, freq, t]);

  const voltage = force / 100 * 80;

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Piezoelektrischer Effekt — Druck erzeugt Spannung</strong></div>
      <label className={styles.sliderLabel} htmlFor="pz-f"><span>Druckkraft F</span><strong>{force} N</strong></label>
      <input id="pz-f" type="range" min="0" max="100" value={force} onChange={e => setForce(+e.target.value)} />
      <label className={styles.sliderLabel} htmlFor="pz-fr" style={{ marginTop: 8 }}><span>Wechselfrequenz</span><strong>{freq} Hz</strong></label>
      <input id="pz-fr" type="range" min="1" max="10" value={freq} onChange={e => setFreq(+e.target.value)} />
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button onClick={() => setPlaying(!playing)} style={{
          flex: 1, padding: '8px 0', borderRadius: 6, border: 'none',
          background: playing ? '#DC143C' : 'var(--navy)', color: '#fff',
          fontFamily: 'var(--font-mono)', fontSize: 11, cursor: 'pointer',
        }}>{playing ? '⏸ Stop' : '▶ Wechseldruck animieren'}</button>
        <button onClick={() => { setForce(0); setPlaying(false); setT(0); }} style={{
          padding: '8px 14px', borderRadius: 6, border: '1px solid var(--border)',
          background: 'var(--soft)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 11, cursor: 'pointer',
        }}>Reset</button>
      </div>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 200, borderRadius: 6, border: '1px solid var(--border)', marginTop: 12, background: '#0a1628' }} />
      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>Spannung</span><strong style={{ color: voltage > 50 ? '#7AAD7A' : 'var(--muted)', fontSize: 16 }}>{voltage.toFixed(0)} V</strong></div>
        <div><span>LED</span><strong style={{ color: voltage > 50 ? '#C9A84C' : 'var(--muted)' }}>{voltage > 50 ? 'leuchtet ✓' : 'aus'}</strong></div>
        <div style={{ gridColumn: 'span 2' }}>
          <span>Prinzip</span><strong style={{ fontSize: 12 }}>Druck → Gitterverformung → Ladungstrennung → Dipolmoment → Spannung</strong>
        </div>
      </div>
    </div>
  );
}
