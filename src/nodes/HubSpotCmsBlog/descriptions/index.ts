export * from './sharedDescriptions';
export * from './postDescriptions';
export * from './tagDescriptions';

import type { INodeProperties } from 'n8n-workflow';
import { resourceField, returnAllField, limitField, offsetField } from './sharedDescriptions';
import { postFields } from './postDescriptions';
import { tagFields } from './tagDescriptions';

export const blogFields: INodeProperties[] = [
	resourceField,
	...postFields,
	...tagFields,
	returnAllField,
	limitField,
	offsetField,
];
