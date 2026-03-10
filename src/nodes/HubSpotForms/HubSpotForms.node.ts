import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';

import { hubspotApiRequestForLoadOptions } from '../../transport/HubSpotApiRequest';
import { formFields } from './descriptions';
import { executeFormOperation } from './operations';

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
		properties: formFields,
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
				const results = await executeFormOperation(this, operation, i);
				returnData.push(...results);

				if (operation === 'getForms') {
					break;
				}
			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : String(error);
					returnData.push({ json: { error: errorMessage }, pairedItem: { item: i } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
