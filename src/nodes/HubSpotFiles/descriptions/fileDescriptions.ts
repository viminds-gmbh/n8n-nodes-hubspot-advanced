import type { INodeProperties } from 'n8n-workflow';

export const fileOperationField: INodeProperties = {
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
};

export const binaryPropertyUploadField: INodeProperties = {
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
};

export const fileIdField: INodeProperties = {
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
};

export const binaryPropertyReplaceField: INodeProperties = {
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
};

export const fileFolderPathField: INodeProperties = {
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
};

export const accessField: INodeProperties = {
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
};

export const importUrlField: INodeProperties = {
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
};

export const fileNameField: INodeProperties = {
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
};

export const duplicateValidationScopeField: INodeProperties = {
	displayName: 'Duplicate Validation Scope',
	name: 'duplicateValidationScope',
	type: 'options',
	options: [
		{ 
			name: 'None', 
			value: 'NONE', 
			description: 'No duplicate validation - file will be uploaded with suffix if duplicate exists' 
		},
		{ 
			name: 'Exact Folder', 
			value: 'EXACT_FOLDER', 
			description: 'Check for duplicates in the target folder only' 
		},
		{ 
			name: 'Entire Portal', 
			value: 'ENTIRE_PORTAL', 
			description: 'Check for duplicates across the entire portal' 
		},
	],
	default: 'NONE',
	description: 'Scope for duplicate file validation.',
	displayOptions: {
		show: {
			resource: ['file'],
			operation: ['upload', 'importUrl'],
		},
	},
};

export const duplicateValidationStrategyField: INodeProperties = {
	displayName: 'Duplicate Validation Strategy',
	name: 'duplicateValidationStrategy',
	type: 'options',
	options: [
		{ 
			name: 'Reject', 
			value: 'REJECT', 
			description: 'Reject the upload if a duplicate is found' 
		},
		{ 
			name: 'Return Existing', 
			value: 'RETURN_EXISTING', 
			description: 'Return the existing file instead of uploading a new one' 
		},
	],
	default: 'REJECT',
	description: 'Strategy to handle duplicate files.',
	displayOptions: {
		show: {
			resource: ['file'],
			operation: ['upload', 'importUrl'],
			duplicateValidationScope: ['EXACT_FOLDER', 'ENTIRE_PORTAL'],
		},
	},
};

export const overwriteField: INodeProperties = {
	displayName: 'Overwrite',
	name: 'overwrite',
	type: 'boolean',
	default: false,
	description: 'Whether to overwrite an existing file with the same name and extension in the specified folder. If true, the existing file will be deleted and replaced with a new file ID.',
	displayOptions: {
		show: {
			resource: ['file'],
			operation: ['importUrl'],
		},
	},
};

export const updateNameField: INodeProperties = {
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
};

export const updateAccessField: INodeProperties = {
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
};

export const updateParentFolderIdField: INodeProperties = {
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
};

export const searchFileNameField: INodeProperties = {
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
};

export const searchPathField: INodeProperties = {
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
};

export const searchParentFolderIdField: INodeProperties = {
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
};

export const searchExtensionField: INodeProperties = {
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
};

export const fileFields: INodeProperties[] = [
	fileOperationField,
	binaryPropertyUploadField,
	fileIdField,
	binaryPropertyReplaceField,
	fileFolderPathField,
	accessField,
	importUrlField,
	fileNameField,
	duplicateValidationScopeField,
	duplicateValidationStrategyField,
	overwriteField,
	updateNameField,
	updateAccessField,
	updateParentFolderIdField,
	searchFileNameField,
	searchPathField,
	searchParentFolderIdField,
	searchExtensionField,
];
