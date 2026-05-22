import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { hubspotApiRequest, hubspotApiRequestAllItems } from '../../../transport/HubSpotApiRequest';
import type { EventCreateFields, EventUpdateFields, CustomProperty } from '../types';

export async function executeEventOperation(
	context: IExecuteFunctions,
	operation: string,
	items: INodeExecutionData[],
	itemIndex: number
): Promise<INodeExecutionData[]> {
	switch (operation) {
		case 'get':
			return [await getEvent(context, itemIndex)];
		case 'create':
			return [await createEvent(context, itemIndex)];
		case 'search':
			return await searchEvents(context, itemIndex);
		case 'update':
			return [await updateEvent(context, itemIndex)];
		case 'delete':
			return [await deleteEvent(context, itemIndex)];
		case 'getParticipants':
			return await getParticipants(context, itemIndex);
		case 'getStats':
			return [await getStats(context, itemIndex)];
		case 'getAssociatedLists':
			return await getAssociatedLists(context, itemIndex);
		case 'associateList':
			return [await associateList(context, itemIndex)];
		case 'disassociateList':
			return [await disassociateList(context, itemIndex)];
		default:
			throw new Error(`Unknown event operation: ${operation}`);
	}
}

async function getEvent(context: IExecuteFunctions, i: number): Promise<INodeExecutionData> {
	const objectId = context.getNodeParameter('objectId', i) as string;
	const response = await hubspotApiRequest.call(
		context,
		'GET',
		`/marketing/v3/marketing-events/${objectId}`
	) as IDataObject;
	return { json: response };
}

async function createEvent(context: IExecuteFunctions, i: number): Promise<INodeExecutionData> {
	const eventName = context.getNodeParameter('eventName', i) as string;
	const eventOrganizer = context.getNodeParameter('eventOrganizer', i) as string;
	const externalEventId = context.getNodeParameter('externalEventId', i) as string;
	const createFields = context.getNodeParameter('createFields', i, {}) as EventCreateFields;
	const customProperties = context.getNodeParameter('customProperties', i, {}) as { property?: CustomProperty[] };

	const body: IDataObject = {
		eventName,
		eventOrganizer,
		externalEventId,
		externalAccountId: createFields.externalAccountId || ''
	};

	if (createFields.startDateTime) body.startDateTime = createFields.startDateTime;
	if (createFields.endDateTime) body.endDateTime = createFields.endDateTime;
	if (createFields.eventUrl) body.eventUrl = createFields.eventUrl;
	if (createFields.eventDescription) body.eventDescription = createFields.eventDescription;
	if (createFields.eventType) body.eventType = createFields.eventType;
	if (createFields.eventCancelled !== undefined) body.eventCancelled = createFields.eventCancelled;

	if (customProperties.property && customProperties.property.length > 0) {
		body.customProperties = customProperties.property.map((prop: CustomProperty) => ({
			name: prop.name,
			value: prop.value
		}));
	}

	const response = await hubspotApiRequest.call(
		context,
		'POST',
		'/marketing/v3/marketing-events/events',
		body
	) as IDataObject;

	return { json: response };
}

async function searchEvents(context: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const returnAll = context.getNodeParameter('returnAll', i) as boolean;
	const limit = context.getNodeParameter('limit', i, 50) as number;

	let results: IDataObject[];
	if (returnAll) {
		results = await hubspotApiRequestAllItems.call(
			context,
			'GET',
			'/marketing/v3/marketing-events',
			{}
		) as IDataObject[];
	} else {
		const response = await hubspotApiRequest.call(
			context,
			'GET',
			'/marketing/v3/marketing-events',
			{},
			{ limit }
		) as IDataObject;
		results = (response.results as IDataObject[]) || [];
	}

	return results.map((result: IDataObject) => ({ json: result }));
}

