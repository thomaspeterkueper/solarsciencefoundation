'use client';
/**
 * RotweinExperiment — EXP:DENATURIERUNG + EXP:FLECK-BEHANDLUNG
 * Two modes:
 * 1. Unfall: choose action (hot/cold/salt/soda/rub), see animated result
 * 2. Behandlung: slider for stain age, compare 4 methods
 *
 * Chemistry:
 * - Anthocyans + tannins in wine bind to textile protein fibers
 * - Heat (>40°C): proteins denature → irreversible cross-linking → stain fixed
 * - Cold water: prevents denaturation, rinses free pigment
 * - Salt: osmotic effect → draws liquid out before drying (fresh only)
 * - Soda (base): saponifies tannins, loosens aged stains
 */
import { useState, useEffect, useRef } from 'react';
import styles from './RayleighExperiment.module.css';

function Pop({ term, children }: { term: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        background: 'none', border: 'none', padding: 0,
        borderBottom: '1.5px dashed #C9A84C', color: 'inherit',
        cursor: 'pointer', font: 'inherit',
      }}>{term}</button>
      {open && (
        <div onClick={e => e.stopPropagation()} style={{
          position: 'absolute', bottom: '120%', left: '50%',
          transform: 'translateX(-50%)',
          background: '#0A1628', color: 'rgba(255,255,255,.88)',
          padding: '12px 16px', borderRadius: 10, zIndex: 40, width: 270,
          fontSize: 13, lineHeight: 1.65,
          boxShadow: '0 6px 28px rgba(0,0,0,.4)',
          border: '1px solid rgba(201,168,76,.3)',
        }}>
          <strong style={{ color: '#C9A84C', display: 'block', marginBottom: 6, fontSize: 11 }}>{term}</strong>
          <p style={{ margin: 0 }}>{children}</p>
          <button onClick={() => setOpen(false)} style={{
            display: 'block', marginTop: 8, background: 'none', border: 'none',
            color: 'rgba(255,255,255,.3)', cursor: 'pointer',
            fontSize: 10, fontFamily: 'var(--font-mono)',
          }}>schließen ×</button>
        </div>
      )}
    </span>
  );
}

// ── Canvas: protein denaturation visualization ───────────────────────────
function ProteinCanvas({ temp, action }: { temp: number; action: string | null }) {
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

    const denat = Math.max(0, Math.min(1, (temp - 35) / 45)); // 0 at 35°C, 1 at 80°C

    // Textile fibers (gray horizontal lines)
    ctx.strokeStyle = 'rgba(180,160,140,0.4)'; ctx.lineWidth = 2;
    for (let y = H * 0.3; y < H * 0.85; y += 14) {
      ctx.beginPath(); ctx.moveTo(20, y); ctx.lineTo(W - 20, y); ctx.stroke();
    }

    // Protein blob
    const cx = W / 2, cy = H * 0.5;
    const blobColor = denat < 0.2 ? '#DC143C88' : denat < 0.6 ? '#8B1A1ACC' : '#4A0A0ACC';
    const radius = 28 + denat * 18; // spreads as denatures
    ctx.shadowColor = blobColor; ctx.shadowBlur = denat * 20;
    ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = blobColor; ctx.fill();
    ctx.shadowBlur = 0;

    // Cross-links forming (denaturation)
    if (denat > 0.3) {
      const links = Math.round(denat * 8);
      ctx.strokeStyle = `rgba(220,20,60,${denat * 0.7})`; ctx.lineWidth = 1.5;
      for (let i = 0; i < links; i++) {
        const angle = (i / links) * Math.PI * 2;
        const r = radius + 10;
        const fiberY = Math.round((cy + Math.sin(angle) * r) / 14) * 14;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
        ctx.lineTo(cx + Math.cos(angle) * (radius + 20), fiberY);
        ctx.stroke();
      }
    }

    // Labels
    ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.font = '10px monospace'; ctx.textAlign = 'center';
    ctx.fillText(temp + '°C', cx, cy + radius + 20);

    const stateLabel = denat < 0.2 ? 'löslich — entfernbar' : denat < 0.6 ? 'beginnt zu vernetzen ⚠' : 'permanent fixiert ✗';
    const stateColor = denat < 0.2 ? '#7AAD7A' : denat < 0.6 ? '#C9A84C' : '#DC143C';
    ctx.fillStyle = stateColor; ctx.font = 'bold 11px monospace';
    ctx.fillText(stateLabel, cx, H - 10);
  }, [temp, action]);

  return <canvas ref={ref} style={{
    display: 'block', width: '100%', height: 160,
    borderRadius: 8, border: '1px solid var(--border)', marginBottom: 12,
  }} />;
}

