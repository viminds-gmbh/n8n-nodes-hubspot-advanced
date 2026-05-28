import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { hubspotApiRequest } from '../../../transport/HubSpotApiRequest';

export async function executeSearchOperation(
	context: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<INodeExecutionData[]> {
	switch (operation) {
		case 'search':
			return [await search(context, itemIndex)];
		case 'getIndexedData':
			return [await getIndexedData(context, itemIndex)];
		default:
			throw new Error(`Unknown site search operation: ${operation}`);
	}
}

async function search(
	context: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData> {
	const query = context.getNodeParameter('query', i) as string;
	const limit = context.getNodeParameter('limit', i, 10) as number;
	const contentType = context.getNodeParameter('contentType', i, []) as string[];
	const additionalOptions = context.getNodeParameter('additionalOptions', i, {}) as IDataObject;

	const qs: IDataObject = {
		q: query,
		limit,
	};

	if (contentType.length > 0) {
		qs.type = contentType;
	}
	if (additionalOptions.offset !== undefined) {
		qs.offset = additionalOptions.offset;
	}
	if (additionalOptions.domain) {
		qs.domain = additionalOptions.domain;
	}
	if (additionalOptions.language) {
		qs.language = additionalOptions.language;
	}
	if (additionalOptions.contentGroupId) {
		qs.contentGroupId = additionalOptions.contentGroupId;
	}
	if (additionalOptions.boostRecent) {
		qs.boostRecent = additionalOptions.boostRecent;
	}
	if (additionalOptions.boostBlogPosts !== undefined && additionalOptions.boostBlogPosts !== 1.0) {
		qs.boostBlogPosts = additionalOptions.boostBlogPosts;
	}
	if (additionalOptions.boostSitePages !== undefined && additionalOptions.boostSitePages !== 1.0) {
		qs.boostSitePages = additionalOptions.boostSitePages;
	}
	if (additionalOptions.boostLandingPages !== undefined && additionalOptions.boostLandingPages !== 1.0) {
		qs.boostLandingPages = additionalOptions.boostLandingPages;
	}
	if (additionalOptions.boostKnowledgeArticles !== undefined && additionalOptions.boostKnowledgeArticles !== 1.0) {
		qs.boostKnowledgeArticles = additionalOptions.boostKnowledgeArticles;
	}
	if (additionalOptions.boostListings !== undefined && additionalOptions.boostListings !== 1.0) {
		qs.boostListings = additionalOptions.boostListings;
	}
	if (additionalOptions.groupId && Array.isArray(additionalOptions.groupId) && additionalOptions.groupId.length > 0) {
		qs.groupId = additionalOptions.groupId;
	}
	if (additionalOptions.tableId) {
		qs.tableId = additionalOptions.tableId;
	}
	if (additionalOptions.hubdbQuery) {
		qs.hubdbQuery = additionalOptions.hubdbQuery;
	}
	if (additionalOptions.pathPrefix) {
		qs.pathPrefix = additionalOptions.pathPrefix;
	}
	if (additionalOptions.matchPrefix !== undefined && additionalOptions.matchPrefix !== true) {
		qs.matchPrefix = additionalOptions.matchPrefix;
	}

	const response = await hubspotApiRequest.call(
		context,
		'GET',
		'/cms/v3/site-search/search',
		{},
		qs,
	);

	return { json: response as IDataObject };
}

async function getIndexedData(
	context: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData> {
	const contentId = context.getNodeParameter('contentId', i) as string;
	const contentType = context.getNodeParameter('contentType', i) as string;

	const response = await hubspotApiRequest.call(
		context,
		'GET',
		`/cms/v3/site-search/indexed-data/${contentId}`,
		{},
		{ type: contentType },
	);

	return { json: response as IDataObject };
}
