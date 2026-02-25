# Conversations Inbox & Messages API

Total endpoints: 16

---

### Get conversations inboxes.

**Method:** `GET`

**URL:** `https://api.hubapi.com/conversations/v3/conversations/inboxes?after=<string>&limit=<integer>&sort=<string>&sort=<string>&defaultPageLength=<integer>&archived=<boolean>`

**Authentication:** oauth2

**Query Parameters:**

- `after`: The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
- `limit`: The maximum number of results to display per page.
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
      "id": "<string>",
      "name": "<string>",
      "createdAt": "<dateTime>",
      "updatedAt": "<dateTime>",
      "archived": "<boolean>",
      "type": "<string>"
    },
    {
      "id": "<string>",
      "name": "<string>",
      "createdAt": "<dateTime>",
      "updatedAt": "<dateTime>",
      "archived": "<boolean>",
      "type": "<string>"
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

### Get a single thread.

**Method:** `GET`

**URL:** `https://api.hubapi.com/conversations/v3/conversations/threads/:threadId?archived=<boolean>&property=<string>&association=TICKET`

**Description:** Returns a single thread.

**Authentication:** oauth2

**Path Variables:**

- `threadId`: No description

**Query Parameters:**

- `archived`: Whether to return only results that have been archived. Default is false.
- `property`: No description
- `association`: You can specify an association type here of `TICKET`. If this is set the response will included a thread associations object and associated ticket id if present. If there are no associations to a ticket with this conversation, then the thread associations object will not be present on the response. 

**Headers:**


**Success Response (200):**

```json
{
  "associatedContactId": "<string>",
  "createdAt": "<dateTime>",
  "id": "<string>",
  "inboxId": "<string>",
  "spam": "<boolean>",
  "status": "CLOSED",
  "closedAt": "<dateTime>",
  "latestMessageTimestamp": "<dateTime>",
  "latestMessageSentTimestamp": "<dateTime>",
  "latestMessageReceivedTimestamp": "<dateTime>",
  "assignedTo": "<string>",
  "archived": "<boolean>",
  "originalChannelAccountId": "<string>",
  "originalChannelId": "<string>"
}
```

---

### Archives a thread.

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/conversations/v3/conversations/threads/:threadId`

**Description:** Archives a single thread. The thread will be permanently deleted 30 days after placed in an archived state.

**Authentication:** apikey

**Path Variables:**

- `threadId`: No description

**Headers:**


---

### Update a thread.

**Method:** `PATCH`

**URL:** `https://api.hubapi.com/conversations/v3/conversations/threads/:threadId?archived=<boolean>`

**Description:** Updates a single thread. Either a thread's status can be updated, or the thread can be restored.

**Authentication:** apikey

**Path Variables:**

- `threadId`: No description

**Query Parameters:**

- `archived`: Whether the thread to update is archived. Default is false. A thread's status property can not be updated if the thread is archived.

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "status": "CLOSED",
  "archived": "<boolean>"
}
```

**Success Response (200):**

```json
{
  "associatedContactId": "<string>",
  "createdAt": "<dateTime>",
  "id": "<string>",
  "inboxId": "<string>",
  "spam": "<boolean>",
  "status": "CLOSED",
  "closedAt": "<dateTime>",
  "latestMessageTimestamp": "<dateTime>",
  "latestMessageSentTimestamp": "<dateTime>",
  "latestMessageReceivedTimestamp": "<dateTime>",
  "assignedTo": "<string>",
  "archived": "<boolean>",
  "originalChannelAccountId": "<string>",
  "originalChannelId": "<string>"
}
```

---

### Get the original content of a single message.

**Method:** `GET`

**URL:** `https://api.hubapi.com/conversations/v3/conversations/threads/:threadId/messages/:messageId/original-content?property=<string>`

**Description:** Returns the complete original text and rich text bodies of a message. This will be different from the text and rich text in the message itself if the message's `truncationStatus` is anything other than `NOT_TRUNCATED`.

