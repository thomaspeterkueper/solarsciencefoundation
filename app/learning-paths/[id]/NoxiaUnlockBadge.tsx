'use client';
// NoxiaUnlockBadge — must be 'use client' because it uses onMouseEnter/Leave hover state

const NOXIA_KEY_INFO: Record<string, { label: string; description: string; icon: string }> = {
  'SENSOR:SPECTRAL':        { icon: '🔭', label: 'Spektral-Scanner',     description: 'Schaltet den NOXIA-Spektrometer frei — erkennt Elemente und Ressourcen per Lichtanalyse.' },
  'SENSOR:MAGNETIC':        { icon: '🧲', label: 'Magnet-Sensor',        description: 'Erkennt magnetische Anomalien — findet vergrabene Erze und Magnetit-Vorkommen.' },
  'SENSOR:PIEZO':           { icon: '⚡', label: 'Piezo-Sensor',         description: 'Misst mechanische Schwingungen — entdeckt Hohlräume und Tektonik unter der Oberfläche.' },
  'SENSOR:THERMAL':         { icon: '🌡️', label: 'Wärme-Sensor',        description: 'Erkennt Temperaturgradienten — lokalisiert geothermische Quellen und heiße Zonen.' },
  'CHEM:SURFACTANT':        { icon: '🧴', label: 'Tensid-Wissen',        description: 'Ermöglicht Synthese von Reinigungsmitteln und Emulgatoren aus Rohstoffen.' },
  'CHEM:MICELLE':           { icon: '🔬', label: 'Mizell-Technologie',   description: 'Schaltet Mizell-Reaktoren frei — hocheffiziente Extraktion von Öl-in-Wasser Gemischen.' },
  'CHEM:PROTEIN-DENATURATION': { icon: '🧬', label: 'Protein-Labor',    description: 'Ermöglicht biochemische Verarbeitungsprozesse — Lebensmittel- und Materialverarbeitung.' },
  'CHEM:WATER-MOLECULE':    { icon: '💧', label: 'Wasser-Chemie',        description: 'Grundlage für Wasserrecycling und -aufbereitung in der Kolonie.' },
  'CHEM:HYDROGEN-BOND':     { icon: '🔗', label: 'Bindungsanalyse',      description: 'Ermöglicht Analyse polarer Verbindungen — Grundlage für Lösemittel-Technologie.' },
  'CHEM:DIPOLE':            { icon: '⚛️', label: 'Dipol-Technologie',    description: 'Schaltet elektrostatische Trennverfahren frei — Reinigung komplexer Gemische.' },
  'CHEM:IRIDIUM':           { icon: '💎', label: 'Iridium-Katalyse',     description: 'Iridium-gestützte PEM-Elektrolyse — Wasserstoffproduktion aus Wasser.' },
  'CHEM:ELECTROLYSIS':      { icon: '⚗️', label: 'Elektrolyse-Labor',    description: 'Wasserspaltung zu H₂ und O₂ — Energiespeicher und Atemluft für die Kolonie.' },
  'CHEM:ELECTRON-SPIN':     { icon: '🌀', label: 'Spintronic-Labor',     description: 'Quantenmagnetismus-Forschung — Grundlage für hochpräzise Messinstrumente.' },
  'PHY:PHASE-DIAGRAM':      { icon: '🗺️', label: 'Phasen-Navigator',    description: 'Vorhersage von Aggregatzuständen unter extremen Bedingungen.' },
  'PHY:DENSITY-ANOMALY':    { icon: '🧊', label: 'Eisplanet-Expertise',  description: 'Bau von Habitaten auf Eisplaneten — nutzt die Dichteanomalie von Wasser.' },
  'PHY:SURFACE-TENSION':    { icon: '🕸️', label: 'Kapillar-Systeme',    description: 'Passive Wasserversorgung durch Kapillarkräfte — kein Pumpensystem nötig.' },
  'PHY:SUBLIMATION':        { icon: '☁️', label: 'Sublimations-Kontrolle', description: 'Versteht Wasserverlust auf Mars/Titan — optimiert Wasserreserven der Kolonie.' },
  'PHY:HEAT-CAPACITY':      { icon: '🔥', label: 'Thermomanagement',     description: 'Effiziente Wärmespeicherung — optimiert Heizung und Kühlung der Kolonie.' },
  'PHY:QUANTUM-LEVELS':     { icon: '⚛️', label: 'Quanten-Spektroskopie', description: 'Versteht diskrete Energieniveaus — Grundlage für Laser und Spektrometer.' },
  'PHY:ENTROPY-BASICS':     { icon: '🌡️', label: 'Entropie-Verständnis', description: 'Erklärt Richtung chemischer Reaktionen — optimiert Energienutzung.' },
  'NAV:ORBITAL':            { icon: '🚀', label: 'Orbital-Navigation',   description: 'Berechnet Transferbahnen und Transferfenster — ermöglicht interplanetare Missionen.' },
  'ECO:CREDIT-BASICS':      { icon: '💰', label: 'Kredit-Wissen',        description: 'Versteht Zinsmechanismen — ermöglicht Kreditaufnahme für Investitionen.' },
  'ECO:COMPOUND-INTEREST':  { icon: '📈', label: 'Zinseszins-Warnung',   description: 'Erkennt exponentielles Schuldenwachstum — verhindert Überschuldung.' },
  'BIO:ORIGIN-OF-LIFE':     { icon: '🧬', label: 'Ursprungsforschung',   description: 'Versteht praebiotische Chemie — Grundlage für Terraforming.' },
  'ENV:CRITICAL-MATERIALS': { icon: '⚠️', label: 'Rohstoff-Radar',      description: 'Identifiziert kritische Materialien — priorisiert Ressourcengewinnung.' },
  'ENV:GREEN-HYDROGEN':      { icon: '🌿', label: 'Grüner Wasserstoff',  description: 'Erzeugt CO₂-freien Wasserstoff — nachhaltige Energieversorgung.' },
  'ENV:OCEAN-CLIMATE':       { icon: '🌊', label: 'Klima-Modellierung',  description: 'Versteht ozeanische Wärmepuffer — Klimaplanung für Terraforming.' },
  'TOOL:STAIN-REMOVAL':     { icon: '🧹', label: 'Reinigungstechnologie', description: 'Optimierte Fleckentfernung und Materialreinigung.' },
  'TOOL:BATTERY':           { icon: '🔋', label: 'Batterie-Expertise',   description: 'Optimales Laden und Entladen — verlängert Lebensdauer der Energiespeicher.' },
  'TOOL:ELECTROMAGNET':     { icon: '🔌', label: 'Elektromagnet-Labor',  description: 'Baut steuerbare Elektromagnete — für Separatoren und Antriebe.' },
  'TOOL:ENERGY-HARVESTING': { icon: '⚡', label: 'Energy Harvesting',    description: 'Gewinnt Energie aus mechanischen Schwingungen — passive Stromversorgung.' },
  'TOOL:MAILLARD':          { icon: '🍳', label: 'Maillard-Reaktor',     description: 'Optimiert Nahrungsproduktion durch kontrollierte Bräunungsreaktionen.' },
  'MISSION:LAB-ALPHA':      { icon: '🔬', label: 'Mission: Lab Alpha',   description: 'Schaltet das erste Forschungslabor frei — biochemische Analysen möglich.' },
  'SENSE:POLARITY':         { icon: '🧭', label: 'Polaritäts-Sensor',    description: 'Misst elektrische Polarität von Substanzen.' },
  'SENSE:UMAMI':            { icon: '👅', label: 'Umami-Sensor',         description: 'Erkennt Glutamat und Umami-Verbindungen — Qualitätskontrolle für Nahrung.' },
  'KNOW:LIFE-ON-EARTH':     { icon: '🌍', label: 'Lebensgrundlagen',     description: 'Versteht Voraussetzungen für Leben — Grundlage für Habitat-Design.' },
  'MATH:EXPONENTIAL-GROWTH':{ icon: '📊', label: 'Wachstums-Modelle',    description: 'Modelliert exponentielles Wachstum — Grundlage für Populationsprognosen.' },
  'AST:HOHMANN-TRANSFER':   { icon: '🌌', label: 'Hohmann-Transfer',     description: 'Berechnet energieoptimale Transferbahnen zwischen Planeten.' },
  'MISSION:OBSERVATION-DECK':{ icon: '🌠', label: 'Beobachtungsdeck',   description: 'Schaltet das Beobachtungsdeck frei — astronomische Messungen möglich.' },
};

