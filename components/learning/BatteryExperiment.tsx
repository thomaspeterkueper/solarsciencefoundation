'use client';
/**
 * BatteryExperiment — EXP:BATTERIE-LADEN-ENTLADEN
 * Realistic Li-Ion thermal model:
 *   Q_total = Q_ohmic + Q_entropy
 *   Q_ohmic = I² · R  (always heats)
 *   Q_entropy = T · dS/dq · I  (heats when charging, cools when discharging)
 *
 * Realistic values for 18650-class cell (2.5 Ah, R_int ~15mΩ):
 *   1C charge  → ~32°C  (feel: slightly warm)
 *   2C charge  → ~42°C  (feel: warm)
 *   0.5C disch → ~23°C  (feel: slightly cool — the surprising effect)
 *   2C disch   → ~31°C  (ohmic wins → still warm)
 */
import { useState, useCallback } from 'react';
import styles from './RayleighExperiment.module.css';

// ── Physics model ──────────────────────────────────────────────────────────
const R_INT = 0.015;   // Ω — realistic 18650 internal resistance
const CAPACITY = 2.5;  // Ah
const T_AMBIENT = 25;  // °C

// dS/dq factor (V) — entropy coefficient; positive = exothermic when charging
// For LiCoO2: typically +0.03 to +0.06 V/K at mid-SOC
const ENTROPY_COEFF = 0.04; // V (simplified, mid-SOC)

function calcTemperature(cRate: number, isCharging: boolean, soc: number): {
  temp: number; ohmic: number; entropy: number; total: number;
} {
  const I = cRate * CAPACITY; // A
  const Q_ohmic = I * I * R_INT; // W — always positive (heats)
  // Entropy: positive when charging (exothermic), negative when discharging (endothermic)
  const Q_entropy = T_AMBIENT * ENTROPY_COEFF * I * (isCharging ? 1 : -1) * 0.4;
  const Q_total = Q_ohmic + Q_entropy;

  // Simple thermal model: ΔT ≈ Q_total * thermal_resistance
  // R_th ≈ 4 K/W for small cell with natural convection
  const R_THERMAL = 4.0;
  const deltaT = Q_total * R_THERMAL;
  const temp = Math.round((T_AMBIENT + deltaT) * 10) / 10;
  return { temp, ohmic: Math.round(Q_ohmic * 100) / 100, entropy: Math.round(Q_entropy * 100) / 100, total: Math.round(Q_total * 100) / 100 };
}

// ── Terminology map (click-to-explain) ────────────────────────────────────
const TERMS: Record<string, { simple: string; detail: string }> = {
  'C-Rate': {
    simple: 'Ladegeschwindigkeit',
    detail: '1C bedeutet: vollständig in 1 Stunde geladen. 2C in 30 Min. 0,5C in 2 Stunden.',
  },
  'Innenwiderstand': {
    simple: 'Reibung im Inneren',
    detail: 'Wie Wasser durch ein enges Rohr — die Elektronen stoßen auf Widerstand. Dabei entsteht Wärme.',
  },
  'Entropie': {
    simple: 'Ordnung der Atome',
    detail: 'Beim Entladen ordnen sich Ionen um — das verbraucht Energie aus der Umgebung. Die Zelle kühlt.',
  },
  'SOC': {
    simple: 'Füllstand (wie ein Tank)',
    detail: 'SOC = State of Charge. 100% = voll. 0% = leer. Aber "leer" heißt: Spannung zu niedrig, nicht Energie = 0.',
  },
};

function TermPopup({ term }: { term: string }) {
  const [open, setOpen] = useState(false);
  const info = TERMS[term];
  if (!info) return <span>{term}</span>;
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: 'none', border: 'none', padding: 0,
          borderBottom: '1.5px dashed var(--gold, #F4A300)',
          color: 'inherit', cursor: 'pointer', font: 'inherit',
          letterSpacing: 'inherit',
        }}
      >
        {info.simple}
      </button>
      {open && (
        <div style={{
          position: 'absolute', bottom: '120%', left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--navy)', color: '#fff',
          padding: '10px 14px', borderRadius: 8, zIndex: 10,
          width: 240, fontSize: 13, lineHeight: 1.55,
          boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
        }}>
          <strong style={{ fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '.08em', textTransform: 'uppercase',
            color: 'var(--gold)', display: 'block', marginBottom: 5 }}>
            {term}
          </strong>
          {info.detail}
          <button onClick={() => setOpen(false)} style={{
            display: 'block', marginTop: 8, background: 'none',
            border: 'none', color: 'rgba(255,255,255,.5)',
            cursor: 'pointer', fontSize: 11, fontFamily: 'var(--font-mono)',
          }}>schließen ×</button>
        </div>
      )}
    </span>
  );
}

