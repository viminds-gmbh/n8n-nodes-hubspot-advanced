# HubSpot CMS Blog Node – Implementation Plan

## Node: `HubSpotCmsBlog`

Combines Blog Posts and Blog Tags into one node. Related domain (blog), shared contentGroupId context. Different models but complementary.

---

## Architecture

```
src/nodes/HubSpotCmsBlog/
├── HubSpotCmsBlog.node.ts        # Main node (~130 lines)
├── types.ts                      # Local type definitions
├── descriptions/
│   ├── index.ts                  # Re-exports
│   ├── sharedDescriptions.ts     # Shared fields
│   ├── postDescriptions.ts       # Post-specific fields
│   └── tagDescriptions.ts        # Tag-specific fields
└── operations/
    ├── index.ts                  # Re-exports
    ├── postOperations.ts         # Post operation logic
    └── tagOperations.ts          # Tag operation logic
```

---

## Resource & Operations

**Resource: Blog Resource** (`resource` parameter)
- `post` → `/cms/v3/blogs/posts`
- `tag` → `/cms/v3/blogs/tags`

### Post Operations

| Operation | Method | Endpoint | Required Fields | Notes |
|-----------|--------|----------|-----------------|-------|
| `getAll` | GET | `/posts` | - | List with filters |
| `get` | GET | `/posts/{postId}` | `postId` | Single post |
| `create` | POST | `/posts` | `name`, `contentGroupId` | Create post |
| `update` | PATCH | `/posts/{postId}/draft` | `postId` + ≥1 field | Update draft |
| `delete` | DELETE | `/posts/{postId}` | `postId` | Soft delete |
| `clone` | POST | `/posts/clone` | `sourcePostId` | Clone post |
| `publish` | POST | `/posts/{postId}/draft/publish` | `postId` | Publish draft |
| `pushLive` | POST | `/posts/{postId}/draft/push-live` | `postId` | Push draft to live |
| `schedule` | POST | `/posts/schedule` | `postId`, `publishDate` | Schedule |
| `resetDraft` | POST | `/posts/{postId}/draft/reset` | `postId` | Reset draft |
| `getDraft` | GET | `/posts/{postId}/draft` | `postId` | Get draft |
| `getRevisions` | GET | `/posts/{postId}/revisions` | `postId` | List revisions |
| `restoreRevision` | POST | `/posts/{postId}/revisions/{revId}/restore` | `postId`, `revisionId` | Restore |
| `batchDelete` | POST | `/posts/batch/archive` | `postIds` | Batch archive |

### Tag Operations

| Operation | Method | Endpoint | Required Fields | Notes |
|-----------|--------|----------|-----------------|-------|
| `getAll` | GET | `/tags` | - | List with filters |
| `get` | GET | `/tags/{tagId}` | `tagId` | Single tag |
| `create` | POST | `/tags` | `name` | Create tag |
| `update` | PATCH | `/tags/{tagId}` | `tagId` + ≥1 field | Update tag |
| `delete` | DELETE | `/tags/{tagId}` | `tagId` | Delete tag |
| `batchDelete` | POST | `/tags/batch/archive` | `tagIds` | Batch archive |

---

## Field Specifications

### Post Create/Update Fields
- `name` (string, required for create)
- `contentGroupId` (options, loadOptionsMethod: getBlogs, required for create)
- `slug` (string)
- `language` (string)
- `blogAuthorId` (options, loadOptionsMethod: getAuthors)
- `tagIds` (multiOptions, loadOptionsMethod: getBlogTags)
- `htmlTitle` (string)
- `metaDescription` (string)
- `featuredImage` (string)
- `featuredImageAltText` (string)
- `postBody` (string, type: html)
- `postSummary` (string)
- `rssBody` (string)
- `rssSummary` (string)
- `useFeaturedImage` (boolean)
- `campaign` (string)
- `layoutSections` (json)
- `publishDate` (dateTime)

### Post Filter Fields (getAll)
- `stateFilter` (multiOptions)
- `nameFilter` (string)
- `contentGroupId` (options)
- `blogAuthorId` (options)
- `languageFilter` (string)
- `tagIdFilter` (multiOptions)
- `createdAfter`/`createdBefore` (dateTime)
- `updatedAfter`/`updatedBefore` (dateTime)
- `sort` (options: name, createdAt, updatedAt, publishDate)

### Tag Create/Update Fields
- `name` (string, required for create)
- `slug` (string)
- `language` (string)

### Tag Filter Fields (getAll)
- `nameFilter` (string)
- `languageFilter` (string)
- `createdAfter` (dateTime)
- `updatedAfter` (dateTime)
- `sort` (options: name, created, updated)

### Shared Fields (all list operations)
- `returnAll` (boolean, default: false)
- `limit` (number, default: 100, min: 1, max: 100)
- `offset` (number, default: 0)

---

## Subtitle

```
={{$parameter["operation"] + ": " + ($parameter["resource"] === "post" ? "Blog Post" : "Blog Tag")}}
```

Output: `create: Blog Post`, `getAll: Blog Tag`

---

## loadOptions Methods

| Method | Endpoint | Cache | Description |
|--------|----------|-------|-------------|
| `getBlogPosts` | `GET /cms/v3/blogs/posts` | No | Loads posts for ID selection |
| `getBlogTags` | `GET /cms/v3/blogs/tags` | No | Loads tags for ID/tagIds selection |
| `getBlogs` | `GET /cms/v3/blogs` | Yes (5min) | Loads blogs (content groups) |
| `getAuthors` | `GET /cms/v3/blogs/authors` | Yes (5min) | Loads blog authors |

---

## Validation Rules

| Operation | Rule |
|-----------|------|
| `create` post | `name` + `contentGroupId` required |
| `create` tag | `name` required |
| `update` | At least 1 field must be provided |
| `clone` | `sourcePostId` required |
| `schedule` | `postId` + `publishDate` required |

---

## Shared Patterns Used

- **List with pagination**: GET with limit/offset/sort/filters → shared helper `buildListQueryParams()`
- **Draft workflow**: Get draft, update draft, reset draft, publish, push live
- **Clone**: POST with source ID
- **Schedule**: POST with id + publishDate
- **Batch archive**: POST with inputs array

---

## n8n UI Elements

| Element | Type | Notes |
|---------|------|-------|
| `resource` | `options` | Post, Tag |
| `operation` | `options` | 14 post ops + 6 tag ops |
| `stateFilter` | `multiOptions` | DRAFT, PUBLISHED, SCHEDULED |
| `sort` | `options` | Varies by resource |
| `tagIds` | `multiOptions` | Dynamic from getBlogTags |
| `postBody` | `string` (html) | Rich text editor |
| `layoutSections` | `json` | Free-form JSON |
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
| Files | 8 |
| Est. Lines | ~750 |
| Complexity | High |
| Effort | 3-4h |
