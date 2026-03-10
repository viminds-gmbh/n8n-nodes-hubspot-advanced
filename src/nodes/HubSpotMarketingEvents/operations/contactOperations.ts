import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { hubspotApiRequest } from '../../../transport/HubSpotApiRequest';

export async function executeContactOperation(
	context: IExecuteFunctions,
	operation: string,
	items: INodeExecutionData[],
	itemIndex: number
): Promise<INodeExecutionData> {
	const objectId = context.getNodeParameter('objectId', itemIndex) as string;
	const identifierType = context.getNodeParameter('identifierType', itemIndex) as string;
	const interactionDateTimeField = context.getNodeParameter('interactionDateTimeField', itemIndex, '') as string;

	let subscriberState: string;
	if (operation === 'register') {
		subscriberState = 'register';
	} else if (operation === 'attend') {
		subscriberState = 'attend';
	} else if (operation === 'cancel') {
		subscriberState = 'cancel';
	} else {
		throw new Error(`Unknown contact operation: ${operation}`);
	}

	let endpoint: string;
	const input: IDataObject = {};

	if (identifierType === 'contactId') {
		const contactId = context.getNodeParameter('contactId', itemIndex) as string;

		if (!contactId) {
			throw new Error('Contact ID is required');
		}

		input.vid = parseInt(String(contactId), 10);
		endpoint = `/marketing/v3/marketing-events/${objectId}/attendance/${subscriberState}/create`;
	} else {
		const email = context.getNodeParameter('email', itemIndex) as string;

		if (!email) {
			throw new Error('Email is required');
		}

		input.email = String(email);
		endpoint = `/marketing/v3/marketing-events/${objectId}/attendance/${subscriberState}/email-create`;
	}

	const itemData = items[itemIndex].json;
	if (interactionDateTimeField && itemData[interactionDateTimeField]) {
		input.interactionDateTime = String(itemData[interactionDateTimeField]);
	} else {
		input.interactionDateTime = new Date().toISOString();
	}

	const body = { inputs: [input] };
	const response = await hubspotApiRequest.call(context, 'POST', endpoint, body) as IDataObject;
	return { json: response };
}
