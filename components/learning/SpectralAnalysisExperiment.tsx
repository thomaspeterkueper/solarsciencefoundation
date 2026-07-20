'use client';
/**
 * SpectralAnalysisExperiment — EXP:ABSORPTIONSLINIEN + EXP:LICHTSPEKTRUM
 * 4 modes: Natriumlampe, Fraunhofer, Helium-Geschichte, NOXIA-Scanner
 * Physics: discrete emission at 589nm (Na D-lines), Fraunhofer absorption,
 *          electron transitions between energy levels
 */
import { useState, useEffect, useRef } from 'react';
import styles from './RayleighExperiment.module.css';

// ── Element data ───────────────────────────────────────────────────────────
const ELEMENTS: Record<string, {
  color: string; nm: number[]; label: string; fun: string;
}> = {
  Na: { color: '#FFD700', nm: [589, 589.6],  label: 'Natrium',    fun: 'Straßenlaternen, Speisesalz' },
  H:  { color: '#FF4444', nm: [656, 486, 434, 410], label: 'Wasserstoff', fun: 'Sonne, Sterne, Universum' },
  He: { color: '#AADDFF', nm: [587, 502, 668, 471], label: 'Helium',      fun: 'MRT, Ballons, Supraleiter' },
  Ca: { color: '#FF8800', nm: [393, 396, 422],       label: 'Kalzium',    fun: 'Knochen, Sterne (H+K Linien)' },
  Fe: { color: '#AA6644', nm: [527, 438, 495, 516],  label: 'Eisen',      fun: 'Erde, Meteoriten, Erdkern' },
  Mg: { color: '#88FF88', nm: [518, 457, 552],        label: 'Magnesium',  fun: 'Chlorophyll, Muskeln' },
};

const ROCK_ELEMENTS: Record<string, string[]> = {
  granite:  ['Na', 'Ca', 'Fe'],
  basalt:   ['Mg', 'Fe', 'Ca'],
  ore:      ['Fe', 'He', 'Na'],
};

// nm → x position on spectrum bar (380-780nm range)
function nmToX(nm: number, width: number): number {
  return ((nm - 380) / (780 - 380)) * width;
}

// nm → hsl color
function nmToColor(nm: number): string {
  if (nm < 380) return '#8800FF';
  if (nm < 440) return `hsl(${270 + (nm-380)*0.7}, 100%, 50%)`;
  if (nm < 490) return `hsl(${240 + (nm-440)*0.8}, 100%, 50%)`;
  if (nm < 510) return `hsl(${120 + (nm-490)*5}, 100%, 45%)`;
  if (nm < 580) return `hsl(${120 - (nm-510)*1.7}, 100%, 50%)`;
  if (nm < 620) return `hsl(${60 - (nm-580)*2}, 100%, 50%)`;
  if (nm < 700) return `hsl(${20 - (nm-620)*0.3}, 100%, 45%)`;
  return '#AA0000';
}

// ── Spectrum Canvas ────────────────────────────────────────────────────────
function SpectrumCanvas({
  activeElements, showFraunhofer, highlight,
}: {
  activeElements: string[];
  showFraunhofer: boolean;
  highlight?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);
    const W = canvas.offsetWidth, H = canvas.offsetHeight;

    // Rainbow background
    const grad = ctx.createLinearGradient(0, 0, W, 0);
    for (let nm = 380; nm <= 780; nm += 5) {
      grad.addColorStop((nm-380)/400, nmToColor(nm));
    }
    ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);

    if (showFraunhofer) {
      // Dark absorption lines (Fraunhofer)
      for (const [, el] of Object.entries(ELEMENTS)) {
        for (const nm of el.nm) {
          const x = nmToX(nm, W);
          ctx.fillStyle = 'rgba(0,0,0,0.7)';
          ctx.fillRect(x - 1.5, 0, 3, H);
        }
      }
    } else {
      // Emission lines (dark background + bright lines)
      ctx.fillStyle = '#050510'; ctx.fillRect(0, 0, W, H);
      for (const elId of activeElements) {
        const el = ELEMENTS[elId];
        for (const nm of el.nm) {
          const x = nmToX(nm, W);
          ctx.strokeStyle = nmToColor(nm);
          ctx.lineWidth = 2; ctx.globalAlpha = 0.9;
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }

    // Highlight nm marker
    if (highlight) {
      const x = nmToX(highlight, W);
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 3]);
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#fff'; ctx.font = '10px monospace';
      ctx.textAlign = x > W/2 ? 'right' : 'left';
      ctx.fillText(highlight + ' nm', x + (x > W/2 ? -4 : 4), 14);
    }

    // nm scale
    ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '8px monospace'; ctx.textAlign = 'center';
    for (const nm of [400, 450, 500, 550, 600, 650, 700, 750]) {
      const x = nmToX(nm, W);
      ctx.fillText(nm + '', x, H - 3);
    }
  });
  return <canvas ref={ref} style={{ display:'block', width:'100%', height: 70,
    borderRadius: 6, border:'1px solid var(--border)', cursor:'pointer' }} />;
}

