import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { hubspotApiRequest } from '../../../transport/HubSpotApiRequest';
import type { RedirectData } from '../types';

export async function executeRedirectOperation(
	context: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<INodeExecutionData[]> {
	switch (operation) {
		case 'search':
			return await searchRedirects(context, itemIndex);
		case 'get':
			return [await getRedirect(context, itemIndex)];
		case 'create':
			return [await createRedirect(context, itemIndex)];
		case 'update':
			return [await updateRedirect(context, itemIndex)];
		case 'delete':
			return [await deleteRedirect(context, itemIndex)];
		default:
			throw new Error(`Unknown redirect operation: ${operation}`);
	}
}

async function searchRedirects(
	context: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData[]> {
	const returnAll = context.getNodeParameter('returnAll', i) as boolean;
	const limit = context.getNodeParameter('limit', i, 100) as number;
	const offset = context.getNodeParameter('offset', i, 0) as number;
	const filters = context.getNodeParameter('filters', i, {}) as IDataObject;

	const qs: IDataObject = {};

	if (!returnAll) {
		qs.limit = limit;
		qs.offset = offset;
	}

	const filterValues = filters.filterValues as IDataObject | undefined;
	if (filterValues) {
		if (filterValues.routePrefixFilter) {
			qs.routePrefix = filterValues.routePrefixFilter;
		}
		if (filterValues.destinationFilter) {
			qs.destination = filterValues.destinationFilter;
		}
		if (filterValues.redirectStyleFilter) {
			qs.redirectStyle = filterValues.redirectStyleFilter;
		}
		if (filterValues.createdAfter) {
			qs.createdAfter = filterValues.createdAfter;
		}
		if (filterValues.createdBefore) {
			qs.createdBefore = filterValues.createdBefore;
		}
		if (filterValues.updatedAfter) {
			qs.updatedAfter = filterValues.updatedAfter;
		}
		if (filterValues.updatedBefore) {
			qs.updatedBefore = filterValues.updatedBefore;
		}
		if (filterValues.sort) {
			qs.sort = filterValues.sort;
		}
	}

	if (returnAll) {
		const results: IDataObject[] = [];
		let currentOffset = 0;
		let hasMore = true;

		while (hasMore) {
			const pageQs: IDataObject = { ...qs, limit: 100, offset: currentOffset };
			const response = await hubspotApiRequest.call(
				context,
				'GET',
				'/cms/v3/url-redirects',
				{},
				pageQs,
			) as IDataObject;

			if (response.results && Array.isArray(response.results)) {
				results.push(...(response.results as IDataObject[]));
			}

			const total = response.total as number | undefined;
			hasMore = total ? currentOffset + 100 < total : false;
			currentOffset += 100;
		}

		return results.map((result) => ({ json: result }));
	}

	const response = await hubspotApiRequest.call(
		context,
		'GET',
		'/cms/v3/url-redirects',
		{},
		qs,
	) as IDataObject;

	const results: INodeExecutionData[] = [];
	if (response.results && Array.isArray(response.results)) {
		for (const redirect of response.results as IDataObject[]) {
			results.push({ json: redirect });
		}
	}

	return results;
}

async function getRedirect(
	context: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData> {
	const redirectId = context.getNodeParameter('redirectId', i) as string;

	const response = await hubspotApiRequest.call(
		context,
		'GET',
		`/cms/v3/url-redirects/${redirectId}`,
	) as IDataObject;

	return { json: response };
}

async function createRedirect(
	context: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData> {
	const routePrefix = context.getNodeParameter('routePrefix', i) as string;
	const destination = context.getNodeParameter('destination', i) as string;
	const redirectStyle = context.getNodeParameter('redirectStyle', i) as string;
	const isMatchFullUrl = context.getNodeParameter('isMatchFullUrl', i, false) as boolean;
	const isMatchQueryString = context.getNodeParameter('isMatchQueryString', i, false) as boolean;
	const isOnlyAfterNotFound = context.getNodeParameter('isOnlyAfterNotFound', i, false) as boolean;
	const isPattern = context.getNodeParameter('isPattern', i, false) as boolean;
	const isProtocolRelative = context.getNodeParameter('isProtocolRelative', i, false) as boolean;
	const isTrailingSlashOptional = context.getNodeParameter('isTrailingSlashOptional', i, false) as boolean;
	const precedence = context.getNodeParameter('precedence', i, 0) as number;

	const body: RedirectData = {
		routePrefix,
		destination,
		redirectStyle: redirectStyle as RedirectData['redirectStyle'],
		isMatchFullUrl,
		isMatchQueryString,
		isOnlyAfterNotFound,
		isPattern,
		isProtocolRelative,
		isTrailingSlashOptional,
		precedence,
	};

	const response = await hubspotApiRequest.call(
		context,
		'POST',
		'/cms/v3/url-redirects/',
		body,
	) as IDataObject;

	return { json: response };
}

async function updateRedirect(
	context: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData> {
	const redirectId = context.getNodeParameter('redirectId', i) as string;

	const body: RedirectData = {};

	const routePrefix = context.getNodeParameter('routePrefix', i, '') as string;
	if (routePrefix) body.routePrefix = routePrefix;

	const destination = context.getNodeParameter('destination', i, '') as string;
	if (destination) body.destination = destination;

	const redirectStyle = context.getNodeParameter('redirectStyle', i, '') as string;
	if (redirectStyle) body.redirectStyle = redirectStyle as RedirectData['redirectStyle'];

	const isMatchFullUrl = context.getNodeParameter('isMatchFullUrl', i, false) as boolean;
	if (isMatchFullUrl !== undefined) body.isMatchFullUrl = isMatchFullUrl;

	const isMatchQueryString = context.getNodeParameter('isMatchQueryString', i, false) as boolean;
	if (isMatchQueryString !== undefined) body.isMatchQueryString = isMatchQueryString;

	const isOnlyAfterNotFound = context.getNodeParameter('isOnlyAfterNotFound', i, false) as boolean;
	if (isOnlyAfterNotFound !== undefined) body.isOnlyAfterNotFound = isOnlyAfterNotFound;

	const isPattern = context.getNodeParameter('isPattern', i, false) as boolean;
	if (isPattern !== undefined) body.isPattern = isPattern;

	const isProtocolRelative = context.getNodeParameter('isProtocolRelative', i, false) as boolean;
	if (isProtocolRelative !== undefined) body.isProtocolRelative = isProtocolRelative;

	const isTrailingSlashOptional = context.getNodeParameter('isTrailingSlashOptional', i, false) as boolean;
	if (isTrailingSlashOptional !== undefined) body.isTrailingSlashOptional = isTrailingSlashOptional;

	const precedence = context.getNodeParameter('precedence', i, 0) as number;
	if (precedence !== undefined) body.precedence = precedence;

	const response = await hubspotApiRequest.call(
		context,
		'PATCH',
		`/cms/v3/url-redirects/${redirectId}`,
		body,
	) as IDataObject;

	return { json: response };
}

async function deleteRedirect(
	context: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData> {
	const redirectId = context.getNodeParameter('redirectId', i) as string;

	const response = await hubspotApiRequest.call(
		context,
		'DELETE',
		`/cms/v3/url-redirects/${redirectId}`,
	) as IDataObject;

	return { json: response };
}
