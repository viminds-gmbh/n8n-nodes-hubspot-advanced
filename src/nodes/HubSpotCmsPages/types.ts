export interface Page {
	id: string;
	name: string;
	slug: string;
	language: string;
	state: string;
	templatePath: string;
	domain: string;
	publishDate: string;
	createdAt: string;
	updatedAt: string;
	archived: boolean;
	layoutSections: Record<string, unknown>;
	metaDescription: string;
	featuredImage: string;
	htmlTitle: string;
	attachedStylesheets: Array<Record<string, unknown>>;
	publicAccessRulesEnabled: boolean;
	publicAccessRules: Array<Record<string, unknown>>;
	translations: Record<string, unknown>;
	campaign: string;
	contentGroupId: string;
}

export interface PageFilter {
	stateFilter?: string[];
	nameFilter?: string;
	domainFilter?: string[];
	languageFilter?: string;
	createdAfter?: string;
	createdBefore?: string;
	updatedAfter?: string;
	updatedBefore?: string;
	sort?: string;
}

export interface PageBody {
	name?: string;
	templatePath?: string;
	slug?: string;
	domain?: string;
	language?: string;
	htmlTitle?: string;
	metaDescription?: string;
	featuredImage?: string;
	campaign?: string;
	layoutSections?: Record<string, unknown>;
	attachedStylesheets?: Array<Record<string, unknown>>;
	publicAccessRulesEnabled?: boolean;
	publicAccessRules?: Array<Record<string, unknown>>;
	publishDate?: string;
	state?: string;
	contentGroupId?: string;
	subcategory?: string;
}
