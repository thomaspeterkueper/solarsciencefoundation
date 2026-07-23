'use client';
/**
 * StationExperiment — EXP:STATION-ORBIT + EXP:STATION-ANDOCK
 * Two modes:
 * 1. Orbit-Vergleich: Höhe → Umlaufzeit, Strahlung, Kosten, Latenz
 * 2. Andock-Simulator: Geschwindigkeit × Winkel × Versatz → Feedback
 *
 * Physics:
 * - Umlaufzeit: T = 2π√(r³/GM), GM_Erde = 3.986e14 m³/s²
 * - Van-Allen-Gürtel: 1000-6000 km (innen), 13000-60000 km (außen)
 * - Aufprall-Energie: E = ½mv² (m=10.000 kg Sojus-Kapsel)
 * - ISS Wasserrecycling: 93% (ECLSS-System)
 */
import { useState, useEffect, useRef } from 'react';
import styles from './RayleighExperiment.module.css';

const GM = 3.986e14;
const R_ERDE = 6371000;

function orbitalPeriod(altKm: number): number {
  const r = (R_ERDE + altKm * 1000);
  return (2 * Math.PI * Math.sqrt(r * r * r / GM)) / 60; // Minuten
}

function radiationLevel(altKm: number): string {
  if (altKm < 500) return 'Niedrig (LEO, Magnetfeld schützt)';
  if (altKm < 1000) return 'Mittel (oberes LEO)';
  if (altKm < 6000) return 'Sehr hoch (Van-Allen-Innenring!)';
  if (altKm < 13000) return 'Erhöht (Übergang)';
  if (altKm < 60000) return 'Sehr hoch (Van-Allen-Außenring!)';
  return 'Mittel (GEO, über Gürteln)';
}

function radiationMsv(altKm: number): number {
  if (altKm < 500) return 0.5 + altKm * 0.001;
  if (altKm < 1000) return 1.5;
  if (altKm < 6000) return 15 + (altKm - 1000) * 0.003;
  if (altKm < 13000) return 8;
  if (altKm < 60000) return 12 - (altKm - 13000) * 0.0001;
  return 1.5;
}

function costIndex(altKm: number): string {
  if (altKm < 600) return '1× (LEO Referenz)';
  if (altKm < 2000) return '2–3× (mehr Delta-v nötig)';
  if (altKm < 20000) return '5–8× (MEO-Transfer)';
  return '10–15× (GEO-Transfer, GSO-Insertion)';
}

function commLatency(altKm: number): string {
  const ms = Math.round((altKm * 2) / 300);
  return ms < 10 ? ms + ' ms (vernachlässigbar)' : ms + ' ms' + (ms > 500 ? ' (spürbare Verzögerung)' : '');
}

// Bekannte Satelliten-Markierungen
const MARKERS = [
  { alt: 408,   label: 'ISS',      color: '#C9A84C' },
  { alt: 550,   label: 'Starlink', color: '#5B8FB9' },
  { alt: 20200, label: 'GPS',      color: '#7AAD7A' },
  { alt: 35786, label: 'GEO',      color: '#DC143C' },
];