// ── Popup ─────────────────────────────────────────────────────────────────
function Pop({ term, children }: { term: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <span style={{ position:'relative', display:'inline-block' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        background:'none', border:'none', padding:0,
        borderBottom:'1.5px dashed #C9A84C', color:'inherit',
        cursor:'pointer', font:'inherit',
      }}>{term}</button>
      {open && (
        <div onClick={e => e.stopPropagation()} style={{
          position:'absolute', bottom:'120%', left:'50%', transform:'translateX(-50%)',
          background:'#0A1628', color:'rgba(255,255,255,.88)',
          padding:'12px 16px', borderRadius:10, zIndex:40, width:270,
          fontSize:13, lineHeight:1.65,
          boxShadow:'0 6px 28px rgba(0,0,0,.4)',
          border:'1px solid rgba(201,168,76,.3)',
        }}>
          <strong style={{ color:'#C9A84C', display:'block', marginBottom:6, fontSize:11 }}>{term}</strong>
          <p style={{ margin:0 }}>{children}</p>
          <button onClick={() => setOpen(false)} style={{
            display:'block', marginTop:8, background:'none', border:'none',
            color:'rgba(255,255,255,.3)', cursor:'pointer', fontSize:10, fontFamily:'var(--font-mono)',
          }}>schließen ×</button>
        </div>
      )}
    </span>
  );
}

type Mode = 'lamp' | 'fraunhofer' | 'helium' | 'noxia';

