'use client';
/**
 * MillerUreyExperiment — EXP:VERBRENNUNG-CHEMIE (astrobiologie context)
 * Miller-Urey simulation: gas mix + lightning → amino acids
 */
import { useState } from 'react';
import styles from './RayleighExperiment.module.css';

const GASES = [
  { id: 'ch4', label: 'CH₄ Methan',   c: true,  def: true },
  { id: 'nh3', label: 'NH₃ Ammoniak', c: true,  def: true },
  { id: 'h2o', label: 'H₂O Wasser',   c: true,  def: true },
  { id: 'h2',  label: 'H₂ Wasserstoff', c: true, def: true },
  { id: 'o2',  label: 'O₂ Sauerstoff', c: false, def: false },
  { id: 'n2',  label: 'N₂ Stickstoff', c: true,  def: false },
] as const;
type GasId = (typeof GASES)[number]['id'];

const PRODUCTS: { name: string; need: GasId[]; exclude: GasId[]; color: string }[] = [
  { name: 'Glycin (einfachste Aminosäure)',   need: ['ch4','nh3','h2o'], exclude: ['o2'], color: '#7AAD7A' },
  { name: 'Alanin',                            need: ['ch4','nh3','h2o','h2'], exclude: ['o2'], color: '#7AAD7A' },
  { name: 'Glutaminsäure',                     need: ['ch4','nh3','h2o','n2'], exclude: ['o2'], color: '#C9A84C' },
  { name: 'Harnstoff',                         need: ['nh3','h2o'], exclude: [], color: '#5B8FB9' },
  { name: 'Cyanwasserstoff (HCN)',             need: ['ch4','nh3'], exclude: ['o2'], color: '#888' },
];

export default function MillerUreyExperiment() {
  const [activeGases, setActiveGases] = useState<Set<GasId>>(new Set(['ch4','nh3','h2o','h2']));
  const [lightning, setLightning] = useState(50);
  const [days, setDays] = useState(7);

  const toggle = (id: GasId) => {
    setActiveGases(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const hasO2 = activeGases.has('o2');
  const products = PRODUCTS.filter(p =>
    p.need.every(g => activeGases.has(g)) &&
    p.exclude.every(g => !activeGases.has(g))
  );
  const yield_pct = hasO2 ? 0 : Math.min(100, products.length * 18 * (lightning / 100) * (days / 7));

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Miller-Urey — Ursuppe nachbauen</strong></div>

      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginBottom: 10 }}>
        Gase im Kolben wählen — dann Blitz hinzufügen:
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 12 }}>
        {GASES.map(g => (
          <button key={g.id} onClick={() => toggle(g.id)} style={{
            padding: '6px 10px', fontFamily: 'var(--font-mono)', fontSize: 10,
            textAlign: 'left', letterSpacing: '.03em',
            border: '1.5px solid ' + (activeGases.has(g.id) ? (g.c ? '#7AAD7A' : '#DC143C') : 'var(--border)'),
            borderRadius: 6, background: activeGases.has(g.id) ? (g.c ? '#7AAD7A22' : '#DC143C22') : 'var(--soft)',
            color: activeGases.has(g.id) ? 'var(--navy)' : 'var(--muted)', cursor: 'pointer',
          }}>
            {g.label}
            {!g.c && <span style={{ color: '#DC143C', marginLeft: 4 }}>⚠ oxidierend</span>}
          </button>
        ))}
      </div>

      <label className={styles.sliderLabel} htmlFor="mu-l"><span>Blitz-Energie</span><strong>{lightning}%</strong></label>
      <input id="mu-l" type="range" min="0" max="100" value={lightning} onChange={e => setLightning(+e.target.value)} />

      <label className={styles.sliderLabel} htmlFor="mu-d" style={{ marginTop: 8 }}><span>Versuchsdauer</span><strong>{days} Tage</strong></label>
      <input id="mu-d" type="range" min="1" max="14" value={days} onChange={e => setDays(+e.target.value)} />

      {/* Results */}
      <div style={{ marginTop: 14, background: 'var(--navy)', borderRadius: 8, padding: '14px 16px' }}>
        {hasO2 ? (
          <div style={{ color: '#DC143C', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
            ✗ Sauerstoff oxidiert alle organischen Moleküle sofort — keine Aminosäuren möglich.<br/>
            <span style={{ color: 'rgba(255,255,255,.4)', fontSize: 10 }}>Deshalb hatte die frühe Erde keinen freien Sauerstoff.</span>
          </div>
        ) : products.length === 0 ? (
          <div style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>
            Zu wenige Ausgangsstoffe — mindestens CH₄, NH₃ und H₂O nötig.
          </div>
        ) : (
          <>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#E8D9A8', marginBottom: 8 }}>
              Entstandene Moleküle nach {days} Tagen:
            </div>
            {products.map(p => (
              <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,.75)' }}>{p.name}</span>
              </div>
            ))}
            <div style={{ marginTop: 10, borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,.5)' }}>Ausbeute</span>
                <strong style={{ fontFamily: 'var(--font-mono)', color: '#7AAD7A' }}>{yield_pct.toFixed(0)}%</strong>
              </div>
              <div style={{ height: 8, background: 'rgba(255,255,255,.1)', borderRadius: 4, marginTop: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: yield_pct + '%', background: '#7AAD7A', borderRadius: 4, transition: 'width .4s' }} />
              </div>
            </div>
          </>
        )}
      </div>

      <div className={styles.stats} style={{ marginTop: 10 }}>
        <div><span>Moleküle im Kolben</span><strong>{activeGases.size}</strong></div>
        <div><span>Aminosäuren</span><strong style={{ color: products.length > 0 && !hasO2 ? 'var(--ok-t)' : 'var(--muted)' }}>
          {hasO2 ? 'keine (O₂!)' : products.filter(p => p.color === '#7AAD7A').length + ' Typen'}
        </strong></div>
      </div>
    </div>
  );
}
