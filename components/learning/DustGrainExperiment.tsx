'use client';
/**
 * DustGrainExperiment — EXP:DAMPFDRUCK-TEMP
 * Interstellar dust grain as chemical reactor: molecules freeze on surface,
 * UV drives reactions, complex organics form at -263°C
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

const MOLECULES = [
  { id: 'co',   label: 'CO',   color: '#888',    desc: 'Kohlenmonoxid — häufigstes Molekül im All' },
  { id: 'h2o',  label: 'H₂O',  color: '#4488BB', desc: 'Wasser — friert auf Staubkörnern zu Eis' },
  { id: 'nh3',  label: 'NH₃',  color: '#7AAD7A', desc: 'Ammoniak — Stickstoffquelle' },
  { id: 'ch4',  label: 'CH₄',  color: '#C9A84C', desc: 'Methan — Kohlenstoffquelle' },
  { id: 'c2h',  label: 'C₂H',  color: '#DC143C', desc: 'Ethynylen — C2-Vorgänger für Erythrulose' },
];

function draw(canvas: HTMLCanvasElement, uv: number, molecules: Set<string>, T: number, stage: number) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr; canvas.height = 200 * dpr;
  const ctx = canvas.getContext('2d')!; ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = 200;
  ctx.fillStyle = '#0a1628'; ctx.fillRect(0, 0, W, H);

  // Stars background
  for (let i = 0; i < 40; i++) {
    ctx.beginPath(); ctx.arc(Math.random() * W, Math.random() * H, Math.random() * 1.2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,' + (0.1 + Math.random() * 0.3) + ')'; ctx.fill();
  }

  // Dust grain
  const gx = W / 2, gy = H / 2 + 10, gr = 28;
  const gGrad = ctx.createRadialGradient(gx - 8, gy - 8, 0, gx, gy, gr);
  gGrad.addColorStop(0, '#6B5B45'); gGrad.addColorStop(1, '#3D2E1A');
  ctx.beginPath(); ctx.arc(gx, gy, gr, 0, Math.PI * 2);
  ctx.fillStyle = gGrad; ctx.fill();
  ctx.strokeStyle = '#8B6914'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.font = '9px monospace'; ctx.textAlign = 'center';
  ctx.fillText('Staubkorn', gx, gy + gr + 14);

  // Ice layer
  if (molecules.size > 0) {
    ctx.beginPath(); ctx.arc(gx, gy, gr + 6, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(176,212,241,0.5)'; ctx.lineWidth = 5; ctx.stroke();
    ctx.fillStyle = 'rgba(176,212,241,.2)';
    ctx.beginPath(); ctx.arc(gx, gy, gr + 6, 0, Math.PI * 2); ctx.fill();
  }

  // Molecules orbiting/landing
  const mArr = Array.from(molecules);
  mArr.forEach((mid, i) => {
    const m = MOLECULES.find(x => x.id === mid)!;
    const angle = (i / mArr.length) * Math.PI * 2 - Math.PI / 2;
    const dist = gr + 22;
    const mx = gx + Math.cos(angle) * dist, my = gy + Math.sin(angle) * dist;
    ctx.beginPath(); ctx.arc(mx, my, 7, 0, Math.PI * 2);
    ctx.fillStyle = m.color + 'CC'; ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = '7px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(m.label, mx, my); ctx.textBaseline = 'alphabetic';
  });

  // UV beam
  if (uv > 0) {
    ctx.strokeStyle = 'rgba(180,100,255,' + (uv / 100 * 0.8) + ')';
    ctx.lineWidth = 2; ctx.shadowColor = '#B464FF'; ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(W * 0.15, H * 0.1);
    ctx.lineTo(gx - gr * 0.7, gy - gr * 0.7);
    ctx.stroke(); ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(180,100,255,' + (uv / 100 * 0.8) + ')';
    ctx.font = '9px monospace'; ctx.textAlign = 'left';
    ctx.fillText('UV-Strahlung', W * 0.05, H * 0.08);
  }

  // Product
  if (stage >= 3 && uv > 30 && molecules.has('c2h')) {
    ctx.beginPath(); ctx.arc(gx + gr + 18, gy - 15, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#C9A84C'; ctx.shadowColor = '#C9A84C'; ctx.shadowBlur = 12; ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#fff'; ctx.font = '7px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('C₄', gx + gr + 18, gy - 15); ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#C9A84C'; ctx.font = '8px monospace';
    ctx.fillText('Erythrulose!', gx + gr + 18, gy - 28);
  }

  // Temperature
  ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.font = '9px monospace'; ctx.textAlign = 'right';
  ctx.fillText(T + ' K (−' + (273 - T) + '°C)', W - 10, H - 10);
}

export default function DustGrainExperiment() {
  const [uv, setUv] = useState(0);
  const [selectedMols, setSelectedMols] = useState<Set<string>>(new Set(['h2o', 'co']));
  const [T] = useState(10); // ~10K = -263°C
  const [stage, setStage] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setStage(prev => Math.min(3, prev + (uv > 30 && selectedMols.has('c2h') ? 1 : 0)));
  }, [uv, selectedMols]);

  useEffect(() => { if (canvasRef.current) draw(canvasRef.current, uv, selectedMols, T, stage); }, [uv, selectedMols, T, stage]);
  useEffect(() => {
    const obs = new ResizeObserver(() => { if (canvasRef.current) draw(canvasRef.current, uv, selectedMols, T, stage); });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [uv, selectedMols, T, stage]);

  const toggleMol = (id: string) => {
    setSelectedMols(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const hasProduct = stage >= 3 && uv > 30 && selectedMols.has('c2h');

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Staubkorn als chemischer Reaktor</strong></div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
        {MOLECULES.map(m => (
          <button key={m.id} onClick={() => toggleMol(m.id)} style={{
            padding: '4px 10px', fontFamily: 'var(--font-mono)', fontSize: 10,
            border: '1.5px solid ' + (selectedMols.has(m.id) ? m.color : 'var(--border)'),
            borderRadius: 4, background: selectedMols.has(m.id) ? m.color + '22' : 'var(--soft)',
            color: selectedMols.has(m.id) ? 'var(--navy)' : 'var(--muted)', cursor: 'pointer',
          }}>{m.label}</button>
        ))}
      </div>

      <label className={styles.sliderLabel} htmlFor="dg-uv">
        <span>UV-Strahlung</span>
        <strong style={{ color: uv > 30 ? '#B464FF' : 'var(--muted)' }}>{uv}%</strong>
      </label>
      <input id="dg-uv" type="range" min="0" max="100" value={uv} onChange={e => setUv(+e.target.value)} />

      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 200, borderRadius: 6, border: '1px solid var(--border)', marginTop: 12, background: '#0a1628' }} />

      {hasProduct && (
        <div style={{ marginTop: 10, padding: '10px 14px', background: '#1A1200', borderRadius: 6, border: '1px solid #C9A84C' }}>
          <strong style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#C9A84C', letterSpacing: '.08em' }}>
            ✓ ERYTHRULOSE ENTSTEHT
          </strong>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.7)', marginTop: 4, lineHeight: 1.5 }}>
            Zwei C₂H-Moleküle reagieren auf der gefrorenen Oberfläche zu Erythrulose (C₄H₈O₄).
            Genau das passiert in G+0.693-0.027 — 450 Lichtjahre vom Milchstraßenzentrum.
          </p>
        </div>
      )}

      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>Temperatur</span><strong>{T} K = −{273 - T}°C</strong></div>
        <div><span>Moleküle aktiv</span><strong>{selectedMols.size}</strong></div>
        <div><span>Reaktion möglich</span>
          <strong style={{ color: hasProduct ? '#C9A84C' : 'var(--muted)' }}>
            {hasProduct ? 'Ja — C₂H + UV + Eis = Erythrulose' : 'C₂H hinzufügen + UV erhöhen'}
          </strong>
        </div>
      </div>
    </div>
  );
}
