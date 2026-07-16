'use client';
/**
 * WheatstoneExperiment — EXP:BRUECKE
 * Quarter/half/full bridge — strain slider → bridge voltage Uab live
 * Shows temperature compensation effect
 */
import { useState } from 'react';
import styles from './RayleighExperiment.module.css';

type BridgeType = 'quarter' | 'half' | 'full';

export default function WheatstoneExperiment() {
  const [bridge, setBridge] = useState<BridgeType>('quarter');
  const [eps, setEps] = useState(1.0);    // mstrain (10^-3)
  const [dT, setDT] = useState(0);         // temperature drift K
  const [Uv, setUv] = useState(5);          // supply voltage V
  const k = 2.05; // typical gauge factor

  // Bridge output
  const eps_val = eps * 1e-3;
  const bridgeFactor = bridge === 'quarter' ? 1 : bridge === 'half' ? 2 : 4;
  const Uab_mech = (k * eps_val * Uv / 4) * bridgeFactor * 1000; // mV

  // Temperature drift (only affects quarter bridge)
  const alpha_R = 100e-6; // TCR of typical strain gauge foil [1/K]
  const dR_temp = alpha_R * dT;
  const Uab_temp = bridge === 'quarter' ? (dR_temp * Uv / 4) * 1000 : 0; // mV, cancelled in half/full

  const Uab_total = Uab_mech + Uab_temp;
  const bridgeLabels: Record<BridgeType, string> = {
    quarter: 'Viertelbrücke (1 DMS)',
    half: 'Halbbrücke (2 DMS)',
    full: 'Vollbrücke (4 DMS)',
  };

  const barMax = Math.max(Math.abs(Uab_mech), Math.abs(Uab_temp), 0.1);

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}><span className={styles.label}>Experiment</span><strong>Wheatstone-Brücke — U_ab live</strong></div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
        {(['quarter', 'half', 'full'] as BridgeType[]).map(b => (
          <button key={b} onClick={() => setBridge(b)} style={{
            padding: '4px 10px', fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '.05em', textTransform: 'uppercase',
            border: `1.5px solid ${bridge === b ? 'var(--gold)' : 'var(--border)'}`,
            borderRadius: 4, background: bridge === b ? 'var(--gold-bg)' : 'var(--soft)',
            color: bridge === b ? 'var(--navy)' : 'var(--muted)', cursor: 'pointer',
          }}>{b === 'quarter' ? 'Viertel' : b === 'half' ? 'Halb' : 'Voll'}</button>
        ))}
      </div>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginBottom: 12 }}>{bridgeLabels[bridge]}</p>
      <label className={styles.sliderLabel} htmlFor="ws-eps"><span>Dehnung ε</span><strong>{eps.toFixed(1)} mε</strong></label>
      <input id="ws-eps" type="range" min="0" max="5" step="0.1" value={eps} onChange={e => setEps(+e.target.value)} />
      <label className={styles.sliderLabel} htmlFor="ws-uv" style={{ marginTop: 8 }}><span>Speisespannung U_v</span><strong>{Uv} V</strong></label>
      <input id="ws-uv" type="range" min="1" max="12" value={Uv} onChange={e => setUv(+e.target.value)} />
      <label className={styles.sliderLabel} htmlFor="ws-dt" style={{ marginTop: 8 }}><span>Temperaturdrift ΔT</span><strong>{dT > 0 ? '+' : ''}{dT} K</strong></label>
      <input id="ws-dt" type="range" min="-30" max="30" value={dT} onChange={e => setDT(+e.target.value)} />

      {/* Visual bridge output */}
      <div style={{ background: 'var(--navy)', borderRadius: 8, padding: '14px 16px', marginTop: 14 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#E8D9A8', marginBottom: 10 }}>
          U_ab = k/4 · ε · U_v · n_DMS
        </div>
        {[
          { label: 'Mechanisch', val: Uab_mech, color: '#C9A84C' },
          { label: 'Temperaturdrift', val: Uab_temp, color: bridge === 'quarter' ? '#DC143C' : '#7AAD7A' },
        ].map(({ label, val, color }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,.55)', width: 100, flexShrink: 0 }}>{label}</span>
            <div style={{ flex: 1, height: 8, background: 'rgba(255,255,255,.1)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: 4, background: color, width: `${Math.min(100, Math.abs(val) / barMax * 100)}%`, transition: 'width .25s' }} />
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,.8)', minWidth: 60, textAlign: 'right' }}>
              {val >= 0 ? '+' : ''}{val.toFixed(3)} mV
            </span>
          </div>
        ))}
        <div style={{ borderTop: '1px solid rgba(255,255,255,.12)', paddingTop: 10, marginTop: 4, fontFamily: 'var(--font-mono)', fontSize: 18, color: '#fff' }}>
          U_ab = <strong style={{ color: '#C9A84C' }}>{Uab_total >= 0 ? '+' : ''}{Uab_total.toFixed(3)} mV</strong>
        </div>
        {bridge !== 'quarter' && dT !== 0 && (
          <p style={{ marginTop: 8, fontSize: 11, color: '#7AAD7A' }}>
            ✓ Temperaturdrift kompensiert — {bridge === 'half' ? 'Halbbrücke' : 'Vollbrücke'} unterdrückt Drift automatisch.
          </p>
        )}
        {bridge === 'quarter' && dT !== 0 && (
          <p style={{ marginTop: 8, fontSize: 11, color: '#DC143C' }}>
            ⚠ Viertelbrücke driftet bei Temperaturänderung — Kompensations-DMS empfohlen.
          </p>
        )}
      </div>
    </div>
  );
}
