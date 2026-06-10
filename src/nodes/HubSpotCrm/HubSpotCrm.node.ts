import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';

import { hubspotApiRequestAllItemsForLoadOptions, buildErrorItem, type HubSpotError } from '../../transport/HubSpotApiRequest';
import { PropertyCache } from '../../transport/PropertyCache';
import { crmFields } from './descriptions';
import { executeCrmOperation } from './operations';

export class HubSpotCrm implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'HubSpot CRM',
		name: 'hubSpotCrm',
		icon: 'file:../../icon.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + ($parameter["objectType"] === "custom" ? $parameter["customObjectType"] : $parameter["objectType"])}}',
		description: 'Interact with HubSpot CRM API',
		defaults: {
			name: 'HubSpot CRM',
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
		properties: crmFields,
	};

	methods = {
		loadOptions: {
			async getProperties(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {

				const objectTypeRaw = this.getCurrentNodeParameter('objectType') as string;
				const objectType = objectTypeRaw === 'custom'
					? this.getCurrentNodeParameter('customObjectType') as string
					: objectTypeRaw;

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

			async getUniqueProperties(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {

				const objectTypeRaw = this.getCurrentNodeParameter('objectType') as string;
				const objectType = objectTypeRaw === 'custom'
					? this.getCurrentNodeParameter('customObjectType') as string
					: objectTypeRaw;

				const credentials = await this.getCredentials('hubspotAppToken');
				const credentialId = (credentials.appToken as string).slice(-8);

				const cache = PropertyCache.getInstance();
				const cacheKey = `${objectType}_unique`;
				const cached = cache.get(cacheKey, credentialId);
				if (cached) {
					return cached;
				}

				const results = await hubspotApiRequestAllItemsForLoadOptions.call(
					this,
					'GET',
					`/crm/v3/properties/${objectType}`,
				);

				const options: INodePropertyOptions[] = [];

				// hs_object_id is always the default unique identifier
				options.push({
					name: 'HubSpot Object ID (hs_object_id)',
					value: 'hs_object_id',
				});

				for (const property of results) {
					if (property.hasUniqueValue === true) {
						options.push({
							name: (property.label || property.name) as string,
							value: property.name as string,
						});
					}
				}

				cache.set(cacheKey, options, credentialId);
				return options;
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const operation = this.getNodeParameter('operation', 0) as string;
		const objectTypeRaw = this.getNodeParameter('objectType', 0) as string;
		const objectType = objectTypeRaw === 'custom'
			? (this.getNodeParameter('customObjectType', 0) as string)
			: objectTypeRaw;

		if (operation === 'batchCreate' || operation === 'batchUpdate' || operation === 'batchUpsert' || operation === 'batchDelete') {
			try {
				const results = await executeCrmOperation(this, operation, objectType, items, 0);
				returnData.push(...results);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push(buildErrorItem(error as HubSpotError, undefined, this.getNode()));
				} else {
					throw error;
				}
			}
		} else {
			for (let i = 0; i < items.length; i++) {
				try {
					const results = await executeCrmOperation(this, operation, objectType, items, i);
					returnData.push(...results);

					if (operation === 'getMany') {
						break;
					}
				} catch (error) {
				if (this.continueOnFail()) {
					returnData.push(buildErrorItem(error as HubSpotError, i, this.getNode()));
					continue;
				}
				throw error;
				}
			}
		}

		return [returnData];
	}
}
