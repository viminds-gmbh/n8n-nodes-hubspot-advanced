import type { INodeProperties } from 'n8n-workflow';
import { HUBSPOT_OBJECT_TYPE_OPTIONS } from '../../../types';

export const operationField: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'Get Forms',
			value: 'getForms',
			description: 'Get all forms',
		},
		{
			name: 'Get Submissions',
			value: 'getSubmissions',
			description: 'Get form submissions (v1 API)',
		},
		{
			name: 'Submit Form',
			value: 'submitForm',
			description: 'Submit a form (v3 legacy)',
		},
	],
	default: 'getForms',
	required: true,
};

export const formGuidField: INodeProperties = {
	displayName: 'Form',
	name: 'formGuid',
	type: 'options',
	typeOptions: {
		loadOptionsMethod: 'getForms',
	},
	default: '',
	required: true,
	description: 'Select the form to work with. Forms are loaded from your HubSpot account.',
	displayOptions: {
		show: {
			operation: ['getSubmissions', 'submitForm'],
		},
	},
};

export const submitEndpointField: INodeProperties = {
	displayName: 'Submit Endpoint',
	name: 'submitEndpoint',
	type: 'options',
	options: [
		{
			name: 'Secure',
			value: 'secure',
			description: 'Use secure endpoint with better spam protection (recommended)',
		},
		{
			name: 'Unsecure',
			value: 'unsecure',
			description: 'Use unsecure endpoint (legacy)',
		},
	],
	default: 'secure',
	description: 'The endpoint type to use for form submission. <a href="https://legacydocs.hubspot.com/docs/methods/forms/submit_form" target="_blank">Learn more</a>.',
	displayOptions: {
		show: {
			operation: ['submitForm'],
		},
	},
};

export const emailField: INodeProperties = {
	displayName: 'Email',
	name: 'email',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'john@example.com',
	description: 'The email address to submit with the form. This field is required for contact creation.',
	displayOptions: {
		show: {
			operation: ['submitForm'],
		},
	},
};

export const additionalFieldsField: INodeProperties = {
	displayName: 'Additional Fields',
	name: 'additionalFields',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
	},
	default: {},
	description: 'Additional fields to submit with the form. These can be properties from any HubSpot object type.',
	displayOptions: {
		show: {
			operation: ['submitForm'],
		},
	},
	options: [
		{
			name: 'field',
			displayName: 'Field',
			values: [
				{
					displayName: 'Object Type',
					name: 'objectType',
					type: 'options',
					options: [...HUBSPOT_OBJECT_TYPE_OPTIONS],
					default: 'contacts',
					required: true,
					description: 'The type of HubSpot object this property belongs to.',
				},
				{
					displayName: 'Custom Object Type',
					name: 'customObjectType',
					type: 'string',
					default: '',
					required: true,
					placeholder: 'cars',
					description: 'The name or ID of the custom object type (e.g., "cars" or "2-12345").',
					displayOptions: {
						show: {
							objectType: ['custom'],
						},
					},
				},
				{
					displayName: 'Property Name',
					name: 'propertyName',
					type: 'string',
					default: '',
					required: true,
					placeholder: 'firstname',
					description: 'The internal name of the property to submit (e.g., firstname, lastname, company, phone). <a href="https://knowledge.hubspot.com/contacts/hubspots-default-contact-properties" target="_blank">See default properties</a>.',
				},
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
					required: true,
					placeholder: 'John',
					description: 'The value to submit for this property.',
				},
			],
		},
	],
};

