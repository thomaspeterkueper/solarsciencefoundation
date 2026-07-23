'use client';
/**
 * HohmannExperiment — EXP:HOHMANN-TRANSFER
 * Interactive Hohmann transfer calculator
 *
 * Physics (real values):
 * - GM_Sun = 1.327e20 m^3/s^2
 * - r_Earth = 1.000 AU, r_Mars = 1.524 AU
 * - Delta_v1 = sqrt(GM/r1) * (sqrt(2*r2/(r1+r2)) - 1)
 * - Delta_v2 = sqrt(GM/r2) * (1 - sqrt(2*r1/(r1+r2)))
 * - Transfer time = pi * sqrt(a^3/GM), a = (r1+r2)/2
 *
 * Real Erde→Mars: Δv1≈2.94 km/s, Δv2≈2.65 km/s, t≈259 Tage
 */
import { useState, useEffect, useRef } from 'react';
import styles from './RayleighExperiment.module.css';

const GM_SUN = 1.327124e20; // m^3/s^2
const AU = 1.496e11;        // m

// Planet data: [name, orbit radius AU, color, emoji]
const PLANETS = [
  { name: 'Merkur',  r: 0.387, color: '#AAA',    emoji: '☿' },
  { name: 'Venus',   r: 0.723, color: '#E8C07A',  emoji: '♀' },
  { name: 'Erde',    r: 1.000, color: '#4A90D9',  emoji: '🌍' },
  { name: 'Mars',    r: 1.524, color: '#C1440E',  emoji: '🔴' },
  { name: 'Jupiter', r: 5.203, color: '#C88B3A',  emoji: '🪐' },
];

function hohmannCalc(r1_au: number, r2_au: number) {
  const r1 = r1_au * AU;
  const r2 = r2_au * AU;
  const a  = (r1 + r2) / 2;
  const v1 = Math.sqrt(GM_SUN / r1);
  const v2 = Math.sqrt(GM_SUN / r2);
  const vt1 = Math.sqrt(GM_SUN * 2 * r2 / (r1 * (r1 + r2)));
  const vt2 = Math.sqrt(GM_SUN * 2 * r1 / (r2 * (r1 + r2)));
  const dv1 = vt1 - v1;
  const dv2 = v2 - vt2;
  const t_s = Math.PI * Math.sqrt(a * a * a / GM_SUN);
  const t_days = t_s / 86400;
  return {
    dv1: dv1 / 1000,          // km/s
    dv2: Math.abs(dv2) / 1000,
    dvTotal: (Math.abs(dv1) + Math.abs(dv2)) / 1000,
    days: t_days,
    a_au: a / AU,
  };
}

function OrbitCanvas({ from, to }: { from: number; to: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);
    const W = canvas.offsetWidth, H = canvas.offsetHeight;
    ctx.fillStyle = '#0a1628'; ctx.fillRect(0, 0, W, H);
    const cx = W / 2, cy = H / 2;

    // Max radius = Jupiter (5.2 AU), scale to fit
    const maxR = 5.5;
    const scale = Math.min(W, H) * 0.43 / maxR;

    // Star field (static seed)
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    for (let i = 0; i < 60; i++) {
      const x = ((i * 137 + 23) % W);
      const y = ((i * 211 + 77) % H);
      ctx.fillRect(x, y, 1, 1);
    }

    // Sun
    const sunGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 14);
    sunGrad.addColorStop(0, '#FFF8DC');
    sunGrad.addColorStop(0.4, '#FFA500');
    sunGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = sunGrad;
    ctx.beginPath(); ctx.arc(cx, cy, 14, 0, Math.PI * 2); ctx.fill();

    // Planet orbits
    PLANETS.forEach(p => {
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, p.r * scale, 0, Math.PI * 2);
      ctx.stroke();

      // Planet dot
      const px = cx + p.r * scale;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(px, cy, p.r < 1 ? 4 : p.r < 2 ? 5 : 8, 0, Math.PI * 2);
      ctx.fill();
    });

    // Hohmann transfer ellipse
    const r1 = PLANETS[from].r, r2 = PLANETS[to].r;
    const rInner = Math.min(r1, r2), rOuter = Math.max(r1, r2);
    const sma = (rInner + rOuter) / 2; // semi-major axis AU
    const c = (rOuter - rInner) / 2;   // focus offset
    const b = Math.sqrt(sma * sma - c * c); // semi-minor axis

    ctx.save();
    ctx.strokeStyle = '#C9A84C';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 3]);
    // Ellipse: center at (cx - c*scale, cy) for departure from right side
    const ellCx = cx - c * scale;
    ctx.beginPath();
    ctx.ellipse(ellCx, cy, sma * scale, b * scale, 0, -Math.PI / 2, Math.PI / 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // Labels
    PLANETS.forEach((p, i) => {
      const px = cx + p.r * scale + 8;
      ctx.fillStyle = (i === from || i === to) ? '#C9A84C' : 'rgba(255,255,255,0.35)';
      ctx.font = (i === from || i === to) ? 'bold 11px monospace' : '9px monospace';
      ctx.fillText(p.name, px, cy - p.r * scale * 0.05 - 6);
    });

    // Δv arrows (simplified)
    ctx.fillStyle = '#7AAD7A';
    ctx.font = '10px monospace';
    ctx.fillText('Δv₁', cx + rInner * scale + 4, cy + 14);
    ctx.fillText('Δv₂', cx + rOuter * scale + 4, cy - 8);
  }, [from, to]);

  return <canvas ref={ref} style={{
    display: 'block', width: '100%', height: 220,
    borderRadius: 8, border: '1px solid var(--border)', background: '#0a1628',
  }} />;
}

