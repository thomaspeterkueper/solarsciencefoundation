'use client';
/**
 * HydrationExperiment — EXP:HYDRATATION
 * NaCl crystal dissolving: water molecules surround ions, lattice breaks
 * Animation slider: dissolution stages
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

function draw(canvas: HTMLCanvasElement, stage: number) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr; canvas.height = 200 * dpr;
  const ctx = canvas.getContext('2d')!; ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = 200;
  ctx.fillStyle = '#0a1628'; ctx.fillRect(0, 0, W, H);

  // Water background
  ctx.fillStyle = 'rgba(68,136,187,0.15)';
  ctx.fillRect(0, 0, W, H);

  // Stage 0-1: crystal lattice
  // Stage 2-3: water molecules approaching
  // Stage 4-5: ions separating with hydration shells
  // Stage 6+: fully dissolved

  const cx = W / 2, cy = H / 2;
  const ions = [
    { x: -30, y: -20, type: 'Na', color: '#C9A84C' },
    { x:  30, y: -20, type: 'Cl', color: '#7AAD7A' },
    { x: -30, y:  20, type: 'Cl', color: '#7AAD7A' },
    { x:  30, y:  20, type: 'Na', color: '#C9A84C' },
    { x:   0, y:   0, type: 'Na', color: '#C9A84C' },
  ];

  const dissolved = stage / 8;
  const spread = 1 + dissolved * 3;

  ions.forEach((ion, i) => {
    const angle = (i / ions.length) * Math.PI * 2;
    const ix = cx + ion.x * spread + (dissolved > 0.5 ? Math.cos(angle + i) * dissolved * 40 : 0);
    const iy = cy + ion.y * spread + (dissolved > 0.5 ? Math.sin(angle + i) * dissolved * 30 : 0);

    // Hydration shell
    if (stage > 2) {
      const shellOpacity = Math.min(0.4, dissolved * 0.5);
      ctx.beginPath(); ctx.arc(ix, iy, 24, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(68,136,187,${shellOpacity})`; ctx.fill();

      // Water molecules around ion
      if (stage > 3) {
        const wCount = ion.type === 'Na' ? 4 : 6;
        for (let w = 0; w < wCount; w++) {
          const wAngle = (w / wCount) * Math.PI * 2 + dissolved;
          const wDist = 20 + dissolved * 4;
          const wx = ix + Math.cos(wAngle) * wDist;
          const wy = iy + Math.sin(wAngle) * wDist;
          ctx.beginPath(); ctx.arc(wx, wy, 5, 0, Math.PI * 2);
          // O (negative end) faces Na+, H faces Cl-
          const faceColor = ion.type === 'Na' ? '#FF6B6B' : '#88BBFF';
          ctx.fillStyle = `rgba(${ion.type === 'Na' ? '255,107,107' : '136,187,255'},${Math.min(0.8, dissolved)})`;
          ctx.fill();
        }
      }
    }

    // Ion itself
    const grad = ctx.createRadialGradient(ix, iy, 0, ix, iy, 12);
    grad.addColorStop(0, ion.color); grad.addColorStop(1, ion.color + '88');
    ctx.beginPath(); ctx.arc(ix, iy, 12, 0, Math.PI * 2);
    ctx.fillStyle = grad; ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.font = 'bold 9px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(ion.type + (ion.type === 'Na' ? '⁺' : '⁻'), ix, iy);

    // Lattice bonds (early stages)
    if (stage < 3 && i < ions.length - 1) {
      ctx.strokeStyle = `rgba(255,255,255,${0.3 * (1 - dissolved)})`; ctx.lineWidth = 1;
      const next = ions[(i + 1) % ions.length];
      const nx = cx + next.x * spread, ny = cy + next.y * spread;
      ctx.beginPath(); ctx.moveTo(ix, iy); ctx.lineTo(nx, ny); ctx.stroke();
    }
  });

  // Stage label
  const labels = ['Kristallgitter', 'Wasser nähert sich', 'Wassermoleküle andocken', 'Ionen lösen sich', 'Hydratisierte Ionen', 'Fast gelöst', 'Vollständig gelöst', 'In Lösung'];
  ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '10px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
  ctx.fillText(labels[Math.min(7, stage)] || 'In Lösung', W / 2, H - 8);
}

export default function HydrationExperiment() {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => { if (canvasRef.current) draw(canvasRef.current, stage); }, [stage]);
  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setStage(prev => { if (prev >= 8) { setPlaying(false); return 8; } return prev + 1; });
      }, 800);
    } else if (intervalRef.current) clearInterval(intervalRef.current);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing]);

  useEffect(() => {
    const obs = new ResizeObserver(() => { if (canvasRef.current) draw(canvasRef.current, stage); });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [stage]);

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Hydratation — Wie NaCl sich löst</strong></div>
      <label className={styles.sliderLabel} htmlFor="hy-s"><span>Lösungsstadium</span><strong>{stage} / 8</strong></label>
      <input id="hy-s" type="range" min="0" max="8" value={stage} onChange={e => { setStage(+e.target.value); setPlaying(false); }} />
      <div style={{ display: 'flex', gap: 8, margin: '10px 0' }}>
        <button onClick={() => setPlaying(!playing)} style={{
          flex: 1, padding: '8px 0', borderRadius: 6, border: 'none',
          background: playing ? '#DC143C' : 'var(--navy)', color: '#fff',
          fontFamily: 'var(--font-mono)', fontSize: 12, cursor: 'pointer',
        }}>{playing ? '⏸ Pause' : '▶ Animieren'}</button>
        <button onClick={() => { setStage(0); setPlaying(false); }} style={{
          padding: '8px 14px', borderRadius: 6, border: '1px solid var(--border)',
          background: 'var(--soft)', color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 12, cursor: 'pointer',
        }}>Neu</button>
      </div>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 200, borderRadius: 6, border: '1px solid var(--border)', background: '#0a1628' }} />
      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>Na⁺</span><strong style={{ color: '#C9A84C' }}>von O-Ende umgeben</strong></div>
        <div><span>Cl⁻</span><strong style={{ color: '#7AAD7A' }}>von H-Ende umgeben</strong></div>
        <div style={{ gridColumn: 'span 2' }}>
          <span>Prinzip</span>
          <strong style={{ fontSize: 12 }}>Wasserdipol umhüllt Ionen — Gitterenergie wird durch Hydratationsenergie überwunden</strong>
        </div>
      </div>
    </div>
  );
}
