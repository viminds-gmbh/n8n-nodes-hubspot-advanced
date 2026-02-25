# Lists API

Total endpoints: 28

---

### Add and/or Remove Records from a List

**Method:** `PUT`

**URL:** `https://api.hubapi.com/crm/v3/lists/:listId/memberships/add-and-remove`

**Description:** Add and/or remove records that have already been created in the system to and/or from a list.

This endpoint only works for lists that have a `processingType` of `MANUAL` or `SNAPSHOT`.

**Authentication:** apikey

**Path Variables:**

- `listId`: No description

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "recordIdsToAdd": [
    "<long>",
    "<long>"
  ],
  "recordIdsToRemove": [
    "<long>",
    "<long>"
  ]
}
```

**Success Response (200):**

```json
{
  "recordIdsMissing": [
    "<long>",
    "<long>"
  ],
  "recordIdsRemoved": [
    "<long>",
    "<long>"
  ],
  "recordsIdsAdded": [
    "<long>",
    "<long>"
  ]
}
```

---

### Add Records to a List

**Method:** `PUT`

**URL:** `https://api.hubapi.com/crm/v3/lists/:listId/memberships/add`

**Description:** Add the records provided to the list. Records that do not exist or that are already members of the list are ignored.

This endpoint only works for lists that have a `processingType` of `MANUAL` or `SNAPSHOT`.

**Authentication:** apikey

**Path Variables:**

- `listId`: No description

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
[
  "<long>",
  "<long>"
]
```

**Success Response (200):**

```json
{
  "recordIdsMissing": [
    "<long>",
    "<long>"
  ],
  "recordIdsRemoved": [
    "<long>",
    "<long>"
  ],
  "recordsIdsAdded": [
    "<long>",
    "<long>"
  ]
}
```

---

### Add All Records from a Source List to a Destination List

**Method:** `PUT`

**URL:** `https://api.hubapi.com/crm/v3/lists/:listId/memberships/add-from/:sourceListId`

**Description:** Add all of the records from a *source list* (specified by the `sourceListId`) to a *destination list* (specified by the `listId`). Records that are already members of the *destination list* will be ignored. The *destination* and *source list* IDs must be different. The *destination* and *source lists* must contain records of the same type (e.g. contacts, companies, etc.).

This endpoint only works for *destination lists* that have a `processingType` of `MANUAL` or `SNAPSHOT`. The *source list* can have any `processingType`.

**Authentication:** apikey

**Path Variables:**

- `listId`: No description
- `sourceListId`: No description

**Headers:**


---

### Fetch List Memberships Ordered by ID

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/lists/:listId/memberships?after=<string>&before=<string>&limit=100`

**Description:** Fetch the memberships of a list in order sorted by the `recordId` of the records in the list.

The `recordId`s are sorted in *ascending* order if an `after` offset or no offset is provided. If only a `before` offset is provided, then the records are sorted in *descending* order.

The `after` offset parameter will take precedence over the `before` offset in a case where both are provided.

**Authentication:** apikey

**Path Variables:**

- `listId`: No description

**Query Parameters:**

- `after`: The paging offset token for the page that comes `after` the previously requested records.

If provided, then the records in the response will be the records following the offset, sorted in *ascending* order. Takes precedence over the `before` offset.
- `before`: The paging offset token for the page that comes `before` the previously requested records.

If provided, then the records in the response will be the records preceding the offset, sorted in *descending* order.
- `limit`: The number of records to return in the response. The maximum `limit` is 250.

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "membershipTimestamp": "<dateTime>",
      "recordId": "<string>"
    },
    {
      "membershipTimestamp": "<dateTime>",
      "recordId": "<string>"
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

### Delete All Records from a List

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/crm/v3/lists/:listId/memberships`

**Description:** Remove **all** of the records from a list. ***Note:*** *The list is not deleted.*

This endpoint only works for lists that have a `processingType` of `MANUAL` or `SNAPSHOT`.

