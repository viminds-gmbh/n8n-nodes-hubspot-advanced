# Custom Channels API

Total endpoints: 13

---

### Get a custom channel

**Method:** `GET`

**URL:** `https://api.hubapi.com/conversations/v3/custom-channels/:channelId`

**Description:** Retrieve the details about a custom channel. This API allows you to see a custom channel's current capabilties and other configuration metadata

**Path Variables:**

- `channelId`: (Required) 

**Headers:**


**Success Response (200):**

```json
{
  "capabilities": {
    "est_3c4": {},
    "et07": {}
  },
  "createdAt": "<dateTime>",
  "id": "<string>",
  "name": "<string>",
  "channelAccountConnectionRedirectUrl": "<string>",
  "webhookUrl": "<string>"
}
```

---

### Update a custom channel

**Method:** `PATCH`

**URL:** `https://api.hubapi.com/conversations/v3/custom-channels/:channelId`

**Description:** This endpoint can be used to update a channel's capabilities. You can also use it to update the channel's webhookUri and its channelAccountConnectionRedirectUrl.

**Path Variables:**

- `channelId`: (Required) 

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "capabilities": {
    "nostrud_0_3": {},
    "laboreb": {}
  },
  "channelAccountConnectionRedirectUrl": {},
  "webhookUrl": {},
  "channelDescription": {},
  "channelLogoUrl": {},
  "name": {}
}
```

**Success Response (200):**

```json
{
  "capabilities": {
    "est_3c4": {},
    "et07": {}
  },
  "createdAt": "<dateTime>",
  "id": "<string>",
  "name": "<string>",
  "channelAccountConnectionRedirectUrl": "<string>",
  "webhookUrl": "<string>"
}
```

---

### Get all channels for app

**Method:** `GET`

**URL:** `https://api.hubapi.com/conversations/v3/custom-channels/?after=<string>&limit=<integer>&sort=<string>&sort=<string>&defaultPageLength=<integer>`

**Query Parameters:**

- `after`: The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
- `limit`: The maximum number of results to display per page.
- `sort`: No description
- `sort`: No description
- `defaultPageLength`: No description

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "capabilities": {
        "officia_f9": {},
        "ea_b08": {}
      },
      "createdAt": "<dateTime>",
      "id": "<string>",
      "name": "<string>",
      "channelAccountConnectionRedirectUrl": "<string>",
      "webhookUrl": "<string>"
    },
    {
      "capabilities": {
        "esse_e63": {}
      },
      "createdAt": "<dateTime>",
      "id": "<string>",
      "name": "<string>",
      "channelAccountConnectionRedirectUrl": "<string>",
      "webhookUrl": "<string>"
    }
  ],
  "total": "<integer>",
  "paging": {
    "next": {
      "after": "<string>",
      "link": "<string>"
    }
  }
}
```

---

### Create a custom channel

**Method:** `POST`

**URL:** `https://api.hubapi.com/conversations/v3/custom-channels/`

**Description:** Register a new channel along with its capabilities and the webhook url that will be used to receive messages published over the channel

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "capabilities": {
    "eaa": {},
    "dolor_f7e": {},
    "autee99": {}
  },
  "name": "<string>",
  "channelAccountConnectionRedirectUrl": "<string>",
  "webhookUrl": "<string>"
}
```

**Success Response (201):**

```json
{
  "capabilities": {
    "est_3c4": {},
    "et07": {}
  },
  "createdAt": "<dateTime>",
  "id": "<string>",
  "name": "<string>",
  "channelAccountConnectionRedirectUrl": "<string>",
  "webhookUrl": "<string>"
}
```

---

### Get a message

**Method:** `GET`

**URL:** `https://api.hubapi.com/conversations/v3/custom-channels/:channelId/messages/:messageId`

**Description:** Get the PublicConversationsMessage that represents a message sent over a custom channel

**Authentication:** oauth2

**Path Variables:**

- `channelId`: (Required) The channel the message was sent over
- `messageId`: (Required) The id of the message

**Headers:**


**Success Response (200):**

