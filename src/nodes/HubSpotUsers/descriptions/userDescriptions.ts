import type { INodeProperties } from 'n8n-workflow';

export const resourceField: INodeProperties = {
	displayName: 'Resource',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{ name: 'User', value: 'user', description: 'HubSpot Users API — manage user properties, working hours, timezone' },
		{ name: 'Owner', value: 'owner', description: 'HubSpot Owners API — retrieve owner IDs and team info' },
	],
	default: 'user',
	required: true,
};

export const operationField: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	options: [
		{ name: 'Get', value: 'get', description: 'Retrieve a single record by ID' },
		{ name: 'Get Many', value: 'getMany', description: 'Retrieve multiple records' },
		{ name: 'Search', value: 'search', description: 'Search for users using filters' },
		{ name: 'Update', value: 'update', description: 'Update a user\'s properties' },
		{ name: 'Batch Update', value: 'batchUpdate', description: 'Update multiple users in a single batch request' },
	],
	default: 'get',
	required: true,
	displayOptions: {
		show: {
			resource: ['user'],
		},
	},
};

export const ownerOperationField: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	options: [
		{ name: 'Get', value: 'get', description: 'Retrieve a single owner by ID or userId' },
		{ name: 'Get Many', value: 'getMany', description: 'Retrieve all owners, optionally filtered by email' },
	],
	default: 'get',
	required: true,
	displayOptions: {
		show: {
			resource: ['owner'],
		},
	},
};

// ──────────────────────────────────────────────
//  USER-specific fields
// ──────────────────────────────────────────────

export const idNoticeField: INodeProperties = {
	displayName: `&#x26A0;&#xFE0F; <strong>Important:</strong> In the Users API, <code>id</code> and <code>hs_object_id</code> are the same — they identify a user <strong>only within this HubSpot account</strong>. This differs from:<br>
&bull; <code>hs_internal_user_id</code> (user provisioning API) — identifies a user across all accounts<br>
&bull; <code>hubspot_owner_id</code> (owners API) — identifies a user as an owner of records<br><br>
Learn more: <a href="https://developers.hubspot.com/docs/api-reference/legacy/account/settings/user-provisioning/guide" target="_blank">User Provisioning API</a> | <a href="https://developers.hubspot.com/docs/api-reference/legacy/crm/owners/guide" target="_blank">Owners API</a>`,
	name: 'idNotice',
	type: 'notice',
	default: '',
	displayOptions: {
		show: {
			resource: ['user'],
		},
	},
};

export const userIdField: INodeProperties = {
	displayName: 'User ID',
	name: 'userId',
	type: 'string',
	default: '',
	required: true,
	placeholder: '207838823235',
	description: 'The unique ID of the user to retrieve or update. In the Users API, <code>id</code> and <code>hs_object_id</code> are the same.',
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['get', 'update'],
		},
	},
};

export const userIdFieldField: INodeProperties = {
	displayName: 'ID Field',
	name: 'idField',
	type: 'string',
	requiresDataPath: 'single',
	default: 'id',
	placeholder: 'id',
	hint: 'Field name only (e.g., \'id\' or \'json.id\')',
	description: 'Field name containing the user ID. Supports dot notation.',
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['getMany', 'batchUpdate'],
		},
	},
};

export const userIdPropertyField: INodeProperties = {
	displayName: 'ID Property',
	name: 'idProperty',
	type: 'options',
	options: [
		{ name: 'hs_object_id (default)', value: 'hs_object_id' },
	],
	default: 'hs_object_id',
	description: 'The property used to identify users. Only hs_object_id is supported for users.',
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['get', 'getMany', 'update', 'batchUpdate'],
		},
	},
};

export const userPropertiesField: INodeProperties = {
	displayName: 'Properties',
	name: 'properties',
	type: 'multiOptions',
	typeOptions: {
		loadOptionsMethod: 'getUserProperties',
	},
	default: [],
	placeholder: 'hs_job_title,hs_standard_time_zone',
	description: 'Properties to return in the response. Leave empty to return all properties.',
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['get', 'getMany', 'search'],
		},
	},
};

