# Imports API

Total endpoints: 5

---

### Get the information on any import

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/imports/:importId`

**Description:** A complete summary of an import record, including any updates.

**Authentication:** oauth2

**Path Variables:**

- `importId`: No description

**Headers:**


**Success Response (200):**

```json
{
  "createdAt": "<dateTime>",
  "id": "<string>",
  "metadata": {
    "counters": {
      "elit5_8": "<integer>",
      "officia_5": "<integer>",
      "fugiat_1": "<integer>"
    },
    "fileIds": [
      "<string>",
      "<string>"
    ],
    "objectLists": [
      {
        "listId": "<string>",
        "objectType": "<string>"
      },
      {
        "listId": "<string>",
        "objectType": "<string>"
      }
    ]
  },
  "optOutImport": "<boolean>",
  "state": "CANCELED",
  "updatedAt": "<dateTime>",
  "importTemplate": {
    "templateId": "<integer>",
    "templateType": "admin_defined"
  },
  "importRequestJson": {},
  "importSource": "MOBILE_IOS",
  "importName": "<string>",
  "mappedObjectTypeIds": [
    "<string>",
    "<string>"
  ]
}
```

---

### Cancel an active import

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/imports/:importId/cancel`

**Description:** This allows a developer to cancel an active import.

**Authentication:** oauth2

**Path Variables:**

- `importId`: No description

**Headers:**


**Success Response (200):**

```json
{
  "completedAt": "<dateTime>",
  "startedAt": "<dateTime>",
  "status": "COMPLETE",
  "requestedAt": "<dateTime>",
  "links": {
    "veniam___e": "<string>",
    "Excepteur_0": "<string>",
    "Duis9": "<string>"
  }
}
```

---

### Get active imports

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/imports/?after=<string>&before=<string>&limit=<integer>`

**Description:** Returns a paged list of active imports for this account.

**Authentication:** oauth2

**Query Parameters:**

- `after`: The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
- `before`: No description
- `limit`: The maximum number of results to display per page.

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "createdAt": "<dateTime>",
      "id": "<string>",
      "metadata": {
        "counters": {
          "adipisicing_72f": "<integer>",
          "cupidatat_70": "<integer>"
        },
        "fileIds": [
          "<string>",
          "<string>"
        ],
        "objectLists": [
          {
            "listId": "<string>",
            "objectType": "<string>"
          },
          {
            "listId": "<string>",
            "objectType": "<string>"
          }
        ]
      },
      "optOutImport": "<boolean>",
      "state": "CANCELED",
      "updatedAt": "<dateTime>",
      "importTemplate": {
        "templateId": "<integer>",
        "templateType": "user_file"
      },
      "importRequestJson": {},
      "importSource": "MOBILE_IOS",
      "importName": "<string>",
      "mappedObjectTypeIds": [
        "<string>",
        "<string>"
      ]
    },
    {
      "createdAt": "<dateTime>",
      "id": "<string>",
      "metadata": {
        "counters": {
          "veniamcc": "<integer>"
        },
        "fileIds": [
          "<string>",
          "<string>"
        ],
        "objectLists": [
          {
            "listId": "<string>",
            "objectType": "<string>"
          },
          {
            "listId": "<string>",
            "objectType": "<string>"
          }
        ]
      },
      "optOutImport": "<boolean>",
      "state": "DEFERRED",
      "updatedAt": "<dateTime>",
      "importTemplate": {
        "templateId": "<integer>",
        "templateType": "previous_import"
      },
      "importRequestJson": {},
      "importSource": "MOBILE_ANDROID",
      "importName": "<string>",
      "mappedObjectTypeIds": [
        "<string>",
        "<string>"
      ]
    }
  ],
  "paging": {
    "next": {
      "after": "<string>",
      "link": "<string>"
    },
    "prev": {
      "before": "<string>",
      "link": "<string>"
    }
  }
}
```

---

### Start a new import

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/imports/`

**Description:** Begins importing data from the specified file resources. This uploads the corresponding file and uses the import request object to convert rows in the files to objects.

**Authentication:** oauth2

**Headers:**

- `Content-Type`: multipart/form-data

**Success Response (200):**

```json
{
  "createdAt": "<dateTime>",
  "id": "<string>",
  "metadata": {
    "counters": {
      "elit5_8": "<integer>",
      "officia_5": "<integer>",
      "fugiat_1": "<integer>"
    },
    "fileIds": [
      "<string>",
      "<string>"
    ],
    "objectLists": [
      {
        "listId": "<string>",
        "objectType": "<string>"
      },
      {
        "listId": "<string>",
        "objectType": "<string>"
      }
    ]
  },
  "optOutImport": "<boolean>",
  "state": "CANCELED",
  "updatedAt": "<dateTime>",
  "importTemplate": {
    "templateId": "<integer>",
    "templateType": "admin_defined"
  },
  "importRequestJson": {},
  "importSource": "MOBILE_IOS",
  "importName": "<string>",
  "mappedObjectTypeIds": [
    "<string>",
    "<string>"
  ]
}
```

---

### Retrieve errors for a specific import

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/imports/:importId/errors?after=<string>&limit=<integer>&includeErrorMessage=<boolean>&includeRowData=<boolean>`

**Authentication:** oauth2

**Path Variables:**

- `importId`: No description

**Query Parameters:**

- `after`: The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
- `limit`: The maximum number of results to display per page.
- `includeErrorMessage`: Set to True to receive a message explaining the error.
- `includeRowData`: Set to True to receive the data values for the errored row.

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "createdAt": "<integer>",
      "errorType": "MISSING_EVENT_DEFINITION",
      "id": "<string>",
      "sourceData": {
        "fileId": "<integer>",
        "lineNumber": "<integer>",
        "rowData": [
          "<string>",
          "<string>"
        ],
        "pageName": "<string>",
        "containsEncryptedProperties": "<boolean>"
      },
      "objectType": "MARKETING_EVENT",
      "invalidValue": "<string>",
      "extraContext": "<string>",
      "objectTypeId": "<string>",
      "knownColumnNumber": "<integer>"
    },
    {
      "createdAt": "<integer>",
      "errorType": "CREATE_ONLY_IMPORT",
      "id": "<string>",
      "sourceData": {
        "fileId": "<integer>",
        "lineNumber": "<integer>",
        "rowData": [
          "<string>",
          "<string>"
        ],
        "pageName": "<string>",
        "containsEncryptedProperties": "<boolean>"
      },
      "objectType": "PUBLISHING_TASK",
      "invalidValue": "<string>",
      "extraContext": "<string>",
      "objectTypeId": "<string>",
      "knownColumnNumber": "<integer>"
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