```json
{
  "archived": "<boolean>",
  "attachments": [
    {
      "fileId": "<string>",
      "fileUsageType": "<string>",
      "type": "FILE",
      "name": "<string>",
      "url": "<string>"
    },
    {
      "fileId": "<string>",
      "fileUsageType": "<string>",
      "type": "FILE",
      "name": "<string>",
      "url": "<string>"
    }
  ],
  "channelAccountId": "<string>",
  "channelId": "<string>",
  "client": {
    "clientType": "HUBSPOT",
    "integrationAppId": "<integer>"
  },
  "conversationsThreadId": "<string>",
  "createdAt": "<dateTime>",
  "createdBy": "<string>",
  "direction": "INCOMING",
  "id": "<string>",
  "recipients": [
    {
      "deliveryIdentifier": {
        "type": "<string>",
        "value": "<string>"
      },
      "actorId": "<string>",
      "name": "<string>",
      "recipientField": "<string>"
    },
    {
      "deliveryIdentifier": {
        "type": "<string>",
        "value": "<string>"
      },
      "actorId": "<string>",
      "name": "<string>",
      "recipientField": "<string>"
    }
  ],
  "senders": [
    {
      "actorId": "<string>",
      "name": "<string>",
      "senderField": "<string>",
      "deliveryIdentifier": {
        "type": "<string>",
        "value": "<string>"
      }
    },
    {
      "actorId": "<string>",
      "name": "<string>",
      "senderField": "<string>",
      "deliveryIdentifier": {
        "type": "<string>",
        "value": "<string>"
      }
    }
  ],
  "text": "<string>",
  "truncationStatus": "NOT_TRUNCATED",
  "type": "MESSAGE",
  "subject": "<string>",
  "richText": "<string>",
  "inReplyToId": "<string>",
  "updatedAt": "<dateTime>",
  "status": {
    "statusType": "FAILED",
    "failureDetails": {
      "errorMessageTokens": {
        "pariaturaf4": "<string>",
        "essed24": "<string>"
      },
      "errorMessage": "<string>"
    }
  }
}
```

---

### Update a message 

**Method:** `PATCH`

**URL:** `https://api.hubapi.com/conversations/v3/custom-channels/:channelId/messages/:messageId`

**Description:** Use this API to update a message's status to indicate if it was successfully sent, failed to send, or was read

**Authentication:** apikey

**Path Variables:**

- `channelId`: (Required) The channel the message was sent over
- `messageId`: (Required) The id of the message

**Headers:**

- `Content-Type`: application/json

**Success Response (200):**

```json
{
  "archived": "<boolean>",
  "attachments": [
    {
      "fileId": "<string>",
      "fileUsageType": "<string>",
      "type": "FILE",
      "name": "<string>",
      "url": "<string>"
    },
    {
      "fileId": "<string>",
      "fileUsageType": "<string>",
      "type": "FILE",
      "name": "<string>",
      "url": "<string>"
    }
  ],
  "channelAccountId": "<string>",
  "channelId": "<string>",
  "client": {
    "clientType": "HUBSPOT",
    "integrationAppId": "<integer>"
  },
  "conversationsThreadId": "<string>",
  "createdAt": "<dateTime>",
  "createdBy": "<string>",
  "direction": "INCOMING",
  "id": "<string>",
  "recipients": [
    {
      "deliveryIdentifier": {
        "type": "<string>",
        "value": "<string>"
      },
      "actorId": "<string>",
      "name": "<string>",
      "recipientField": "<string>"
    },
    {
      "deliveryIdentifier": {
        "type": "<string>",
        "value": "<string>"
      },
      "actorId": "<string>",
      "name": "<string>",
      "recipientField": "<string>"
    }
  ],
  "senders": [
    {
      "actorId": "<string>",
      "name": "<string>",
      "senderField": "<string>",
      "deliveryIdentifier": {
        "type": "<string>",
        "value": "<string>"
      }
    },
    {
      "actorId": "<string>",
      "name": "<string>",
      "senderField": "<string>",
      "deliveryIdentifier": {
        "type": "<string>",
        "value": "<string>"
      }
    }
  ],
  "text": "<string>",
  "truncationStatus": "NOT_TRUNCATED",
  "type": "MESSAGE",
  "subject": "<string>",
  "richText": "<string>",
  "inReplyToId": "<string>",
  "updatedAt": "<dateTime>",
  "status": {
    "statusType": "FAILED",
    "failureDetails": {
      "errorMessageTokens": {
        "pariaturaf4": "<string>",
        "essed24": "<string>"
      },
      "errorMessage": "<string>"
    }
  }
}
```

---

### Publish a message

**Method:** `POST`

**URL:** `https://api.hubapi.com/conversations/v3/custom-channels/:channelId/messages`

**Description:** Publish a message over your custom channel

**Authentication:** apikey

**Path Variables:**

