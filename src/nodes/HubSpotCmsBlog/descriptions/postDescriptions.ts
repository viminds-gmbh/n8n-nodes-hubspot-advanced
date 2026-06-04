import type { INodeProperties } from 'n8n-workflow';

export const postOperationField: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	options: [
		{ name: 'Get All', value: 'getAll', description: 'List blog posts with filters' },
		{ name: 'Get', value: 'get', description: 'Get a single blog post by ID' },
		{ name: 'Create', value: 'create', description: 'Create a new blog post' },
		{ name: 'Update', value: 'update', description: 'Update a blog post draft' },
		{ name: 'Delete', value: 'delete', description: 'Soft delete a blog post' },
		{ name: 'Clone', value: 'clone', description: 'Clone an existing blog post' },
		{ name: 'Schedule', value: 'schedule', description: 'Schedule a blog post for publishing' },
		{ name: 'Reset Draft', value: 'resetDraft', description: 'Reset draft to live version' },
		{ name: 'Get Draft', value: 'getDraft', description: 'Get the draft version of a post' },
		{ name: 'Get Revisions', value: 'getRevisions', description: 'List revisions of a post' },
		{ name: 'Restore Revision', value: 'restoreRevision', description: 'Restore a previous revision' },
		{ name: 'Batch Delete', value: 'batchDelete', description: 'Archive multiple posts' },
	],
	default: 'getAll',
	required: true,
	displayOptions: {
		show: {
			resource: ['post'],
		},
	},
};

export const postIdField: INodeProperties = {
	displayName: 'Post ID',
	name: 'postId',
	type: 'string',
	default: '',
	required: true,
	placeholder: '12345678',
	description: 'The ID of the blog post',
	displayOptions: {
		show: {
			resource: ['post'],
			operation: ['get', 'update', 'delete', 'schedule', 'resetDraft', 'getDraft', 'getRevisions'],
		},
	},
};

export const sourcePostIdField: INodeProperties = {
	displayName: 'Source Post ID',
	name: 'sourcePostId',
	type: 'string',
	default: '',
	required: true,
	placeholder: '12345678',
	description: 'The ID of the blog post to clone',
	displayOptions: {
		show: {
			resource: ['post'],
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
			resource: ['post'],
			operation: ['restoreRevision'],
		},
	},
};

export const postIdsField: INodeProperties = {
	displayName: 'Post IDs',
	name: 'postIds',
	type: 'string',
	default: '',
	required: true,
	placeholder: '12345678,87654321',
	description: 'Comma-separated list of post IDs to archive',
	displayOptions: {
		show: {
			resource: ['post'],
			operation: ['batchDelete'],
		},
	},
};

