import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { hubspotApiRequest, hubspotApiRequestAllItems } from '../../../transport/HubSpotApiRequest';

interface ColumnDefinition {
	id?: number;
	name: string;
	label: string;
	type: string;
	options?: {
		optionValues?: Array<{
			id: string;
			label: string;
			type: string;
		}>;
	};
}

export async function executeTableOperation(
	context: IExecuteFunctions,
	operation: string,
	items: INodeExecutionData[],
	itemIndex: number
): Promise<INodeExecutionData[]> {
	switch (operation) {
		case 'get':
			return [await getTable(context, itemIndex)];
		case 'getAll':
			return await getAllTables(context, itemIndex);
		case 'create':
			return [await createTable(context, itemIndex)];
		case 'update':
			return [await updateTable(context, itemIndex)];
		case 'publish':
			return [await publishTable(context, itemIndex)];
		case 'unpublish':
			return [await unpublishTable(context, itemIndex)];
		case 'delete':
			return [await deleteTable(context, itemIndex)];
		case 'clone':
			return [await cloneTable(context, itemIndex)];
		default:
			throw new Error(`Unknown table operation: ${operation}`);
	}
}

async function getTable(
	context: IExecuteFunctions,
	i: number
): Promise<INodeExecutionData> {
	const tableId = context.getNodeParameter('tableId', i) as string;

	const response = await hubspotApiRequest.call(
		context,
		'GET',
		`/cms/v3/hubdb/tables/${tableId}/draft`,
		{},
	) as IDataObject;

	return { json: response };
}

async function getAllTables(
	context: IExecuteFunctions,
	i: number
): Promise<INodeExecutionData[]> {
	const returnAll = context.getNodeParameter('returnAll', i) as boolean;
	const limit = returnAll ? undefined : (context.getNodeParameter('limit', i, 100) as number);

	let results: IDataObject[];

	// Get draft tables (includes unpublished and cloned tables)
	if (returnAll) {
		results = await hubspotApiRequestAllItems.call(
			context,
			'GET',
			'/cms/v3/hubdb/tables/draft',
			{},
			limit,
		);
	} else {
		const response = await hubspotApiRequest.call(
			context,
			'GET',
			'/cms/v3/hubdb/tables/draft',
			{},
			{ limit },
		) as IDataObject;

		results = (response.results as IDataObject[]) || [];
	}

	return results.map((table) => ({ json: table }));
}

async function createTable(
	context: IExecuteFunctions,
	i: number
): Promise<INodeExecutionData> {
	const tableName = context.getNodeParameter('tableName', i) as string;
	const tableLabel = context.getNodeParameter('tableLabel', i) as string;
	const allowPublicApiAccess = context.getNodeParameter('allowPublicApiAccess', i) as boolean;
	const useForPages = context.getNodeParameter('useForPages', i) as boolean;
	const columns = context.getNodeParameter('columns', i, {}) as { columnValues?: ColumnDefinition[] };

	// Validate table name format
	if (!/^[a-z0-9_]+$/.test(tableName)) {
		throw new Error('Table name must contain only lowercase letters, numbers, and underscores');
	}

	// Validate at least one column
	if (!columns.columnValues || columns.columnValues.length === 0) {
		throw new Error('At least one column is required to create a table');
	}

	const body: IDataObject = {
		name: tableName,
		label: tableLabel,
		allowPublicApiAccess,
		useForPages,
		columns: columns.columnValues.map((col) => {
			const column: IDataObject = {
				type: col.type,
				name: col.name,
				label: col.label,
			};

			// Add options for SELECT and MULTISELECT columns
			if ((col.type === 'SELECT' || col.type === 'MULTISELECT') && col.options?.optionValues) {
				column.options = col.options.optionValues.map((opt) => ({
					id: opt.id,
					name: opt.label,
					label: opt.label,
					type: opt.type,
				}));
			}

			return column;
		}),
	};

	const response = await hubspotApiRequest.call(
		context,
		'POST',
		'/cms/v3/hubdb/tables',
		body,
	) as IDataObject;

	return { json: response };
}