**Authentication:** apikey

**Path Variables:**

- `listId`: No description

**Headers:**


---

### Remove Records from a List

**Method:** `PUT`

**URL:** `https://api.hubapi.com/crm/v3/lists/:listId/memberships/remove`

**Description:** Remove the records provided from the list. Records that do not exist or that are not members of the list are ignored.

This endpoint only works for lists that have a `processingType` of `MANUAL` or `SNAPSHOT`.

**Authentication:** apikey

**Path Variables:**

- `listId`: No description

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
[
  "<long>",
  "<long>"
]
```

**Success Response (200):**

```json
{
  "recordIdsMissing": [
    "<long>",
    "<long>"
  ],
  "recordIdsRemoved": [
    "<long>",
    "<long>"
  ],
  "recordsIdsAdded": [
    "<long>",
    "<long>"
  ]
}
```

---

### Search Lists

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/lists/search`

**Description:** Search lists by list name or page through all lists by providing an empty `query` value.

**Authentication:** apikey

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "additionalProperties": [
    "<string>",
    "<string>"
  ],
  "offset": "<integer>",
  "query": "<string>",
  "count": "<integer>",
  "listIds": [
    "<string>",
    "<string>"
  ],
  "processingTypes": [
    "<string>",
    "<string>"
  ]
}
```

**Success Response (200):**

```json
{
  "hasMore": "<boolean>",
  "lists": [
    {
      "additionalProperties": {
        "occaecat_093": "<string>"
      },
      "listId": "<integer>",
      "listVersion": "<integer>",
      "name": "<string>",
      "objectTypeId": "<string>",
      "processingStatus": "<string>",
      "processingType": "<string>",
      "updatedById": "<integer>",
      "filtersUpdatedAt": "<dateTime>",
      "createdAt": "<dateTime>",
      "deletedAt": "<dateTime>",
      "createdById": "<integer>",
      "updatedAt": "<dateTime>"
    },
    {
      "additionalProperties": {
        "officia4": "<string>"
      },
      "listId": "<integer>",
      "listVersion": "<integer>",
      "name": "<string>",
      "objectTypeId": "<string>",
      "processingStatus": "<string>",
      "processingType": "<string>",
      "updatedById": "<integer>",
      "filtersUpdatedAt": "<dateTime>",
      "createdAt": "<dateTime>",
      "deletedAt": "<dateTime>",
      "createdById": "<integer>",
      "updatedAt": "<dateTime>"
    }
  ],
  "offset": "<integer>",
  "total": "<integer>"
}
```

---

### Update List Name

**Method:** `PUT`

**URL:** `https://api.hubapi.com/crm/v3/lists/:listId/update-list-name?listName=<string>&includeFilters=false`

**Description:** Update the name of a list. The name must be globally unique relative to all other public lists in the portal.

**Authentication:** apikey

**Path Variables:**

- `listId`: No description

**Query Parameters:**

- `listName`: The name to update the list to.
- `includeFilters`: A flag indicating whether or not the response object list definition should include a filter branch definition. By default, object list definitions will not have their filter branch definitions included in the response.

**Headers:**


**Success Response (200):**

```json
{
  "updatedList": {
    "listId": "<integer>",
    "listVersion": "<integer>",
    "name": "<string>",
    "objectTypeId": "<string>",
    "processingStatus": "<string>",
    "processingType": "<string>",
    "createdAt": "<dateTime>",
    "updatedAt": "<dateTime>",
    "filtersUpdatedAt": "<dateTime>",
    "deletedAt": "<dateTime>",
    "createdById": "<integer>",
    "updatedById": "<integer>",
    "filterBranch": {
      "filterBranchOperator": "<string>",
      "filterBranchType": "OR",
      "filterBranches": [
        {
          "value": "<Circular reference to #/components/schemas/PublicOrFilterBranch detected>"
        },
        {
          "value": "<Circular reference to #/components/schemas/PublicOrFilterBranch detected>"
        }
      ],
      "filters": [
        {
          "filterType": "PROPERTY",
          "operation": {
            "includeObjectsWithNoValueSet": "<boolean>",
            "operationType": "BOOL",
            "operator": "<string>",
            "value": "<boolean>"
          },
          "property": "<string>"
        },
        {
          "filterType": "PROPERTY",
          "operation": {
            "includeObjectsWithNoValueSet": "<boolean>",
            "operationType": "BOOL",
            "operator": "<string>",
            "value": "<boolean>"
          },
          "property": "<string>"
        }
      ]
    }
  }
}
```

