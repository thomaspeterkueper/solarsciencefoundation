import { learningPaths, type LearningPath } from './learningPaths';
import { maillardLearningPath } from './learningPaths/maillard';

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

// ── Alias-Map: alte Modul-IDs → Lernpfad-ID ────────────────────────────────
// Wenn ein KXF- oder Legacy-Modul keinen direkten sourceModuleId-Match hat,
// wird hier auf den thematisch nächsten Lernpfad weitergeleitet.
const MODULE_ALIAS_MAP: Record<string, string> = {
  // Legacy modules.ts IDs (SSF-MAT-0001..0005, SSF-MAT-1001..1002, SSF-PHY-1101)
  'SSF-MAT-0001': 'PATH:SSF:MAT-VEC-0001',
  'SSF-MAT-0002': 'PATH:SSF:MAT-VEC-0001',
  'SSF-MAT-0003': 'PATH:SSF:MAT-LGS-0001',
  'SSF-MAT-0004': 'PATH:SSF:MAT-LGS-0001',
  'SSF-MAT-0005': 'PATH:SSF:MAT-SERIES-0001',
  'SSF-MAT-1001': 'PATH:SSF:MAT-VEC-0001',
  'SSF-MAT-1002': 'PATH:SSF:MAT-VEC-0001',
  'SSF-PHY-1101': 'PATH:SSF:PHY-WAVE-SPECTRUM-0001',
  // KG Learning-YAML IDs
  'SSF-AST-1101': 'PATH:SSF:PHY-SKY-0001',
  'SSF-AST-1201': 'PATH:SSF:PHY-SKY-0001',
  'SSF-AST-2101': 'PATH:SSF:PHY-SKY-0001',
  'SSF-BIO-1101': 'PATH:SSF:BIO-LEBEN-URSPRUNG-0001',
  'SSF-BIO-1201': 'PATH:SSF:BIO-LEBEN-URSPRUNG-0001',
  'SSF-CHE-1101': 'PATH:SSF:PHY-WASSER-MOLEKUEL-0001',
  'SSF-CHE-1301': 'PATH:SSF:CHE-IRIDIUM-0001',
  'SSF-MAT-1201': 'PATH:SSF:MAT-ERROR-0001',
  'SSF-PHY-1201': 'PATH:SSF:PHY-AUTO-MOTOR-0001',
  'SSF-PHY-1301': 'PATH:SSF:PHY-ELEKTROLYSE-0001',
  'SSF-PHY-1302': 'PATH:SSF:PHY-ELEKTROMOTOR-BASICS-0001',
  'SSF-TEC-1101': 'PATH:SSF:ENG-DMS-0001',
  'SSF-TEC-1201': 'PATH:SSF:ENG-EDM-0001',
};

function normalizeModuleId(id: string): string {
  return id
    .replace(/^LRN:SSF:/, 'SSF-')
    .replace(/^SSF:/, 'SSF-')
    .toUpperCase();
}

function buildRegistry(source: LearningPath[]) {
  const byId = new Map<string, LearningPath>();
  const byModuleId = new Map<string, LearningPath>();
  const counts = new Map<string, number>();

  for (const path of source) {
    counts.set(path.id, (counts.get(path.id) ?? 0) + 1);

    if (!byId.has(path.id)) {
      byId.set(path.id, path);

      for (const moduleId of [path.sourceModuleId, path.kxfModuleId]) {
        const normalized = normalizeModuleId(moduleId);
        if (!byModuleId.has(normalized)) byModuleId.set(normalized, path);
      }
    }
  }

  // Register aliases: old/KG module IDs → nearest learning path
  for (const [aliasId, targetPathId] of Object.entries(MODULE_ALIAS_MAP)) {
    const normalized = normalizeModuleId(aliasId);
    if (!byModuleId.has(normalized)) {
      const target = byId.get(targetPathId);
      if (target) byModuleId.set(normalized, target);
    }
  }

  const issues: LearningPathRegistryIssue[] = [...counts.entries()]
    .filter(([, occurrences]) => occurrences > 1)
    .map(([id, occurrences]) => ({ type: 'duplicate_id', id, occurrences }));

  return {
    paths: [...byId.values()],
    byId,
    byModuleId,
    issues,
  };
}

const registry = buildRegistry([...learningPaths, maillardLearningPath]);

export const registeredLearningPaths = registry.paths;
export const learningPathRegistryIssues = registry.issues;

export function getRegisteredLearningPathById(id: string): LearningPath | null {
  return registry.byId.get(id) ?? null;
}

export function getRegisteredLearningPathForModule(moduleId: string): LearningPath | null {
  return registry.byModuleId.get(normalizeModuleId(moduleId)) ?? null;
}

export function getLearningPathStatus(status: LearningPathLifecycleStatus) {
  return LEARNING_PATH_STATUS[status];
}
