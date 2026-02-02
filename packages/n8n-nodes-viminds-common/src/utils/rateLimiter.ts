import { HubSpotRateLimitConfig, HubSpotAPIError } from '../types/hubSpot';

export class RateLimiter {
  private requestCount: number = 0;
  private lastResetTime: number = Date.now();
  private config: HubSpotRateLimitConfig;

  constructor(config: HubSpotRateLimitConfig) {
    this.config = config;
  }

  async waitForSlot(): Promise<void> {
    const now = Date.now();
    const timeSinceLastReset = now - this.lastResetTime;

    // Reset counter every 10 seconds (burst limit window)
    if (timeSinceLastReset >= 10000) {
      this.requestCount = 0;
      this.lastResetTime = now;
    }

    // If we've hit the burst limit, wait
    if (this.requestCount >= this.config.burstLimit) {
      const waitTime = 10000 - timeSinceLastReset;
      await this.sleep(waitTime);
      this.requestCount = 0;
      this.lastResetTime = Date.now();
    }

    this.requestCount++;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async handleRateLimitError(error: HubSpotAPIError): Promise<void> {
    if (error.status === 429) {
      const retryAfter = error.retryAfter || 5; // Default 5 seconds
      await this.sleep(retryAfter * 1000);
    }
  }

  getRequestCount(): number {
    return this.requestCount;
  }

  reset(): void {
    this.requestCount = 0;
    this.lastResetTime = Date.now();
  }
}
