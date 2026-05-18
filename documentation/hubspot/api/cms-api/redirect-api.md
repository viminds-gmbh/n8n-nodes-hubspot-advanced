# HubSpot URL Redirects API (CMS)

Manage URL redirects via the HubSpot CMS URL Redirects API v3. Supports CRUD operations with flexible matching options.

## Base URL

```
https://api.hubapi.com/cms/v3/url-redirects
```

## Authentication

Bearer token via private app or OAuth.

**Header:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

## Redirect Object Model

```json
{
  "id": "3212223134",
  "createdAt": "2017-07-24T17:24:09.141Z",
  "updatedAt": "2017-07-24T17:24:09.141Z",
  "routePrefix": "http://test.hs-sites.com/(?P<page_slug>.*)",
  "destination": "http://www.example.online/{page_slug}",
  "redirectStyle": 301,
  "isMatchFullUrl": true,
  "isMatchQueryString": true,
  "isOnlyAfterNotFound": false,
  "isPattern": true,
  "isProtocolRelative": false,
  "isTrailingSlashOptional": false,
  "precedence": 0
}
```

### Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique redirect identifier |
| `createdAt` | dateTime | Creation timestamp |
| `updatedAt` | dateTime | Last update timestamp |
| `routePrefix` | string | The incoming URL, path, or pattern to match |
| `destination` | string | The target URL to redirect to |
| `redirectStyle` | integer | HTTP redirect type |
| `isMatchFullUrl` | boolean | Match entire URL including domain |
| `isMatchQueryString` | boolean | Match query string parameters |
| `isOnlyAfterNotFound` | boolean | Only redirect after 404 |
| `isPattern` | boolean | Treat `routePrefix` as regex pattern |
| `isProtocolRelative` | boolean | Match regardless of http/https |
| `isTrailingSlashOptional` | boolean | Make trailing slash optional in match |
| `precedence` | integer | Priority when multiple redirects match |

---

## Redirect Styles

| Value | HTTP Code | Description |
|-------|-----------|-------------|
| `301` | 301 Moved Permanently | Permanent redirect |
| `302` | 302 Found | Temporary redirect |
| `305` | 305 Use Proxy | Proxy redirect |

---

## Endpoints

### 1. List Redirects

Retrieve all URL redirects with filtering, sorting, and pagination.

**Endpoint:** `GET /cms/v3/url-redirects`

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `limit` | integer | No | 10 | Max results per page |
| `offset` | integer | No | 0 | Pagination offset |
| `sort` | string | No | `-updatedAt` | Sort field, prefix `-` for descending |
| `routePrefix__contains` | string | No | - | Filter by route prefix (partial match) |
| `destination__contains` | string | No | - | Filter by destination (partial match) |
| `redirectStyle` | integer | No | - | Filter by redirect style (301, 302, 305) |
| `createdAt` | dateTime | No | - | Exact creation time |
| `createdAfter` | dateTime | No | - | Created after |
| `createdBefore` | dateTime | No | - | Created before |
| `updatedAt` | dateTime | No | - | Exact update time |
| `updatedAfter` | dateTime | No | - | Updated after |
| `updatedBefore` | dateTime | No | - | Updated before |

**Sortable Fields:** `createdAt`, `updatedAt`, `routePrefix`, `destination`

**Example Request:**
```bash
curl --request GET \
  --url 'https://api.hubapi.com/cms/v3/url-redirects?limit=50&sort=-updatedAt' \
  --header 'Authorization: Bearer YOUR_TOKEN'
```

**Response (200):**
```json
{
  "total": 25,
  "results": [ /* redirect objects */ ]
}
```

---

### 2. Get Single Redirect

**Endpoint:** `GET /cms/v3/url-redirects/{urlRedirectId}`

**Path Parameters:**
- `urlRedirectId` (string, required) - The ID of the redirect

**Response (200):** Single redirect object

---

### 3. Create Redirect

**Endpoint:** `POST /cms/v3/url-redirects/`

