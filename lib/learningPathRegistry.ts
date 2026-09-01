import { learningPaths, type LearningPath } from './learningPaths';
import { maillardLearningPath } from './learningPaths/maillard';
import { magnetismMaterialsLearningPath } from './learningPaths/magnetismMaterials';
import { noxiaWaterProcessingLearningPath } from './learningPaths/noxiaWaterProcessing';
import { noxiaUnlockFoundationLearningPaths } from './learningPaths/noxiaUnlockFoundations';
import { noxiaResourceExtractionLearningPath } from './learningPaths/noxiaResourceExtraction';
import { contracomologyLearningPath } from './learningPaths/contracomology';
import { redWineStainLearningPath } from './learningPaths/redWineStain';
import { caramelizationLearningPath } from './learningPaths/caramelization';
import { financeLearningPaths } from './learningPaths/finance';

export type LearningPathLifecycleStatus = 'prototype' | 'active';

export const LEARNING_PATH_STATUS = {
  prototype: { label: 'Prototyp', description: 'Öffentlich testbar. Inhalt, Interaktionen oder didaktische Reihenfolge können sich noch ändern.', learnerFacing: true, canonical: false },
  active: { label: 'Aktiv', description: 'Didaktisch geprüft, technisch integriert und für regulären Lernfortschritt freigegeben.', learnerFacing: true, canonical: true },
} satisfies Record<LearningPathLifecycleStatus, { label: string; description: string; learnerFacing: boolean; canonical: boolean }>;

export type LearningPathRegistryIssueType =
  | 'duplicate_path_id'
  | 'duplicate_source_module_id'
  | 'duplicate_kxf_module_id'
  | 'duplicate_learning_object_id'
  | 'broken_unit_gate'
  | 'broken_alias_target'
  | 'ambiguous_module_mapping'
  | 'legacy_domain_reference'
  | 'quarantined_legacy_domain';

export type LearningPathRegistryIssue = {
  type: LearningPathRegistryIssueType;
  id: string;
  occurrences?: number;
  pathIds?: string[];
  detail?: string;
};

