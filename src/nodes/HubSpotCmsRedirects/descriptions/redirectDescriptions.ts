import type { INodeProperties } from 'n8n-workflow';

export const operationField: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'Search',
			value: 'search',
			description: 'Search URL redirects with optional filters',
		},
		{
			name: 'Get',
			value: 'get',
			description: 'Retrieve a single URL redirect by ID',
		},
		{
			name: 'Create',
			value: 'create',
			description: 'Create a new URL redirect',
		},
		{
			name: 'Update',
			value: 'update',
			description: 'Update an existing URL redirect',
		},
		{
			name: 'Delete',
			value: 'delete',
			description: 'Delete a URL redirect',
		},
	],
	default: 'search',
	required: true,
};

export const redirectIdField: INodeProperties = {
	displayName: 'Redirect ID',
	name: 'redirectId',
	type: 'options',
	typeOptions: {
		loadOptionsMethod: 'getRedirects',
	},
	default: '',
	required: true,
	description: 'Select the URL redirect to work with',
	displayOptions: {
		show: {
			operation: ['get', 'update', 'delete'],
		},
	},
};

export const routePrefixField: INodeProperties = {
	displayName: 'Route Prefix',
	name: 'routePrefix',
	type: 'string',
	default: '',
	required: true,
	placeholder: '/old-page',
	description: 'The URL path that will be redirected. Must start with a forward slash (e.g., "/old-page").',
	displayOptions: {
		show: {
			operation: ['create'],
		},
	},
};

export const destinationField: INodeProperties = {
	displayName: 'Destination',
	name: 'destination',
	type: 'string',
	default: '',
	required: true,
	placeholder: '/new-page',
	description: 'The URL where the redirect will point to. Can be an absolute URL or a relative path.',
	displayOptions: {
		show: {
			operation: ['create'],
		},
	},
};

export const redirectStyleField: INodeProperties = {
	displayName: 'Redirect Style',
	name: 'redirectStyle',
	type: 'options',
	options: [
		{ name: '301 (Permanent)', value: '301' },
		{ name: '302 (Temporary)', value: '302' },
		{ name: '305 (Proxy)', value: '305' },
	],
	default: '301',
	required: true,
	description: 'The HTTP status code for the redirect. 301 is permanent, 302 is temporary, 305 uses a proxy.',
	displayOptions: {
		show: {
			operation: ['create'],
		},
	},
};

export const updateRoutePrefixField: INodeProperties = {
	displayName: 'Route Prefix',
	name: 'routePrefix',
	type: 'string',
	default: '',
	placeholder: '/old-page',
	description: 'The URL path that will be redirected. Must start with a forward slash (e.g., "/old-page").',
	displayOptions: {
		show: {
			operation: ['update'],
		},
	},
};

export const updateDestinationField: INodeProperties = {
	displayName: 'Destination',
	name: 'destination',
	type: 'string',
	default: '',
	placeholder: '/new-page',
	description: 'The URL where the redirect will point to. Can be an absolute URL or a relative path.',
	displayOptions: {
		show: {
			operation: ['update'],
		},
	},
};

export const updateRedirectStyleField: INodeProperties = {
	displayName: 'Redirect Style',
	name: 'redirectStyle',
	type: 'options',
	options: [
		{ name: '301 (Permanent)', value: '301' },
		{ name: '302 (Temporary)', value: '302' },
		{ name: '305 (Proxy)', value: '305' },
	],
	default: '301',
	description: 'The HTTP status code for the redirect.',
	displayOptions: {
		show: {
			operation: ['update'],
		},
	},
};

export const isMatchFullUrlField: INodeProperties = {
	displayName: 'Match Full URL',
	name: 'isMatchFullUrl',
	type: 'boolean',
	default: false,
	description: 'Whether the redirect rule matches the entire URL including the domain. When enabled, the route prefix must be a full URL.',
	displayOptions: {
		show: {
			operation: ['create', 'update'],
		},
	},
};

export const isMatchQueryStringField: INodeProperties = {
	displayName: 'Match Query String',
	name: 'isMatchQueryString',
	type: 'boolean',
	default: false,
	description: 'Whether the redirect rule also matches against query parameters in the URL.',
	displayOptions: {
		show: {
			operation: ['create', 'update'],
		},
	},
};

export const isOnlyAfterNotFoundField: INodeProperties = {
	displayName: 'Only After 404',
	name: 'isOnlyAfterNotFound',
	type: 'boolean',
	default: false,
	description: 'Whether the redirect only applies if the original URL returns a 404 error.',
	displayOptions: {
		show: {
			operation: ['create', 'update'],
		},
	},
};

export const isPatternField: INodeProperties = {
	displayName: 'Is Pattern (Regex)',
	name: 'isPattern',
	type: 'boolean',
	default: false,
	description: 'Whether the route prefix should be treated as a regular expression pattern for flexible matching.',
	displayOptions: {
		show: {
			operation: ['create', 'update'],
		},
	},
};

