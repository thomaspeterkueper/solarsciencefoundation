# SSF · Wissen aus den Chronomaps

```
Aktualisiert: 18.11.2026 – 1.0.0: angelegt (Thomas: „nicht vergessen alles in SSF“). Erster Lernpfad PATH:SSF:HIS-ALLTAG-GALILAEA-30-0001; Fahrplan für alle Wissensdateien der Chronomaps
Version:      1.0.0
```

Die Recherche zu den Chronomaps in noxia liegt in drei Schichten, die aufeinander verweisen:

| Schicht | Ort | Zweck |
| --- | --- | --- |
| Wissensdateien | `noxiagame/docs/world/chronomap-erde/wissen/*.md` | ausführliche Fassung mit Quellen, Nachbarn, Sagen, offenen Punkten |
| Wissensgraph | `kueper-knowledge-graph/exports/entity-registry-history-*.json` | kanonische IDs (Orte, Funde, Personen, Ereignisse) |
| SSF | `lib/learningPaths/*.ts` | Lernpfade mit Aufgaben, Kurztests und Belegstufen; für Spieler **und NPCs** (Thomas, 18.11.2026: NPCs lernen ebenfalls in den SSF-Lernmodulen) |

**Regel:** Jedes neue Wissensthema der Chronomaps bekommt – nach dem Nachtrag im Wissensgraphen – einen Platz in einem SSF-Lernpfad. Ein Lernpfad bündelt vier bis acht Themen als Einheiten. Belegstufen nach `docs/SSF-BELEGSTUFEN.md`; Strittiges bleibt als Forschungsdeutung gekennzeichnet; Evangelien nur als Überlieferung.

## Lernpfade

| Lernpfad | Einheiten | Wissensdateien | Stand |
| --- | --- | --- | --- |
| `PATH:SSF:HIS-ALLTAG-GALILAEA-30-0001` „Wie lebte man am See Genezareth um das Jahr 30?“ | Geld · Kleidung · Tiere · Wasser · Quellen prüfen | geld-preise, kleidung, landwirtschaft-tiere, wasser-baeder | Prototyp, 18.11.2026 |
| `PATH:SSF:CHE-KUECHE-ALTE-REZEPTE-0001` „Kann man ein Rezept nachkochen, das 3700 Jahre alt ist?“ | (Küche) | rezepte | Prototyp, 14.11.2026 |

## Fahrplan: noch nicht in einem Lernpfad

| Geplanter Lernpfad | Wissensdateien |
| --- | --- |
| Glauben und Feiern in Galiläa | religion-alltag, feste-kalender, prophetinnen, musik-klang |
| Recht, Macht und Besatzung | recht-gericht, militaer-besatzung, waffen, judaea-herodes-20-v-chr |
| Leben von der Geburt bis zum Grab | familie-lebenslauf, medizin-heilung, tod-bestattung, essen-mahlzeiten |
| Arbeit, Wege und Häuser | arbeit-handwerk, reisen-wege, wohnen-siedlung, natur-landschaft |
| Lesen, Schreiben, Urkunden | schrift-sprache, bildung-wissen, urkunden-archive, spiele-spielzeug |
| Erzählen und Erinnern | lieder-sagen-erzaehlungen, blick-der-nachbarn |
| Andere Epochen (eigene Reihen) | buto-saitenzeit, perserzeit-614-638 |

Wer einen Lernpfad baut, verschiebt die Zeile von „Fahrplan“ nach „Lernpfade“.
