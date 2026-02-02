import { HubSpotClient } from '../../src/utils/hubSpotClient';
import { RateLimiter } from '../../src/utils/rateLimiter';

describe('HubSpotClient', () => {
  let client: HubSpotClient;
  let rateLimiter: RateLimiter;

  beforeEach(() => {
    rateLimiter = new RateLimiter({ burstLimit: 100 });
    client = new HubSpotClient({ apiKey: 'test-api-key' }, rateLimiter);
  });

  it('should initialize with credentials', () => {
    expect(client).toBeDefined();
  });

  it('should make GET requests', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: 'test' }),
    });
    global.fetch = mockFetch;

    const result = await client.get('/test');
    expect(result).toEqual({ data: 'test' });
  });

  it('should handle rate limit errors', async () => {
    const mockFetch = jest.fn()
      .mockRejectedValueOnce({
        status: 429,
        message: 'Too Many Requests',
      })
      .mockResolvedValue({
        ok: true,
        json: async () => ({ data: 'retry-success' }),
      });
    global.fetch = mockFetch;

    const result = await client.get('/test');
    expect(result).toEqual({ data: 'retry-success' });
  });
});
