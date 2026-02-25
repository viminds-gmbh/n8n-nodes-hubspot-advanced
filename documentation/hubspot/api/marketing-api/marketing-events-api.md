# Marketing Events API

Total endpoints: 36

---

### Create or Update Multiple Marketing Events

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/events/upsert`

**Description:** Upset multiple Marketing Event. If there is an existing Marketing event with the specified id, it will be updated; otherwise a new event will be created.

**Authentication:** apikey

**Headers:**

- `Content-Type`: application/json

**Success Response (200):**

```json
{
  "completedAt": "<dateTime>",
  "results": [
    {
      "createdAt": "<dateTime>",
      "eventName": "<string>",
      "eventOrganizer": "<string>",
      "id": "<string>",
      "updatedAt": "<dateTime>",
      "startDateTime": "<dateTime>",
      "customProperties": [
        {
          "name": "<string>",
          "requestId": "<string>",
          "selectedByUser": "<boolean>",
          "selectedByUserTimestamp": "<long>",
          "source": "EMAIL_INTEGRATION",
          "sourceId": "<string>",
          "sourceLabel": "<string>",
          "sourceMetadata": "<string>",
          "sourceVid": [
            "<long>",
            "<long>"
          ],
          "timestamp": "<long>",
          "value": "<string>",
          "updatedByUserId": "<integer>",
          "persistenceTimestamp": "<long>",
          "useTimestampAsPersistenceTimestamp": "<boolean>",
          "isLargeValue": "<boolean>",
          "dataSensitivity": "none",
          "isEncrypted": "<boolean>",
          "unit": "<string>"
        },
        {
          "name": "<string>",
          "requestId": "<string>",
          "selectedByUser": "<boolean>",
          "selectedByUserTimestamp": "<long>",
          "source": "CRM_UI_BULK_ACTION",
          "sourceId": "<string>",
          "sourceLabel": "<string>",
          "sourceMetadata": "<string>",
          "sourceVid": [
            "<long>",
            "<long>"
          ],
          "timestamp": "<long>",
          "value": "<string>",
          "updatedByUserId": "<integer>",
          "persistenceTimestamp": "<long>",
          "useTimestampAsPersistenceTimestamp": "<boolean>",
          "isLargeValue": "<boolean>",
          "dataSensitivity": "standard",
          "isEncrypted": "<boolean>",
          "unit": "<string>"
        }
      ],
      "eventCancelled": "<boolean>",
      "eventUrl": "<string>",
      "eventDescription": "<string>",
      "eventType": "<string>",
      "endDateTime": "<dateTime>"
    },
    {
      "createdAt": "<dateTime>",
      "eventName": "<string>",
      "eventOrganizer": "<string>",
      "id": "<string>",
      "updatedAt": "<dateTime>",
      "startDateTime": "<dateTime>",
      "customProperties": [
        {
          "name": "<string>",
          "requestId": "<string>",
          "selectedByUser": "<boolean>",
          "selectedByUserTimestamp": "<long>",
          "source": "BET_CRM_CONNECTOR",
          "sourceId": "<string>",
          "sourceLabel": "<string>",
          "sourceMetadata": "<string>",
          "sourceVid": [
            "<long>",
            "<long>"
          ],
          "timestamp": "<long>",
          "value": "<string>",
          "updatedByUserId": "<integer>",
          "persistenceTimestamp": "<long>",
          "useTimestampAsPersistenceTimestamp": "<boolean>",
          "isLargeValue": "<boolean>",
          "dataSensitivity": "none",
          "isEncrypted": "<boolean>",
          "unit": "<string>"
        },
        {
          "name": "<string>",
          "requestId": "<string>",
          "selectedByUser": "<boolean>",
          "selectedByUserTimestamp": "<long>",
          "source": "INTEGRATION",
          "sourceId": "<string>",
          "sourceLabel": "<string>",
          "sourceMetadata": "<string>",
          "sourceVid": [
            "<long>",
            "<long>"
          ],
          "timestamp": "<long>",
          "value": "<string>",
          "updatedByUserId": "<integer>",
          "persistenceTimestamp": "<long>",
          "useTimestampAsPersistenceTimestamp": "<boolean>",
          "isLargeValue": "<boolean>",
          "dataSensitivity": "high",
          "isEncrypted": "<boolean>",
          "unit": "<string>"
        }
      ],
      "eventCancelled": "<boolean>",
      "eventUrl": "<string>",
      "eventDescription": "<string>",
      "eventType": "<string>",
      "endDateTime": "<dateTime>"
    }
  ],
  "startedAt": "<dateTime>",
  "status": "CANCELED",
  "numErrors": "<integer>",
  "requestedAt": "<dateTime>",
  "links": {
    "laborumc": "<string>"
  },
  "errors": [
    {
      "category": "<string>",
      "context": {
        "commodof_5": [
          "<string>",
          "<string>"
        ],
        "labore_c_": [
          "<string>",
          "<string>"
        ],
        "laborum21": [
          "<string>",
          "<string>"
        ],
        "non17f": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "subCategory": "<string>",
          "code": "<string>",
          "in": "<string>",
          "context": {
            "magnac8": [
              "<string>",
              "<string>"
            ]
          }
        },
        {
          "message": "<string>",
          "subCategory": "<string>",
          "code": "<string>",
          "in": "<string>",
          "context": {
            "doloref": [
              "<string>",
              "<string>"
            ]
          }
        }
      ],
      "links": {
        "ipsum_17": "<string>",
        "dolore7c5": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "subCategory": {},
      "id": "<string>"
    },
    {
      "category": "<string>",
      "context": {
        "aliquip__a4": [
          "<string>",
          "<string>"
        ],
        "exercitation_2": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "subCategory": "<string>",
          "code": "<string>",
          "in": "<string>",
          "context": {
            "uta": [
              "<string>",
              "<string>"
            ],
            "eiusmod_1": [
              "<string>",
              "<string>"
            ],
            "ut02f": [
              "<string>",
              "<string>"
            ]
          }
        },
        {
          "message": "<string>",
          "subCategory": "<string>",
          "code": "<string>",
          "in": "<string>",
          "context": {
            "nullafe7": [
              "<string>",
              "<string>"
            ],
            "in_5": [
              "<string>",
              "<string>"
            ],
            "aute7": [
              "<string>",
              "<string>"
            ],
            "cupidatat_c_": [
              "<string>",
              "<string>"
            ]
          }
        }
      ],
      "links": {
        "nulla5": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "subCategory": {},
      "id": "<string>"
    }
  ]
}
```

---

### Delete Multiple Marketing Events by External Ids

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/events/delete`

**Description:** Bulk delete a number of marketing events in HubSpot

**Authentication:** apikey

**Headers:**

- `Content-Type`: application/json

---

