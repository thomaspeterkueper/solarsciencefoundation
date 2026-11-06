'use client';
/**
 * TransferComparisonExperiment – interactiveId 'transferbahn-vergleich' (EXP:ORBITAL-DEMO)
 * Bogen oder fast gerade? Erde → Mars mit wachsendem Startschub.
 * Werte und Bahnpunkte kommen gerechnet aus lib/learningInteractives.ts
 * (dieselben Daten, die NOXIA über /api/noxia/modules erhält).
 */
import { useState } from 'react';
import styles from './RayleighExperiment.module.css';
import { getLearningInteractive, type TransferComparisonParams } from '../../lib/learningInteractives';

const fmt = (n: number, d = 1) => n.toLocaleString('de-DE', { minimumFractionDigits: d, maximumFractionDigits: d });

export function TransferComparisonView({ params }: { params: TransferComparisonParams }) {
  const [index, setIndex] = useState(params.hohmannIndex);
  const sample = params.samples[index];
  const hohmann = params.samples[params.hohmannIndex];
  const factor = sample.dvTotalKmS / hohmann.dvTotalKmS;

  const W = 320;
  const H = 260;
  const maxR = params.to.orbitAu * 1.12;
  const scale = (Math.min(W, H) / 2) / maxR;
  const cx = W / 2 + 40;
  const cy = H / 2;
  const toXY = ([x, y]: [number, number]) => `${(cx + x * scale).toFixed(1)},${(cy - y * scale).toFixed(1)}`;
  const end = sample.path[sample.path.length - 1];

  return (
    <div className={styles.nativeExperiment}>
      <div className={styles.header}>
        <span className={styles.label}>Experiment</span>
        <strong>Bogen oder fast gerade? {params.from.label} → {params.to.label}</strong>
      </div>
      <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
        Verändere den Startschub. Ganz links fliegt das Schiff den Hohmann-Bogen, weiter rechts wird die Bahn
        gestreckter – schneller, aber teurer.
      </p>

      <svg viewBox={`0 0 ${W + 80} ${H}`} style={{ width: '100%', background: '#0a1628', borderRadius: 8 }} role="img"
        aria-label={`Transferbahn mit ${fmt(sample.dv1KmS, 2)} km/s Startschub`}>
        <circle cx={cx} cy={cy} r={params.from.orbitAu * scale} fill="none" stroke="rgba(255,255,255,.18)" />
        <circle cx={cx} cy={cy} r={params.to.orbitAu * scale} fill="none" stroke="rgba(255,255,255,.18)" />
        <line x1={cx + params.from.orbitAu * scale} y1={cy} x2={cx + params.to.orbitAu * scale} y2={cy}
          stroke="rgba(255,255,255,.35)" strokeDasharray="2 4" />
        <polyline points={hohmann.path.map(toXY).join(' ')} fill="none" stroke="rgba(201,168,76,.35)" strokeDasharray="4 3" />
        <polyline points={sample.path.map(toXY).join(' ')} fill="none" stroke="#C9A84C" strokeWidth={2} />
        <circle cx={cx} cy={cy} r={8} fill="#FFB300" />
        <circle cx={cx + params.from.orbitAu * scale} cy={cy} r={5} fill="#3f7fc8" />
        <circle cx={Number(toXY(end).split(',')[0])} cy={Number(toXY(end).split(',')[1])} r={5} fill="#c1440e" />
        <text x={cx + params.from.orbitAu * scale + 6} y={cy + 14} fill="#9fb6d6" fontSize={10}>{params.from.label}</text>
        <text x={8} y={16} fill="#9fb6d6" fontSize={10}>gepunktet: gerader Weg · gestrichelt: Hohmann-Bogen</text>
      </svg>

      <label style={{ display: 'block', marginTop: 12, fontFamily: 'var(--font-mono)', fontSize: 11 }}>
        Startschub Δv₁: <strong>{fmt(sample.dv1KmS, 2)} km/s</strong>
        <input type="range" min={0} max={params.samples.length - 1} step={1} value={index}
          onChange={(e) => setIndex(Number(e.target.value))} style={{ width: '100%' }} />
      </label>

      <div className={styles.stats} style={{ marginTop: 12 }}>
        <div><span>Reisezeit</span><strong>{Math.round(sample.days)} Tage</strong></div>
        <div><span>Bogen um die Sonne</span><strong>{Math.round(sample.sweepDeg)}°</strong></div>
        <div><span>Bremsen am {params.to.label}</span><strong>{fmt(sample.dvArrivalKmS, 2)} km/s</strong></div>
        <div><span>Δv gesamt</span><strong style={{ color: '#C9A84C' }}>{fmt(sample.dvTotalKmS, 2)} km/s</strong></div>
      </div>
      <p style={{ fontSize: 13, lineHeight: 1.6, marginTop: 10 }}>
        {index === params.hohmannIndex
          ? `Hohmann-Bogen: kleinster Energiebedarf. Die gerade Strecke wäre rund ${fmt(params.straightLineKm / 1e6, 0)} Mio. km – das Schiff fliegt aber einen halben Umlauf um die Sonne.`
          : `${fmt(factor, 1)}-facher Energiebedarf gegenüber dem Hohmann-Bogen für ${Math.round(hohmann.days - sample.days)} Tage weniger Reisezeit.`}
      </p>
    </div>
  );
}

export default function TransferComparisonExperiment() {
  const interactive = getLearningInteractive('transferbahn-vergleich');
  if (!interactive || interactive.kind !== 'transfer-comparison') return null;
  return <TransferComparisonView params={interactive.params} />;
}
