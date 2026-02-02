import {
  ICredentialData,
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class HubSpotApi implements ICredentialType {
  name = 'hubSpotApi';
  displayName = 'HubSpot API';
  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: {
        password: true,
      },
      default: '',
      description: 'Your HubSpot API Key',
    },
  ];

  async test(this: ICredentialData): Promise<unknown> {
    const credentials = this.getCredentials('hubSpotApi');
    const apiKey = credentials.apiKey as string;

    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts?limit=1', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error('Invalid API Key');
    }

    return { status: 'success' };
  }
}
