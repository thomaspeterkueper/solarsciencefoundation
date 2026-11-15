/**
 * SSF: evidence-linked everyday health education topics.
 * This is a local content catalogue, not a clinical rules engine or KG namespace.
 * All guidance is contextual; it does not calculate diagnoses, doses or medical bonuses.
 */
export type EverydayHealthArea = 'nutrition' | 'movement' | 'sleep' | 'hygiene' | 'connection' | 'health-literacy';
export type HealthTopic = Readonly<{
  key: string;
  area: EverydayHealthArea;
  title: string;
  question: string;
  takeaway: string;
  sourceUrls: readonly string[];
  status: 'educational-prototype';
  gameEffect: 'dialogue-and-learning-only';
}>;
export const everydayHealthTopics: readonly HealthTopic[] = Object.freeze([
  { key:'HEALTH:EVERYDAY:VARIED-DIET', area:'nutrition', title:'Vielfalt auf dem Teller', question:'Warum essen Menschen unterschiedliche Lebensmittel?', takeaway:'Eine abwechslungsreiche Ernährung kann helfen, den Nährstoffbedarf zu decken; Alter, Lebenslage und Kultur spielen eine Rolle.', sourceUrls:['https://www.who.int/news-room/fact-sheets/detail/healthy-diet'], status:'educational-prototype', gameEffect:'dialogue-and-learning-only' },
  { key:'HEALTH:EVERYDAY:PHYSICAL-ACTIVITY', area:'movement', title:'Bewegung im Alltag', question:'Ist ein Spaziergang auch Bewegung?', takeaway:'Regelmäßige körperliche Aktivität bietet gesundheitliche Vorteile; passende Arten und Umfänge unterscheiden sich individuell.', sourceUrls:['https://www.who.int/europe/news-room/fact-sheets/item/everyday-actions-for-better-health-who-recommendations'], status:'educational-prototype', gameEffect:'dialogue-and-learning-only' },
  { key:'HEALTH:EVERYDAY:SLEEP', area:'sleep', title:'Schlaf und Erholung', question:'Wieso fühlen wir uns nach schlechtem Schlaf anders?', takeaway:'Schlaf ist für Erholung und Gesundheit wichtig; Schlafbedarf und Schlafprobleme sind individuell.', sourceUrls:['https://www.cdc.gov/sleep/about/index.html'], status:'educational-prototype', gameEffect:'dialogue-and-learning-only' },
  { key:'HEALTH:EVERYDAY:HAND-HYGIENE', area:'hygiene', title:'Hände und Lebensmittel sauber halten', question:'Warum waschen wir die Hände vor dem Kochen?', takeaway:'Händewaschen und sichere Küchenpraxis können die Verbreitung von Krankheitserregern reduzieren.', sourceUrls:['https://www.cdc.gov/clean-hands/about/index.html'], status:'educational-prototype', gameEffect:'dialogue-and-learning-only' },
  { key:'HEALTH:EVERYDAY:SOCIAL-CONNECTION', area:'connection', title:'Gemeinschaft und Fürsorge', question:'Warum kann gemeinsame Zeit guttun?', takeaway:'Soziale Verbundenheit ist ein wichtiger Gesundheitsfaktor; Beziehungen unterscheiden sich in Qualität, nicht nur Anzahl.', sourceUrls:['https://www.who.int/news-room/questions-and-answers/item/social-connection'], status:'educational-prototype', gameEffect:'dialogue-and-learning-only' },
  { key:'HEALTH:EVERYDAY:EVIDENCE', area:'health-literacy', title:'Was heißt eigentlich nachgewiesen?', question:'Ist eine Familienerfahrung dasselbe wie eine Studie?', takeaway:'Persönliche Erfahrungen können bedeutsam sein, belegen aber allein keinen medizinischen Ursache-Wirkungs-Zusammenhang.', sourceUrls:['https://www.cochrane.org/evidence/CD006206_garlic-common-cold'], status:'educational-prototype', gameEffect:'dialogue-and-learning-only' }
]);
export function getEverydayHealthTopic(key: string): HealthTopic | undefined {
  return everydayHealthTopics.find(topic => topic.key === key);
}
