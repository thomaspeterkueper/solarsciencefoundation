import { getPrerequisiteView, getPrerequisites, type PrerequisiteView } from './prerequisites';
import { getKxfLearningModules } from './kxf';
import { resolveKgId, fetchKgExport } from './api/kg';

export type OtaDocumentView = {
  id: string;
  title: string;
  source: 'kg-live-api' | 'derived-placeholder';
  canonicalId: string;
  prerequisites: PrerequisiteView['prerequisites'];
  suggestedModules: Array<{
    id: string;
    title: string;
    domain: string;
    durationMinutes: number;
    summary: string;
  }>;
};

type ResolvedDocument = {
  id?: unknown;
  title?: unknown;
  name?: unknown;
  label?: unknown;
};

function asString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value : null;
}

function toCanonicalOtaId(documentId: string) {
  return documentId.startsWith('DOC:OTA:') ? documentId : `DOC:OTA:${documentId}`;
}

function toDisplayDocumentId(documentId: string) {
  return documentId.startsWith('DOC:OTA:') ? documentId.slice('DOC:OTA:'.length) : documentId;
}

function fallbackTitle(documentId: string) {
  return toDisplayDocumentId(documentId).replace(/-/g, ' ');
}

export async function getOtaDocumentView(documentId: string): Promise<OtaDocumentView> {
  const canonicalId = toCanonicalOtaId(documentId);
  const [resolved, prerequisiteView, modules] = await Promise.all([
    resolveKgId<ResolvedDocument>(canonicalId),
    getPrerequisiteView(canonicalId),
    getKxfLearningModules()
  ]);

  const title = asString(resolved.data?.title)
    ?? asString(resolved.data?.name)
    ?? asString(resolved.data?.label)
    ?? fallbackTitle(documentId);

  const prerequisiteCodes = new Set(prerequisiteView.prerequisites.map((item) => item.code));
  const suggestedModules = modules
    .filter((module) => {
      const haystack = `${module.id} ${module.title} ${module.domain} ${module.summary}`.toUpperCase();
      return [...prerequisiteCodes].some((code) => haystack.includes(code.split('-')[0] ?? code));
    })
    .slice(0, 8)
    .map((module) => ({
      id: module.id,
      title: module.title,
      domain: module.domain,
      durationMinutes: module.durationMinutes,
      summary: module.summary
    }));

  return {
    id: toDisplayDocumentId(documentId),
    canonicalId,
    title,
    source: resolved.loaded ? 'kg-live-api' : 'derived-placeholder',
    prerequisites: prerequisiteView.prerequisites,
    suggestedModules
  };
}

// --- Research overview (SSF-0006) ---------------------------------------
//
// The Research page needs two things the entity-registry alone can't give
// it: which registered documents actually have a real prerequisite path
// (worth featuring), and how large the archive is overall (for an honest
// "more being added" note about everything that's registered but not yet
// connected). Kept here rather than inline in the page so both locale
// versions can share it.

export type ResearchDocumentSummary = {
  documentId: string;
  view: OtaDocumentView;
};

export type ResearchOverview = {
  featured: ResearchDocumentSummary[];
  registeredCount: number;
};

type EntityRegistryExport = {
  records?: Array<{ id: string }>;
};

export async function getResearchOverview(): Promise<ResearchOverview> {
  const [prerequisites, registry] = await Promise.all([
    getPrerequisites(),
    fetchKgExport<EntityRegistryExport>('/exports/entity-registry-0.1.json')
  ]);

  const documentIds = [...new Set(prerequisites.map((item) => item.documentId))];

  const featured = await Promise.all(
    documentIds.map(async (documentId) => ({
      documentId,
      view: await getOtaDocumentView(documentId)
    }))
  );

  const registeredCount = (registry.data?.records ?? []).filter((record) =>
    record.id.startsWith('DOC:')
  ).length;

  return { featured, registeredCount };
}
