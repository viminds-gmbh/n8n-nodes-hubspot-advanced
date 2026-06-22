import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { hubspotApiRequest, hubspotApiRequestAllItems, hubspotBatchRequest } from '../../../transport/HubSpotApiRequest';
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

export async function executeCrmOperation(
	context: IExecuteFunctions,
	operation: string,
	objectType: string,
	items: INodeExecutionData[],
	itemIndex: number
): Promise<INodeExecutionData[]> {
	switch (operation) {
		case 'get':
			return [await getObject(context, objectType, itemIndex)];
		case 'getMany':
			return await getManyObjects(context, objectType, items);
		case 'search':
			return await searchObjects(context, objectType, itemIndex);
		case 'create':
			return [await createObject(context, objectType, itemIndex)];
		case 'update':
			return [await updateObject(context, objectType, itemIndex)];
		case 'delete':
			return [await deleteObject(context, objectType, itemIndex)];
		case 'batchCreate':
			return await batchCreateObjects(context, objectType, items);
		case 'batchUpdate':
			return await batchUpdateObjects(context, objectType, items);
		case 'batchUpsert':
			return await batchUpsertObjects(context, objectType, items);
		case 'batchDelete':
			return await batchDeleteObjects(context, objectType, items);
		default:
			throw new Error(`Unknown CRM operation: ${operation}`);
	}
}

async function getObject(
	context: IExecuteFunctions,
	objectType: string,
	i: number
): Promise<INodeExecutionData> {
	const objectId = context.getNodeParameter('objectId', i) as string;
	const idProperty = context.getNodeParameter('idProperty', i, 'hs_object_id') as string;
	const properties = context.getNodeParameter('properties', i, []) as string[] | string;

	const qs: IDataObject = {};
	if (properties && properties.length > 0) {
		const propertiesString = Array.isArray(properties) ? properties.join(',') : properties;
		qs.properties = propertiesString;
	}
	if (idProperty !== 'hs_object_id') {
		qs.idProperty = idProperty;
	}

	const response = await hubspotApiRequest.call(
		context,
		'GET',
		`/crm/v3/objects/${objectType}/${objectId}`,
		{},
		qs,
	) as IDataObject;

	return { json: response };
}

async function getManyObjects(
	context: IExecuteFunctions,
	objectType: string,
	items: INodeExecutionData[]
): Promise<INodeExecutionData[]> {
	const properties = context.getNodeParameter('properties', 0, []) as string[] | string;
	const idField = context.getNodeParameter('idField', 0, 'id') as string;
	const idProperty = context.getNodeParameter('idProperty', 0, 'hs_object_id') as string;

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

	const propertiesArray = Array.isArray(properties)
		? properties
		: (properties ? properties.split(',').map((p) => p.trim()) : []);

	const results = await hubspotBatchRequest.call(
		context,
		objectType,
		ids,
		propertiesArray,
		idProperty !== 'hs_object_id' ? idProperty : undefined,
	);

	return results.map((result) => ({ json: result }));
}

