import type { INodePropertyOptions } from 'n8n-workflow';

export const CONTENT_TYPE_OPTIONS: INodePropertyOptions[] = [
	{ name: 'Blog Post', value: 'BLOG_POST' },
	{ name: 'Site Page', value: 'SITE_PAGE' },
	{ name: 'Landing Page', value: 'LANDING_PAGE' },
	{ name: 'Knowledge Article', value: 'KNOWLEDGE_ARTICLE' },
	{ name: 'Listing Page', value: 'LISTING_PAGE' },
];
