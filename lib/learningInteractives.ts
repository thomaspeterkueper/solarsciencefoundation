/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:     lib/learningInteractives.ts
 * Repo:     github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/learningInteractives.ts
 * Name:     learningInteractives — structured interactive learning units (SSF → NOXIA contract)
 * Version:  1.0.0
 * Created:  2026-08-29
 * Depends:  —
 *
 * SSF is the source of truth for interactive learning content: didactics,
 * parameters and factual statements live here. NOXIA (or any other consumer)
 * renders these units via the structured module contract — never in a
 * separate tab and never by copying the curriculum.
 *
 * Every interactive carries a textual `fallback` so a client that cannot
 * render the interaction still shows a complete, meaningful explanation
 * instead of an empty placeholder.
 */

export type LearningInteractiveBody = {
  /** Stable id — e.g. 'erde' */
  id: string;
  /** Display label — e.g. 'Erde' */
  label: string;
  /** Mass in kg */
  massKg: number;
  /** Radius in m */
  radiusM: number;
};

export type LearningInteractiveParams = {
  /** Himmelskörper available as the first interaction parameter. */
  bodies: LearningInteractiveBody[];
  /**
   * Distance from the centre of the body — the second interaction parameter.
   * Expressed in body radii so one configuration fits every body:
   * 1 = surface, larger values = further out.
   */
  distance: {
    unit: 'body_radii';
    min: number;
    max: number;
    step: number;
    default: number;
  };
  /** Reference payload used to display the required work (1 t). */
  testMassKg: number;
  /** Physical constants clients use to compute derived values. */
  constants: {
    G: number;
  };
};

export type LearningInteractive = {
  /** Stable id — NOXIA binds its renderer to this. */
  interactiveId: string;
  title: string;
  /** One short sentence telling the learner what to do. */
  instruction: string;
  /** Configuration the client needs to build the interaction. */
  params: LearningInteractiveParams;
  /**
   * Textual fallback: complete explanation rendered when a client cannot
   * render the interaction. Must never be empty.
   */
  fallback: string;
};

const G = 6.674e-11; // m³/(kg·s²)

const learningInteractives: Record<string, LearningInteractive> = {
  gravitationsbrunnen: {
    interactiveId: 'gravitationsbrunnen',
    title: 'Gravitationsbrunnen visualisiert',
    instruction:
      'Wähle einen Himmelskörper und verschiebe den Abstand r vom Zentrum. Beobachte, wie Gravitationspotential Φ = −G·M/r, notwendige Hubarbeit und Fluchtgeschwindigkeit zusammenhängen.',
    params: {
      bodies: [
        { id: 'mond', label: 'Mond', massKg: 7.35e22, radiusM: 1.737e6 },
        { id: 'mars', label: 'Mars', massKg: 6.42e23, radiusM: 3.39e6 },
        { id: 'erde', label: 'Erde', massKg: 5.97e24, radiusM: 6.371e6 },
        { id: 'jupiter', label: 'Jupiter', massKg: 1.898e27, radiusM: 6.9911e7 }
      ],
      distance: { unit: 'body_radii', min: 1, max: 10, step: 0.1, default: 1 },
      testMassKg: 1000,
      constants: { G }
    },
    fallback:
      'Jeder Himmelskörper sitzt in einem Gravitationsbrunnen: Die potentielle Energie pro Kilogramm — das Gravitationspotential Φ = −G·M/r — ist überall negativ und wird mit wachsendem Abstand r vom Zentrum weniger negativ. An der Erdoberfläche beträgt Φ ≈ −62,5 MJ/kg, auf dem Mond nur ≈ −2,8 MJ/kg und auf Jupiter ≈ −1812 MJ/kg. Wer eine Masse m von r₁ nach r₂ hinaushebt, muss die Potentialdifferenz bezahlen: W = m·(Φ(r₂) − Φ(r₁)). Um 1 Tonne von der Erdoberfläche ins Unendliche zu bringen, sind deshalb theoretisch etwa 62,5 GJ Arbeit nötig — auf dem Mond nur rund 2,8 GJ. Das erklärt, warum das Verlassen eines Gravitationsfeldes Energie kostet: Man klettert aus dem Brunnen heraus, und je massereicher der Körper, desto tiefer der Brunnen. Die Fluchtgeschwindigkeit v = √(2·G·M/r) ist dasselbe in anderer Form: Auf der Erde sind es 11,2 km/s, auf dem Mond 2,4 km/s, auf Jupiter 60,2 km/s.'
  }
};

export function getLearningInteractive(interactiveId: string): LearningInteractive | undefined {
  return learningInteractives[interactiveId];
}

export function listLearningInteractives(): LearningInteractive[] {
  return Object.values(learningInteractives);
}
