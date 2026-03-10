import type { IBinaryData } from 'n8n-workflow';

export interface BinaryUploadData {
	buffer: Buffer;
	fileName: string;
	mimeType: string;
	binaryData: IBinaryData;
}

export type AccessLevel = 'PRIVATE' | 'PUBLIC_INDEXABLE' | 'PUBLIC_NOT_INDEXABLE';
