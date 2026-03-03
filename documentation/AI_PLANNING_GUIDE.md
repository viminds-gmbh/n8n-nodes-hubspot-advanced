# AI Planning Guide – HubSpot n8n Nodes

Dieser Guide definiert den Planungs- und Implementierungsprozess für neue Features in diesem Projekt, um konsistente Qualität und Guidelines-Compliance sicherzustellen.

---

## 🎯 Grundprinzip

**ERST PLANEN, DANN IMPLEMENTIEREN**

Jede neue Feature-Implementierung durchläuft **5 Phasen**:
1. API-Analyse & Dokumentation
2. Code-Reuse-Analyse
3. Field-Spezifikation
4. Architektur-Entscheidungen
5. Implementation & Testing

---

## Phase 1: API-Analyse & Dokumentation

### ⚠️ KRITISCHE REGEL

**Wenn keine Dokumentation im `/documentation/hubspot/` Ordner existiert:**
1. ❌ **NICHT mit Annahmen fortfahren**
2. ✅ **User fragen**: "Ich finde keine Dokumentation für Endpoint X. Kannst du mir die API-Spezifikation liefern?"
3. ✅ **Warten** auf User-Input
4. ✅ **Dokumentation ergänzen** bevor Implementation startet

### API-Spezifikations-Template

Für **jeden** Endpoint eine vollständige Spezifikation erstellen:

```markdown
## [Operation Name] - API Spezifikation

**Endpoint:** `METHOD /path/to/endpoint`  
**Content-Type:** `application/json` | `multipart/form-data`  
**Auth:** Bearer Token (hubspotAppToken)

### Request Parameters

| Parameter | Type | Required | Location | Default | Beschreibung |
|-----------|------|----------|----------|---------|--------------|
| fileId | string | ✅ | path | - | Unique file identifier |
| file | binary | ✅ | body (multipart) | - | File data to upload |
| options | JSON string | ❌ | body (multipart) | - | `{ access, expiresAt }` |
| name | string | ❌ | query | - | Filter by name (partial match) |

### Request Body Example

**JSON:**
```json
{
  "name": "document.pdf",
  "access": "PRIVATE"
}
```

**Multipart/form-data:**
```
file: <binary data>
options: {"access":"PRIVATE"}
folderPath: "/uploads"
```

### Response Format

**Success (200):**
```json
{
  "id": "122692044085",
  "name": "document.pdf",
  "url": "https://...",
  "size": 24574,
  "type": "PDF",
  "access": "PRIVATE"
}
```

**Error (400/404/429):**
```json
{
  "status": "error",
  "message": "File not found",
  "category": "OBJECT_NOT_FOUND"
}
```

### Async Operations

- [ ] **Synchron** - Response enthält direkt Ergebnis
- [x] **Asynchron** - Response enthält Task ID, Status-Polling erforderlich
  - Status-Endpoint: `GET /files/v3/files/import-from-url/async/tasks/{taskId}/status`
  - Polling-Intervall: 1 Sekunde
  - Max Attempts: 30 (30 Sekunden Timeout)
  - Status-Werte: `PENDING`, `PROCESSING`, `COMPLETE`, `FAILED`

### Besonderheiten

- ✅ File ID bleibt bei Replace erhalten
- ✅ URL bleibt bei Replace erhalten
- ⚠️ Rate Limiting: 150 requests/10s (handled by RateLimiter)
- ⚠️ Max File Size: 512 MB
```

### Checkliste: API-Analyse abgeschlossen

- [ ] Endpoint-URL dokumentiert
- [ ] HTTP-Methode klar
- [ ] Content-Type spezifiziert
- [ ] Alle Request-Parameter dokumentiert (required/optional)
- [ ] Response-Format mit Beispiel dokumentiert
- [ ] Error-Cases identifiziert
- [ ] Async/Sync Verhalten geklärt
- [ ] Rate Limits bekannt
- [ ] Besonderheiten notiert

---

## Phase 2: Code-Reuse-Analyse

