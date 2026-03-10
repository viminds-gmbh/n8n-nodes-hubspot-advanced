import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { hubspotApiRequest, hubspotFormSubmitRequest } from '../../../transport/HubSpotApiRequest';
import { HUBSPOT_OBJECT_TYPE_TO_ID } from '../../../types';
import type { FormField, FormContext, FormCommunication, FormSubmissionBody } from '../types';

export async function executeFormOperation(
	context: IExecuteFunctions,
	operation: string,
	itemIndex: number
): Promise<INodeExecutionData[]> {
	switch (operation) {
		case 'getForms':
			return getForms(context);
		case 'getSubmissions':
			return getSubmissions(context, itemIndex);
		case 'submitForm':
			return [await submitForm(context, itemIndex)];
		default:
			throw new Error(`Unknown form operation: ${operation}`);
	}
}

async function getForms(context: IExecuteFunctions): Promise<INodeExecutionData[]> {
	const response = await hubspotApiRequest.call(
		context,
		'GET',
		'/marketing/v3/forms',
	) as IDataObject;

	const results: INodeExecutionData[] = [];
	if (response.results && Array.isArray(response.results)) {
		(response.results as IDataObject[]).forEach((form: IDataObject) => {
			results.push({ json: form });
		});
	}

	return results;
}

async function getSubmissions(
	context: IExecuteFunctions,
	i: number
): Promise<INodeExecutionData[]> {
	const formGuid = context.getNodeParameter('formGuid', i) as string;
	const limit = context.getNodeParameter('limit', i, 50) as number;

	const response = await hubspotApiRequest.call(
		context,
		'GET',
		`/form-integrations/v1/submissions/forms/${formGuid}`,
		{},
		{ limit },
	) as IDataObject;

	const results: INodeExecutionData[] = [];
	if (response.results && Array.isArray(response.results)) {
		for (const submission of response.results as IDataObject[]) {
			results.push({ json: submission });
		}
	}

	return results;
}

async function submitForm(
	context: IExecuteFunctions,
	i: number
): Promise<INodeExecutionData> {
	const formGuid = context.getNodeParameter('formGuid', i) as string;
	const email = context.getNodeParameter('email', i) as string;
	const additionalFieldsData = context.getNodeParameter('additionalFields', i, {}) as IDataObject;
	const contextData = context.getNodeParameter('context', i, {}) as IDataObject;
	const submitEndpoint = context.getNodeParameter('submitEndpoint', i, 'secure') as string;
	const includeConsent = context.getNodeParameter('includeConsent', i, false) as boolean;

	const accountDetailsResponse = await hubspotApiRequest.call(
		context,
		'GET',
		'/account-info/v3/details',
	) as IDataObject;
	const portalId = String(accountDetailsResponse.portalId);

	const fields: FormField[] = [
		{
			objectTypeId: '0-1',
			name: 'email',
			value: email,
		},
	];

	if (additionalFieldsData.field && Array.isArray(additionalFieldsData.field)) {
		(additionalFieldsData.field as IDataObject[]).forEach((field) => {
			const objectTypeRaw = field.objectType as string;
			const objectType = objectTypeRaw === 'custom'
				? (field.customObjectType as string)
				: objectTypeRaw;

			const objectTypeId = objectTypeRaw === 'custom'
				? objectType
				: HUBSPOT_OBJECT_TYPE_TO_ID[objectType] || '0-1';

			fields.push({
				objectTypeId,
				name: field.propertyName as string,
				value: field.value as string,
			});
		});
	}

	const formContext: FormContext = {};
	if (contextData.contextFields) {
		const ctx = contextData.contextFields as IDataObject;
		if (ctx.pageUri) formContext.pageUri = ctx.pageUri as string;
		if (ctx.pageName) formContext.pageName = ctx.pageName as string;
		if (ctx.hutk) formContext.hutk = ctx.hutk as string;
		if (ctx.ipAddress) formContext.ipAddress = ctx.ipAddress as string;
	}

	const body: FormSubmissionBody = {
		fields,
		context: formContext,
	};

	if (includeConsent) {
		const consentText = context.getNodeParameter('consentText', i, 'Ich stimme der Verarbeitung zu') as string;
		const consentToProcess = context.getNodeParameter('consentToProcess', i, true) as boolean;
		const communicationsData = context.getNodeParameter('communications', i, {}) as IDataObject;

		const communications: FormCommunication[] = [];
		if (communicationsData.communication && Array.isArray(communicationsData.communication)) {
			(communicationsData.communication as IDataObject[]).forEach((comm) => {
				communications.push({
					value: comm.value as boolean,
					subscriptionTypeId: parseInt(comm.subscriptionTypeId as string, 10),
					text: comm.text as string,
				});
			});
		}

		body.legalConsentOptions = {
			consent: {
				consentToProcess,
				text: consentText,
				communications,
			},
		};
	}

	const response = await hubspotFormSubmitRequest.call(
		context,
		portalId,
		formGuid,
		body,
		submitEndpoint === 'secure',
	) as IDataObject;

	return { json: response };
}
