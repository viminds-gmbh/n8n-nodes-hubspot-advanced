import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { executeCrmOperation } from '../../src/nodes/HubSpotCrm/operations/crmOperations';

jest.mock('../../src/transport/HubSpotApiRequest', () => ({
	hubspotApiRequest: jest.fn(),
	hubspotApiRequestAllItems: jest.fn(),
	hubspotBatchRequest: jest.fn(),
}));

const { hubspotApiRequestAllItems } = require('../../src/transport/HubSpotApiRequest');

describe('CRM Filter Operators', () => {
	let mockContext: Partial<IExecuteFunctions>;

	beforeEach(() => {
		jest.clearAllMocks();
		
		mockContext = {
			getNodeParameter: jest.fn(),
			getInputData: jest.fn(() => [{ json: {} }]),
		};

		hubspotApiRequestAllItems.mockResolvedValue([
			{ id: '1', properties: { email: 'test1@example.com' } },
			{ id: '2', properties: { email: 'test2@example.com' } },
		]);
	});

	describe('IN operator', () => {
		it('should handle array values for IN operator', async () => {
			const emailArray = ['test1@example.com', 'test2@example.com', 'test3@example.com'];
			
			(mockContext.getNodeParameter as jest.Mock).mockImplementation((param: string) => {
				switch (param) {
					case 'returnAll':
						return false;
					case 'limit':
						return 100;
					case 'properties':
						return ['email', 'firstname'];
					case 'filters':
						return {
							filterGroups: [
								{
									propertyName: 'email',
									operator: 'IN',
									values: emailArray,
								},
							],
						};
					case 'sort':
						return {};
					default:
						return undefined;
				}
			});

			await executeCrmOperation(
				mockContext as IExecuteFunctions,
				'search',
				'contacts',
				[{ json: {} }],
				0,
			);

			expect(hubspotApiRequestAllItems).toHaveBeenCalledWith(
				'POST',
				'/crm/v3/objects/contacts/search',
				expect.objectContaining({
					filterGroups: [
						{
							filters: [
								{
									propertyName: 'email',
									operator: 'IN',
									values: ['test1@example.com', 'test2@example.com', 'test3@example.com'],
								},
							],
						},
					],
				}),
				100,
			);
		});
	});

	describe('NOT_IN operator', () => {
		it('should handle array values for NOT_IN operator', async () => {
			const statusArray = ['closed', 'cancelled'];
			
			(mockContext.getNodeParameter as jest.Mock).mockImplementation((param: string) => {
				switch (param) {
					case 'returnAll':
						return false;
					case 'limit':
						return 100;
					case 'properties':
						return ['dealname', 'dealstage'];
					case 'filters':
						return {
							filterGroups: [
								{
									propertyName: 'dealstage',
									operator: 'NOT_IN',
									values: statusArray,
								},
							],
						};
					case 'sort':
						return {};
					default:
						return undefined;
				}
			});

			await executeCrmOperation(
				mockContext as IExecuteFunctions,
				'search',
				'deals',
				[{ json: {} }],
				0,
			);

			expect(hubspotApiRequestAllItems).toHaveBeenCalledWith(
				'POST',
				'/crm/v3/objects/deals/search',
				expect.objectContaining({
					filterGroups: [
						{
							filters: [
								{
									propertyName: 'dealstage',
									operator: 'NOT_IN',
									values: ['closed', 'cancelled'],
								},
							],
						},
					],
				}),
				100,
			);
		});
	});

	describe('BETWEEN operator', () => {
		it('should handle value and highValue for BETWEEN operator', async () => {
			(mockContext.getNodeParameter as jest.Mock).mockImplementation((param: string) => {
				switch (param) {
					case 'returnAll':
						return false;
					case 'limit':
						return 100;
					case 'properties':
						return ['dealname', 'amount'];
					case 'filters':
						return {
							filterGroups: [
								{
									propertyName: 'amount',
									operator: 'BETWEEN',
									value: '1000',
									highValue: '5000',
								},
							],
						};
					case 'sort':
						return {};
					default:
						return undefined;
				}
			});

			await executeCrmOperation(
				mockContext as IExecuteFunctions,
				'search',
				'deals',
				[{ json: {} }],
				0,
			);

			expect(hubspotApiRequestAllItems).toHaveBeenCalledWith(
				'POST',
				'/crm/v3/objects/deals/search',
				expect.objectContaining({
					filterGroups: [
						{
							filters: [
								{
									propertyName: 'amount',
									operator: 'BETWEEN',
									value: '1000',
									highValue: '5000',
								},
							],
						},
					],
				}),
				100,
			);
		});
	});

	describe('HAS_PROPERTY and NOT_HAS_PROPERTY operators', () => {
		it('should not include value for HAS_PROPERTY operator', async () => {
			(mockContext.getNodeParameter as jest.Mock).mockImplementation((param: string) => {
				switch (param) {
					case 'returnAll':
						return false;
					case 'limit':
						return 100;
					case 'properties':
						return ['email', 'phone'];
					case 'filters':
						return {
							filterGroups: [
								{
									propertyName: 'phone',
									operator: 'HAS_PROPERTY',
									value: '',
								},
							],
						};
					case 'sort':
						return {};
					default:
						return undefined;
				}
			});

			await executeCrmOperation(
				mockContext as IExecuteFunctions,
				'search',
				'contacts',
				[{ json: {} }],
				0,
			);

			expect(hubspotApiRequestAllItems).toHaveBeenCalledWith(
				'POST',
				'/crm/v3/objects/contacts/search',
				expect.objectContaining({
					filterGroups: [
						{
							filters: [
								{
									propertyName: 'phone',
									operator: 'HAS_PROPERTY',
								},
							],
						},
					],
				}),
				100,
			);
		});

		it('should not include value for NOT_HAS_PROPERTY operator', async () => {
			(mockContext.getNodeParameter as jest.Mock).mockImplementation((param: string) => {
				switch (param) {
					case 'returnAll':
						return false;
					case 'limit':
						return 100;
					case 'properties':
						return ['email', 'phone'];
					case 'filters':
						return {
							filterGroups: [
								{
									propertyName: 'phone',
									operator: 'NOT_HAS_PROPERTY',
									value: '',
								},
							],
						};
					case 'sort':
						return {};
					default:
						return undefined;
				}
			});

			await executeCrmOperation(
				mockContext as IExecuteFunctions,
				'search',
				'contacts',
				[{ json: {} }],
				0,
			);

			expect(hubspotApiRequestAllItems).toHaveBeenCalledWith(
				'POST',
				'/crm/v3/objects/contacts/search',
				expect.objectContaining({
					filterGroups: [
						{
							filters: [
								{
									propertyName: 'phone',
									operator: 'NOT_HAS_PROPERTY',
								},
							],
						},
					],
				}),
				100,
			);
		});
	});
});