### Duplicate Code Patterns identifizieren

**Vor Implementierung prüfen:**

```markdown
## Code Reuse Analysis

### Pattern 1: Binary Data Extraction
**Verwendet in:** upload, replace  
**Duplicate Code:** ~18 Zeilen identischer Code  
**Helper Decision:** ✅ Erstellen  
**Helper Name:** `getBinaryDataForUpload()`  
**Reason:** 2+ Verwendungen, komplexe Logik, Fehlerbehandlung

### Pattern 2: Query Parameter Building
**Verwendet in:** search files, search folders  
**Duplicate Code:** ~10 Zeilen ähnlicher Code  
**Helper Decision:** ❌ Inline lassen  
**Reason:** Zu einfach, nur conditional parameter addition

### Pattern 3: Async Status Polling
**Verwendet in:** importUrl  
**Duplicate Code:** ~20 Zeilen  
**Helper Decision:** ⏸️ Später  
**Reason:** Aktuell nur 1 Verwendung, bei 2+ Verwendungen refactoren
```

### Helper-Funktionen-Spezifikation

**Für jede geplante Helper-Funktion:**

```typescript
/**
 * Extracts binary data from input items for file upload/replace operations
 * 
 * @param items - Input items from workflow
 * @param i - Current item index
 * @param binaryPropertyName - Name of binary property (e.g., "data")
 * @param customFileName - Optional custom filename override
 * @returns Object with buffer, fileName, mimeType, and original binaryData
 * @throws Error if binary data not found
 */
async function getBinaryDataForUpload(
  items: INodeExecutionData[],
  i: number,
  binaryPropertyName: string,
  customFileName?: string
): Promise<{
  buffer: Buffer;
  fileName: string;
  mimeType: string;
  binaryData: IBinaryData;
}>
```

### Entscheidungsmatrix: Helper vs Inline

| Kriterium | Helper | Inline |
|-----------|--------|--------|
| Verwendungen | ≥ 2 | 1 |
| Komplexität | > 10 Zeilen | < 10 Zeilen |
| Fehlerbehandlung | Ja | Nein |
| Testbarkeit | Wichtig | Unwichtig |

### Checkliste: Code-Reuse abgeschlossen

- [ ] Alle Operationen auf Duplikate geprüft
- [ ] Helper-Funktionen identifiziert
- [ ] Signaturen spezifiziert
- [ ] Entscheidungen dokumentiert (Helper vs Inline)
- [ ] Context-Anforderungen geklärt (IExecuteFunctions vs standalone)

---

## Phase 3: Field-Spezifikation

### Vollständige Field-Definition

**Für JEDES Field in properties[]:**

```typescript
{
  displayName: 'File ID',           // ✅ Title Case, klar
  name: 'fileId',                   // ✅ camelCase
  type: 'string',                   // ✅ Korrekter n8n Type
  default: '',                      // ✅ Sinnvoller Default
  required: true,                   // ✅ Required-Status klar
  placeholder: '122692044085',      // ✅ Realistisches Beispiel
  description: 'The unique ID of the file. You can use expressions to reference IDs from previous nodes.', // ✅ Englisch, hilfreich
  displayOptions: {                 // ✅ Conditional Display
    show: {
      resource: ['file'],
      operation: ['get', 'replace', 'updateProperties', 'delete'],
    },
  },
}
```

### Field-Spezifikations-Template

