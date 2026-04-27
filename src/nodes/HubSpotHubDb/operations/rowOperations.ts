import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { hubspotApiRequest } from '../../../transport/HubSpotApiRequest';

interface ColumnValue {
	columnName: string;
	columnValue: string;
}

interface ColumnMapping {
	source: string;
	target: string;
}

export async function executeRowOperation(
	context: IExecuteFunctions,
	operation: string,
	items: INodeExecutionData[],
	itemIndex: number
): Promise<INodeExecutionData[]> {
	switch (operation) {
		case 'getAll':
			return await getAllRows(context, itemIndex);
		case 'create':
			return [await createRow(context, itemIndex)];
		case 'update':
			return [await updateRow(context, itemIndex)];
		case 'delete':
			return [await deleteRow(context, itemIndex)];
		case 'batchCreate':
			return await batchCreateRows(context, items, itemIndex);
		case 'batchUpdate':
			return await batchUpdateRows(context, items, itemIndex);
		case 'batchDelete':
			return [await batchDeleteRows(context, items, itemIndex)];
		default:
			throw new Error(`Unknown row operation: ${operation}`);
	}
}

// Helper function to build column values from fixedCollection
function buildColumnValues(
	columnValuesData: { values?: ColumnValue[] }
): Record<string, any> {
	const values: Record<string, any> = {};

	if (columnValuesData.values && columnValuesData.values.length > 0) {
		for (const col of columnValuesData.values) {
			values[col.columnName] = col.columnValue;
		}
	}

	return values;
}

// Helper function to build batch rows from input items
function buildBatchRowsFromItems(
	items: INodeExecutionData[],
	columnMappings: ColumnMapping[],
	idField?: string
): Array<{ id?: string; values: Record<string, any> }> {
	const rows: Array<{ id?: string; values: Record<string, any> }> = [];

	for (const item of items) {
		const row: { id?: string; values: Record<string, any> } = {
			values: {},
		};

		// Add ID if required (for batch update)
		if (idField && item.json[idField]) {
			row.id = String(item.json[idField]);
		}

		// Map columns
		for (const mapping of columnMappings) {
			if (item.json[mapping.source] !== undefined) {
				row.values[mapping.target] = item.json[mapping.source];
			}
		}

		rows.push(row);
	}

	return rows;
}

async function getAllRows(
	context: IExecuteFunctions,
	i: number
): Promise<INodeExecutionData[]> {
	const tableId = context.getNodeParameter('tableId', i) as string;
	const returnAll = context.getNodeParameter('returnAll', i) as boolean;
	const limit = returnAll ? undefined : (context.getNodeParameter('limit', i, 100) as number);
	const sort = context.getNodeParameter('sort', i, '') as string;
	const properties = context.getNodeParameter('properties', i, '') as string;

	let results: IDataObject[] = [];
	let after: string | undefined;
	let hasMore = true;

	while (hasMore) {
		const queryParams: IDataObject = {
			limit: 100,
		};

		if (after) {
			queryParams.after = after;
		}

		if (sort) {
			queryParams.sort = sort;
		}

		if (properties) {
			queryParams.properties = properties;
		}

		const response = await hubspotApiRequest.call(
			context,
			'GET',
			`/cms/v3/hubdb/tables/${tableId}/rows/draft`,
			{},
			queryParams,
		) as IDataObject;

		if (response.results && Array.isArray(response.results)) {
			results.push(...(response.results as IDataObject[]));
		}

		const paging = response.paging as IDataObject | undefined;
		after = paging?.next ? (paging.next as IDataObject).after as string | undefined : undefined;
		hasMore = !!after && (returnAll || !limit || results.length < limit);

		if (!returnAll && limit && results.length >= limit) {
			results = results.slice(0, limit);
			break;
		}
	}

	return results.map((row) => ({ json: row }));
}

