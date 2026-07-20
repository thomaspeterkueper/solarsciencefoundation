'use client';
/**
 * WaterMoleculeExperiment — EXP:POLAR-SORTIERER
 * Interactive H2O: drag bond angle, see dipole live, H-bonds between molecules
 *
 * Physics:
 * - Real H2O angle: 104.5° (VSEPR: 2 bonding pairs + 2 lone pairs on O)
 * - Dipole moment: 1.85 D — NOT maximal at 104.5°
 *   At 90°: dipole would be STRONGER but H atoms repel each other
 *   At 109.5°: tetrahedral, minimum repulsion but weaker dipole
 *   104.5° = VSEPR compromise between repulsion and dipole strength
 * - Electronegativity: O=3.44, H=2.20 (Pauling scale)
 * - H-bond energy: ~23 kJ/mol (vs covalent O-H: 460 kJ/mol)
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

// Dipole moment in Debye vs angle (simplified model)
// Real H2O: 1.85 D at 104.5°
// At 90°: would be ~2.1 D but unstable
// At 120°: ~1.5 D
function calcDipole(angleDeg: number): number {
  // Bond dipoles add vectorially: μ_net = 2 * μ_OH * cos(θ/2)
  // where θ is H-O-H angle, μ_OH ≈ 1.51 D
  const theta = (angleDeg * Math.PI) / 180;
  return Math.round(2 * 1.51 * Math.cos(theta / 2) * 100) / 100; // Debye
}

function calcBoilingPoint(dipole: number): number {
  // Rough correlation: stronger dipole → more H-bonds → higher BP
  // H2O at 1.85D → 100°C; no dipole → ~-80°C
  return Math.round(-80 + (dipole / 1.85) * 180);
}

function drawMolecule(
  canvas: HTMLCanvasElement,
  angle: number,
  showHbonds: boolean,
  tick: number
) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  const ctx = canvas.getContext('2d')!;
  ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = canvas.offsetHeight;
  ctx.fillStyle = '#0a1628';
  ctx.fillRect(0, 0, W, H);

  if (!showHbonds) {
    // ── Single molecule view ──────────────────────────────────────────
    const cx = W / 2, cy = H / 2 + 10;
    const bondLen = 55;
    const halfAngle = (angle * Math.PI) / 180 / 2;

    // H positions
    const h1x = cx - Math.sin(halfAngle) * bondLen;
    const h1y = cy - Math.cos(halfAngle) * bondLen;
    const h2x = cx + Math.sin(halfAngle) * bondLen;
    const h2y = cy - Math.cos(halfAngle) * bondLen;

    // Bonds
    ctx.strokeStyle = '#888'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(h1x, h1y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(h2x, h2y); ctx.stroke();

    // Lone pair indicators (top of O)
    ctx.strokeStyle = 'rgba(91,143,185,0.5)'; ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.ellipse(cx - 14, cy + 22, 10, 6, -0.5, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx + 14, cy + 22, 10, 6, 0.5, 0, Math.PI * 2); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(91,143,185,0.4)'; ctx.font = '9px monospace'; ctx.textAlign = 'center';
    ctx.fillText('Elektronenpaar', cx, cy + 40);

    // Atoms
    // O — red
    const oGrad = ctx.createRadialGradient(cx - 4, cy - 4, 0, cx, cy, 22);
    oGrad.addColorStop(0, '#FF6B6B'); oGrad.addColorStop(1, '#DC143C');
    ctx.beginPath(); ctx.arc(cx, cy, 22, 0, Math.PI * 2);
    ctx.fillStyle = oGrad; ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = 'bold 14px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('O', cx, cy); ctx.textBaseline = 'alphabetic';

    // H atoms — blue-white
    for (const [hx, hy] of [[h1x, h1y], [h2x, h2y]]) {
      const hGrad = ctx.createRadialGradient(hx - 3, hy - 3, 0, hx, hy, 14);
      hGrad.addColorStop(0, '#BDD5EA'); hGrad.addColorStop(1, '#5B8FB9');
      ctx.beginPath(); ctx.arc(hx, hy, 14, 0, Math.PI * 2);
      ctx.fillStyle = hGrad; ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 11px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('H', hx, hy); ctx.textBaseline = 'alphabetic';
      // δ+ label
      ctx.fillStyle = '#5B8FB9'; ctx.font = '10px monospace'; ctx.textAlign = 'center';
      ctx.fillText('δ+', hx, hy - 22);
    }

    // δ- on O
    ctx.fillStyle = '#DC143C'; ctx.font = '10px monospace'; ctx.textAlign = 'center';
    ctx.fillText('δ−', cx, cy + 32);

    // Dipole arrow (net, pointing from + to -)
    const dipole = calcDipole(angle);
    const arrowLen = Math.round(dipole * 30);
    const ax = cx, ay = cy;
    const aEndY = ay + arrowLen;
    ctx.strokeStyle = '#C9A84C'; ctx.lineWidth = 2.5;
    ctx.shadowColor = '#C9A84C'; ctx.shadowBlur = 8;
    ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ax, aEndY); ctx.stroke();
    ctx.fillStyle = '#C9A84C';
    ctx.beginPath(); ctx.moveTo(ax, aEndY); ctx.lineTo(ax - 7, aEndY - 14); ctx.lineTo(ax + 7, aEndY - 14); ctx.closePath(); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#C9A84C'; ctx.font = 'bold 10px monospace'; ctx.textAlign = 'left';
    ctx.fillText('μ = ' + dipole.toFixed(2) + ' D', ax + 12, aEndY - 4);

    // Angle arc
    ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(cx, cy, 30, -Math.PI / 2 - halfAngle + 0.1, -Math.PI / 2 + halfAngle - 0.1);
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.font = '10px monospace'; ctx.textAlign = 'center';
    ctx.fillText(angle + '°', cx, cy - 35);

  } else {
    // ── H-bond network (3 molecules) ─────────────────────────────────
    const positions = [
      { cx: W * 0.25, cy: H * 0.38, flip: false },
      { cx: W * 0.72, cy: H * 0.38, flip: false },
      { cx: W * 0.5,  cy: H * 0.72, flip: true  },
    ];
    const bondLen = 40;
    const halfAngle = (104.5 * Math.PI) / 180 / 2;

    // H-bond lines between molecules (dashed gold)
    const hbondPairs = [
      [0, 1], [1, 2], [0, 2],
    ];
    const pulse = 0.5 + 0.5 * Math.sin(tick * 0.08);
    ctx.strokeStyle = 'rgba(201,168,76,' + (0.35 + pulse * 0.35) + ')';
    ctx.lineWidth = 1.5; ctx.setLineDash([5, 4]);
    for (const [a, b] of hbondPairs) {
      const pa = positions[a], pb = positions[b];
      ctx.beginPath(); ctx.moveTo(pa.cx, pa.cy); ctx.lineTo(pb.cx, pb.cy); ctx.stroke();
    }
    ctx.setLineDash([]);

    // Draw each molecule
    for (const { cx, cy, flip } of positions) {
      const dir = flip ? -1 : 1;
      const h1x = cx - Math.sin(halfAngle) * bondLen;
      const h1y = cy + dir * Math.cos(halfAngle) * bondLen;
      const h2x = cx + Math.sin(halfAngle) * bondLen;
      const h2y = cy + dir * Math.cos(halfAngle) * bondLen;
      ctx.strokeStyle = '#777'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(h1x, h1y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(h2x, h2y); ctx.stroke();
      // O
      ctx.beginPath(); ctx.arc(cx, cy, 16, 0, Math.PI * 2);
      ctx.fillStyle = '#DC143C'; ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 11px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('O', cx, cy); ctx.textBaseline = 'alphabetic';
      // H
      for (const [hx, hy] of [[h1x, h1y], [h2x, h2y]]) {
        ctx.beginPath(); ctx.arc(hx, hy, 11, 0, Math.PI * 2);
        ctx.fillStyle = '#5B8FB9'; ctx.fill();
        ctx.fillStyle = '#fff'; ctx.font = 'bold 9px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('H', hx, hy); ctx.textBaseline = 'alphabetic';
      }
    }

    // Label
    ctx.fillStyle = 'rgba(201,168,76,0.8)'; ctx.font = '10px monospace'; ctx.textAlign = 'center';
    ctx.fillText('--- Wasserstoffbrücke (23 kJ/mol)', W / 2, H - 10);
  }
}

// ── Popup ─────────────────────────────────────────────────────────────────
function Popup({ term, children }: { term: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <button onClick={() => setOpen(!open)} style={{
        background: 'none', border: 'none', padding: 0,
        borderBottom: '1.5px dashed var(--gold,#F4A300)',
        color: 'inherit', cursor: 'pointer', font: 'inherit',
      }}>{term}</button>
      {open && (
        <div style={{
          position: 'absolute', bottom: '120%', left: '50%', transform: 'translateX(-50%)',
          background: '#0A1628', color: 'rgba(255,255,255,.88)',
          padding: '12px 16px', borderRadius: 10, zIndex: 20, width: 260,
          fontSize: 13, lineHeight: 1.6, boxShadow: '0 4px 24px rgba(0,0,0,.35)',
          border: '1px solid rgba(201,168,76,.3)',
        }}>
          {children}
          <button onClick={() => setOpen(false)} style={{
            display: 'block', marginTop: 8, background: 'none', border: 'none',
            color: 'rgba(255,255,255,.4)', cursor: 'pointer',
            fontSize: 10, fontFamily: 'var(--font-mono)',
          }}>schließen ×</button>
        </div>
      )}
    </span>
  );
}

// ── Component ─────────────────────────────────────────────────────────────
export default function WaterMoleculeExperiment() {
  const [angle, setAngle] = useState(104.5);
  const [showHbonds, setShowHbonds] = useState(false);
  const [tick, setTick] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    animRef.current = setInterval(() => setTick(t => t + 1), 80);
    return () => { if (animRef.current) clearInterval(animRef.current); };
  }, []);
  useEffect(() => {
    if (canvasRef.current) drawMolecule(canvasRef.current, Math.round(angle), showHbonds, tick);
  }, [angle, showHbonds, tick]);
  useEffect(() => {
    const obs = new ResizeObserver(() => {
      if (canvasRef.current) drawMolecule(canvasRef.current, Math.round(angle), showHbonds, tick);
    });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [angle, showHbonds, tick]);

  const dipole = calcDipole(angle);
  const bp = calcBoilingPoint(dipole);
  const isReal = Math.abs(angle - 104.5) < 1;

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}>
        <span className={styles.label}>Experiment</span>
        <strong>Das Wassermolekül — Winkel, Dipol und Wasserstoffbrücken</strong>
      </div>

      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        {[false, true].map(hb => (
          <button key={String(hb)} onClick={() => setShowHbonds(hb)} style={{
            flex: 1, padding: '8px 0', borderRadius: 7,
            border: '1.5px solid ' + (showHbonds === hb ? '#C9A84C' : 'var(--border)'),
            background: showHbonds === hb ? '#C9A84C22' : 'var(--soft)',
            color: showHbonds === hb ? 'var(--navy)' : 'var(--muted)',
            fontFamily: 'var(--font-mono)', fontSize: 11, cursor: 'pointer', fontWeight: 600,
          }}>
            {hb ? '🔗 Wasserstoffbrücken' : '⚛ Einzelmolekül'}
          </button>
        ))}
      </div>

      {!showHbonds && (
        <>
          <label className={styles.sliderLabel} htmlFor="wm-a">
            <span>
              <Popup term="Bindungswinkel">
                <strong style={{ color: '#C9A84C', display: 'block', marginBottom: 4 }}>Bindungswinkel</strong>
                Der Winkel zwischen den H–O–H Bindungen. Bei 90° wären die H-Atome zu nah — sie stoßen sich ab. Bei 109.5° (Tetraeder) wäre der Dipol zu schwach. 104.5° ist der Kompromiss.
              </Popup>
            </span>
            <strong style={{ color: isReal ? '#C9A84C' : 'rgba(255,255,255,.7)' }}>
              {Math.round(angle)}° {isReal ? '← realer Wert' : ''}
            </strong>
          </label>
          <input id="wm-a" type="range" min="85" max="120" step="0.5" value={angle}
            onChange={e => setAngle(+e.target.value)} />
        </>
      )}

      <canvas ref={canvasRef} style={{
        display: 'block', width: '100%', height: 230,
        borderRadius: 8, border: '1px solid var(--border)',
        marginTop: 10, background: '#0a1628',
      }} />

      {!showHbonds && (
        <div style={{ marginTop: 12, padding: '12px 14px', background: 'var(--navy)', borderRadius: 8 }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.8)', lineHeight: 1.65, margin: 0 }}>
            {angle < 95
              ? '⚠ Zu enger Winkel: H-Atome stoßen sich ab — instabiles Molekül.'
              : angle > 112
              ? 'Breiter Winkel: Geringere Abstoßung, aber schwächerer Dipol. Siedepunkt wäre niedriger.'
              : isReal
              ? '✓ Der goldene Mittelwinkel: Genug Abstoßungsabstand UND starker Dipol. Das ist der Grund warum Wasser bei 100°C siedet.'
              : 'Verändere den Winkel und beobachte wie sich Dipol und Siedepunkt verschieben.'}
          </p>
        </div>
      )}

      {showHbonds && (
        <div style={{ marginTop: 12, padding: '12px 14px', background: 'var(--navy)', borderRadius: 8 }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.8)', lineHeight: 1.65, margin: 0 }}>
            Die goldenen gestrichelten Linien sind{' '}
            <Popup term="Wasserstoffbrücken">
              <strong style={{ color: '#C9A84C', display: 'block', marginBottom: 4 }}>Wasserstoffbrücke</strong>
              Jedes Wassermolekül bildet bis zu 4 Brücken mit Nachbarn. Energie: ~23 kJ/mol — 20× schwächer als eine kovalente Bindung, aber milliardenfach vorhanden. Deshalb kocht Wasser bei 100°C statt -80°C.
            </Popup>
            . Sie verbinden H-Atome (δ+) eines Moleküls mit O-Atomen (δ−) des Nachbarn. Diese Kette muss beim Kochen aufgebrochen werden — das kostet Energie.
          </p>
        </div>
      )}

      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div>
          <span>
            <Popup term="Dipolmoment μ">
              <strong style={{ color: '#C9A84C', display: 'block', marginBottom: 4 }}>Dipolmoment</strong>
              Ein Molekül mit zwei Gesichtern: eine positive und eine negative Seite. Wie eine Wippe mit ungleichem Gewicht. Einheit: Debye (D). H₂O: 1.85 D — einer der höchsten Werte.
            </Popup>
          </span>
          <strong style={{ fontSize: 18, color: dipole > 1.5 ? '#C9A84C' : 'var(--muted)' }}>
            {dipole.toFixed(2)} D
          </strong>
        </div>
        <div>
          <span>Siedepunkt (geschätzt)</span>
          <strong style={{ color: bp > 50 ? '#DC143C' : bp > 0 ? '#C9A84C' : '#5B8FB9' }}>
            {bp > 0 ? '+' : ''}{bp}°C
          </strong>
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <span>
            <Popup term="VSEPR-Modell">
              <strong style={{ color: '#C9A84C', display: 'block', marginBottom: 4 }}>VSEPR-Modell</strong>
              Valence Shell Electron Pair Repulsion: Elektronenpaare stoßen sich ab und nehmen maximalen Abstand ein. Bei H₂O: 2 Bindungspaare + 2 freie Paare → gewinkeltes Molekül, 104.5°.
            </Popup>
          </span>
          <strong style={{ fontSize: 12 }}>
            104.5° = Kompromiss: minimale H-Abstoßung UND maximaler Dipol für stabiles Molekül
          </strong>
        </div>
      </div>
    </div>
  );
}
