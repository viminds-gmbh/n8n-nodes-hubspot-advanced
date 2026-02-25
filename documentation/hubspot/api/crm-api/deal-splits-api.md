# Deal Splits API

Total endpoints: 2

---

### Create or replace deal splits for deals with the provided IDs. Deal split percentages for each deal must sum up to 1.0 (100%) and may have up to 8 decimal places

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/deals/splits/batch/upsert`

**Authentication:** oauth2

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    {
      "id": "<integer>",
      "splits": [
        {
          "ownerId": "<integer>",
          "percentage": "<number>"
        },
        {
          "ownerId": "<integer>",
          "percentage": "<number>"
        }
      ]
    },
    {
      "id": "<integer>",
      "splits": [
        {
          "ownerId": "<integer>",
          "percentage": "<number>"
        },
        {
          "ownerId": "<integer>",
          "percentage": "<number>"
        }
      ]
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
      "id": "<string>",
      "splits": [
        {
          "createdAt": "<dateTime>",
          "id": "<string>",
          "properties": {
            "sint_e0c": "<string>",
            "voluptate_e13": "<string>"
          },
          "updatedAt": "<dateTime>",
          "archived": "<boolean>",
          "archivedAt": "<dateTime>",
          "propertiesWithHistory": {
            "occaecat66": [
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              },
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              }
            ],
            "adipisicing_9df": [
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              },
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              }
            ],
            "voluptate_05": [
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              },
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              }
            ],
            "fugiatc_c": [
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              },
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              }
            ]
          }
        },
        {
          "createdAt": "<dateTime>",
          "id": "<string>",
          "properties": {
            "etef": "<string>"
          },
          "updatedAt": "<dateTime>",
          "archived": "<boolean>",
          "archivedAt": "<dateTime>",
          "propertiesWithHistory": {
            "pariatur_f": [
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              },
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              }
            ]
          }
        }
      ]
    },
    {
      "id": "<string>",
      "splits": [
        {
          "createdAt": "<dateTime>",
          "id": "<string>",
          "properties": {
            "in_0e9": "<string>",
            "eiusmod554": "<string>"
          },
          "updatedAt": "<dateTime>",
          "archived": "<boolean>",
          "archivedAt": "<dateTime>",
          "propertiesWithHistory": {
            "fugiat3": [
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              },
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              }
            ],
            "temporb_": [
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              },
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              }
            ]
          }
        },
        {
          "createdAt": "<dateTime>",
          "id": "<string>",
          "properties": {
            "id0ef": "<string>"
          },
          "updatedAt": "<dateTime>",
          "archived": "<boolean>",
          "archivedAt": "<dateTime>",
          "propertiesWithHistory": {
            "incididunte8": [
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              },
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              }
            ],
            "in_306": [
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              },
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              }
            ]
          }
        }
      ]
    }
  ],
  "startedAt": "<dateTime>",
  "status": "CANCELED",
  "requestedAt": "<dateTime>",
  "links": {
    "elit_c01": "<string>"
  }
}
```

---

### Read a batch of deal split objects by their associated deal object internal ID

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/deals/splits/batch/read`

**Authentication:** oauth2

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    {
      "id": "<string>"
    },
    {
      "id": "<string>"
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
      "id": "<string>",
      "splits": [
        {
          "createdAt": "<dateTime>",
          "id": "<string>",
          "properties": {
            "sint_e0c": "<string>",
            "voluptate_e13": "<string>"
          },
          "updatedAt": "<dateTime>",
          "archived": "<boolean>",
          "archivedAt": "<dateTime>",
          "propertiesWithHistory": {
            "occaecat66": [
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              },
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              }
            ],
            "adipisicing_9df": [
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              },
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              }
            ],
            "voluptate_05": [
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              },
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              }
            ],
            "fugiatc_c": [
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              },
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              }
            ]
          }
        },
        {
          "createdAt": "<dateTime>",
          "id": "<string>",
          "properties": {
            "etef": "<string>"
          },
          "updatedAt": "<dateTime>",
          "archived": "<boolean>",
          "archivedAt": "<dateTime>",
          "propertiesWithHistory": {
            "pariatur_f": [
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              },
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              }
            ]
          }
        }
      ]
    },
    {
      "id": "<string>",
      "splits": [
        {
          "createdAt": "<dateTime>",
          "id": "<string>",
          "properties": {
            "in_0e9": "<string>",
            "eiusmod554": "<string>"
          },
          "updatedAt": "<dateTime>",
          "archived": "<boolean>",
          "archivedAt": "<dateTime>",
          "propertiesWithHistory": {
            "fugiat3": [
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              },
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              }
            ],
            "temporb_": [
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              },
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              }
            ]
          }
        },
        {
          "createdAt": "<dateTime>",
          "id": "<string>",
          "properties": {
            "id0ef": "<string>"
          },
          "updatedAt": "<dateTime>",
          "archived": "<boolean>",
          "archivedAt": "<dateTime>",
          "propertiesWithHistory": {
            "incididunte8": [
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              },
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              }
            ],
            "in_306": [
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              },
              {
                "sourceType": "<string>",
                "timestamp": "<dateTime>",
                "value": "<string>",
                "sourceId": "<string>",
                "sourceLabel": "<string>",
                "updatedByUserId": "<integer>"
              }
            ]
          }
        }
      ]
    }
  ],
  "startedAt": "<dateTime>",
  "status": "CANCELED",
  "requestedAt": "<dateTime>",
  "links": {
    "elit_c01": "<string>"
  }
}
```

---

