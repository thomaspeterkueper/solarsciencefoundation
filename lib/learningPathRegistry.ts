import { learningPaths, type LearningPath } from './learningPaths';
import { maillardLearningPath } from './learningPaths/maillard';
import { magnetismMaterialsLearningPath } from './learningPaths/magnetismMaterials';
import { noxiaWaterProcessingLearningPath } from './learningPaths/noxiaWaterProcessing';
import { noxiaUnlockFoundationLearningPaths } from './learningPaths/noxiaUnlockFoundations';
import { noxiaResourceExtractionLearningPath } from './learningPaths/noxiaResourceExtraction';
import { contracomologyLearningPath } from './learningPaths/contracomology';

export type LearningPathLifecycleStatus = 'prototype' | 'active';

export const LEARNING_PATH_STATUS = {
  prototype: { label: 'Prototyp', description: 'Öffentlich testbar. Inhalt, Interaktionen oder didaktische Reihenfolge können sich noch ändern.', learnerFacing: true, canonical: false },
  active: { label: 'Aktiv', description: 'Didaktisch geprüft, technisch integriert und für regulären Lernfortschritt freigegeben.', learnerFacing: true, canonical: true },
} satisfies Record<LearningPathLifecycleStatus, { label: string; description: string; learnerFacing: boolean; canonical: boolean }>;

export type LearningPathRegistryIssue = { type: 'duplicate_id'; id: string; occurrences: number };

