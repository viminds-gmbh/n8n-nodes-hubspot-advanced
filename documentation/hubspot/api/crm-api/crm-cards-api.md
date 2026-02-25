# CRM Cards API

Total endpoints: 6

---

### Get all cards

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/extensions/cards-dev/:appId`

**Description:** Returns a list of cards for a given app.

**Authentication:** apikey

**Path Variables:**

- `appId`: No description

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "actions": {
        "baseUrls": [
          "<string>",
          "<string>"
        ]
      },
      "auditHistory": [
        {
          "actionType": "DELETE",
          "applicationId": "<integer>",
          "authSource": "EXTERNAL",
          "changedAt": "<long>",
          "initiatingUserId": "<integer>",
          "objectTypeId": "<integer>"
        },
        {
          "actionType": "DELETE",
          "applicationId": "<integer>",
          "authSource": "EXTERNAL",
          "changedAt": "<long>",
          "initiatingUserId": "<integer>",
          "objectTypeId": "<integer>"
        }
      ],
      "display": {
        "properties": [
          {
            "dataType": "BOOLEAN",
            "label": "<string>",
            "name": "<string>",
            "options": [
              {
                "label": "<string>",
                "name": "<string>",
                "type": "INFO"
              },
              {
                "label": "<string>",
                "name": "<string>",
                "type": "SUCCESS"
              }
            ]
          },
          {
            "dataType": "BOOLEAN",
            "label": "<string>",
            "name": "<string>",
            "options": [
              {
                "label": "<string>",
                "name": "<string>",
                "type": "INFO"
              },
              {
                "label": "<string>",
                "name": "<string>",
                "type": "DANGER"
              }
            ]
          }
        ]
      },
      "fetch": {
        "objectTypes": [
          {
            "name": "marketing_events",
            "propertiesToSend": [
              "<string>",
              "<string>"
            ]
          },
          {
            "name": "marketing_events",
            "propertiesToSend": [
              "<string>",
              "<string>"
            ]
          }
        ],
        "targetUrl": "<string>"
      },
      "id": "<string>",
      "title": "<string>",
      "createdAt": "<dateTime>",
      "updatedAt": "<dateTime>"
    },
    {
      "actions": {
        "baseUrls": [
          "<string>",
          "<string>"
        ]
      },
      "auditHistory": [
        {
          "actionType": "DELETE",
          "applicationId": "<integer>",
          "authSource": "APP",
          "changedAt": "<long>",
          "initiatingUserId": "<integer>",
          "objectTypeId": "<integer>"
        },
        {
          "actionType": "UPDATE",
          "applicationId": "<integer>",
          "authSource": "APP",
          "changedAt": "<long>",
          "initiatingUserId": "<integer>",
          "objectTypeId": "<integer>"
        }
      ],
      "display": {
        "properties": [
          {
            "dataType": "BOOLEAN",
            "label": "<string>",
            "name": "<string>",
            "options": [
              {
                "label": "<string>",
                "name": "<string>",
                "type": "SUCCESS"
              },
              {
                "label": "<string>",
                "name": "<string>",
                "type": "WARNING"
              }
            ]
          },
          {
            "dataType": "BOOLEAN",
            "label": "<string>",
            "name": "<string>",
            "options": [
              {
                "label": "<string>",
                "name": "<string>",
                "type": "DEFAULT"
              },
              {
                "label": "<string>",
                "name": "<string>",
                "type": "WARNING"
              }
            ]
          }
        ]
      },
      "fetch": {
        "objectTypes": [
          {
            "name": "companies",
            "propertiesToSend": [
              "<string>",
              "<string>"
            ]
          },
          {
            "name": "contacts",
            "propertiesToSend": [
              "<string>",
              "<string>"
            ]
          }
        ],
        "targetUrl": "<string>"
      },
      "id": "<string>",
      "title": "<string>",
      "createdAt": "<dateTime>",
      "updatedAt": "<dateTime>"
    }
  ]
}
```

---

