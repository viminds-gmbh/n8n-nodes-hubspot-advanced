import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { hubspotApiRequest } from '../../transport/HubSpotApiRequest';
import { HUBSPOT_OBJECT_TYPE_OPTIONS } from '../../types';

export class HubSpotObjectSchema implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'HubSpot Object Schema',
		name: 'hubSpotObjectSchema',
		icon: 'file:../../icon.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Get HubSpot object schema information',
		defaults: {
			name: 'HubSpot Object Schema',
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
				placeholder: 'e.g. cars or 2-12345',
				description: 'The name or ID of the custom object type',
				displayOptions: {
					show: {
						operation: ['getProperties'],
						objectType: ['custom'],
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
						response.results.forEach((schema: any) => {
							returnData.push({ json: schema });
						});
					}
				} else if (operation === 'getProperties') {
					const objectTypeRaw = this.getNodeParameter('objectType', i) as string;
					const objectType = objectTypeRaw === 'custom'
						? (this.getNodeParameter('customObjectType', i) as string)
						: objectTypeRaw;

					const response = await hubspotApiRequest.call(
						this,
						'GET',
						`/crm/v3/properties/${objectType}`,
					);

					if (response.results) {
						response.results.forEach((property: any) => {
							returnData.push({ json: property });
						});
					}
				}
			} catch (error: any) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