async function searchObjects(
	context: IExecuteFunctions,
	objectType: string,
	i: number
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
						// Use 'values' field for IN/NOT_IN operators (matches HubSpot API)
						if (f.values) {
							// Handle both array (from expression like {{ $json.emails }}) and semicolon-separated string
							let valuesArray: string[];
							if (Array.isArray(f.values)) {
								valuesArray = f.values.map((v: string) => String(v).trim());
							} else {
								// Split semicolon-separated string
								valuesArray = String(f.values).split(';').map((v: string) => v.trim());
							}
							
							// Deduplicate values using Set to reduce batch count
							const uniqueValues = [...new Set(valuesArray)];
							filter.values = uniqueValues;
						} else {
							throw new Error(`'values' field is required for ${f.operator} operator`);
						}
					} else if (f.operator === 'BETWEEN') {
						// BETWEEN operator requires both value (lower bound) and highValue (upper bound)
						if (f.value !== undefined) {
							filter.value = f.value;
						}
						if (f.highValue !== undefined) {
							filter.highValue = f.highValue;
						}
					} else if (f.operator === 'HAS_PROPERTY' || f.operator === 'NOT_HAS_PROPERTY') {
						// These operators don't require a value
					} else {
						// Use 'value' field for all other operators
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

	// Check if multiple IN/NOT_IN filters have >100 values (not supported)
	const filterGroups = body.filterGroups as Array<{ filters: IDataObject[] }> | undefined;
	const filtersWithLargeValues = filterGroups?.[0]?.filters?.filter(
		(f: IDataObject) => (f.operator === 'IN' || f.operator === 'NOT_IN') && Array.isArray(f.values) && f.values.length > 100
	);

	if (filtersWithLargeValues && filtersWithLargeValues.length > 1) {
		throw new Error(
			'Multiple IN/NOT_IN filters with >100 values detected. HubSpot API limits each filter to 100 values. Please split your search into multiple nodes or reduce the number of values per filter.'
		);
	}

	// Check if any IN/NOT_IN filter has >100 values (requires batching)
	const filterWithLargeValues = filterGroups?.[0]?.filters?.find(
		(f: IDataObject) => (f.operator === 'IN' || f.operator === 'NOT_IN') && Array.isArray(f.values) && f.values.length > 100
	);

	let results: IDataObject[];

	if (filterWithLargeValues) {
		// Batching required - split values into chunks of 100
		const allValues = filterWithLargeValues.values as string[];
		const batchSize = 100;
		const batches: string[][] = [];
		
		for (let i = 0; i < allValues.length; i += batchSize) {
			batches.push(allValues.slice(i, i + batchSize));
		}
		
		// Log batching info for transparency
		context.logger.info(
			`Automatically splitting ${allValues.length} values into ${batches.length} batches (HubSpot limit: 100 per request)`
		);
		
		const allResults: IDataObject[] = [];
		
		for (const batch of batches) {
			// Clone body and replace values for this batch
			const batchBody = JSON.parse(JSON.stringify(body)) as IDataObject;
			const batchFilterGroups = batchBody.filterGroups as Array<{ filters: IDataObject[] }>;
			const batchFilter = batchFilterGroups[0].filters.find(
				(f: IDataObject) => f.propertyName === filterWithLargeValues.propertyName
			);
			if (batchFilter) {
				batchFilter.values = batch;
			}
			
			// API call for this batch
			const batchResults = returnAll
				? await hubspotApiRequestAllItems.call(
						context,
						'POST',
						`/crm/v3/objects/${objectType}/search`,
						batchBody,
					)
				: await hubspotApiRequestAllItems.call(
						context,
						'POST',
						`/crm/v3/objects/${objectType}/search`,
						batchBody,
						limit,
					);
			
			allResults.push(...batchResults);
			
			// If limit is set and we've reached it, stop fetching more batches
			if (!returnAll && limit && allResults.length >= limit) {
				break;
			}
		}
		
		// Deduplicate results by ID (an object might match multiple values)
		const uniqueResults = Array.from(
			new Map(allResults.map(obj => [obj.id, obj])).values()
		);
		
		// Apply limit after deduplication if needed
		results = !returnAll && limit ? uniqueResults.slice(0, limit) : uniqueResults;
	} else {
		// Normal flow - no batching needed
		if (returnAll) {
			results = await hubspotApiRequestAllItems.call(
				context,
				'POST',
				`/crm/v3/objects/${objectType}/search`,
				body,
			);
		} else {
			results = await hubspotApiRequestAllItems.call(
				context,
				'POST',
				`/crm/v3/objects/${objectType}/search`,
				body,
				limit,
			);
		}
	}

	return results.map((result) => ({ json: result }));
}

