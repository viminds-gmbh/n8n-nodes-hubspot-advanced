import type { IDataObject } from 'n8n-workflow';

export type RedirectStyle = '301' | '302' | '305';

export type SortOption = 'createdAt' | 'updatedAt' | 'routePrefix' | 'destination';

export interface RedirectData extends IDataObject {
	routePrefix?: string;
	destination?: string;
	redirectStyle?: RedirectStyle;
	isMatchFullUrl?: boolean;
	isMatchQueryString?: boolean;
	isOnlyAfterNotFound?: boolean;
	isPattern?: boolean;
	isProtocolRelative?: boolean;
	isTrailingSlashOptional?: boolean;
	precedence?: number;
}
