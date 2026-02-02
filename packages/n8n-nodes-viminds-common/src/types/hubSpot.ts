export interface HubSpotRateLimitConfig {
  burstLimit: number;
  dailyLimit?: number;
  retryAfter?: number;
}

export interface HubSpotAPIError {
  status: number;
  message: string;
  category?: string;
  context?: Record<string, unknown>;
}

export interface HubSpotDealAssociation {
  id: string;
  type: string;
  toObjectId: string;
  toObjectType: string;
}

export interface HubSpotFileUpload {
  fileName: string;
  fileType: string;
  fileSize: number;
  fileData: Buffer | string;
  folderPath?: string;
}

export interface HubSpotTriggerPayload {
  eventType: string;
  objectId: string;
  objectType: string;
  timestamp: number;
  data?: Record<string, unknown>;
}

export interface HubSpotCredentials {
  apiKey: string;
}