### Record Participants by ContactId with Marketing Event External Ids

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/attendance/:externalEventId/:subscriberState/create?externalAccountId=<string>`

**Description:** Record a subscription state between multiple HubSpot contacts and a marketing event, using HubSpot contact ids.

**Authentication:** apikey

**Path Variables:**

- `externalEventId`: (Required) The id of the marketing event
- `subscriberState`: (Required) The new subscriber state for the HubSpot contacts and the specified marketing event. For example: 'register', 'attend' or 'cancel'.

**Query Parameters:**

- `externalAccountId`: The account id associated with the marketing event

**Headers:**

- `Content-Type`: application/json

**Success Response (200):**

```json
{
  "completedAt": "<dateTime>",
  "results": [
    {
      "vid": "<integer>"
    },
    {
      "vid": "<integer>"
    }
  ],
  "startedAt": "<dateTime>",
  "status": "PENDING",
  "numErrors": "<integer>",
  "requestedAt": "<dateTime>",
  "links": {
    "cupidatat3_": "<string>",
    "ullamco3": "<string>"
  },
  "errors": [
    {
      "category": "<string>",
      "context": {
        "labore_a": [
          "<string>",
          "<string>"
        ],
        "incididunt_405": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "subCategory": "<string>",
          "code": "<string>",
          "in": "<string>",
          "context": {
            "mollitb": [
              "<string>",
              "<string>"
            ],
            "autef_8": [
              "<string>",
              "<string>"
            ],
            "non0": [
              "<string>",
              "<string>"
            ]
          }
        },
        {
          "message": "<string>",
          "subCategory": "<string>",
          "code": "<string>",
          "in": "<string>",
          "context": {
            "ex_10": [
              "<string>",
              "<string>"
            ],
            "exercitation_cab": [
              "<string>",
              "<string>"
            ],
            "nostrud17d": [
              "<string>",
              "<string>"
            ]
          }
        }
      ],
      "links": {
        "fugiat_a0": "<string>",
        "dolor507": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "subCategory": {},
      "id": "<string>"
    },
    {
      "category": "<string>",
      "context": {
        "adipisicing17": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "subCategory": "<string>",
          "code": "<string>",
          "in": "<string>",
          "context": {
            "pariaturf": [
              "<string>",
              "<string>"
            ],
            "enime": [
              "<string>",
              "<string>"
            ],
            "culpa_83": [
              "<string>",
              "<string>"
            ]
          }
        },
        {
          "message": "<string>",
          "subCategory": "<string>",
          "code": "<string>",
          "in": "<string>",
          "context": {
            "in7": [
              "<string>",
              "<string>"
            ]
          }
        }
      ],
      "links": {
        "eu1f2": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "subCategory": {},
      "id": "<string>"
    }
  ]
}
```

---

### Record Participants by Email with Marketing Event External Ids

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/attendance/:externalEventId/:subscriberState/email-create?externalAccountId=<string>`

**Description:** Record a subscription state between multiple HubSpot contacts and a marketing event, using contact email addresses. If contact is not present it will be automatically created.

**Authentication:** apikey

**Path Variables:**

- `externalEventId`: (Required) The id of the marketing event
- `subscriberState`: (Required) The new subscriber state for the HubSpot contacts and the specified marketing event. For example: 'register', 'attend' or 'cancel'.

**Query Parameters:**

- `externalAccountId`: The account id associated with the marketing event

**Headers:**

- `Content-Type`: application/json

**Success Response (200):**

```json
{
  "completedAt": "<dateTime>",
  "results": [
    {
      "email": "<string>",
      "vid": "<integer>"
    },
    {
      "email": "<string>",
      "vid": "<integer>"
    }
  ],
  "startedAt": "<dateTime>",
  "status": "PENDING",
  "numErrors": "<integer>",
  "requestedAt": "<dateTime>",
  "links": {
    "dolor_c": "<string>",
    "est_f8_": "<string>",
    "ullamco_4": "<string>"
  },
  "errors": [
    {
      "category": "<string>",
      "context": {
        "adf2": [
          "<string>",
          "<string>"
        ],
        "nostrud_6c": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "subCategory": "<string>",
          "code": "<string>",
          "in": "<string>",
          "context": {
            "aliqua_f9d": [
              "<string>",
              "<string>"
            ]
          }
        },
        {
          "message": "<string>",
          "subCategory": "<string>",
          "code": "<string>",
          "in": "<string>",
          "context": {
            "Duis_86": [
              "<string>",
              "<string>"
            ]
          }
        }
      ],
      "links": {
        "in_": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "subCategory": {},
      "id": "<string>"
    },
    {
      "category": "<string>",
      "context": {
        "velit_c3_": [
          "<string>",
          "<string>"
        ],
        "dolor29": [
          "<string>",
          "<string>"
        ],
        "iruref05": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "subCategory": "<string>",
          "code": "<string>",
          "in": "<string>",
          "context": {
            "et52": [
              "<string>",
              "<string>"
            ],
            "laborum6": [
              "<string>",
              "<string>"
            ]
          }
        },
        {
          "message": "<string>",
          "subCategory": "<string>",
          "code": "<string>",
          "in": "<string>",
          "context": {
            "occaecat__c": [
              "<string>",
              "<string>"
            ]
          }
        }
      ],
      "links": {
        "occaecat_1d": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "subCategory": {},
      "id": "<string>"
    }
  ]
}
```

---

### Record a subscriber state by contact email

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/events/:externalEventId/:subscriberState/email-upsert?externalAccountId=<string>`

**Description:** Record a subscription state between multiple HubSpot contacts and a marketing event, using contact email addresses. Note that the contact must already exist in HubSpot; a contact will not be created.

**Authentication:** apikey

**Path Variables:**

- `externalEventId`: (Required) The id of the marketing event
- `subscriberState`: (Required) The new subscriber state for the HubSpot contacts and the specified marketing event

**Query Parameters:**

- `externalAccountId`: (Required) The account id associated with the marketing event

**Headers:**

- `Content-Type`: application/json

---

### Record a subscriber state by contact ID

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/events/:externalEventId/:subscriberState/upsert?externalAccountId=<string>`

**Description:** Record a subscription state between multiple HubSpot contacts and a marketing event, using HubSpot contact ids. Note that the contact must already exist in HubSpot; a contact will not be create.

**Authentication:** apikey

**Path Variables:**

- `externalEventId`: (Required) The id of the marketing event
- `subscriberState`: (Required) The new subscriber state for the HubSpot contacts and the specified marketing event

**Query Parameters:**

- `externalAccountId`: (Required) The account id associated with the marketing event

**Headers:**

- `Content-Type`: application/json

---

### Mark a marketing event as completed

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/events/:externalEventId/complete?externalAccountId=<string>`

**Authentication:** apikey

**Path Variables:**

- `externalEventId`: (Required) 

**Query Parameters:**

- `externalAccountId`: (Required) 

**Headers:**

- `Content-Type`: application/json

**Success Response (200):**

```json
{
  "eventName": "<string>",
  "eventOrganizer": "<string>",
  "startDateTime": "<dateTime>",
  "customProperties": [
    {
      "name": "<string>",
      "requestId": "<string>",
      "selectedByUser": "<boolean>",
      "selectedByUserTimestamp": "<long>",
      "source": "BOT",
      "sourceId": "<string>",
      "sourceLabel": "<string>",
      "sourceMetadata": "<string>",
      "sourceVid": [
        "<long>",
        "<long>"
      ],
      "timestamp": "<long>",
      "value": "<string>",
      "updatedByUserId": "<integer>",
      "persistenceTimestamp": "<long>",
      "useTimestampAsPersistenceTimestamp": "<boolean>",
      "isLargeValue": "<boolean>",
      "dataSensitivity": "high",
      "isEncrypted": "<boolean>",
      "unit": "<string>"
    },
    {
      "name": "<string>",
      "requestId": "<string>",
      "selectedByUser": "<boolean>",
      "selectedByUserTimestamp": "<long>",
      "source": "SALES_MESSAGES",
      "sourceId": "<string>",
      "sourceLabel": "<string>",
      "sourceMetadata": "<string>",
      "sourceVid": [
        "<long>",
        "<long>"
      ],
      "timestamp": "<long>",
      "value": "<string>",
      "updatedByUserId": "<integer>",
      "persistenceTimestamp": "<long>",
      "useTimestampAsPersistenceTimestamp": "<boolean>",
      "isLargeValue": "<boolean>",
      "dataSensitivity": "none",
      "isEncrypted": "<boolean>",
      "unit": "<string>"
    }
  ],
  "eventCancelled": "<boolean>",
  "eventUrl": "<string>",
  "eventDescription": "<string>",
  "eventType": "<string>",
  "endDateTime": "<dateTime>"
}
```

---

### Create a marketing event

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/events`

**Description:** Creates a new marketing event in HubSpot