async function updateEvent(context: IExecuteFunctions, i: number): Promise<INodeExecutionData> {
	const objectId = context.getNodeParameter('objectId', i) as string;
	const updateFields = context.getNodeParameter('updateFields', i, {}) as EventUpdateFields;
	const customProperties = context.getNodeParameter('customProperties', i, {}) as { property?: CustomProperty[] };

	const body: IDataObject = {};
	if (updateFields.eventName) body.eventName = updateFields.eventName;
	if (updateFields.eventOrganizer) body.eventOrganizer = updateFields.eventOrganizer;
	if (updateFields.startDateTime) body.startDateTime = updateFields.startDateTime;
	if (updateFields.endDateTime) body.endDateTime = updateFields.endDateTime;
	if (updateFields.eventUrl) body.eventUrl = updateFields.eventUrl;
	if (updateFields.eventDescription) body.eventDescription = updateFields.eventDescription;
	if (updateFields.eventType) body.eventType = updateFields.eventType;
	if (updateFields.eventCancelled !== undefined) body.eventCancelled = updateFields.eventCancelled;

	if (customProperties.property && customProperties.property.length > 0) {
		body.customProperties = customProperties.property.map((prop: CustomProperty) => ({
			name: prop.name,
			value: prop.value
		}));
	}

	const response = await hubspotApiRequest.call(
		context,
		'PATCH',
		`/marketing/v3/marketing-events/${objectId}`,
		body
	) as IDataObject;

	return { json: response };
}

async function deleteEvent(context: IExecuteFunctions, i: number): Promise<INodeExecutionData> {
	const objectId = context.getNodeParameter('objectId', i) as string;

	await hubspotApiRequest.call(
		context,
		'DELETE',
		`/marketing/v3/marketing-events/${objectId}`
	);

	return { json: { success: true, id: objectId } };
}

async function getParticipants(context: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const objectId = context.getNodeParameter('objectId', i) as string;
	const returnAll = context.getNodeParameter('returnAll', i) as boolean;
	const limit = context.getNodeParameter('limit', i, 50) as number;
	const filters = context.getNodeParameter('filters', i, {}) as IDataObject;

	const qs: IDataObject = {};
	if (filters.state) qs.state = filters.state;
	if (filters.contactIdentifier) qs.contactIdentifier = filters.contactIdentifier;

	const endpoint = `/marketing/v3/marketing-events/participations/${objectId}/breakdown`;

	let results: IDataObject[];
	if (returnAll) {
		results = await hubspotApiRequestAllItems.call(
			context,
			'GET',
			endpoint,
			{},
			undefined
		) as IDataObject[];
	} else {
		qs.limit = limit;
		const response = await hubspotApiRequest.call(
			context,
			'GET',
			endpoint,
			{},
			qs
		) as IDataObject;
		results = (response.results as IDataObject[]) || [];
	}

	return results.map((result: IDataObject) => ({ json: result }));
}

async function getStats(context: IExecuteFunctions, i: number): Promise<INodeExecutionData> {
	const objectId = context.getNodeParameter('objectId', i) as string;

	const response = await hubspotApiRequest.call(
		context,
		'GET',
		`/marketing/v3/marketing-events/participations/${objectId}`
	) as IDataObject;

	return { json: response };
}

async function getAssociatedLists(context: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const objectId = context.getNodeParameter('objectId', i) as string;
	const returnAll = context.getNodeParameter('returnAll', i) as boolean;
	const limit = context.getNodeParameter('limit', i, 50) as number;

	const endpoint = `/marketing/v3/marketing-events/associations/${objectId}/lists`;

	let results: IDataObject[];
	if (returnAll) {
		results = await hubspotApiRequestAllItems.call(
			context,
			'GET',
			endpoint,
			{},
			undefined
		) as IDataObject[];
	} else {
		const response = await hubspotApiRequest.call(
			context,
			'GET',
			endpoint,
			{},
			{ limit }
		) as IDataObject;
		results = (response.results as IDataObject[]) || [];
	}

	return results.map((result: IDataObject) => ({ json: result }));
}

async function associateList(context: IExecuteFunctions, i: number): Promise<INodeExecutionData> {
	const objectId = context.getNodeParameter('objectId', i) as string;
	const listId = context.getNodeParameter('listId', i) as string;

	await hubspotApiRequest.call(
		context,
		'PUT',
		`/marketing/v3/marketing-events/associations/${objectId}/lists/${listId}`
	);

	return { json: { success: true, eventId: objectId, listId } };
}

async function disassociateList(context: IExecuteFunctions, i: number): Promise<INodeExecutionData> {
	const objectId = context.getNodeParameter('objectId', i) as string;
	const listId = context.getNodeParameter('listId', i) as string;

	await hubspotApiRequest.call(
		context,
		'DELETE',
		`/marketing/v3/marketing-events/associations/${objectId}/lists/${listId}`
	);

	return { json: { success: true, eventId: objectId, listId } };
}
