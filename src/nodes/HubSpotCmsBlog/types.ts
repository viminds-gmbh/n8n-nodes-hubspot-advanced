export interface BlogPost {
	id: string;
	name: string;
	slug: string;
	contentGroupId: string;
	language: string;
	blogAuthorId: string;
	tagIds: string[];
	htmlTitle: string;
	metaDescription: string;
	featuredImage: string;
	featuredImageAltText: string;
	postBody: string;
	postSummary: string;
	rssBody: string;
	rssSummary: string;
	useFeaturedImage: boolean;
	campaign: string;
	layoutSections: Record<string, unknown>;
	publishDate: string;
	state: string;
	createdAt: string;
	updatedAt: string;
}

export interface BlogTag {
	id: string;
	name: string;
	slug: string;
	language: string;
	createdAt: string;
	updatedAt: string;
}

export interface BlogPostFilter {
	stateFilter?: string[];
	nameFilter?: string;
	contentGroupId?: string;
	blogAuthorId?: string;
	languageFilter?: string;
	tagIdFilter?: string[];
	createdAfter?: string;
	createdBefore?: string;
	updatedAfter?: string;
	updatedBefore?: string;
	sort?: string;
}

export interface BlogTagFilter {
	nameFilter?: string;
	languageFilter?: string;
	createdAfter?: string;
	updatedAfter?: string;
	sort?: string;
}

export interface BlogPostBody {
	name?: string;
	contentGroupId?: string;
	slug?: string;
	language?: string;
	blogAuthorId?: string;
	tagIds?: string[];
	htmlTitle?: string;
	metaDescription?: string;
	featuredImage?: string;
	featuredImageAltText?: string;
	postBody?: string;
	postSummary?: string;
	rssBody?: string;
	rssSummary?: string;
	useFeaturedImage?: boolean;
	campaign?: string;
	layoutSections?: Record<string, unknown>;
	publishDate?: string;
}

export interface BlogTagBody {
	name?: string;
	slug?: string;
	language?: string;
}
