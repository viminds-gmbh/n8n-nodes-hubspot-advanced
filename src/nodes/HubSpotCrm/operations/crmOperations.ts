import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { hubspotApiRequest, hubspotApiRequestAllItems, hubspotBatchRequest } from '../../../transport/HubSpotApiRequest';

interface FilterGroup {
	propertyName: string;
	operator: string;
	value: string;
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
	const properties = context.getNodeParameter('properties', i, []) as string[] | string;

	const qs: IDataObject = {};
	if (properties && properties.length > 0) {
		const propertiesString = Array.isArray(properties) ? properties.join(',') : properties;
		qs.properties = propertiesString;
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

	const ids: string[] = [];
	for (let j = 0; j < items.length; j++) {
		const itemData = items[j].json;
		const id = itemData[idField] as string;
		if (id) {
			ids.push(String(id));
		}
	}

	if (ids.length === 0) {
		throw new Error(
			`No IDs found in input items. Please ensure your input items have a "${idField}" field, or change the "ID Field" parameter.`,
		);
	}

	const propertiesArray = Array.isArray(properties)
		? properties
		: (properties ? properties.split(',').map((p) => p.trim()) : []);

	const results = await hubspotBatchRequest.call(
		context,
		objectType,
		ids,
		propertiesArray,
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
				filters: filters.filterGroups.map((f: FilterGroup) => ({
					propertyName: f.propertyName,
					operator: f.operator,
					value: f.value,
				})),
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
		`/crm/v3/objects/${objectType}/${objectId}`,
		{ properties },
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
