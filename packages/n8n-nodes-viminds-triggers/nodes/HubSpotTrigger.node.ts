import {
  ITriggerFunctions,
  INodeType,
  INodeTypeDescription,
  ITriggerResponse,
} from 'n8n-workflow';

export class HubSpotTrigger implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'HubSpot Trigger',
    name: 'hubSpotTrigger',
    group: ['viminds'],
    version: 1,
    description: 'Trigger on HubSpot events',
    defaults: {
      name: 'HubSpot Trigger',
    },
    inputs: [],
    outputs: ['main'],
    credentials: [
      {
        name: 'hubSpotApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Event Type',
        name: 'eventType',
        type: 'options',
        options: [
          {
            name: 'Deal Created',
            value: 'deal.created',
          },
          {
            name: 'Deal Updated',
            value: 'deal.updated',
          },
          {
            name: 'Contact Created',
            value: 'contact.created',
          },
          {
            name: 'Contact Updated',
            value: 'contact.updated',
          },
          {
            name: 'Company Created',
            value: 'company.created',
          },
        ],
        required: true,
        default: 'deal.created',
        description: 'The type of event to trigger on',
      },
      {
        displayName: 'Poll Interval (minutes)',
        name: 'pollInterval',
        type: 'number',
        required: true,
        default: 5,
        description: 'How often to poll for changes (in minutes)',
      },
    ],
  };

  async poll(this: ITriggerFunctions): Promise<ITriggerResponse> {
    const eventType = this.getNodeParameter('eventType') as string;
    const credentials = await this.getCredentials('hubSpotApi');
    const apiKey = credentials.apiKey as string;

    // Mock implementation - in real scenario, would query HubSpot API
    // for new/updated objects since last poll
    const mockPayload = {
      eventType,
      objectId: 'test-id',
      objectType: eventType.split('.')[0],
      timestamp: Date.now(),
      data: {
        name: 'Test Object',
      },
    };

    return {
      json: mockPayload,
    };
  }
}