- `channelId`: (Required) The channel the message will be sent over

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "attachments": [
    {
      "fileId": "<string>",
      "type": "FILE",
      "fileUsageType": "<string>"
    },
    {
      "fileId": "<string>",
      "type": "FILE",
      "fileUsageType": "<string>"
    }
  ],
  "channelAccountId": "<string>",
  "messageDirection": "OUTGOING",
  "recipients": [
    {
      "deliveryIdentifier": {
        "type": "<string>",
        "value": "<string>"
      },
      "name": "<string>"
    },
    {
      "deliveryIdentifier": {
        "type": "<string>",
        "value": "<string>"
      },
      "name": "<string>"
    }
  ],
  "senders": [
    {
      "deliveryIdentifier": {
        "type": "<string>",
        "value": "<string>"
      },
      "name": "<string>"
    },
    {
      "deliveryIdentifier": {
        "type": "<string>",
        "value": "<string>"
      },
      "name": "<string>"
    }
  ],
  "text": "<string>",
  "timestamp": "<dateTime>",
  "integrationThreadId": "<string>",
  "integrationIdempotencyId": "<string>",
  "richText": "<string>",
  "inReplyToId": "<string>"
}
```

**Success Response (201):**

```json
{
  "archived": "<boolean>",
  "attachments": [
    {
      "fileId": "<string>",
      "fileUsageType": "<string>",
      "type": "FILE",
      "name": "<string>",
      "url": "<string>"
    },
    {
      "fileId": "<string>",
      "fileUsageType": "<string>",
      "type": "FILE",
      "name": "<string>",
      "url": "<string>"
    }
  ],
  "channelAccountId": "<string>",
  "channelId": "<string>",
  "client": {
    "clientType": "HUBSPOT",
    "integrationAppId": "<integer>"
  },
  "conversationsThreadId": "<string>",
  "createdAt": "<dateTime>",
  "createdBy": "<string>",
  "direction": "INCOMING",
  "id": "<string>",
  "recipients": [
    {
      "deliveryIdentifier": {
        "type": "<string>",
        "value": "<string>"
      },
      "actorId": "<string>",
      "name": "<string>",
      "recipientField": "<string>"
    },
    {
      "deliveryIdentifier": {
        "type": "<string>",
        "value": "<string>"
      },
      "actorId": "<string>",
      "name": "<string>",
      "recipientField": "<string>"
    }
  ],
  "senders": [
    {
      "actorId": "<string>",
      "name": "<string>",
      "senderField": "<string>",
      "deliveryIdentifier": {
        "type": "<string>",
        "value": "<string>"
      }
    },
    {
      "actorId": "<string>",
      "name": "<string>",
      "senderField": "<string>",
      "deliveryIdentifier": {
        "type": "<string>",
        "value": "<string>"
      }
    }
  ],
  "text": "<string>",
  "truncationStatus": "NOT_TRUNCATED",
  "type": "MESSAGE",
  "subject": "<string>",
  "richText": "<string>",
  "inReplyToId": "<string>",
  "updatedAt": "<dateTime>",
  "status": {
    "statusType": "FAILED",
    "failureDetails": {
      "errorMessageTokens": {
        "pariaturaf4": "<string>",
        "essed24": "<string>"
      },
      "errorMessage": "<string>"
    }
  }
}
```

---

### Get accounts for a channel

**Method:** `GET`

**URL:** `https://api.hubapi.com/conversations/v3/custom-channels/:channelId/channel-accounts?deliveryIdentifierType=<string>&deliveryIdentifierType=<string>&deliveryIdentifierValue=<string>&deliveryIdentifierValue=<string>&after=<string>&limit=<integer>&sort=<string>&sort=<string>&defaultPageLength=<integer>&archived=<boolean>`

**Authentication:** oauth2

**Path Variables:**

- `channelId`: (Required) 

**Query Parameters:**

- `deliveryIdentifierType`: No description
- `deliveryIdentifierType`: No description
- `deliveryIdentifierValue`: No description
- `deliveryIdentifierValue`: No description
- `after`: No description
- `limit`: No description
- `sort`: No description
- `sort`: No description
- `defaultPageLength`: No description
- `archived`: No description

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "active": "<boolean>",
      "archived": "<boolean>",
      "authorized": "<boolean>",
      "channelId": "<string>",
      "createdAt": "<dateTime>",
      "id": "<string>",
      "inboxId": "<string>",
      "name": "<string>",
      "archivedAt": "<dateTime>",
      "deliveryIdentifier": {
        "type": "<string>",
        "value": "<string>"
      }
    },
    {
      "active": "<boolean>",
      "archived": "<boolean>",
      "authorized": "<boolean>",
      "channelId": "<string>",
      "createdAt": "<dateTime>",
      "id": "<string>",
      "inboxId": "<string>",
      "name": "<string>",
      "archivedAt": "<dateTime>",
      "deliveryIdentifier": {
        "type": "<string>",
        "value": "<string>"
      }
    }
  ],
  "total": "<integer>",
  "paging": {
    "next": {
      "after": "<string>",
      "link": "<string>"
    }
  }
}
```

---

### Create a channel account

**Method:** `POST`

**URL:** `https://api.hubapi.com/conversations/v3/custom-channels/:channelId/channel-accounts`

