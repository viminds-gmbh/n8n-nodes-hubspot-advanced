# HubSpot Blog API (CMS)

Manage blog posts and blog tags via the HubSpot CMS Blog API v3. Supports CRUD operations, cloning, publishing, scheduling, revisions, and multi-language management.

## Base URLs

```
Posts: https://api.hubapi.com/cms/v3/blogs/posts
Tags:  https://api.hubapi.com/cms/v3/blogs/tags
```

## Authentication

Bearer token via private app or OAuth.

**Header:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

# Blog Posts

## Post Object Model

```json
{
  "id": "184993428780",
  "name": "My Blog Post",
  "slug": "/my-blog-post",
  "language": "en",
  "state": "DRAFT",
  "contentGroupId": "12345",
  "blogAuthorId": "67890",
  "tagIds": [1, 2, 3],
  "publishDate": "2024-01-01T00:00:00Z",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z",
  "archived": false,
  "htmlTitle": "Post Title",
  "metaDescription": "Post description",
  "featuredImage": "https://...",
  "featuredImageAltText": "Image alt",
  "postBody": "<p>Rich text content</p>",
  "postSummary": "Summary text",
  "url": "https://blog.example.com/my-blog-post",
  "rssBody": "<p>RSS content</p>",
  "rssSummary": "RSS summary",
  "useFeaturedImage": true,
  "campaign": "campaign-id",
  "attachedStylesheets": [],
  "publicAccessRulesEnabled": false,
  "publicAccessRules": [],
  "translations": {},
  "layoutSections": {}
}
```

### Deprecated Fields (v3)

- `topicIds` → renamed to `tagIds`
- `description` → removed
- `campaign_name` → use `campaign` instead
- `is_draft` → use `state` instead
- `meta_keywords` → removed

---

## Blog Post Endpoints

### 1. List Blog Posts

Retrieve all blog posts with filtering, sorting, and pagination.

**Endpoint:** `GET /cms/v3/blogs/posts`

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `limit` | integer | No | 10 | Max results per page |
| `offset` | integer | No | 0 | Pagination offset |
| `sort` | string | No | `-updatedAt` | Sort field, prefix `-` for descending |
| `state__in` | string (CSV) | No | - | Filter by state |
| `name__contains` | string | No | - | Filter by name (partial match) |
| `contentGroupId` | string | No | - | Filter by blog ID |
| `blogAuthorId` | string | No | - | Filter by author ID |
| `language` | string | No | - | Filter by language code |
| `language__not_null` | - | No | - | Only posts with language set |
| `createdAt` | dateTime | No | - | Exact creation time |
| `createdAfter` | dateTime | No | - | Created after |
| `createdBefore` | dateTime | No | - | Created before |
| `updatedAt` | dateTime | No | - | Exact update time |
| `updatedAfter` | dateTime | No | - | Updated after |
| `updatedBefore` | dateTime | No | - | Updated before |
| `archived` | boolean | No | false | Include archived posts |
| `tagId__in` | string (CSV) | No | - | Filter by tag IDs |

**Sortable Fields:** `name`, `createdAt`, `updatedAt`, `publishDate`

**Response (200):**
```json
{
  "total": 42,
  "results": [ /* post objects */ ]
}
```

---

### 2. Get Single Blog Post

**Endpoint:** `GET /cms/v3/blogs/posts/{postId}`

**Path Parameters:**
- `postId` (string, required) - The ID of the blog post

**Response (200):** Single post object

---

### 3. Create Blog Post

**Endpoint:** `POST /cms/v3/blogs/posts`

