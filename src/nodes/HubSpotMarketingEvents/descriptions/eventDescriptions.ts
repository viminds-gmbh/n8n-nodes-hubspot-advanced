import type { INodeProperties } from 'n8n-workflow';

export const eventOperationField: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	displayOptions: { show: { resource: ['event'] } },
	options: [
		{ name: 'Get', value: 'get', description: 'Get a single event by ID' },
		{ name: 'Create', value: 'create', description: 'Create a new marketing event' },
		{ name: 'Search', value: 'search', description: 'Search/list all events' },
		{ name: 'Update', value: 'update', description: 'Update a single event' },
		{ name: 'Delete', value: 'delete', description: 'Delete a single event' },
		{ name: 'Get Participants', value: 'getParticipants', description: 'Get all participants for an event' },
		{ name: 'Get Stats', value: 'getStats', description: 'Get participation statistics for an event' },
		{ name: 'Get Associated Lists', value: 'getAssociatedLists', description: 'Get lists associated with an event' },
		{ name: 'Associate List', value: 'associateList', description: 'Associate a list with an event' },
		{ name: 'Disassociate List', value: 'disassociateList', description: 'Remove a list association from an event' }
	],
	default: 'search',
	required: true
};

export const eventObjectIdField: INodeProperties = {
	displayName: 'Object ID',
	name: 'objectId',
	type: 'string',
	default: '',
	required: true,
	placeholder: '12345678901',
	description: 'The HubSpot internal object ID of the marketing event',
	displayOptions: {
		show: {
			resource: ['event'],
			operation: ['get', 'update', 'delete', 'getAssociatedLists', 'associateList', 'disassociateList']
		}
	}
};

export const eventIdField: INodeProperties = {
	displayName: 'ID Field',
	name: 'idField',
	type: 'string',
	default: 'objectId',
	placeholder: 'objectId',
	description: 'Name of the field in input items that contains the event object ID',
	displayOptions: {
		show: {
			resource: ['event'],
			operation: ['updateMany', 'deleteMany']
		}
	}
};

export const eventSearchLimitField: INodeProperties = {
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	typeOptions: {
		minValue: 1,
		maxValue: 100
	},
	default: 50,
	description: 'Maximum number of results to return',
	displayOptions: {
		show: {
			resource: ['event'],
			operation: ['search']
		}
	}
};

export const eventSearchReturnAllField: INodeProperties = {
	displayName: 'Return All',
	name: 'returnAll',
	type: 'boolean',
	default: false,
	description: 'Whether to automatically paginate and return all events. May take longer for large datasets.',
	displayOptions: {
		show: {
			resource: ['event'],
			operation: ['search']
		}
	}
};

export const eventNameField: INodeProperties = {
	displayName: 'Event Name',
	name: 'eventName',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'Annual Product Webinar 2024',
	description: 'The name of the marketing event',
	displayOptions: {
		show: {
			resource: ['event'],
			operation: ['create']
		}
	}
};

export const eventOrganizerField: INodeProperties = {
	displayName: 'Event Organizer',
	name: 'eventOrganizer',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'Marketing Team',
	description: 'The organizer of the marketing event',
	displayOptions: {
		show: {
			resource: ['event'],
			operation: ['create']
		}
	}
};

export const externalEventIdField: INodeProperties = {
	displayName: 'External Event ID',
	name: 'externalEventId',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'event-123',
	description: 'External event identifier (required by HubSpot API)',
	displayOptions: {
		show: {
			resource: ['event'],
			operation: ['create']
		}
	}
};

