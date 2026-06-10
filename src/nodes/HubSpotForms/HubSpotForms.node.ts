import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
	INodePropertyOptions,
	IDataObject,
} from 'n8n-workflow';

import { hubspotApiRequestForLoadOptions, buildErrorItem, type HubSpotError } from '../../transport/HubSpotApiRequest';
import { formFields } from './descriptions';
import { executeFormOperation } from './operations';

export class HubSpotForms implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'HubSpot Forms',
		name: 'hubSpotForms',
		icon: 'file:../../icon.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
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
				) as IDataObject;

				const options: INodePropertyOptions[] = [];
				if (response.results) {
					for (const form of response.results as IDataObject[]) {
						options.push({
							name: form.name as string,
							value: form.id as string,
						});
					}
				}

				return options;
			},
			async getSubscriptionTypes(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await hubspotApiRequestForLoadOptions.call(
					this,
					'GET',
					'/marketing/v3/communication-preferences/v3/definitions',
				) as IDataObject;

				const options: INodePropertyOptions[] = [];
				if (response.subscriptionDefinitions) {
					for (const subscription of response.subscriptionDefinitions as IDataObject[]) {
						options.push({
							name: subscription.name as string,
							value: String(subscription.id),
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
					returnData.push(buildErrorItem(error as HubSpotError, i));
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
