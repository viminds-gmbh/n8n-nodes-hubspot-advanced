# HubSpot Pages API (CMS)

Manage website pages and landing pages via the HubSpot CMS Pages API v3. Supports CRUD operations, cloning, publishing, scheduling, A/B testing, and multi-language management.

## Base URL

```
https://api.hubapi.com/cms/v3/pages
```

## Authentication

Bearer token via private app or OAuth.

**Header:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

## Page Types

| Type | Path Segment | Description |
|------|-------------|-------------|
| Site Pages | `site-pages` | Standard website pages |
| Landing Pages | `landing-pages` | Marketing landing pages |

---

## Common Object Model

Both site pages and landing pages share the same core model:

```json
{
  "id": "123456789",
  "name": "My Page",
  "slug": "/my-page",
  "language": "en",
  "state": "DRAFT",
  "templatePath": "templates/my-template.html",
  "domain": "www.example.com",
  "publishDate": "2024-01-01T00:00:00Z",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z",
  "archived": false,
  "layoutSections": {},
  "metaDescription": "Page description",
  "featuredImage": "https://...",
  "htmlTitle": "Page Title",
  "attachedStylesheets": [],
  "publicAccessRulesEnabled": false,
  "publicAccessRules": [],
  "translations": {},
  "campaign": "campaign-id",
  "contentGroupId": "12345"
}
```

### Deprecated Fields (v3)

- `campaign_name` → use `campaign` instead
- `is_draft` → use `state` instead
- `style_override_id` → removed
- `meta_keywords` → removed

---

## Endpoints

### 1. List Pages

Retrieve all pages of a given type with filtering, sorting, and pagination.

**Endpoint:** `GET /cms/v3/pages/{site-pages|landing-pages}`

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `limit` | integer | No | 10 | Max results per page |
| `offset` | integer | No | 0 | Pagination offset |
| `sort` | string | No | `-updatedAt` | Sort field, prefix `-` for descending |
| `state__in` | string (CSV) | No | - | Filter by state: `DRAFT`, `PUBLISHED`, `PUBLISHED_OR_SCHEDULED`, `SCHEDULED` |
| `name__contains` | string | No | - | Filter by name (partial match) |
| `domain__in` | string (CSV) | No | - | Filter by domain(s) |
| `language` | string | No | - | Filter by language code (e.g. `en`, `de`) |
| `language__not_null` | - | No | - | Only pages with language set |
| `createdAt` | dateTime | No | - | Exact creation time |
| `createdAfter` | dateTime | No | - | Created after |
| `createdBefore` | dateTime | No | - | Created before |
| `updatedAt` | dateTime | No | - | Exact update time |
| `updatedAfter` | dateTime | No | - | Updated after |
| `updatedBefore` | dateTime | No | - | Updated before |
| `archived` | boolean | No | false | Include archived pages |

**Sortable Fields:** `name`, `createdAt`, `updatedAt`, `publishDate`

**Response (200):**
```json
{
  "total": 42,
  "results": [ /* page objects */ ]
}
```

---

### 2. Get Single Page

Retrieve a single page by ID.

**Endpoint:** `GET /cms/v3/pages/{site-pages|landing-pages}/{pageId}`

**Path Parameters:**
- `pageId` (string, required) - The ID of the page

**Response (200):** Single page object

---

### 3. Create Page

Create a new website or landing page.

**Endpoint:** `POST /cms/v3/pages/{site-pages|landing-pages}`

**Request Body (JSON):**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | Internal name of the page |
| `templatePath` | string | ✅ | Path to template (no leading `/`), e.g. `templates/my-page.html` |
| `slug` | string | No | URL slug, appended to domain |
| `domain` | string | No | Domain for the page |
| `language` | string | No | Language code (e.g. `en`, `de`) |
| `state` | string | No | Initial state: `DRAFT` (default) or `PUBLISHED` |
| `layoutSections` | object | No | Page content/layout structure |
| `metaDescription` | string | No | SEO meta description |
| `htmlTitle` | string | No | HTML title tag |
| `featuredImage` | string | No | URL to featured image |
| `campaign` | string | No | Associated campaign GUID |
| `attachedStylesheets` | array | No | Stylesheet paths |
| `publicAccessRulesEnabled` | boolean | No | Enable public access rules |
| `publicAccessRules` | array | No | Public access rule objects |
| `publishDate` | string | No | ISO 8601 scheduled publish date |
| `contentGroupId` | string | No | Content group ID |
| `subcategory` | string | No | Template subcategory |

**Example Request:**
```bash
curl --request POST \
  --url https://api.hubapi.com/cms/v3/pages/site-pages \
  --header 'Authorization: Bearer YOUR_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "About Us",
    "templatePath": "templates/about.html",
    "slug": "/about",
    "domain": "www.example.com",
    "language": "en",
    "htmlTitle": "About Us | Example"
  }'
```

