import type { INodeProperties } from 'n8n-workflow';

export const resourceField: INodeProperties = {
	displayName: 'Resource',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'Blog Post',
			value: 'post',
			description: 'Work with blog posts',
		},
		{
			name: 'Blog Tag',
			value: 'tag',
			description: 'Work with blog tags',
		},
	],
	default: 'post',
	required: true,
};

export const returnAllField: INodeProperties = {
	displayName: 'Return All',
	name: 'returnAll',
	type: 'boolean',
	default: false,
	description: 'Whether to return all results or only up to a given limit',
	displayOptions: {
		show: {
			operation: ['getAll'],
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
	description: 'Maximum number of results to return',
	displayOptions: {
		show: {
			operation: ['getAll'],
			returnAll: [false],
		},
	},
};

export const offsetField: INodeProperties = {
	displayName: 'Offset',
	name: 'offset',
	type: 'number',
	default: 0,
	description: 'The offset for pagination. Use with Limit to page through results.',
	displayOptions: {
		show: {
			operation: ['getAll'],
		},
	},
};
