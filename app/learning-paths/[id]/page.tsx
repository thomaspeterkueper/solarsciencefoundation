import { notFound } from 'next/navigation';
import PathRunner from '../../../components/learning/PathRunner';
import MaillardJourney from '../../../components/learning/MaillardJourney';
import {
  getLearningPathStatus,
  getRegisteredLearningPathById,
} from '../../../lib/learningPathRegistry';

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ uid?: string; ref?: string }>;
};

// ── NOXIA Unlock-Key Datenbank ─────────────────────────────────────────────
// Erklärt jedem Besucher was ein Key in NOXIA bedeutet
const NOXIA_KEY_INFO: Record<string, { label: string; description: string; icon: string }> = {
  // Sensoren
  'SENSOR:SPECTRAL':        { icon: '🔭', label: 'Spektral-Scanner',     description: 'Schaltet den NOXIA-Spektrometer frei — erkennt Elemente und Ressourcen per Lichtanalyse.' },
  'SENSOR:MAGNETIC':        { icon: '🧲', label: 'Magnet-Sensor',        description: 'Erkennt magnetische Anomalien — findet vergrabene Erze und Magnetit-Vorkommen.' },
  'SENSOR:PIEZO':           { icon: '⚡', label: 'Piezo-Sensor',         description: 'Misst mechanische Schwingungen — entdeckt Hohlräume und Tektonik unter der Oberfläche.' },
  'SENSOR:THERMAL':         { icon: '🌡️', label: 'Wärme-Sensor',        description: 'Erkennt Temperaturgradienten — lokalisiert geothermische Quellen und heiße Zonen.' },
  // Chemie
  'CHEM:SURFACTANT':        { icon: '🧴', label: 'Tensid-Wissen',        description: 'Ermöglicht Synthese von Reinigungsmitteln und Emulgatoren aus Rohstoffen.' },
  'CHEM:MICELLE':           { icon: '🔬', label: 'Mizell-Technologie',   description: 'Schaltet Mizell-Reaktoren frei — hocheffiziente Extraktion von Öl-in-Wasser Gemischen.' },
  'CHEM:PROTEIN-DENATURATION': { icon: '🧬', label: 'Protein-Labor',    description: 'Ermöglicht biochemische Verarbeitungsprozesse — Lebensmittel- und Materialverarbeitung.' },
  'CHEM:WATER-MOLECULE':    { icon: '💧', label: 'Wasser-Chemie',        description: 'Grundlage für Wasserrecycling und -aufbereitung in der Kolonie.' },
  'CHEM:HYDROGEN-BOND':     { icon: '🔗', label: 'Bindungsanalyse',      description: 'Ermöglicht Analyse polarer Verbindungen — Grundlage für Lösemittel-Technologie.' },
  'CHEM:DIPOLE':            { icon: '⚛️', label: 'Dipol-Technologie',    description: 'Schaltet elektrostatische Trennverfahren frei — Reinigung komplexer Gemische.' },
  'CHEM:IRIDIUM':           { icon: '💎', label: 'Iridium-Katalyse',     description: 'Iridium-gestützte PEM-Elektrolyse — Wasserstoffproduktion aus Wasser.' },
  'CHEM:ELECTROLYSIS':      { icon: '⚗️', label: 'Elektrolyse-Labor',    description: 'Wasserspaltung zu H₂ und O₂ — Energiespeicher und Atemluft für die Kolonie.' },
  'CHEM:ELECTRON-SPIN':     { icon: '🌀', label: 'Spintronic-Labor',     description: 'Quantenmagnetismus-Forschung — Grundlage für hochpräzise Messinstrumente.' },
  // Physik
  'PHY:PHASE-DIAGRAM':      { icon: '🗺️', label: 'Phasen-Navigator',    description: 'Vorhersage von Aggregatzuständen unter extremen Bedingungen — Tiefsee bis Hochatmosphäre.' },
  'PHY:DENSITY-ANOMALY':    { icon: '🧊', label: 'Eisplanet-Expertise',  description: 'Bau von Habitaten auf Eisplaneten — nutzt die Dichteanomalie von Wasser als Isolierung.' },
  'PHY:SURFACE-TENSION':    { icon: '🕸️', label: 'Kapillar-Systeme',    description: 'Passive Wasserversorgung durch Kapillarkräfte — kein Pumpensystem nötig.' },
  'PHY:SUBLIMATION':        { icon: '☁️', label: 'Sublimations-Kontrolle', description: 'Versteht Wasserverlust auf Mars/Titan — optimiert Wasserreserven der Kolonie.' },
  'PHY:HEAT-CAPACITY':      { icon: '🔥', label: 'Thermomanagement',     description: 'Effiziente Wärmespeicherung und -abgabe — optimiert Heizung und Kühlung der Kolonie.' },
  'PHY:QUANTUM-LEVELS':     { icon: '⚛️', label: 'Quanten-Spektroskopie', description: 'Versteht diskrete Energieniveaus — Grundlage für Laser und Spektrometer.' },
  'PHY:ENTROPY-BASICS':     { icon: '🌡️', label: 'Entropie-Verständnis', description: 'Erklärt Richtung chemischer Reaktionen — optimiert Energienutzung in der Kolonie.' },
  // Navigation
  'NAV:ORBITAL':            { icon: '🚀', label: 'Orbital-Navigation',   description: 'Berechnet Transferbahnen und Transferfenster — ermöglicht interplanetare Missionen.' },
  // Wirtschaft
  'ECO:CREDIT-BASICS':      { icon: '💰', label: 'Kredit-Wissen',        description: 'Versteht Zinsmechanismen — ermöglicht Kreditaufnahme für Investitionen in der Kolonie.' },
  'ECO:COMPOUND-INTEREST':  { icon: '📈', label: 'Zinseszins-Warnung',   description: 'Erkennt exponentielles Schuldenwachstum — verhindert Überschuldung der Kolonie.' },
  // Biologie
  'BIO:ORIGIN-OF-LIFE':     { icon: '🧬', label: 'Ursprungsforschung',   description: 'Versteht praebiotische Chemie — Grundlage für Terraforming und Ökosystem-Design.' },
  // Umwelt
  'ENV:CRITICAL-MATERIALS': { icon: '⚠️', label: 'Rohstoff-Radar',      description: 'Identifiziert kritische Materialien — priorisiert Ressourcengewinnung.' },
  'ENV:GREEN-HYDROGEN':      { icon: '🌿', label: 'Grüner Wasserstoff',  description: 'Erzeugt CO₂-freien Wasserstoff — nachhaltige Energieversorgung der Kolonie.' },
  'ENV:OCEAN-CLIMATE':       { icon: '🌊', label: 'Klima-Modellierung',  description: 'Versteht ozeanische Wärmepuffer — Klimaplanung für Terraforming.' },
  // Tools
  'TOOL:STAIN-REMOVAL':     { icon: '🧹', label: 'Reinigungstechnologie', description: 'Optimierte Fleckentfernung und Materialreinigung — Textil- und Oberflächenpflege.' },
  'TOOL:BATTERY':           { icon: '🔋', label: 'Batterie-Expertise',   description: 'Optimales Laden und Entladen — verlängert Lebensdauer der Energiespeicher.' },
  'TOOL:ELECTROMAGNET':     { icon: '🔌', label: 'Elektromagnet-Labor',  description: 'Baut steuerbare Elektromagnete — für Separatoren, Antriebe und Sensorik.' },
  'TOOL:ENERGY-HARVESTING': { icon: '⚡', label: 'Energy Harvesting',    description: 'Gewinnt Energie aus mechanischen Schwingungen — passive Stromversorgung.' },
  // Missionen
  'MISSION:LAB-ALPHA':      { icon: '🔬', label: 'Mission: Lab Alpha',   description: 'Schaltet das erste Forschungslabor frei — biochemische Analysen möglich.' },
  'SENSE:POLARITY':         { icon: '🧭', label: 'Polaritäts-Sensor',    description: 'Misst elektrische Polarität von Substanzen — Grundlage für Reinigungsroboter.' },
  'KNOW:LIFE-ON-EARTH':     { icon: '🌍', label: 'Lebensgrundlagen',     description: 'Versteht Voraussetzungen für Leben — Grundlage für Habitat-Design.' },
  'MATH:EXPONENTIAL-GROWTH':{ icon: '📊', label: 'Wachstums-Modelle',    description: 'Modelliert exponentielles Wachstum — Grundlage für Populationsprognosen.' },
  'AST:HOHMANN-TRANSFER':   { icon: '🌌', label: 'Hohmann-Transfer',     description: 'Berechnet energieoptimale Transferbahnen zwischen Planeten.' },
};