**Authentication:** oauth2

**Path Variables:**

- `threadId`: No description
- `messageId`: No description

**Query Parameters:**

- `property`: No description

**Headers:**


**Success Response (200):**

```json
{
  "text": "<string>",
  "richText": "<string>"
}
```

---

### Get message history for a thread.

**Method:** `GET`

**URL:** `https://api.hubapi.com/conversations/v3/conversations/threads/:threadId/messages?after=<string>&limit=<integer>&sort=<string>&sort=<string>&archived=<boolean>&property=<string>`

**Authentication:** oauth2

**Path Variables:**

- `threadId`: No description

**Query Parameters:**

- `after`: The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
- `limit`: The maximum number of results to display per page.
- `sort`: Sort direction. Valid options are `createdAt` (ascending), and `-createdAt` (descending, default)
- `sort`: Sort direction. Valid options are `createdAt` (ascending), and `-createdAt` (descending, default)
- `archived`: Whether to return only results that have been archived.
- `property`: No description

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "value": "<Circular reference to #/components/schemas/PublicConversationsMessage detected>"
    },
    {
      "value": "<Circular reference to #/components/schemas/PublicConversationsMessage detected>"
    }
  ],
  "paging": {
    "next": {
      "after": "<string>",
      "link": "<string>"
    }
  }
}
```

---

### Send a message to a thread.

**Method:** `POST`

**URL:** `https://api.hubapi.com/conversations/v3/conversations/threads/:threadId/messages`

**Description:** Send a new message on a thread at the current timestamp.

**Authentication:** apikey

**Path Variables:**

- `threadId`: No description

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "attachments": [],
  "channelAccountId": "<string>",
  "channelId": "<string>",
  "recipients": [
    {
      "deliveryIdentifiers": [
        {
          "type": "<string>",
          "value": "<string>"
        },
        {
          "type": "<string>",
          "value": "<string>"
        }
      ],
      "actorId": "<string>",
      "name": "<string>",
      "recipientField": "<string>",
      "deliveryIdentifier": {
        "type": "<string>",
        "value": "<string>"
      }
    },
    {
      "deliveryIdentifiers": [
        {
          "type": "<string>",
          "value": "<string>"
        },
        {
          "type": "<string>",
          "value": "<string>"
        }
      ],
      "actorId": "<string>",
      "name": "<string>",
      "recipientField": "<string>",
      "deliveryIdentifier": {
        "type": "<string>",
        "value": "<string>"
      }
    }
  ],
  "senderActorId": "<string>",
  "text": "<string>",
  "type": "MESSAGE",
  "richText": "<string>",
  "subject": "<string>"
}
```

**Success Response (200):**

```json
null
```

---

### Get actors

**Method:** `POST`

**URL:** `https://api.hubapi.com/conversations/v3/conversations/actors/batch/read?property=<string>`

**Description:** Resolve `ActorId`s to the underlying actors/participants.

**Authentication:** oauth2

**Query Parameters:**

- `property`: No description

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    "<string>",
    "<string>"
  ]
}
```

**Success Response (200):**

```json
{
  "completedAt": "<dateTime>",
  "results": [
    {
      "id": "<string>",
      "type": "AGENT",
      "name": "<string>",
      "email": "<string>",
      "avatar": "<string>"
    },
    {
      "id": "<string>",
      "type": "AGENT",
      "name": "<string>",
      "email": "<string>",
      "avatar": "<string>"
    }
  ],
  "startedAt": "<dateTime>",
  "status": "CANCELED",
  "requestedAt": "<dateTime>",
  "links": {
    "nisi5": "<string>"
  }
}
```

---

### Get channel accounts.

**Method:** `GET`

**URL:** `https://api.hubapi.com/conversations/v3/conversations/channel-accounts?channelId=<integer>&channelId=<integer>&inboxId=<integer>&inboxId=<integer>&after=<string>&limit=<integer>&sort=<string>&sort=<string>&defaultPageLength=<integer>&archived=<boolean>`

