# HubSpot CMS Nodes – Overview & Categorization

## API Summary

| API | Base Path | Resources | Complexity |
|-----|-----------|-----------|------------|
| Pages | `/cms/v3/pages` | site-pages, landing-pages | High |
| Blog | `/cms/v3/blogs` | posts, tags | High |
| Redirects | `/cms/v3/url-redirects` | redirects | Low |
| Site Search | `/cms/v3/site-search` | search, indexed-data | Low |

## Node Categorization

| # | Node | Resources | Plan File |
|---|------|-----------|-----------|
| 1 | `HubSpotCmsPages` | Site Pages + Landing Pages | [cms-pages-node-plan.md](cms-pages-node-plan.md) |
| 2 | `HubSpotCmsBlog` | Blog Posts + Blog Tags | [cms-blog-node-plan.md](cms-blog-node-plan.md) |
| 3 | `HubSpotCmsRedirects` | URL Redirects | [cms-redirects-node-plan.md](cms-redirects-node-plan.md) |
| 4 | `HubSpotSiteSearch` | Site Search | [site-search-node-plan.md](site-search-node-plan.md) |

## Shared Patterns

### Shared Field Definitions

| Field | Used By | Type |
|-------|---------|------|
| `limit` | All | `number` |
| `offset` | All | `number` |
| `sort` | Pages, Blog, Redirects | `options` |
| `state__in` | Pages, Blog Posts | `multiOptions` |
| `language` | Pages, Blog, SiteSearch | `string` |
| `name__contains` | Pages, Blog, Redirects | `string` |
| `createdAfter`/`createdBefore` | Pages, Blog, Redirects | `dateTime` |
| `updatedAfter`/`updatedBefore` | Pages, Blog, Redirects | `dateTime` |
| `returnAll` | Pages, Blog, Redirects | `boolean` |

### Shared Operations Logic

| Pattern | Used By |
|---------|---------|
| List with pagination | Pages, Blog, Redirects |
| Draft workflow | Pages, Blog Posts |
| Clone | Pages, Blog Posts |
| Schedule | Pages, Blog Posts |
| Batch archive | All |

### loadOptions Functions

| Function | Endpoint | Used By | Cache |
|----------|----------|---------|-------|
| `getPages` | `GET /cms/v3/pages/{type}` | CmsPages | No |
| `getBlogPosts` | `GET /cms/v3/blogs/posts` | CmsBlog | No |
| `getBlogTags` | `GET /cms/v3/blogs/tags` | CmsBlog | No |
| `getBlogs` | `GET /cms/v3/blogs` | CmsBlog | 5min |
| `getDomains` | `GET /cms/v3/domains` | CmsPages | 1h |
| `getAuthors` | `GET /cms/v3/blogs/authors` | CmsBlog | 5min |
| `getTemplates` | `GET /cms/v3/source-code` | CmsPages | No |

## Implementation Order

1. **HubSpotCmsPages** – Most complex, establishes patterns + shared descriptions
2. **HubSpotCmsBlog** – Reuses patterns from Pages, adds tag resource
3. **HubSpotCmsRedirects** – Simplest CRUD, reuses shared list fields
4. **HubSpotSiteSearch** – Read-only, different pattern, last

## Registration

```json
"dist/nodes/HubSpotCmsPages/HubSpotCmsPages.node.js",
"dist/nodes/HubSpotCmsBlog/HubSpotCmsBlog.node.js",
"dist/nodes/HubSpotCmsRedirects/HubSpotCmsRedirects.node.js",
"dist/nodes/HubSpotSiteSearch/HubSpotSiteSearch.node.js"
```

## Transport Layer

No new transport functions needed. All CMS APIs use standard JSON request/response with Bearer token auth. Existing `hubspotApiRequest` and `hubspotApiRequestForLoadOptions` cover all needs.

## Effort Summary

| Node | Files | Lines | Complexity | Effort |
|------|-------|-------|------------|--------|
| HubSpotCmsPages | 6 | ~600 | High | 3-4h |
| HubSpotCmsBlog | 8 | ~750 | High | 3-4h |
| HubSpotCmsRedirects | 5 | ~350 | Low | 1-2h |
| HubSpotSiteSearch | 5 | ~250 | Low | 1h |
| **Total** | **24** | **~1950** | - | **8-11h** |
