import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { hubspotApiRequest } from '../../../transport/HubSpotApiRequest';
import { validateFieldMapping, buildFieldNotFoundError } from '../../../transport/ValidationHelpers';
import { getNestedValue } from '../../../transport/NestedValueAccessor';

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
	items: INodeExecutionData[],
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
		case 'batchDelete':
			return await batchDeletePages(context, resource, items);
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
	const additionalFields = context.getNodeParameter('getAllAdditionalFields', i, {}) as IDataObject;

	const basePath = getBasePath(resource);

	const qs: IDataObject = {
		limit: returnAll ? 100 : limit,
	};

	if (additionalFields.archived !== undefined) qs.archived = additionalFields.archived;
	if (additionalFields.createdAfter) qs.createdAfter = additionalFields.createdAfter as string;
	if (additionalFields.createdBefore) qs.createdBefore = additionalFields.createdBefore as string;
	if (additionalFields.updatedAfter) qs.updatedAfter = additionalFields.updatedAfter as string;
	if (additionalFields.updatedBefore) qs.updatedBefore = additionalFields.updatedBefore as string;
	if (additionalFields.sort) qs.sort = additionalFields.sort as string;

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
	const publishDate = context.getNodeParameter('publishDate', i) as string;
	const basePath = getBasePath(resource);

	const body: IDataObject = {
		id: pageId,
		publishDate: new Date(publishDate).getTime(),
	};

	const response = await hubspotApiRequest.call(
		context,
		'POST',
		`${basePath}/schedule`,
		body,
	) as IDataObject;

	return { json: response };
}

async function batchDeletePages(
	context: IExecuteFunctions,
	resource: string,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const idField = context.getNodeParameter('idField', 0) as string;
	const basePath = getBasePath(resource);

	const validation = validateFieldMapping(items, idField);
	if (!validation.valid) {
		throw new Error(buildFieldNotFoundError(idField, validation.availableFields, 'IDs'));
	}
	if (validation.missingCount > 0) {
		context.logger.warn(
			`Field "${idField}" is missing in ${validation.missingCount} of ${items.length} input items.`,
		);
	}

	const inputs = items.map((item, index) => {
		const pageId = getNestedValue(item.json, idField);
		if (!pageId) {
			throw new Error(`Missing ID field "${idField}" in item ${index}`);
		}
		return String(pageId);
	});

	const batchSize = 100;
	const allResults: string[] = [];
	for (let i = 0; i < inputs.length; i += batchSize) {
		const batch = inputs.slice(i, i + batchSize);
		await hubspotApiRequest.call(
			context,
			'POST',
			`${basePath}/batch/archive`,
			{ inputs: batch },
		);
		batch.forEach((input) => allResults.push(input));
	}

	return allResults.map((id, index) => ({
		json: { success: true, id },
		pairedItem: { item: index },
	}));
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
