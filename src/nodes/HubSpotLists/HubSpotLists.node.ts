import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';

import { hubspotApiRequestForLoadOptions, hubspotApiRequestAllItemsForLoadOptions } from '../../transport/HubSpotApiRequest';
import { PropertyCache } from '../../transport/PropertyCache';
import { HUBSPOT_OBJECT_TYPE_TO_ID } from '../../types';
import { listFields } from './descriptions';
import { executeListOperation } from './operations';

export class HubSpotLists implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'HubSpot Lists',
		name: 'hubSpotLists',
		icon: 'file:../../icon.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + ($parameter["objectType"] === "custom" ? $parameter["customObjectType"] : $parameter["objectType"])}}',
		description: 'Manage HubSpot lists and memberships',
		defaults: {
			name: 'HubSpot Lists',
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
		properties: listFields,
	};

	methods = {
		loadOptions: {
			async loadLists(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const objectTypeRaw = this.getCurrentNodeParameter('objectType') as string;
				const objectType = objectTypeRaw === 'custom'
					? this.getCurrentNodeParameter('customObjectType') as string
					: objectTypeRaw;

				let operation: string | undefined;
				try {
					operation = this.getCurrentNodeParameter('operation') as string;
				} catch (error) {
					// Operation parameter might not be set yet
				}

				const objectTypeId = HUBSPOT_OBJECT_TYPE_TO_ID[objectType] || objectType;

				const onlyStaticLists = operation ? ['addMember', 'addManyMembers', 'removeMember', 'removeManyMembers'].includes(operation) : false;

				const options: INodePropertyOptions[] = [];
				let hasMore = true;
				let offset = 0;

				while (hasMore) {
					const response = await hubspotApiRequestForLoadOptions.call(
						this,
						'POST',
						'/crm/v3/lists/search',
						{
							query: '',
							count: 250,
							offset,
						},
					);

					if (response.lists) {
						response.lists.forEach((list: { objectTypeId: string; name: string; listId: string | number; processingType: string }) => {
							if (list.objectTypeId === objectTypeId) {
								// For add/remove member operations, only show static lists (exclude DYNAMIC)
								if (onlyStaticLists) {
									if (list.processingType !== 'DYNAMIC') {
										options.push({
											name: list.name,
											value: list.listId.toString(),
										});
									}
								} else {
									options.push({
										name: list.name,
										value: list.listId.toString(),
									});
								}
							}
						});
					}

					hasMore = response.hasMore === true;
					offset = response.offset || 0;
				}

				options.sort((a, b) => a.name.localeCompare(b.name));

				return options;
			},
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

		for (let i = 0; i < items.length; i++) {
			try {
				const results = await executeListOperation(this, operation, objectType, items, i);
				returnData.push(...results);

				if (operation === 'getListMembers' || operation === 'addManyMembers' || operation === 'removeManyMembers') {
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