**Authentication:** apikey

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "eventName": "<string>",
  "eventOrganizer": "<string>",
  "externalAccountId": "<string>",
  "externalEventId": "<string>",
  "startDateTime": "<dateTime>",
  "customProperties": [
    {
      "name": "<string>",
      "requestId": "<string>",
      "selectedByUser": "<boolean>",
      "selectedByUserTimestamp": "<long>",
      "source": "IMPORT",
      "sourceId": "<string>",
      "sourceLabel": "<string>",
      "sourceMetadata": "<string>",
      "sourceVid": [
        "<long>",
        "<long>"
      ],
      "timestamp": "<long>",
      "value": "<string>",
      "updatedByUserId": "<integer>",
      "persistenceTimestamp": "<long>",
      "useTimestampAsPersistenceTimestamp": "<boolean>",
      "isLargeValue": "<boolean>",
      "dataSensitivity": "standard",
      "isEncrypted": "<boolean>",
      "unit": "<string>"
    },
    {
      "name": "<string>",
      "requestId": "<string>",
      "selectedByUser": "<boolean>",
      "selectedByUserTimestamp": "<long>",
      "source": "COMPANY_FAMILIES",
      "sourceId": "<string>",
      "sourceLabel": "<string>",
      "sourceMetadata": "<string>",
      "sourceVid": [
        "<long>",
        "<long>"
      ],
      "timestamp": "<long>",
      "value": "<string>",
      "updatedByUserId": "<integer>",
      "persistenceTimestamp": "<long>",
      "useTimestampAsPersistenceTimestamp": "<boolean>",
      "isLargeValue": "<boolean>",
      "dataSensitivity": "standard",
      "isEncrypted": "<boolean>",
      "unit": "<string>"
    }
  ],
  "eventCancelled": "<boolean>",
  "eventUrl": "<string>",
  "eventDescription": "<string>",
  "eventType": "<string>",
  "endDateTime": "<dateTime>"
}
```

**Success Response (200):**

```json
{
  "eventName": "<string>",
  "eventOrganizer": "<string>",
  "startDateTime": "<dateTime>",
  "customProperties": [
    {
      "name": "<string>",
      "requestId": "<string>",
      "selectedByUser": "<boolean>",
      "selectedByUserTimestamp": "<long>",
      "source": "BOT",
      "sourceId": "<string>",
      "sourceLabel": "<string>",
      "sourceMetadata": "<string>",
      "sourceVid": [
        "<long>",
        "<long>"
      ],
      "timestamp": "<long>",
      "value": "<string>",
      "updatedByUserId": "<integer>",
      "persistenceTimestamp": "<long>",
      "useTimestampAsPersistenceTimestamp": "<boolean>",
      "isLargeValue": "<boolean>",
      "dataSensitivity": "standard",
      "isEncrypted": "<boolean>",
      "unit": "<string>"
    },
    {
      "name": "<string>",
      "requestId": "<string>",
      "selectedByUser": "<boolean>",
      "selectedByUserTimestamp": "<long>",
      "source": "SALES_MESSAGES",
      "sourceId": "<string>",
      "sourceLabel": "<string>",
      "sourceMetadata": "<string>",
      "sourceVid": [
        "<long>",
        "<long>"
      ],
      "timestamp": "<long>",
      "value": "<string>",
      "updatedByUserId": "<integer>",
      "persistenceTimestamp": "<long>",
      "useTimestampAsPersistenceTimestamp": "<boolean>",
      "isLargeValue": "<boolean>",
      "dataSensitivity": "none",
      "isEncrypted": "<boolean>",
      "unit": "<string>"
    }
  ],
  "eventCancelled": "<boolean>",
  "eventUrl": "<string>",
  "eventDescription": "<string>",
  "eventType": "<string>",
  "endDateTime": "<dateTime>"
}
```

---

### Mark a marketing event as cancelled

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/events/:externalEventId/cancel?externalAccountId=<string>`

**Description:** Mark a marketing event as cancelled.

**Authentication:** apikey

**Path Variables:**

- `externalEventId`: (Required) The id of the marketing event to mark as cancelled

**Query Parameters:**

- `externalAccountId`: (Required) The account id associated with the marketing event

**Headers:**


**Success Response (200):**

```json
{
  "eventName": "<string>",
  "eventOrganizer": "<string>",
  "startDateTime": "<dateTime>",
  "customProperties": [
    {
      "name": "<string>",
      "requestId": "<string>",
      "selectedByUser": "<boolean>",
      "selectedByUserTimestamp": "<long>",
      "source": "BOT",
      "sourceId": "<string>",
      "sourceLabel": "<string>",
      "sourceMetadata": "<string>",
      "sourceVid": [
        "<long>",
        "<long>"
      ],
      "timestamp": "<long>",
      "value": "<string>",
      "updatedByUserId": "<integer>",
      "persistenceTimestamp": "<long>",
      "useTimestampAsPersistenceTimestamp": "<boolean>",
      "isLargeValue": "<boolean>",
      "dataSensitivity": "none",
      "isEncrypted": "<boolean>",
      "unit": "<string>"
    },
    {
      "name": "<string>",
      "requestId": "<string>",
      "selectedByUser": "<boolean>",
      "selectedByUserTimestamp": "<long>",
      "source": "SALES_MESSAGES",
      "sourceId": "<string>",
      "sourceLabel": "<string>",
      "sourceMetadata": "<string>",
      "sourceVid": [
        "<long>",
        "<long>"
      ],
      "timestamp": "<long>",
      "value": "<string>",
      "updatedByUserId": "<integer>",
      "persistenceTimestamp": "<long>",
      "useTimestampAsPersistenceTimestamp": "<boolean>",
      "isLargeValue": "<boolean>",
      "dataSensitivity": "none",
      "isEncrypted": "<boolean>",
      "unit": "<string>"
    }
  ],
  "eventCancelled": "<boolean>",
  "eventUrl": "<string>",
  "eventDescription": "<string>",
  "eventType": "<string>",
  "endDateTime": "<dateTime>"
}
```

---

### Get Marketing Event by External IDs

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/events/:externalEventId?externalAccountId=<string>`

**Description:** Returns the details of the Marketing Event with the specified id, if one exists.

**Authentication:** oauth2

**Path Variables:**

- `externalEventId`: (Required) The id of the marketing event to return

**Query Parameters:**

- `externalAccountId`: (Required) The account id associated with the marketing event

**Headers:**


**Success Response (200):**

```json
{
  "attendees": "<integer>",
  "cancellations": "<integer>",
  "createdAt": "<dateTime>",
  "eventName": "<string>",
  "eventOrganizer": "<string>",
  "externalEventId": "<string>",
  "id": "<string>",
  "noShows": "<integer>",
  "registrants": "<integer>",
  "updatedAt": "<dateTime>",
  "eventUrl": "<string>",
  "eventType": "<string>",
  "endDateTime": "<dateTime>",
  "startDateTime": "<dateTime>",
  "customProperties": [
    {
      "name": "<string>",
      "requestId": "<string>",
      "selectedByUser": "<boolean>",
      "selectedByUserTimestamp": "<long>",
      "source": "EXTENSION",
      "sourceId": "<string>",
      "sourceLabel": "<string>",
      "sourceMetadata": "<string>",
      "sourceVid": [
        "<long>",
        "<long>"
      ],
      "timestamp": "<long>",
      "value": "<string>",
      "updatedByUserId": "<integer>",
      "persistenceTimestamp": "<long>",
      "useTimestampAsPersistenceTimestamp": "<boolean>",
      "isLargeValue": "<boolean>",
      "dataSensitivity": "high",
      "isEncrypted": "<boolean>",
      "unit": "<string>"
    },
    {
      "name": "<string>",
      "requestId": "<string>",
      "selectedByUser": "<boolean>",
      "selectedByUserTimestamp": "<long>",
      "source": "EMAIL",
      "sourceId": "<string>",
      "sourceLabel": "<string>",
      "sourceMetadata": "<string>",
      "sourceVid": [
        "<long>",
        "<long>"
      ],
      "timestamp": "<long>",
      "value": "<string>",
      "updatedByUserId": "<integer>",
      "persistenceTimestamp": "<long>",
      "useTimestampAsPersistenceTimestamp": "<boolean>",
      "isLargeValue": "<boolean>",
      "dataSensitivity": "none",
      "isEncrypted": "<boolean>",
      "unit": "<string>"
    }
  ],
  "eventCancelled": "<boolean>",
  "eventDescription": "<string>"
}
```

---

### Create or update a marketing event

**Method:** `PUT`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/events/:externalEventId`

**Description:** Upsets a Marketing Event. If there is an existing Marketing event with the specified id, it will be updated; otherwise a new event will be created.

