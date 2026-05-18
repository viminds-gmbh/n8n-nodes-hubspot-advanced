# HubSpot CMS Redirects Node – Implementation Plan

## Node: `HubSpotCmsRedirects`

Standalone node for URL redirects. Unique model, no overlap with other CMS APIs. Simple CRUD with flexible matching options.

---

## Architecture

```
src/nodes/HubSpotCmsRedirects/
├── HubSpotCmsRedirects.node.ts   # Main node (~100 lines)
├── types.ts                      # Local type definitions
├── descriptions/
│   ├── index.ts
│   └── redirectDescriptions.ts
└── operations/
    ├── index.ts
    └── redirectOperations.ts
```

---

## Operations

| Operation | Method | Endpoint | Required Fields | Notes |
|-----------|--------|----------|-----------------|-------|
| `getAll` | GET | `/url-redirects` | - | List with filters |
| `get` | GET | `/url-redirects/{id}` | `redirectId` | Single redirect |
| `create` | POST | `/url-redirects/` | `routePrefix`, `destination`, `redirectStyle` | Create |
| `update` | PATCH | `/url-redirects/{id}` | `redirectId` + ≥1 field | Update |
| `delete` | DELETE | `/url-redirects/{id}` | `redirectId` | Delete |
| `batchDelete` | POST | `/url-redirects/batch/archive` | `redirectIds` | Batch |

---

## Field Specifications

### Create/Update Fields
- `routePrefix` (string, required for create, placeholder: "/old-page")
- `destination` (string, required for create, placeholder: "/new-page")
- `redirectStyle` (options, required for create: 301, 302, 305)
- `isMatchFullUrl` (boolean, default: false)
- `isMatchQueryString` (boolean, default: false)
- `isOnlyAfterNotFound` (boolean, default: false)
- `isPattern` (boolean, default: false)
- `isProtocolRelative` (boolean, default: false)
- `isTrailingSlashOptional` (boolean, default: false)
- `precedence` (number, default: 0)

### Filter Fields (getAll)
- `routePrefixFilter` (string)
- `destinationFilter` (string)
- `redirectStyleFilter` (options: 301, 302, 305)
- `createdAfter`/`createdBefore` (dateTime)
- `updatedAfter`/`updatedBefore` (dateTime)
- `sort` (options: createdAt, updatedAt, routePrefix, destination)

### Shared Fields (all list operations)
- `returnAll` (boolean, default: false)
- `limit` (number, default: 100, min: 1, max: 100)
- `offset` (number, default: 0)

---

## Subtitle

```
={{$parameter["operation"] + ": Redirect"}}
```

Output: `create: Redirect`, `getAll: Redirect`

---

## loadOptions Methods

| Method | Endpoint | Cache | Description |
|--------|----------|-------|-------------|
| `getRedirects` | `GET /cms/v3/url-redirects` | No | Loads redirects for ID selection |

---

## Validation Rules

| Operation | Rule |
|-----------|------|
| `create` | `routePrefix` + `destination` + `redirectStyle` required |
| `update` | At least 1 field must be provided |
| `redirectStyle` | Must be 301, 302, or 305 |

---

## Shared Patterns Used

- **List with pagination**: GET with limit/offset/sort/filters → shared helper `buildListQueryParams()`
- **Batch archive**: POST with inputs array

---

## n8n UI Elements

| Element | Type | Notes |
|---------|------|-------|
| `operation` | `options` | 6 operations |
| `redirectStyle` | `options` | 301 (Permanent), 302 (Temporary), 305 (Proxy) |
| `sort` | `options` | createdAt, updatedAt, routePrefix, destination |
| `isMatchFullUrl` | `boolean` | Match entire URL |
| `isMatchQueryString` | `boolean` | Match query string |
| `isOnlyAfterNotFound` | `boolean` | Only after 404 |
| `isPattern` | `boolean` | Regex pattern mode |
| `isProtocolRelative` | `boolean` | Ignore http/https |
| `isTrailingSlashOptional` | `boolean` | Optional trailing slash |
| `precedence` | `number` | Priority ordering |
| `filters` | `fixedCollection` | Reusable filter builder |

---

## Transport Layer

No new transport functions needed. Uses existing `hubspotApiRequest` and `hubspotApiRequestForLoadOptions`.

---

## Estimated Effort

| Metric | Value |
|--------|-------|
| Files | 5 |
| Est. Lines | ~350 |
| Complexity | Low |
| Effort | 1-2h |