const MODULE_ALIAS_MAP: Record<string, string> = {
  'SSF-MAT-0001': 'PATH:SSF:MAT-VEC-0001',
  'SSF-MAT-0002': 'PATH:SSF:MAT-VEC-0001',
  'SSF-MAT-0003': 'PATH:SSF:MAT-LGS-0001',
  'SSF-MAT-0004': 'PATH:SSF:MAT-LGS-0001',
  'SSF-MAT-0005': 'PATH:SSF:MAT-SERIES-0001',
  'SSF-MAT-1001': 'PATH:SSF:MAT-VEC-0001',
  'SSF-MAT-1002': 'PATH:SSF:MAT-VEC-0001',
  'SSF-PHY-1101': 'PATH:SSF:PHY-WAVE-SPECTRUM-0001',
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
  'LRN:SSF:PHY-1101': 'PATH:SSF:PHY-WAVE-SPECTRUM-0001',
  'LRN:SSF:PHY-L1-000001': 'PATH:SSF:PHY-SPEKTRALANALYSE-0001',
  'LRN:SSF:AST-L1-000001': 'PATH:SSF:AST-SONNENSYSTEM-0001',
  'LRN:SSF:ECO-L0-000001': 'PATH:SSF:ECO-KREDIT-NOXIA-0001',
  'LRN:SSF:ECO-L0-000002': 'PATH:SSF:ECO-ZINSESZINS-NOXIA-0001',
  'LRN:SSF:PHY-L1-000003': 'PATH:SSF:PHY-WASSER-DIPOL-0001',
  'LRN:SSF:PHY-L1-000004': 'PATH:SSF:PHY-WASSER-PHASEN-0001',
  'LRN:SSF:PHY-L1-000005': 'PATH:SSF:PHY-WASSER-EIS-0001',
  'LRN:SSF:PHY-L1-000006': 'PATH:SSF:PHY-WASSER-OBERFL-0001',
  'LRN:SSF:PHY-L1-000007': 'PATH:SSF:PHY-WASSER-SUBLIM-0001',
  'LRN:SSF:PHY-L1-000008': 'PATH:SSF:PHY-WASSER-WAERME-0001',
  'LRN:SSF:CHE-6001': 'PATH:SSF:CHE-IRIDIUM-0001',
  'LRN:SSF:PHY-5001': 'PATH:SSF:PHY-ELEKTROLYSE-0001',
  'LRN:SSF:ENV-6001': 'PATH:SSF:ENV-ROHSTOFFE-ENERGIEWENDE-0001',
  'LRN:SSF:PHY-4001': 'PATH:SSF:PHY-MAGNETISMUS-0001',
  'LRN:SSF:PHY-4002': 'PATH:SSF:PHY-PIEZO-0001',
  'LRN:SSF:BIO-5001': 'PATH:SSF:BIO-LEBEN-URSPRUNG-0001',
  'LRN:SSF:COLONY-L1-000001': 'PATH:SSF:ENG-COLONY-FOUND-0001',
  'LRN:SSF:STATION-L1-000001': 'PATH:SSF:ENG-STATION-FOUND-0001',
  'LRN:SSF:PHY-WASSER-VAKUUM-0001': 'PATH:SSF:PHY-WASSER-VAKUUM-0001',
  'LRN:SSF:AST-MARS-REGOLITH-0001': 'PATH:SSF:AST-MARS-REGOLITH-0001',
  'LRN:SSF:PHY-MONDSTAUB-VERSCHLEISS-0001': 'PATH:SSF:PHY-MONDSTAUB-VERSCHLEISS-0001',
  'LRN:SSF:ENG-LIFESUPPORT-MOBIL-0001': 'PATH:SSF:ENG-LIFESUPPORT-MOBIL-0001',
  'LRN:SSF:AST-MONDNAVIGATION-0001': 'PATH:SSF:AST-MONDNAVIGATION-0001',
  'LRN:SSF:NOX-WATER-PROCESSING': 'PATH:SSF:CHE-WASSER-AUFBEREITUNG-0001',
  'LRN:SSF:NOX-RESOURCE-EXTRACTION': 'PATH:SSF:NOX-RESOURCE-EXTRACTION-0001',
  'CHE-L1-000015': 'PATH:SSF:CHE-WASSER-AUFBEREITUNG-0001',
  'ENG-L1-000005': 'PATH:SSF:NOX-RESOURCE-EXTRACTION-0001',
  'LRN:SSF:NOX-WATER-0001': 'PATH:SSF:NOX-WATER-PROCESSING-0001',
  'LRN:SSF:MAG-001': 'PATH:SSF:MAGNETISM-MATERIALS',
  'LRN:SSF:MAG-002': 'PATH:SSF:MAGNETISM-MATERIALS',
  'LRN:SSF:MAG-003': 'PATH:SSF:MAGNETISM-MATERIALS',
  'LRN:SSF:MAG-004': 'PATH:SSF:MAGNETISM-MATERIALS',
  'LRN:SSF:MAG-005': 'PATH:SSF:MAGNETISM-MATERIALS',
  'LRN:SSF:MAG-006': 'PATH:SSF:MAGNETISM-MATERIALS',
  'LRN:SSF:MAG-007': 'PATH:SSF:MAGNETISM-MATERIALS',
  'LRN:SSF:MAG-008': 'PATH:SSF:MAGNETISM-MATERIALS',
  'PHY-L1-000017': 'PATH:SSF:MAGNETISM-MATERIALS',
  'PHY-L1-000018': 'PATH:SSF:MAGNETISM-MATERIALS',
  'PHY-L1-000019': 'PATH:SSF:MAGNETISM-MATERIALS',
  'PHY-L1-000020': 'PATH:SSF:MAGNETISM-MATERIALS',
  'PHY-L1-000021': 'PATH:SSF:MAGNETISM-MATERIALS',
  'PHY-L1-000022': 'PATH:SSF:MAGNETISM-MATERIALS',
  'PHY-L1-000023': 'PATH:SSF:MAGNETISM-MATERIALS',
  'PHY-L1-000024': 'PATH:SSF:MAGNETISM-MATERIALS',
};

function normalizeModuleId(id: string): string {
  return id.replace(/^LRN:SSF:/, 'SSF-').replace(/^SSF:/, 'SSF-').toUpperCase();
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

  return { paths: [...byId.values()], byId, byModuleId, issues };
}

const registry = buildRegistry([
  ...learningPaths,
  maillardLearningPath,
  magnetismMaterialsLearningPath,
  noxiaWaterProcessingLearningPath,
  noxiaResourceExtractionLearningPath,
  ...noxiaUnlockFoundationLearningPaths.filter((path) => path.id !== noxiaResourceExtractionLearningPath.id),
  contracomologyLearningPath,
]);

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
