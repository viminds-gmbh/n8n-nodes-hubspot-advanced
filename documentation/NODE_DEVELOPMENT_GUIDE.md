# Node Development Guide – HubSpot n8n Community Nodes

Referenz-Dokumentation für die Erstellung neuer Knoten im `n8n-nodes-hubspot-advanced`-Paket.

---

## Inhaltsverzeichnis

1. [Projektstruktur](#projektstruktur)
2. [Knoten-Grundgerüst](#knoten-grundgerüst)
3. [Node-Kategorisierung & Gruppierung](#node-kategorisierung--gruppierung)
4. [Credential-Konfiguration](#credential-konfiguration)
5. [Object-Type-Auswahl (Standard + Custom)](#object-type-auswahl)
6. [Property Cache – Cache-Keys & Isolation](#property-cache)
7. [loadOptions – Dynamische Optionenauswahlen](#loadoptions)
8. [Transport-Schicht (API-Funktionen)](#transport-schicht)
9. [Rate Limiter](#rate-limiter)
10. [Gemeinsame Typen & Konstanten](#typen--konstanten)
11. [Registrierung in package.json](#registrierung)
12. [Checkliste für neue Knoten](#checkliste)

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
| `subtitle` | Expression mit Aktion + Objekt | Siehe [Subtitle-Richtlinien](#subtitle-richtlinien) |

---

## Subtitle-Richtlinien

Der Subtitle wird im Canvas unter dem Knoten-Namen angezeigt und soll auf einen Blick erkennbar machen, **was der Knoten tut**.

### Grundprinzip

**Format:** `Aktion: Objekt`

- **Aktion:** Die Operation, die ausgeführt wird (z.B. `create`, `update`, `search`, `get`)
- **Objekt:** Das betroffene Objekt oder die Ressource (z.B. `contacts`, `companies`, Custom Object)

### Pattern nach Knoten-Typ

#### 1. Einfache Operation ohne Objekttyp

Wenn der Knoten nur eine oder wenige fixe Operationen hat:

```typescript
subtitle: 'Get List Members',
```

**Beispiel:** `HubSpotLists` (nur eine Operation)

#### 2. Multiple Operationen ohne Objekttyp

Wenn verschiedene Operationen auf unterschiedlichen Ressourcen arbeiten:

```typescript
subtitle: '={{$parameter["operation"] === "submitForm" ? "Submit Form" : $parameter["operation"] === "getForms" ? "Get Forms" : "Get Submissions"}}',
```

**Beispiel:** `HubSpotForms` (submitForm, getForms, getSubmissions)

#### 3. Operation + Objekttyp (Standard-Pattern)

Wenn der Knoten mit verschiedenen CRM-Objekttypen arbeitet:

```typescript
subtitle: '={{$parameter["operation"] + ": " + ($parameter["objectType"] === "custom" ? $parameter["customObjectType"] : $parameter["objectType"])}}',
```

**Ausgabe:** `create: contacts`, `update: companies`, `search: cars`

**Beispiel:** `HubSpotCrm`

#### 4. Operation + Beziehung (From → To)

Für Assoziations-Knoten mit Quell- und Zielobjekt:

```typescript
subtitle: '={{$parameter["operation"] + ": " + ($parameter["fromObjectType"] === "custom" ? $parameter["customFromObjectType"] : $parameter["fromObjectType"]) + " → " + ($parameter["toObjectType"] === "custom" ? $parameter["customToObjectType"] : $parameter["toObjectType"])}}',
```

**Ausgabe:** `create: contacts → companies`, `get: deals → line_items`

**Beispiel:** `HubSpotAssociations`

#### 5. Konditionale Anzeige nach Operation

Wenn verschiedene Operationen unterschiedliche Kontexte haben:

```typescript
subtitle: '={{$parameter["operation"] === "getObjectTypes" ? "Get Object Types" : "Get Properties: " + ($parameter["objectType"] === "custom" ? $parameter["customObjectType"] : $parameter["objectType"])}}',
```

**Ausgabe:** `Get Object Types` oder `Get Properties: contacts`

**Beispiel:** `HubSpotObjectSchema`

### Wichtige Regeln

1. **Immer Aktion + Objekt zeigen** (außer bei Single-Operation-Knoten)
2. **Custom Object Types auflösen:** Zeige den tatsächlichen Custom-Namen, nicht "custom"
3. **Title Case für fixe Strings:** `"Get List Members"`, nicht `"get list members"`
4. **Operation-Parameter verwenden:** Nutze `$parameter["operation"]` für dynamische Aktionen
5. **Kurz und prägnant:** Maximal 2-3 Komponenten (Aktion, Objekt, ggf. Ziel)
6. **Konsistente Trennzeichen:**
   - `: ` für Aktion-Objekt-Trennung
   - ` → ` für Beziehungen (From → To)

### Checkliste für neue Knoten

- [ ] Subtitle zeigt die **Aktion** (Operation)
- [ ] Subtitle zeigt das **Objekt** (Ressource/Objekttyp)
- [ ] Custom Object Types werden **aufgelöst** (nicht "custom" anzeigen)
- [ ] Format ist **konsistent** mit bestehenden Knoten
- [ ] Subtitle ist **lesbar** im Canvas (nicht zu lang)

---

## Node-Kategorisierung & Gruppierung

### Zweck

Die `codex`-Eigenschaft ermöglicht es, Nodes in der n8n-Palette zu kategorisieren und über Aliase auffindbar zu machen. Dies verbessert die User Experience, indem verwandte Nodes gruppiert werden und alternative Suchbegriffe unterstützt werden.

### Wichtige Erkenntnisse (Stand 2026)

**❌ Nicht unterstützt:**
- Benutzerdefinierte Gruppen-Container mit eigenem Logo
- Hierarchische Node-Gruppierungen außerhalb der vordefinierten Kategorien
- Separate "Package-Gruppen" in der Node-Palette

**✅ Unterstützt (offiziell und zukunftssicher):**
- Zuordnung zu bestehenden Kategorien und Subcategories
- Aliase für alternative Suchbegriffe
- Dokumentations-Links
- Individuelle Node-Icons (jeder Node behält sein eigenes Logo)

### Codex-Struktur

Die `codex`-Eigenschaft wird in der `INodeTypeDescription` nach `defaults` eingefügt:

```typescript
description: INodeTypeDescription = {
  displayName: 'HubSpot CRM',
  name: 'hubSpotCrm',
  icon: 'file:../../icon.svg',
  group: ['transform'],  // Legacy, beibehalten für Kompatibilität
  version: 1,
  subtitle: '={{$parameter["operation"]}}',
  description: 'Interact with HubSpot CRM API',
  defaults: {
    name: 'HubSpot CRM',
  },
  codex: {
    categories: ['Marketing & Content'],
    subcategories: {
      'Marketing & Content': ['CRM'],
    },
    alias: [
      'HubSpot Advanced',
      'viminds',
      'viminds HubSpot',
      'HubSpot viminds',
      'Advanced HubSpot',
      'HubSpot Pro',
      'HubSpot Extended',
      'HubSpot Batch',
      'HubSpot Rate Limit',
      'HubSpot Association',
      'HubSpot Hydrate',
      'HubSpot Custom Objects',
      'HubSpot Search',
      'HubSpot Filter',
    ],
    resources: {
      primaryDocumentation: [
        {
          url: 'https://viminds.de',
        },
      ],
    },
  },
  inputs: ['main'],
  outputs: ['main'],
  // ...
};
```

### Verfügbare Kategorien

n8n bietet folgende vordefinierte Kategorien (Stand 2026):

| Kategorie | Subcategories (Beispiele) | Verwendung |
|---|---|---|
| `Marketing & Content` | CRM, Email, Social Media | **Empfohlen für HubSpot** |
| `Sales` | CRM, Leads, Deals | Alternative für Sales-fokussierte Nodes |
| `Communication` | Chat, Email, SMS | Messaging & Kommunikation |
| `Data & Storage` | Database, File Storage | Datenbanken, Speicher |
| `Development` | Code, Version Control | Developer Tools |
| `Productivity` | Calendar, Tasks, Notes | Produktivitäts-Tools |

**Für dieses Projekt:** Alle HubSpot-Nodes verwenden `Marketing & Content` → `CRM`.

### Alias-Strategie

Aliase ermöglichen es Benutzern, Nodes über alternative Suchbegriffe zu finden. Eine gute Alias-Liste sollte enthalten:

#### 1. Marken-Aliase
- Package-Name: `HubSpot Advanced`
- Firmenname: `viminds`
- Kombinationen: `viminds HubSpot`, `HubSpot viminds`

#### 2. Feature-Aliase
- Qualitätsindikatoren: `Advanced HubSpot`, `HubSpot Pro`, `HubSpot Extended`
- Kern-Features: `HubSpot Batch`, `HubSpot Rate Limit`
- Spezial-Features: `HubSpot Association`, `HubSpot Hydrate`
- Capabilities: `HubSpot Custom Objects`, `HubSpot Search`, `HubSpot Filter`

#### 3. Use-Case-Aliase
- Häufige Anwendungsfälle oder Suchbegriffe, die Benutzer verwenden könnten

### Best Practices

#### Konsistenz über alle Nodes
Alle Nodes im gleichen Package sollten:
- ✅ Die **gleiche Kategorie** verwenden (`Marketing & Content`)
- ✅ Die **gleiche Subcategory** verwenden (`CRM`)
- ✅ Die **gleichen Aliase** verwenden (für Package-weite Auffindbarkeit)
- ✅ Den **gleichen Dokumentations-Link** verwenden

#### Alias-Anzahl
- **Minimum:** 5-7 Aliase (Marke + wichtigste Features)
- **Empfohlen:** 10-15 Aliase (gute Balance zwischen Auffindbarkeit und Wartbarkeit)
- **Maximum:** Keine technische Grenze, aber >20 wird unübersichtlich

#### Sprachrichtlinie
- Aliase sollten **englisch** sein (internationale Verfügbarkeit)
- Firmennamen bleiben wie original (`viminds`, nicht `viminds GmbH`)

### Wirkung in n8n

Nach Implementierung der `codex`-Eigenschaft:

**In der Node-Palette:**
- Nodes erscheinen unter **Marketing & Content** → **CRM**
- Gruppiert mit anderen CRM-Tools (z.B. Salesforce, Pipedrive)

**In der Suche:**
- Suche nach "HubSpot Advanced" → zeigt alle Package-Nodes
- Suche nach "viminds" → zeigt alle Package-Nodes
- Suche nach Feature-Namen → zeigt alle Package-Nodes
- Suche nach spezifischem Node-Namen → zeigt den jeweiligen Node

**Branding:**
- Jeder Node zeigt sein eigenes Icon (viminds-Logo)
- Konsistente Darstellung in der Palette

### Legacy-Eigenschaft: `group`

Die `group`-Eigenschaft ist veraltet, sollte aber **beibehalten** werden für Abwärtskompatibilität:

```typescript
group: ['transform'],  // Legacy, nicht entfernen
```

Sie hat keine Auswirkung mehr auf die Kategorisierung, wenn `codex` definiert ist.

### Vollständiges Beispiel

```typescript
export class HubSpotMyNode implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'HubSpot My Node',
    name: 'hubSpotMyNode',
    icon: 'file:../../icon.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"]}}',
    description: 'Description of the node',
    defaults: {
      name: 'HubSpot My Node',
    },
    codex: {
      categories: ['Marketing & Content'],
      subcategories: {
        'Marketing & Content': ['CRM'],
      },
      alias: [
        'HubSpot Advanced',
        'viminds',
        'viminds HubSpot',
        'HubSpot viminds',
        'Advanced HubSpot',
        'HubSpot Pro',
        'HubSpot Extended',
        'HubSpot Batch',
        'HubSpot Rate Limit',
        'HubSpot Association',
        'HubSpot Hydrate',
        'HubSpot Custom Objects',
        'HubSpot Search',
        'HubSpot Filter',
      ],
      resources: {
        primaryDocumentation: [
          {
            url: 'https://viminds.de',
          },
        ],
      },
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
      // ...
    ],
  };
}
```

### Checkliste für codex-Eigenschaft

- [ ] `codex`-Eigenschaft nach `defaults` eingefügt
- [ ] `categories: ['Marketing & Content']` gesetzt
- [ ] `subcategories: { 'Marketing & Content': ['CRM'] }` gesetzt
- [ ] Mindestens 10 Aliase definiert (Marke + Features)
- [ ] `resources.primaryDocumentation` mit viminds.de-Link
- [ ] `group: ['transform']` beibehalten (Legacy-Kompatibilität)
- [ ] Konsistent mit anderen Nodes im Package

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

### Best Practices für Property-Dropdowns

#### Wann Properties als Dropdown bereitstellen?

Properties sollen **immer** als Optionsauswahl aufbereitet werden, wenn sie in einem Request relevant sind. Dies gilt für:
- Felder, die in API-Requests verwendet werden (z.B. `properties` in Search/Read)
- Filter-Konfigurationen
- Sortier-Felder
- Update/Create-Operationen

#### Abhängigkeiten

Property-Dropdowns hängen von zwei Faktoren ab:

1. **Credentials** (`credentialId`)
   - Verschiedene HubSpot-Portale haben unterschiedliche Properties
   - Cache-Isolation über `credentialId` ist **zwingend erforderlich**

2. **Objekttyp** (`objectType`)
   - Jeder Objekttyp (Contacts, Companies, Custom Objects) hat eigene Properties
   - Der aufgelöste Objekttyp (inkl. Custom-Logik) muss für den Cache-Key verwendet werden

#### Einzelauswahl vs. Mehrfachauswahl

| Kontext | Typ | Beispiel |
|---|---|---|
| **Einzelnes Property** (z.B. Sortierung, einzelner Filter) | `type: 'options'` | Sort-By-Feld |
| **Multiple Properties** (z.B. Felder für Response, mehrere Filter) | `type: 'multiOptions'` | Properties-Auswahl bei Search/Read |

```typescript
// Einzelauswahl
{
  displayName: 'Sort By',
  name: 'sortBy',
  type: 'options',
  typeOptions: {
    loadOptionsMethod: 'getProperties',
  },
  default: '',
}

// Mehrfachauswahl
{
  displayName: 'Properties',
  name: 'properties',
  type: 'multiOptions',
  typeOptions: {
    loadOptionsMethod: 'getProperties',
  },
  default: [],
}
```

#### Dynamische Abhängigkeiten

Wenn Properties von einem anderen Feld abhängen (z.B. Objekttyp, Listen-ID), verwende `loadOptionsDependsOn`:

```typescript
{
  displayName: 'Properties',
  name: 'properties',
  type: 'multiOptions',
  typeOptions: {
    loadOptionsMethod: 'getProperties',
    loadOptionsDependsOn: ['objectType', 'customObjectType'],  // Reload bei Änderung
  },
  default: [],
}
```

#### Vollständige Implementierung

Jede `getProperties`-Implementierung muss:

1. ✅ **Objekttyp auflösen** (inkl. Custom-Logik)
2. ✅ **Credential-ID extrahieren** (letzte 8 Zeichen des `appToken`)
3. ✅ **Cache prüfen** vor API-Aufruf
4. ✅ **Cache befüllen** nach API-Aufruf
5. ✅ **`hubspotApiRequestForLoadOptions`** verwenden (nicht `hubspotApiRequest`)

Siehe [loadOptions – Vollständiges getProperties-Pattern](#vollständiges-getproperties-pattern-mit-cache) für Code-Beispiel.

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

## Field Descriptions & Placeholders

### Zweck

Jedes Feld in einem Knoten sollte eine `description` und, wo sinnvoll, einen `placeholder` haben, um die Benutzerfreundlichkeit zu maximieren. Dies ermöglicht es Benutzern, die Funktionalität zu verstehen, ohne externe Dokumentation konsultieren zu müssen.

### Sprachrichtlinie

**Alle `description` und `placeholder` Texte müssen auf Englisch verfasst werden**, da die Nodes weltweit verfügbar sind. Die Guidelines selbst bleiben auf Deutsch, da das Projekt nur intern entwickelt wird.

### Description – Best Practices

#### Format
- **Kurz und präzise:** Maximal 1-2 Sätze
- **Aktionsorientiert:** Erklärt, was das Feld tut oder bewirkt
- **Beispiele einbinden:** Wo hilfreich, konkrete Beispiele nennen (z.B. "e.g., 'email', 'firstname'")
- **API-Links:** Bei komplexeren Konzepten Link zur HubSpot-Dokumentation einfügen

#### Beispiele

**Gut:**
```typescript
{
  displayName: 'Object ID',
  name: 'objectId',
  type: 'string',
  description: 'The unique ID of the object to retrieve, update, or delete. You can use expressions to reference IDs from previous nodes.',
}
```

**Gut mit API-Link:**
```typescript
{
  displayName: 'Properties',
  name: 'properties',
  type: 'multiOptions',
  description: 'Properties to return in the response. Leave empty to return all properties. <a href="https://developers.hubspot.com/docs/api/crm/properties" target="_blank">Learn more</a>.',
}
```

**Gut mit Beispielen:**
```typescript
{
  displayName: 'Property Name',
  name: 'propertyName',
  type: 'string',
  description: 'The internal name of the property to filter by (e.g., "email", "firstname", "createdate").',
}
```

**Schlecht (zu technisch):**
```typescript
description: 'Object identifier for CRM entity retrieval via REST API endpoint',
```

**Schlecht (zu vage):**
```typescript
description: 'The property name',
```

#### Wann keine Description nötig ist

Bei sehr offensichtlichen Feldern kann die `description` weggelassen werden:
- `Operation` (wenn die Options bereits `description` haben)
- Einfache Toggles mit klarem `displayName` (z.B. "Return All")

### Placeholder – Best Practices

#### Format
- **Konkrete Beispiele:** Zeigt das erwartete Format
- **Realistisch:** Verwendet echte, plausible Beispielwerte
- **Kurz:** Maximal 3-4 Wörter oder ein kurzer Wert
- **Keine Anweisungen:** Nicht "Enter value here", sondern ein Beispielwert

#### Beispiele

**Gut:**
```typescript
placeholder: '12345678'  // für Object ID
placeholder: 'email'  // für Property Name
placeholder: 'https://example.com/contact'  // für Page URI
placeholder: 'I agree to receive emails'  // für Consent Text
placeholder: 'firstname,lastname,email'  // für Properties (comma-separated)
```

**Schlecht:**
```typescript
placeholder: 'Enter value here'  // zu generisch
placeholder: 'The ID of the object you want to work with'  // zu lang, ist eine Description
placeholder: 'id'  // zu kurz, wenn ein längerer Wert erwartet wird
```

#### Wann Placeholder verwenden

Placeholder sollten verwendet werden bei:
- **String-Feldern:** Immer, außer bei Dropdowns (`type: 'options'`)
- **Number-Feldern:** Wenn ein typischer Wert hilfreich ist
- **Nicht verwenden bei:**
  - Boolean-Feldern (`type: 'boolean'`)
  - Dropdown-Feldern (`type: 'options'`, `type: 'multiOptions'`)
  - `fixedCollection`-Feldern (nur bei den Unterfeldern)

### HubSpot API Dokumentations-Links

Verwende diese Links in Descriptions, wo relevant:

| Thema | Link |
|---|---|
| CRM Objects (allgemein) | `https://developers.hubspot.com/docs/api/crm/understanding-the-crm` |
| Properties | `https://developers.hubspot.com/docs/api/crm/properties` |
| Search API | `https://developers.hubspot.com/docs/api/crm/search` |
| Associations | `https://developers.hubspot.com/docs/api/crm/associations` |
| Forms API | `https://developers.hubspot.com/docs/api/marketing/forms` |
| Custom Objects | `https://developers.hubspot.com/docs/api/crm/crm-custom-objects` |
| Tracking Code (HUTK) | `https://developers.hubspot.com/docs/api/tracking-code` |
| Subscriptions | `https://developers.hubspot.com/docs/api/marketing/subscriptions` |

### Vollständiges Beispiel

```typescript
{
  displayName: 'Object ID',
  name: 'objectId',
  type: 'string',
  default: '',
  required: true,
  placeholder: '12345678',
  description: 'The unique ID of the object to retrieve, update, or delete. You can use expressions to reference IDs from previous nodes.',
  displayOptions: {
    show: {
      operation: ['get', 'update', 'delete'],
    },
  },
}
```

### Checkliste für Feld-Definitionen

Jedes Feld sollte:
- [ ] Eine `description` haben (außer bei offensichtlichen Feldern)
- [ ] Einen `placeholder` haben, wo sinnvoll (String/Number-Felder)
- [ ] Englische Sprache verwenden
- [ ] Konsistent mit anderen Feldern im gleichen Node sein
- [ ] Bei Bedarf Link zur HubSpot-Dokumentation enthalten
- [ ] Konkrete Beispiele nennen, wo hilfreich

---

## Checkliste für neue Knoten

### Grundstruktur
- [ ] Ordner `src/nodes/<NodeName>/` erstellt
- [ ] Datei `<NodeName>.node.ts` mit `INodeType`-Implementierung
- [ ] `name` ist camelCase mit `hubSpot`-Präfix und **einzigartig**
- [ ] `icon: 'file:../../icon.svg'` gesetzt
- [ ] `group: ['transform']` gesetzt (Legacy-Kompatibilität)
- [ ] `credentials` verweist auf `hubspotAppToken`

### Kategorisierung & Branding
- [ ] **`codex`-Eigenschaft nach `defaults` eingefügt**
- [ ] **`categories: ['Marketing & Content']` gesetzt**
- [ ] **`subcategories: { 'Marketing & Content': ['CRM'] }` gesetzt**
- [ ] **Mindestens 10 Aliase definiert** (Marke + Features)
- [ ] **`resources.primaryDocumentation` mit viminds.de-Link**
- [ ] **Aliase konsistent mit anderen Package-Nodes**

### Subtitle & Beschreibung
- [ ] **`subtitle` zeigt Aktion + Objekt** (siehe [Subtitle-Richtlinien](#subtitle-richtlinien))
- [ ] **Custom Object Types im Subtitle aufgelöst** (nicht "custom" anzeigen)
- [ ] `description` ist aussagekräftig und englisch

### Properties & Felder
- [ ] `properties`-Array enthält mindestens `operation`-Feld
- [ ] Object-Type-Felder nutzen `HUBSPOT_OBJECT_TYPE_OPTIONS` + Custom-Fallback
- [ ] Custom-Object-Type-Feld hat `displayOptions.show` auf `objectType: ['custom']`
- [ ] Alle Felder haben `description` (außer offensichtliche)
- [ ] String/Number-Felder haben `placeholder` mit Beispielwerten

### loadOptions & Caching
- [ ] `loadOptions` verwenden `hubspotApiRequestForLoadOptions` (nicht `hubspotApiRequest`)
- [ ] **Property-Dropdowns als `options` oder `multiOptions`** je nach Kontext
- [ ] **Property-Dropdowns nutzen `PropertyCache` mit `credentialId`-Isolation**
- [ ] **Property-Dropdowns mit `loadOptionsDependsOn`** bei dynamischen Abhängigkeiten

### Execution & Error Handling
- [ ] `execute()` nutzt `hubspotApiRequest` (mit automatischem Rate Limiting)
- [ ] Error-Handling mit `continueOnFail()`-Pattern
- [ ] Batch-Operationen nutzen `hubspotBatchRequest` wo sinnvoll
- [ ] Paginierung nutzt `hubspotApiRequestAllItems` wo sinnvoll

### Registrierung & Testing
- [ ] Knoten in `package.json` → `n8n.nodes` registriert
- [ ] `npm run build` erfolgreich
- [ ] Lokaler Test gemäß `/local-testing`-Workflow
- [ ] Node erscheint in n8n unter **Marketing & Content** → **CRM**
- [ ] Aliase funktionieren in der Suche
