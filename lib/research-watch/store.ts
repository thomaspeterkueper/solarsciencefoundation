/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      lib/research-watch/store.ts
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/research-watch/store.ts
 * Name:      research-watch - evidence/candidate store interface
 * Version:   0.1.0
 * Created:   2026-08-24
 * Modified:  2026-08-24
 * Depends:   lib/research-watch/types.ts
 *
 * Persistence boundary. The engine only knows this interface, so the
 * backing store (Supabase in production, in-memory in tests) is replaceable.
 */

import type { EvidenceRecord, TaskCandidate } from './types';

export interface EvidenceStore {
  /** Find the single evidence record matching ANY of the given identity keys. */
  findByIdentityKeys(keys: string[]): Promise<EvidenceRecord | null>;
  saveEvidence(record: EvidenceRecord): Promise<void>;
  /** Fingerprints of open (pending/dispatched) candidates — dedup gate input. */
  listOpenCandidateFingerprints(): Promise<string[]>;
  saveCandidate(candidate: TaskCandidate): Promise<void>;
  listPendingCandidates(): Promise<TaskCandidate[]>;
  getSourceLastRun(sourceId: string): Promise<string | null>;
  setSourceLastRun(sourceId: string, at: string): Promise<void>;
}

/** Deterministic in-memory store for tests and dry runs. */
export class MemoryEvidenceStore implements EvidenceStore {
  private readonly byIdentityKey = new Map<string, string>();
  private readonly evidences = new Map<string, EvidenceRecord>();
  private readonly candidates = new Map<string, TaskCandidate>();
  private readonly sourceLastRun = new Map<string, string>();

  async findByIdentityKeys(keys: string[]): Promise<EvidenceRecord | null> {
    for (const key of keys) {
      const evidenceId = this.byIdentityKey.get(key);
      if (evidenceId) {
        const record = this.evidences.get(evidenceId);
        if (record) return structuredClone(record);
      }
    }
    return null;
  }

  async saveEvidence(record: EvidenceRecord): Promise<void> {
    this.evidences.set(record.evidence_id, structuredClone(record));
    for (const key of record.identity_keys) {
      this.byIdentityKey.set(key, record.evidence_id);
    }
  }

  async listOpenCandidateFingerprints(): Promise<string[]> {
    return [...this.candidates.values()]
      .filter((candidate) => candidate.status === 'pending' || candidate.status === 'dispatched')
      .map((candidate) => candidate.fingerprint);
  }

  async saveCandidate(candidate: TaskCandidate): Promise<void> {
    this.candidates.set(candidate.candidate_id, structuredClone(candidate));
  }

  async listPendingCandidates(): Promise<TaskCandidate[]> {
    return [...this.candidates.values()]
      .filter((candidate) => candidate.status === 'pending')
      .map((candidate) => structuredClone(candidate));
  }

  async getSourceLastRun(sourceId: string): Promise<string | null> {
    return this.sourceLastRun.get(sourceId) ?? null;
  }

  async setSourceLastRun(sourceId: string, at: string): Promise<void> {
    this.sourceLastRun.set(sourceId, at);
  }
}