export default function StationExperiment() {
  const [mode, setMode] = useState<'orbit' | 'andocken'>('orbit');
  const [altKm, setAltKm] = useState(408);

  // Andock-Parameter
  const [speed, setSpeed] = useState(0.05);   // m/s
  const [angle, setAngle] = useState(1.5);    // Grad
  const [lateral, setLateral] = useState(8);  // cm

  const MODES = [
    { id: 'orbit' as const,   emoji: '🛰️', label: 'Orbits' },
    { id: 'andocken' as const, emoji: '⚓', label: 'Andocken' },
  ];

  // Andock-Bewertung
  const speedOk   = speed <= 0.1;
  const speedPerf = speed <= 0.05;
  const angleOk   = angle <= 3;
  const anglePerf = angle <= 2;
  const latOk     = lateral <= 20;
  const latPerf   = lateral <= 10;
  const allPerf   = speedPerf && anglePerf && latPerf;
  const allOk     = speedOk && angleOk && latOk;
  const impact_kJ = (0.5 * 10000 * speed * speed / 1000).toFixed(2);

  const dockStatus = allPerf ? 'Perfektes Andocken ✓'
    : allOk ? 'Sicheres Andocken ✓'
    : !speedOk ? 'Kollisionsgefahr — zu schnell ✗'
    : !angleOk ? 'Falsche Ausrichtung — Abdocken nötig ✗'
    : 'Lateraler Versatz zu groß ✗';
  const dockColor = allPerf ? '#7AAD7A' : allOk ? '#C9A84C' : '#DC143C';

  const period = orbitalPeriod(altKm);
  const radMsv = radiationMsv(altKm);
  const marker = MARKERS.find(m => Math.abs(m.alt - altKm) < 100);

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}>
        <span className={styles.label}>Experiment</span>
        <strong>Raumstation — Orbit & Andocken</strong>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        {MODES.map(m => (
          <button key={m.id} onClick={() => setMode(m.id)} style={{
            flex: 1, padding: '8px 0', borderRadius: 7, textAlign: 'center',
            border: '1.5px solid ' + (mode === m.id ? '#5B8FB9' : 'var(--border)'),
            background: mode === m.id ? '#5B8FB922' : 'var(--soft)',
            color: mode === m.id ? '#1E4E8C' : 'var(--muted)',
            fontFamily: 'var(--font-mono)', fontSize: 11, cursor: 'pointer', fontWeight: 600,
          }}>
            <span style={{ marginRight: 5 }}>{m.emoji}</span>{m.label}
          </button>
        ))}
      </div>

      {/* ── ORBIT MODE ── */}
      {mode === 'orbit' && (
        <>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, lineHeight: 1.6, marginBottom: 10 }}>
            Verschiebe die Orbithöhe. Die Physik ändert sich dramatisch —
            besonders im Van-Allen-Strahlungsgürtel.
          </p>

          <label className={styles.sliderLabel} htmlFor="alt-sl">
            <span>Orbithöhe</span>
            <strong>{altKm.toLocaleString('de-DE')} km</strong>
          </label>
          <input id="alt-sl" type="range" min={160} max={42000} step={50}
            value={altKm} onChange={e => setAltKm(+e.target.value)} />

          {/* Marker indicator */}
          {marker && (
            <div style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 4,
              background: marker.color + '22', border: '1px solid ' + marker.color,
              fontFamily: 'var(--font-mono)', fontSize: 10, color: marker.color,
              marginBottom: 12 }}>
              ← {marker.label}
            </div>
          )}

          <div className={styles.stats} style={{ marginTop: 12 }}>
            <div>
              <span>Umlaufzeit</span>
              <strong>{period.toFixed(0)} min</strong>
            </div>
            <div>
              <span>Sonnenaufgänge/Tag</span>
              <strong>{(1440 / period).toFixed(1)}</strong>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <span>Strahlung</span>
              <strong style={{ color: radMsv > 5 ? '#DC143C' : radMsv > 1.5 ? '#C9A84C' : '#7AAD7A' }}>
                {radMsv.toFixed(1)} mSv/Tag — {radiationLevel(altKm)}
              </strong>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <span>Startkosten (relativ)</span>
              <strong>{costIndex(altKm)}</strong>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <span>Kommunikations-Latenz</span>
              <strong>{commLatency(altKm)}</strong>
            </div>
          </div>

          {altKm > 1000 && altKm < 6000 && (
            <div style={{ marginTop: 12, padding: '10px 14px', background: '#FDECEA',
              borderRadius: 8, border: '1px solid #C0392B' }}>
              <p style={{ fontSize: 12, color: '#922B21', margin: 0, lineHeight: 1.6 }}>
                ⚠ Van-Allen-Innenring — Strahlung bis zu 15 mSv/Tag.
                ISS-Crew erhält ca. 0.5 mSv/Tag. Dieser Orbit ist für dauerhafte Besatzung ungeeignet.
                GPS-Satelliten (unbemannt) nutzen trotzdem MEO.
              </p>
            </div>
          )}
          {altKm === 35786 && (
            <div style={{ marginTop: 12, padding: '10px 14px', background: '#EBF7ED',
              borderRadius: 8, border: '1px solid #3A7D44' }}>
              <p style={{ fontSize: 12, color: '#2A5C32', margin: 0 }}>
                Geostationärer Orbit — Satellit erscheint von der Erde aus fest am Himmel.
                Umlaufzeit = 1 Erdtag (23h 56min). Perfekt für Kommunikation und Wetter.
              </p>
            </div>
          )}
        </>
      )}

      {/* ── ANDOCKEN MODE ── */}
      {mode === 'andocken' && (
        <>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
            ISS-Zielwerte: unter 0.05 m/s, unter 2°, unter 10 cm Versatz.
            Sojus-Masse: ~7.250 kg vollbeladen.
          </p>

          {[
            { label: 'Annäherungsgeschwindigkeit', val: speed, set: setSpeed,
              min: 0, max: 1, step: 0.01, unit: ' m/s',
              ok: speedOk, perf: speedPerf, target: '≤ 0.05 m/s' },
            { label: 'Winkelabweichung', val: angle, set: setAngle,
              min: 0, max: 15, step: 0.1, unit: '°',
              ok: angleOk, perf: anglePerf, target: '≤ 2°' },
            { label: 'Lateraler Versatz', val: lateral, set: setLateral,
              min: 0, max: 80, step: 1, unit: ' cm',
              ok: latOk, perf: latPerf, target: '≤ 10 cm' },
          ].map(({ label, val, set, min, max, step, unit, ok, perf, target }) => (
            <div key={label} style={{ marginBottom: 12 }}>
              <label className={styles.sliderLabel}>
                <span>{label}</span>
                <strong style={{ color: perf ? '#7AAD7A' : ok ? '#C9A84C' : '#DC143C' }}>
                  {val.toFixed(step < 0.1 ? 2 : 1)}{unit}
                </strong>
              </label>
              <input type="range" min={min} max={max} step={step} value={val}
                onChange={e => set(+e.target.value)} />
              <p style={{ fontSize: 10, color: 'var(--muted)', margin: '2px 0 0',
                fontFamily: 'var(--font-mono)' }}>Ziel: {target}</p>
            </div>
          ))}

          <div style={{
            padding: '14px 16px', borderRadius: 8, marginTop: 4,
            background: 'var(--navy)', border: '2px solid ' + dockColor,
          }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13,
              fontWeight: 700, color: dockColor, marginBottom: 8 }}>
              {dockStatus}
            </p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,.7)', margin: 0, lineHeight: 1.6 }}>
              Aufprall-Energie bei {speed.toFixed(2)} m/s und 7.250 kg: <strong style={{ color: '#C9A84C' }}>{impact_kJ} kJ</strong>
              {parseFloat(impact_kJ) > 1 ? ' — strukturelle Schäden möglich' : ' — sicher'}
            </p>
          </div>

          <div style={{ marginTop: 12, padding: '10px 14px', background: 'var(--soft)',
            borderRadius: 8, border: '1px solid var(--border)' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10,
              color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.06em' }}>
              ISS Lebenserhaltung
            </p>
            <p style={{ fontSize: 12, color: 'var(--ink)', lineHeight: 1.65, margin: 0 }}>
              Wasserrecycling: <strong>93%</strong> (ECLSS) — 6 Personen brauchen nur 1.05 L Frischwasser/Tag<br/>
              O₂ via Elektrolyse aus Wasser — effizienter als Tank-Nachschub<br/>
              CO₂-Scrubbing: LiOH-Kartuschen oder Sabatier-Reaktor
            </p>
          </div>
        </>
      )}
    </div>
  );
}
