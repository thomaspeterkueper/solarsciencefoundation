/**
 * KUEPER - Solar Science Foundation (SSF)
 * Path: lib/kxf.ts
 * Repo: github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/kxf.ts
 * Name: kxf - fetch and normalise KUEPER Exchange Format
 * Version: 0.2.0
 * Created: 2026-06-26
 * Modified: 2026-07-02
 * Depends: lib/modules
 */

import { learningModules, type LearningModule } from './modules';

const DEFAULT_LEGACY_KXF_URL =
  'https://raw.githubusercontent.com/thomaspeterkueper/kueper-knowledge-graph/main/exports/kxf-0.1.json';

const DEFAULT_LEARNING_MODULES_URL =
  'https://raw.githubusercontent.com/thomaspeterkueper/kueper-knowledge-graph/main/exports/kxf-learning-modules-0.1.json';

export type KxfEntity = {
  id: string;
  type?: string;
  layer?: string;
  domain?: string;
  name?: string;
};

export type KxfLearningModule = {
  id: string;
  system?: string;
  name?: string;
  title?: string;
  teaches?: string[];
  requires?: string[];
  unlocks?: string[];
  meta?: {
    title?: string;
    subject?: string;
    status?: string;
    duration_min?: number;
    duration_max?: number;
    entry_question?: string;
  };
  dependencies?: {
    requires?: string[];
    module_unlocks?: string[];
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
    prerequisites?: unknown[];
    learningModules?: KxfLearningModule[];
    learning_modules?: KxfLearningModule[];
    unlocks?: KxfUnlock[];
    buildings?: unknown[];
    mappings?: unknown[];
  };
};

export type KxfSnapshot = {
  sourceUrl: string;
  loaded: boolean;
  error?: string;
  data?: KxfExport;
};

export function kxfUrl() {
  return process.env.KUEPER_KG_KXF_URL ?? DEFAULT_LEGACY_KXF_URL;
}

export function learningModulesUrl() {
  return process.env.KUEPER_KXF_MODULES_URL ?? DEFAULT_LEARNING_MODULES_URL;
}

async function fetchJsonSnapshot(sourceUrl: string): Promise<KxfSnapshot> {
  try {
    const response = await fetch(sourceUrl, {
      next: { revalidate: 300 },
      headers: { accept: 'application/json' }
    });

    if (!response.ok) {
      return {
        sourceUrl,
        loaded: false,
        error: `KXF request failed with HTTP ${response.status}`
      };
    }

    const data = (await response.json()) as KxfExport;

    if (!isKxfExport(data)) {
      return {
        sourceUrl,
        loaded: false,
        error: 'KXF response has an unexpected shape'
      };
    }

    return { sourceUrl, loaded: true, data };
  } catch (error) {
    return {
      sourceUrl,
      loaded: false,
      error: error instanceof Error ? error.message : 'Unknown KXF fetch error'
    };
  }
}

export async function fetchKxfSnapshot(): Promise<KxfSnapshot> {
  return fetchJsonSnapshot(kxfUrl());
}

export async function fetchLearningModulesSnapshot(): Promise<KxfSnapshot> {
  return fetchJsonSnapshot(learningModulesUrl());
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
  return kxfModuleId;
}

export function toKxfModuleId(ssfModuleId: string) {
  if (ssfModuleId.startsWith('SSF-')) {
    return `LRN:SSF:${ssfModuleId.slice('SSF-'.length)}`;
  }
  return ssfModuleId;
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
  if (subject === 'EAR') return 'Earth science';
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

function moduleUnlocks(module: KxfLearningModule) {
  return module.dependencies?.module_unlocks ?? module.unlocks ?? [];
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
    const durationMinutes = module.meta?.duration_min ?? fallback?.durationMinutes ?? 8;

    merged.set(ssfId, {
      id: ssfId,
      title: fallback?.title ?? module.meta?.title ?? module.title ?? module.name ?? ssfId,
      domain: fallback?.domain ?? domainFromKxf(module, entities),
      difficulty: fallback?.difficulty ?? 1,
      durationMinutes,
      summary:
        fallback?.summary ??
        module.meta?.entry_question ??
        'A learning module imported from the KUEPER Knowledge Graph. Detailed SSF text will be added by the didactic layer.',
      source: {
        authority: 'kueper-knowledge-graph',
        kxfEntityIds: module.teaches ?? fallback?.source.kxfEntityIds ?? []
      },
      unlocks: moduleUnlocks(module) ?? fallback?.unlocks ?? [],
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
  return modules.find((module) => module.id === id || toKxfModuleId(module.id) === id) ?? null;
}
