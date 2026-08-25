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
  /**
   * Evidence records with NO open (pending/dispatched) candidate, oldest
   * discovery first. Re-promotion input: deferred/budget-skipped evidence and
   * evidence whose candidate was superseded (retraction/correction merge)
   * accumulates and is drained by later runs (discovery cadence and synthesis
   * cadence are independent — architecture SSF_RESEARCH_WATCH). Records with
   * only done/rejected candidates are included; their fingerprints keep the
   * promotion gate from re-creating closed assessments.
   */
  listUnpromotedEvidence(): Promise<EvidenceRecord[]>;
  /**
   * Mark the open (pending/dispatched) candidates of an evidence as superseded
   * (rejected) — a retraction/correction invalidates assessments derived from
   * the superseded status. Returns the invalidated candidate ids.
   */
  invalidateCandidatesForEvidence(evidenceId: string): Promise<string[]>;
  /** Fingerprints of open (pending/dispatched) candidates — dedup gate input. */
  listOpenCandidateFingerprints(): Promise<string[]>;
  /** Fingerprints of closed (done/rejected) candidates — dedup gate input. */
  listClosedCandidateFingerprints(): Promise<string[]>;
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

  async listUnpromotedEvidence(): Promise<EvidenceRecord[]> {
    const withOpenCandidate = new Set(
      [...this.candidates.values()]
        .filter((candidate) => candidate.status === 'pending' || candidate.status === 'dispatched')
        .map((candidate) => candidate.evidence_id)
    );
    return [...this.evidences.values()]
      .filter((record) => !withOpenCandidate.has(record.evidence_id))
      .sort((a, b) => a.discovered_at.localeCompare(b.discovered_at))
      .map((record) => structuredClone(record));
  }

  async invalidateCandidatesForEvidence(evidenceId: string): Promise<string[]> {
    const superseded: string[] = [];
    for (const candidate of this.candidates.values()) {
      if (
        candidate.evidence_id === evidenceId &&
        (candidate.status === 'pending' || candidate.status === 'dispatched')
      ) {
        this.candidates.set(candidate.candidate_id, { ...candidate, status: 'rejected' });
        superseded.push(candidate.candidate_id);
      }
    }
    return superseded;
  }

  async listOpenCandidateFingerprints(): Promise<string[]> {
    return [...this.candidates.values()]
      .filter((candidate) => candidate.status === 'pending' || candidate.status === 'dispatched')
      .map((candidate) => candidate.fingerprint);
  }

  async listClosedCandidateFingerprints(): Promise<string[]> {
    return [...this.candidates.values()]
      .filter((candidate) => candidate.status === 'done' || candidate.status === 'rejected')
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
