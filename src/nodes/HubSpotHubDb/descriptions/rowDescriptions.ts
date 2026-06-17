import type { INodeProperties } from 'n8n-workflow';

export const rowOperationField: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['row'],
		},
	},
	options: [
		{
			name: 'Get All',
			value: 'getAll',
			description: 'Get all rows from a table (draft version)',
			action: 'Get all rows',
		},
		{
			name: 'Create',
			value: 'create',
			description: 'Create a new row in a table',
			action: 'Create a row',
		},
		{
			name: 'Update',
			value: 'update',
			description: 'Update an existing row',
			action: 'Update a row',
		},
		{
			name: 'Delete',
			value: 'delete',
			description: 'Delete a row from a table',
			action: 'Delete a row',
		},
		{
			name: 'Batch Create',
			value: 'batchCreate',
			description: 'Create multiple rows at once (max 100)',
			action: 'Batch create rows',
		},
		{
			name: 'Batch Update',
			value: 'batchUpdate',
			description: 'Update multiple rows at once (max 100)',
			action: 'Batch update rows',
		},
		{
			name: 'Batch Delete',
			value: 'batchDelete',
			description: 'Permanently delete multiple rows by ID (automatically batches in groups of 100)',
			action: 'Batch delete rows',
		},
	],
	default: 'getAll',
	required: true,
};

// Get All Rows
export const returnAllRowsField: INodeProperties = {
	displayName: 'Return All',
	name: 'returnAll',
	type: 'boolean',
	default: false,
	description: 'Whether to return all rows or limit the results',
	displayOptions: {
		show: {
			resource: ['row'],
			operation: ['getAll'],
		},
	},
};

export const limitRowsField: INodeProperties = {
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	default: 100,
	typeOptions: {
		minValue: 1,
		maxValue: 1000,
	},
	description: 'Maximum number of rows to return',
	displayOptions: {
		show: {
			resource: ['row'],
			operation: ['getAll'],
			returnAll: [false],
		},
	},
};

export const sortField: INodeProperties = {
	displayName: 'Sort',
	name: 'sort',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
	},
	default: {},
	placeholder: 'Add Sort',
	description: 'Sort results by one or more columns. Multiple sort criteria are applied in order.',
	displayOptions: {
		show: {
			resource: ['row'],
			operation: ['getAll'],
		},
	},
	options: [
		{
			name: 'sortOptions',
			displayName: 'Sort',
			values: [
				{
					displayName: 'Column Name',
					name: 'columnName',
					type: 'options',
					typeOptions: {
						loadOptionsMethod: 'loadTableColumns',
						loadOptionsDependsOn: ['tableId'],
					},
					default: '',
					required: true,
					description: 'The column to sort by. Choose from the list, or specify a column name using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
				},
				{
					displayName: 'Direction',
					name: 'direction',
					type: 'options',
					options: [
						{ name: 'Ascending', value: 'asc' },
						{ name: 'Descending', value: 'desc' },
					],
					default: 'asc',
					description: 'Sort direction. Descending prepends "-" to the column name in the query.',
				},
			],
		},
	],
};

export const propertiesField: INodeProperties = {
	displayName: 'Properties',
	name: 'properties',
	type: 'multiOptions',
	typeOptions: {
		loadOptionsMethod: 'loadTableColumns',
		loadOptionsDependsOn: ['tableId'],
	},
	default: [],
	description: 'Columns to include in the results. Choose from the list, or specify column names using an <a href="https://docs.n8n.io/code/expressions/">expression</a>. Leave empty to return all columns.',
	displayOptions: {
		show: {
			resource: ['row'],
			operation: ['getAll'],
		},
	},
};