---

### Fetch List by ID

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/lists/:listId?includeFilters=false`

**Description:** Fetch a single list by **ILS list ID**.

**Authentication:** apikey

**Path Variables:**

- `listId`: No description

**Query Parameters:**

- `includeFilters`: A flag indicating whether or not the response object list definition should include a filter branch definition. By default, object list definitions will not have their filter branch definitions included in the response.

**Headers:**


**Success Response (200):**

```json
{
  "list": {
    "listId": "<integer>",
    "listVersion": "<integer>",
    "name": "<string>",
    "objectTypeId": "<string>",
    "processingStatus": "<string>",
    "processingType": "<string>",
    "createdAt": "<dateTime>",
    "updatedAt": "<dateTime>",
    "filtersUpdatedAt": "<dateTime>",
    "deletedAt": "<dateTime>",
    "createdById": "<integer>",
    "updatedById": "<integer>",
    "filterBranch": {
      "filterBranchOperator": "<string>",
      "filterBranchType": "OR",
      "filterBranches": [
        {
          "value": "<Circular reference to #/components/schemas/PublicOrFilterBranch detected>"
        },
        {
          "value": "<Circular reference to #/components/schemas/PublicOrFilterBranch detected>"
        }
      ],
      "filters": [
        {
          "filterType": "PROPERTY",
          "operation": {
            "includeObjectsWithNoValueSet": "<boolean>",
            "operationType": "BOOL",
            "operator": "<string>",
            "value": "<boolean>"
          },
          "property": "<string>"
        },
        {
          "filterType": "PROPERTY",
          "operation": {
            "includeObjectsWithNoValueSet": "<boolean>",
            "operationType": "BOOL",
            "operator": "<string>",
            "value": "<boolean>"
          },
          "property": "<string>"
        }
      ]
    }
  }
}
```

---

### Delete a List

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/crm/v3/lists/:listId`

**Description:** Delete a list by **ILS list ID**. Lists deleted through this endpoint can be restored up to 90-days following the delete. After 90-days, the list is purged and can no longer be restored.

**Authentication:** apikey

**Path Variables:**

- `listId`: No description

**Headers:**


---

### Update List Filter Definition

**Method:** `PUT`

**URL:** `https://api.hubapi.com/crm/v3/lists/:listId/update-list-filters?enrollObjectsInWorkflows=false`

**Description:** Update the filter branch definition of a `DYNAMIC` list. Once updated, the list memberships will be re-evaluated and updated to match the new definition.

**Authentication:** apikey

**Path Variables:**

- `listId`: No description

**Query Parameters:**