const MODULE_ALIAS_MAP: Record<string, string> = {
  'SSF-MAT-0001': 'PATH:SSF:MAT-VEC-0001', 'SSF-MAT-0002': 'PATH:SSF:MAT-VEC-0001',
  'SSF-MAT-0003': 'PATH:SSF:MAT-LGS-0001', 'SSF-MAT-0004': 'PATH:SSF:MAT-LGS-0001',
  'SSF-MAT-0005': 'PATH:SSF:MAT-SERIES-0001', 'SSF-MAT-1001': 'PATH:SSF:MAT-VEC-0001',
  'SSF-MAT-1002': 'PATH:SSF:MAT-VEC-0001', 'SSF-PHY-1101': 'PATH:SSF:PHY-WAVE-SPECTRUM-0001',
  'SSF-AST-1101': 'PATH:SSF:PHY-SKY-0001', 'SSF-AST-1201': 'PATH:SSF:PHY-SKY-0001',
  'SSF-AST-2101': 'PATH:SSF:PHY-SKY-0001', 'SSF-BIO-1101': 'PATH:SSF:BIO-LEBEN-URSPRUNG-0001',
  'SSF-BIO-1201': 'PATH:SSF:BIO-LEBEN-URSPRUNG-0001', 'SSF-CHE-1101': 'PATH:SSF:PHY-WASSER-MOLEKUEL-0001',
  'SSF-CHE-1301': 'PATH:SSF:CHE-IRIDIUM-0001', 'SSF-MAT-1201': 'PATH:SSF:MAT-ERROR-0001',
  'SSF-PHY-1201': 'PATH:SSF:PHY-AUTO-MOTOR-0001', 'SSF-PHY-1301': 'PATH:SSF:PHY-ELEKTROLYSE-0001',
  'SSF-TEC-1101': 'PATH:SSF:ENG-DMS-0001', 'SSF-TEC-1201': 'PATH:SSF:ENG-EDM-0001',
  'LRN:SSF:PHY-1101': 'PATH:SSF:PHY-WAVE-SPECTRUM-0001',
  'LRN:SSF:PHY-L1-000001': 'PATH:SSF:PHY-SPEKTRALANALYSE-0001', 'LRN:SSF:AST-L1-000001': 'PATH:SSF:AST-SONNENSYSTEM-0001',
  'LRN:SSF:ECO-L0-000001': 'PATH:SSF:ECO-KREDIT-NOXIA-0001', 'LRN:SSF:ECO-L0-000002': 'PATH:SSF:ECO-ZINSESZINS-NOXIA-0001',
  'LRN:SSF:PHY-L1-000003': 'PATH:SSF:PHY-WASSER-DIPOL-0001', 'LRN:SSF:PHY-L1-000004': 'PATH:SSF:PHY-WASSER-PHASEN-0001',
  'LRN:SSF:PHY-L1-000005': 'PATH:SSF:PHY-WASSER-EIS-0001', 'LRN:SSF:PHY-L1-000006': 'PATH:SSF:PHY-WASSER-OBERFL-0001',
  'LRN:SSF:PHY-L1-000007': 'PATH:SSF:PHY-WASSER-SUBLIM-0001', 'LRN:SSF:PHY-L1-000008': 'PATH:SSF:PHY-WASSER-WAERME-0001',
  'LRN:SSF:CHE-6001': 'PATH:SSF:CHE-IRIDIUM-0001', 'LRN:SSF:PHY-5001': 'PATH:SSF:PHY-ELEKTROLYSE-0001',
  'LRN:SSF:ENV-6001': 'PATH:SSF:ENV-ROHSTOFFE-ENERGIEWENDE-0001', 'LRN:SSF:PHY-4001': 'PATH:SSF:PHY-MAGNETISMUS-0001',
  'LRN:SSF:PHY-4002': 'PATH:SSF:PHY-PIEZO-0001', 'LRN:SSF:BIO-5001': 'PATH:SSF:BIO-LEBEN-URSPRUNG-0001',
  'LRN:SSF:COLONY-L1-000001': 'PATH:SSF:ENG-COLONY-FOUND-0001', 'LRN:SSF:STATION-L1-000001': 'PATH:SSF:ENG-STATION-FOUND-0001',
  'LRN:SSF:PHY-WASSER-VAKUUM-0001': 'PATH:SSF:PHY-WASSER-VAKUUM-0001', 'LRN:SSF:AST-MARS-REGOLITH-0001': 'PATH:SSF:AST-MARS-REGOLITH-0001',
  'LRN:SSF:PHY-MONDSTAUB-VERSCHLEISS-0001': 'PATH:SSF:PHY-MONDSTAUB-VERSCHLEISS-0001', 'LRN:SSF:ENG-LIFESUPPORT-MOBIL-0001': 'PATH:SSF:ENG-LIFESUPPORT-MOBIL-0001',
  'LRN:SSF:AST-MONDNAVIGATION-0001': 'PATH:SSF:AST-MONDNAVIGATION-0001', 'LRN:SSF:NOX-WATER-PROCESSING': 'PATH:SSF:CHE-WASSER-AUFBEREITUNG-0001',
  'LRN:SSF:NOX-RESOURCE-EXTRACTION': 'PATH:SSF:NOX-RESOURCE-EXTRACTION-0001', 'CHE-L1-000015': 'PATH:SSF:CHE-WASSER-AUFBEREITUNG-0001',
  'ENG-L1-000005': 'PATH:SSF:NOX-RESOURCE-EXTRACTION-0001', 'LRN:SSF:NOX-WATER-0001': 'PATH:SSF:CHE-WASSER-AUFBEREITUNG-0001',
  'LRN:SSF:MAG-001': 'PATH:SSF:MAGNETISM-MATERIALS', 'LRN:SSF:MAG-002': 'PATH:SSF:MAGNETISM-MATERIALS',
  'LRN:SSF:MAG-003': 'PATH:SSF:MAGNETISM-MATERIALS', 'LRN:SSF:MAG-004': 'PATH:SSF:MAGNETISM-MATERIALS',
  'LRN:SSF:MAG-005': 'PATH:SSF:MAGNETISM-MATERIALS', 'LRN:SSF:MAG-006': 'PATH:SSF:MAGNETISM-MATERIALS',
  'LRN:SSF:MAG-007': 'PATH:SSF:MAGNETISM-MATERIALS', 'LRN:SSF:MAG-008': 'PATH:SSF:MAGNETISM-MATERIALS',
  'PHY-L1-000017': 'PATH:SSF:MAGNETISM-MATERIALS', 'PHY-L1-000018': 'PATH:SSF:MAGNETISM-MATERIALS',
  'PHY-L1-000019': 'PATH:SSF:MAGNETISM-MATERIALS', 'PHY-L1-000020': 'PATH:SSF:MAGNETISM-MATERIALS',
  'PHY-L1-000021': 'PATH:SSF:MAGNETISM-MATERIALS', 'PHY-L1-000022': 'PATH:SSF:MAGNETISM-MATERIALS',
  'PHY-L1-000023': 'PATH:SSF:MAGNETISM-MATERIALS', 'PHY-L1-000024': 'PATH:SSF:MAGNETISM-MATERIALS',
};