export const rowFiltersField: INodeProperties = {
	displayName: 'Filters',
	name: 'rowFilters',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
	},
	default: {},
	placeholder: 'Add Filter',
	description: 'Filter rows by column values. Multiple filters are combined with AND logic.',
	displayOptions: {
		show: {
			resource: ['row'],
			operation: ['getAll'],
		},
	},
	options: [
		{
			name: 'filters',
			displayName: 'Filter',
			values: [
				{
					displayName: 'Column Name',
					name: 'columnName',
					type: 'options',
					typeOptions: {
						loadOptionsMethod: 'loadTableColumns',
						loadOptionsDependsOn: ['tableId'],
					},
					default: '',
					required: true,
					description: 'The column to filter by. Choose from the list, or specify a column name using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
				},
				{
					displayName: 'Operator',
					name: 'operator',
					type: 'options',
					options: [
						{ name: 'Equal', value: 'eq' },
						{ name: 'Not Equal', value: 'neq' },
						{ name: 'Less Than', value: 'lt' },
						{ name: 'Less Than or Equal', value: 'lte' },
						{ name: 'Greater Than', value: 'gt' },
						{ name: 'Greater Than or Equal', value: 'gte' },
						{ name: 'Contains', value: 'contains' },
						{ name: 'Contains (case-insensitive)', value: 'icontains' },
						{ name: 'Starts With', value: 'startswith' },
						{ name: 'In (semicolon-separated)', value: 'in' },
						{ name: 'Not In (semicolon-separated)', value: 'nin' },
					],
					default: 'eq',
					description: 'The comparison operator. <a href="https://developers.hubspot.com/docs/reference/cms/hubdb" target="_blank">See HubDB filter docs</a>.',
				},
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
					placeholder: '5',
					description: 'The value to compare against. For "In" / "Not In" operators use semicolon-separated values (e.g., value1;value2).',
				},
			],
		},
	],
};

// Create/Update Row
export const rowIdField: INodeProperties = {
	displayName: 'Row ID',
	name: 'rowId',
	type: 'string',
	default: '',
	required: true,
	placeholder: '123456789',
	description: 'The ID of the row to update or delete',
	displayOptions: {
		show: {
			resource: ['row'],
			operation: ['update', 'delete'],
		},
	},
};

export const columnValuesField: INodeProperties = {
	displayName: 'Column Values',
	name: 'columnValues',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
	},
	default: {},
	placeholder: 'Add Column Value',
	description: 'Column values for the row',
	displayOptions: {
		show: {
			resource: ['row'],
			operation: ['create', 'update'],
		},
	},
	options: [
		{
			name: 'values',
			displayName: 'Value',
			values: [
				{
					displayName: 'Column Name',
					name: 'columnName',
					type: 'options',
					typeOptions: {
						loadOptionsMethod: 'loadTableColumns',
						loadOptionsDependsOn: ['tableId'],
					},
					default: '',
					required: true,
					description: 'The column to set a value for. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
				},
				{
					displayName: 'Column Value',
					name: 'columnValue',
					type: 'string',
					default: '',
					placeholder: 'john@example.com',
					description: 'The value to set for this column',
				},
			],
		},
	],
};

// Batch Operations
export const batchModeField: INodeProperties = {
	displayName: 'Batch Mode',
	name: 'batchMode',
	type: 'options',
	options: [
		{
			name: 'Define in Node',
			value: 'defineInNode',
			description: 'Define rows directly in the node configuration',
		},
		{
			name: 'Map from Input',
			value: 'mapFromInput',
			description: 'Map input items to rows using column mappings',
		},
	],
	default: 'mapFromInput',
	description: 'How to provide the rows for batch operations',
	displayOptions: {
		show: {
			resource: ['row'],
			operation: ['batchCreate', 'batchUpdate'],
		},
	},
};

export const batchRowsField: INodeProperties = {
	displayName: 'Rows',
	name: 'rows',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
	},
	default: {},
	placeholder: 'Add Row',
	description: 'Rows to create or update (max 100)',
	displayOptions: {
		show: {
			resource: ['row'],
			operation: ['batchCreate', 'batchUpdate'],
			batchMode: ['defineInNode'],
		},
	},
	options: [
		{
			name: 'rowValues',
			displayName: 'Row',
			values: [
				{
					displayName: 'Row ID',
					name: 'id',
					type: 'string',
					default: '',
					placeholder: '123456789',
					description: 'Row ID (required for batch update)',
				},
				{
					displayName: 'Column Values',
					name: 'values',
					type: 'fixedCollection',
					typeOptions: {
						multipleValues: true,
					},
					default: {},
					placeholder: 'Add Column Value',
					options: [
						{
							name: 'columnValues',
							displayName: 'Column',
							values: [
								{
									displayName: 'Column Name',
									name: 'columnName',
									type: 'options',
									typeOptions: {
										loadOptionsMethod: 'loadTableColumns',
										loadOptionsDependsOn: ['tableId'],
									},
									default: '',
									required: true,
									description: 'The column to set a value for. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
								},
								{
									displayName: 'Column Value',
									name: 'columnValue',
									type: 'string',
									default: '',
									placeholder: 'john@example.com',
									description: 'The value to set for this column',
								},
							],
						},
					],
				},
			],
		},
	],
};