- `enrollObjectsInWorkflows`: A flag indicating whether or not the memberships added to the list as a result of the filter change should be enrolled in workflows that are relevant to this list.

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "filterBranch": {
    "filterBranchOperator": "<string>",
    "filterBranchType": "OR",
    "filterBranches": [
      {
        "value": "<Circular reference to #/components/schemas/PublicOrFilterBranch detected>"
      },
      {
        "value": "<Circular reference to #/components/schemas/PublicOrFilterBranch detected>"
      }
    ],
    "filters": [
      {
        "filterType": "PROPERTY",
        "operation": {
          "includeObjectsWithNoValueSet": "<boolean>",
          "operationType": "BOOL",
          "operator": "<string>",
          "value": "<boolean>"
        },
        "property": "<string>"
      },
      {
        "filterType": "PROPERTY",
        "operation": {
          "includeObjectsWithNoValueSet": "<boolean>",
          "operationType": "BOOL",
          "operator": "<string>",
          "value": "<boolean>"
        },
        "property": "<string>"
      }
    ]
  }
}
```

**Success Response (200):**

```json
{
  "updatedList": {
    "listId": "<integer>",
    "listVersion": "<integer>",
    "name": "<string>",
    "objectTypeId": "<string>",
    "processingStatus": "<string>",
    "processingType": "<string>",
    "createdAt": "<dateTime>",
    "updatedAt": "<dateTime>",
    "filtersUpdatedAt": "<dateTime>",
    "deletedAt": "<dateTime>",
    "createdById": "<integer>",
    "updatedById": "<integer>",
    "filterBranch": {
      "filterBranchOperator": "<string>",
      "filterBranchType": "OR",
      "filterBranches": [
        {
          "value": "<Circular reference to #/components/schemas/PublicOrFilterBranch detected>"
        },
        {
          "value": "<Circular reference to #/components/schemas/PublicOrFilterBranch detected>"
        }
      ],
      "filters": [
        {
          "filterType": "PROPERTY",
          "operation": {
            "includeObjectsWithNoValueSet": "<boolean>",
            "operationType": "BOOL",
            "operator": "<string>",
            "value": "<boolean>"
          },
          "property": "<string>"
        },
        {
          "filterType": "PROPERTY",
          "operation": {
            "includeObjectsWithNoValueSet": "<boolean>",
            "operationType": "BOOL",
            "operator": "<string>",
            "value": "<boolean>"
          },
          "property": "<string>"
        }
      ]
    }
  }
}
```

---

### Fetch List by Name

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/lists/object-type-id/:objectTypeId/name/:listName?includeFilters=false`

**Description:** Fetch a single list by list name and object type.

**Authentication:** apikey

**Path Variables:**

- `objectTypeId`: No description
- `listName`: No description

**Query Parameters:**

- `includeFilters`: A flag indicating whether or not the response object list definition should include a filter branch definition. By default, object list definitions will not have their filter branch definitions included in the response.

**Headers:**


**Success Response (200):**

```json
{
  "list": {
    "listId": "<integer>",
    "listVersion": "<integer>",
    "name": "<string>",
    "objectTypeId": "<string>",
    "processingStatus": "<string>",
    "processingType": "<string>",
    "createdAt": "<dateTime>",
    "updatedAt": "<dateTime>",
    "filtersUpdatedAt": "<dateTime>",
    "deletedAt": "<dateTime>",
    "createdById": "<integer>",
    "updatedById": "<integer>",
    "filterBranch": {
      "filterBranchOperator": "<string>",
      "filterBranchType": "OR",
      "filterBranches": [
        {
          "value": "<Circular reference to #/components/schemas/PublicOrFilterBranch detected>"
        },
        {
          "value": "<Circular reference to #/components/schemas/PublicOrFilterBranch detected>"
        }
      ],
      "filters": [
        {
          "filterType": "PROPERTY",
          "operation": {
            "includeObjectsWithNoValueSet": "<boolean>",
            "operationType": "BOOL",
            "operator": "<string>",
            "value": "<boolean>"
          },
          "property": "<string>"
        },
        {
          "filterType": "PROPERTY",
          "operation": {
            "includeObjectsWithNoValueSet": "<boolean>",
            "operationType": "BOOL",
            "operator": "<string>",
            "value": "<boolean>"
          },
          "property": "<string>"
        }
      ]
    }
  }
}
```

---