async function createRow(
	context: IExecuteFunctions,
	i: number
): Promise<INodeExecutionData> {
	const tableId = context.getNodeParameter('tableId', i) as string;
	const columnValuesData = context.getNodeParameter('columnValues', i, {}) as { values?: ColumnValue[] };

	const values = buildColumnValues(columnValuesData);

	if (Object.keys(values).length === 0) {
		throw new Error('At least one column value must be specified');
	}

	const body: IDataObject = {
		values,
	};

	const response = await hubspotApiRequest.call(
		context,
		'POST',
		`/cms/v3/hubdb/tables/${tableId}/rows`,
		body,
	) as IDataObject;

	return { json: response };
}

async function updateRow(
	context: IExecuteFunctions,
	i: number
): Promise<INodeExecutionData> {
	const tableId = context.getNodeParameter('tableId', i) as string;
	const rowId = context.getNodeParameter('rowId', i) as string;
	const columnValuesData = context.getNodeParameter('columnValues', i, {}) as { values?: ColumnValue[] };

	const values = buildColumnValues(columnValuesData);

	if (Object.keys(values).length === 0) {
		throw new Error('At least one column value must be specified for update');
	}

	const body: IDataObject = {
		values,
	};

	const response = await hubspotApiRequest.call(
		context,
		'PATCH',
		`/cms/v3/hubdb/tables/${tableId}/rows/${rowId}/draft`,
		body,
	) as IDataObject;

	return { json: response };
}

async function deleteRow(
	context: IExecuteFunctions,
	i: number
): Promise<INodeExecutionData> {
	const tableId = context.getNodeParameter('tableId', i) as string;
	const rowId = context.getNodeParameter('rowId', i) as string;

	await hubspotApiRequest.call(
		context,
		'DELETE',
		`/cms/v3/hubdb/tables/${tableId}/rows/${rowId}/draft`,
	);

	return { json: { success: true, tableId, rowId } };
}

async function batchDeleteRows(
	context: IExecuteFunctions,
	items: INodeExecutionData[],
	i: number
): Promise<INodeExecutionData> {
	const tableId = context.getNodeParameter('tableId', i) as string;
	const batchDeleteMode = context.getNodeParameter('batchDeleteMode', i) as string;

	let ids: string[];

	if (batchDeleteMode === 'mapFromInput') {
		const idField = context.getNodeParameter('deleteIdField', i, 'id') as string;
		ids = items
			.map((item) => item.json[idField])
			.filter((v) => v !== undefined && v !== null && v !== '')
			.map(String);

		if (ids.length === 0) {
			throw new Error(`No row IDs found. Ensure all input items have a "${idField}" field.`);
		}
	} else {
		const rawIds = context.getNodeParameter('rowIds', i) as string | string[];
		ids = Array.isArray(rawIds)
			? rawIds.map(String)
			: String(rawIds).split(',').map((id) => id.trim()).filter(Boolean);

		if (ids.length === 0) {
			throw new Error('At least one row ID must be provided');
		}
	}

	const CHUNK_SIZE = 100;
	let deletedCount = 0;

	for (let offset = 0; offset < ids.length; offset += CHUNK_SIZE) {
		const chunk = ids.slice(offset, offset + CHUNK_SIZE);

		await hubspotApiRequest.call(
			context,
			'POST',
			`/cms/v3/hubdb/tables/${tableId}/rows/draft/batch/purge`,
			{ inputs: chunk },
		);

		deletedCount += chunk.length;
	}

	return { json: { success: true, tableId, deletedCount } };
}

