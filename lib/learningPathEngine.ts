/**
 * KUEPER - Solar Science Foundation (SSF)
 * Path: lib/learningPathEngine.ts
 * Name: Dynamic Learning Path Engine
 * Version: 0.1.0
 * Created: 2026-07-09
 */

import {
  fetchLearningModulesSnapshot,
  getKxfLearningModules,
  toKxfModuleId,
  toSsfModuleId,
  type KxfLearningModule,
} from './kxf';
import { getPrerequisiteView } from './prerequisites';

export type LearningPathTargetType = 'document' | 'module';

export type DynamicLearningPathStep = {
  id: string;
  canonicalId: string;
  title: string;
  domain: string;
  durationMinutes: number;
  summary: string;
  status: 'completed' | 'available' | 'locked';
  requires: string[];
  unlocks: string[];
  covers: string[];
  reason: string;
};

export type DynamicLearningPath = {
  schema: 'SSF-DYNAMIC-LEARNING-PATH-0.1';
  target: {
    id: string;
    type: LearningPathTargetType;
  };
  completedModules: string[];
  nextStep: DynamicLearningPathStep | null;
  steps: DynamicLearningPathStep[];
  unresolved: Array<{
    kind: 'missing_module' | 'missing_prerequisite_coverage';
    id: string;
    detail: string;
  }>;
};

type RawModuleIndexEntry = {
  id: string;
  requires: string[];
  unlocks: string[];
  archiveUnlocks: string[];
  teaches: string[];
};

function getRecords(snapshot: Awaited<ReturnType<typeof fetchLearningModulesSnapshot>>) {
  return snapshot.data?.records as { learning_modules?: KxfLearningModule[]; learningModules?: KxfLearningModule[] } | undefined;
}

function getRawModules(snapshot: Awaited<ReturnType<typeof fetchLearningModulesSnapshot>>) {
  const records = getRecords(snapshot);
  return records?.learning_modules ?? records?.learningModules ?? [];
}

function getRequires(module: KxfLearningModule) {
  return module.dependencies?.requires ?? module.requires ?? [];
}

function getModuleUnlocks(module: KxfLearningModule) {
  return module.dependencies?.moduleUnlocks ?? module.dependencies?.module_unlocks ?? module.unlocks ?? [];
}

function getArchiveUnlocks(module: KxfLearningModule) {
  return module.dependencies?.archiveUnlocks ?? module.dependencies?.archive_unlocks ?? [];
}

function getTeaches(module: KxfLearningModule) {
  return module.teaches ?? [];
}

function canonicalModuleId(id: string) {
  return id.startsWith('SSF-') ? toKxfModuleId(id) : id;
}

function normaliseCompleted(ids: string[]) {
  return new Set(ids.flatMap((id) => [id, toSsfModuleId(id), canonicalModuleId(id)]));
}

function stripOtaPrefix(id: string) {
  return id.startsWith('DOC:OTA:') ? id.slice('DOC:OTA:'.length) : id;
}

function targetMatchesArchiveUnlock(unlockId: string, targetId: string) {
  return stripOtaPrefix(unlockId) === stripOtaPrefix(targetId);
}

function buildRawIndex(rawModules: KxfLearningModule[]) {
  const index = new Map<string, RawModuleIndexEntry>();

  for (const module of rawModules) {
    const canonicalId = canonicalModuleId(module.id);
    const entry: RawModuleIndexEntry = {
      id: canonicalId,
      requires: getRequires(module).map(canonicalModuleId),
      unlocks: getModuleUnlocks(module).map(canonicalModuleId),
      archiveUnlocks: getArchiveUnlocks(module),
      teaches: getTeaches(module),
    };

    index.set(canonicalId, entry);
    index.set(toSsfModuleId(canonicalId), entry);
    index.set(module.id, entry);
  }

  return index;
}

function unique<T>(items: T[]) {
  return [...new Set(items)];
}

function collectPrerequisiteModuleIds(rawModules: KxfLearningModule[], targetId: string, prerequisiteCodes: string[]) {
  const matched = new Set<string>();
  const unresolved: DynamicLearningPath['unresolved'] = [];

  for (const module of rawModules) {
    const canonicalId = canonicalModuleId(module.id);
    const teaches = getTeaches(module).join(' ').toUpperCase();
    const haystack = `${module.id} ${module.meta?.title ?? ''} ${module.title ?? ''} ${teaches}`.toUpperCase();

    if (getArchiveUnlocks(module).some((unlockId) => targetMatchesArchiveUnlock(unlockId, targetId))) {
      matched.add(canonicalId);
      continue;
    }

    for (const code of prerequisiteCodes) {
      if (haystack.includes(code.toUpperCase())) {
        matched.add(canonicalId);
      }
    }
  }

  for (const code of prerequisiteCodes) {
    const hasCoverage = rawModules.some((module) => {
      const teaches = getTeaches(module).join(' ').toUpperCase();
      const haystack = `${module.id} ${module.meta?.title ?? ''} ${module.title ?? ''} ${teaches}`.toUpperCase();
      return haystack.includes(code.toUpperCase());
    });
    if (!hasCoverage) {
      unresolved.push({
        kind: 'missing_prerequisite_coverage',
        id: code,
        detail: `No SSF learning module currently advertises coverage for prerequisite ${code}.`,
      });
    }
  }

  return { moduleIds: [...matched], unresolved };
}

