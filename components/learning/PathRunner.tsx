'use client';
/** KUEPER · SSF · PathRunner · Version 1.4.0 */
import { useCallback, useState } from 'react';
import type { LearningPath, LearningPathSection, LearningPathUnit } from '../../lib/learningPaths';
import styles from './PathRunner.module.css';
import GovernedQuizSection from './GovernedQuizSection';
import { getExperimentComponent } from './experimentRegistry';

function depthDisplay(raw: number) {
  const d = Math.round(100 * (1 - 1 / (1 + raw / 26)));
  const labels: [number, string][] = [
    [10, 'Beginn'], [22, 'Einstieg'], [38, 'Orientierung'], [52, 'Grundlagen'],
    [65, 'Mechanismus'], [76, 'Theorie'], [87, 'Forschungsnähe'], [100, 'Forschungsrand'],
  ];
  return { d, label: [...labels].reverse().find(([threshold]) => d >= threshold)?.[1] ?? 'Beginn' };
}

function SectionCard({ section, onQuizComplete, onDepth }: {
  section: LearningPathSection;
  onQuizComplete: () => void;
  onDepth: (pts: number) => void;
}) {
  const [branchOpen, setBranchOpen] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [depthAwarded, setDepthAwarded] = useState(false);
  const ExperimentComponent = getExperimentComponent(section.interactiveId ?? section.id);

  function awardOnce() {
    if (section.kind !== 'quiz' && !depthAwarded && section.depthPoints) {
      onDepth(section.depthPoints);
      setDepthAwarded(true);
    }
  }

  const kindLabel: Record<string, string> = {
    observation: 'Beobachtung', explanation: 'Erklärung', experiment: 'Experiment',
    exercise: 'Aufgabe', quiz: 'Quiz', branch: 'Seitenast', example: 'Beispiel',
  };

  if (section.kind === 'branch') {
    return <div className={styles.branch}>
      <div className={styles.branchHeader}>
        <span className={styles.kindBadge} style={{ color: 'var(--gold-2)' }}>Seitenast — optional</span>
        <strong className={styles.sectionTitle}>{section.title}</strong>
        <p className={styles.sectionSummary}>{section.summary}</p>
      </div>
      {!branchOpen && <button className={styles.branchBtn} onClick={() => { setBranchOpen(true); awardOnce(); }}>Erkunden →</button>}
      {branchOpen && <p className={styles.branchContent}>{section.summary}</p>}
    </div>;
  }

  if (section.optional && skipped) return null;

  return <div
    className={[
      styles.sectionCard,
      section.kind === 'observation' ? styles.observation : '',
      section.kind === 'experiment' ? styles.experimentCard : '',
      section.kind === 'quiz' ? styles.quiz : '',
    ].join(' ')}
    onMouseEnter={section.kind === 'quiz' ? undefined : awardOnce}
  >
    <strong className={styles.sectionTitle}>{section.title}</strong>
    {section.kind === 'observation' && <p className={styles.observationText}>{section.summary}</p>}
    {section.kind !== 'observation' && section.kind !== 'quiz' && section.kind !== 'experiment' && <p className={styles.sectionSummary}>{section.summary}</p>}
    {ExperimentComponent && <div className={styles.experimentWrap}><ExperimentComponent /></div>}
    {section.interactive && !ExperimentComponent && <div className={styles.experimentPlaceholder}>
      <p className={styles.placeholderText}>Interaktives Experiment — wird gerade portiert.</p>
      <a href={`/prototypes/ssf-${section.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}.html`} className={styles.protoLink} target="_blank" rel="noopener noreferrer">Im Prototyp öffnen →</a>
    </div>}
    {section.kind === 'quiz' && <GovernedQuizSection section={section} onComplete={onQuizComplete} onDepth={onDepth} />}
    <div className={styles.sectionMeta}>
      <span className={styles.kindBadge}>{kindLabel[section.kind] ?? section.kind}</span>
      {section.optional && <button className={styles.skipBtn} onClick={() => setSkipped(true)}>überspringen</button>}
      {section.interactive && !ExperimentComponent && <span className={styles.interactiveBadge}>interaktiv</span>}
    </div>
  </div>;
}

function UnitBlock({ unit, index, unlocked, isLast, onUnlock, onDepth }: {
  unit: LearningPathUnit;
  index: number;
  unlocked: boolean;
  isLast: boolean;
  onUnlock: () => void;
  onDepth: (pts: number) => void;
}) {
  const [quizDone, setQuizDone] = useState(false);
  if (!unlocked) return <div className={styles.unitLocked}>
    <span>0{index + 1}</span>
    <div><strong>{unit.title}</strong><p>Schließe die vorherige Einheit ab, um fortzufahren.</p></div>
    <span className={styles.lock}>●</span>
  </div>;

  return <div className={styles.unit}>
    <div className={styles.unitHeader}>
      <span className={styles.unitIndex}>0{index + 1}</span>
      <div><h3>{unit.title}</h3><p>{unit.entryQuestion}</p></div>
    </div>
    <div className={styles.sections}>
      {unit.sections.map(section => <SectionCard key={section.id} section={section} onQuizComplete={() => setQuizDone(true)} onDepth={onDepth} />)}
    </div>
    <div className={styles.takeaway}><span>Merksatz</span><p>{unit.takeaway}</p></div>
    {!isLast && unit.gate && <button className={styles.continueBtn} disabled={!quizDone} onClick={onUnlock}>{quizDone ? 'Nächste Einheit →' : 'Quiz abschließen, um fortzufahren'}</button>}
  </div>;
}

export default function PathRunner({ path }: { path: LearningPath }) {
  const [unlockedCount, setUnlockedCount] = useState(1);
  const [depth, setDepth] = useState(0);
  const addDepth = useCallback((pts: number) => setDepth(current => current + pts), []);
  const display = depthDisplay(depth);

  return <div className={styles.runner}>
    <div className={styles.progressBar}>
      <div><span className={styles.progressLabel}>Lerntiefe</span><strong>{display.label}</strong></div>
      <div className={styles.progressTrack}><div className={styles.progressFill} style={{ width: `${display.d}%` }} /></div>
      <span className={styles.progressPct}>{display.d}%</span>
    </div>
    {path.units.map((unit, index) => <UnitBlock
      key={unit.id}
      unit={unit}
      index={index}
      unlocked={index < unlockedCount}
      isLast={index === path.units.length - 1}
      onUnlock={() => setUnlockedCount(count => Math.min(count + 1, path.units.length))}
      onDepth={addDepth}
    />)}
  </div>;
}