**Request Body (JSON):**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | Internal name of the post |
| `contentGroupId` | string | ✅ | ID of the blog to publish to |
| `slug` | string | No | URL slug |
| `language` | string | No | Language code |
| `state` | string | No | `DRAFT` (default) or `PUBLISHED` |
| `blogAuthorId` | string | No | Author ID |
| `tagIds` | array[integer] | No | Array of tag IDs |
| `htmlTitle` | string | No | HTML title tag |
| `metaDescription` | string | No | SEO meta description |
| `featuredImage` | string | No | Featured image URL |
| `featuredImageAltText` | string | No | Alt text for featured image |
| `postBody` | string | No | Rich text/HTML body content |
| `postSummary` | string | No | Summary text |
| `rssBody` | string | No | RSS-specific body |
| `rssSummary` | string | No | RSS-specific summary |
| `useFeaturedImage` | boolean | No | Use featured image in listings |
| `campaign` | string | No | Associated campaign GUID |
| `publishDate` | string | No | ISO 8601 scheduled publish date |
| `layoutSections` | object | No | Flexible page layout content |

**Example Request:**
```bash
curl --request POST \
  --url https://api.hubapi.com/cms/v3/blogs/posts \
  --header 'Authorization: Bearer YOUR_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "My First Blog Post",
    "contentGroupId": "12345",
    "slug": "/my-first-post",
    "language": "en",
    "htmlTitle": "My First Blog Post | Blog",
    "postBody": "<p>Hello world!</p>"
  }'
```

**Response (201):** Created post object

---

### 4. Update Blog Post (Draft)

Update the draft version of a blog post.

**Endpoint:** `PATCH /cms/v3/blogs/posts/{postId}/draft`

**Path Parameters:**
- `postId` (string, required) - The ID of the blog post

**Request Body (JSON):** Same fields as Create, all optional.

**Response (200):** Updated post object

---

### 5. Reset Draft

Reset draft to match live version.

**Endpoint:** `POST /cms/v3/blogs/posts/{postId}/draft/reset`

**Response (200):** Updated post object

---

### 6. Delete Blog Post

Soft-delete (archive) a blog post.

**Endpoint:** `DELETE /cms/v3/blogs/posts/{postId}`

**Response (204):** No content

---

### 7. Batch Delete Posts

**Endpoint:** `POST /cms/v3/blogs/posts/batch/archive`

**Request Body:**
```json
{
  "inputs": ["postId1", "postId2"]
}
```

**Response (204):** No content

---

### 8. Clone Blog Post

**Endpoint:** `POST /cms/v3/blogs/posts/clone`

**Request Body (JSON):**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✅ | ID of the post to clone |
| `name` | string | No | Name for the clone |
| `language` | string | No | Language for the clone |
| `contentGroupId` | string | No | Target blog ID |

**Response (200):** Cloned post object

---

### 9. Publish Draft

Publish the draft immediately.

**Endpoint:** `POST /cms/v3/blogs/posts/{postId}/draft/publish`

**Response (200):** Published post object

---

### 10. Push Draft Live

Push draft changes to the live version (for already-published posts).

**Endpoint:** `POST /cms/v3/blogs/posts/{postId}/draft/push-live`

**Response (200):** Updated post object

---

### 11. Schedule Publish

**Endpoint:** `POST /cms/v3/blogs/posts/schedule`

**Request Body (JSON):**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✅ | Post ID |
| `publishDate` | string | ✅ | ISO 8601 datetime |

**Response (200):** Updated post object

---

### 12. Get Draft Version

**Endpoint:** `GET /cms/v3/blogs/posts/{postId}/draft`

**Response (200):** Draft post object

---

## Revisions

### Get All Revisions

**Endpoint:** `GET /cms/v3/blogs/posts/{postId}/revisions`

### Get Specific Revision

**Endpoint:** `GET /cms/v3/blogs/posts/{postId}/revisions/{revisionId}`

### Restore Revision

**Endpoint:** `POST /cms/v3/blogs/posts/{postId}/revisions/{revisionId}/restore`

---

## Multi-Language (Posts)

### Create Language Variant

**Endpoint:** `POST /cms/v3/blogs/posts/multi-language/create-language-variation`

### Attach to Group

**Endpoint:** `POST /cms/v3/blogs/posts/multi-language/attach-to-group`

### Detach from Group

**Endpoint:** `POST /cms/v3/blogs/posts/multi-language/detach-from-group`

