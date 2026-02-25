import type { INodePropertyOptions } from 'n8n-workflow';

const GLOBAL_CACHE_KEY = Symbol.for('__hubspot_property_cache__');

interface CachedProperties {
	data: INodePropertyOptions[];
	fetchedAt: number;
}

/**
 * In-memory cache for HubSpot object properties.
 * Prevents repeated API calls when loading property dropdowns.
 */
export class PropertyCache {
	private cache = new Map<string, CachedProperties>();

	/** TTL in milliseconds (5 minutes) */
	private readonly TTL_MS = 5 * 60 * 1000;

	/**
	 * Returns the global singleton instance.
	 * All nodes in the same n8n worker process share this.
	 */
	static getInstance(): PropertyCache {
		const g = globalThis as any;
		if (!g[GLOBAL_CACHE_KEY]) {
			g[GLOBAL_CACHE_KEY] = new PropertyCache();
		}
		return g[GLOBAL_CACHE_KEY];
	}

	/**
	 * Get cached properties for an object type within a specific credential context.
	 * Returns null if not cached or expired.
	 */
	get(objectType: string, credentialId?: string): INodePropertyOptions[] | null {
		const key = credentialId ? `${credentialId}::${objectType}` : objectType;
		const cached = this.cache.get(key);
		if (!cached) {
			return null;
		}

		if (Date.now() - cached.fetchedAt > this.TTL_MS) {
			this.cache.delete(key);
			return null;
		}

		return cached.data;
	}

	/**
	 * Get cached properties for an object type (legacy method for backward compatibility).
	 * @deprecated Use get(objectType, credentialId) instead.
	 */
	getCached(objectType: string): INodePropertyOptions[] | null {
		return this.get(objectType);
	}

	/**
	 * Set cached properties for an object type within a specific credential context.
	 */
	set(objectType: string, data: INodePropertyOptions[], credentialId?: string): void {
		const key = credentialId ? `${credentialId}::${objectType}` : objectType;
		this.cache.set(key, {
			data,
			fetchedAt: Date.now(),
		});
	}

	/**
	 * Set cached properties for an object type (legacy method for backward compatibility).
	 * @deprecated Use set(objectType, data, credentialId) instead.
	 */
	setCached(objectType: string, data: INodePropertyOptions[]): void {
		this.set(objectType, data);
	}

	/**
	 * Check if object type is cached and not expired within a specific credential context.
	 */
	has(objectType: string, credentialId?: string): boolean {
		return this.get(objectType, credentialId) !== null;
	}

	/**
	 * Check if object type is cached and not expired (legacy method for backward compatibility).
	 * @deprecated Use has(objectType, credentialId) instead.
	 */
	hasCached(objectType: string): boolean {
		return this.has(objectType);
	}
}