function getKeyInfo(key: string) {
  if (NOXIA_KEY_INFO[key]) return NOXIA_KEY_INFO[key];
  const stripped = key.replace(/^UNL:NOX:/, '');
  if (NOXIA_KEY_INFO[stripped]) return NOXIA_KEY_INFO[stripped];
  if (key.startsWith('UNL:NOX:') && NOXIA_KEY_INFO[stripped]) return null;
  const parts = stripped.split(':');
  const domain = parts[0];
  const name = parts.slice(1).join(' ').replace(/-/g, ' ').toLowerCase();
  if (!name) return null;
  return { icon: '🔓', label: domain + ': ' + name, description: 'NOXIA-Fähigkeit — Details in NOXIA verfügbar.' };
}

export function NoxiaUnlockBadge({ unlockKey }: { unlockKey: string }) {
  // Skip internal sync keys that are already represented by a real key
  if (unlockKey.startsWith('UNL:NOX:')) {
    const stripped = unlockKey.replace(/^UNL:NOX:/, '');
    if (NOXIA_KEY_INFO[stripped]) return null;
  }
  const info = getKeyInfo(unlockKey);
  if (!info) return null;

  return (
    <span
      title={info.description}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        fontFamily: 'var(--font-mono)', fontSize: 11,
        background: 'var(--gold-bg, #FFF8E7)',
        border: '1px solid #DFC87A',
        color: 'var(--navy)', padding: '3px 9px', borderRadius: 4,
        cursor: 'help', userSelect: 'none',
      }}
    >
      <span>{info.icon}</span>
      <span>{unlockKey.replace(/^UNL:NOX:/, '')}</span>
      <span style={{ fontSize: 9, opacity: 0.5, marginLeft: 2 }}>ⓘ</span>
    </span>
  );
}