function collectDependencyClosure(seedIds: string[], rawIndex: Map<string, RawModuleIndexEntry>) {
  const result = new Set<string>();
  const unresolved: DynamicLearningPath['unresolved'] = [];

  function visit(id: string) {
    const canonicalId = canonicalModuleId(id);
    if (result.has(canonicalId)) return;

    const entry = rawIndex.get(canonicalId) ?? rawIndex.get(toSsfModuleId(canonicalId));
    if (!entry) {
      unresolved.push({
        kind: 'missing_module',
        id: canonicalId,
        detail: `Required learning module ${canonicalId} is referenced but not present in the learning module export.`,
      });
      return;
    }

    for (const requirementId of entry.requires) visit(requirementId);
    result.add(entry.id);
  }

  for (const id of seedIds) visit(id);
  return { ids: [...result], unresolved };
}

function orderByDependencies(ids: string[], rawIndex: Map<string, RawModuleIndexEntry>) {
  const wanted = new Set(ids.map(canonicalModuleId));
  const ordered: string[] = [];
  const temporary = new Set<string>();
  const permanent = new Set<string>();

  function visit(id: string) {
    const canonicalId = canonicalModuleId(id);
    if (permanent.has(canonicalId)) return;
    if (temporary.has(canonicalId)) return;
    temporary.add(canonicalId);

    const entry = rawIndex.get(canonicalId);
    for (const requirementId of entry?.requires ?? []) {
      const requiredCanonical = canonicalModuleId(requirementId);
      if (wanted.has(requiredCanonical)) visit(requiredCanonical);
    }

    temporary.delete(canonicalId);
    permanent.add(canonicalId);
    ordered.push(canonicalId);
  }

  for (const id of ids) visit(id);
  return ordered;
}

export async function buildDynamicLearningPath(input: {
  targetId: string;
  targetType?: LearningPathTargetType;
  completedModules?: string[];
}): Promise<DynamicLearningPath> {
  const targetType = input.targetType ?? (input.targetId.startsWith('DOC:OTA:') || input.targetId.startsWith('OTA-') ? 'document' : 'module');
  const completed = normaliseCompleted(input.completedModules ?? []);
  const [modules, snapshot, prerequisiteView] = await Promise.all([
    getKxfLearningModules(),
    fetchLearningModulesSnapshot(),
    targetType === 'document' ? getPrerequisiteView(input.targetId) : Promise.resolve(null),
  ]);

  const rawModules = getRawModules(snapshot);
  const rawIndex = buildRawIndex(rawModules);
  const moduleById = new Map(modules.flatMap((module) => [[module.id, module], [toKxfModuleId(module.id), module]]));

  const seedIds = targetType === 'module'
    ? [canonicalModuleId(input.targetId)]
    : collectPrerequisiteModuleIds(
        rawModules,
        input.targetId,
        prerequisiteView?.prerequisites.map((item) => item.code) ?? []
      ).moduleIds;

  const prerequisiteCoverage = targetType === 'document'
    ? collectPrerequisiteModuleIds(rawModules, input.targetId, prerequisiteView?.prerequisites.map((item) => item.code) ?? [])
    : { moduleIds: seedIds, unresolved: [] as DynamicLearningPath['unresolved'] };

  const closure = collectDependencyClosure(seedIds, rawIndex);
  const orderedIds = orderByDependencies(closure.ids, rawIndex);
  const steps = orderedIds.map((canonicalId): DynamicLearningPathStep | null => {
    const module = moduleById.get(canonicalId) ?? moduleById.get(toSsfModuleId(canonicalId));
    const raw = rawIndex.get(canonicalId);
    if (!module || !raw) return null;
    const isCompleted = completed.has(canonicalId) || completed.has(module.id);
    const requirementsCompleted = raw.requires.every((requirementId) => completed.has(requirementId) || completed.has(toSsfModuleId(requirementId)));

    return {
      id: module.id,
      canonicalId,
      title: module.title,
      domain: module.domain,
      durationMinutes: module.durationMinutes,
      summary: module.summary,
      status: isCompleted ? 'completed' : requirementsCompleted ? 'available' : 'locked',
      requires: raw.requires.map(toSsfModuleId),
      unlocks: unique([...raw.unlocks.map(toSsfModuleId), ...raw.archiveUnlocks]),
      covers: raw.teaches,
      reason: targetType === 'document'
        ? `Builds prerequisite knowledge for ${input.targetId}.`
        : `Required before ${input.targetId}.`,
    };
  }).filter((step): step is DynamicLearningPathStep => Boolean(step));

  return {
    schema: 'SSF-DYNAMIC-LEARNING-PATH-0.1',
    target: {
      id: input.targetId,
      type: targetType,
    },
    completedModules: [...completed].filter((id) => id.startsWith('SSF-')),
    nextStep: steps.find((step) => step.status === 'available') ?? null,
    steps,
    unresolved: [...prerequisiteCoverage.unresolved, ...closure.unresolved],
  };
}
