import { fetchKxfSnapshot } from './kxf';

const DEFAULT_KNOWLEDGE_DOMAINS_URL =
  'https://raw.githubusercontent.com/thomaspeterkueper/kueper-knowledge-graph/main/exports/knowledge-domains-0.1.json';

export type KnowledgeLevel = 'N1' | 'N2' | 'N3' | 'N4';

export type KnowledgeDomain = {
  id: string;
  code: string;
  name: string;
  description?: string;
  category?: string;
  aliases?: string[];
  levelSupport?: KnowledgeLevel[];
  learnerFacing: boolean;
};

export type DocumentPrerequisite = {
  documentId: string;
  domainId: string;
  code: string;
  level: KnowledgeLevel;
  learnerFacing: boolean;
  purpose?: 'read' | 'create' | 'recommended';
  description?: string;
};

export type PrerequisiteView = {
  documentId: string;
  prerequisites: Array<DocumentPrerequisite & { domain?: KnowledgeDomain }>;
};

type RawKnowledgeDomain = {
  id?: unknown;
  code?: unknown;
  name?: unknown;
  description?: unknown;
  category?: unknown;
  aliases?: unknown;
  levelSupport?: unknown;
};

type RawPrerequisite = {
  documentId?: unknown;
  document?: unknown;
  target?: unknown;
  domainId?: unknown;
  domain?: unknown;
  code?: unknown;
  level?: unknown;
  purpose?: unknown;
  description?: unknown;
};

type KnowledgeDomainsExport = {
  schema?: string;
  records?: {
    knowledgeDomains?: RawKnowledgeDomain[];
  };
  knowledgeDomains?: RawKnowledgeDomain[];
};

export function knowledgeDomainsUrl() {
  return process.env.KUEPER_KG_KNOWLEDGE_DOMAINS_URL ?? DEFAULT_KNOWLEDGE_DOMAINS_URL;
}

export function isKnowledgeLevel(value: unknown): value is KnowledgeLevel {
  return value === 'N1' || value === 'N2' || value === 'N3' || value === 'N4';
}

export function isLearnerFacingLevel(level: KnowledgeLevel) {
  return level !== 'N4';
}

function asLevel(value: unknown): KnowledgeLevel | null {
  return isKnowledgeLevel(value) ? value : null;
}

function asString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value : null;
}

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : undefined;
}

function codeFromId(id: string) {
  if (id.startsWith('KNOW:')) return id.slice('KNOW:'.length);
  return id;
}

function normaliseDomain(item: RawKnowledgeDomain): KnowledgeDomain | null {
  const id = asString(item.id) ?? (asString(item.code) ? `KNOW:${asString(item.code)}` : null);
  if (!id) return null;
  const code = asString(item.code) ?? codeFromId(id);
  const levelSupport = Array.isArray(item.levelSupport)
    ? item.levelSupport.map(asLevel).filter((level): level is KnowledgeLevel => Boolean(level))
    : undefined;

  return {
    id,
    code,
    name: asString(item.name) ?? code,
    description: asString(item.description) ?? undefined,
    category: asString(item.category) ?? undefined,
    aliases: asStringArray(item.aliases),
    levelSupport,
    learnerFacing: !(levelSupport?.length === 1 && levelSupport[0] === 'N4')
  };
}

function isDocumentPrerequisite(value: DocumentPrerequisite | null): value is DocumentPrerequisite {
  return value !== null;
}

async function fetchStandaloneKnowledgeDomains(): Promise<KnowledgeDomain[]> {
  try {
    const response = await fetch(knowledgeDomainsUrl(), {
      next: { revalidate: 300 },
      headers: { accept: 'application/json' }
    });
    if (!response.ok) return [];
    const data = (await response.json()) as KnowledgeDomainsExport;
    const raw = data.records?.knowledgeDomains ?? data.knowledgeDomains ?? [];
    return raw.map(normaliseDomain).filter((item): item is KnowledgeDomain => Boolean(item));
  } catch {
    return [];
  }
}

export async function getKnowledgeDomains(): Promise<KnowledgeDomain[]> {
  const [snapshot, standalone] = await Promise.all([fetchKxfSnapshot(), fetchStandaloneKnowledgeDomains()]);
  const raw = (snapshot.data?.records as { knowledgeDomains?: RawKnowledgeDomain[] } | undefined)?.knowledgeDomains ?? [];
  const fromKxf = raw.map(normaliseDomain).filter((item): item is KnowledgeDomain => Boolean(item));
  const merged = new Map<string, KnowledgeDomain>();

  for (const domain of standalone) merged.set(domain.id, domain);
  for (const domain of fromKxf) {
    const richer = merged.get(domain.id);
    merged.set(domain.id, {
      ...domain,
      description: richer?.description ?? domain.description,
      category: richer?.category ?? domain.category,
      aliases: richer?.aliases ?? domain.aliases,
      learnerFacing: isLearnerFacingLevel(domain.levelSupport?.[0] ?? 'N1')
    });
  }

  return [...merged.values()].sort((a, b) => a.code.localeCompare(b.code));
}

export async function getKnowledgeLevelScale() {
  return [
    { level: 'N1' as const, label: 'Grundlagen', learnerFacing: true },
    { level: 'N2' as const, label: 'Fortgeschritten', learnerFacing: true },
    { level: 'N3' as const, label: 'Experte', learnerFacing: true },
    { level: 'N4' as const, label: 'Kurator / Forschung', learnerFacing: false }
  ];
}

export async function getPrerequisites(): Promise<DocumentPrerequisite[]> {
  const snapshot = await fetchKxfSnapshot();
  const raw = (snapshot.data?.records as { prerequisites?: RawPrerequisite[] } | undefined)?.prerequisites ?? [];

  const mapped: Array<DocumentPrerequisite | null> = raw.map((item) => {
    const documentId = asString(item.documentId) ?? asString(item.document) ?? asString(item.target);
    const domainId = asString(item.domainId) ?? asString(item.domain);
    const level = asLevel(item.level);
    if (!documentId || !domainId || !level) return null;
    const code = asString(item.code) ?? codeFromId(domainId);
    const purpose = item.purpose === 'create' || item.purpose === 'recommended' ? item.purpose : 'read';

    return {
      documentId,
      domainId,
      code,
      level,
      learnerFacing: isLearnerFacingLevel(level),
      purpose,
      description: asString(item.description) ?? undefined
    };
  });

  return mapped
    .filter(isDocumentPrerequisite)
    .sort((a, b) => `${a.documentId}-${a.code}-${a.level}`.localeCompare(`${b.documentId}-${b.code}-${b.level}`));
}

export async function getPrerequisiteView(documentId: string): Promise<PrerequisiteView> {
  const [domains, prerequisites] = await Promise.all([getKnowledgeDomains(), getPrerequisites()]);
  const domainById = new Map(domains.map((domain) => [domain.id, domain]));

  return {
    documentId,
    prerequisites: prerequisites
      .filter((item) => item.documentId === documentId)
      .map((item) => ({ ...item, domain: domainById.get(item.domainId) }))
  };
}
