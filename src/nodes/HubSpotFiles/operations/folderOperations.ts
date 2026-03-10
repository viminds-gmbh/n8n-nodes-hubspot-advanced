import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { hubspotApiRequest } from '../../../transport/HubSpotApiRequest';

export async function executeFolderOperation(
	context: IExecuteFunctions,
	operation: string,
	itemIndex: number
): Promise<INodeExecutionData> {
	switch (operation) {
		case 'get':
			return getFolder(context, itemIndex);
		case 'search':
			return searchFolders(context, itemIndex);
		case 'create':
			return createFolder(context, itemIndex);
		case 'update':
			return updateFolder(context, itemIndex);
		case 'delete':
			return deleteFolder(context, itemIndex);
		default:
			throw new Error(`Unknown folder operation: ${operation}`);
	}
}

async function getFolder(context: IExecuteFunctions, i: number): Promise<INodeExecutionData> {
	const folderIdentifier = context.getNodeParameter('folderIdentifier', i) as string;

	const isPath = folderIdentifier.startsWith('/');
	const endpoint = isPath
		? `/files/v3/folders/${encodeURIComponent(folderIdentifier)}`
		: `/files/v3/folders/${folderIdentifier}`;

	const response = await hubspotApiRequest.call(
		context,
		'GET',
		endpoint
	) as IDataObject;

	return {
		json: (response.data as IDataObject) || response,
		pairedItem: { item: i }
	};
}

async function searchFolders(context: IExecuteFunctions, i: number): Promise<INodeExecutionData> {
	const name = context.getNodeParameter('name', i, '') as string;
	const limit = context.getNodeParameter('limit', i, 20) as number;

	const queryParams: Record<string, string | number> = {
		limit: Math.min(limit, 100)
	};

	if (name) queryParams.name = name;

	const response = await hubspotApiRequest.call(
		context,
		'GET',
		'/files/v3/folders/search',
		{},
		queryParams
	) as IDataObject;

	return {
		json: (response.data as IDataObject) || response,
		pairedItem: { item: i }
	};
}

async function createFolder(context: IExecuteFunctions, i: number): Promise<INodeExecutionData> {
	const folderPath = context.getNodeParameter('folderPath', i) as string;
	const folderName = context.getNodeParameter('folderName', i) as string;
	const parentFolderId = context.getNodeParameter('parentFolderId', i, '') as string;

	const body: Record<string, string> = {
		name: folderName,
		path: folderPath
	};

	if (parentFolderId) body.parentFolderId = parentFolderId;

	const response = await hubspotApiRequest.call(
		context,
		'POST',
		'/files/v3/folders',
		body
	) as IDataObject;

	return {
		json: (response.data as IDataObject) || response,
		pairedItem: { item: i }
	};
}

async function updateFolder(context: IExecuteFunctions, i: number): Promise<INodeExecutionData> {
	const folderId = context.getNodeParameter('folderId', i) as string;
	const updateFolderName = context.getNodeParameter('updateFolderName', i, '') as string;
	const updateFolderParentId = context.getNodeParameter('updateFolderParentId', i, '') as string;

	const body: Record<string, string> = {};
	if (updateFolderName) body.name = updateFolderName;
	if (updateFolderParentId) body.parentFolderId = updateFolderParentId;

	if (Object.keys(body).length === 0) {
		throw new Error('At least one property must be specified for update');
	}

	const response = await hubspotApiRequest.call(
		context,
		'PATCH',
		`/files/v3/folders/${folderId}`,
		body
	) as IDataObject;

	return {
		json: (response.data as IDataObject) || response,
		pairedItem: { item: i }
	};
}

async function deleteFolder(context: IExecuteFunctions, i: number): Promise<INodeExecutionData> {
	const folderId = context.getNodeParameter('folderId', i) as string;

	const response = await hubspotApiRequest.call(
		context,
		'DELETE',
		`/files/v3/folders/${folderId}`
	) as IDataObject;

	return {
		json: (response.data as IDataObject) || response,
		pairedItem: { item: i }
	};
}