**Authentication:** apikey

**Path Variables:**

- `externalEventId`: (Required) The id of the marketing event to upsert

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "eventName": "<string>",
  "eventOrganizer": "<string>",
  "externalAccountId": "<string>",
  "externalEventId": "<string>",
  "startDateTime": "<dateTime>",
  "customProperties": [
    {
      "name": "<string>",
      "requestId": "<string>",
      "selectedByUser": "<boolean>",
      "selectedByUserTimestamp": "<long>",
      "source": "IMPORT",
      "sourceId": "<string>",
      "sourceLabel": "<string>",
      "sourceMetadata": "<string>",
      "sourceVid": [
        "<long>",
        "<long>"
      ],
      "timestamp": "<long>",
      "value": "<string>",
      "updatedByUserId": "<integer>",
      "persistenceTimestamp": "<long>",
      "useTimestampAsPersistenceTimestamp": "<boolean>",
      "isLargeValue": "<boolean>",
      "dataSensitivity": "standard",
      "isEncrypted": "<boolean>",
      "unit": "<string>"
    },
    {
      "name": "<string>",
      "requestId": "<string>",
      "selectedByUser": "<boolean>",
      "selectedByUserTimestamp": "<long>",
      "source": "COMPANY_FAMILIES",
      "sourceId": "<string>",
      "sourceLabel": "<string>",
      "sourceMetadata": "<string>",
      "sourceVid": [
        "<long>",
        "<long>"
      ],
      "timestamp": "<long>",
      "value": "<string>",
      "updatedByUserId": "<integer>",
      "persistenceTimestamp": "<long>",
      "useTimestampAsPersistenceTimestamp": "<boolean>",
      "isLargeValue": "<boolean>",
      "dataSensitivity": "none",
      "isEncrypted": "<boolean>",
      "unit": "<string>"
    }
  ],
  "eventCancelled": "<boolean>",
  "eventUrl": "<string>",
  "eventDescription": "<string>",
  "eventType": "<string>",
  "endDateTime": "<dateTime>"
}
```

**Success Response (200):**

```json
{
  "createdAt": "<dateTime>",
  "eventName": "<string>",
  "eventOrganizer": "<string>",
  "id": "<string>",
  "updatedAt": "<dateTime>",
  "startDateTime": "<dateTime>",
  "customProperties": [
    {
      "name": "<string>",
      "requestId": "<string>",
      "selectedByUser": "<boolean>",
      "selectedByUserTimestamp": "<long>",
      "source": "SETTINGS",
      "sourceId": "<string>",
      "sourceLabel": "<string>",
      "sourceMetadata": "<string>",
      "sourceVid": [
        "<long>",
        "<long>"
      ],
      "timestamp": "<long>",
      "value": "<string>",
      "updatedByUserId": "<integer>",
      "persistenceTimestamp": "<long>",
      "useTimestampAsPersistenceTimestamp": "<boolean>",
      "isLargeValue": "<boolean>",
      "dataSensitivity": "high",
      "isEncrypted": "<boolean>",
      "unit": "<string>"
    },
    {
      "name": "<string>",
      "requestId": "<string>",
      "selectedByUser": "<boolean>",
      "selectedByUserTimestamp": "<long>",
      "source": "EMAIL_INTEGRATION",
      "sourceId": "<string>",
      "sourceLabel": "<string>",
      "sourceMetadata": "<string>",
      "sourceVid": [
        "<long>",
        "<long>"
      ],
      "timestamp": "<long>",
      "value": "<string>",
      "updatedByUserId": "<integer>",
      "persistenceTimestamp": "<long>",
      "useTimestampAsPersistenceTimestamp": "<boolean>",
      "isLargeValue": "<boolean>",
      "dataSensitivity": "none",
      "isEncrypted": "<boolean>",
      "unit": "<string>"
    }
  ],
  "eventCancelled": "<boolean>",
  "eventUrl": "<string>",
  "eventDescription": "<string>",
  "eventType": "<string>",
  "endDateTime": "<dateTime>"
}
```

---

### Delete Marketing Event by External Ids

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/events/:externalEventId?externalAccountId=<string>`

**Description:** Deletes an existing Marketing Event with the specified id, if one exists.

**Authentication:** apikey

**Path Variables:**

- `externalEventId`: (Required) The id of the marketing event to delete

**Query Parameters:**

- `externalAccountId`: (Required) The account id associated with the marketing event

**Headers:**


---

### Update Marketing Event by External IDs

**Method:** `PATCH`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/events/:externalEventId?externalAccountId=<string>`

**Description:** Updates an existing Marketing Event with the specified id, if one exists.

**Authentication:** apikey

**Path Variables:**

- `externalEventId`: (Required) The id of the marketing event to update

**Query Parameters:**

- `externalAccountId`: (Required) The account id associated with the marketing event

**Headers:**

- `Content-Type`: application/json

**Success Response (200):**

```json
{
  "createdAt": "<dateTime>",
  "eventName": "<string>",
  "eventOrganizer": "<string>",
  "id": "<string>",
  "updatedAt": "<dateTime>",
  "startDateTime": "<dateTime>",
  "customProperties": [
    {
      "name": "<string>",
      "requestId": "<string>",
      "selectedByUser": "<boolean>",
      "selectedByUserTimestamp": "<long>",
      "source": "SETTINGS",
      "sourceId": "<string>",
      "sourceLabel": "<string>",
      "sourceMetadata": "<string>",
      "sourceVid": [
        "<long>",
        "<long>"
      ],
      "timestamp": "<long>",
      "value": "<string>",
      "updatedByUserId": "<integer>",
      "persistenceTimestamp": "<long>",
      "useTimestampAsPersistenceTimestamp": "<boolean>",
      "isLargeValue": "<boolean>",
      "dataSensitivity": "standard",
      "isEncrypted": "<boolean>",
      "unit": "<string>"
    },
    {
      "name": "<string>",
      "requestId": "<string>",
      "selectedByUser": "<boolean>",
      "selectedByUserTimestamp": "<long>",
      "source": "EMAIL_INTEGRATION",
      "sourceId": "<string>",
      "sourceLabel": "<string>",
      "sourceMetadata": "<string>",
      "sourceVid": [
        "<long>",
        "<long>"
      ],
      "timestamp": "<long>",
      "value": "<string>",
      "updatedByUserId": "<integer>",
      "persistenceTimestamp": "<long>",
      "useTimestampAsPersistenceTimestamp": "<boolean>",
      "isLargeValue": "<boolean>",
      "dataSensitivity": "high",
      "isEncrypted": "<boolean>",
      "unit": "<string>"
    }
  ],
  "eventCancelled": "<boolean>",
  "eventUrl": "<string>",
  "eventDescription": "<string>",
  "eventType": "<string>",
  "endDateTime": "<dateTime>"
}
```

---

### Retrieve the application settings

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/:appId/settings`

**Description:** Retrieve the current settings for the application.

**Authentication:** apikey

**Path Variables:**

- `appId`: (Required) The id of the application to retrieve the settings for.

**Headers:**


**Success Response (200):**

```json
{
  "appId": "<integer>",
  "eventDetailsUrl": "<string>"
}
```

---

### Update the application settings

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/:appId/settings`

**Description:** Create or update the current settings for the application.

**Authentication:** apikey

**Path Variables:**

- `appId`: (Required) The id of the application to update the settings for.

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "eventDetailsUrl": "<string>"
}
```

**Success Response (200):**

```json
{
  "appId": "<integer>",
  "eventDetailsUrl": "<string>"
}
```

---

### Find App-Specific Marketing Events by External Event Id

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/events/search?q=<string>`

**Description:** Search for marketing events that have an event id that starts with the query string

**Authentication:** oauth2

**Query Parameters:**

- `q`: (Required) The id of the marketing event in the external event application

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "appId": "<integer>",
      "externalAccountId": "<string>",
      "externalEventId": "<string>",
      "objectId": "<string>"
    },
    {
      "appId": "<integer>",
      "externalAccountId": "<string>",
      "externalEventId": "<string>",
      "objectId": "<string>"
    }
  ]
}
```

---