**Request Body (JSON):**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `routePrefix` | string | ✅ | Incoming URL, path, or pattern to match |
| `destination` | string | ✅ | Target URL to redirect to |
| `redirectStyle` | integer | ✅ | Redirect type: `301`, `302`, or `305` |
| `isMatchFullUrl` | boolean | No | Match entire URL including domain (default: false) |
| `isMatchQueryString` | boolean | No | Match query string parameters (default: false) |
| `isOnlyAfterNotFound` | boolean | No | Only redirect after 404 (default: false) |
| `isPattern` | boolean | No | Treat routePrefix as regex pattern (default: false) |
| `isProtocolRelative` | boolean | No | Match regardless of http/https (default: false) |
| `isTrailingSlashOptional` | boolean | No | Make trailing slash optional (default: false) |
| `precedence` | integer | No | Priority when multiple redirects match (default: 0) |

**Example Request:**
```bash
curl --request POST \
  --url https://api.hubapi.com/cms/v3/url-redirects/ \
  --header 'Authorization: Bearer YOUR_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
    "routePrefix": "/old-page",
    "destination": "/new-page",
    "redirectStyle": 301,
    "isTrailingSlashOptional": true
  }'
```

**Example with Regex Pattern:**
```bash
curl --request POST \
  --url https://api.hubapi.com/cms/v3/url-redirects/ \
  --header 'Authorization: Bearer YOUR_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
    "routePrefix": "http://test.hs-sites.com/(?P<page_slug>.*)",
    "destination": "http://www.example.online/{page_slug}",
    "redirectStyle": 301,
    "isMatchFullUrl": true,
    "isPattern": true
  }'
```

**Response (201):** Created redirect object

---

### 4. Update Redirect

Update an existing URL redirect. All fields are optional; only include fields to change.

**Endpoint:** `PATCH /cms/v3/url-redirects/{urlRedirectId}`

**Path Parameters:**
- `urlRedirectId` (string, required) - The ID of the redirect

**Request Body (JSON):** Same fields as Create, all optional.

**Example Request:**
```bash
curl --request PATCH \
  --url https://api.hubapi.com/cms/v3/url-redirects/3212223134 \
  --header 'Authorization: Bearer YOUR_TOKEN' \
  --header 'Content-Type: application/json' \
  --data '{
    "destination": "/updated-page",
    "redirectStyle": 302
  }'
```

**Response (200):** Updated redirect object

---

### 5. Delete Redirect

**Endpoint:** `DELETE /cms/v3/url-redirects/{urlRedirectId}`

**Path Parameters:**
- `urlRedirectId` (string, required) - The ID of the redirect

**Example Request:**
```bash
curl --request DELETE \
  --url https://api.hubapi.com/cms/v3/url-redirects/3212223134 \
  --header 'Authorization: Bearer YOUR_TOKEN'
```

**Response (204):** No content

---

### 6. Batch Delete Redirects

**Endpoint:** `POST /cms/v3/url-redirects/batch/archive`

**Request Body:**
```json
{
  "inputs": ["redirectId1", "redirectId2"]
}
```

**Response (204):** No content

---

## Validation Rules

- **Create:** `routePrefix`, `destination`, and `redirectStyle` are required
- **Update:** At least one field must be provided
- **redirectStyle:** Must be one of `301`, `302`, or `305`
- **routePrefix:** Must be a valid URL path or pattern
- **destination:** Must be a valid URL or path
- **Regex patterns:** Use Python-style named groups `(?P<name>.*)` referenced as `{name}` in destination

---

## Pattern Matching (Regex)

When `isPattern` is `true`, `routePrefix` supports Python-style regex with named capture groups:

```
routePrefix: "/blog/(?P<year>\d{4})/(?P<slug>.*)"
destination: "/posts/{year}/{slug}"
```

This would redirect `/blog/2024/my-post` to `/posts/2024/my-post`.

---

## Rate Limits

Standard HubSpot API rate limits apply (handled by RateLimiter).

---

## Notes

- Redirects are evaluated in order of `precedence` (higher = evaluated first)
- `isOnlyAfterNotFound` makes the redirect only trigger when the original URL returns 404
- `isTrailingSlashOptional` makes `/page` and `/page/` both match
- `isProtocolRelative` matches both `http://` and `https://` variants
- `isMatchQueryString` includes query parameters in the match logic
- Redirects are applied at the HubSpot CDN/edge level for optimal performance
