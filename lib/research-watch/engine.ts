/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      lib/research-watch/engine.ts
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/research-watch/engine.ts
 * Name:      research-watch - watch-and-triage engine
 * Version:   0.1.0
 * Created:   2026-08-24
 * Modified:  2026-08-24
 * Depends:   lib/research-watch/*
 *
 * Pipeline: Sources -> Discovery -> Deduplication -> Relevance -> Evidence
 * Record -> Impact classification -> bounded TaskCandidate promotion ->
 * KUEPER outbox emission for cross-project candidates.
 *
 * Discovery alone MUST NOT update learning content. This engine only writes
 * evidence records and reviewable candidates — never curriculum.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type {
  EvidenceRecord,
  NormalizedWork,
  TaskCandidate,
  WatchSource,
  WatchTopic,
} from './types';
import { getActiveWatchTopics } from './topics';
import { getEnabledWatchSources } from './sources';
import { identityKeys, normaliseArxiv, normaliseDataset, normaliseDoi, normaliseRegistry, primaryIdentityKey } from './identity';
import { scoreRelevance, DEFAULT_RELEVANCE_CONFIG, type RelevanceConfig, type RelevanceResult } from './relevance';
import { classifyImpact } from './impact';
import { promoteCandidates, DEFAULT_PROMOTION_CONFIG, type PromotionConfig, type PromotionResult } from './promotion';
import { buildCanonValidationEnvelope, envelopeFileName, validateEnvelope, type OutboxEnvelope } from './envelope';
import type { EvidenceStore } from './store';
import { getDefaultAdapters } from './adapters';
import type { DiscoveryAdapter } from './adapters/types';

export type ResearchWatchConfig = {
  relevance: RelevanceConfig;
  promotion: PromotionConfig;
};

export const DEFAULT_RESEARCH_WATCH_CONFIG: ResearchWatchConfig = {
  relevance: DEFAULT_RELEVANCE_CONFIG,
  promotion: DEFAULT_PROMOTION_CONFIG,
};

export type ResearchWatchOptions = {
  store: EvidenceStore;
  /** Defaults to the enabled sources of config/research-watch/sources.json. */
  sources?: WatchSource[];
  /** Adapter overrides, merged over the built-in adapter map. */
  adapters?: Record<string, DiscoveryAdapter>;
  /** Defaults to the active topics of config/research-watch/topics.json. */
  topics?: WatchTopic[];
  config?: {
    relevance?: Partial<RelevanceConfig>;
    promotion?: Partial<PromotionConfig>;
  };
  now?: Date;
  /** When set, cross-project envelopes are written to this directory. */
  outboxDir?: string;
  /** parent_task field of emitted envelopes. */
  parentTask?: string;
};

export type SourceOutcome = {
  source_id: string;
  status: 'ok' | 'error' | 'skipped_cadence';
  works_found?: number;
  invalid_works?: number;
  new_evidence?: number;
  merged?: number;
  error?: string;
};

export type EnvelopeEmission = {
  envelope: OutboxEnvelope;
  file: string | null;
  errors: string[];
};

export type RunSummary = {
  started_at: string;
  outcomes: SourceOutcome[];
  new_evidence_ids: string[];
  merged_evidence_ids: string[];
  candidates_created: string[];
  candidate_skips: Array<{ evidence_id: string; reason: string }>;
  /** Candidates invalidated because their evidence was superseded (retraction/correction merge). */
  superseded_candidates: string[];
  envelopes: EnvelopeEmission[];
};

function normalisedIdentifiers(work: NormalizedWork): EvidenceRecord['identifiers'] {
  const ids = work.identifiers ?? {};
  return {
    doi: ids.doi ? (normaliseDoi(ids.doi) ?? ids.doi) : undefined,
    arxiv: ids.arxiv ? (normaliseArxiv(ids.arxiv) ?? ids.arxiv) : undefined,
    registry: ids.registry ? (normaliseRegistry(ids.registry) ?? ids.registry) : undefined,
    dataset: ids.dataset ? (normaliseDataset(ids.dataset) ?? ids.dataset) : undefined,
  };
}

export function buildEvidenceRecord(
  work: NormalizedWork,
  source: WatchSource,
  topics: WatchTopic[],
  config: ResearchWatchConfig,
  now: Date
): EvidenceRecord {
  const keys = identityKeys(work);
  const relevance = scoreRelevance(work, topics);
  const impact = classifyImpact(work, topics, relevance, config.relevance);

  return {
    evidence_id: primaryIdentityKey(keys),
    identity_keys: keys,
    title: work.title,
    published_at: work.published_at,
    identifiers: normalisedIdentifiers(work),
    source_refs: [
      {
        source_id: source.id,
        raw_id: work.raw_id,
        url: work.url,
        discovered_at: now.toISOString(),
      },
    ],
    topics: relevance.matched_topics,
    claims: (work.claims ?? []).map((claim) => ({
      text: claim.text,
      kind: claim.kind,
      target: claim.target,
      provenance_source_ref: 0,
      origin: 'source' as const,
    })),
    evidence_type: work.evidence_type ?? 'unknown',
    publication_status: work.publication_status ?? 'unknown',
    review_status: 'unreviewed',
    relevance: relevance.score,
    impact_class: impact.impact_class,
    affected_claims: impact.affected_claims,
    affected_topics: impact.affected_topics,
    classification: impact.classification,
    confidence: impact.confidence,
    cost_policy: impact.cost_policy,
    triage_note: impact.triage_note,
    discovered_at: now.toISOString(),
    updated_at: now.toISOString(),
  };
}

