import { HubSpotCredentials, HubSpotAPIError } from '../types/hubSpot';
import { RateLimiter } from './rateLimiter';

export class HubSpotClient {
  private credentials: HubSpotCredentials;
  private rateLimiter: RateLimiter;
  private baseURL = 'https://api.hubapi.com';

  constructor(credentials: HubSpotCredentials, rateLimiter: RateLimiter) {
    this.credentials = credentials;
    this.rateLimiter = rateLimiter;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    await this.rateLimiter.waitForSlot();

    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Authorization': `Bearer ${this.credentials.apiKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        });

      if (!response.ok) {
        const error: HubSpotAPIError = {
          status: response.status,
          message: response.statusText,
        };

        if (response.status === 429) {
          const retryAfter = response.headers.get('Retry-After');
          error.retryAfter = retryAfter ? parseInt(retryAfter, 10) : undefined;
          await this.rateLimiter.handleRateLimitError(error);
          return this.request(endpoint, options); // Retry
        }

        throw error;
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw {
          status: 500,
          message: error.message,
        } as HubSpotAPIError;
      }
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}
