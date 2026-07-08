# SSF REQUEST — Live-KG-Anbindung und OTA-Archiv-Bridge

**Datum:** 2026-07-08  
**Priorität:** Hoch  
**Abhängigkeiten:** KG REQ-KG-001, REQ-KG-002, REQ-KG-004  
**Initiiert durch:** OTA-Kurator (Thomas Peter Küper)

---

## Kontext

SSF liest KXF-Exporte aktuell **statisch von GitHub Raw** — das ist die dokumentierte Schwachstelle aus OTA-ARC-0008 §II. Änderungen im KG wirken erst nach manuellem Export auf SSF. Das OTA hat 205 Dokumente publiziert, alle mit `kg.documentId` und `knowledge.domains`. SSF hat die Infrastruktur (`/api/prerequisites/[documentId]`, `/api/modules`, `/api/learning-paths`) — sie braucht jetzt eine Live-Verbindung.

---

## REQ-SSF-001 — Live-KG-API-Anbindung ersetzen GitHub Raw

**Was:** `lib/kxf.ts` soll KXF-Daten aus der KG-API beziehen, nicht mehr aus GitHub Raw.

**Aktueller Stand:**
```typescript
// lib/kxf.ts — aktuell
const DEFAULT_LEARNING_MODULES_URL =
  'https://raw.githubusercontent.com/thomaspeterkueper/kueper-knowledge-graph/main/exports/kxf-learning-modules-0.1.json';
```

**Soll:**
```typescript
// lib/kxf.ts — neu
const KG_API_BASE = process.env.KG_API_URL ?? 'https://kg.kueper.com/api';

export async function fetchLearningModules(): Promise<KxfLearningModule[]> {
  // Primär: KG-API (Live)
  // Fallback: GitHub Raw (wenn KG nicht erreichbar)
  try {
    const res = await fetch(`${KG_API_BASE}/kxf/learning-modules`);
    if (res.ok) return (await res.json()).modules;
  } catch {}
  // Fallback
  return fetchFromGithubRaw();
}
```

**Umgebungsvariable:** `KG_API_URL` in `.env` und Vercel-Secrets.

**Akzeptanzkriterium:**  
- `GET /api/modules` liefert Daten aus KG-API, nicht GitHub Raw  
- Fallback auf GitHub Raw wenn KG nicht erreichbar  
- Response-Header `X-Source: kg-live` oder `X-Source: github-fallback`

---

## REQ-SSF-002 — OTA-Dokument-Brücke implementieren

**Was:** Neue API-Route `/api/ota/[documentId]` — SSF ruft KG-API für OTA-Dokument-Metadaten ab und gibt sie weiter.

**Route:** `GET /api/ota/[documentId]`

**Beispiel-Request:** `GET /api/ota/OTA-SCI-0043-2026-DE`

**Response:**
```json
{
  "signature": "OTA-SCI-0043-2026-DE",
  "contentUrl": "https://overtimearchive.org/dokument/OTA-SCI-0043-2026-DE",
  "prerequisites": [
    { "domain": "KD:GEO-SEISM:N2", "purpose": "read" },
    { "domain": "KD:MATH-STAT:N1", "purpose": "read" }
  ],
  "learningPath": {
    "id": "PATH:OTA:OTA-SCI-0043-2026-DE:READ",
    "steps": ["EAR-L2-000001", "MAT-L1-000002"],
    "estimatedMinutes": 28
  },
  "accessible": true
}
```

**Nutzt:** KG REQ-KG-002 (`GET /api/ota/documents/[signatur]`)

**Akzeptanzkriterium:**  
- `GET /api/ota/OTA-SCI-0043-2026-DE` antwortet in < 500ms  
- `learningPath.steps` enthält tatsächlich existierende Modul-IDs

---

## REQ-SSF-003 — OTA-Dokument-Seite in SSF

**Was:** Neue Seite `/de/ota/[documentId]` — zeigt Voraussetzungen für ein OTA-Dokument und den Lernpfad dorthin.