### Fetch Multiple Lists

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/lists/?listIds=<integer>&listIds=<integer>&includeFilters=false`

**Description:** Fetch multiple lists in a single request by **ILS list ID**. The response will include the definitions of all lists that exist for the `listIds` provided.

**Authentication:** apikey

**Query Parameters:**

- `listIds`: The **ILS IDs** of the lists to fetch.
- `listIds`: The **ILS IDs** of the lists to fetch.
- `includeFilters`: A flag indicating whether or not the response object list definitions should include a filter branch definition. By default, object list definitions will not have their filter branch definitions included in the response.

**Headers:**


**Success Response (200):**

```json
{
  "lists": [
    {
      "listId": "<integer>",
      "listVersion": "<integer>",
      "name": "<string>",
      "objectTypeId": "<string>",
      "processingStatus": "<string>",
      "processingType": "<string>",
      "createdAt": "<dateTime>",
      "updatedAt": "<dateTime>",
      "filtersUpdatedAt": "<dateTime>",
      "deletedAt": "<dateTime>",
      "createdById": "<integer>",
      "updatedById": "<integer>",
      "filterBranch": {
        "filterBranchOperator": "<string>",
        "filterBranchType": "OR",
        "filterBranches": [
          {
            "value": "<Circular reference to #/components/schemas/PublicOrFilterBranch detected>"
          },
          {
            "value": "<Circular reference to #/components/schemas/PublicOrFilterBranch detected>"
          }
        ],
        "filters": [
          {
            "filterType": "PROPERTY",
            "operation": {
              "includeObjectsWithNoValueSet": "<boolean>",
              "operationType": "BOOL",
              "operator": "<string>",
              "value": "<boolean>"
            },
            "property": "<string>"
          },
          {
            "filterType": "PROPERTY",
            "operation": {
              "includeObjectsWithNoValueSet": "<boolean>",
              "operationType": "BOOL",
              "operator": "<string>",
              "value": "<boolean>"
            },
            "property": "<string>"
          }
        ]
      }
    },
    {
      "listId": "<integer>",
      "listVersion": "<integer>",
      "name": "<string>",
      "objectTypeId": "<string>",
      "processingStatus": "<string>",
      "processingType": "<string>",
      "createdAt": "<dateTime>",
      "updatedAt": "<dateTime>",
      "filtersUpdatedAt": "<dateTime>",
      "deletedAt": "<dateTime>",
      "createdById": "<integer>",
      "updatedById": "<integer>",
      "filterBranch": {
        "filterBranchOperator": "<string>",
        "filterBranchType": "OR",
        "filterBranches": [
          {
            "value": "<Circular reference to #/components/schemas/PublicOrFilterBranch detected>"
          },
          {
            "value": "<Circular reference to #/components/schemas/PublicOrFilterBranch detected>"
          }
        ],
        "filters": [
          {
            "filterType": "PROPERTY",
            "operation": {
              "includeObjectsWithNoValueSet": "<boolean>",
              "operationType": "BOOL",
              "operator": "<string>",
              "value": "<boolean>"
            },
            "property": "<string>"
          },
          {
            "filterType": "PROPERTY",
            "operation": {
              "includeObjectsWithNoValueSet": "<boolean>",
              "operationType": "BOOL",
              "operator": "<string>",
              "value": "<boolean>"
            },
            "property": "<string>"
          }
        ]
      }
    }
  ]
}
```

---

### Create List

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/lists/`

**Description:** Create a new list with the provided object list definition.