export const contextField: INodeProperties = {
	displayName: 'Context',
	name: 'context',
	type: 'fixedCollection',
	default: {},
	description: 'Optional context information about where and how the form was submitted. Used for analytics and tracking.',
	displayOptions: {
		show: {
			operation: ['submitForm'],
		},
	},
	options: [
		{
			name: 'contextFields',
			displayName: 'Context Fields',
			values: [
				{
					displayName: 'Page URI',
					name: 'pageUri',
					type: 'string',
					default: '',
					placeholder: 'https://example.com/contact',
					description: 'The URI of the page where the form was submitted. Used for analytics and tracking.',
				},
				{
					displayName: 'Page Name',
					name: 'pageName',
					type: 'string',
					default: '',
					placeholder: 'Contact Page',
					description: 'The name of the page where the form was submitted. Used for analytics and tracking.',
				},
				{
					displayName: 'HubSpot User Token (HUTK)',
					name: 'hutk',
					type: 'string',
					default: '',
					placeholder: 'abc123def456',
					description: 'HubSpot user tracking token from the hubspotutk cookie. Used to associate the submission with a visitor. <a href="https://developers.hubspot.com/docs/api/tracking-code" target="_blank">Learn more</a>.',
				},
				{
					displayName: 'IP Address',
					name: 'ipAddress',
					type: 'string',
					default: '',
					placeholder: '192.168.1.1',
					description: 'The IP address of the form submitter. Used for geolocation and analytics.',
				},
			],
		},
	],
};

export const includeConsentField: INodeProperties = {
	displayName: 'Include Consent & Subscriptions',
	name: 'includeConsent',
	type: 'boolean',
	default: false,
	description: 'Whether to include GDPR consent and email subscription preferences with the form submission.',
	displayOptions: {
		show: {
			operation: ['submitForm'],
		},
	},
};

export const consentTextField: INodeProperties = {
	displayName: 'Consent Text',
	name: 'consentText',
	type: 'string',
	default: 'I agree to allow Example Company to store and process my personal data.',
	placeholder: 'I agree to the privacy policy',
	description: 'The consent text shown to the user. Required for GDPR compliance.',
	displayOptions: {
		show: {
			operation: ['submitForm'],
			includeConsent: [true],
		},
	},
};

export const consentToProcessField: INodeProperties = {
	displayName: 'Consent to Process',
	name: 'consentToProcess',
	type: 'boolean',
	default: true,
	description: 'Whether the user consented to data processing. Required for GDPR compliance.',
	displayOptions: {
		show: {
			operation: ['submitForm'],
			includeConsent: [true],
		},
	},
};

export const communicationsField: INodeProperties = {
	displayName: 'Communications',
	name: 'communications',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
	},
	default: {},
	description: 'Email subscription preferences for different communication types.',
	displayOptions: {
		show: {
			operation: ['submitForm'],
			includeConsent: [true],
		},
	},
	options: [
		{
			name: 'communication',
			displayName: 'Communication',
			values: [
				{
					displayName: 'Subscription Type',
					name: 'subscriptionTypeId',
					type: 'options',
					typeOptions: {
						loadOptionsMethod: 'getSubscriptionTypes',
					},
					default: '',
					required: true,
					description: 'The type of communication subscription (e.g., marketing emails, newsletters). <a href="https://developers.hubspot.com/docs/api/marketing/subscriptions" target="_blank">Learn more</a>.',
				},
				{
					displayName: 'Value',
					name: 'value',
					type: 'boolean',
					default: true,
					description: 'Whether the user opted in (true) or out (false) of this communication type.',
				},
				{
					displayName: 'Text',
					name: 'text',
					type: 'string',
					default: '',
					required: true,
					placeholder: 'I want to receive product updates',
					description: 'The subscription consent text shown to the user.',
				},
			],
		},
	],
};

export const returnAllField: INodeProperties = {
	displayName: 'Return All',
	name: 'returnAll',
	type: 'boolean',
	default: false,
	description: 'Whether to automatically paginate and return all form submissions. May take longer for forms with many submissions.',
	displayOptions: {
		show: {
			operation: ['getSubmissions'],
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
	description: 'Maximum number of form submissions to return. Use with "Return All" disabled for pagination.',
	displayOptions: {
		show: {
			operation: ['getSubmissions'],
			returnAll: [false],
		},
	},
};


export const formFields: INodeProperties[] = [
	operationField,
	formGuidField,
	submitEndpointField,
	emailField,
	additionalFieldsField,
	contextField,
	includeConsentField,
	consentTextField,
	consentToProcessField,
	communicationsField,
	returnAllField,
	limitField,
];
