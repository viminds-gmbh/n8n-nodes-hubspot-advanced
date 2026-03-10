import type { IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { hubspotApiRequest, hubspotFileUploadRequest, hubspotFileReplaceRequest } from '../../../transport/HubSpotApiRequest';
import type { BinaryUploadData, AccessLevel } from '../types';

async function getBinaryDataForUpload(
	context: IExecuteFunctions,
	items: INodeExecutionData[],
	i: number,
	binaryPropertyName: string,
	customFileName?: string
): Promise<BinaryUploadData> {
	const itemBinaryData = items[i].binary;
	if (!itemBinaryData || !itemBinaryData[binaryPropertyName]) {
		throw new Error(`No binary data found in property "${binaryPropertyName}"`);
	}

	const binaryData = itemBinaryData[binaryPropertyName];
	const originalFileName = binaryData.fileName || 'file';
	const finalFileName = customFileName || originalFileName;
	const buffer = await context.helpers.getBinaryDataBuffer(i, binaryPropertyName);

	return {
		buffer,
		fileName: finalFileName,
		mimeType: binaryData.mimeType,
		binaryData
	};
}

export async function executeFileOperation(
	context: IExecuteFunctions,
	operation: string,
	items: INodeExecutionData[],
	itemIndex: number
): Promise<INodeExecutionData> {
	switch (operation) {
		case 'upload':
			return uploadFile(context, items, itemIndex);
		case 'get':
			return getFile(context, itemIndex);
		case 'search':
			return searchFiles(context, itemIndex);
		case 'importUrl':
			return importFromUrl(context, itemIndex);
		case 'replace':
			return replaceFile(context, items, itemIndex);
		case 'updateProperties':
			return updateFileProperties(context, itemIndex);
		case 'delete':
			return deleteFile(context, itemIndex);
		default:
			throw new Error(`Unknown file operation: ${operation}`);
	}
}

async function uploadFile(
	context: IExecuteFunctions,
	items: INodeExecutionData[],
	i: number
): Promise<INodeExecutionData> {
	const binaryPropertyName = context.getNodeParameter('binaryPropertyName', i) as string;
	const folderPath = context.getNodeParameter('folderPath', i) as string;
	const access = context.getNodeParameter('access', i) as AccessLevel;
	const fileName = context.getNodeParameter('fileName', i, '') as string;

	const { buffer, fileName: finalFileName, mimeType, binaryData } = await getBinaryDataForUpload(
		context,
		items,
		i,
		binaryPropertyName,
		fileName
	);

	const response = await hubspotFileUploadRequest.call(
		context,
		buffer,
		finalFileName,
		{
			folderPath,
			access,
			mimeType
		}
	) as IDataObject;

	return {
		json: (response.data as IDataObject) || response,
		binary: {
			[binaryPropertyName]: binaryData
		},
		pairedItem: { item: i }
	};
}

async function getFile(context: IExecuteFunctions, i: number): Promise<INodeExecutionData> {
	const fileId = context.getNodeParameter('fileId', i) as string;

	const response = await hubspotApiRequest.call(
		context,
		'GET',
		`/files/v3/files/${fileId}`
	) as IDataObject;

	return {
		json: (response.data as IDataObject) || response,
		pairedItem: { item: i }
	};
}

async function searchFiles(context: IExecuteFunctions, i: number): Promise<INodeExecutionData> {
	const name = context.getNodeParameter('name', i, '') as string;
	const path = context.getNodeParameter('path', i, '') as string;
	const parentFolderId = context.getNodeParameter('parentFolderId', i, '') as string;
	const extension = context.getNodeParameter('extension', i, '') as string;
	const limit = context.getNodeParameter('limit', i, 20) as number;

	const queryParams: Record<string, string | number> = {
		limit: Math.min(limit, 100)
	};

	if (name) queryParams.name = name;
	if (path) queryParams.path = path;
	if (parentFolderId) queryParams.parentFolderId = parentFolderId;
	if (extension) queryParams.extension = extension;

	const response = await hubspotApiRequest.call(
		context,
		'GET',
		'/files/v3/files/search',
		{},
		queryParams
	) as IDataObject;

	return {
		json: (response.data as IDataObject) || response,
		pairedItem: { item: i }
	};
}

async function importFromUrl(context: IExecuteFunctions, i: number): Promise<INodeExecutionData> {
	const url = context.getNodeParameter('url', i) as string;
	const folderPath = context.getNodeParameter('folderPath', i) as string;
	const access = context.getNodeParameter('access', i) as string;
	const fileName = context.getNodeParameter('fileName', i, '') as string;

	const body: Record<string, string> = {
		url,
		access
	};

	if (folderPath) body.folderPath = folderPath;
	if (fileName) body.name = fileName;

	const response = await hubspotApiRequest.call(
		context,
		'POST',
		'/files/v3/files/import-from-url/async',
		body
	) as IDataObject;

	const responseData = (response.data || response) as IDataObject;
	const taskId = responseData.id as string;
	let status = 'PENDING';
	let attempts = 0;
	const maxAttempts = 30;
	let finalResponse: IDataObject = responseData;

	while ((status === 'PENDING' || status === 'PROCESSING') && attempts < maxAttempts) {
		await new Promise(resolve => setTimeout(resolve, 1000));

		const statusResponse = await hubspotApiRequest.call(
			context,
			'GET',
			`/files/v3/files/import-from-url/async/tasks/${taskId}/status`
		) as IDataObject;

		const statusData = (statusResponse.data || statusResponse) as IDataObject;
		status = statusData.status as string;
		attempts++;

		if (status === 'COMPLETE') {
			finalResponse = statusData;
			break;
		} else if (status === 'FAILED') {
			throw new Error(`File import failed: ${(statusData.error as string) || 'Unknown error'}`);
		}
	}

	if (status !== 'COMPLETE') {
		throw new Error(`File import timed out. Status: ${status}`);
	}

	return {
		json: finalResponse,
		pairedItem: { item: i }
	};
}

async function replaceFile(
	context: IExecuteFunctions,
	items: INodeExecutionData[],
	i: number
): Promise<INodeExecutionData> {
	const fileId = context.getNodeParameter('fileId', i) as string;
	const binaryPropertyName = context.getNodeParameter('binaryPropertyName', i) as string;
	const fileName = context.getNodeParameter('fileName', i, '') as string;

	const { buffer, fileName: finalFileName, mimeType } = await getBinaryDataForUpload(
		context,
		items,
		i,
		binaryPropertyName,
		fileName
	);

	const response = await hubspotFileReplaceRequest.call(
		context,
		fileId,
		buffer,
		finalFileName,
		{ mimeType }
	) as IDataObject;

	return {
		json: (response.data as IDataObject) || response,
		pairedItem: { item: i }
	};
}

async function updateFileProperties(context: IExecuteFunctions, i: number): Promise<INodeExecutionData> {
	const fileId = context.getNodeParameter('fileId', i) as string;
	const updateName = context.getNodeParameter('updateName', i, '') as string;
	const updateAccess = context.getNodeParameter('updateAccess', i, '') as string;
	const updateParentFolderId = context.getNodeParameter('updateParentFolderId', i, '') as string;

	const body: Record<string, string> = {};
	if (updateName) body.name = updateName;
	if (updateAccess) body.access = updateAccess;
	if (updateParentFolderId) body.parentFolderId = updateParentFolderId;

	if (Object.keys(body).length === 0) {
		throw new Error('At least one property must be specified for update');
	}

	const response = await hubspotApiRequest.call(
		context,
		'PATCH',
		`/files/v3/files/${fileId}`,
		body
	) as IDataObject;

	return {
		json: (response.data as IDataObject) || response,
		pairedItem: { item: i }
	};
}

async function deleteFile(context: IExecuteFunctions, i: number): Promise<INodeExecutionData> {
	const fileId = context.getNodeParameter('fileId', i) as string;

	const response = await hubspotApiRequest.call(
		context,
		'DELETE',
		`/files/v3/files/${fileId}`
	) as IDataObject;

	return {
		json: (response.data as IDataObject) || response,
		pairedItem: { item: i }
	};
}
