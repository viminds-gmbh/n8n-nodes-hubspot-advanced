import type { INodeProperties } from 'n8n-workflow';

export const pageOperationField: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	options: [
		{ name: 'Get All', value: 'getAll', description: 'List pages with filters' },
		{ name: 'Get', value: 'get', description: 'Get a single page by ID' },
		{ name: 'Create', value: 'create', description: 'Create a new page' },
		{ name: 'Update', value: 'update', description: 'Update a page draft' },
		{ name: 'Delete', value: 'delete', description: 'Soft delete a page' },
		{ name: 'Clone', value: 'clone', description: 'Clone an existing page' },
		{ name: 'Publish', value: 'publish', description: 'Publish the draft version' },
		{ name: 'Schedule', value: 'schedule', description: 'Schedule a page for publishing' },
		{ name: 'Batch Delete', value: 'batchDelete', description: 'Archive multiple pages' },
	],
	default: 'getAll',
	required: true,
	displayOptions: {
		show: {
			resource: ['sitePage', 'landingPage'],
		},
	},
};

export const pageIdField: INodeProperties = {
	displayName: 'Page',
	name: 'pageId',
	type: 'options',
	typeOptions: {
		loadOptionsMethod: 'getPages',
	},
	default: '',
	required: true,
	description: 'The page to operate on',
	displayOptions: {
		show: {
			resource: ['sitePage', 'landingPage'],
			operation: ['get', 'update', 'delete', 'publish', 'schedule'],
		},
	},
};

export const sourcePageIdField: INodeProperties = {
	displayName: 'Source Page ID',
	name: 'sourcePageId',
	type: 'string',
	default: '',
	required: true,
	placeholder: '12345678',
	description: 'The ID of the page to clone',
	displayOptions: {
		show: {
			resource: ['sitePage', 'landingPage'],
			operation: ['clone'],
		},
	},
};

export const publishDateField: INodeProperties = {
	displayName: 'Publish Date',
	name: 'publishDate',
	type: 'dateTime',
	default: '',
	required: true,
	description: 'The date and time to publish the page',
	displayOptions: {
		show: {
			resource: ['sitePage', 'landingPage'],
			operation: ['schedule'],
		},
	},
};

export const pageIdFieldField: INodeProperties = {
	displayName: 'ID Field',
	name: 'idField',
	type: 'string',
	requiresDataPath: 'single',
	default: 'id',
	placeholder: 'id',
	hint: "Field name only (e.g., 'id' or 'properties.id')",
	description: "Field name containing the page ID. Supports dot notation (e.g., 'properties.id').",
	displayOptions: {
		show: {
			resource: ['sitePage', 'landingPage'],
			operation: ['batchDelete'],
		},
	},
};

export const pageNameField: INodeProperties = {
	displayName: 'Name',
	name: 'name',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'My Page',
	description: 'The internal name of the page',
	displayOptions: {
		show: {
			resource: ['sitePage', 'landingPage'],
			operation: ['create'],
		},
	},
};

export const pageTemplatePathField: INodeProperties = {
	displayName: 'Template Path',
	name: 'templatePath',
	type: 'options',
	typeOptions: {
		loadOptionsMethod: 'getPageTemplates',
	},
	default: '',
	required: true,
	description: 'The template to use for this page',
	displayOptions: {
		show: {
			resource: ['sitePage', 'landingPage'],
			operation: ['create'],
		},
	},
};

