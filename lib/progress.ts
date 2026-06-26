/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      lib/progress.ts
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/progress.ts
 * Name:      progress — progress store, grading & unlock derivation
 * Version:   0.1.0
 * Created:   2026-06-26
 * Modified:  2026-06-26 13:00 CEST
 * Depends:   lib/modules
 */

import { getModuleById, type LearningModule } from './modules';

export type SubmittedAnswer = {
  exerciseId: string;
  selectedOption: number;
};

export type GradedAnswer = SubmittedAnswer & {
  correct: boolean;
};

export type ModuleCompletion = {
  moduleId: string;
  completedAt: string;
  score: number;
};

export type PlayerProgress = {
  playerId: string;
  completedModules: ModuleCompletion[];
  attempts: number;
};

export type Unlock = {
  id: string;
  sourceModule: string;
  target: 'NOXIA';
  type: 'research_unlock';
  status: 'granted';
};

export type CompletionResult =
  | { status: 'module_not_found' }
  | { status: 'incomplete'; moduleId: string; score: number; graded: GradedAnswer[] }
  | {
      status: 'completed';
      moduleId: string;
      score: number;
      graded: GradedAnswer[];
      completion: ModuleCompletion;
      unlocks: Unlock[];
    };

type PlayerRecord = {
  completions: Map<string, ModuleCompletion>;
  attempts: number;
};

const players = new Map<string, PlayerRecord>();

function getOrCreate(playerId: string): PlayerRecord {
  let record = players.get(playerId);
  if (!record) {
    record = { completions: new Map(), attempts: 0 };
    players.set(playerId, record);
  }
  return record;
}

const PASS_THRESHOLD = 1;

function gradeAnswers(
  learningModule: LearningModule,
  answers: SubmittedAnswer[]
): GradedAnswer[] {
  return learningModule.exercises.map((exercise) => {
    const submitted = answers.find((a) => a.exerciseId === exercise.id);
    const selectedOption = submitted?.selectedOption ?? -1;
    return {
      exerciseId: exercise.id,
      selectedOption,
      correct: selectedOption === exercise.correctOption
    };
  });
}

export function recordCompletion(
  playerId: string,
  moduleId: string,
  answers: SubmittedAnswer[]
): CompletionResult {
  const learningModule = getModuleById(moduleId);
  if (!learningModule) {
    return { status: 'module_not_found' };
  }

  const record = getOrCreate(playerId);
  record.attempts += 1;

  const graded = gradeAnswers(learningModule, answers);
  const correctCount = graded.filter((a) => a.correct).length;
  const score =
    learningModule.exercises.length === 0
      ? 0
      : correctCount / learningModule.exercises.length;

  if (score < PASS_THRESHOLD) {
    return { status: 'incomplete', moduleId, score, graded };
  }

  if (!record.completions.has(moduleId)) {
    record.completions.set(moduleId, {
      moduleId,
      completedAt: new Date().toISOString(),
      score
    });
  }

  const completion = record.completions.get(moduleId);
  if (!completion) {
    return { status: 'incomplete', moduleId, score, graded };
  }

  return {
    status: 'completed',
    moduleId,
    score,
    graded,
    completion,
    unlocks: buildUnlocks([moduleId])
  };
}

export function getPlayerProgress(playerId: string): PlayerProgress {
  const record = players.get(playerId);
  return {
    playerId,
    completedModules: record ? [...record.completions.values()] : [],
    attempts: record?.attempts ?? 0
  };
}

export function getCompletedModuleIds(playerId: string): string[] {
  const record = players.get(playerId);
  return record ? [...record.completions.keys()] : [];
}

export function buildUnlocks(moduleIds: string[]): Unlock[] {
  const unlocks: Unlock[] = [];
  const seen = new Set<string>();

  for (const moduleId of moduleIds) {
    const learningModule = getModuleById(moduleId);
    if (!learningModule) continue;
    for (const unlockId of learningModule.unlocks) {
      if (seen.has(unlockId)) continue;
      seen.add(unlockId);
      unlocks.push({
        id: unlockId,
        sourceModule: moduleId,
        target: 'NOXIA',
        type: 'research_unlock',
        status: 'granted'
      });
    }
  }

  return unlocks;
}

export function getPlayerUnlocks(playerId: string): Unlock[] {
  return buildUnlocks(getCompletedModuleIds(playerId));
}
