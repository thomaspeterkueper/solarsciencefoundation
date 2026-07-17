'use client';
/**
 * MaterialsDashboardExperiment — EXP:WIRKUNGSGRAD (materials context)
 * Fraunhofer 2026 study: demand 2045 vs production 2023 for 12 metals
 */
import { useState } from 'react';
import styles from './RayleighExperiment.module.css';

type Scenario = 'nachhaltig' | 'mittel' | 'wachstum';

const METALS = [
  { symbol: 'Ir',  name: 'Iridium',           factors: { nachhaltig: 12.5, mittel: 7.9,  wachstum: 1.3  }, driver: 'PEM-Elektrolyse (Wasserstoff)', color: '#DC143C' },
  { symbol: 'Li',  name: 'Lithium',            factors: { nachhaltig: 4.7,  mittel: 3.1,  wachstum: 1.8  }, driver: 'Batterien (E-Autos, Speicher)', color: '#DC143C' },
  { symbol: 'Sc',  name: 'Scandium',           factors: { nachhaltig: 2.6,  mittel: 1.8,  wachstum: 0.9  }, driver: 'Festoxid-Brennstoffzellen (SOFC)', color: '#C9A84C' },
  { symbol: 'Dy',  name: 'Dysprosium',         factors: { nachhaltig: 2.2,  mittel: 1.5,  wachstum: 1.1  }, driver: 'Permanentmagnete (Windräder, E-Autos)', color: '#C9A84C' },
  { symbol: 'Tb',  name: 'Terbium',            factors: { nachhaltig: 2.2,  mittel: 1.5,  wachstum: 1.0  }, driver: 'Permanentmagnete (Hochtemperatur)', color: '#C9A84C' },
  { symbol: 'Pt',  name: 'Platin',             factors: { nachhaltig: 1.8,  mittel: 1.4,  wachstum: 2.1  }, driver: 'Brennstoffzellen + Rechenzentren (KI)', color: '#C9A84C' },
  { symbol: 'Ru',  name: 'Ruthenium',          factors: { nachhaltig: 1.5,  mittel: 1.2,  wachstum: 2.0  }, driver: 'Datenspeicher (KI-Boom)', color: '#C9A84C' },
  { symbol: 'Graphit', name: 'Graphit',        factors: { nachhaltig: 1.6,  mittel: 1.2,  wachstum: 0.9  }, driver: 'Batterie-Anoden', color: '#7AAD7A' },
  { symbol: 'Cu',  name: 'Kupfer',             factors: { nachhaltig: 0.64, mittel: 0.48, wachstum: 0.35 }, driver: 'Leitungen, Motoren (aber Gesamtmarkt groß)', color: '#7AAD7A' },
  { symbol: 'Ti',  name: 'Titan',              factors: { nachhaltig: 0.3,  mittel: 0.2,  wachstum: 0.2  }, driver: 'Leichtbau (kein Engpass)', color: '#5B8FB9' },
] as const;

const SCENARIO_LABELS: Record<Scenario, string> = {
  nachhaltig: 'Nachhaltig (Netto-Null 2050)',
  mittel: 'Mittel (Entwicklungshemmnisse)',
  wachstum: 'Wachstum (ohne Klimaziele)',
};

export default function MaterialsDashboardExperiment() {
  const [scenario, setScenario] = useState<Scenario>('nachhaltig');
  const [selected, setSelected] = useState(0);

  const m = METALS[selected];
  const factor = m.factors[scenario];
  const maxFactor = Math.max(...METALS.map(x => x.factors[scenario]));

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Fraunhofer ISI 2026</span><strong>Rohstoffbedarf 2045 — Zukunftstechnologien</strong></div>

      {/* Scenario selector */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
        {(Object.keys(SCENARIO_LABELS) as Scenario[]).map(s => (
          <button key={s} onClick={() => setScenario(s)} style={{
            padding: '5px 12px', fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '.04em', textTransform: 'uppercase',
            border: '1.5px solid ' + (scenario === s ? 'var(--gold)' : 'var(--border)'),
            borderRadius: 4, background: scenario === s ? 'var(--gold-bg)' : 'transparent',
            color: scenario === s ? 'var(--navy)' : 'var(--muted)', cursor: 'pointer',
          }}>{s === 'nachhaltig' ? 'Nachhaltig' : s === 'mittel' ? 'Mittel' : 'Wachstum'}</button>
        ))}
      </div>

      {/* Bars */}
      <div style={{ background: 'var(--navy)', borderRadius: 8, padding: '12px 14px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,.4)', marginBottom: 8 }}>
          Bedarf 2045 / Weltproduktion 2023 — {SCENARIO_LABELS[scenario]}
        </div>
        {METALS.map((metal, i) => {
          const f = metal.factors[scenario];
          const w = Math.min(100, (f / maxFactor) * 100);
          const isSelected = i === selected;
          const barColor = f > 2 ? '#DC143C' : f > 1 ? '#C9A84C' : '#7AAD7A';
          return (
            <div key={metal.symbol} onClick={() => setSelected(i)} style={{ marginBottom: 5, cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: isSelected ? '#C9A84C' : 'rgba(255,255,255,.55)', fontWeight: isSelected ? 700 : 400 }}>
                  {metal.symbol} {metal.name}
                </span>
                <strong style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: barColor }}>×{f.toFixed(1)}</strong>
              </div>
              <div style={{ height: 8, background: 'rgba(255,255,255,.08)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: w + '%', background: isSelected ? '#C9A84C' : barColor + '88', borderRadius: 4, transition: 'width .4s' }} />
              </div>
            </div>
          );
        })}
        <div style={{ marginTop: 8, display: 'flex', gap: 12 }}>
          {[['#DC143C', '> 2× kritisch'], ['#C9A84C', '1-2× aufmerksam'], ['#7AAD7A', '< 1× unkritisch']].map(([c, l]) => (
            <span key={l} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: c as string }}>● {l}</span>
          ))}
        </div>
      </div>

      {/* Selected detail */}
      <div style={{ marginTop: 10, padding: '10px 14px', background: 'var(--surface)', borderRadius: 6, border: '1px solid var(--border)', fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>
        <strong style={{ color: 'var(--ink)' }}>{m.symbol} — {m.name}:</strong> Bedarf ×{factor.toFixed(1)} der heutigen Förderung.<br/>
        Haupttreiber: {m.driver}.
      </div>
    </div>
  );
}
