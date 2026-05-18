# HubSpot Site Search API (CMS)

Search content across HubSpot-hosted sites and retrieve indexed data for specific assets. Use this API to build custom search experiences.

## Base URL

```
https://api.hubapi.com/cms/v3/site-search
```

## Authentication

Bearer token via private app or OAuth.

**Header:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

## Content Types

The site search indexes the following content types:

| Type | Value | Description |
|------|-------|-------------|
| Blog Posts | `BLOG_POST` | Blog articles |
| Site Pages | `SITE_PAGE` | Standard website pages |
| Landing Pages | `LANDING_PAGE` | Marketing landing pages |
| Knowledge Articles | `KNOWLEDGE_ARTICLE` | Knowledge base articles |
| Listings | `LISTING_PAGE` | Blog listing / archive pages |

---

## Endpoints

### 1. Search Site

Search for content across HubSpot-hosted sites.

**Endpoint:** `GET /cms/v3/site-search/search`

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `q` | string | ✅ | - | Search query term |
| `limit` | integer | No | 10 | Max results per page |
| `offset` | integer | No | 0 | Pagination offset |
| `type` | string | No | - | Content type filter: `BLOG_POST`, `SITE_PAGE`, `LANDING_PAGE`, `KNOWLEDGE_ARTICLE`, `LISTING_PAGE` |
| `domain` | string | No | - | Limit search to specific domain (e.g. `blog.hubspot.com`) |
| `language` | string | No | - | Filter by language code (e.g. `en`, `de`) |
| `contentGroupId` | string | No | - | Filter by blog/content group ID |
| `boostRecent` | string | No | - | Boost recent content, e.g. `10d` (10 days), `24h` (24 hours) |
| `boostBlogPosts` | float | No | - | Boost factor for blog posts (e.g. `1.5`) |
| `boostSitePages` | float | No | - | Boost factor for site pages |
| `boostLandingPages` | float | No | - | Boost factor for landing pages |
| `boostKnowledgeArticles` | float | No | - | Boost factor for knowledge articles |
| `boostListings` | float | No | - | Boost factor for listing pages |

**Boost Time Units:** `ms` (milliseconds), `s` (seconds), `m` (minutes), `h` (hours), `d` (days)

**Example Requests:**

Basic search:
```bash
curl --request GET \
  --url 'https://api.hubapi.com/cms/v3/site-search/search?q=marketing&limit=10' \
  --header 'Authorization: Bearer YOUR_TOKEN'
```

Filtered search:
```bash
curl --request GET \
  --url 'https://api.hubapi.com/cms/v3/site-search/search?q=marketing&type=BLOG_POST&domain=blog.hubspot.com&limit=10' \
  --header 'Authorization: Bearer YOUR_TOKEN'
```

With boosting:
```bash
curl --request GET \
  --url 'https://api.hubapi.com/cms/v3/site-search/search?q=marketing&boostRecent=10d&boostBlogPosts=1.5&limit=10' \
  --header 'Authorization: Bearer YOUR_TOKEN'
```

**Response (200):**
```json
{
  "total": 42,
  "results": [
    {
      "id": "184993428780",
      "type": "BLOG_POST",
      "title": "Marketing Strategies for 2024",
      "url": "https://blog.example.com/marketing-strategies-2024",
      "description": "Learn about the latest marketing strategies...",
      "language": "en",
      "domain": "blog.example.com",
      "publishedDate": "2024-01-15T00:00:00Z",
      "updatedDate": "2024-01-15T00:00:00Z",
      "authorName": "John Doe",
      "featuredImageUrl": "https://...",
      "featuredImageAltText": "Marketing image",
      "tagIds": [1, 2],
      "category": "Marketing",
      "contentGroupId": "12345"
    }
  ],
  "offset": 0,
  "limit": 10
}
```

### Result Object Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Content ID |
| `type` | string | Content type |
| `title` | string | Content title |
| `url` | string | Public URL |
| `description` | string | Meta description or summary |
| `language` | string | Language code |
| `domain` | string | Domain of the content |
| `publishedDate` | dateTime | Publication date |
| `updatedDate` | dateTime | Last update date |
| `authorName` | string | Author name (blog posts) |
| `featuredImageUrl` | string | Featured image URL |
| `featuredImageAltText` | string | Alt text for featured image |
| `tagIds` | array[integer] | Associated tag IDs (blog posts) |
| `category` | string | Category name |
| `contentGroupId` | string | Blog/content group ID |

---

### 2. Get Indexed Data for Asset

Retrieve indexed search data for a specific content asset.

**Endpoint:** `GET /cms/v3/site-search/indexed-data/{type}/{id}`

**Path Parameters:**
- `type` (string, required) - Content type: `BLOG_POST`, `SITE_PAGE`, `LANDING_PAGE`, `KNOWLEDGE_ARTICLE`, `LISTING_PAGE`
- `id` (string, required) - Content ID

**Example Request:**
```bash
curl --request GET \
  --url https://api.hubapi.com/cms/v3/site-search/indexed-data/BLOG_POST/184993428780 \
  --header 'Authorization: Bearer YOUR_TOKEN'
```

**Response (200):**
```json
{
  "id": "184993428780",
  "type": "BLOG_POST",
  "title": "Marketing Strategies for 2024",
  "url": "https://blog.example.com/marketing-strategies-2024",
  "description": "Learn about the latest marketing strategies...",
  "language": "en",
  "domain": "blog.example.com",
  "publishedDate": "2024-01-15T00:00:00Z",
  "updatedDate": "2024-01-15T00:00:00Z",
  "authorName": "John Doe",
  "featuredImageUrl": "https://...",
  "featuredImageAltText": "Marketing image",
  "tagIds": [1, 2],
  "category": "Marketing",
  "contentGroupId": "12345",
  "body": "Full indexed text content of the page..."
}
```

---

## Pagination

The Site Search API uses **offset-based pagination**:

1. First request: `offset=0` (or omit)
2. Response includes `offset` and `total`
3. Next page: `offset = previous_offset + limit`
4. Continue until `offset + results.length >= total`

**Example Pagination Flow:**
```
Request 1: ?q=marketing&limit=10&offset=0  → returns results 0-9
Request 2: ?q=marketing&limit=10&offset=10 → returns results 10-19
Request 3: ?q=marketing&limit=10&offset=20 → returns results 20-29
```

---

## Boosting Strategy

Boosting allows adjusting the relevance of search results:

- **`boostRecent`**: Boost content published recently. Useful for time-sensitive searches.
  - `boostRecent=7d` → boost content from last 7 days
  - `boostRecent=24h` → boost content from last 24 hours

- **`boost{Type}`**: Boost specific content types by a multiplier.
  - `boostBlogPosts=2.0` → blog posts ranked 2x higher
  - Values > 1.0 increase relevance, < 1.0 decrease it

---

## Validation Rules

- **Search:** `q` parameter is required
- **Indexed Data:** `type` must be a valid content type
- **limit:** Typical max is 100 results per page
- **boostRecent:** Must use valid time unit suffix (`ms`, `s`, `m`, `h`, `d`)

---

## Rate Limits

Standard HubSpot API rate limits apply (handled by RateLimiter).

---

## Notes

- Site search indexes content automatically when pages/posts are published
- Search results respect page visibility settings (private pages not returned)
- The `body` field in indexed data contains the full text content used for search indexing
- Multi-language content is indexed separately per language
- Search relevance is based on HubSpot's internal ranking algorithm
- Custom boosting can override default relevance scoring
- The API is read-only; content must be created/updated via Pages or Blog APIs