async function createObject(
	context: IExecuteFunctions,
	objectType: string,
	i: number
): Promise<INodeExecutionData> {
	const { getAssociationTypeId, isCustomObjectType } = await import('../../../transport/AssociationTypeMapping');

	const propertiesToSet = context.getNodeParameter('propertiesToSet', i, {}) as { property?: PropertyToSet[] };
	const associationsToCreate = context.getNodeParameter('associations', i, {}) as { 
		association?: Array<{
			toObjectType: string;
			customToObjectType?: string;
			toObjectId: string;
		}>;
	};

	const properties: IDataObject = {};
	if (propertiesToSet.property) {
		propertiesToSet.property.forEach((prop: PropertyToSet) => {
			properties[prop.name] = prop.value;
		});
	}

	const body: IDataObject = { properties };

	// Process associations if provided
	if (associationsToCreate.association && associationsToCreate.association.length > 0) {
		const associations: Array<{
			to: { id: string };
			types: Array<{
				associationCategory: string;
				associationTypeId: number;
			}>;
		}> = [];

		for (const assoc of associationsToCreate.association) {
			const toObjectType = assoc.toObjectType === 'custom' 
				? assoc.customToObjectType! 
				: assoc.toObjectType;

			// Check if custom object - these need separate API calls
			if (isCustomObjectType(objectType) || isCustomObjectType(toObjectType)) {
				// Skip for now - will handle after object creation
				continue;
			}

			// Standard object → Use static mapping for default association
			const typeId = getAssociationTypeId(objectType, toObjectType);
			if (!typeId) {
				throw new Error(`No default association type found for ${objectType} → ${toObjectType}`);
			}

			associations.push({
				to: { id: String(assoc.toObjectId) },
				types: [{
					associationCategory: 'HUBSPOT_DEFINED',
					associationTypeId: typeId,
				}],
			});
		}

		if (associations.length > 0) {
			body.associations = associations;
		}
	}

	const response = await hubspotApiRequest.call(
		context,
		'POST',
		`/crm/v3/objects/${objectType}`,
		body,
	) as IDataObject;

	// Handle custom object associations separately
	if (associationsToCreate.association && associationsToCreate.association.length > 0) {
		const createdObjectId = (response.id || response.hs_object_id) as string;
		
		for (const assoc of associationsToCreate.association) {
			const toObjectType = assoc.toObjectType === 'custom' 
				? assoc.customToObjectType! 
				: assoc.toObjectType;

			// Only process custom object associations here
			if (isCustomObjectType(objectType) || isCustomObjectType(toObjectType)) {
				// Use default association API for custom objects
				await hubspotApiRequest.call(
					context,
					'PUT',
					`/crm/v4/objects/${objectType}/${createdObjectId}/associations/default/${toObjectType}/${assoc.toObjectId}`,
				);
			}
		}
	}

	return { json: response };
}

async function updateObject(
	context: IExecuteFunctions,
	objectType: string,
	i: number
): Promise<INodeExecutionData> {
	const objectId = context.getNodeParameter('objectId', i) as string;
	const idProperty = context.getNodeParameter('idProperty', i, 'hs_object_id') as string;
	const propertiesToSet = context.getNodeParameter('propertiesToSet', i, {}) as { property?: PropertyToSet[] };

	const properties: IDataObject = {};
	if (propertiesToSet.property) {
		propertiesToSet.property.forEach((prop: PropertyToSet) => {
			properties[prop.name] = prop.value;
		});
	}

	// Build query string with idProperty if not default
	const qs: IDataObject = {};
	if (idProperty !== 'hs_object_id') {
		qs.idProperty = idProperty;
	}

	const response = await hubspotApiRequest.call(
		context,
		'PATCH',
		`/crm/v3/objects/${objectType}/${objectId}`,
		{ properties },
		qs,
	) as IDataObject;

	return { json: response };
}

