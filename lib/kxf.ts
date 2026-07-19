/**
 * KUEPER - Solar Science Foundation (SSF)
 * Path: lib/kxf.ts
 * Repo: github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/kxf.ts
 * Name: kxf - fetch and normalise KUEPER Exchange Format
 * Version: 0.3.0
 * Created: 2026-06-26
 * Modified: 2026-07-08
 * Depends: lib/modules, lib/api/kg
 */

import { learningModules, type LearningModule } from './modules';
import { fetchKgExport } from './api/kg';

const LEGACY_KXF_EXPORT = 'exports/kxf-0.1.json';
const LEARNING_MODULES_EXPORT = 'exports/kxf-learning-modules-0.1.json';
const REGISTRY_EXPORT = 'exports/kxf-0.6.json';

const ENV_LEGACY_KXF_URL = process.env.KUEPER_KG_KXF_URL;
const ENV_LEARNING_MODULES_URL = process.env.KUEPER_KXF_MODULES_URL;

export type KxfEntity = {
  id: string;
  type?: string;
  layer?: string;
  domain?: string;
  name?: string;
};

export type KxfLearningModule = {
  id: string;
  legacyId?: string;
  canonicalId?: string;
  system?: string;
  name?: string;
  title?: string | { de?: string; en?: string };
  teaches?: string[];
  requires?: string[];
  unlocks?: string[];
  noxiaGrants?: string[];
  meta?: {
    title?: string;
    subject?: string;
    status?: string;
    type?: string;
    duration_min?: number;
    duration_max?: number;
    durationMin?: number;
    durationMax?: number;
    entry_question?: string;
    entryQuestion?: string;
    i18n?: Record<string, { title?: string; entryQuestion?: string; summary?: string }>;
  };
  dependencies?: {
    requires?: string[];
    module_unlocks?: string[];
    moduleUnlocks?: string[];
    archive_unlocks?: string[];
    archiveUnlocks?: string[];
  };
  noxia?: {
    grants?: string[];
  };
};

export type KxfUnlock = {
  id: string;
  system?: string;
  target_system?: string;
  requires?: string[];
  unlocks?: string[];
};

export type KxfExport = {
  schema: string;
  name?: string;
  master?: string;
  status?: string;
  principle?: string;
  records?: {
    entities?: KxfEntity[];
    documents?: unknown[];
    knowledgeDomains?: unknown[];
    knowledge_domains?: unknown[];
    prerequisites?: unknown[];
    learningModules?: KxfLearningModule[];
    learning_modules?: KxfLearningModule[];
    unlocks?: KxfUnlock[];
    buildings?: unknown[];
    mappings?: unknown[];
    activeConsumerContracts?: Array<{ consumer?: string; export?: string; recordSet?: string }>;
  };
};

export type KxfSnapshot = {
  sourceUrl: string;
  sourceType?: 'kg-live-api' | 'github-raw' | 'none' | 'custom-url';
  loaded: boolean;
  error?: string;
  data?: KxfExport;
};

export function kxfUrl() {
  return ENV_LEGACY_KXF_URL ?? LEGACY_KXF_EXPORT;
}

export function learningModulesUrl() {
  return ENV_LEARNING_MODULES_URL ?? LEARNING_MODULES_EXPORT;
}

async function fetchCustomUrl(sourceUrl: string): Promise<KxfSnapshot> {
  try {
    const response = await fetch(sourceUrl, {
      next: { revalidate: 300 },
      headers: { accept: 'application/json' }
    });
    if (!response.ok) {
      return { sourceUrl, sourceType: 'custom-url', loaded: false, error: `HTTP ${response.status}` };
    }
    const data = (await response.json()) as KxfExport;
    if (!isKxfExport(data)) {
      return { sourceUrl, sourceType: 'custom-url', loaded: false, error: 'KXF response has an unexpected shape' };
    }
    return { sourceUrl, sourceType: 'custom-url', loaded: true, data };
  } catch (error) {
    return {
      sourceUrl,
      sourceType: 'custom-url',
      loaded: false,
      error: error instanceof Error ? error.message : 'Unknown KXF fetch error'
    };
  }
}

