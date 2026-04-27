import type { INodeExecutionData } from 'n8n-workflow';

export interface FieldValidationResult {
	valid: boolean;
	availableFields: string[];
	missingCount: number;
	presentCount: number;
}

export function validateFieldMapping(
	items: INodeExecutionData[],
	fieldName: string,
): FieldValidationResult {
	if (!items || items.length === 0) {
		return {
			valid: false,
			availableFields: [],
			missingCount: 0,
			presentCount: 0,
		};
	}

	let presentCount = 0;
	const allFieldsSet = new Set<string>();

	for (const item of items) {
		if (item.json[fieldName] !== undefined && item.json[fieldName] !== null && item.json[fieldName] !== '') {
			presentCount++;
		}

		Object.keys(item.json).forEach(key => allFieldsSet.add(key));
	}

	const availableFields = Array.from(allFieldsSet).sort();
	const missingCount = items.length - presentCount;

	return {
		valid: presentCount > 0,
		availableFields,
		missingCount,
		presentCount,
	};
}

export function buildFieldNotFoundError(
	fieldName: string,
	availableFields: string[],
	fieldPurpose: string = 'ID',
): string {
	const fieldList = availableFields.length > 0
		? availableFields.slice(0, 10).join(', ') + (availableFields.length > 10 ? ', ...' : '')
		: 'none';

	return `No ${fieldPurpose} found in input items using field "${fieldName}".

Available fields in your input data: ${fieldList}

Tip: Make sure you enter the field NAME (e.g., "hs_object_id"), not the field VALUE (e.g., "12345").`;
}

export function buildPartialFieldWarning(
	fieldName: string,
	presentCount: number,
	missingCount: number,
	totalCount: number,
): string {
	return `Warning: Field "${fieldName}" is missing in ${missingCount} of ${totalCount} input items. Only ${presentCount} items will be processed.`;
}

export function getAvailableFieldsFromItems(items: INodeExecutionData[]): string[] {
	const allFieldsSet = new Set<string>();

	for (const item of items) {
		Object.keys(item.json).forEach(key => allFieldsSet.add(key));
	}

	return Array.from(allFieldsSet).sort();
}
