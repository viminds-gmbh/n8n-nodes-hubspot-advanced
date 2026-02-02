import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';
import { HubSpotClient } from 'n8n-nodes-viminds-common';
import { HubSpotDealAssociation } from 'n8n-nodes-viminds-common';

export class GetDealAssociations implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Get Deal Associations',
    name: 'getDealAssociations',
    group: ['viminds'],
    version: 1,
    description: 'Retrieve associations for a HubSpot deal',
    defaults: {
      name: 'Get Deal Associations',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'hubSpotApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Deal ID',
        name: 'dealId',
        type: 'string',
        required: true,
        default: '',
        description: 'The ID of the deal to get associations for',
      },
      {
        displayName: 'Association Types',
        name: 'associationTypes',
        type: 'multiOptions',
        options: [
          {
            name: 'Contact',
            value: 'contact',
          },
          {
            name: 'Company',
            value: 'company',
          },
          {
            name: 'Ticket',
            value: 'ticket',
          },
          {
            name: 'Meeting',
            value: 'meeting',
          },
          {
            name: 'Call',
            value: 'call',
          },
        ],
        required: true,
        default: ['contact', 'company'],
        description: 'The types of associations to retrieve',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      const dealId = this.getNodeParameter('dealId', i) as string;
      const associationTypes = this.getNodeParameter(
        'associationTypes',
        i
      ) as string[];

      const credentials = await this.getCredentials('hubSpotApi');
      const apiKey = credentials.apiKey as string;

      const rateLimiter = new (await import('n8n-nodes-viminds-common')).RateLimiter({
        burstLimit: 100,
      });
      const client = new HubSpotClient({ apiKey }, rateLimiter);

      const associations: HubSpotDealAssociation[] = [];

      for (const type of associationTypes) {
        try {
          const endpoint = `/crm/v3/objects/deals/${dealId}/associations/${type}`;
          const response = await client.get<{ results: unknown[] }>(endpoint);

          if (response.results && Array.isArray(response.results)) {
            for (const result of response.results) {
              associations.push({
                id: (result as { toObjectId?: string })?.toObjectId || '',
                type,
                toObjectId: (result as { toObjectId?: string })?.toObjectId || '',
                toObjectType: type,
              });
            }
          }
        } catch (error) {
          this.logger.error(`Error fetching ${type} associations: ${error}`);
        }
      }

      returnData.push({
        json: {
          dealId,
          associations,
          count: associations.length,
        },
      });
    }

    return [returnData];
  }
}
