# HubSpot CMS Pages Node – Implementation Plan

## Node: `HubSpotCmsPages`

Combines Site Pages and Landing Pages into one node. Identical API structure, same model, same operations – only URL segment differs.

---

## Architecture

```
src/nodes/HubSpotCmsPages/
├── HubSpotCmsPages.node.ts       # Main node (~120 lines)
├── types.ts                      # Local type definitions
├── descriptions/
│   ├── index.ts                  # Re-exports
│   ├── sharedDescriptions.ts     # Shared fields (limit, sort, filters, returnAll)
│   └── pageDescriptions.ts       # Page-specific fields
└── operations/
    ├── index.ts                  # Re-exports
    └── pageOperations.ts         # All page operation logic
```

---

## Resource & Operations

**Resource: Page Type** (`pageType` parameter)
- `sitePages` → `/cms/v3/pages/site-pages`
- `landingPages` → `/cms/v3/pages/landing-pages`

**Operations:**

| Operation | Method | Endpoint | Required Fields | Notes |
|-----------|--------|----------|-----------------|-------|
| `getAll` | GET | `/{type}` | - | List with filters, sort, pagination |
| `get` | GET | `/{type}/{pageId}` | `pageId` | Single page |
| `create` | POST | `/{type}` | `name`, `templatePath` | Create new page |
| `update` | PATCH | `/{type}/{pageId}/draft` | `pageId` + ≥1 field | Update draft |
| `delete` | DELETE | `/{type}/{pageId}` | `pageId` | Soft delete |
| `clone` | POST | `/{type}/clone` | `sourcePageId` | Clone existing |
| `publish` | POST | `/{type}/{pageId}/draft/publish` | `pageId` | Publish draft |
| `schedule` | POST | `/{type}/schedule` | `pageId`, `publishDate` | Schedule publish |
| `resetDraft` | POST | `/{type}/{pageId}/draft/reset` | `pageId` | Reset to live |
| `getDraft` | GET | `/{type}/{pageId}/draft` | `pageId` | Get draft version |
| `batchDelete` | POST | `/{type}/batch/archive` | `pageIds` | Batch archive |

---

## Field Specifications

### Shared Fields (all operations with list context)
- `returnAll` (boolean, default: false)
- `limit` (number, default: 100, min: 1, max: 100)
- `offset` (number, default: 0)

### Filter Fields (getAll)
- `stateFilter` (multiOptions: DRAFT, PUBLISHED, SCHEDULED, PUBLISHED_OR_SCHEDULED)
- `nameFilter` (string, placeholder: "About")
- `domainFilter` (multiOptions, loadOptionsMethod: getDomains)
- `languageFilter` (string, placeholder: "en")
- `createdAfter` (dateTime)
- `createdBefore` (dateTime)
- `updatedAfter` (dateTime)
- `updatedBefore` (dateTime)
- `sort` (options: name, createdAt, updatedAt, publishDate, with ASC/DESC)

### Create/Update Fields
- `name` (string, required for create)
- `templatePath` (string, required for create, placeholder: "templates/my-page.html")
- `slug` (string, placeholder: "/my-page")
- `domain` (string, or loadOptions)
- `language` (string, placeholder: "en")
- `htmlTitle` (string)
- `metaDescription` (string)
- `featuredImage` (string)
- `campaign` (string)
- `layoutSections` (json)
- `attachedStylesheets` (fixedCollection)
- `publicAccessRulesEnabled` (boolean)
- `publicAccessRules` (json)

### Clone Fields
- `sourcePageId` (options, loadOptionsMethod: getPages)
- `cloneName` (string, optional new name)
- `cloneLanguage` (string, optional)

### Schedule Fields
- `pageId` (options, loadOptionsMethod: getPages)
- `publishDate` (dateTime, required)

---

## Subtitle

```
={{$parameter["operation"] + ": " + ($parameter["pageType"] === "sitePages" ? "Site Page" : "Landing Page")}}
```

Output: `create: Site Page`, `publish: Landing Page`

---

## loadOptions Methods

| Method | Endpoint | Cache | Description |
|--------|----------|-------|-------------|
| `getPages` | `GET /cms/v3/pages/{type}` | No | Loads pages of selected type for ID selection |
| `getDomains` | `GET /cms/v3/domains` | Yes (1h) | Loads available domains |
| `getTemplates` | `GET /cms/v3/source-code` | No | Loads template paths from source-code API |

---

## Validation Rules

| Operation | Rule |
|-----------|------|
| `create` | `name` + `templatePath` required |
| `update` | At least 1 field must be provided |
| `clone` | `sourcePageId` required |
| `schedule` | `pageId` + `publishDate` required |
| `templatePath` | Must not start with `/` |

---

## Shared Patterns Used

- **List with pagination**: GET with limit/offset/sort/filters → shared helper `buildListQueryParams()`
- **Draft workflow**: Get draft, update draft, reset draft, publish
- **Clone**: POST with source ID
- **Schedule**: POST with id + publishDate
- **Batch archive**: POST with inputs array

---

## n8n UI Elements

| Element | Type | Notes |
|---------|------|-------|
| `pageType` | `options` | Site Page, Landing Page |
| `operation` | `options` | 11 operations |
| `stateFilter` | `multiOptions` | DRAFT, PUBLISHED, SCHEDULED, PUBLISHED_OR_SCHEDULED |
| `sort` | `options` | name, createdAt, updatedAt, publishDate |
| `layoutSections` | `json` | Free-form JSON for page content |
| `additionalFields` | `fixedCollection` | Dynamic extra fields |
| `filters` | `fixedCollection` | Reusable filter builder |
| `publishDate` | `dateTime` | Schedule datetime picker |

---

## Transport Layer

No new transport functions needed. Uses existing `hubspotApiRequest` and `hubspotApiRequestForLoadOptions`.

---

## Estimated Effort

| Metric | Value |
|--------|-------|
| Files | 6 |
| Est. Lines | ~600 |
| Complexity | High |
| Effort | 3-4h |
