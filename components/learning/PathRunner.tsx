'use client';

/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:     components/learning/PathRunner.tsx
 * Name:     PathRunner — renders a LearningPath inline within the SSF shell
 * Version:  1.3.1
 * Created:  2026-07-15
 */

import { useState, useCallback } from 'react';
import type { LearningPath, LearningPathUnit, LearningPathSection } from '../../lib/learningPaths';
import styles from './PathRunner.module.css';
import GovernedQuizSection from './GovernedQuizSection';

import RayleighExperiment from './RayleighExperiment';
import LGSExperiment from './LGSExperiment';
import SunsetExperiment from './SunsetExperiment';
import VectorExperiment from './VectorExperiment';
import DensityErrorExperiment from './DensityErrorExperiment';
import FourierExperiment from './FourierExperiment';
import ThermalExpansionExperiment from './ThermalExpansionExperiment';
import StressExperiment from './StressExperiment';
import HookeExperiment from './HookeExperiment';
import PoissonExperiment from './PoissonExperiment';
import WheatstoneExperiment from './WheatstoneExperiment';
import DiodeExperiment from './DiodeExperiment';
import SeriesExperiment from './SeriesExperiment';
import TorqueExperiment from './TorqueExperiment';
import ScalarExperiment from './ScalarExperiment';
import CoolingExperiment from './CoolingExperiment';
import CupResonanceExperiment from './CupResonanceExperiment';
import KaramellTempExperiment from './KaramellTempExperiment';
import ZuckerartenExperiment from './ZuckerartenExperiment';
import KaramellSimulatorExperiment from './KaramellSimulatorExperiment';
import WaterMoleculeExperiment from './WaterMoleculeExperiment';
import HeatingCurveExperiment from './HeatingCurveExperiment';
import DensityAnomalyExperiment from './DensityAnomalyExperiment';
import DewPointExperiment from './DewPointExperiment';
import WaterHeatCapacityExperiment from './WaterHeatCapacityExperiment';
import PhaseDiagramExperiment from './PhaseDiagramExperiment';
import EvaporationExperiment from './EvaporationExperiment';
import CapillaryExperiment from './CapillaryExperiment';
import HydrationExperiment from './HydrationExperiment';
import PipeFreezingExperiment from './PipeFreezingExperiment';
import FourStrokeExperiment from './FourStrokeExperiment';
import BrakeEnergyExperiment from './BrakeEnergyExperiment';
import CombustionExperiment from './CombustionExperiment';
import EmulsionExperiment from './EmulsionExperiment';
import CollagenExperiment from './CollagenExperiment';
import MicelleExperiment from './MicelleExperiment';
import BatteryExperiment from './BatteryExperiment';
import PumpExperiment from './PumpExperiment';
import MaterialMatrixExperiment from './MaterialMatrixExperiment';
import SpinExperiment from './SpinExperiment';
import ElectromagnetExperiment from './ElectromagnetExperiment';
import DustGrainExperiment from './DustGrainExperiment';
import EarlyEarthExperiment from './EarlyEarthExperiment';
import MillerUreyExperiment from './MillerUreyExperiment';
import OriginOfLifeTimeline from './OriginOfLifeTimeline';
import PiezoExperiment from './PiezoExperiment';
import PiezoMaterialExperiment from './PiezoMaterialExperiment';
import EnergyHarvestingExperiment from './EnergyHarvestingExperiment';
import CriticalMaterialsExperiment from './CriticalMaterialsExperiment';
import ElectrolyzerExperiment from './ElectrolyzerExperiment';
import MaterialsDashboardExperiment from './MaterialsDashboardExperiment';
import DifferentialExperiment from './DifferentialExperiment';
import CoulombQuizExperiment from './CoulombQuizExperiment';
import SpectralAnalysisExperiment from './SpectralAnalysisExperiment';
import RotweinExperiment from './RotweinExperiment';
import SpiralExperiment from './SpiralExperiment';
import ColonyExperiment from './ColonyExperiment';
import HohmannExperiment from './HohmannExperiment';
import KreditExperiment from './KreditExperiment';
import StationExperiment from './StationExperiment';
import WaterTreatmentExperiment from './WaterTreatmentExperiment';
import ResourceSeparationExperiment from './ResourceSeparationExperiment';