### Set Primary Language

**Endpoint:** `POST /cms/v3/blogs/posts/multi-language/set-primary`

### Update Languages

**Endpoint:** `POST /cms/v3/blogs/posts/multi-language/update-languages`

---

# Blog Tags

## Tag Object Model

```json
{
  "id": "12345",
  "name": "Marketing",
  "slug": "marketing",
  "language": "en",
  "created": "2024-01-01T00:00:00Z",
  "updated": "2024-01-01T00:00:00Z",
  "deletedAt": null,
  "translations": {}
}
```

### Deprecated Fields (v3)

- `description` → removed

---

## Blog Tag Endpoints

### 1. List Blog Tags

**Endpoint:** `GET /cms/v3/blogs/tags`

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `limit` | integer | No | 10 | Max results per page |
| `offset` | integer | No | 0 | Pagination offset |
| `sort` | string | No | `-updated` | Sort field |
| `name__contains` | string | No | - | Filter by name |
| `language` | string | No | - | Filter by language |
| `createdAfter` | dateTime | No | - | Created after |
| `updatedAfter` | dateTime | No | - | Updated after |
| `archived` | boolean | No | false | Include archived tags |

**Sortable Fields:** `name`, `created`, `updated`

**Response (200):**
```json
{
  "total": 15,
  "results": [ /* tag objects */ ]
}
```

---

### 2. Get Single Tag

**Endpoint:** `GET /cms/v3/blogs/tags/{tagId}`

**Response (200):** Single tag object

---

### 3. Create Blog Tag

**Endpoint:** `POST /cms/v3/blogs/tags`

**Request Body (JSON):**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | Name of the tag |
| `slug` | string | No | URL-friendly slug (auto-generated if omitted) |
| `language` | string | No | Language code |

**Response (201):** Created tag object

---

### 4. Update Blog Tag

**Endpoint:** `PATCH /cms/v3/blogs/tags/{tagId}`

**Request Body (JSON):**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | New name |
| `slug` | string | No | New slug |
| `language` | string | No | New language |

**Response (200):** Updated tag object

---

### 5. Delete Blog Tag

**Endpoint:** `DELETE /cms/v3/blogs/tags/{tagId}`

**Response (204):** No content

---

### 6. Batch Delete Tags

**Endpoint:** `POST /cms/v3/blogs/tags/batch/archive`

**Request Body:**
```json
{
  "inputs": ["tagId1", "tagId2"]
}
```

**Response (204):** No content

---

## Multi-Language (Tags)

### Create Language Variant

**Endpoint:** `POST /cms/v3/blogs/tags/multi-language/create-language-variation`

### Attach to Group

**Endpoint:** `POST /cms/v3/blogs/tags/multi-language/attach-to-group`

### Detach from Group

**Endpoint:** `POST /cms/v3/blogs/tags/multi-language/detach-from-group`

### Set Primary Language

**Endpoint:** `POST /cms/v3/blogs/tags/multi-language/set-primary`

---

## State Values (Posts)

| State | Description |
|-------|-------------|
| `DRAFT` | Unpublished draft |
| `PUBLISHED` | Currently live |
| `SCHEDULED` | Scheduled for future publish |

---

## Validation Rules

### Posts
- **Create:** `name` and `contentGroupId` are required
- **Update:** At least one field must be provided
- **Clone:** `id` of source post is required
- **Schedule:** `id` and `publishDate` are required

### Tags
- **Create:** `name` is required
- **Update:** At least one field must be provided
- **Name:** Must be unique per language within a blog

---

## Rate Limits

Standard HubSpot API rate limits apply (handled by RateLimiter).

---

## Notes

- Blog posts use a draft/published workflow like pages
- `contentGroupId` references the blog (content group) the post belongs to
- Tags are shared across blog posts within the same blog
- `tagIds` replaces the deprecated `topicIds` field
- Revisions allow viewing and restoring previous versions of a post
- Multi-language support allows creating translations of posts and tags
