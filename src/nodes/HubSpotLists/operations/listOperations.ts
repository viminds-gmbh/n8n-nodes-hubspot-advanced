import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { hubspotApiRequest, hubspotBatchRequest } from '../../../transport/HubSpotApiRequest';
import { HUBSPOT_OBJECT_TYPE_TO_ID } from '../../../types';

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

		if (membershipsResponse.results) {
			membershipsResponse.results.forEach((membership: { recordId: string }) => {
				memberRecordIds.push(membership.recordId);
			});
		}

		after = membershipsResponse.paging?.next?.after;
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

	const objectTypeId = HUBSPOT_OBJECT_TYPE_TO_ID[objectType] || objectType;

	const body: IDataObject = {
		name: listName,
		objectTypeId,
		processingType: listType,
	};

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

	return { json: response };
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
		[recordId] as any,
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

	const recordIds: string[] = [];
	for (let j = 0; j < items.length; j++) {
		const itemData = items[j].json;
		const id = itemData[idField] as string;
		if (id) {
			recordIds.push(String(id));
		}
	}

	if (recordIds.length === 0) {
		throw new Error(
			`No IDs found in input items. Please ensure your input items have a "${idField}" field, or change the "ID Field" parameter.`,
		);
	}

	const batchSize = 100;
	const results: IDataObject[] = [];

	for (let j = 0; j < recordIds.length; j += batchSize) {
		const batch = recordIds.slice(j, j + batchSize);

		const response = await hubspotApiRequest.call(
			context,
			'PUT',
			`/crm/v3/lists/${listId}/memberships/add`,
			batch as any,
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
		[recordId] as any,
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

async function removeManyMembers(
	context: IExecuteFunctions,
	items: INodeExecutionData[],
	i: number
): Promise<INodeExecutionData> {
	const listId = context.getNodeParameter('listId', i) as string;
	const idField = context.getNodeParameter('idField', i, 'id') as string;

	const recordIds: string[] = [];
	for (let j = 0; j < items.length; j++) {
		const itemData = items[j].json;
		const id = itemData[idField] as string;
		if (id) {
			recordIds.push(String(id));
		}
	}

	if (recordIds.length === 0) {
		throw new Error(
			`No IDs found in input items. Please ensure your input items have a "${idField}" field, or change the "ID Field" parameter.`,
		);
	}

	const batchSize = 100;
	const results: IDataObject[] = [];

	for (let j = 0; j < recordIds.length; j += batchSize) {
		const batch = recordIds.slice(j, j + batchSize);

		const response = await hubspotApiRequest.call(
			context,
			'PUT',
			`/crm/v3/lists/${listId}/memberships/remove`,
			batch as any,
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