export const contentGroupIdField: INodeProperties = {
	displayName: 'Content Group ID',
	name: 'contentGroupId',
	type: 'options',
	typeOptions: {
		loadOptionsMethod: 'getBlogs',
	},
	default: '',
	required: true,
	description: 'The blog (content group) this post belongs to',
	displayOptions: {
		show: {
			resource: ['post'],
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
	description: 'Optional fields for the blog post',
	displayOptions: {
		show: {
			resource: ['post'],
			operation: ['create', 'update'],
		},
	},
	options: [
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
					operation: ['update'],
				},
			},
		},
		{
			displayName: 'Name',
			name: 'name',
			type: 'string',
			default: '',
			placeholder: 'My Blog Post',
			description: 'The internal name of the blog post',
		},
		{
			displayName: 'Slug',
			name: 'slug',
			type: 'string',
			default: '',
			placeholder: 'my-blog-post',
			description: 'The URL slug for the post',
		},
		{
			displayName: 'Language',
			name: 'language',
			type: 'string',
			default: '',
			placeholder: 'en',
			description: 'The language of the blog post (e.g., en, de, fr)',
		},
		{
			displayName: 'Blog Author ID',
			name: 'blogAuthorId',
			type: 'options',
			typeOptions: {
				loadOptionsMethod: 'getAuthors',
			},
			default: '',
			description: 'The author of the blog post',
		},
		{
			displayName: 'Tag IDs',
			name: 'tagIds',
			type: 'multiOptions',
			typeOptions: {
				loadOptionsMethod: 'getBlogTags',
			},
			default: [],
			description: 'Tags to associate with this post',
		},
		{
			displayName: 'HTML Title',
			name: 'htmlTitle',
			type: 'string',
			default: '',
			placeholder: 'My Blog Post Title',
			description: 'The HTML title for SEO',
		},
		{
			displayName: 'Meta Description',
			name: 'metaDescription',
			type: 'string',
			default: '',
			placeholder: 'A brief description of the post',
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
			displayName: 'Featured Image Alt Text',
			name: 'featuredImageAltText',
			type: 'string',
			default: '',
			placeholder: 'Description of the image',
			description: 'Alt text for the featured image',
		},
		{
			displayName: 'Post Body',
			name: 'postBody',
			type: 'string',
			typeOptions: {
				rows: 5,
			},
			default: '',
			placeholder: '<p>Post content here...</p>',
			description: 'The HTML body of the blog post',
		},
		{
			displayName: 'Post Summary',
			name: 'postSummary',
			type: 'string',
			typeOptions: {
				rows: 3,
			},
			default: '',
			placeholder: 'A short summary of the post',
			description: 'The summary of the blog post',
		},
		{
			displayName: 'RSS Body',
			name: 'rssBody',
			type: 'string',
			typeOptions: {
				rows: 5,
			},
			default: '',
			placeholder: '<p>RSS content here...</p>',
			description: 'The RSS body of the blog post',
		},
		{
			displayName: 'RSS Summary',
			name: 'rssSummary',
			type: 'string',
			typeOptions: {
				rows: 3,
			},
			default: '',
			placeholder: 'RSS summary text',
			description: 'The RSS summary of the blog post',
		},
		{
			displayName: 'Use Featured Image',
			name: 'useFeaturedImage',
			type: 'boolean',
			default: false,
			description: 'Whether to use the featured image in the post listing',
		},
		{
			displayName: 'Campaign',
			name: 'campaign',
			type: 'string',
			default: '',
			placeholder: 'summer-campaign-2024',
			description: 'The campaign GUID associated with this post',
		},
		{
			displayName: 'Layout Sections',
			name: 'layoutSections',
			type: 'json',
			default: '{}',
			description: 'Layout sections as JSON object',
		},
		{
			displayName: 'Publish Date',
			name: 'publishDate',
			type: 'dateTime',
			default: '',
			description: 'The date and time to publish the post (for schedule operation)',
		},
	],
};

export const postFiltersField: INodeProperties = {
	displayName: 'Filters',
	name: 'filters',
	type: 'collection',
	default: {},
	placeholder: 'Add Filter',
	description: 'Filter options for listing blog posts',
	displayOptions: {
		show: {
			resource: ['post'],
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
			],
			default: [],
			description: 'Filter by post state',
		},
		{
			displayName: 'Name Filter',
			name: 'nameFilter',
			type: 'string',
			default: '',
			placeholder: 'My Post',
			description: 'Filter by post name (partial match)',
		},
		{
			displayName: 'Content Group ID',
			name: 'contentGroupId',
			type: 'options',
			typeOptions: {
				loadOptionsMethod: 'getBlogs',
			},
			default: '',
			description: 'Filter by blog (content group)',
		},
		{
			displayName: 'Blog Author ID',
			name: 'blogAuthorId',
			type: 'options',
			typeOptions: {
				loadOptionsMethod: 'getAuthors',
			},
			default: '',
			description: 'Filter by author',
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
			displayName: 'Tag ID Filter',
			name: 'tagIdFilter',
			type: 'multiOptions',
			typeOptions: {
				loadOptionsMethod: 'getBlogTags',
			},
			default: [],
			description: 'Filter by tags',
		},
		{
			displayName: 'Created After',
			name: 'createdAfter',
			type: 'dateTime',
			default: '',
			description: 'Filter posts created after this date',
		},
		{
			displayName: 'Created Before',
			name: 'createdBefore',
			type: 'dateTime',
			default: '',
			description: 'Filter posts created before this date',
		},
		{
			displayName: 'Updated After',
			name: 'updatedAfter',
			type: 'dateTime',
			default: '',
			description: 'Filter posts updated after this date',
		},
		{
			displayName: 'Updated Before',
			name: 'updatedBefore',
			type: 'dateTime',
			default: '',
			description: 'Filter posts updated before this date',
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

export const postFields: INodeProperties[] = [
	postOperationField,
	contentGroupIdField,
	postIdField,
	sourcePostIdField,
	revisionIdField,
	postIdsField,
	additionalFieldsField,
	postFiltersField,
];