async function deleteObject(
	context: IExecuteFunctions,
	objectType: string,
	i: number
): Promise<INodeExecutionData> {
	const objectId = context.getNodeParameter('objectId', i) as string;

	await hubspotApiRequest.call(
		context,
		'DELETE',
		`/crm/v3/objects/${objectType}/${objectId}`,
	);

	return { json: { success: true, id: objectId } };
}

async function batchCreateObjects(
	context: IExecuteFunctions,
	objectType: string,
	items: INodeExecutionData[]
): Promise<INodeExecutionData[]> {
	const propertyMappings = context.getNodeParameter('propertyMappings', 0, {}) as {
		mapping?: Array<{ property: string; fieldName: string }>;
	};

	if (!propertyMappings.mapping || propertyMappings.mapping.length === 0) {
		throw new Error('At least one property mapping is required for batch create');
	}

	// Validate field mappings
	for (const mapping of propertyMappings.mapping!) {
		const validation = validateFieldMapping(items, mapping.fieldName);
		if (!validation.valid) {
			throw new Error(
				`Field "${mapping.fieldName}" not found in input items.\n\nAvailable fields: ${validation.availableFields.slice(0, 10).join(', ')}${validation.availableFields.length > 10 ? ', ...' : ''}\n\nTip: Enter the field NAME (e.g., "email"), not the field VALUE (e.g., "john@example.com").`,
			);
		}
		if (validation.missingCount > 0) {
			context.logger.warn(
				`Field "${mapping.fieldName}" is missing in ${validation.missingCount} of ${items.length} input items.`,
			);
		}
	}

	const inputs = items.map((item) => {
		const properties: IDataObject = {};

		propertyMappings.mapping!.forEach((map) => {
			const value = getNestedValue(item.json, map.fieldName);
			if (value !== undefined && value !== null) {
				properties[map.property] = value;
			}
		});

		return { properties };
	});

	const batchSize = 100;
	const allResults: IDataObject[] = [];

	for (let i = 0; i < inputs.length; i += batchSize) {
		const batch = inputs.slice(i, i + batchSize);

		const response = await hubspotApiRequest.call(
			context,
			'POST',
			`/crm/v3/objects/${objectType}/batch/create`,
			{ inputs: batch },
		) as { results: IDataObject[] };

		allResults.push(...response.results);
	}

	return allResults.map((result, index) => ({
		json: result,
		pairedItem: { item: index },
	}));
}

