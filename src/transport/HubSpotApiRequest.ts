import type {
	IExecuteFunctions,
	IDataObject,
	IHttpRequestOptions,
	IHttpRequestMethods,
	ILoadOptionsFunctions,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { HubSpotRateLimiter } from './RateLimiter';
import type { HubSpotApiResponse } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function hubspotApiRequest(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<any> {
	const rateLimiter = HubSpotRateLimiter.getInstance();

	const credentials = await this.getCredentials('hubspotAppToken');

	const options: IHttpRequestOptions = {
		method,
		url: `https://api.hubapi.com${endpoint}`,
		body,
		qs,
		headers: {
			Authorization: `Bearer ${credentials.appToken}`,
			'Content-Type': 'application/json',
		},
		json: true,
	};

	return rateLimiter.execute(async () => {
		try {
			const response = await this.helpers.httpRequest(options);

			return {
				data: response,
				headers: response.headers || {},
			};
		} catch (error) {
			const err = error as { statusCode?: number; httpCode?: number; message?: string; description?: string };
			if (err.statusCode === 429 || err.httpCode === 429) {
				throw error;
			}

			throw new NodeApiError(this.getNode(), error as { message: string }, {
				message: err.message || 'HubSpot API request failed',
				description: err.description,
			});
		}
	});
}

export async function hubspotApiRequestAllItems(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	limit?: number,
): Promise<IDataObject[]> {
	const results: IDataObject[] = [];
	let after: string | undefined;

	do {
		const requestBody = { ...body };
		if (after) {
			requestBody.after = after;
		}

		const batchLimit = limit ? Math.min(limit - results.length, 100) : 100;
		requestBody.limit = batchLimit;

		const response: HubSpotApiResponse = await hubspotApiRequest.call(
			this,
			method,
			endpoint,
			requestBody,
		);

		if (response.results) {
			results.push(...(response.results as IDataObject[]));
		}

		after = response.paging?.next?.after;

		if (limit && results.length >= limit) {
			break;
		}
	} while (after);

	return limit ? results.slice(0, limit) : results;
}

export async function hubspotBatchRequest(
	this: IExecuteFunctions,
	objectType: string,
	ids: string[],
	properties: string[] = [],
): Promise<IDataObject[]> {
	const batchSize = 100;
	const results: IDataObject[] = [];

	for (let i = 0; i < ids.length; i += batchSize) {
		const batch = ids.slice(i, i + batchSize);

		const body: IDataObject = {
			inputs: batch.map((id) => ({ id })),
			properties,
		};

		const response = await hubspotApiRequest.call(
			this,
			'POST',
			`/crm/v3/objects/${objectType}/batch/read`,
			body,
		);

		if (response.results && Array.isArray(response.results)) {
			results.push(...(response.results as IDataObject[]));
		}
	}

	return results;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function hubspotApiRequestForLoadOptions(
	this: ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<any> {
	const credentials = await this.getCredentials('hubspotAppToken');

	const options: IHttpRequestOptions = {
		method,
		url: `https://api.hubapi.com${endpoint}`,
		body,
		qs,
		headers: {
			Authorization: `Bearer ${credentials.appToken}`,
			'Content-Type': 'application/json',
		},
		json: true,
	};

	try {
		const response = await this.helpers.httpRequest(options);
		return response;
	} catch (error) {
		const err = error as { message?: string };
		throw new Error(`HubSpot API request failed: ${err.message || 'Unknown error'}`);
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function hubspotApiRequestAllItemsForLoadOptions(
	this: ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	qs: IDataObject = {},
): Promise<IDataObject[]> {
	const credentials = await this.getCredentials('hubspotAppToken');
	const results: IDataObject[] = [];
	let after: string | undefined;

	do {
		const queryParams = { ...qs };
		if (after) {
			queryParams.after = after;
		}

		const limit = 500;
		queryParams.limit = limit;

		const options: IHttpRequestOptions = {
			method,
			url: `https://api.hubapi.com${endpoint}`,
			qs: queryParams,
			headers: {
				Authorization: `Bearer ${credentials.appToken}`,
				'Content-Type': 'application/json',
			},
			json: true,
		};

		try {
			const response = await this.helpers.httpRequest(options);

			if (response.results && Array.isArray(response.results)) {
				results.push(...(response.results as IDataObject[]));
			}

			after = response.paging?.next?.after;
		} catch (error) {
			const err = error as { message?: string };
			throw new Error(`HubSpot API request failed: ${err.message || 'Unknown error'}`);
		}
	} while (after);

	return results;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function hubspotFileUploadRequest(
	this: IExecuteFunctions,
	binaryData: Buffer,
	fileName: string,
	options: {
		folderPath?: string;
		access?: 'PRIVATE' | 'PUBLIC_INDEXABLE' | 'PUBLIC_NOT_INDEXABLE';
		mimeType?: string;
	} = {}
): Promise<any> {
	const rateLimiter = HubSpotRateLimiter.getInstance();
	const credentials = await this.getCredentials('hubspotAppToken');

	const FormData = (await import('form-data')).default;
	const formData = new FormData();

	formData.append('file', binaryData, {
		filename: fileName,
		contentType: options.mimeType || 'application/octet-stream'
	});

	formData.append('options', JSON.stringify({
		access: options.access || 'PRIVATE'
	}));

	if (options.folderPath) {
		formData.append('folderPath', options.folderPath);
	}

	const requestOptions: IHttpRequestOptions = {
		method: 'POST',
		url: 'https://api.hubapi.com/files/v3/files',
		headers: {
			Authorization: `Bearer ${credentials.appToken}`,
			...formData.getHeaders()
		},
		body: formData
	};

	return rateLimiter.execute(async () => {
		try {
			const response = await this.helpers.httpRequest(requestOptions);

			return {
				data: response,
				headers: response.headers || {},
			};
		} catch (error) {
			const err = error as { statusCode?: number; httpCode?: number; message?: string; description?: string };
			if (err.statusCode === 429 || err.httpCode === 429) {
				throw error;
			}

			throw new NodeApiError(this.getNode(), error as { message: string }, {
				message: err.message || 'HubSpot file upload failed',
				description: err.description,
			});
		}
	});
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function hubspotFileReplaceRequest(
	this: IExecuteFunctions,
	fileId: string,
	binaryData: Buffer,
	fileName: string,
	options: {
		access?: 'PRIVATE' | 'PUBLIC_INDEXABLE' | 'PUBLIC_NOT_INDEXABLE';
		expiresAt?: number;
		mimeType?: string;
	} = {}
): Promise<any> {
	const rateLimiter = HubSpotRateLimiter.getInstance();
	const credentials = await this.getCredentials('hubspotAppToken');

	const FormData = (await import('form-data')).default;
	const formData = new FormData();

	formData.append('file', binaryData, {
		filename: fileName,
		contentType: options.mimeType || 'application/octet-stream'
	});

	const replaceOptions: Record<string, string | number> = {};
	if (options.access) {
		replaceOptions.access = options.access;
	}
	if (options.expiresAt) {
		replaceOptions.expiresAt = options.expiresAt;
	}

	if (Object.keys(replaceOptions).length > 0) {
		formData.append('options', JSON.stringify(replaceOptions));
	}

	const requestOptions: IHttpRequestOptions = {
		method: 'PUT',
		url: `https://api.hubapi.com/files/v3/files/${fileId}`,
		headers: {
			Authorization: `Bearer ${credentials.appToken}`,
			...formData.getHeaders()
		},
		body: formData
	};

	return rateLimiter.execute(async () => {
		try {
			const response = await this.helpers.httpRequest(requestOptions);

			return {
				data: response,
				headers: response.headers || {},
			};
		} catch (error) {
			const err = error as { statusCode?: number; httpCode?: number; message?: string; description?: string };
			if (err.statusCode === 429 || err.httpCode === 429) {
				throw error;
			}

			throw new NodeApiError(this.getNode(), error as { message: string }, {
				message: err.message || 'HubSpot file replace failed',
				description: err.description,
			});
		}
	});
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function hubspotFormSubmitRequest(
	this: IExecuteFunctions,
	portalId: string,
	formGuid: string,
	body: IDataObject,
	useSecureEndpoint: boolean = true,
): Promise<any> {
	const credentials = await this.getCredentials('hubspotAppToken');

	const endpoint = useSecureEndpoint
		? `/submissions/v3/integration/secure/submit/${portalId}/${formGuid}`
		: `/submissions/v3/integration/submit/${portalId}/${formGuid}`;

	const options: IHttpRequestOptions = {
		method: 'POST',
		url: `https://api.hsforms.com${endpoint}`,
		body,
		headers: {
			Authorization: `Bearer ${credentials.appToken}`,
			'Content-Type': 'application/json',
		},
		json: true,
	};

	try {
		const response = await this.helpers.httpRequest(options);
		return response;
	} catch (error) {
		const err = error as { message?: string; description?: string };
		throw new NodeApiError(this.getNode(), error as { message: string }, {
			message: err.message || 'HubSpot form submission failed',
			description: err.description,
		});
	}
}
