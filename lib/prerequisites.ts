import { fetchKxfSnapshot } from './kxf';

export type KnowledgeLevel = 'N1' | 'N2' | 'N3';

export type KnowledgeDomain = {
  id: string;
  code: string;
  name: string;
  description?: string;
  category?: string;
  levelSupport?: KnowledgeLevel[];
};

export type DocumentPrerequisite = {
  documentId: string;
  domainId: string;
  code: string;
  level: KnowledgeLevel;
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

function asLevel(value: unknown): KnowledgeLevel | null {
  return value === 'N1' || value === 'N2' || value === 'N3' ? value : null;
}

function asString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value : null;
}

function codeFromId(id: string) {
  if (id.startsWith('KNOW:')) return id.slice('KNOW:'.length);
  return id;
}

export async function getKnowledgeDomains(): Promise<KnowledgeDomain[]> {
  const snapshot = await fetchKxfSnapshot();
  const raw = (snapshot.data?.records as { knowledgeDomains?: RawKnowledgeDomain[] } | undefined)?.knowledgeDomains ?? [];

  return raw
    .map((item) => {
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
        levelSupport
      } satisfies KnowledgeDomain;
    })
    .filter((item): item is KnowledgeDomain => Boolean(item))
    .sort((a, b) => a.code.localeCompare(b.code));
}

export async function getPrerequisites(): Promise<DocumentPrerequisite[]> {
  const snapshot = await fetchKxfSnapshot();
  const raw = (snapshot.data?.records as { prerequisites?: RawPrerequisite[] } | undefined)?.prerequisites ?? [];

  return raw
    .map((item) => {
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
        purpose,
        description: asString(item.description) ?? undefined
      } satisfies DocumentPrerequisite;
    })
    .filter((item): item is DocumentPrerequisite => Boolean(item))
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