**Description:** This API allows you to create one or more accounts that all talk over a single channel but using different delivery identifiers.

**Authentication:** oauth2

**Path Variables:**

- `channelId`: (Required) 

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "authorized": "<boolean>",
  "inboxId": "<string>",
  "name": "<string>",
  "deliveryIdentifier": {
    "type": "<string>",
    "value": "<string>"
  }
}
```

**Success Response (201):**

```json
{
  "active": "<boolean>",
  "archived": "<boolean>",
  "authorized": "<boolean>",
  "channelId": "<string>",
  "createdAt": "<dateTime>",
  "id": "<string>",
  "inboxId": "<string>",
  "name": "<string>",
  "archivedAt": "<dateTime>",
  "deliveryIdentifier": {
    "type": "<string>",
    "value": "<string>"
  }
}
```

---

### Get a channel account by id

**Method:** `GET`

**URL:** `https://api.hubapi.com/conversations/v3/custom-channels/:channelId/channel-accounts/:channelAccountId?archived=false`

**Description:** Retrieve a PublicChannelAccount that contains all the metadata about your channel account. This includes information like its channel, associated inbox id, and delivery identifier information.

**Authentication:** oauth2

**Path Variables:**

- `channelId`: (Required) 
- `channelAccountId`: (Required) 

**Query Parameters:**

- `archived`: No description

**Headers:**


**Success Response (200):**

```json
{
  "active": "<boolean>",
  "archived": "<boolean>",
  "authorized": "<boolean>",
  "channelId": "<string>",
  "createdAt": "<dateTime>",
  "id": "<string>",
  "inboxId": "<string>",
  "name": "<string>",
  "archivedAt": "<dateTime>",
  "deliveryIdentifier": {
    "type": "<string>",
    "value": "<string>"
  }
}
```

---

### Update a channel account

**Method:** `PATCH`

**URL:** `https://api.hubapi.com/conversations/v3/custom-channels/:channelId/channel-accounts/:channelAccountId`

**Description:** This API is used to update the name of the channel account and it's isAuthorized status. Setting to isAuthorized flag to False disables the channel account.

**Authentication:** oauth2

**Path Variables:**

- `channelId`: (Required) The channel to update
- `channelAccountId`: (Required) The channel account to update

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "authorized": "<boolean>",
  "name": "<string>"
}
```

**Success Response (200):**

```json
{
  "active": "<boolean>",
  "archived": "<boolean>",
  "authorized": "<boolean>",
  "channelId": "<string>",
  "createdAt": "<dateTime>",
  "id": "<string>",
  "inboxId": "<string>",
  "name": "<string>",
  "archivedAt": "<dateTime>",
  "deliveryIdentifier": {
    "type": "<string>",
    "value": "<string>"
  }
}
```

---

### Update a channel account staging token

**Method:** `PATCH`

**URL:** `https://api.hubapi.com/conversations/v3/custom-channels/:channelId/channel-account-staging-tokens/:accountToken`

**Description:** This API is used for integrators creating public apps. Use this API to update a channel account staging token's account name and delivery identifier. This information will be applied to the channel account created from this staging token.

**Authentication:** oauth2

**Path Variables:**

- `channelId`: (Required) 
- `accountToken`: (Required) 

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "accountName": "<string>",
  "deliveryIdentifier": {
    "type": "<string>",
    "value": "<string>"
  }
}
```

**Success Response (200):**

```json
{
  "accountToken": "<string>",
  "createdAt": "<dateTime>",
  "genericChannelId": "<integer>",
  "inboxId": "<integer>",
  "userId": "<integer>",
  "accountName": "<string>",
  "deliveryIdentifier": {
    "type": "<string>",
    "value": "<string>"
  }
}
```

---

### Archive a custom channel

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/conversations/v3/custom-channels/:channelId`

**Description:** Use this API to archive a registered custom channel

**Path Variables:**

- `channelId`: (Required) 

**Headers:**


---

