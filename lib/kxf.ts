/**
 * KUEPER - Solar Science Foundation (SSF)
 * Path: lib/kxf.ts
 * Repo: github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/kxf.ts
 * Name: kxf - fetch and normalise KUEPER Exchange Format
 * Version: 0.1.0
 * Created: 2026-06-26
 * Modified: 2026-06-26 18:25 CEST
 * Depends: lib/modules
 */

import { learningModules, type LearningModule } from './modules';

const DEFAULT_KXF_URL =
  'https://raw.githubusercontent.com/thomaspeterkueper/kueper-knowledge-graph/main/exports/kxf-0.1.json';

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
  teaches?: string[];
  requires?: string[];
  unlocks?: string[];
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
    learningModules?: KxfLearningModule[];
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
  return process.env.KUEPER_KG_KXF_URL ?? DEFAULT_KXF_URL;
}

export async function fetchKxfSnapshot(): Promise<KxfSnapshot> {
  const sourceUrl = kxfUrl();

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

function isKxfExport(value: unknown): value is KxfExport {
  if (typeof value !== 'object' || value === null) return false;
  const record = value as Record<string, unknown>;
  return record.schema === 'KXF-0.1' && typeof record.records === 'object';
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
  return entity?.domain ?? 'Science';
}

function fallbackModuleFor(ssfId: string) {
  return learningModules.find((module) => module.id === ssfId) ?? null;
}

export function normaliseKxfModules(kxf: KxfExport): LearningModule[] {
  const kxfModules = kxf.records?.learningModules ?? [];
  const entities = kxf.records?.entities ?? [];

  if (kxfModules.length === 0) {
    return learningModules;
  }

  return kxfModules.map((module) => {
    const ssfId = toSsfModuleId(module.id);
    const fallback = fallbackModuleFor(ssfId);

    return {
      id: ssfId,
      title: fallback?.title ?? module.name ?? ssfId,
      domain: fallback?.domain ?? domainFromKxf(module, entities),
      difficulty: fallback?.difficulty ?? 1,
      durationMinutes: fallback?.durationMinutes ?? 8,
      summary:
        fallback?.summary ??
        'A learning module imported from the KUEPER Knowledge Graph. Detailed SSF text will be added by the didactic layer.',
      source: {
        authority: 'kueper-knowledge-graph',
        kxfEntityIds: module.teaches ?? []
      },
      unlocks: module.unlocks ?? fallback?.unlocks ?? [],
      exercises: fallback?.exercises ?? []
    };
  });
}

export async function getKxfLearningModules(): Promise<LearningModule[]> {
  const snapshot = await fetchKxfSnapshot();
  if (!snapshot.loaded || !snapshot.data) {
    return learningModules;
  }
  return normaliseKxfModules(snapshot.data);
}

export async function getKxfLearningModuleById(id: string): Promise<LearningModule | null> {
  const modules = await getKxfLearningModules();
  return modules.find((module) => module.id === id || toKxfModuleId(module.id) === id) ?? null;
}
