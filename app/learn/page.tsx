import type { Metadata } from 'next';
import { fetchLearningModules } from '@/lib/learning-modules';
import { LearnMap } from '@/components/LearnMap';

export const metadata: Metadata = {
  title: 'Themenkarte · Solar Science Foundation',
  description: 'Alle Lernmodule der Solar Science Foundation — verfügbar, in Entwicklung und geplant.'
};

export default async function LearnPage() {
  const modules = await fetchLearningModules();
  return <LearnMap modules={modules} />;
}