### Read participations breakdown by Marketing Event internal identifier

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/participations/:marketingEventId/breakdown?contactIdentifier=<string>&state=<string>&limit=10&after=<string>`

**Description:** Read Marketing event's participations breakdown with optional filters by internal identifier marketingEventId.

**Authentication:** oauth2

**Path Variables:**

- `marketingEventId`: (Required) The internal id of the marketing event in HubSpot.

**Query Parameters:**

- `contactIdentifier`: The identifier of the Contact. It may be email or internal id.
- `state`: The participation state value. It may be REGISTERED, CANCELLED, ATTENDED, NO_SHOW
- `limit`: The limit for response size. The default value is 10, the max number is 100
- `after`: The cursor indicating the position of the last retrieved item.

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "associations": {
        "contact": {
          "contactId": "<string>",
          "email": "<string>",
          "firstname": "<string>",
          "lastname": "<string>"
        },
        "marketingEvent": {
          "marketingEventId": "<string>",
          "name": "<string>",
          "externalAccountId": "<string>",
          "externalEventId": "<string>"
        }
      },
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "attendanceState": "REGISTERED",
        "occurredAt": "<long>",
        "attendancePercentage": "<string>",
        "attendanceDurationSeconds": "<integer>"
      }
    },
    {
      "associations": {
        "contact": {
          "contactId": "<string>",
          "email": "<string>",
          "firstname": "<string>",
          "lastname": "<string>"
        },
        "marketingEvent": {
          "marketingEventId": "<string>",
          "name": "<string>",
          "externalAccountId": "<string>",
          "externalEventId": "<string>"
        }
      },
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "attendanceState": "NO_SHOW",
        "occurredAt": "<long>",
        "attendancePercentage": "<string>",
        "attendanceDurationSeconds": "<integer>"
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

### Read participations counters by Marketing Event external identifier

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/participations/:externalAccountId/:externalEventId`

**Description:** Read Marketing event's participations counters by externalAccountId and externalEventId pair.

**Authentication:** oauth2

**Path Variables:**

- `externalAccountId`: (Required) The accountId that is associated with this marketing event in the external event application.
- `externalEventId`: (Required) The id of the marketing event in the external event application.

**Headers:**


**Success Response (200):**

```json
{
  "attended": "<integer>",
  "cancelled": "<integer>",
  "noShows": "<integer>",
  "registered": "<integer>"
}
```

---

### Read participations counters by Marketing Event internal identifier

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/participations/:marketingEventId`

**Description:** Read Marketing event's participations counters by internal identifier marketingEventId.

**Authentication:** oauth2

**Path Variables:**

- `marketingEventId`: (Required) The internal id of the marketing event in HubSpot.

**Headers:**


**Success Response (200):**

```json
{
  "attended": "<integer>",
  "cancelled": "<integer>",
  "noShows": "<integer>",
  "registered": "<integer>"
}
```

---

### Read participations breakdown by Marketing Event external identifier

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/participations/:externalAccountId/:externalEventId/breakdown?contactIdentifier=<string>&state=<string>&limit=10&after=<string>`

**Description:** Read Marketing event's participations breakdown with optional filters by externalAccountId and externalEventId pair.

**Authentication:** oauth2

**Path Variables:**

- `externalAccountId`: (Required) The accountId that is associated with this marketing event in the external event application.
- `externalEventId`: (Required) The id of the marketing event in the external event application.

**Query Parameters:**

- `contactIdentifier`: The identifier of the Contact. It may be email or internal id.
- `state`: The participation state value. It may be REGISTERED, CANCELLED, ATTENDED, NO_SHOW
- `limit`: The limit for response size. The default value is 10, the max number is 100
- `after`: The cursor indicating the position of the last retrieved item.

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "associations": {
        "contact": {
          "contactId": "<string>",
          "email": "<string>",
          "firstname": "<string>",
          "lastname": "<string>"
        },
        "marketingEvent": {
          "marketingEventId": "<string>",
          "name": "<string>",
          "externalAccountId": "<string>",
          "externalEventId": "<string>"
        }
      },
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "attendanceState": "REGISTERED",
        "occurredAt": "<long>",
        "attendancePercentage": "<string>",
        "attendanceDurationSeconds": "<integer>"
      }
    },
    {
      "associations": {
        "contact": {
          "contactId": "<string>",
          "email": "<string>",
          "firstname": "<string>",
          "lastname": "<string>"
        },
        "marketingEvent": {
          "marketingEventId": "<string>",
          "name": "<string>",
          "externalAccountId": "<string>",
          "externalEventId": "<string>"
        }
      },
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "attendanceState": "NO_SHOW",
        "occurredAt": "<long>",
        "attendancePercentage": "<string>",
        "attendanceDurationSeconds": "<integer>"
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

### Read participations breakdown by Contact identifier

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/participations/contacts/:contactIdentifier/breakdown?state=<string>&limit=10&after=<string>`

**Description:** Read Contact's participations by identifier - email or internal id.

**Authentication:** oauth2

**Path Variables:**

- `contactIdentifier`: (Required) The identifier of the Contact. It may be email or internal id.

**Query Parameters:**

- `state`: The participation state value. It may be REGISTERED, CANCELLED, ATTENDED, NO_SHOW
- `limit`: The limit for response size. The default value is 10, the max number is 100
- `after`: The cursor indicating the position of the last retrieved item.

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "associations": {
        "contact": {
          "contactId": "<string>",
          "email": "<string>",
          "firstname": "<string>",
          "lastname": "<string>"
        },
        "marketingEvent": {
          "marketingEventId": "<string>",
          "name": "<string>",
          "externalAccountId": "<string>",
          "externalEventId": "<string>"
        }
      },
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "attendanceState": "REGISTERED",
        "occurredAt": "<long>",
        "attendancePercentage": "<string>",
        "attendanceDurationSeconds": "<integer>"
      }
    },
    {
      "associations": {
        "contact": {
          "contactId": "<string>",
          "email": "<string>",
          "firstname": "<string>",
          "lastname": "<string>"
        },
        "marketingEvent": {
          "marketingEventId": "<string>",
          "name": "<string>",
          "externalAccountId": "<string>",
          "externalEventId": "<string>"
        }
      },
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "attendanceState": "NO_SHOW",
        "occurredAt": "<long>",
        "attendancePercentage": "<string>",
        "attendanceDurationSeconds": "<integer>"
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

### Associate a list with a marketing event

**Method:** `PUT`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/associations/:marketingEventId/lists/:listId`

**Description:** Associates a list with a marketing event by marketing event id and ILS list id

**Authentication:** apikey

**Path Variables:**

- `marketingEventId`: (Required) The internal id of the marketing event in HubSpot.
- `listId`: (Required) The ILS ID of the list.

**Headers:**


---

### Disassociate a list from a marketing event

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/associations/:marketingEventId/lists/:listId`

**Description:** Disassociates a list from a marketing event by marketing event id and ILS list id

**Authentication:** apikey

**Path Variables:**

- `marketingEventId`: (Required) The internal id of the marketing event in HubSpot.
- `listId`: (Required) The ILS ID of the list.

**Headers:**


---

### Get lists associated with a marketing event

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/associations/:externalAccountId/:externalEventId/lists`

**Description:** Gets lists associated with a marketing event by external account id and external event id

**Authentication:** apikey

**Path Variables:**

- `externalAccountId`: (Required) The accountId that is associated with this marketing event in the external event application.
- `externalEventId`: (Required) The id of the marketing event in the external event application.

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "listId": "<string>",
      "listVersion": "<integer>",
      "name": "<string>",
      "objectTypeId": "<string>",
      "processingStatus": "<string>",
      "processingType": "<string>",
      "updatedById": "<string>",
      "filtersUpdatedAt": "<dateTime>",
      "createdAt": "<dateTime>",
      "deletedAt": "<dateTime>",
      "size": "<long>",
      "createdById": "<string>",
      "updatedAt": "<dateTime>"
    },
    {
      "listId": "<string>",
      "listVersion": "<integer>",
      "name": "<string>",
      "objectTypeId": "<string>",
      "processingStatus": "<string>",
      "processingType": "<string>",
      "updatedById": "<string>",
      "filtersUpdatedAt": "<dateTime>",
      "createdAt": "<dateTime>",
      "deletedAt": "<dateTime>",
      "size": "<long>",
      "createdById": "<string>",
      "updatedAt": "<dateTime>"
    }
  ],
  "total": "<integer>"
}
```

---

### Associate a list with a marketing event

**Method:** `PUT`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/associations/:externalAccountId/:externalEventId/lists/:listId`

