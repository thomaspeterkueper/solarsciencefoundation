'use client';
/**
 * WaterMoleculeExperiment — EXP:POLAR-SORTIERER
 * Three visualization modes + four-level Dipole popup
 *
 * Physics:
 * μ = 2 · μ_OH · cos(θ/2), μ_OH ≈ 1.51 D
 * H2O: θ=104.5°, μ=1.85 D
 * 104.5° = VSEPR compromise: 2 bonding + 2 lone pairs on O
 * NOT the angle of maximum dipole (that would be ~90°, but unstable)
 */
import { useEffect, useRef, useState } from 'react';
import styles from './RayleighExperiment.module.css';

// ── Physics ────────────────────────────────────────────────────────────────
function calcDipole(deg: number) {
  return Math.round(2 * 1.51 * Math.cos((deg * Math.PI) / 180 / 2) * 100) / 100;
}
function calcBP(dipole: number) {
  return Math.round(-80 + (dipole / 1.85) * 180);
}

// ── Four-level Dipole Popup ────────────────────────────────────────────────
const DIPOLE_LEVELS = [
  {
    label: 'Für alle',
    title: 'Ein Molekül mit zwei Gesichtern',
    text: 'Stell dir eine Wippe vor: Auf einer Seite sitzt ein Elefant (Sauerstoff), auf der anderen eine Maus (Wasserstoff). Die Wippe kippt zur schweren Seite — sie ist unausgeglichen. Genauso beim Wasser: Sauerstoff zieht Elektronen stärker an, wird dadurch negativ. Wasserstoff wird positiv. Ein Molekül mit Plus- und Minus-Seite nennt man Dipol — wie ein kleiner Magnet.',
  },
  {
    label: 'Jugendliche',
    title: 'Elektronen sind nicht fair verteilt',
    text: 'Normalerweise teilen Atome Elektronen gleichmäßig. Aber Sauerstoff ist gieriger — er zieht die gemeinsamen Elektronen näher zu sich. Dadurch bekommt er einen Minus-Überschuss (δ⁻), Wasserstoff wird positiv (δ⁺). Wie ein T-Shirt im Trockner: Eine Seite klebt, die andere zieht Haare an. Dieser Plus-Minus-Unterschied macht Wassermoleküle zu winzigen Magneten — sie ziehen sich gegenseitig an wie Klettverschlüsse.',
  },
  {
    label: 'Erwachsene',
    title: 'Elektronegativität und Ladungsschwerpunkte',
    text: 'Jedes Atom hat eine Elektronegativität — seine Fähigkeit, Elektronen anzuziehen. O: 3.44, H: 2.20 (Pauling-Skala). Sauerstoff zieht die Bindungselektronen zu sich — es entsteht ein permanenter Ladungsunterschied: δ⁻ am O, δ⁺ an den H. Ein Dipol ist ein Molekül mit permanentem elektrischen Moment. Ohne Dipol: keine Wasserstoffbrücken, kein hoher Siedepunkt, kein Leben.',
  },
  {
    label: 'Studium',
    title: 'Dipolmoment μ = q · d',
    text: 'Ein Dipol liegt vor wenn Schwerpunkt positiver ≠ Schwerpunkt negativer Ladung. Dipolmoment: μ = q · d [Debye]. H₂O: Elektronegativitätsdiff. O–H = 1.24 (Pauling), Winkel 104.5°, μ = 1.85 D. Die gewinkelten O–H-Bindungsdipole heben sich NICHT auf (anders als CO₂ mit 180°). Resultierender Dipol zeigt vom O weg zu den H. Konsequenz: H-Brücken, Ionen-Dipol-WW, anomale Eigenschaften.',
  },
];