export const userFiltersField: INodeProperties = {
	displayName: 'Filters',
	name: 'filters',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
	},
	default: {},
	placeholder: 'Add Filter',
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['search'],
		},
	},
	options: [
		{
			name: 'filterGroups',
			displayName: 'Filter Group',
			values: [
				{
					displayName: 'Property Name',
					name: 'propertyName',
					type: 'options',
					typeOptions: {
						loadOptionsMethod: 'getUserProperties',
					},
					default: 'hs_object_id',
					required: true,
					description: 'The property to filter by.',
				},
				{
					displayName: 'Operator',
					name: 'operator',
					type: 'options',
					options: [
						{ name: 'Equal', value: 'EQ' },
						{ name: 'Not Equal', value: 'NEQ' },
						{ name: 'Less Than', value: 'LT' },
						{ name: 'Less Than or Equal', value: 'LTE' },
						{ name: 'Greater Than', value: 'GT' },
						{ name: 'Greater Than or Equal', value: 'GTE' },
						{ name: 'Between', value: 'BETWEEN' },
						{ name: 'In', value: 'IN' },
						{ name: 'Not In', value: 'NOT_IN' },
						{ name: 'Contains Token', value: 'CONTAINS_TOKEN' },
						{ name: 'Not Contains Token', value: 'NOT_CONTAINS_TOKEN' },
						{ name: 'Has Property', value: 'HAS_PROPERTY' },
						{ name: 'Not Has Property', value: 'NOT_HAS_PROPERTY' },
					],
					default: 'EQ',
					description: 'The comparison operator.',
				},
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
					displayOptions: {
						hide: {
							operator: ['IN', 'NOT_IN', 'HAS_PROPERTY', 'NOT_HAS_PROPERTY'],
						},
					},
					placeholder: '207838823235',
					description: 'The value to compare against.',
				},
				{
					displayName: 'Values',
					name: 'values',
					type: 'string',
					default: '',
					displayOptions: {
						show: {
							operator: ['IN', 'NOT_IN'],
						},
					},
					placeholder: 'value1;value2;value3',
					description: 'Semicolon-separated values or an array expression.',
				},
				{
					displayName: 'High Value',
					name: 'highValue',
					type: 'string',
					default: '',
					displayOptions: {
						show: {
							operator: ['BETWEEN'],
						},
					},
					placeholder: '1000',
					description: 'The upper bound for the BETWEEN operator.',
				},
			],
		},
	],
};

export const userSortField: INodeProperties = {
	displayName: 'Sort',
	name: 'sort',
	type: 'fixedCollection',
	default: {},
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['search'],
		},
	},
	options: [
		{
			name: 'sortOptions',
			displayName: 'Sort',
			values: [
				{
					displayName: 'Property Name',
					name: 'propertyName',
					type: 'options',
					typeOptions: {
						loadOptionsMethod: 'getUserProperties',
					},
					default: 'hs_createdate',
					description: 'The property to sort by.',
				},
				{
					displayName: 'Direction',
					name: 'direction',
					type: 'options',
					options: [
						{ name: 'Ascending', value: 'ASCENDING' },
						{ name: 'Descending', value: 'DESCENDING' },
					],
					default: 'DESCENDING',
					description: 'The sort order.',
				},
			],
		},
	],
};

export const userLimitField: INodeProperties = {
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	default: 100,
	typeOptions: {
		minValue: 1,
		maxValue: 10000,
	},
	description: 'Maximum number of results to return.',
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['search'],
			returnAll: [false],
		},
	},
};

export const userReturnAllField: INodeProperties = {
	displayName: 'Return All',
	name: 'returnAll',
	type: 'boolean',
	default: false,
	description: 'Whether to automatically paginate and return all matching results.',
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['search'],
		},
	},
};

export const userPropertiesToSetField: INodeProperties = {
	displayName: 'Properties to Set',
	name: 'propertiesToSet',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
	},
	default: {},
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['update'],
		},
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
						loadOptionsMethod: 'getUserProperties',
					},
					default: '',
					required: true,
					description: 'The property to set.',
				},
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
					placeholder: 'CEO',
					description: 'The value to set for this property.',
				},
			],
		},
	],
};

