import { createServerSupabaseClient } from './supabase/server';

export type PublishedModuleContribution = {
  id: string;
  contributionId: string;
  version: number;
  moduleId: string;
  title: string;
  summary: string;
  bodyMarkdown: string;
  sourceNotes: string | null;
  authorId: string;
  authorDisplayName: string | null;
  publishedByDisplayName: string | null;
  reviewedByDisplayName: string | null;
  approvedByDisplayName: string | null;
  reviewerNoteSnapshot: string | null;
  editorNoteSnapshot: string | null;
  canonicalChangeRequired: boolean;
  kgRequestRef: string | null;
  publishedAt: string;
};

type PublishedRow = {
  id: string;
  contribution_id: string;
  version: number;
  module_id: string;
  title: string;
  summary: string;
  body_markdown: string;
  source_notes: string | null;
  author_id: string;
  author_display_name: string | null;
  published_by_display_name: string | null;
  reviewed_by_display_name: string | null;
  approved_by_display_name: string | null;
  reviewer_note_snapshot: string | null;
  editor_note_snapshot: string | null;
  canonical_change_required: boolean;
  kg_request_ref: string | null;
  published_at: string;
};

function mapRow(row: PublishedRow): PublishedModuleContribution {
  return {
    id: row.id,
    contributionId: row.contribution_id,
    version: row.version,
    moduleId: row.module_id,
    title: row.title,
    summary: row.summary,
    bodyMarkdown: row.body_markdown,
    sourceNotes: row.source_notes,
    authorId: row.author_id,
    authorDisplayName: row.author_display_name,
    publishedByDisplayName: row.published_by_display_name,
    reviewedByDisplayName: row.reviewed_by_display_name,
    approvedByDisplayName: row.approved_by_display_name,
    reviewerNoteSnapshot: row.reviewer_note_snapshot,
    editorNoteSnapshot: row.editor_note_snapshot,
    canonicalChangeRequired: row.canonical_change_required,
    kgRequestRef: row.kg_request_ref,
    publishedAt: row.published_at,
  };
}

export async function getPublishedContributionsForModule(moduleId: string) {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('published_module_contributions')
      .select('id, contribution_id, version, module_id, title, summary, body_markdown, source_notes, author_id, author_display_name, published_by_display_name, reviewed_by_display_name, approved_by_display_name, reviewer_note_snapshot, editor_note_snapshot, canonical_change_required, kg_request_ref, published_at')
      .eq('module_id', moduleId.trim().toUpperCase())
      .is('superseded_at', null)
      .order('published_at', { ascending: true });

    if (error || !data) return [];
    return (data as PublishedRow[]).map(mapRow);
  } catch {
    // Public learning must still render when Supabase is unavailable.
    return [];
  }
}
