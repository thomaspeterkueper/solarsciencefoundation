/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      lib/research-watch/promotion.ts
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/research-watch/promotion.ts
 * Name:      research-watch - promotion gate
 * Version:   0.1.0
 * Created:   2026-08-24
 * Modified:  2026-08-24
 * Depends:   lib/research-watch/types.ts, lib/research-watch/identity.ts
 *
 * A discovery may become a task ONLY when it passes the gate: stable
 * identity, allowed evidence type, sufficient relevance, promotable impact
 * class, no open/done task fingerprint, and remaining budget. Output is a
 * bounded RESEARCH_DISCOVERY or CANON_VALIDATION TaskCandidate — never a
 * curriculum mutation.
 */

import { createHash } from 'node:crypto';
import type {
  CostPolicy,
  EvidenceRecord,
  ImpactClass,
  TaskCandidate,
  TaskType,
} from './types';
import { hasStableIdentity } from './identity';

export type PromotionConfig = {
  min_relevance_for_candidate: number;
  max_candidates_per_run: number;
  require_stable_identity: boolean;
  allowed_evidence_types: string[];
  /** Impact classes that may produce a candidate; NO_IMPACT stays out. */
  promotable_impact_classes: ImpactClass[];
  default_cost_policy: CostPolicy;
};

export const DEFAULT_PROMOTION_CONFIG: PromotionConfig = {
  min_relevance_for_candidate: 0.5,
  max_candidates_per_run: 5,
  require_stable_identity: true,
  allowed_evidence_types: [
    'primary-study',
    'review',
    'meta-analysis',
    'dataset-release',
    'correction',
    'retraction',
  ],
  promotable_impact_classes: ['NEW', 'CONFIRMS', 'REVISES', 'CONTRADICTS', 'DEPRECATES', 'UNCERTAIN'],
  default_cost_policy: 'prefer_off_peak',
};

export function taskTypeForImpact(impactClass: ImpactClass): TaskType | null {
  switch (impactClass) {
    case 'CONTRADICTS':
    case 'REVISES':
    case 'DEPRECATES':
      return 'CANON_VALIDATION';
    case 'NEW':
    case 'CONFIRMS':
    case 'UNCERTAIN':
      return 'RESEARCH_DISCOVERY';
    case 'NO_IMPACT':
    default:
      return null;
  }
}

/** Canon validation touches the KG (source of truth); everything else stays in SSF. */
export function routingTargetForTask(taskType: TaskType): string {
  return taskType === 'CANON_VALIDATION' ? 'KG' : 'SSF';
}

export function candidateFingerprint(evidence: EvidenceRecord, taskType: TaskType): string {
  const seed = `${evidence.evidence_id}|${evidence.impact_class}|${taskType}`;
  return createHash('sha1').update(seed, 'utf8').digest('hex').slice(0, 16);
}

export function buildCandidateId(taskType: TaskType, fingerprint: string): string {
  const kind = taskType === 'CANON_VALIDATION' ? 'CV' : 'RD';
  return `SSF-TC-${kind}-${fingerprint}`;
}

export type PromotionOutcome =
  | { candidate: TaskCandidate }
  | { skipped: true; reason: string };

export function promoteEvidence(
  evidence: EvidenceRecord,
  config: PromotionConfig,
  openFingerprints: Set<string>,
  budgetLeft: number,
  now: Date
): PromotionOutcome {
  const taskType = taskTypeForImpact(evidence.impact_class);
  if (!taskType) {
    return { skipped: true, reason: 'impact_not_promotable' };
  }
  if (!config.promotable_impact_classes.includes(evidence.impact_class)) {
    return { skipped: true, reason: 'impact_not_promotable' };
  }
  if (config.require_stable_identity && !hasStableIdentity(evidence.identity_keys)) {
    return { skipped: true, reason: 'unstable_identity' };
  }
  if (!config.allowed_evidence_types.includes(evidence.evidence_type)) {
    return { skipped: true, reason: 'evidence_type_not_promotable' };
  }
  if (evidence.relevance < config.min_relevance_for_candidate) {
    return { skipped: true, reason: 'relevance_below_threshold' };
  }

  const fingerprint = candidateFingerprint(evidence, taskType);
  if (openFingerprints.has(fingerprint)) {
    return { skipped: true, reason: 'duplicate_candidate' };
  }
  if (budgetLeft <= 0) {
    return { skipped: true, reason: 'candidate_budget_reached' };
  }

  const costPolicy: CostPolicy =
    evidence.cost_policy === 'immediate' ? 'immediate' : config.default_cost_policy;

  return {
    candidate: {
      candidate_id: buildCandidateId(taskType, fingerprint),
      task_type: taskType,
      evidence_id: evidence.evidence_id,
      fingerprint,
      status: 'pending',
      cost_policy: costPolicy,
      payload: {
        title: `Assess ${evidence.evidence_id} (${evidence.impact_class})`,
        summary: `${evidence.title} — impact ${evidence.impact_class}${evidence.triage_note ? ` (${evidence.triage_note})` : ''}`,
        topics: evidence.topics,
        affected_claims: evidence.affected_claims,
        routing_target: routingTargetForTask(taskType),
      },
      created_at: now.toISOString(),
    },
  };
}

export type PromotionResult = {
  candidates: TaskCandidate[];
  skipped: Array<{ evidence_id: string; reason: string }>;
};

/** Bounded promotion over newly classified evidence, in discovery order. */
export function promoteCandidates(
  evidences: EvidenceRecord[],
  config: PromotionConfig,
  openFingerprints: Set<string>,
  now: Date = new Date()
): PromotionResult {
  const candidates: TaskCandidate[] = [];
  const skipped: Array<{ evidence_id: string; reason: string }> = [];
  const seen = new Set<string>(openFingerprints);

  for (const evidence of evidences) {
    const budgetLeft = config.max_candidates_per_run - candidates.length;
    const outcome = promoteEvidence(evidence, config, seen, budgetLeft, now);
    if ('candidate' in outcome) {
      candidates.push(outcome.candidate);
      seen.add(outcome.candidate.fingerprint);
    } else {
      skipped.push({ evidence_id: evidence.evidence_id, reason: outcome.reason });
    }
  }

  return { candidates, skipped };
}
