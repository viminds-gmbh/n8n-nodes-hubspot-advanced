import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { hubspotApiRequest, hubspotApiRequestAllItems } from '../../../transport/HubSpotApiRequest';
import { validateFieldMapping, buildFieldNotFoundError } from '../../../transport/ValidationHelpers';
import { getNestedValue } from '../../../transport/NestedValueAccessor';

interface FilterGroup {
	propertyName: string;
	operator: string;
	value?: string;
	values?: string | string[];
	highValue?: string;
}

interface SortOptions {
	propertyName: string;
	direction: string;
}

interface PropertyToSet {
	name: string;
	value: string;
}

export async function executeUserOperation(
	context: IExecuteFunctions,
	resource: string,
	operation: string,
	items: INodeExecutionData[],
	itemIndex: number,
): Promise<INodeExecutionData[]> {
	if (resource === 'owner') {
		return executeOwnerOperation(context, operation, items, itemIndex);
	}

	switch (operation) {
		case 'get':
			return [await getUser(context, itemIndex)];
		case 'getMany':
			return await getManyUsers(context, items);
		case 'search':
			return await searchUsers(context, itemIndex);
		case 'update':
			return [await updateUser(context, itemIndex)];
		case 'batchUpdate':
			return await batchUpdateUsers(context, items);
		default:
			throw new Error(`Unknown user operation: ${operation}`);
	}
}

// ──────────────────────────────────────────────
//  OWNER operations
// ──────────────────────────────────────────────

async function executeOwnerOperation(
	context: IExecuteFunctions,
	operation: string,
	items: INodeExecutionData[],
	itemIndex: number,
): Promise<INodeExecutionData[]> {
	switch (operation) {
		case 'get':
			return [await getOwner(context, itemIndex)];
		case 'getMany':
			return await getManyOwners(context, itemIndex);
		default:
			throw new Error(`Operation "${operation}" is not supported for the Owner resource. Available: get, getMany`);
	}
}