function getKeyInfo(key: string) {
  // Direct match
  if (NOXIA_KEY_INFO[key]) return NOXIA_KEY_INFO[key];
  // Prefix match (e.g. UNL:NOX:NAV:ORBITAL → NAV:ORBITAL)
  const stripped = key.replace(/^UNL:NOX:/, '');
  if (NOXIA_KEY_INFO[stripped]) return NOXIA_KEY_INFO[stripped];
  // Skip UNL:NOX:* that have no description — they're internal sync keys
  if (key.startsWith('UNL:NOX:') || key.startsWith('PHY:') || key.startsWith('CHEM:') || key.startsWith('AST:')) {
    const parts = stripped.split(':');
    const domain = parts[0];
    const name = parts.slice(1).join(' ').replace(/-/g, ' ').toLowerCase();
    return { icon: '🔓', label: domain + ': ' + name, description: 'NOXIA-Fähigkeit — Details in NOXIA verfügbar.' };
  }
  return null;
}

function NoxiaUnlockBadge({ unlockKey }: { unlockKey: string }) {
  const info = getKeyInfo(unlockKey);
  // Skip internal sync keys (UNL:NOX:* that map to real keys already shown)
  if (unlockKey.startsWith('UNL:NOX:') && NOXIA_KEY_INFO[unlockKey.replace(/^UNL:NOX:/, '')]) return null;
  if (!info) return null;

  return (
    <span
      title={info.description}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        background: 'var(--gold-bg, #FFF8E7)',
        border: '1px solid #DFC87A',
        color: 'var(--navy)',
        padding: '3px 9px',
        borderRadius: 4,
        cursor: 'help',
        transition: 'background .15s, border-color .15s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = '#F4A30022';
        el.style.borderColor = '#C9A84C';
        // Show tooltip via title attribute (native browser tooltip)
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = 'var(--gold-bg, #FFF8E7)';
        el.style.borderColor = '#DFC87A';
      }}
    >
      <span>{info.icon}</span>
      <span>{unlockKey.replace(/^UNL:NOX:/, '')}</span>
      <span style={{ fontSize: 9, opacity: 0.5, marginLeft: 2 }}>ⓘ</span>
    </span>
  );
}

