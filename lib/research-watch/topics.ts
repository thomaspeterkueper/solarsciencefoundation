/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      lib/research-watch/topics.ts
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/research-watch/topics.ts
 * Name:      research-watch - watch-topic registry access
 * Version:   0.1.0
 * Created:   2026-08-24
 * Modified:  2026-08-24
 * Depends:   config/research-watch/topics.json, lib/modules
 *
 * Relevance is evaluated ONLY against the explicit watch-topic registry
 * (config/research-watch/topics.json). New topics may be proposed but MUST
 * NOT silently expand the monitored curriculum scope.
 */

import { learningModules } from '../modules';
import topicRegistry from '../../config/research-watch/topics.json';
import type { CanonClaim, WatchTopic } from './types';

const registry = topicRegistry as { topics: unknown };

function asTopics(): WatchTopic[] {
  if (!registry || !Array.isArray(registry.topics)) {
    throw new Error('research-watch topics.json: missing or invalid "topics" array');
  }
  return registry.topics as WatchTopic[];
}

/** Validated topic registry. Throws with a clear message on structural defects. */
export function getWatchTopics(): WatchTopic[] {
  const topics = asTopics();
  const ids = new Set<string>();
  const claimIds = new Set<string>();

  for (const topic of topics) {
    if (!topic.id || ids.has(topic.id)) throw new Error(`research-watch topics.json: duplicate topic id "${topic.id}"`);
    ids.add(topic.id);

    if (!topic.label || !Array.isArray(topic.domains) || topic.domains.length === 0) {
      throw new Error(`research-watch topic ${topic.id}: label and domains are required`);
    }
    if (!Array.isArray(topic.keywords) || topic.keywords.length === 0) {
      throw new Error(`research-watch topic ${topic.id}: keywords must not be empty`);
    }
    if (topic.status !== 'active' && topic.status !== 'paused') {
      throw new Error(`research-watch topic ${topic.id}: status must be active or paused`);
    }

    for (const claim of topic.canon_claims ?? []) {
      if (!claim.id || claimIds.has(claim.id)) {
        throw new Error(`research-watch topic ${topic.id}: duplicate claim id "${claim.id}"`);
      }
      claimIds.add(claim.id);
      if (!claim.text || !Array.isArray(claim.sources)) {
        throw new Error(`research-watch claim ${claim.id}: text and sources are required`);
      }
    }
  }

  return topics;
}

export function getActiveWatchTopics(): WatchTopic[] {
  return getWatchTopics().filter((topic) => topic.status === 'active');
}

export function getTopicById(topics: WatchTopic[], id: string): WatchTopic | undefined {
  return topics.find((topic) => topic.id === id);
}

export function getCanonClaimById(topics: WatchTopic[], id: string): CanonClaim | undefined {
  for (const topic of topics) {
    const claim = topic.canon_claims.find((item) => item.id === id);
    if (claim) return claim;
  }
  return undefined;
}

/**
 * Current SSF module ids that are NOT covered by any topic.
 * Empty means the registry is in sync with the current module scope.
 */
export function watchScopeGap(topics: WatchTopic[]): string[] {
  const covered = new Set<string>();
  for (const topic of topics) {
    for (const moduleId of topic.modules ?? []) covered.add(moduleId);
  }
  return learningModules.map((module) => module.id).filter((id) => !covered.has(id));
}