### Create a new card

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/extensions/cards-dev/:appId`

**Description:** Defines a new card that will become active on an account when this app is installed.

**Authentication:** apikey

**Path Variables:**

- `appId`: No description

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "title": "Example Legacy CRM Card",
  "fetch": {
    "targetUrl": "https://raw.githubusercontent.com/HubSpot/ui-extensions-examples/refs/heads/main/legacy-card-converter/example-response/example-response.json",
    "objectTypes": [
      {
        "name": "contacts",
        "propertiesToSend": ["firstname", "lastname", "email"]
      },
      {
        "name": "tickets",
        "propertiesToSend": ["subject", "status", "priority"]
      }
    ]
  },
  "display": {
    "properties": [
      {
        "name": "created",
        "label": "Created At",
        "dataType": "DATE",
        "options": []
      },
      {
        "name": "priority",
        "label": "Priority",
        "dataType": "STATUS",
        "options": [
          {
            "name": "HIGH",
            "label": "High",
            "type": "DANGER"
          }
        ]
      },
      {
        "name": "project",
        "label": "Project",
        "dataType": "STRING",
        "options": []
      },
      {
        "name": "reported_by",
        "label": "Reported By",
        "dataType": "EMAIL",
        "options": []
      },
      {
        "name": "description",
        "label": "Description",
        "dataType": "STRING",
        "options": []
      },
      {
        "name": "reporter_type",
        "label": "Reported Type",
        "dataType": "STRING",
        "options": []
      },
      {
        "name": "status",
        "label": "Status",
        "dataType": "STATUS",
        "options": [
          {
            "name": "In Progress",
            "label": "In Progress",
            "type": "WARNING"
          }
        ]
      },
      {
        "name": "ticket_type",
        "label": "Ticket Type",
        "dataType": "STRING",
        "options": []
      },
      {
        "name": "updated",
        "label": "Last Updated",
        "dataType": "DATE",
        "options": []
      }
    ]
  },
  "actions": {
    "baseUrls": [
      "https://example.com/"
    ]
  }
}

```

**Success Response (201):**

```json
{
  "actions": {
    "baseUrls": [
      "<string>",
      "<string>"
    ]
  },
  "auditHistory": [
    {
      "actionType": "UPDATE",
      "applicationId": "<integer>",
      "authSource": "EXTERNAL",
      "changedAt": "<long>",
      "initiatingUserId": "<integer>",
      "objectTypeId": "<integer>"
    },
    {
      "actionType": "DELETE",
      "applicationId": "<integer>",
      "authSource": "INTERNAL",
      "changedAt": "<long>",
      "initiatingUserId": "<integer>",
      "objectTypeId": "<integer>"
    }
  ],
  "display": {
    "properties": [
      {
        "dataType": "LINK",
        "label": "<string>",
        "name": "<string>",
        "options": [
          {
            "label": "<string>",
            "name": "<string>",
            "type": "DANGER"
          },
          {
            "label": "<string>",
            "name": "<string>",
            "type": "INFO"
          }
        ]
      },
      {
        "dataType": "DATETIME",
        "label": "<string>",
        "name": "<string>",
        "options": [
          {
            "label": "<string>",
            "name": "<string>",
            "type": "DEFAULT"
          },
          {
            "label": "<string>",
            "name": "<string>",
            "type": "SUCCESS"
          }
        ]
      }
    ]
  },
  "fetch": {
    "objectTypes": [
      {
        "name": "marketing_events",
        "propertiesToSend": [
          "<string>",
          "<string>"
        ]
      },
      {
        "name": "marketing_events",
        "propertiesToSend": [
          "<string>",
          "<string>"
        ]
      }
    ],
    "targetUrl": "<string>"
  },
  "id": "<string>",
  "title": "<string>",
  "createdAt": "<dateTime>",
  "updatedAt": "<dateTime>"
}
```

---

