import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { hubspotApiRequest } from '../../../transport/HubSpotApiRequest';

const BASE_PATH = '/cms/v3/blogs/posts';

export async function executePostOperation(
	context: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<INodeExecutionData[]> {
	switch (operation) {
		case 'getAll':
			return getAllPosts(context, itemIndex);
		case 'get':
			return [await getPost(context, itemIndex)];
		case 'create':
			return [await createPost(context, itemIndex)];
		case 'update':
			return [await updatePost(context, itemIndex)];
		case 'delete':
			return [await deletePost(context, itemIndex)];
		case 'clone':
			return [await clonePost(context, itemIndex)];
		case 'schedule':
			return [await schedulePost(context, itemIndex)];
		case 'resetDraft':
			return [await resetDraftPost(context, itemIndex)];
		case 'getDraft':
			return [await getDraftPost(context, itemIndex)];
		case 'getRevisions':
			return getRevisions(context, itemIndex);
		case 'restoreRevision':
			return [await restoreRevision(context, itemIndex)];
		case 'batchDelete':
			return [await batchDeletePosts(context, itemIndex)];
		default:
			throw new Error(`Unknown post operation: ${operation}`);
	}
}

async function getAllPosts(
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

	if (filters.stateFilter) {
		const stateFilter = filters.stateFilter as string[];
		if (stateFilter.length > 0) {
			qs.state__in = stateFilter.join(',');
		}
	}
	if (filters.nameFilter) qs.name__icontains = filters.nameFilter as string;
	if (filters.contentGroupId) qs.contentGroupId = filters.contentGroupId as string;
	if (filters.blogAuthorId) qs.blogAuthorId = filters.blogAuthorId as string;
	if (filters.languageFilter) qs.language = filters.languageFilter as string;
	if (filters.tagIdFilter) {
		const tagIdFilter = filters.tagIdFilter as string[];
		if (tagIdFilter.length > 0) {
			qs.tagId__in = tagIdFilter.join(',');
		}
	}
	if (filters.createdAfter) qs.createdAt__gte = filters.createdAfter as string;
	if (filters.createdBefore) qs.createdAt__lte = filters.createdBefore as string;
	if (filters.updatedAfter) qs.updatedAt__gte = filters.updatedAfter as string;
	if (filters.updatedBefore) qs.updatedAt__lte = filters.updatedBefore as string;
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

async function getPost(
	context: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData> {
	const postId = context.getNodeParameter('postId', i) as string;

	const response = await hubspotApiRequest.call(
		context,
		'GET',
		`${BASE_PATH}/${postId}`,
	) as IDataObject;

	return { json: response };
}

async function createPost(
	context: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData> {
	const contentGroupId = context.getNodeParameter('contentGroupId', i) as string;
	const additionalFields = context.getNodeParameter('additionalFields', i, {}) as IDataObject;

	const body = buildPostBody(additionalFields);
	body.contentGroupId = contentGroupId;

	if (!body.name) {
		throw new Error('Name is required for creating a blog post');
	}

	const response = await hubspotApiRequest.call(
		context,
		'POST',
		BASE_PATH,
		body,
	) as IDataObject;

	return { json: response };
}

async function updatePost(
	context: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData> {
	const postId = context.getNodeParameter('postId', i) as string;
	const additionalFields = context.getNodeParameter('additionalFields', i, {}) as IDataObject;

	const body = buildPostBody(additionalFields);

	if (Object.keys(body).length === 0) {
		throw new Error('At least one field must be provided for update');
	}

	const response = await hubspotApiRequest.call(
		context,
		'PATCH',
		`${BASE_PATH}/${postId}`,
		body,
	) as IDataObject;

	return { json: response };
}

async function deletePost(
	context: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData> {
	const postId = context.getNodeParameter('postId', i) as string;

	const response = await hubspotApiRequest.call(
		context,
		'DELETE',
		`${BASE_PATH}/${postId}`,
	) as IDataObject;

	return { json: response };
}

async function clonePost(
	context: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData> {
	const sourcePostId = context.getNodeParameter('sourcePostId', i) as string;

	const body: IDataObject = {
		id: sourcePostId,
	};

	const response = await hubspotApiRequest.call(
		context,
		'POST',
		`${BASE_PATH}/clone`,
		body,
	) as IDataObject;

	return { json: response };
}

async function schedulePost(
	context: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData> {
	const postId = context.getNodeParameter('postId', i) as string;
	const additionalFields = context.getNodeParameter('additionalFields', i, {}) as IDataObject;

	if (!additionalFields.publishDate) {
		throw new Error('Publish Date is required for scheduling a blog post');
	}

	const body: IDataObject = {
		id: postId,
		publishDate: additionalFields.publishDate as string,
	};

	const response = await hubspotApiRequest.call(
		context,
		'POST',
		`${BASE_PATH}/schedule`,
		body,
	) as IDataObject;

	return { json: response };
}

async function resetDraftPost(
	context: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData> {
	const postId = context.getNodeParameter('postId', i) as string;

	const response = await hubspotApiRequest.call(
		context,
		'POST',
		`${BASE_PATH}/${postId}/draft/reset`,
	) as IDataObject;

	return { json: response };
}

async function getDraftPost(
	context: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData> {
	const postId = context.getNodeParameter('postId', i) as string;

	const response = await hubspotApiRequest.call(
		context,
		'GET',
		`${BASE_PATH}/${postId}/draft`,
	) as IDataObject;

	return { json: response };
}

async function getRevisions(
	context: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData[]> {
	const postId = context.getNodeParameter('postId', i) as string;

	const response = await hubspotApiRequest.call(
		context,
		'GET',
		`${BASE_PATH}/${postId}/revisions`,
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
	i: number,
): Promise<INodeExecutionData> {
	const postId = context.getNodeParameter('postId', i) as string;
	const revisionId = context.getNodeParameter('revisionId', i) as string;

	const response = await hubspotApiRequest.call(
		context,
		'POST',
		`${BASE_PATH}/${postId}/revisions/${revisionId}/restore`,
	) as IDataObject;

	return { json: response };
}

async function batchDeletePosts(
	context: IExecuteFunctions,
	i: number,
): Promise<INodeExecutionData> {
	const postIdsParam = context.getNodeParameter('postIds', i) as string;
	const postIds = postIdsParam.split(',').map((id) => id.trim()).filter((id) => id);

	if (postIds.length === 0) {
		throw new Error('At least one post ID must be provided');
	}

	const body: IDataObject = {
		inputs: postIds.map((id) => ({ id })),
	};

	const response = await hubspotApiRequest.call(
		context,
		'POST',
		`${BASE_PATH}/batch/archive`,
		body,
	) as IDataObject;

	return { json: response };
}

function buildPostBody(additionalFields: IDataObject): IDataObject {
	const body: IDataObject = {};

	if (additionalFields.name) body.name = additionalFields.name;
	if (additionalFields.slug) body.slug = additionalFields.slug;
	if (additionalFields.language) body.language = additionalFields.language;
	if (additionalFields.blogAuthorId) body.blogAuthorId = additionalFields.blogAuthorId;
	if (additionalFields.tagIds) body.tagIds = additionalFields.tagIds;
	if (additionalFields.htmlTitle) body.htmlTitle = additionalFields.htmlTitle;
	if (additionalFields.metaDescription) body.metaDescription = additionalFields.metaDescription;
	if (additionalFields.featuredImage) body.featuredImage = additionalFields.featuredImage;
	if (additionalFields.featuredImageAltText) body.featuredImageAltText = additionalFields.featuredImageAltText;
	if (additionalFields.postBody) body.postBody = additionalFields.postBody;
	if (additionalFields.postSummary) body.postSummary = additionalFields.postSummary;
	if (additionalFields.rssBody) body.rssBody = additionalFields.rssBody;
	if (additionalFields.rssSummary) body.rssSummary = additionalFields.rssSummary;
	if (additionalFields.useFeaturedImage !== undefined) body.useFeaturedImage = additionalFields.useFeaturedImage;
	if (additionalFields.campaign) body.campaign = additionalFields.campaign;
	if (additionalFields.layoutSections) body.layoutSections = additionalFields.layoutSections;
	if (additionalFields.state) body.state = additionalFields.state;

	return body;
}
