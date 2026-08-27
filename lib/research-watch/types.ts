/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      lib/research-watch/types.ts
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/research-watch/types.ts
 * Name:      research-watch - shared types
 * Version:   0.1.0
 * Created:   2026-08-24
 * Modified:  2026-08-24
 * Depends:   docs/RESEARCH-WATCH.md, kueper-ecosystem docs/architecture/SSF_RESEARCH_WATCH.md
 *
 * Three-layer boundary (discovery / evidence / canon impact) — see docs/RESEARCH-WATCH.md.
 * Discovery alone MUST NOT update learning content.
 */

export const IMPACT_CLASSES = [
  'NEW',
  'CONFIRMS',
  'REVISES',
  'CONTRADICTS',
  'DEPRECATES',
  'NO_IMPACT',
  'UNCERTAIN',
] as const;

export type ImpactClass = (typeof IMPACT_CLASSES)[number];

export type EvidenceType =
  | 'primary-study'
  | 'review'
  | 'meta-analysis'
  | 'dataset-release'
  | 'correction'
  | 'retraction'
  | 'commentary'
  | 'unknown';

export type PublicationStatus = 'preprint' | 'published' | 'corrected' | 'retracted' | 'unknown';

export type ReviewStatus = 'unreviewed' | 'under-review' | 'accepted' | 'rejected';

export type CostPolicy = 'immediate' | 'prefer_off_peak' | 'off_peak_only';

export type TaskType = 'RESEARCH_DISCOVERY' | 'CANON_VALIDATION';

export type CandidateStatus = 'pending' | 'dispatched' | 'done' | 'rejected';

/** One discovery event: which source reported the work, under which raw id. */
export type SourceRef = {
  source_id: string;
  raw_id: string;
  url?: string;
  discovered_at: string; // RFC3339
};

/**
 * A claim carried by the source about the work. Claims MUST retain provenance
 * to the source (provenance_source_ref). Generated summaries are not evidence.
 */
export type EvidenceClaim = {
  text: string;
  kind: 'finding' | 'data-statement';
  /** Optional canon claim id (CLM:…) or topic id the claim relates to. */
  target?: string;
  /** Index into the evidence's source_refs; -1 when no discovery ref exists. */
  provenance_source_ref: number;
  origin: 'source';
};

/** Normalized identifiers as far as they were present in the source record. */
export type WorkIdentifiers = {
  doi?: string;
  arxiv?: string;
  registry?: string;
  dataset?: string;
};

export type RelationHint = {
  relation: 'confirms' | 'revises' | 'contradicts' | 'deprecates' | 'introduces' | 'no_relation';
  /** Canon claim id (CLM:…) or topic id the relation refers to. */
  target?: string;
};

/** Output of a discovery adapter — a single work, provider-independent. */
export type NormalizedWork = {
  raw_id: string;
  title: string;
  abstract?: string;
  published_at?: string;
  identifiers?: WorkIdentifiers;
  url?: string;
  venue?: string;
  authors?: string[];
  evidence_type?: EvidenceType;
  publication_status?: PublicationStatus;
  topics_hints?: string[];
  relation_hints?: RelationHint[];
  claims?: Array<{ text: string; kind: 'finding' | 'data-statement'; target?: string }>;
};

/** Canonical statement currently taught or referenced by SSF content. */
export type CanonClaim = {
  id: string; // CLM:SSF:…
  text: string;
  /** Module ids / KXF entity ids that teach or reference this claim. */
  sources: string[];
};

/** A watched topic, derived from current SSF module scope (modules field). */
export type WatchTopic = {
  id: string; // TOP:SSF:…
  label: string;
  domains: string[];
  /** Current SSF module ids this topic is derived from (auditable derivation). */
  modules: string[];
  keywords: string[];
  canon_claims: CanonClaim[];
  status: 'active' | 'paused';
};

/** A configured discovery source. Sources are configuration, not code. */
export type WatchSource = {
  id: string; // SSF-SRC-…
  name: string;
  source_class: 'primary-literature' | 'authoritative-agency' | 'dataset-feed' | 'fixture';
  /** Adapter key — implementations are replaceable, identity lives in config. */
  adapter: string;
  enabled: boolean;
  /** Minimum hours between discovery runs of this source. */
  cadence_hours: number;
  /** Cost policy of the discovery fetch itself (cheap; semantic work is deferred). */
  cost_policy: CostPolicy;
  /** Explicit coverage statement so absence from the watch is never absence from science. */
  coverage_note: string;
  config?: Record<string, unknown>;
};

/** Normalized, persistent evidence record. */
export type EvidenceRecord = {
  evidence_id: string; // primary identity key: doi:… | arxiv:… | registry:… | dataset:… | fingerprint:…
  identity_keys: string[];
  title: string;
  published_at?: string;
  identifiers: WorkIdentifiers;
  source_refs: SourceRef[];
  topics: string[];
  claims: EvidenceClaim[];
  evidence_type: EvidenceType;
  publication_status: PublicationStatus;
  review_status: ReviewStatus;
  relevance: number; // 0..1
  impact_class: ImpactClass;
  /** Canon claim ids (CLM:…) the assessment refers to. */
  affected_claims: string[];
  /** Topic ids (TOP:…) the assessment refers to. */
  affected_topics: string[];
  /**
   * deterministic — classified from structured source metadata;
   * semantic_required — needs deferred (off-peak) semantic review.
   */
  classification: 'deterministic' | 'semantic_required';
  /** Confidence that the work was correctly identified and classified (not claim confidence). */
  confidence: number; // 0..1
  cost_policy: CostPolicy;
  triage_note?: string;
  discovered_at: string;
  updated_at: string;
};

/** A bounded, reviewable task produced by the promotion gate. Never a curriculum edit. */
export type TaskCandidate = {
  candidate_id: string; // SSF-TC-…
  task_type: TaskType;
  evidence_id: string;
  /** sha1 over evidence_id + impact_class + task_type; used for open/done dedup. */
  fingerprint: string;
  status: CandidateStatus;
  cost_policy: CostPolicy;
  payload: {
    title: string;
    summary: string;
    topics: string[];
    affected_claims: string[];
    /** Which project owns the follow-up: SSF, KG, NOXIA, … */
    routing_target: string;
  };
  created_at: string;
  dispatched_at?: string;
};
