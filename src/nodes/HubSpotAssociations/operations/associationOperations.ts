import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { hubspotApiRequest, hubspotBatchRequest } from '../../../transport/HubSpotApiRequest';

interface AssociationType {
	category: string;
	typeId: number;
	label: string | null;
}

interface AssociationTo {
	toObjectId: number;
	associationTypes: AssociationType[];
}

interface AssociationResult {
	from: { id: string };
	to: AssociationTo[];
}

export async function executeAssociationOperation(
	context: IExecuteFunctions,
	operation: string,
	fromObjectType: string,
	toObjectType: string,
	items: INodeExecutionData[],
	itemIndex: number
): Promise<INodeExecutionData[]> {
	switch (operation) {
		case 'getAssociations':
			return getAssociations(context, fromObjectType, toObjectType, items);
		case 'hydrateAssociations':
			return hydrateAssociations(context, fromObjectType, toObjectType, items);
		case 'createAssociation':
			return [await createAssociation(context, fromObjectType, toObjectType, itemIndex)];
		case 'deleteAssociation':
			return [await deleteAssociation(context, fromObjectType, toObjectType, itemIndex)];
		default:
			throw new Error(`Unknown association operation: ${operation}`);
	}
}

async function getAssociations(
	context: IExecuteFunctions,
	fromObjectType: string,
	toObjectType: string,
	items: INodeExecutionData[]
): Promise<INodeExecutionData[]> {
	const idField = context.getNodeParameter('idField', 0) as string;
	const outputField = context.getNodeParameter('outputField', 0) as string;

	const objectIds = items
		.map((item) => item.json[idField] as string)
		.filter((id) => id);

	if (objectIds.length === 0) {
		throw new Error(`No valid IDs found in field "${idField}"`);
	}

	const associationMap = await fetchAssociations(context, fromObjectType, toObjectType, objectIds);

	const returnData: INodeExecutionData[] = [];
	items.forEach((item, index) => {
		const objectId = item.json[idField] as string;
		const associations = associationMap.get(objectId) || [];

		returnData.push({
			json: {
				...item.json,
				[outputField]: associations,
			},
			pairedItem: { item: index },
		});
	});

	return returnData;
}

async function hydrateAssociations(
	context: IExecuteFunctions,
	fromObjectType: string,
	toObjectType: string,
	items: INodeExecutionData[]
): Promise<INodeExecutionData[]> {
	const idField = context.getNodeParameter('idField', 0) as string;
	const outputField = context.getNodeParameter('outputField', 0) as string;
	const properties = context.getNodeParameter('properties', 0, []) as string[] | string;
	const propertyList = Array.isArray(properties)
		? properties
		: (properties ? properties.split(',').map((p) => p.trim()) : []);

	const objectIds = items
		.map((item) => item.json[idField] as string)
		.filter((id) => id);

	if (objectIds.length === 0) {
		throw new Error(`No valid IDs found in field "${idField}"`);
	}

	const { associationMap, allAssociations } = await fetchAssociationsWithResults(
		context,
		fromObjectType,
		toObjectType,
		objectIds
	);

	const uniqueToIds = new Set<string>();
	allAssociations.forEach((assoc) => {
		assoc.to.forEach((toObj) => {
			uniqueToIds.add(toObj.toObjectId.toString());
		});
	});

	const toIdsArray = Array.from(uniqueToIds);
	const hydratedObjects = await hubspotBatchRequest.call(
		context,
		toObjectType,
		toIdsArray,
		propertyList,
	);

	const objectMap = new Map<string, IDataObject>();
	hydratedObjects.forEach((obj) => {
		const id = String(obj.id);
		objectMap.set(id, obj);
	});

	const returnData: INodeExecutionData[] = [];
	items.forEach((item, index) => {
		const objectId = item.json[idField] as string;
		const associations = associationMap.get(objectId) || [];

		const enrichedAssociations = associations.map((assoc) => {
			const toId = assoc.toObjectId.toString();
			const fullObject = objectMap.get(toId);
			return {
				id: toId,
				associationTypes: assoc.associationTypes,
				object: fullObject || null,
			};
		});

		returnData.push({
			json: {
				...item.json,
				[outputField]: enrichedAssociations,
			},
			pairedItem: { item: index },
		});
	});

	return returnData;
}