async function updateTable(
	context: IExecuteFunctions,
	i: number
): Promise<INodeExecutionData> {
	const tableId = context.getNodeParameter('tableId', i) as string;
	const label = context.getNodeParameter('updateTableLabel', i) as string;
	const allowPublicApiAccess = context.getNodeParameter('updateAllowPublicApiAccess', i) as boolean;
	const allowChildTables = context.getNodeParameter('updateAllowChildTables', i) as boolean;
	const useForPages = context.getNodeParameter('updateUseForPages', i) as boolean;
	const enableChildTablePages = context.getNodeParameter('updateEnableChildTablePages', i) as boolean;
	const dynamicMetaTagsRaw = context.getNodeParameter('updateDynamicMetaTags', i, '{}') as string | IDataObject;
	const columnsSource = context.getNodeParameter('columnsSource', i) as string;

	// Parse dynamicMetaTags
	let dynamicMetaTags: IDataObject;
	if (typeof dynamicMetaTagsRaw === 'string') {
		try {
			dynamicMetaTags = JSON.parse(dynamicMetaTagsRaw);
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : String(error);
			throw new Error(`Invalid JSON in Dynamic Meta Tags field: ${errorMessage}`);
		}
	} else {
		dynamicMetaTags = dynamicMetaTagsRaw;
	}

	// Parse columns
	let columns: IDataObject[];

	if (columnsSource === 'json') {
		const columnsJson = context.getNodeParameter('columnsJson', i) as string | IDataObject[];
		if (Array.isArray(columnsJson)) {
			columns = columnsJson;
		} else if (typeof columnsJson === 'string') {
			try {
				columns = JSON.parse(columnsJson);
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : String(error);
				throw new Error(`Invalid JSON in Columns field: ${errorMessage}`);
			}
		} else {
			columns = [columnsJson as IDataObject];
		}
	} else {
		const columnsInput = context.getNodeParameter('columns', i, {}) as IDataObject;
		if (columnsInput.columnValues && Array.isArray(columnsInput.columnValues)) {
			const columnValues = columnsInput.columnValues as ColumnDefinition[];
			columns = columnValues.map((col) => {
				const column: IDataObject = {
					name: col.name,
					label: col.label,
					type: col.type,
				};

				if (col.id) {
					column.id = col.id;
				}

				if ((col.type === 'SELECT' || col.type === 'MULTISELECT') && col.options?.optionValues) {
					column.options = col.options.optionValues.map((opt) => ({
						id: opt.id,
						name: opt.label,
						label: opt.label,
					}));
				}

				return column;
			});
		} else {
			columns = [];
		}
	}

	if (!Array.isArray(columns)) {
		throw new Error('Columns must be an array');
	}

	// Validate column entries in fields mode
	if (columnsSource === 'fields') {
		for (let idx = 0; idx < columns.length; idx++) {
			const col = columns[idx];
			if (!col.name || !col.label || !col.type) {
				throw new Error(
					`Column at index ${idx} is missing required fields. Required: name, label, type.`
				);
			}
		}
	} else {
		// JSON mode validation
		for (let idx = 0; idx < columns.length; idx++) {
			const col = columns[idx];
			if (!col.name || !col.label || !col.type) {
				throw new Error(
					`Column at index ${idx} is missing required fields. Required: name, label, type. ` +
					`Optional: id, archived, options. ` +
					`Do NOT include metadata fields like createdAt, updatedAt, createdBy, etc.`
				);
			}
		}
	}

	const body: IDataObject = {
		label,
		allowPublicApiAccess,
		allowChildTables,
		useForPages,
		enableChildTablePages,
		dynamicMetaTags,
		columns,
	};

	const response = await hubspotApiRequest.call(
		context,
		'PATCH',
		`/cms/v3/hubdb/tables/${tableId}/draft`,
		body,
	) as IDataObject;

	return { json: response };
}

async function publishTable(
	context: IExecuteFunctions,
	i: number
): Promise<INodeExecutionData> {
	const tableId = context.getNodeParameter('tableId', i) as string;

	const response = await hubspotApiRequest.call(
		context,
		'POST',
		`/cms/v3/hubdb/tables/${tableId}/draft/publish`,
	) as IDataObject;

	return { json: response };
}

async function unpublishTable(
	context: IExecuteFunctions,
	i: number
): Promise<INodeExecutionData> {
	const tableId = context.getNodeParameter('tableId', i) as string;

	const response = await hubspotApiRequest.call(
		context,
		'POST',
		`/cms/v3/hubdb/tables/${tableId}/unpublish`,
	) as IDataObject;

	return { json: response };
}

async function deleteTable(
	context: IExecuteFunctions,
	i: number
): Promise<INodeExecutionData> {
	const tableId = context.getNodeParameter('tableId', i) as string;

	return {
		json: {
			success: false,
			tableId,
			message: 'Permanent deletion of HubDB tables is not supported via the API. Please use the HubSpot UI to permanently delete tables.',
			note: 'You can use the Unpublish operation to make tables unavailable on live pages.',
		},
	};
}

async function cloneTable(
	context: IExecuteFunctions,
	i: number
): Promise<INodeExecutionData> {
	const tableId = context.getNodeParameter('tableId', i) as string;
	const newName = context.getNodeParameter('newName', i) as string;
	const newLabel = context.getNodeParameter('newLabel', i) as string;
	const copyRows = context.getNodeParameter('copyRows', i) as boolean;

	// Validate new table name format
	if (!/^[a-z0-9_]+$/.test(newName)) {
		throw new Error('New table name must contain only lowercase letters, numbers, and underscores');
	}

	const body: IDataObject = {
		newName,
		newLabel,
		copyRows,
	};

	const response = await hubspotApiRequest.call(
		context,
		'POST',
		`/cms/v3/hubdb/tables/${tableId}/draft/clone`,
		body,
	) as IDataObject;

	return { json: response };
}
