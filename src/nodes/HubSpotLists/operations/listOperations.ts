import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { hubspotApiRequest, hubspotBatchRequest } from '../../../transport/HubSpotApiRequest';
import { HUBSPOT_OBJECT_TYPE_TO_ID } from '../../../types';
import { validateFieldMapping, buildFieldNotFoundError } from '../../../transport/ValidationHelpers';
import { getNestedValue } from '../../../transport/NestedValueAccessor';

interface FilterGroup {
	propertyName: string;
	operator: string;
	value: string;
}

function buildFilterOperation(operator: string, value: string): IDataObject {
	switch (operator) {
		case 'EQ':
			return {
				operationType: 'STRING',
				operator: 'IS_EQUAL_TO',
				value,
			};
		case 'NEQ':
			return {
				operationType: 'STRING',
				operator: 'IS_NOT_EQUAL_TO',
				value,
			};
		case 'CONTAINS':
			return {
				operationType: 'STRING',
				operator: 'CONTAINS',
				value,
			};
		case 'NOT_CONTAINS':
			return {
				operationType: 'STRING',
				operator: 'DOES_NOT_CONTAIN',
				value,
			};
		case 'HAS_PROPERTY':
			return {
				operationType: 'ALL_PROPERTY',
				operator: 'HAS_PROPERTY',
			};
		case 'NOT_HAS_PROPERTY':
			return {
				operationType: 'ALL_PROPERTY',
				operator: 'NOT_HAS_PROPERTY',
			};
		case 'LT':
			return {
				operationType: 'NUMBER',
				operator: 'IS_LESS_THAN',
				value,
			};
		case 'GT':
			return {
				operationType: 'NUMBER',
				operator: 'IS_GREATER_THAN',
				value,
			};
		default:
			return {
				operationType: 'STRING',
				operator: 'IS_EQUAL_TO',
				value,
			};
	}
}

export async function executeListOperation(
	context: IExecuteFunctions,
	operation: string,
	objectType: string,
	items: INodeExecutionData[],
	itemIndex: number
): Promise<INodeExecutionData[]> {
	switch (operation) {
		case 'getListMembers':
			return await getListMembers(context, objectType, itemIndex);
		case 'createList':
			return [await createList(context, objectType, itemIndex)];
		case 'updateListName':
			return [await updateListName(context, itemIndex)];
		case 'deleteList':
			return [await deleteList(context, itemIndex)];
		case 'addMember':
			return [await addMember(context, itemIndex)];
		case 'addManyMembers':
			return [await addManyMembers(context, items, itemIndex)];
		case 'removeMember':
			return [await removeMember(context, itemIndex)];
		case 'removeManyMembers':
			return [await removeManyMembers(context, items, itemIndex)];
		case 'createFolder':
			return [await createFolder(context, itemIndex)];
		case 'getFolders':
			return [await getFolders(context, itemIndex)];
		case 'deleteFolder':
			return [await deleteFolder(context, itemIndex)];
		case 'getLists':
			return [await getLists(context, items, itemIndex)];
		case 'searchLists':
			return await searchLists(context, itemIndex);
		default:
			throw new Error(`Unknown list operation: ${operation}`);
	}
}

async function getListMembers(
	context: IExecuteFunctions,
	objectType: string,
	i: number
): Promise<INodeExecutionData[]> {
	const listId = context.getNodeParameter('listId', i) as string;
	const properties = context.getNodeParameter('properties', i, []) as string[] | string;
	const returnAll = context.getNodeParameter('returnAll', i) as boolean;
	const limit = returnAll ? undefined : (context.getNodeParameter('limit', i, 100) as number);

	const memberRecordIds: string[] = [];
	let after: string | undefined;
	let hasMore = true;

	while (hasMore) {
		const queryParams: Record<string, string | number> = { limit: 250 };
		if (after) {
			queryParams.after = after;
		}

		const membershipsResponse = await hubspotApiRequest.call(
			context,
			'GET',
			`/crm/v3/lists/${listId}/memberships`,
			{},
			queryParams,
		);

		if (!membershipsResponse) {
			throw new Error('Empty response from HubSpot API');
		}

		const responseData = membershipsResponse as IDataObject;

		if (responseData.results && Array.isArray(responseData.results)) {
			(responseData.results as IDataObject[]).forEach((membership: IDataObject) => {
				memberRecordIds.push(membership.recordId as string);
			});
		}

		const paging = responseData?.paging as IDataObject | undefined;
		after = paging?.next ? (paging.next as IDataObject).after as string | undefined : undefined;
		hasMore = !!after && (returnAll || !limit || memberRecordIds.length < limit);

		if (!returnAll && limit && memberRecordIds.length >= limit) {
			memberRecordIds.splice(limit);
			break;
		}
	}

	if (memberRecordIds.length === 0) {
		return [];
	}

	const propertiesArray = Array.isArray(properties) ? properties : (properties ? properties.split(',').map((p) => p.trim()) : []);
	const hydratedRecords = await hubspotBatchRequest.call(
		context,
		objectType,
		memberRecordIds,
		propertiesArray,
	);

	return hydratedRecords.map((record) => ({ json: record }));
}

