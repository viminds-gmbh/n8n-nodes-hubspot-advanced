export * from './sharedDescriptions';
export * from './pageDescriptions';

import type { INodeProperties } from 'n8n-workflow';
import { resourceField, returnAllField, limitField, offsetField } from './sharedDescriptions';
import { pageFields } from './pageDescriptions';

export const pagesFields: INodeProperties[] = [
	resourceField,
	...pageFields,
	returnAllField,
	limitField,
	offsetField,
];
