/**
 * SSF health evidence packet: project-local educational fixture.
 * Not a clinical recommendation, not a KG/OTA identifier, and not an unlock.
 */
export const BOTANICAL_HEALTH_KEY = 'HEALTH:BOTANICAL:GARLIC-LEMON-GINGER' as const;

export type HealthEvidenceKind = 'biochemical-mechanism' | 'limited-clinical-evidence' | 'unsupported-safety-claim';

export type HealthEvidenceClaim = Readonly<{
  key: string;
  statement: string;
  kind: HealthEvidenceKind;
  clinicalBenefitEstablished: false;
  adviceAllowed: false;
  sourceUrls: readonly string[];
}>;

export const botanicalHealthEvidence = Object.freeze({
  contentKey: BOTANICAL_HEALTH_KEY,
  schemaVersion: '0.1-draft',
  status: 'educational-prototype',
  medicalAdvice: false,
  unlocks: [] as readonly string[],
  claims: [
    {
      key: 'garlic.allicin.enzyme',
      statement: 'Zerkleinern ermöglicht die enzymatische Bildung von Allicin; das beweist keine Heilwirkung.',
      kind: 'biochemical-mechanism',
      clinicalBenefitEstablished: false,
      adviceAllowed: false,
      sourceUrls: ['https://www.nccih.nih.gov/health/garlic'],
    },
    {
      key: 'garlic.common-cold.efficacy',
      statement: 'Die derzeitige klinische Evidenz reicht nicht für eine gesicherte Empfehlung bei Erkältungen.',
      kind: 'limited-clinical-evidence',
      clinicalBenefitEstablished: false,
      adviceAllowed: false,
      sourceUrls: ['https://www.cochrane.org/evidence/CD006206_garlic-common-cold'],
    },
    {
      key: 'mixture.refrigerated.four-months',
      statement: 'Vier Monate Haltbarkeit nach kurzem Erhitzen sind für dieses Rezept nicht validiert.',
      kind: 'unsupported-safety-claim',
      clinicalBenefitEstablished: false,
      adviceAllowed: false,
      sourceUrls: [],
    },
  ] as const satisfies readonly HealthEvidenceClaim[],
});

export type HealthQuestion = Readonly<{
  prompt: string;
  choices: readonly [string, string, string];
  correctIndex: number;
  explanation: string;
}>;

export const botanicalHealthQuiz: readonly HealthQuestion[] = [
  {
    prompt: 'Im Labor zeigt ein Knoblauchstoff eine Wirkung gegen Viren. Was wissen wir damit?',
    choices: ['Das Getränk verhindert Erkältungen.', 'Eine Wirkung unter Laborbedingungen, nicht zwingend beim Menschen.', 'Eine tägliche Dosis ist bewiesen.'],
    correctIndex: 1,
    explanation: 'Laborergebnisse sind kein Ersatz für geeignete klinische Studien.',
  },
  {
    prompt: 'Nach einem Hausmittel fühlt sich jemand besser. Was lässt sich daraus schließen?',
    choices: ['Das Getränk hat die Krankheit geheilt.', 'Der Effekt muss bei allen Menschen auftreten.', 'Die Besserung kann mehrere Ursachen haben.'],
    correctIndex: 2,
    explanation: 'Ohne Vergleichsgruppe ist der ursächliche Beitrag der Mischung unklar.',
  },
  {
    prompt: 'Eine Webseite verspricht vier Monate Kühlschrankhaltbarkeit. Wie gehst du vor?',
    choices: ['Die Aussage als unbestätigt kennzeichnen und Sicherheitsdaten prüfen.', 'Das Rezept ungeprüft weitergeben.', 'Einmaliges Aufkochen genügt immer.'],
    correctIndex: 0,
    explanation: 'Säuregrad, Prozess, Hygiene und Lagerbedingungen müssen validiert werden.',
  },
];

export function assessBotanicalHealthQuiz(answers: readonly number[]) {
  if (answers.length !== botanicalHealthQuiz.length) throw new Error('Incomplete quiz');
  if (answers.some((a) => !Number.isInteger(a) || a < 0 || a > 2))
    throw new Error('Invalid answer index');
  const correct = answers.filter((answer, index) => answer === botanicalHealthQuiz[index].correctIndex).length;
  return Object.freeze({ correct, total: botanicalHealthQuiz.length, passed: correct === botanicalHealthQuiz.length, medicalUnlocks: [] as readonly string[] });
}
