import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
	INodePropertyOptions,
	IDataObject,
} from 'n8n-workflow';

import { hubspotApiRequestForLoadOptions , buildErrorItem } from '../../transport/HubSpotApiRequest';
import { HubDbSchemaCache } from '../../transport/HubDbSchemaCache';
import { hubDbFields } from './descriptions';
import { executeTableOperation, executeRowOperation } from './operations';

export class HubSpotHubDb implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'HubSpot HubDB',
		name: 'hubSpotHubDb',
		icon: 'file:../../icon.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Manage HubSpot HubDB tables and rows',
		defaults: {
			name: 'HubSpot HubDB',
		},
		codex: {
			categories: ['Marketing & Content'],
			subcategories: {
				'Marketing & Content': ['CRM'],
			},
			alias: [
				'HubSpot Advanced',
				'viminds',
				'viminds HubSpot',
				'HubSpot viminds',
				'Advanced HubSpot',
				'HubSpot Pro',
				'HubSpot Extended',
				'HubSpot Batch',
				'HubSpot Rate Limit',
				'HubSpot Association',
				'HubSpot Hydrate',
				'HubSpot Custom Objects',
				'HubSpot Search',
				'HubSpot Filter',
				'HubDB',
				'HubSpot Database',
				'HubSpot Tables',
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
		properties: hubDbFields,
	};

	methods = {
		loadOptions: {
			async loadTableColumns(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const tableId = this.getCurrentNodeParameter('tableId') as string;
				if (!tableId) return [];

				const credentialId = (this.getCredentials && (await this.getCredentials('hubspotAppToken')))?.clientSecret as string | undefined;
				const cache = HubDbSchemaCache.getInstance();

				const cached = cache.get(tableId, credentialId);
				if (cached) return cached;

				const response = await hubspotApiRequestForLoadOptions.call(
					this,
					'GET',
					`/cms/v3/hubdb/tables/${tableId}/draft`,
					{},
				) as IDataObject;

				const options: INodePropertyOptions[] = [];

				if (response.columns && Array.isArray(response.columns)) {
					for (const col of response.columns as IDataObject[]) {
						if (col.name) {
							options.push({
								name: (col.label || col.name) as string,
								value: col.name as string,
								description: col.type ? `Type: ${col.type}` : undefined,
							});
						}
					}
				}

				options.sort((a, b) => a.name.localeCompare(b.name));
				cache.set(tableId, options, credentialId);

				return options;
			},

			async loadTables(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await hubspotApiRequestForLoadOptions.call(
					this,
					'GET',
					'/cms/v3/hubdb/tables/draft',
					{},
				) as IDataObject;

				const options: INodePropertyOptions[] = [];

				if (response.results && Array.isArray(response.results)) {
					for (const table of response.results as IDataObject[]) {
						const label = (table.label || table.name) as string;
						const publishedStatus = table.publishedAt ? '' : ' (unpublished)';
						options.push({
							name: `${label}${publishedStatus}`,
							value: table.id as string,
						});
					}
				}

				options.sort((a, b) => a.name.localeCompare(b.name));

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
				let results: INodeExecutionData[];

				if (resource === 'table') {
					results = await executeTableOperation(this, operation, items, i);
				} else if (resource === 'row') {
					results = await executeRowOperation(this, operation, items, i);
				} else {
					throw new Error(`Unknown resource: ${resource}`);
				}

				returnData.push(...results);

				// Break after first item for batch operations and getAll operations
				if (
					operation === 'batchCreate' ||
					operation === 'batchUpdate' ||
					operation === 'getAll'
				) {
					break;
				}
			} catch (error: any) {
				if (this.continueOnFail()) {
					returnData.push(buildErrorItem(error, i));
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
