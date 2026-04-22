import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { hubspotApiRequest, hubspotApiRequestAllItems } from '../../../transport/HubSpotApiRequest';

export async function executeSchemaOperation(
	context: IExecuteFunctions,
	operation: string,
	objectType: string,
	itemIndex: number
): Promise<INodeExecutionData[]> {
	switch (operation) {
		case 'getObjectTypes':
			return await getObjectTypes(context);
		case 'getObjectSchema':
			return [await getObjectSchema(context, objectType, itemIndex)];
		case 'getProperties':
			return await getProperties(context, objectType, itemIndex);
		case 'getAssociationLabelDefinitions':
			return await getAssociationLabelDefinitions(context, itemIndex);
		default:
			throw new Error(`Unknown schema operation: ${operation}`);
	}
}

async function getObjectTypes(context: IExecuteFunctions): Promise<INodeExecutionData[]> {
	const response = await hubspotApiRequest.call(
		context,
		'GET',
		'/crm/v3/schemas',
	) as IDataObject;

	if (response.results && Array.isArray(response.results)) {
		return (response.results as IDataObject[]).map((schema) => ({ json: schema }));
	}

	return [];
}

async function getObjectSchema(
	context: IExecuteFunctions,
	objectType: string,
	i: number
): Promise<INodeExecutionData> {
	const response = await hubspotApiRequest.call(
		context,
		'GET',
		`/crm/v3/schemas/${objectType}`,
	) as IDataObject;

	return { json: response, pairedItem: { item: i } };
}

async function getProperties(
	context: IExecuteFunctions,
	objectType: string,
	i: number
): Promise<INodeExecutionData[]> {
	const returnAll = context.getNodeParameter('returnAll', i) as boolean;
	const limit = returnAll ? undefined : (context.getNodeParameter('limit', i, 100) as number);

	const body: IDataObject = {};

	let results: IDataObject[];
	if (returnAll) {
		results = await hubspotApiRequestAllItems.call(
			context,
			'GET',
			`/crm/v3/properties/${objectType}`,
			body,
		);
	} else {
		results = await hubspotApiRequestAllItems.call(
			context,
			'GET',
			`/crm/v3/properties/${objectType}`,
			body,
			limit,
		);
	}

	return results.map((property: IDataObject) => ({ json: property }));
}

async function getAssociationLabelDefinitions(
	context: IExecuteFunctions,
	i: number
): Promise<INodeExecutionData[]> {
	const fromObjectTypeRaw = context.getNodeParameter('fromObjectType', i) as string;
	const fromObjectType = fromObjectTypeRaw === 'custom'
		? (context.getNodeParameter('customFromObjectType', i) as string)
		: fromObjectTypeRaw;

	const toObjectTypeRaw = context.getNodeParameter('toObjectType', i) as string;
	const toObjectType = toObjectTypeRaw === 'custom'
		? (context.getNodeParameter('customToObjectType', i) as string)
		: toObjectTypeRaw;

	const results = await hubspotApiRequestAllItems.call(
		context,
		'GET',
		`/crm/associations/v4/${fromObjectType}/${toObjectType}/labels`,
		{},
	);

	return results.map((label: IDataObject) => ({ json: label, pairedItem: { item: i } }));
}
