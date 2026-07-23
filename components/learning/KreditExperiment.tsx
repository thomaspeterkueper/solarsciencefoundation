'use client';
/**
 * KreditExperiment — EXP:KREDIT-RECHNER
 * Interactive credit/interest calculator
 *
 * Finance formulas:
 * - Simple interest: K_n = K_0 * (1 + n*r)
 * - Compound interest: K_n = K_0 * (1 + r)^n
 * - Rule of 70: doubling time ≈ 70 / (r * 100)
 * - Annuity: R = K_0 * r / (1 - (1+r)^-n)
 *
 * NOXIA context: Mine costs 1500 Cr, 10%/Tick interest,
 * Mine yields 250 Cr/Tick. Break-even after 9 Ticks.
 */
import { useState } from 'react';
import styles from './RayleighExperiment.module.css';

type Mode = 'einfach' | 'zinseszins' | 'noxia';

export default function KreditExperiment() {
  const [mode, setMode] = useState<Mode>('einfach');

  // Einfacher Kredit
  const [kapital, setKapital] = useState(500);
  const [zinsSatz, setZinsSatz] = useState(10);
  const [laufzeit, setLaufzeit] = useState(5);

  // NOXIA
  const [mineKosten, setMineKosten] = useState(1500);
  const [noxZins, setNoxZins] = useState(10);
  const [ertrag, setErtrag] = useState(250);

  const zins = zinsSatz / 100;
  const einfachEnd = kapital * (1 + laufzeit * zins);
  const zinseszinsEnd = kapital * Math.pow(1 + zins, laufzeit);
  const gesamtZins_e = einfachEnd - kapital;
  const gesamtZins_z = zinseszinsEnd - kapital;
  const verdopplung = zins > 0 ? Math.round(70 / zinsSatz * 10) / 10 : Infinity;

  // NOXIA break-even
  const noxZinsFaktor = noxZins / 100;
  let noxSchuld = mineKosten, noxTick = 0;
  const noxData: { tick: number; schuld: number; einnahmen: number }[] = [];
  for (let t = 0; t <= 20; t++) {
    const einnahmen = t * ertrag;
    noxData.push({ tick: t, schuld: Math.round(noxSchuld), einnahmen: Math.round(einnahmen) });
    if (noxSchuld <= 0 && noxTick === 0) noxTick = t;
    noxSchuld = noxSchuld * (1 + noxZinsFaktor) - ertrag;
  }
  const breakEven = noxData.findIndex(d => d.einnahmen >= d.schuld);

  const MODES: { id: Mode; emoji: string; label: string }[] = [
    { id: 'einfach',     emoji: '💶', label: 'Einfach' },
    { id: 'zinseszins',  emoji: '📈', label: 'Zinseszins' },
    { id: 'noxia',       emoji: '⛏️', label: 'NOXIA' },
  ];

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}>
        <span className={styles.label}>Experiment</span>
        <strong>Kredit & Zinsen — der Preis der Zeit</strong>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 14 }}>
        {MODES.map(m => (
          <button key={m.id} onClick={() => setMode(m.id)} style={{
            padding: '7px 4px', borderRadius: 7, textAlign: 'center',
            border: '1.5px solid ' + (mode === m.id ? '#C9A84C' : 'var(--border)'),
            background: mode === m.id ? '#C9A84C22' : 'var(--soft)',
            color: mode === m.id ? 'var(--navy)' : 'var(--muted)',
            fontFamily: 'var(--font-mono)', fontSize: 10, cursor: 'pointer',
          }}>
            <span style={{ display: 'block', fontSize: 16, marginBottom: 2 }}>{m.emoji}</span>
            {m.label}
          </button>
        ))}
      </div>

      {/* ── EINFACH ── */}
      {mode === 'einfach' && (
        <>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
            Einfacher Zins: Zinsen werden immer nur auf das ursprüngliche Kapital berechnet.
          </p>
          {[
            { label: 'Kredit', val: kapital, set: setKapital, min: 100, max: 10000, step: 100, unit: ' Cr' },
            { label: 'Zinssatz / Periode', val: zinsSatz, set: setZinsSatz, min: 1, max: 50, step: 1, unit: '%' },
            { label: 'Laufzeit (Perioden)', val: laufzeit, set: setLaufzeit, min: 1, max: 20, step: 1, unit: '' },
          ].map(({ label, val, set, min, max, step, unit }) => (
            <div key={label} style={{ marginBottom: 10 }}>
              <label className={styles.sliderLabel}>
                <span>{label}</span>
                <strong>{val}{unit}</strong>
              </label>
              <input type="range" min={min} max={max} step={step} value={val}
                onChange={e => set(+e.target.value)} />
            </div>
          ))}
          <div className={styles.stats} style={{ marginTop: 12 }}>
            <div><span>Rückzahlung</span>
              <strong style={{ color: '#C9A84C' }}>{Math.round(einfachEnd)} Cr</strong></div>
            <div><span>Gesamtzinsen</span>
              <strong style={{ color: '#DC143C' }}>{Math.round(gesamtZins_e)} Cr</strong></div>
            <div><span>Verdopplung bei Regel-70</span>
              <strong>{verdopplung} Perioden</strong></div>
            <div><span>Formel</span>
              <strong style={{ fontSize: 10 }}>K₀ × (1 + n × r)</strong></div>
          </div>
        </>
      )}

      {/* ── ZINSESZINS ── */}
      {mode === 'zinseszins' && (
        <>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
            Zinseszins: Zinsen werden auf Kapital <em>plus</em> bereits aufgelaufene Zinsen berechnet.
            Das Wachstum ist exponentiell — klein am Anfang, explosiv am Ende.
          </p>
          {[
            { label: 'Kredit', val: kapital, set: setKapital, min: 100, max: 10000, step: 100, unit: ' Cr' },
            { label: 'Zinssatz / Periode', val: zinsSatz, set: setZinsSatz, min: 1, max: 50, step: 1, unit: '%' },
            { label: 'Laufzeit (Perioden)', val: laufzeit, set: setLaufzeit, min: 1, max: 20, step: 1, unit: '' },
          ].map(({ label, val, set, min, max, step, unit }) => (
            <div key={label} style={{ marginBottom: 10 }}>
              <label className={styles.sliderLabel}>
                <span>{label}</span>
                <strong>{val}{unit}</strong>
              </label>
              <input type="range" min={min} max={max} step={step} value={val}
                onChange={e => set(+e.target.value)} />
            </div>
          ))}
          {/* Vergleich einfach vs. Zinseszins */}
          <div style={{ display: 'grid', gap: 8, marginTop: 12 }}>
            {[
              { label: 'Einfacher Zins', val: Math.round(einfachEnd), extra: '+' + Math.round(gesamtZins_e) + ' Cr Zinsen', color: '#C9A84C' },
              { label: 'Zinseszins', val: Math.round(zinseszinsEnd), extra: '+' + Math.round(gesamtZins_z) + ' Cr Zinsen', color: '#DC143C' },
            ].map(({ label, val, extra, color }) => (
              <div key={label} style={{ padding: '10px 14px', borderRadius: 8,
                background: 'var(--navy)', border: '1px solid ' + color + '44' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,.6)' }}>{label}</span>
                  <strong style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color }}>{val} Cr</strong>
                </div>
                <p style={{ fontSize: 11, color, margin: '4px 0 0' }}>{extra}</p>
              </div>
            ))}
            {zinseszinsEnd > einfachEnd && (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#DC143C',
                textAlign: 'center', marginTop: 4 }}>
                Zinseszins kostet {Math.round(zinseszinsEnd - einfachEnd)} Cr mehr als einfacher Zins
              </p>
            )}
          </div>
          <div style={{ marginTop: 10, padding: '8px 14px', background: 'var(--soft)',
            borderRadius: 8, border: '1px solid var(--border)' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', margin: 0 }}>
              Regel 70: Bei {zinsSatz}% verdoppelt sich die Schuld in ≈ {verdopplung} Perioden
            </p>
          </div>
        </>
      )}

      {/* ── NOXIA ── */}
      {mode === 'noxia' && (
        <>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
            Du nimmst einen Kredit für eine Mine. Wann hat sich die Investition amortisiert?
          </p>
          {[
            { label: 'Mine-Kosten', val: mineKosten, set: setMineKosten, min: 500, max: 5000, step: 100, unit: ' Cr' },
            { label: 'Zinssatz / Tick', val: noxZins, set: setNoxZins, min: 1, max: 30, step: 1, unit: '%' },
            { label: 'Ertrag / Tick', val: ertrag, set: setErtrag, min: 50, max: 1000, step: 50, unit: ' Cr' },
          ].map(({ label, val, set, min, max, step, unit }) => (
            <div key={label} style={{ marginBottom: 10 }}>
              <label className={styles.sliderLabel}>
                <span>{label}</span>
                <strong>{val}{unit}</strong>
              </label>
              <input type="range" min={min} max={max} step={step} value={val}
                onChange={e => set(+e.target.value)} />
            </div>
          ))}
          {/* Timeline */}
          <div style={{ marginTop: 12, overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse',
              fontFamily: 'var(--font-mono)', fontSize: 11 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '4px 8px', color: 'var(--muted)', textAlign: 'left' }}>Tick</th>
                  <th style={{ padding: '4px 8px', color: 'var(--muted)', textAlign: 'right' }}>Schulden</th>
                  <th style={{ padding: '4px 8px', color: 'var(--muted)', textAlign: 'right' }}>Einnahmen</th>
                  <th style={{ padding: '4px 8px', color: 'var(--muted)', textAlign: 'right' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {noxData.slice(0, 12).map(d => {
                  const free = d.einnahmen >= d.schuld;
                  return (
                    <tr key={d.tick} style={{
                      background: d.tick === breakEven ? '#7AAD7A22' : 'transparent',
                      borderBottom: '1px solid var(--border)',
                    }}>
                      <td style={{ padding: '4px 8px', color: 'var(--muted)' }}>{d.tick}</td>
                      <td style={{ padding: '4px 8px', textAlign: 'right',
                        color: free ? '#7AAD7A' : '#DC143C' }}>{d.schuld} Cr</td>
                      <td style={{ padding: '4px 8px', textAlign: 'right',
                        color: '#7AAD7A' }}>{d.einnahmen} Cr</td>
                      <td style={{ padding: '4px 8px', textAlign: 'right' }}>
                        {d.tick === breakEven ? '✓ Break-Even' : free ? 'Gewinn' : '⏳'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 10, padding: '10px 14px', background: 'var(--navy)',
            borderRadius: 8, border: '1px solid ' + (breakEven > 0 ? '#7AAD7A' : '#DC143C') + '44' }}>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.85)', margin: 0, lineHeight: 1.6 }}>
              {breakEven > 0 && breakEven <= 15
                ? `Break-Even nach Tick ${breakEven} — ab dann erwirtschaftet die Mine Gewinn.`
                : breakEven <= 0
                ? 'Mine ist sofort profitabel (sehr niedriger Zinssatz).'
                : '⚠ Break-Even erst nach Tick 15 — Kredit sehr riskant bei diesem Zinssatz.'}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
