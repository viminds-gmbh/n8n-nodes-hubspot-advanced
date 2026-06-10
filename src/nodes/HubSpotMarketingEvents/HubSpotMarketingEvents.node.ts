import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';

import { hubspotApiRequestAllItemsForLoadOptions , buildErrorItem } from '../../transport/HubSpotApiRequest';
import { PropertyCache } from '../../transport/PropertyCache';
import { resourceField, eventFields, contactFields } from './descriptions';
import { executeEventOperation, executeContactOperation } from './operations';

export class HubSpotMarketingEvents implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'HubSpot Marketing Events',
		name: 'hubSpotMarketingEvents',
		icon: 'file:../../icon.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Interact with HubSpot Marketing Events using HubSpot internal object IDs',
		defaults: {
			name: 'HubSpot Marketing Events',
		},
		codex: {
			categories: ['Marketing & Content'],
			subcategories: {
				'Marketing & Content': ['CRM'],
			},
			alias: [
				'HubSpot Marketing',
				'HubSpot Events',
				'Marketing Events',
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
			resourceField,
			...eventFields,
			...contactFields,
		],
	};

	methods = {
		loadOptions: {
			async getProperties(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const objectType = 'marketing_events';

				// Get credential ID for cache isolation
				const credentials = await this.getCredentials('hubspotAppToken');
				const credentialId = (credentials.appToken as string).slice(-8);

				const cache = PropertyCache.getInstance();
				const cached = cache.get(objectType, credentialId);
				if (cached) {
					return cached;
				}

				const results = await hubspotApiRequestAllItemsForLoadOptions.call(
					this,
					'GET',
					`/crm/v3/properties/${objectType}`,
				);

				const options: INodePropertyOptions[] = [];
				for (const property of results) {
					options.push({
						name: (property.label || property.name) as string,
						value: property.name as string,
					});
				}

				cache.set(objectType, options, credentialId);
				return options;
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'event') {
					const results = await executeEventOperation(this, operation, items, i);
					returnData.push(...results);
				} else if (resource === 'contact') {
					const result = await executeContactOperation(this, operation, items, i);
					returnData.push(result);
				}
			} catch (error: any) {
				if (this.continueOnFail()) {
					returnData.push(buildErrorItem(error, i));
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