// ── Thermometer visual ─────────────────────────────────────────────────────
function Thermometer({ temp }: { temp: number }) {
  const pct = Math.max(0, Math.min(100, ((temp - 18) / (50 - 18)) * 100));
  const color = temp < 26 ? '#5B8FB9' : temp < 35 ? '#7AAD7A' : temp < 42 ? '#C9A84C' : '#DC143C';
  const feel = temp < 26 ? '🧊 leicht kühl' : temp < 35 ? '✋ kaum spürbar' : temp < 42 ? '🤚 warm' : '🔥 heiß — aufpassen!';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{ width: 28, height: 120, background: 'var(--border)',
        borderRadius: 14, overflow: 'hidden', position: 'relative' }}>
        <div style={{
          position: 'absolute', bottom: 0, width: '100%',
          height: pct + '%', background: color,
          borderRadius: 14, transition: 'height .8s, background .8s',
        }} />
      </div>
      <strong style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color }}>{temp}°C</strong>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)',
        textAlign: 'center', letterSpacing: '.04em' }}>{feel}</span>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function BatteryExperiment() {
  const [cRate, setCRate] = useState(1.0);
  const [isCharging, setIsCharging] = useState(true);
  const [soc, setSoc] = useState(50);

  const { temp, ohmic, entropy, total } = calcTemperature(cRate, isCharging, soc);

  const speedLabel = cRate <= 0.5 ? 'langsam' : cRate <= 1 ? 'normal' : cRate <= 1.5 ? 'schnell' : 'sehr schnell';

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}>
        <span className={styles.label}>Experiment</span>
        <strong>Batterie — warm beim Laden, kühl beim Entladen?</strong>
      </div>

      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {[true, false].map(charging => (
          <button key={String(charging)} onClick={() => setIsCharging(charging)} style={{
            flex: 1, padding: '10px 0', borderRadius: 8,
            border: '2px solid ' + (isCharging === charging
              ? (charging ? '#7AAD7A' : '#5B8FB9') : 'var(--border)'),
            background: isCharging === charging
              ? (charging ? '#7AAD7A22' : '#5B8FB922') : 'var(--soft)',
            color: isCharging === charging
              ? (charging ? '#2A5C32' : 'var(--navy)') : 'var(--muted)',
            fontFamily: 'var(--font-mono)', fontSize: 12,
            fontWeight: 600, cursor: 'pointer', letterSpacing: '.06em',
          }}>
            {charging ? '⚡ Laden' : '🔋 Entladen'}
          </button>
        ))}
      </div>

      {/* Sliders + Thermometer */}
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <label className={styles.sliderLabel} htmlFor="bat-cr">
            <span><TermPopup term="C-Rate" /> — {speedLabel}</span>
            <strong>{cRate.toFixed(1)} C</strong>
          </label>
          <input id="bat-cr" type="range" min="0.2" max="2.0" step="0.1"
            value={cRate} onChange={e => setCRate(+e.target.value)} />

          <label className={styles.sliderLabel} htmlFor="bat-soc" style={{ marginTop: 10 }}>
            <span><TermPopup term="SOC" /></span>
            <strong>{soc}%</strong>
          </label>
          <input id="bat-soc" type="range" min="10" max="95" value={soc}
            onChange={e => setSoc(+e.target.value)} />
        </div>
        <Thermometer temp={temp} />
      </div>

      {/* Explanation */}
      <div style={{
        marginTop: 14, padding: '14px 16px',
        background: 'var(--navy)', borderRadius: 8,
        display: 'grid', gap: 8,
      }}>
        {/* Two heat sources explained */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div style={{ background: 'rgba(255,255,255,.06)', borderRadius: 6, padding: '10px 12px' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#C9A84C',
              letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 4 }}>
              <TermPopup term="Innenwiderstand" /> — Reibungswärme
            </p>
            <strong style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: '#C9A84C' }}>
              +{ohmic} W
            </strong>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', marginTop: 3 }}>
              immer Wärme — egal ob laden oder entladen
            </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,.06)', borderRadius: 6, padding: '10px 12px' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9,
              color: entropy < 0 ? '#5B8FB9' : '#DC143C',
              letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 4 }}>
              <TermPopup term="Entropie" /> — {entropy < 0 ? 'Kühlung' : 'Wärme'}
            </p>
            <strong style={{ fontFamily: 'var(--font-mono)', fontSize: 16,
              color: entropy < 0 ? '#5B8FB9' : '#DC143C' }}>
              {entropy > 0 ? '+' : ''}{entropy} W
            </strong>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', marginTop: 3 }}>
              {isCharging ? 'Laden: Ionen ordnen sich — gibt Wärme ab' : 'Entladen: Ionen lösen sich — nimmt Wärme auf'}
            </p>
          </div>
        </div>

        {/* The insight */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,.1)', paddingTop: 10 }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.8)', lineHeight: 1.6 }}>
            {!isCharging && cRate <= 0.5
              ? '🧊 Bei langsamem Entladen überwiegt der Entropieeffekt — die Zelle kühlt tatsächlich ab. Das ist der überraschende Effekt!'
              : !isCharging && cRate >= 1.5
              ? '🔥 Bei schnellem Entladen überwiegt die Reibungswärme — obwohl Entropie kühlt, gewinnt die Reibung.'
              : isCharging && cRate >= 1.5
              ? '🔥 Schnelles Laden: Beide Effekte heizen — Reibung und chemische Reaktion zusammen.'
              : isCharging
              ? '🤚 Normales Laden: Leicht warm, hauptsächlich durch Reibung + Ionenordnung.'
              : '✋ Mittleres Entladen: Entropie kühlt, Reibung heizt — fast ausgeglichen.'}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.stats} style={{ marginTop: 12 }}>
        <div><span>Zelltemperatur</span>
          <strong style={{ fontSize: 18 }}>{temp}°C</strong></div>
        <div><span>Umgebung</span><strong>25°C</strong></div>
        <div><span>Gesamtwärme</span>
          <strong style={{ color: total > 0 ? '#C9A84C' : '#5B8FB9' }}>
            {total > 0 ? '+' : ''}{total} W
          </strong>
        </div>
        <div><span>Realistisch?</span>
          <strong style={{ fontSize: 11, color: temp < 45 ? 'var(--ok-t)' : '#DC143C' }}>
            {temp < 45 ? '✓ Normal' : '✗ Zu heiß — BMS würde eingreifen'}
          </strong>
        </div>
      </div>
    </div>
  );
}
