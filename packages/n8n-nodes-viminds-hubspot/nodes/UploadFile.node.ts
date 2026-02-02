import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';
import { HubSpotClient } from 'n8n-nodes-viminds-common';
import { HubSpotFileUpload } from 'n8n-nodes-viminds-common';

export class UploadFile implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Upload File to HubSpot',
    name: 'uploadFile',
    group: ['viminds'],
    version: 1,
    description: 'Upload a file to HubSpot files',
    defaults: {
      name: 'Upload File',
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
        displayName: 'File Name',
        name: 'fileName',
        type: 'string',
        required: true,
        default: '',
        description: 'The name of the file to upload',
      },
      {
        displayName: 'File Type',
        name: 'fileType',
        type: 'options',
        options: [
          {
            name: 'PDF',
            value: 'PDF',
          },
          {
            name: 'Image',
            value: 'IMAGE',
          },
          {
            name: 'Document',
            value: 'DOCUMENT',
          },
          {
            name: 'Other',
            value: 'OTHER',
          },
        ],
        required: true,
        default: 'DOCUMENT',
        description: 'The type of file being uploaded',
      },
      {
        displayName: 'File Data',
        name: 'fileData',
        type: 'string',
        required: true,
        default: '',
        description: 'The base64 encoded file data',
      },
      {
        displayName: 'Folder Path',
        name: 'folderPath',
        type: 'string',
        required: false,
        default: '',
        description: 'The folder path where the file should be stored',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      const fileName = this.getNodeParameter('fileName', i) as string;
      const fileType = this.getNodeParameter('fileType', i) as string;
      const fileData = this.getNodeParameter('fileData', i) as string;
      const folderPath = this.getNodeParameter('folderPath', i) as string;

      const credentials = await this.getCredentials('hubSpotApi');
      const apiKey = credentials.apiKey as string;

      const rateLimiter = new (await import('n8n-nodes-viminds-common')).RateLimiter({
        burstLimit: 100,
      });
      const client = new HubSpotClient({ apiKey }, rateLimiter);

      try {
        const fileUpload: HubSpotFileUpload = {
          fileName,
          fileType,
          fileData: Buffer.from(fileData, 'base64'),
          folderPath,
        };

        const endpoint = '/files/v3/files';
        const response = await client.post<{ id: string }>(endpoint, {
          options: {
            access: 'PRIVATE',
            overwrite: true,
            folderPath,
          },
          file: {
            fileName,
            fileType,
          },
        });

        returnData.push({
          json: {
            success: true,
            fileId: response.id,
            fileName,
            fileType,
          },
        });
      } catch (error) {
        this.logger.error(`Error uploading file: ${error}`);
        returnData.push({
          json: {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          },
        });
      }
    }

    return [returnData];
  }
}
