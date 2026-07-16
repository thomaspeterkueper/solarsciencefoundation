'use client';
/**
 * AbsorptionExperiment — EXP:ABSORPTIONSLINIEN
 * Solar absorption spectrum: Fraunhofer lines on blackbody background
 * Temperature slider changes peak wavelength (Wien's law)
 * Click on lines to see which element absorbs there
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

const FRAUNHOFER = [
  { lambda: 393.4, element: 'Ca II', label: 'K', width: 3 },
  { lambda: 396.8, element: 'Ca II', label: 'H', width: 3 },
  { lambda: 430.8, element: 'CH',    label: 'G', width: 2 },
  { lambda: 486.1, element: 'H',     label: 'F', width: 2 },
  { lambda: 516.7, element: 'Mg',    label: 'b', width: 2 },
  { lambda: 527.0, element: 'Fe',    label: 'E₂', width: 1.5 },
  { lambda: 589.0, element: 'Na',    label: 'D₁', width: 2.5 },
  { lambda: 589.6, element: 'Na',    label: 'D₂', width: 2.5 },
  { lambda: 656.3, element: 'H',     label: 'C',  width: 2 },
  { lambda: 686.7, element: 'O₂',    label: 'B',  width: 2 },
  { lambda: 759.4, element: 'O₂',    label: 'A',  width: 3 },
];

function lambdaToRGB(nm: number): string {
  let r = 0, g = 0, b = 0;
  if      (nm >= 380 && nm < 440) { r = -(nm - 440) / 60; b = 1; }
  else if (nm >= 440 && nm < 490) { g = (nm - 440) / 50; b = 1; }
  else if (nm >= 490 && nm < 510) { g = 1; b = -(nm - 510) / 20; }
  else if (nm >= 510 && nm < 580) { r = (nm - 510) / 70; g = 1; }
  else if (nm >= 580 && nm < 645) { r = 1; g = -(nm - 645) / 65; }
  else if (nm >= 645 && nm <= 780) { r = 1; }
  const factor = nm < 420 ? 0.3 + 0.7 * (nm - 380) / 40
               : nm > 700 ? 0.3 + 0.7 * (780 - nm) / 80 : 1;
  return `rgba(${Math.round(r*255*factor)},${Math.round(g*255*factor)},${Math.round(b*255*factor)},1)`;
}

function planck(lambda_nm: number, T: number): number {
  const h = 6.626e-34, c = 3e8, k = 1.38e-23;
  const l = lambda_nm * 1e-9;
  return (2 * h * c * c) / (Math.pow(l, 5) * (Math.exp((h * c) / (l * k * T)) - 1));
}

function drawSpectrum(canvas: HTMLCanvasElement, T: number, selected: number | null) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr; canvas.height = 120 * dpr;
  const ctx = canvas.getContext('2d')!; ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = 120;
  ctx.fillStyle = '#0a1628'; ctx.fillRect(0, 0, W, H);

  const lMin = 380, lMax = 780;
  const toX = (nm: number) => (nm - lMin) / (lMax - lMin) * W;

  // Blackbody spectrum as gradient background
  const maxP = planck(T < 5000 ? 700 : 500, T);
  for (let px = 0; px < W; px++) {
    const nm = lMin + (px / W) * (lMax - lMin);
    const intensity = Math.min(1, planck(nm, T) / maxP);
    ctx.fillStyle = lambdaToRGB(nm);
    ctx.globalAlpha = intensity * 0.95;
    ctx.fillRect(px, 0, 1, H * 0.75);
  }
  ctx.globalAlpha = 1;

  // Fraunhofer absorption lines
  FRAUNHOFER.forEach((line, i) => {
    const x = toX(line.lambda);
    const isSelected = selected === i;
    ctx.fillStyle = isSelected ? 'rgba(0,0,0,0.95)' : 'rgba(0,0,0,0.80)';
    ctx.fillRect(x - line.width / 2, 0, line.width, H * 0.75);
    // Label above
    ctx.fillStyle = isSelected ? '#C9A84C' : 'rgba(255,255,255,0.55)';
    ctx.font = isSelected ? 'bold 9px monospace' : '8px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(line.label, x, H * 0.75 + 12);
    if (isSelected) {
      ctx.fillStyle = '#C9A84C';
      ctx.font = 'bold 10px monospace';
      ctx.fillText(line.element, x, H * 0.75 + 24);
      ctx.fillText(line.lambda.toFixed(1) + ' nm', x, H * 0.75 + 36);
    }
  });

  // Wien peak marker
  const lambdaPeak = 2.898e6 / T; // nm
  if (lambdaPeak >= lMin && lambdaPeak <= lMax) {
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(toX(lambdaPeak), 0); ctx.lineTo(toX(lambdaPeak), H * 0.75); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '8px monospace'; ctx.textAlign = 'center';
    ctx.fillText('λ_max', toX(lambdaPeak), 10);
  }
}

export default function AbsorptionExperiment() {
  const [T, setT] = useState(5778);
  const [selected, setSelected] = useState<number | null>(3); // Hα by default
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) drawSpectrum(canvasRef.current, T, selected);
  }, [T, selected]);

  useEffect(() => {
    const obs = new ResizeObserver(() => {
      if (canvasRef.current) drawSpectrum(canvasRef.current, T, selected);
    });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [T, selected]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const nm = 380 + x * 400;
    let closest = -1, minDist = 8;
    FRAUNHOFER.forEach((line, i) => {
      const dist = Math.abs(line.lambda - nm);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setSelected(closest >= 0 ? closest : null);
  };

  const lambdaPeak = Math.round(2898000 / T);
  const sel = selected !== null ? FRAUNHOFER[selected] : null;

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}>
        <span className={styles.label}>Experiment</span>
        <strong>Absorptionslinien — Fraunhofer-Spektrum</strong>
      </div>
      <label className={styles.sliderLabel} htmlFor="ab-T">
        <span>Temperatur T</span>
        <strong>{T.toLocaleString('de')} K</strong>
      </label>
      <input id="ab-T" type="range" min="3000" max="12000" step="100" value={T}
        onChange={e => setT(+e.target.value)} />
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        style={{ display: 'block', width: '100%', height: 120, borderRadius: 6,
          border: '1px solid var(--border)', marginTop: 14, cursor: 'crosshair', background: '#0a1628' }}
      />
      <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6, fontFamily: 'var(--font-mono)' }}>
        ← Klicke auf eine Linie um das absorbierende Element zu sehen
      </p>
      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>T</span><strong>{T.toLocaleString('de')} K</strong></div>
        <div><span>λ_max (Wien)</span><strong>{lambdaPeak} nm</strong></div>
        {sel && <>
          <div><span>Linie {sel.label}</span><strong>{sel.lambda.toFixed(1)} nm</strong></div>
          <div><span>Element</span><strong style={{ color: '#C9A84C' }}>{sel.element}</strong></div>
        </>}
      </div>
      <div style={{ marginTop: 10, padding: '10px 12px', background: 'var(--surface)',
        borderRadius: 6, border: '1px solid var(--border)', fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
        {sel ? (
          <><strong>{sel.element}</strong> absorbiert bei {sel.lambda.toFixed(1)} nm (Fraunhofer-Linie {sel.label}).
          Dieses Element existiert in der Sonnenatmosphäre — es verschluckt genau diese Wellenlänge
          beim Durchgang durch die kühlere äußere Schicht.</>
        ) : (
          <>Jede dunkle Linie ist eine Wellenlänge die von einem bestimmten Element in der Sonnenatmosphäre
          absorbiert wird. Fraunhofer entdeckte 1814 über 570 solcher Linien — ohne zu wissen warum sie entstehen.</>
        )}
      </div>
    </div>
  );
}
