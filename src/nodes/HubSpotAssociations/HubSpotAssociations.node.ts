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
import { associationFields } from './descriptions';
import { executeAssociationOperation } from './operations';
import { PropertyCache } from '../../transport/PropertyCache';

export class HubSpotAssociations implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'HubSpot Associations',
		name: 'hubSpotAssociations',
		icon: 'file:../../icon.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + ($parameter["fromObjectType"] === "custom" ? $parameter["customFromObjectType"] : $parameter["fromObjectType"]) + " → " + ($parameter["toObjectType"] === "custom" ? $parameter["customToObjectType"] : $parameter["toObjectType"])}}',
		description: 'Manage HubSpot object associations',
		defaults: {
			name: 'HubSpot Associations',
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
		properties: associationFields,
	};

	methods = {
		loadOptions: {
			async getProperties(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {

				const toObjectTypeRaw = this.getCurrentNodeParameter('toObjectType') as string;
				const toObjectType = toObjectTypeRaw === 'custom'
					? this.getCurrentNodeParameter('customToObjectType') as string
					: toObjectTypeRaw;

				const credentials = await this.getCredentials('hubspotAppToken');
				const credentialId = (credentials.appToken as string).slice(-8);

				const cache = PropertyCache.getInstance();
				const cached = cache.get(toObjectType, credentialId);
				if (cached) {
					return cached;
				}

				const results = await hubspotApiRequestAllItemsForLoadOptions.call(
					this,
					'GET',
					`/crm/v3/properties/${toObjectType}`,
				);

				const options: INodePropertyOptions[] = [];
				for (const property of results) {
					options.push({
						name: (property.label || property.name) as string,
						value: property.name as string,
					});
				}

				cache.set(toObjectType, options, credentialId);
				return options;
			},

			async getAssociationLabels(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				// Resolve fromObjectType
				const fromObjectTypeRaw = this.getCurrentNodeParameter('fromObjectType') as string;
				const fromObjectType = fromObjectTypeRaw === 'custom'
					? (this.getCurrentNodeParameter('customFromObjectType') as string)
					: fromObjectTypeRaw;

				// Resolve toObjectType
				const toObjectTypeRaw = this.getCurrentNodeParameter('toObjectType') as string;
				const toObjectType = toObjectTypeRaw === 'custom'
					? (this.getCurrentNodeParameter('customToObjectType') as string)
					: toObjectTypeRaw;

				// Fetch labels from API
				const results = await hubspotApiRequestAllItemsForLoadOptions.call(
					this,
					'GET',
					`/crm/associations/v4/${fromObjectType}/${toObjectType}/labels`,
				);

				// Build options array
				const options: INodePropertyOptions[] = [
					{
						name: 'Default (Unlabeled)',
						value: '',
						description: 'Use the default association type without a specific label',
					},
				];

				// Add all label categories
				for (const label of results) {
					const categoryLabel = label.category === 'USER_DEFINED' ? 'Custom' :
						label.category === 'HUBSPOT_DEFINED' ? 'HubSpot' :
						'Integration';
				
					options.push({
						name: `${label.label} (${categoryLabel})`,
						value: JSON.stringify({
							typeId: label.typeId,
							category: label.category,
						}),
						description: `${label.category} association label`,
					});
				}

				return options;
			},

			async getAssociationLabelsForFilter(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				// Resolve fromObjectType
				const fromObjectTypeRaw = this.getCurrentNodeParameter('fromObjectType') as string;
				const fromObjectType = fromObjectTypeRaw === 'custom'
					? (this.getCurrentNodeParameter('customFromObjectType') as string)
					: fromObjectTypeRaw;

				// Resolve toObjectType
				const toObjectTypeRaw = this.getCurrentNodeParameter('toObjectType') as string;
				const toObjectType = toObjectTypeRaw === 'custom'
					? (this.getCurrentNodeParameter('customToObjectType') as string)
					: toObjectTypeRaw;

				// Fetch labels from API
				const results = await hubspotApiRequestAllItemsForLoadOptions.call(
					this,
					'GET',
					`/crm/associations/v4/${fromObjectType}/${toObjectType}/labels`,
				);

				// Build options array - WITHOUT "Default (Unlabeled)" option
				const options: INodePropertyOptions[] = [];

				// Add all label categories
				for (const label of results) {
					const categoryLabel = label.category === 'USER_DEFINED' ? 'Custom' :
						label.category === 'HUBSPOT_DEFINED' ? 'HubSpot' :
						'Integration';
				
					options.push({
						name: `${label.label} (${categoryLabel})`,
						value: JSON.stringify({
							typeId: label.typeId,
							category: label.category,
						}),
						description: `${label.category} association label`,
					});
				}

				return options;
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const operation = this.getNodeParameter('operation', 0) as string;
		const fromObjectTypeRaw = this.getNodeParameter('fromObjectType', 0) as string;
		const fromObjectType = fromObjectTypeRaw === 'custom'
			? (this.getNodeParameter('customFromObjectType', 0) as string)
			: fromObjectTypeRaw;
		const toObjectTypeRaw = this.getNodeParameter('toObjectType', 0) as string;
		const toObjectType = toObjectTypeRaw === 'custom'
			? (this.getNodeParameter('customToObjectType', 0) as string)
			: toObjectTypeRaw;

		if (operation === 'batchGetAssociations' || operation === 'batchHydrateAssociations') {
			try {
				const results = await executeAssociationOperation(
					this,
					operation,
					fromObjectType,
					toObjectType,
					items,
					0
				);
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
					const errorItem: INodeExecutionData = { json: errorData };
					if (error instanceof NodeApiError) {
						errorItem.error = error;
					}
					returnData.push(errorItem);
				} else {
					throw error;
				}
			}
		} else {
			for (let i = 0; i < items.length; i++) {
				try {
					const results = await executeAssociationOperation(
						this,
						operation,
						fromObjectType,
						toObjectType,
						items,
						i
					);
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
		}

		return [returnData];
	}
}