**Layout:**
```
┌─────────────────────────────────────────────┐
│ OTA-SCI-0043-2026-DE                        │
│ LLSVPs und Kern-Mantel-Grenze               │
│ overtimearchive.org ↗                       │
├─────────────────────────────────────────────┤
│ VORAUSSETZUNGEN                             │
│  KD:GEO-SEISM:N2  → 2 Module verfügbar     │
│  KD:MATH-STAT:N1  → 1 Modul verfügbar      │
├─────────────────────────────────────────────┤
│ LERNPFAD ZUM DOKUMENT                       │
│  1. EAR-L2-000001 — Planetare Seismologie  │
│  2. MAT-L1-000002 — Statistik Grundlagen   │
│  Geschätzte Zeit: ~28 Minuten              │
│  [Lernpfad starten →]                       │
└─────────────────────────────────────────────┘
```

**Nutzt:** REQ-SSF-002  
**Verlinkt zu:** OTA-Website (`overtimearchive.org/dokument/[id]`)

**Akzeptanzkriterium:**  
- Seite lädt und zeigt Prerequisites aus KG  
- "Lernpfad starten" öffnet den ersten Modul  
- Link zur OTA-Website öffnet das Volldokument

---

## REQ-SSF-004 — KXF-Migration v0.1.3 → v0.2.0 konsumieren

**Was:** SSF muss die neuen Modul-IDs aus KG-0007 (ARC-0007) verarbeiten können.

**Geänderte ID-Struktur:**
```
Alt:  LRN:SSF:MAT-1001
Neu:  MAT-L0-000001
```

**Betroffene Files:**
- `lib/kxf.ts` — ID-Parsing anpassen
- `lib/modules.ts` — Legacy-ID-Mapping für Rückwärtskompatibilität
- `app/de/modules/[id]/page.tsx` — Route akzeptiert neue und alte IDs

**Legacy-Mapping in `lib/modules.ts`:**
```typescript
export const LEGACY_ID_MAP: Record<string, string> = {
  'LRN:SSF:MAT-1001': 'MAT-L0-000001',
  'LRN:SSF:MAT-1002': 'MAT-L0-000002',
  // ... alle 13 Module aus ARC-0007 §III
};

export function resolveModuleId(id: string): string {
  return LEGACY_ID_MAP[id] ?? id;
}
```

**Akzeptanzkriterium:**  
- `/de/modules/MAT-L0-000001` lädt korrekt  
- `/de/modules/LRN:SSF:MAT-1001` redirectet auf neue ID  
- Kein Build-Fehler durch unbekannte IDs

---

## REQ-SSF-005 — Prerequisite-Seite für OTA-Domains

**Was:** Bestehende Route `/api/prerequisites/[documentId]` aktivieren und für OTA nutzen.

**Aktueller Stand:** Route existiert als leere Datei.

**Implementierung:**
```typescript
// app/api/prerequisites/[documentId]/route.ts
export async function GET(req: Request, { params }) {
  const { documentId } = params;
  
  // KG-API abfragen
  const kg = await fetch(`${KG_API_BASE}/ota/documents/${documentId}/prerequisites`);
  if (!kg.ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  
  const data = await kg.json();
  return NextResponse.json({
    documentId,
    prerequisites: data.prerequisites,
    satisfiedBy: data.prerequisites.map(p => ({
      domain: p.domain,
      modules: [] // wird mit KG-0004-Daten befüllt
    }))
  });
}
```

**Akzeptanzkriterium:**  
- `GET /api/prerequisites/OTA-SCI-0043-2026-DE` antwortet mit Prerequisites  
- OTA-Website kann diese Route konsumieren

---

## Implementierungsreihenfolge

```
1. REQ-KG-001 (OTA Ingestion) ← Basis für alles
2. REQ-KG-002 (KG-API)        ← SSF kann anfragen
3. REQ-SSF-004 (KXF-Migration) ← Unabhängig, sofort möglich
4. REQ-SSF-001 (Live-API)      ← nach REQ-KG-002
5. REQ-KG-004 (Auto-Export)    ← nach REQ-KG-001
6. REQ-SSF-002 (OTA-Bridge)    ← nach REQ-SSF-001
7. REQ-KG-003 (Domain-Search)  ← nach REQ-KG-001
8. REQ-SSF-005 (Prerequisites) ← nach REQ-SSF-001
9. REQ-SSF-003 (OTA-Seite)     ← nach REQ-SSF-002
```

