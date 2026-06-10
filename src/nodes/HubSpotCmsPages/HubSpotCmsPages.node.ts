import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
	INodePropertyOptions,
	IDataObject,
} from 'n8n-workflow';

import { hubspotApiRequestForLoadOptions, hubspotApiRequestAllItemsForLoadOptions, buildErrorItem, type HubSpotError } from '../../transport/HubSpotApiRequest';
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
			async getPages(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const resource = this.getNodeParameter('resource') as string;
				const basePath = resource === 'sitePage'
					? '/cms/v3/pages/site-pages'
					: '/cms/v3/pages/landing-pages';

				const pages = await hubspotApiRequestAllItemsForLoadOptions.call(
					this,
					'GET',
					basePath,
					{ property: 'name,id,state', limit: 100 },
				);

				const options: INodePropertyOptions[] = [];
				for (const page of pages) {
					options.push({
						name: `${page.name || page.id}`,
						description: page.state ? String(page.state) : '',
						value: page.id as string,
					});
				}
				options.sort((a, b) => (a.name as string).localeCompare(b.name as string));
				return options;
			},

			async getPageTemplates(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const credentials = await this.getCredentials('hubspotAppToken');
				const credentialId = (credentials.appToken as string).slice(-8);

				const cache = PropertyCache.getInstance();
				const cacheKey = 'cms_page_templates';
				const cached = cache.get(cacheKey, credentialId);
				if (cached) return cached;

				const response = await hubspotApiRequestForLoadOptions.call(
					this,
					'GET',
					'/content/api/v2/templates',
					{},
					{ limit: 500 },
				) as IDataObject;

				const options: INodePropertyOptions[] = [];
				if (response.objects && Array.isArray(response.objects)) {
					for (const tpl of response.objects as IDataObject[]) {
						if (tpl.category_id !== 1) continue;
						if (tpl.path) {
							options.push({
								name: (tpl.label || tpl.path) as string,
								value: tpl.path as string,
								description: tpl.path as string,
							});
						}
					}
				}
				options.sort((a, b) => (a.name as string).localeCompare(b.name as string));
				cache.set(cacheKey, options, credentialId);
				return options;
			},

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

		if (operation === 'batchDelete') {
			try {
				const results = await executePageOperation(this, resource, operation, 0, items);
				returnData.push(...results);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push(buildErrorItem(error as HubSpotError));
				} else {
					throw error;
				}
			}
		} else {
			for (let i = 0; i < items.length; i++) {
				try {
					const results = await executePageOperation(this, resource, operation, i, items);
					returnData.push(...results);

					if (operation === 'getAll') {
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
		}

		return [returnData];
	}
}