### Get a card.

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/extensions/cards-dev/:appId/:cardId`

**Description:** Returns the definition for a card with the given ID.

**Authentication:** apikey

**Path Variables:**

- `appId`: No description
- `cardId`: No description

**Headers:**


**Success Response (200):**

```json
{
  "actions": {
    "baseUrls": [
      "<string>",
      "<string>"
    ]
  },
  "auditHistory": [
    {
      "actionType": "UPDATE",
      "applicationId": "<integer>",
      "authSource": "EXTERNAL",
      "changedAt": "<long>",
      "initiatingUserId": "<integer>",
      "objectTypeId": "<integer>"
    },
    {
      "actionType": "DELETE",
      "applicationId": "<integer>",
      "authSource": "INTERNAL",
      "changedAt": "<long>",
      "initiatingUserId": "<integer>",
      "objectTypeId": "<integer>"
    }
  ],
  "display": {
    "properties": [
      {
        "dataType": "LINK",
        "label": "<string>",
        "name": "<string>",
        "options": [
          {
            "label": "<string>",
            "name": "<string>",
            "type": "DANGER"
          },
          {
            "label": "<string>",
            "name": "<string>",
            "type": "INFO"
          }
        ]
      },
      {
        "dataType": "DATETIME",
        "label": "<string>",
        "name": "<string>",
        "options": [
          {
            "label": "<string>",
            "name": "<string>",
            "type": "DEFAULT"
          },
          {
            "label": "<string>",
            "name": "<string>",
            "type": "SUCCESS"
          }
        ]
      }
    ]
  },
  "fetch": {
    "objectTypes": [
      {
        "name": "marketing_events",
        "propertiesToSend": [
          "<string>",
          "<string>"
        ]
      },
      {
        "name": "marketing_events",
        "propertiesToSend": [
          "<string>",
          "<string>"
        ]
      }
    ],
    "targetUrl": "<string>"
  },
  "id": "<string>",
  "title": "<string>",
  "createdAt": "<dateTime>",
  "updatedAt": "<dateTime>"
}
```

---

### Delete a card

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/crm/v3/extensions/cards-dev/:appId/:cardId`

**Description:** Permanently deletes a card definition with the given ID. Once deleted, data fetch requests for this card will no longer be sent to your service. This can't be undone.

**Authentication:** apikey

**Path Variables:**

- `appId`: No description
- `cardId`: No description

**Headers:**


---

### Update a card

**Method:** `PATCH`

**URL:** `https://api.hubapi.com/crm/v3/extensions/cards-dev/:appId/:cardId`

**Description:** Update a card definition with new details.

**Authentication:** apikey

**Path Variables:**

- `appId`: No description
- `cardId`: No description

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "title": "<string>",
  "fetch": {
    "objectTypes": [
      {
        "name": "companies",
        "propertiesToSend": [
          "<string>",
          "<string>"
        ]
      },
      {
        "name": "tickets",
        "propertiesToSend": [
          "<string>",
          "<string>"
        ]
      }
    ],
    "cardType": "EXTERNAL",
    "targetUrl": "<string>",
    "serverlessFunction": "<string>"
  },
  "display": {
    "properties": [
      {
        "dataType": "EMAIL",
        "label": "<string>",
        "name": "<string>",
        "options": [
          {
            "label": "<string>",
            "name": "<string>",
            "type": "SUCCESS"
          },
          {
            "label": "<string>",
            "name": "<string>",
            "type": "DANGER"
          }
        ]
      },
      {
        "dataType": "STRING",
        "label": "<string>",
        "name": "<string>",
        "options": [
          {
            "label": "<string>",
            "name": "<string>",
            "type": "INFO"
          },
          {
            "label": "<string>",
            "name": "<string>",
            "type": "DEFAULT"
          }
        ]
      }
    ]
  },
  "actions": {
    "baseUrls": [
      "<string>",
      "<string>"
    ]
  }
}
```

**Success Response (200):**

```json
{
  "actions": {
    "baseUrls": [
      "<string>",
      "<string>"
    ]
  },
  "auditHistory": [
    {
      "actionType": "UPDATE",
      "applicationId": "<integer>",
      "authSource": "EXTERNAL",
      "changedAt": "<long>",
      "initiatingUserId": "<integer>",
      "objectTypeId": "<integer>"
    },
    {
      "actionType": "DELETE",
      "applicationId": "<integer>",
      "authSource": "INTERNAL",
      "changedAt": "<long>",
      "initiatingUserId": "<integer>",
      "objectTypeId": "<integer>"
    }
  ],
  "display": {
    "properties": [
      {
        "dataType": "LINK",
        "label": "<string>",
        "name": "<string>",
        "options": [
          {
            "label": "<string>",
            "name": "<string>",
            "type": "DANGER"
          },
          {
            "label": "<string>",
            "name": "<string>",
            "type": "INFO"
          }
        ]
      },
      {
        "dataType": "DATETIME",
        "label": "<string>",
        "name": "<string>",
        "options": [
          {
            "label": "<string>",
            "name": "<string>",
            "type": "DEFAULT"
          },
          {
            "label": "<string>",
            "name": "<string>",
            "type": "SUCCESS"
          }
        ]
      }
    ]
  },
  "fetch": {
    "objectTypes": [
      {
        "name": "marketing_events",
        "propertiesToSend": [
          "<string>",
          "<string>"
        ]
      },
      {
        "name": "marketing_events",
        "propertiesToSend": [
          "<string>",
          "<string>"
        ]
      }
    ],
    "targetUrl": "<string>"
  },
  "id": "<string>",
  "title": "<string>",
  "createdAt": "<dateTime>",
  "updatedAt": "<dateTime>"
}
```

---

### Get sample card detail response

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/extensions/cards-dev/sample-response`

