'use client';
/**
 * MagneticFieldExperiment — EXP:MAGNETFELD (reuse slot for field lines)
 * Bar magnet field lines, pole interaction, splitting demonstration
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

type Mode = 'single' | 'attract' | 'repel' | 'split';

function draw(canvas: HTMLCanvasElement, mode: Mode) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr; canvas.height = 220 * dpr;
  const ctx = canvas.getContext('2d')!; ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = 220;
  ctx.fillStyle = '#0a1628'; ctx.fillRect(0, 0, W, H);

  const drawMagnet = (x: number, y: number, w: number, h: number, label: string, flipped = false) => {
    const northColor = '#DC143C', southColor = '#5B8FB9';
    // North half
    ctx.fillStyle = flipped ? southColor : northColor;
    ctx.fillRect(x, y, w/2, h);
    // South half
    ctx.fillStyle = flipped ? northColor : southColor;
    ctx.fillRect(x + w/2, y, w/2, h);
    // Labels
    ctx.fillStyle = '#fff'; ctx.font = 'bold 11px monospace'; ctx.textAlign = 'center';
    ctx.fillText(flipped ? 'S' : 'N', x + w/4, y + h/2 + 4);
    ctx.fillText(flipped ? 'N' : 'S', x + 3*w/4, y + h/2 + 4);
    if (label) {
      ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.font = '8px monospace';
      ctx.fillText(label, x + w/2, y - 6);
    }
  };

  const drawFieldArc = (sx: number, sy: number, ex: number, ey: number, alpha: number) => {
    const mx = (sx + ex) / 2, my = (sy + ey) / 2;
    const dx = ex - sx, dy = ey - sy;
    const cx1 = mx - dy * 0.5, cy1 = my + dx * 0.5;
    ctx.beginPath();
    ctx.moveTo(sx, sy); ctx.quadraticCurveTo(cx1, cy1, ex, ey);
    ctx.strokeStyle = 'rgba(201,168,76,' + alpha + ')';
    ctx.lineWidth = 1.5; ctx.stroke();
  };

  if (mode === 'single') {
    const mx = W/2 - 50, my = H/2 - 12;
    drawMagnet(mx, my, 100, 24, '');
    // Field lines
    for (let i = 0; i < 5; i++) {
      const offset = (i - 2) * 18;
      const alpha = 0.6 - Math.abs(offset)/80;
      // Lines above
      drawFieldArc(mx + 25, my, mx + 75, my, alpha);
      // Lines below
      ctx.beginPath();
      ctx.moveTo(mx + 75, my + 24);
      ctx.quadraticCurveTo(mx + 50 + offset * 2, my + 80 + Math.abs(offset), mx + 25, my + 24);
      ctx.strokeStyle = 'rgba(201,168,76,' + alpha + ')'; ctx.lineWidth = 1.5; ctx.stroke();
    }
    // Pole labels
    ctx.fillStyle = '#DC143C'; ctx.font = '9px monospace'; ctx.textAlign = 'center';
    ctx.fillText('Nordpol: Feldlinien treten aus', mx + 25, my - 12);
    ctx.fillStyle = '#5B8FB9';
    ctx.fillText('Südpol: Feldlinien treten ein', mx + 75, my + 40);

  } else if (mode === 'attract') {
    drawMagnet(W*0.12, H/2-12, 90, 24, 'Magnet 1');
    drawMagnet(W*0.62, H/2-12, 90, 24, 'Magnet 2', true);
    // Attraction field lines between them
    for (let i = 0; i < 4; i++) {
      const yo = (i - 1.5) * 12;
      ctx.beginPath();
      ctx.moveTo(W*0.12 + 90, H/2 + yo);
      ctx.bezierCurveTo(W*0.37, H/2 + yo - 20, W*0.45, H/2 + yo - 20, W*0.62, H/2 + yo);
      ctx.strokeStyle = 'rgba(201,168,76,0.6)'; ctx.lineWidth = 1.5; ctx.stroke();
    }
    ctx.fillStyle = '#7AAD7A'; ctx.font = 'bold 11px monospace'; ctx.textAlign = 'center';
    ctx.fillText('S ↔ N — ziehen sich an', W/2, H - 12);

  } else if (mode === 'repel') {
    drawMagnet(W*0.12, H/2-12, 90, 24, 'Magnet 1');
    drawMagnet(W*0.62, H/2-12, 90, 24, 'Magnet 2');
    // Repulsion: field lines curve away
    for (let i = 0; i < 3; i++) {
      const yo = (i - 1) * 18;
      ctx.beginPath();
      ctx.moveTo(W*0.12 + 90, H/2 + yo);
      ctx.bezierCurveTo(W*0.35, H/2 + yo - 50 - Math.abs(yo)*2, W*0.45, H/2 + yo - 50 - Math.abs(yo)*2, W*0.38, H/2 + yo);
      ctx.strokeStyle = 'rgba(220,20,60,0.5)'; ctx.lineWidth = 1.5; ctx.stroke();
    }
    ctx.fillStyle = '#DC143C'; ctx.font = 'bold 11px monospace'; ctx.textAlign = 'center';
    ctx.fillText('N ↔ N — stoßen sich ab', W/2, H - 12);

  } else { // split
    // Two halves after splitting
    drawMagnet(W*0.08, H/2-12, 80, 24, 'Hälfte 1');
    drawMagnet(W*0.55, H/2-12, 80, 24, 'Hälfte 2');
    ctx.fillStyle = '#C9A84C'; ctx.font = '10px monospace'; ctx.textAlign = 'center';
    ctx.fillText('Jede Hälfte: wieder N + S!', W/2, H*0.2);
    ctx.fillText('Kein isolierter Nordpol möglich.', W/2, H*0.2 + 16);
    // Cut line
    ctx.strokeStyle = '#DC143C'; ctx.lineWidth = 2; ctx.setLineDash([5,3]);
    ctx.beginPath(); ctx.moveTo(W/2, H*0.3); ctx.lineTo(W/2, H*0.75); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#DC143C'; ctx.font = '9px monospace';
    ctx.fillText('✂ Schnitt', W/2, H*0.78);
  }
}

export default function MagneticFieldExperiment() {
  const [mode, setMode] = useState<Mode>('single');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => { if (canvasRef.current) draw(canvasRef.current, mode); }, [mode]);
  useEffect(() => {
    const obs = new ResizeObserver(() => { if (canvasRef.current) draw(canvasRef.current, mode); });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [mode]);

  const notes: Record<Mode, string> = {
    single: 'Feldlinien verlassen den Nordpol und treten beim Südpol ein — immer geschlossene Schleifen.',
    attract: 'Ungleiche Pole ziehen sich an — Feldlinien verbinden sie direkt.',
    repel: 'Gleiche Pole stoßen sich ab — Feldlinien weichen aus.',
    split: 'Magnete teilen → jede Hälfte hat sofort wieder N und S. Kein magnetischer Monopol.',
  };

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Magnetfeld und Pole</strong></div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
        {([['single','Einzelner Magnet'],['attract','Anziehung'],['repel','Abstoßung'],['split','Magnet teilen']] as const).map(([m, label]) => (
          <button key={m} onClick={() => setMode(m)} style={{
            padding: '5px 12px', fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '.04em', textTransform: 'uppercase',
            border: '1.5px solid ' + (mode === m ? 'var(--gold)' : 'var(--border)'),
            borderRadius: 4, background: mode === m ? 'var(--gold-bg)' : 'var(--soft)',
            color: mode === m ? 'var(--navy)' : 'var(--muted)', cursor: 'pointer',
          }}>{label}</button>
        ))}
      </div>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 220, borderRadius: 6, border: '1px solid var(--border)', background: '#0a1628' }} />
      <div style={{ marginTop: 10, padding: '10px 14px', background: 'var(--surface)', borderRadius: 6, border: '1px solid var(--border)', fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.6 }}>
        {notes[mode]}
      </div>
    </div>
  );
}
