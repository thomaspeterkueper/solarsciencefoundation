'use client';
/**
 * ColonyExperiment — EXP:COLONY-STANDORT + EXP:COLONY-LEBENSERHALT
 * Two modes:
 * 1. Standort-Optimierer: Wasser × Energie × Strahlung → Überlebens-Score
 * 2. Lebenserhaltungs-Rechner: Personen × Recycling-Rate × ISRU → Ressourcenbilanz
 *
 * Physics/Engineering:
 * - O2-Bedarf: 0.84 kg/Person/Tag (NASA baseline)
 * - H2O-Bedarf: 3.5 L/Person/Tag (inkl. Hygiene)
 * - Sabatier: CO2 + 4H2 → CH4 + 2H2O (Rückgewinnung)
 * - Energie-Bedarf: ~2 kW/Person (Wärme, Licht, Elektrolyse)
 */
import { useState } from 'react';
import styles from './RayleighExperiment.module.css';

// ── Reale Kandidaten-Standorte ────────────────────────────────────────────
const SITES = [
  { name: 'Jezero-Krater', wasser: 60, sonne: 75, strahlung: 40,
    note: 'NASA Perseverance landet hier. Antiker Flussdelta — Wassereis in Schichten nachweisbar.' },
  { name: 'Hellas Planitia', wasser: 45, sonne: 55, strahlung: 65,
    note: 'Tiefster Punkt des Mars (−7 km). Atmosphäre dichter → weniger Strahlung. Aber kalt.' },
  { name: 'Tharsis-Vulkanhang', wasser: 30, sonne: 90, strahlung: 30,
    note: 'Lavahöhlen bieten natürlichen Strahlungsschutz. Kein Wassereis — muss importiert werden.' },
  { name: 'Südpol (Planum Australe)', wasser: 95, sonne: 20, strahlung: 50,
    note: 'Größte bekannte Wassereisvorkommen. Aber 6 Monate Polarnacht — Solar unmöglich.' },
];

function siteScore(w: number, e: number, s: number): number {
  // Gewichtung: Wasser 35%, Energie 35%, Strahlungsschutz 30%
  return Math.round(w * 0.35 + e * 0.35 + s * 0.30);
}

function scoreColor(score: number): string {
  if (score >= 70) return '#7AAD7A';
  if (score >= 50) return '#C9A84C';
  return '#DC143C';
}

