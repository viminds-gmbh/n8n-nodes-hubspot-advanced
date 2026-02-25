# n8n-nodes-hubspot-advanced

[![npm version](https://badge.fury.io/js/n8n-nodes-hubspot-advanced.svg)](https://www.npmjs.com/package/n8n-nodes-hubspot-advanced)
[![Test](https://github.com/yourusername/n8n-nodes-hubspot-advanced/actions/workflows/test.yml/badge.svg)](https://github.com/yourusername/n8n-nodes-hubspot-advanced/actions/workflows/test.yml)

Advanced HubSpot nodes for n8n with intelligent rate limiting, batch operations, and association hydration.

## Features

- ✅ **Intelligent Rate Limiting** – Respects HubSpot API limits with adaptive throttling
- ✅ **Batch Operations** – Efficient bulk reads using HubSpot's batch APIs
- ✅ **Association Hydration** – Fetch full associated objects in a single workflow step
- ✅ **Multi-API Version Support** – v1, v3, v3-legacy, and v4 endpoints
- ✅ **Type-Safe** – Full TypeScript implementation
- ✅ **Test-Driven** – Comprehensive test coverage

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
- Get many objects (batch)
- Search with filters and sorting
- Create object
- Update object
- Delete object

**Key Features:**
- Custom property selection
- Advanced filtering (EQ, NEQ, LT, GT, CONTAINS, etc.)
- Sorting by any property
- Auto-pagination for large result sets

**Example Workflow:**
```
[HubSpot CRM]
  Operation: Search
  Object Type: Contacts
  Filters: email CONTAINS "@acme.com"
  Properties: firstname,lastname,email,company
  Sort: createdate DESC
  Limit: 100
```

### 2. HubSpot Associations

Read and enrich object associations with optional hydration.

**Operations:**
- Get Associations (IDs only)
- **Hydrate Associations** (full objects) ⭐
- Create Association
- Delete Association

**Hydrate Example:**
```
[HubSpot CRM: Search Contacts] → 500 contacts
        ↓
[HubSpot Associations: Hydrate]
  From: contacts
  To: companies
  Properties: name,domain,industry
        ↓
Output: 500 contacts with full company objects embedded
API Calls: ~4 (instead of 500!)
```

### 3. HubSpot Forms

Work with HubSpot forms and submissions.

**Operations:**
- Get Forms (v3)
- Get Submissions (v1 API)
- Submit Form (v3-legacy)

### 4. HubSpot Object Schema

Retrieve metadata about object types and properties.

**Operations:**
- Get Object Types
- Get Properties for an object type

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
│   └── HubSpotObjectSchema/     # Schema metadata
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
| Submit Form | v3-legacy | HubSpot Forms |
| Object Schema | v3 | HubSpot Object Schema |

## Roadmap

- [x] Response-based Rate Limiting mit globalThis-Singleton
- [x] 429-Handling mit Exponential Backoff + Jitter
- [x] Retry-After Header Support
- [x] Comprehensive Test Suite (23 Tests)
- [ ] OAuth2 support
- [ ] Webhook triggers
- [ ] Custom object support
- [ ] Association labels
- [ ] Batch operations UI
- [ ] Advanced filtering
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