async function batchCreateRows(
	context: IExecuteFunctions,
	items: INodeExecutionData[],
	i: number
): Promise<INodeExecutionData[]> {
	const tableId = context.getNodeParameter('tableId', i) as string;
	const batchMode = context.getNodeParameter('batchMode', i) as string;

	let inputs: Array<{ values: Record<string, any> }> = [];

	if (batchMode === 'defineInNode') {
		const rowsData = context.getNodeParameter('rows', i, {}) as { rowValues?: Array<{ values: { columnValues?: ColumnValue[] } }> };

		if (!rowsData.rowValues || rowsData.rowValues.length === 0) {
			throw new Error('At least one row must be defined');
		}

		inputs = rowsData.rowValues.map((row) => {
			const columnValuesData = row.values as { columnValues?: ColumnValue[] };
			const values: Record<string, any> = {};
			
			if (columnValuesData.columnValues && columnValuesData.columnValues.length > 0) {
				for (const col of columnValuesData.columnValues) {
					values[col.columnName] = col.columnValue;
				}
			}
			
			return { values };
		});
	} else {
		// mapFromInput
		const columnMappingsData = context.getNodeParameter('columnMappings', i, {}) as { mappings?: ColumnMapping[] };

		if (!columnMappingsData.mappings || columnMappingsData.mappings.length === 0) {
			throw new Error('At least one column mapping must be specified');
		}

		inputs = buildBatchRowsFromItems(items, columnMappingsData.mappings);
	}

	// Validate batch size limit
	if (inputs.length > 100) {
		throw new Error('Batch operations are limited to 100 items. Please split your data into smaller batches.');
	}

	if (inputs.length === 0) {
		throw new Error('No rows to create. Please check your input data or mappings.');
	}

	const body: IDataObject = {
		inputs,
	};

	const response = await hubspotApiRequest.call(
		context,
		'POST',
		`/cms/v3/hubdb/tables/${tableId}/rows/draft/batch/create`,
		body,
	) as IDataObject;

	const results = (response.results as IDataObject[]) ?? [];
	return results.map((row) => ({ json: row }));
}

async function batchUpdateRows(
	context: IExecuteFunctions,
	items: INodeExecutionData[],
	i: number
): Promise<INodeExecutionData[]> {
	const tableId = context.getNodeParameter('tableId', i) as string;
	const batchMode = context.getNodeParameter('batchMode', i) as string;

	let inputs: Array<{ id: string; values: Record<string, any> }> = [];

	if (batchMode === 'defineInNode') {
		const rowsData = context.getNodeParameter('rows', i, {}) as { rowValues?: Array<{ id: string; values: { columnValues?: ColumnValue[] } }> };

		if (!rowsData.rowValues || rowsData.rowValues.length === 0) {
			throw new Error('At least one row must be defined');
		}

		inputs = rowsData.rowValues.map((row) => {
			if (!row.id) {
				throw new Error('Row ID is required for batch update');
			}
			
			const columnValuesData = row.values as { columnValues?: ColumnValue[] };
			const values: Record<string, any> = {};
			
			if (columnValuesData.columnValues && columnValuesData.columnValues.length > 0) {
				for (const col of columnValuesData.columnValues) {
					values[col.columnName] = col.columnValue;
				}
			}
			
			return {
				id: row.id,
				values,
			};
		});
	} else {
		// mapFromInput
		const idField = context.getNodeParameter('idField', i, 'id') as string;
		const columnMappingsData = context.getNodeParameter('columnMappings', i, {}) as { mappings?: ColumnMapping[] };

		if (!columnMappingsData.mappings || columnMappingsData.mappings.length === 0) {
			throw new Error('At least one column mapping must be specified');
		}

		const rows = buildBatchRowsFromItems(items, columnMappingsData.mappings, idField);

		// Validate all rows have IDs
		for (const row of rows) {
			if (!row.id) {
				throw new Error(`Row ID is required for batch update. Please ensure your input items have a "${idField}" field.`);
			}
		}

		inputs = rows as Array<{ id: string; values: Record<string, any> }>;
	}

	// Validate batch size limit
	if (inputs.length > 100) {
		throw new Error('Batch operations are limited to 100 items. Please split your data into smaller batches.');
	}

	if (inputs.length === 0) {
		throw new Error('No rows to update. Please check your input data or mappings.');
	}

	const body: IDataObject = {
		inputs,
	};

	const response = await hubspotApiRequest.call(
		context,
		'POST',
		`/cms/v3/hubdb/tables/${tableId}/rows/draft/batch/update`,
		body,
	) as IDataObject;

	const results = (response.results as IDataObject[]) ?? [];
	return results.map((row) => ({ json: row }));
}