async function fetchExportSnapshot(exportPathOrUrl: string): Promise<KxfSnapshot> {
  if (/^https?:\/\//.test(exportPathOrUrl)) {
    return fetchCustomUrl(exportPathOrUrl);
  }

  const result = await fetchKgExport<KxfExport>(exportPathOrUrl);
  if (!result.data || !isKxfExport(result.data)) {
    return {
      sourceUrl: result.sourceUrl,
      sourceType: result.sourceType,
      loaded: false,
      error: result.error ?? 'KXF response has an unexpected shape'
    };
  }

  return {
    sourceUrl: result.sourceUrl,
    sourceType: result.sourceType,
    loaded: true,
    error: result.error,
    data: result.data
  };
}

export async function fetchKxfRegistrySnapshot(): Promise<KxfSnapshot> {
  return fetchExportSnapshot(REGISTRY_EXPORT);
}

export async function fetchKxfSnapshot(): Promise<KxfSnapshot> {
  return fetchExportSnapshot(kxfUrl());
}

export async function fetchLearningModulesSnapshot(): Promise<KxfSnapshot> {
  return fetchExportSnapshot(learningModulesUrl());
}

function isKxfExport(value: unknown): value is KxfExport {
  if (typeof value !== 'object' || value === null) return false;
  const record = value as Record<string, unknown>;
  const records = record.records;
  return typeof record.schema === 'string' && typeof records === 'object' && records !== null;
}

export function toSsfModuleId(kxfModuleId: string) {
  if (kxfModuleId.startsWith('LRN:SSF:')) {
    return `SSF-${kxfModuleId.slice('LRN:SSF:'.length)}`;
  }
  if (/^[A-Z]{3}-\d{4}$/.test(kxfModuleId)) {
    return `SSF-${kxfModuleId}`;
  }
  return kxfModuleId;
}

export function toKxfModuleId(ssfModuleId: string) {
  if (ssfModuleId.startsWith('SSF-')) {
    return `LRN:SSF:${ssfModuleId.slice('SSF-'.length)}`;
  }
  return ssfModuleId;
}

export function moduleRouteParam(id: string) {
  return toSsfModuleId(id);
}

export function moduleIdMatches(module: LearningModule, routeId: string) {
  const ssfRouteId = toSsfModuleId(routeId);
  return module.id === ssfRouteId || toKxfModuleId(module.id) === routeId || module.id === routeId;
}

function domainFromKxf(module: KxfLearningModule, entities: KxfEntity[]) {
  const firstTaught = module.teaches?.[0];
  const entity = firstTaught ? entities.find((item) => item.id === firstTaught) : undefined;
  if (entity?.domain) return entity.domain;

  const subject = module.meta?.subject;
  if (subject === 'MAT') return 'Mathematics';
  if (subject === 'PHY') return 'Physics';
  if (subject === 'CHE' || subject === 'CHM') return 'Chemistry';
  if (subject === 'AST') return 'Astronomy';
  if (subject === 'BIO') return 'Biology';
  if (subject === 'EAR' || subject === 'GEO') return 'Earth science';
  return 'Science';
}

function fallbackModuleFor(ssfId: string) {
  return learningModules.find((module) => module.id === ssfId) ?? null;
}

function moduleSortValue(module: LearningModule) {
  const domainOrder: Record<string, number> = {
    Mathematics: 0,
    Physics: 1,
    Chemistry: 2,
    Astronomy: 3,
    Biology: 4,
    'Earth science': 5,
    Science: 9
  };
  return `${domainOrder[module.domain] ?? 8}-${module.id}`;
}

function modulesFromExport(kxf: KxfExport): KxfLearningModule[] {
  return kxf.records?.learning_modules ?? kxf.records?.learningModules ?? [];
}

function moduleRequires(module: KxfLearningModule) {
  return module.dependencies?.requires ?? module.requires ?? [];
}