**Authentication:** oauth2

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "name": "<string>",
  "objectTypeId": "<string>",
  "processingType": "<string>",
  "filterBranch": {
    "filterBranchOperator": "<string>",
    "filterBranchType": "OR",
    "filterBranches": [
      {
        "value": "<Circular reference to #/components/schemas/PublicOrFilterBranch detected>"
      },
      {
        "value": "<Circular reference to #/components/schemas/PublicOrFilterBranch detected>"
      }
    ],
    "filters": [
      {
        "filterType": "PROPERTY",
        "operation": {
          "includeObjectsWithNoValueSet": "<boolean>",
          "operationType": "BOOL",
          "operator": "<string>",
          "value": "<boolean>"
        },
        "property": "<string>"
      },
      {
        "filterType": "PROPERTY",
        "operation": {
          "includeObjectsWithNoValueSet": "<boolean>",
          "operationType": "BOOL",
          "operator": "<string>",
          "value": "<boolean>"
        },
        "property": "<string>"
      }
    ]
  },
  "listFolderId": "<integer>"
}
```

**Success Response (200):**

```json
{
  "list": {
    "listId": "<integer>",
    "listVersion": "<integer>",
    "name": "<string>",
    "objectTypeId": "<string>",
    "processingStatus": "<string>",
    "processingType": "<string>",
    "createdAt": "<dateTime>",
    "updatedAt": "<dateTime>",
    "filtersUpdatedAt": "<dateTime>",
    "deletedAt": "<dateTime>",
    "createdById": "<integer>",
    "updatedById": "<integer>",
    "filterBranch": {
      "filterBranchOperator": "<string>",
      "filterBranchType": "OR",
      "filterBranches": [
        {
          "value": "<Circular reference to #/components/schemas/PublicOrFilterBranch detected>"
        },
        {
          "value": "<Circular reference to #/components/schemas/PublicOrFilterBranch detected>"
        }
      ],
      "filters": [
        {
          "filterType": "PROPERTY",
          "operation": {
            "includeObjectsWithNoValueSet": "<boolean>",
            "operationType": "BOOL",
            "operator": "<string>",
            "value": "<boolean>"
          },
          "property": "<string>"
        },
        {
          "filterType": "PROPERTY",
          "operation": {
            "includeObjectsWithNoValueSet": "<boolean>",
            "operationType": "BOOL",
            "operator": "<string>",
            "value": "<boolean>"
          },
          "property": "<string>"
        }
      ]
    }
  }
}
```

---

### Restore a List

**Method:** `PUT`

**URL:** `https://api.hubapi.com/crm/v3/lists/:listId/restore`

**Description:** Restore a previously deleted list by **ILS list ID**. Deleted lists are eligible to be restored up-to 90-days after the list has been deleted.

**Authentication:** apikey

**Path Variables:**

- `listId`: No description

**Headers:**


---

### Moves a list to a given folder

**Method:** `PUT`

**URL:** `https://api.hubapi.com/crm/v3/lists/folders/move-list`

**Description:** Given a list and a folder, the list will be moved to that folder.

**Authentication:** apikey

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "listId": "<string>",
  "newFolderId": "<string>"
}
```

---

### Moves a folder

**Method:** `PUT`

**URL:** `https://api.hubapi.com/crm/v3/lists/folders/:folderId/move/:newParentFolderId`

**Description:** This moves the folder from its current location to a new location. It updates the parent of this folder to the new Id given.

**Authentication:** apikey

**Path Variables:**

- `folderId`: (Required) 
- `newParentFolderId`: (Required) 

**Headers:**


**Success Response (200):**

```json
{
  "folder": {
    "childLists": [
      "<integer>",
      "<integer>"
    ],
    "childNodes": [
      {
        "value": "<Circular reference to #/components/schemas/PublicListFolder detected>"
      },
      {
        "value": "<Circular reference to #/components/schemas/PublicListFolder detected>"
      }
    ],
    "id": "<integer>",
    "parentFolderId": "<integer>",
    "createdAt": "<dateTime>",
    "name": "<string>",
    "updatedContentsAt": "<dateTime>",
    "userId": "<integer>",
    "updatedAt": "<dateTime>"
  }
}
```

---

### Rename a folder

**Method:** `PUT`

**URL:** `https://api.hubapi.com/crm/v3/lists/folders/:folderId/rename?newFolderName=<string>`

**Description:** Renames the given folderId with a new name.

**Authentication:** apikey

**Path Variables:**

- `folderId`: (Required) 

**Query Parameters:**

- `newFolderName`: No description