const LEGACY_DOMAIN_MAP: Record<string, string> = {
  'KNOW:PHY-THERMODYNAMICS': 'KD:PHYS-THERM:N1',
  'KNOW:CHE-ELECTROCHEMISTRY': 'KD:CHM-ELECTROCHEM:N2',
  'KNOW:PHY-ELECTRICITY': 'KD:ELEC:N1',
  'KNOW:ECO-FINANCE': 'KD:ECO-FINANCE:N2',
  'KNOW:MAT-ARITHMETIC': 'KD:MATH:N1',
  'KNOW:MAT-EXPONENTIAL': 'KD:MATH:N1',
  'KNOW:PHY-ORBITAL-MECHANICS': 'KD:SPACE-ORBITAL-MECHANICS:N2',
  'KNOW:PHY-GRAVITY': 'KD:PHYS:N1',
  'KNOW:AST-SOLAR-SYSTEM': 'KD:GEO-PLANET:N1',
  'KNOW:PHY-SPECTROSCOPY': 'KD:PHYS-SPECTROSCOPY:N2',
  'KNOW:PHY-QUANTUM': 'KD:PHYS-QM:N2',
  'KNOW:AST-STELLAR': 'KD:ASTRO-STELLAR:N2',
  'KNOW:CHE-MOLECULAR': 'KD:CHM:N1',
  'KNOW:PHY-ELECTROSTATICS': 'KD:PHYS-EM:N2',
  'KNOW:CHE-HYDROGEN-BOND': 'KD:CHM:N1',
  'KNOW:PHY-PHASE-TRANSITIONS': 'KD:PHYS-THERM:N1',
  'KNOW:AST-PLANETARY': 'KD:GEO-PLANET:N1',
  'KNOW:PHY-DENSITY': 'KD:PHYS:N1',
  'KNOW:CHE-CRYSTAL-STRUCTURE': 'KD:MTL:N1',
  'KNOW:PHY-VAPOR-PRESSURE': 'KD:PHYS-THERM:N1',
  'KNOW:PHY-HEAT-CAPACITY': 'KD:PHYS-THERM:N1',
  'KNOW:PHY-LATENT-HEAT': 'KD:PHYS-THERM:N1',
  'KNOW:ENV-CLIMATE': 'KD:ENV:N1',
  'KNOW:ENG-LIFE-SUPPORT': 'KD:SPACE-LIFE-SUPPORT:N2',
  'KNOW:ENV-RESOURCES': 'KD:ENV:N1',
  'KNOW:AST-ORBITAL': 'KD:SPACE-ORBITAL-MECHANICS:N2',
  'KNOW:PHY-MECHANICS': 'KD:PHYS:N1',
  'KNOW:AST-MARS': 'KD:GEO-PLANET:N1',
  'KNOW:ENG-ISRU': 'KD:SPACE-ISRU:N2',
  'KNOW:ENV-TOXICOLOGY': 'KD:ENV:N1',
  'KNOW:PHY-SURFACE': 'KD:PHYS:N1',
  'KNOW:AST-MOON': 'KD:GEO-PLANET:N1',
  'KNOW:ENG-MATERIALS': 'KD:MTL:N1',
  'KNOW:ENG-SAFETY': 'KD:ENG-SAFETY:N2',
  'KNOW:AST-NAVIGATION': 'KD:SPACE-NAVIGATION:N2',
  'KNOW:ENG-SYSTEMS': 'KD:ENG:N1',
  'KNOW:CHE-WATER': 'KD:CHM:N1',
  'KNOW:ENG-FILTRATION': 'KD:ENG-WATER-TREATMENT:N2',
  'KNOW:ENV-WATER': 'KD:ENV:N1',
};

