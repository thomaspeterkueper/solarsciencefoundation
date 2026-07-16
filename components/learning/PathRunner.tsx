'use client';

/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:     components/learning/PathRunner.tsx
 * Name:     PathRunner — renders a LearningPath inline within the SSF shell
 * Version:  0.3.0
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

  const placeholder = {
    question: section.summary,
    options: ['Richtig — ich verstehe das Prinzip.', 'Ich brauche noch eine Erklärung.'],
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
        <p className={styles.quizFeedback}>Schau noch einmal in die Erklärung oben.</p>
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
        section.kind === 'quiz' ? styles.quiz : '',
      ].join(' ')}
      onMouseEnter={awardOnce}
    >
      <div className={styles.sectionMeta}>
        <span className={styles.kindBadge}>{kindLabel[section.kind] ?? section.kind}</span>
        {section.optional && (
          <button className={styles.skipBtn} onClick={() => setSkipped(true)}>überspringen</button>
        )}
        {section.interactive && (
          <span className={styles.interactiveBadge}>interaktiv</span>
        )}
      </div>

      <strong className={styles.sectionTitle}>{section.title}</strong>

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
        <div className={styles.lockIcon}>🔒</div>
        <p className={styles.lockText}>
          Schließe Kapitel {index} ab um weiterzugehen.
        </p>
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
      <div className={styles.unitHeader}>
        <p className={styles.unitIndex}>Kapitel {index + 1}</p>
        {unit.entryQuestion && (
          <h2 className={styles.unitQuestion}>{unit.entryQuestion}</h2>
        )}
      </div>
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
          <span className={styles.takeawayLabel}>Erkenntnis</span>
          <p className={styles.takeawayText}>{unit.takeaway}</p>
        </div>
      )}
    </section>
  );
}

// ── PathRunner (main export) ──────────────────────────────
export default function PathRunner({ path }: { path: LearningPath }) {
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