function DipolPopup() {
  const [open, setOpen] = useState(false);
  const [level, setLevel] = useState(0);
  const lvl = DIPOLE_LEVELS[level];
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <button onClick={() => setOpen(!open)} style={{
        background: 'none', border: 'none', padding: 0,
        borderBottom: '1.5px dashed var(--gold,#F4A300)',
        color: 'inherit', cursor: 'pointer', font: 'inherit',
      }}>Dipol</button>
      {open && (
        <div style={{
          position: 'absolute', bottom: '120%', left: '50%',
          transform: 'translateX(-50%)',
          background: '#0A1628', color: 'rgba(255,255,255,.88)',
          padding: '14px 16px', borderRadius: 10, zIndex: 30, width: 290,
          fontSize: 13, lineHeight: 1.65,
          boxShadow: '0 6px 28px rgba(0,0,0,.4)',
          border: '1px solid rgba(201,168,76,.35)',
        }}>
          {/* Level tabs */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 10, flexWrap: 'wrap' }}>
            {DIPOLE_LEVELS.map((l, i) => (
              <button key={i} onClick={() => setLevel(i)} style={{
                padding: '3px 8px', borderRadius: 4, fontSize: 10,
                fontFamily: 'var(--font-mono)', letterSpacing: '.04em',
                border: '1px solid ' + (level === i ? '#C9A84C' : 'rgba(255,255,255,.2)'),
                background: level === i ? '#C9A84C22' : 'transparent',
                color: level === i ? '#C9A84C' : 'rgba(255,255,255,.5)',
                cursor: 'pointer',
              }}>{l.label}</button>
            ))}
          </div>
          <strong style={{ color: '#C9A84C', display: 'block', marginBottom: 6, fontSize: 12 }}>
            {lvl.title}
          </strong>
          <p style={{ margin: 0 }}>{lvl.text}</p>
          {level < 3 && (
            <button onClick={() => setLevel(l => l + 1)} style={{
              marginTop: 8, background: 'none', border: '1px solid rgba(201,168,76,.4)',
              color: '#C9A84C', cursor: 'pointer', fontSize: 10,
              fontFamily: 'var(--font-mono)', padding: '3px 10px', borderRadius: 4,
            }}>Tiefer eintauchen →</button>
          )}
          <button onClick={() => setOpen(false)} style={{
            display: 'block', marginTop: 8, background: 'none', border: 'none',
            color: 'rgba(255,255,255,.3)', cursor: 'pointer', fontSize: 10,
            fontFamily: 'var(--font-mono)',
          }}>schließen ×</button>
        </div>
      )}
    </span>
  );
}

function SimplePopup({ term, title, text }: { term: string; title: string; text: string }) {
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
          position: 'absolute', bottom: '120%', left: '50%',
          transform: 'translateX(-50%)',
          background: '#0A1628', color: 'rgba(255,255,255,.88)',
          padding: '12px 16px', borderRadius: 10, zIndex: 30, width: 270,
          fontSize: 13, lineHeight: 1.6,
          boxShadow: '0 4px 24px rgba(0,0,0,.35)',
          border: '1px solid rgba(201,168,76,.3)',
        }}>
          <strong style={{ color: '#C9A84C', display: 'block', marginBottom: 5, fontSize: 11 }}>{title}</strong>
          <p style={{ margin: 0 }}>{text}</p>
          <button onClick={() => setOpen(false)} style={{
            display: 'block', marginTop: 8, background: 'none', border: 'none',
            color: 'rgba(255,255,255,.3)', cursor: 'pointer', fontSize: 10,
            fontFamily: 'var(--font-mono)',
          }}>schließen ×</button>
        </div>
      )}
    </span>
  );
}

// ── Canvas drawing ─────────────────────────────────────────────────────────
type ViewMode = 'simple' | 'dipole' | 'density' | 'hbonds';