**Description:** Returns an example card detail response. This is the payload with displayed details for a card that will be shown to a user. An app should send this in response to the data fetch request.

**Headers:**


**Success Response (200):**

```json
{
  "totalCount": "<integer>",
  "allItemsLinkUrl": "<string>",
  "cardLabel": "<string>",
  "topLevelActions": {
    "secondary": [
      {
        "httpMethod": "CONNECT",
        "propertyNamesIncluded": [
          "<string>",
          "<string>"
        ],
        "type": "ACTION_HOOK",
        "url": "<string>",
        "confirmation": {
          "cancelButtonLabel": "<string>",
          "confirmButtonLabel": "<string>",
          "prompt": "<string>"
        },
        "label": "<string>"
      },
      {
        "httpMethod": "POST",
        "propertyNamesIncluded": [
          "<string>",
          "<string>"
        ],
        "type": "ACTION_HOOK",
        "url": "<string>",
        "confirmation": {
          "cancelButtonLabel": "<string>",
          "confirmButtonLabel": "<string>",
          "prompt": "<string>"
        },
        "label": "<string>"
      }
    ],
    "settings": {
      "height": "<integer>",
      "propertyNamesIncluded": [
        "<string>",
        "<string>"
      ],
      "type": "IFRAME",
      "url": "<string>",
      "width": "<integer>",
      "label": "<string>"
    },
    "primary": {
      "httpMethod": "POST",
      "propertyNamesIncluded": [
        "<string>",
        "<string>"
      ],
      "type": "ACTION_HOOK",
      "url": "<string>",
      "confirmation": {
        "cancelButtonLabel": "<string>",
        "confirmButtonLabel": "<string>",
        "prompt": "<string>"
      },
      "label": "<string>"
    }
  },
  "sections": [
    {
      "actions": [
        {
          "httpMethod": "HEAD",
          "propertyNamesIncluded": [
            "<string>",
            "<string>"
          ],
          "type": "ACTION_HOOK",
          "url": "<string>",
          "confirmation": {
            "cancelButtonLabel": "<string>",
            "confirmButtonLabel": "<string>",
            "prompt": "<string>"
          },
          "label": "<string>"
        },
        {
          "httpMethod": "PATCH",
          "propertyNamesIncluded": [
            "<string>",
            "<string>"
          ],
          "type": "ACTION_HOOK",
          "url": "<string>",
          "confirmation": {
            "cancelButtonLabel": "<string>",
            "confirmButtonLabel": "<string>",
            "prompt": "<string>"
          },
          "label": "<string>"
        }
      ],
      "id": "<string>",
      "title": "<string>",
      "tokens": [
        {
          "value": "<string>",
          "name": "<string>",
          "label": "<string>",
          "dataType": "EMAIL"
        },
        {
          "value": "<string>",
          "name": "<string>",
          "label": "<string>",
          "dataType": "CURRENCY"
        }
      ],
      "linkUrl": "<string>"
    },
    {
      "actions": [
        {
          "httpMethod": "GET",
          "propertyNamesIncluded": [
            "<string>",
            "<string>"
          ],
          "type": "ACTION_HOOK",
          "url": "<string>",
          "confirmation": {
            "cancelButtonLabel": "<string>",
            "confirmButtonLabel": "<string>",
            "prompt": "<string>"
          },
          "label": "<string>"
        },
        {
          "httpMethod": "PATCH",
          "propertyNamesIncluded": [
            "<string>",
            "<string>"
          ],
          "type": "ACTION_HOOK",
          "url": "<string>",
          "confirmation": {
            "cancelButtonLabel": "<string>",
            "confirmButtonLabel": "<string>",
            "prompt": "<string>"
          },
          "label": "<string>"
        }
      ],
      "id": "<string>",
      "title": "<string>",
      "tokens": [
        {
          "value": "<string>",
          "name": "<string>",
          "label": "<string>",
          "dataType": "DATE"
        },
        {
          "value": "<string>",
          "name": "<string>",
          "label": "<string>",
          "dataType": "DATETIME"
        }
      ],
      "linkUrl": "<string>"
    }
  ],
  "responseVersion": "v1"
}
```

---