/** True when the incoming work carries a retraction/correction signal. */
function isRetractionOrCorrection(work: NormalizedWork): boolean {
  return (
    work.publication_status === 'retracted' ||
    work.publication_status === 'corrected' ||
    work.evidence_type === 'retraction' ||
    work.evidence_type === 'correction'
  );
}

function isSupersededStatus(record: EvidenceRecord): boolean {
  return (
    record.publication_status === 'retracted' ||
    record.publication_status === 'corrected' ||
    record.evidence_type === 'retraction' ||
    record.evidence_type === 'correction'
  );
}

/** Union of normalized identifiers; absent incoming ids never wipe stored ones. */
function unionIdentifiers(
  base: EvidenceRecord['identifiers'],
  incoming: EvidenceRecord['identifiers']
): EvidenceRecord['identifiers'] {
  const result: EvidenceRecord['identifiers'] = { ...base };
  for (const key of ['doi', 'arxiv', 'registry', 'dataset'] as const) {
    if (incoming[key]) result[key] = incoming[key];
  }
  return result;
}

/**
 * Merge a re-discovery into the existing evidence object (provenance grows).
 * When the incoming work is a retraction/correction of an already-known work
 * (arXiv withdrawals/replacements reuse the same id), the stored status is
 * updated and the impact re-classified to the UNCERTAIN review path — the
 * superseded assessment must not survive (architecture: retractions/
 * corrections update evidence status rather than deleting provenance).
 */
function mergeSourceRef(
  existing: EvidenceRecord,
  work: NormalizedWork,
  source: WatchSource,
  topics: WatchTopic[],
  config: ResearchWatchConfig,
  now: Date
): { record: EvidenceRecord; statusChange: boolean } {
  const alreadyKnown = existing.source_refs.some(
    (ref) => ref.source_id === source.id && ref.raw_id === work.raw_id
  );
  const merged: EvidenceRecord = {
    ...existing,
    source_refs: alreadyKnown
      ? existing.source_refs
      : [
          ...existing.source_refs,
          { source_id: source.id, raw_id: work.raw_id, url: work.url, discovered_at: now.toISOString() },
        ],
    identity_keys: [...new Set([...existing.identity_keys, ...identityKeys(work)])],
    identifiers: unionIdentifiers(existing.identifiers, normalisedIdentifiers(work)),
    updated_at: now.toISOString(),
  };

  const statusChange = isRetractionOrCorrection(work) && !isSupersededStatus(existing);
  if (!statusChange) return { record: merged, statusChange: false };

  // Relevance is merged with the stored record so a terse retraction notice
  // cannot push the work out of scope: the retraction of a watched-topic work
  // MUST reach the review pipeline with immediate cost.
  const relevance = scoreRelevance(work, topics);
  const mergedRelevance: RelevanceResult = {
    score: Math.max(relevance.score, existing.relevance),
    matched_topics: [...new Set([...relevance.matched_topics, ...existing.topics])].sort(),
  };
  const impact = classifyImpact(work, topics, mergedRelevance, config.relevance);

  merged.publication_status = work.publication_status === 'corrected' ? 'corrected' : 'retracted';
  if (work.evidence_type === 'correction') merged.evidence_type = 'correction';
  else if (work.evidence_type === 'retraction') merged.evidence_type = 'retraction';
  merged.topics = mergedRelevance.matched_topics;
  merged.impact_class = impact.impact_class;
  merged.affected_claims = impact.affected_claims;
  merged.affected_topics = impact.affected_topics;
  merged.classification = impact.classification;
  merged.confidence = impact.confidence;
  merged.cost_policy = impact.cost_policy;
  merged.triage_note = impact.triage_note;

  return { record: merged, statusChange: true };
}

function envelopeForCandidate(
  candidate: TaskCandidate,
  parentTask: string
): { envelope: OutboxEnvelope; errors: string[] } | null {
  if (candidate.payload.routing_target === 'SSF') return null;

  let envelope: OutboxEnvelope;
  if (candidate.task_type === 'CANON_VALIDATION') {
    envelope = buildCanonValidationEnvelope(candidate, { parent_task: parentTask, depth: 1 });
  } else {
    // No cross-project routing defined for this task type yet — stay internal.
    return null;
  }

  return { envelope, errors: validateEnvelope(envelope) };
}