**Headers:**


**Success Response (200):**

```json
{
  "folder": {
    "childLists": [
      "<integer>",
      "<integer>"
    ],
    "childNodes": [
      {
        "value": "<Circular reference to #/components/schemas/PublicListFolder detected>"
      },
      {
        "value": "<Circular reference to #/components/schemas/PublicListFolder detected>"
      }
    ],
    "id": "<integer>",
    "parentFolderId": "<integer>",
    "createdAt": "<dateTime>",
    "name": "<string>",
    "updatedContentsAt": "<dateTime>",
    "userId": "<integer>",
    "updatedAt": "<dateTime>"
  }
}
```

---

### Get lists record is member of

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/lists/records/:objectTypeId/:recordId/memberships`

**Description:** For given record provide lists this record is member of.

**Authentication:** apikey

**Path Variables:**

- `objectTypeId`: (Required) Object type id of the record
- `recordId`: (Required) Id of the record

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "firstAddedTimestamp": "<dateTime>",
      "lastAddedTimestamp": "<dateTime>",
      "listId": "<string>",
      "listVersion": "<integer>"
    },
    {
      "firstAddedTimestamp": "<dateTime>",
      "lastAddedTimestamp": "<dateTime>",
      "listId": "<string>",
      "listVersion": "<integer>"
    }
  ],
  "total": "<long>"
}
```

---

### Retrieves a folder.

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/lists/folders?folderId=0`

**Description:** Retrieves a folder and recursively includes all folders via the childNodes attribute.  The child lists field will be empty in all child nodes. Only the folder retrieved will include the child lists in that folder.

**Authentication:** apikey

**Query Parameters:**

- `folderId`: The Id of the folder to retrieve.

**Headers:**


**Success Response (200):**

```json
{
  "folder": {
    "childLists": [
      "<integer>",
      "<integer>"
    ],
    "childNodes": [
      {
        "value": "<Circular reference to #/components/schemas/PublicListFolder detected>"
      },
      {
        "value": "<Circular reference to #/components/schemas/PublicListFolder detected>"
      }
    ],
    "id": "<integer>",
    "parentFolderId": "<integer>",
    "createdAt": "<dateTime>",
    "name": "<string>",
    "updatedContentsAt": "<dateTime>",
    "userId": "<integer>",
    "updatedAt": "<dateTime>"
  }
}
```

---

### Creates a folder

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/lists/folders`

**Description:** Creates a folder with the given information.

**Authentication:** apikey

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "name": "<string>",
  "parentFolderId": "<string>"
}
```

**Success Response (200):**

```json
{
  "folder": {
    "childLists": [
      "<integer>",
      "<integer>"
    ],
    "childNodes": [
      {
        "value": "<Circular reference to #/components/schemas/PublicListFolder detected>"
      },
      {
        "value": "<Circular reference to #/components/schemas/PublicListFolder detected>"
      }
    ],
    "id": "<integer>",
    "parentFolderId": "<integer>",
    "createdAt": "<dateTime>",
    "name": "<string>",
    "updatedContentsAt": "<dateTime>",
    "userId": "<integer>",
    "updatedAt": "<dateTime>"
  }
}
```

---

### Deletes a folder

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/crm/v3/lists/folders/:folderId`

**Description:** Deletes the folder with the given Id.

**Authentication:** apikey

**Path Variables:**

- `folderId`: (Required) 

**Headers:**


---

### Retrieve the conversion details for a list

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/lists/:listId/schedule-conversion`

**Description:** Retrieve the conversion details for a list. This can be used to check for an upcoming conversion, or to get the details of when a list was already converted.

**Authentication:** apikey

**Path Variables:**

- `listId`: (Required) The ID of the list to schedule the conversion for.

**Headers:**


**Success Response (200):**

```json
{
  "listId": "<string>",
  "requestedConversionTime": {
    "conversionType": "CONVERSION_DATE",
    "day": "<integer>",
    "month": "<integer>",
    "year": "<integer>"
  },
  "convertedAt": "<dateTime>"
}
```

---

### Schedule or update the conversion of a list to static

**Method:** `PUT`

**URL:** `https://api.hubapi.com/crm/v3/lists/:listId/schedule-conversion`