type Action = 'hot' | 'cold' | 'salt' | 'soda' | 'rub' | null;

const ACTIONS: { id: Action; emoji: string; label: string; temp: number; result: string; color: string }[] = [
  { id: 'hot',  emoji: '🔥', label: 'Heißes Wasser', temp: 85, color: '#DC143C',
    result: 'Proteine denaturieren bei 85°C sofort. Der Fleck vernetzt mit der Faser — permanent.' },
  { id: 'cold', emoji: '❄️', label: 'Kaltes Wasser',  temp: 15, color: '#5B8FB9',
    result: 'Kalt spülen verhindert Denaturierung. Freie Farbstoffe werden ausgespült — Fleck schwächt sich.' },
  { id: 'salt', emoji: '🧂', label: 'Salz',            temp: 20, color: '#7AAD7A',
    result: 'Salz wirkt osmotisch: entzieht dem frischen Fleck Wasser und zieht Farbstoffe heraus. Nur bei frischen Flecken!' },
  { id: 'soda', emoji: '🫧', label: 'Soda-Paste',      temp: 20, color: '#B464FF',
    result: 'Soda (basisch, pH ~11) löst bereits getrocknete Tannine und Anthocyane auf. Bei alten Flecken.' },
  { id: 'rub',  emoji: '👊', label: 'Reiben',           temp: 40, color: '#C9A84C',
    result: 'Reiben erzeugt Reibungswärme (~40°C) UND treibt den Farbstoff tiefer in die Faser. Worst case.' },
];

// Stain age vs. method effectiveness
const METHOD_EFFICIENCY = {
  salt:    (mins: number) => Math.max(0, 90 - mins * 3),
  cold:    (mins: number) => Math.max(10, 70 - mins * 2),
  soda:    (mins: number) => mins < 5 ? 40 : Math.min(80, 30 + mins * 1.5),
  enzyme:  (mins: number) => Math.min(85, 20 + mins * 1.2),
};

