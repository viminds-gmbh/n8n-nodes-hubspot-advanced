import type { INodeExecutionData, IDataObject } from 'n8n-workflow';

/**
 * Get a nested value from an object using dot notation path
 * @param obj - The object to get the value from
 * @param path - Dot notation path (e.g., "properties.name")
 * @returns The value at the path, or undefined if not found
 */
export function getNestedValue(obj: IDataObject, path: string): unknown {
	if (!path || !obj) {
		return undefined;
	}

	const keys = path.split('.');
	let current: unknown = obj;

	for (const key of keys) {
		if (current === null || current === undefined) {
			return undefined;
		}

		if (typeof current !== 'object') {
			return undefined;
		}

		// Handle array index access (e.g., "items.0.name")
		if (Array.isArray(current)) {
			const index = parseInt(key, 10);
			if (isNaN(index) || index < 0 || index >= current.length) {
				return undefined;
			}
			current = current[index];
		} else {
			current = (current as IDataObject)[key];
		}
	}

	return current;
}

/**
 * Check if a nested path exists in an object
 * @param obj - The object to check
 * @param path - Dot notation path
 * @returns True if the path exists and has a non-null/non-undefined value
 */
export function hasNestedValue(obj: IDataObject, path: string): boolean {
	const value = getNestedValue(obj, path);
	return value !== undefined && value !== null;
}

/**
 * Get all available field paths from items, including nested paths
 * @param items - Array of execution data items
 * @param maxDepth - Maximum depth to traverse (default: 3)
 * @returns Array of dot notation paths
 */
export function getAvailableFieldPaths(
	items: INodeExecutionData[],
	maxDepth: number = 3
): string[] {
	const paths = new Set<string>();

	function traverse(obj: IDataObject, currentPath: string, depth: number) {
		if (depth > maxDepth) return;

		for (const [key, value] of Object.entries(obj)) {
			const newPath = currentPath ? `${currentPath}.${key}` : key;
			paths.add(newPath);

			// Traverse nested objects
			if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
				traverse(value as IDataObject, newPath, depth + 1);
			}
		}
	}

	for (const item of items) {
		traverse(item.json, '', 1);
	}

	return Array.from(paths).sort();
}