```markdown
## [Operation] - Field Specifications

### Required Fields

#### File ID
- **displayName:** "File ID"
- **name:** `fileId`
- **type:** `string`
- **default:** `''`
- **required:** `true`
- **placeholder:** `'122692044085'`
- **description:** `'The unique ID of the file. You can use expressions to reference IDs from previous nodes.'`
- **displayOptions:**
  ```typescript
  {
    show: {
      resource: ['file'],
      operation: ['get', 'replace', 'updateProperties', 'delete'],
    },
  }
  ```

### Optional Fields

#### File Name
- **displayName:** "File Name"
- **name:** `fileName`
- **type:** `string`
- **default:** `''`
- **required:** `false`
- **placeholder:** `'document.pdf'`
- **description:** `'Optional custom name for the file. If empty, the original filename will be used.'`
- **displayOptions:**
  ```typescript
  {
    show: {
      resource: ['file'],
      operation: ['upload', 'importUrl', 'replace'],
    },
  }
  ```

### Validation Rules

- **Update Operations:** At least one of `updateName`, `updateAccess`, `updateParentFolderId` must be provided
  - Error Message: `"At least one property must be specified for update"`
  - Implementation: `if (Object.keys(body).length === 0) throw new Error(...)`

### Field Dependencies

- `customObjectType` depends on `objectType === 'custom'`
- `properties` depends on `objectType` (via loadOptionsDependsOn)
- `binaryPropertyName` only for operations with binary data
```

### Checkliste: Field-Spezifikation abgeschlossen

- [ ] Alle Required Fields spezifiziert
- [ ] Alle Optional Fields spezifiziert
- [ ] Descriptions auf Englisch
- [ ] Placeholders mit realistischen Beispielen
- [ ] displayOptions korrekt gesetzt
- [ ] Validation Rules definiert
- [ ] Error Messages spezifiziert (englisch)
- [ ] Field Dependencies dokumentiert

---

## Phase 4: Architektur-Entscheidungen

### Architecture Decision Records (ADRs)

**Für jede wichtige Entscheidung dokumentieren:**

```markdown
## Architecture Decisions

### Decision 1: Binary Data Helper Implementation

**Context:**  
Upload und Replace Operations benötigen identische Binary Data Extraction Logik.

**Decision:**  
Lokale Arrow-Funktion `getBinaryDataForUpload()` innerhalb `execute()` Methode.

**Alternatives Considered:**
1. ❌ Private Class Method mit `this: IExecuteFunctions`
   - **Rejected:** TypeScript erkennt private Methoden nicht als Teil von IExecuteFunctions
   - **Problem:** `Property 'getBinaryDataForUpload' does not exist on type 'IExecuteFunctions'`

2. ❌ Standalone Function außerhalb der Klasse
   - **Rejected:** Benötigt `this.helpers` Context, komplizierte Parameterübergabe

3. ✅ Lokale Arrow-Funktion in execute()
   - **Chosen:** Hat direkten Zugriff auf `this.helpers` via Closure
   - **Vorteil:** Einfache Signatur, kein Context-Passing nötig

**Consequences:**
- ✅ Code-Duplikation eliminiert
- ✅ TypeScript-konform
- ⚠️ Funktion nur innerhalb execute() verfügbar (akzeptabel)

---

### Decision 2: Replace File API Implementation

**Context:**  
HubSpot bietet `PUT /files/v3/files/{fileId}` für File Replacement.

**Decision:**  
Dedizierte `hubspotFileReplaceRequest()` Funktion in HubSpotApiRequest.ts.

**Alternatives Considered:**
1. ❌ Reuse `hubspotFileUploadRequest()` mit conditional logic
   - **Rejected:** Unterschiedliche HTTP-Methode (PUT vs POST)
   - **Rejected:** Unterschiedliche URL-Struktur (mit fileId im Path)

2. ❌ Zwei separate API-Calls (Upload + Update)
   - **Rejected:** Ineffizient, File ID ändert sich
   - **Rejected:** Nicht der intended API-Workflow

3. ✅ Dedizierte Replace-Funktion
   - **Chosen:** Korrekte HTTP-Methode (PUT)
   - **Chosen:** Korrekte URL mit fileId
   - **Chosen:** Optional: access + expiresAt in options

**Consequences:**
- ✅ Korrekte API-Nutzung
- ✅ File ID bleibt erhalten
- ✅ URL bleibt erhalten
- ⚠️ Zusätzliche Funktion (akzeptabel, da unterschiedlicher Endpoint)
```

### Entscheidungs-Template

