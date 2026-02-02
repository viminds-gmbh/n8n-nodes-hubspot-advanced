# Viminds n8n Custom Nodes

Custom n8n nodes for HubSpot integration and custom triggers, built with TDD approach.

## Packages

### n8n-nodes-viminds-common
Common utilities and types shared across all Viminds nodes.

### n8n-nodes-viminds-hubspot
HubSpot-specific nodes:
- Get Deal Associations
- Upload File

### n8n-nodes-viminds-triggers
Trigger nodes for event-based workflows:
- HubSpot Trigger

## Development

### Prerequisites
- Node.js >= 18
- pnpm >= 8

### Setup
```bash
pnpm install
```

### Development
```bash
# Watch mode for development
pnpm dev

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Lint code
pnpm lint

# Fix linting issues
pnpm lint:fix

# Build for production
pnpm build
```

## Testing

Tests are written using Jest with 80% minimum coverage.

```bash
# Run all tests
pnpm test

# Run tests for specific package
pnpm --filter n8n-nodes-viminds-hubspot test
```

## Deployment

### Local Development
Use `npm link` for local development:
```bash
pnpm build
cd packages/n8n-nodes-viminds-hubspot
npm link
```

### Docker Deployment
Docker image can be built and deployed to Hetzner:
```bash
docker build -t viminds/n8n-custom-nodes .
docker push viminds/n8n-custom-nodes
```

## CI/CD

Bitbucket Pipelines are configured for:
- Linting
- Testing with coverage
- Building
- Releasing

## HubSpot API

All nodes use API Key authentication with built-in rate limiting.

### Rate Limits
- Burst limit: 100 requests per 10 seconds
- Automatic retry with exponential backoff
- Error handling for 429 responses

## License

MIT
