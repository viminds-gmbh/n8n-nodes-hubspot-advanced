import type { INodeProperties } from 'n8n-workflow';

export const resourceField: INodeProperties = {
	displayName: 'Resource',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'Table',
			value: 'table',
			description: 'Manage HubDB tables',
		},
		{
			name: 'Row',
			value: 'row',
			description: 'Manage rows within HubDB tables',
		},
	],
	default: 'table',
	required: true,
};

export const tableIdField: INodeProperties = {
	displayName: 'Table',
	name: 'tableId',
	type: 'options',
	typeOptions: {
		loadOptionsMethod: 'loadTables',
	},
	default: '',
	required: true,
	placeholder: '12345678',
	description: 'The HubDB table to work with. You can also use an expression to provide a table ID or name.',
	displayOptions: {
		show: {
			resource: ['row'],
		},
	},
};
