import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';

import { hubspotApiRequestForLoadOptions, buildErrorItem } from '../../transport/HubSpotApiRequest';
import { PropertyCache } from '../../transport/PropertyCache';
import { userFields } from './descriptions';
import { executeUserOperation } from './operations';

export class HubSpotUsers implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'HubSpot Users',
		name: 'hubSpotUsers',
		icon: 'file:../../icon.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] === "owner" ? ($parameter["operation"] === "get" ? "Get Owner" : "Get Owners") : $parameter["operation"] === "get" ? "Get User" : $parameter["operation"] === "getMany" ? "Get Many Users" : $parameter["operation"] === "search" ? "Search Users" : $parameter["operation"] === "update" ? "Update User" : "Batch Update Users"}}',
		description: 'Interact with HubSpot Users & Owners API — manage users, working hours, timezone, and retrieve owner information',
		defaults: {
			name: 'HubSpot Users',
		},
		codex: {
			categories: ['Marketing & Content'],
			subcategories: {
				'Marketing & Content': ['CRM'],
			},
			alias: [
				'HubSpot Users',
				'viminds',
				'viminds HubSpot',
				'HubSpot viminds',
				'HubSpot User Management',
				'HubSpot Working Hours',
			],
			resources: {
				primaryDocumentation: [
					{
						url: 'https://developers.hubspot.com/docs/api-reference/legacy/crm/objects/users/guide',
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
		properties: userFields,
	};

	methods = {
		loadOptions: {
			async getUserProperties(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const credentials = await this.getCredentials('hubspotAppToken');
				const credentialId = (credentials.appToken as string).slice(-8);

				const cache = PropertyCache.getInstance();
				const cached = cache.get('user', credentialId);
				if (cached) {
					return cached;
				}

				const results = await hubspotApiRequestForLoadOptions.call(
					this,
					'GET',
					'/crm/v3/properties/user',
				) as { results?: Array<{ label: string; name: string }> };

				const options: INodePropertyOptions[] = [];
				if (results.results) {
					for (const property of results.results) {
						options.push({
							name: property.label || property.name,
							value: property.name,
						});
					}
				}

				cache.set('user', options, credentialId);
				return options;
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		if (operation === 'batchUpdate' || (resource === 'owner' && operation === 'getMany')) {
			try {
				const results = await executeUserOperation(this, resource, operation, items, 0);
				returnData.push(...results);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push(buildErrorItem(error));
				} else {
					throw error;
				}
			}
		} else {
			for (let i = 0; i < items.length; i++) {
				try {
					const results = await executeUserOperation(this, resource, operation, items, i);
					returnData.push(...results);

					if (operation === 'getMany') {
						break;
					}
				} catch (error) {
					if (this.continueOnFail()) {
						returnData.push(buildErrorItem(error, i));
						continue;
					}
					throw error;
				}
			}
		}

		return [returnData];
	}
}