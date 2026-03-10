import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IBinaryData,
} from 'n8n-workflow';

import { hubspotApiRequest, hubspotFileUploadRequest, hubspotFileReplaceRequest } from '../../transport/HubSpotApiRequest';

export class HubSpotFiles implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'HubSpot Files',
		name: 'hubSpotFiles',
		icon: 'file:../../icon.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Manage files and folders in HubSpot File Manager',
		defaults: {
			name: 'HubSpot Files',
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
				'HubSpot File Manager',
				'HubSpot Upload',
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
		properties: [
			// Resource Selection (File vs. Folder)
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'File', value: 'file' },
					{ name: 'Folder', value: 'folder' },
				],
				default: 'file',
				required: true,
				description: 'Choose whether to work with files or folders in HubSpot File Manager.',
			},
			// File Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['file'],
					},
				},
				options: [
					{ name: 'Upload', value: 'upload', description: 'Upload a file from binary data' },
					{ name: 'Get', value: 'get', description: 'Get file details by ID' },
					{ name: 'Search', value: 'search', description: 'Search files with filters' },
					{ name: 'Import from URL', value: 'importUrl', description: 'Import file from external URL (async)' },
					{ name: 'Replace', value: 'replace', description: 'Replace file content while keeping ID' },
					{ name: 'Update Properties', value: 'updateProperties', description: 'Update file metadata' },
					{ name: 'Delete', value: 'delete', description: 'Delete file (archive)' },
				],
				default: 'upload',
				required: true,
				description: 'The operation to perform on files.',
			},
			// Folder Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['folder'],
					},
				},
				options: [
					{ name: 'Get', value: 'get', description: 'Get folder details by ID or path' },
					{ name: 'Search', value: 'search', description: 'Search folders with filters' },
					{ name: 'Create', value: 'create', description: 'Create a new folder' },
					{ name: 'Update', value: 'update', description: 'Rename or move folder' },
					{ name: 'Delete', value: 'delete', description: 'Delete folder (async)' },
				],
				default: 'get',
				required: true,
				description: 'The operation to perform on folders.',
			},
			// Common File/Folder Fields
			// Upload File - Binary Property
			{
				displayName: 'Binary Property',
				name: 'binaryPropertyName',
				type: 'string',
				default: 'data',
				required: true,
				placeholder: 'data',
				description: 'Name of the binary property containing the file data from the previous node.',
				displayOptions: {
					show: {
						resource: ['file'],
						operation: ['upload'],
					},
				},
			},
			// File ID (for get, replace, updateProperties, delete)
			{
				displayName: 'File ID',
				name: 'fileId',
				type: 'string',
				default: '',
				required: true,
				placeholder: '122692044085',
				description: 'The unique ID of the file. You can use expressions to reference IDs from previous nodes.',
				displayOptions: {
					show: {
						resource: ['file'],
						operation: ['get', 'replace', 'updateProperties', 'delete'],
					},
				},
			},
			// Binary Property for Replace
			{
				displayName: 'Binary Property',
				name: 'binaryPropertyName',
				type: 'string',
				default: 'data',
				required: true,
				placeholder: 'data',
				description: 'Name of the binary property containing the new file data.',
				displayOptions: {
					show: {
						resource: ['file'],
						operation: ['replace'],
					},
				},
			},
			// Folder Path/ID for get
			{
				displayName: 'Folder Identifier',
				name: 'folderIdentifier',
				type: 'string',
				default: '',
				required: true,
				placeholder: '1234567890 or /uploads/documents',
				description: 'The folder ID (number) or path (starting with /) to retrieve.',
				displayOptions: {
					show: {
						resource: ['folder'],
						operation: ['get'],
					},
				},
			},
			// Folder ID (for update, delete)
			{
				displayName: 'Folder ID',
				name: 'folderId',
				type: 'string',
				default: '',
				required: true,
				placeholder: '1234567890',
				description: 'The unique ID of the folder.',
				displayOptions: {
					show: {
						resource: ['folder'],
						operation: ['update', 'delete'],
					},
				},
			},
			// Folder Path (for create)
			{
				displayName: 'Folder Path',
				name: 'folderPath',
				type: 'string',
				default: '',
				required: true,
				placeholder: '/uploads/documents',
				description: 'Path where the folder should be created. Parent folders will be created if they don\'t exist.',
				displayOptions: {
					show: {
						resource: ['folder'],
						operation: ['create'],
					},
				},
			},
			// Folder Name (for create)
			{
				displayName: 'Folder Name',
				name: 'folderName',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'documents',
				description: 'Name of the folder to create.',
				displayOptions: {
					show: {
						resource: ['folder'],
						operation: ['create'],
					},
				},
			},
			// Parent Folder ID (for create)
			{
				displayName: 'Parent Folder ID',
				name: 'parentFolderId',
				type: 'string',
				default: '',
				placeholder: '1234567890',
				description: 'ID of the parent folder. Leave empty to create at root level.',
				displayOptions: {
					show: {
						resource: ['folder'],
						operation: ['create'],
					},
				},
			},
			// Upload/Import Folder Path
			{
				displayName: 'Folder Path',
				name: 'folderPath',
				type: 'string',
				default: '/n8n-uploads',
				placeholder: '/uploads/documents',
				description: 'Path in HubSpot File Manager where the file will be uploaded. Will be created if it doesn\'t exist.',
				displayOptions: {
					show: {
						resource: ['file'],
						operation: ['upload', 'importUrl'],
					},
				},
			},
			// Access Level
			{
				displayName: 'Access',
				name: 'access',
				type: 'options',
				options: [
					{ name: 'Private', value: 'PRIVATE', description: 'File requires authentication to access' },
					{ name: 'Public Indexable', value: 'PUBLIC_INDEXABLE', description: 'Publicly accessible, search engines can index' },
					{ name: 'Public Not Indexable', value: 'PUBLIC_NOT_INDEXABLE', description: 'Publicly accessible, search engines cannot index' },
				],
				default: 'PRIVATE',
				description: 'Access level for the uploaded file. <a href="https://developers.hubspot.com/docs/api/files/files" target="_blank">Learn more</a>.',
				displayOptions: {
					show: {
						resource: ['file'],
						operation: ['upload', 'importUrl'],
					},
				},
			},
			// Import URL
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'https://example.com/document.pdf',
				description: 'URL of the file to import into HubSpot File Manager.',
				displayOptions: {
					show: {
						resource: ['file'],
						operation: ['importUrl'],
					},
				},
			},
			// File Name (for upload, importUrl, replace)
			{
				displayName: 'File Name',
				name: 'fileName',
				type: 'string',
				default: '',
				placeholder: 'document.pdf',
				description: 'Optional custom name for the file. If empty, the original filename will be used.',
				displayOptions: {
					show: {
						resource: ['file'],
						operation: ['upload', 'importUrl', 'replace'],
					},
				},
			},
			// Update File Properties - Name
			{
				displayName: 'New Name',
				name: 'updateName',
				type: 'string',
				default: '',
				placeholder: 'new-document.pdf',
				description: 'New name for the file. Leave empty to keep current name.',
				displayOptions: {
					show: {
						resource: ['file'],
						operation: ['updateProperties'],
					},
				},
			},
			// Update File Properties - Access
			{
				displayName: 'New Access Level',
				name: 'updateAccess',
				type: 'options',
				options: [
					{ name: 'No Change', value: '' },
					{ name: 'Private', value: 'PRIVATE' },
					{ name: 'Public Indexable', value: 'PUBLIC_INDEXABLE' },
					{ name: 'Public Not Indexable', value: 'PUBLIC_NOT_INDEXABLE' },
				],
				default: '',
				description: 'New access level for the file. Select "No Change" to keep current access level.',
				displayOptions: {
					show: {
						resource: ['file'],
						operation: ['updateProperties'],
					},
				},
			},
			// Update File Properties - Parent Folder
			{
				displayName: 'New Parent Folder ID',
				name: 'updateParentFolderId',
				type: 'string',
				default: '',
				placeholder: '1234567890',
				description: 'Move file to a different folder by specifying the folder ID. Leave empty to keep in current folder.',
				displayOptions: {
					show: {
						resource: ['file'],
						operation: ['updateProperties'],
					},
				},
			},
			// Search - File Name
			{
				displayName: 'File Name',
				name: 'name',
				type: 'string',
				default: '',
				placeholder: 'document.pdf',
				description: 'Search for files containing this name (partial match).',
				displayOptions: {
					show: {
						resource: ['file'],
						operation: ['search'],
					},
				},
			},
			// Search - Path
			{
				displayName: 'Folder Path',
				name: 'path',
				type: 'string',
				default: '',
				placeholder: '/uploads/documents',
				description: 'Search only in this folder path. Leave empty to search all folders.',
				displayOptions: {
					show: {
						resource: ['file'],
						operation: ['search'],
					},
				},
			},
			// Search - Folder ID
			{
				displayName: 'Parent Folder ID',
				name: 'parentFolderId',
				type: 'string',
				default: '',
				placeholder: '1234567890',
				description: 'Search only in this specific folder by ID. Leave empty to search all folders.',
				displayOptions: {
					show: {
						resource: ['file'],
						operation: ['search'],
					},
				},
			},
			// Search - Extension
			{
				displayName: 'File Extension',
				name: 'extension',
				type: 'string',
				default: '',
				placeholder: 'pdf',
				description: 'Search for files with this extension (e.g. pdf, jpg, png). Leave empty to search all extensions.',
				displayOptions: {
					show: {
						resource: ['file'],
						operation: ['search'],
					},
				},
			},
			// Search Folders - Folder Name
			{
				displayName: 'Folder Name',
				name: 'name',
				type: 'string',
				default: '',
				placeholder: 'documents',
				description: 'Search for folders containing this name (partial match).',
				displayOptions: {
					show: {
						resource: ['folder'],
						operation: ['search'],
					},
				},
			},
			// Search - Limit
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 20,
				placeholder: '20',
				description: 'Maximum number of results to return (max 100).',
				displayOptions: {
					show: {
						operation: ['search'],
					},
				},
			},
			// Update Folder - Name
			{
				displayName: 'New Folder Name',
				name: 'updateFolderName',
				type: 'string',
				default: '',
				placeholder: 'new-folder-name',
				description: 'New name for the folder. Leave empty to keep current name.',
				displayOptions: {
					show: {
						resource: ['folder'],
						operation: ['update'],
					},
				},
			},
			// Update Folder - Parent ID
			{
				displayName: 'New Parent Folder ID',
				name: 'updateFolderParentId',
				type: 'string',
				default: '',
				placeholder: '1234567890',
				description: 'Move folder to a different parent folder by specifying the folder ID. Leave empty to keep in current location.',
				displayOptions: {
					show: {
						resource: ['folder'],
						operation: ['update'],
					},
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		// Helper function to extract binary data for upload/replace operations
		const getBinaryDataForUpload = async (
			i: number,
			binaryPropertyName: string,
			customFileName?: string
		): Promise<{ buffer: Buffer; fileName: string; mimeType: string; binaryData: IBinaryData }> => {
			const itemBinaryData = items[i].binary;
			if (!itemBinaryData || !itemBinaryData[binaryPropertyName]) {
				throw new Error(`No binary data found in property "${binaryPropertyName}"`);
			}

			const binaryData = itemBinaryData[binaryPropertyName];
			const originalFileName = binaryData.fileName || 'file';
			const finalFileName = customFileName || originalFileName;
			const buffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);

			return {
				buffer,
				fileName: finalFileName,
				mimeType: binaryData.mimeType,
				binaryData
			};
		};

		for (let i = 0; i < items.length; i++) {
			try {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				let response: any;

				// File Operations
				if (resource === 'file') {
					switch (operation) {
						case 'upload': {
							const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;
							const folderPath = this.getNodeParameter('folderPath', i) as string;
							const access = this.getNodeParameter('access', i) as string;
							const fileName = this.getNodeParameter('fileName', i, '') as string;

							const { buffer, fileName: finalFileName, mimeType, binaryData } = await getBinaryDataForUpload(
								i,
								binaryPropertyName,
								fileName
							);

							response = await hubspotFileUploadRequest.call(
								this,
								buffer,
								finalFileName,
								{
									folderPath,
									access: access as 'PRIVATE' | 'PUBLIC_INDEXABLE' | 'PUBLIC_NOT_INDEXABLE',
									mimeType
								}
							);

							// Include original binary data in response
							returnData.push({
								json: response.data,
								binary: {
									[binaryPropertyName]: binaryData
								},
								pairedItem: { item: i }
							});
							continue;
						}

						case 'get': {
							const fileId = this.getNodeParameter('fileId', i) as string;
							response = await hubspotApiRequest.call(
								this,
								'GET',
								`/files/v3/files/${fileId}`
							);
							break;
						}

						case 'search': {
							const name = this.getNodeParameter('name', i, '') as string;
							const path = this.getNodeParameter('path', i, '') as string;
							const parentFolderId = this.getNodeParameter('parentFolderId', i, '') as string;
							const extension = this.getNodeParameter('extension', i, '') as string;
							const limit = this.getNodeParameter('limit', i, 20) as number;

							const queryParams: Record<string, string | number> = {
								limit: Math.min(limit, 100)
							};

							if (name) {
								queryParams.name = name;
							}

							if (path) {
								queryParams.path = path;
							}

							if (parentFolderId) {
								queryParams.parentFolderId = parentFolderId;
							}

							if (extension) {
								queryParams.extension = extension;
							}

							response = await hubspotApiRequest.call(
								this,
								'GET',
								'/files/v3/files/search',
								{},
								queryParams
							);
							break;
						}

						case 'importUrl': {
							const url = this.getNodeParameter('url', i) as string;
							const folderPath = this.getNodeParameter('folderPath', i) as string;
							const access = this.getNodeParameter('access', i) as string;
							const fileName = this.getNodeParameter('fileName', i, '') as string;

							const body: Record<string, string> = {
								url,
								access
							};

							if (folderPath) {
								body.folderPath = folderPath;
							}

							if (fileName) {
								body.name = fileName;
							}

							response = await hubspotApiRequest.call(
								this,
								'POST',
								'/files/v3/files/import-from-url/async',
								body
							);

							// For async import, we need to poll the status
							const taskId = response.data.id;
							let status = 'PENDING';
							let attempts = 0;
							const maxAttempts = 30; // 30 seconds max

							while ((status === 'PENDING' || status === 'PROCESSING') && attempts < maxAttempts) {
								await new Promise(resolve => setTimeout(resolve, 1000));

								const statusResponse = await hubspotApiRequest.call(
									this,
									'GET',
									`/files/v3/files/import-from-url/async/tasks/${taskId}/status`
								);

								status = statusResponse.data.status;
								attempts++;

								if (status === 'COMPLETE') {
									response = statusResponse;
									break;
								} else if (status === 'FAILED') {
									throw new Error(`File import failed: ${statusResponse.data.error || 'Unknown error'}`);
								}
							}

							if (status !== 'COMPLETE') {
								throw new Error(`File import timed out. Status: ${status}`);
							}
							break;
						}

						case 'replace': {
							const fileId = this.getNodeParameter('fileId', i) as string;
							const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;
							const fileName = this.getNodeParameter('fileName', i, '') as string;

							const { buffer, fileName: finalFileName, mimeType } = await getBinaryDataForUpload(
								i,
								binaryPropertyName,
								fileName
							);

							response = await hubspotFileReplaceRequest.call(
								this,
								fileId,
								buffer,
								finalFileName,
								{
									mimeType
								}
							);
							break;
						}

						case 'updateProperties': {
							const fileId = this.getNodeParameter('fileId', i) as string;
							const updateName = this.getNodeParameter('updateName', i, '') as string;
							const updateAccess = this.getNodeParameter('updateAccess', i, '') as string;
							const updateParentFolderId = this.getNodeParameter('updateParentFolderId', i, '') as string;

							const body: Record<string, string> = {};
							if (updateName) body.name = updateName;
							if (updateAccess) body.access = updateAccess;
							if (updateParentFolderId) body.parentFolderId = updateParentFolderId;

							if (Object.keys(body).length === 0) {
								throw new Error('At least one property must be specified for update');
							}

							response = await hubspotApiRequest.call(
								this,
								'PATCH',
								`/files/v3/files/${fileId}`,
								body
							);
							break;
						}

						case 'delete': {
							const fileId = this.getNodeParameter('fileId', i) as string;
							response = await hubspotApiRequest.call(
								this,
								'DELETE',
								`/files/v3/files/${fileId}`
							);
							break;
						}

						default:
							throw new Error(`Unknown file operation: ${operation}`);
					}
				}

				// Folder Operations
				else if (resource === 'folder') {
					switch (operation) {
						case 'get': {
							const folderIdentifier = this.getNodeParameter('folderIdentifier', i) as string;

							// Check if it's an ID (numeric) or path (starts with /)
							const isPath = folderIdentifier.startsWith('/');
							const endpoint = isPath
								? `/files/v3/folders/${encodeURIComponent(folderIdentifier)}`
								: `/files/v3/folders/${folderIdentifier}`;

							response = await hubspotApiRequest.call(
								this,
								'GET',
								endpoint
							);
							break;
						}

						case 'search': {
							const name = this.getNodeParameter('name', i, '') as string;
							const limit = this.getNodeParameter('limit', i, 20) as number;

							const queryParams: Record<string, string | number> = {
								limit: Math.min(limit, 100)
							};

							if (name) {
								queryParams.name = name;
							}

							response = await hubspotApiRequest.call(
								this,
								'GET',
								'/files/v3/folders/search',
								{},
								queryParams
							);
							break;
						}

						case 'create': {
							const folderPath = this.getNodeParameter('folderPath', i) as string;
							const folderName = this.getNodeParameter('folderName', i) as string;
							const parentFolderId = this.getNodeParameter('parentFolderId', i, '') as string;

							const body: Record<string, string> = {
								name: folderName,
								path: folderPath
							};

							if (parentFolderId) {
								body.parentFolderId = parentFolderId;
							}

							response = await hubspotApiRequest.call(
								this,
								'POST',
								'/files/v3/folders',
								body
							);
							break;
						}

						case 'update': {
							const folderId = this.getNodeParameter('folderId', i) as string;
							const updateFolderName = this.getNodeParameter('updateFolderName', i, '') as string;
							const updateFolderParentId = this.getNodeParameter('updateFolderParentId', i, '') as string;

							const body: Record<string, string> = {};
							if (updateFolderName) body.name = updateFolderName;
							if (updateFolderParentId) body.parentFolderId = updateFolderParentId;

							if (Object.keys(body).length === 0) {
								throw new Error('At least one property must be specified for update');
							}

							response = await hubspotApiRequest.call(
								this,
								'PATCH',
								`/files/v3/folders/${folderId}`,
								body
							);
							break;
						}

						case 'delete': {
							const folderId = this.getNodeParameter('folderId', i) as string;

							// Start async deletion
							response = await hubspotApiRequest.call(
								this,
								'DELETE',
								`/files/v3/folders/${folderId}`
							);

							// For async folder deletion, we could poll status but for now return the response
							break;
						}

						default:
							throw new Error(`Unknown folder operation: ${operation}`);
					}
				}

				else {
					throw new Error(`Unknown resource: ${resource}`);
				}

				// For non-upload operations, return the response data
				returnData.push({
					json: response.data || response,
					pairedItem: { item: i }
				});

			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : String(error);
					returnData.push({ json: { error: errorMessage }, pairedItem: { item: i } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
