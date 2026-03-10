import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';

import { hubspotApiRequest, hubspotApiRequestAllItems, hubspotApiRequestForLoadOptions } from '../../transport/HubSpotApiRequest';

export class HubSpotMarketingEvents implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'HubSpot Marketing Events.',
		name: 'hubSpotMarketingEvents',
		icon: 'file:../../icon.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Interact with HubSpot Marketing Events using HubSpot internal object IDs',
		defaults: {
			name: 'HubSpot Marketing Events',
		},
		codex: {
			categories: ['Marketing & Content'],
			subcategories: {
				'Marketing & Content': ['CRM'],
			},
			alias: [
				'HubSpot Marketing',
				'HubSpot Events',
				'Marketing Events',
			],
			resources: {
				primaryDocumentation: [
					{
						url: 'https://viminds.de',
					},
				],
			},
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'hubspotAppToken',
				required: true,
			},
		],
		properties: [
			{
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
			},
			// Event Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: { show: { resource: ['event'] } },
				options: [
					{ name: 'Get', value: 'get', description: 'Get a single event by ID' },
					{ name: 'Create or Update', value: 'create', description: 'Create a new event or update if External Event ID already exists' },
					{ name: 'Search', value: 'search', description: 'Search/list all events' },
					{ name: 'Update', value: 'update', description: 'Update a single event' },
					{ name: 'Delete', value: 'delete', description: 'Delete a single event' },
					{ name: 'Get Participants', value: 'getParticipants', description: 'Get all participants for an event' },
					{ name: 'Get Stats', value: 'getStats', description: 'Get participation statistics for an event' }
				],
				default: 'search',
				required: true
			},
			// Event ID Fields
			{
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
						operation: ['get', 'update', 'delete']
					}
				}
			},
			{
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
			},
			// Search Options
			{
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
			},
			{
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
			},
			// Event Name - Required Field
			{
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
			},
			// Event Organizer - Required Field
			{
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
			},
			// External Event ID - Required Field
			{
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
			},
			// Additional Create Fields
			{
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
			},
			// Custom Properties for Create
			{
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
			},
			{
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
			},
			// Custom Properties for Update
			{
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
			},
			{
				displayName: 'Update Fields',
				name: 'updateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				description: 'Fields to update for all events in input items',
				displayOptions: {
					show: {
						resource: ['event'],
						operation: ['updateMany']
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
			},
			// Custom Properties for UpdateMany
			{
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
						operation: ['updateMany']
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
			},
			// Contact Operations
			{
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
			},
			// Contact Event ID
			{
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
			},
			{
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
			},
			// Identifier Type
			{
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
			},
			// Contact Identifiers
			{
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
			},
			{
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
			},
			// Interaction DateTime Field
			{
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
			},
			// Get Participants Options
			{
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
			},
			{
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
			},
			// Get Participants Filters
			{
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
			}
		],
	};

	methods = {
		loadOptions: {
			async getProperties(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const { PropertyCache } = await import('../../transport/PropertyCache');

				const objectType = 'marketing_events';

				// Get credential ID for cache isolation
				const credentials = await this.getCredentials('hubspotAppToken');
				const credentialId = (credentials.appToken as string).slice(-8);

				const cache = PropertyCache.getInstance();
				const cached = cache.get(objectType, credentialId);
				if (cached) {
					return cached;
				}

				const response = await hubspotApiRequestForLoadOptions.call(
					this,
					'GET',
					`/crm/v3/properties/${objectType}`,
				);

				const options: INodePropertyOptions[] = [];
				if (response.results) {
					for (const property of response.results) {
						options.push({
							name: property.label || property.name,
							value: property.name,
						});
					}
				}

				cache.set(objectType, options, credentialId);
				return options;
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'event') {
					// Event operations
					if (operation === 'get') {
						const objectId = this.getNodeParameter('objectId', i) as string;
						const response = await hubspotApiRequest.call(
							this,
							'GET',
							`/marketing/v3/marketing-events/${objectId}`
						);
						returnData.push({ json: response });
					} else if (operation === 'create') {
						const eventName = this.getNodeParameter('eventName', i) as string;
						const eventOrganizer = this.getNodeParameter('eventOrganizer', i) as string;
						const externalEventId = this.getNodeParameter('externalEventId', i) as string;
						const createFields = this.getNodeParameter('createFields', i, {}) as any;
						const customProperties = this.getNodeParameter('customProperties', i, {}) as any;

						const body: any = {
							eventName,
							eventOrganizer,
							externalEventId,
							externalAccountId: createFields.externalAccountId || ''
						};

						if (createFields.startDateTime) body.startDateTime = createFields.startDateTime;
						if (createFields.endDateTime) body.endDateTime = createFields.endDateTime;
						if (createFields.eventUrl) body.eventUrl = createFields.eventUrl;
						if (createFields.eventDescription) body.eventDescription = createFields.eventDescription;
						if (createFields.eventType) body.eventType = createFields.eventType;
						if (createFields.eventCancelled !== undefined) body.eventCancelled = createFields.eventCancelled;

						if (customProperties.property && customProperties.property.length > 0) {
							body.customProperties = customProperties.property.map((prop: any) => ({
								name: prop.name,
								value: prop.value
							}));
						}

						const response = await hubspotApiRequest.call(
							this,
							'POST',
							'/marketing/v3/marketing-events/events/upsert',
							{ inputs: [body] }
						);

						if (response.results && response.results.length > 0) {
							returnData.push({ json: response.results[0] });
						} else {
							returnData.push({ json: response });
						}
					} else if (operation === 'search') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = this.getNodeParameter('limit', i, 50) as number;

						let results: any[];
						if (returnAll) {
							results = await hubspotApiRequestAllItems.call(
								this,
								'GET',
								'/marketing/v3/marketing-events',
								{}
							);
						} else {
							const response = await hubspotApiRequest.call(
								this,
								'GET',
								'/marketing/v3/marketing-events',
								{},
								{ limit }
							);
							results = response.results || [];
						}

						results.forEach((result) => returnData.push({ json: result }));
					} else if (operation === 'update') {
						const objectId = this.getNodeParameter('objectId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i, {}) as any;
						const customProperties = this.getNodeParameter('customProperties', i, {}) as any;

						const body: any = {};
						if (updateFields.eventName) body.eventName = updateFields.eventName;
						if (updateFields.eventOrganizer) body.eventOrganizer = updateFields.eventOrganizer;
						if (updateFields.startDateTime) body.startDateTime = updateFields.startDateTime;
						if (updateFields.endDateTime) body.endDateTime = updateFields.endDateTime;
						if (updateFields.eventUrl) body.eventUrl = updateFields.eventUrl;
						if (updateFields.eventDescription) body.eventDescription = updateFields.eventDescription;
						if (updateFields.eventType) body.eventType = updateFields.eventType;
						if (updateFields.eventCancelled !== undefined) body.eventCancelled = updateFields.eventCancelled;

						if (customProperties.property && customProperties.property.length > 0) {
							body.customProperties = customProperties.property.map((prop: any) => ({
								name: prop.name,
								value: prop.value
							}));
						}

						const response = await hubspotApiRequest.call(
							this,
							'PATCH',
							`/marketing/v3/marketing-events/${objectId}`,
							body
						);

						returnData.push({ json: response });
					} else if (operation === 'delete') {
						const objectId = this.getNodeParameter('objectId', i) as string;

						await hubspotApiRequest.call(
							this,
							'DELETE',
							`/marketing/v3/marketing-events/${objectId}`
						);

						returnData.push({ json: { success: true, id: objectId } });
					} else if (operation === 'getParticipants') {
						const objectId = this.getNodeParameter('objectId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = this.getNodeParameter('limit', i, 50) as number;
						const filters = this.getNodeParameter('filters', i, {}) as any;

						// Build query string for filters
						const qs: any = {};
						if (filters.state) qs.state = filters.state;
						if (filters.contactIdentifier) qs.contactIdentifier = filters.contactIdentifier;

						const endpoint = `/marketing/v3/marketing-events/participations/${objectId}/breakdown`;

						let results: any[];
						if (returnAll) {
							results = await hubspotApiRequestAllItems.call(
								this,
								'GET',
								endpoint,
								{},
								undefined
							);
						} else {
							qs.limit = limit;
							const response = await hubspotApiRequest.call(
								this,
								'GET',
								endpoint,
								{},
								qs
							);
							results = response.results || [];
						}

						results.forEach((result) => returnData.push({ json: result }));
					} else if (operation === 'getStats') {
						const objectId = this.getNodeParameter('objectId', i) as string;

						const response = await hubspotApiRequest.call(
							this,
							'GET',
							`/marketing/v3/marketing-events/participations/${objectId}`
						);

						returnData.push({ json: response });
					}
				} else if (resource === 'contact') {
					// Contact operations
					const objectId = this.getNodeParameter('objectId', i) as string;
					const identifierType = this.getNodeParameter('identifierType', i) as string;
					const interactionDateTimeField = this.getNodeParameter('interactionDateTimeField', i, '') as string;

					// Map operation to subscriber state
					let subscriberState: string;
					if (operation === 'register') {
						subscriberState = 'register';
					} else if (operation === 'attend') {
						subscriberState = 'attend';
					} else if (operation === 'cancel') {
						subscriberState = 'cancel';
					} else {
						throw new Error(`Unknown contact operation: ${operation}`);
					}

					let endpoint: string;
					const input: any = {};

					if (identifierType === 'contactId') {
						const contactId = this.getNodeParameter('contactId', i) as string;

						if (!contactId) {
							throw new Error('Contact ID is required');
						}

						input.vid = parseInt(String(contactId), 10);
						endpoint = `/marketing/v3/marketing-events/${objectId}/attendance/${subscriberState}/create`;
					} else {
						const email = this.getNodeParameter('email', i) as string;

						if (!email) {
							throw new Error('Email is required');
						}

						input.email = String(email);
						endpoint = `/marketing/v3/marketing-events/${objectId}/attendance/${subscriberState}/email-create`;
					}

					// Add interactionDateTime from field or use current time
					const itemData = items[i].json;
					if (interactionDateTimeField && itemData[interactionDateTimeField]) {
						input.interactionDateTime = itemData[interactionDateTimeField];
					} else {
						input.interactionDateTime = new Date().toISOString();
					}

					const body = { inputs: [input] };
					const response = await hubspotApiRequest.call(this, 'POST', endpoint, body);
					returnData.push({ json: response });
				}

			} catch (error: any) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
