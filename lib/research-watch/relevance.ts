/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      lib/research-watch/relevance.ts
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/research-watch/relevance.ts
 * Name:      research-watch - deterministic relevance scoring
 * Version:   0.1.0
 * Created:   2026-08-24
 * Modified:  2026-08-24
 * Depends:   lib/research-watch/types.ts
 *
 * v0.1 uses deterministic keyword scoring against the explicit watch-topic
 * registry. Semantic relevance classification is an extension point and is
 * deferred to off-peak review (see cost_policy), never hard-coded to a
 * provider or model here.
 */

import type { NormalizedWork, WatchTopic } from './types';

export type RelevanceConfig = {
  /** Below this score a work is treated as out of scope. */
  min_consideration: number;
  /** Below this score no task candidate is promoted (evidence is still kept). */
  min_candidate: number;
};

export const DEFAULT_RELEVANCE_CONFIG: RelevanceConfig = {
  min_consideration: 0.25,
  min_candidate: 0.5,
};

/** Multi-word keywords are stronger deterministic signals than single words. */
const PHRASE_WEIGHT = 0.7;
const SINGLE_WEIGHT = 0.5;
const HINT_BOOST = 1.0;

export type RelevanceResult = {
  score: number; // 0..1
  matched_topics: string[];
};

function haystackOf(work: NormalizedWork): string {
  return `${work.title} ${work.abstract ?? ''}`.toLowerCase();
}

function keywordWeight(keyword: string): number {
  return keyword.includes(' ') || keyword.includes('-') ? PHRASE_WEIGHT : SINGLE_WEIGHT;
}

export function scoreRelevance(work: NormalizedWork, topics: WatchTopic[]): RelevanceResult {
  const haystack = haystackOf(work);
  const hints = work.topics_hints ?? [];
  let bestScore = 0;
  const matchedTopics: string[] = [];

  for (const topic of topics) {
    if (topic.status !== 'active') continue;

    let score = 0;
    if (hints.includes(topic.id)) {
      score = HINT_BOOST;
    } else {
      for (const keyword of topic.keywords) {
        if (haystack.includes(keyword.toLowerCase())) {
          score += keywordWeight(keyword);
        }
      }
      score = Math.min(1, score);
    }

    if (score > 0) {
      matchedTopics.push(topic.id);
      if (score > bestScore) bestScore = score;
    }
  }

  return { score: Math.min(1, bestScore), matched_topics: matchedTopics };
}