export const userPropertyMappingsField: INodeProperties = {
	displayName: 'Property Mappings',
	name: 'propertyMappings',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
	},
	default: {},
	placeholder: 'Add Property Mapping',
	description: 'Map fields from input items to HubSpot user properties.',
	displayOptions: {
		show: {
			resource: ['user'],
			operation: ['batchUpdate'],
		},
	},
	options: [
		{
			name: 'mapping',
			displayName: 'Mapping',
			values: [
				{
					displayName: 'HubSpot Property',
					name: 'property',
					type: 'options',
					typeOptions: {
						loadOptionsMethod: 'getUserProperties',
					},
					default: '',
					required: true,
					description: 'The HubSpot user property to set.',
				},
				{
					displayName: 'Input Field Name',
					name: 'fieldName',
					type: 'string',
					requiresDataPath: 'single',
					default: '',
					required: true,
					placeholder: 'email',
					hint: 'Field name only (e.g., \'json.jobTitle\')',
					description: 'Field name from input items. Supports dot notation.',
				},
			],
		},
	],
};

// ──────────────────────────────────────────────
//  OWNER-specific fields
// ──────────────────────────────────────────────

export const ownerNoticeField: INodeProperties = {
	displayName: `&#x2139;&#xFE0F; The <strong>Owners API</strong> returns owner records (who owns CRM objects). The <code>id</code> is the owner record ID, and <code>userId</code> maps to the HubSpot user. This is different from the Users API where <code>id</code> = <code>hs_object_id</code>.<br><br>
Learn more: <a href="https://developers.hubspot.com/docs/api-reference/legacy/crm/owners/guide" target="_blank">Owners API Guide</a>`,
	name: 'ownerNotice',
	type: 'notice',
	default: '',
	displayOptions: {
		show: {
			resource: ['owner'],
		},
	},
};

export const ownerIdField: INodeProperties = {
	displayName: 'Owner ID',
	name: 'ownerId',
	type: 'string',
	default: '',
	required: true,
	placeholder: '6166860',
	description: 'The owner ID to retrieve. Use the <code>id</code> (owner record ID) or <code>userId</code> (HubSpot user ID) depending on the ID Property setting.',
	displayOptions: {
		show: {
			resource: ['owner'],
			operation: ['get'],
		},
	},
};

export const ownerIdPropertyField: INodeProperties = {
	displayName: 'ID Property',
	name: 'idProperty',
	type: 'options',
	options: [
		{ name: 'Owner ID (id)', value: 'id' },
		{ name: 'User ID (userId)', value: 'userId' },
	],
	default: 'id',
	description: 'How to interpret the Owner ID value. Use <code>id</code> for the owner record ID or <code>userId</code> for the HubSpot user ID.',
	displayOptions: {
		show: {
			resource: ['owner'],
			operation: ['get'],
		},
	},
};

export const ownerEmailField: INodeProperties = {
	displayName: 'Email',
	name: 'email',
	type: 'string',
	default: '',
	required: false,
	placeholder: 'jsmith@example.com',
	description: 'Filter owners by email address. Leave empty to return all owners.',
	displayOptions: {
		show: {
			resource: ['owner'],
			operation: ['getMany'],
		},
	},
};

export const ownerLimitField: INodeProperties = {
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	default: 100,
	typeOptions: {
		minValue: 1,
		maxValue: 10000,
	},
	description: 'Maximum number of owners to return.',
	displayOptions: {
		show: {
			resource: ['owner'],
			operation: ['getMany'],
			returnAll: [false],
		},
	},
};

export const ownerReturnAllField: INodeProperties = {
	displayName: 'Return All',
	name: 'returnAll',
	type: 'boolean',
	default: false,
	description: 'Whether to automatically paginate and return all matching owners.',
	displayOptions: {
		show: {
			resource: ['owner'],
			operation: ['getMany'],
		},
	},
};

// ──────────────────────────────────────────────
//  AGGREGATED FIELDS
// ──────────────────────────────────────────────

export const userFields: INodeProperties[] = [
	resourceField,
	operationField,
	ownerOperationField,
	idNoticeField,
	userIdField,
	userIdFieldField,
	userIdPropertyField,
	userPropertiesField,
	userFiltersField,
	userSortField,
	userLimitField,
	userReturnAllField,
	userPropertiesToSetField,
	userPropertyMappingsField,
	ownerNoticeField,
	ownerIdField,
	ownerIdPropertyField,
	ownerEmailField,
	ownerLimitField,
	ownerReturnAllField,
];