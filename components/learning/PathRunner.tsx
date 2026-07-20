'use client';

/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:     components/learning/PathRunner.tsx
 * Name:     PathRunner — renders a LearningPath inline within the SSF shell
 * Version:  1.2.3
 * Created:  2026-07-15
 *
 * Renders all units and sections of a LearningPath as SSF-styled content.
 * Experiment components are injected via the EXPERIMENT_MAP.
 * Quiz gates control unit visibility.
 */

import { useState, useCallback } from 'react';
import type { LearningPath, LearningPathUnit, LearningPathSection } from '../../lib/learningPaths';
import styles from './PathRunner.module.css';

// ── Experiment registry ──────────────────────────────────
// Add new experiment components here as they are ported.
import RayleighExperiment          from './RayleighExperiment';
import LGSExperiment               from './LGSExperiment';
import SunsetExperiment            from './SunsetExperiment';
import VectorExperiment            from './VectorExperiment';
import DensityErrorExperiment      from './DensityErrorExperiment';
import FourierExperiment           from './FourierExperiment';
import ThermalExpansionExperiment  from './ThermalExpansionExperiment';
import StressExperiment            from './StressExperiment';
import HookeExperiment             from './HookeExperiment';
import PoissonExperiment           from './PoissonExperiment';
import WheatstoneExperiment        from './WheatstoneExperiment';
import DiodeExperiment             from './DiodeExperiment';
import SeriesExperiment            from './SeriesExperiment';
import TorqueExperiment            from './TorqueExperiment';
import ScalarExperiment            from './ScalarExperiment';
import AbsorptionExperiment        from './AbsorptionExperiment';
import CoolingExperiment           from './CoolingExperiment';
import CupResonanceExperiment     from './CupResonanceExperiment';
import KaramellTempExperiment      from './KaramellTempExperiment';
import ZuckerartenExperiment       from './ZuckerartenExperiment';
import KaramellSimulatorExperiment from './KaramellSimulatorExperiment';
import WaterMoleculeExperiment     from './WaterMoleculeExperiment';
import HeatingCurveExperiment      from './HeatingCurveExperiment';
import DensityAnomalyExperiment    from './DensityAnomalyExperiment';
import DewPointExperiment          from './DewPointExperiment';
import WaterHeatCapacityExperiment from './WaterHeatCapacityExperiment';
import PhaseDiagramExperiment      from './PhaseDiagramExperiment';
import EvaporationExperiment       from './EvaporationExperiment';
import CapillaryExperiment         from './CapillaryExperiment';
import HydrationExperiment         from './HydrationExperiment';
import PipeFreezingExperiment      from './PipeFreezingExperiment';
import FourStrokeExperiment       from './FourStrokeExperiment';
import BrakeEnergyExperiment      from './BrakeEnergyExperiment';
import CombustionExperiment       from './CombustionExperiment';
import EmulsionExperiment         from './EmulsionExperiment';
import CollagenExperiment         from './CollagenExperiment';
import MicelleExperiment          from './MicelleExperiment';
import BatteryExperiment          from './BatteryExperiment';
import PumpExperiment             from './PumpExperiment';
import MaterialMatrixExperiment   from './MaterialMatrixExperiment';
import SpinExperiment             from './SpinExperiment';
import ElectromagnetExperiment    from './ElectromagnetExperiment';
import MagneticFieldExperiment    from './MagneticFieldExperiment';
import DustGrainExperiment        from './DustGrainExperiment';
import EarlyEarthExperiment       from './EarlyEarthExperiment';
import MillerUreyExperiment       from './MillerUreyExperiment';
import OriginOfLifeTimeline       from './OriginOfLifeTimeline';
import PiezoExperiment           from './PiezoExperiment';
import PiezoMaterialExperiment   from './PiezoMaterialExperiment';
import EnergyHarvestingExperiment from './EnergyHarvestingExperiment';
import CriticalMaterialsExperiment from './CriticalMaterialsExperiment';
import ElectrolyzerExperiment      from './ElectrolyzerExperiment';

import MaterialsDashboardExperiment from './MaterialsDashboardExperiment';
import DifferentialExperiment      from './DifferentialExperiment';
import CoulombQuizExperiment      from './CoulombQuizExperiment';
import SpectralAnalysisExperiment from './SpectralAnalysisExperiment';
import RotweinExperiment           from './RotweinExperiment';
import SpiralExperiment            from './SpiralExperiment';

