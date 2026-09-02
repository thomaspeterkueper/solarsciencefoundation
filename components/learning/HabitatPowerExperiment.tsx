'use client';

import { useMemo, useState } from 'react';

export default function HabitatPowerExperiment() {
  const [solarPeak, setSolarPeak] = useState(8);
  const [load, setLoad] = useState(3);
  const [capacity, setCapacity] = useState(18);
  const rows = useMemo(() => {
    let soc = capacity * .5;
    let shortage = 0;
    return Array.from({ length: 24 }, (_, h) => {
      const daylight = h >= 6 && h <= 18;
      const solar = daylight ? solarPeak * Math.max(0, Math.sin(Math.PI * (h - 6) / 12)) : 0;
      const demand = load + (h >= 18 && h < 20 ? 3 : 0);
      const balance = solar - demand;
      if (balance >= 0) soc = Math.min(capacity, soc + balance);
      else { const need = -balance; const fromBattery = Math.min(soc, need); soc -= fromBattery; shortage += need - fromBattery; }
      return { h, solar, demand, soc };
    });
  }, [solarPeak, load, capacity]);
  const shortage = rows.reduce((sum, r, i) => { const prev = i ? rows[i - 1].soc : capacity * .5; const available = r.solar + prev; return sum + Math.max(0, r.demand - available); }, 0);

  return (
    <div style={{ border: '1px solid #d8d4ca', borderRadius: 12, padding: 16, background: '#fff' }}>
      <h4 style={{ marginTop: 0 }}>24-h-Labor: Reicht die Versorgung wirklich?</h4>
      <p>Das Modell startet mit halb voller Batterie. Solar folgt einem vereinfachten Tagesbogen; zwischen 18 und 20 Uhr kommen 3 kW Spitzenlast hinzu.</p>
      <label>Solar-Spitze {solarPeak} kW<input type="range" min="2" max="14" value={solarPeak} onChange={e => setSolarPeak(+e.target.value)} style={{ width: '100%' }} /></label>
      <label>Grundlast {load} kW<input type="range" min="1" max="6" value={load} onChange={e => setLoad(+e.target.value)} style={{ width: '100%' }} /></label>
      <label>Batteriekapazität {capacity} kWh<input type="range" min="4" max="40" step="2" value={capacity} onChange={e => setCapacity(+e.target.value)} style={{ width: '100%' }} /></label>
      <div style={{ display: 'flex', gap: 2, height: 180, alignItems: 'flex-end', marginTop: 16, borderBottom: '2px solid #555' }}>
        {rows.map(r => <div key={r.h} title={`${r.h}:00 · Solar ${r.solar.toFixed(1)} kW · Last ${r.demand.toFixed(1)} kW · Batterie ${r.soc.toFixed(1)} kWh`} style={{ flex: 1, minWidth: 4 }}><div style={{ height: `${Math.min(80, r.solar / 14 * 80)}px`, background: '#d5a82a' }} /><div style={{ height: `${Math.min(55, r.demand / 9 * 55)}px`, background: '#4b6f96' }} /><div style={{ height: `${Math.min(40, r.soc / Math.max(1, capacity) * 40)}px`, background: '#4e9b68' }} /></div>)}
      </div>
      <div style={{ display: 'flex', gap: 14, fontSize: '.8rem', marginTop: 6 }}><span>Gold: Solar</span><span>Blau: Last</span><span>Grün: Batteriestand</span></div>
      <p><strong>{shortage > .01 ? `Versorgungslücke im Tagesmodell: mindestens ${shortage.toFixed(1)} kWh.` : 'Im dargestellten Tagesmodell entsteht keine rechnerische Versorgungslücke.'}</strong></p>
      <p style={{ marginBottom: 0 }}>Wichtig: Ein einzelner erfolgreicher Tag beweist noch keine Versorgungssicherheit. Wetter, Alterung, Umwandlungsverluste und mehrtägige Ausfälle sind hier bewusst noch nicht modelliert.</p>
    </div>
  );
}