export const additionalFieldsField: INodeProperties = {
	displayName: 'Additional Fields',
	name: 'additionalFields',
	type: 'collection',
	default: {},
	placeholder: 'Add Field',
	description: 'Optional fields for the page',
	displayOptions: {
		show: {
			resource: ['sitePage', 'landingPage'],
			operation: ['create', 'update'],
		},
	},
	options: [
		{
			displayName: 'Slug',
			name: 'slug',
			type: 'string',
			default: '',
			placeholder: '/my-page',
			description: 'The URL slug for the page',
		},
		{
			displayName: 'Domain',
			name: 'domain',
			type: 'string',
			default: '',
			placeholder: 'www.example.com',
			description: 'The domain for the page',
		},
		{
			displayName: 'Language',
			name: 'language',
			type: 'string',
			default: '',
			placeholder: 'en',
			description: 'The language of the page (e.g., en, de, fr)',
		},
		{
			displayName: 'HTML Title',
			name: 'htmlTitle',
			type: 'string',
			default: '',
			placeholder: 'My Page Title',
			description: 'The HTML title for SEO',
		},
		{
			displayName: 'Meta Description',
			name: 'metaDescription',
			type: 'string',
			default: '',
			placeholder: 'A brief description of the page',
			description: 'The meta description for SEO',
		},
		{
			displayName: 'Featured Image',
			name: 'featuredImage',
			type: 'string',
			default: '',
			placeholder: 'https://example.com/image.jpg',
			description: 'URL of the featured image',
		},
		{
			displayName: 'Campaign',
			name: 'campaign',
			type: 'string',
			default: '',
			placeholder: 'summer-campaign-2024',
			description: 'The campaign GUID associated with this page',
		},
		{
			displayName: 'Layout Sections',
			name: 'layoutSections',
			type: 'json',
			default: '{}',
			description: 'Layout sections as JSON object',
		},
		{
			displayName: 'Attached Stylesheets',
			name: 'attachedStylesheets',
			type: 'json',
			default: '[]',
			description: 'Array of stylesheet objects with type and href properties',
		},
		{
			displayName: 'Public Access Rules Enabled',
			name: 'publicAccessRulesEnabled',
			type: 'boolean',
			default: false,
			description: 'Whether to enable public access rules',
		},
		{
			displayName: 'Public Access Rules',
			name: 'publicAccessRules',
			type: 'json',
			default: '[]',
			description: 'Public access rule objects as JSON array',
		},
		{
			displayName: 'State',
			name: 'state',
			type: 'options',
			options: [
				{ name: 'Draft', value: 'DRAFT' },
				{ name: 'Published', value: 'PUBLISHED' },
				{ name: 'Scheduled', value: 'SCHEDULED' },
			],
			default: '',
			description: 'Set the publish state. Use PUBLISHED to publish immediately.',
		},
	],
};

export const pageGetAllAdditionalFieldsField: INodeProperties = {
	displayName: 'Filter',
	name: 'getAllAdditionalFields',
	type: 'collection',
	default: {},
	placeholder: 'Add Field',
	description: 'Optional filters and sorting for listing pages',
	displayOptions: {
		show: {
			resource: ['sitePage', 'landingPage'],
			operation: ['getAll'],
		},
	},
	options: [
		{
			displayName: 'Archived',
			name: 'archived',
			type: 'boolean',
			default: false,
			description: 'Whether to return archived (soft-deleted) pages',
		},
		{
			displayName: 'Created After',
			name: 'createdAfter',
			type: 'dateTime',
			default: '',
			description: 'Only return pages created after this date',
		},
		{
			displayName: 'Created Before',
			name: 'createdBefore',
			type: 'dateTime',
			default: '',
			description: 'Only return pages created before this date',
		},
		{
			displayName: 'Updated After',
			name: 'updatedAfter',
			type: 'dateTime',
			default: '',
			description: 'Only return pages updated after this date',
		},
		{
			displayName: 'Updated Before',
			name: 'updatedBefore',
			type: 'dateTime',
			default: '',
			description: 'Only return pages updated before this date',
		},
		{
			displayName: 'Sort',
			name: 'sort',
			type: 'options',
			options: [
				{ name: 'Name', value: 'name' },
				{ name: 'Created At', value: 'createdAt' },
				{ name: 'Updated At', value: 'updatedAt' },
			],
			default: 'createdAt',
			description: 'Sort order for results',
		},
	],
};

export const pageFields: INodeProperties[] = [
	pageOperationField,
	pageIdField,
	sourcePageIdField,
	pageIdFieldField,
	pageNameField,
	pageTemplatePathField,
	publishDateField,
	additionalFieldsField,
	pageGetAllAdditionalFieldsField,
];
