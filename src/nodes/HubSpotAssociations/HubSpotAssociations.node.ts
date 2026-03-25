import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';

import { hubspotApiRequestAllItemsForLoadOptions } from '../../transport/HubSpotApiRequest';
import { associationFields } from './descriptions';
import { executeAssociationOperation } from './operations';

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
		outputs: ['main'],
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
				const { PropertyCache } = await import('../../transport/PropertyCache');

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
					const errorMessage = error instanceof Error ? error.message : String(error);
					returnData.push({ json: { error: errorMessage } });
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
						const errorMessage = error instanceof Error ? error.message : String(error);
						returnData.push({ json: { error: errorMessage }, pairedItem: { item: i } });
						continue;
					}
					throw error;
				}
			}
		}

		return [returnData];
	}
}