export const isProtocolRelativeField: INodeProperties = {
	displayName: 'Protocol Relative',
	name: 'isProtocolRelative',
	type: 'boolean',
	default: false,
	description: 'Whether the redirect ignores the protocol (http/https) when matching URLs.',
	displayOptions: {
		show: {
			operation: ['create', 'update'],
		},
	},
};

export const isTrailingSlashOptionalField: INodeProperties = {
	displayName: 'Trailing Slash Optional',
	name: 'isTrailingSlashOptional',
	type: 'boolean',
	default: false,
	description: 'Whether the redirect matches URLs with or without a trailing slash.',
	displayOptions: {
		show: {
			operation: ['create', 'update'],
		},
	},
};

export const precedenceField: INodeProperties = {
	displayName: 'Precedence',
	name: 'precedence',
	type: 'number',
	default: 0,
	description: 'The priority order for this redirect. Lower numbers have higher priority. Used when multiple redirects could match the same URL.',
	displayOptions: {
		show: {
			operation: ['create', 'update'],
		},
	},
};

export const filtersField: INodeProperties = {
	displayName: 'Filters',
	name: 'filters',
	type: 'fixedCollection',
	default: {},
	description: 'Optional filters to narrow down the list of redirects',
	displayOptions: {
		show: {
			operation: ['search'],
		},
	},
	options: [
		{
			name: 'filterValues',
			displayName: 'Filter Values',
			values: [
				{
					displayName: 'Route Prefix',
					name: 'routePrefixFilter',
					type: 'string',
					default: '',
					placeholder: '/old-page',
					description: 'Filter redirects by route prefix (partial match)',
				},
				{
					displayName: 'Destination',
					name: 'destinationFilter',
					type: 'string',
					default: '',
					placeholder: '/new-page',
					description: 'Filter redirects by destination URL (partial match)',
				},
				{
					displayName: 'Redirect Style',
					name: 'redirectStyleFilter',
					type: 'options',
					options: [
						{ name: '301 (Permanent)', value: '301' },
						{ name: '302 (Temporary)', value: '302' },
						{ name: '305 (Proxy)', value: '305' },
					],
					default: '',
					description: 'Filter redirects by HTTP status code',
				},
				{
					displayName: 'Created After',
					name: 'createdAfter',
					type: 'dateTime',
					default: '',
					description: 'Only return redirects created after this date',
				},
				{
					displayName: 'Created Before',
					name: 'createdBefore',
					type: 'dateTime',
					default: '',
					description: 'Only return redirects created before this date',
				},
				{
					displayName: 'Updated After',
					name: 'updatedAfter',
					type: 'dateTime',
					default: '',
					description: 'Only return redirects updated after this date',
				},
				{
					displayName: 'Updated Before',
					name: 'updatedBefore',
					type: 'dateTime',
					default: '',
					description: 'Only return redirects updated before this date',
				},
				{
					displayName: 'Sort By',
					name: 'sort',
					type: 'options',
					options: [
						{ name: 'Created At', value: 'createdAt' },
						{ name: 'Updated At', value: 'updatedAt' },
						{ name: 'Route Prefix', value: 'routePrefix' },
						{ name: 'Destination', value: 'destination' },
					],
					default: 'createdAt',
					description: 'The field to sort the results by',
				},
			],
		},
	],
};

export const returnAllField: INodeProperties = {
	displayName: 'Return All',
	name: 'returnAll',
	type: 'boolean',
	default: false,
	description: 'Whether to automatically paginate and return all results. May take longer for large datasets.',
	displayOptions: {
		show: {
			operation: ['search'],
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
		maxValue: 100,
	},
	description: 'Maximum number of redirects to return. HubSpot API limits this to 100 per request.',
	displayOptions: {
		show: {
			operation: ['search'],
			returnAll: [false],
		},
	},
};

export const offsetField: INodeProperties = {
	displayName: 'Offset',
	name: 'offset',
	type: 'number',
	default: 0,
	description: 'The number of redirects to skip before starting to collect results. Use for manual pagination.',
	displayOptions: {
		show: {
			operation: ['search'],
			returnAll: [false],
		},
	},
};

export const redirectFields: INodeProperties[] = [
	operationField,
	redirectIdField,
	routePrefixField,
	destinationField,
	redirectStyleField,
	updateRoutePrefixField,
	updateDestinationField,
	updateRedirectStyleField,
	isMatchFullUrlField,
	isMatchQueryStringField,
	isOnlyAfterNotFoundField,
	isPatternField,
	isProtocolRelativeField,
	isTrailingSlashOptionalField,
	precedenceField,
	filtersField,
	returnAllField,
	limitField,
	offsetField,
];
