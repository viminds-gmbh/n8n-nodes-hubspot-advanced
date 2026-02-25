# Node Development Guide – HubSpot n8n Community Nodes

Referenz-Dokumentation für die Erstellung neuer Knoten im `n8n-nodes-hubspot-advanced`-Paket.

---

## Inhaltsverzeichnis

1. [Projektstruktur](#projektstruktur)
2. [Knoten-Grundgerüst](#knoten-grundgerüst)
3. [Credential-Konfiguration](#credential-konfiguration)
4. [Object-Type-Auswahl (Standard + Custom)](#object-type-auswahl)
5. [Property Cache – Cache-Keys & Isolation](#property-cache)
6. [loadOptions – Dynamische Optionenauswahlen](#loadoptions)
7. [Transport-Schicht (API-Funktionen)](#transport-schicht)
8. [Rate Limiter](#rate-limiter)
9. [Gemeinsame Typen & Konstanten](#typen--konstanten)
10. [Registrierung in package.json](#registrierung)
11. [Checkliste für neue Knoten](#checkliste)

---

## Projektstruktur

```
src/
├── nodes/
│   ├── HubSpotCrm/           # CRUD + Search für CRM-Objekte
│   ├── HubSpotAssociations/   # Assoziationen lesen/schreiben
│   ├── HubSpotForms/          # Formulare + Submissions
│   ├── HubSpotLists/          # Listen-Mitglieder abrufen
│   └── HubSpotObjectSchema/   # Schema/Properties-Introspection
├── transport/
│   ├── HubSpotApiRequest.ts   # API-Hilfsfunktionen (execute + loadOptions)
│   ├── PropertyCache.ts       # Singleton-Cache für Property-Dropdowns
│   └── RateLimiter.ts         # Adaptives Rate Limiting (Singleton)
├── types.ts                   # Shared Interfaces, Konstanten, Options-Arrays
└── icon.svg                   # Gemeinsames Icon
```

Jeder Knoten liegt in einem eigenen Ordner unter `src/nodes/<NodeName>/` und enthält mindestens eine Datei `<NodeName>.node.ts`.

---

## Knoten-Grundgerüst

Jeder Knoten implementiert `INodeType` mit den Pflichtfeldern `description` und `execute`.

```typescript
import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  ILoadOptionsFunctions,     // nur wenn loadOptions gebraucht werden
  INodePropertyOptions,      // nur wenn loadOptions gebraucht werden
} from 'n8n-workflow';

import { hubspotApiRequest } from '../../transport/HubSpotApiRequest';

export class HubSpotMyNode implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'HubSpot My Node',
    name: 'hubSpotMyNode',             // camelCase, muss einzigartig sein
    icon: 'file:../../icon.svg',       // gemeinsames Icon
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: 'Beschreibung des Knotens',
    defaults: {
      name: 'HubSpot My Node',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'hubspotAppToken',
        required: true,
      },
    ],
    properties: [
      // → siehe Abschnitte unten
    ],
  };

  // Optional: methods.loadOptions
  methods = {
    loadOptions: { /* ... */ },
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    const operation = this.getNodeParameter('operation', 0) as string;

    for (let i = 0; i < items.length; i++) {
      try {
        // ... Operationslogik ...
      } catch (error: any) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}
```

### Wichtige Konventionen

| Feld | Konvention | Beispiel |
|---|---|---|
| `name` | camelCase, Präfix `hubSpot` | `hubSpotMyNode` |
| `displayName` | Title Case mit Leerzeichen | `HubSpot My Node` |
| `icon` | Relativer Pfad zum gemeinsamen SVG | `file:../../icon.svg` |
| `credentials.name` | Immer `hubspotAppToken` | – |
| `subtitle` | Expression mit Operation/Resource | `={{$parameter["operation"]}}` |

---

## Credential-Konfiguration

Alle Knoten verwenden die gleiche Credential-Definition:

```typescript
credentials: [
  {
    name: 'hubspotAppToken',
    required: true,
  },
],
```

Zum Abrufen der Credentials in `execute()`:
```typescript
const credentials = await this.getCredentials('hubspotAppToken');
// credentials.appToken → Bearer-Token
```

Zum Abrufen in `loadOptions` (für Cache-Isolation):
```typescript
const credentials = await this.getCredentials('hubspotAppToken');
const credentialId = (credentials.appToken as string).slice(-8);
```

---

## Object-Type-Auswahl

Wenn der Knoten einen HubSpot-Objekttyp benötigt, wird ein Dropdown mit Fallback auf Custom-Eingabe verwendet.

### Standard-Pattern (Dropdown + Custom-Textfeld)

```typescript
import { HUBSPOT_OBJECT_TYPE_OPTIONS } from '../../types';

// Im properties-Array:
{
  displayName: 'Object Type',
  name: 'objectType',
  type: 'options',
  options: [...HUBSPOT_OBJECT_TYPE_OPTIONS],
  default: 'contacts',
  required: true,
},
{
  displayName: 'Custom Object Type',
  name: 'customObjectType',
  type: 'string',
  default: '',
  required: true,
  placeholder: 'e.g. cars or 2-12345',
  description: 'The name or ID of the custom object type',
  displayOptions: {
    show: {
      objectType: ['custom'],
    },
  },
},
```

### Auflösung im Code

```typescript
// In execute():
const objectTypeRaw = this.getNodeParameter('objectType', 0) as string;
const objectType = objectTypeRaw === 'custom'
  ? (this.getNodeParameter('customObjectType', 0) as string)
  : objectTypeRaw;

// In loadOptions (Zugriff über getCurrentNodeParameter):
const objectTypeRaw = this.getCurrentNodeParameter('objectType') as string;
const objectType = objectTypeRaw === 'custom'
  ? this.getCurrentNodeParameter('customObjectType') as string
  : objectTypeRaw;
```

### Mehrere Object-Type-Felder (z.B. Associations)

Bei Knoten mit From/To-Beziehungen werden separate Felder verwendet:
- `fromObjectType` / `customFromObjectType`
- `toObjectType` / `customToObjectType`

Jedes Paar folgt dem gleichen Pattern wie oben.

---

## Property Cache

### Zweck

Der `PropertyCache` verhindert wiederholte API-Aufrufe beim Laden von Property-Dropdowns. Er ist ein **globaler Singleton** (via `globalThis`), der von allen Knoten im selben n8n-Worker-Prozess geteilt wird.

### Cache-Key-Format

```
{credentialId}::{objectType}
```

| Bestandteil | Quelle | Beispiel |
|---|---|---|
| `credentialId` | Letzte 8 Zeichen des `appToken` | `a1b2c3d4` |
| `objectType` | Aufgelöster Objekttyp (nach Custom-Logik) | `contacts`, `companies`, `2-12345` |

**Vollständiger Key:** `a1b2c3d4::contacts`

### TTL

- **5 Minuten** (`5 * 60 * 1000 ms`)
- Abgelaufene Einträge werden beim nächsten `get()` automatisch gelöscht

### API

```typescript
import { PropertyCache } from '../../transport/PropertyCache';

const cache = PropertyCache.getInstance();

// Lesen
const cached = cache.get(objectType, credentialId);  // INodePropertyOptions[] | null

// Schreiben
cache.set(objectType, options, credentialId);

// Prüfen
cache.has(objectType, credentialId);  // boolean
```

### Warum Credential-Isolation?

Verschiedene HubSpot-Accounts (Portale) haben unterschiedliche Properties. Ohne `credentialId` im Key würden Properties aus Portal A für Portal B angezeigt werden.

---

## loadOptions – Dynamische Optionenauswahlen

### Grundstruktur

```typescript
methods = {
  loadOptions: {
    async myLoadFunction(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
      // API-Aufruf + Mapping auf { name, value } Arrays
    },
  },
};
```

Referenzierung in Properties:
```typescript
{
  displayName: 'My Field',
  name: 'myField',
  type: 'options',         // oder 'multiOptions'
  typeOptions: {
    loadOptionsMethod: 'myLoadFunction',
  },
  default: '',
}
```

### Bestehende loadOptions-Implementierungen

| Knoten | Methode | API-Endpoint | Cache | Besonderheiten |
|---|---|---|---|---|
| **HubSpotCrm** | `getProperties` | `/crm/v3/properties/{objectType}` | ✅ PropertyCache | Liest `objectType`/`customObjectType` |
| **HubSpotAssociations** | `getProperties` | `/crm/v3/properties/{toObjectType}` | ✅ PropertyCache | Liest `toObjectType`/`customToObjectType` |
| **HubSpotLists** | `loadLists` | `/crm/v3/lists/search` (POST, paginiert) | ❌ | Zeigt `name (ObjectType)` an, paginiert mit `offset` |
| **HubSpotLists** | `getProperties` | `/crm/v3/properties/{objectType}` | ✅ PropertyCache | Ermittelt `objectType` aus List-Details via `objectTypeId` |
| **HubSpotForms** | `getForms` | `/marketing/v3/forms` | ❌ | Einfaches Mapping `name → id` |
| **HubSpotForms** | `getSubscriptionTypes` | `/communication-preferences/v3/definitions` | ❌ | Subscription-Definitionen |

### Abhängigkeiten zwischen loadOptions

Mit `loadOptionsDependsOn` kann ein Dropdown von einem anderen abhängig gemacht werden:

```typescript
{
  displayName: 'Properties',
  name: 'properties',
  type: 'multiOptions',
  typeOptions: {
    loadOptionsMethod: 'getProperties',
    loadOptionsDependsOn: ['listId'],    // Wird neu geladen wenn listId sich ändert
  },
  default: [],
}
```

### Vollständiges getProperties-Pattern (mit Cache)

```typescript
async getProperties(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
  const { PropertyCache } = await import('../../transport/PropertyCache');

  // 1. Object-Type auflösen
  const objectTypeRaw = this.getCurrentNodeParameter('objectType') as string;
  const objectType = objectTypeRaw === 'custom'
    ? this.getCurrentNodeParameter('customObjectType') as string
    : objectTypeRaw;

  // 2. Credential-ID für Cache-Isolation
  const credentials = await this.getCredentials('hubspotAppToken');
  const credentialId = (credentials.appToken as string).slice(-8);

  // 3. Cache prüfen
  const cache = PropertyCache.getInstance();
  const cached = cache.get(objectType, credentialId);
  if (cached) {
    return cached;
  }

  // 4. API-Aufruf (IMMER hubspotApiRequestForLoadOptions verwenden!)
  const response = await hubspotApiRequestForLoadOptions.call(
    this,
    'GET',
    `/crm/v3/properties/${objectType}`,
  );

  // 5. Mapping auf INodePropertyOptions
  const options: INodePropertyOptions[] = [];
  if (response.results) {
    for (const property of response.results) {
      options.push({
        name: property.label || property.name,
        value: property.name,
      });
    }
  }

  // 6. Cache befüllen
  cache.set(objectType, options, credentialId);
  return options;
},
```

> **Wichtig:** In `loadOptions` muss `hubspotApiRequestForLoadOptions` verwendet werden (akzeptiert `ILoadOptionsFunctions`). In `execute()` wird `hubspotApiRequest` verwendet (akzeptiert `IExecuteFunctions`).

---

## Transport-Schicht

### Verfügbare Funktionen

| Funktion | Kontext | Beschreibung |
|---|---|---|
| `hubspotApiRequest` | `execute()` | Einzelner API-Aufruf mit Rate Limiting |
| `hubspotApiRequestAllItems` | `execute()` | Paginierter API-Aufruf (auto-pagination) |
| `hubspotBatchRequest` | `execute()` | Batch-Read für CRM-Objekte (max. 100 pro Batch) |
| `hubspotApiRequestForLoadOptions` | `loadOptions` | API-Aufruf ohne Rate Limiter (für Dropdowns) |

### Signatur: hubspotApiRequest

```typescript
await hubspotApiRequest.call(
  this,              // IExecuteFunctions
  'GET',             // HTTP-Methode
  '/crm/v3/...',     // Endpoint (relativ zu https://api.hubapi.com)
  {},                // Body (für POST/PATCH/PUT)
  {},                // Query-String-Parameter
);
```

### Signatur: hubspotApiRequestAllItems

```typescript
const results = await hubspotApiRequestAllItems.call(
  this,
  'POST',
  `/crm/v3/objects/${objectType}/search`,
  body,              // Request-Body mit filters, properties, etc.
  limit,             // Optional: maximale Anzahl Ergebnisse
);
```

Paginiert automatisch über `paging.next.after`. Gibt ein Array aller Ergebnisse zurück.

### Signatur: hubspotBatchRequest

```typescript
const results = await hubspotBatchRequest.call(
  this,
  objectType,        // z.B. 'contacts'
  ids,               // string[] der Object-IDs
  propertiesArray,   // string[] der gewünschten Properties
);
```

Splittet automatisch in 100er-Batches und ruft `/crm/v3/objects/{objectType}/batch/read` auf.

### Signatur: hubspotApiRequestForLoadOptions

```typescript
const response = await hubspotApiRequestForLoadOptions.call(
  this,              // ILoadOptionsFunctions
  'GET',
  '/crm/v3/properties/contacts',
);
```

Kein Rate Limiting, kein Response-Wrapping – gibt die API-Antwort direkt zurück.

---

## Rate Limiter

Der `HubSpotRateLimiter` ist ein globaler Singleton und wird automatisch von `hubspotApiRequest` verwendet.

### Verhalten

- **Adaptiv:** Passt `minDelayMs` basierend auf `X-HubSpot-RateLimit-*`-Headern an
- **429-Handling:** Exponentieller Backoff mit Jitter, bis zu 5 Retries
- **Retry-After:** Respektiert den `Retry-After`-Header, falls vorhanden
- **Global Pause:** Ein 429 pausiert ALLE gleichzeitigen Requests

### Für neue Knoten relevant

Neue Knoten müssen den Rate Limiter **nicht direkt** ansprechen – er wird durch `hubspotApiRequest` automatisch aktiviert. `hubspotApiRequestForLoadOptions` umgeht den Rate Limiter bewusst.

---

## Typen & Konstanten

Aus `src/types.ts`:

| Export | Typ | Verwendung |
|---|---|---|
| `HUBSPOT_OBJECT_TYPE_OPTIONS` | `const Array` | Dropdown-Optionen für Object-Type-Felder |
| `HUBSPOT_OBJECT_TYPES` | `const Array` | Alle bekannten Object-Type-Slugs |
| `HUBSPOT_OBJECT_TYPE_ID_MAPPING` | `Record<string, string>` | Mapping von `objectTypeId` (z.B. `0-1`) auf Slug (z.B. `contacts`) |
| `HubSpotApiResponse<T>` | Interface | Response-Typ mit `results`, `paging`, `status` |
| `HubSpotObject` | Interface | CRM-Objekt mit `id`, `properties`, `associations` |
| `HubSpotSearchFilter` | Interface | Filter für Search-API |
| `HubSpotSearchSort` | Interface | Sortierung für Search-API |
| `RATE_LIMITS` | `Record` | Rate-Limit-Konfigurationen pro Tier |

---

## Registrierung

Jeder neue Knoten muss in `package.json` unter `n8n.nodes` registriert werden:

```json
{
  "n8n": {
    "nodes": [
      "dist/nodes/HubSpotCrm/HubSpotCrm.node.js",
      "dist/nodes/HubSpotMyNode/HubSpotMyNode.node.js"
    ]
  }
}
```

**Pfad-Format:** `dist/nodes/<FolderName>/<ClassName>.node.js`

---

## Checkliste für neue Knoten

- [ ] Ordner `src/nodes/<NodeName>/` erstellt
- [ ] Datei `<NodeName>.node.ts` mit `INodeType`-Implementierung
- [ ] `name` ist camelCase mit `hubSpot`-Präfix und **einzigartig**
- [ ] `icon: 'file:../../icon.svg'` gesetzt
- [ ] `credentials` verweist auf `hubspotAppToken`
- [ ] `properties`-Array enthält mindestens `operation`-Feld
- [ ] Object-Type-Felder nutzen `HUBSPOT_OBJECT_TYPE_OPTIONS` + Custom-Fallback
- [ ] Custom-Object-Type-Feld hat `displayOptions.show` auf `objectType: ['custom']`
- [ ] `loadOptions` verwenden `hubspotApiRequestForLoadOptions` (nicht `hubspotApiRequest`)
- [ ] Property-Dropdowns nutzen `PropertyCache` mit `credentialId`-Isolation
- [ ] `execute()` nutzt `hubspotApiRequest` (mit automatischem Rate Limiting)
- [ ] Error-Handling mit `continueOnFail()`-Pattern
- [ ] Knoten in `package.json` → `n8n.nodes` registriert
- [ ] Lokaler Test gemäß `/local-testing`-Workflow