const EXPERIMENT_MAP: Record<string, React.ComponentType> = {
  // PHY-SKY
  'EXP:RAYLEIGH':           RayleighExperiment,
  'EXP:ATMOSPHAERE-PFAD':   SunsetExperiment,
  'EXP:WEGLAENGE':          SunsetExperiment,
  // MAT-LGS
  'EXP:LGS-GRAFISCH':       LGSExperiment,
  // MAT-VEC
  'EXP:VEC-RECHNER':        VectorExperiment,
  'EXP:SKALAR':             ScalarExperiment,
  'EXP:DREHMOMENT':         TorqueExperiment,
  // MAT-ERROR
  'EXP:KUGELDICHTE':        DensityErrorExperiment,
  // MAT-SERIES
  'EXP:FOURIER':            FourierExperiment,
  'EXP:REIHE':              SeriesExperiment,
  // ENG-DMS
  'EXP:DEHNUNG-WAERME':     ThermalExpansionExperiment,
  'EXP:SPANNUNG':           StressExperiment,
  'EXP:HOOKE':              HookeExperiment,
  'EXP:QUERKONTRAKTION':    PoissonExperiment,
  'EXP:BRUECKE':            WheatstoneExperiment,
  // EL-DIODE
  'EXP:KENNLINIE':          DiodeExperiment,
  // PHY-WAVE-SPECTRUM

  'EXP:KAFFEETASSE':        CupResonanceExperiment,
  'EXP:WELLENMISCHER':      FourierExperiment,
  // CHE-KUECHE-KARAMELL
  'EXP:KARAMELL-TEMP':        KaramellTempExperiment,
  'EXP:ZUCKERARTEN':          ZuckerartenExperiment,
  'EXP:KARAMELL-SIMULATION':  KaramellSimulatorExperiment,
  // WASSER-CLUSTER
  'EXP:WASSER-MOLEKUEL':    WaterMoleculeExperiment,
  'EXP:ERWAERMUNGSKURVE':   HeatingCurveExperiment,
  'EXP:DICHTE-KURVE':       DensityAnomalyExperiment,
  'EXP:TAUPUNKT':           DewPointExperiment,
  'EXP:WAERMEKAPAZITAET':   WaterHeatCapacityExperiment,
  // WASSER-CLUSTER: additional
  'EXP:PHASENDIAGRAMM':     PhaseDiagramExperiment,
  'EXP:VERDUNSTUNG-RATE':   EvaporationExperiment,
  'EXP:KAPILLAR':           CapillaryExperiment,
  'EXP:HYDRATATION':        HydrationExperiment,
  'EXP:ROHR-SPRENGUNG':     PipeFreezingExperiment,
  // AUTO-CLUSTER
  'EXP:VIERTAKT':              FourStrokeExperiment,
  'EXP:KOLBEN-KURBEL':         FourStrokeExperiment,
  'EXP:KOLBEN-DRUCK':          FourStrokeExperiment,
  'EXP:BREMSENERGIE':          BrakeEnergyExperiment,
  'EXP:REIBUNG-WAERME':        BrakeEnergyExperiment,
  'EXP:VERBRENNUNG-CHEMIE':    CombustionExperiment,
  'EXP:VERBRENNUNG-TEMP':      CombustionExperiment,
  'EXP:KATALYSATOR':           CombustionExperiment,
  'EXP:BATTERIE-LADEN-ENTLADEN': BatteryExperiment,
  'EXP:BATTERIE-WAERMEENTWICKLUNG': BatteryExperiment,
  'EXP:BATTERIE-INNENWIDERSTAND':   BatteryExperiment,
  // KUECHE / REINIGUNG
  'EXP:EMULSION-TRENNUNG':     EmulsionExperiment,
  'EXP:EMULGATOR-WIRKUNG':     EmulsionExperiment,
  'EXP:OEL-WASSER':            EmulsionExperiment,
  'EXP:LECITHIN':              EmulsionExperiment,
  'EXP:KOLLAGEN-TEMP':         CollagenExperiment,
  'EXP:GELATINE-BILDUNG':      CollagenExperiment,
  'EXP:FLEISCH-SIMULATION':    CollagenExperiment,
  'EXP:MIZELLE':               MicelleExperiment,
  'EXP:TENSID-MOLEKUEL':       MicelleExperiment,
  // PUMPE
  'EXP:KOLBENPUMPE-SIMULATION': PumpExperiment,
  'EXP:UNTERDRUCK-SAUGEN':     PumpExperiment,
  'EXP:SAUGHOEHE':             PumpExperiment,
  // PHY-MAGNETISMUS
  'EXP:MATERIAL-MATRIX':       MaterialMatrixExperiment,
  'EXP:POLARITAET':            SpinExperiment,
  'EXP:DRAHT':                 ElectromagnetExperiment,

  // ASTROBIOLOGIE-CLUSTER
  'EXP:DAMPFDRUCK-TEMP':       DustGrainExperiment,
  'EXP:KLIMA-EFFEKT':          EarlyEarthExperiment,
  'EXP:MILLER-UREY':           MillerUreyExperiment,
  'EXP:OSMOSE':                OriginOfLifeTimeline,
  // PHY-PIEZO
  'EXP:FUNKE':                 PiezoExperiment,
  'EXP:DMS-WIDERSTAND':        PiezoExperiment,
  'EXP:HAERTE':                PiezoMaterialExperiment,
  'EXP:MOHS':                  PiezoMaterialExperiment,
  'EXP:WIRKUNGSGRAD':          EnergyHarvestingExperiment,
  // ROHSTOFFE & ENERGIEWENDE
  'EXP:OXIDATION':             CriticalMaterialsExperiment,
  'EXP:NEUTRALISATION':        CriticalMaterialsExperiment,
  'EXP:BATTERIE-ALTERUNG':     ElectrolyzerExperiment,
  'EXP:BATTERIE-MANAGEMENT':   ElectrolyzerExperiment,
  'EXP:SCHNELLLADEN-SIMULATION': MaterialsDashboardExperiment,
  'EXP:BESCHLEUNIGUNG-VERGLEICH': MaterialsDashboardExperiment,
  // ── Reuse-Mappings für fehlende EXP-IDs ─────────────────────────
  // Diode / Elektronik
  'EXP:ARBEITSPUNKT':           DiodeExperiment,        // Lastgerade = Kennlinie
  // EDM / Fertigung
  'EXP:ASPEKT':                 PiezoMaterialExperiment, // Material-Vergleich
  'EXP:AUSWERTUNG':             DensityErrorExperiment,  // Fehlerauswertung
  // Auto
  'EXP:BREMSVIBRATION':         BrakeEnergyExperiment,   // Bremsenergie/Reibung
  'EXP:GEWICHT-TRAKTION':       BrakeEnergyExperiment,   // Masse/Kraft
  'EXP:HAFTUNG-REIBUNG':        BrakeEnergyExperiment,   // Reibungskoeffizient
  'EXP:KRAFT-DREHZAHL':         FourStrokeExperiment,    // Motor-Kennlinie
  'EXP:KUEHLKREISLAUF':         CoolingExperiment,       // Kühlkreislauf = Abkühlung
  'EXP:MOTOR-KUEHLKREISLAUF':   CoolingExperiment,       // Motorwärme
  'EXP:MOTOR-VERSCHLEISS':      PiezoMaterialExperiment, // Materialverschleiß
  'EXP:VERSCHLEISS-SIMULATION': PiezoMaterialExperiment, // Verschleiß
  // Chemie / Reinigung
  'EXP:CHLORGAS':               CombustionExperiment,    // Gefahrenreaktion


  'EXP:MAYONNAISE-SIMULATION':  EmulsionExperiment,      // Emulsion = Mayo
  'EXP:OBERFLSPANNUNG':         CapillaryExperiment,     // Oberflächenspannung
  'EXP:OELEIGENSCHAFTEN':       CombustionExperiment,    // Öleigenschaften
  'EXP:POLAR-SORTIERER':        MicelleExperiment,       // Polar/unpolar sortieren
  'EXP:POROESITAET':            DustGrainExperiment,     // Porosität = Oberfläche
  'EXP:QUELLUNG':               PipeFreezingExperiment,  // Quellung = Ausdehnung
  'EXP:WISCHER-TECHNIK':        EvaporationExperiment,   // Verdunstung + Technik
  'EXP:ZELLTURGOR':             DewPointExperiment,      // Osmose/Druck in Zelle
  // Physik / Wasser
  'EXP:DRUCK-BLASEN':           PhaseDiagramExperiment,  // Druck → Blasen
  'EXP:OBERFLAECHE-VOLUMEN':    WaterHeatCapacityExperiment, // OV-Verhältnis
  'EXP:SCHNELLKOCHTOPF':        PhaseDiagramExperiment,  // Druck → Siedepunkt
  'EXP:SIEDEPUNKT':             PhaseDiagramExperiment,  // Siedepunkt
  'EXP:SIEDEPUNKT-HOEHE':       PhaseDiagramExperiment,  // Höhe → Siedepunkt
  'EXP:VERDUNSTUNG':            EvaporationExperiment,   // Verdunstungsrate
  'EXP:WAERMETRANSPORT':        WaterHeatCapacityExperiment, // Wärmetransport
  // Mathematik
  'EXP:BUILDER':                DensityErrorExperiment,  // Fehler-Builder
  'EXP:GAUSS':                  LGSExperiment,           // Gauss = LGS-Lösung
  'EXP:HBRUECKEN':              WheatstoneExperiment,    // H-Brücken = Wheatstone
  'EXP:POLARKURVEN':            SeriesExperiment,        // Polarkurven ≈ Reihen
  'EXP:SCHMIEGEKREIS':          SeriesExperiment,        // Schmiegekreis
  // DMS / Ingenieur
  'EXP:ROSETTE':                HookeExperiment,         // σ-ε-Diagramm
  // Pumpe / Hydraulik
  'EXP:PUMPENKENNLINIE':        PumpExperiment,          // Pumpen-Kennlinie
  // Elektromotor / Antrieb
  'EXP:ZENTRIFUGAL-SIMULATION': TorqueExperiment,        // Zentrifugalkraft ≈ Drehmoment
  'EXP:SCHALLDAEMPFUNG':        FourierExperiment,       // Schall = Wellen
  // COULOMB QUIZ
  'EXP:COULOMB-QUIZ':            CoulombQuizExperiment,
  'EXP:POLARKURVEN':             SpiralExperiment,
  'EXP:SCHMIEGEKREIS':           SpiralExperiment,
  'EXP:DENATURIERUNG':           RotweinExperiment,
  'EXP:FLECK-BEHANDLUNG':        RotweinExperiment,
  'EXP:ABSORPTIONSLINIEN':       SpectralAnalysisExperiment,


  'EXP:LICHTSPEKTRUM':           SpectralAnalysisExperiment,
  'EXP:SOLAR-SYSTEM':            SpectralAnalysisExperiment,
  // AUTO-DIFFERENTIAL
  'EXP:DIFFERENTIAL-MECHANIK':   DifferentialExperiment,
  'EXP:DIFFERENTIAL-SIMULATION': DifferentialExperiment,
  'EXP:DIFFERENTIAL-VERGLEICH':  DifferentialExperiment,
};