```markdown
### Decision: [Titel]

**Context:** [Warum ist diese Entscheidung nötig?]

**Decision:** [Was wurde entschieden?]

**Alternatives Considered:**
1. ❌ [Alternative 1]
   - **Rejected:** [Grund]
2. ✅ [Gewählte Option]
   - **Chosen:** [Grund]

**Consequences:**
- ✅ [Vorteil 1]
- ✅ [Vorteil 2]
- ⚠️ [Trade-off]
- ❌ [Nachteil, falls vorhanden]
```

### Checkliste: Architektur-Entscheidungen dokumentiert

- [ ] Alle wichtigen Entscheidungen dokumentiert
- [ ] Alternativen erwogen und begründet abgelehnt
- [ ] Consequences (Vor-/Nachteile) aufgelistet
- [ ] Context-Anforderungen geklärt
- [ ] Trade-offs akzeptiert und dokumentiert

---

## Phase 5: Implementation & Testing

### Implementation Checklist (pro Operation)

```markdown
## [Operation Name] - Implementation

### Pre-Implementation ✅
- [x] API-Spezifikation vollständig
- [x] Helper-Funktionen geplant
- [x] Fields spezifiziert
- [x] Architektur-Entscheidungen getroffen

### Code Implementation
- [ ] Fields in `properties[]` hinzugefügt
- [ ] `displayOptions` korrekt gesetzt
- [ ] Descriptions & Placeholders (englisch)
- [ ] Case in `execute()` implementiert
- [ ] Helper-Funktionen verwendet (falls geplant)
- [ ] Error Handling mit `continueOnFail()`
- [ ] Validation Rules implementiert

### Quality Checks
- [ ] TypeScript Build erfolgreich (`npm run build`)
- [ ] Keine Lint-Errors
- [ ] Keine Code-Duplikation
- [ ] Konsistent mit NODE_DEVELOPMENT_GUIDE.md
- [ ] Konsistent mit bestehenden Nodes

### Testing
- [ ] Manual Test mit echtem HubSpot Account
- [ ] Happy Path funktioniert
- [ ] Error Cases getestet
- [ ] Edge Cases geprüft
```

### Testing-Strategie

**Manual Testing Checklist:**

```markdown
## [Operation] - Test Cases

### Happy Path
- [ ] Operation mit minimalen Required Fields
- [ ] Operation mit allen Optional Fields
- [ ] Response enthält erwartete Daten
- [ ] Binary Data korrekt weitergegeben (falls relevant)

### Error Cases
- [ ] Invalid ID → Error Message korrekt
- [ ] Missing Required Field → Error Message korrekt
- [ ] No Binary Data (für Upload/Replace) → Error Message korrekt
- [ ] Rate Limit → Retry funktioniert (RateLimiter)

### Edge Cases
- [ ] Empty Optional Fields → Werden ignoriert
- [ ] Custom Filename → Überschreibt Original
- [ ] Large File (>100MB) → Funktioniert
- [ ] Special Characters in Filename → Funktioniert

### Integration
- [ ] Workflow: HTTP Request → HubSpot Files → HubSpot CRM
- [ ] Binary Data Flow funktioniert
- [ ] Expressions in Fields funktionieren
- [ ] continueOnFail() funktioniert
```

---

## 📋 Vollständiger Workflow: Neue Operation hinzufügen

### Schritt-für-Schritt

1. **API-Dokumentation prüfen**
   ```bash
   # Suche in documentation/hubspot/
   grep -r "endpoint-name" documentation/hubspot/
   ```
   - ✅ Gefunden → Weiter zu Schritt 2
   - ❌ Nicht gefunden → **User fragen** → Dokumentation ergänzen

2. **API-Spezifikation erstellen**
   - Template ausfüllen (siehe Phase 1)
   - In `/documentation/hubspot/api/` speichern
   - Alle Parameter dokumentieren

3. **Code-Reuse analysieren**
   - Bestehende Operationen auf Duplikate prüfen
   - Helper-Funktionen planen (siehe Phase 2)
   - Signaturen spezifizieren

