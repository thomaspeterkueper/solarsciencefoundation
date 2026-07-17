'use client';
/**
 * PipeFreezingExperiment — EXP:ROHR-SPRENGUNG
 * Water freezing in pipe: volume expansion, pressure buildup, pipe burst
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

type Material = 'kupfer' | 'stahl' | 'kunststoff';
const MATERIALS: Record<Material, { label: string; burstPressure: number; color: string }> = {
  kupfer:    { label: 'Kupfer',    burstPressure: 800,  color: '#B87333' },
  stahl:     { label: 'Stahl',     burstPressure: 2000, color: '#888' },
  kunststoff:{ label: 'Kunststoff',burstPressure: 120,  color: '#5B8FB9' },
};

function draw(canvas: HTMLCanvasElement, T: number, material: Material) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr; canvas.height = 180 * dpr;
  const ctx = canvas.getContext('2d')!; ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = 180;
  ctx.fillStyle = '#0a1628'; ctx.fillRect(0, 0, W, H);

  const mat = MATERIALS[material];
  const frozen = T < 0;
  const expansion = frozen ? Math.min(0.09, Math.abs(T) * 0.009) : 0;
  const pressure = frozen ? Math.min(mat.burstPressure * 1.2, expansion * 28000) : 0;
  const burst = pressure >= mat.burstPressure;

  // Pipe cross section
  const cx = W / 2, cy = H / 2;
  const outerR = 45, innerR = 35;

  // Outer pipe
  ctx.beginPath(); ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
  ctx.fillStyle = mat.color + '88'; ctx.fill();
  ctx.strokeStyle = mat.color; ctx.lineWidth = 3; ctx.stroke();

  // Inner water/ice
  const fillR = innerR * (1 + expansion * 2);
  const fillColor = frozen ? '#B0D4F1' : '#4488BB';
  ctx.beginPath(); ctx.arc(cx, cy, Math.min(fillR, burst ? outerR + 8 : outerR - 2), 0, Math.PI * 2);
  ctx.fillStyle = fillColor + (burst ? 'AA' : 'CC'); ctx.fill();

  // Crack if burst
  if (burst) {
    ctx.strokeStyle = '#DC143C'; ctx.lineWidth = 2.5;
    ctx.shadowColor = '#DC143C'; ctx.shadowBlur = 8;
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2 + 0.3;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * outerR * 0.8, cy + Math.sin(angle) * outerR * 0.8);
      ctx.lineTo(cx + Math.cos(angle) * (outerR + 20), cy + Math.sin(angle) * (outerR + 20));
      ctx.stroke();
    }
    ctx.shadowBlur = 0;
  }

  // Temperature label
  ctx.fillStyle = frozen ? '#B0D4F1' : '#4488BB';
  ctx.font = 'bold 14px monospace'; ctx.textAlign = 'center';
  ctx.fillText(T + '°C', cx, H - 12);

  // State label
  ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '10px monospace';
  ctx.fillText(burst ? '💥 GERISSEN' : frozen ? 'Eis — Druck steigt' : 'Wasser — kein Druck', cx, 20);
}

export default function PipeFreezingExperiment() {
  const [T, setT] = useState(5);
  const [material, setMaterial] = useState<Material>('kupfer');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const frozen = T < 0;
  const expansion = frozen ? Math.min(0.09, Math.abs(T) * 0.009) : 0;
  const pressure = frozen ? Math.min(MATERIALS[material].burstPressure * 1.2, expansion * 28000) : 0;
  const burst = pressure >= MATERIALS[material].burstPressure;

  useEffect(() => { if (canvasRef.current) draw(canvasRef.current, T, material); }, [T, material]);
  useEffect(() => {
    const obs = new ResizeObserver(() => { if (canvasRef.current) draw(canvasRef.current, T, material); });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [T, material]);

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Rohr-Sprengung durch Gefrieren</strong></div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        {(Object.keys(MATERIALS) as Material[]).map(m => (
          <button key={m} onClick={() => setMaterial(m)} style={{
            padding: '4px 10px', fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '.04em', textTransform: 'uppercase',
            border: `1.5px solid ${material === m ? MATERIALS[m].color : 'var(--border)'}`,
            borderRadius: 4, background: material === m ? MATERIALS[m].color + '22' : 'var(--soft)',
            color: material === m ? 'var(--navy)' : 'var(--muted)', cursor: 'pointer',
          }}>{MATERIALS[m].label}</button>
        ))}
      </div>
      <label className={styles.sliderLabel} htmlFor="pf-t"><span>Temperatur</span><strong style={{ color: T < 0 ? '#B0D4F1' : '#4488BB' }}>{T}°C</strong></label>
      <input id="pf-t" type="range" min="-20" max="10" value={T} onChange={e => setT(+e.target.value)} />
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 180, borderRadius: 6, border: `2px solid ${burst ? '#DC143C' : 'var(--border)'}`, marginTop: 12, background: '#0a1628' }} />
      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>Volumenausdehnung</span><strong style={{ color: frozen ? '#B0D4F1' : 'var(--muted)' }}>{(expansion * 100).toFixed(1)} %</strong></div>
        <div><span>Druck</span><strong style={{ color: burst ? '#DC143C' : frozen ? '#C9A84C' : 'var(--muted)' }}>{pressure.toFixed(0)} bar</strong></div>
        <div><span>Berstdruck {MATERIALS[material].label}</span><strong>{MATERIALS[material].burstPressure} bar</strong></div>
        <div><span>Status</span><strong style={{ color: burst ? '#DC143C' : frozen ? '#C9A84C' : 'var(--ok-t)' }}>{burst ? '💥 Rohr gerissen!' : frozen ? '⚠ Druck steigt' : '✓ Sicher'}</strong></div>
      </div>
    </div>
  );
}
