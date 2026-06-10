import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
	INodePropertyOptions,
	IDataObject,
} from 'n8n-workflow';
import { hubspotApiRequestForLoadOptions, buildErrorItem, type HubSpotError } from '../../transport/HubSpotApiRequest';
import { redirectFields } from './descriptions';
import { executeRedirectOperation } from './operations';

export class HubSpotCmsRedirects implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'HubSpot CMS Redirects',
		name: 'hubSpotCmsRedirects',
		icon: 'file:../../icon.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": Redirect"}}',
		description: 'Manage HubSpot CMS URL redirects',
		defaults: {
			name: 'HubSpot CMS Redirects',
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
		properties: redirectFields,
	};

	methods = {
		loadOptions: {
			async getRedirects(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const options: INodePropertyOptions[] = [];
				let offset = 0;
				let hasMore = true;

				while (hasMore) {
					const response = await hubspotApiRequestForLoadOptions.call(
						this,
						'GET',
						'/cms/v3/url-redirects',
						{},
						{ limit: 100, offset },
					) as IDataObject;

					if (response.results && Array.isArray(response.results)) {
						for (const redirect of response.results as IDataObject[]) {
							options.push({
								name: `${redirect.routePrefix as string} → ${redirect.destination as string}`,
								value: redirect.id as string,
							});
						}
					}

					const total = response.total as number | undefined;
					offset += 100;
					hasMore = total ? offset < total : false;
				}

				options.sort((a, b) => a.name.localeCompare(b.name));

				return options;
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				const results = await executeRedirectOperation(this, operation, i);
				returnData.push(...results);

				if (operation === 'search') {
					break;
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push(buildErrorItem(error as HubSpotError, i, this.getNode()));
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
