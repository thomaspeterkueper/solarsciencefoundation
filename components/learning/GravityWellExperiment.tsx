'use client';
/**
 * GravityWellExperiment — EXP:GRAVITATIONSBRUNNEN
 * Interactive gravity well (interactiveId: gravitationsbrunnen)
 *
 * Physics (real values, single source of truth: lib/learningInteractives.ts):
 * - Φ(r) = −G·M/r               gravitational potential (J/kg, zero at infinity)
 * - ΔΦ   = Φ(r) − Φ(R)          potential difference vs. surface (J/kg)
 * - W    = m·ΔΦ                 work to lift mass m from surface to r
 * - vₑ   = √(2·G·M/r)           escape velocity at distance r
 * - g₀   = G·M/R²               surface gravity
 *
 * Bodies: Mond, Mars, Erde, Jupiter. Interaction: two parameters —
 * Himmelskörper and Abstand r (in Körperradien, 1 = Oberfläche).
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';
import { getLearningInteractive } from '../../lib/learningInteractives';

const interactive = getLearningInteractive('gravitationsbrunnen');
const G = interactive?.params.constants.G ?? 6.674e-11;
const BODIES = interactive?.params.bodies ?? [];
const TEST_MASS_KG = interactive?.params.testMassKg ?? 1000;
const R_MIN = interactive?.params.distance.min ?? 1;
const R_MAX = interactive?.params.distance.max ?? 10;
const R_STEP = interactive?.params.distance.step ?? 0.1;

const BODY_COLORS: Record<string, string> = {
  mond: '#B8B8B8',
  mars: '#C1440E',
  erde: '#4A90D9',
  jupiter: '#C88B3A',
};

function wellCalc(bodyIdx: number, rRatio: number) {
  const body = BODIES[bodyIdx];
  const r = rRatio * body.radiusM;
  const phi = -G * body.massKg / r;
  const phiSurface = -G * body.massKg / body.radiusM;
  const deltaPhi = phi - phiSurface;
  const workJ = deltaPhi * TEST_MASS_KG;
  const vEsc = Math.sqrt((2 * G * body.massKg) / r);
  const gSurface = (G * body.massKg) / (body.radiusM * body.radiusM);
  return {
    phiMJ: phi / 1e6,
    deltaPhiMJ: deltaPhi / 1e6,
    workGJ: workJ / 1e9,
    vEscKms: vEsc / 1000,
    gSurfaceMs2: gSurface,
    rKm: r / 1000,
    surfaceKm: body.radiusM / 1000,
  };
}

function fmtKm(value: number) {
  return Math.round(value).toLocaleString('de-DE');
}

function WellCanvas({ bodyIdx, rRatio }: { bodyIdx: number; rRatio: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;

    ctx.fillStyle = '#0a1628';
    ctx.fillRect(0, 0, W, H);

    const padL = 54;
    const padR = 18;
    const padT = 20;
    const padB = 30;
    const plotW = W - padL - padR;
    const plotH = H - padT - padB;

    // x: r/R linear 1..R_MAX ; y: Φ/Φ₀ = −1/x, mapped from −0.1 (top) to −1 (bottom)
    const xOf = (rr: number) => padL + ((rr - 1) / (R_MAX - 1)) * plotW;
    const yOf = (rr: number) => padT + ((-(-1 / rr)) - 0.1) / 0.9 * plotH;
    const yZero = padT;
    const ySurface = yOf(1);

    // Zero-potential horizon (Φ = 0 at infinity)
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.setLineDash([3, 4]);
    ctx.beginPath();
    ctx.moveTo(padL, yZero);
    ctx.lineTo(padL + plotW, yZero);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '9px monospace';
    ctx.fillText('Φ = 0 (unendlich weit)', padL + plotW - 118, yZero - 5);

    // Well area
    const grad = ctx.createLinearGradient(0, yZero, 0, ySurface);
    grad.addColorStop(0, 'rgba(201,168,76,0.05)');
    grad.addColorStop(1, 'rgba(201,168,76,0.45)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(xOf(1), ySurface);
    for (let rr = 1; rr <= R_MAX; rr += 0.25) ctx.lineTo(xOf(rr), yOf(rr));
    ctx.lineTo(xOf(R_MAX), yZero);
    ctx.closePath();
    ctx.fill();

    // Well curve
    ctx.strokeStyle = '#C9A84C';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let rr = 1; rr <= R_MAX; rr += 0.25) {
      const x = xOf(rr);
      const y = yOf(rr);
      if (rr === 1) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Body sphere at the deepest point (surface)
    const bodyColor = BODY_COLORS[BODIES[bodyIdx].id] ?? '#9AA';
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.arc(padL - 16, ySurface + 4, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.font = 'bold 10px monospace';
    ctx.fillText(BODIES[bodyIdx].label, padL - 16 - 4, ySurface - 22);

    // Learner's level at distance r
    const ySel = yOf(rRatio);
    ctx.strokeStyle = 'rgba(122,173,122,0.75)';
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(padL, ySel);
    ctx.lineTo(padL + plotW, ySel);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#7AAD7A';
    ctx.font = '9px monospace';
    ctx.fillText(`dein Niveau bei r = ${rRatio.toFixed(1)}R`, padL + 6, ySel - 5);

    // ΔΦ arrow between surface level and the learner's level
    const arrowX = xOf(6.2);
    ctx.strokeStyle = '#7AAD7A';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(arrowX, ySurface);
    ctx.lineTo(arrowX, ySel);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(arrowX - 4, ySurface + 4);
    ctx.lineTo(arrowX, ySurface);
    ctx.lineTo(arrowX + 4, ySurface + 4);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(arrowX - 4, ySel - 4);
    ctx.lineTo(arrowX, ySel);
    ctx.lineTo(arrowX + 4, ySel - 4);
    ctx.stroke();
    const calc = wellCalc(bodyIdx, rRatio);
    ctx.fillStyle = '#7AAD7A';
    ctx.fillText(`ΔΦ = ${calc.deltaPhiMJ.toFixed(1)} MJ/kg`, arrowX + 8, (ySurface + ySel) / 2 + 3);

    // Marker on the curve
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(xOf(rRatio), ySel, 4, 0, Math.PI * 2);
    ctx.fill();

    // Axes
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.font = '9px monospace';
    ctx.fillText('1R', xOf(1) - 8, H - padB + 14);
    ctx.fillText('5R', xOf(5) - 8, H - padB + 14);
    ctx.fillText('10R', xOf(10) - 12, H - padB + 14);
    ctx.fillText('Abstand r (in Körperradien R)', padL + plotW / 2 - 66, H - 6);
    ctx.fillText('Φ₀', padL - 26, ySurface + 4);
  }, [bodyIdx, rRatio]);

  return (
    <canvas
      ref={ref}
      style={{
        display: 'block', width: '100%', height: 220,
        borderRadius: 8, border: '1px solid var(--border)', background: '#0a1628',
      }}
    />
  );
}

export default function GravityWellExperiment() {
  const [bodyIdx, setBodyIdx] = useState(2); // Erde
  const [rRatio, setRRatio] = useState(1);

  const calc = wellCalc(bodyIdx, rRatio);

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}>
        <span className={styles.label}>Experiment</span>
        <strong>Gravitationsbrunnen — Potential, Arbeit und Flucht</strong>
      </div>

      <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
        {interactive?.instruction}
      </p>

      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)',
        letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 6 }}>Himmelskörper</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
        {BODIES.map((body, i) => (
          <button key={body.id} type="button" onClick={() => setBodyIdx(i)} disabled={i === bodyIdx}
            style={{
              padding: '6px 12px', borderRadius: 6,
              border: '1.5px solid ' + (i === bodyIdx ? '#C9A84C' : 'var(--border)'),
              background: i === bodyIdx ? '#C9A84C18' : 'var(--soft)',
              color: i === bodyIdx ? 'var(--navy)' : 'var(--muted)',
              fontFamily: 'var(--font-mono)', fontSize: 11, cursor: 'pointer',
            }}>
            {body.label}
          </button>
        ))}
      </div>

      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)',
        letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 6 }}>
        Abstand r: {rRatio.toFixed(1)} Körperradien ({fmtKm(calc.rKm)} km über dem Zentrum, Oberfläche bei {fmtKm(calc.surfaceKm)} km)
      </p>
      <input
        type="range"
        min={R_MIN}
        max={R_MAX}
        step={R_STEP}
        value={rRatio}
        onChange={(event) => setRRatio(Number(event.target.value))}
        style={{ width: '100%', marginBottom: 14 }}
      />

      <WellCanvas bodyIdx={bodyIdx} rRatio={rRatio} />

      <div className={styles.stats} style={{ marginTop: 12 }}>
        <div>
          <span>Gravitationspotential Φ(r)</span>
          <strong>{calc.phiMJ.toFixed(1)} MJ/kg</strong>
        </div>
        <div>
          <span>Potentialdifferenz zur Oberfläche</span>
          <strong style={{ color: '#7AAD7A' }}>{calc.deltaPhiMJ.toFixed(1)} MJ/kg</strong>
        </div>
        <div>
          <span>Hubarbeit für 1 t bis hierher</span>
          <strong style={{ color: '#7AAD7A' }}>{calc.workGJ.toFixed(1)} GJ</strong>
        </div>
        <div>
          <span>Fluchtgeschwindigkeit bei r</span>
          <strong>{calc.vEscKms.toFixed(1)} km/s</strong>
        </div>
      </div>

      <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8, lineHeight: 1.6 }}>
        Oberflächengravitation: {calc.gSurfaceMs2.toFixed(1)} m/s².
        {rRatio === 1
          ? ' Du stehst an der Oberfläche — die Potentialdifferenz ist 0, der Brunnen aber voll unter dir. Schiebe r nach rechts und beobachte, wie viel Arbeit das Herausklettern kostet.'
          : ' Je weiter außen du bist, desto flacher wird der Brunnen — die meiste Arbeit steckt in den ersten Kilometern über der Oberfläche.'}
      </p>

      <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6, lineHeight: 1.6 }}>
        Modell: Φ = −G·M/r mit G = 6,674·10⁻¹¹ m³/(kg·s²). Die Hubarbeit bis ins Unendliche entspricht der Fluchtenergie m·|Φ(r)| — und der Fluchtgeschwindigkeit v = √(2·G·M/r).
      </p>
    </div>
  );
}