export default function RotweinExperiment() {
  const [mode, setMode] = useState<'unfall' | 'behandlung'>('unfall');
  const [action, setAction] = useState<Action>(null);
  const [stainAge, setStainAge] = useState(0);

  const selected = ACTIONS.find(a => a.id === action);
  const temp = selected?.temp ?? 22;

  const MODES = [
    { id: 'unfall' as const,     emoji: '🍷', label: 'Unfall' },
    { id: 'behandlung' as const, emoji: '🧂', label: 'Behandlung' },
  ];

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}>
        <span className={styles.label}>Experiment</span>
        <strong>Rotweinfleck — was wirklich passiert</strong>
      </div>

      {/* Mode tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        {MODES.map(m => (
          <button key={m.id} onClick={() => { setMode(m.id); setAction(null); }} style={{
            flex: 1, padding: '8px 0', borderRadius: 7, textAlign: 'center',
            border: '1.5px solid ' + (mode === m.id ? '#DC143C' : 'var(--border)'),
            background: mode === m.id ? '#DC143C22' : 'var(--soft)',
            color: mode === m.id ? '#8B0000' : 'var(--muted)',
            fontFamily: 'var(--font-mono)', fontSize: 11,
            letterSpacing: '.04em', cursor: 'pointer', fontWeight: 600,
          }}>
            <span style={{ marginRight: 6 }}>{m.emoji}</span>{m.label}
          </button>
        ))}
      </div>

      {/* ── UNFALL MODE ── */}
      {mode === 'unfall' && (
        <>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, lineHeight: 1.65, marginBottom: 12 }}>
            Der Rotwein ist drauf. Was machst du?
            Das Canvas zeigt was mit den <Pop term="Tannine und Anthocyane">Natürliche Farbstoffe und Gerbstoffe im Rotwein. Tannine (aus Traubenschalen) binden an Proteine — bei Hitze unlöslich. Anthocyane geben die rote Farbe.</Pop> in deinem Hemd passiert.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7, marginBottom: 12 }}>
            {ACTIONS.map(a => (
              <button key={a.id} onClick={() => setAction(a.id)} style={{
                padding: '9px 10px', borderRadius: 8, textAlign: 'left',
                border: '1.5px solid ' + (action === a.id ? a.color : 'var(--border)'),
                background: action === a.id ? a.color + '18' : 'var(--soft)',
                color: action === a.id ? a.color : 'var(--ink)',
                fontFamily: 'var(--font-mono)', fontSize: 11, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 7,
                gridColumn: a.id === 'rub' ? 'span 2' : undefined,
              }}>
                <span style={{ fontSize: 18 }}>{a.emoji}</span>
                <span>{a.label}</span>
              </button>
            ))}
          </div>

          <ProteinCanvas temp={temp} action={action} />

          {action && selected && (
            <div style={{
              padding: '12px 14px', borderRadius: 8,
              background: 'var(--navy)', border: '1px solid ' + selected.color + '44',
            }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10,
                color: selected.color, letterSpacing: '.08em',
                textTransform: 'uppercase', marginBottom: 6 }}>
                {selected.emoji} {selected.label} bei {selected.temp}°C
              </p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,.85)', lineHeight: 1.65, margin: 0 }}>
                {selected.result}
              </p>
              {action === 'hot' && (
                <p style={{ fontSize: 12, color: 'rgba(220,20,60,.8)', marginTop: 8, fontStyle: 'italic' }}>
                  <Pop term="Denaturierung">Verlust der dreidimensionalen Proteinstruktur durch Hitze. Die Proteine entfalten sich, verklumpen und vernetzen mit den Textilfasern — irreversibel. Wie ein Ei das du nicht mehr roh machen kannst.</Pop>{' '}
                  bei {selected.temp}°C — der Fleck ist jetzt dauerhaft fixiert.
                </p>
              )}
            </div>
          )}
        </>
      )}

      {/* ── BEHANDLUNG MODE ── */}
      {mode === 'behandlung' && (
        <>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, lineHeight: 1.65, marginBottom: 12 }}>
            Wie lange ist der Fleck schon drauf? Die Effektivität der Methoden ändert sich drastisch.
          </p>
          <label className={styles.sliderLabel} htmlFor="stain-age">
            <span>Fleck ist alt</span>
            <strong>{stainAge < 2 ? 'frisch (Sekunden)' : stainAge < 10 ? stainAge + ' Min.' : stainAge < 60 ? stainAge + ' Min.' : Math.round(stainAge/60) + ' Std.'}</strong>
          </label>
          <input id="stain-age" type="range" min={0} max={120} value={stainAge}
            onChange={e => setStainAge(+e.target.value)} />

          {/* Efficiency bars */}
          <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
            {[
              { key: 'salt' as const,   emoji: '🧂', label: 'Salz',           color: '#7AAD7A', note: 'Osmose — zieht Flüssigkeit heraus' },
              { key: 'cold' as const,   emoji: '❄️', label: 'Kaltes Wasser',  color: '#5B8FB9', note: 'Verhindert Denaturierung, spült freie Farbstoffe' },
              { key: 'soda' as const,   emoji: '🫧', label: 'Soda-Paste',     color: '#B464FF', note: 'Base (pH 11) löst Tannine auf' },
              { key: 'enzyme' as const, emoji: '🧴', label: 'Enzymwaschmittel', color: '#C9A84C', note: 'Proteasen spalten fixierte Proteine' },
            ].map(m => {
              const eff = METHOD_EFFICIENCY[m.key](stainAge);
              return (
                <div key={m.key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>
                      {m.emoji} {m.label}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11,
                      color: eff > 60 ? '#7AAD7A' : eff > 30 ? '#C9A84C' : '#DC143C' }}>
                      {Math.round(eff)}% Effektivität
                    </span>
                  </div>
                  <div style={{ height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 4,
                      width: eff + '%', background: m.color,
                      transition: 'width .5s cubic-bezier(.22,1,.36,1)',
                    }} />
                  </div>
                  <p style={{ fontSize: 11, color: 'var(--muted)', margin: '3px 0 0', fontStyle: 'italic' }}>
                    {m.note}
                  </p>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 14, padding: '12px 14px', background: 'var(--navy)', borderRadius: 8 }}>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.82)', lineHeight: 1.65, margin: 0 }}>
              {stainAge < 5
                ? '✓ Frischer Fleck: Salz sofort drauf, dann kalt spülen. Noch keine Vernetzung.'
                : stainAge < 20
                ? '⚠ Etwas angetrocknet: Kaltes Wasser + Soda-Paste. Salz verliert Wirkung.'
                : stainAge < 60
                ? '⚠ Trocken: Soda-Paste + Enzymwaschmittel einweichen. Salz hilft nicht mehr.'
                : '✗ Alt: Nur Enzymwaschmittel hilft noch. Bei 30°C waschen — nicht heiß!'}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
