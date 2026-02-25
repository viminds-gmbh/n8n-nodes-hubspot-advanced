# Companies API

Total endpoints: 12

---

### Retrieve a batch of companies

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/companies/batch/read?archived=false`

**Authentication:** oauth2

**Query Parameters:**

- `archived`: Whether to return only results that have been archived.

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
        "enim676": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "incididunt0": [
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
        "adipisicing_c2d": [
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
        "commodo3f8": "<string>",
        "ea4": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "ea_db": [
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
  "status": "PROCESSING",
  "requestedAt": "<dateTime>",
  "links": {
    "nonfe8": "<string>"
  }
}
```

---

### Create a batch of companies

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/companies/batch/create`

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
              "associationCategory": "HUBSPOT_DEFINED",
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
              "associationCategory": "INTEGRATOR_DEFINED",
              "associationTypeId": "<integer>"
            }
          ]
        }
      ],
      "properties": {
        "cillumd41": "<string>",
        "nulla_d6": "<string>",
        "adipisicing_cef": "<string>",
        "ullamco634": "<string>"
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
              "associationCategory": "HUBSPOT_DEFINED",
              "associationTypeId": "<integer>"
            }
          ]
        }
      ],
      "properties": {
        "et_67d": "<string>"
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
        "enim676": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "incididunt0": [
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
        "adipisicing_c2d": [
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
        "commodo3f8": "<string>",
        "ea4": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "ea_db": [
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
  "status": "PROCESSING",
  "requestedAt": "<dateTime>",
  "links": {
    "nonfe8": "<string>"
  }
}
```

---

### Update a batch of companies

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/companies/batch/update`

**Authentication:** oauth2

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
        "enim676": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "incididunt0": [
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
        "adipisicing_c2d": [
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
        "commodo3f8": "<string>",
        "ea4": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "ea_db": [
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
  "status": "PROCESSING",
  "requestedAt": "<dateTime>",
  "links": {
    "nonfe8": "<string>"
  }
}
```

---

### Archive a batch of companies

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/companies/batch/archive`

**Authentication:** oauth2

**Headers:**

- `Content-Type`: application/json

---

### Retrieve companies

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/objects/companies?limit=10&after=<string>&properties=<string>&properties=<string>&propertiesWithHistory=<string>&propertiesWithHistory=<string>&associations=<string>&associations=<string>&archived=false`

**Description:** Read a page of companies. Control what is returned via the `properties` query param.

**Authentication:** oauth2

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
        "nostrud_c": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "exercitation__c": [
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
        "dolore_59": {
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
        "laboris7": {
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
        "aliquip97": "<string>",
        "velitd": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "ex_c": [
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
        "ipsum0af": {
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

### Create a company

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/companies`

**Description:** Create a company with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard companies is provided.

**Authentication:** oauth2

**Headers:**

- `Content-Type`: application/json

**Success Response (201):**

```json
{
  "createdAt": "<dateTime>",
  "id": "<string>",
  "properties": {
    "nostrud17e": "<string>",
    "occaecat_7": "<string>"
  },
  "updatedAt": "<dateTime>",
  "propertiesWithHistory": {
    "sint8": [
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

### Retrieve a company

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/objects/companies/:companyId?properties=<string>&properties=<string>&propertiesWithHistory=<string>&propertiesWithHistory=<string>&associations=<string>&associations=<string>&archived=false&idProperty=<string>`

**Description:** Read an Object identified by `{companyId}`. `{companyId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.

**Authentication:** oauth2

**Path Variables:**

- `companyId`: No description

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
    "qui6d": "<string>",
    "fugiat_87": "<string>",
    "Duis339": "<string>",
    "commodo_ab3": "<string>",
    "nisi_7": "<string>"
  },
  "updatedAt": "<dateTime>",
  "propertiesWithHistory": {
    "nostrud5d_": [
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
    "ex_a6": {
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

### Archive a company

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/crm/v3/objects/companies/:companyId`

**Description:** Move an Object identified by `{companyId}` to the recycling bin.

**Authentication:** oauth2

**Path Variables:**

- `companyId`: No description

**Headers:**


---

### Update a company

**Method:** `PATCH`

**URL:** `https://api.hubapi.com/crm/v3/objects/companies/:companyId?idProperty=<string>`

**Description:** Perform a partial update of an Object identified by `{companyId}`. `{companyId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param. Provided property values will be overwritten. Read-only and non-existent properties will be ignored. Properties values can be cleared by passing an empty string.

**Authentication:** oauth2

**Path Variables:**

- `companyId`: No description

**Query Parameters:**

- `idProperty`: The name of a property whose values are unique for this object type

**Headers:**

- `Content-Type`: application/json

**Success Response (200):**

```json
{
  "createdAt": "<dateTime>",
  "id": "<string>",
  "properties": {
    "nostrud17e": "<string>",
    "occaecat_7": "<string>"
  },
  "updatedAt": "<dateTime>",
  "propertiesWithHistory": {
    "sint8": [
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

### Search for companies

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/companies/search`

**Authentication:** oauth2

**Headers:**

- `Content-Type`: application/json

**Success Response (200):**

```json
{
  "results": [
    {
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "qui_fed": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "dolor_99": [
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
        "nisi_24b": "<string>",
        "fugiat_b": "<string>",
        "nostrud8": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "laboris82e": [
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
        "anim778": [
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

### Create or update a batch of companies by unique property values

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/companies/batch/upsert`

**Description:** Create or update companies identified by a unique property value as specified by the `idProperty` query parameter. `idProperty` query param refers to a property whose values are unique for the object.

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
        "key_3": "<string>"
      },
      "idProperty": "<string>",
      "objectWriteTraceId": "<string>"
    },
    {
      "id": "<string>",
      "properties": {
        "key_0": "<string>"
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
        ],
        "key_4": [
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
        "key_1": "<string>",
        "key_2": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "id": "<string>",
      "subCategory": {}
    }
  ],
  "links": {
    "key_0": "<string>"
  },
  "numErrors": "<integer>",
  "requestedAt": "<dateTime>"
}
```

---

### Merge two companies

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/companies/merge`

**Description:** Merge two company records. Learn more about [merging records](https://knowledge.hubspot.com/records/merge-records).

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
}
```

---

