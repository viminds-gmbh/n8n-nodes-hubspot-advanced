import type { INodeProperties } from 'n8n-workflow';

export const resourceField: INodeProperties = {
	displayName: 'Resource',
	name: 'resource',
	type: 'options',
	options: [
		{ name: 'Event', value: 'event' },
		{ name: 'Contact', value: 'contact' }
	],
	default: 'event',
	required: true,
	description: 'The resource to operate on'
};

export const objectIdField: INodeProperties = {
	displayName: 'Object ID',
	name: 'objectId',
	type: 'string',
	default: '',
	required: true,
	placeholder: '12345678901',
	description: 'The HubSpot internal object ID of the marketing event'
};

export const idField: INodeProperties = {
	displayName: 'ID Field',
	name: 'idField',
	type: 'string',
	default: 'objectId',
	placeholder: 'objectId',
	description: 'Name of the field in input items that contains the event object ID'
};

export const limitField: INodeProperties = {
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	typeOptions: {
		minValue: 1,
		maxValue: 100
	},
	default: 50,
	description: 'Maximum number of results to return'
};

export const returnAllField: INodeProperties = {
	displayName: 'Return All',
	name: 'returnAll',
	type: 'boolean',
	default: false,
	description: 'Whether to automatically paginate and return all results. May take longer for large datasets.'
};
