export * from './sharedDescriptions';
export * from './tableDescriptions';
export * from './rowDescriptions';

import { resourceField, tableIdField } from './sharedDescriptions';
import { tableFields } from './tableDescriptions';
import { rowFields } from './rowDescriptions';

export const hubDbFields = [
	resourceField,
	...tableFields,
	tableIdField,
	...rowFields,
];