async function createList(
	context: IExecuteFunctions,
	objectType: string,
	i: number
): Promise<INodeExecutionData> {
	const listName = context.getNodeParameter('listName', i) as string;
	const listType = context.getNodeParameter('listType', i) as string;
	const filters = context.getNodeParameter('filters', i, {}) as { filterGroups?: FilterGroup[] };
	const listFolderId = context.getNodeParameter('listFolderId', i, '') as string;

	const objectTypeId = HUBSPOT_OBJECT_TYPE_TO_ID[objectType] || objectType;

	const body: IDataObject = {
		name: listName,
		objectTypeId,
		processingType: listType,
	};

	if (listFolderId && listFolderId !== '0') {
		body.listFolderId = listFolderId;
	}

	if (listType === 'DYNAMIC' && filters.filterGroups && filters.filterGroups.length > 0) {
		body.filterBranch = {
			filterBranchType: 'OR',
			filterBranches: [
				{
					filterBranchType: 'AND',
					filters: filters.filterGroups.map((f: FilterGroup) => ({
						filterType: 'PROPERTY',
						property: f.propertyName,
						operation: buildFilterOperation(f.operator, f.value),
					})),
				},
			],
		};
	}

	const response = await hubspotApiRequest.call(
		context,
		'POST',
		'/crm/v3/lists/',
		body,
	) as IDataObject;

	return { json: (response.list as IDataObject) || response };
}

async function updateListName(
	context: IExecuteFunctions,
	i: number
): Promise<INodeExecutionData> {
	const listId = context.getNodeParameter('listId', i) as string;
	const newListName = context.getNodeParameter('newListName', i) as string;

	const response = await hubspotApiRequest.call(
		context,
		'PUT',
		`/crm/v3/lists/${listId}/update-list-name`,
		{},
		{ listName: newListName },
	) as IDataObject;

	return { json: response };
}

async function deleteList(
	context: IExecuteFunctions,
	i: number
): Promise<INodeExecutionData> {
	const listId = context.getNodeParameter('listId', i) as string;

	await hubspotApiRequest.call(
		context,
		'DELETE',
		`/crm/v3/lists/${listId}`,
	);

	return { json: { success: true, listId } };
}

async function addMember(
	context: IExecuteFunctions,
	i: number
): Promise<INodeExecutionData> {
	const listId = context.getNodeParameter('listId', i) as string;
	const recordId = context.getNodeParameter('recordId', i) as string;

	const response = await hubspotApiRequest.call(
		context,
		'PUT',
		`/crm/v3/lists/${listId}/memberships/add`,
		[recordId],
	) as IDataObject;

	return {
		json: {
			success: true,
			listId,
			recordId,
			response,
		},
	};
}

async function addManyMembers(
	context: IExecuteFunctions,
	items: INodeExecutionData[],
	i: number
): Promise<INodeExecutionData> {
	const listId = context.getNodeParameter('listId', i) as string;
	const idField = context.getNodeParameter('idField', i, 'id') as string;

	const validation = validateFieldMapping(items, idField);

	if (!validation.valid) {
		throw new Error(buildFieldNotFoundError(idField, validation.availableFields, 'record IDs'));
	}

	if (validation.missingCount > 0) {
		context.logger.warn(
			`Field "${idField}" is missing in ${validation.missingCount} of ${items.length} input items. Only ${validation.presentCount} records will be added.`,
		);
	}

	const recordIds: string[] = [];
	for (let j = 0; j < items.length; j++) {
		const itemData = items[j].json;
		const id = getNestedValue(itemData, idField) as string;
		if (id) {
			recordIds.push(String(id));
		}
	}

	const batchSize = 100;
	const results: IDataObject[] = [];

	for (let j = 0; j < recordIds.length; j += batchSize) {
		const batch = recordIds.slice(j, j + batchSize);

		const response = await hubspotApiRequest.call(
			context,
			'PUT',
			`/crm/v3/lists/${listId}/memberships/add`,
			batch,
		) as IDataObject;

		results.push(response);
	}

	return {
		json: {
			success: true,
			listId,
			addedCount: recordIds.length,
			results,
		},
	};
}

async function removeMember(
	context: IExecuteFunctions,
	i: number
): Promise<INodeExecutionData> {
	const listId = context.getNodeParameter('listId', i) as string;
	const recordId = context.getNodeParameter('recordId', i) as string;

	const response = await hubspotApiRequest.call(
		context,
		'PUT',
		`/crm/v3/lists/${listId}/memberships/remove`,
		[recordId],
	) as IDataObject;

	return {
		json: {
			success: true,
			listId,
			recordId,
			response,
		},
	};
}

async function deleteFolder(
	context: IExecuteFunctions,
	i: number
): Promise<INodeExecutionData> {
	const folderId = context.getNodeParameter('deleteFolderId', i) as string;

	await hubspotApiRequest.call(
		context,
		'DELETE',
		`/crm/v3/lists/folders/${folderId}`,
	);

	return { json: { success: true, folderId } };
}

