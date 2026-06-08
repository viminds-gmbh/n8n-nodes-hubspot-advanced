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
		{ name: 'Reset Draft', value: 'resetDraft', description: 'Reset draft to live version' },
		{ name: 'Get Draft', value: 'getDraft', description: 'Get the draft version of a page' },
		{ name: 'Get Revisions', value: 'getRevisions', description: 'List revisions of a page' },
		{ name: 'Restore Revision', value: 'restoreRevision', description: 'Restore a previous revision' },
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
	displayName: 'Page ID',
	name: 'pageId',
	type: 'string',
	default: '',
	required: true,
	placeholder: '12345678',
	description: 'The ID of the page',
	displayOptions: {
		show: {
			resource: ['sitePage', 'landingPage'],
			operation: ['get', 'update', 'delete', 'publish', 'schedule', 'resetDraft', 'getDraft', 'getRevisions', 'restoreRevision'],
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

export const revisionIdField: INodeProperties = {
	displayName: 'Revision ID',
	name: 'revisionId',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'abc123',
	description: 'The ID of the revision to restore',
	displayOptions: {
		show: {
			resource: ['sitePage', 'landingPage'],
			operation: ['restoreRevision'],
		},
	},
};

export const pageIdsField: INodeProperties = {
	displayName: 'Page IDs',
	name: 'pageIds',
	type: 'string',
	default: '',
	required: true,
	placeholder: '12345678,87654321',
	description: 'Comma-separated list of page IDs to archive',
	displayOptions: {
		show: {
			resource: ['sitePage', 'landingPage'],
			operation: ['batchDelete'],
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
			operation: ['create', 'update', 'schedule'],
		},
	},
	options: [
		{
			displayName: 'Name',
			name: 'name',
			type: 'string',
			default: '',
			placeholder: 'My Page',
			description: 'The internal name of the page',
		},
		{
			displayName: 'Template Path',
			name: 'templatePath',
			type: 'string',
			default: '',
			placeholder: 'templates/my-page.html',
			description: 'Path to the template in Design Manager. Must not start with a slash.',
		},
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
			displayName: 'Publish Date',
			name: 'publishDate',
			type: 'dateTime',
			default: '',
			description: 'The date and time to publish the page (for schedule operation)',
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
			displayOptions: {
				show: {
					operation: ['create', 'update'],
				},
			},
		},
	],
};

export const pageFiltersField: INodeProperties = {
	displayName: 'Filters',
	name: 'filters',
	type: 'collection',
	default: {},
	placeholder: 'Add Filter',
	description: 'Filter options for listing pages',
	displayOptions: {
		show: {
			resource: ['sitePage', 'landingPage'],
			operation: ['getAll'],
		},
	},
	options: [
		{
			displayName: 'State Filter',
			name: 'stateFilter',
			type: 'multiOptions',
			options: [
				{ name: 'Draft', value: 'DRAFT' },
				{ name: 'Published', value: 'PUBLISHED' },
				{ name: 'Scheduled', value: 'SCHEDULED' },
				{ name: 'Published or Scheduled', value: 'PUBLISHED_OR_SCHEDULED' },
			],
			default: [],
			description: 'Filter by page state',
		},
		{
			displayName: 'Name Filter',
			name: 'nameFilter',
			type: 'string',
			default: '',
			placeholder: 'About',
			description: 'Filter by page name (partial match)',
		},
		{
			displayName: 'Domain Filter',
			name: 'domainFilter',
			type: 'multiOptions',
			typeOptions: {
				loadOptionsMethod: 'getDomains',
			},
			default: [],
			description: 'Filter by domain',
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
			description: 'Filter pages created after this date',
		},
		{
			displayName: 'Created Before',
			name: 'createdBefore',
			type: 'dateTime',
			default: '',
			description: 'Filter pages created before this date',
		},
		{
			displayName: 'Updated After',
			name: 'updatedAfter',
			type: 'dateTime',
			default: '',
			description: 'Filter pages updated after this date',
		},
		{
			displayName: 'Updated Before',
			name: 'updatedBefore',
			type: 'dateTime',
			default: '',
			description: 'Filter pages updated before this date',
		},
		{
			displayName: 'Sort',
			name: 'sort',
			type: 'options',
			options: [
				{ name: 'Name', value: 'name' },
				{ name: 'Created At', value: 'createdAt' },
				{ name: 'Updated At', value: 'updatedAt' },
				{ name: 'Publish Date', value: 'publishDate' },
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
	revisionIdField,
	pageIdsField,
	additionalFieldsField,
	pageFiltersField,
];
