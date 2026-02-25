# Projects API

Total endpoints: 12

---

### List

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/objects/v3/projects?after=<string>&archived=false&associations=<string>&associations=<string>&limit=10&properties=<string>&properties=<string>&propertiesWithHistory=<string>&propertiesWithHistory=<string>`

**Description:** Read a page of projects. Control what is returned via the `properties` query param.

**Authentication:** oauth2

**Query Parameters:**

- `after`: The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
- `archived`: Whether to return only results that have been archived.
- `associations`: A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
- `associations`: A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
- `limit`: The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
- `properties`: A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
- `properties`: A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
- `propertiesWithHistory`: A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of projects that can be read by a single request.
- `propertiesWithHistory`: A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of projects that can be read by a single request.

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "archived": "<boolean>",
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "key_0": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archivedAt": "<dateTime>",
      "associations": {
        "key_0": {
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
        "key_1": {
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
      },
      "objectWriteTraceId": "<string>",
      "propertiesWithHistory": {
        "key_0": [
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
        "key_1": [
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
        "key_2": [
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
        "key_3": [
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
      "url": "<string>"
    },
    {
      "archived": "<boolean>",
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "key_0": "<string>",
        "key_1": "<string>",
        "key_2": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archivedAt": "<dateTime>",
      "associations": {
        "key_0": {
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
        "key_1": {
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
      },
      "objectWriteTraceId": "<string>",
      "propertiesWithHistory": {
        "key_0": [
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
        "key_1": [
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
        "key_2": [
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
      "url": "<string>"
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

### Create

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/objects/v3/projects`

**Description:** Create a project with the given properties and return a copy of the object, including the ID.