const EXPERIMENT_MAP: Record<string, React.ComponentType> = {
  'EXP:RAYLEIGH': RayleighExperiment,
  'EXP:ATMOSPHAERE-PFAD': SunsetExperiment,
  'EXP:WEGLAENGE': SunsetExperiment,
  'EXP:LGS-GRAFISCH': LGSExperiment,
  'EXP:VEC-RECHNER': VectorExperiment,
  'EXP:SKALAR': ScalarExperiment,
  'EXP:DREHMOMENT': TorqueExperiment,
  'EXP:KUGELDICHTE': DensityErrorExperiment,
  'EXP:FOURIER': FourierExperiment,
  'EXP:REIHE': SeriesExperiment,
  'EXP:DEHNUNG-WAERME': ThermalExpansionExperiment,
  'EXP:SPANNUNG': StressExperiment,
  'EXP:HOOKE': HookeExperiment,
  'EXP:QUERKONTRAKTION': PoissonExperiment,
  'EXP:BRUECKE': WheatstoneExperiment,
  'EXP:KENNLINIE': DiodeExperiment,
  'EXP:KAFFEETASSE': CupResonanceExperiment,
  'EXP:WELLENMISCHER': FourierExperiment,
  'EXP:KARAMELL-TEMP': KaramellTempExperiment,
  'EXP:ZUCKERARTEN': ZuckerartenExperiment,
  'EXP:KARAMELL-SIMULATION': KaramellSimulatorExperiment,
  'EXP:WASSER-MOLEKUEL': WaterMoleculeExperiment,
  'EXP:ERWAERMUNGSKURVE': HeatingCurveExperiment,
  'EXP:DICHTE-KURVE': DensityAnomalyExperiment,
  'EXP:TAUPUNKT': DewPointExperiment,
  'EXP:WAERMEKAPAZITAET': WaterHeatCapacityExperiment,
  'EXP:PHASENDIAGRAMM': PhaseDiagramExperiment,
  'EXP:VERDUNSTUNG-RATE': EvaporationExperiment,
  'EXP:KAPILLAR': CapillaryExperiment,
  'EXP:HYDRATATION': HydrationExperiment,
  'EXP:ROHR-SPRENGUNG': PipeFreezingExperiment,
  'EXP:VIERTAKT': FourStrokeExperiment,
  'EXP:KOLBEN-KURBEL': FourStrokeExperiment,
  'EXP:KOLBEN-DRUCK': FourStrokeExperiment,
  'EXP:BREMSENERGIE': BrakeEnergyExperiment,
  'EXP:REIBUNG-WAERME': BrakeEnergyExperiment,
  'EXP:VERBRENNUNG-CHEMIE': CombustionExperiment,
  'EXP:VERBRENNUNG-TEMP': CombustionExperiment,
  'EXP:KATALYSATOR': CombustionExperiment,
  'EXP:BATTERIE-LADEN-ENTLADEN': BatteryExperiment,
  'EXP:BATTERIE-WAERMEENTWICKLUNG': BatteryExperiment,
  'EXP:BATTERIE-INNENWIDERSTAND': BatteryExperiment,
  'EXP:EMULSION-TRENNUNG': EmulsionExperiment,
  'EXP:EMULGATOR-WIRKUNG': EmulsionExperiment,
  'EXP:OEL-WASSER': EmulsionExperiment,
  'EXP:LECITHIN': EmulsionExperiment,
  'EXP:KOLLAGEN-TEMP': CollagenExperiment,
  'EXP:GELATINE-BILDUNG': CollagenExperiment,
  'EXP:FLEISCH-SIMULATION': CollagenExperiment,
  'EXP:MIZELLE': MicelleExperiment,
  'EXP:TENSID-MOLEKUEL': MicelleExperiment,
  'EXP:KOLBENPUMPE-SIMULATION': PumpExperiment,
  'EXP:UNTERDRUCK-SAUGEN': PumpExperiment,
  'EXP:SAUGHOEHE': PumpExperiment,
  'EXP:MATERIAL-MATRIX': MaterialMatrixExperiment,
  'EXP:POLARITAET': SpinExperiment,
  'EXP:DRAHT': ElectromagnetExperiment,
  'EXP:DAMPFDRUCK-TEMP': DustGrainExperiment,
  'EXP:KLIMA-EFFEKT': EarlyEarthExperiment,
  'EXP:MILLER-UREY': MillerUreyExperiment,
  'EXP:OSMOSE': OriginOfLifeTimeline,
  'EXP:FUNKE': PiezoExperiment,
  'EXP:DMS-WIDERSTAND': PiezoExperiment,
  'EXP:HAERTE': PiezoMaterialExperiment,
  'EXP:MOHS': PiezoMaterialExperiment,
  'EXP:WIRKUNGSGRAD': EnergyHarvestingExperiment,
  'EXP:OXIDATION': CriticalMaterialsExperiment,
  'EXP:NEUTRALISATION': CriticalMaterialsExperiment,
  'EXP:BATTERIE-ALTERUNG': ElectrolyzerExperiment,
  'EXP:BATTERIE-MANAGEMENT': ElectrolyzerExperiment,
  'EXP:SCHNELLLADEN-SIMULATION': MaterialsDashboardExperiment,
  'EXP:BESCHLEUNIGUNG-VERGLEICH': MaterialsDashboardExperiment,
  'EXP:ARBEITSPUNKT': DiodeExperiment,
  'EXP:ASPEKT': PiezoMaterialExperiment,
  'EXP:AUSWERTUNG': DensityErrorExperiment,
  'EXP:BREMSVIBRATION': BrakeEnergyExperiment,
  'EXP:GEWICHT-TRAKTION': BrakeEnergyExperiment,
  'EXP:HAFTUNG-REIBUNG': BrakeEnergyExperiment,
  'EXP:KRAFT-DREHZAHL': FourStrokeExperiment,
  'EXP:KUEHLKREISLAUF': CoolingExperiment,
  'EXP:MOTOR-KUEHLKREISLAUF': CoolingExperiment,
  'EXP:MOTOR-VERSCHLEISS': PiezoMaterialExperiment,
  'EXP:VERSCHLEISS-SIMULATION': PiezoMaterialExperiment,
  'EXP:CHLORGAS': CombustionExperiment,
  'EXP:MAYONNAISE-SIMULATION': EmulsionExperiment,
  'EXP:OBERFLSPANNUNG': CapillaryExperiment,
  'EXP:OELEIGENSCHAFTEN': CombustionExperiment,
  'EXP:POLAR-SORTIERER': MicelleExperiment,
  'EXP:POROESITAET': DustGrainExperiment,
  'EXP:QUELLUNG': PipeFreezingExperiment,
  'EXP:WISCHER-TECHNIK': EvaporationExperiment,
  'EXP:ZELLTURGOR': DewPointExperiment,
  'EXP:DRUCK-BLASEN': PhaseDiagramExperiment,
  'EXP:OBERFLAECHE-VOLUMEN': WaterHeatCapacityExperiment,
  'EXP:SCHNELLKOCHTOPF': PhaseDiagramExperiment,
  'EXP:SIEDEPUNKT': PhaseDiagramExperiment,
  'EXP:SIEDEPUNKT-HOEHE': PhaseDiagramExperiment,
  'EXP:VERDUNSTUNG': EvaporationExperiment,
  'EXP:WAERMETRANSPORT': WaterHeatCapacityExperiment,
  'EXP:BUILDER': DensityErrorExperiment,
  'EXP:GAUSS': LGSExperiment,
  'EXP:HBRUECKEN': WheatstoneExperiment,
  'EXP:ROSETTE': HookeExperiment,
  'EXP:PUMPENKENNLINIE': PumpExperiment,
  'EXP:ZENTRIFUGAL-SIMULATION': TorqueExperiment,
  'EXP:SCHALLDAEMPFUNG': FourierExperiment,
  'EXP:COULOMB-QUIZ': CoulombQuizExperiment,
  'EXP:HOHMANN-TRANSFER': HohmannExperiment,
  'EXP:KREDIT-RECHNER': KreditExperiment,
  'EXP:KREDIT-NOXIA': KreditExperiment,
  'EXP:COLONY-STANDORT': ColonyExperiment,
  'EXP:COLONY-LEBENSERHALT': ColonyExperiment,
  'EXP:STATION-ORBIT': StationExperiment,
  'EXP:STATION-ANDOCK': StationExperiment,
  'EXP:POLARKURVEN': SpiralExperiment,
  'EXP:SCHMIEGEKREIS': SpiralExperiment,
  'EXP:DENATURIERUNG': RotweinExperiment,
  'EXP:FLECK-BEHANDLUNG': RotweinExperiment,
  'EXP:ABSORPTIONSLINIEN': SpectralAnalysisExperiment,
  'EXP:LICHTSPEKTRUM': SpectralAnalysisExperiment,
  'EXP:SOLAR-SYSTEM': SpectralAnalysisExperiment,
  'EXP:DIFFERENTIAL-MECHANIK': DifferentialExperiment,
  'EXP:DIFFERENTIAL-SIMULATION': DifferentialExperiment,
  'EXP:DIFFERENTIAL-VERGLEICH': DifferentialExperiment,
  'EXP:NOX-WATER-FILTER': WaterTreatmentExperiment,
  'EXP:NOX-WATER-DESTILLATION': WaterTreatmentExperiment,
  'EXP:NOX-WATER-CHAIN': WaterTreatmentExperiment,
  'EXP:NOX-RESOURCE-CHAIN': ResourceSeparationExperiment,
};