**Response (201):** Created page object

---

### 4. Update Page (Draft)

Update the draft version of a page. Changes are not live until published.

**Endpoint:** `PATCH /cms/v3/pages/{site-pages|landing-pages}/{pageId}/draft`

**Path Parameters:**
- `pageId` (string, required) - The ID of the page

**Request Body (JSON):** Same fields as Create, all optional. Only include fields to update.

**Response (200):** Updated page object

---

### 5. Reset Draft

Reset the draft to match the live/published version, discarding all draft changes.

**Endpoint:** `POST /cms/v3/pages/{site-pages|landing-pages}/{pageId}/draft/reset`

**Path Parameters:**
- `pageId` (string, required) - The ID of the page

**Response (200):** Updated page object (draft reset to live)

---

### 6. Delete Page

Soft-delete (archive) a page.

**Endpoint:** `DELETE /cms/v3/pages/{site-pages|landing-pages}/{pageId}`

**Path Parameters:**
- `pageId` (string, required) - The ID of the page

**Response (204):** No content

---

### 7. Batch Delete Pages

Archive multiple pages at once.

**Endpoint:** `POST /cms/v3/pages/{site-pages|landing-pages}/batch/archive`

**Request Body (JSON):**
```json
{
  "inputs": ["pageId1", "pageId2", "pageId3"]
}
```

**Response (204):** No content

---

### 8. Clone Page

Clone an existing page.

**Endpoint:** `POST /cms/v3/pages/{site-pages|landing-pages}/clone`

**Request Body (JSON):**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✅ | ID of the page to clone |
| `name` | string | No | Name for the cloned page (auto-generated if omitted) |
| `language` | string | No | Language for the clone |

**Response (200):** Cloned page object

---

### 9. Publish Draft

Publish the draft version immediately.

**Endpoint:** `POST /cms/v3/pages/{site-pages|landing-pages}/{pageId}/draft/publish`

**Path Parameters:**
- `pageId` (string, required) - The ID of the page

**Response (200):** Published page object

---

### 10. Schedule Publish

Schedule the draft for future publishing.

**Endpoint:** `POST /cms/v3/pages/{site-pages|landing-pages}/schedule`

**Request Body (JSON):**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✅ | Page ID |
| `publishDate` | string | ✅ | ISO 8601 datetime for scheduled publish |

**Response (200):** Updated page object

---

### 11. Cancel Schedule

Cancel a scheduled publish.

**Endpoint:** `POST /cms/v3/pages/{site-pages|landing-pages}/{pageId}/draft/push-live/cancel`

**Response (200):** Updated page object

---

### 12. Get Draft Version

Retrieve the current draft version of a page.

**Endpoint:** `GET /cms/v3/pages/{site-pages|landing-pages}/{pageId}/draft`

**Response (200):** Draft page object

---

## A/B Testing

### Create A/B Variation

**Endpoint:** `POST /cms/v3/pages/{site-pages|landing-pages}/ab-test`

### Get A/B Test Status

**Endpoint:** `GET /cms/v3/pages/{site-pages|landing-pages}/ab-test/{testId}`

---

## Multi-Language

### Create Language Variant

**Endpoint:** `POST /cms/v3/pages/{site-pages|landing-pages}/multi-language/create-language-variation`

### Attach to Language Group

**Endpoint:** `POST /cms/v3/pages/{site-pages|landing-pages}/multi-language/attach-to-group`

### Detach from Language Group

**Endpoint:** `POST /cms/v3/pages/{site-pages|landing-pages}/multi-language/detach-from-group`

### Set Primary Language

**Endpoint:** `POST /cms/v3/pages/{site-pages|landing-pages}/multi-language/set-primary`

---

## State Values

| State | Description |
|-------|-------------|
| `DRAFT` | Unpublished draft |
| `PUBLISHED` | Currently live |
| `SCHEDULED` | Scheduled for future publish |
| `PUBLISHED_OR_SCHEDULED` | Either published or scheduled |

---

## Validation Rules

- **Create:** `name` and `templatePath` are required
- **Update:** At least one field must be provided in the body
- **Clone:** `id` of source page is required
- **Schedule:** `id` and `publishDate` are required
- **templatePath:** Must not start with `/`
- **slug:** Must be a valid URL path segment

---

## Rate Limits

Standard HubSpot API rate limits apply (handled by RateLimiter).

---

## Notes

- Pages use a draft/published workflow: edits go to draft, publish to make live
- `layoutSections` contains the actual page content structure (flexible columns, rich text, etc.)
- Template paths reference templates in the Design Manager
- Domain must be a domain connected to the HubSpot account
- Archived pages can be restored via API
