import type { INodeProperties } from 'n8n-workflow';

export const tableOperationField: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['table'],
		},
	},
	options: [
		{
			name: 'Get',
			value: 'get',
			description: 'Get a single table by ID or name',
			action: 'Get a table',
		},
		{
			name: 'Get All',
			value: 'getAll',
			description: 'Get all draft tables (includes unpublished and cloned tables)',
			action: 'Get all tables',
		},
		{
			name: 'Create',
			value: 'create',
			description: 'Create a new draft table',
			action: 'Create a table',
		},
		{
			name: 'Update',
			value: 'update',
			description: 'Update table metadata and columns (replaces full table schema)',
			action: 'Update a table',
		},
		{
			name: 'Publish',
			value: 'publish',
			description: 'Publish a draft table to make it live',
			action: 'Publish a table',
		},
		{
			name: 'Unpublish',
			value: 'unpublish',
			description: 'Unpublish a table (makes it unavailable on live pages)',
			action: 'Unpublish a table',
		},
		{
			name: 'Delete',
			value: 'delete',
			description: 'Permanent deletion is only possible via the HubSpot UI. This operation returns information about the limitation.',
			action: 'Delete a table',
		},
		{
			name: 'Clone',
			value: 'clone',
			description: 'Clone an existing table',
			action: 'Clone a table',
		},
	],
	default: 'getAll',
	required: true,
};

// Get All Tables
export const returnAllField: INodeProperties = {
	displayName: 'Return All',
	name: 'returnAll',
	type: 'boolean',
	default: false,
	description: 'Whether to return all tables or limit the results',
	displayOptions: {
		show: {
			resource: ['table'],
			operation: ['getAll'],
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
		maxValue: 1000,
	},
	description: 'Maximum number of tables to return',
	displayOptions: {
		show: {
			resource: ['table'],
			operation: ['getAll'],
			returnAll: [false],
		},
	},
};

// Create Table
export const tableNameField: INodeProperties = {
	displayName: 'Table Name',
	name: 'tableName',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'my_table',
	description: 'Internal name for the table. Must be lowercase, use underscores, and be unique. Cannot be changed after creation.',
	displayOptions: {
		show: {
			resource: ['table'],
			operation: ['create'],
		},
	},
};

export const tableLabelField: INodeProperties = {
	displayName: 'Table Label',
	name: 'tableLabel',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'My Table',
	description: 'Display label for the table. Must be unique.',
	displayOptions: {
		show: {
			resource: ['table'],
			operation: ['create'],
		},
	},
};

export const allowPublicApiAccessField: INodeProperties = {
	displayName: 'Allow Public API Access',
	name: 'allowPublicApiAccess',
	type: 'boolean',
	default: false,
	description: 'Whether to allow unauthenticated access to the published table data',
	displayOptions: {
		show: {
			resource: ['table'],
			operation: ['create'],
		},
	},
};

export const useForPagesField: INodeProperties = {
	displayName: 'Use for Pages',
	name: 'useForPages',
	type: 'boolean',
	default: false,
	description: 'Whether to enable this table for dynamic pages. <a href="https://developers.hubspot.com/docs/cms/start-building/features/data-driven-content/hubdb" target="_blank">Learn more</a>.',
	displayOptions: {
		show: {
			resource: ['table'],
			operation: ['create'],
		},
	},
};

export const columnsField: INodeProperties = {
	displayName: 'Columns',
	name: 'columns',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
	},
	default: {},
	placeholder: 'Add Column',
	description: 'Column definitions for the table. At least one column is required.',
	displayOptions: {
		show: {
			resource: ['table'],
			operation: ['create'],
		},
	},
	options: [
		{
			name: 'columnValues',
			displayName: 'Column',
			values: [
				{
					displayName: 'Column Name',
					name: 'name',
					type: 'string',
					default: '',
					required: true,
					placeholder: 'email',
					description: 'Internal name for the column (lowercase, underscores)',
				},
				{
					displayName: 'Column Label',
					name: 'label',
					type: 'string',
					default: '',
					required: true,
					placeholder: 'Email Address',
					description: 'Display label for the column',
				},
				{
					displayName: 'Column Type',
					name: 'type',
					type: 'options',
					options: [
						{ name: 'Text', value: 'TEXT' },
						{ name: 'Number', value: 'NUMBER' },
						{ name: 'Date', value: 'DATE' },
						{ name: 'Date Time', value: 'DATETIME' },
						{ name: 'URL', value: 'URL' },
						{ name: 'Image', value: 'IMAGE' },
						{ name: 'File', value: 'FILE' },
						{ name: 'Video', value: 'VIDEO' },
						{ name: 'Boolean', value: 'BOOLEAN' },
						{ name: 'Select', value: 'SELECT' },
						{ name: 'Multi-Select', value: 'MULTISELECT' },
						{ name: 'Rich Text', value: 'RICHTEXT' },
						{ name: 'Location', value: 'LOCATION' },
						{ name: 'CTA', value: 'CTA' },
					],
					default: 'TEXT',
					description: 'Data type for the column',
				},
				{
					displayName: 'Options',
					name: 'options',
					type: 'fixedCollection',
					typeOptions: {
						multipleValues: true,
					},
					default: {},
					placeholder: 'Add Option',
					description: 'Options for SELECT or MULTISELECT columns',
					displayOptions: {
						show: {
							type: ['SELECT', 'MULTISELECT'],
						},
					},
					options: [
						{
							name: 'optionValues',
							displayName: 'Option',
							values: [
								{
									displayName: 'Option ID',
									name: 'id',
									type: 'string',
									default: '',
									required: true,
									placeholder: 'option_1',
									description: 'Internal ID for the option',
								},
								{
									displayName: 'Option Label',
									name: 'label',
									type: 'string',
									default: '',
									required: true,
									placeholder: 'Option 1',
									description: 'Display label for the option',
								},
							],
						},
					],
				},
			],
		},
	],
};

