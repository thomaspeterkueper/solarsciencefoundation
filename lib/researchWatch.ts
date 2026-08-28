export type ResearchImpact = 'NEW' | 'CONFIRMS' | 'REVISES' | 'CONTRADICTS' | 'DEPRECATES' | 'NO_IMPACT' | 'UNCERTAIN';
export type EvidenceKind = 'peer_reviewed' | 'preprint' | 'dataset' | 'registry' | 'correction' | 'retraction';
export type WatchTopic = { id: string; label: string; keywords: string[]; minRelevance: number };
export type WatchSource = { id: string; kind: 'doi' | 'arxiv' | 'registry'; enabled: boolean; costPolicy: 'normal' | 'prefer_off_peak' };
export type Discovery = { id: string; title: string; abstract?: string; doi?: string; arxivId?: string; registryId?: string; sourceId: string; evidenceKind: EvidenceKind; corrected?: boolean; retracted?: boolean; provenance: string[] };
export type TriagedDiscovery = Discovery & { topicIds: string[]; relevance: number; impact: ResearchImpact };
export type TaskCandidate = { type: 'RESEARCH_DISCOVERY' | 'CANON_VALIDATION'; discoveryId: string; reason: string; costPolicy: 'normal' | 'prefer_off_peak' };

export const watchTopics: WatchTopic[] = [
  { id: 'solar-physics', label: 'Solar physics', keywords: ['solar', 'sun', 'heliophysics'], minRelevance: 0.45 },
  { id: 'materials', label: 'Functional materials', keywords: ['magnetic', 'material', 'semiconductor'], minRelevance: 0.45 },
  { id: 'planetology', label: 'Planetology', keywords: ['planet', 'planetary', 'exoplanet'], minRelevance: 0.45 }
];
export const watchSources: WatchSource[] = [
  { id: 'crossref-doi', kind: 'doi', enabled: true, costPolicy: 'normal' },
  { id: 'arxiv', kind: 'arxiv', enabled: true, costPolicy: 'normal' },
  { id: 'registry', kind: 'registry', enabled: true, costPolicy: 'prefer_off_peak' }
];

export function discoveryKey(d: Discovery): string {
  if (d.doi) return `doi:${d.doi.toLowerCase().replace(/^https?:\/\/(dx\.)?doi\.org\//, '')}`;
  if (d.arxivId) return `arxiv:${d.arxivId.toLowerCase()}`;
  if (d.registryId) return `registry:${d.registryId.toLowerCase()}`;
  return `id:${d.id}`;
}

export function deduplicateDiscoveries(input: Discovery[]): Discovery[] {
  const seen = new Map<string, Discovery>();
  for (const item of input) if (!seen.has(discoveryKey(item))) seen.set(discoveryKey(item), item);
  return [...seen.values()];
}

export function relevanceFor(discovery: Discovery, topic: WatchTopic): number {
  const text = `${discovery.title} ${discovery.abstract ?? ''}`.toLowerCase();
  const matches = topic.keywords.filter((keyword) => text.includes(keyword.toLowerCase())).length;
  return topic.keywords.length ? matches / topic.keywords.length : 0;
}

export function classifyImpact(discovery: Discovery, relevance: number): ResearchImpact {
  if (discovery.retracted || discovery.evidenceKind === 'retraction') return 'DEPRECATES';
  if (discovery.evidenceKind === 'correction' || discovery.corrected) return 'REVISES';
  if (relevance === 0) return 'NO_IMPACT';
  if (discovery.evidenceKind === 'preprint') return 'UNCERTAIN';
  return 'NEW';
}

export function triageDiscovery(discovery: Discovery): TriagedDiscovery {
  const scored = watchTopics.map((topic) => ({ topic, score: relevanceFor(discovery, topic) }));
  const topicIds = scored.filter(({ topic, score }) => score >= topic.minRelevance).map(({ topic }) => topic.id);
  const relevance = Math.max(0, ...scored.map(({ score }) => score));
  return { ...discovery, topicIds, relevance, impact: classifyImpact(discovery, relevance) };
}

export function promoteDiscovery(item: TriagedDiscovery): TaskCandidate | null {
  if (item.impact === 'NO_IMPACT' || item.relevance < 0.45) return null;
  if (['REVISES', 'CONTRADICTS', 'DEPRECATES'].includes(item.impact)) return { type: 'CANON_VALIDATION', discoveryId: item.id, reason: `Evidence impact ${item.impact} requires human canon validation.`, costPolicy: 'prefer_off_peak' };
  return { type: 'RESEARCH_DISCOVERY', discoveryId: item.id, reason: `Relevant ${item.evidenceKind} evidence requires review before curriculum impact.`, costPolicy: item.evidenceKind === 'preprint' ? 'prefer_off_peak' : 'normal' };
}

export function buildOutboxEnvelope(candidate: TaskCandidate) {
  return { schema: 'KUEPER-OUTBOX-1.0', target: 'ECO', source: 'SSF', kind: candidate.type, payload: candidate };
}
