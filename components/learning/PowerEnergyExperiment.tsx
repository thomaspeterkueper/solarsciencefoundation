'use client';

import { useMemo, useState } from 'react';

export default function PowerEnergyExperiment() {
  const [power, setPower] = useState(4);
  const [hours, setHours] = useState(6);
  const energy = useMemo(() => power * hours, [power, hours]);
  const maxEnergy = 120;

  return (
    <div style={{ border: '1px solid #d8d4ca', borderRadius: 12, padding: 16, background: '#fff' }}>
      <h4 style={{ marginTop: 0 }}>Experiment: Leistung wird erst über Zeit zu Energie</h4>
      <p>Verändere Leistung und Laufzeit. Beobachte, wie die Fläche unter der Leistungskurve – und damit die Energie – wächst.</p>
      <label>Leistung: <strong>{power} kW</strong><input aria-label="Leistung" type="range" min="1" max="10" step="1" value={power} onChange={e => setPower(Number(e.target.value))} style={{ width: '100%' }} /></label>
      <label>Laufzeit: <strong>{hours} h</strong><input aria-label="Laufzeit" type="range" min="1" max="12" step="1" value={hours} onChange={e => setHours(Number(e.target.value))} style={{ width: '100%' }} /></label>
      <div style={{ marginTop: 14, height: 150, borderLeft: '2px solid #555', borderBottom: '2px solid #555', position: 'relative', padding: 8 }}>
        <div style={{ position: 'absolute', left: 8, bottom: 0, width: `${hours / 12 * 90}%`, height: `${power / 10 * 90}%`, background: 'rgba(54,116,181,.25)', border: '2px solid #3674b5' }} />
        <span style={{ position: 'absolute', left: 12, top: 8 }}>P = {power} kW</span>
        <span style={{ position: 'absolute', right: 6, bottom: 4 }}>t = {hours} h</span>
      </div>
      <div style={{ marginTop: 12, fontSize: '1.15rem' }}><strong>E = P × t = {power} kW × {hours} h = {energy} kWh</strong></div>
      <div style={{ marginTop: 8, height: 10, background: '#eee', borderRadius: 5 }}><div style={{ width: `${Math.min(100, energy / maxEnergy * 100)}%`, height: '100%', background: '#8a6a00', borderRadius: 5 }} /></div>
      <p style={{ marginBottom: 0 }}><strong>Erkenntnis:</strong> kW beschreibt eine Rate. Erst die Dauer bestimmt zusammen mit der Leistung die übertragene Energie in kWh.</p>
    </div>
  );
}
