import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

import { resourceField, returnAllField, searchLimitField, fileFields, folderFields } from './descriptions';
import { executeFileOperation, executeFolderOperation } from './operations';

export class HubSpotFiles implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'HubSpot Files',
		name: 'hubSpotFiles',
		icon: 'file:../../icon.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Manage files and folders in HubSpot File Manager',
		defaults: {
			name: 'HubSpot Files',
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
				'HubSpot File Manager',
				'HubSpot Upload',
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
			resourceField,
			...fileFields,
			...folderFields,
			returnAllField,
			searchLimitField,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'file') {
					const result = await executeFileOperation(this, operation, items, i);
					if (Array.isArray(result)) {
						returnData.push(...result);
					} else {
						returnData.push(result);
					}
				} else if (resource === 'folder') {
					const result = await executeFolderOperation(this, operation, i);
					if (Array.isArray(result)) {
						returnData.push(...result);
					} else {
						returnData.push(result);
					}
				} else {
					throw new Error(`Unknown resource: ${resource}`);
				}
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
					returnData.push({ json: errorData, pairedItem: { item: i } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