**Authentication:** oauth2

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
          "associationCategory": "HUBSPOT_DEFINED",
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
          "associationCategory": "WORK",
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
    "key_0": "<string>"
  }
}
```

**Success Response (200):**

```json
{
  "createdResourceId": "<string>",
  "entity": {
    "archived": "<boolean>",
    "createdAt": "<dateTime>",
    "id": "<string>",
    "properties": {
      "key_0": "<string>",
      "key_1": "<string>"
    },
    "updatedAt": "<dateTime>",
    "archivedAt": "<dateTime>",
    "objectWriteTraceId": "<string>",
    "propertiesWithHistory": {
      "key_0": [
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
    "url": "<string>"
  },
  "location": "<string>"
}
```

---

### Read

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/objects/v3/projects/:projectId?archived=false&associations=<string>&associations=<string>&idProperty=<string>&properties=<string>&properties=<string>&propertiesWithHistory=<string>&propertiesWithHistory=<string>`

**Description:** Read an Object identified by `{projectId}`. `{projectId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.

**Authentication:** oauth2

**Path Variables:**

- `projectId`: No description

**Query Parameters:**

- `archived`: Whether to include archived projects
- `associations`: A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
- `associations`: A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
- `idProperty`: The name of a property whose values are unique for this object
- `properties`: A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
- `properties`: A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
- `propertiesWithHistory`: A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.
- `propertiesWithHistory`: A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.

**Headers:**


**Success Response (200):**

```json
{
  "archived": "<boolean>",
  "createdAt": "<dateTime>",
  "id": "<string>",
  "properties": {
    "key_0": "<string>"
  },
  "updatedAt": "<dateTime>",
  "archivedAt": "<dateTime>",
  "associations": {
    "key_0": {
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
    "key_1": {
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
  },
  "objectWriteTraceId": "<string>",
  "propertiesWithHistory": {
    "key_0": [
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
    "key_1": [
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
  "url": "<string>"
}
```

---

### Archive

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/crm/objects/v3/projects/:projectId`

**Description:** Move an Object identified by `{projectId}` to the recycling bin.

**Authentication:** oauth2

**Path Variables:**

- `projectId`: No description

**Headers:**


---

### Update

**Method:** `PATCH`

**URL:** `https://api.hubapi.com/crm/objects/v3/projects/:projectId?idProperty=<string>`

**Description:** Perform a partial update of an Object identified by `{projectId}`or optionally a unique property value as specified by the `idProperty` query param. `{projectId}` refers to the internal object ID by default, and the `idProperty` query param refers to a property whose values are unique for the object. Provided property values will be overwritten. Read-only and non-existent properties will result in an error. Properties values can be cleared by passing an empty string.

**Authentication:** oauth2

**Path Variables:**

- `projectId`: No description

**Query Parameters:**

- `idProperty`: The name of a property whose values are unique for this object

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "properties": {
    "key_0": "<string>"
  }
}
```

**Success Response (200):**

```json
{
  "archived": "<boolean>",
  "createdAt": "<dateTime>",
  "id": "<string>",
  "properties": {
    "key_0": "<string>",
    "key_1": "<string>"
  },
  "updatedAt": "<dateTime>",
  "archivedAt": "<dateTime>",
  "objectWriteTraceId": "<string>",
  "propertiesWithHistory": {
    "key_0": [
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
    "key_1": [
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
    "key_2": [
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
  "url": "<string>"
}
```

---

### Archive a batch of projects

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/objects/v3/projects/batch/archive`

**Description:** Archive multiple projects using their IDs.

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

---

### Create a batch of projects

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/objects/v3/projects/batch/create`

**Description:** Create multiple projects in a single request.

**Authentication:** oauth2

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
              "associationCategory": "INTEGRATOR_DEFINED",
              "associationTypeId": "<integer>"
            },
            {
              "associationCategory": "WORK",
              "associationTypeId": "<integer>"
            }
          ]
        }
      ],
      "properties": {
        "key_0": "<string>",
        "key_1": "<string>"
      },
      "objectWriteTraceId": "<string>"
    },
    {
      "associations": [
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
              "associationCategory": "INTEGRATOR_DEFINED",
              "associationTypeId": "<integer>"
            },
            {
              "associationCategory": "INTEGRATOR_DEFINED",
              "associationTypeId": "<integer>"
            }
          ]
        }
      ],
      "properties": {
        "key_0": "<string>",
        "key_1": "<string>",
        "key_2": "<string>",
        "key_3": "<string>"
      },
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
      "archived": "<boolean>",
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "key_0": "<string>",
        "key_1": "<string>",
        "key_2": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archivedAt": "<dateTime>",
      "objectWriteTraceId": "<string>",
      "propertiesWithHistory": {
        "key_0": [
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
      "url": "<string>"
    },
    {
      "archived": "<boolean>",
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "key_0": "<string>",
        "key_1": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archivedAt": "<dateTime>",
      "objectWriteTraceId": "<string>",
      "propertiesWithHistory": {
        "key_0": [
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
        "key_1": [
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
        "key_2": [
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
      "url": "<string>"
    }
  ],
  "startedAt": "<dateTime>",
  "status": "CANCELED",
  "errors": [
    {
      "category": "<string>",
      "context": {
        "key_0": [
          "<string>",
          "<string>"
        ],
        "key_1": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ],
            "key_1": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        },
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ],
            "key_1": [
              "<string>",
              "<string>"
            ],
            "key_2": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        }
      ],
      "links": {
        "key_0": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "id": "<string>",
      "subCategory": {}
    },
    {
      "category": "<string>",
      "context": {
        "key_0": [
          "<string>",
          "<string>"
        ],
        "key_1": [
          "<string>",
          "<string>"
        ],
        "key_2": [
          "<string>",
          "<string>"
        ],
        "key_3": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        },
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ],
            "key_1": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        }
      ],
      "links": {
        "key_0": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "id": "<string>",
      "subCategory": {}
    }
  ],
  "links": {
    "key_0": "<string>",
    "key_1": "<string>"
  },
  "numErrors": "<integer>",
  "requestedAt": "<dateTime>"
}
```

---

### Read a batch of projects

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/objects/v3/projects/batch/read?archived=false`

**Description:** Retrieve records by record ID or include the idProperty parameter to retrieve records by a custom unique value property.

**Authentication:** oauth2

**Query Parameters:**

- `archived`: No description

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
      "archived": "<boolean>",
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "key_0": "<string>",
        "key_1": "<string>",
        "key_2": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archivedAt": "<dateTime>",
      "objectWriteTraceId": "<string>",
      "propertiesWithHistory": {
        "key_0": [
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
      "url": "<string>"
    },
    {
      "archived": "<boolean>",
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "key_0": "<string>",
        "key_1": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archivedAt": "<dateTime>",
      "objectWriteTraceId": "<string>",
      "propertiesWithHistory": {
        "key_0": [
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
        "key_1": [
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
        "key_2": [
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
      "url": "<string>"
    }
  ],
  "startedAt": "<dateTime>",
  "status": "CANCELED",
  "errors": [
    {
      "category": "<string>",
      "context": {
        "key_0": [
          "<string>",
          "<string>"
        ],
        "key_1": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ],
            "key_1": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        },
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ],
            "key_1": [
              "<string>",
              "<string>"
            ],
            "key_2": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        }
      ],
      "links": {
        "key_0": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "id": "<string>",
      "subCategory": {}
    },
    {
      "category": "<string>",
      "context": {
        "key_0": [
          "<string>",
          "<string>"
        ],
        "key_1": [
          "<string>",
          "<string>"
        ],
        "key_2": [
          "<string>",
          "<string>"
        ],
        "key_3": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        },
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ],
            "key_1": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        }
      ],
      "links": {
        "key_0": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "id": "<string>",
      "subCategory": {}
    }
  ],
  "links": {
    "key_0": "<string>",
    "key_1": "<string>"
  },
  "numErrors": "<integer>",
  "requestedAt": "<dateTime>"
}
```

---

### Update a batch of projects

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/objects/v3/projects/batch/update`

**Description:** Update multiple projects using their internal IDs or unique property values.

**Authentication:** oauth2

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    {
      "id": "<string>",
      "properties": {
        "key_0": "<string>",
        "key_1": "<string>",
        "key_2": "<string>",
        "key_3": "<string>",
        "key_4": "<string>"
      },
      "idProperty": "<string>",
      "objectWriteTraceId": "<string>"
    },
    {
      "id": "<string>",
      "properties": {
        "key_0": "<string>",
        "key_1": "<string>",
        "key_2": "<string>"
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
      "archived": "<boolean>",
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "key_0": "<string>",
        "key_1": "<string>",
        "key_2": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archivedAt": "<dateTime>",
      "objectWriteTraceId": "<string>",
      "propertiesWithHistory": {
        "key_0": [
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
      "url": "<string>"
    },
    {
      "archived": "<boolean>",
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "key_0": "<string>",
        "key_1": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archivedAt": "<dateTime>",
      "objectWriteTraceId": "<string>",
      "propertiesWithHistory": {
        "key_0": [
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
        "key_1": [
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
        "key_2": [
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
      "url": "<string>"
    }
  ],
  "startedAt": "<dateTime>",
  "status": "CANCELED",
  "errors": [
    {
      "category": "<string>",
      "context": {
        "key_0": [
          "<string>",
          "<string>"
        ],
        "key_1": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ],
            "key_1": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        },
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ],
            "key_1": [
              "<string>",
              "<string>"
            ],
            "key_2": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        }
      ],
      "links": {
        "key_0": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "id": "<string>",
      "subCategory": {}
    },
    {
      "category": "<string>",
      "context": {
        "key_0": [
          "<string>",
          "<string>"
        ],
        "key_1": [
          "<string>",
          "<string>"
        ],
        "key_2": [
          "<string>",
          "<string>"
        ],
        "key_3": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        },
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ],
            "key_1": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        }
      ],
      "links": {
        "key_0": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "id": "<string>",
      "subCategory": {}
    }
  ],
  "links": {
    "key_0": "<string>",
    "key_1": "<string>"
  },
  "numErrors": "<integer>",
  "requestedAt": "<dateTime>"
}
```

---

### Create or update a batch of projects

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/objects/v3/projects/batch/upsert`

**Description:** Create or update records identified by a unique property value as specified by the `idProperty` query param. `idProperty` query param refers to a property whose values are unique for the object.

**Authentication:** oauth2

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    {
      "id": "<string>",
      "properties": {
        "key_0": "<string>"
      },
      "idProperty": "<string>",
      "objectWriteTraceId": "<string>"
    },
    {
      "id": "<string>",
      "properties": {
        "key_0": "<string>",
        "key_1": "<string>",
        "key_2": "<string>"
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
      "archived": "<boolean>",
      "createdAt": "<dateTime>",
      "id": "<string>",
      "new": "<boolean>",
      "properties": {
        "key_0": "<string>",
        "key_1": "<string>",
        "key_2": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archivedAt": "<dateTime>",
      "objectWriteTraceId": "<string>",
      "propertiesWithHistory": {
        "key_0": [
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
      "url": "<string>"
    },
    {
      "archived": "<boolean>",
      "createdAt": "<dateTime>",
      "id": "<string>",
      "new": "<boolean>",
      "properties": {
        "key_0": "<string>",
        "key_1": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archivedAt": "<dateTime>",
      "objectWriteTraceId": "<string>",
      "propertiesWithHistory": {
        "key_0": [
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
        "key_1": [
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
      "url": "<string>"
    }
  ],
  "startedAt": "<dateTime>",
  "status": "PROCESSING",
  "errors": [
    {
      "category": "<string>",
      "context": {
        "key_0": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        },
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        }
      ],
      "links": {
        "key_0": "<string>",
        "key_1": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "id": "<string>",
      "subCategory": {}
    },
    {
      "category": "<string>",
      "context": {
        "key_0": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        },
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ],
            "key_1": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        }
      ],
      "links": {
        "key_0": "<string>",
        "key_1": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "id": "<string>",
      "subCategory": {}
    }
  ],
  "links": {
    "key_0": "<string>",
    "key_1": "<string>"
  },
  "numErrors": "<integer>",
  "requestedAt": "<dateTime>"
}
```

---

### Merge two projects

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/objects/v3/projects/merge`

**Description:** Merge two project records. Learn more about [merging records](https://knowledge.hubspot.com/records/merge-records).

**Authentication:** oauth2

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "objectIdToMerge": "<string>",
  "primaryObjectId": "<string>"
}
```

**Success Response (200):**

```json
{
  "archived": "<boolean>",
  "createdAt": "<dateTime>",
  "id": "<string>",
  "properties": {
    "key_0": "<string>",
    "key_1": "<string>"
  },
  "updatedAt": "<dateTime>",
  "archivedAt": "<dateTime>",
  "objectWriteTraceId": "<string>",
  "propertiesWithHistory": {
    "key_0": [
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
    "key_1": [
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
    "key_2": [
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
  "url": "<string>"
}
```

---

### Search for projects

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/objects/v3/projects/search`

**Description:** Search for projects by filtering on properties, searching through associations, and sorting results. Learn more about [CRM search](https://developers.hubspot.com/docs/guides/api/crm/search#make-a-search-request).

**Authentication:** oauth2

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "after": "<string>",
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
          "operator": "GT",
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
          "operator": "HAS_PROPERTY",
          "propertyName": "<string>",
          "highValue": "<string>",
          "value": "<string>",
          "values": [
            "<string>",
            "<string>"
          ]
        },
        {
          "operator": "NOT_CONTAINS_TOKEN",
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
      "archived": "<boolean>",
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "key_0": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archivedAt": "<dateTime>",
      "objectWriteTraceId": "<string>",
      "propertiesWithHistory": {
        "key_0": [
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
      "url": "<string>"
    },
    {
      "archived": "<boolean>",
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "key_0": "<string>",
        "key_1": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archivedAt": "<dateTime>",
      "objectWriteTraceId": "<string>",
      "propertiesWithHistory": {
        "key_0": [
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
        "key_1": [
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
        "key_2": [
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
        "key_3": [
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
      "url": "<string>"
    }
  ],
  "total": "<integer>",
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