// Get Table
export const tableIdForGetField: INodeProperties = {
	displayName: 'Table',
	name: 'tableId',
	type: 'options',
	typeOptions: {
		loadOptionsMethod: 'loadTables',
	},
	default: '',
	required: true,
	placeholder: '12345678',
	description: 'The table to retrieve. You can also use an expression to provide a table ID or name.',
	displayOptions: {
		show: {
			resource: ['table'],
			operation: ['get'],
		},
	},
};

// Update Table
export const tableIdForUpdateField: INodeProperties = {
	displayName: 'Table',
	name: 'tableId',
	type: 'options',
	typeOptions: {
		loadOptionsMethod: 'loadTables',
	},
	default: '',
	required: true,
	placeholder: '12345678',
	description: 'The table to update. You can also use an expression to provide a table ID or name.',
	displayOptions: {
		show: {
			resource: ['table'],
			operation: ['update', 'publish', 'unpublish', 'delete'],
		},
	},
};

export const updateTableWarningField: INodeProperties = {
	displayName: 'WARNING: This operation replaces the entire table schema',
	name: 'updateTableWarning',
	type: 'notice',
	default: '',
	description: 'All columns not included in the columns list below will be <strong>permanently deleted</strong> from the table. Make sure to include every column you want to keep.',
	typeOptions: {
		theme: 'warning',
	},
	displayOptions: {
		show: {
			resource: ['table'],
			operation: ['update'],
		},
	},
};

export const updateTableNameField: INodeProperties = {
	displayName: 'Table Name',
	name: 'updateTableName',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'my_table',
	description: 'Internal name of the table (lowercase, underscores). Cannot be changed after creation via this field — HubSpot may reject name changes.',
	displayOptions: {
		show: {
			resource: ['table'],
			operation: ['update'],
		},
	},
};

export const updateTableLabelField: INodeProperties = {
	displayName: 'Table Label',
	name: 'updateTableLabel',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'My Table',
	description: 'Display label for the table',
	displayOptions: {
		show: {
			resource: ['table'],
			operation: ['update'],
		},
	},
};

export const updateAllowPublicApiAccessField: INodeProperties = {
	displayName: 'Allow Public API Access',
	name: 'updateAllowPublicApiAccess',
	type: 'boolean',
	default: false,
	required: true,
	description: 'Whether to allow unauthenticated access to the published table data',
	displayOptions: {
		show: {
			resource: ['table'],
			operation: ['update'],
		},
	},
};

