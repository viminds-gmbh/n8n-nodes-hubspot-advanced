const GLOBAL_KEY = Symbol.for('__hubspot_rate_limiter__');

/**
 * Adaptive, response-based rate limiter for HubSpot API.
 *
 * Design principles:
 * - Does NOT pre-count requests (unreliable in multi-worker / queue mode)
 * - Relies on actual HubSpot response headers to detect pressure
 * - Handles 429 errors with exponential backoff + jitter + Retry-After
 * - Uses globalThis singleton so all nodes in one process share the same pause state
 * - Safe for concurrent execution: when multiple requests hit 429 simultaneously,
 *   they coordinate through a shared "paused until" timestamp
 */
export class HubSpotRateLimiter {
	/** Shared timestamp (ms) until which all requests must wait */
	private pausedUntil = 0;

	/** How many consecutive 429s we've seen (for escalating backoff) */
	private consecutive429Count = 0;

	/** Minimum delay between requests in ms (adaptive, starts at 0) */
	private minDelayMs = 0;

	/** Timestamp of the last request we dispatched */
	private lastRequestAt = 0;

	/** Lock promise to serialize request dispatching under pressure */
	private dispatchLock: Promise<void> = Promise.resolve();

	/**
	 * Returns the global singleton instance.
	 * All nodes in the same n8n worker process share this.
	 */
	static getInstance(): HubSpotRateLimiter {
		const g = globalThis as typeof globalThis & { [GLOBAL_KEY]?: HubSpotRateLimiter };
		if (!g[GLOBAL_KEY]) {
			g[GLOBAL_KEY] = new HubSpotRateLimiter();
		}
		return g[GLOBAL_KEY];
	}

	/**
	 * Execute an API call with adaptive rate limiting.
	 *
	 * 1. Wait if we're in a global pause (from a recent 429)
	 * 2. Enforce minimum inter-request delay (adapted from headers)
	 * 3. Execute the request
	 * 4. On success: read headers, adapt delay, reset 429 counter
	 * 5. On 429: calculate backoff, set global pause, retry
	 */
	async execute<T>(
		fn: () => Promise<{ data: T; headers?: Record<string, string> }>,
		maxRetries = 5,
	): Promise<T> {
		let lastError: Error | unknown;

		for (let attempt = 0; attempt <= maxRetries; attempt++) {
			try {
				await this.waitForClearance();

				const result = await fn();

				if (result.headers) {
					this.adaptFromHeaders(result.headers);
				}

				this.consecutive429Count = 0;
				return result.data;
			} catch (error: unknown) {
				lastError = error;

				if (this.is429(error)) {
					this.consecutive429Count++;

					const retryAfterMs = this.calculateBackoff(error, attempt);

					this.setPause(retryAfterMs);

					if (attempt < maxRetries) {
						continue;
					}
				} else {
					throw error;
				}
			}
		}

		const errorMessage = lastError instanceof Error ? lastError.message : String(lastError);
		throw new Error(`HubSpot rate limit: max retries (${maxRetries}) exceeded. Last error: ${errorMessage}`);
	}

	/**
	 * Wait until the global pause window has passed,
	 * then enforce the adaptive minimum delay between requests.
	 * Uses a serialized dispatch lock so concurrent callers queue up.
	 */
	private async waitForClearance(): Promise<void> {
		this.dispatchLock = this.dispatchLock.then(async () => {
			const now = Date.now();

			if (this.pausedUntil > now) {
				await this.sleep(this.pausedUntil - now);
			}

			if (this.minDelayMs > 0) {
				const elapsed = Date.now() - this.lastRequestAt;
				if (elapsed < this.minDelayMs) {
					await this.sleep(this.minDelayMs - elapsed);
				}
			}

			this.lastRequestAt = Date.now();
		});

		return this.dispatchLock;
	}

	/**
	 * Set a global pause that affects ALL concurrent requests.
	 * If another request already set a longer pause, we keep the longer one.
	 */
	private setPause(durationMs: number): void {
		const pauseEnd = Date.now() + durationMs;
		if (pauseEnd > this.pausedUntil) {
			this.pausedUntil = pauseEnd;
		}
	}

