'use client';
/**
 * MicelleExperiment — EXP:MIZELLE / EXP:TENSID-MOLEKUEL
 * Surfactant molecule structure and micelle formation animation
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

function draw(canvas: HTMLCanvasElement, conc: number, stage: 'molecule' | 'micelle') {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr; canvas.height = 200 * dpr;
  const ctx = canvas.getContext('2d')!; ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = 200;
  ctx.fillStyle = 'rgba(68,136,187,0.08)'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#F9F8F5'; ctx.fillRect(0, 0, W, H * 0.55);
  // Water/air interface
  ctx.strokeStyle = '#B0D4F1'; ctx.lineWidth = 1; ctx.setLineDash([4,3]);
  ctx.beginPath(); ctx.moveTo(0, H*0.55); ctx.lineTo(W, H*0.55); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = 'rgba(68,136,187,0.15)'; ctx.fillRect(0, H*0.55, W, H*0.45);
  ctx.fillStyle = '#8A8880'; ctx.font = '8px monospace'; ctx.textAlign = 'left';
  ctx.fillText('Luft / Öl', 4, H*0.52); ctx.fillText('Wasser', 4, H*0.58 + 10);

  if (stage === 'molecule') {
    // Show individual surfactant molecules
    const count = Math.round(3 + conc * 10);
    for (let i = 0; i < count; i++) {
      const x = 30 + (i / count) * (W - 60);
      const atInterface = i < Math.ceil(count * 0.6);
      const y = atInterface ? H * 0.52 : H * 0.3 + Math.random() * H * 0.2;
      // Hydrophobic tail (into air/oil)
      ctx.strokeStyle = '#C9A84C'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x, atInterface ? H * 0.55 : y); ctx.lineTo(x, atInterface ? H * 0.55 - 22 : y - 22); ctx.stroke();
      // Hydrophilic head (in water)
      ctx.beginPath(); ctx.arc(x, atInterface ? H * 0.55 + 6 : y + 6, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#DC143C'; ctx.fill();
    }
    ctx.fillStyle = '#C9A84C'; ctx.font = '9px monospace'; ctx.textAlign = 'center';
    ctx.fillText('hydrophober Schwanz', W/2, H*0.35);
    ctx.fillStyle = '#DC143C';
    ctx.fillText('hydrophiler Kopf', W/2, H*0.62);
  } else {
    // Micelle in water
    const mx = W/2, my = H*0.72, mr = 38;
    // Fat droplet core
    ctx.beginPath(); ctx.arc(mx, my, mr - 12, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(218,165,32,0.4)'; ctx.fill();
    // Surfactant molecules around
    const n = 16;
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2;
      const headX = mx + Math.cos(angle) * mr;
      const headY = my + Math.sin(angle) * mr;
      const tailX = mx + Math.cos(angle) * (mr - 14);
      const tailY = my + Math.sin(angle) * (mr - 14);
      ctx.strokeStyle = '#C9A84C'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(headX, headY); ctx.lineTo(tailX, tailY); ctx.stroke();
      ctx.beginPath(); ctx.arc(headX, headY, 6, 0, Math.PI*2);
      ctx.fillStyle = '#DC143C'; ctx.fill();
    }
    ctx.fillStyle = '#8A8880'; ctx.font = '9px monospace'; ctx.textAlign = 'center';
    ctx.fillText('Mizelle: Fett innen, Wasserköpfe aussen', W/2, H - 8);
    ctx.fillStyle = 'rgba(218,165,32,0.7)';
    ctx.fillText('Fett', mx, my + 4);
  }
}

export default function MicelleExperiment() {
  const [conc, setConc] = useState(0.3);
  const [view, setView] = useState<'molecule'|'micelle'>('molecule');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cmcReached = conc > 0.5;

  useEffect(() => {
    const v = cmcReached && conc > 0.6 ? 'micelle' : view === 'micelle' && conc < 0.5 ? 'molecule' : view;
    if (canvasRef.current) draw(canvasRef.current, conc, v);
  }, [conc, view]);

  useEffect(() => {
    const obs = new ResizeObserver(() => {
      const v = cmcReached ? 'micelle' : 'molecule';
      if (canvasRef.current) draw(canvasRef.current, conc, v);
    });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [conc, cmcReached]);

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Tenside und Mizellen-Bildung</strong></div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {(['molecule', 'micelle'] as const).map(v => (
          <button key={v} onClick={() => setView(v)} style={{
            padding: '5px 12px', fontFamily: 'var(--font-mono)', fontSize: 10,
            border: '1.5px solid ' + (view === v ? 'var(--gold)' : 'var(--border)'),
            borderRadius: 4, background: view === v ? 'var(--gold-bg)' : 'var(--soft)',
            color: view === v ? 'var(--navy)' : 'var(--muted)', cursor: 'pointer',
          }}>{v === 'molecule' ? 'Tensid-Molekül' : 'Mizelle'}</button>
        ))}
      </div>
      <label className={styles.sliderLabel} htmlFor="mi-c">
        <span>Tensid-Konzentration</span>
        <strong style={{ color: cmcReached ? 'var(--ok-t)' : 'var(--muted)' }}>
          {conc < 0.2 ? 'sehr wenig' : conc < 0.5 ? 'unter CMC' : conc < 0.8 ? 'über CMC ✓' : 'viel'}
        </strong>
      </label>
      <input id="mi-c" type="range" min="0" max="1" step="0.05" value={conc} onChange={e => setConc(+e.target.value)} />
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 200, borderRadius: 6, border: '1px solid var(--border)', marginTop: 12, background: '#F9F8F5' }} />
      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>CMC erreicht?</span><strong style={{ color: cmcReached ? 'var(--ok-t)' : '#DC143C' }}>{cmcReached ? 'Ja — Mizellen bilden sich' : 'Nein — zu wenig Tensid'}</strong></div>
        <div><span>Wirkung</span><strong style={{ fontSize: 12 }}>{cmcReached ? 'Fett wird umhüllt & weggespült' : 'Kaum Reinigungswirkung'}</strong></div>
      </div>
    </div>
  );
}
