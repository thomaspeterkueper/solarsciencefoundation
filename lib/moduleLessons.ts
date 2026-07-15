import type { LearningModule } from './modules';

export type ModuleLessonSection = {
  id: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  formula?: string;
  note?: string;
};

export type ModuleLesson = {
  moduleId: string;
  title: string;
  intro: string;
  learningGoals: string[];
  sections: ModuleLessonSection[];
  experiment?: 'strain-rosette';
};

const lessons: Record<string, ModuleLesson> = {
  'TM2-STRAIN-001': {
    moduleId: 'TM2-STRAIN-001',
    title: 'Von gemessener Dehnung zur Spannung im Bauteil',
    intro: 'Eine DMS-Rosette misst nicht direkt die Spannung. Sie misst drei Dehnungen in verschiedenen Richtungen. Erst aus ihrem gemeinsamen Muster lässt sich der ebene Dehnungszustand rekonstruieren und mit dem Werkstoffgesetz in Spannungen übersetzen.',
    learningGoals: [
      'verstehen, was ein einzelner Dehnungsmessstreifen tatsächlich misst',
      'die Bedeutung der Querkontraktionszahl einordnen',
      'aus einer 0°/45°/90°-Rosette εx, εy und γxy bestimmen',
      'den Dehnungszustand mit dem Hookeschen Gesetz in σx, σy und τxy umrechnen'
    ],
    sections: [
      {
        id: 'dms',
        eyebrow: '1 · Messung',
        title: 'Ein DMS kennt nur eine Richtung',
        paragraphs: [
          'Ein Dehnungsmessstreifen, kurz DMS, wird auf die Oberfläche eines Bauteils geklebt. Verformt sich das Bauteil entlang seiner Messrichtung, ändert sich der elektrische Widerstand des DMS.',
          'Das Messsignal beschreibt die relative Längenänderung ε = ΔL / L. Eine Dehnung von 500 µm/m entspricht 500 µε. Ein einzelner DMS sagt jedoch noch nichts darüber, wie die Verformung in anderen Richtungen aussieht.'
        ],
        formula: 'ε = ΔL / L'
      },
      {
        id: 'poisson',
        eyebrow: '2 · Werkstoffverhalten',
        title: 'Warum ein Zugstab gleichzeitig dünner wird',
        paragraphs: [
          'Ziehst du einen Stab in Längsrichtung, wird er länger und zugleich quer dazu dünner. Diese Kopplung zwischen Längs- und Querdehnung beschreibt die Querkontraktionszahl ν.',
          'Für viele Stähle liegt ν ungefähr bei 0,30. Eine positive Längsdehnung von 1 000 µε führt bei einachsigem Zug daher näherungsweise zu einer Querdehnung von −300 µε.'
        ],
        formula: 'ν = − εquer / εlängs',
        note: 'Die Querkontraktionszahl ist eine Werkstoffeigenschaft. Sie ist weder der Durchmesser eines Mohrschen Kreises noch eine Aussage über Lagerkräfte.'
      },
      {
        id: 'rosette',
        eyebrow: '3 · Rekonstruktion',
        title: 'Drei Richtungen ergeben den ebenen Dehnungszustand',
        paragraphs: [
          'Eine 0°/45°/90°-Rosette kombiniert drei DMS am selben Ort. Der 0°-DMS misst εx, der 90°-DMS misst εy. Der 45°-DMS enthält zusätzlich die Information über die Schubverzerrung γxy.',
          'Für diese Rosettenanordnung lässt sich γxy direkt aus den drei Messwerten bestimmen. Damit ist der vollständige ebene Dehnungszustand bekannt.'
        ],
        formula: 'εx = ε0°   ·   εy = ε90°   ·   γxy = 2 ε45° − ε0° − ε90°'
      },
      {
        id: 'stress',
        eyebrow: '4 · Werkstoffgesetz',
        title: 'Aus Dehnung wird erst mit E und ν eine Spannung',
        paragraphs: [
          'Für einen dünnen, frei belasteten Bauteilbereich wird häufig ebener Spannungszustand angenommen. Dann verbinden Elastizitätsmodul E und Querkontraktionszahl ν die gemessenen Dehnungen mit den Spannungen.',
          'Die Spannungen hängen deshalb nicht nur von einer einzelnen Dehnung ab. Längs- und Querdehnung sind gekoppelt, und die Schubspannung folgt aus dem Schubmodul G.'
        ],
        formula: 'σx = E/(1−ν²) · (εx + ν εy)   ·   σy = E/(1−ν²) · (εy + ν εx)   ·   τxy = G γxy',
        note: 'Für isotrope Werkstoffe gilt G = E / [2(1 + ν)]. Dehnungen müssen für die Rechnung dimensionslos eingesetzt werden: 500 µε = 500 · 10⁻⁶.'
      }
    ],
    experiment: 'strain-rosette'
  }
};

export function getModuleLesson(module: Pick<LearningModule, 'id'>): ModuleLesson | null {
  return lessons[module.id] ?? null;
}
