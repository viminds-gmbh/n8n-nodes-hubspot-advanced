export interface HubSpotRateLimitHeaders {
	'x-hubspot-ratelimit-max'?: string;
	'x-hubspot-ratelimit-remaining'?: string;
	'x-hubspot-ratelimit-interval-milliseconds'?: string;
	'x-hubspot-ratelimit-daily'?: string;
	'x-hubspot-ratelimit-daily-remaining'?: string;
}

export interface HubSpotApiResponse<T = any> {
	results?: T[];
	paging?: {
		next?: {
			after?: string;
			link?: string;
		};
	};
	status?: string;
	headers?: HubSpotRateLimitHeaders;
}

export interface HubSpotObject {
	id: string;
	properties: Record<string, any>;
	createdAt?: string;
	updatedAt?: string;
	archived?: boolean;
	associations?: Record<string, AssociatedObject[]>;
}

export interface AssociatedObject {
	id: string;
	type: string;
	properties?: Record<string, any>;
}

export interface HubSpotSearchFilter {
	propertyName: string;
	operator: 'EQ' | 'NEQ' | 'LT' | 'LTE' | 'GT' | 'GTE' | 'BETWEEN' | 'IN' | 'NOT_IN' | 'CONTAINS_TOKEN' | 'NOT_CONTAINS_TOKEN' | 'HAS_PROPERTY' | 'NOT_HAS_PROPERTY';
	value: string | number | boolean;
}

export interface HubSpotSearchSort {
	propertyName: string;
	direction: 'ASCENDING' | 'DESCENDING';
}

export interface HubSpotBatchReadInput {
	id: string;
}

export interface HubSpotAssociation {
	from: { id: string };
	to: Array<{
		toObjectId: number;
		associationTypes: Array<{
			category: 'HUBSPOT_DEFINED' | 'USER_DEFINED';
			typeId: number;
			label: string | null;
		}>;
	}>;
}

export type HubSpotTier = 'free' | 'starter' | 'professional' | 'enterprise' | 'enterprise_plus';

export const RATE_LIMITS: Record<HubSpotTier, { burst: number; daily: number }> = {
	free: { burst: 100, daily: 250000 },
	starter: { burst: 100, daily: 250000 },
	professional: { burst: 150, daily: 500000 },
	enterprise: { burst: 150, daily: 500000 },
	enterprise_plus: { burst: 200, daily: 1000000 },
};

export const HUBSPOT_OBJECT_TYPES = [
	'contacts',
	'companies',
	'deals',
	'tickets',
	'products',
	'line_items',
	'quotes',
	'calls',
	'emails',
	'meetings',
	'notes',
	'tasks',
	'communications',
	'feedback_submissions',
	'invoices',
	'marketing_events',
	'subscriptions',
	'goals',
	'discounts',
	'fees',
	'taxes',
	'payments',
	'user_details',
	'postal_mail',
	'orders',
	'leads',
	'carts',
	'services',
	'listings',
	'appointments',
	'projects',
] as const;

export type HubSpotObjectType = (typeof HUBSPOT_OBJECT_TYPES)[number];

/**
 * n8n-ready options array for object type dropdowns.
 * Common types first, then alphabetical, with a "Custom" fallback at the end.
 */
export const HUBSPOT_OBJECT_TYPE_OPTIONS = [
	// Common types first
	{ name: 'Contacts', value: 'contacts' },
	{ name: 'Companies', value: 'companies' },
	{ name: 'Deals', value: 'deals' },
	{ name: 'Tickets', value: 'tickets' },
	// Alphabetical
	{ name: 'Appointments', value: 'appointments' },
	{ name: 'Calls', value: 'calls' },
	{ name: 'Carts', value: 'carts' },
	{ name: 'Communications', value: 'communications' },
	{ name: 'Discounts', value: 'discounts' },
	{ name: 'Emails', value: 'emails' },
	{ name: 'Feedback Submissions', value: 'feedback_submissions' },
	{ name: 'Fees', value: 'fees' },
	{ name: 'Goals', value: 'goals' },
	{ name: 'Invoices', value: 'invoices' },
	{ name: 'Leads', value: 'leads' },
	{ name: 'Line Items', value: 'line_items' },
	{ name: 'Listings', value: 'listings' },
	{ name: 'Marketing Events', value: 'marketing_events' },
	{ name: 'Meetings', value: 'meetings' },
	{ name: 'Notes', value: 'notes' },
	{ name: 'Orders', value: 'orders' },
	{ name: 'Payments', value: 'payments' },
	{ name: 'Postal Mail', value: 'postal_mail' },
	{ name: 'Products', value: 'products' },
	{ name: 'Projects', value: 'projects' },
	{ name: 'Quotes', value: 'quotes' },
	{ name: 'Services', value: 'services' },
	{ name: 'Subscriptions', value: 'subscriptions' },
	{ name: 'Tasks', value: 'tasks' },
	{ name: 'Taxes', value: 'taxes' },
	{ name: 'User Details', value: 'user_details' },
// Custom fallback
	{ name: 'Custom', value: 'custom' },
] as const;