function depthDisplay(raw: number) {
  const d = Math.round(100 * (1 - 1 / (1 + raw / 26)));
  const labels: [number, string][] = [
    [10, 'Beginn'], [22, 'Einstieg'], [38, 'Orientierung'],
    [52, 'Grundlagen'], [65, 'Mechanismus'], [76, 'Theorie'],
    [87, 'Forschungsnähe'], [100, 'Forschungsrand'],
  ];
  const label = [...labels].reverse().find(([t]) => d >= t)?.[1] ?? 'Beginn';
  return { d, label };
}

function SectionCard({ section, onQuizComplete, onDepth }: {
  section: LearningPathSection;
  onQuizComplete: () => void;
  onDepth: (pts: number) => void;
}) {
  const [branchOpen, setBranchOpen] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const ExperimentComponent = EXPERIMENT_MAP[section.interactiveId ?? section.id];
  const [depthAwarded, setDepthAwarded] = useState(false);

  function awardOnce() {
    if (section.kind === 'quiz') return;
    if (!depthAwarded && section.depthPoints) {
      onDepth(section.depthPoints);
      setDepthAwarded(true);
    }
  }

  const kindLabel: Record<string, string> = {
    observation: 'Beobachtung', explanation: 'Erklärung', experiment: 'Experiment',
    exercise: 'Aufgabe', quiz: 'Quiz', branch: 'Seitenast', example: 'Beispiel',
  };

  if (section.kind === 'branch') {
    return (
      <div className={styles.branch}>
        <div className={styles.branchHeader}>
          <span className={styles.kindBadge} style={{ color: 'var(--gold-2)' }}>Seitenast — optional</span>
          <strong className={styles.sectionTitle}>{section.title}</strong>
          <p className={styles.sectionSummary}>{section.summary}</p>
        </div>
        {!branchOpen && <button className={styles.branchBtn} onClick={() => { setBranchOpen(true); awardOnce(); }}>Erkunden →</button>}
        {branchOpen && <p className={styles.branchContent}>{section.summary}</p>}
      </div>
    );
  }

  if (section.optional && skipped) return null;

  return (
    <div className={[styles.sectionCard, section.kind === 'observation' ? styles.observation : '', section.kind === 'experiment' ? styles.experimentCard : '', section.kind === 'quiz' ? styles.quiz : ''].join(' ')} onMouseEnter={section.kind === 'quiz' ? undefined : awardOnce}>
      <strong className={styles.sectionTitle}>{section.title}</strong>
      {section.kind === 'observation' && <p className={styles.observationText}>{section.summary}</p>}
      {section.kind !== 'observation' && section.kind !== 'quiz' && section.kind !== 'experiment' && <p className={styles.sectionSummary}>{section.summary}</p>}

      {ExperimentComponent && <div className={styles.experimentWrap}><ExperimentComponent /></div>}
      {section.interactive && !ExperimentComponent && (
        <div className={styles.experimentPlaceholder}>
          <p className={styles.placeholderText}>Interaktives Experiment — wird gerade portiert.</p>
          <a href={`/prototypes/ssf-${section.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}.html`} className={styles.protoLink} target="_blank" rel="noopener noreferrer">Im Prototyp öffnen →</a>
        </div>
      )}

      {section.kind === 'quiz' && <GovernedQuizSection section={section} onComplete={onQuizComplete} onDepth={onDepth} />}

      <div className={styles.sectionMeta}>
        <span className={styles.kindBadge}>{kindLabel[section.kind] ?? section.kind}</span>
        {section.optional && <button className={styles.skipBtn} onClick={() => setSkipped(true)}>überspringen</button>}
        {section.interactive && !ExperimentComponent && <span className={styles.interactiveBadge}>interaktiv</span>}
      </div>
    </div>
  );
}

