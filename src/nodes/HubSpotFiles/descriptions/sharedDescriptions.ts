import type { INodeProperties } from 'n8n-workflow';

export const resourceField: INodeProperties = {
	displayName: 'Resource',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{ name: 'File', value: 'file' },
		{ name: 'Folder', value: 'folder' },
	],
	default: 'file',
	required: true,
	description: 'Choose whether to work with files or folders in HubSpot File Manager.',
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

export const searchLimitField: INodeProperties = {
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	default: 20,
	placeholder: '20',
	description: 'Maximum number of results to return.',
	displayOptions: {
		show: {
			operation: ['search'],
			returnAll: [false],
		},
	},
};