**Description:** Associates a list with a marketing event by external account id, external event id, and ILS list id

**Authentication:** apikey

**Path Variables:**

- `externalAccountId`: (Required) The accountId that is associated with this marketing event in the external event application.
- `externalEventId`: (Required) The id of the marketing event in the external event application.
- `listId`: (Required) The ILS ID of the list.

**Headers:**


---

### Disassociate a list from a marketing event

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/associations/:externalAccountId/:externalEventId/lists/:listId`

**Description:** Disassociates a list from a marketing event by external account id, external event id, and ILS list id

**Authentication:** apikey

**Path Variables:**

- `externalAccountId`: (Required) The accountId that is associated with this marketing event in the external event application.
- `externalEventId`: (Required) The id of the marketing event in the external event application.
- `listId`: (Required) The ILS ID of the list.

**Headers:**


---

### Get lists associated with a marketing event

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/associations/:marketingEventId/lists`

**Description:** Gets lists associated with a marketing event by marketing event id

**Authentication:** apikey

**Path Variables:**

- `marketingEventId`: (Required) The internal id of the marketing event in HubSpot.

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "listId": "<string>",
      "listVersion": "<integer>",
      "name": "<string>",
      "objectTypeId": "<string>",
      "processingStatus": "<string>",
      "processingType": "<string>",
      "updatedById": "<string>",
      "filtersUpdatedAt": "<dateTime>",
      "createdAt": "<dateTime>",
      "deletedAt": "<dateTime>",
      "size": "<long>",
      "createdById": "<string>",
      "updatedAt": "<dateTime>"
    },
    {
      "listId": "<string>",
      "listVersion": "<integer>",
      "name": "<string>",
      "objectTypeId": "<string>",
      "processingStatus": "<string>",
      "processingType": "<string>",
      "updatedById": "<string>",
      "filtersUpdatedAt": "<dateTime>",
      "createdAt": "<dateTime>",
      "deletedAt": "<dateTime>",
      "size": "<long>",
      "createdById": "<string>",
      "updatedAt": "<dateTime>"
    }
  ],
  "total": "<integer>"
}
```

---

### Get Marketing Event by objectId

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/:objectId`

**Description:** Returns the details of a Marketing Event with the specified objectId, if it exists.

**Authentication:** oauth2

**Path Variables:**

- `objectId`: (Required) The internal ID of the marketing event in HubSpot

**Headers:**


**Success Response (200):**

```json
{
  "createdAt": "<dateTime>",
  "customProperties": [
    {
      "name": "<string>",
      "value": "<string>"
    },
    {
      "name": "<string>",
      "value": "<string>"
    }
  ],
  "eventName": "<string>",
  "objectId": "<string>",
  "updatedAt": "<dateTime>",
  "registrants": "<integer>",
  "eventOrganizer": "<string>",
  "eventUrl": "<string>",
  "attendees": "<integer>",
  "appInfo": {
    "id": "<string>",
    "name": "<string>"
  },
  "eventType": "<string>",
  "eventCompleted": "<boolean>",
  "endDateTime": "<dateTime>",
  "noShows": "<integer>",
  "cancellations": "<integer>",
  "startDateTime": "<dateTime>",
  "eventCancelled": "<boolean>",
  "externalEventId": "<string>",
  "eventStatus": "<string>",
  "eventDescription": "<string>"
}
```

---

### Delete Marketing Event by objectId

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/:objectId`

**Description:** Deletes the existing Marketing Event with the specified objectId, if it exists.

**Authentication:** apikey

**Path Variables:**

- `objectId`: (Required) The internal ID of the marketing event in HubSpot

**Headers:**


---

### Update Marketing Event by objectId

**Method:** `PATCH`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/:objectId`

**Description:** Updates the details of an existing Marketing Event identified by its objectId, if it exists.

**Authentication:** apikey

**Path Variables:**

- `objectId`: (Required) The internal ID of the marketing event in HubSpot

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "customProperties": [
    {
      "dataSensitivity": "standard",
      "isEncrypted": false,
      "name": "ad eu sit",
      "requestId": "cillum tempor officia aliqua non",
      "selectedByUser": true,
      "selectedByUserTimestamp": 2439601,
      "source": "SETTINGS",
      "sourceId": "voluptate aliquip et veniam",
      "sourceLabel": "veniam",
      "sourceMetadata": "pariatur et",
      "sourceVid": [
        -12162090,
        31200963
      ],
      "timestamp": -12349682,
      "unit": "qui tempor ea ut Duis",
      "value": "dolor mollit nostrud adipisicing ex",
      "updatedByUserId": 86279783,
      "persistenceTimestamp": 61652612,
      "useTimestampAsPersistenceTimestamp": true,
      "isLargeValue": false
    },
    {
      "dataSensitivity": "high",
      "isEncrypted": false,
      "name": "consectetur dolor nostrud eiusmod",
      "requestId": "dolor enim velit laboris",
      "selectedByUser": true,
      "selectedByUserTimestamp": 94688975,
      "source": "QUOTAS",
      "sourceId": "pariatur ad labore",
      "sourceLabel": "eu sed",
      "sourceMetadata": "in id incididunt",
      "sourceVid": [
        -88053271,
        -57421916
      ],
      "timestamp": -19651588,
      "unit": "ex",
      "value": "magna laborum",
      "updatedByUserId": 77419756,
      "persistenceTimestamp": -66214616,
      "useTimestampAsPersistenceTimestamp": true,
      "isLargeValue": false
    }
  ],
  "startDateTime": "<dateTime>",
  "eventCancelled": "<boolean>",
  "eventOrganizer": "<string>",
  "eventUrl": "<string>",
  "eventDescription": "<string>",
  "eventName": "<string>",
  "eventType": "<string>",
  "endDateTime": "<dateTime>"
}
```

**Success Response (200):**

```json
{
  "createdAt": "<dateTime>",
  "customProperties": [
    {
      "name": "<string>",
      "value": "<string>"
    },
    {
      "name": "<string>",
      "value": "<string>"
    }
  ],
  "eventName": "<string>",
  "objectId": "<string>",
  "updatedAt": "<dateTime>",
  "eventOrganizer": "<string>",
  "eventUrl": "<string>",
  "appInfo": {
    "id": "<string>",
    "name": "<string>"
  },
  "eventType": "<string>",
  "eventCompleted": "<boolean>",
  "endDateTime": "<dateTime>",
  "startDateTime": "<dateTime>",
  "eventCancelled": "<boolean>",
  "eventDescription": "<string>"
}
```

---

### Record Participants by Email with Marketing Event Object Id

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/:objectId/attendance/:subscriberState/email-create`

**Description:** Records the participation of multiple HubSpot contacts in a Marketing Event using their email addresses.

If a contact does not exist, it will be automatically created. The contactProperties field is used exclusively for creating new contacts and will not update properties of existing contacts.

Additional Functionality:
- Adds a timeline event to the contacts.

Allowed Properties:
For the state "attend":
- joinedAt
- leftAt

**Authentication:** apikey

**Path Variables:**

- `objectId`: (Required) The internal ID of the marketing event in HubSpot
- `subscriberState`: (Required) The attendance state value. It may be 'register', 'attend' or 'cancel'

**Headers:**

- `Content-Type`: application/json

**Success Response (200):**

