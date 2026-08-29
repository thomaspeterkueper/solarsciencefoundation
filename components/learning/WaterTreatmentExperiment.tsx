'use client';

import { useMemo, useState } from 'react';

type Contaminant = 'particles' | 'organics' | 'microbes' | 'salts';
type Step = 'settling' | 'filter' | 'carbon' | 'disinfection' | 'ro' | 'distillation';

type Scenario = {
  label: string;
  initial: Contaminant[];
  hint: string;
};

const scenarios: Record<string, Scenario> = {
  river: {
    label: 'Trübes Flusswasser',
    initial: ['particles', 'organics', 'microbes'],
    hint: 'Viele Schwebstoffe, mögliche organische Spuren und Mikroorganismen.',
  },
  brine: {
    label: 'Salzhaltiges Marswasser',
    initial: ['particles', 'salts'],
    hint: 'Partikel plus gelöste Salze: Ein normaler Filter allein reicht nicht.',
  },
  recycle: {
    label: 'Recyclingwasser',
    initial: ['organics', 'microbes', 'salts'],
    hint: 'Unsichtbare Belastungen dominieren. Plane mehrere Barrieren.',
  },
};

const labels: Record<Contaminant, string> = {
  particles: 'Schwebstoffe',
  organics: 'organische Spuren',
  microbes: 'Mikroorganismen',
  salts: 'gelöste Salze',
};

const steps: { id: Step; label: string; removes: Contaminant[]; energy: number }[] = [
  { id: 'settling', label: 'Sedimentation', removes: ['particles'], energy: 1 },
  { id: 'filter', label: 'Mechanische Filtration', removes: ['particles'], energy: 2 },
  { id: 'carbon', label: 'Aktivkohle / Adsorption', removes: ['organics'], energy: 2 },
  { id: 'disinfection', label: 'Desinfektion', removes: ['microbes'], energy: 2 },
  { id: 'ro', label: 'Umkehrosmose', removes: ['salts', 'microbes'], energy: 5 },
  { id: 'distillation', label: 'Destillation', removes: ['salts', 'microbes'], energy: 8 },
];

export default function WaterTreatmentExperiment() {
  const [scenarioKey, setScenarioKey] = useState('river');
  const [chain, setChain] = useState<Step[]>([]);
  const scenario = scenarios[scenarioKey];

  const result = useMemo(() => {
    let remaining = [...scenario.initial];
    let energy = 0;
    for (const id of chain) {
      const step = steps.find((candidate) => candidate.id === id)!;
      remaining = remaining.filter((item) => !step.removes.includes(item));
      energy += step.energy;
    }
    return { remaining, energy };
  }, [chain, scenario]);

  function addStep(id: Step) {
    setChain((current) => [...current, id]);
  }

  function chooseScenario(key: string) {
    setScenarioKey(key);
    setChain([]);
  }

  const solved = result.remaining.length === 0;

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <div>
        <strong>Rohwasser wählen</strong>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', marginTop: '.5rem' }}>
          {Object.entries(scenarios).map(([key, item]) => (
            <button key={key} type="button" onClick={() => chooseScenario(key)} disabled={key === scenarioKey}>
              {item.label}
            </button>
          ))}
        </div>
        <p>{scenario.hint}</p>
      </div>

      <div>
        <strong>Aktuelle Belastung</strong>
        <p>{result.remaining.length ? result.remaining.map((item) => labels[item]).join(', ') : 'keine der modellierten Belastungen mehr'}</p>
      </div>

      <div>
        <strong>Nächsten Behandlungsschritt ausprobieren</strong>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', marginTop: '.5rem' }}>
          {steps.map((step) => (
            <button key={step.id} type="button" onClick={() => addStep(step.id)}>
              {step.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <strong>Deine Prozesskette</strong>
        <p>{chain.length ? chain.map((id) => steps.find((step) => step.id === id)?.label).join(' → ') : 'Noch kein Schritt gewählt.'}</p>
        <p>Modellierter Energieaufwand: {result.energy} Punkte</p>
        {solved ? (
          <p><strong>Die modellierten Belastungen sind behandelt.</strong> Jetzt kannst du versuchen, dieselbe Aufgabe mit weniger Energie oder weniger Prozessschritten zu lösen.</p>
        ) : (
          <p>Noch nicht fertig. Beobachte, welche Belastung übrig bleibt, und wähle gezielt den nächsten Schritt.</p>
        )}
        <button type="button" onClick={() => setChain([])}>Neu versuchen</button>
      </div>

      <p style={{ fontSize: '.9rem' }}>
        Lernmodell: Reale Anlagen benötigen Messwerte, konkrete Auslegung und häufig zusätzliche Prozessschritte. Hier geht es darum, das Trennprinzip hinter einer Behandlungskette zu verstehen.
      </p>
    </div>
  );
}
