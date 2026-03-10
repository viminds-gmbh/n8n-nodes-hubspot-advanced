import type { INodeProperties } from 'n8n-workflow';

export const folderOperationField: INodeProperties = {
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
};

export const folderIdentifierField: INodeProperties = {
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
};

export const folderIdField: INodeProperties = {
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
};

export const createFolderPathField: INodeProperties = {
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
};

export const createFolderNameField: INodeProperties = {
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
};

export const createParentFolderIdField: INodeProperties = {
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
};

export const searchFolderNameField: INodeProperties = {
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
};

export const updateFolderNameField: INodeProperties = {
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
};

export const updateFolderParentIdField: INodeProperties = {
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
};

export const folderFields: INodeProperties[] = [
	folderOperationField,
	folderIdentifierField,
	folderIdField,
	createFolderPathField,
	createFolderNameField,
	createParentFolderIdField,
	searchFolderNameField,
	updateFolderNameField,
	updateFolderParentIdField,
];
