'use client';

import { useState } from 'react';

export default function HydrogenBondExperiment() {
  const [separation, setSeparation] = useState(48);
  const [aligned, setAligned] = useState(true);

  // Dimensionless teaching score: not a molecular distance, energy curve or
  // universal hydrogen-bond criterion.
  const distanceScore = Math.max(0, 1 - Math.abs(separation - 48) / 42);
  const geometryScore = distanceScore * (aligned ? 1 : 0.28);
  const state = separation < 27
    ? 'sehr nahe: Abstoßung und reale Molekülgeometrie werden wichtig'
    : separation > 76
      ? 'weit getrennt: die Wechselwirkung wird schwächer'
      : aligned
        ? 'günstige Donor–H···Akzeptor-Geometrie'
        : 'ungünstigere Orientierung';

  return <div style={{ border: '1px solid #d8d4ca', borderRadius: 12, padding: 16, background: '#fff' }}>
    <h4 style={{ marginTop: 0 }}>Wasserstoffbrücke: Donor, Akzeptor und Geometrie</h4>
    <p>Eine Wasserstoffbrücke ist eine gerichtete nichtkovalente Wechselwirkung. Ein an einen elektronegativen Donor gebundenes H-Atom wechselwirkt mit einem geeigneten Akzeptor; Abstand und Orientierung beeinflussen die Stärke kontinuierlich.</p>

    <label>Schematische Trennung: <strong>{separation}</strong>
      <input type="range" min="10" max="100" value={separation} onChange={e => setSeparation(+e.target.value)} style={{ width: '100%' }} />
    </label>
    <button type="button" onClick={() => setAligned(v => !v)} style={{ margin: '12px 0', padding: '8px 12px' }} aria-pressed={aligned}>
      Anordnung: {aligned ? 'annähernd ausgerichtet' : 'abgewinkelt'}
    </button>

    <div style={{ height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontSize: 30 }}>O—H</span>
      <span style={{ width: separation * 2, borderTop: `${1 + 3 * geometryScore}px dotted currentColor`, margin: '0 8px', opacity: 0.25 + 0.75 * geometryScore, transform: aligned ? 'none' : 'rotate(22deg)', transition: 'all 160ms ease' }} />
      <span style={{ fontSize: 30 }}>O:</span>
    </div>

    <div style={{ margin: '8px 0 12px', padding: 10, border: '1px solid #ddd', borderRadius: 8 }}>
      <strong>Qualitative Einordnung:</strong> {state}
      <div style={{ height: 10, background: '#ece9e2', borderRadius: 5, overflow: 'hidden', marginTop: 8 }}>
        <div style={{ width: `${Math.round(geometryScore * 100)}%`, height: '100%', background: 'currentColor', transition: 'width 160ms ease' }} />
      </div>
    </div>

    <p style={{ marginBottom: 0 }}>Die Skala ist absichtlich dimensionslos. Sie ist keine Potentialenergiekurve und liefert weder Bindungsenergie noch einen universellen Abstands- oder Winkelgrenzwert. Reale Wasserstoffbrücken hängen zusätzlich von Donor, Akzeptor und ihrer molekularen Umgebung ab.</p>
  </div>;
}