export const createFieldsCollection: INodeProperties = {
	displayName: 'Create Fields',
	name: 'createFields',
	type: 'collection',
	placeholder: 'Add Field',
	default: {},
	displayOptions: {
		show: {
			resource: ['event'],
			operation: ['create']
		}
	},
	options: [
		{
			displayName: 'External Account ID',
			name: 'externalAccountId',
			type: 'string',
			default: '',
			placeholder: 'my-app-id',
			description: 'External account identifier (optional, defaults to empty string)'
		},
		{
			displayName: 'Start Date Time',
			name: 'startDateTime',
			type: 'dateTime',
			default: '',
			description: 'The start date and time of the event'
		},
		{
			displayName: 'End Date Time',
			name: 'endDateTime',
			type: 'dateTime',
			default: '',
			description: 'The end date and time of the event'
		},
		{
			displayName: 'Event URL',
			name: 'eventUrl',
			type: 'string',
			default: '',
			placeholder: 'https://example.com/event',
			description: 'URL for the event landing page'
		},
		{
			displayName: 'Event Description',
			name: 'eventDescription',
			type: 'string',
			typeOptions: { rows: 4 },
			default: '',
			description: 'Description of the marketing event'
		},
		{
			displayName: 'Event Type',
			name: 'eventType',
			type: 'string',
			default: '',
			placeholder: 'WEBINAR',
			description: 'Type of event (e.g., WEBINAR, CONFERENCE, WORKSHOP)'
		},
		{
			displayName: 'Event Cancelled',
			name: 'eventCancelled',
			type: 'boolean',
			default: false,
			description: 'Whether the event is cancelled'
		}
	]
};

export const customPropertiesCreateCollection: INodeProperties = {
	displayName: 'Custom Properties',
	name: 'customProperties',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
	},
	default: {},
	displayOptions: {
		show: {
			resource: ['event'],
			operation: ['create']
		}
	},
	options: [
		{
			name: 'property',
			displayName: 'Property',
			values: [
				{
					displayName: 'Property Name',
					name: 'name',
					type: 'options',
					typeOptions: {
						loadOptionsMethod: 'getProperties',
					},
					default: '',
					required: true,
					description: 'The custom property to set. Select from the dropdown or use an expression.',
				},
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
					placeholder: 'Property value',
					description: 'The value to set for this custom property. Use expressions to reference data from previous nodes.',
				},
			],
		},
	],
};

export const updateFieldsCollection: INodeProperties = {
	displayName: 'Update Fields',
	name: 'updateFields',
	type: 'collection',
	placeholder: 'Add Field',
	default: {},
	displayOptions: {
		show: {
			resource: ['event'],
			operation: ['update']
		}
	},
	options: [
		{
			displayName: 'Event Name',
			name: 'eventName',
			type: 'string',
			default: '',
			placeholder: 'Annual Product Webinar 2024',
			description: 'The name of the marketing event'
		},
		{
			displayName: 'Event Organizer',
			name: 'eventOrganizer',
			type: 'string',
			default: '',
			placeholder: 'Marketing Team',
			description: 'The organizer of the marketing event'
		},
		{
			displayName: 'Start Date Time',
			name: 'startDateTime',
			type: 'dateTime',
			default: '',
			description: 'The start date and time of the event'
		},
		{
			displayName: 'End Date Time',
			name: 'endDateTime',
			type: 'dateTime',
			default: '',
			description: 'The end date and time of the event'
		},
		{
			displayName: 'Event URL',
			name: 'eventUrl',
			type: 'string',
			default: '',
			placeholder: 'https://example.com/event',
			description: 'URL for the event landing page'
		},
		{
			displayName: 'Event Description',
			name: 'eventDescription',
			type: 'string',
			typeOptions: { rows: 4 },
			default: '',
			description: 'Description of the marketing event'
		},
		{
			displayName: 'Event Type',
			name: 'eventType',
			type: 'string',
			default: '',
			placeholder: 'WEBINAR',
			description: 'Type of event (e.g., WEBINAR, CONFERENCE, WORKSHOP)'
		},
		{
			displayName: 'Event Cancelled',
			name: 'eventCancelled',
			type: 'boolean',
			default: false,
			description: 'Whether the event is cancelled'
		}
	]
};