**Authentication:** oauth2

**Query Parameters:**

- `channelId`: Limits results to channel accounts within a particular channel.
- `channelId`: Limits results to channel accounts within a particular channel.
- `inboxId`: Limits results to channel accounts within a particular inbox.
- `inboxId`: Limits results to channel accounts within a particular inbox.
- `after`: The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
- `limit`: The maximum number of results to display per page.
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
      "id": "<string>",
      "channelId": "<string>",
      "name": "<string>",
      "inboxId": "<string>",
      "active": "<boolean>",
      "authorized": "<boolean>",
      "createdAt": "<dateTime>",
      "deliveryIdentifier": {
        "type": "<string>",
        "value": "<string>"
      },
      "archived": "<boolean>"
    },
    {
      "id": "<string>",
      "channelId": "<string>",
      "name": "<string>",
      "inboxId": "<string>",
      "active": "<boolean>",
      "authorized": "<boolean>",
      "createdAt": "<dateTime>",
      "deliveryIdentifier": {
        "type": "<string>",
        "value": "<string>"
      },
      "archived": "<boolean>"
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

### Get a single channel.

**Method:** `GET`

**URL:** `https://api.hubapi.com/conversations/v3/conversations/channels/:channelId`

**Authentication:** oauth2

**Path Variables:**

- `channelId`: No description

**Headers:**


**Success Response (200):**

```json
{
  "id": "<string>",
  "name": "<string>"
}
```

---

### Get a single message.

**Method:** `GET`

**URL:** `https://api.hubapi.com/conversations/v3/conversations/threads/:threadId/messages/:messageId?property=<string>`

**Authentication:** oauth2

**Path Variables:**

- `threadId`: No description
- `messageId`: No description

**Query Parameters:**

- `property`: No description

**Headers:**


**Success Response (200):**

```json
{
  "value": "<Circular reference to #/components/schemas/PublicConversationsMessage detected>"
}
```

---

### Get channels.

**Method:** `GET`

**URL:** `https://api.hubapi.com/conversations/v3/conversations/channels?after=<string>&limit=<integer>&sort=<string>&sort=<string>&defaultPageLength=<integer>`

**Authentication:** oauth2

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
      "id": "<string>",
      "name": "<string>"
    },
    {
      "id": "<string>",
      "name": "<string>"
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

### Get a single actor.

**Method:** `GET`

**URL:** `https://api.hubapi.com/conversations/v3/conversations/actors/:actorId?property=<string>`

**Authentication:** oauth2

**Path Variables:**

- `actorId`: No description

**Query Parameters:**

- `property`: No description

**Headers:**


**Success Response (200):**

```json
{
  "id": "<string>",
  "type": "AGENT",
  "name": "<string>",
  "email": "<string>",
  "avatar": "<string>"
}
```

---

### Get threads.

**Method:** `GET`

**URL:** `https://api.hubapi.com/conversations/v3/conversations/threads?after=<string>&limit=<integer>&sort=<string>&sort=<string>&inboxId=<integer>&inboxId=<integer>&associatedContactId=<long>&threadStatus=<string>&latestMessageTimestampAfter=<dateTime>&archived=<boolean>&property=<string>&association=TICKET`

**Authentication:** oauth2

**Query Parameters:**

- `after`: The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
- `limit`: The maximum number of results to display per page.
- `sort`: Set the sort order of the response. Valid options are `id` (default) and `latestMessageTimestamp` (which requires the `latestMessageTimestampAfter` field to also be set). If you’re filtering threads by `associatedContactId` , you can sort in descending order by prepending - to the sort option (e.g., `-id` or `-latestMessageTimestampAfter` ). Otherwise, results are always returned in ascending order.
- `sort`: Set the sort order of the response. Valid options are `id` (default) and `latestMessageTimestamp` (which requires the `latestMessageTimestampAfter` field to also be set). If you’re filtering threads by `associatedContactId` , you can sort in descending order by prepending - to the sort option (e.g., `-id` or `-latestMessageTimestampAfter` ). Otherwise, results are always returned in ascending order.
- `inboxId`: The ID of the conversations inbox you can optionally include to retrieve the associated messages for. This parameter cannot be used in conjunction with the `associatedContactId` property.
- `inboxId`: The ID of the conversations inbox you can optionally include to retrieve the associated messages for. This parameter cannot be used in conjunction with the `associatedContactId` property.
- `associatedContactId`: The ID of a contact you can optionally include to retrieve a filtered list of conversations for. This parameter cannot be used in conjunction with the `inboxId` property.
- `threadStatus`: The status of the associated conversations to filter by (either `OPEN` or `CLOSED`). This property must be provided if you’re including the `associatedContactId` query parameter.
- `latestMessageTimestampAfter`: The minimum `latestMessageTimestamp`. This is required only when sorting by `latestMessageTimestamp`.
- `archived`: Whether to return only results that have been archived.
- `property`: No description
- `association`: You can specify an association type here of `TICKET`. If this is set the response will included a thread associations object and associated ticket id if present. If there are no associations to a ticket with this conversation, then the thread associations object will not be present on the response. 

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "associatedContactId": "<string>",
      "createdAt": "<dateTime>",
      "id": "<string>",
      "inboxId": "<string>",
      "spam": "<boolean>",
      "status": "OPEN",
      "closedAt": "<dateTime>",
      "latestMessageTimestamp": "<dateTime>",
      "latestMessageSentTimestamp": "<dateTime>",
      "latestMessageReceivedTimestamp": "<dateTime>",
      "assignedTo": "<string>",
      "archived": "<boolean>",
      "originalChannelAccountId": "<string>",
      "originalChannelId": "<string>"
    },
    {
      "associatedContactId": "<string>",
      "createdAt": "<dateTime>",
      "id": "<string>",
      "inboxId": "<string>",
      "spam": "<boolean>",
      "status": "CLOSED",
      "closedAt": "<dateTime>",
      "latestMessageTimestamp": "<dateTime>",
      "latestMessageSentTimestamp": "<dateTime>",
      "latestMessageReceivedTimestamp": "<dateTime>",
      "assignedTo": "<string>",
      "archived": "<boolean>",
      "originalChannelAccountId": "<string>",
      "originalChannelId": "<string>"
    }
  ],
  "paging": {
    "next": {
      "after": "<string>",
      "link": "<string>"
    }
  }
}
```

---

### Get a single channel account.

**Method:** `GET`

**URL:** `https://api.hubapi.com/conversations/v3/conversations/channel-accounts/:channelAccountId?archived=false`

**Authentication:** oauth2

**Path Variables:**

- `channelAccountId`: No description

**Query Parameters:**

- `archived`: No description

**Headers:**


**Success Response (200):**

```json
{
  "id": "<string>",
  "channelId": "<string>",
  "name": "<string>",
  "inboxId": "<string>",
  "active": "<boolean>",
  "authorized": "<boolean>",
  "createdAt": "<dateTime>",
  "deliveryIdentifier": {
    "type": "<string>",
    "value": "<string>"
  },
  "archived": "<boolean>"
}
```

---

### Get a single conversations inbox.

**Method:** `GET`

**URL:** `https://api.hubapi.com/conversations/v3/conversations/inboxes/:inboxId?archived=false`

**Authentication:** oauth2

**Path Variables:**

- `inboxId`: No description

**Query Parameters:**

- `archived`: No description

**Headers:**


**Success Response (200):**

```json
{
  "id": "<string>",
  "name": "<string>",
  "createdAt": "<dateTime>",
  "updatedAt": "<dateTime>",
  "archived": "<boolean>",
  "type": "<string>"
}
```

---

