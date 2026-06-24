import {
	contactAssociations,
	companyAssociations,
	dealAssociations,
	ticketAssociations,
	leadAssociations,
	callAssociations,
	emailAssociations,
	meetingAssociations,
	noteAssociations,
	taskAssociations,
	communicationAssociations,
	postalMailAssociations,
	orderAssociations,
	cartAssociations,
	lineItemAssociations,
	quoteAssociations,
	invoiceAssociations,
	paymentAssociations,
	paymentLinkAssociations,
	subscriptionAssociations,
	discountAssociations,
	feeAssociations,
	taxAssociations,
	appointmentAssociations,
	courseAssociations,
	listingAssociations,
	serviceAssociations,
	projectAssociations,
	feedbackSubmissionAssociations,
	goalAssociations,
	marketingEventAssociations,
} from './associations';

const ASSOCIATION_TYPE_IDS: Record<string, number> = {
	...contactAssociations,
	...companyAssociations,
	...dealAssociations,
	...ticketAssociations,
	...leadAssociations,
	...callAssociations,
	...emailAssociations,
	...meetingAssociations,
	...noteAssociations,
	...taskAssociations,
	...communicationAssociations,
	...postalMailAssociations,
	...orderAssociations,
	...cartAssociations,
	...lineItemAssociations,
	...quoteAssociations,
	...invoiceAssociations,
	...paymentAssociations,
	...paymentLinkAssociations,
	...subscriptionAssociations,
	...discountAssociations,
	...feeAssociations,
	...taxAssociations,
	...appointmentAssociations,
	...courseAssociations,
	...listingAssociations,
	...serviceAssociations,
	...projectAssociations,
	...feedbackSubmissionAssociations,
	...goalAssociations,
	...marketingEventAssociations,
};

/**
 * Get the default association type ID for two object types
 * @param fromObjectType - Source object type (e.g., 'contacts')
 * @param toObjectType - Target object type (e.g., 'companies')
 * @returns Association type ID or null if not found
 */
export function getAssociationTypeId(
	fromObjectType: string,
	toObjectType: string,
): number | null {
	const key = `${fromObjectType}:${toObjectType}`;
	return ASSOCIATION_TYPE_IDS[key] ?? null;
}

/**
 * Check if an object type is a custom object
 * Custom objects either start with a number (e.g., "2-12345") or contain a hyphen
 * @param objectType - Object type to check
 * @returns true if custom object
 */
export function isCustomObjectType(objectType: string): boolean {
	// Custom objects: "2-12345" (ID format) or user-defined names
	// Standard objects: "contacts", "companies", "deals", etc.
	return /^\d/.test(objectType) || objectType.includes('-');
}