async function createFolder(
	context: IExecuteFunctions,
	i: number
): Promise<INodeExecutionData> {
	const folderName = context.getNodeParameter('folderName', i) as string;
	const parentFolderId = context.getNodeParameter('parentFolderId', i, '') as string;

	const body: IDataObject = {
		name: folderName,
	};

	if (parentFolderId && parentFolderId !== '0') {
		body.parentFolderId = parentFolderId;
	}

	const response = await hubspotApiRequest.call(
		context,
		'POST',
		'/crm/v3/lists/folders',
		body,
	) as IDataObject;

	return { json: response };
}

async function getFolders(
	context: IExecuteFunctions,
	i: number
): Promise<INodeExecutionData> {
	const folderId = context.getNodeParameter('folderId', i, '') as string;

	const queryParams: Record<string, string> = {};
	if (folderId) {
		queryParams.folderId = folderId;
	}

	const response = await hubspotApiRequest.call(
		context,
		'GET',
		'/crm/v3/lists/folders',
		{},
		queryParams,
	) as IDataObject;

	return { json: response };
}

async function removeManyMembers(
	context: IExecuteFunctions,
	items: INodeExecutionData[],
	i: number
): Promise<INodeExecutionData> {
	const listId = context.getNodeParameter('listId', i) as string;
	const idField = context.getNodeParameter('idField', i, 'id') as string;

	const validation = validateFieldMapping(items, idField);

	if (!validation.valid) {
		throw new Error(buildFieldNotFoundError(idField, validation.availableFields, 'record IDs'));
	}

	if (validation.missingCount > 0) {
		context.logger.warn(
			`Field "${idField}" is missing in ${validation.missingCount} of ${items.length} input items. Only ${validation.presentCount} records will be removed.`,
		);
	}

	const recordIds: string[] = [];
	for (let j = 0; j < items.length; j++) {
		const itemData = items[j].json;
		const id = getNestedValue(itemData, idField) as string;
		if (id) {
			recordIds.push(String(id));
		}
	}

	const batchSize = 100;
	const results: IDataObject[] = [];

	for (let j = 0; j < recordIds.length; j += batchSize) {
		const batch = recordIds.slice(j, j + batchSize);

		const response = await hubspotApiRequest.call(
			context,
			'PUT',
			`/crm/v3/lists/${listId}/memberships/remove`,
			batch,
		) as IDataObject;

		results.push(response);
	}

	return {
		json: {
			success: true,
			listId,
			removedCount: recordIds.length,
			results,
		},
	};
}

async function getLists(
	context: IExecuteFunctions,
	items: INodeExecutionData[],
	i: number
): Promise<INodeExecutionData> {
	const listIdField = context.getNodeParameter('listIdField', i, 'listId') as string;
	const includeFilters = context.getNodeParameter('includeFilters', i, false) as boolean;

	const validation = validateFieldMapping(items, listIdField);

	if (!validation.valid) {
		throw new Error(buildFieldNotFoundError(listIdField, validation.availableFields, 'list IDs'));
	}

	if (validation.missingCount > 0) {
		context.logger.warn(
			`Field "${listIdField}" is missing in ${validation.missingCount} of ${items.length} input items. Only ${validation.presentCount} lists will be fetched.`,
		);
	}

	const listIds: string[] = [];
	for (let j = 0; j < items.length; j++) {
		const itemData = items[j].json;
		const id = getNestedValue(itemData, listIdField) as string;
		if (id) {
			listIds.push(String(id));
		}
	}

	if (listIds.length === 0) {
		return { json: { lists: [] } };
	}

	const queryParams: Record<string, string[] | boolean> = {
		listIds,
	};

	if (includeFilters) {
		queryParams.includeFilters = true;
	}

	const response = await hubspotApiRequest.call(
		context,
		'GET',
		'/crm/v3/lists/',
		{},
		queryParams,
	) as IDataObject;

	return { json: response };
}

async function searchLists(
	context: IExecuteFunctions,
	i: number
): Promise<INodeExecutionData[]> {
	const searchQuery = context.getNodeParameter('searchQuery', i, '') as string;
	const processingTypes = context.getNodeParameter('processingTypes', i, []) as string[];
	const returnAll = context.getNodeParameter('returnAll', i) as boolean;
	const limit = returnAll ? undefined : (context.getNodeParameter('limit', i, 100) as number);

	const allLists: IDataObject[] = [];
	let offset = 0;
	let hasMore = true;

	while (hasMore) {
		const body: IDataObject = {
			query: searchQuery,
			count: 500,
			offset,
		};

		if (processingTypes && processingTypes.length > 0) {
			body.processingTypes = processingTypes;
		}

		const response = await hubspotApiRequest.call(
			context,
			'POST',
			'/crm/v3/lists/search',
			body,
		) as IDataObject;

		if (response.lists && Array.isArray(response.lists)) {
			allLists.push(...(response.lists as IDataObject[]));
		}

		hasMore = response.hasMore === true;
		offset = (response.offset as number) || 0;

		if (!returnAll && limit && allLists.length >= limit) {
			break;
		}
	}

	const results = !returnAll && limit ? allLists.slice(0, limit) : allLists;
	return results.map((list) => ({ json: list }));
}
