import type { INodeProperties } from 'n8n-workflow';
import { HUBSPOT_OBJECT_TYPE_OPTIONS } from '../../../types';

export const operationField: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'Get Associations',
			value: 'getAssociations',
			description: 'Get associated object IDs',
		},
		{
			name: 'Hydrate Associations',
			value: 'hydrateAssociations',
			description: 'Get full associated objects with properties',
		},
		{
			name: 'Create Association',
			value: 'createAssociation',
			description: 'Associate two objects',
		},
		{
			name: 'Delete Association',
			value: 'deleteAssociation',
			description: 'Remove association between objects',
		},
	],
	default: 'hydrateAssociations',
	required: true,
};

export const fromObjectTypeField: INodeProperties = {
	displayName: 'From Object Type',
	name: 'fromObjectType',
	type: 'options',
	options: [...HUBSPOT_OBJECT_TYPE_OPTIONS],
	default: 'contacts',
	required: true,
	description: 'The source object type for the association. <a href="https://developers.hubspot.com/docs/api/crm/associations" target="_blank">Learn more about associations</a>.',
};

export const customFromObjectTypeField: INodeProperties = {
	displayName: 'Custom From Object Type',
	name: 'customFromObjectType',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'cars',
	description: 'The name or ID of the custom source object type (e.g., "cars" or "2-12345").',
	displayOptions: {
		show: {
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
	description: 'The target object type for the association.',
};

export const customToObjectTypeField: INodeProperties = {
	displayName: 'Custom To Object Type',
	name: 'customToObjectType',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'cars',
	description: 'The name or ID of the custom target object type (e.g., "cars" or "2-12345").',
	displayOptions: {
		show: {
			toObjectType: ['custom'],
		},
	},
};

export const idFieldField: INodeProperties = {
	displayName: 'ID Field',
	name: 'idField',
	type: 'string',
	default: 'id',
	placeholder: 'id',
	description: 'Field name in input items containing the source object ID. The node will process all input items in batch.',
	displayOptions: {
		show: {
			operation: ['getAssociations', 'hydrateAssociations'],
		},
	},
};

export const propertiesField: INodeProperties = {
	displayName: 'Properties',
	name: 'properties',
	type: 'multiOptions',
	typeOptions: {
		loadOptionsMethod: 'getProperties',
		loadOptionsDependsOn: ['toObjectType', 'customToObjectType'],
	},
	default: '',
	placeholder: 'name,domain,industry',
	description: 'Properties to return for associated objects when using "Hydrate Associations". Leave empty to return only IDs.',
	displayOptions: {
		show: {
			operation: ['hydrateAssociations'],
		},
	},
};

export const outputFieldField: INodeProperties = {
	displayName: 'Output Field',
	name: 'outputField',
	type: 'string',
	default: 'associations',
	placeholder: 'associations',
	description: 'The field name where associations will be stored in the output. Default: "associations".',
	displayOptions: {
		show: {
			operation: ['getAssociations', 'hydrateAssociations'],
		},
	},
};

export const fromObjectIdField: INodeProperties = {
	displayName: 'From Object ID',
	name: 'fromObjectId',
	type: 'string',
	default: '',
	required: true,
	placeholder: '12345678',
	description: 'The ID of the source object to associate or disassociate.',
	displayOptions: {
		show: {
			operation: ['createAssociation', 'deleteAssociation'],
		},
	},
};

export const toObjectIdField: INodeProperties = {
	displayName: 'To Object ID',
	name: 'toObjectId',
	type: 'string',
	default: '',
	required: true,
	placeholder: '87654321',
	description: 'The ID of the target object to associate or disassociate.',
	displayOptions: {
		show: {
			operation: ['createAssociation', 'deleteAssociation'],
		},
	},
};

export const associationFields: INodeProperties[] = [
	operationField,
	fromObjectTypeField,
	customFromObjectTypeField,
	toObjectTypeField,
	customToObjectTypeField,
	idFieldField,
	propertiesField,
	outputFieldField,
	fromObjectIdField,
	toObjectIdField,
];