function UnitBlock({ unit, index, unlocked, isLast, onUnlock, onPathComplete, onDepth }: {
  unit: LearningPathUnit;
  index: number;
  unlocked: boolean;
  isLast: boolean;
  onUnlock: () => void;
  onPathComplete: () => void;
  onDepth: (pts: number) => void;
}) {
  const [quizDone, setQuizDone] = useState(false);

  if (!unlocked) {
    return (
      <div className={styles.unitLocked}>
        <div style={{ flex: 1 }}>
          <p className={styles.unitIndex} style={{ opacity: 0.5 }}>Kapitel {index + 1} — Vorschau</p>
          {unit.entryQuestion && <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(17px, 2.5vw, 22px)', color: 'var(--ink)', opacity: 0.45, lineHeight: 1.3, margin: '6px 0 0' }}>{unit.entryQuestion}</p>}
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', marginTop: 10, letterSpacing: '.05em' }}>→ Schließe Kapitel {index} ab um dieses Kapitel freizuschalten.</p>
        </div>
      </div>
    );
  }

  function handleQuizComplete() {
    if (quizDone) return;
    setQuizDone(true);
    if (isLast) onPathComplete();
    else onUnlock();
  }

  return (
    <section className={styles.unit}>
      <div className={styles.unitHeader}>
        <p className={styles.unitIndex}>Kapitel {index + 1}</p>
        {unit.entryQuestion && <h2 className={styles.unitQuestion}>{unit.entryQuestion}</h2>}
      </div>
      <div className={styles.sections}>
        {unit.sections.map((section) => <SectionCard key={section.id} section={section} onQuizComplete={handleQuizComplete} onDepth={onDepth} />)}
      </div>
      {quizDone && unit.takeaway && <div className={styles.takeaway}><span className={styles.takeawayLabel}>✓ Erkenntnis</span><p className={styles.takeawayText}>{unit.takeaway}</p></div>}
    </section>
  );
}

export default function PathRunner({ path, noxiaUid: _noxiaUid }: { path: LearningPath; noxiaUid?: string }) {
  const [depthRaw, setDepthRaw] = useState(0);
  const [unlockedCount, setUnlockedCount] = useState(1);
  const [pathComplete, setPathComplete] = useState(false);

  const addDepth = useCallback((pts: number) => setDepthRaw((prev) => prev + pts), []);
  const unlock = useCallback(() => setUnlockedCount((prev) => Math.min(prev + 1, path.units.length)), [path.units.length]);
  const completePath = useCallback(() => setPathComplete(true), []);
  const { d, label } = depthDisplay(depthRaw);

  return (
    <div className={styles.runner}>
      <div className={styles.depthBar}>
        <span className={styles.depthLabel}>Tiefe</span>
        <div className={styles.depthTrack}><div className={styles.depthFill} style={{ width: `${d}%` }} /></div>
        <span className={styles.depthVal}>{d}</span><span className={styles.depthNote}>— {label}</span>
      </div>
      <div className={styles.units}>
        {path.units.map((unit, i) => <UnitBlock key={unit.id} unit={unit} index={i} unlocked={i < unlockedCount} isLast={i === path.units.length - 1} onUnlock={unlock} onPathComplete={completePath} onDepth={addDepth} />)}
      </div>
      {pathComplete && (
        <div className={styles.completion}>
          <h3 className={styles.compTitle}>Lernpfad abgeschlossen</h3>
          <p className={styles.compSub}>Lerntiefe: {d} — {label}</p>
          {path.unlocks.length > 0 && <div className={styles.compKeys}>{path.unlocks.map((key) => <span key={key} className={styles.compKey}>{key}</span>)}</div>}
        </div>
      )}
    </div>
  );
}
