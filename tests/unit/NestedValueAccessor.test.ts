import { getNestedValue, hasNestedValue, getAvailableFieldPaths } from '../../src/transport/NestedValueAccessor';
import type { INodeExecutionData } from 'n8n-workflow';

describe('NestedValueAccessor', () => {
	describe('getNestedValue', () => {
		it('should get top-level value', () => {
			const obj = { name: 'test', email: 'test@example.com' };
			expect(getNestedValue(obj, 'name')).toBe('test');
			expect(getNestedValue(obj, 'email')).toBe('test@example.com');
		});

		it('should get nested value', () => {
			const obj = {
				properties: {
					name: 'John',
					email: 'john@example.com'
				}
			};
			expect(getNestedValue(obj, 'properties.name')).toBe('John');
			expect(getNestedValue(obj, 'properties.email')).toBe('john@example.com');
		});

		it('should get deeply nested value', () => {
			const obj = {
				data: {
					nested: {
						value: 'deep'
					}
				}
			};
			expect(getNestedValue(obj, 'data.nested.value')).toBe('deep');
		});

		it('should handle array index access', () => {
			const obj = {
				items: [
					{ name: 'first' },
					{ name: 'second' }
				]
			};
			expect(getNestedValue(obj, 'items.0.name')).toBe('first');
			expect(getNestedValue(obj, 'items.1.name')).toBe('second');
		});

		it('should return undefined for non-existent path', () => {
			const obj = { name: 'test' };
			expect(getNestedValue(obj, 'nonexistent')).toBeUndefined();
			expect(getNestedValue(obj, 'properties.name')).toBeUndefined();
		});

		it('should return undefined for null/undefined obj', () => {
			expect(getNestedValue(null as any, 'name')).toBeUndefined();
			expect(getNestedValue(undefined as any, 'name')).toBeUndefined();
		});

		it('should return undefined for empty path', () => {
			const obj = { name: 'test' };
			expect(getNestedValue(obj, '')).toBeUndefined();
		});

		it('should handle null values in path', () => {
			const obj = {
				properties: null
			};
			expect(getNestedValue(obj, 'properties.name')).toBeUndefined();
		});

		it('should handle primitive values in path', () => {
			const obj = {
				name: 'test'
			};
			expect(getNestedValue(obj, 'name.length')).toBeUndefined();
		});
	});

	describe('hasNestedValue', () => {
		it('should return true for existing value', () => {
			const obj = { name: 'test' };
			expect(hasNestedValue(obj, 'name')).toBe(true);
		});

		it('should return true for existing nested value', () => {
			const obj = { properties: { name: 'test' } };
			expect(hasNestedValue(obj, 'properties.name')).toBe(true);
		});

		it('should return false for non-existent path', () => {
			const obj = { name: 'test' };
			expect(hasNestedValue(obj, 'nonexistent')).toBe(false);
		});

		it('should return false for null value', () => {
			const obj = { name: null };
			expect(hasNestedValue(obj, 'name')).toBe(false);
		});

		it('should return false for undefined value', () => {
			const obj = { name: undefined };
			expect(hasNestedValue(obj, 'name')).toBe(false);
		});
	});

	describe('getAvailableFieldPaths', () => {
		it('should get top-level paths', () => {
			const items: INodeExecutionData[] = [
				{ json: { name: 'test', email: 'test@example.com' } }
			];
			const paths = getAvailableFieldPaths(items);
			expect(paths).toContain('name');
			expect(paths).toContain('email');
		});

		it('should get nested paths', () => {
			const items: INodeExecutionData[] = [
				{ json: { properties: { name: 'test' } } }
			];
			const paths = getAvailableFieldPaths(items);
			expect(paths).toContain('properties');
			expect(paths).toContain('properties.name');
		});

		it('should respect maxDepth', () => {
			const items: INodeExecutionData[] = [
				{ json: { a: { b: { c: { d: 'deep' } } } } }
			];
			const paths = getAvailableFieldPaths(items, 2);
			expect(paths).toContain('a');
			expect(paths).toContain('a.b');
			expect(paths).not.toContain('a.b.c');
			expect(paths).not.toContain('a.b.c.d');
		});

		it('should handle multiple items', () => {
			const items: INodeExecutionData[] = [
				{ json: { name: 'test1' } },
				{ json: { email: 'test2@example.com' } }
			];
			const paths = getAvailableFieldPaths(items);
			expect(paths).toContain('name');
			expect(paths).toContain('email');
		});

		it('should return sorted paths', () => {
			const items: INodeExecutionData[] = [
				{ json: { z: 1, a: 2, m: 3 } }
			];
			const paths = getAvailableFieldPaths(items);
			expect(paths).toEqual(['a', 'm', 'z']);
		});
	});
});
