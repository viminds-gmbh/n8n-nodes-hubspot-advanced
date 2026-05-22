# n8n-nodes-hubspot-advanced

[![npm version](https://badge.fury.io/js/n8n-nodes-hubspot-advanced.svg)](https://www.npmjs.com/package/n8n-nodes-hubspot-advanced)
[![Changelog](https://img.shields.io/badge/changelog-VERSIONS.md-blue)](./VERSIONS.md)

Advanced HubSpot nodes for n8n with intelligent rate limiting, batch operations, association hydration, file management, and list operations.

📋 **[View detailed version history](./VERSIONS.md)**

## Features

- ✅ **Intelligent Rate Limiting** – Respects HubSpot API limits with adaptive throttling
- ✅ **Automatic Pagination** – ReturnAll option across all nodes for effortless large dataset retrieval
- ✅ **Batch Operations** – Efficient bulk create, update, delete, read, and association hydration using HubSpot's batch APIs
- ✅ **Field-Name Mapping** – User-friendly property mapping for batch operations with dropdown selection
- ✅ **Association Hydration** – Fetch full associated objects in a single workflow step with batch support
- ✅ **Association Labels** – Create associations with custom labels during object creation
- ✅ **Multi-API Version Support** – v1, v3, v3-legacy, and v4 endpoints
- ✅ **Type-Safe** – Full TypeScript implementation with improved type safety (74% reduction in `any` types)
- ✅ **Modular Architecture** – Clean separation of concerns with dedicated field descriptions and operations
- ✅ **Test-Driven** – Comprehensive test coverage
- ✅ **File Management** – Upload, replace, update properties, and search files in HubSpot File Manager
- ✅ **List Operations** – Retrieve list members efficiently with object type filtering
- ✅ **Marketing Events** – Create, manage, and track marketing events with participant registration
- ✅ **HubDB Operations** – Manage HubDB tables and rows with full CRUD support and publication control
- ✅ **Dynamic Property Loading** – Enhanced property selection with real-time options
- ✅ **Association Label Support** – Filter and manage associations with custom labels using AND/OR logic
- ✅ **Field Validation** – Comprehensive validation with helpful error messages and hints

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** → **Community Nodes**
3. Search for `n8n-nodes-hubspot-advanced`
4. Click **Install**

### Manual Installation

```bash
npm install n8n-nodes-hubspot-advanced
```

For self-hosted n8n, add to your `package.json` and rebuild.

## Nodes

### 1. HubSpot CRM

Advanced CRM operations with search, filtering, and batch support.

**Operations:**
- Get single object
- Get many objects (batch read)
- Search with filters and sorting
- Create object
- Update object
- Delete object
- **Batch Create** (bulk object creation) ⭐ NEW
- **Batch Update** (bulk object updates) ⭐ NEW
- **Batch Delete** (bulk object deletion) ⭐ NEW

**Key Features:**
- Custom property selection
- Advanced filtering (EQ, NEQ, LT, GT, BETWEEN, CONTAINS, IN, NOT_IN, HAS_PROPERTY, NOT_HAS_PROPERTY, etc.)
- **Flexible IN/NOT_IN operators** - accepts semicolon-separated strings or array expressions
- **BETWEEN operator** with dedicated high value field
- Sorting by any property
- **ReturnAll option** for automatic pagination of large result sets
- **Association labels** support during object creation
- **Batch operations** with field-name mapping for efficient bulk processing (up to 100 items per API call)

**Example Workflow:**
```
[HubSpot CRM: Search]
  Operation: Search
  Object Type: Contacts
  Filters: 
    - email CONTAINS "@acme.com"
    - lifecyclestage IN "lead;customer;opportunity"  // semicolon-separated
    - email IN {{ $json.emails }}                    // or array expression
    - amount BETWEEN 1000 and 5000                   // range filter
  Properties: firstname,lastname,email,company
  Sort: createdate DESC
  Limit: 100
```

**Batch Create Example:**
```
[Input: 100 deals from CSV] → [
  { "name": "Deal 1", "value": "1000", "stage": "qualified" },
  { "name": "Deal 2", "value": "2000", "stage": "proposal" },
  ...
]
        ↓
[HubSpot CRM: Batch Create]
  Object Type: deals
  Property Mappings:
    - HubSpot Property: "dealname" → Input Field: "name"
    - HubSpot Property: "amount" → Input Field: "value"
    - HubSpot Property: "dealstage" → Input Field: "stage"
        ↓
Output: 100 created deals
API Calls: 1 (instead of 100!)
```

**Batch Update Example:**
```
[Input: 50 contacts to update]
        ↓
[HubSpot CRM: Batch Update]
  Object Type: contacts
  ID Field: "contact_id"
  Property Mappings:
    - HubSpot Property: "firstname" → Input Field: "new_firstname"
    - HubSpot Property: "lastname" → Input Field: "new_lastname"
        ↓
Output: 50 updated contacts
API Calls: 1 (instead of 50!)
```

### 2. HubSpot Associations

Read and enrich object associations with optional hydration and batch operations.

**Operations:**
- Get Associations (IDs only)
- **Hydrate Associations** (full objects) ⭐
- **Batch Get Associations** (bulk ID retrieval) ⭐ NEW
- **Batch Hydrate Associations** (bulk full objects) ⭐ NEW
- Create Association
- Delete Association

**Key Features:**
- Efficient batch processing for multiple source objects
- Automatic chunking and pagination
- Full object hydration with custom property selection
- Support for all HubSpot object types including custom objects

**Batch Hydrate Example:**
```
[HubSpot CRM: Search Contacts] → 500 contacts
        ↓
[HubSpot Associations: Batch Hydrate]
  From: contacts
  To: companies
  Properties: name,domain,industry
        ↓
Output: 500 contacts with full company objects embedded
API Calls: ~4 (instead of 500!)
```

### 3. HubSpot Forms

Work with HubSpot forms and submissions with advanced field mapping, automatic pagination, and GDPR compliance.

**Operations:**
- Get Forms (v3)
- **Get Submissions (v1 API)** ⭐ with automatic pagination
- **Submit Form (v3-legacy)** ⭐

**Key Features:**
- **Automatic pagination** for form submissions with returnAll option
- Multi-object field support (contacts, companies, deals, custom objects)
- GDPR consent and subscription management
- Secure and unsecure endpoint options
- Context tracking (page URI, HUTK, IP address)
- Dynamic subscription type loading
- Dedicated API handler (doesn't impact rate limits of other nodes)
- Efficient batch retrieval (50 submissions per API call)

**Get Submissions Example:**
```
[HubSpot Forms: Get Submissions]
  Form: Contact Form
  Return All: ✓ (automatically fetches all submissions)
  → Retrieves all submissions with automatic pagination
  → Internal: 50 submissions per API call
```

**Submit Form Example:**
```
[HubSpot Forms: Submit Form]
  Form: Contact Form
  Email: john@example.com
  Additional Fields:
    - Contact: firstname = John
    - Contact: lastname = Doe
    - Company: name = Acme Corp
  Consent & Subscriptions:
    - Marketing Emails: ✓ Opted In
    - Newsletter: ✓ Opted In
  Endpoint: Secure (recommended)
```

### 4. HubSpot Object Schema

Retrieve metadata about object types and properties.

**Operations:**
- Get Custom Object Types
- **Get Object Schema** (full schema including properties) ⭐
- Get Properties for an object type

**Key Features:**
- Retrieve complete object schemas with all properties
- Support for both standard and custom objects
- Dynamic property metadata loading

### 5. HubSpot Files

Work with HubSpot File Manager for uploading, replacing, updating, and searching files.

**Operations:**
- Upload File
- Replace File
- **Update Properties** (name, access, parent folder) ⭐
- Search Files
- Import from URL
- Get File
- Delete File

**Key Features:**
- **ReturnAll option** for file searches with automatic pagination
- Multipart form-data support for uploads
- File metadata updates without re-uploading
- Folder path and extension filtering for searches
- Dynamic property selection
- Async URL import support

### 6. HubSpot Lists

Manage HubSpot lists with full CRUD, member retrieval, and search capabilities.

**Operations:**
- Get List Members
- Get Lists (fetch multiple by ILS list ID)
- Search Lists (search by name with pagination)
- Create List
- Update List Name
- Delete List
- Add Member / Add Many Members
- Remove Member / Remove Many Members
- Create Folder / Get Folders / Delete Folder

**Key Features:**
- **ReturnAll option** for automatic pagination on list members and search
- **Object type filtering** for list operations
- **Offset-based pagination** for list search (up to 500 per page)
- **Processing type filtering** in search (Manual, Snapshot, Dynamic)
- **includeFilters option** when fetching lists to retrieve filter branch definitions
- Batch retrieval for large lists
- Folder management for organizing lists

### 7. HubSpot Marketing Events

Create and manage marketing events with participant tracking.

**Event Operations:**
- Get single event
- Create or Update event (upsert)
- Search/list all events
- Update event
- Delete event
- Get participants with filtering
- Get participation statistics

**Contact Operations:**
- Register contacts for events
- Mark contacts as attended
- Cancel contact registration

**List Operations:**
- Get associated lists for an event
- Associate a list with an event
- Disassociate a list from an event

**Key Features:**
- Support for both contact ID and email identification
- Custom property management
- Participant state filtering (registered, attended, cancelled)
- Automatic pagination for large participant lists
- Dynamic property loading from HubSpot schema

**Example Workflow:**
```
[HubSpot Marketing Events: Create]
  Event Name: Product Launch Webinar 2024
  Event Organizer: Marketing Team
  External Event ID: webinar-2024-q1
  Start Date: 2024-03-15T14:00:00Z
  Event Type: WEBINAR
        ↓
[HubSpot Marketing Events: Register]
  Event: Product Launch Webinar 2024
  Identifier Type: Email
  Email: john@example.com
        ↓
[HubSpot Marketing Events: Get Participants]
  Filter: State = REGISTERED
```

### 8. HubSpot HubDB

Manage HubDB tables and rows for dynamic content storage and retrieval.

**Table Operations:**
- Get single table (by ID or name)
- Get all tables
- Create table
- Update table
- Delete table
- Publish table
- Unpublish table (revert to draft)

**Row Operations:**
- Get single row
- Get all rows (with filtering and sorting)
- Create row
- Update row
- Delete row
- Batch create rows
- Batch update rows
- Batch delete rows
- Batch read rows

**Key Features:**
- Publication status display in table selection
- Draft endpoint support for table management
- Automatic pagination for large datasets
- Batch operations for efficient bulk processing
- Column filtering and sorting
- Dynamic table and column selection

**Example Workflow:**
```
[HubSpot HubDB: Get Table]
  Table: Product Catalog
  → Returns table schema and metadata
        ↓
[HubSpot HubDB: Get Rows]
  Table: Product Catalog
  Return All: ✓
  Filters: category = "electronics"
  Sort: price ASC
  → Returns all matching rows with automatic pagination
```

## Rate Limiting

**Adaptive, response-based rate limiting** – works reliably even in n8n Queue Mode with multiple workers.

### How it works:

1. **No pre-counting** – doesn't track requests locally (unreliable in multi-worker setups)
2. **Response-header-based** – reads `X-HubSpot-RateLimit-*` headers from every response
3. **Adaptive throttling** – automatically slows down when `Remaining` gets low
4. **429 handling** – exponential backoff + jitter + Retry-After header support
5. **Global coordination** – all nodes in the same worker process share pause state via `globalThis` singleton
6. **Concurrent-safe** – when 11 requests hit simultaneously, they queue up cleanly

### What happens when you hit limits:

```
Request 1-10: ✅ Success (remaining: 90)
Request 11:   ❌ 429 Rate Limited
  → All nodes pause for 10s (exponential backoff)
  → Retry automatically (up to 5 attempts)
  → Success on retry
```

**No configuration needed** – the limiter adapts automatically to your HubSpot tier.

## Authentication

Uses existing n8n HubSpot credentials:

1. **App Token** (recommended for private apps)
   - Create a private app in HubSpot
   - Copy the access token
   - Add as credential in n8n

2. **OAuth2** (for public apps)
   - Configure OAuth app in HubSpot
   - Use n8n's OAuth2 flow

## Development

### Setup

```bash
git clone https://github.com/yourusername/n8n-nodes-hubspot-advanced.git
cd n8n-nodes-hubspot-advanced
npm install
```

### Scripts

```bash
npm run dev              # Watch mode (TypeScript)
npm run build            # Build for production
npm test                 # Run tests
npm run test:watch       # Test watch mode
npm run test:coverage    # Coverage report
npm run lint             # Lint code
npm run lint:fix         # Fix linting issues
```

### Lokales Testen in n8n

**Quick Start:**

```bash
# 1. Package bauen und verlinken
npm run build
npm link

# 2. In n8n verlinken
mkdir -p ~/.n8n/nodes
cd ~/.n8n/nodes
npm init -y
npm link n8n-nodes-hubspot-advanced

# 3. n8n starten
n8n start
```

**Bei Änderungen:**

```bash
# Rebuild
npm run build

# n8n neu starten (Strg+C, dann:)
n8n start
```

**Detaillierte Anleitung:** Siehe `.windsurf/workflows/local-testing.md`

### Testing Rate Limiter

Um das Rate Limiting zu testen:

1. Erstelle einen Workflow mit 11+ parallelen HubSpot-Requests
2. Verwende einen Free-Tier HubSpot Account (100 req/10s)
3. Beobachte die Logs für Backoff-Meldungen
4. Erwartetes Verhalten:
   - Requests 1-10: Sofort durchgelassen
   - Request 11+: Pause → Retry → Erfolg

### Project Structure

```
src/
├── nodes/
│   ├── HubSpotCrm/              # Main CRM node
│   ├── HubSpotAssociations/     # Associations with hydration
│   ├── HubSpotForms/            # Forms API
│   ├── HubSpotObjectSchema/     # Schema metadata
│   ├── HubSpotFiles/            # File Manager operations
│   ├── HubSpotLists/            # List member retrieval
│   ├── HubSpotMarketingEvents/  # Marketing events and participants
│   └── HubSpotHubDb/            # HubDB tables and rows
├── transport/
│   ├── RateLimiter.ts           # Adaptive rate limiting
│   └── HubSpotApiRequest.ts     # API wrapper
└── types.ts                     # Shared TypeScript types

tests/
├── unit/                        # Unit tests
├── integration/                 # Integration tests
└── fixtures/                    # Test data
```

## API Version Support

| Feature | API Version | Node |
|---|---|---|
| CRM Objects (CRUD) | v3 | HubSpot CRM |
| Search | v3 | HubSpot CRM |
| Associations | v4 | HubSpot Associations |
| Batch Read | v3 | All nodes |
| Forms List | v3 | HubSpot Forms |
| Form Submissions | v1 (legacy) | HubSpot Forms |
| Submit Form | v3-legacy (api.hsforms.com) | HubSpot Forms |
| Object Schema | v3 | HubSpot Object Schema |
| File Upload | v3 | HubSpot Files |
| File Replace | v3 | HubSpot Files |
| File Search | v3 | HubSpot Files |
| List Members | v3 | HubSpot Lists |
| Marketing Events (CRUD) | v3 | HubSpot Marketing Events |
| Event Participants | v3 | HubSpot Marketing Events |
| Contact Registration | v3 | HubSpot Marketing Events |
| HubDB Tables (CRUD) | v3 | HubSpot HubDB |
| HubDB Rows (CRUD) | v3 | HubSpot HubDB |
| HubDB Batch Operations | v3 | HubSpot HubDB |

## Roadmap

- [x] Response-based Rate Limiting mit globalThis-Singleton
- [x] 429-Handling mit Exponential Backoff + Jitter
- [x] Retry-After Header Support
- [x] Comprehensive Test Suite (23 Tests)
- [x] Forms API v3 with multi-object support
- [x] GDPR consent and subscription management
- [x] Dedicated form submission handler (rate-limit isolated)
- [x] Custom object support (in Forms and CRM)
- [x] Batch association operations (Get & Hydrate)
- [x] TypeScript type safety improvements (74% reduction in `any` types)
- [x] Modular architecture with separated field descriptions
- [x] File property updates without re-upload
- [x] Association labels during object creation
- [x] Automatic pagination with returnAll across all nodes
- [x] Object schema retrieval
- [x] List filtering by object type
- [x] Form submissions pagination (API v1)
- [x] Batch Create, Update, Delete operations for CRM objects
- [x] Field-name mapping for batch operations
- [x] Extended search filter operators (IN, NOT_IN, HAS_PROPERTY, NOT_HAS_PROPERTY, BETWEEN)
- [x] Flexible values input for IN/NOT_IN (semicolon-separated or array expressions)
- [x] Conditional UI fields for filter operators
- [x] HubDB node with table and row operations
- [x] Association label filtering with AND/OR modes
- [x] Multiple association labels support in create/delete operations
- [x] GetAssociationLabelDefinitions operation
- [x] Comprehensive field validation with helpful error messages
- [x] Automatic batching for large IN/NOT_IN filter values
- [ ] OAuth2 support
- [ ] Webhook triggers
- [ ] Advanced filtering UI
- [ ] Workflow enrollment
- [ ] Property history retrieval

## Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests for your changes
4. Ensure tests pass (`pnpm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

MIT

## Support

- [GitHub Issues](https://github.com/yourusername/n8n-nodes-hubspot-advanced/issues)
- [n8n Community](https://community.n8n.io/)
- [HubSpot API Docs](https://developers.hubspot.com/docs/api/overview)

## Credits

Built with ❤️ for the n8n community.

---

**Note:** This is a community node. It is not officially maintained by n8n or HubSpot.
