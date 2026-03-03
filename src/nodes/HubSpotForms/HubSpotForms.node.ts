import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';

import { hubspotApiRequest, hubspotApiRequestForLoadOptions } from '../../transport/HubSpotApiRequest';

export class HubSpotForms implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'HubSpot Forms',
		name: 'hubSpotForms',
		icon: 'file:../../icon.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] === "submitForm" ? "Submit Form" : $parameter["operation"] === "getForms" ? "Get Forms" : "Get Submissions"}}',
		description: 'Interact with HubSpot Forms API',
		defaults: {
			name: 'HubSpot Forms',
		},
		codex: {
			categories: ['Marketing & Content'],
			subcategories: {
				'Marketing & Content': ['CRM'],
			},
			alias: [
				'HubSpot Advanced',
				'viminds',
				'viminds HubSpot',
				'HubSpot viminds',
				'Advanced HubSpot',
				'HubSpot Pro',
				'HubSpot Extended',
				'HubSpot Batch',
				'HubSpot Rate Limit',
				'HubSpot Association',
				'HubSpot Hydrate',
				'HubSpot Custom Objects',
				'HubSpot Search',
				'HubSpot Filter',
			],
			resources: {
				primaryDocumentation: [
					{
						url: 'https://viminds.de',
					},
				],
			},
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'hubspotAppToken',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Get Forms',
						value: 'getForms',
						description: 'Get all forms',
					},
					{
						name: 'Get Submissions',
						value: 'getSubmissions',
						description: 'Get form submissions (v1 API)',
					},
					{
						name: 'Submit Form',
						value: 'submitForm',
						description: 'Submit a form (v3 legacy)',
					},
				],
				default: 'getForms',
				required: true,
			},
			{
				displayName: 'Form',
				name: 'formGuid',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getForms',
				},
				default: '',
				required: true,
				description: 'Select the form to work with. Forms are loaded from your HubSpot account.',
				displayOptions: {
					show: {
						operation: ['getSubmissions', 'submitForm'],
					},
				},
			},
			{
				displayName: 'Submit Endpoint',
				name: 'submitEndpoint',
				type: 'options',
				options: [
					{
						name: 'Secure',
						value: 'secure',
						description: 'Use secure endpoint with better spam protection (recommended)',
					},
					{
						name: 'Unsecure',
						value: 'unsecure',
						description: 'Use unsecure endpoint (legacy)',
					},
				],
				default: 'secure',
				description: 'The endpoint type to use for form submission. <a href="https://legacydocs.hubspot.com/docs/methods/forms/submit_form" target="_blank">Learn more</a>.',
				displayOptions: {
					show: {
						operation: ['submitForm'],
					},
				},
			},
			{
				displayName: 'Context',
				name: 'context',
				type: 'fixedCollection',
				default: {},
				description: 'Optional context information about where and how the form was submitted. Used for analytics and tracking.',
				displayOptions: {
					show: {
						operation: ['submitForm'],
					},
				},
				options: [
					{
						name: 'contextFields',
						displayName: 'Context Fields',
						values: [
							{
								displayName: 'Page URI',
								name: 'pageUri',
								type: 'string',
								default: '',
								placeholder: 'https://example.com/contact',
								description: 'The URI of the page where the form was submitted. Used for analytics and tracking.',
							},
							{
								displayName: 'Page Name',
								name: 'pageName',
								type: 'string',
								default: '',
								placeholder: 'Contact Page',
								description: 'The name of the page where the form was submitted. Used for analytics and tracking.',
							},
							{
								displayName: 'HubSpot User Token (HUTK)',
								name: 'hutk',
								type: 'string',
								default: '',
								placeholder: 'abc123def456',
								description: 'HubSpot user tracking token from the hubspotutk cookie. Used to associate the submission with a visitor. <a href="https://developers.hubspot.com/docs/api/tracking-code" target="_blank">Learn more</a>.',
							},
							{
								displayName: 'IP Address',
								name: 'ipAddress',
								type: 'string',
								default: '',
								placeholder: '192.168.1.1',
								description: 'The IP address of the form submitter. Used for geolocation and analytics.',
							},
						],
					},
				],
			},
			{
				displayName: 'Include Consent & Subscriptions',
				name: 'includeConsent',
				type: 'boolean',
				default: false,
				description: 'Whether to include GDPR consent and email subscription preferences with the form submission.',
				displayOptions: {
					show: {
						operation: ['submitForm'],
					},
				},
			},
			{
				displayName: 'Consent Text',
				name: 'consentText',
				type: 'string',
				default: 'I agree to allow Example Company to store and process my personal data.',
				placeholder: 'I agree to the privacy policy',
				description: 'The consent text shown to the user. Required for GDPR compliance.',
				displayOptions: {
					show: {
						operation: ['submitForm'],
						includeConsent: [true],
					},
				},
			},
			{
				displayName: 'Consent to Process',
				name: 'consentToProcess',
				type: 'boolean',
				default: true,
				description: 'Whether the user consented to data processing. Required for GDPR compliance.',
				displayOptions: {
					show: {
						operation: ['submitForm'],
						includeConsent: [true],
					},
				},
			},
			{
				displayName: 'Communications',
				name: 'communications',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				description: 'Email subscription preferences for different communication types.',
				displayOptions: {
					show: {
						operation: ['submitForm'],
						includeConsent: [true],
					},
				},
				options: [
					{
						name: 'communication',
						displayName: 'Communication',
						values: [
							{
								displayName: 'Subscription Type',
								name: 'subscriptionTypeId',
								type: 'options',
								typeOptions: {
									loadOptionsMethod: 'getSubscriptionTypes',
								},
								default: '',
								required: true,
								description: 'The type of communication subscription (e.g., marketing emails, newsletters). <a href="https://developers.hubspot.com/docs/api/marketing/subscriptions" target="_blank">Learn more</a>.',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'boolean',
								default: true,
								description: 'Whether the user opted in (true) or out (false) of this communication type.',
							},
							{
								displayName: 'Text',
								name: 'text',
								type: 'string',
								default: '',
								required: true,
								placeholder: 'I want to receive product updates',
								description: 'The subscription consent text shown to the user.',
							},
						],
					},
				],
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 50,
				typeOptions: {
					minValue: 1,
					maxValue: 1000,
				},
				description: 'Maximum number of form submissions to return. The API supports up to 1000 submissions per request.',
				displayOptions: {
					show: {
						operation: ['getSubmissions'],
					},
				},
			},
		],
	};

	methods = {
		loadOptions: {
			async getForms(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await hubspotApiRequestForLoadOptions.call(
					this,
					'GET',
					'/marketing/v3/forms',
				);

				const options: INodePropertyOptions[] = [];
				if (response.results) {
					for (const form of response.results) {
						options.push({
							name: form.name,
							value: form.id,
						});
					}
				}

				return options;
			},
			async getSubscriptionTypes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await hubspotApiRequestForLoadOptions.call(
					this,
					'GET',
					'/communication-preferences/v3/definitions',
				);

				const options: INodePropertyOptions[] = [];
				if (response.subscriptionDefinitions) {
					for (const subscription of response.subscriptionDefinitions) {
						options.push({
							name: subscription.name,
							value: subscription.id.toString(),
						});
					}
				}

				return options;
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				if (operation === 'getForms') {
					const response = await hubspotApiRequest.call(
						this,
						'GET',
						'/marketing/v3/forms',
					);

					if (response.results) {
						response.results.forEach((form: any) => {
							returnData.push({ json: form });
						});
					}
				} else if (operation === 'getSubmissions') {
					const formGuid = this.getNodeParameter('formGuid', i) as string;
					const limit = this.getNodeParameter('limit', i, 50) as number;

					const response = await hubspotApiRequest.call(
						this,
						'GET',
						`/form-integrations/v1/submissions/forms/${formGuid}`,
						{},
						{ limit },
					);

					if (response.results) {
						response.results.forEach((submission: any) => {
							returnData.push({ json: submission });
						});
					}
				} else if (operation === 'submitForm') {
					const formGuid = this.getNodeParameter('formGuid', i) as string;
					const fieldsData = this.getNodeParameter('fields', i, {}) as any;
					const contextData = this.getNodeParameter('context', i, {}) as any;
					const submitEndpoint = this.getNodeParameter('submitEndpoint', i, 'secure') as string;
					const includeConsent = this.getNodeParameter('includeConsent', i, false) as boolean;

					// Auto-fetch portalId from account details (cache within execution)
					const accountDetailsResponse = await hubspotApiRequest.call(
						this,
						'GET',
						'/account-info/v3/details',
					);
					const portalId = accountDetailsResponse.portalId.toString();

					const fields: any[] = [];
					if (fieldsData.field) {
						fieldsData.field.forEach((field: any) => {
							fields.push({
								name: field.name,
								value: field.value,
							});
						});
					}

					// Build context from parameters
					const context: any = {};
					if (contextData.contextFields) {
						const ctx = contextData.contextFields;
						if (ctx.pageUri) context.pageUri = ctx.pageUri;
						if (ctx.pageName) context.pageName = ctx.pageName;
						if (ctx.hutk) context.hutk = ctx.hutk;
						if (ctx.ipAddress) context.ipAddress = ctx.ipAddress;
					}

					const body: any = {
						fields,
						context,
					};

					// Add consent if enabled
					if (includeConsent) {
						const consentText = this.getNodeParameter('consentText', i, 'Ich stimme der Verarbeitung zu') as string;
						const consentToProcess = this.getNodeParameter('consentToProcess', i, true) as boolean;
						const communicationsData = this.getNodeParameter('communications', i, {}) as any;

						const communications: any[] = [];
						if (communicationsData.communication) {
							communicationsData.communication.forEach((comm: any) => {
								communications.push({
									value: comm.value,
									subscriptionTypeId: comm.subscriptionTypeId,
									text: comm.text,
								});
							});
						}

						body.consent = {
							consentToProcess,
							text: consentText,
							communications,
						};
					}

					// Use dynamic endpoint based on submitEndpoint parameter
					const endpointPath = submitEndpoint === 'secure'
						? `/submissions/v3/integration/secure/submit/${portalId}/${formGuid}`
						: `/submissions/v3/integration/submit/${portalId}/${formGuid}`;

					const response = await hubspotApiRequest.call(
						this,
						'POST',
						endpointPath,
						body,
					);

					returnData.push({ json: response });
				}
			} catch (error: any) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
