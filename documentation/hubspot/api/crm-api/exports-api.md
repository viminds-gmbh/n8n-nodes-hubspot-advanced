# Exports API

Total endpoints: 3

---

### Get the status of the export including the URL to download the file

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/exports/export/async/tasks/:taskId/status`

**Authentication:** apikey

**Path Variables:**

- `taskId`: No description

**Headers:**


**Success Response (200):**

```json
{
  "completedAt": "<dateTime>",
  "startedAt": "<dateTime>",
  "status": "CANCELED",
  "result": "<string>",
  "numErrors": "<integer>",
  "errors": [
    {
      "category": "<string>",
      "context": {
        "proident__c": [
          "<string>",
          "<string>"
        ],
        "occaecat_94": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "in": "<string>",
          "code": "<string>",
          "subCategory": "<string>",
          "context": {
            "in_8": [
              "<string>",
              "<string>"
            ],
            "Ut3_d": [
              "<string>",
              "<string>"
            ]
          }
        },
        {
          "message": "<string>",
          "in": "<string>",
          "code": "<string>",
          "subCategory": "<string>",
          "context": {
            "in_3a": [
              "<string>",
              "<string>"
            ]
          }
        }
      ],
      "links": {
        "in_180": "<string>",
        "magna_55": "<string>",
        "mollit9": "<string>",
        "tempor_f5": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "id": "<string>",
      "subCategory": {}
    },
    {
      "category": "<string>",
      "context": {
        "mollit_46": [
          "<string>",
          "<string>"
        ],
        "in_ba": [
          "<string>",
          "<string>"
        ],
        "euc2": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "in": "<string>",
          "code": "<string>",
          "subCategory": "<string>",
          "context": {
            "consecteturb6a": [
              "<string>",
              "<string>"
            ],
            "voluptate_1d5": [
              "<string>",
              "<string>"
            ]
          }
        },
        {
          "message": "<string>",
          "in": "<string>",
          "code": "<string>",
          "subCategory": "<string>",
          "context": {
            "sed_d": [
              "<string>",
              "<string>"
            ],
            "consectetur_59": [
              "<string>",
              "<string>"
            ],
            "in5e": [
              "<string>",
              "<string>"
            ]
          }
        }
      ],
      "links": {
        "qui_a": "<string>",
        "aute_c": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "id": "<string>",
      "subCategory": {}
    }
  ],
  "requestedAt": "<dateTime>",
  "links": {
    "cupidatatc": "<string>",
    "enimb01": "<string>"
  }
}
```

---

### Start an export

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/exports/export/async`

**Description:** Begins exporting CRM data for the portal as specified in the request body

**Authentication:** apikey

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "exportName": "<string>",
  "exportType": "VIEW",
  "format": "CSV",
  "language": "ES",
  "objectProperties": [
    "<string>",
    "<string>"
  ],
  "objectType": "<string>",
  "associatedObjectType": [
    "<string>",
    "<string>"
  ],
  "publicCrmSearchRequest": {
    "filters": [
      {
        "operator": "GT",
        "propertyName": "<string>",
        "value": "<string>",
        "highValue": "<string>",
        "values": [
          "<string>",
          "<string>"
        ]
      },
      {
        "operator": "GTE",
        "propertyName": "<string>",
        "value": "<string>",
        "highValue": "<string>",
        "values": [
          "<string>",
          "<string>"
        ]
      }
    ],
    "query": "<string>",
    "sorts": [
      "<string>",
      "<string>"
    ],
    "filterGroups": [
      {
        "filters": [
          {
            "operator": "CONTAINS_TOKEN",
            "propertyName": "<string>",
            "highValue": "<string>",
            "value": "<string>",
            "values": [
              "<string>",
              "<string>"
            ]
          },
          {
            "operator": "IN",
            "propertyName": "<string>",
            "highValue": "<string>",
            "value": "<string>",
            "values": [
              "<string>",
              "<string>"
            ]
          }
        ]
      },
      {
        "filters": [
          {
            "operator": "IN",
            "propertyName": "<string>",
            "highValue": "<string>",
            "value": "<string>",
            "values": [
              "<string>",
              "<string>"
            ]
          },
          {
            "operator": "NOT_IN",
            "propertyName": "<string>",
            "highValue": "<string>",
            "value": "<string>",
            "values": [
              "<string>",
              "<string>"
            ]
          }
        ]
      }
    ]
  },
  "exportInternalValuesOptions": [
    "VALUES",
    "NAMES"
  ],
  "overrideAssociatedObjectsPerDefinitionPerRowLimit": "<boolean>",
  "includeLabeledAssociations": "<boolean>",
  "includePrimaryDisplayPropertyForAssociatedObjects": "<boolean>"
}
```

**Success Response (202):**

```json
{
  "id": "<string>",
  "links": {
    "eiusmoda": "<string>",
    "officia_55": "<string>"
  }
}
```

---

### Retrieve details of a specific export by its unique ID.

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/exports/export/:exportId`

**Description:** Retrieve detailed information about a specific CRM export, including its current state and properties.

**Authentication:** oauth2

**Path Variables:**

- `exportId`: (Required) The unique ID of the export to retrieve.

**Headers:**


**Success Response (200):**

```json
{
  "createdAt": "<dateTime>",
  "exportState": "FAILED",
  "exportType": "LIST",
  "id": "<string>",
  "objectProperties": [
    "<string>",
    "<string>"
  ],
  "objectType": "<string>",
  "updatedAt": "<dateTime>",
  "exportName": "<string>",
  "recordCount": "<integer>"
}
```

---

