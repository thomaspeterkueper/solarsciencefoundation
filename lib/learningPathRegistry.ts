import { learningPaths, type LearningPath } from './learningPaths';

export type LearningPathLifecycleStatus = 'prototype' | 'active';

export const LEARNING_PATH_STATUS = {
  prototype: {
    label: 'Prototyp',
    description: 'Öffentlich testbar. Inhalt, Interaktionen oder didaktische Reihenfolge können sich noch ändern.',
    learnerFacing: true,
    canonical: false,
  },
  active: {
    label: 'Aktiv',
    description: 'Didaktisch geprüft, technisch integriert und für regulären Lernfortschritt freigegeben.',
    learnerFacing: true,
    canonical: true,
  },
} satisfies Record<LearningPathLifecycleStatus, {
  label: string;
  description: string;
  learnerFacing: boolean;
  canonical: boolean;
}>;

export type LearningPathRegistryIssue = {
  type: 'duplicate_id';
  id: string;
  occurrences: number;
};

function buildRegistry(source: LearningPath[]) {
  const byId = new Map<string, LearningPath>();
  const counts = new Map<string, number>();

  for (const path of source) {
    counts.set(path.id, (counts.get(path.id) ?? 0) + 1);
    if (!byId.has(path.id)) byId.set(path.id, path);
  }

  const issues: LearningPathRegistryIssue[] = [...counts.entries()]
    .filter(([, occurrences]) => occurrences > 1)
    .map(([id, occurrences]) => ({ type: 'duplicate_id', id, occurrences }));

  return {
    paths: [...byId.values()],
    byId,
    issues,
  };
}

const registry = buildRegistry(learningPaths);

export const registeredLearningPaths = registry.paths;
export const learningPathRegistryIssues = registry.issues;

export function getRegisteredLearningPathById(id: string): LearningPath | null {
  return registry.byId.get(id) ?? null;
}

export function getLearningPathStatus(status: LearningPathLifecycleStatus) {
  return LEARNING_PATH_STATUS[status];
}
