/**
 * KUEPER - Solar Science Foundation (SSF)
 * Path: components/LearnMap/types.ts
 * Name: LearnMap types
 * Version: 0.2.0
 * Created: 2026-07-02
 * Modified: 2026-07-04
 */

export type SubjectCode = 'PHY' | 'CHE' | 'BIO' | 'MAT' | 'AST' | 'EAR' | 'ENG';

export type ModuleStatus = 'built' | 'in_progress' | 'planned';
export type ModuleType = 'learning_path' | 'reference' | 'experiment';

export interface KxfLearningModule {
  id: string;
  version: string;
  created: string;
  modified: string;
  meta: {
    title: string;
    subject: SubjectCode;
    type: ModuleType;
    status: ModuleStatus;
    entry_question: string;
    depth_min: number;
    depth_max: number | null;
    duration_min: number;
    duration_max: number;
  };
  assets: {
    text: string[];
    svg: string[];
    image: string[];
    video: string[];
    audio: string[];
    experiment: string[];
  };
  dependencies: {
    requires: string[];
    module_unlocks: string[];
    path_unlocks: string[];
    archive_unlocks: string[];
    related: string[];
  };
  noxia: {
    grants: string[];
    required_for: string[];
  };
  branches: Array<{
    id: string;
    label: string;
    unlocks_at: string;
  }>;
}

export interface KxfLearningModulesExport {
  schema: string;
  version: string;
  modified: string;
  contracts: {
    consumer: string;
    recordSet: string;
    subjectCodes: string[];
    canonicalSource: string;
    notes: string;
  };
  records: {
    knowledge_domains: unknown[];
    competencies: unknown[];
    learning_modules: KxfLearningModule[];
  };
  deferred_modules: Array<{ oldId: string; reason: string }>;
  legacyIdMappings: Array<{ legacy: string; canonicalViewId: string; reason: string }>;
}

export const STATUS_ICON: Record<ModuleStatus, string> = {
  built: '●',
  in_progress: '◐',
  planned: '○'
};

export const STATUS_LABEL: Record<ModuleStatus, string> = {
  built: 'Verfügbar',
  in_progress: 'In Entwicklung',
  planned: 'Geplant'
};

export const ASSET_ICON: Record<keyof KxfLearningModule['assets'], string> = {
  text: 'Text',
  svg: 'SVG',
  image: 'Bild',
  video: 'Video',
  audio: 'Audio',
  experiment: 'Experiment'
};