4. **Fields spezifizieren**
   - Jedes Field vollständig definieren (siehe Phase 3)
   - Validation Rules festlegen
   - displayOptions planen

5. **Architektur-Entscheidungen treffen**
   - Wichtige Entscheidungen dokumentieren (siehe Phase 4)
   - Alternativen erwägen
   - Consequences bewerten

6. **Implementieren**
   - Fields zu `properties[]` hinzufügen
   - Case in `execute()` implementieren
   - Helper-Funktionen verwenden
   - Error Handling einbauen

7. **Build & Quality Check**
   ```bash
   npm run build
   ```
   - TypeScript Errors beheben
   - Lint-Errors beheben
   - Code-Duplikation eliminieren

8. **Testen**
   - Manual Testing durchführen
   - Happy Path + Error Cases
   - Edge Cases prüfen

---

## 🚨 Häufige Fehlerquellen & Vermeidung

### Fehler 1: API-Annahmen ohne Dokumentation

**Problem:** Implementation basierend auf Vermutungen statt Fakten  
**Symptom:** Falscher Endpoint, falsche Parameter, falsches Response-Format  
**Lösung:** ⚠️ **IMMER User fragen wenn Dokumentation fehlt**

### Fehler 2: Helper-Funktionen nachträglich

**Problem:** Code-Duplikation wird erst nach Implementation erkannt  
**Symptom:** Refactoring nötig, mehrere Edit-Runden  
**Lösung:** ✅ Code-Reuse-Analyse VOR Implementation (Phase 2)

### Fehler 3: Unvollständige Field-Spezifikation

**Problem:** Fields ohne description, placeholder, oder falsche displayOptions  
**Symptom:** Nachträgliche Edits, inkonsistente UX  
**Lösung:** ✅ Vollständige Field-Spezifikation VOR Implementation (Phase 3)

### Fehler 4: TypeScript Context-Probleme

**Problem:** Private Methoden mit `this: IExecuteFunctions` funktionieren nicht  
**Symptom:** `Property does not exist on type 'IExecuteFunctions'`  
**Lösung:** ✅ Architektur-Entscheidung VOR Implementation (Phase 4)  
**Best Practice:** Lokale Arrow-Funktionen in execute() für Helpers

### Fehler 5: Fehlende Validation

**Problem:** Update Operations mit leeren Bodies  
**Symptom:** No-Op API Calls, verwirrende UX  
**Lösung:** ✅ Validation Rules in Field-Spezifikation definieren (Phase 3)

---

## ✅ Quality Gates

**Vor jedem Merge/Commit:**

- [ ] **API-Dokumentation vollständig** (Phase 1)
- [ ] **Code-Reuse analysiert** (Phase 2)
- [ ] **Fields vollständig spezifiziert** (Phase 3)
- [ ] **Architektur-Entscheidungen dokumentiert** (Phase 4)
- [ ] **TypeScript Build erfolgreich** (`npm run build`)
- [ ] **Keine Code-Duplikation**
- [ ] **Guidelines-konform** (NODE_DEVELOPMENT_GUIDE.md)
- [ ] **Manual Testing durchgeführt**

---

## 📚 Referenzen

- **Node Development Guide:** `/documentation/NODE_DEVELOPMENT_GUIDE.md`
- **HubSpot API Docs:** `/documentation/hubspot/api/`
- **Existing Nodes:** `/src/nodes/` (als Referenz)
- **Transport Layer:** `/src/transport/HubSpotApiRequest.ts`
- **Type Definitions:** `/src/types.ts`

---

## 🔄 Continuous Improvement

Dieser Guide ist **living documentation**. Nach jeder Implementation:

1. **Lessons Learned** dokumentieren
2. **Neue Patterns** zum Guide hinzufügen
3. **Fehlerquellen** ergänzen
4. **Templates** verbessern

**Ziel:** Jede Implementation wird besser als die vorherige.
