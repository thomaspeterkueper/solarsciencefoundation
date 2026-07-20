'use client';
/**
 * TermPopup — universelles gestuftes Popup-System fuer SSF
 * Jeder Fachbegriff hat 2-4 Stufen (Alle -> Studium)
 *
 * Verwendung:
 *   import { TermPopup } from './TermPopup';
 *   <TermPopup id="dipol" />
 *   <TermPopup id="coulomb" startLevel={2} />
 */
import { useState } from 'react';

export type TermLevel = { label: string; title: string; text: string };
export type TermEntry = { term: string; levels: TermLevel[] };

// ── Wissensdatenbank ──────────────────────────────────────────────────────
export const TERMS: Record<string, TermEntry> = {

  dipol: {
    term: 'Dipol',
    levels: [
      { label: 'Alle',      title: 'Ein Molekuel mit zwei Gesichtern',
        text: 'Stell dir eine Wippe vor: Auf einer Seite sitzt ein Elefant (Sauerstoff), auf der anderen eine Maus (Wasserstoff). Die Wippe kippt zur schweren Seite. Genauso bei Wasser: Sauerstoff zieht Elektronen staerker an, wird negativ (delta-). Wasserstoff wird positiv (delta+). Ein Molekuel mit Plus- und Minus-Seite nennt man Dipol.' },
      { label: 'Jugendliche', title: 'Elektronen sind nicht fair verteilt',
        text: 'Sauerstoff ist "gieriger" als Wasserstoff — er zieht gemeinsame Elektronen naeher zu sich (Elektronegativitaet O=3.44, H=2.20). Dadurch: delta- am O, delta+ an den H. Wie ein T-Shirt im Trockner: Eine Seite klebt, die andere zieht Haare an. Diese Ungleichverteilung macht Wassermoleküle zu winzigen Magneten die sich anziehen wie Klettverschluesse.' },
      { label: 'Erwachsene', title: 'Elektronegativitaet erzeugt permanenten Dipol',
        text: 'Elektronegativitaet (Pauling): O=3.44, H=2.20, Differenz 1.24 -> stark polare Bindung. Dipolmoment mu = 1.85 Debye. Winkel 104.5° -> die zwei O-H-Bindungsdipole heben sich NICHT auf (anders als CO2 bei 180°). Folge: Wasserstoffbruecken, hoher Siedepunkt, exzellentes Loesungsmittel.' },
      { label: 'Studium',    title: 'mu = q * d — das elektrische Dipolmoment',
        text: 'Dipol: Schwerpunkt positiver Ladung != Schwerpunkt negativer Ladung. mu = q * d [Debye oder C*m]. H2O: mu = 1.85 D = 6.17e-30 C*m. Teilladung am O: ca. -0.66 e (NBO-Analyse). Abstand Ladungsschwerpunkte: ~0.058 nm. Vektoriell: mu_res = 2 * mu_OH * cos(theta/2) = 2 * 1.51 D * cos(52.25°) = 1.85 D.' },
    ],
  },

  coulomb: {
    term: 'Coulomb',
    levels: [
      { label: 'Alle',      title: 'Die Masseinheit fuer elektrische Ladung',
        text: 'Reibst du einen Luftballon am Pullover, wird er geladen — er zieht Papierschnipsel an. Diese Ladungsmenge misst man in Coulomb (C). Ein Blitz: 5-10 C. Ein kleiner Funke an der Tuerlinke: 0.000001 C. Coulomb ist wie Kilogramm — aber fuer Ladung statt Gewicht.' },
      { label: 'Jugendliche', title: 'Q = I * t — Ladung aus Strom und Zeit',
        text: 'Definition: 1 Coulomb = 1 Ampere x 1 Sekunde (Q = I * t). Handy-Akku (3000 mAh) = 10.800 C. Auto-Batterie (60 Ah) = 216.000 C. Benannt nach Charles-Augustin de Coulomb (1736-1806). Coulombs Gesetz: Je groesser die Ladung und je kleiner der Abstand, desto staerker die Kraft.' },
      { label: 'Erwachsene', title: '1 C = 6.24 * 10^18 Elektronen',
        text: '1 Coulomb = Ladung von 6.241509 x 10^18 Elementarladungen. Elementarladung e = 1.602 x 10^-19 C (Ladung eines Elektrons). Fuer Wasser: Sauerstoff traegt Teilladung ~-0.66 e = -1.06 x 10^-19 C. Coulomb-Gesetz: F = k*Q1*Q2/r^2, k = 8.988 x 10^9 N*m^2/C^2.' },
      { label: 'Studium',    title: 'F = k*Q1Q2/r^2 und SI-Definition',
        text: 'SI-Einheit der elektr. Ladung. 1 C = 1 A*s. Elementarladung e = 1.602176634 x 10^-19 C (exakt, SI 2019). Coulomb-Gesetz: F = k*Q1*Q2/r^2, k = 1/(4*pi*epsilon0) = 8.9875 x 10^9 N*m^2/C^2. Dipolmoment: mu = q*d [C*m], 1 D = 3.336 x 10^-30 C*m. Elektrisches Feld: E = F/q [V/m = N/C]. I = dQ/dt.' },
    ],
  },

  elektronegativitaet: {
    term: 'Elektronegativität',
    levels: [
      { label: 'Alle',      title: 'Wer zieht Elektronen staerker an?',
        text: 'Stell dir Tauziehen zwischen Atomen vor. Manche Atome ziehen gemeinsame Elektronen staerker zu sich. Sauerstoff zieht staerker als Wasserstoff. Deshalb sind Elektronen im Wasser ungleich verteilt — Sauerstoff bekommt mehr, Wasserstoff weniger.' },
      { label: 'Jugendliche', title: 'Skala 0-4: Fluor ist am gierigsten',
        text: 'Elektronegativitaet misst wie stark ein Atom Elektronen anzieht. Pauling-Skala 0-4. Fluor (F): 3.98 — gierigst. Sauerstoff (O): 3.44. Wasserstoff (H): 2.20. Differenz O-H = 1.24 -> deutlicher Dipol. Kohlenstoff (C): 2.55, C-H: Differenz 0.35 -> fast unpolar. Ab Differenz 1.7: ionische Bindung.' },
      { label: 'Erwachsene', title: 'Pauling: chi(O)=3.44, chi(H)=2.20',
        text: 'Elektronegativitaet chi: Tendenz eines Atoms in einer Bindung Elektronen anzuziehen. Pauling-Skala aus Bindungsenergien. Delta_chi > 0.5: polare Bindung. Delta_chi > 1.7: ionisch. O-H: 1.24 -> stark polar. Folge bei H2O: Partialladung O ca. -0.66 e, H ca. +0.33 e. Gesamtdipolmoment 1.85 D.' },
      { label: 'Studium',    title: 'Pauling, Mulliken, Allred-Rochow',
        text: 'Pauling: chi aus Bindungsenergien, (chiA - chiB)^2 proportional zur Resonanzenergie. Mulliken: chi = (IE + EA)/2. Allred-Rochow: chi aus effektiver Kernladung / Atomradius. NBO-Analyse H2O: O=-0.834, H=+0.417. Dipolmoment aus Partialladungen: mu = 2 * 0.417e * d(OH) * cos(theta/2) = 1.85 D. Konsistent mit Experiment.' },
    ],
  },

  wasserstoffbruecke: {
    term: 'Wasserstoffbrücke',
    levels: [
      { label: 'Alle',      title: 'Der unsichtbare Kleber zwischen Molekuelen',
        text: 'Nasser Finger bleibt kurz an einem kalten Glas kleben. Wassertropfen bilden Perlen auf Blaettern. Das sind Wasserstoffbruecken — winzige Anziehungskraefte zwischen Wassermolekülen. Sie sind schwach, aber es gibt Milliarden davon. Zusammen halten sie Wasser fluessig und machen es zum besten Loesungsmittel der Natur.' },
      { label: 'Jugendliche', title: 'H (delta+) zieht O (delta-) des Nachbarn an',
        text: 'Jedes Wassermolekül ist ein kleiner Magnet. Der Plus-Pol (H, delta+) wird vom Minus-Pol (O, delta-) des Nachbarn angezogen. Diese Bruecken sind 20x schwaecher als eine richtige Bindung — aber es gibt bis zu 4 pro Molekül gleichzeitig. Zum Kochen muessen alle gebrochen werden: deshalb 100°C statt -80°C.' },
      { label: 'Erwachsene', title: 'Energie 23 kJ/mol — Schluessel zum Siedepunkt',
        text: 'H-Bruecke: elektrostatische Wechselwirkung zwischen positivem H (an stark elektronegativem Atom: O, N, F) und freiem Elektronenpaar eines O/N/F. Energie: ~23 kJ/mol (H2O). Vergleich: kovalente O-H-Bindung: 460 kJ/mol. Jedes H2O bildet bis zu 4 Bruecken. Latente Verdampfungswaerme: 2260 kJ/kg — erklaert sich fast vollstaendig durch H-Bruecken.' },
      { label: 'Studium',    title: 'Geometrie: D-H...A, d(H...O) = 1.97 Ang',
        text: 'H-Bruecke: D-H...A (Donor D, Akzeptor A). Optimal: D-H...A-Winkel ~180°, d(H...A) ~1.97 Ang fuer O-H...O. Energie: 4-120 kJ/mol je nach Typ. Fluessiges H2O: 3.4 Bruecken/Molekül bei 25°C. Kooperativitaet: Bruecken verstaerken sich gegenseitig (many-body). Eis Ih: 4 Bruecken, tetraedrisch, d(O...O) = 2.76 Ang.' },
    ],
  },

  siedepunkt: {
    term: 'Siedepunkt',
    levels: [
      { label: 'Alle',      title: 'Wann faengt eine Fluessigkeit an zu kochen?',
        text: 'Beim Siedepunkt wird eine Fluessigkeit zu Dampf. Fuer Wasser: 100°C bei normalem Luftdruck. Fuer Alkohol: 78°C. Im Gebirge (weniger Luftdruck) siedet Wasser schon bei 70°C. Im Schnellkochtopf (mehr Druck) erst bei 120°C.' },
      { label: 'Jugendliche', title: 'Siedepunkt haengt vom Luftdruck ab',
        text: 'Beim Siedepunkt ist der Dampfdruck der Fluessigkeit gleich dem Umgebungsdruck. Weniger Druck = Moleküle koennen leichter entkommen = niedrigerer Siedepunkt. Auf dem Everest (310 mbar): Wasser siedet bei 69°C. Im Vakuum: Wasser siedet bei Zimmertemperatur. Im Schnellkochtopf (2 bar): 120°C.' },
      { label: 'Erwachsene', title: 'Normalsiedepunkt: Dampfdruck = 1013.25 mbar',
        text: 'Siedepunkt: Dampfdruck der Fluessigkeit = Umgebungsdruck. Normalsiedepunkt bei 1013.25 mbar (1 atm). Clausius-Clapeyron: dp/dT = Delta_Hvap / (T * Delta_V). Ohne H-Bruecken waere Siedepunkt von Wasser ca. -80°C. Tatsaechlich: 100°C. Differenz = Energie der Wasserstoffbruecken.' },
      { label: 'Studium',    title: 'd(ln p)/dT = Delta_Hvap / (R*T^2)',
        text: 'Thermodynamisch: Siedepunkt wo mu_liq(T,p) = mu_vap(T,p). Clausius-Clapeyron: d(ln p)/dT = Delta_Hvap/(RT^2). H2O: Delta_Hvap = 40.65 kJ/mol bei 100°C (= 2260 kJ/kg). Troutons Regel: Delta_Svap ungefaehr 88 J/(mol*K) normal; H2O: 109 J/(mol*K) (Anomalie durch H-Bruecken). Druck-Abhaengigkeit: Antoine-Gleichung log(p) = A - B/(C+T).' },
    ],
  },

  spektrallinie: {
    term: 'Spektrallinie',
    levels: [
      { label: 'Alle', title: 'Der Fingerabdruck eines Elements',
        text: 'Eine farbige Linie im Regenbogen — aber viel schärfer. Jedes Element hat seinen eigenen Satz von Linien, wie ein Barcode. Natrium: immer bei 589 nm (gelb). Das ist kein Zufall — das sind Quantensprünge.' },
      { label: 'Jugendliche', title: 'Diskrete Farben statt Regenbogen',
        text: 'Wenn man ein Element erhitzt, leuchtet es nicht in allen Farben, sondern nur an bestimmten Stellen. Wasserstoff: 656 nm (rot), 486 nm (blaugrün), 434 nm (blauviolett). Diese Linien sind so eindeutig wie ein Fingerabdruck.' },
      { label: 'Erwachsene', title: 'Elektronenübergänge zwischen Energieniveaus',
        text: 'Wenn ein Elektron von einem höheren auf ein niedrigeres Energieniveau fällt, sendet es ein Photon mit genau der Energiedifferenz aus. E = hf = hc/lambda. Jedes Element hat einzigartige Energieniveaus — daher einzigartige Wellenlängen.' },
      { label: 'Studium', title: 'Bohr-Modell, Balmer-Serie, Feinstruktur',
        text: 'Balmer-Serie H: 1/lambda = R_H (1/2^2 - 1/n^2), n=3,4,5,... R_H = 1.097e7 m^-1. Na D-Linien bei 589.0 und 589.6 nm: Spin-Bahn-Kopplung (Feinstruktur). Fraunhofer H+K (Ca): 393.4 und 396.8 nm — stärkste Linien im Sonnenspektrum.' },
    ],
  },
  absorption: {
    term: 'Absorption',
    levels: [
      { label: 'Alle', title: 'Licht wird verschluckt',
        text: 'Wenn Licht durch Gas fließt, wird genau die Energie verschluckt, die das Gas aufnehmen kann. Wie wenn du einem Lied zuhörst und plötzlich ein Ton fehlt — das Zimmer hat ihn geschluckt.' },
      { label: 'Jugendliche', title: 'Schwarze Striche im Regenbogen',
        text: 'Sonnenlicht durch ein Prisma ergibt einen Regenbogen — aber mit feinen schwarzen Strichen. Die Sonnenatmosphäre schluckt genau die Wellenlängen, die die enthaltenen Elemente absorbieren.' },
      { label: 'Erwachsene', title: 'Absorptionsspektrum vs. Emissionsspektrum',
        text: 'Heißes Gas emittiert Linien (helles Spektrum auf dunklem Grund). Dasselbe Gas kühler vor einem kontinuierlichen Hintergrund erzeugt dunkle Absorptionslinien auf buntem Grund. Kirchhoffs Gesetze (1859).' },
      { label: 'Studium', title: 'Bouguer-Lambert-Beer, Übergangswahrscheinlichkeit',
        text: 'Absorptionsquerschnitt sigma [cm^2], Übergangswahrscheinlichkeit A_{ul} [s^-1] (Einstein-Koeffizient). Optische Tiefe tau = integral(sigma * n * ds). Äquivalentbreite W_lambda misst Stärke einer Absorptionslinie im Stellar-Spektrum.' },
    ],
  },
  debye: {
    term: 'Debye',
    levels: [
      { label: 'Alle',      title: 'Die Masseinheit fuer Molekuel-Magnete',
        text: 'Wie man Laenge in Metern misst, misst man die Staerke eines Molekuel-Magneten (Dipols) in Debye (D). Wasser: 1.85 D — sehr stark fuer ein so kleines Molekuel. Kohlendioxid CO2: 0 D — kein Dipol, obwohl die Bindungen polar sind (symmetrisch, hebt sich auf).' },
      { label: 'Jugendliche', title: 'Groesserer Wert = staerkere Anziehung',
        text: 'Benannt nach Peter Debye (1884-1966, Nobelpreis 1936). Wasser: 1.85 D. HCl: 1.08 D. CO2: 0 D. Formaldehyd H2C=O: 2.33 D. Groesserer Wert -> staerkere Anziehung zwischen Molekuelen -> hoehere Siedepunkte, besser als Loesungsmittel.' },
      { label: 'Erwachsene', title: '1 D = 3.336e-30 C*m',
        text: '1 Debye = 3.33564 x 10^-30 C*m. Formel: mu = q * d. H2O: Ladung q ~ 0.66 e = 1.06e-19 C, Abstand d = 0.058 nm -> mu = 6.17e-30 C*m = 1.85 D. Faustregel: 1 D ungefaehr Elementarladung ueber 0.21 Angstroem Abstand.' },
      { label: 'Studium',    title: 'mu = Summe(qi * ri) — Vektorsumme',
        text: 'Dipolmoment als Vektor: mu = Summe qi*ri. Fuer mehratomige Molekuele: Vektorsumme aller Bindungsdipole. H2O: mu_res = 2 * mu_OH * cos(theta/2) = 2 * 1.51 D * cos(52.25°) = 1.85 D. 1 D = 10^-18 esu*cm (CGS) = 3.336e-30 C*m (SI). Experimentell via Stark-Effekt oder Mikrowellenspektroskopie.' },
    ],
  },

};

