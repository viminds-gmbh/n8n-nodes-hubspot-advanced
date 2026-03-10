import type { INodeProperties } from 'n8n-workflow';

export const contactOperationField: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	displayOptions: { show: { resource: ['contact'] } },
	options: [
		{ name: 'Register', value: 'register', description: 'Register contacts for an event' },
		{ name: 'Attend', value: 'attend', description: 'Mark contacts as attended' },
		{ name: 'Cancel', value: 'cancel', description: 'Cancel contact registration' }
	],
	default: 'register',
	required: true
};

export const contactObjectIdField: INodeProperties = {
	displayName: 'Event Object ID',
	name: 'objectId',
	type: 'string',
	default: '',
	required: true,
	placeholder: '12345678901',
	description: 'The HubSpot internal object ID of the marketing event',
	displayOptions: {
		show: {
			resource: ['contact'],
			operation: ['register', 'attend', 'cancel']
		}
	}
};

export const identifierTypeField: INodeProperties = {
	displayName: 'Identifier Type',
	name: 'identifierType',
	type: 'options',
	options: [
		{ name: 'Contact ID', value: 'contactId', description: 'Use HubSpot contact IDs' },
		{ name: 'Email', value: 'email', description: 'Use email addresses' }
	],
	default: 'email',
	description: 'How to identify the contacts',
	displayOptions: {
		show: {
			resource: ['contact'],
			operation: ['register', 'attend', 'cancel']
		}
	}
};

export const contactIdField: INodeProperties = {
	displayName: 'Contact ID',
	name: 'contactId',
	type: 'string',
	default: '',
	required: true,
	placeholder: '12345678',
	description: 'The HubSpot contact ID',
	displayOptions: {
		show: {
			resource: ['contact'],
			operation: ['register', 'attend', 'cancel'],
			identifierType: ['contactId']
		}
	}
};

export const emailField: INodeProperties = {
	displayName: 'Email',
	name: 'email',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'contact@example.com',
	description: 'The email address of the contact',
	displayOptions: {
		show: {
			resource: ['contact'],
			operation: ['register', 'attend', 'cancel'],
			identifierType: ['email']
		}
	}
};

export const interactionDateTimeField: INodeProperties = {
	displayName: 'Interaction Date Time Field',
	name: 'interactionDateTimeField',
	type: 'string',
	default: '',
	placeholder: 'registrationDate',
	description: 'Optional: Name of the field in input items that contains the interaction timestamp. If empty, current time will be used for all items.',
	displayOptions: {
		show: {
			resource: ['contact'],
			operation: ['register', 'attend']
		}
	}
};

export const contactFields = [
	contactOperationField,
	contactObjectIdField,
	identifierTypeField,
	contactIdField,
	emailField,
	interactionDateTimeField,
];
