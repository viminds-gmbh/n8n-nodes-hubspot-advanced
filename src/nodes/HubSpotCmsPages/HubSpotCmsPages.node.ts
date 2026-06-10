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
import { PropertyCache } from '../../transport/PropertyCache';
import { pagesFields } from './descriptions';
import { executePageOperation } from './operations';

export class HubSpotCmsPages implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'HubSpot CMS Pages',
		name: 'hubSpotCmsPages',
		icon: 'file:../../icon.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + ($parameter["resource"] === "sitePage" ? "Site Page" : "Landing Page")}}',
		description: 'Interact with HubSpot CMS Pages API (Site Pages and Landing Pages)',
		defaults: {
			name: 'HubSpot CMS Pages',
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
		properties: pagesFields,
	};

	methods = {
		loadOptions: {
			async getDomains(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const credentials = await this.getCredentials('hubspotAppToken');
				const credentialId = (credentials.appToken as string).slice(-8);

				const cache = PropertyCache.getInstance();
				const cacheKey = 'cms_domains';
				const cached = cache.get(cacheKey, credentialId);
				if (cached) {
					return cached;
				}

				const response = await hubspotApiRequestForLoadOptions.call(
					this,
					'GET',
					'/cms/v3/domains',
				) as IDataObject;

				const options: INodePropertyOptions[] = [];
				if (response.results && Array.isArray(response.results)) {
					for (const domain of response.results as IDataObject[]) {
						options.push({
							name: domain.domain as string,
							value: domain.domain as string,
						});
					}
				}

				cache.set(cacheKey, options, credentialId);
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
				const results = await executePageOperation(this, resource, operation, i);
				returnData.push(...results);

				if (operation === 'getAll') {
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