export const idFieldField: INodeProperties = {
	displayName: 'ID Field',
	name: 'idField',
	type: 'string',
	requiresDataPath: 'single',
	default: 'id',
	placeholder: 'id',
	hint: 'Field name only (e.g., \'id\' or \'properties.id\')',
	description: 'Field name containing the row ID. Supports dot notation (e.g., \'properties.id\').',

	displayOptions: {
		show: {
			resource: ['row'],
			operation: ['batchUpdate'],
			batchMode: ['mapFromInput'],
		},
	},
};

export const columnMappingsField: INodeProperties = {
	displayName: 'Column Mappings',
	name: 'columnMappings',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
	},
	default: {},
	placeholder: 'Add Column Mapping',
	description: 'Map input item fields to HubDB table columns',
	displayOptions: {
		show: {
			resource: ['row'],
			operation: ['batchCreate', 'batchUpdate'],
			batchMode: ['mapFromInput'],
		},
	},
	options: [
		{
			name: 'mappings',
			displayName: 'Mapping',
			values: [
				{
					displayName: 'Source Field',
					name: 'source',
					type: 'string',
					requiresDataPath: 'single',
					default: '',
					required: true,
					placeholder: 'email',
					hint: 'Field name only (e.g., \'email\' or \'properties.name\')',
					description: 'Field name from input items. Supports dot notation (e.g., \'properties.name\').',
				},
				{
					displayName: 'Target Column',
					name: 'target',
					type: 'options',
					typeOptions: {
						loadOptionsMethod: 'loadTableColumns',
						loadOptionsDependsOn: ['tableId'],
					},
					default: '',
					required: true,
					description: 'The column in the HubDB table. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
				},
			],
		},
	],
};

export const batchDeleteModeField: INodeProperties = {
	displayName: 'Batch Mode',
	name: 'batchDeleteMode',
	type: 'options',
	options: [
		{
			name: 'Map from Input',
			value: 'mapFromInput',
			description: 'Collect row IDs from all incoming items using a field name',
		},
		{
			name: 'Define in Node',
			value: 'defineInNode',
			description: 'Enter row IDs directly as a comma-separated list',
		},
	],
	default: 'mapFromInput',
	displayOptions: {
		show: {
			resource: ['row'],
			operation: ['batchDelete'],
		},
	},
};

export const batchDeleteIdFieldField: INodeProperties = {
	displayName: 'ID Field',
	name: 'deleteIdField',
	type: 'string',
	requiresDataPath: 'single',
	default: 'id',
	required: true,
	placeholder: 'id',
	hint: 'Field name only (e.g., \'id\' or \'properties.id\')',
	description: 'Field name containing the row ID. Supports dot notation (e.g., \'properties.id\').',
	displayOptions: {
		show: {
			resource: ['row'],
			operation: ['batchDelete'],
			batchDeleteMode: ['mapFromInput'],
		},
	},
};

export const batchDeleteRowIdsField: INodeProperties = {
	displayName: 'Row IDs',
	name: 'rowIds',
	type: 'string',
	default: '',
	required: true,
	placeholder: '123,456,789',
	description: 'Comma-separated list of row IDs to delete. Use an expression to pass an array.',
	displayOptions: {
		show: {
			resource: ['row'],
			operation: ['batchDelete'],
			batchDeleteMode: ['defineInNode'],
		},
	},
};

export const rowFields: INodeProperties[] = [
	rowOperationField,
	returnAllRowsField,
	limitRowsField,
	sortField,
	propertiesField,
	rowFiltersField,
	rowIdField,
	columnValuesField,
	batchModeField,
	batchRowsField,
	idFieldField,
	columnMappingsField,
	batchDeleteModeField,
	batchDeleteIdFieldField,
	batchDeleteRowIdsField,
];
