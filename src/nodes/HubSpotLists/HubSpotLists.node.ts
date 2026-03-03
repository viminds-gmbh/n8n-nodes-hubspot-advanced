import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';

import { hubspotApiRequest, hubspotBatchRequest, hubspotApiRequestForLoadOptions } from '../../transport/HubSpotApiRequest';
import { HUBSPOT_OBJECT_TYPE_ID_MAPPING } from '../../types';

export class HubSpotLists implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'HubSpot Lists',
		name: 'hubSpotLists',
		icon: 'file:../../icon.svg',
		group: ['transform'],
		version: 1,
		subtitle: 'Get List Members',
		description: 'Get HubSpot list members',
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
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Get List Members',
						value: 'getListMembers',
						description: 'Get all records that are members of a list',
					},
				],
				default: 'getListMembers',
				required: true,
			},
			{
				displayName: 'List ID',
				name: 'listId',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'loadLists',
				},
				default: '',
				required: true,
				description: 'Select the HubSpot list to get members from. Lists are loaded from your HubSpot account.',
			},
			{
				displayName: 'Properties',
				name: 'properties',
				type: 'multiOptions',
				typeOptions: {
					loadOptionsMethod: 'getProperties',
					loadOptionsDependsOn: ['listId'],
				},
				default: [],
				placeholder: 'firstname,lastname,email',
				description: 'Properties to return for each list member. Leave empty to return all properties. <a href="https://developers.hubspot.com/docs/api/crm/properties" target="_blank">Learn more</a>.',
			},
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				default: false,
				description: 'Whether to automatically paginate and return all list members. May take longer for large lists.',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				typeOptions: {
					minValue: 1,
					maxValue: 10000,
				},
				description: 'Maximum number of list members to return.',
				displayOptions: {
					show: {
						returnAll: [false],
					},
				},
			},
		],
	};

	methods = {
		loadOptions: {
			async loadLists(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
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
						response.lists.forEach((list: any) => {
							const objectType = HUBSPOT_OBJECT_TYPE_ID_MAPPING[list.objectTypeId] || list.objectTypeId;
							const objectTypeName = objectType.charAt(0).toUpperCase() + objectType.slice(1);
							options.push({
								name: `${list.name} (${objectTypeName})`,
								value: list.listId.toString(),
							});
						});
					}

					hasMore = response.hasMore === true;
					offset = response.offset || 0;
				}

				options.sort((a, b) => a.name.localeCompare(b.name));

				return options;
			},
			async getProperties(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const { PropertyCache } = await import('../../transport/PropertyCache');

				const listId = this.getCurrentNodeParameter('listId') as string;
				if (!listId) {
					return [];
				}

				// Fetch list details to get objectTypeId
				const listResponse = await hubspotApiRequestForLoadOptions.call(
					this,
					'GET',
					`/crm/v3/lists/${listId}`,
				);

				const objectTypeId = listResponse.list.objectTypeId;
				const objectType = HUBSPOT_OBJECT_TYPE_ID_MAPPING[objectTypeId] || objectTypeId;

				// Get credential ID for cache isolation
				const credentials = await this.getCredentials('hubspotAppToken');
				const credentialId = (credentials.appToken as string).slice(-8); // Use last 8 chars as ID

				const cache = PropertyCache.getInstance();
				const cached = cache.get(objectType, credentialId);
				if (cached) {
					return cached;
				}

				const response = await hubspotApiRequestForLoadOptions.call(
					this,
					'GET',
					`/crm/v3/properties/${objectType}`,
				);

				const options: INodePropertyOptions[] = [];
				if (response.results) {
					for (const property of response.results) {
						options.push({
							name: property.label || property.name,
							value: property.name,
						});
					}
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

		for (let i = 0; i < items.length; i++) {
			try {
				if (operation === 'getListMembers') {
					const listId = this.getNodeParameter('listId', i) as string;
					const properties = this.getNodeParameter('properties', i, []) as string[] | string;
					const returnAll = this.getNodeParameter('returnAll', i) as boolean;
					const limit = returnAll ? undefined : (this.getNodeParameter('limit', i, 100) as number);

					// First, get the list details to determine the object type
					const listResponse = await hubspotApiRequest.call(
						this,
						'GET',
						`/crm/v3/lists/${listId}`,
					);

					const objectTypeId = listResponse.list.objectTypeId;

					// Map objectTypeId to objectType for CRM API calls
					// Standard HubSpot object types have specific IDs, custom objects use the ID directly
					const objectType = HUBSPOT_OBJECT_TYPE_ID_MAPPING[objectTypeId] || objectTypeId;

					// Get all member record IDs with pagination
					const memberRecordIds: string[] = [];
					let after: string | undefined;
					let hasMore = true;

					while (hasMore) {
						const queryParams: Record<string, any> = { limit: 250 };
						if (after) {
							queryParams.after = after;
						}

						const membershipsResponse = await hubspotApiRequest.call(
							this,
							'GET',
							`/crm/v3/lists/${listId}/memberships`,
							{},
							queryParams,
						);

						if (membershipsResponse.results) {
							membershipsResponse.results.forEach((membership: any) => {
								memberRecordIds.push(membership.recordId);
							});
						}

						// Check if we should continue paginating
						after = membershipsResponse.paging?.next?.after;
						hasMore = !!after && (returnAll || !limit || memberRecordIds.length < limit);

						// Apply limit if not returning all
						if (!returnAll && limit && memberRecordIds.length >= limit) {
							memberRecordIds.splice(limit);
							break;
						}
					}

					// Hydrate the records using batch request
					if (memberRecordIds.length > 0) {
						const propertiesArray = Array.isArray(properties) ? properties : (properties ? properties.split(',').map((p) => p.trim()) : []);
						const hydratedRecords = await hubspotBatchRequest.call(
							this,
							objectType,
							memberRecordIds,
							propertiesArray,
						);

						hydratedRecords.forEach((record) => returnData.push({ json: record }));
					}
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
