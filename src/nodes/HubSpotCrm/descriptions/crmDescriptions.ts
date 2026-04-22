import type { INodeProperties } from 'n8n-workflow';
import { HUBSPOT_OBJECT_TYPE_OPTIONS } from '../../../types';

export const objectTypeField: INodeProperties = {
	displayName: 'Object Type',
	name: 'objectType',
	type: 'options',
	options: [...HUBSPOT_OBJECT_TYPE_OPTIONS],
	default: 'contacts',
	required: true,
	description: 'The type of CRM object to work with. <a href="https://developers.hubspot.com/docs/api/crm/understanding-the-crm" target="_blank">Learn more about HubSpot CRM objects</a>.',
};

export const customObjectTypeField: INodeProperties = {
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
};

export const operationField: INodeProperties = {
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
		{ name: 'Batch Create', value: 'batchCreate', description: 'Create multiple objects in a single batch request using all input items' },
		{ name: 'Batch Update', value: 'batchUpdate', description: 'Update multiple objects in a single batch request using all input items' },
		{ name: 'Batch Delete', value: 'batchDelete', description: 'Delete multiple objects in a single batch request using all input items' },
	],
	default: 'search',
	required: true,
};

export const objectIdField: INodeProperties = {
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
};

export const idFieldField: INodeProperties = {
	displayName: 'ID Field',
	name: 'idField',
	type: 'string',
	default: 'id',
	placeholder: 'id',
	description: 'Name of the field in input items that contains the object ID (e.g., "id", "objectId", "hs_object_id")',
	displayOptions: {
		show: {
			operation: ['getMany', 'batchUpdate', 'batchDelete'],
		},
	},
};

export const propertiesField: INodeProperties = {
	displayName: 'Properties',
	name: 'properties',
	type: 'multiOptions',
	typeOptions: {
		loadOptionsMethod: 'getProperties',
		loadOptionsDependsOn: ['objectType', 'customObjectType'],
	},
	default: [],
	placeholder: 'firstname,lastname,email',
	description: 'Properties to return in the response. Leave empty to return all properties. <a href="https://developers.hubspot.com/docs/api/crm/properties" target="_blank">Learn more</a>.',
	displayOptions: {
		show: {
			operation: ['get', 'getMany', 'search'],
		},
	},
};

export const filtersField: INodeProperties = {
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
					type: 'options',
					typeOptions: {
						loadOptionsMethod: 'getProperties',
						loadOptionsDependsOn: ['objectType', 'customObjectType'],
					},
					default: '',
					required: true,
					placeholder: 'email',
					description: 'The internal name of the property to filter by. Select from the dropdown or use an expression.',
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
					description: 'The value to compare against. For IN/NOT_IN operators, use semicolon-separated values (e.g., "value1;value2;value3") or pass an array directly.',
				},
			],
		},
	],
};

export const sortField: INodeProperties = {
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
					type: 'options',
					typeOptions: {
						loadOptionsMethod: 'getProperties',
						loadOptionsDependsOn: ['objectType', 'customObjectType'],
					},
					default: 'createdate',
					placeholder: 'createdate',
					description: 'The property to sort results by. Select from the dropdown or use an expression.',
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
};

export const limitField: INodeProperties = {
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
			operation: ['search'],
			returnAll: [false],
		},
	},
};

export const returnAllField: INodeProperties = {
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
};

export const propertiesToSetField: INodeProperties = {
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
};

export const propertyMappingsField: INodeProperties = {
	displayName: 'Property Mappings',
	name: 'propertyMappings',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
	},
	default: {},
	placeholder: 'Add Property Mapping',
	description: 'Map fields from input items to HubSpot properties. Each input item will be processed in batch.',
	displayOptions: {
		show: {
			operation: ['batchCreate', 'batchUpdate'],
		},
	},
	options: [
		{
			name: 'mapping',
			displayName: 'Mapping',
			values: [
				{
					displayName: 'HubSpot Property',
					name: 'property',
					type: 'options',
					typeOptions: {
						loadOptionsMethod: 'getProperties',
						loadOptionsDependsOn: ['objectType', 'customObjectType'],
					},
					default: '',
					required: true,
					description: 'The HubSpot property to set (e.g., "dealname", "amount")',
				},
				{
					displayName: 'Input Field Name',
					name: 'fieldName',
					type: 'string',
					default: '',
					required: true,
					placeholder: 'dealname',
					description: 'The field name from input items to use as value (e.g., "dealname", "amount")',
				},
			],
		},
	],
};

export const associationsField: INodeProperties = {
	displayName: 'Associations',
	name: 'associations',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
	},
	default: {},
	placeholder: 'Add Association',
	description: 'Associate the created object with other objects. This allows you to link records together (e.g., contact to company).',
	displayOptions: {
		show: {
			operation: ['create'],
		},
	},
	options: [
		{
			name: 'association',
			displayName: 'Association',
			values: [
				{
					displayName: 'To Object Type',
					name: 'toObjectType',
					type: 'options',
					options: [...HUBSPOT_OBJECT_TYPE_OPTIONS],
					default: 'companies',
					required: true,
					description: 'The type of object to associate with.',
				},
				{
					displayName: 'Custom To Object Type',
					name: 'customToObjectType',
					type: 'string',
					default: '',
					required: true,
					placeholder: 'cars',
					description: 'The name or ID of the custom object type (e.g., "cars" or "2-12345").',
					displayOptions: {
						show: {
							toObjectType: ['custom'],
						},
					},
				},
				{
					displayName: 'To Object ID',
					name: 'toObjectId',
					type: 'string',
					default: '',
					required: true,
					placeholder: '12345678',
					description: 'The ID of the object to associate with. Use expressions to reference IDs from previous nodes.',
				},
			],
		},
	],
};

export const crmFields: INodeProperties[] = [
	objectTypeField,
	customObjectTypeField,
	operationField,
	objectIdField,
	idFieldField,
	propertiesField,
	filtersField,
	sortField,
	limitField,
	returnAllField,
	propertiesToSetField,
	propertyMappingsField,
	associationsField,
];
