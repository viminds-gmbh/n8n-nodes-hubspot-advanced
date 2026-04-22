import type { INodeProperties } from 'n8n-workflow';
import { HUBSPOT_OBJECT_TYPE_OPTIONS } from '../../../types';

export const operationField: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'Get Custom Object Types',
			value: 'getObjectTypes',
			description: 'Get all custom object types (only returns custom objects, not standard objects like contacts/companies)',
		},
		{
			name: 'Get Object Schema',
			value: 'getObjectSchema',
			description: 'Get the complete schema for a specific object type (properties, associations, etc.)',
		},
		{
			name: 'Get Properties',
			value: 'getProperties',
			description: 'Get properties for an object type',
		},
		{
			name: 'Get Association Label Definitions',
			value: 'getAssociationLabelDefinitions',
			description: 'Get all association label definitions between two object types (schema information, not actual associations)',
		},
	],
	default: 'getObjectTypes',
	required: true,
};

export const objectTypeField: INodeProperties = {
	displayName: 'Object Type',
	name: 'objectType',
	type: 'options',
	options: [...HUBSPOT_OBJECT_TYPE_OPTIONS],
	default: 'contacts',
	required: true,
	description: 'The type of CRM object to retrieve properties for. <a href="https://developers.hubspot.com/docs/api/crm/properties" target="_blank">Learn more about properties</a>.',
	displayOptions: {
		show: {
			operation: ['getProperties', 'getObjectSchema'],
		},
	},
};

export const customObjectTypeField: INodeProperties = {
	displayName: 'Custom Object Type',
	name: 'customObjectType',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'cars',
	description: 'The name or ID of the custom object type (e.g., "cars" or "2-12345"). <a href="https://developers.hubspot.com/docs/api/crm/crm-custom-objects" target="_blank">Learn more about custom objects</a>.',
	displayOptions: {
		show: {
			operation: ['getProperties', 'getObjectSchema'],
			objectType: ['custom'],
		},
	},
};

export const returnAllField: INodeProperties = {
	displayName: 'Return All',
	name: 'returnAll',
	type: 'boolean',
	default: false,
	description: 'Whether to automatically paginate and return all properties. May take longer for object types with many properties.',
	displayOptions: {
		show: {
			operation: ['getProperties'],
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
		maxValue: 10000,
	},
	description: 'Maximum number of properties to return',
	displayOptions: {
		show: {
			operation: ['getProperties'],
			returnAll: [false],
		},
	},
};

export const fromObjectTypeField: INodeProperties = {
	displayName: 'From Object Type',
	name: 'fromObjectType',
	type: 'options',
	options: [...HUBSPOT_OBJECT_TYPE_OPTIONS],
	default: 'contacts',
	required: true,
	description: 'The source object type for the association',
	displayOptions: {
		show: {
			operation: ['getAssociationLabelDefinitions'],
		},
	},
};

export const customFromObjectTypeField: INodeProperties = {
	displayName: 'Custom From Object Type',
	name: 'customFromObjectType',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'cars',
	description: 'The name or ID of the custom source object type',
	displayOptions: {
		show: {
			operation: ['getAssociationLabelDefinitions'],
			fromObjectType: ['custom'],
		},
	},
};

export const toObjectTypeField: INodeProperties = {
	displayName: 'To Object Type',
	name: 'toObjectType',
	type: 'options',
	options: [...HUBSPOT_OBJECT_TYPE_OPTIONS],
	default: 'companies',
	required: true,
	description: 'The target object type for the association',
	displayOptions: {
		show: {
			operation: ['getAssociationLabelDefinitions'],
		},
	},
};

export const customToObjectTypeField: INodeProperties = {
	displayName: 'Custom To Object Type',
	name: 'customToObjectType',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'products',
	description: 'The name or ID of the custom target object type',
	displayOptions: {
		show: {
			operation: ['getAssociationLabelDefinitions'],
			toObjectType: ['custom'],
		},
	},
};

export const schemaFields: INodeProperties[] = [
	operationField,
	objectTypeField,
	customObjectTypeField,
	returnAllField,
	limitField,
	fromObjectTypeField,
	customFromObjectTypeField,
	toObjectTypeField,
	customToObjectTypeField,
];