function moduleUnlocks(module: KxfLearningModule) {
  return module.dependencies?.moduleUnlocks ?? module.dependencies?.module_unlocks ?? module.unlocks ?? [];
}

function moduleNoxiaGrants(module: KxfLearningModule) {
  return module.noxiaGrants ?? module.noxia?.grants ?? [];
}

function moduleDuration(module: KxfLearningModule, fallback: LearningModule | null) {
  return module.meta?.durationMin ?? module.meta?.duration_min ?? fallback?.durationMinutes ?? 8;
}

function moduleEntryQuestion(module: KxfLearningModule) {
  return module.meta?.entryQuestion ?? module.meta?.entry_question ?? module.meta?.i18n?.en?.entryQuestion;
}

export function normaliseKxfModules(kxf: KxfExport, legacyKxf?: KxfExport): LearningModule[] {
  const kxfModules = modulesFromExport(kxf);
  const entities = legacyKxf?.records?.entities ?? kxf.records?.entities ?? [];

  if (kxfModules.length === 0) {
    return learningModules;
  }

  const merged = new Map<string, LearningModule>();

  for (const module of kxfModules) {
    const ssfId = toSsfModuleId(module.id);
    const fallback = fallbackModuleFor(ssfId);
    const durationMinutes = moduleDuration(module, fallback);
    const titleObj = typeof module.title === 'object' ? module.title : undefined;
    const titleStr = typeof module.title === 'string' ? module.title : undefined;
    const title = fallback?.title ?? module.meta?.title ?? titleObj?.de ?? titleObj?.en ?? titleStr ?? module.name ?? ssfId;
    const summary = fallback?.summary ?? moduleEntryQuestion(module) ?? module.meta?.i18n?.en?.summary ?? '';

    merged.set(ssfId, {
      id: ssfId,
      title,
      domain: fallback?.domain ?? domainFromKxf(module, entities),
      difficulty: fallback?.difficulty ?? 1,
      durationMinutes,
      summary,
      source: {
        authority: 'kueper-knowledge-graph',
        kxfEntityIds: module.teaches ?? fallback?.source.kxfEntityIds ?? []
      },
      unlocks: [...moduleUnlocks(module), ...moduleNoxiaGrants(module)].filter(Boolean),
      exercises: fallback?.exercises ?? []
    });
  }

  for (const fallback of learningModules) {
    if (!merged.has(fallback.id)) {
      merged.set(fallback.id, fallback);
    }
  }

  return [...merged.values()].sort((a, b) => moduleSortValue(a).localeCompare(moduleSortValue(b)));
}

export async function getKxfLearningModules(): Promise<LearningModule[]> {
  const [learningSnapshot, legacySnapshot] = await Promise.all([
    fetchLearningModulesSnapshot(),
    fetchKxfSnapshot()
  ]);

  if (learningSnapshot.loaded && learningSnapshot.data) {
    return normaliseKxfModules(learningSnapshot.data, legacySnapshot.data);
  }

  if (legacySnapshot.loaded && legacySnapshot.data) {
    return normaliseKxfModules(legacySnapshot.data);
  }

  return learningModules;
}

export async function getKxfLearningModuleById(id: string): Promise<LearningModule | null> {
  const modules = await getKxfLearningModules();
  return modules.find((module) => moduleIdMatches(module, id)) ?? null;
}

export async function findUnresolvedRequirements() {
  const snapshot = await fetchLearningModulesSnapshot();
  const modules = snapshot.data ? modulesFromExport(snapshot.data) : [];
  const ids = new Set(modules.map((module) => module.id));
  const missing: Array<{ moduleId: string; requirementId: string }> = [];

  for (const module of modules) {
    for (const requirementId of moduleRequires(module)) {
      if (requirementId.startsWith('LRN:SSF:') && !ids.has(requirementId)) {
        missing.push({ moduleId: module.id, requirementId });
      }
    }
  }

  return missing;
}