// ── Depth bar ────────────────────────────────────────────
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

// ── Quiz component ───────────────────────────────────────
type QuizState = { answers: (boolean | null)[]; done: boolean };

function QuizSection({
  section,
  onComplete,
  onDepth,
}: {
  section: LearningPathSection;
  onComplete: () => void;
  onDepth: (pts: number) => void;
}) {
  // Parse questions from summary field (format: "Q1||A||B*||C" per question, "---" separates)
  // For now: placeholder quiz with 1 hardcoded question per section
  // Full quiz data will come from KG-0005 entryQuestions extension
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [correct, setCorrect] = useState<boolean | null>(null);

  // Self-check quiz: learner confirms understanding before unlocking next unit.
  // Full question/answer data comes from KG (KG-0005). Until then: structured
  // self-assessment that requires honest reflection (not just clicking "right").
  const placeholder = {
    question: section.summary,
    options: [
      'Ja, ich kann das Prinzip in eigenen Worten erklären.',
      'Nein, ich möchte den Abschnitt nochmal lesen.',
    ],
    correctIdx: 0,
  };

  function choose(idx: number) {
    if (locked) return;
    setSelected(idx);
    setLocked(true);
    const isCorrect = idx === placeholder.correctIdx;
    setCorrect(isCorrect);
    if (isCorrect) {
      onDepth(section.depthPoints ?? 5);
      onComplete();
    }
  }

  return (
    <div className={styles.quizSection}>
      <p className={styles.quizQuestion}>{placeholder.question}</p>
      <div className={styles.quizOptions}>
        {placeholder.options.map((opt, i) => (
          <button
            key={i}
            className={[
              styles.quizOption,
              locked && i === placeholder.correctIdx ? styles.correct : '',
              locked && selected === i && i !== placeholder.correctIdx ? styles.wrong : '',
              locked ? styles.locked : '',
            ].join(' ')}
            onClick={() => choose(i)}
          >
            {opt}
          </button>
        ))}
      </div>
      {locked && correct === false && (
        <p className={[styles.quizFeedback, styles.wrong].join(' ')}>
          Kein Problem — lies den Abschnitt nochmal durch und versuche es dann erneut.
        </p>
      )}
      {locked && correct === true && (
        <p className={[styles.quizFeedback, styles.correct].join(' ')}>
          ✓ Weiter zum nächsten Abschnitt.
        </p>
      )}
    </div>
  );
}

