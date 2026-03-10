import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';

import { hubspotApiRequest, hubspotBatchRequest, hubspotApiRequestForLoadOptions } from '../../transport/HubSpotApiRequest';
import { HUBSPOT_OBJECT_TYPE_OPTIONS } from '../../types';

export class HubSpotAssociations implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'HubSpot Associations',
		name: 'hubSpotAssociations',
		icon: 'file:../../icon.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + ($parameter["fromObjectType"] === "custom" ? $parameter["customFromObjectType"] : $parameter["fromObjectType"]) + " → " + ($parameter["toObjectType"] === "custom" ? $parameter["customToObjectType"] : $parameter["toObjectType"])}}',
		description: 'Manage HubSpot object associations',
		defaults: {
			name: 'HubSpot Associations',
		},
		codex: {
			categories: ['Marketing & Content'],
			subcategories: {
				'Marketing & Content': ['CRM'],
			},
			alias: [
				'HubSpot Advanced',
				'viminds',
				'viminds HubSpot',
				'HubSpot viminds',
				'Advanced HubSpot',
				'HubSpot Pro',
				'HubSpot Extended',
				'HubSpot Batch',
				'HubSpot Rate Limit',
				'HubSpot Association',
				'HubSpot Hydrate',
				'HubSpot Custom Objects',
				'HubSpot Search',
				'HubSpot Filter',
			],
			resources: {
				primaryDocumentation: [
					{
						url: 'https://viminds.de',
					},
				],
			},
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'hubspotAppToken',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Get Associations',
						value: 'getAssociations',
						description: 'Get associated object IDs',
					},
					{
						name: 'Hydrate Associations',
						value: 'hydrateAssociations',
						description: 'Get full associated objects with properties',
					},
					{
						name: 'Create Association',
						value: 'createAssociation',
						description: 'Associate two objects',
					},
					{
						name: 'Delete Association',
						value: 'deleteAssociation',
						description: 'Remove association between objects',
					},
				],
				default: 'hydrateAssociations',
				required: true,
			},
			{
				displayName: 'From Object Type',
				name: 'fromObjectType',
				type: 'options',
				options: [...HUBSPOT_OBJECT_TYPE_OPTIONS],
				default: 'contacts',
				required: true,
				description: 'The source object type for the association. <a href="https://developers.hubspot.com/docs/api/crm/associations" target="_blank">Learn more about associations</a>.',
			},
			{
				displayName: 'Custom From Object Type',
				name: 'customFromObjectType',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'cars',
				description: 'The name or ID of the custom source object type (e.g., "cars" or "2-12345").',
				displayOptions: {
					show: {
						fromObjectType: ['custom'],
					},
				},
			},
			{
				displayName: 'To Object Type',
				name: 'toObjectType',
				type: 'options',
				options: [...HUBSPOT_OBJECT_TYPE_OPTIONS],
				default: 'companies',
				required: true,
				description: 'The target object type for the association.',
			},
			{
				displayName: 'Custom To Object Type',
				name: 'customToObjectType',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'cars',
				description: 'The name or ID of the custom target object type (e.g., "cars" or "2-12345").',
				displayOptions: {
					show: {
						toObjectType: ['custom'],
					},
				},
			},
			{
				displayName: 'ID Field',
				name: 'idField',
				type: 'string',
				default: 'id',
				placeholder: 'id',
				description: 'Field name in input items containing the source object ID. The node will process all input items in batch.',
				displayOptions: {
					show: {
						operation: ['getAssociations', 'hydrateAssociations'],
					},
				},
			},
			{
				displayName: 'Properties',
				name: 'properties',
				type: 'multiOptions',
				typeOptions: {
					loadOptionsMethod: 'getProperties',
					loadOptionsDependsOn: ['toObjectType', 'customToObjectType'],
				},
				default: '',
				placeholder: 'name,domain,industry',
				description: 'Properties to return for associated objects when using "Hydrate Associations". Leave empty to return only IDs.',
				displayOptions: {
					show: {
						operation: ['hydrateAssociations'],
					},
				},
			},
			{
				displayName: 'Output Field',
				name: 'outputField',
				type: 'string',
				default: 'associations',
				placeholder: 'associations',
				description: 'The field name where associations will be stored in the output. Default: "associations".',
				displayOptions: {
					show: {
						operation: ['getAssociations', 'hydrateAssociations'],
					},
				},
			},
			{
				displayName: 'From Object ID',
				name: 'fromObjectId',
				type: 'string',
				default: '',
				required: true,
				placeholder: '12345678',
				description: 'The ID of the source object to associate or disassociate.',
				displayOptions: {
					show: {
						operation: ['createAssociation', 'deleteAssociation'],
					},
				},
			},
			{
				displayName: 'To Object ID',
				name: 'toObjectId',
				type: 'string',
				default: '',
				required: true,
				placeholder: '87654321',
				description: 'The ID of the target object to associate or disassociate.',
				displayOptions: {
					show: {
						operation: ['createAssociation', 'deleteAssociation'],
					},
				},
			},
		],
	};

	methods = {
		loadOptions: {
			async getProperties(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const { PropertyCache } = await import('../../transport/PropertyCache');

				const toObjectTypeRaw = this.getCurrentNodeParameter('toObjectType') as string;
				const toObjectType = toObjectTypeRaw === 'custom'
					? this.getCurrentNodeParameter('customToObjectType') as string
					: toObjectTypeRaw;

				// Get credential ID for cache isolation
				const credentials = await this.getCredentials('hubspotAppToken');
				const credentialId = (credentials.appToken as string).slice(-8); // Use last 8 chars as ID

				const cache = PropertyCache.getInstance();
				const cached = cache.get(toObjectType, credentialId);
				if (cached) {
					return cached;
				}

				const response = await hubspotApiRequestForLoadOptions.call(
					this,
					'GET',
					`/crm/v3/properties/${toObjectType}`,
				);

				const options: INodePropertyOptions[] = [];
				if (response.results) {
					for (const property of response.results) {
						options.push({
							name: property.label || property.name,
							value: property.name,
						});
					}
				}

				cache.set(toObjectType, options, credentialId);
				return options;
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const operation = this.getNodeParameter('operation', 0) as string;
		const fromObjectTypeRaw = this.getNodeParameter('fromObjectType', 0) as string;
		const fromObjectType = fromObjectTypeRaw === 'custom'
			? (this.getNodeParameter('customFromObjectType', 0) as string)
			: fromObjectTypeRaw;
		const toObjectTypeRaw = this.getNodeParameter('toObjectType', 0) as string;
		const toObjectType = toObjectTypeRaw === 'custom'
			? (this.getNodeParameter('customToObjectType', 0) as string)
			: toObjectTypeRaw;

		if (operation === 'getAssociations' || operation === 'hydrateAssociations') {
			const idField = this.getNodeParameter('idField', 0) as string;
			const outputField = this.getNodeParameter('outputField', 0) as string;

			const objectIds = items
				.map((item) => item.json[idField] as string)
				.filter((id) => id);

			if (objectIds.length === 0) {
				throw new Error(`No valid IDs found in field "${idField}"`);
			}

			const batchSize = 1000;
			const allAssociations: Array<{ 
			from: { id: string }; 
			to: Array<{ 
				toObjectId: number; 
				associationTypes: Array<{ category: string; typeId: number; label: string | null }> 
			}> 
		}> = [];

			for (let i = 0; i < objectIds.length; i += batchSize) {
				const batch = objectIds.slice(i, i + batchSize);

				const body = {
					inputs: batch.map((id) => ({ id })),
				};

				const response = await hubspotApiRequest.call(
					this,
					'POST',
					`/crm/v4/associations/${fromObjectType}/${toObjectType}/batch/read`,
					body,
				);

				if (response.results) {
					allAssociations.push(...response.results);
				}
			}

			const associationMap = new Map<string, Array<{ 
			toObjectId: number; 
			associationTypes: Array<{ category: string; typeId: number; label: string | null }> 
		}>>();
			allAssociations.forEach((assoc) => {
				const fromId = assoc.from.id;
				if (!associationMap.has(fromId)) {
					associationMap.set(fromId, []);
				}
				associationMap.get(fromId)!.push(...assoc.to);
			});

			if (operation === 'hydrateAssociations') {
				const properties = this.getNodeParameter('properties', 0, []) as string[] | string;
				const propertyList = Array.isArray(properties) ? properties : (properties ? properties.split(',').map((p) => p.trim()) : []);

				const uniqueToIds = new Set<string>();
				allAssociations.forEach((assoc) => {
					assoc.to.forEach((toObj) => {
						uniqueToIds.add(toObj.toObjectId.toString());
					});
				});

				const toIdsArray = Array.from(uniqueToIds);
				const hydratedObjects = await hubspotBatchRequest.call(
					this,
					toObjectType,
					toIdsArray,
					propertyList,
				);

				const objectMap = new Map<string, { id: string; [key: string]: unknown }>();
				hydratedObjects.forEach((obj) => {
					const id = String(obj.id);
					objectMap.set(id, obj as { id: string; [key: string]: unknown });
				});

				items.forEach((item, index) => {
					const objectId = item.json[idField] as string;
					const associations = associationMap.get(objectId) || [];

					const enrichedAssociations = associations.map((assoc) => {
						const toId = assoc.toObjectId.toString();
						const fullObject = objectMap.get(toId);
						return {
							id: toId,
							associationTypes: assoc.associationTypes,
							object: fullObject || null,
						};
					});

					returnData.push({
						json: {
							...item.json,
							[outputField]: enrichedAssociations,
						},
						pairedItem: { item: index },
					});
				});
			} else {
				items.forEach((item, index) => {
					const objectId = item.json[idField] as string;
					const associations = associationMap.get(objectId) || [];

					returnData.push({
						json: {
							...item.json,
							[outputField]: associations,
						},
						pairedItem: { item: index },
					});
				});
			}
		} else if (operation === 'createAssociation') {
			for (let i = 0; i < items.length; i++) {
				const fromObjectId = this.getNodeParameter('fromObjectId', i) as string;
				const toObjectId = this.getNodeParameter('toObjectId', i) as string;

				await hubspotApiRequest.call(
					this,
					'PUT',
					`/crm/v4/objects/${fromObjectType}/${fromObjectId}/associations/${toObjectType}/${toObjectId}`,
				);

				returnData.push({
					json: {
						success: true,
						from: { type: fromObjectType, id: fromObjectId },
						to: { type: toObjectType, id: toObjectId },
					},
					pairedItem: { item: i },
				});
			}
		} else if (operation === 'deleteAssociation') {
			for (let i = 0; i < items.length; i++) {
				const fromObjectId = this.getNodeParameter('fromObjectId', i) as string;
				const toObjectId = this.getNodeParameter('toObjectId', i) as string;

				await hubspotApiRequest.call(
					this,
					'DELETE',
					`/crm/v4/objects/${fromObjectType}/${fromObjectId}/associations/${toObjectType}/${toObjectId}`,
				);

				returnData.push({
					json: {
						success: true,
						from: { type: fromObjectType, id: fromObjectId },
						to: { type: toObjectType, id: toObjectId },
					},
					pairedItem: { item: i },
				});
			}
		}

		return [returnData];
	}
}
