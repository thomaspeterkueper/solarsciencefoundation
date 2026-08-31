'use client';

import { useMemo, useState } from 'react';

type Material = 'Kies' | 'Sand' | 'Eisen' | 'Salz';
type Step = 'sieve' | 'magnet' | 'dissolve' | 'filter' | 'evaporate';
type Stream = { label: string; materials: Material[]; water: boolean };

const LABELS: Record<Step, string> = {
  sieve: 'Sieben', magnet: 'Magnet einsetzen', dissolve: 'In Wasser lösen', filter: 'Filtrieren', evaporate: 'Eindampfen',
};
const COST: Record<Step, { energy: number; water: number }> = {
  sieve: { energy: 1, water: 0 }, magnet: { energy: 1, water: 0 }, dissolve: { energy: 1, water: 2 }, filter: { energy: 2, water: 0 }, evaporate: { energy: 6, water: 0 },
};

function applyStep(streams: Stream[], step: Step): Stream[] {
  const next: Stream[] = [];
  for (const stream of streams) {
    if (step === 'sieve' && stream.materials.includes('Kies') && stream.materials.some((m) => m !== 'Kies')) {
      next.push({ label: 'Grobgut', materials: ['Kies'], water: stream.water });
      next.push({ label: 'Siebdurchgang', materials: stream.materials.filter((m) => m !== 'Kies'), water: stream.water });
    } else if (step === 'magnet' && stream.materials.includes('Eisen') && stream.materials.some((m) => m !== 'Eisen')) {
      next.push({ label: 'Magnetfraktion', materials: ['Eisen'], water: stream.water });
      next.push({ label: 'Nichtmagnetisch', materials: stream.materials.filter((m) => m !== 'Eisen'), water: stream.water });
    } else if (step === 'dissolve' && stream.materials.includes('Salz') && !stream.water) {
      next.push({ ...stream, label: `${stream.label} + Salzlösung`, water: true });
    } else if (step === 'filter' && stream.water && stream.materials.includes('Salz') && stream.materials.some((m) => m !== 'Salz')) {
      const solids = stream.materials.filter((m) => m !== 'Salz');
      next.push({ label: 'Filterkuchen', materials: solids, water: false });
      next.push({ label: 'Filtrat', materials: ['Salz'], water: true });
    } else if (step === 'evaporate' && stream.water) {
      next.push({ ...stream, label: stream.materials.length === 1 && stream.materials[0] === 'Salz' ? 'Salzprodukt' : stream.label, water: false });
    } else {
      next.push(stream);
    }
  }
  return next;
}

export default function ResourceSeparationExperiment() {
  const [steps, setSteps] = useState<Step[]>([]);
  const streams = useMemo(() => steps.reduce(applyStep, [{ label: 'Ausgangsgemisch', materials: ['Kies', 'Sand', 'Eisen', 'Salz'], water: false } as Stream]), [steps]);
  const energy = steps.reduce((sum, step) => sum + COST[step].energy, 0);
  const water = steps.reduce((sum, step) => sum + COST[step].water, 0);
  const pure = streams.filter((s) => s.materials.length === 1 && !s.water).map((s) => s.materials[0]);
  const complete = (['Kies', 'Sand', 'Eisen', 'Salz'] as Material[]).every((m) => pure.includes(m));

  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <div>
        <strong>Trennlabor: Kies + Sand + Eisen + Salz</strong>
        <p>Wähle Verfahren in beliebiger Reihenfolge. Beobachte nach jedem Versuch, welche Stoffströme wirklich getrennt wurden. Unwirksame Schritte kosten trotzdem Aufwand.</p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {(Object.keys(LABELS) as Step[]).map((step) => <button key={step} type="button" onClick={() => setSteps((old) => [...old, step])}>{LABELS[step]}</button>)}
        <button type="button" onClick={() => setSteps([])}>Neu starten</button>
      </div>
      <div><strong>Deine Kette:</strong> {steps.length ? steps.map((s) => LABELS[s]).join(' → ') : 'noch kein Schritt'}</div>
      <div style={{ display: 'grid', gap: 8 }}>
        {streams.map((stream, index) => (
          <div key={`${stream.label}-${index}`} style={{ border: '1px solid currentColor', borderRadius: 8, padding: 10 }}>
            <strong>{stream.label}</strong>: {stream.materials.join(' + ')}{stream.water ? ' in/mit Wasser' : ''}
          </div>
        ))}
      </div>
      <div><strong>Modellaufwand:</strong> Energie {energy} Punkte · Wasser {water} Einheiten</div>
      <div>{complete ? '✓ Alle vier Bestandteile liegen als getrennte, wasserfreie Stoffströme vor. Jetzt kannst du versuchen, dieselbe Trennung mit weniger Aufwand zu erreichen.' : 'Noch nicht vollständig getrennt. Prüfe, welche Eigenschaft du als Nächstes ausnutzen kannst.'}</div>
      <small>Didaktisches Modell: Reale Aufbereitung benötigt stoff- und anlagenspezifische Messwerte, Verluste, Rückgewinnung, Wasserführung und Sicherheitsbetrachtungen.</small>
    </div>
  );
}
