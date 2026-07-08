import { getPrerequisiteView, type PrerequisiteView } from './prerequisites';
import { getKxfLearningModules } from './kxf';
import { resolveKgId } from './api/kg';

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