// ── Komponente ────────────────────────────────────────────────────────────
export default function ColonyExperiment() {
  const [mode, setMode] = useState<'standort' | 'leben'>('standort');
  const [wasser, setWasser] = useState(60);
  const [sonne, setSonne] = useState(75);
  const [strahlung, setStrahlung] = useState(40);
  const [preset, setPreset] = useState<number | null>(0);
  const [personen, setPersonen] = useState(6);
  const [recycling, setRecycling] = useState(93);
  const [isru, setIsru] = useState(40);

  const score = siteScore(wasser, sonne, strahlung);

  // Lebenserhaltungs-Berechnungen (NASA-Werte)
  const o2Bedarf = personen * 0.84;           // kg/Tag
  const h2oVerlust = personen * 3.5 * (1 - recycling / 100); // L/Tag verloren
  const energieBedarf = personen * 2.0 + 5;  // kW Basis + Elektrolyse
  const solarFlaeche = Math.ceil(energieBedarf / (sonne / 100 * 0.15)); // m² bei 15% Effizienz
  const ch4Produktion = isru / 100 * personen * 0.5; // kg CH4/Tag (Sabatier)
  const vorratTage = Math.round(300 / (h2oVerlust + 0.1)); // Tage bis H2O-Reserve leer

  const MODES = [
    { id: 'standort' as const, emoji: '🗺️', label: 'Standort' },
    { id: 'leben' as const,    emoji: '🫧', label: 'Lebenserhaltung' },
  ];

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}>
        <span className={styles.label}>Experiment</span>
        <strong>Kolonisierung — Standort & Lebenserhaltung</strong>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        {MODES.map(m => (
          <button key={m.id} onClick={() => setMode(m.id)} style={{
            flex: 1, padding: '8px 0', borderRadius: 7, textAlign: 'center',
            border: '1.5px solid ' + (mode === m.id ? '#7AAD7A' : 'var(--border)'),
            background: mode === m.id ? '#7AAD7A22' : 'var(--soft)',
            color: mode === m.id ? '#2A5C32' : 'var(--muted)',
            fontFamily: 'var(--font-mono)', fontSize: 11, cursor: 'pointer', fontWeight: 600,
          }}>
            <span style={{ marginRight: 5 }}>{m.emoji}</span>{m.label}
          </button>
        ))}
      </div>

      {/* ── STANDORT MODE ── */}
      {mode === 'standort' && (
        <>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, lineHeight: 1.6, marginBottom: 10 }}>
            Kein Standort ist perfekt. Verschiebe die Regler und finde den besten Kompromiss —
            oder wähle einen realen Kandidaten:
          </p>

          {/* Preset buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 12 }}>
            {SITES.map((s, i) => (
              <button key={i} onClick={() => {
                setPreset(i); setWasser(s.wasser); setSonne(s.sonne); setStrahlung(s.strahlung);
              }} style={{
                padding: '6px 10px', borderRadius: 6, textAlign: 'left',
                border: '1.5px solid ' + (preset === i ? '#C9A84C' : 'var(--border)'),
                background: preset === i ? '#C9A84C18' : 'var(--soft)',
                fontFamily: 'var(--font-mono)', fontSize: 10, cursor: 'pointer',
                color: preset === i ? 'var(--navy)' : 'var(--muted)',
              }}>{s.name}</button>
            ))}
          </div>

          {preset !== null && (
            <div style={{ padding: '10px 14px', background: 'var(--navy)', borderRadius: 8, marginBottom: 12 }}>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,.75)', margin: 0, lineHeight: 1.6 }}>
                {SITES[preset].note}
              </p>
            </div>
          )}

          {/* Sliders */}
          {[
            { label: 'Wasservorkommen', val: wasser, set: setWasser, unit: '%',
              hint: wasser >= 70 ? 'Exzellent — Eis im Untergrund' : wasser >= 40 ? 'Ausreichend — Tiefbohrung nötig' : 'Kritisch — Import erforderlich' },
            { label: 'Sonnenstunden / Sol', val: sonne, set: setSonne, unit: '%',
              hint: sonne >= 70 ? 'Solar viable — keine Backup-Energie nötig' : sonne >= 40 ? 'Hybrid: Solar + Nuclear' : 'Nuclear Baseline nötig' },
            { label: 'Strahlungsabschirmung', val: strahlung, set: setStrahlung, unit: '%',
              hint: strahlung >= 70 ? 'Natürlicher Schutz (Höhle, Krater)' : strahlung >= 40 ? 'Regolith-Abdeckung nötig' : 'Gefährlich — Unterirdisch bauen' },
          ].map(({ label, val, set, unit, hint }) => (
            <div key={label} style={{ marginBottom: 12 }}>
              <label className={styles.sliderLabel}>
                <span>{label}</span>
                <strong style={{ color: scoreColor(val) }}>{val}{unit}</strong>
              </label>
              <input type="range" min={0} max={100} value={val}
                onChange={e => { set(+e.target.value); setPreset(null); }} />
              <p style={{ fontSize: 11, color: 'var(--muted)', margin: '3px 0 0', fontStyle: 'italic' }}>{hint}</p>
            </div>
          ))}

          {/* Score */}
          <div style={{
            padding: '14px 16px', borderRadius: 8, marginTop: 4,
            background: 'var(--navy)',
            border: '2px solid ' + scoreColor(score),
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,.6)' }}>
                Überlebens-Score Jahr 1
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: scoreColor(score) }}>
                {score} / 100
              </span>
            </div>
            <div style={{ height: 8, background: 'rgba(255,255,255,.1)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: score + '%', background: scoreColor(score),
                transition: 'width .4s cubic-bezier(.22,1,.36,1)', borderRadius: 4 }} />
            </div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,.7)', margin: '10px 0 0', lineHeight: 1.6 }}>
              {score >= 70
                ? '✓ Vielversprechender Standort — Kolonie hat gute Überlebenschancen.'
                : score >= 50
                ? '⚠ Risiko-Standort — kritische Versorgungsengpässe wahrscheinlich.'
                : '✗ Kritischer Standort — Kolonie würde ohne massiven Nachschub scheitern.'}
            </p>
          </div>
        </>
      )}

      {/* ── LEBENSERHALTUNG MODE ── */}
      {mode === 'leben' && (
        <>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
            Was braucht die Kolonie täglich? Alle Werte basieren auf NASA-Baseline-Daten (ISS-Erfahrung).
          </p>

          {[
            { label: 'Personen in der Kolonie', val: personen, set: setPersonen, min: 1, max: 20, unit: '', step: 1 },
            { label: 'H₂O-Recycling-Rate', val: recycling, set: setRecycling, min: 50, max: 99, unit: '%', step: 1 },
            { label: 'ISRU-Aktivität (Sabatier)', val: isru, set: setIsru, min: 0, max: 100, unit: '%', step: 5 },
          ].map(({ label, val, set, min, max, unit, step }) => (
            <div key={label} style={{ marginBottom: 10 }}>
              <label className={styles.sliderLabel}>
                <span>{label}</span>
                <strong>{val}{unit}</strong>
              </label>
              <input type="range" min={min} max={max} step={step} value={val}
                onChange={e => set(+e.target.value)} />
            </div>
          ))}

          {/* Bilanz */}
          <div style={{ display: 'grid', gap: 8, marginTop: 12 }}>
            {[
              { label: 'O₂-Bedarf/Tag', val: o2Bedarf.toFixed(1) + ' kg',
                note: '0.84 kg/Person (NASA)', ok: true },
              { label: 'H₂O-Verlust/Tag', val: h2oVerlust.toFixed(1) + ' L',
                note: recycling >= 90 ? 'Akzeptabel' : 'Kritisch — Recycling erhöhen!',
                ok: recycling >= 90 },
              { label: 'Energie-Bedarf', val: energieBedarf.toFixed(1) + ' kW',
                note: 'Solar-Fläche nötig: ' + solarFlaeche + ' m²', ok: true },
              { label: 'CH₄ via Sabatier', val: ch4Produktion.toFixed(2) + ' kg/Tag',
                note: isru > 0 ? 'Treibstoff aus Mars-CO₂' : 'ISRU inaktiv — kein lokaler Treibstoff',
                ok: isru > 20 },
              { label: 'H₂O-Reserve hält', val: vorratTage + ' Tage',
                note: vorratTage > 90 ? 'Resupply-Fenster erreicht' : 'Unter kritischer Schwelle!',
                ok: vorratTage > 90 },
            ].map(({ label, val, note, ok }) => (
              <div key={label} style={{
                padding: '10px 14px', borderRadius: 8,
                background: ok ? '#EBF7ED' : '#FDECEA',
                border: '1px solid ' + (ok ? '#3A7D44' : '#C0392B'),
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11,
                    color: ok ? '#2A5C32' : '#922B21' }}>{label}</span>
                  <strong style={{ fontFamily: 'var(--font-mono)', fontSize: 13,
                    color: ok ? '#2A5C32' : '#922B21' }}>{val}</strong>
                </div>
                <p style={{ fontSize: 11, color: ok ? '#3A7D44' : '#C0392B',
                  margin: '3px 0 0', fontStyle: 'italic' }}>{note}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
