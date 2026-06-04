import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { hubspotApiRequest } from '../../../transport/HubSpotApiRequest';

const BASE_PATH = '/cms/v3/blogs/tags';

export async function executeTagOperation(
	context: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<INodeExecutionData[]> {
	switch (operation) {
		case 'getAll':
			return getAllTags(context, itemIndex);
		case 'get':
			return [await getTag(context, itemIndex)];
		case 'create':
			return [await createTag(context, itemIndex)];
		case 'update':
			return [await updateTag(context, itemIndex)];
		case 'delete':
			return [await deleteTag(context, itemIndex)];
		case 'batchDelete':
			return [await batchDeleteTags(context, itemIndex)];
		default:
			throw new Error(`Unknown tag operation: ${operation}`);
	}
}

async function getAllTags(
	context: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData[]> {
	const returnAll = context.getNodeParameter('returnAll', i) as boolean;
	const limit = context.getNodeParameter('limit', i, 100) as number;
	const offset = context.getNodeParameter('offset', i, 0) as number;
	const filters = context.getNodeParameter('filters', i, {}) as IDataObject;

	const qs: IDataObject = {
		limit: returnAll ? 100 : limit,
		offset,
	};

	if (filters.nameFilter) qs.name__icontains = filters.nameFilter as string;
	if (filters.languageFilter) qs.language = filters.languageFilter as string;
	if (filters.createdAfter) qs.createdAt__gte = filters.createdAfter as string;
	if (filters.updatedAfter) qs.updatedAt__gte = filters.updatedAfter as string;
	if (filters.sort) qs.sort = filters.sort as string;

	const response = await hubspotApiRequest.call(
		context,
		'GET',
		BASE_PATH,
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

async function getTag(
	context: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData> {
	const tagId = context.getNodeParameter('tagId', i) as string;

	const response = await hubspotApiRequest.call(
		context,
		'GET',
		`${BASE_PATH}/${tagId}`,
	) as IDataObject;

	return { json: response };
}

async function createTag(
	context: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData> {
	const additionalFields = context.getNodeParameter('additionalFields', i, {}) as IDataObject;

	const body = buildTagBody(additionalFields);

	if (!body.name) {
		throw new Error('Name is required for creating a blog tag');
	}

	const response = await hubspotApiRequest.call(
		context,
		'POST',
		BASE_PATH,
		body,
	) as IDataObject;

	return { json: response };
}

async function updateTag(
	context: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData> {
	const tagId = context.getNodeParameter('tagId', i) as string;
	const additionalFields = context.getNodeParameter('additionalFields', i, {}) as IDataObject;

	const body = buildTagBody(additionalFields);

	if (Object.keys(body).length === 0) {
		throw new Error('At least one field must be provided for update');
	}

	const response = await hubspotApiRequest.call(
		context,
		'PATCH',
		`${BASE_PATH}/${tagId}`,
		body,
	) as IDataObject;

	return { json: response };
}

async function deleteTag(
	context: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData> {
	const tagId = context.getNodeParameter('tagId', i) as string;

	const response = await hubspotApiRequest.call(
		context,
		'DELETE',
		`${BASE_PATH}/${tagId}`,
	) as IDataObject;

	return { json: response };
}

async function batchDeleteTags(
	context: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData> {
	const tagIdsParam = context.getNodeParameter('tagIds', i) as string;
	const tagIds = tagIdsParam.split(',').map((id) => id.trim()).filter((id) => id);

	if (tagIds.length === 0) {
		throw new Error('At least one tag ID must be provided');
	}

	const body: IDataObject = {
		inputs: tagIds.map((id) => ({ id })),
	};

	const response = await hubspotApiRequest.call(
		context,
		'POST',
		`${BASE_PATH}/batch/archive`,
		body,
	) as IDataObject;

	return { json: response };
}

function buildTagBody(additionalFields: IDataObject): IDataObject {
	const body: IDataObject = {};

	if (additionalFields.name) body.name = additionalFields.name;
	if (additionalFields.slug) body.slug = additionalFields.slug;
	if (additionalFields.language) body.language = additionalFields.language;

	return body;
}
