import type { INodeProperties } from 'n8n-workflow';
import { CONTENT_TYPE_OPTIONS } from '../types';

export const operationField: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'Search',
			value: 'search',
			description: 'Search content across HubSpot-hosted sites',
		},
		{
			name: 'Get Indexed Data',
			value: 'getIndexedData',
			description: 'Get indexed search data for a specific content asset',
		},
	],
	default: 'search',
	required: true,
};

export const queryField: INodeProperties = {
	displayName: 'Query',
	name: 'query',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'marketing tips',
	description: 'The search query term to find content across your HubSpot-hosted sites',
	displayOptions: {
		show: {
			operation: ['search'],
		},
	},
};

export const contentTypeField: INodeProperties = {
	displayName: 'Content Type',
	name: 'contentType',
	type: 'multiOptions',
	options: [...CONTENT_TYPE_OPTIONS],
	default: ['SITE_PAGE', 'BLOG_POST', 'LISTING_PAGE'],
	description: 'Filter search results by content type. Select none to search all types',
	displayOptions: {
		show: {
			operation: ['search'],
		},
	},
};

export const contentTypeSingleField: INodeProperties = {
	displayName: 'Content Type',
	name: 'contentType',
	type: 'options',
	options: [...CONTENT_TYPE_OPTIONS],
	default: 'SITE_PAGE',
	required: true,
	description: 'The content type of the asset to retrieve indexed data for',
	displayOptions: {
		show: {
			operation: ['getIndexedData'],
		},
	},
};

export const limitField: INodeProperties = {
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	default: 10,
	typeOptions: {
		minValue: 1,
		maxValue: 100,
	},
	description: 'Maximum number of results to return per page. Max: 100',
	displayOptions: {
		show: {
			operation: ['search'],
		},
	},
};

export const additionalOptionsField: INodeProperties = {
	displayName: 'Additional Options',
	name: 'additionalOptions',
	type: 'collection',
	default: {},
	placeholder: 'Add Option',
	description: 'Optional search parameters for filtering and boosting',
	displayOptions: {
		show: {
			operation: ['search'],
		},
	},
	options: [
		{
			displayName: 'Offset',
			name: 'offset',
			type: 'number',
			default: 0,
			description: 'Number of results to skip for pagination',
		},
		{
			displayName: 'Domain',
			name: 'domain',
			type: 'string',
			default: '',
			placeholder: 'blog.example.com',
			description: 'Limit search to a specific domain (e.g., "blog.example.com")',
		},
		{
			displayName: 'Language',
			name: 'language',
			type: 'string',
			default: '',
			placeholder: 'en',
			description: 'Filter by language code (e.g., "en", "de")',
		},
		{
			displayName: 'Content Group ID',
			name: 'contentGroupId',
			type: 'string',
			default: '',
			description: 'Filter by blog or content group ID',
		},
		{
			displayName: 'Boost Recent',
			name: 'boostRecent',
			type: 'string',
			default: '',
			placeholder: '10d',
			description: 'A relative time window where scores of content published outside this window decay. Only applies to blog posts. Supported time units: ms, s, m, h, d (e.g., "10d" boosts posts from the last 10 days)',
		},
		{
			displayName: 'Boost Blog Posts',
			name: 'boostBlogPosts',
			type: 'number',
			default: 1.0,
			description: 'Boost factor for blog posts. Values > 1.0 increase relevance, < 1.0 decrease it',
		},
		{
			displayName: 'Boost Site Pages',
			name: 'boostSitePages',
			type: 'number',
			default: 1.0,
			description: 'Boost factor for site pages. Values > 1.0 increase relevance, < 1.0 decrease it',
		},
		{
			displayName: 'Boost Landing Pages',
			name: 'boostLandingPages',
			type: 'number',
			default: 1.0,
			description: 'Boost factor for landing pages. Values > 1.0 increase relevance, < 1.0 decrease it',
		},
		{
			displayName: 'Boost Knowledge Articles',
			name: 'boostKnowledgeArticles',
			type: 'number',
			default: 1.0,
			description: 'Boost factor for knowledge articles. Values > 1.0 increase relevance, < 1.0 decrease it',
		},
		{
			displayName: 'Boost Listings',
			name: 'boostListings',
			type: 'number',
			default: 1.0,
			description: 'Boost factor for listing pages. Values > 1.0 increase relevance, < 1.0 decrease it',
		},
		{
			displayName: 'Blog IDs',
			name: 'groupId',
			type: 'multiOptions',
			typeOptions: {
				loadOptionsMethod: 'loadBlogs',
			},
			default: [],
			description: 'Specifies which blog(s) to search by blog ID. Can be used multiple times to search more than one blog',
		},
		{
			displayName: 'HubDB Table ID',
			name: 'tableId',
			type: 'options',
			typeOptions: {
				loadOptionsMethod: 'loadTables',
			},
			default: '',
			description: 'Specifies a specific HubDB table to search. Only returns results from the specified table',
		},
		{
			displayName: 'HubDB Query',
			name: 'hubdbQuery',
			type: 'string',
			default: '',
			description: 'Specify a HubDB query to further filter the search results',
		},
		{
			displayName: 'Path Prefix',
			name: 'pathPrefix',
			type: 'string',
			default: '',
			placeholder: '/blog/marketing',
			description: 'Specifies a path prefix to filter search results. Only returns results with URL paths that start with the specified value',
		},
		{
			displayName: 'Match Prefix',
			name: 'matchPrefix',
			type: 'boolean',
			default: true,
			description: 'Inverts the behavior of the pathPrefix filter when set to false. Defaults to true',
		},
	],
};

export const contentIdField: INodeProperties = {
	displayName: 'Content ID',
	name: 'contentId',
	type: 'string',
	default: '',
	required: true,
	placeholder: '184993428780',
	description: 'The unique ID of the content asset to retrieve indexed data for. Can be a page id, blog post id, etc.',
	displayOptions: {
		show: {
			operation: ['getIndexedData'],
		},
	},
};

export const searchFields: INodeProperties[] = [
	operationField,
	queryField,
	contentTypeField,
	limitField,
	additionalOptionsField,
	contentTypeSingleField,
	contentIdField,
];
