'use client';

import { useMemo, useState } from 'react';

export default function EnergyFlowExperiment() {
  const [pv, setPv] = useState(22);
  const [inverter, setInverter] = useState(96);
  const [battery, setBattery] = useState(90);
  const input = 1000;
  const values = useMemo(() => {
    const dc = input * pv / 100;
    const ac = dc * inverter / 100;
    const stored = ac * battery / 100;
    return { dc, ac, stored, total: pv / 100 * inverter / 100 * battery / 100 * 100 };
  }, [pv, inverter, battery]);

  const stage = (name: string, value: number, detail: string) => <div style={{ flex: 1, minWidth: 120, padding: 12, border: '1px solid #d8d4ca', borderRadius: 10, background: '#fff', textAlign: 'center' }}><strong>{name}</strong><div style={{ fontSize: '1.2rem', margin: '7px 0' }}>{Math.round(value)} W</div><small>{detail}</small></div>;
  return (
    <div style={{ border: '1px solid #d8d4ca', borderRadius: 12, padding: 16, background: '#f8f6f1' }}>
      <h4 style={{ marginTop: 0 }}>Energiefluss: Wo bleibt die Eingangsleistung?</h4>
      <p>Verändere die Wirkungsgrade. Die Pfeile bilden eine Kette: Der Ausgang einer Stufe ist der Eingang der nächsten.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>{stage('Sonnenstrahlung', input, 'Eingang')}<b>→</b>{stage('PV-Ausgang', values.dc, `${pv}%`)}<b>→</b>{stage('Wechselrichter', values.ac, `${inverter}%`)}<b>→</b>{stage('nach Speicher', values.stored, `${battery}%`)} </div>
      <div style={{ marginTop: 14 }}>
        <label>PV {pv}%<input type="range" min="10" max="30" value={pv} onChange={e => setPv(+e.target.value)} style={{ width: '100%' }} /></label>
        <label>Wechselrichter {inverter}%<input type="range" min="80" max="99" value={inverter} onChange={e => setInverter(+e.target.value)} style={{ width: '100%' }} /></label>
        <label>Speicher-Rundlauf vereinfacht {battery}%<input type="range" min="70" max="98" value={battery} onChange={e => setBattery(+e.target.value)} style={{ width: '100%' }} /></label>
      </div>
      <p><strong>Gesamter Kettenwirkungsgrad: {values.total.toFixed(1)}%</strong></p>
      <p style={{ marginBottom: 0 }}>Die Prozentwerte werden nicht addiert: η<sub>gesamt</sub> = η₁ × η₂ × η₃. Die Darstellung ist ein vereinfachtes Rechenmodell; reale Systemgrenzen und Betriebszustände müssen ausdrücklich festgelegt werden.</p>
    </div>
  );
}