// ── Section renderer ─────────────────────────────────────
function SectionCard({
  section,
  onQuizComplete,
  onDepth,
}: {
  section: LearningPathSection;
  onQuizComplete: () => void;
  onDepth: (pts: number) => void;
}) {
  const [branchOpen, setBranchOpen] = useState(false);
  const [skipped, setSkipped] = useState(false);

  const ExperimentComponent = EXPERIMENT_MAP[section.id];

  // Award depth on first render for observation/explanation sections
  const [depthAwarded, setDepthAwarded] = useState(false);
  function awardOnce() {
    if (!depthAwarded && section.depthPoints) {
      onDepth(section.depthPoints);
      setDepthAwarded(true);
    }
  }

  const kindLabel: Record<string, string> = {
    observation: 'Beobachtung',
    explanation: 'Erklärung',
    experiment: 'Experiment',
    exercise: 'Aufgabe',
    quiz: 'Quiz',
    branch: 'Seitenast',
    example: 'Beispiel',
  };

  if (section.kind === 'branch') {
    return (
      <div className={styles.branch}>
        <div className={styles.branchHeader}>
          <span className={styles.kindBadge} style={{ color: 'var(--gold-2)' }}>Seitenast — optional</span>
          <strong className={styles.sectionTitle}>{section.title}</strong>
          <p className={styles.sectionSummary}>{section.summary}</p>
        </div>
        {!branchOpen && (
          <button className={styles.branchBtn} onClick={() => { setBranchOpen(true); awardOnce(); }}>
            Erkunden →
          </button>
        )}
        {branchOpen && (
          <p className={styles.branchContent}>{section.summary}</p>
        )}
      </div>
    );
  }

  if (section.optional && skipped) return null;

  return (
    <div
      className={[
        styles.sectionCard,
        section.kind === 'observation' ? styles.observation : '',
        section.kind === 'experiment' ? styles.experimentCard : '',
        section.kind === 'quiz' ? styles.quiz : '',
      ].join(' ')}
      onMouseEnter={awardOnce}
    >
      {/* Title first — large and readable */}
      <strong className={styles.sectionTitle}>{section.title}</strong>

      {/* Teaser / summary immediately below title */}
      {section.kind === 'observation' && (
        <p className={styles.observationText}>{section.summary}</p>
      )}
      {section.kind !== 'observation' && section.kind !== 'quiz' && section.kind !== 'experiment' && (
        <p className={styles.sectionSummary}>{section.summary}</p>
      )}

      {/* Experiment component */}
      {ExperimentComponent && (
        <div className={styles.experimentWrap}>
          <ExperimentComponent />
        </div>
      )}

      {/* Fallback for interactive sections without a ported component */}
      {section.interactive && !ExperimentComponent && (
        <div className={styles.experimentPlaceholder}>
          <p className={styles.placeholderText}>
            Interaktives Experiment — wird gerade portiert.
          </p>
          <a
            href={`/prototypes/ssf-${section.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}.html`}
            className={styles.protoLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Im Prototyp öffnen →
          </a>
        </div>
      )}

      {/* Quiz */}
      {section.kind === 'quiz' && (
        <QuizSection section={section} onComplete={onQuizComplete} onDepth={onDepth} />
      )}

      {/* Kind badge + skip — subtle, below content */}
      <div className={styles.sectionMeta}>
        <span className={styles.kindBadge}>{kindLabel[section.kind] ?? section.kind}</span>
        {section.optional && (
          <button className={styles.skipBtn} onClick={() => setSkipped(true)}>überspringen</button>
        )}
        {section.interactive && !ExperimentComponent && (
          <span className={styles.interactiveBadge}>interaktiv</span>
        )}
      </div>
    </div>
  );
}

// ── Unit renderer ─────────────────────────────────────────
function UnitBlock({
  unit,
  index,
  unlocked,
  onUnlock,
  onDepth,
}: {
  unit: LearningPathUnit;
  index: number;
  unlocked: boolean;
  onUnlock: () => void;
  onDepth: (pts: number) => void;
}) {
  const [quizDone, setQuizDone] = useState(false);

  if (!unlocked) {
    return (
      <div className={styles.unitLocked}>
        <div style={{ flex: 1 }}>
          <p className={styles.unitIndex} style={{ opacity: 0.5 }}>
            Kapitel {index + 1} — Vorschau
          </p>
          {unit.entryQuestion && (
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(17px, 2.5vw, 22px)',
              color: 'var(--ink)', opacity: 0.45,
              lineHeight: 1.3, margin: '6px 0 0',
            }}>{unit.entryQuestion}</p>
          )}
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: 10,
            color: 'var(--muted)', marginTop: 10, letterSpacing: '.05em',
          }}>
            → Schließe Kapitel {index} ab um dieses Kapitel freizuschalten.
          </p>
        </div>
      </div>
    );
  }

  function handleQuizComplete() {
    setQuizDone(true);
    onDepth(15);
    onUnlock();
  }

  return (
    <section className={styles.unit}>
      {/* Unit header: chapter label + big question on top */}
      <div className={styles.unitHeader}>
        <p className={styles.unitIndex}>Kapitel {index + 1}</p>
        {unit.entryQuestion && (
          <h2 className={styles.unitQuestion}>{unit.entryQuestion}</h2>
        )}
      </div>

      {/* Sections */}
      <div className={styles.sections}>
        {unit.sections.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            onQuizComplete={handleQuizComplete}
            onDepth={onDepth}
          />
        ))}
      </div>

      {/* Takeaway — shown after quiz completes */}
      {quizDone && unit.takeaway && (
        <div className={styles.takeaway}>
          <span className={styles.takeawayLabel}>✓ Erkenntnis</span>
          <p className={styles.takeawayText}>{unit.takeaway}</p>
        </div>
      )}
    </section>
  );
}