function drawCanvas(
  canvas: HTMLCanvasElement,
  mode: ViewMode,
  angle: number,
  tick: number,
) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * dpr;
  canvas.height = canvas.offsetHeight * dpr;
  const ctx = canvas.getContext('2d')!;
  ctx.scale(dpr, dpr);
  const W = canvas.offsetWidth, H = canvas.offsetHeight;
  ctx.fillStyle = '#0a1628';
  ctx.fillRect(0, 0, W, H);

  const cx = W / 2, cy = H / 2 + (mode === 'hbonds' ? 0 : 10);
  const bondLen = 54;
  const halfA = (angle * Math.PI) / 180 / 2;
  const h1x = cx - Math.sin(halfA) * bondLen;
  const h1y = cy - Math.cos(halfA) * bondLen;
  const h2x = cx + Math.sin(halfA) * bondLen;
  const h2y = cy - Math.cos(halfA) * bondLen;

  if (mode === 'simple') {
    // ── Mode 1: Wippe mit Elefant & Maus ─────────────────────────────
    // Wippe beam
    const tilt = ((angle - 104.5) / 30) * 0.15;
    ctx.save();
    ctx.translate(cx, cy + 20);
    ctx.rotate(tilt);
    ctx.fillStyle = '#4A3010';
    ctx.fillRect(-90, -4, 180, 8);
    ctx.fillStyle = '#6B4A20';
    ctx.beginPath();
    ctx.moveTo(-6, 0); ctx.lineTo(6, 0); ctx.lineTo(0, 22); ctx.closePath();
    ctx.fill();
    // Elefant (O side — left, heavy)
    ctx.fillStyle = '#DC143C';
    ctx.beginPath(); ctx.ellipse(-72, -22, 28, 18, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = 'bold 13px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('O', -72, -22); ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.font = '9px monospace';
    ctx.fillText('(Elefant)', -72, -4);
    ctx.fillStyle = '#DC143C'; ctx.font = '11px monospace';
    ctx.fillText('δ−', -72, -45);
    // Maus (H side — right, light)
    ctx.fillStyle = '#5B8FB9';
    ctx.beginPath(); ctx.ellipse(72, -18, 18, 13, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = 'bold 11px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('H', 72, -18); ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.font = '9px monospace';
    ctx.fillText('(Maus)', 72, -4);
    ctx.fillStyle = '#5B8FB9'; ctx.font = '11px monospace';
    ctx.fillText('δ+', 72, -38);
    ctx.restore();
    ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.font = '10px monospace'; ctx.textAlign = 'center';
    ctx.fillText('Die Wippe kippt zum Sauerstoff — das ist der Dipol', cx, H - 12);

  } else if (mode === 'dipole') {
    // ── Mode 2: Anschaulich — Plus/Minus + Dipolpfeil ─────────────────
    // Bonds
    ctx.strokeStyle = '#777'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(h1x, h1y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(h2x, h2y); ctx.stroke();
    // Lone pairs
    ctx.strokeStyle = 'rgba(91,143,185,0.45)'; ctx.lineWidth = 1.5; ctx.setLineDash([3,3]);
    ctx.beginPath(); ctx.ellipse(cx - 16, cy + 24, 11, 6, -0.5, 0, Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx + 16, cy + 24, 11, 6, 0.5, 0, Math.PI*2); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(91,143,185,.5)'; ctx.font = '8px monospace'; ctx.textAlign = 'center';
    ctx.fillText('freies e⁻-Paar', cx, cy + 42);
    // O atom
    const oG = ctx.createRadialGradient(cx-5, cy-5, 0, cx, cy, 23);
    oG.addColorStop(0, '#FF7070'); oG.addColorStop(1, '#C01030');
    ctx.beginPath(); ctx.arc(cx, cy, 23, 0, Math.PI*2); ctx.fillStyle = oG; ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = 'bold 14px monospace'; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('O', cx, cy); ctx.textBaseline='alphabetic';
    ctx.fillStyle = '#FF7070'; ctx.font = '11px monospace';
    ctx.fillText('δ−', cx, cy + 38);
    // H atoms
    for (const [hx, hy] of [[h1x, h1y],[h2x, h2y]] as [number,number][]) {
      const hG = ctx.createRadialGradient(hx-3, hy-3, 0, hx, hy, 15);
      hG.addColorStop(0, '#BDD5EA'); hG.addColorStop(1, '#4A7A9B');
      ctx.beginPath(); ctx.arc(hx, hy, 15, 0, Math.PI*2); ctx.fillStyle = hG; ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 11px monospace'; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText('H', hx, hy); ctx.textBaseline='alphabetic';
      ctx.fillStyle = '#7AADCC'; ctx.font = '11px monospace'; ctx.textAlign='center';
      ctx.fillText('δ+', hx, hy - 24);
    }
    // Dipole arrow
    const dip = calcDipole(angle);
    const arrowLen = Math.round(dip * 28);
    ctx.strokeStyle = '#C9A84C'; ctx.lineWidth = 3;
    ctx.shadowColor = '#C9A84C'; ctx.shadowBlur = 10;
    ctx.beginPath(); ctx.moveTo(cx, cy - 5); ctx.lineTo(cx, cy + arrowLen); ctx.stroke();
    ctx.fillStyle = '#C9A84C';
    ctx.beginPath(); ctx.moveTo(cx, cy+arrowLen); ctx.lineTo(cx-8, cy+arrowLen-16); ctx.lineTo(cx+8, cy+arrowLen-16); ctx.closePath(); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.font = '10px monospace'; ctx.textAlign = 'left';
    ctx.fillText('μ = ' + dip.toFixed(2) + ' D', cx + 12, cy + arrowLen - 4);
    // Angle
    ctx.strokeStyle = 'rgba(255,255,255,.2)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(cx, cy, 30, -Math.PI/2 - halfA + 0.1, -Math.PI/2 + halfA - 0.1); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.font = '10px monospace'; ctx.textAlign='center';
    ctx.fillText(angle + '°', cx, cy - 37);

  } else if (mode === 'density') {
    // ── Mode 3: Elektronendichte-Wolke (blau=arm, rot=reich) ──────────
    // Gradient cloud around O (electron-rich, red)
    const oCloud = ctx.createRadialGradient(cx, cy, 0, cx, cy, 50);
    oCloud.addColorStop(0, 'rgba(220,30,50,.7)');
    oCloud.addColorStop(0.5, 'rgba(200,40,60,.35)');
    oCloud.addColorStop(1, 'rgba(180,50,70,0)');
    ctx.beginPath(); ctx.arc(cx, cy, 50, 0, Math.PI*2); ctx.fillStyle = oCloud; ctx.fill();
    // Low density clouds around H (blue)
    for (const [hx, hy] of [[h1x,h1y],[h2x,h2y]] as [number,number][]) {
      const hCloud = ctx.createRadialGradient(hx, hy, 0, hx, hy, 32);
      hCloud.addColorStop(0, 'rgba(60,120,200,.6)');
      hCloud.addColorStop(0.6, 'rgba(60,120,200,.2)');
      hCloud.addColorStop(1, 'rgba(60,120,200,0)');
      ctx.beginPath(); ctx.arc(hx, hy, 32, 0, Math.PI*2); ctx.fillStyle = hCloud; ctx.fill();
    }
    // Bond lines (thin)
    ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(h1x,h1y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(h2x,h2y); ctx.stroke();
    // Atom labels
    ctx.fillStyle = '#fff'; ctx.font = 'bold 13px monospace'; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('O', cx, cy);
    ctx.font = 'bold 11px monospace';
    ctx.fillText('H', h1x, h1y);
    ctx.fillText('H', h2x, h2y);
    ctx.textBaseline = 'alphabetic';
    // Color legend
    ctx.fillStyle = 'rgba(220,30,50,.8)'; ctx.font = '9px monospace'; ctx.textAlign='left';
    ctx.fillText('■ Elektronenreich (δ−)', 8, H - 24);
    ctx.fillStyle = 'rgba(60,120,200,.8)';
    ctx.fillText('■ Elektronenarm (δ+)', 8, H - 10);
    ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.textAlign='center';
    ctx.fillText('Elektronendichte-Wolke — μ = ' + calcDipole(angle).toFixed(2) + ' D', cx, 16);

  } else {
    // ── Mode 4: H-Brücken-Netzwerk ────────────────────────────────────
    const mols = [
      { cx: W*.22, cy: H*.35, flip: false },
      { cx: W*.75, cy: H*.35, flip: false },
      { cx: W*.5,  cy: H*.73, flip: true  },
    ];
    const pulse = 0.5 + 0.5 * Math.sin(tick * 0.07);
    ctx.strokeStyle = 'rgba(201,168,76,' + (0.3 + pulse*0.4) + ')';
    ctx.lineWidth = 1.8; ctx.setLineDash([5,4]);
    for (const [a,b] of [[0,1],[1,2],[0,2]]) {
      ctx.beginPath(); ctx.moveTo(mols[a].cx, mols[a].cy); ctx.lineTo(mols[b].cx, mols[b].cy); ctx.stroke();
    }
    ctx.setLineDash([]);
    for (const m of mols) {
      const ha = (104.5*Math.PI)/180/2;
      const dir = m.flip ? 1 : -1;
      const bLen = 38;
      const hx1 = m.cx - Math.sin(ha)*bLen, hy1 = m.cy + dir*Math.cos(ha)*bLen;
      const hx2 = m.cx + Math.sin(ha)*bLen, hy2 = m.cy + dir*Math.cos(ha)*bLen;
      ctx.strokeStyle = '#666'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(m.cx,m.cy); ctx.lineTo(hx1,hy1); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(m.cx,m.cy); ctx.lineTo(hx2,hy2); ctx.stroke();
      ctx.beginPath(); ctx.arc(m.cx,m.cy,15,0,Math.PI*2); ctx.fillStyle='#C01030'; ctx.fill();
      ctx.fillStyle='#fff'; ctx.font='bold 11px monospace'; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText('O',m.cx,m.cy); ctx.textBaseline='alphabetic';
      for (const [hx,hy] of [[hx1,hy1],[hx2,hy2]] as [number,number][]) {
        ctx.beginPath(); ctx.arc(hx,hy,10,0,Math.PI*2); ctx.fillStyle='#4A7A9B'; ctx.fill();
        ctx.fillStyle='#fff'; ctx.font='bold 9px monospace'; ctx.textAlign='center'; ctx.textBaseline='middle';
        ctx.fillText('H',hx,hy); ctx.textBaseline='alphabetic';
      }
    }
    ctx.fillStyle='rgba(201,168,76,.75)'; ctx.font='9px monospace'; ctx.textAlign='center';
    ctx.fillText('--- Wasserstoffbrücke (23 kJ/mol) --- bis zu 4 pro Molekül', W/2, H-10);
  }
}

// ── Component ──────────────────────────────────────────────────────────────
export default function WaterMoleculeExperiment() {
  const [mode, setMode] = useState<ViewMode>('dipole');
  const [angle, setAngle] = useState(104.5);
  const [tick, setTick] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<ReturnType<typeof setInterval>|null>(null);

  useEffect(() => {
    animRef.current = setInterval(() => setTick(t => t+1), 80);
    return () => { if (animRef.current) clearInterval(animRef.current); };
  }, []);
  useEffect(() => {
    if (canvasRef.current) drawCanvas(canvasRef.current, mode, Math.round(angle*2)/2, tick);
  }, [mode, angle, tick]);
  useEffect(() => {
    const obs = new ResizeObserver(() => {
      if (canvasRef.current) drawCanvas(canvasRef.current, mode, Math.round(angle*2)/2, tick);
    });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, [mode, angle, tick]);

  const dipole = calcDipole(angle);
  const bp = calcBP(dipole);
  const isReal = Math.abs(angle - 104.5) < 0.8;

  const MODES: { id: ViewMode; label: string; emoji: string }[] = [
    { id: 'simple',  label: 'Einfach',      emoji: '⚖️' },
    { id: 'dipole',  label: 'Anschaulich',  emoji: '⚛️' },
    { id: 'density', label: 'Elektronendichte', emoji: '🌡️' },
    { id: 'hbonds',  label: 'H-Brücken',   emoji: '🔗' },
  ];

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}>
        <span className={styles.label}>Experiment</span>
        <strong>Das Wassermolekül — vier Sichtweisen</strong>
      </div>

      {/* Mode selector */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 6, marginBottom: 12 }}>
        {MODES.map(m => (
          <button key={m.id} onClick={() => setMode(m.id)} style={{
            padding: '7px 4px', borderRadius: 7, textAlign: 'center',
            border: '1.5px solid ' + (mode === m.id ? '#C9A84C' : 'var(--border)'),
            background: mode === m.id ? '#C9A84C22' : 'var(--soft)',
            color: mode === m.id ? 'var(--navy)' : 'var(--muted)',
            fontFamily: 'var(--font-mono)', fontSize: 9.5,
            letterSpacing: '.04em', cursor: 'pointer', lineHeight: 1.4,
          }}>
            <span style={{ display: 'block', fontSize: 16, marginBottom: 2 }}>{m.emoji}</span>
            {m.label}
          </button>
        ))}
      </div>

      {/* Angle slider — only for molecule views */}
      {(mode === 'dipole' || mode === 'density') && (
        <>
          <label className={styles.sliderLabel} htmlFor="wm-a">
            <span>
              <SimplePopup
                term="Bindungswinkel H–O–H"
                title="Warum 104,5°?"
                text="90° wäre instabil (H stoßen sich ab). 109,5° (Tetraeder wie Methan) hätte zu schwachen Dipol. 104,5° = goldener Mittelweg: stabiles Molekül UND starker Dipol. Nur 5° anders → Wasser wäre bei Raumtemperatur gasförmig."
              />
            </span>
            <strong style={{ color: isReal ? '#C9A84C' : 'rgba(255,255,255,.6)' }}>
              {Math.round(angle * 2) / 2}°{isReal ? ' ✓ real' : ''}
            </strong>
          </label>
          <input id="wm-a" type="range" min="85" max="120" step="0.5"
            value={angle} onChange={e => setAngle(+e.target.value)} />
        </>
      )}

      <canvas ref={canvasRef} style={{
        display: 'block', width: '100%', height: 230,
        borderRadius: 8, border: '1px solid var(--border)',
        marginTop: 10, background: '#0a1628',
      }} />

      {/* Context text */}
      <div style={{ marginTop: 10, padding: '12px 14px', background: 'var(--navy)', borderRadius: 8 }}>
        <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,.82)', lineHeight: 1.65 }}>
          {mode === 'simple' && 'Das ist der Kern des Dipols: Eine Seite des Moleküls ist schwerer beladen als die andere — wie eine schiefe Wippe. Diese Ungleichgewicht ist die Ursache aller besonderen Eigenschaften des Wassers.'}
          {mode === 'dipole' && (
            <>Der <DipolPopup /> des Wassers beträgt 1,85 Debye — einer der höchsten Werte aller kleinen Moleküle. Das goldene Band zeigt die Richtung: von δ+ (Wasserstoff) nach δ−  (Sauerstoff).{!isReal && ' Verändere den Winkel: Der Dipol sinkt bei breiteren Winkeln.'}</>
          )}
          {mode === 'density' && 'Die Farbe zeigt wo Elektronen sich aufhalten: Rot = viele Elektronen (Sauerstoff, δ−). Blau = wenige Elektronen (Wasserstoff, δ+). Diese Ungleichverteilung ist kein Zufall — sie folgt aus der Elektronegativität der Atome.'}
          {mode === 'hbonds' && (
            <>Die gestrichelten goldenen Linien sind{' '}
            <SimplePopup term="Wasserstoffbrücken" title="Wasserstoffbrücke" text="H (δ+) eines Moleküls wird von O (δ−) des Nachbarn angezogen. Energie: 23 kJ/mol — 20× schwächer als kovalente Bindung. Aber jedes Molekül bildet bis zu 4 davon gleichzeitig. Diese Kette muss beim Kochen gebrochen werden → deshalb 100°C statt -80°C." />
            {'. Jede kostet 23 kJ/mol zum Aufbrechen. Das erklärt den hohen Siedepunkt.'}
            </>
          )}
        </p>
      </div>

      {/* Stats */}
      {(mode === 'dipole' || mode === 'density') && (
        <div className={styles.stats} style={{ marginTop: 10 }}>
          <div><span>Dipolmoment μ</span>
            <strong style={{ fontSize: 17, color: dipole > 1.5 ? '#C9A84C' : 'var(--muted)' }}>
              {dipole.toFixed(2)} D
            </strong>
          </div>
          <div><span>Siedepunkt (Modell)</span>
            <strong style={{ color: bp > 50 ? '#DC143C' : bp > 0 ? '#C9A84C' : '#5B8FB9' }}>
              {bp > 0 ? '+' : ''}{bp}°C
            </strong>
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <span>Fazit</span>
            <strong style={{ fontSize: 12 }}>
              {angle < 97 ? '⚠ Zu eng — H-Atome stoßen sich ab, instabiles Molekül'
               : angle > 112 ? 'Breiter Winkel — Dipol schwächer, Siedepunkt wäre tiefer'
               : isReal ? '✓ 104,5° — Kompromiss: stabiles Molekül UND starker Dipol'
               : 'Verändere den Winkel und beobachte Dipol und Siedepunkt.'}
            </strong>
          </div>
        </div>
      )}
    </div>
  );
}
