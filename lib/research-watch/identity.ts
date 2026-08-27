/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      lib/research-watch/identity.ts
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/research-watch/identity.ts
 * Name:      research-watch - stable identity and deduplication keys
 * Version:   0.1.0
 * Created:   2026-08-24
 * Modified:  2026-08-24
 * Depends:   lib/research-watch/types.ts
 *
 * Identifier preference order (architecture SSF_RESEARCH_WATCH):
 * DOI > arXiv id+version > registry id > dataset/release id > URL+title fingerprint.
 * The same work discovered through multiple sources becomes ONE evidence object
 * with multiple source_refs.
 */

import { createHash } from 'node:crypto';
import type { NormalizedWork } from './types';

export const IDENTITY_PREFIXES = {
  doi: 'doi:',
  arxiv: 'arxiv:',
  registry: 'registry:',
  dataset: 'dataset:',
  fingerprint: 'fingerprint:',
} as const;

export function normaliseDoi(raw: string): string | null {
  const value = raw
    .trim()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//i, '')
    .replace(/^doi:\s*/i, '')
    .replace(/^10\./, '10.') // canonical prefix stays
    .toLowerCase();
  if (!/^10\.\d{4,9}\/\S+$/.test(value)) return null;
  return value;
}

export function normaliseArxiv(raw: string): string | null {
  const trimmed = raw.trim();
  // arxiv.org/abs/2501.04567v2 | arXiv:2501.04567 | 2501.04567v1
  const match = trimmed.match(/(?:arxiv\.org\/abs\/|arxiv:\s*)?(\d{4}\.\d{4,5})(v\d+)?/i);
  if (!match) return null;
  return `${match[1]}${(match[2] ?? '').toLowerCase()}`;
}

export function normaliseRegistry(raw: string): string | null {
  const trimmed = raw.trim().replace(/^https?:\/\/[^/]+\//i, '');
  if (!trimmed) return null;
  return trimmed.toLowerCase();
}

export function normaliseDataset(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  return trimmed.toLowerCase();
}

function stripForFingerprint(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '');
}

/**
 * Deterministic fallback identity: normalized source URL + title.
 * Used only when no DOI/arXiv/registry/dataset identifier exists.
 */
export function titleFingerprint(title: string, url?: string): string {
  const urlPart = url ? stripForFingerprint(url.replace(/^https?:\/\//i, '').replace(/\/+$/, '')) : '';
  const seed = `${urlPart}|${stripForFingerprint(title)}`;
  const digest = createHash('sha1').update(seed, 'utf8').digest('hex');
  return digest.slice(0, 16);
}

/** All identity keys a work can be found under, strongest first. */
export function identityKeys(work: Pick<NormalizedWork, 'identifiers' | 'title' | 'url'>): string[] {
  const keys: string[] = [];
  const ids = work.identifiers ?? {};

  if (ids.doi) {
    const doi = normaliseDoi(ids.doi);
    if (doi) keys.push(`${IDENTITY_PREFIXES.doi}${doi}`);
  }
  if (ids.arxiv) {
    const arxiv = normaliseArxiv(ids.arxiv);
    if (arxiv) keys.push(`${IDENTITY_PREFIXES.arxiv}${arxiv}`);
  }
  if (ids.registry) {
    const registry = normaliseRegistry(ids.registry);
    if (registry) keys.push(`${IDENTITY_PREFIXES.registry}${registry}`);
  }
  if (ids.dataset) {
    const dataset = normaliseDataset(ids.dataset);
    if (dataset) keys.push(`${IDENTITY_PREFIXES.dataset}${dataset}`);
  }

  // The URL+title fingerprint is a FALLBACK identity, used only when no stable
  // identifier exists — otherwise different versions of the same title would
  // collide through the fingerprint.
  if (keys.length === 0) {
    keys.push(`${IDENTITY_PREFIXES.fingerprint}${titleFingerprint(work.title, work.url)}`);
  }
  return keys;
}

/** Strongest available identity key — becomes the evidence_id. */
export function primaryIdentityKey(keys: string[]): string {
  return keys[0] ?? '';
}

/** True when the evidence has a stable (non-fingerprint) identity. */
export function hasStableIdentity(keys: string[]): boolean {
  return keys.some(
    (key) =>
      key.startsWith(IDENTITY_PREFIXES.doi) ||
      key.startsWith(IDENTITY_PREFIXES.arxiv) ||
      key.startsWith(IDENTITY_PREFIXES.registry) ||
      key.startsWith(IDENTITY_PREFIXES.dataset)
  );
}