export default function HohmannExperiment() {
  const [from, setFrom] = useState(2); // Erde
  const [to,   setTo]   = useState(3); // Mars

  const validTo = to === from ? (from < 4 ? from + 1 : from - 1) : to;
  const r1 = PLANETS[from].r, r2 = PLANETS[validTo].r;
  const calc = hohmannCalc(Math.min(r1, r2), Math.max(r1, r2));
  const outward = r2 > r1;

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}>
        <span className={styles.label}>Experiment</span>
        <strong>Hohmann-Transfer — von Planet zu Planet</strong>
      </div>

      <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
        Wähle Start- und Zielplanet. Der gestrichelte Bogen zeigt die Transferellipse —
        den energieoptimalen Weg zwischen zwei Umlaufbahnen.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
        {[['Start', from, setFrom], ['Ziel', to, setTo]].map(([label, val, setter]) => (
          <div key={label as string}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)',
              letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 6 }}>{label as string}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {PLANETS.map((p, i) => (
                <button key={i} onClick={() => (setter as (v: number) => void)(i)}
                  disabled={i === (label === 'Start' ? to : from)}
                  style={{
                    padding: '6px 10px', borderRadius: 6, textAlign: 'left',
                    border: '1.5px solid ' + ((val as number) === i ? '#C9A84C' : 'var(--border)'),
                    background: (val as number) === i ? '#C9A84C18' : 'var(--soft)',
                    color: i === (label === 'Start' ? to : from) ? 'var(--border)' :
                           (val as number) === i ? 'var(--navy)' : 'var(--muted)',
                    fontFamily: 'var(--font-mono)', fontSize: 11, cursor: 'pointer',
                  }}>
                  {p.emoji} {p.name} ({p.r} AU)
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <OrbitCanvas from={from} to={validTo} />

      <div className={styles.stats} style={{ marginTop: 12 }}>
        <div>
          <span>Δv₁ ({outward ? 'Beschleunigen' : 'Bremsen'})</span>
          <strong>{calc.dv1.toFixed(2)} km/s</strong>
        </div>
        <div>
          <span>Δv₂ (Einbremsen)</span>
          <strong>{calc.dv2.toFixed(2)} km/s</strong>
        </div>
        <div>
          <span>Δv gesamt</span>
          <strong style={{ color: '#C9A84C' }}>{calc.dvTotal.toFixed(2)} km/s</strong>
        </div>
        <div>
          <span>Reisezeit</span>
          <strong>{Math.round(calc.days)} Tage</strong>
        </div>
      </div>

      {from === 2 && validTo === 3 && (
        <div style={{ marginTop: 10, padding: '10px 14px', background: 'var(--navy)',
          borderRadius: 8, border: '1px solid #C9A84C44' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#C9A84C',
            letterSpacing: '.08em', marginBottom: 6, textTransform: 'uppercase' }}>
            Erde → Mars (Referenzwerte)
          </p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,.8)', margin: 0, lineHeight: 1.7 }}>
            Δv₁ ≈ 2.94 km/s (beim Verlassen der Erdumlaufbahn)<br/>
            Δv₂ ≈ 2.65 km/s (Einbremsen in Mars-Orbit)<br/>
            Reisezeit ≈ 259 Tage — Transferfenster alle 26 Monate
          </p>
        </div>
      )}
    </div>
  );
}
