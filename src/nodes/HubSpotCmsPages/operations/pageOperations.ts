import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { hubspotApiRequest } from '../../../transport/HubSpotApiRequest';

function getBasePath(resource: string): string {
	return resource === 'sitePage'
		? '/cms/v3/pages/site-pages'
		: '/cms/v3/pages/landing-pages';
}

export async function executePageOperation(
	context: IExecuteFunctions,
	resource: string,
	operation: string,
	itemIndex: number,
): Promise<INodeExecutionData[]> {
	switch (operation) {
		case 'getAll':
			return getAllPages(context, resource, itemIndex);
		case 'get':
			return [await getPage(context, resource, itemIndex)];
		case 'create':
			return [await createPage(context, resource, itemIndex)];
		case 'update':
			return [await updatePage(context, resource, itemIndex)];
		case 'delete':
			return [await deletePage(context, resource, itemIndex)];
		case 'clone':
			return [await clonePage(context, resource, itemIndex)];
		case 'publish':
			return [await publishPage(context, resource, itemIndex)];
		case 'schedule':
			return [await schedulePage(context, resource, itemIndex)];
		case 'resetDraft':
			return [await resetDraftPage(context, resource, itemIndex)];
		case 'getDraft':
			return [await getDraftPage(context, resource, itemIndex)];
		case 'getRevisions':
			return getRevisions(context, resource, itemIndex);
		case 'restoreRevision':
			return [await restoreRevision(context, resource, itemIndex)];
		case 'batchDelete':
			return [await batchDeletePages(context, resource, itemIndex)];
		default:
			throw new Error(`Unknown page operation: ${operation}`);
	}
}

async function getAllPages(
	context: IExecuteFunctions,
	resource: string,
	i: number,
): Promise<INodeExecutionData[]> {
	const returnAll = context.getNodeParameter('returnAll', i) as boolean;
	const limit = context.getNodeParameter('limit', i, 100) as number;
	const offset = context.getNodeParameter('offset', i, 0) as number;
	const filters = context.getNodeParameter('filters', i, {}) as IDataObject;

	const basePath = getBasePath(resource);

	const qs: IDataObject = {
		limit: returnAll ? 100 : limit,
		offset,
	};

	if (filters.stateFilter) {
		const stateFilter = filters.stateFilter as string[];
		if (stateFilter.length > 0) {
			qs.state__in = stateFilter.join(',');
		}
	}
	if (filters.nameFilter) qs.name__contains = filters.nameFilter as string;
	if (filters.domainFilter) {
		const domainFilter = filters.domainFilter as string[];
		if (domainFilter.length > 0) {
			qs.domain__in = domainFilter.join(',');
		}
	}
	if (filters.languageFilter) qs.language = filters.languageFilter as string;
	if (filters.createdAfter) qs.createdAfter = filters.createdAfter as string;
	if (filters.createdBefore) qs.createdBefore = filters.createdBefore as string;
	if (filters.updatedAfter) qs.updatedAfter = filters.updatedAfter as string;
	if (filters.updatedBefore) qs.updatedBefore = filters.updatedBefore as string;
	if (filters.sort) qs.sort = filters.sort as string;

	const response = await hubspotApiRequest.call(
		context,
		'GET',
		basePath,
		{},
		qs,
	) as IDataObject;

	const results: INodeExecutionData[] = [];
	if (response.results && Array.isArray(response.results)) {
		for (const item of response.results as IDataObject[]) {
			results.push({ json: item });
		}
	}

	return results;
}

async function getPage(
	context: IExecuteFunctions,
	resource: string,
	i: number,
): Promise<INodeExecutionData> {
	const pageId = context.getNodeParameter('pageId', i) as string;
	const basePath = getBasePath(resource);

	const response = await hubspotApiRequest.call(
		context,
		'GET',
		`${basePath}/${pageId}`,
	) as IDataObject;

	return { json: response };
}

async function createPage(
	context: IExecuteFunctions,
	resource: string,
	i: number,
): Promise<INodeExecutionData> {
	const name = context.getNodeParameter('name', i) as string;
	const templatePath = context.getNodeParameter('templatePath', i) as string;
	const additionalFields = context.getNodeParameter('additionalFields', i, {}) as IDataObject;
	const basePath = getBasePath(resource);

	const body = buildPageBody(additionalFields);
	body.name = name;
	body.templatePath = templatePath;

	const response = await hubspotApiRequest.call(
		context,
		'POST',
		basePath,
		body,
	) as IDataObject;

	return { json: response };
}

async function updatePage(
	context: IExecuteFunctions,
	resource: string,
	i: number,
): Promise<INodeExecutionData> {
	const pageId = context.getNodeParameter('pageId', i) as string;
	const additionalFields = context.getNodeParameter('additionalFields', i, {}) as IDataObject;
	const basePath = getBasePath(resource);

	const body = buildPageBody(additionalFields);

	if (Object.keys(body).length === 0) {
		throw new Error('At least one field must be provided for update');
	}

	const response = await hubspotApiRequest.call(
		context,
		'PATCH',
		`${basePath}/${pageId}/draft`,
		body,
	) as IDataObject;

	return { json: response };
}

async function deletePage(
	context: IExecuteFunctions,
	resource: string,
	i: number,
): Promise<INodeExecutionData> {
	const pageId = context.getNodeParameter('pageId', i) as string;
	const basePath = getBasePath(resource);

	const response = await hubspotApiRequest.call(
		context,
		'DELETE',
		`${basePath}/${pageId}`,
	) as IDataObject;

	return { json: response };
}