```json
{
  "completedAt": "1991-04-25T22:37:06.614Z",
  "results": [
    {
      "email": "et incididunt commodo reprehenderit",
      "vid": -93190574
    },
    {
      "email": "dolore aliquip et in",
      "vid": 42263716
    }
  ],
  "startedAt": "1945-04-19T07:34:28.696Z",
  "status": "CANCELED",
  "numErrors": 97462129,
  "requestedAt": "1986-02-06T01:58:39.245Z",
  "links": {
    "exercitation__55": "dolor officia consectetur",
    "mollit_589": "dolore ut sunt minim"
  },
  "errors": [
    {
      "category": "veniam consectetur ",
      "context": {
        "do_ca": [
          "in eiusmod l",
          "ipsum consequat id esse"
        ]
      },
      "errors": [
        {
          "message": "ex non",
          "subCategory": "aliqua Ut",
          "code": "ut sunt eiusmod dolore a",
          "in": "elit sunt dolor",
          "context": {
            "adipisicing19f": [
              "tempor in eiusmod",
              "ullamco amet aute ipsum consequat"
            ]
          }
        },
        {
          "message": "in officia",
          "subCategory": "exercitation cupidatat amet",
          "code": "dolore magna",
          "in": "n",
          "context": {
            "esse1": [
              "elit s",
              "id ex et occaecat"
            ]
          }
        }
      ],
      "links": {
        "Lorem11": "consequat aliquip cillum proident occaecat"
      },
      "message": "ipsum",
      "status": "in Duis qui in",
      "subCategory": {},
      "id": "Duis"
    },
    {
      "category": "eu dolor culpa sunt eiusmod",
      "context": {
        "culpa56": [
          "Duis qui amet anim",
          "commodo aliquip ipsum"
        ],
        "officia4_": [
          "exercitation dolor",
          "ut Lorem aute sit"
        ]
      },
      "errors": [
        {
          "message": "irure deserunt dolore",
          "subCategory": "aliquip",
          "code": "ut",
          "in": "anim Lorem",
          "context": {
            "amet_e": [
              "nostrud Lorem in",
              "voluptate laborum in"
            ],
            "ut7_c": [
              "labore nisi pariatur Lorem",
              "aliquip sint"
            ]
          }
        },
        {
          "message": "aute culpa eu",
          "subCategory": "ut Ut non est laborum",
          "code": "do tempor velit",
          "in": "sin",
          "context": {
            "laborum65": [
              "laboris",
              "nisi"
            ],
            "officia_55": [
              "in",
              "dolore in"
            ]
          }
        }
      ],
      "links": {
        "consequat_28": "qui culpa",
        "minim6": "dolor ullamco commodo",
        "Lorem_f": "sint anim sit"
      },
      "message": "quis deserunt nulla dolore eu",
      "status": "eu cillum reprehenderit anim",
      "subCategory": {},
      "id": "eiusmod sint esse dolor exercitation"
    }
  ]
}
```

---

### Get all marketing event

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/?after=<string>&limit=10`

**Description:** Returns all Marketing Events available on the portal, along with their properties, regardless of whether they were created manually or through the application.

The marketing events returned by this endpoint are sorted by objectId.

**Authentication:** oauth2

**Query Parameters:**

- `after`: The cursor indicating the position of the last retrieved item.
- `limit`: The limit for response size. The default value is 10, the max number is 100

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "createdAt": "<dateTime>",
      "customProperties": [
        {
          "name": "<string>",
          "value": "<string>"
        },
        {
          "name": "<string>",
          "value": "<string>"
        }
      ],
      "eventName": "<string>",
      "objectId": "<string>",
      "updatedAt": "<dateTime>",
      "registrants": "<integer>",
      "eventOrganizer": "<string>",
      "eventUrl": "<string>",
      "attendees": "<integer>",
      "appInfo": {
        "id": "<string>",
        "name": "<string>"
      },
      "eventType": "<string>",
      "eventCompleted": "<boolean>",
      "endDateTime": "<dateTime>",
      "noShows": "<integer>",
      "cancellations": "<integer>",
      "startDateTime": "<dateTime>",
      "eventCancelled": "<boolean>",
      "externalEventId": "<string>",
      "eventStatus": "<string>",
      "eventDescription": "<string>"
    },
    {
      "createdAt": "<dateTime>",
      "customProperties": [
        {
          "name": "<string>",
          "value": "<string>"
        },
        {
          "name": "<string>",
          "value": "<string>"
        }
      ],
      "eventName": "<string>",
      "objectId": "<string>",
      "updatedAt": "<dateTime>",
      "registrants": "<integer>",
      "eventOrganizer": "<string>",
      "eventUrl": "<string>",
      "attendees": "<integer>",
      "appInfo": {
        "id": "<string>",
        "name": "<string>"
      },
      "eventType": "<string>",
      "eventCompleted": "<boolean>",
      "endDateTime": "<dateTime>",
      "noShows": "<integer>",
      "cancellations": "<integer>",
      "startDateTime": "<dateTime>",
      "eventCancelled": "<boolean>",
      "externalEventId": "<string>",
      "eventStatus": "<string>",
      "eventDescription": "<string>"
    }
  ],
  "paging": {
    "next": {
      "after": "pariatur ea dolore dolor",
      "link": "consectetur cillum"
    }
  }
}
```

---

### Record Participants by ContactId with Marketing Event Object Id

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/:objectId/attendance/:subscriberState/create`

**Description:** Records the participation of multiple HubSpot contacts in a Marketing Event using their HubSpot contact IDs.

Additional Functionality:
- Adds a timeline event to the contacts.

Allowed Properties:
For the state "attend":
- joinedAt
- leftAt

**Authentication:** apikey

**Path Variables:**

- `objectId`: (Required) The internal id of the marketing event in HubSpot
- `subscriberState`: (Required) The attendance state value. It may be 'register', 'attend' or 'cancel'

**Headers:**

- `Content-Type`: application/json

**Success Response (200):**

```json
{
  "completedAt": "1961-09-14T23:36:23.743Z",
  "results": [
    {
      "vid": -15153545
    },
    {
      "vid": 40759015
    }
  ],
  "startedAt": "1960-09-07T13:42:28.158Z",
  "status": "PROCESSING",
  "numErrors": -94527365,
  "requestedAt": "2019-07-03T21:36:26.692Z",
  "links": {
    "anim916": "tempor culpa laboris in",
    "dolor8d1": "qui et aute"
  },
  "errors": [
    {
      "category": "nostrud do ",
      "context": {
        "ad2": [
          "dolor in officia",
          "qui mollit ipsum quis in"
        ]
      },
      "errors": [
        {
          "message": "laborum",
          "subCategory": "in",
          "code": "al",
          "in": "consequat tempor labo",
          "context": {
            "id_08": [
              "dolor labore",
              "nisi in non ut"
            ],
            "dolor_bca": [
              "dolor mollit sint in aliquip",
              "pariatur"
            ],
            "sint_6c": [
              "eiusmod irure",
              "ut"
            ],
            "id_a": [
              "laboris in Ut commodo",
              "eu quis sint dolore"
            ]
          }
        },
        {
          "message": "laborum in ",
          "subCategory": "nostrud velit pariatur ex laborum",
          "code": "do mollit sed",
          "in": "laborum exerc",
          "context": {
            "aliquip_9": [
              "sunt ad",
              "ullamco anim"
            ]
          }
        }
      ],
      "links": {
        "in_a": "cu",
        "commodo_7c": "fugiat minim adipisicing"
      },
      "message": "exercitation anim dolore",
      "status": "id adipisicing",
      "subCategory": {},
      "id": "ad qui sit"
    },
    {
      "category": "dolor ad",
      "context": {
        "dolore4": [
          "elit exercitation",
          "nostrud dolore eu qui"
        ],
        "quicdf": [
          "veniam quis",
          "dolor proident"
        ]
      },
      "errors": [
        {
          "message": "tempor Excepteur velit sint",
          "subCategory": "laborum ad voluptate laboris ad",
          "code": "reprehenderit veniam pariatur deserunt",
          "in": "dolore velit in",
          "context": {
            "sit4": [
              "sit incididunt Duis aute cupidatat",
              "ex quis "
            ],
            "amet6fc": [
              "veniam cupidatat",
              "eu"
            ],
            "velit_a": [
              "cillum quis",
              "veniam"
            ]
          }
        },
        {
          "message": "dolor nulla cupidatat",
          "subCategory": "do laboris cillum eiusmod",
          "code": "amet",
          "in": "voluptate et deserunt sit eiusmod",
          "context": {
            "sit_6e": [
              "commodo in est enim",
              "veniam"
            ],
            "Ut60": [
              "culpa cillum aute Duis do",
              "est mi"
            ]
          }
        }
      ],
      "links": {
        "sed_195": "nulla commodo eu"
      },
      "message": "nisi exercitation",
      "status": "anim",
      "subCategory": {},
      "id": "qui tempor laborum dolore"
    }
  ]
}
```

---

### Find Marketing Events by externalEventId

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/:externalEventId/identifiers`