const SUPERSEDED_LEGACY_PATH_IDS = new Set([
  'PATH:SSF:CHE-KUECHE-KARAMELL-0001',
  'PATH:SSF:CHE-REINIGUNG-ROTWEIN-0001',
  'PATH:SSF:ECO-KREDIT-0001',
  'PATH:SSF:ECO-KREDIT-NOXIA-0001',
  'PATH:SSF:ECO-ZINS-0001',
  'PATH:SSF:ECO-ZINSESZINS-NOXIA-0001',
  'PATH:SSF:ENG-ROHSTOFFGEWINNUNG-0001',
]);

const SUPERSEDED_FOUNDATION_PATH_IDS = new Set([
  'PATH:SSF:NOX-WATER-PROCESSING-0001',
  'PATH:SSF:NOX-RESOURCE-EXTRACTION-0001',
]);

function normalizeModuleId(id: string): string {
  return id.replace(/^LRN:SSF:/, 'SSF-').replace(/^SSF:/, 'SSF-').toUpperCase();
}

function pathScope(pathId: string): string {
  return pathId
    .replace(/^PATH:SSF:/, '')
    .replace(/-0001$/, '')
    .replace(/[^A-Za-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toUpperCase();
}

function canonicalizeDomains(path: LearningPath): LearningPath {
  return {
    ...path,
    domainsNeeded: [...new Set(path.domainsNeeded.map((id) => LEGACY_DOMAIN_MAP[id] ?? id))],
  };
}

function dedupePathsById(paths: LearningPath[]): LearningPath[] {
  const seen = new Set<string>();
  return paths.filter((path) => {
    if (seen.has(path.id)) return false;
    seen.add(path.id);
    return true;
  });
}

function scopeAmbiguousModuleIds(paths: LearningPath[], preservePathIds: Set<string>): LearningPath[] {
  const sourceCounts = new Map<string, number>();
  const kxfCounts = new Map<string, number>();
  const sourcePreserved = new Map<string, number>();
  const kxfPreserved = new Map<string, number>();

  for (const path of paths) {
    sourceCounts.set(path.sourceModuleId, (sourceCounts.get(path.sourceModuleId) ?? 0) + 1);
    kxfCounts.set(path.kxfModuleId, (kxfCounts.get(path.kxfModuleId) ?? 0) + 1);
    if (preservePathIds.has(path.id)) {
      sourcePreserved.set(path.sourceModuleId, (sourcePreserved.get(path.sourceModuleId) ?? 0) + 1);
      kxfPreserved.set(path.kxfModuleId, (kxfPreserved.get(path.kxfModuleId) ?? 0) + 1);
    }
  }

  return paths.map((path) => {
    const scope = pathScope(path.id);
    const sourceDuplicate = (sourceCounts.get(path.sourceModuleId) ?? 0) > 1;
    const kxfDuplicate = (kxfCounts.get(path.kxfModuleId) ?? 0) > 1;
    const keepSource = preservePathIds.has(path.id) && (sourcePreserved.get(path.sourceModuleId) ?? 0) === 1;
    const keepKxf = preservePathIds.has(path.id) && (kxfPreserved.get(path.kxfModuleId) ?? 0) === 1;

    return {
      ...path,
      sourceModuleId: sourceDuplicate && !keepSource ? `SSF-LOCAL-${scope}` : path.sourceModuleId,
      kxfModuleId: kxfDuplicate && !keepKxf ? `LRN:SSF:LOCAL-${scope}` : path.kxfModuleId,
    };
  });
}

function scopeDuplicateLearningObjectIds(paths: LearningPath[]): LearningPath[] {
  const counts = new Map<string, number>();
  for (const path of paths) {
    for (const unit of path.units) {
      counts.set(unit.id, (counts.get(unit.id) ?? 0) + 1);
      for (const section of unit.sections) counts.set(section.id, (counts.get(section.id) ?? 0) + 1);
    }
  }

  return paths.map((path) => {
    const scope = pathScope(path.id);
    const unitIdMap = new Map<string, string>();
    for (const unit of path.units) {
      if ((counts.get(unit.id) ?? 0) > 1) {
        const [kind, ...rest] = unit.id.split(':');
        unitIdMap.set(unit.id, `${kind}:${scope}:${rest.join('-')}`);
      }
    }

    return {
      ...path,
      units: path.units.map((unit) => {
        const scopedUnitId = unitIdMap.get(unit.id) ?? unit.id;
        const scopedGate = unit.gate?.unlocksUnitId
          ? { ...unit.gate, unlocksUnitId: unitIdMap.get(unit.gate.unlocksUnitId) ?? unit.gate.unlocksUnitId }
          : unit.gate;

        return {
          ...unit,
          id: scopedUnitId,
          gate: scopedGate,
          sections: unit.sections.map((section) => {
            if ((counts.get(section.id) ?? 0) <= 1) return section;
            const [kind, ...rest] = section.id.split(':');
            return {
              ...section,
              id: `${kind}:${scope}:${rest.join('-')}`,
              interactiveId: section.interactive ? (section.interactiveId ?? section.id) : section.interactiveId,
            };
          }),
        };
      }),
    };
  });
}

function quarantineUnmappedLegacyDomains(paths: LearningPath[]) {
  const active: LearningPath[] = [];
  const quarantined: LearningPath[] = [];
  const issues: LearningPathRegistryIssue[] = [];

  for (const path of paths) {
    const unresolved = path.domainsNeeded.filter((id) => id.startsWith('KNOW:'));
    if (unresolved.length === 0) {
      active.push(path);
      continue;
    }
    quarantined.push(path);
    for (const id of unresolved) {
      issues.push({
        type: 'quarantined_legacy_domain',
        id,
        pathIds: [path.id],
        detail: 'Path is excluded from the consumable registry until KG provides a canonical KD:* mapping.',
      });
    }
  }

  return { active, quarantined, issues };
}

function addToMultiMap(map: Map<string, LearningPath[]>, id: string, path: LearningPath) {
  const normalized = normalizeModuleId(id);
  const entries = map.get(normalized) ?? [];
  if (!entries.some((entry) => entry.id === path.id)) entries.push(path);
  map.set(normalized, entries);
}

export function validateLearningPathRegistry(source: LearningPath[]) {
  const byId = new Map<string, LearningPath>();
  const byModuleId = new Map<string, LearningPath[]>();
  const issues: LearningPathRegistryIssue[] = [];
  const pathCounts = new Map<string, number>();
  const sourceModuleMap = new Map<string, LearningPath[]>();
  const kxfModuleMap = new Map<string, LearningPath[]>();
  const objectOwners = new Map<string, string[]>();

  for (const path of source) {
    pathCounts.set(path.id, (pathCounts.get(path.id) ?? 0) + 1);
    if (!byId.has(path.id)) byId.set(path.id, path);
    addToMultiMap(byModuleId, path.sourceModuleId, path);
    addToMultiMap(byModuleId, path.kxfModuleId, path);
    addToMultiMap(sourceModuleMap, path.sourceModuleId, path);
    addToMultiMap(kxfModuleMap, path.kxfModuleId, path);

    for (const domainId of path.domainsNeeded) {
      if (domainId.startsWith('KNOW:')) {
        issues.push({ type: 'legacy_domain_reference', id: domainId, pathIds: [path.id], detail: 'Active runtime paths must expose canonical KD:* domains.' });
      }
    }

    const unitIds = new Set(path.units.map((unit) => unit.id));
    for (const unit of path.units) {
      const objectIds = [unit.id, ...unit.sections.map((section) => section.id)];
      for (const objectId of objectIds) {
        const owners = objectOwners.get(objectId) ?? [];
        owners.push(path.id);
        objectOwners.set(objectId, owners);
      }
      if (unit.gate?.unlocksUnitId && !unitIds.has(unit.gate.unlocksUnitId)) {
        issues.push({ type: 'broken_unit_gate', id: unit.id, pathIds: [path.id], detail: `Gate target ${unit.gate.unlocksUnitId} does not exist in path.` });
      }
    }
  }

  for (const [id, occurrences] of pathCounts) {
    if (occurrences > 1) issues.push({ type: 'duplicate_path_id', id, occurrences });
  }
  for (const [id, paths] of sourceModuleMap) {
    if (paths.length > 1) issues.push({ type: 'duplicate_source_module_id', id, occurrences: paths.length, pathIds: paths.map((p) => p.id) });
  }
  for (const [id, paths] of kxfModuleMap) {
    if (paths.length > 1) issues.push({ type: 'duplicate_kxf_module_id', id, occurrences: paths.length, pathIds: paths.map((p) => p.id) });
  }
  for (const [id, owners] of objectOwners) {
    if (owners.length > 1) issues.push({ type: 'duplicate_learning_object_id', id, occurrences: owners.length, pathIds: owners });
  }

  for (const [aliasId, targetPathId] of Object.entries(MODULE_ALIAS_MAP)) {
    const target = byId.get(targetPathId);
    if (!target) {
      issues.push({ type: 'broken_alias_target', id: aliasId, detail: `Alias target ${targetPathId} does not exist.` });
      continue;
    }
    addToMultiMap(byModuleId, aliasId, target);
  }

  for (const [moduleId, paths] of byModuleId) {
    if (paths.length > 1) issues.push({ type: 'ambiguous_module_mapping', id: moduleId, occurrences: paths.length, pathIds: paths.map((p) => p.id) });
  }

  return { paths: [...byId.values()], byId, byModuleId, issues };
}

const governedPaths: LearningPath[] = [
  caramelizationLearningPath,
  redWineStainLearningPath,
  ...financeLearningPaths,
  maillardLearningPath,
  magnetismMaterialsLearningPath,
  noxiaWaterProcessingLearningPath,
  noxiaResourceExtractionLearningPath,
  ...noxiaUnlockFoundationLearningPaths.filter((path) => !SUPERSEDED_FOUNDATION_PATH_IDS.has(path.id)),
  contracomologyLearningPath,
];

const governedPathIds = new Set(governedPaths.map((path) => path.id));
const legacyPaths = learningPaths.filter((path) => !SUPERSEDED_LEGACY_PATH_IDS.has(path.id));

const candidates = dedupePathsById([
  ...governedPaths,
  ...legacyPaths,
].map(canonicalizeDomains));

const quarantine = quarantineUnmappedLegacyDomains(candidates);
const withUniqueModules = scopeAmbiguousModuleIds(quarantine.active, governedPathIds);
const normalizedPaths = scopeDuplicateLearningObjectIds(withUniqueModules);
const validation = validateLearningPathRegistry(normalizedPaths);

const registry = {
  ...validation,
  issues: [...validation.issues, ...quarantine.issues],
};

export const registeredLearningPaths = registry.paths;
export const quarantinedLearningPaths = quarantine.quarantined;
export const learningPathRegistryIssues = registry.issues;

export function getRegisteredLearningPathById(id: string): LearningPath | null {
  return registry.byId.get(id) ?? null;
}

export function getRegisteredLearningPathForModule(moduleId: string): LearningPath | null {
  const matches = registry.byModuleId.get(normalizeModuleId(moduleId)) ?? [];
  return matches.length === 1 ? matches[0] : null;
}

export function getRegisteredLearningPathsForModule(moduleId: string): LearningPath[] {
  return [...(registry.byModuleId.get(normalizeModuleId(moduleId)) ?? [])];
}

export function getLearningPathStatus(status: LearningPathLifecycleStatus) {
  return LEARNING_PATH_STATUS[status];
}