async function getOwner(
	context: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData> {
	const ownerId = context.getNodeParameter('ownerId', i) as string;
	const idProperty = context.getNodeParameter('idProperty', i, 'id') as string;

	const qs: IDataObject = {};
	if (idProperty !== 'id') {
		qs.idProperty = idProperty;
	}

	const endpoint = `/crm/v3/owners/${ownerId}`;

	context.logger.debug(`Calling Owners API: GET ${endpoint}`, { idProperty, qs });

	try {
		const response = await hubspotApiRequest.call(
			context,
			'GET',
			endpoint,
			{},
			qs,
		) as IDataObject;

		return { json: response };
	} catch (error: any) {
		// Enhance error with context about the request URL
		const qsString = Object.keys(qs).length > 0 ? `?${new URLSearchParams(qs as Record<string, string>).toString()}` : '';
		throw new Error(
			`Owners API request failed: GET ${endpoint}${qsString} — ${error.message || error.description || 'Unknown error'}` +
			`\n\nNote: The HubSpot Owners API path parameter ownerId must be a valid int32 (max 2,147,483,647).` +
			` Value "${ownerId}" is ${ownerId.length > 10 ? 'too large' : 'invalid'}.` +
			`\nUse the owner's 'id' (e.g., "6166860") or a valid int32 'userId'.`,
		);
	}
}

async function getManyOwners(
	context: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData[]> {
	const returnAll = context.getNodeParameter('returnAll', i) as boolean;
	const limit = context.getNodeParameter('limit', i, 100) as number;
	const email = context.getNodeParameter('email', i, '') as string;

	const qs: IDataObject = {};
	if (email) {
		qs.email = email;
	}

	// Owners API uses GET with query-param pagination (after, limit)
	const results: IDataObject[] = [];
	let after: string | undefined;
	const maxResults = returnAll ? Infinity : limit;

	do {
		const batchQs: IDataObject = { ...qs };
		if (after) {
			batchQs.after = after;
		}

		const remaining = maxResults - results.length;
		batchQs.limit = Math.min(remaining, 100);

		const response = await hubspotApiRequest.call(
			context,
			'GET',
			'/crm/v3/owners',
			{},
			batchQs,
		) as IDataObject;

		if (response.results) {
			results.push(...(response.results as IDataObject[]));
		}

		const paging = response.paging as IDataObject | undefined;
		after = paging?.next ? (paging.next as IDataObject).after as string : undefined;

		if (!returnAll && results.length >= limit) {
			break;
		}
	} while (after);

	return results.map((result) => ({ json: result }));
}

// ──────────────────────────────────────────────
//  USER operations
// ──────────────────────────────────────────────

async function getUser(
	context: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData> {
	const userId = context.getNodeParameter('userId', i) as string;
	const properties = context.getNodeParameter('properties', i, []) as string[] | string;

	const qs: IDataObject = {};
	if (properties && properties.length > 0) {
		const propertiesString = Array.isArray(properties) ? properties.join(',') : properties;
		qs.properties = propertiesString;
	}

	const response = await hubspotApiRequest.call(
		context,
		'GET',
		`/crm/v3/objects/users/${userId}`,
		{},
		qs,
	) as IDataObject;

	return { json: response };
}

async function getManyUsers(
	context: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const properties = context.getNodeParameter('properties', 0, []) as string[] | string;
	const idField = context.getNodeParameter('idField', 0, 'id') as string;

	const validation = validateFieldMapping(items, idField);

	if (!validation.valid) {
		throw new Error(buildFieldNotFoundError(idField, validation.availableFields, 'IDs'));
	}

	if (validation.missingCount > 0) {
		context.logger.warn(
			`Field "${idField}" is missing in ${validation.missingCount} of ${items.length} input items. Only ${validation.presentCount} items will be processed.`,
		);
	}

	const ids: string[] = [];
	for (let j = 0; j < items.length; j++) {
		const id = getNestedValue(items[j].json, idField) as string;
		if (id) {
			ids.push(String(id));
		}
	}

	if (ids.length === 0) {
		throw new Error(`No valid user IDs found using field "${idField}".`);
	}

	const propertiesArray = Array.isArray(properties)
		? properties
		: (properties ? properties.split(',').map((p) => p.trim()) : []);

	const body: IDataObject = {
		inputs: ids.map((id) => ({ id })),
	};
	if (propertiesArray.length > 0) {
		body.properties = propertiesArray;
	}

	const response = await hubspotApiRequest.call(
		context,
		'POST',
		'/crm/v3/objects/users/batch/read',
		body,
	) as { results: IDataObject[] };

	return (response.results || []).map((result) => ({ json: result }));
}

async function searchUsers(
	context: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData[]> {
	const returnAll = context.getNodeParameter('returnAll', i) as boolean;
	const limit = context.getNodeParameter('limit', i, 100) as number;
	const properties = context.getNodeParameter('properties', i, []) as string[] | string;
	const filters = context.getNodeParameter('filters', i, {}) as { filterGroups?: FilterGroup[] };
	const sort = context.getNodeParameter('sort', i, {}) as { sortOptions?: SortOptions };

	const body: IDataObject = {
		properties: Array.isArray(properties)
			? properties
			: (properties ? properties.split(',').map((p) => p.trim()) : []),
	};

	if (filters.filterGroups && filters.filterGroups.length > 0) {
		body.filterGroups = [
			{
				filters: filters.filterGroups.map((f: FilterGroup) => {
					const filter: IDataObject = {
						propertyName: f.propertyName,
						operator: f.operator,
					};

					if (f.operator === 'IN' || f.operator === 'NOT_IN') {
						if (f.values) {
							let valuesArray: string[];
							if (Array.isArray(f.values)) {
								valuesArray = f.values.map((v: string) => String(v).trim());
							} else {
								valuesArray = String(f.values).split(';').map((v: string) => v.trim());
							}
							const uniqueValues = [...new Set(valuesArray)];
							filter.values = uniqueValues;
						} else {
							throw new Error(`'values' field is required for ${f.operator} operator`);
						}
					} else if (f.operator === 'BETWEEN') {
						if (f.value !== undefined) {
							filter.value = f.value;
						}
						if (f.highValue !== undefined) {
							filter.highValue = f.highValue;
						}
					} else if (f.operator === 'HAS_PROPERTY' || f.operator === 'NOT_HAS_PROPERTY') {
						// No value needed
					} else {
						if (f.value !== undefined) {
							filter.value = f.value;
						}
					}

					return filter;
				}),
			},
		];
	}

	if (sort.sortOptions) {
		body.sorts = [
			{
				propertyName: sort.sortOptions.propertyName,
				direction: sort.sortOptions.direction,
			},
		];
	}

	let results: IDataObject[];

	if (returnAll) {
		results = await hubspotApiRequestAllItems.call(
			context,
			'POST',
			'/crm/v3/objects/users/search',
			body,
		);
	} else {
		results = await hubspotApiRequestAllItems.call(
			context,
			'POST',
			'/crm/v3/objects/users/search',
			body,
			limit,
		);
	}

	return results.map((result) => ({ json: result }));
}

async function updateUser(
	context: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData> {
	const userId = context.getNodeParameter('userId', i) as string;
	const propertiesToSet = context.getNodeParameter('propertiesToSet', i, {}) as { property?: PropertyToSet[] };

	const properties: IDataObject = {};
	if (propertiesToSet.property) {
		propertiesToSet.property.forEach((prop: PropertyToSet) => {
			properties[prop.name] = prop.value;
		});
	}

	const response = await hubspotApiRequest.call(
		context,
		'PATCH',
		`/crm/v3/objects/users/${userId}`,
		{ properties },
	) as IDataObject;

	return { json: response };
}

async function batchUpdateUsers(
	context: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const idField = context.getNodeParameter('idField', 0) as string;
	const propertyMappings = context.getNodeParameter('propertyMappings', 0, {}) as {
		mapping?: Array<{ property: string; fieldName: string }>;
	};

	if (!propertyMappings.mapping || propertyMappings.mapping.length === 0) {
		throw new Error('At least one property mapping is required for batch update');
	}

	const idValidation = validateFieldMapping(items, idField);
	if (!idValidation.valid) {
		throw new Error(buildFieldNotFoundError(idField, idValidation.availableFields, 'IDs'));
	}

	for (const mapping of propertyMappings.mapping!) {
		const validation = validateFieldMapping(items, mapping.fieldName);
		if (!validation.valid) {
			throw new Error(
				`Field "${mapping.fieldName}" not found in input items.\n\nAvailable fields: ${validation.availableFields.slice(0, 10).join(', ')}${validation.availableFields.length > 10 ? ', ...' : ''}`,
			);
		}
		if (validation.missingCount > 0) {
			context.logger.warn(
				`Field "${mapping.fieldName}" is missing in ${validation.missingCount} of ${items.length} input items.`,
			);
		}
	}

	const inputs = items.map((item, index) => {
		const objectId = getNestedValue(item.json, idField);
		if (!objectId) {
			throw new Error(`Missing ID field "${idField}" in item ${index}`);
		}

		const properties: IDataObject = {};
		propertyMappings.mapping!.forEach((map) => {
			const value = getNestedValue(item.json, map.fieldName);
			if (value !== undefined && value !== null) {
				properties[map.property] = value;
			}
		});

		return { id: String(objectId), properties };
	});

	const batchSize = 100;
	const allResults: IDataObject[] = [];

	for (let i = 0; i < inputs.length; i += batchSize) {
		const batch = inputs.slice(i, i + batchSize);

		const response = await hubspotApiRequest.call(
			context,
			'POST',
			'/crm/v3/objects/users/batch/update',
			{ inputs: batch },
		) as { results: IDataObject[] };

		allResults.push(...response.results);
	}

	return allResults.map((result, index) => ({
		json: result,
		pairedItem: { item: index },
	}));
}