**Description:** This endpoint searches the portal for all Marketing Events whose externalEventId matches the value provided in the request.

It retrieves the objectId and additional event details for each matching Marketing Event.

Since multiple Marketing Events can have the same externalEventId, the endpoint returns all matching results.

Note: Marketing Events become searchable by externalEventId a few minutes after creation.

**Authentication:** oauth2

**Path Variables:**

- `externalEventId`: (Required) The id of the marketing event in the external event application.

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "externalEventId": "<string>",
      "marketingEventName": "<string>",
      "objectId": "<string>",
      "externalAccountId": "<string>",
      "appInfo": {
        "id": "<string>",
        "name": "<string>"
      }
    },
    {
      "externalEventId": "<string>",
      "marketingEventName": "<string>",
      "objectId": "<string>",
      "externalAccountId": "<string>",
      "appInfo": {
        "id": "<string>",
        "name": "<string>"
      }
    }
  ],
  "total": "<integer>"
}
```

---

### Update Multiple Marketing Events by ObjectId

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/batch/update`

**Description:** Updates multiple Marketing Events on the portal based on their objectId, if they exist.

**Authentication:** apikey

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    {
      "customProperties": [
        {
          "dataSensitivity": "high",
          "isEncrypted": true,
          "name": "aliqua occae",
          "requestId": "aliquip mollit Lorem",
          "selectedByUser": false,
          "selectedByUserTimestamp": 5639591,
          "source": "BOT",
          "sourceId": "ex anim",
          "sourceLabel": "in Excepteur",
          "sourceMetadata": "ea mollit sint",
          "sourceVid": [
            -69737229,
            18188284
          ],
          "timestamp": 21188866,
          "unit": "incididunt aliquip",
          "value": "irure Ut",
          "updatedByUserId": -69233886,
          "persistenceTimestamp": 24941094,
          "useTimestampAsPersistenceTimestamp": true,
          "isLargeValue": true
        },
        {
          "dataSensitivity": "standard",
          "isEncrypted": true,
          "name": "anim culpa exercitation cillum eiusmod",
          "requestId": "m",
          "selectedByUser": true,
          "selectedByUserTimestamp": -55616552,
          "source": "BIDEN",
          "sourceId": "ut",
          "sourceLabel": "cupidatat exercitation amet",
          "sourceMetadata": "sunt cillum",
          "sourceVid": [
            99614673,
            -94823355
          ],
          "timestamp": -32241188,
          "unit": "consequat irure proident Excepteur",
          "value": "Ut sunt mollit proident",
          "updatedByUserId": 74551606,
          "persistenceTimestamp": -59836287,
          "useTimestampAsPersistenceTimestamp": false,
          "isLargeValue": false
        }
      ],
      "objectId": "<string>",
      "startDateTime": "<dateTime>",
      "eventCancelled": "<boolean>",
      "eventOrganizer": "<string>",
      "eventUrl": "<string>",
      "eventDescription": "<string>",
      "eventName": "<string>",
      "eventType": "<string>",
      "endDateTime": "<dateTime>"
    },
    {
      "customProperties": [
        {
          "dataSensitivity": "high",
          "isEncrypted": true,
          "name": "laborum ad aute",
          "requestId": "magna nisi dolore in",
          "selectedByUser": false,
          "selectedByUserTimestamp": 92665611,
          "source": "UNKNOWN",
          "sourceId": "aliquip sint volupt",
          "sourceLabel": "enim officia",
          "sourceMetadata": "occaecat pr",
          "sourceVid": [
            -93700505,
            69604251
          ],
          "timestamp": -98936029,
          "unit": "nulla Duis",
          "value": "et reprehenderit exercitation",
          "updatedByUserId": -64777845,
          "persistenceTimestamp": 36267352,
          "useTimestampAsPersistenceTimestamp": false,
          "isLargeValue": true
        },
        {
          "dataSensitivity": "none",
          "isEncrypted": false,
          "name": "laboris esse c",
          "requestId": "ipsum ut fugiat sunt",
          "selectedByUser": false,
          "selectedByUserTimestamp": -68836466,
          "source": "COMPANY_FAMILIES",
          "sourceId": "nostrud consectetur",
          "sourceLabel": "magna ex proident",
          "sourceMetadata": "laboris exercitation",
          "sourceVid": [
            -41934701,
            -79814024
          ],
          "timestamp": 94328930,
          "unit": "culpa ut aliqua",
          "value": "est qui anim ven",
          "updatedByUserId": 78693376,
          "persistenceTimestamp": 43493151,
          "useTimestampAsPersistenceTimestamp": true,
          "isLargeValue": true
        }
      ],
      "objectId": "<string>",
      "startDateTime": "<dateTime>",
      "eventCancelled": "<boolean>",
      "eventOrganizer": "<string>",
      "eventUrl": "<string>",
      "eventDescription": "<string>",
      "eventName": "<string>",
      "eventType": "<string>",
      "endDateTime": "<dateTime>"
    }
  ]
}
```

**Success Response (200):**

```json
{
  "completedAt": "<dateTime>",
  "results": [
    {
      "createdAt": "1963-01-28T10:39:28.191Z",
      "customProperties": [
        {
          "name": "quis",
          "value": "dolore aliquip Lorem"
        },
        {
          "name": "cillum aliqua",
          "value": "et consequat Exce"
        }
      ],
      "eventName": "ut amet est",
      "objectId": "dolor",
      "updatedAt": "1962-11-04T01:27:25.654Z",
      "eventOrganizer": "anim dolor",
      "eventUrl": "dolore consequat in",
      "appInfo": {
        "id": "aute exercitation",
        "name": "laboris ullamco"
      },
      "eventType": "sint magna dolore",
      "eventCompleted": true,
      "endDateTime": "1951-02-21T17:24:30.182Z",
      "startDateTime": "2018-06-19T09:50:18.865Z",
      "eventCancelled": true,
      "eventDescription": "in id sunt mollit"
    },
    {
      "createdAt": "1957-07-05T07:04:38.576Z",
      "customProperties": [
        {
          "name": "adipisicing anim",
          "value": "sit tempor occaecat"
        },
        {
          "name": "Duis dolor dolore",
          "value": "enim consequat magna qui"
        }
      ],
      "eventName": "consequat fugiat ",
      "objectId": "sed consectetur in irure",
      "updatedAt": "1998-08-20T14:36:51.415Z",
      "eventOrganizer": "mollit adipisicing",
      "eventUrl": "a",
      "appInfo": {
        "id": "deserunt elit quis ex in",
        "name": "quis esse amet"
      },
      "eventType": "do aute sunt eiusmod",
      "eventCompleted": false,
      "endDateTime": "2001-12-28T18:15:09.040Z",
      "startDateTime": "1967-10-16T16:51:51.406Z",
      "eventCancelled": true,
      "eventDescription": "Excepteur esse"
    }
  ],
  "startedAt": "<dateTime>",
  "status": "CANCELED",
  "requestedAt": "<dateTime>",
  "links": {
    "in_9de": "<string>",
    "ut_9e": "<string>"
  }
}
```

---

### Delete Multiple Marketing Events by ObjectId

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/marketing-events/batch/archive`

**Description:** Deletes multiple Marketing Events from the portal based on their objectId, if they exist.

Responses:
204: Returned if all specified Marketing Events were successfully deleted.
207: Returned if some objectIds did not correspond to any existing Marketing Events.

**Authentication:** apikey

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    {
      "objectId": "<string>"
    },
    {
      "objectId": "<string>"
    }
  ]
}
```

---

