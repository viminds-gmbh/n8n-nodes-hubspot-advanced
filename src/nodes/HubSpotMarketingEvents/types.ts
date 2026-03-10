import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';

export interface EventCreateFields {
	externalAccountId?: string;
	startDateTime?: string;
	endDateTime?: string;
	eventUrl?: string;
	eventDescription?: string;
	eventType?: string;
	eventCancelled?: boolean;
}

export interface CustomProperty {
	name: string;
	value: string;
}

export interface EventCreateParams {
	eventName: string;
	eventOrganizer: string;
	externalEventId: string;
	createFields: EventCreateFields;
	customProperties: { property?: CustomProperty[] };
}

export interface EventUpdateFields {
	eventName?: string;
	eventOrganizer?: string;
	startDateTime?: string;
	endDateTime?: string;
	eventUrl?: string;
	eventDescription?: string;
	eventType?: string;
	eventCancelled?: boolean;
}

export interface EventUpdateParams {
	objectId: string;
	updateFields: EventUpdateFields;
	customProperties: { property?: CustomProperty[] };
}

export interface ContactOperationParams {
	objectId: string;
	identifierType: string;
	interactionDateTimeField: string;
}

export interface OperationContext {
	context: IExecuteFunctions;
	items: INodeExecutionData[];
	itemIndex: number;
}
