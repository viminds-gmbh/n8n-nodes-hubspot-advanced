import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { buildErrorItem, type HubSpotError } from '../../transport/HubSpotApiRequest';
import { schemaFields } from './descriptions';
import { executeSchemaOperation } from './operations';

export class HubSpotObjectSchema implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'HubSpot Object Schema',
		name: 'hubSpotObjectSchema',
		icon: 'file:../../icon.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] === "getAssociationLabelDefinitions" ? $parameter["operation"] + ": " + ($parameter["fromObjectType"] === "custom" ? $parameter["customFromObjectType"] : $parameter["fromObjectType"]) + " → " + ($parameter["toObjectType"] === "custom" ? $parameter["customToObjectType"] : $parameter["toObjectType"]) : $parameter["operation"] + ": " + ($parameter["objectType"] === "custom" ? $parameter["customObjectType"] : $parameter["objectType"])}}',
		description: 'Get HubSpot object schema information',
		defaults: {
			name: 'HubSpot Object Schema',
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
		properties: schemaFields,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let objectType = '';
				
				if (operation !== 'getObjectTypes' && operation !== 'getAssociationLabelDefinitions') {
					const objectTypeRaw = this.getNodeParameter('objectType', i, '') as string;
					objectType = objectTypeRaw === 'custom'
						? (this.getNodeParameter('customObjectType', i) as string)
						: objectTypeRaw;
				}

				const results = await executeSchemaOperation(this, operation, objectType, i);
				returnData.push(...results);

				if (operation === 'getObjectTypes' || operation === 'getAssociationLabelDefinitions') {
					break;
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push(buildErrorItem(error as HubSpotError, i));
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
