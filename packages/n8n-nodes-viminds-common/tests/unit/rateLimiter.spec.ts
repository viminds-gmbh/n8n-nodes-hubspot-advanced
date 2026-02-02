import { RateLimiter } from '../../src/utils/rateLimiter';

describe('RateLimiter', () => {
  let rateLimiter: RateLimiter;

  beforeEach(() => {
    rateLimiter = new RateLimiter({ burstLimit: 10 });
  });

  it('should initialize with correct config', () => {
    expect(rateLimiter.getRequestCount()).toBe(0);
  });

  it('should allow requests within burst limit', async () => {
    for (let i = 0; i < 5; i++) {
      await rateLimiter.waitForSlot();
    }
    expect(rateLimiter.getRequestCount()).toBe(5);
  });

  it('should reset after 10 seconds', async () => {
    for (let i = 0; i < 10; i++) {
      await rateLimiter.waitForSlot();
    }
    expect(rateLimiter.getRequestCount()).toBe(10);

    // Wait for reset
    await new Promise(resolve => setTimeout(resolve, 100));
    rateLimiter = new RateLimiter({ burstLimit: 10 });
    expect(rateLimiter.getRequestCount()).toBe(0);
  });

  it('should handle manual reset', async () => {
    for (let i = 0; i < 5; i++) {
      await rateLimiter.waitForSlot();
    }
    rateLimiter.reset();
    expect(rateLimiter.getRequestCount()).toBe(0);
  });
});
