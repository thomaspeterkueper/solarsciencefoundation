# SSF-HEALTH-BOTANICAL-0001 — Knoblauch, Zitrone und Ingwer
Version: 1.0 (Entwurf) · 2026-11-15 · Status: fachlicher Lernprototyp, nicht freigegeben für medizinische Empfehlungen

## Zweck und Eigentümerschaft
Solar Science Foundation (SSF) übersetzt geprüfte Wissensbehauptungen in Lernaufgaben. Kanonische, quellengebundene Fachbehauptungen sollen nach Prüfung im KUEPER Knowledge Graph (KG) referenziert werden. Dieser Entwurf begründet **keine** neue KG-/OTA-ID und wird nicht als klinisch validierte Empfehlung exportiert. NOXIA erhält erst nach Freigabe ein versioniertes Lern- und Evidenzpaket.

## Leitfrage
Warum können Pflanzenstoffe im Labor biologisch aktiv erscheinen, ohne dass ein Hausmittel dadurch nachweislich Erkältungen verhindert oder heilt?

## Differenzierte Aussagen
| Aussage | Einordnung | Transfer an Spieler |
| --- | --- | --- |
| Zerdrücken/Zerkleinern bringt Alliin und Alliinase zusammen und ermöglicht Allicinbildung | biochemischer Mechanismus | experimentell als schematischer Prozess modellieren |
| Wärme kann Alliinase inaktivieren; Verarbeitung beeinflusst Stoffzusammensetzung | Mechanismus; temperatur-/prozessabhängig | keine präzisen Wirkstoff-Prozentwerte ohne Messdaten |
| Knoblauch bzw. Präparate verhindern oder behandeln Erkältungen zuverlässig | **nicht gesichert** | nicht als Heilwirkung oder Statusbonus implementieren |
| Ingwer- und Zitronenbestandteile können in Laborstudien Aktivität zeigen | präklinischer Forschungsstand, präparat- und modellabhängig | Laborwirkung ≠ Wirksamkeit des Getränks am Menschen |
| Das Gesamtgetränk besitzt eine etablierte therapeutische Dosierung | **nicht belegt** | keine vorbeugende oder akute Dosierempfehlung |
| Nach kurzem Erhitzen sei das Getränk vier Monate im Kühlschrank sicher haltbar | **nicht validiert / Sicherheitsrisiko** | weder Haltbarkeitsgarantie noch Rezeptfreigabe |

## Kulturelles Beispiel (keine medizinische Anweisung)
Traditionell werden Knoblauch, Ingwer und Zitrone in Hausmitteln verwendet. Die vom Nutzer eingebrachte Rezeptbeschreibung mit 200 g Knoblauch, 15 Zitronen, 200 g Ingwer und 3 l Wasser ist **ein zu untersuchendes Kulturartefakt**, kein validiertes Gesundheitsrezept. Vor Veröffentlichung der behaupteten Thieme-Herkunft ist die genaue Originalfundstelle und deren Aussagekontext zu prüfen. In diesem Modul ausdrücklich **keine** viermonatige Kühlschrankhaltbarkeit, keine therapeutische Mengenangabe und kein pauschaler Hinweis, unbehandelte Schalen seien automatisch unbelastet.

## Sicherheitsleitplanken
- Bei Atemnot, schwerer Erkrankung oder auffälliger Verschlechterung medizinische Abklärung; Hausmittel nicht als Ersatz einer Behandlung darstellen.
- Knoblauch, besonders in Supplementform und höheren Mengen: mögliche Wechselwirkungen etwa mit Antikoagulanzien; Magen-Darm-Beschwerden und allergische Reaktionen.
- Lebensmittelhygiene: saubere Zubereitung, rasche Kühlung, keine ungedeckte lange Lagerdauer; konkrete Haltbarkeitsaussagen nur nach belastbarer lebensmitteltechnischer Validierung.
- Keine modellierten Heilungsboni, die aus Anekdoten, Einzelstudien oder In-vitro-Befunden abgeleitet werden.

## Interaktiver Lernpfad
1. **Beobachten:** virtuelle unversehrte und zerkleinerte Knoblauchzehe; Zellkompartimente vergleichen.
2. **Hypothese:** Wie beeinflusst die Reihenfolge von Erhitzen und Zerkleinern die enzymatische Reaktion?
3. **Simulieren:** nur qualitatives Schema, keine als Messdaten ausgegebenen Zahlen.
4. **Evidenzlabor:** Molekülmechanismus, Petrischalenversuch, Tiermodell, randomisierte Studie, systematischer Review unterscheiden.
5. **Quellenwerkstatt:** Hausmittelüberlieferung mit Cochrane/NCCIH vergleichen; alternative Erklärungen spontaner Besserung.
6. **Sicherheitsentscheidung:** die unbelegte Aussage „vier Monate haltbar“ erkennen und zurückweisen.
7. **Transfer:** Spieler erklärt einem NPC den Unterschied zwischen persönlicher Erfahrung und allgemein belastbarer Wirksamkeit.

## Prüffragen und Akzeptanz
- Warum ist Allicinbildung kein Nachweis einer klinischen antiviralen Wirkung?
- Welche Schlussfolgerungen erlaubt ein einzelner Versuch mit 146 Personen nicht?
- Warum dürfen wir aus „mir ging es besser“ keine kausale Heilungswirkung folgern?
- Welche Aussage über die Lagerdauer muss vor einer Rezeptveröffentlichung geprüft werden?
Freischaltung nur nach evidenzgerechter Antwort; kein medizinisches oder pharmazeutisches Unlock. Wissensstand und Provenienz werden versioniert, keine erfundenen KG-/OTA-/UNL-IDs.

## Maschinenlesbarer späterer Export (Vertragsentwurf)
```json
{
  "contentKey": "HEALTH:BOTANICAL:GARLIC-LEMON-GINGER",
  "schemaVersion": "0.1-draft",
  "sourceOfTruth": "KG (pending review)",
  "educationOwner": "SSF",
  "claims": [
    {"key":"garlic.allicin.enzyme","evidenceType":"biochemistry","clinicalBenefitEstablished":false},
    {"key":"garlic.cold.prevent","evidenceType":"limited-human-evidence","clinicalBenefitEstablished":false},
    {"key":"mixture.shelfLife.fourMonths","evidenceType":"unsupported","publishAsAdvice":false}
  ],
  "medicalAdvice": false
}
```

## Quellen und Review-Datum
- Cochrane, *Garlic for the common cold*, 2014 (Evidenzstand 07.08.2014): https://www.cochrane.org/evidence/CD006206_garlic-common-cold
- NCCIH, *Garlic: Usefulness and Safety*: https://www.nccih.nih.gov/health/garlic
- NIH ODS, *Dietary Supplements for Immune Function and Infectious Diseases*: https://ods.od.nih.gov/factsheets/ImmuneFunction-HealthProfessional/

Review: SSF-Fachprüfung + KG-Provenienzabgleich vor Publikation; periodische Aktualisierung. Offen: originale Thieme-Quelle identifizieren; lebensmitteltechnische Quellen für Lagerung ergänzen; Lernrenderer und Fortschritts-API verbinden.
