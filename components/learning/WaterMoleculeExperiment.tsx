'use client';
/**
 * WaterMoleculeExperiment — EXP:WASSER-MOLEKUEL
 * H2O molecule with bond angle slider, dipole visualization, comparison with CO2
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

function draw(canvas: HTMLCanvasElement, angle: number, showCO2: boolean) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = 200 * dpr;
  const ctx = canvas.getContext('2d')!;
  ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = 200;
  ctx.fillStyle = '#0a1628'; ctx.fillRect(0, 0, W, H);

  const drawMolecule = (cx: number, cy: number, bondAngle: number, label: string, hasDipole: boolean) => {
    const bondLen = 52;
    const aRad = bondAngle * Math.PI / 180 / 2;
    // O atom
    const oGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18);
    oGrad.addColorStop(0, '#FF6B6B'); oGrad.addColorStop(1, '#CC2200');
    ctx.beginPath(); ctx.arc(cx, cy, 18, 0, Math.PI * 2);
    ctx.fillStyle = oGrad; ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = 'bold 12px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('O', cx, cy);

    // H atoms
    const hPositions = [
      [cx - Math.sin(aRad) * bondLen, cy + Math.cos(aRad) * bondLen],
      [cx + Math.sin(aRad) * bondLen, cy + Math.cos(aRad) * bondLen],
    ];
    hPositions.forEach(([hx, hy]) => {
      ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(hx, hy); ctx.stroke();
      const hGrad = ctx.createRadialGradient(hx, hy, 0, hx, hy, 12);
      hGrad.addColorStop(0, '#88BBFF'); hGrad.addColorStop(1, '#2244AA');
      ctx.beginPath(); ctx.arc(hx, hy, 12, 0, Math.PI * 2);
      ctx.fillStyle = hGrad; ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 10px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('H', hx, hy);
    });

    // Dipole arrow if applicable
    if (hasDipole) {
      const dipoleLen = 30 + Math.abs(90 - bondAngle) * 0.4;
      ctx.strokeStyle = '#C9A84C'; ctx.fillStyle = '#C9A84C'; ctx.lineWidth = 2.5;
      ctx.shadowColor = '#C9A84C'; ctx.shadowBlur = 6;
      ctx.beginPath(); ctx.moveTo(cx, cy - 20); ctx.lineTo(cx, cy - 20 - dipoleLen); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, cy - 20 - dipoleLen);
      ctx.lineTo(cx - 7, cy - 20 - dipoleLen + 12); ctx.lineTo(cx + 7, cy - 20 - dipoleLen + 12);
      ctx.closePath(); ctx.fill(); ctx.shadowBlur = 0;
      ctx.fillStyle = '#C9A84C'; ctx.font = '9px monospace'; ctx.textAlign = 'center';
      ctx.fillText('δ−', cx, cy - 24 - dipoleLen);
      ctx.fillStyle = '#5B8FB9'; ctx.font = '9px monospace';
      ctx.fillText('δ+', cx - Math.sin(aRad) * bondLen - 14, cy + Math.cos(aRad) * bondLen + 14);
      ctx.fillText('δ+', cx + Math.sin(aRad) * bondLen + 14, cy + Math.cos(aRad) * bondLen + 14);
    }

    // Angle label
    ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '10px monospace'; ctx.textAlign = 'center';
    ctx.fillText(label, cx, cy + 60);
  };

  if (showCO2) {
    // Linear CO2
    drawMolecule(W * 0.28, H * 0.5, 180, 'CO₂ (180°) — kein Dipol', false);
    drawMolecule(W * 0.75, H * 0.5, angle, `H₂O (${angle}°) — Dipol`, true);
    ctx.fillStyle = 'rgba(255,255,255,0.2)'; ctx.font = '8px monospace'; ctx.textAlign = 'center';
    ctx.fillText('linear → Dipole heben sich auf', W * 0.28, H - 8);
    ctx.fillText('gewinkelt → Netto-Dipol', W * 0.75, H - 8);
  } else {
    drawMolecule(W * 0.5, H * 0.5, angle, `H₂O Bindungswinkel: ${angle}°`, true);
  }
}

export default function WaterMoleculeExperiment() {
  const [angle, setAngle] = useState(104);
  const [showCO2, setShowCO2] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => { if (canvasRef.current) draw(canvasRef.current, angle, showCO2); }, [angle, showCO2]);
  useEffect(() => {
    const obs = new ResizeObserver(() => { if (canvasRef.current) draw(canvasRef.current, angle, showCO2); });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [angle, showCO2]);

  const dipoleStrength = Math.round(Math.abs(Math.sin((180 - angle) * Math.PI / 180 / 2)) * 100);

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Das Wasser-Molekül — Winkel und Dipol</strong></div>
      <label className={styles.sliderLabel} htmlFor="wm-angle">
        <span>Bindungswinkel</span>
        <strong style={{ color: angle > 100 && angle < 110 ? 'var(--ok-t)' : 'var(--muted)' }}>{angle}°</strong>
      </label>
      <input id="wm-angle" type="range" min="90" max="180" value={angle} onChange={e => setAngle(+e.target.value)} />
      <div style={{ display: 'flex', gap: 8, margin: '10px 0' }}>
        <button onClick={() => setShowCO2(false)} style={{
          padding: '5px 12px', fontFamily: 'var(--font-mono)', fontSize: 10,
          border: `1.5px solid ${!showCO2 ? 'var(--gold)' : 'var(--border)'}`,
          borderRadius: 4, background: !showCO2 ? 'var(--gold-bg)' : 'var(--soft)',
          color: !showCO2 ? 'var(--navy)' : 'var(--muted)', cursor: 'pointer',
        }}>Nur H₂O</button>
        <button onClick={() => setShowCO2(true)} style={{
          padding: '5px 12px', fontFamily: 'var(--font-mono)', fontSize: 10,
          border: `1.5px solid ${showCO2 ? 'var(--gold)' : 'var(--border)'}`,
          borderRadius: 4, background: showCO2 ? 'var(--gold-bg)' : 'var(--soft)',
          color: showCO2 ? 'var(--navy)' : 'var(--muted)', cursor: 'pointer',
        }}>Vergleich CO₂</button>
      </div>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 200, borderRadius: 6, border: '1px solid var(--border)', background: '#0a1628' }} />
      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>Realer Winkel</span><strong style={{ color: 'var(--ok-t)' }}>104,5°</strong></div>
        <div><span>Dipolstärke</span><strong>{dipoleStrength} %</strong></div>
        <div><span>Molekültyp</span><strong>{angle === 180 ? 'linear — kein Dipol' : 'gewinkelt — Dipol'}</strong></div>
        <div><span>Besonderheit</span><strong style={{ fontSize: 11 }}>bei 104,5° ist der Dipol maximal</strong></div>
      </div>
    </div>
  );
}
