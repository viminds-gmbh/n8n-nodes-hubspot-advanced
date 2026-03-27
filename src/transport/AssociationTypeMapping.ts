/**
 * Static mapping of HubSpot default association type IDs
 * Source: /documentation/hubspot/definitions/associations/
 * 
 * This mapping provides the default HUBSPOT_DEFINED association type IDs
 * for standard object types, avoiding unnecessary API calls.
 */

const ASSOCIATION_TYPE_IDS: Record<string, number> = {
	// Contact Associations
	'contacts:contacts': 449,
	'contacts:companies': 279,
	'contacts:deals': 4,
	'contacts:tickets': 15,
	'contacts:calls': 193,
	'contacts:emails': 197,
	'contacts:meetings': 199,
	'contacts:notes': 201,
	'contacts:tasks': 203,
	'contacts:communications': 82,
	'contacts:postal_mail': 454,
	'contacts:carts': 587,
	'contacts:orders': 508,
	'contacts:invoices': 178,
	'contacts:payments': 388,
	'contacts:payment_links': 470,
	'contacts:subscriptions': 296,
	'contacts:appointments': 907,
	'contacts:courses': 861,
	'contacts:listings': 883,
	'contacts:services': 799,
	'contacts:feedback_submissions': 97,
	'contacts:projects': 1243,
	'contacts:leads': 609,
	'contacts:quotes': 70,

	// Company Associations
	'companies:companies': 450,
	'companies:contacts': 280,
	'companies:deals': 342,
	'companies:tickets': 340,
	'companies:calls': 181,
	'companies:emails': 185,
	'companies:leads': 611,
	'companies:meetings': 187,
	'companies:notes': 189,
	'companies:tasks': 191,
	'companies:communications': 88,
	'companies:postal_mail': 460,
	'companies:invoices': 180,
	'companies:orders': 935,
	'companies:payments': 390,
	'companies:payment_links': 472,
	'companies:quotes': 72,
	'companies:subscriptions': 298,
	'companies:appointments': 909,
	'companies:courses': 939,
	'companies:listings': 885,
	'companies:services': 793,
	'companies:feedback_submissions': 929,
	'companies:projects': 1237,

	// Deal Associations
	'deals:deals': 451,
	'deals:contacts': 3,
	'deals:companies': 341,
	'deals:tickets': 27,
	'deals:calls': 205,
	'deals:leads': 1038,
	'deals:emails': 209,
	'deals:goals': 1357,
	'deals:meetings': 211,
	'deals:notes': 213,
	'deals:tasks': 215,
	'deals:communications': 86,
	'deals:postal_mail': 458,
	'deals:line_items': 19,
	'deals:carts': 1346,
	'deals:invoices': 176,
	'deals:orders': 511,
	'deals:payments': 392,
	'deals:payment_links': 474,
	'deals:quotes': 63,
	'deals:subscriptions': 300,
	'deals:appointments': 945,
	'deals:courses': 863,
	'deals:listings': 887,
	'deals:services': 795,
	'deals:feedback_submissions': 985,
	'deals:projects': 1239,

	// Ticket Associations
	'tickets:tickets': 452,
	'tickets:contacts': 16,
	'tickets:companies': 339,
	'tickets:deals': 28,
	'tickets:calls': 219,
	'tickets:emails': 223,
	'tickets:meetings': 225,
	'tickets:notes': 227,
	'tickets:tasks': 229,
	'tickets:communications': 84,
	'tickets:postal_mail': 456,
	'tickets:orders': 526,
	'tickets:appointments': 947,
	'tickets:courses': 941,
	'tickets:listings': 943,
	'tickets:services': 797,
	'tickets:subscriptions': 1122,
	'tickets:payments': 1355,
	'tickets:feedback_submissions': 99,
	'tickets:projects': 1241,

	// Lead Associations
	'leads:contacts': 608,
	'leads:companies': 610,
	'leads:deals': 1037,
	'leads:calls': 596,
	'leads:emails': 598,
	'leads:meetings': 600,
	'leads:notes': 854,
	'leads:tasks': 646,
	'leads:communications': 602,
	'leads:feedback_submissions': 1162,

	// Call Associations
	'calls:contacts': 194,
	'calls:companies': 182,
	'calls:deals': 206,
	'calls:tickets': 220,
	'calls:leads': 597,

	// Email Associations
	'emails:contacts': 198,
	'emails:companies': 186,
	'emails:deals': 210,
	'emails:tickets': 224,
	'emails:leads': 599,

	// Meeting Associations
	'meetings:contacts': 200,
	'meetings:companies': 188,
	'meetings:deals': 212,
	'meetings:tickets': 226,
	'meetings:leads': 601,

	// Note Associations
	'notes:contacts': 202,
	'notes:companies': 190,
	'notes:deals': 214,
	'notes:tickets': 228,
	'notes:leads': 855,

	// Task Associations
	'tasks:contacts': 204,
	'tasks:companies': 192,
	'tasks:deals': 216,
	'tasks:tickets': 230,
	'tasks:quotes': 217,
	'tasks:leads': 647,

	// Communication Associations (SMS, WhatsApp, LinkedIn)
	'communications:contacts': 83,
	'communications:companies': 89,
	'communications:deals': 87,
	'communications:tickets': 85,
	'communications:leads': 603,

	// Postal Mail Associations
	'postal_mail:contacts': 455,
	'postal_mail:companies': 461,
	'postal_mail:deals': 459,
	'postal_mail:tickets': 457,

	// Order Associations
	'orders:calls': 772,
	'orders:carts': 593,
	'orders:contacts': 507,
	'orders:communications': 784,
	'orders:companies': 934,
	'orders:deals': 512,
	'orders:discounts': 519,
	'orders:emails': 776,
	'orders:feedback_submissions': 1168,
	'orders:invoices': 518,
	'orders:line_items': 513,
	'orders:meetings': 768,
	'orders:notes': 764,
	'orders:payments': 523,
	'orders:postal_mail': 789,
	'orders:quotes': 730,
	'orders:subscriptions': 516,
	'orders:tasks': 726,
	'orders:tickets': 525,

	// Cart Associations
	'carts:contacts': 588,
	'carts:deals': 1347,
	'carts:orders': 594,
	'carts:quotes': 733,

	// Line Item Associations
	'line_items:deals': 20,
	'line_items:orders': 514,
	'line_items:quotes': 68,

	// Quote Associations
	'quotes:contacts': 69,
	'quotes:companies': 71,
	'quotes:deals': 64,
	'quotes:line_items': 67,
	'quotes:discounts': 362,
	'quotes:fees': 364,
	'quotes:taxes': 366,
	'quotes:tasks': 217,
	'quotes:carts': 733,
	'quotes:invoices': 408,
	'quotes:orders': 731,
	'quotes:payments': 398,
	'quotes:subscriptions': 304,
	'quotes:feedback_submissions': 1172,

	// Invoice Associations
	'invoices:contacts': 179,
	'invoices:companies': 181,
	'invoices:deals': 177,
	'invoices:orders': 519,
	'invoices:quotes': 409,

	// Payment Associations
	'payments:contacts': 389,
	'payments:companies': 391,
	'payments:deals': 393,
	'payments:tickets': 1356,
	'payments:orders': 524,
	'payments:quotes': 399,

	// Payment Link Associations
	'payment_links:contacts': 471,
	'payment_links:companies': 473,
	'payment_links:deals': 475,

	// Subscription Associations
	'subscriptions:contacts': 297,
	'subscriptions:companies': 299,
	'subscriptions:deals': 301,
	'subscriptions:tickets': 1123,
	'subscriptions:orders': 517,
	'subscriptions:quotes': 305,

	// Discount Associations
	'discounts:orders': 520,
	'discounts:quotes': 363,

	// Fee Associations
	'fees:quotes': 365,

	// Tax Associations
	'taxes:quotes': 367,

	// Appointment Associations
	'appointments:contacts': 908,
	'appointments:companies': 910,
	'appointments:deals': 946,
	'appointments:tickets': 948,

	// Course Associations
	'courses:contacts': 862,
	'courses:companies': 940,
	'courses:deals': 864,
	'courses:tickets': 942,

	// Listing Associations
	'listings:contacts': 884,
	'listings:companies': 886,
	'listings:deals': 888,
	'listings:tickets': 944,

	// Service Associations
	'services:contacts': 800,
	'services:companies': 794,
	'services:deals': 796,
	'services:tickets': 798,

	// Project Associations
	'projects:contacts': 1244,
	'projects:companies': 1238,
	'projects:deals': 1240,
	'projects:tickets': 1242,

	// Feedback Submission Associations
	'feedback_submissions:contacts': 98,
	'feedback_submissions:companies': 930,
	'feedback_submissions:deals': 986,
	'feedback_submissions:tickets': 100,
	'feedback_submissions:leads': 1163,
	'feedback_submissions:orders': 1169,
	'feedback_submissions:quotes': 1173,

	// Goal Associations
	'goals:deals': 1358,
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
