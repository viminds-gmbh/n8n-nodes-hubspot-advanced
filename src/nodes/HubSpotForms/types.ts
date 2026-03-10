import type { IDataObject } from 'n8n-workflow';

export interface FormField {
	objectTypeId: string;
	name: string;
	value: string;
}

export interface FormContext {
	pageUri?: string;
	pageName?: string;
	hutk?: string;
	ipAddress?: string;
}

export interface FormCommunication {
	value: boolean;
	subscriptionTypeId: number;
	text?: string;
}

export interface FormSubmissionBody extends IDataObject {
	fields: FormField[];
	context: FormContext;
	legalConsentOptions?: {
		consent: {
			consentToProcess: boolean;
			text: string;
			communications: FormCommunication[];
		};
	};
}