export default async function LearningPathDetailPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const sp = searchParams ? await searchParams : {};
  const noxiaUid = sp?.uid ?? null;
  const fromNoxia = sp?.ref === 'noxia';
  const path = getRegisteredLearningPathById(decodeURIComponent(id));

  if (!path) notFound();

  const lifecycle = getLearningPathStatus(path.status);
  const isMaillard = path.id === 'PATH:SSF:CHE-KUECHE-MAILLARD-0001';

  return (
    <div className="container reading" style={{ paddingTop: 'max(var(--header-h, 132px), 40px)', paddingBottom: 96 }}>
      {/* NOXIA context banner */}
      {fromNoxia && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 12, marginBottom: 24, padding: '10px 16px',
          background: '#0A1628', borderRadius: 8,
          border: '1px solid rgba(201,168,76,0.3)',
          flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 16 }}>🎮</span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.7)',
              letterSpacing: '.06em',
            }}>
              Abschluss dieser Lernreise schaltet Fähigkeiten in NOXIA frei
            </span>
          </div>
          <a href="https://noxiagame.vercel.app/dashboard" style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, color: '#C9A84C',
            letterSpacing: '.06em', textDecoration: 'none', whiteSpace: 'nowrap',
          }}>← Zurück zu NOXIA</a>
        </div>
      )}
      {/* Page header: title as small eyebrow, subtitle as the headline */}
      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10,
      }}>
        Lernreise
      </p>
      <h1 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(26px, 4vw, 40px)',
        fontWeight: 'normal',
        color: 'var(--ink)',
        lineHeight: 1.18,
        letterSpacing: '-0.02em',
        maxWidth: '22em',
        marginBottom: 14,
      }}>
        {path.title}
      </h1>
      <p style={{ color: 'var(--muted)', maxWidth: '58ch', fontSize: 16, lineHeight: 1.75, marginBottom: 20 }}>
        {path.subtitle}
      </p>

      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '6px 12px',
        border: '1px solid var(--border)',
        borderRadius: 6,
        background: 'var(--soft)',
        marginBottom: 12,
      }}>
        <span style={{
          width: 7, height: 7, borderRadius: '50%',
          background: path.status === 'active' ? 'var(--success)' : 'var(--gold)',
          flexShrink: 0,
        }} />
        <strong style={{ color: 'var(--ink)', fontSize: 13 }}>{lifecycle.label}</strong>
        <span style={{ color: 'var(--muted)', fontSize: 12 }}>— {lifecycle.description}</span>
      </div>

      {path.unlocks.length > 0 && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
          marginBottom: 8, padding: '8px 12px',
          background: 'var(--gold-bg, #FFF8E7)',
          border: '1px solid #DFC87A',
          borderRadius: 6,
        }}>
          <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
            NOχ¹Δ
          </span>
          {path.unlocks.map((key) => (
            <NoxiaUnlockBadge key={key} unlockKey={key} />
          ))}
        </div>
      )}

      {isMaillard ? <MaillardJourney path={path} /> : <PathRunner path={path} />}
    </div>
  );
}
