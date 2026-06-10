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
import { blogFields } from './descriptions';
import { executePostOperation, executeTagOperation } from './operations';

export class HubSpotCmsBlog implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'HubSpot CMS Blog',
		name: 'hubSpotCmsBlog',
		icon: 'file:../../icon.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + ($parameter["resource"] === "post" ? "Blog Post" : "Blog Tag")}}',
		description: 'Interact with HubSpot CMS Blog API (Posts and Tags)',
		defaults: {
			name: 'HubSpot CMS Blog',
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
		properties: blogFields,
	};

	methods = {
		loadOptions: {
			async getBlogPosts(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await hubspotApiRequestForLoadOptions.call(
					this,
					'GET',
					'/cms/v3/blogs/posts',
				) as IDataObject;

				const options: INodePropertyOptions[] = [];
				if (response.results && Array.isArray(response.results)) {
					for (const post of response.results as IDataObject[]) {
						options.push({
							name: post.name as string,
							value: post.id as string,
						});
					}
				}

				return options;
			},

			async getBlogTags(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await hubspotApiRequestForLoadOptions.call(
					this,
					'GET',
					'/cms/v3/blogs/tags',
				) as IDataObject;

				const options: INodePropertyOptions[] = [];
				if (response.results && Array.isArray(response.results)) {
					for (const tag of response.results as IDataObject[]) {
						options.push({
							name: tag.name as string,
							value: tag.id as string,
						});
					}
				}

				return options;
			},

			async getBlogs(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const credentials = await this.getCredentials('hubspotAppToken');
				const credentialId = (credentials.appToken as string).slice(-8);

				const cache = PropertyCache.getInstance();
				const cacheKey = 'cms_blogs';
				const cached = cache.get(cacheKey, credentialId);
				if (cached) {
					return cached;
				}

				const response = await hubspotApiRequestForLoadOptions.call(
					this,
					'GET',
					'/cms/v3/blog-settings/settings',
				) as IDataObject;

				const options: INodePropertyOptions[] = [];
				if (response.results && Array.isArray(response.results)) {
					for (const blog of response.results as IDataObject[]) {
						options.push({
							name: blog.name as string,
							value: blog.id as string,
						});
					}
				}

				cache.set(cacheKey, options, credentialId);
				return options;
			},

			async getAuthors(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const credentials = await this.getCredentials('hubspotAppToken');
				const credentialId = (credentials.appToken as string).slice(-8);

				const cache = PropertyCache.getInstance();
				const cacheKey = 'cms_blog_authors';
				const cached = cache.get(cacheKey, credentialId);
				if (cached) {
					return cached;
				}

				const response = await hubspotApiRequestForLoadOptions.call(
					this,
					'GET',
					'/cms/v3/blogs/authors',
				) as IDataObject;

				const options: INodePropertyOptions[] = [];
				if (response.results && Array.isArray(response.results)) {
					for (const author of response.results as IDataObject[]) {
						options.push({
							name: author.fullName as string || author.email as string || author.id as string,
							value: author.id as string,
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
				if (resource === 'post') {
					const results = await executePostOperation(this, operation, i);
					returnData.push(...results);

					if (operation === 'getAll') {
						break;
					}
				} else if (resource === 'tag') {
					const results = await executeTagOperation(this, operation, i);
					returnData.push(...results);

					if (operation === 'getAll') {
						break;
					}
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