export default function SpectralAnalysisExperiment() {
  const [mode, setMode] = useState<Mode>('lamp');
  const [naTemp, setNaTemp] = useState(2500);
  const [selectedEl, setSelectedEl] = useState<string | null>('Na');
  const [rock, setRock] = useState<string>('granite');
  const [scanned, setScanned] = useState(false);
  const [guessEl, setGuessEl] = useState<string | null>(null);
  const [heliumStep, setHeliumStep] = useState(0);

  const MODES: { id: Mode; icon: string; label: string }[] = [
    { id: 'lamp',      icon: '💡', label: 'Lampe' },
    { id: 'fraunhofer',icon: '🌈', label: 'Fraunhofer' },
    { id: 'helium',    icon: '🔎', label: 'Helium' },
    { id: 'noxia',     icon: '📡', label: 'NOXIA' },
  ];

  const HELIUM_STORY = [
    { year: '1868', title: 'Sonnenfinsternis', text: 'Astronomen entdecken eine gelbe Linie im Sonnenlicht bei 587 nm — sie passt zu keinem bekannten Element auf der Erde. Sie nennen es "Helium" nach Helios, dem Sonnengott.' },
    { year: '1895', title: 'Auf der Erde', text: '27 Jahre später findet William Ramsay Helium in einem Uran-Mineral auf der Erde. Die Linie bei 587 nm stimmt exakt überein. Beweis: Dieselbe Physik gilt überall im Universum.' },
    { year: 'Heute', title: 'Anwendungen', text: 'Helium kühlt MRT-Magnete auf -269°C, hält Forschungsballons in der Luft und ermöglicht Supraleiter. Kein Helium — keine modernen Krankenhäuser, keine Raumfahrt.' },
  ];

  const rockEls = ROCK_ELEMENTS[rock] || [];
  const mainEl = rockEls[0];

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}>
        <span className={styles.label}>Experiment</span>
        <strong>Spektralanalyse — der Licht-Fingerabdruck</strong>
      </div>

      {/* Mode tabs */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:6, marginBottom:14 }}>
        {MODES.map(m => (
          <button key={m.id} onClick={() => setMode(m.id)} style={{
            padding:'7px 4px', borderRadius:7, textAlign:'center',
            border:'1.5px solid ' + (mode===m.id ? '#C9A84C' : 'var(--border)'),
            background: mode===m.id ? '#C9A84C22' : 'var(--soft)',
            color: mode===m.id ? 'var(--navy)' : 'var(--muted)',
            fontFamily:'var(--font-mono)', fontSize:9.5,
            letterSpacing:'.04em', cursor:'pointer', lineHeight:1.4,
          }}>
            <span style={{ display:'block', fontSize:16, marginBottom:2 }}>{m.icon}</span>
            {m.label}
          </button>
        ))}
      </div>

      {/* ── Mode: LAMP ── */}
      {mode === 'lamp' && (
        <>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:10 }}>
            <span style={{ fontSize:36 }}>💡</span>
            <div>
              <p style={{ fontFamily:'var(--font-serif)', fontSize:15, margin:0, lineHeight:1.5 }}>
                Eine <Pop term="Natriumlampe">Natriumatome werden durch elektrischen Strom angeregt — sie geben Energie als Licht bei genau 589 nm ab. Das ist kein Zufall, das ist Quantenmechanik.</Pop> leuchtet
                immer bei <strong style={{ color:'#FFD700' }}>589 nm</strong> — egal wie heiß sie ist.
              </p>
            </div>
          </div>
          <label className={styles.sliderLabel} htmlFor="na-temp">
            <span>Temperatur der Lampe</span>
            <strong>{naTemp} °C</strong>
          </label>
          <input id="na-temp" type="range" min={1800} max={3500} value={naTemp}
            onChange={e => setNaTemp(+e.target.value)} />
          <div style={{ height:60, background:'#050510', borderRadius:8, marginTop:10,
            display:'flex', alignItems:'center', justifyContent:'center',
            border:'1px solid var(--border)', position:'relative', overflow:'hidden' }}>
            {/* Sodium line always at 589nm */}
            <div style={{
              position:'absolute', left: `${((589-380)/(780-380))*100}%`,
              width:3, height:'100%',
              background:`rgba(255,215,0,${Math.min(1, (naTemp-1800)/800)})`,
              boxShadow:`0 0 ${8 + (naTemp-1800)/100}px #FFD700`,
            }} />
            <p style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'rgba(255,255,255,.4)',
              zIndex:1, margin:0, letterSpacing:'.06em' }}>
              589 nm — Natrium D-Linie — immer gelb
            </p>
          </div>
          <div style={{ marginTop:10, padding:'10px 14px', background:'var(--navy)', borderRadius:8 }}>
            <p style={{ fontSize:13, color:'rgba(255,255,255,.82)', lineHeight:1.65, margin:0 }}>
              Bei {naTemp}°C: Die Linie bei 589 nm {naTemp < 2000 ? 'ist kaum sichtbar' :
              naTemp < 2500 ? 'leuchtet schwach gelb' : 'leuchtet hell gelb-orange'}.
              {' '}Aber die <Pop term="Wellenlänge">Wellenlänge ist der Abstand zwischen zwei Wellenbergen — bestimmt die Farbe. 589 nm = gelb. Sichtbares Licht: 380–780 nm.</Pop> ändert sich nie —
              das ist der Fingerabdruck von Natrium.
            </p>
          </div>
        </>
      )}

      {/* ── Mode: FRAUNHOFER ── */}
      {mode === 'fraunhofer' && (
        <>
          <p style={{ fontFamily:'var(--font-serif)', fontSize:14, lineHeight:1.6, marginBottom:12 }}>
            Joseph von <Pop term="Fraunhofer">Fraunhofer entdeckte 1814 in München über 570 dunkle Linien im Sonnenlicht. Er wusste nicht warum — aber er kartographierte sie. Heute wissen wir: sie sind Fingerabdrücke von Elementen in der Sonnenatmosphäre.</Pop> sah dunkle Striche im Sonnenlicht.
            Klicke auf ein Element um seinen Fingerabdruck zu sehen:
          </p>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:10 }}>
            {Object.entries(ELEMENTS).map(([id, el]) => (
              <button key={id} onClick={() => setSelectedEl(selectedEl===id ? null : id)} style={{
                padding:'4px 10px', borderRadius:6, fontSize:11,
                fontFamily:'var(--font-mono)', letterSpacing:'.04em',
                border:'1.5px solid ' + (selectedEl===id ? el.color : 'var(--border)'),
                background: selectedEl===id ? el.color + '22' : 'var(--soft)',
                color: selectedEl===id ? el.color : 'var(--muted)',
                cursor:'pointer',
              }}>{id} — {el.label}</button>
            ))}
          </div>
          <SpectrumCanvas
            activeElements={selectedEl ? [selectedEl] : []}
            showFraunhofer={true}
            highlight={selectedEl ? ELEMENTS[selectedEl].nm[0] : undefined}
          />
          {selectedEl && (
            <div style={{ marginTop:10, padding:'10px 14px', background:'var(--navy)', borderRadius:8 }}>
              <p style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'#C9A84C',
                letterSpacing:'.08em', textTransform:'uppercase', marginBottom:6 }}>
                {ELEMENTS[selectedEl].label} — {ELEMENTS[selectedEl].nm.join(', ')} nm
              </p>
              <p style={{ fontSize:13, color:'rgba(255,255,255,.82)', lineHeight:1.6, margin:0 }}>
                Wo es vorkommt: <strong style={{ color:'#fff' }}>{ELEMENTS[selectedEl].fun}</strong>
              </p>
              {selectedEl === 'Ca' && (
                <p style={{ fontSize:12, color:'rgba(255,255,255,.6)', marginTop:6, margin:0 }}>
                  Die Ca H+K-Linien (393/396 nm) sind die auffälligsten Linien in fast allen Sternen — Kalzium ist im Universum häufig.
                </p>
              )}
            </div>
          )}
        </>
      )}

      {/* ── Mode: HELIUM ── */}
      {mode === 'helium' && (
        <>
          <p style={{ fontFamily:'var(--font-serif)', fontSize:14, lineHeight:1.6, marginBottom:14 }}>
            1868 entdeckten Astronomen eine Linie im Sonnenlicht, die zu <strong>keinem bekannten Element auf der Erde</strong> passte.
            Das war der erste Beweis, dass dieselbe Physik überall im Universum gilt.
          </p>
          {/* Timeline */}
          <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
            {HELIUM_STORY.map((step, i) => (
              <div key={i} onClick={() => setHeliumStep(i)}
                style={{ display:'flex', gap:12, padding:'12px 0',
                  borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
                  cursor:'pointer', opacity: heliumStep >= i ? 1 : 0.45,
                  transition:'opacity .2s',
                }}>
                <div style={{ textAlign:'center', minWidth:44 }}>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:10,
                    color:'#C9A84C', letterSpacing:'.04em', display:'block' }}>{step.year}</span>
                  <div style={{ width:2, height:'100%', background: heliumStep > i ? '#C9A84C' : 'var(--border)',
                    margin:'4px auto', minHeight:20 }} />
                </div>
                <div>
                  <strong style={{ fontFamily:'var(--font-serif)', fontSize:14, display:'block', marginBottom:4 }}>
                    {step.title}
                  </strong>
                  {heliumStep >= i && (
                    <p style={{ fontSize:13, color:'var(--muted)', lineHeight:1.6, margin:0 }}>
                      {step.text}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          {heliumStep < 2 && (
            <button onClick={() => setHeliumStep(s => Math.min(s+1, 2))} style={{
              marginTop:12, padding:'8px 18px', borderRadius:7,
              border:'1.5px solid #C9A84C', background:'#C9A84C22',
              color:'var(--navy)', fontFamily:'var(--font-mono)', fontSize:11,
              cursor:'pointer', letterSpacing:'.06em',
            }}>Weiter in der Geschichte →</button>
          )}
          {heliumStep === 2 && (
            <>
              <SpectrumCanvas activeElements={['He']} showFraunhofer={false} highlight={587} />
              <p style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--muted)',
                textAlign:'center', marginTop:4, letterSpacing:'.05em' }}>
                Helium-Emissionsspektrum — 587 nm (D₃-Linie) zuerst auf der Sonne entdeckt
              </p>
            </>
          )}
        </>
      )}

      {/* ── Mode: NOXIA ── */}
      {mode === 'noxia' && (
        <>
          <p style={{ fontFamily:'var(--font-serif)', fontSize:14, lineHeight:1.6, marginBottom:12 }}>
            Der <Pop term="NOXIA-Scanner">Funktioniert wie ein Spektrometer: Licht wird auf das Gestein gestrahlt. Die zurückkommenden Wellenlängen verraten, welche Elemente enthalten sind — ohne das Gestein zu zerstören.</Pop> analysiert
            Gestein per Licht. Wähle ein Gestein und scanne:
          </p>
          <div style={{ display:'flex', gap:8, marginBottom:12 }}>
            {[['granite','🪨 Granit'],['basalt','⚫ Basalt'],['ore','🔶 Erz']].map(([id, label]) => (
              <button key={id} onClick={() => { setRock(id); setScanned(false); setGuessEl(null); }} style={{
                flex:1, padding:'8px 4px', borderRadius:7, fontSize:11,
                fontFamily:'var(--font-mono)', letterSpacing:'.04em', textAlign:'center',
                border:'1.5px solid ' + (rock===id ? '#C9A84C' : 'var(--border)'),
                background: rock===id ? '#C9A84C22' : 'var(--soft)',
                color: rock===id ? 'var(--navy)' : 'var(--muted)', cursor:'pointer',
              }}>{label}</button>
            ))}
          </div>
          {!scanned ? (
            <button onClick={() => setScanned(true)} style={{
              width:'100%', padding:'10px 0', borderRadius:8, border:'none',
              background:'var(--navy)', color:'#fff',
              fontFamily:'var(--font-mono)', fontSize:12, cursor:'pointer', letterSpacing:'.06em',
            }}>📡 Gestein scannen</button>
          ) : (
            <>
              <SpectrumCanvas activeElements={rockEls} showFraunhofer={false} />
              <p style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--muted)',
                textAlign:'center', marginTop:4, letterSpacing:'.05em' }}>
                Scan-Ergebnis — {rockEls.length} Elemente erkannt
              </p>
              {!guessEl && (
                <>
                  <p style={{ fontSize:13, lineHeight:1.55, marginTop:10 }}>
                    Welches Hauptelement enthält dieses Gestein?
                  </p>
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                    {Object.entries(ELEMENTS).map(([id, el]) => (
                      <button key={id} onClick={() => setGuessEl(id)} style={{
                        padding:'5px 12px', borderRadius:6,
                        border:'1.5px solid var(--border)', background:'var(--soft)',
                        fontFamily:'var(--font-mono)', fontSize:11, cursor:'pointer',
                        color:'var(--muted)',
                      }}>{el.label}</button>
                    ))}
                  </div>
                </>
              )}
              {guessEl && (
                <div style={{ marginTop:10, padding:'12px 14px',
                  background: guessEl===mainEl ? '#EBF7ED' : '#FDECEA',
                  borderRadius:8, border:'1.5px solid ' + (guessEl===mainEl ? '#3A7D44' : '#C0392B') }}>
                  <p style={{ fontSize:13, lineHeight:1.6, margin:0,
                    color: guessEl===mainEl ? '#2A5C32' : '#922B21' }}>
                    {guessEl===mainEl
                      ? `✓ Richtig! ${ELEMENTS[mainEl].label} ist das Hauptelement — erkennbar an den Linien bei ${ELEMENTS[mainEl].nm.slice(0,2).join(' und ')} nm.`
                      : `Nicht ganz. Das Hauptelement ist ${ELEMENTS[mainEl].label} (${mainEl}) — die Linien bei ${ELEMENTS[mainEl].nm[0]} nm sind das Erkennungszeichen.`}
                  </p>
                  <button onClick={() => { setGuessEl(null); setScanned(false); }}
                    style={{ marginTop:8, background:'none', border:'none',
                      fontFamily:'var(--font-mono)', fontSize:10, cursor:'pointer',
                      color: guessEl===mainEl ? '#2A5C32' : '#922B21' }}>
                    Neues Gestein versuchen →
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
