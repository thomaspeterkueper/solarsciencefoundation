import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { fetchLearningModules } from '../../lib/learning-modules';
import { LearnMap } from '../../components/LearnMap';
import { getRegisteredLearningPathForModule, getRegisteredLearningPathById } from '../../lib/learningPathRegistry';

export const metadata: Metadata = {
  title: 'Wissensnetz · Solar Science Foundation',
  description: 'Was hast du heute schon gefragt? Entdecke das Netz aus Fragen, Experimenten und Verbindungen — ohne Disziplinlabels, ohne Noten.',
};

type PageProps = {
  searchParams?: Promise<{
    module?: string;
    path?: string;
    ref?: string;
    uid?: string;
  }>;
};

export default async function LearnPage({ searchParams }: PageProps) {
  const sp = searchParams ? await searchParams : {};

  // SSF-0019: Deep-Link handling
  // NOXIA links with ?path=PATH:SSF:... or ?module=ECO-L0-000001
  const qs = new URLSearchParams();
  if (sp.uid) qs.set('uid', sp.uid);
  if (sp.ref) qs.set('ref', sp.ref);
  const q = qs.toString() ? '?' + qs.toString() : '';

  // Option A: direct path ID
  if (sp.path) {
    const pathId = decodeURIComponent(sp.path);
    const found = getRegisteredLearningPathById(pathId);
    if (found) {
      redirect('/learning-paths/' + encodeURIComponent(found.id) + q);
    }
  }

  // Option B: module ID → find matching path
  if (sp.module) {
    const moduleId = decodeURIComponent(sp.module);
    const found = getRegisteredLearningPathForModule(moduleId);
    if (found) {
      redirect('/learning-paths/' + encodeURIComponent(found.id) + q);
    }
  }

  const modules = await fetchLearningModules();
  return <LearnMap modules={modules} />;
}