async function createAssociation(
	context: IExecuteFunctions,
	fromObjectType: string,
	toObjectType: string,
	i: number
): Promise<INodeExecutionData> {
	const fromObjectId = context.getNodeParameter('fromObjectId', i) as string;
	const toObjectId = context.getNodeParameter('toObjectId', i) as string;

	await hubspotApiRequest.call(
		context,
		'PUT',
		`/crm/v4/objects/${fromObjectType}/${fromObjectId}/associations/${toObjectType}/${toObjectId}`,
	);

	return {
		json: {
			success: true,
			from: { type: fromObjectType, id: fromObjectId },
			to: { type: toObjectType, id: toObjectId },
		},
		pairedItem: { item: i },
	};
}

async function deleteAssociation(
	context: IExecuteFunctions,
	fromObjectType: string,
	toObjectType: string,
	i: number
): Promise<INodeExecutionData> {
	const fromObjectId = context.getNodeParameter('fromObjectId', i) as string;
	const toObjectId = context.getNodeParameter('toObjectId', i) as string;

	await hubspotApiRequest.call(
		context,
		'DELETE',
		`/crm/v4/objects/${fromObjectType}/${fromObjectId}/associations/${toObjectType}/${toObjectId}`,
	);

	return {
		json: {
			success: true,
			from: { type: fromObjectType, id: fromObjectId },
			to: { type: toObjectType, id: toObjectId },
		},
		pairedItem: { item: i },
	};
}

async function fetchAssociations(
	context: IExecuteFunctions,
	fromObjectType: string,
	toObjectType: string,
	objectIds: string[]
): Promise<Map<string, AssociationTo[]>> {
	const batchSize = 1000;
	const allAssociations: AssociationResult[] = [];

	for (let i = 0; i < objectIds.length; i += batchSize) {
		const batch = objectIds.slice(i, i + batchSize);

		const body = {
			inputs: batch.map((id) => ({ id })),
		};

		const response = await hubspotApiRequest.call(
			context,
			'POST',
			`/crm/v4/associations/${fromObjectType}/${toObjectType}/batch/read`,
			body,
		) as { results?: AssociationResult[] };

		if (response.results) {
			allAssociations.push(...response.results);
		}
	}

	const associationMap = new Map<string, AssociationTo[]>();
	allAssociations.forEach((assoc) => {
		const fromId = assoc.from.id;
		if (!associationMap.has(fromId)) {
			associationMap.set(fromId, []);
		}
		associationMap.get(fromId)!.push(...assoc.to);
	});

	return associationMap;
}

async function fetchAssociationsWithResults(
	context: IExecuteFunctions,
	fromObjectType: string,
	toObjectType: string,
	objectIds: string[]
): Promise<{ associationMap: Map<string, AssociationTo[]>; allAssociations: AssociationResult[] }> {
	const batchSize = 1000;
	const allAssociations: AssociationResult[] = [];

	for (let i = 0; i < objectIds.length; i += batchSize) {
		const batch = objectIds.slice(i, i + batchSize);

		const body = {
			inputs: batch.map((id) => ({ id })),
		};

		const response = await hubspotApiRequest.call(
			context,
			'POST',
			`/crm/v4/associations/${fromObjectType}/${toObjectType}/batch/read`,
			body,
		) as { results?: AssociationResult[] };

		if (response.results) {
			allAssociations.push(...response.results);
		}
	}

	const associationMap = new Map<string, AssociationTo[]>();
	allAssociations.forEach((assoc) => {
		const fromId = assoc.from.id;
		if (!associationMap.has(fromId)) {
			associationMap.set(fromId, []);
		}
		associationMap.get(fromId)!.push(...assoc.to);
	});

	return { associationMap, allAssociations };
}
