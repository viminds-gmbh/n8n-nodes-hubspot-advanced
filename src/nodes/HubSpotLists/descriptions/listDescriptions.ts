import type { INodeProperties } from 'n8n-workflow';
import { HUBSPOT_OBJECT_TYPE_OPTIONS } from '../../../types';

export const objectTypeField: INodeProperties = {
	displayName: 'Object Type',
	name: 'objectType',
	type: 'options',
	options: [...HUBSPOT_OBJECT_TYPE_OPTIONS],
	default: 'contacts',
	required: true,
	description: 'The type of CRM object for the list. <a href="https://developers.hubspot.com/docs/api/crm/understanding-the-crm" target="_blank">Learn more about HubSpot CRM objects</a>.',
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
		{
			name: 'Get List Members',
			value: 'getListMembers',
			description: 'Get all records that are members of a list',
		},
		{
			name: 'Create List',
			value: 'createList',
			description: 'Create a new static or dynamic list',
		},
		{
			name: 'Update List Name',
			value: 'updateListName',
			description: 'Update the name of a list',
		},
		{
			name: 'Delete List',
			value: 'deleteList',
			description: 'Delete (archive) a list',
		},
		{
			name: 'Add Member',
			value: 'addMember',
			description: 'Add a single record to a static list by ID',
		},
		{
			name: 'Add Many Members',
			value: 'addManyMembers',
			description: 'Add multiple records to a static list from input items',
		},
		{
			name: 'Remove Member',
			value: 'removeMember',
			description: 'Remove a single record from a static list by ID',
		},
		{
			name: 'Remove Many Members',
			value: 'removeManyMembers',
			description: 'Remove multiple records from a static list from input items',
		},
	],
	default: 'getListMembers',
	required: true,
};

export const listIdField: INodeProperties = {
	displayName: 'List ID',
	name: 'listId',
	type: 'options',
	typeOptions: {
		loadOptionsMethod: 'loadLists',
		loadOptionsDependsOn: ['objectType', 'customObjectType', 'operation'],
	},
	default: '',
	required: true,
	description: 'Select the HubSpot list. Lists are filtered by the selected object type.',
	displayOptions: {
		show: {
			operation: ['getListMembers', 'updateListName', 'deleteList', 'addMember', 'addManyMembers', 'removeMember', 'removeManyMembers'],
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
	description: 'Properties to return for each list member. Leave empty to return all properties. <a href="https://developers.hubspot.com/docs/api/crm/properties" target="_blank">Learn more</a>.',
	displayOptions: {
		show: {
			operation: ['getListMembers'],
		},
	},
};

export const returnAllField: INodeProperties = {
	displayName: 'Return All',
	name: 'returnAll',
	type: 'boolean',
	default: false,
	description: 'Whether to automatically paginate and return all list members. May take longer for large lists.',
	displayOptions: {
		show: {
			operation: ['getListMembers'],
		},
	},
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
	description: 'Maximum number of list members to return.',
	displayOptions: {
		show: {
			operation: ['getListMembers'],
			returnAll: [false],
		},
	},
};

export const listNameField: INodeProperties = {
	displayName: 'List Name',
	name: 'listName',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'My New List',
	description: 'The name of the list to create.',
	displayOptions: {
		show: {
			operation: ['createList'],
		},
	},
};

export const listTypeField: INodeProperties = {
	displayName: 'List Type',
	name: 'listType',
	type: 'options',
	options: [
		{ name: 'Static', value: 'SNAPSHOT', description: 'Manually managed list of records' },
		{ name: 'Dynamic', value: 'DYNAMIC', description: 'Automatically updated based on filters' },
	],
	default: 'SNAPSHOT',
	description: 'Type of list to create. Static lists are manually managed, dynamic lists update automatically based on filters.',
	displayOptions: {
		show: {
			operation: ['createList'],
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
	description: 'Filters for dynamic lists. Records matching these filters will be automatically added to the list.',
	displayOptions: {
		show: {
			operation: ['createList', 'updateList'],
			listType: ['DYNAMIC'],
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
					description: 'The internal name of the property to filter by.',
				},
				{
					displayName: 'Operator',
					name: 'operator',
					type: 'options',
					options: [
						{ name: 'Is Equal To', value: 'EQ' },
						{ name: 'Is Not Equal To', value: 'NEQ' },
						{ name: 'Contains', value: 'CONTAINS' },
						{ name: 'Does Not Contain', value: 'NOT_CONTAINS' },
						{ name: 'Is Known', value: 'HAS_PROPERTY' },
						{ name: 'Is Unknown', value: 'NOT_HAS_PROPERTY' },
						{ name: 'Is Less Than', value: 'LT' },
						{ name: 'Is Greater Than', value: 'GT' },
					],
					default: 'EQ',
					description: 'The comparison operator to use for filtering. <a href="https://developers.hubspot.com/docs/api/crm/lists" target="_blank">Learn more about list filters</a>.',
				},
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
					required: true,
					placeholder: 'john@example.com',
					description: 'The value to compare against.',
				},
			],
		},
	],
};

export const updateListNameField: INodeProperties = {
	displayName: 'New List Name',
	name: 'newListName',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'Updated List Name',
	description: 'New name for the list.',
	displayOptions: {
		show: {
			operation: ['updateListName'],
		},
	},
};

export const recordIdField: INodeProperties = {
	displayName: 'Record ID',
	name: 'recordId',
	type: 'string',
	default: '',
	required: true,
	placeholder: '12345678',
	description: 'The ID of the record to add/remove. <strong>Note:</strong> Only static lists support adding/removing members.',
	displayOptions: {
		show: {
			operation: ['addMember', 'removeMember'],
		},
	},
};

export const idFieldField: INodeProperties = {
	displayName: 'ID Field',
	name: 'idField',
	type: 'string',
	default: 'id',
	placeholder: 'id',
	hint: 'Field name only (e.g., \'id\')',
	description: 'Field name containing the record ID. <strong>Note:</strong> Only static lists support adding/removing members.',
	displayOptions: {
		show: {
			operation: ['addManyMembers', 'removeManyMembers'],
		},
	},
};

export const listFields: INodeProperties[] = [
	operationField,
	objectTypeField,
	customObjectTypeField,
	listIdField,
	propertiesField,
	returnAllField,
	limitField,
	listNameField,
	listTypeField,
	filtersField,
	updateListNameField,
	recordIdField,
	idFieldField,
];