// ── Komponente ────────────────────────────────────────────────────────────
export function TermPopup({
  id,
  startLevel = 0,
  customTerm,
}: {
  id: string;
  startLevel?: number;
  customTerm?: string;
}) {
  const [open, setOpen] = useState(false);
  const [level, setLevel] = useState(startLevel);
  const entry = TERMS[id];
  if (!entry) return <span>{customTerm ?? id}</span>;
  const lvl = entry.levels[level];

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: 'none', border: 'none', padding: 0,
          borderBottom: '1.5px dashed var(--gold,#F4A300)',
          color: 'inherit', cursor: 'pointer', font: 'inherit',
        }}
      >
        {customTerm ?? entry.term}
      </button>
      {open && (
        <div
          onClick={e => e.stopPropagation()}
          style={{
            position: 'absolute', bottom: '120%', left: '50%',
            transform: 'translateX(-50%)',
            background: '#0A1628', color: 'rgba(255,255,255,.88)',
            padding: '14px 16px', borderRadius: 10, zIndex: 50, width: 300,
            fontSize: 13, lineHeight: 1.65,
            boxShadow: '0 6px 32px rgba(0,0,0,.45)',
            border: '1px solid rgba(201,168,76,.3)',
          }}
        >
          <div style={{ display: 'flex', gap: 4, marginBottom: 10, flexWrap: 'wrap' }}>
            {entry.levels.map((l, i) => (
              <button key={i} onClick={() => setLevel(i)} style={{
                padding: '3px 8px', borderRadius: 4, fontSize: 10,
                fontFamily: 'var(--font-mono)', letterSpacing: '.04em',
                border: '1px solid ' + (level === i ? '#C9A84C' : 'rgba(255,255,255,.18)'),
                background: level === i ? '#C9A84C22' : 'transparent',
                color: level === i ? '#C9A84C' : 'rgba(255,255,255,.45)',
                cursor: 'pointer',
              }}>{l.label}</button>
            ))}
          </div>
          <strong style={{ color: '#C9A84C', display: 'block', marginBottom: 6, fontSize: 12 }}>
            {lvl.title}
          </strong>
          <p style={{ margin: 0 }}>{lvl.text}</p>
          {level < entry.levels.length - 1 && (
            <button onClick={() => setLevel(l => l + 1)} style={{
              marginTop: 10, background: 'none',
              border: '1px solid rgba(201,168,76,.4)',
              color: '#C9A84C', cursor: 'pointer', fontSize: 10,
              fontFamily: 'var(--font-mono)', padding: '3px 10px', borderRadius: 4,
            }}>Tiefer eintauchen →</button>
          )}
          <button onClick={() => { setOpen(false); setLevel(startLevel); }} style={{
            display: 'block', marginTop: 8, background: 'none', border: 'none',
            color: 'rgba(255,255,255,.28)', cursor: 'pointer',
            fontSize: 10, fontFamily: 'var(--font-mono)',
          }}>schließen ×</button>
        </div>
      )}
    </span>
  );
}