export const updateAllowChildTablesField: INodeProperties = {
	displayName: 'Allow Child Tables',
	name: 'updateAllowChildTables',
	type: 'boolean',
	default: false,
	required: true,
	description: 'Whether child tables can be created for this table',
	displayOptions: {
		show: {
			resource: ['table'],
			operation: ['update'],
		},
	},
};

export const updateUseForPagesField: INodeProperties = {
	displayName: 'Use for Pages',
	name: 'updateUseForPages',
	type: 'boolean',
	default: false,
	required: true,
	description: 'Whether to enable this table for dynamic pages. <a href="https://developers.hubspot.com/docs/cms/start-building/features/data-driven-content/hubdb" target="_blank">Learn more</a>.',
	displayOptions: {
		show: {
			resource: ['table'],
			operation: ['update'],
		},
	},
};

export const updateEnableChildTablePagesField: INodeProperties = {
	displayName: 'Enable Child Table Pages',
	name: 'updateEnableChildTablePages',
	type: 'boolean',
	default: false,
	required: true,
	description: 'Whether to enable creation of multi-level dynamic pages using child tables',
	displayOptions: {
		show: {
			resource: ['table'],
			operation: ['update'],
		},
	},
};

export const updateDynamicMetaTagsField: INodeProperties = {
	displayName: 'Dynamic Meta Tags',
	name: 'updateDynamicMetaTags',
	type: 'string',
	typeOptions: {
		alwaysOpenEditWindow: true,
	},
	default: '{}',
	required: true,
	placeholder: '{"title": 1, "description": 2}',
	description: 'JSON object mapping metadata field keys to column IDs. Use an empty object <code>{}</code> if not needed.',
	displayOptions: {
		show: {
			resource: ['table'],
			operation: ['update'],
		},
	},
};

export const updateColumnsSourceField: INodeProperties = {
	displayName: 'Columns Source',
	name: 'columnsSource',
	type: 'options',
	options: [
		{
			name: 'Use Fields Below',
			value: 'fields',
			description: 'Define columns using the UI fields',
		},
		{
			name: 'Use JSON',
			value: 'json',
			description: 'Provide columns as a JSON array',
		},
	],
	default: 'fields',
	displayOptions: {
		show: {
			resource: ['table'],
			operation: ['update'],
		},
	},
};

export const updateColumnsFieldUI: INodeProperties = {
	displayName: 'Columns',
	name: 'columns',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
	},
	default: {},
	placeholder: 'Add Column',
	description: 'Define all columns for the table. Columns not included will be deleted.',
	displayOptions: {
		show: {
			resource: ['table'],
			operation: ['update'],
			columnsSource: ['fields'],
		},
	},
	options: [
		{
			name: 'columnValues',
			displayName: 'Column',
			values: [
				{
					displayName: 'Column ID',
					name: 'id',
					type: 'number',
					default: 0,
					description: 'ID of an existing column (leave 0 for new columns)',
				},
				{
					displayName: 'Column Name',
					name: 'name',
					type: 'string',
					default: '',
					required: true,
					placeholder: 'email',
					description: 'Internal name for the column (lowercase, underscores)',
				},
				{
					displayName: 'Column Label',
					name: 'label',
					type: 'string',
					default: '',
					required: true,
					placeholder: 'Email Address',
					description: 'Display label for the column',
				},
				{
					displayName: 'Column Type',
					name: 'type',
					type: 'options',
					options: [
						{ name: 'Text', value: 'TEXT' },
						{ name: 'Number', value: 'NUMBER' },
						{ name: 'Date', value: 'DATE' },
						{ name: 'Date Time', value: 'DATETIME' },
						{ name: 'URL', value: 'URL' },
						{ name: 'Image', value: 'IMAGE' },
						{ name: 'File', value: 'FILE' },
						{ name: 'Video', value: 'VIDEO' },
						{ name: 'Boolean', value: 'BOOLEAN' },
						{ name: 'Select', value: 'SELECT' },
						{ name: 'Multi-Select', value: 'MULTISELECT' },
						{ name: 'Rich Text', value: 'RICHTEXT' },
						{ name: 'Location', value: 'LOCATION' },
						{ name: 'CTA', value: 'CTA' },
					],
					default: 'TEXT',
					description: 'Data type for the column',
				},
				{
					displayName: 'Options',
					name: 'options',
					type: 'fixedCollection',
					typeOptions: {
						multipleValues: true,
					},
					default: {},
					placeholder: 'Add Option',
					description: 'Options for SELECT or MULTISELECT columns',
					displayOptions: {
						show: {
							type: ['SELECT', 'MULTISELECT'],
						},
					},
					options: [
						{
							name: 'optionValues',
							displayName: 'Option',
							values: [
								{
									displayName: 'Option ID',
									name: 'id',
									type: 'string',
									default: '',
									required: true,
									placeholder: 'option_1',
									description: 'Internal ID for the option',
								},
								{
									displayName: 'Option Label',
									name: 'label',
									type: 'string',
									default: '',
									required: true,
									placeholder: 'Option 1',
									description: 'Display label for the option',
								},
							],
						},
					],
				},
			],
		},
	],
};