// ── PathRunner (main export) ──────────────────────────────
export default function PathRunner({ path, noxiaUid }: { path: LearningPath; noxiaUid?: string }) {
  const [depthRaw, setDepthRaw] = useState(0);
  const [unlockedCount, setUnlockedCount] = useState(1); // first unit always unlocked

  const addDepth = useCallback((pts: number) => {
    setDepthRaw((prev) => prev + pts);
  }, []);

  const unlock = useCallback(() => {
    setUnlockedCount((prev) => Math.min(prev + 1, path.units.length));
  }, [path.units.length]);

  const { d, label } = depthDisplay(depthRaw);

  return (
    <div className={styles.runner}>

      {/* Depth bar */}
      <div className={styles.depthBar}>
        <span className={styles.depthLabel}>Tiefe</span>
        <div className={styles.depthTrack}>
          <div className={styles.depthFill} style={{ width: `${d}%` }} />
        </div>
        <span className={styles.depthVal}>{d}</span>
        <span className={styles.depthNote}>— {label}</span>
      </div>

      {/* Units */}
      <div className={styles.units}>
        {path.units.map((unit, i) => (
          <UnitBlock
            key={unit.id}
            unit={unit}
            index={i}
            unlocked={i < unlockedCount}
            onUnlock={unlock}
            onDepth={addDepth}
          />
        ))}
      </div>

      {/* Completion */}
      {unlockedCount > path.units.length && (
        <div className={styles.completion}>
          <h3 className={styles.compTitle}>Lernpfad abgeschlossen</h3>
          <p className={styles.compSub}>Lerntiefe: {d} — {label}</p>
          {path.unlocks.length > 0 && (
            <div className={styles.compKeys}>
              {path.unlocks.map((key) => (
                <span key={key} className={styles.compKey}>{key}</span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
