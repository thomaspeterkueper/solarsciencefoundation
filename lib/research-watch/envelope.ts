/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      lib/research-watch/envelope.ts
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/research-watch/envelope.ts
 * Name:      research-watch - KUEPER outbox envelopes
 * Version:   0.1.0
 * Created:   2026-08-24
 * Modified:  2026-08-24
 * Depends:   lib/research-watch/types.ts
 *
 * Cross-project requests are emitted ONLY as valid KUEPER outbox envelopes
 * (.kueper/outbox/*.json). SSF-internal candidates are never emitted — they
 * stay in the SSF candidate store. Maximum routing depth is 3.
 */

import type { TaskCandidate } from './types';

export const MAX_ROUTING_DEPTH = 3;

export const ALLOWED_TARGETS = [
  'ECO', 'KG', 'SSF', 'NOXIA', 'NXU', 'MISH', 'OMNI', 'AVI', 'CONTRA', 'ARCH',
  'ENDIA', 'ZEREYA', 'DAVARU', 'FLHERM', 'RESETH', 'KUE', 'OTA', 'TKD',
] as const;

export const ALLOWED_PRIORITIES = ['low', 'medium', 'high', 'critical'] as const;

export type OutboxEnvelope = {
  target: string;
  title: string;
  reason: string;
  requested_change: string;
  expected_result: string;
  priority: string;
  parent_task: string;
  depth: number;
  affects: string[];
};

export type EnvelopeOptions = {
  parent_task: string;
  depth?: number;
};

export function buildCanonValidationEnvelope(
  candidate: TaskCandidate,
  options: EnvelopeOptions
): OutboxEnvelope {
  const urgent = candidate.cost_policy === 'immediate';
  return {
    target: 'KG',
    title: `Validate KG canon against ${candidate.evidence_id}`,
    reason:
      `SSF Research Watch classified ${candidate.evidence_id} as ${candidate.payload.summary}. ` +
      `The Knowledge Graph is the source of truth for canon statements; SSF does not rewrite canon from discoveries.`,
    requested_change:
      `Compare evidence record ${candidate.evidence_id} with KG source-of-truth statements for the affected claims ` +
      `[${candidate.payload.affected_claims.join(', ') || 'none named — assess scope'}]. ` +
      `Accept, revise or reject the affected canon claims and record the decision.`,
    expected_result:
      `KG decision recorded for candidate ${candidate.candidate_id} with a claim-level outcome ` +
      `(accepted/revised/rejected/no_change), traceable to ${candidate.evidence_id}.`,
    priority: urgent ? 'high' : 'medium',
    parent_task: options.parent_task,
    depth: options.depth ?? 1,
    affects: ['KG', 'SSF'],
  };
}

/** Returns validation errors (empty = valid). */
export function validateEnvelope(envelope: OutboxEnvelope): string[] {
  const errors: string[] = [];
  if (!ALLOWED_TARGETS.includes(envelope.target as (typeof ALLOWED_TARGETS)[number])) {
    errors.push(`target "${envelope.target}" is not an allowed KUEPER target code`);
  }
  if (!ALLOWED_PRIORITIES.includes(envelope.priority as (typeof ALLOWED_PRIORITIES)[number])) {
    errors.push(`priority "${envelope.priority}" is not allowed`);
  }
  if (typeof envelope.depth !== 'number' || envelope.depth < 1 || envelope.depth > MAX_ROUTING_DEPTH) {
    errors.push(`depth ${envelope.depth} exceeds maximum routing depth ${MAX_ROUTING_DEPTH}`);
  }
  for (const field of ['target', 'title', 'reason', 'requested_change', 'expected_result', 'parent_task'] as const) {
    if (typeof envelope[field] !== 'string' || envelope[field].trim() === '') {
      errors.push(`field "${field}" must be a non-empty string`);
    }
  }
  if (!Array.isArray(envelope.affects) || envelope.affects.length === 0) {
    errors.push('field "affects" must be a non-empty array');
  }
  return errors;
}

export function envelopeFileName(candidateId: string): string {
  return `research-watch-${candidateId.toLowerCase()}.json`;
}
