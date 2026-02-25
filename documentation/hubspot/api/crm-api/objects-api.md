# Objects API

Total endpoints: 11

---

### Read a batch of objects by internal ID, or unique property values

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/:objectType/batch/read?archived=false`

**Authentication:** oauth2

**Path Variables:**

- `objectType`: No description

**Query Parameters:**

- `archived`: Whether to return only results that have been archived.

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
  ],
  "properties": [
    "<string>",
    "<string>"
  ],
  "propertiesWithHistory": [
    "<string>",
    "<string>"
  ],
  "idProperty": "<string>"
}
```

**Success Response (200):**

```json
{
  "completedAt": "<dateTime>",
  "results": [
    {
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "velit1": "<string>",
        "enim_1": "<string>",
        "tempor48": "<string>",
        "esse_f99": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "in81c": [
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
      },
      "archived": "<boolean>",
      "archivedAt": "<dateTime>"
    },
    {
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "aute3": "<string>",
        "Duis918": "<string>",
        "ut_1": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "ut5": [
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
        "adipisicing_c3": [
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
      },
      "archived": "<boolean>",
      "archivedAt": "<dateTime>"
    }
  ],
  "startedAt": "<dateTime>",
  "status": "CANCELED",
  "requestedAt": "<dateTime>",
  "links": {
    "qui60": "<string>"
  }
}
```

---

### Archive a batch of objects by ID

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/:objectType/batch/archive`

**Authentication:** oauth2

**Path Variables:**

- `objectType`: No description

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

---

### Create a batch of objects

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/:objectType/batch/create`

**Authentication:** oauth2

**Path Variables:**