export async function runResearchWatch(options: ResearchWatchOptions): Promise<RunSummary> {
  const store = options.store;
  const now = options.now ?? new Date();
  const config: ResearchWatchConfig = {
    relevance: { ...DEFAULT_RELEVANCE_CONFIG, ...(options.config?.relevance ?? {}) },
    promotion: { ...DEFAULT_PROMOTION_CONFIG, ...(options.config?.promotion ?? {}) },
  };
  const topics = options.topics ?? getActiveWatchTopics();
  const sources = options.sources ?? getEnabledWatchSources();
  const adapters = { ...getDefaultAdapters(), ...(options.adapters ?? {}) };

  const outcomes: SourceOutcome[] = [];
  const newEvidences: EvidenceRecord[] = [];
  const mergedEvidenceIds: string[] = [];
  const supersededCandidates: string[] = [];

  for (const source of sources) {
    const lastRun = await store.getSourceLastRun(source.id);
    const minIntervalMs = source.cadence_hours * 60 * 60 * 1000;
    if (lastRun && now.getTime() - new Date(lastRun).getTime() < minIntervalMs) {
      outcomes.push({ source_id: source.id, status: 'skipped_cadence' });
      continue;
    }

    const adapter = adapters[source.adapter];
    if (!adapter) {
      outcomes.push({ source_id: source.id, status: 'error', error: `unknown adapter "${source.adapter}"` });
      continue;
    }

    try {
      const works = await adapter.discover(source);
      const validWorks: NormalizedWork[] = [];
      for (const work of works) {
        if (work && typeof work.raw_id === 'string' && typeof work.title === 'string') {
          validWorks.push(work);
        }
      }

      let newCount = 0;
      let mergedCount = 0;

      for (const work of validWorks) {
        const keys = identityKeys(work);
        const existing = await store.findByIdentityKeys(keys);
        if (existing) {
          const merged = mergeSourceRef(existing, work, source, topics, config, now);
          await store.saveEvidence(merged.record);
          if (merged.statusChange) {
            // The superseded status invalidates any assessment derived from it;
            // the re-classified evidence re-enters promotion (see backlog below).
            const invalidated = await store.invalidateCandidatesForEvidence(existing.evidence_id);
            supersededCandidates.push(...invalidated);
          }
          mergedEvidenceIds.push(existing.evidence_id);
          mergedCount++;
          continue;
        }
        const evidence = buildEvidenceRecord(work, source, topics, config, now);
        await store.saveEvidence(evidence);
        newEvidences.push(evidence);
        newCount++;
      }

      outcomes.push({
        source_id: source.id,
        status: 'ok',
        works_found: works.length,
        invalid_works: works.length - validWorks.length,
        new_evidence: newCount,
        merged: mergedCount,
      });
    } catch (error) {
      outcomes.push({
        source_id: source.id,
        status: 'error',
        error: error instanceof Error ? error.message : 'unknown adapter error',
      });
    }

    await store.setSourceLastRun(source.id, now.toISOString());
  }

  // Re-promotion scan: evidence deferred by an earlier run (budget skips,
  // superseded candidates re-opened by a retraction/correction merge)
  // accumulates and is drained by later runs — discovery cadence and synthesis
  // cadence are independent (architecture SSF_RESEARCH_WATCH). The scan runs
  // only when this run actually processed a source: a fully cadence-skipped
  // run stays a no-op. Evidence already evaluated this run is excluded, and
  // closed (done/rejected) fingerprints keep closed assessments from being
  // re-created by the scan.
  let promotion: PromotionResult = { candidates: [], skipped: [] };
  if (outcomes.some((outcome) => outcome.status === 'ok')) {
    const fingerprints = new Set([
      ...(await store.listOpenCandidateFingerprints()),
      ...(await store.listClosedCandidateFingerprints()),
    ]);
    const newEvidenceIds = new Set(newEvidences.map((evidence) => evidence.evidence_id));
    const backlog = (await store.listUnpromotedEvidence()).filter(
      (evidence) => !newEvidenceIds.has(evidence.evidence_id)
    );
    promotion = promoteCandidates([...newEvidences, ...backlog], config.promotion, fingerprints, now);
  }

  for (const candidate of promotion.candidates) {
    await store.saveCandidate(candidate);
  }

  const envelopes: EnvelopeEmission[] = [];
  const parentTask = options.parentTask ?? 'ssf-research-watch';
  for (const candidate of promotion.candidates) {
    const built = envelopeForCandidate(candidate, parentTask);
    if (!built) continue;

    if (built.errors.length === 0 && options.outboxDir) {
      const fileName = envelopeFileName(candidate.candidate_id);
      await mkdir(options.outboxDir, { recursive: true });
      await writeFile(join(options.outboxDir, fileName), `${JSON.stringify(built.envelope, null, 2)}\n`, 'utf8');
      envelopes.push({ envelope: built.envelope, file: fileName, errors: [] });
    } else {
      envelopes.push({
        envelope: built.envelope,
        file: null,
        errors: built.errors.length > 0 ? built.errors : ['no outbox directory configured'],
      });
    }
  }

  return {
    started_at: now.toISOString(),
    outcomes,
    new_evidence_ids: newEvidences.map((evidence) => evidence.evidence_id),
    merged_evidence_ids: mergedEvidenceIds,
    candidates_created: promotion.candidates.map((candidate) => candidate.candidate_id),
    candidate_skips: promotion.skipped,
    superseded_candidates: supersededCandidates,
    envelopes,
  };
}
