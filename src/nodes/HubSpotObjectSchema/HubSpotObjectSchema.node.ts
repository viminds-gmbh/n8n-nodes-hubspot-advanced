import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
} from 'n8n-workflow';

import { hubspotApiRequest, hubspotApiRequestAllItems } from '../../transport/HubSpotApiRequest';
import { HUBSPOT_OBJECT_TYPE_OPTIONS } from '../../types';

export class HubSpotObjectSchema implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'HubSpot Object Schema',
		name: 'hubSpotObjectSchema',
		icon: 'file:../../icon.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] === "getObjectTypes" ? "Get Object Types" : "Get Properties: " + ($parameter["objectType"] === "custom" ? $parameter["customObjectType"] : $parameter["objectType"])}}',
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
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Get Object Types',
						value: 'getObjectTypes',
						description: 'Get all available object types',
					},
					{
						name: 'Get Properties',
						value: 'getProperties',
						description: 'Get properties for an object type',
					},
				],
				default: 'getObjectTypes',
				required: true,
			},
			{
				displayName: 'Object Type',
				name: 'objectType',
				type: 'options',
				options: [...HUBSPOT_OBJECT_TYPE_OPTIONS],
				default: 'contacts',
				required: true,
				description: 'The type of CRM object to retrieve properties for. <a href="https://developers.hubspot.com/docs/api/crm/properties" target="_blank">Learn more about properties</a>.',
				displayOptions: {
					show: {
						operation: ['getProperties'],
					},
				},
			},
			{
				displayName: 'Custom Object Type',
				name: 'customObjectType',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'cars',
				description: 'The name or ID of the custom object type (e.g., "cars" or "2-12345"). <a href="https://developers.hubspot.com/docs/api/crm/crm-custom-objects" target="_blank">Learn more about custom objects</a>.',
				displayOptions: {
					show: {
						operation: ['getProperties'],
						objectType: ['custom'],
					},
				},
			},
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				default: false,
				description: 'Whether to automatically paginate and return all properties. May take longer for object types with many properties.',
				displayOptions: {
					show: {
						operation: ['getProperties'],
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 100,
				typeOptions: {
					minValue: 1,
					maxValue: 10000,
				},
				description: 'Maximum number of properties to return',
				displayOptions: {
					show: {
						operation: ['getProperties'],
						returnAll: [false],
					},
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				if (operation === 'getObjectTypes') {
					const response = await hubspotApiRequest.call(
						this,
						'GET',
						'/crm/v3/schemas',
					);

					if (response.results) {
						response.results.forEach((schema: IDataObject) => {
							returnData.push({ json: schema });
						});
					}
				} else if (operation === 'getProperties') {
					const objectTypeRaw = this.getNodeParameter('objectType', i) as string;
					const objectType = objectTypeRaw === 'custom'
						? (this.getNodeParameter('customObjectType', i) as string)
						: objectTypeRaw;

					const returnAll = this.getNodeParameter('returnAll', i) as boolean;
					const limit = returnAll ? undefined : (this.getNodeParameter('limit', i, 100) as number);

					const body: IDataObject = {};

					let results: IDataObject[];
					if (returnAll) {
						results = await hubspotApiRequestAllItems.call(
							this,
							'GET',
							`/crm/v3/properties/${objectType}`,
							body,
						);
					} else {
						results = await hubspotApiRequestAllItems.call(
							this,
							'GET',
							`/crm/v3/properties/${objectType}`,
							body,
							limit,
						);
					}

					results.forEach((property: IDataObject) => {
						returnData.push({ json: property });
					});
				}
			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : String(error);
					returnData.push({ json: { error: errorMessage }, pairedItem: { item: i } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