- `objectType`: No description

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    {
      "associations": [
        {
          "to": {
            "id": "<string>"
          },
          "types": [
            {
              "associationCategory": "INTEGRATOR_DEFINED",
              "associationTypeId": "<integer>"
            },
            {
              "associationCategory": "HUBSPOT_DEFINED",
              "associationTypeId": "<integer>"
            }
          ]
        },
        {
          "to": {
            "id": "<string>"
          },
          "types": [
            {
              "associationCategory": "USER_DEFINED",
              "associationTypeId": "<integer>"
            },
            {
              "associationCategory": "HUBSPOT_DEFINED",
              "associationTypeId": "<integer>"
            }
          ]
        }
      ],
      "properties": {
        "fugiat_ce8": "<string>",
        "officia_f": "<string>"
      }
    },
    {
      "associations": [
        {
          "to": {
            "id": "<string>"
          },
          "types": [
            {
              "associationCategory": "INTEGRATOR_DEFINED",
              "associationTypeId": "<integer>"
            },
            {
              "associationCategory": "INTEGRATOR_DEFINED",
              "associationTypeId": "<integer>"
            }
          ]
        },
        {
          "to": {
            "id": "<string>"
          },
          "types": [
            {
              "associationCategory": "HUBSPOT_DEFINED",
              "associationTypeId": "<integer>"
            },
            {
              "associationCategory": "HUBSPOT_DEFINED",
              "associationTypeId": "<integer>"
            }
          ]
        }
      ],
      "properties": {
        "pariaturce": "<string>"
      }
    }
  ]
}
```

**Success Response (201):**

```json
{
  "completedAt": "<dateTime>",
  "results": [
    {
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "velit1": "<string>",
        "enim_1": "<string>",
        "tempor48": "<string>",
        "esse_f99": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "in81c": [
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
      },
      "archived": "<boolean>",
      "archivedAt": "<dateTime>"
    },
    {
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "aute3": "<string>",
        "Duis918": "<string>",
        "ut_1": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "ut5": [
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
        "adipisicing_c3": [
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
      },
      "archived": "<boolean>",
      "archivedAt": "<dateTime>"
    }
  ],
  "startedAt": "<dateTime>",
  "status": "CANCELED",
  "requestedAt": "<dateTime>",
  "links": {
    "qui60": "<string>"
  }
}
```

---

### Update a batch of objects by internal ID, or unique property values

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/:objectType/batch/update`

**Authentication:** oauth2

**Path Variables:**

- `objectType`: No description

**Headers:**

- `Content-Type`: application/json

**Success Response (200):**

```json
{
  "completedAt": "<dateTime>",
  "results": [
    {
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "velit1": "<string>",
        "enim_1": "<string>",
        "tempor48": "<string>",
        "esse_f99": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "in81c": [
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
      },
      "archived": "<boolean>",
      "archivedAt": "<dateTime>"
    },
    {
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "aute3": "<string>",
        "Duis918": "<string>",
        "ut_1": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "ut5": [
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
        "adipisicing_c3": [
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
      },
      "archived": "<boolean>",
      "archivedAt": "<dateTime>"
    }
  ],
  "startedAt": "<dateTime>",
  "status": "CANCELED",
  "requestedAt": "<dateTime>",
  "links": {
    "qui60": "<string>"
  }
}
```

---

### Read

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/objects/:objectType/:objectId?properties=<string>&properties=<string>&propertiesWithHistory=<string>&propertiesWithHistory=<string>&associations=<string>&associations=<string>&archived=false&idProperty=<string>`

**Description:** Read an Object identified by `{objectId}`. `{objectId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.

**Authentication:** oauth2

**Path Variables:**

- `objectType`: No description
- `objectId`: No description

**Query Parameters:**

- `properties`: A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
- `properties`: A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
- `propertiesWithHistory`: A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.
- `propertiesWithHistory`: A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.
- `associations`: A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
- `associations`: A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
- `archived`: Whether to return only results that have been archived.
- `idProperty`: The name of a property whose values are unique for this object type

**Headers:**


**Success Response (200):**

```json
{
  "createdAt": "<dateTime>",
  "id": "<string>",
  "properties": {
    "qui_98": "<string>"
  },
  "updatedAt": "<dateTime>",
  "propertiesWithHistory": {
    "aute_636": [
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
    "aliqua0c": [
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
    "magnab": [
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
  },
  "archived": "<boolean>",
  "archivedAt": "<dateTime>",
  "associations": {
    "quisd46": {
      "results": [
        {
          "id": "<string>",
          "type": "<string>"
        },
        {
          "id": "<string>",
          "type": "<string>"
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
  }
}
```

---

### Archive

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/crm/v3/objects/:objectType/:objectId`

**Description:** Move an Object identified by `{objectId}` to the recycling bin.

**Authentication:** oauth2

**Path Variables:**

- `objectType`: No description
- `objectId`: No description

**Headers:**


---

### Update

**Method:** `PATCH`

**URL:** `https://api.hubapi.com/crm/v3/objects/:objectType/:objectId?idProperty=<string>`

**Description:** Perform a partial update of an Object identified by `{objectId}`. `{objectId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param. Provided property values will be overwritten. Read-only and non-existent properties will be ignored. Properties values can be cleared by passing an empty string.

**Authentication:** oauth2

**Path Variables:**

- `objectType`: No description
- `objectId`: No description

**Query Parameters:**

- `idProperty`: The name of a property whose values are unique for this object type

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "properties": {
    "officia7": "<string>"
  }
}
```

**Success Response (200):**

```json
{
  "createdAt": "<dateTime>",
  "id": "<string>",
  "properties": {
    "deserunt675": "<string>",
    "dolor_1ac": "<string>"
  },
  "updatedAt": "<dateTime>",
  "propertiesWithHistory": {
    "proident_48b": [
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
    "Duis_50": [
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
    "ex5": [
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
  },
  "archived": "<boolean>",
  "archivedAt": "<dateTime>"
}
```

---

### List

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/objects/:objectType?limit=10&after=<string>&properties=<string>&properties=<string>&propertiesWithHistory=<string>&propertiesWithHistory=<string>&associations=<string>&associations=<string>&archived=false`

**Description:** Read a page of objects. Control what is returned via the `properties` query param.

**Authentication:** oauth2

**Path Variables:**

- `objectType`: No description

**Query Parameters:**

- `limit`: The maximum number of results to display per page.
- `after`: The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
- `properties`: A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
- `properties`: A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
- `propertiesWithHistory`: A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.
- `propertiesWithHistory`: A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.
- `associations`: A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
- `associations`: A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
- `archived`: Whether to return only results that have been archived.

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "esse033": "<string>",
        "dolore126": "<string>",
        "esse_f7": "<string>",
        "et_21": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "ut1": [
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
      },
      "archived": "<boolean>",
      "archivedAt": "<dateTime>",
      "associations": {
        "deserunt3ec": {
          "results": [
            {
              "id": "<string>",
              "type": "<string>"
            },
            {
              "id": "<string>",
              "type": "<string>"
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
      }
    },
    {
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "cupidatatd4": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "id__86": [
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
        "ea785": [
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
      },
      "archived": "<boolean>",
      "archivedAt": "<dateTime>",
      "associations": {
        "aute2e": {
          "results": [
            {
              "id": "<string>",
              "type": "<string>"
            },
            {
              "id": "<string>",
              "type": "<string>"
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
        },
        "dolore7": {
          "results": [
            {
              "id": "<string>",
              "type": "<string>"
            },
            {
              "id": "<string>",
              "type": "<string>"
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
        },
        "do_50d": {
          "results": [
            {
              "id": "<string>",
              "type": "<string>"
            },
            {
              "id": "<string>",
              "type": "<string>"
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
      }
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

### Create

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/:objectType`

**Description:** Create a CRM object with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard objects is provided.

**Authentication:** oauth2

**Path Variables:**

- `objectType`: No description

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "associations": [
    {
      "to": {
        "id": "<string>"
      },
      "types": [
        {
          "associationCategory": "INTEGRATOR_DEFINED",
          "associationTypeId": "<integer>"
        },
        {
          "associationCategory": "USER_DEFINED",
          "associationTypeId": "<integer>"
        }
      ]
    },
    {
      "to": {
        "id": "<string>"
      },
      "types": [
        {
          "associationCategory": "HUBSPOT_DEFINED",
          "associationTypeId": "<integer>"
        },
        {
          "associationCategory": "USER_DEFINED",
          "associationTypeId": "<integer>"
        }
      ]
    }
  ],
  "properties": {
    "velit_8e": "<string>",
    "consequate_": "<string>",
    "ut_e": "<string>"
  }
}
```

**Success Response (201):**

```json
{
  "createdAt": "<dateTime>",
  "id": "<string>",
  "properties": {
    "deserunt675": "<string>",
    "dolor_1ac": "<string>"
  },
  "updatedAt": "<dateTime>",
  "propertiesWithHistory": {
    "proident_48b": [
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
    "Duis_50": [
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
    "ex5": [
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
  },
  "archived": "<boolean>",
  "archivedAt": "<dateTime>"
}
```

---

### post-/crm/v3/objects/{object Type}/search do Search

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/:objectType/search`

**Authentication:** oauth2

**Path Variables:**

- `objectType`: No description

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "after": "<integer>",
  "filterGroups": [
    {
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
          "operator": "CONTAINS_TOKEN",
          "propertyName": "<string>",
          "value": "<string>",
          "highValue": "<string>",
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
          "operator": "NOT_CONTAINS_TOKEN",
          "propertyName": "<string>",
          "value": "<string>",
          "highValue": "<string>",
          "values": [
            "<string>",
            "<string>"
          ]
        },
        {
          "operator": "EQ",
          "propertyName": "<string>",
          "value": "<string>",
          "highValue": "<string>",
          "values": [
            "<string>",
            "<string>"
          ]
        }
      ]
    }
  ],
  "limit": "<integer>",
  "properties": [
    "<string>",
    "<string>"
  ],
  "sorts": [
    "<string>",
    "<string>"
  ],
  "query": "<string>"
}
```

**Success Response (200):**

```json
{
  "results": [
    {
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "sit_2_5": "<string>",
        "quis74b": "<string>",
        "veniam_8": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "ut_ab": [
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
        "dolore47": [
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
      },
      "archived": "<boolean>",
      "archivedAt": "<dateTime>"
    },
    {
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "eu__9b": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "deserunte": [
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
        "amet4": [
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
      },
      "archived": "<boolean>",
      "archivedAt": "<dateTime>"
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

### Create or update a batch of objects by unique property values

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/:objectType/batch/upsert`

**Description:** Create or update records identified by a unique property value as specified by the `idProperty` query param. `idProperty` query param refers to a property whose values are unique for the object.

**Authentication:** apikey

**Path Variables:**

- `objectType`: (Required) 

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    {
      "id": "<string>",
      "properties": {
        "ipsumeb9": "<string>"
      },
      "idProperty": "<string>",
      "objectWriteTraceId": "<string>"
    },
    {
      "id": "<string>",
      "properties": {
        "culpa_97": "<string>"
      },
      "idProperty": "<string>",
      "objectWriteTraceId": "<string>"
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
      "createdAt": "<dateTime>",
      "id": "<string>",
      "new": "<boolean>",
      "properties": {
        "velit31": "<string>",
        "nostrud_74": "<string>",
        "laboruma63": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archived": "<boolean>",
      "archivedAt": "<dateTime>",
      "propertiesWithHistory": {
        "est__": [
          {
            "sourceType": "commodo consequat dolore",
            "timestamp": "1953-10-25T15:07:10.519Z",
            "value": "veniam consequat l",
            "sourceId": "in magna eiusmod",
            "sourceLabel": "non dolore elit adipisicing",
            "updatedByUserId": 12584655
          },
          {
            "sourceType": "irure voluptate minim",
            "timestamp": "2009-12-24T18:11:50.397Z",
            "value": "enim ut minim dolor",
            "sourceId": "et",
            "sourceLabel": "consequat labore",
            "updatedByUserId": 28035756
          }
        ],
        "Excepteurfe": [
          {
            "sourceType": "reprehenderit voluptate",
            "timestamp": "2004-04-28T19:55:04.919Z",
            "value": "commodo cillum ea nisi",
            "sourceId": "enim tempor ",
            "sourceLabel": "laborum proident officia",
            "updatedByUserId": -67427473
          },
          {
            "sourceType": "sed velit ullamco",
            "timestamp": "2019-04-19T21:27:04.331Z",
            "value": "eiusmod aute voluptate",
            "sourceId": "a",
            "sourceLabel": "fugiat deserunt",
            "updatedByUserId": 45520265
          }
        ],
        "exercitation_9a": [
          {
            "sourceType": "laboris nisi",
            "timestamp": "1972-01-12T00:22:46.329Z",
            "value": "voluptate cillum et",
            "sourceId": "ad sit ex id anim",
            "sourceLabel": "tempor qui dolor officia",
            "updatedByUserId": 70108597
          },
          {
            "sourceType": "Duis ipsu",
            "timestamp": "1953-03-27T07:25:54.987Z",
            "value": "culpa dolor laboris sed",
            "sourceId": "elit con",
            "sourceLabel": "ipsum commodo",
            "updatedByUserId": -81263114
          }
        ],
        "nisid0": [
          {
            "sourceType": "ci",
            "timestamp": "2014-09-10T10:09:54.296Z",
            "value": "enim exercitation",
            "sourceId": "dolore consequat anim cillum",
            "sourceLabel": "ipsum",
            "updatedByUserId": -23318793
          },
          {
            "sourceType": "quis sint qui",
            "timestamp": "1957-07-03T19:08:34.869Z",
            "value": "cupidatat adipisicing voluptate minim",
            "sourceId": "fugiat laboris mollit nulla",
            "sourceLabel": "irure amet laborum veniam",
            "updatedByUserId": -11333559
          }
        ]
      }
    },
    {
      "createdAt": "<dateTime>",
      "id": "<string>",
      "new": "<boolean>",
      "properties": {
        "anim_93": "<string>",
        "deserunt6": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archived": "<boolean>",
      "archivedAt": "<dateTime>",
      "propertiesWithHistory": {
        "id51c": [
          {
            "sourceType": "deserunt adipisicing aliquip",
            "timestamp": "1960-12-30T15:39:25.452Z",
            "value": "proident occaecat in",
            "sourceId": "adipisicing et",
            "sourceLabel": "consequ",
            "updatedByUserId": 5694659
          },
          {
            "sourceType": "do eu",
            "timestamp": "2017-02-19T06:54:20.376Z",
            "value": "id ut elit",
            "sourceId": "sed amet pr",
            "sourceLabel": "deserunt eiusmo",
            "updatedByUserId": -90217067
          }
        ],
        "anim_": [
          {
            "sourceType": "labore nostrud aliquip officia",
            "timestamp": "2022-02-16T08:48:10.753Z",
            "value": "nisi aliqua aliquip",
            "sourceId": "est laborum dolore ut",
            "sourceLabel": "exercitation do nisi",
            "updatedByUserId": -58294533
          },
          {
            "sourceType": "ex est",
            "timestamp": "1968-01-18T03:43:02.327Z",
            "value": "ex anim",
            "sourceId": "ipsum quis in",
            "sourceLabel": "elit cillum incididunt consectetur est",
            "updatedByUserId": -20616516
          }
        ]
      }
    }
  ],
  "startedAt": "<dateTime>",
  "status": "COMPLETE",
  "requestedAt": "<dateTime>",
  "links": {
    "cillum_b": "<string>",
    "dolor307": "<string>",
    "Loremf14": "<string>"
  }
}
```

---