async function batchUpdateObjects(
	context: IExecuteFunctions,
	objectType: string,
	items: INodeExecutionData[]
): Promise<INodeExecutionData[]> {
	const idField = context.getNodeParameter('idField', 0) as string;
	const idProperty = context.getNodeParameter('idProperty', 0, 'hs_object_id') as string;
	const propertyMappings = context.getNodeParameter('propertyMappings', 0, {}) as {
		mapping?: Array<{ property: string; fieldName: string }>;
	};

	if (!propertyMappings.mapping || propertyMappings.mapping.length === 0) {
		throw new Error('At least one property mapping is required for batch update');
	}

	// Validate ID field
	const idValidation = validateFieldMapping(items, idField);
	if (!idValidation.valid) {
		throw new Error(buildFieldNotFoundError(idField, idValidation.availableFields, 'IDs'));
	}

	// Validate property mappings
	for (const mapping of propertyMappings.mapping!) {
		const validation = validateFieldMapping(items, mapping.fieldName);
		if (!validation.valid) {
			throw new Error(
				`Field "${mapping.fieldName}" not found in input items.\n\nAvailable fields: ${validation.availableFields.slice(0, 10).join(', ')}${validation.availableFields.length > 10 ? ', ...' : ''}\n\nTip: Enter the field NAME (e.g., "email"), not the field VALUE (e.g., "john@example.com").`,
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

		const input: IDataObject = {
			id: String(objectId),
			properties,
		};

		// Add idProperty to each input if not default
		if (idProperty !== 'hs_object_id') {
			input.idProperty = idProperty;
		}

		return input;
	});

	const batchSize = 100;
	const allResults: IDataObject[] = [];

	for (let i = 0; i < inputs.length; i += batchSize) {
		const batch = inputs.slice(i, i + batchSize);

		const response = await hubspotApiRequest.call(
			context,
			'POST',
			`/crm/v3/objects/${objectType}/batch/update`,
			{ inputs: batch },
		) as { results: IDataObject[] };

		allResults.push(...response.results);
	}

	return allResults.map((result, index) => ({
		json: result,
		pairedItem: { item: index },
	}));
}

async function batchUpsertObjects(
	context: IExecuteFunctions,
	objectType: string,
	items: INodeExecutionData[]
): Promise<INodeExecutionData[]> {
	const idField = context.getNodeParameter('idField', 0) as string;
	const idProperty = context.getNodeParameter('idProperty', 0, 'hs_object_id') as string;
	const propertyMappings = context.getNodeParameter('propertyMappings', 0, {}) as {
		mapping?: Array<{ property: string; fieldName: string }>;
	};

	if (!propertyMappings.mapping || propertyMappings.mapping.length === 0) {
		throw new Error('At least one property mapping is required for batch upsert');
	}

	const idValidation = validateFieldMapping(items, idField);
	if (!idValidation.valid) {
		throw new Error(buildFieldNotFoundError(idField, idValidation.availableFields, 'IDs'));
	}

	for (const mapping of propertyMappings.mapping!) {
		const validation = validateFieldMapping(items, mapping.fieldName);
		if (!validation.valid) {
			throw new Error(
				`Field "${mapping.fieldName}" not found in input items.\n\nAvailable fields: ${validation.availableFields.slice(0, 10).join(', ')}${validation.availableFields.length > 10 ? ', ...' : ''}\n\nTip: Enter the field NAME (e.g., "email"), not the field VALUE (e.g., "john@example.com").`,
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

		return {
			id: String(objectId),
			properties,
			idProperty: idProperty,
		};
	});

	const batchSize = 100;
	const allResults: IDataObject[] = [];

	for (let i = 0; i < inputs.length; i += batchSize) {
		const batch = inputs.slice(i, i + batchSize);

		const response = await hubspotApiRequest.call(
			context,
			'POST',
			`/crm/v3/objects/${objectType}/batch/upsert`,
			{ inputs: batch },
		) as { results: IDataObject[] };

		allResults.push(...response.results);
	}

	return allResults.map((result, index) => ({
		json: result,
		pairedItem: { item: index },
	}));
}

async function batchDeleteObjects(
	context: IExecuteFunctions,
	objectType: string,
	items: INodeExecutionData[]
): Promise<INodeExecutionData[]> {
	const idField = context.getNodeParameter('idField', 0) as string;

	const validation = validateFieldMapping(items, idField);

	if (!validation.valid) {
		throw new Error(buildFieldNotFoundError(idField, validation.availableFields, 'IDs'));
	}

	if (validation.missingCount > 0) {
		context.logger.warn(
			`Field "${idField}" is missing in ${validation.missingCount} of ${items.length} input items. Only ${validation.presentCount} items will be deleted.`,
		);
	}

	const inputs = items.map((item, index) => {
		const objectId = getNestedValue(item.json, idField);
		if (!objectId) {
			throw new Error(`Missing ID field "${idField}" in item ${index}`);
		}

		return { id: String(objectId) };
	});

	const batchSize = 100;
	const allResults: string[] = [];

	for (let i = 0; i < inputs.length; i += batchSize) {
		const batch = inputs.slice(i, i + batchSize);

		await hubspotApiRequest.call(
			context,
			'POST',
			`/crm/v3/objects/${objectType}/batch/archive`,
			{ inputs: batch },
		);

		batch.forEach((input) => allResults.push(input.id));
	}

	return allResults.map((id, index) => ({
		json: { success: true, id },
		pairedItem: { item: index },
	}));
}
