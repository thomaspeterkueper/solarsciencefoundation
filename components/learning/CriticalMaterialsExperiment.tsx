'use client';
/**
 * CriticalMaterialsExperiment — EXP:OXIDATION
 * Periodic table spotlight on platinum group + critical materials
 * Production comparison: Ir 6.8t vs Au 3000t/yr
 */
import { useState } from 'react';
import styles from './RayleighExperiment.module.css';

const METALS = [
  { symbol: 'Ir', name: 'Iridium',   production_t: 6.8,    price_2023: 4682, price_2013: 826,  group: 'Platingruppe', use: 'PEM-Elektrolyse (Anode)', criticality: 5 },
  { symbol: 'Pt', name: 'Platin',    production_t: 180,    price_2023: 1000, price_2013: 1500, group: 'Platingruppe', use: 'Brennstoffzellen, Katalysator', criticality: 3 },
  { symbol: 'Rh', name: 'Rhodium',   production_t: 30,     price_2023: 4700, price_2013: 1200, group: 'Platingruppe', use: 'Autoabgaskatalysator', criticality: 4 },
  { symbol: 'Pd', name: 'Palladium', production_t: 210,    price_2023: 1400, price_2013: 700,  group: 'Platingruppe', use: 'Autoabgaskatalysator', criticality: 3 },
  { symbol: 'Li', name: 'Lithium',   production_t: 180000, price_2023: 40,   price_2013: 6,    group: 'Leichtmetall',  use: 'Batterien, E-Autos', criticality: 4 },
  { symbol: 'Nd', name: 'Neodym',    production_t: 60000,  price_2023: 60,   price_2013: 80,   group: 'Seltene Erden', use: 'Permanentmagnete, Windräder', criticality: 4 },
  { symbol: 'Cu', name: 'Kupfer',    production_t: 22e6,   price_2023: 8,    price_2013: 7,    group: 'Basismetall',   use: 'Leitungen, Motoren', criticality: 2 },
  { symbol: 'Au', name: 'Gold',      production_t: 3300,   price_2023: 1900, price_2013: 1400, group: 'Edelmetall',    use: 'Elektronik, Schmuck', criticality: 1 },
] as const;
type MetalIdx = number;

export default function CriticalMaterialsExperiment() {
  const [selected, setSelected] = useState<MetalIdx>(0);
  const [view, setView] = useState<'production'|'price'>('production');

  const m = METALS[selected];
  const maxProd = Math.max(...METALS.map(x => x.production_t));
  const maxPrice = Math.max(...METALS.map(x => x.price_2023));

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Kritische Rohstoffe — Produktion und Preis</strong></div>

      {/* Metal selector */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
        {METALS.map((metal, i) => (
          <button key={metal.symbol} onClick={() => setSelected(i)} style={{
            padding: '5px 10px', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
            border: '1.5px solid ' + (selected === i ? '#C9A84C' : 'var(--border)'),
            borderRadius: 4, background: selected === i ? '#C9A84C22' : 'var(--soft)',
            color: selected === i ? 'var(--navy)' : 'var(--muted)', cursor: 'pointer',
          }}>{metal.symbol}</button>
        ))}
      </div>

      {/* View toggle */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
        {(['production', 'price'] as const).map(v => (
          <button key={v} onClick={() => setView(v)} style={{
            padding: '4px 12px', fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '.06em', textTransform: 'uppercase',
            border: '1.5px solid ' + (view === v ? 'var(--ink)' : 'var(--border)'),
            borderRadius: 4, background: view === v ? 'var(--ink)' : 'transparent',
            color: view === v ? '#fff' : 'var(--muted)', cursor: 'pointer',
          }}>{v === 'production' ? 'Jahresproduktion' : 'Preisentwicklung'}</button>
        ))}
      </div>

      {/* Bars */}
      <div style={{ background: 'var(--navy)', borderRadius: 8, padding: '12px 14px' }}>
        {METALS.map((metal, i) => {
          const val = view === 'production' ? metal.production_t : metal.price_2023;
          const max = view === 'production' ? maxProd : maxPrice;
          const w = Math.max(0.5, Math.log10(val + 1) / Math.log10(max + 1) * 100);
          const isSelected = i === selected;
          const fmt = (n: number) => n >= 1e6 ? (n/1e6).toFixed(1) + ' Mio. t' : n >= 1000 ? (n/1000).toFixed(0) + ' kt' : n.toFixed(1) + (view === 'production' ? ' t' : ' $/oz');
          return (
            <div key={metal.symbol} onClick={() => setSelected(i)} style={{ marginBottom: 6, cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: isSelected ? '#C9A84C' : 'rgba(255,255,255,.5)', fontWeight: isSelected ? 700 : 400 }}>
                  {metal.symbol} — {metal.name}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: isSelected ? '#C9A84C' : 'rgba(255,255,255,.4)' }}>{fmt(val)}</span>
              </div>
              <div style={{ height: 8, background: 'rgba(255,255,255,.08)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: w + '%', background: isSelected ? '#C9A84C' : 'rgba(255,255,255,.2)', borderRadius: 4 }} />
              </div>
            </div>
          );
        })}
        <p style={{ marginTop: 8, fontSize: 10, color: 'rgba(255,255,255,.3)', fontFamily: 'var(--font-mono)' }}>Logarithmische Skala — Kupfer: 22 Millionen Tonnen/Jahr</p>
      </div>

      {/* Selected metal details */}
      <div style={{ marginTop: 10, padding: '12px 14px', background: 'var(--surface)', borderRadius: 6, border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', marginBottom: 8 }}>
          <strong style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: 'var(--gold)' }}>{m.symbol}</strong>
          <span style={{ fontSize: 14, color: 'var(--ink)' }}>{m.name}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)' }}>{m.group}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: 12, color: 'var(--text-2)' }}>
          <div>Produktion: <strong>{m.production_t >= 1e6 ? (m.production_t/1e6).toFixed(1) + ' Mio. t' : m.production_t + ' t'}/Jahr</strong></div>
          <div>Preis 2023: <strong>{m.price_2023.toLocaleString('de')} $/oz</strong></div>
          <div>Preis 2013: <strong>{m.price_2013.toLocaleString('de')} $/oz</strong></div>
          <div>Faktor: <strong style={{ color: m.price_2023 > m.price_2013 * 1.5 ? '#DC143C' : 'var(--ok-t)' }}>×{(m.price_2023/m.price_2013).toFixed(1)}</strong></div>
          <div style={{ gridColumn: 'span 2' }}>Verwendung: <strong>{m.use}</strong></div>
        </div>
        <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{ width: 18, height: 8, borderRadius: 2, background: i < m.criticality ? '#DC143C' : 'var(--surface2)' }} />
          ))}
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', marginLeft: 4 }}>Kritikalität</span>
        </div>
      </div>
    </div>
  );
}
