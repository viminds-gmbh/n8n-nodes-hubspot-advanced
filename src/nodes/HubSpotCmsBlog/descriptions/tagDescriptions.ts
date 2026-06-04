import type { INodeProperties } from 'n8n-workflow';

export const tagOperationField: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	options: [
		{ name: 'Get All', value: 'getAll', description: 'List blog tags with filters' },
		{ name: 'Get', value: 'get', description: 'Get a single blog tag by ID' },
		{ name: 'Create', value: 'create', description: 'Create a new blog tag' },
		{ name: 'Update', value: 'update', description: 'Update a blog tag' },
		{ name: 'Delete', value: 'delete', description: 'Delete a blog tag' },
		{ name: 'Batch Delete', value: 'batchDelete', description: 'Archive multiple tags' },
	],
	default: 'getAll',
	required: true,
	displayOptions: {
		show: {
			resource: ['tag'],
		},
	},
};

export const tagIdField: INodeProperties = {
	displayName: 'Tag ID',
	name: 'tagId',
	type: 'string',
	default: '',
	required: true,
	placeholder: '12345678',
	description: 'The ID of the blog tag',
	displayOptions: {
		show: {
			resource: ['tag'],
			operation: ['get', 'update', 'delete'],
		},
	},
};

export const tagIdsField: INodeProperties = {
	displayName: 'Tag IDs',
	name: 'tagIds',
	type: 'string',
	default: '',
	required: true,
	placeholder: '12345678,87654321',
	description: 'Comma-separated list of tag IDs to archive',
	displayOptions: {
		show: {
			resource: ['tag'],
			operation: ['batchDelete'],
		},
	},
};

export const tagAdditionalFieldsField: INodeProperties = {
	displayName: 'Additional Fields',
	name: 'additionalFields',
	type: 'collection',
	default: {},
	placeholder: 'Add Field',
	description: 'Optional fields for the blog tag',
	displayOptions: {
		show: {
			resource: ['tag'],
			operation: ['create', 'update'],
		},
	},
	options: [
		{
			displayName: 'Name',
			name: 'name',
			type: 'string',
			default: '',
			placeholder: 'Marketing',
			description: 'The name of the tag',
		},
		{
			displayName: 'Slug',
			name: 'slug',
			type: 'string',
			default: '',
			placeholder: 'marketing',
			description: 'The URL slug for the tag',
		},
		{
			displayName: 'Language',
			name: 'language',
			type: 'string',
			default: '',
			placeholder: 'en',
			description: 'The language of the tag (e.g., en, de, fr)',
		},
	],
};

export const tagFiltersField: INodeProperties = {
	displayName: 'Filters',
	name: 'filters',
	type: 'collection',
	default: {},
	placeholder: 'Add Filter',
	description: 'Filter options for listing blog tags',
	displayOptions: {
		show: {
			resource: ['tag'],
			operation: ['getAll'],
		},
	},
	options: [
		{
			displayName: 'Name Filter',
			name: 'nameFilter',
			type: 'string',
			default: '',
			placeholder: 'Marketing',
			description: 'Filter by tag name (partial match)',
		},
		{
			displayName: 'Language Filter',
			name: 'languageFilter',
			type: 'string',
			default: '',
			placeholder: 'en',
			description: 'Filter by language',
		},
		{
			displayName: 'Created After',
			name: 'createdAfter',
			type: 'dateTime',
			default: '',
			description: 'Filter tags created after this date',
		},
		{
			displayName: 'Updated After',
			name: 'updatedAfter',
			type: 'dateTime',
			default: '',
			description: 'Filter tags updated after this date',
		},
		{
			displayName: 'Sort',
			name: 'sort',
			type: 'options',
			options: [
				{ name: 'Name', value: 'name' },
				{ name: 'Created', value: 'created' },
				{ name: 'Updated', value: 'updated' },
			],
			default: 'created',
			description: 'Sort order for results',
		},
	],
};

export const tagFields: INodeProperties[] = [
	tagOperationField,
	tagIdField,
	tagIdsField,
	tagAdditionalFieldsField,
	tagFiltersField,
];
