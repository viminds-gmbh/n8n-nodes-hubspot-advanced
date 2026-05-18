# HubSpot Site Search Node – Implementation Plan

## Node: `HubSpotSiteSearch`

Read-only node for searching content across HubSpot-hosted sites and retrieving indexed data for specific assets. Completely different purpose from content management nodes.

---

## Architecture

```
src/nodes/HubSpotSiteSearch/
├── HubSpotSiteSearch.node.ts     # Main node (~90 lines)
├── types.ts
├── descriptions/
│   ├── index.ts
│   └── searchDescriptions.ts
└── operations/
    ├── index.ts
    └── searchOperations.ts
```

---

## Operations

| Operation | Method | Endpoint | Required Fields | Notes |
|-----------|--------|----------|-----------------|-------|
| `search` | GET | `/site-search/search` | `query` | Search content |
| `getIndexedData` | GET | `/site-search/indexed-data/{type}/{id}` | `contentType`, `contentId` | Get indexed data |

---

## Field Specifications

### Search Fields
- `query` (string, required, placeholder: "marketing tips")
- `limit` (number, default: 10, min: 1, max: 100)
- `offset` (number, default: 0)
- `contentType` (options: BLOG_POST, SITE_PAGE, LANDING_PAGE, KNOWLEDGE_ARTICLE, LISTING_PAGE)
- `domain` (string, placeholder: "blog.example.com")
- `language` (string, placeholder: "en")
- `contentGroupId` (string)
- `boostRecent` (string, placeholder: "10d")
- `boostBlogPosts` (number, default: 1.0)
- `boostSitePages` (number, default: 1.0)
- `boostLandingPages` (number, default: 1.0)
- `boostKnowledgeArticles` (number, default: 1.0)
- `boostListings` (number, default: 1.0)

### Get Indexed Data Fields
- `contentType` (options, required: BLOG_POST, SITE_PAGE, LANDING_PAGE, KNOWLEDGE_ARTICLE, LISTING_PAGE)
- `contentId` (string, required)

---

## Subtitle

```
={{$parameter["operation"] === "search" ? "Search Site" : "Get Indexed Data"}}
```

---

## loadOptions Methods

None required (no ID-based dropdowns needed for search).

---

## Validation Rules

| Operation | Rule |
|-----------|------|
| `search` | `query` required |
| `getIndexedData` | `contentType` + `contentId` required |

---

## Shared Patterns Used

- **Offset-based pagination**: GET with limit/offset (no cursor-based paging for this API)

---

## n8n UI Elements

| Element | Type | Notes |
|---------|------|-------|
| `operation` | `options` | search, getIndexedData |
| `contentType` | `options` | BLOG_POST, SITE_PAGE, LANDING_PAGE, KNOWLEDGE_ARTICLE, LISTING_PAGE |
| `boostRecent` | `string` | Time unit: ms, s, m, h, d |
| `boostBlogPosts` | `number` | Boost factor |
| `boostSitePages` | `number` | Boost factor |
| `boostLandingPages` | `number` | Boost factor |
| `boostKnowledgeArticles` | `number` | Boost factor |
| `boostListings` | `number` | Boost factor |

---

## Transport Layer

No new transport functions needed. Uses existing `hubspotApiRequest` and `hubspotApiRequestForLoadOptions`.

---

## Estimated Effort

| Metric | Value |
|--------|-------|
| Files | 5 |
| Est. Lines | ~250 |
| Complexity | Low |
| Effort | 1h |
