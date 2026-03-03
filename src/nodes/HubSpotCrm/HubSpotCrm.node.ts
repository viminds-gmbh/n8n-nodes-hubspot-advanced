import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';

import { hubspotApiRequest, hubspotApiRequestAllItems, hubspotBatchRequest, hubspotApiRequestForLoadOptions } from '../../transport/HubSpotApiRequest';
import { HUBSPOT_OBJECT_TYPE_OPTIONS } from '../../types';

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
				displayName: 'Object Type',
				name: 'objectType',
				type: 'options',
				options: [...HUBSPOT_OBJECT_TYPE_OPTIONS],
				default: 'contacts',
				required: true,
			},
			{
				displayName: 'Custom Object Type',
				name: 'customObjectType',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'e.g. cars or 2-12345',
				description: 'The name or ID of the custom object type',
				displayOptions: {
					show: {
						objectType: ['custom'],
					},
				},
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Get', value: 'get' },
					{ name: 'Get Many', value: 'getMany' },
					{ name: 'Search', value: 'search' },
					{ name: 'Create', value: 'create' },
					{ name: 'Update', value: 'update' },
					{ name: 'Delete', value: 'delete' },
				],
				default: 'search',
				required: true,
			},
			{
				displayName: 'Object ID',
				name: 'objectId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: ['get', 'update', 'delete'],
					},
				},
			},
			{
				displayName: 'ID Field',
				name: 'idField',
				type: 'string',
				default: 'id',
				placeholder: 'id',
				description: 'Name of the field in input items that contains the object ID (e.g., "id", "objectId", "hs_object_id")',
				displayOptions: {
					show: {
						operation: ['getMany'],
					},
				},
			},
			{
				displayName: 'Properties',
				name: 'properties',
				type: 'multiOptions',
				typeOptions: {
					loadOptionsMethod: 'getProperties',
				},
				default: [],
				placeholder: 'firstname,lastname,email',
				description: 'Properties to return. Select from dropdown or use comma-separated keys as expression.',
				displayOptions: {
					show: {
						operation: ['get', 'getMany', 'search'],
					},
				},
			},
			{
				displayName: 'Filters',
				name: 'filters',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				placeholder: 'Add Filter',
				displayOptions: {
					show: {
						operation: ['search'],
					},
				},
				options: [
					{
						name: 'filterGroups',
						displayName: 'Filter Group',
						values: [
							{
								displayName: 'Property Name',
								name: 'propertyName',
								type: 'string',
								default: '',
								required: true,
							},
							{
								displayName: 'Operator',
								name: 'operator',
								type: 'options',
								options: [
									{ name: 'Equal', value: 'EQ' },
									{ name: 'Not Equal', value: 'NEQ' },
									{ name: 'Less Than', value: 'LT' },
									{ name: 'Less Than or Equal', value: 'LTE' },
									{ name: 'Greater Than', value: 'GT' },
									{ name: 'Greater Than or Equal', value: 'GTE' },
									{ name: 'Between', value: 'BETWEEN' },
									{ name: 'In', value: 'IN' },
									{ name: 'Not In', value: 'NOT_IN' },
									{ name: 'Contains Token', value: 'CONTAINS_TOKEN' },
									{ name: 'Not Contains Token', value: 'NOT_CONTAINS_TOKEN' },
									{ name: 'Has Property', value: 'HAS_PROPERTY' },
									{ name: 'Not Has Property', value: 'NOT_HAS_PROPERTY' },
								],
								default: 'EQ',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								required: true,
							},
						],
					},
				],
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'fixedCollection',
				default: {},
				displayOptions: {
					show: {
						operation: ['search'],
					},
				},
				options: [
					{
						name: 'sortOptions',
						displayName: 'Sort',
						values: [
							{
								displayName: 'Property Name',
								name: 'propertyName',
								type: 'string',
								default: 'createdate',
							},
							{
								displayName: 'Direction',
								name: 'direction',
								type: 'options',
								options: [
									{ name: 'Ascending', value: 'ASCENDING' },
									{ name: 'Descending', value: 'DESCENDING' },
								],
								default: 'DESCENDING',
							},
						],
					},
				],
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
				displayOptions: {
					show: {
						operation: ['search', 'getMany'],
					},
				},
			},
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				default: false,
				description: 'Whether to return all results (auto-paginate)',
				displayOptions: {
					show: {
						operation: ['search'],
					},
				},
			},
			{
				displayName: 'Properties to Set',
				name: 'propertiesToSet',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				displayOptions: {
					show: {
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						name: 'property',
						displayName: 'Property',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
								required: true,
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},
		],
	};

	methods = {
		loadOptions: {
			async getProperties(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const { PropertyCache } = await import('../../transport/PropertyCache');

				const objectTypeRaw = this.getCurrentNodeParameter('objectType') as string;
				const objectType = objectTypeRaw === 'custom'
					? this.getCurrentNodeParameter('customObjectType') as string
					: objectTypeRaw;

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
		const objectTypeRaw = this.getNodeParameter('objectType', 0) as string;
		const objectType = objectTypeRaw === 'custom'
			? (this.getNodeParameter('customObjectType', 0) as string)
			: objectTypeRaw;

		for (let i = 0; i < items.length; i++) {
			try {
				if (operation === 'get') {
					const objectId = this.getNodeParameter('objectId', i) as string;
					const properties = this.getNodeParameter('properties', i, []) as string[] | string;

					const qs: any = {};
					if (properties && properties.length > 0) {
						const propertiesString = Array.isArray(properties) ? properties.join(',') : properties;
						qs.properties = propertiesString;
					}

					const response = await hubspotApiRequest.call(
						this,
						'GET',
						`/crm/v3/objects/${objectType}/${objectId}`,
						{},
						qs,
					);

					returnData.push({ json: response });
				} else if (operation === 'search') {
					const returnAll = this.getNodeParameter('returnAll', i) as boolean;
					const limit = this.getNodeParameter('limit', i, 100) as number;
					const properties = this.getNodeParameter('properties', i, []) as string[] | string;
					const filters = this.getNodeParameter('filters', i, {}) as any;
					const sort = this.getNodeParameter('sort', i, {}) as any;

					const body: any = {
						properties: Array.isArray(properties) ? properties : (properties ? properties.split(',').map((p) => p.trim()) : []),
					};

					if (filters.filterGroups && filters.filterGroups.length > 0) {
						body.filterGroups = [
							{
								filters: filters.filterGroups.map((f: any) => ({
									propertyName: f.propertyName,
									operator: f.operator,
									value: f.value,
								})),
							},
						];
					}

					if (sort.sortOptions) {
						body.sorts = [
							{
								propertyName: sort.sortOptions.propertyName,
								direction: sort.sortOptions.direction,
							},
						];
					}

					let results: any[];
					if (returnAll) {
						results = await hubspotApiRequestAllItems.call(
							this,
							'POST',
							`/crm/v3/objects/${objectType}/search`,
							body,
						);
					} else {
						results = await hubspotApiRequestAllItems.call(
							this,
							'POST',
							`/crm/v3/objects/${objectType}/search`,
							body,
							limit,
						);
					}

					results.forEach((result) => returnData.push({ json: result }));
				} else if (operation === 'getMany') {
					const properties = this.getNodeParameter('properties', 0, []) as string[] | string;
					const idField = this.getNodeParameter('idField', 0, 'id') as string;

					const ids: string[] = [];
					for (let j = 0; j < items.length; j++) {
						const itemData = items[j].json;
						const id = itemData[idField] as string;
						if (id) {
							ids.push(String(id));
						}
					}

					if (ids.length === 0) {
						throw new Error(
							`No IDs found in input items. Please ensure your input items have a "${idField}" field, or change the "ID Field" parameter.`,
						);
					}

					const propertiesArray = Array.isArray(properties) ? properties : (properties ? properties.split(',').map((p) => p.trim()) : []);

					const results = await hubspotBatchRequest.call(
						this,
						objectType,
						ids,
						propertiesArray,
					);

					results.forEach((result) => returnData.push({ json: result }));
					break;
				} else if (operation === 'create') {
					const propertiesToSet = this.getNodeParameter('propertiesToSet', i, {}) as any;

					const properties: any = {};
					if (propertiesToSet.property) {
						propertiesToSet.property.forEach((prop: any) => {
							properties[prop.name] = prop.value;
						});
					}

					const response = await hubspotApiRequest.call(
						this,
						'POST',
						`/crm/v3/objects/${objectType}`,
						{ properties },
					);

					returnData.push({ json: response });
				} else if (operation === 'update') {
					const objectId = this.getNodeParameter('objectId', i) as string;
					const propertiesToSet = this.getNodeParameter('propertiesToSet', i, {}) as any;

					const properties: any = {};
					if (propertiesToSet.property) {
						propertiesToSet.property.forEach((prop: any) => {
							properties[prop.name] = prop.value;
						});
					}

					const response = await hubspotApiRequest.call(
						this,
						'PATCH',
						`/crm/v3/objects/${objectType}/${objectId}`,
						{ properties },
					);

					returnData.push({ json: response });
				} else if (operation === 'delete') {
					const objectId = this.getNodeParameter('objectId', i) as string;

					await hubspotApiRequest.call(
						this,
						'DELETE',
						`/crm/v3/objects/${objectType}/${objectId}`,
					);

					returnData.push({ json: { success: true, id: objectId } });
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