	/**
	 * Adapt the minimum inter-request delay from HubSpot's response headers.
	 *
	 * Headers used:
	 * - X-HubSpot-RateLimit-Remaining: requests left in current window
	 * - X-HubSpot-RateLimit-Max: total requests allowed in window
	 * - X-HubSpot-RateLimit-Interval-Milliseconds: window size (typically 10000)
	 */
	adaptFromHeaders(headers: Record<string, string>): void {
		const remaining = this.parseHeader(headers, 'x-hubspot-ratelimit-remaining');
		const max = this.parseHeader(headers, 'x-hubspot-ratelimit-max');
		const intervalMs = this.parseHeader(headers, 'x-hubspot-ratelimit-interval-milliseconds');

		if (remaining === null || max === null) {
			return;
		}

		const window = intervalMs ?? 10000;
		const usageRatio = 1 - remaining / max;

		if (remaining <= 5) {
			this.minDelayMs = window;
			this.setPause(window);
		} else if (usageRatio > 0.8) {
			this.minDelayMs = Math.ceil(window / Math.max(remaining, 1));
		} else if (usageRatio > 0.5) {
			this.minDelayMs = Math.ceil((window / max) * 2);
		} else {
			this.minDelayMs = 0;
		}
	}

	/**
	 * Calculate backoff duration for a 429 response.
	 *
	 * Priority:
	 * 1. Retry-After header (HubSpot sometimes sends this)
	 * 2. Exponential backoff with jitter, escalating with consecutive 429s
	 */
	private calculateBackoff(error: unknown, attempt: number): number {
		const retryAfter = this.extractRetryAfter(error);
		if (retryAfter !== null) {
			return retryAfter + this.jitter(500);
		}

		const escalation = Math.min(this.consecutive429Count, 5);
		const baseMs = 1000 * Math.pow(2, attempt + escalation);
		const capped = Math.min(baseMs, 60000);

		return capped + this.jitter(capped * 0.3);
	}

	/**
	 * Try to extract Retry-After from error response.
	 * HubSpot may send it as seconds in the header or in the response body.
	 */
	private extractRetryAfter(error: unknown): number | null {
		const err = error as { 
			response?: { headers?: Record<string, string>; body?: { policyName?: string } }; 
			headers?: Record<string, string>;
			body?: { policyName?: string };
		};
		const headers = err?.response?.headers || err?.headers || {};

		const retryAfterHeader = headers['retry-after'] || headers['Retry-After'];
		if (retryAfterHeader) {
			const seconds = parseFloat(retryAfterHeader);
			if (!isNaN(seconds)) {
				return seconds * 1000;
			}
		}

		const policyName = err?.response?.body?.policyName || err?.body?.policyName;
		if (policyName === 'TEN_SECONDLY_ROLLING') {
			return 10000;
		}
		if (policyName === 'DAILY') {
			return 60000;
		}

		return null;
	}

	is429(error: unknown): boolean {
		const err = error as { statusCode?: number; response?: { statusCode?: number }; httpCode?: number; code?: number };
		return (
			err?.statusCode === 429 ||
			err?.response?.statusCode === 429 ||
			err?.httpCode === 429 ||
			err?.code === 429
		);
	}

	private parseHeader(headers: Record<string, string>, key: string): number | null {
		const val = headers[key] || headers[key.toLowerCase()];
		if (val === undefined || val === null) return null;
		const num = parseInt(val, 10);
		return isNaN(num) ? null : num;
	}

	private jitter(maxMs: number): number {
		return Math.floor(Math.random() * maxMs);
	}

	private sleep(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	/** Expose stats for testing and debugging */
	getStats() {
		return {
			pausedUntil: this.pausedUntil,
			consecutive429Count: this.consecutive429Count,
			minDelayMs: this.minDelayMs,
			lastRequestAt: this.lastRequestAt,
			isPaused: this.pausedUntil > Date.now(),
		};
	}

	/** Reset state – mainly for testing */
	reset(): void {
		this.pausedUntil = 0;
		this.consecutive429Count = 0;
		this.minDelayMs = 0;
		this.lastRequestAt = 0;
		this.dispatchLock = Promise.resolve();
	}
}
