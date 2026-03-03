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
				description: 'The type of CRM object to work with. <a href="https://developers.hubspot.com/docs/api/crm/understanding-the-crm" target="_blank">Learn more about HubSpot CRM objects</a>.',
			},
			{
				displayName: 'Custom Object Type',
				name: 'customObjectType',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'cars',
				description: 'The name or ID of the custom object type (e.g., "cars" or "2-12345"). <a href="https://developers.hubspot.com/docs/api/crm/crm-custom-objects" target="_blank">Learn more about custom objects</a>.',
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
					{ name: 'Get', value: 'get', description: 'Retrieve a single object by ID' },
					{ name: 'Get Many', value: 'getMany', description: 'Retrieve multiple objects by IDs from input items' },
					{ name: 'Search', value: 'search', description: 'Search for objects using filters' },
					{ name: 'Create', value: 'create', description: 'Create a new object' },
					{ name: 'Update', value: 'update', description: 'Update an existing object' },
					{ name: 'Delete', value: 'delete', description: 'Delete an object' },
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
				placeholder: '12345678',
				description: 'The unique ID of the object to retrieve, update, or delete. You can use expressions to reference IDs from previous nodes.',
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
				description: 'Properties to return in the response. Leave empty to return all properties. <a href="https://developers.hubspot.com/docs/api/crm/properties" target="_blank">Learn more</a>.',
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
								placeholder: 'email',
								description: 'The internal name of the property to filter by (e.g., "email", "firstname", "createdate").',
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
								description: 'The comparison operator to use for filtering. <a href="https://developers.hubspot.com/docs/api/crm/search" target="_blank">See all available operators</a>.',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								required: true,
								placeholder: 'john@example.com',
								description: 'The value to compare against. For IN/NOT_IN operators, use semicolon-separated values.',
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
								placeholder: 'createdate',
								description: 'The property to sort results by (e.g., "createdate", "lastname").',
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
								description: 'The sort order for results.',
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
				description: 'Maximum number of results to return. Use with "Return All" disabled for pagination.',
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
				description: 'Whether to automatically paginate and return all matching results. May take longer for large datasets.',
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
								displayName: 'Property Name',
								name: 'name',
								type: 'options',
								typeOptions: {
									loadOptionsMethod: 'getProperties',
									loadOptionsDependsOn: ['objectType', 'customObjectType'],
								},
								default: '',
								required: true,
								description: 'The property to set. Select from the dropdown or use an expression.',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								placeholder: 'John Doe',
								description: 'The value to set for this property. Use expressions to reference data from previous nodes.',
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
