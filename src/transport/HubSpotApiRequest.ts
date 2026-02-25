import type {
	IExecuteFunctions,
	IDataObject,
	IHttpRequestOptions,
	IHttpRequestMethods,
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { HubSpotRateLimiter } from './RateLimiter';
import type { HubSpotApiResponse } from '../types';

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
		} catch (error: any) {
			if (error.statusCode === 429 || error.httpCode === 429) {
				throw error;
			}

			throw new NodeApiError(this.getNode(), error, {
				message: error.message || 'HubSpot API request failed',
				description: error.description,
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
): Promise<any[]> {
	const results: any[] = [];
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
			results.push(...response.results);
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
): Promise<any[]> {
	const batchSize = 100;
	const results: any[] = [];

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

		if (response.results) {
			results.push(...response.results);
		}
	}

	return results;
}

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
	} catch (error: any) {
		throw new Error(`HubSpot API request failed: ${error.message}`);
	}
}