export const updateColumnsFieldJSON: INodeProperties = {
	displayName: 'Columns (JSON)',
	name: 'columnsJson',
	type: 'string',
	typeOptions: {
		alwaysOpenEditWindow: true,
	},
	default: '[]',
	required: true,
	placeholder: '[{"name": "column_name", "label": "Column Label", "type": "TEXT"}]',
	description: 'Array of column definitions. Required per column: name, label, type. Optional: id (for existing columns), options (for SELECT/MULTISELECT). Do NOT include metadata fields like createdAt, updatedAt, createdBy, etc.',
	displayOptions: {
		show: {
			resource: ['table'],
			operation: ['update'],
			columnsSource: ['json'],
		},
	},
};



// Clone Table
export const tableIdForCloneField: INodeProperties = {
	displayName: 'Source Table',
	name: 'tableId',
	type: 'options',
	typeOptions: {
		loadOptionsMethod: 'loadTables',
	},
	default: '',
	required: true,
	placeholder: '12345678',
	description: 'The table to clone. You can also use an expression to provide a table ID or name.',
	displayOptions: {
		show: {
			resource: ['table'],
			operation: ['clone'],
		},
	},
};

export const newNameField: INodeProperties = {
	displayName: 'New Table Name',
	name: 'newName',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'cloned_table',
	description: 'Internal name for the cloned table (lowercase, underscores)',
	displayOptions: {
		show: {
			resource: ['table'],
			operation: ['clone'],
		},
	},
};

export const newLabelField: INodeProperties = {
	displayName: 'New Table Label',
	name: 'newLabel',
	type: 'string',
	default: '',
	required: true,
	placeholder: 'Cloned Table',
	description: 'Display label for the cloned table',
	displayOptions: {
		show: {
			resource: ['table'],
			operation: ['clone'],
		},
	},
};

export const copyRowsField: INodeProperties = {
	displayName: 'Copy Rows',
	name: 'copyRows',
	type: 'boolean',
	default: false,
	description: 'Whether to copy rows from the source table to the cloned table',
	displayOptions: {
		show: {
			resource: ['table'],
			operation: ['clone'],
		},
	},
};

export const tableFields: INodeProperties[] = [
	tableOperationField,
	tableIdForGetField,
	returnAllField,
	limitField,
	tableNameField,
	tableLabelField,
	allowPublicApiAccessField,
	useForPagesField,
	columnsField,
	tableIdForUpdateField,
	updateTableWarningField,
	updateTableLabelField,
	updateAllowPublicApiAccessField,
	updateAllowChildTablesField,
	updateUseForPagesField,
	updateEnableChildTablePagesField,
	updateDynamicMetaTagsField,
	updateColumnsSourceField,
	updateColumnsFieldUI,
	updateColumnsFieldJSON,
	tableIdForCloneField,
	newNameField,
	newLabelField,
	copyRowsField,
];
