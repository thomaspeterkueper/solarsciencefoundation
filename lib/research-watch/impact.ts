/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      lib/research-watch/impact.ts
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/research-watch/impact.ts
 * Name:      research-watch - impact classification
 * Version:   0.1.0
 * Created:   2026-08-24
 * Modified:  2026-08-24
 * Depends:   lib/research-watch/types.ts, lib/research-watch/relevance.ts
 *
 * Impact classes: NEW / CONFIRMS / REVISES / CONTRADICTS / DEPRECATES /
 * NO_IMPACT / UNCERTAIN (architecture SSF_RESEARCH_WATCH).
 *
 * v0.1 classifies deterministically from structured source metadata
 * (relation hints, publication status, evidence type). Contradictory or
 * insufficiently evidenced situations park as UNCERTAIN for human review —
 * contradictory evidence is represented, never prematurely reconciled.
 * Retractions and corrections never auto-accept; they update evidence status.
 */

import type {
  CostPolicy,
  ImpactClass,
  NormalizedWork,
  RelationHint,
  WatchTopic,
} from './types';
import { getCanonClaimById, getTopicById } from './topics';
import type { RelevanceConfig, RelevanceResult } from './relevance';
import { DEFAULT_RELEVANCE_CONFIG } from './relevance';

export type ImpactResult = {
  impact_class: ImpactClass;
  classification: 'deterministic' | 'semantic_required';
  /** Canon claim ids (CLM:…) the assessment refers to. */
  affected_claims: string[];
  /** Topic ids the assessment refers to. */
  affected_topics: string[];
  cost_policy: CostPolicy;
  triage_note?: string;
  /** Confidence that the work was correctly identified and classified. */
  confidence: number;
};

const HINT_TO_IMPACT: Record<Exclude<RelationHint['relation'], 'no_relation'>, ImpactClass> = {
  confirms: 'CONFIRMS',
  revises: 'REVISES',
  contradicts: 'CONTRADICTS',
  deprecates: 'DEPRECATES',
  introduces: 'NEW',
};

function expandHintTargets(topics: WatchTopic[], hints: RelationHint[]): { claims: string[]; topics: string[] } {
  const claims = new Set<string>();
  const topicIds = new Set<string>();

  for (const hint of hints) {
    if (!hint.target) continue;
    if (hint.target.startsWith('CLM:')) {
      if (getCanonClaimById(topics, hint.target)) claims.add(hint.target);
    } else if (hint.target.startsWith('TOP:')) {
      const topic = getTopicById(topics, hint.target);
      if (topic) {
        topicIds.add(topic.id);
        for (const claim of topic.canon_claims) claims.add(claim.id);
      }
    }
  }

  return { claims: [...claims].sort(), topics: [...topicIds].sort() };
}

export function classifyImpact(
  work: NormalizedWork,
  topics: WatchTopic[],
  relevance: RelevanceResult,
  relevanceConfig: RelevanceConfig = DEFAULT_RELEVANCE_CONFIG
): ImpactResult {
  const hints = work.relation_hints ?? [];
  const { claims: hintClaims, topics: hintTopics } = expandHintTargets(topics, hints);
  const matchedTopicIds = relevance.matched_topics;
  const urgentCost: CostPolicy = matchedTopicIds.length > 0 ? 'immediate' : 'prefer_off_peak';

  // 1. Below consideration threshold → out of scope. Retained to avoid repeat work.
  if (relevance.score < relevanceConfig.min_consideration) {
    return {
      impact_class: 'NO_IMPACT',
      classification: 'deterministic',
      affected_claims: [],
      affected_topics: [],
      cost_policy: 'prefer_off_peak',
      triage_note: 'out_of_scope',
      confidence: 0.7,
    };
  }

  // 2. Retractions/corrections never auto-accept: park for review, keep provenance.
  if (work.publication_status === 'retracted' || work.evidence_type === 'retraction') {
    return {
      impact_class: 'UNCERTAIN',
      classification: 'deterministic',
      affected_claims: hintClaims,
      affected_topics: [...new Set([...matchedTopicIds, ...hintTopics])].sort(),
      cost_policy: urgentCost,
      triage_note: 'retraction_review',
      confidence: 0.8,
    };
  }
  if (work.publication_status === 'corrected' || work.evidence_type === 'correction') {
    return {
      impact_class: 'UNCERTAIN',
      classification: 'deterministic',
      affected_claims: hintClaims,
      affected_topics: [...new Set([...matchedTopicIds, ...hintTopics])].sort(),
      cost_policy: urgentCost,
      triage_note: 'correction_review',
      confidence: 0.8,
    };
  }

  // 3. Structured relation hints from the source — deterministic classification.
  const relationHints = hints.filter((hint) => hint.relation !== 'no_relation');
  if (relationHints.length > 0) {
    const relations = [...new Set(relationHints.map((hint) => hint.relation))];
    if (relations.length > 1) {
      return {
        impact_class: 'UNCERTAIN',
        classification: 'deterministic',
        affected_claims: hintClaims,
        affected_topics: hintTopics,
        cost_policy: 'prefer_off_peak',
        triage_note: 'conflicting_hints',
        confidence: 0.6,
      };
    }
    const relation = relations[0];
    return {
      impact_class: relation === 'no_relation' ? 'NO_IMPACT' : HINT_TO_IMPACT[relation],
      classification: 'deterministic',
      affected_claims: hintClaims,
      affected_topics: hintTopics,
      cost_policy: 'prefer_off_peak',
      triage_note: `hint_${relation}`,
      confidence: 0.8,
    };
  }

  // 4. Relevant but no change justified (explicit no_relation hint).
  if (hints.length > 0 && hints.every((hint) => hint.relation === 'no_relation')) {
    return {
      impact_class: 'NO_IMPACT',
      classification: 'deterministic',
      affected_claims: hintClaims,
      affected_topics: hintTopics,
      cost_policy: 'off_peak_only',
      triage_note: 'relevant_no_change',
      confidence: 0.8,
    };
  }

  // 5. No structured signal → park for deferred (off-peak) semantic review.
  return {
    impact_class: 'UNCERTAIN',
    classification: 'semantic_required',
    affected_claims: matchedTopicIds.length > 0 ? allTopicClaims(topics, matchedTopicIds) : [],
    affected_topics: matchedTopicIds,
    cost_policy: 'prefer_off_peak',
    triage_note: 'semantic_review_required',
    confidence: 0.5,
  };
}

function allTopicClaims(topics: WatchTopic[], topicIds: string[]): string[] {
  const claims = new Set<string>();
  for (const topic of topics) {
    if (topicIds.includes(topic.id)) {
      for (const claim of topic.canon_claims) claims.add(claim.id);
    }
  }
  return [...claims].sort();
}
