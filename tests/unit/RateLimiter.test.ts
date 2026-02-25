import { HubSpotRateLimiter } from '../../src/transport/RateLimiter';

describe('HubSpotRateLimiter', () => {
	let limiter: HubSpotRateLimiter;

	beforeEach(() => {
		jest.clearAllMocks();
		limiter = HubSpotRateLimiter.getInstance();
		limiter.reset();
	});

	describe('getInstance', () => {
		it('should return the same singleton instance', () => {
			const instance1 = HubSpotRateLimiter.getInstance();
			const instance2 = HubSpotRateLimiter.getInstance();
			expect(instance1).toBe(instance2);
		});
	});

	describe('execute', () => {
		it('should execute function and return data', async () => {
			const mockFn = jest.fn().mockResolvedValue({
				data: { id: '123' },
				headers: {},
			});

			const result = await limiter.execute(mockFn);

			expect(result).toEqual({ id: '123' });
			expect(mockFn).toHaveBeenCalledTimes(1);
		});

		it('should retry on 429 errors', async () => {
			let attempts = 0;

			const mockFn = jest.fn().mockImplementation(() => {
				attempts++;
				if (attempts < 3) {
					const error: any = new Error('Rate limited');
					error.statusCode = 429;
					throw error;
				}
				return Promise.resolve({ data: 'success', headers: {} });
			});

			const result = await limiter.execute(mockFn, 5);

			expect(result).toBe('success');
			expect(mockFn).toHaveBeenCalledTimes(3);
		}, 30000);

		it('should throw after max retries on 429', async () => {
			const mockFn = jest.fn().mockImplementation(() => {
				const error: any = new Error('Rate limited');
				error.statusCode = 429;
				throw error;
			});

			await expect(limiter.execute(mockFn, 2)).rejects.toThrow(
				'HubSpot rate limit: max retries',
			);
			expect(mockFn).toHaveBeenCalledTimes(3);
		}, 30000);

		it('should not retry on non-429 errors', async () => {
			const mockFn = jest.fn().mockImplementation(() => {
				const error: any = new Error('Server error');
				error.statusCode = 500;
				throw error;
			});

			await expect(limiter.execute(mockFn, 3)).rejects.toThrow('Server error');
			expect(mockFn).toHaveBeenCalledTimes(1);
		});
	});

	describe('adaptFromHeaders', () => {
		it('should set minDelay when remaining is low', () => {
			limiter.adaptFromHeaders({
				'x-hubspot-ratelimit-remaining': '3',
				'x-hubspot-ratelimit-max': '100',
				'x-hubspot-ratelimit-interval-milliseconds': '10000',
			});

			const stats = limiter.getStats();
			expect(stats.minDelayMs).toBe(10000);
			expect(stats.isPaused).toBe(true);
		});

		it('should adapt delay based on usage ratio', () => {
			limiter.adaptFromHeaders({
				'x-hubspot-ratelimit-remaining': '15',
				'x-hubspot-ratelimit-max': '100',
			});

			const stats = limiter.getStats();
			expect(stats.minDelayMs).toBeGreaterThan(0);
		});

		it('should reset delay when usage is low', () => {
			limiter.adaptFromHeaders({
				'x-hubspot-ratelimit-remaining': '90',
				'x-hubspot-ratelimit-max': '100',
			});

			const stats = limiter.getStats();
			expect(stats.minDelayMs).toBe(0);
		});
	});

	describe('is429', () => {
		it('should detect 429 from statusCode', () => {
			const error = { statusCode: 429 };
			expect(limiter.is429(error)).toBe(true);
		});

		it('should detect 429 from response.statusCode', () => {
			const error = { response: { statusCode: 429 } };
			expect(limiter.is429(error)).toBe(true);
		});

		it('should detect 429 from httpCode', () => {
			const error = { httpCode: 429 };
			expect(limiter.is429(error)).toBe(true);
		});

		it('should return false for non-429 errors', () => {
			const error = { statusCode: 500 };
			expect(limiter.is429(error)).toBe(false);
		});
	});

	describe('concurrent requests', () => {
		it('should serialize concurrent requests when paused', async () => {
			const results: number[] = [];
			const mockFn = (id: number) =>
				jest.fn().mockResolvedValue({
					data: id,
					headers: {},
				});

			const promises = [1, 2, 3, 4, 5].map(async (id) => {
				const result = await limiter.execute<number>(mockFn(id));
				results.push(result);
				return result;
			});

			await Promise.all(promises);

			expect(results).toHaveLength(5);
		});
	});

	describe('reset', () => {
		it('should reset all state', () => {
			limiter.adaptFromHeaders({
				'x-hubspot-ratelimit-remaining': '3',
				'x-hubspot-ratelimit-max': '100',
			});

			limiter.reset();

			const stats = limiter.getStats();
			expect(stats.pausedUntil).toBe(0);
			expect(stats.consecutive429Count).toBe(0);
			expect(stats.minDelayMs).toBe(0);
			expect(stats.isPaused).toBe(false);
		});
	});

	describe('simultaneous 429 errors', () => {
		it('should coordinate pause when multiple requests hit 429 simultaneously', async () => {
			let callCount = 0;
			const mockFn = jest.fn().mockImplementation(() => {
				callCount++;
				if (callCount <= 5) {
					const error: any = new Error('Rate limited');
					error.statusCode = 429;
					throw error;
				}
				return Promise.resolve({ data: `success-${callCount}`, headers: {} });
			});

			const promises = Array.from({ length: 5 }, () => limiter.execute(mockFn, 3));

			const results = await Promise.all(promises);

			expect(results).toHaveLength(5);
			results.forEach((result) => {
				expect(result).toMatch(/^success-/);
			});
			expect(mockFn.mock.calls.length).toBeGreaterThanOrEqual(5);
		}, 60000);

		it('should escalate backoff on consecutive 429s', async () => {
			let attempts = 0;
			const mockFn = jest.fn().mockImplementation(() => {
				attempts++;
				if (attempts < 4) {
					const error: any = new Error('Rate limited');
					error.statusCode = 429;
					throw error;
				}
				return Promise.resolve({ data: 'success', headers: {} });
			});

			const start = Date.now();
			await limiter.execute(mockFn, 5);
			const duration = Date.now() - start;

			const stats = limiter.getStats();
			expect(stats.consecutive429Count).toBe(0);
			expect(duration).toBeGreaterThan(1000);
		}, 60000);
	});

	describe('mixed error types in parallel', () => {
		it('should handle mix of 429 and non-429 errors correctly', async () => {
			const mock429 = jest.fn().mockImplementation(() => {
				const error: any = new Error('Rate limited');
				error.statusCode = 429;
				throw error;
			});

			const mock500 = jest.fn().mockImplementation(() => {
				const error: any = new Error('Server error');
				error.statusCode = 500;
				throw error;
			});

			const mockSuccess = jest.fn().mockResolvedValue({ data: 'ok', headers: {} });

			const results = await Promise.allSettled([
				limiter.execute(mock429, 2),
				limiter.execute(mock500, 2),
				limiter.execute(mockSuccess, 2),
			]);

			expect(results[0].status).toBe('rejected');
			expect(results[1].status).toBe('rejected');
			expect(results[2].status).toBe('fulfilled');

			if (results[0].status === 'rejected') {
				expect(results[0].reason.message).toContain('max retries');
			}
			if (results[1].status === 'rejected') {
				expect(results[1].reason.message).toBe('Server error');
			}
		}, 60000);
	});

	describe('Retry-After header parsing', () => {
		it('should use Retry-After header when present', async () => {
			let attempts = 0;
			const mockFn = jest.fn().mockImplementation(() => {
				attempts++;
				if (attempts === 1) {
					const error: any = new Error('Rate limited');
					error.statusCode = 429;
					error.headers = { 'retry-after': '2' };
					throw error;
				}
				return Promise.resolve({ data: 'success', headers: {} });
			});

			const start = Date.now();
			const result = await limiter.execute(mockFn, 3);
			const duration = Date.now() - start;

			expect(result).toBe('success');
			expect(duration).toBeGreaterThanOrEqual(2000);
			expect(duration).toBeLessThan(4000);
		}, 10000);

		it('should detect TEN_SECONDLY_ROLLING policy', async () => {
			let attempts = 0;
			const mockFn = jest.fn().mockImplementation(() => {
				attempts++;
				if (attempts === 1) {
					const error: any = new Error('Rate limited');
					error.statusCode = 429;
					error.body = { policyName: 'TEN_SECONDLY_ROLLING' };
					throw error;
				}
				return Promise.resolve({ data: 'success', headers: {} });
			});

			const start = Date.now();
			const result = await limiter.execute(mockFn, 3);
			const duration = Date.now() - start;

			expect(result).toBe('success');
			expect(duration).toBeGreaterThanOrEqual(10000);
		}, 15000);

		it('should detect DAILY policy', async () => {
			let attempts = 0;
			const mockFn = jest.fn().mockImplementation(() => {
				attempts++;
				if (attempts === 1) {
					const error: any = new Error('Rate limited');
					error.statusCode = 429;
					error.response = { body: { policyName: 'DAILY' } };
					throw error;
				}
				return Promise.resolve({ data: 'success', headers: {} });
			});

			const start = Date.now();
			const result = await limiter.execute(mockFn, 3);
			const duration = Date.now() - start;

			expect(result).toBe('success');
			expect(duration).toBeGreaterThanOrEqual(60000);
		}, 65000);
	});

	describe('race conditions and pause coordination', () => {
		it('should maintain global pause across concurrent requests', async () => {
			const executionOrder: number[] = [];

			const createMockFn = (id: number) =>
				jest.fn().mockImplementation(async () => {
					executionOrder.push(id);
					return { data: id, headers: {} };
				});

			const promises = [1, 2, 3].map((id) => limiter.execute(createMockFn(id)));

			const results = await Promise.all(promises);

			expect(results).toHaveLength(3);
			expect(executionOrder).toHaveLength(3);
			expect(new Set(executionOrder).size).toBe(3);
		});

		it('should keep longest pause when multiple 429s set different pauses', async () => {
			let call1Attempts = 0;
			let call2Attempts = 0;

			const mockFn1 = jest.fn().mockImplementation(() => {
				call1Attempts++;
				if (call1Attempts === 1) {
					const error: any = new Error('Rate limited');
					error.statusCode = 429;
					error.headers = { 'retry-after': '5' };
					throw error;
				}
				return Promise.resolve({ data: 'success1', headers: {} });
			});

			const mockFn2 = jest.fn().mockImplementation(() => {
				call2Attempts++;
				if (call2Attempts === 1) {
					const error: any = new Error('Rate limited');
					error.statusCode = 429;
					error.headers = { 'retry-after': '2' };
					throw error;
				}
				return Promise.resolve({ data: 'success2', headers: {} });
			});

			const start = Date.now();
			const [result1, result2] = await Promise.all([
				limiter.execute(mockFn1, 3),
				limiter.execute(mockFn2, 3),
			]);
			const duration = Date.now() - start;

			expect(result1).toBe('success1');
			expect(result2).toBe('success2');
			expect(duration).toBeGreaterThanOrEqual(5000);
		}, 15000);
	});

	describe('header adaptation under load', () => {
		it('should progressively increase delay as remaining decreases', () => {
			limiter.adaptFromHeaders({
				'x-hubspot-ratelimit-remaining': '50',
				'x-hubspot-ratelimit-max': '100',
			});
			const stats1 = limiter.getStats();

			limiter.adaptFromHeaders({
				'x-hubspot-ratelimit-remaining': '20',
				'x-hubspot-ratelimit-max': '100',
			});
			const stats2 = limiter.getStats();

			limiter.adaptFromHeaders({
				'x-hubspot-ratelimit-remaining': '5',
				'x-hubspot-ratelimit-max': '100',
			});
			const stats3 = limiter.getStats();

			expect(stats2.minDelayMs).toBeGreaterThan(stats1.minDelayMs);
			expect(stats3.minDelayMs).toBeGreaterThan(stats2.minDelayMs);
			expect(stats3.isPaused).toBe(true);
		});
	});
});
