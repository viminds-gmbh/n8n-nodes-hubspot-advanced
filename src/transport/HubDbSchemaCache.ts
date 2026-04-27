import type { INodePropertyOptions } from 'n8n-workflow';

const GLOBAL_CACHE_KEY = Symbol.for('__hubspot_hubdb_schema_cache__');

interface CachedSchema {
	data: INodePropertyOptions[];
	fetchedAt: number;
}

/**
 * In-memory cache for HubDB table column schemas.
 * Prevents repeated API calls when loading column name dropdowns.
 * TTL: 5 minutes (same as PropertyCache).
 */
export class HubDbSchemaCache {
	private cache = new Map<string, CachedSchema>();

	private readonly TTL_MS = 5 * 60 * 1000;

	static getInstance(): HubDbSchemaCache {
		const g = globalThis as typeof globalThis & { [GLOBAL_CACHE_KEY]?: HubDbSchemaCache };
		if (!g[GLOBAL_CACHE_KEY]) {
			g[GLOBAL_CACHE_KEY] = new HubDbSchemaCache();
		}
		return g[GLOBAL_CACHE_KEY];
	}

	private buildKey(tableId: string, credentialId?: string): string {
		return credentialId ? `${credentialId}::${tableId}` : tableId;
	}

	get(tableId: string, credentialId?: string): INodePropertyOptions[] | null {
		const key = this.buildKey(tableId, credentialId);
		const cached = this.cache.get(key);
		if (!cached) return null;
		if (Date.now() - cached.fetchedAt > this.TTL_MS) {
			this.cache.delete(key);
			return null;
		}
		return cached.data;
	}

	set(tableId: string, data: INodePropertyOptions[], credentialId?: string): void {
		const key = this.buildKey(tableId, credentialId);
		this.cache.set(key, { data, fetchedAt: Date.now() });
	}

	has(tableId: string, credentialId?: string): boolean {
		return this.get(tableId, credentialId) !== null;
	}
}