**Description:** Schedule the conversion of an active list into a static list, or update the already scheduled conversion. This can be scheduled for a specific date or based on activity.

**Authentication:** apikey

**Path Variables:**

- `listId`: (Required) The ID of the list to schedule the conversion for.

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "conversionType": "CONVERSION_DATE",
  "day": "<integer>",
  "month": "<integer>",
  "year": "<integer>"
}
```

**Success Response (200):**

```json
{
  "listId": "<string>",
  "requestedConversionTime": {
    "conversionType": "CONVERSION_DATE",
    "day": "<integer>",
    "month": "<integer>",
    "year": "<integer>"
  },
  "convertedAt": "<dateTime>"
}
```

---

### Cancel the conversion of a list

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/crm/v3/lists/:listId/schedule-conversion`

**Description:** Delete an existing scheduled conversion for a list.

**Authentication:** apikey

**Path Variables:**

- `listId`: (Required) The ID of the list that you want to cancel the conversion for.

**Headers:**


---

### Translate Legacy List Id to Modern List Id

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/lists/idmapping?legacyListId=<string>`

**Description:** This API allows translation of legacy list id to list id. This is a temporary API allowed for mapping old id's to new id's and will expire on May 30th, 2025.

**Authentication:** apikey

**Query Parameters:**

- `legacyListId`: The legacy list id from lists v1 API.

**Headers:**


**Success Response (200):**

```json
{
  "legacyListId": "<string>",
  "listId": "<string>"
}
```

---

### Translate Legacy List Id to Modern List Id in Batch

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/lists/idmapping`

**Description:** This API allows translation of a batch of legacy list id's to list id's. This allows for a maximum of 10,000 id's. This is a temporary API allowed for mapping old id's to new id's and will expire on May 30th, 2025.

**Authentication:** apikey

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
[
  "<string>",
  "<string>"
]
```

**Success Response (200):**

```json
{
  "legacyListIdsToIdsMapping": [
    {
      "legacyListId": "<string>",
      "listId": "<string>"
    },
    {
      "legacyListId": "<string>",
      "listId": "<string>"
    }
  ],
  "missingLegacyListIds": [
    "<string>",
    "<string>"
  ]
}
```

---

### Fetch List Memberships Ordered by Added to List Date

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/lists/:listId/memberships/join-order?after=<string>&before=<string>&limit=100`

**Description:** Fetch the memberships of a list in order sorted by the time the records were added to the list.

The `recordId`s are sorted in *ascending* order if an `after` offset or no offset is provided. If only a `before` offset is provided, then the records are sorted in *descending* order.

The `after` offset parameter will take precedence over the `before` offset in a case where both are provided.

**Authentication:** apikey

**Path Variables:**

- `listId`: (Required) The **ILS ID** of the list.

**Query Parameters:**

- `after`: The paging offset token for the page that comes `after` the previously requested records.

If provided, then the records in the response will be the records following the offset, sorted in *ascending* order. Takes precedence over the `before` offset.
- `before`: The paging offset token for the page that comes `before` the previously requested records.

If provided, then the records in the response will be the records preceding the offset, sorted in *descending* order.
- `limit`: The number of records to return in the response. The maximum `limit` is 250.

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "membershipTimestamp": "1951-01-17T19:19:12.100Z",
      "recordId": "string"
    },
    {
      "membershipTimestamp": "1999-06-06T19:42:42.012Z",
      "recordId": "string"
    }
  ],
  "total": 9331,
  "paging": {
    "next": {
      "after": "string",
      "link": "string"
    },
    "prev": {
      "before": "string",
      "link": "string"
    }
  }
}
```

---

