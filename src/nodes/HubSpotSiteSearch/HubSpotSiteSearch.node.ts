import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
	INodePropertyOptions,
	IDataObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

import { hubspotApiRequestAllItemsForLoadOptions } from '../../transport/HubSpotApiRequest';
import { searchFields } from './descriptions';
import { executeSearchOperation } from './operations';

export class HubSpotSiteSearch implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'HubSpot Site Search',
		name: 'hubSpotSiteSearch',
		icon: 'file:../../icon.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] === "search" ? "Search Site" : "Get Indexed Data"}}',
		description: 'Search content across HubSpot-hosted sites and retrieve indexed data for specific assets',
		defaults: {
			name: 'HubSpot Site Search',
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
		outputs: ['main', { type: 'main', category: 'error' }],
		credentials: [
			{
				name: 'hubspotAppToken',
				required: true,
			},
		],
		properties: searchFields,
	};

	methods = {
		loadOptions: {
			async loadBlogs(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const results = await hubspotApiRequestAllItemsForLoadOptions.call(
					this,
					'GET',
					'/cms/v3/blogs',
				);

				const options: INodePropertyOptions[] = results.map((blog) => ({
					name: blog.name as string,
					value: String(blog.id),
				}));

				options.sort((a, b) => a.name.localeCompare(b.name));
				return options;
			},

			async loadTables(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const results = await hubspotApiRequestAllItemsForLoadOptions.call(
					this,
					'GET',
					'/cms/v3/hubdb/tables/draft',
				);

				const options: INodePropertyOptions[] = results.map((table) => ({
					name: (table.label || table.name) as string,
					value: String(table.id),
				}));

				options.sort((a, b) => a.name.localeCompare(b.name));
				return options;
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				const results = await executeSearchOperation(this, operation, i);
				returnData.push(...results);
			} catch (error) {
				if (this.continueOnFail()) {
					const errorData: IDataObject = {
						error: error instanceof Error ? error.message : String(error),
					};
					if (error instanceof NodeApiError) {
						if (error.httpCode) errorData.httpCode = error.httpCode;
						if (error.description) {
							try {
								errorData.hubspotError = JSON.parse(error.description);
							} catch {
								errorData.errorDescription = error.description;
							}
						}
					}
					const errorItem: INodeExecutionData = { json: errorData, pairedItem: { item: i } };
					if (error instanceof NodeApiError) {
						errorItem.error = error;
					}
					returnData.push(errorItem);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
