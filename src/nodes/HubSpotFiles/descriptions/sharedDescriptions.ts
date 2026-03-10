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

export const searchLimitField: INodeProperties = {
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	default: 20,
	placeholder: '20',
	description: 'Maximum number of results to return (max 100).',
	displayOptions: {
		show: {
			operation: ['search'],
		},
	},
};
