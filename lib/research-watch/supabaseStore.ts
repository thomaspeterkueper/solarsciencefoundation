/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      lib/research-watch/supabaseStore.ts
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/research-watch/supabaseStore.ts
 * Name:      research-watch - Supabase-backed evidence/candidate store
 * Version:   0.1.0
 * Created:   2026-08-24
 * Modified:  2026-08-24
 * Depends:   supabase/migrations/20260824120000_research_watch.sql, lib/research-watch/store.ts
 *
 * Production persistence. Tables are service-role only (RLS enabled, no
 * policies for anon/authenticated roles) — see the migration.
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import type { EvidenceRecord, TaskCandidate } from './types';
import type { EvidenceStore } from './store';

/** Operational store failure (transport/database/query) — never conflated with "not found". */
export class StoreError extends Error {
  constructor(operation: string, cause: string) {
    super(`research-watch store ${operation} failed: ${cause}`);
    this.name = 'StoreError';
  }
}

export class SupabaseEvidenceStore implements EvidenceStore {
  constructor(private readonly supabase: SupabaseClient) {}

  async findByIdentityKeys(keys: string[]): Promise<EvidenceRecord | null> {
    if (keys.length === 0) return null;
    const { data, error } = await this.supabase
      .from('research_watch_evidences')
      .select('*')
      .overlaps('identity_keys', keys)
      .limit(1)
      .maybeSingle();

    if (error) {
      throw new StoreError('findByIdentityKeys', error.message);
    }
    if (!data) return null;
    return data as unknown as EvidenceRecord;
  }

  async saveEvidence(record: EvidenceRecord): Promise<void> {
    const { error } = await this.supabase.from('research_watch_evidences').upsert({
      evidence_id: record.evidence_id,
      identity_keys: record.identity_keys,
      title: record.title,
      published_at: record.published_at ?? null,
      identifiers: record.identifiers as unknown as Record<string, unknown>,
      source_refs: record.source_refs as unknown as Record<string, unknown>[],
      topics: record.topics,
      claims: record.claims as unknown as Record<string, unknown>[],
      evidence_type: record.evidence_type,
      publication_status: record.publication_status,
      review_status: record.review_status,
      relevance: record.relevance,
      impact_class: record.impact_class,
      affected_claims: record.affected_claims,
      affected_topics: record.affected_topics,
      classification: record.classification,
      confidence: record.confidence,
      cost_policy: record.cost_policy,
      triage_note: record.triage_note ?? null,
      discovered_at: record.discovered_at,
      updated_at: record.updated_at,
    });
    if (error) {
      throw new StoreError('saveEvidence', error.message);
    }
  }

  async listUnpromotedEvidence(): Promise<EvidenceRecord[]> {
    const { data: candidateRows, error: candidateError } = await this.supabase
      .from('research_watch_candidates')
      .select('evidence_id')
      .in('status', ['pending', 'dispatched']);
    if (candidateError) {
      throw new StoreError('listUnpromotedEvidence', candidateError.message);
    }
    const withOpenCandidate = new Set((candidateRows ?? []).map((row) => row.evidence_id));
    const { data, error } = await this.supabase
      .from('research_watch_evidences')
      .select('*')
      .order('discovered_at', { ascending: true });
    if (error) {
      throw new StoreError('listUnpromotedEvidence', error.message);
    }
    return (data ?? [])
      .filter((row) => !withOpenCandidate.has(row.evidence_id)) as unknown as EvidenceRecord[];
  }

  async invalidateCandidatesForEvidence(evidenceId: string): Promise<string[]> {
    const { data, error } = await this.supabase
      .from('research_watch_candidates')
      .update({ status: 'rejected' })
      .eq('evidence_id', evidenceId)
      .in('status', ['pending', 'dispatched'])
      .select('candidate_id');
    if (error) {
      throw new StoreError('invalidateCandidatesForEvidence', error.message);
    }
    return (data ?? []).map((row) => row.candidate_id);
  }

  async listOpenCandidateFingerprints(): Promise<string[]> {
    const { data, error } = await this.supabase
      .from('research_watch_candidates')
      .select('fingerprint')
      .in('status', ['pending', 'dispatched']);
    if (error) {
      throw new StoreError('listOpenCandidateFingerprints', error.message);
    }
    return (data ?? []).map((row) => row.fingerprint);
  }

  async listClosedCandidateFingerprints(): Promise<string[]> {
    const { data, error } = await this.supabase
      .from('research_watch_candidates')
      .select('fingerprint')
      .in('status', ['done', 'rejected']);
    if (error) {
      throw new StoreError('listClosedCandidateFingerprints', error.message);
    }
    return (data ?? []).map((row) => row.fingerprint);
  }

  async saveCandidate(candidate: TaskCandidate): Promise<void> {
    const { error } = await this.supabase.from('research_watch_candidates').upsert({
      candidate_id: candidate.candidate_id,
      task_type: candidate.task_type,
      evidence_id: candidate.evidence_id,
      fingerprint: candidate.fingerprint,
      status: candidate.status,
      cost_policy: candidate.cost_policy,
      payload: candidate.payload as unknown as Record<string, unknown>,
      created_at: candidate.created_at,
      dispatched_at: candidate.dispatched_at ?? null,
    });
    if (error) {
      throw new StoreError('saveCandidate', error.message);
    }
  }

  async listPendingCandidates(): Promise<TaskCandidate[]> {
    const { data, error } = await this.supabase
      .from('research_watch_candidates')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: true });
    if (error) {
      throw new StoreError('listPendingCandidates', error.message);
    }
    return (data ?? []) as unknown as TaskCandidate[];
  }

  async getSourceLastRun(sourceId: string): Promise<string | null> {
    const { data, error } = await this.supabase
      .from('research_watch_run_state')
      .select('last_run_at')
      .eq('source_id', sourceId)
      .maybeSingle();
    if (error) {
      throw new StoreError('getSourceLastRun', error.message);
    }
    return data?.last_run_at ?? null;
  }

  async setSourceLastRun(sourceId: string, at: string): Promise<void> {
    const { error } = await this.supabase.from('research_watch_run_state').upsert({
      source_id: sourceId,
      last_run_at: at,
    });
    if (error) {
      throw new StoreError('setSourceLastRun', error.message);
    }
  }
}