export const customPropertiesUpdateCollection: INodeProperties = {
	displayName: 'Custom Properties',
	name: 'customProperties',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
	},
	default: {},
	displayOptions: {
		show: {
			resource: ['event'],
			operation: ['update']
		}
	},
	options: [
		{
			name: 'property',
			displayName: 'Property',
			values: [
				{
					displayName: 'Property Name',
					name: 'name',
					type: 'options',
					typeOptions: {
						loadOptionsMethod: 'getProperties',
					},
					default: '',
					required: true,
					description: 'The custom property to set. Select from the dropdown or use an expression.',
				},
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
					placeholder: 'Property value',
					description: 'The value to set for this custom property. Use expressions to reference data from previous nodes.',
				},
			],
		},
	],
};

export const listIdField: INodeProperties = {
	displayName: 'List ID',
	name: 'listId',
	type: 'string',
	default: '',
	required: true,
	placeholder: '123456789',
	description: 'The ILS ID of the list to associate or disassociate',
	displayOptions: {
		show: {
			resource: ['event'],
			operation: ['associateList', 'disassociateList']
		}
	}
};

export const listAssociationLimitField: INodeProperties = {
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	typeOptions: {
		minValue: 1,
		maxValue: 100
	},
	default: 50,
	description: 'Maximum number of results to return',
	displayOptions: {
		show: {
			resource: ['event'],
			operation: ['getAssociatedLists']
		}
	}
};

export const listAssociationReturnAllField: INodeProperties = {
	displayName: 'Return All',
	name: 'returnAll',
	type: 'boolean',
	default: false,
	description: 'Whether to automatically paginate and return all associated lists. May take longer for large datasets.',
	displayOptions: {
		show: {
			resource: ['event'],
			operation: ['getAssociatedLists']
		}
	}
};

export const participantsObjectIdField: INodeProperties = {
	displayName: 'Event Object ID',
	name: 'objectId',
	type: 'string',
	default: '',
	required: true,
	placeholder: '12345678901',
	description: 'The HubSpot internal object ID of the marketing event',
	displayOptions: {
		show: {
			resource: ['event'],
			operation: ['getParticipants', 'getStats']
		}
	}
};

export const participantsLimitField: INodeProperties = {
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	typeOptions: {
		minValue: 1,
		maxValue: 100
	},
	default: 50,
	description: 'Maximum number of results to return',
	displayOptions: {
		show: {
			resource: ['event'],
			operation: ['getParticipants']
		}
	}
};

export const participantsReturnAllField: INodeProperties = {
	displayName: 'Return All',
	name: 'returnAll',
	type: 'boolean',
	default: false,
	description: 'Whether to automatically paginate and return all participants. May take longer for large datasets.',
	displayOptions: {
		show: {
			resource: ['event'],
			operation: ['getParticipants']
		}
	}
};

export const participantsFiltersCollection: INodeProperties = {
	displayName: 'Filters',
	name: 'filters',
	type: 'collection',
	placeholder: 'Add Filter',
	default: {},
	displayOptions: {
		show: {
			resource: ['event'],
			operation: ['getParticipants']
		}
	},
	options: [
		{
			displayName: 'State',
			name: 'state',
			type: 'options',
			options: [
				{ name: 'Registered', value: 'REGISTERED' },
				{ name: 'Attended', value: 'ATTENDED' },
				{ name: 'Cancelled', value: 'CANCELLED' }
			],
			default: '',
			description: 'Filter by participation state'
		},
		{
			displayName: 'Contact Identifier',
			name: 'contactIdentifier',
			type: 'string',
			default: '',
			placeholder: 'john@example.com or 12345',
			description: 'Filter by contact email or ID'
		}
	]
};

export const eventFields = [
	eventOperationField,
	eventObjectIdField,
	eventIdField,
	eventSearchLimitField,
	eventSearchReturnAllField,
	eventNameField,
	eventOrganizerField,
	externalEventIdField,
	createFieldsCollection,
	customPropertiesCreateCollection,
	updateFieldsCollection,
	customPropertiesUpdateCollection,
	participantsObjectIdField,
	participantsLimitField,
	participantsReturnAllField,
	participantsFiltersCollection,
	listIdField,
	listAssociationLimitField,
	listAssociationReturnAllField,
];