/**
 * Mapping from HubSpot Object Type IDs to API object types for Lists API
 */
export const HUBSPOT_OBJECT_TYPE_ID_MAPPING: Record<string, string> = {
	'0-1': 'contacts',
	'0-2': 'companies',
	'0-3': 'deals',
	'0-5': 'tickets',
	'0-6': 'products',
	'0-8': 'line_items',
	'0-14': 'quotes',
	'0-15': 'calls',
	'0-16': 'emails',
	'0-17': 'meetings',
	'0-18': 'notes',
	'0-19': 'tasks',
	'0-20': 'communications',
	'0-21': 'feedback_submissions',
	'0-22': 'invoices',
	'0-23': 'marketing_events',
	'0-24': 'subscriptions',
	'0-25': 'goals',
	'0-26': 'discounts',
	'0-27': 'fees',
	'0-28': 'taxes',
	'0-29': 'payments',
	'0-30': 'user_details',
	'0-31': 'postal_mail',
	'0-32': 'orders',
	'0-33': 'leads',
	'0-34': 'carts',
	'0-35': 'services',
	'0-36': 'listings',
	'0-37': 'appointments',
	'0-38': 'projects',
} as const;

/**
 * Reverse mapping from object type names to object type IDs for Forms API
 */
export const HUBSPOT_OBJECT_TYPE_TO_ID: Record<string, string> = {
	'contacts': '0-1',
	'companies': '0-2',
	'deals': '0-3',
	'tickets': '0-5',
	'products': '0-6',
	'line_items': '0-8',
	'quotes': '0-14',
	'calls': '0-15',
	'emails': '0-16',
	'meetings': '0-17',
	'notes': '0-18',
	'tasks': '0-19',
	'communications': '0-20',
	'feedback_submissions': '0-21',
	'invoices': '0-22',
	'marketing_events': '0-23',
	'subscriptions': '0-24',
	'goals': '0-25',
	'discounts': '0-26',
	'fees': '0-27',
	'taxes': '0-28',
	'payments': '0-29',
	'user_details': '0-30',
	'postal_mail': '0-31',
	'orders': '0-32',
	'leads': '0-33',
	'carts': '0-34',
	'services': '0-35',
	'listings': '0-36',
	'appointments': '0-37',
	'projects': '0-38',
} as const;

/**
 * File and Folder API Types for HubSpot Files API v3
 */
export interface HubSpotFileUploadOptions {
	folderPath?: string;
	access?: 'PRIVATE' | 'PUBLIC_INDEXABLE' | 'PUBLIC_NOT_INDEXABLE';
	fileName?: string;
	mimeType?: string;
}

export interface HubSpotFileResponse {
	id: string;
	createdAt: string;
	updatedAt: string;
	archived: boolean;
	parentFolderId?: string;
	name: string;
	path: string;
	size: number;
	height?: number;
	width?: number;
	encoding: string;
	type: string;
	extension: string;
	defaultHostingUrl: string;
	url: string;
	isUsableInContent: boolean;
	access: string;
}

export interface HubSpotFolderResponse {
	id: string;
	createdAt: string;
	updatedAt: string;
	archived: boolean;
	archivedAt?: string;
	name: string;
	parentFolderId?: string;
	path: string;
}

export interface HubSpotImportTaskResponse {
	id: string;
	links: Array<{
		status: string;
	}>;
}

export interface HubSpotImportStatusResponse {
	id: string;
	status: 'PENDING' | 'PROCESSING' | 'COMPLETE' | 'FAILED';
	result?: HubSpotFileResponse;
	error?: string;
}