async function clonePage(
	context: IExecuteFunctions,
	resource: string,
	i: number,
): Promise<INodeExecutionData> {
	const sourcePageId = context.getNodeParameter('sourcePageId', i) as string;
	const basePath = getBasePath(resource);

	const body: IDataObject = {
		id: sourcePageId,
	};

	const response = await hubspotApiRequest.call(
		context,
		'POST',
		`${basePath}/clone`,
		body,
	) as IDataObject;

	return { json: response };
}

async function publishPage(
	context: IExecuteFunctions,
	resource: string,
	i: number,
): Promise<INodeExecutionData> {
	const pageId = context.getNodeParameter('pageId', i) as string;
	const basePath = getBasePath(resource);

	const response = await hubspotApiRequest.call(
		context,
		'POST',
		`${basePath}/${pageId}/draft/publish`,
	) as IDataObject;

	return { json: response };
}

async function schedulePage(
	context: IExecuteFunctions,
	resource: string,
	i: number,
): Promise<INodeExecutionData> {
	const pageId = context.getNodeParameter('pageId', i) as string;
	const additionalFields = context.getNodeParameter('additionalFields', i, {}) as IDataObject;
	const basePath = getBasePath(resource);

	if (!additionalFields.publishDate) {
		throw new Error('Publish Date is required for scheduling a page');
	}

	const body: IDataObject = {
		id: pageId,
		publishDate: additionalFields.publishDate as string,
	};

	const response = await hubspotApiRequest.call(
		context,
		'POST',
		`${basePath}/schedule`,
		body,
	) as IDataObject;

	return { json: response };
}

async function resetDraftPage(
	context: IExecuteFunctions,
	resource: string,
	i: number,
): Promise<INodeExecutionData> {
	const pageId = context.getNodeParameter('pageId', i) as string;
	const basePath = getBasePath(resource);

	const response = await hubspotApiRequest.call(
		context,
		'POST',
		`${basePath}/${pageId}/draft/reset`,
	) as IDataObject;

	return { json: response };
}

async function getDraftPage(
	context: IExecuteFunctions,
	resource: string,
	i: number,
): Promise<INodeExecutionData> {
	const pageId = context.getNodeParameter('pageId', i) as string;
	const basePath = getBasePath(resource);

	const response = await hubspotApiRequest.call(
		context,
		'GET',
		`${basePath}/${pageId}/draft`,
	) as IDataObject;

	return { json: response };
}

async function getRevisions(
	context: IExecuteFunctions,
	resource: string,
	i: number,
): Promise<INodeExecutionData[]> {
	const pageId = context.getNodeParameter('pageId', i) as string;
	const basePath = getBasePath(resource);

	const response = await hubspotApiRequest.call(
		context,
		'GET',
		`${basePath}/${pageId}/revisions`,
	) as IDataObject;

	const results: INodeExecutionData[] = [];
	if (response.results && Array.isArray(response.results)) {
		for (const item of response.results as IDataObject[]) {
			results.push({ json: item });
		}
	}

	return results;
}

async function restoreRevision(
	context: IExecuteFunctions,
	resource: string,
	i: number,
): Promise<INodeExecutionData> {
	const pageId = context.getNodeParameter('pageId', i) as string;
	const revisionId = context.getNodeParameter('revisionId', i) as string;
	const basePath = getBasePath(resource);

	const response = await hubspotApiRequest.call(
		context,
		'POST',
		`${basePath}/${pageId}/revisions/${revisionId}/restore`,
	) as IDataObject;

	return { json: response };
}

async function batchDeletePages(
	context: IExecuteFunctions,
	resource: string,
	i: number,
): Promise<INodeExecutionData> {
	const pageIdsParam = context.getNodeParameter('pageIds', i) as string;
	const pageIds = pageIdsParam.split(',').map((id) => id.trim()).filter((id) => id);
	const basePath = getBasePath(resource);

	if (pageIds.length === 0) {
		throw new Error('At least one page ID must be provided');
	}

	const body: IDataObject = {
		inputs: pageIds.map((id) => ({ id })),
	};

	const response = await hubspotApiRequest.call(
		context,
		'POST',
		`${basePath}/batch/archive`,
		body,
	) as IDataObject;

	return { json: response };
}

function buildPageBody(additionalFields: IDataObject): IDataObject {
	const body: IDataObject = {};

	if (additionalFields.name) body.name = additionalFields.name;
	if (additionalFields.templatePath) body.templatePath = additionalFields.templatePath;
	if (additionalFields.slug) body.slug = additionalFields.slug;
	if (additionalFields.domain) body.domain = additionalFields.domain;
	if (additionalFields.language) body.language = additionalFields.language;
	if (additionalFields.htmlTitle) body.htmlTitle = additionalFields.htmlTitle;
	if (additionalFields.metaDescription) body.metaDescription = additionalFields.metaDescription;
	if (additionalFields.featuredImage) body.featuredImage = additionalFields.featuredImage;
	if (additionalFields.campaign) body.campaign = additionalFields.campaign;
	if (additionalFields.layoutSections) body.layoutSections = additionalFields.layoutSections;
	if (additionalFields.attachedStylesheets) body.attachedStylesheets = additionalFields.attachedStylesheets;
	if (additionalFields.publicAccessRulesEnabled !== undefined) body.publicAccessRulesEnabled = additionalFields.publicAccessRulesEnabled;
	if (additionalFields.publicAccessRules) body.publicAccessRules = additionalFields.publicAccessRules;
	if (additionalFields.state) body.state = additionalFields.state;

	return body;
}
