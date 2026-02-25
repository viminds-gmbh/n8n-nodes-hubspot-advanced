# Commerce Subscriptions API

Total endpoints: 11

---

### Read

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/objects/subscriptions/:subscriptionId?properties=<string>&properties=<string>&propertiesWithHistory=<string>&propertiesWithHistory=<string>&associations=<string>&associations=<string>&archived=false&idProperty=<string>`

**Description:** Read an Object identified by `{subscriptionId}`. `{subscriptionId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.

**Path Variables:**

- `subscriptionId`: (Required) 

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
    "labore_77": "<string>"
  },
  "updatedAt": "<dateTime>",
  "associations": {
    "ad42": {
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
  "archived": "<boolean>",
  "archivedAt": "<dateTime>",
  "propertiesWithHistory": {
    "Ut72": [
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
```

---

### List

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/objects/subscriptions?limit=10&after=<string>&properties=<string>&properties=<string>&propertiesWithHistory=<string>&propertiesWithHistory=<string>&associations=<string>&associations=<string>&archived=false`

**Description:** Read a page of subscriptions. Control what is returned via the `properties` query param.

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
        "consectetur30": "<string>"
      },
      "updatedAt": "<dateTime>",
      "associations": {
        "consequat_88b": {
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
      "archived": "<boolean>",
      "archivedAt": "<dateTime>",
      "propertiesWithHistory": {
        "nostrude07": [
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
        "cupidatat_9_": "<string>",
        "ex_2b0": "<string>",
        "Duis_338": "<string>",
        "ea_da": "<string>",
        "aute__52": "<string>"
      },
      "updatedAt": "<dateTime>",
      "associations": {
        "voluptatedf": {
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
      "archived": "<boolean>",
      "archivedAt": "<dateTime>",
      "propertiesWithHistory": {
        "ullamco_e17": [
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

### post-/crm/v3/objects/subscriptions/search

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/subscriptions/search`

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
        "esse_": "<string>",
        "magna9d6": "<string>",
        "est_d": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archived": "<boolean>",
      "archivedAt": "<dateTime>",
      "propertiesWithHistory": {
        "officia_e97": [
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
        "commodo_8df": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archived": "<boolean>",
      "archivedAt": "<dateTime>",
      "propertiesWithHistory": {
        "dolor_51a": [
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
        "in_4e": [
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
        "Excepteur_62": [
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

### Read a batch of subscriptions by internal ID, or unique property values

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/subscriptions/batch/read?archived=false`

**Description:** Retrieve records by record ID or include the `idProperty` parameter to retrieve records by a custom unique value property. 

**Authentication:** oauth2

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
      "createdAt": "1959-06-29T00:14:24.661Z",
      "id": "string",
      "properties": {
        "key_0": "string",
        "key_1": "string",
        "key_2": "string"
      },
      "updatedAt": "2019-08-28T11:09:41.388Z",
      "archived": false,
      "archivedAt": "2024-03-24T18:57:44.957Z",
      "propertiesWithHistory": {
        "key_0": [
          {
            "sourceType": "string",
            "timestamp": "1979-03-26T16:37:50.059Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 2948
          },
          {
            "sourceType": "string",
            "timestamp": "2002-06-19T21:37:59.623Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 5860
          }
        ],
        "key_1": [
          {
            "sourceType": "string",
            "timestamp": "1999-02-13T23:28:29.954Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 5011
          },
          {
            "sourceType": "string",
            "timestamp": "2010-09-30T22:12:44.719Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 3492
          }
        ],
        "key_2": [
          {
            "sourceType": "string",
            "timestamp": "2021-03-20T11:57:18.123Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 4809
          },
          {
            "sourceType": "string",
            "timestamp": "1963-12-09T20:18:40.922Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 9774
          }
        ],
        "key_3": [
          {
            "sourceType": "string",
            "timestamp": "2025-07-11T06:13:51.821Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 8542
          },
          {
            "sourceType": "string",
            "timestamp": "1980-09-07T10:47:59.822Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 7736
          }
        ]
      },
      "objectWriteTraceId": "string"
    },
    {
      "createdAt": "1988-02-19T14:09:14.068Z",
      "id": "string",
      "properties": {
        "key_0": "string",
        "key_1": "string"
      },
      "updatedAt": "1960-03-04T23:42:44.513Z",
      "archived": false,
      "archivedAt": "2014-12-01T07:32:56.429Z",
      "propertiesWithHistory": {
        "key_0": [
          {
            "sourceType": "string",
            "timestamp": "1987-05-13T17:57:47.531Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 3818
          },
          {
            "sourceType": "string",
            "timestamp": "2016-11-15T16:54:33.001Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 4112
          }
        ],
        "key_1": [
          {
            "sourceType": "string",
            "timestamp": "1955-03-07T16:22:10.979Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 9854
          },
          {
            "sourceType": "string",
            "timestamp": "1946-04-26T10:25:29.385Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 5542
          }
        ]
      },
      "objectWriteTraceId": "string"
    }
  ],
  "startedAt": "<dateTime>",
  "status": "COMPLETE",
  "requestedAt": "<dateTime>",
  "links": {
    "key_0": "<string>"
  }
}
```

---

### Archive

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/crm/v3/objects/subscriptions/:subscriptionId`

**Description:** Move an Object identified by `{subscriptionId}` to the recycling bin.

**Path Variables:**

- `subscriptionId`: (Required) 

**Headers:**


---

### Update

**Method:** `PATCH`

**URL:** `https://api.hubapi.com/crm/v3/objects/subscriptions/:subscriptionId?idProperty=<string>`

**Description:** Perform a partial update of an Object identified by `{subscriptionId}`or optionally a unique property value as specified by the `idProperty` query param. `{subscriptionId}` refers to the internal object ID by default, and the `idProperty` query param refers to a property whose values are unique for the object. Provided property values will be overwritten. Read-only and non-existent properties will result in an error. Properties values can be cleared by passing an empty string.

**Path Variables:**

- `subscriptionId`: (Required) 

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
  "createdAt": "2000-08-12T02:49:02.966Z",
  "id": "string",
  "properties": {
    "key_0": "string",
    "key_1": "string"
  },
  "updatedAt": "2012-04-21T17:38:38.936Z",
  "archived": true,
  "archivedAt": "1990-03-24T02:27:46.428Z",
  "propertiesWithHistory": {
    "key_0": [
      {
        "sourceType": "string",
        "timestamp": "1963-10-21T11:00:27.670Z",
        "value": "string",
        "sourceId": "string",
        "sourceLabel": "string",
        "updatedByUserId": 3161
      },
      {
        "sourceType": "string",
        "timestamp": "1975-01-29T05:25:54.603Z",
        "value": "string",
        "sourceId": "string",
        "sourceLabel": "string",
        "updatedByUserId": 5316
      }
    ]
  },
  "objectWriteTraceId": "string"
}
```

---

### Archive a batch of subscriptions by ID

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/subscriptions/batch/archive`

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

### Create a batch of subscriptions

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/subscriptions/batch/create`

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    {
      "properties": {
        "key_0": "<string>"
      },
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
      "objectWriteTraceId": "<string>"
    },
    {
      "properties": {
        "key_0": "<string>",
        "key_1": "<string>"
      },
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
      "objectWriteTraceId": "<string>"
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
      "createdAt": "1959-06-29T00:14:24.661Z",
      "id": "string",
      "properties": {
        "key_0": "string",
        "key_1": "string",
        "key_2": "string"
      },
      "updatedAt": "2019-08-28T11:09:41.388Z",
      "archived": false,
      "archivedAt": "2024-03-24T18:57:44.957Z",
      "propertiesWithHistory": {
        "key_0": [
          {
            "sourceType": "string",
            "timestamp": "1979-03-26T16:37:50.059Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 2948
          },
          {
            "sourceType": "string",
            "timestamp": "2002-06-19T21:37:59.623Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 5860
          }
        ],
        "key_1": [
          {
            "sourceType": "string",
            "timestamp": "1999-02-13T23:28:29.954Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 5011
          },
          {
            "sourceType": "string",
            "timestamp": "2010-09-30T22:12:44.719Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 3492
          }
        ],
        "key_2": [
          {
            "sourceType": "string",
            "timestamp": "2021-03-20T11:57:18.123Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 4809
          },
          {
            "sourceType": "string",
            "timestamp": "1963-12-09T20:18:40.922Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 9774
          }
        ],
        "key_3": [
          {
            "sourceType": "string",
            "timestamp": "2025-07-11T06:13:51.821Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 8542
          },
          {
            "sourceType": "string",
            "timestamp": "1980-09-07T10:47:59.822Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 7736
          }
        ]
      },
      "objectWriteTraceId": "string"
    },
    {
      "createdAt": "1988-02-19T14:09:14.068Z",
      "id": "string",
      "properties": {
        "key_0": "string",
        "key_1": "string"
      },
      "updatedAt": "1960-03-04T23:42:44.513Z",
      "archived": false,
      "archivedAt": "2014-12-01T07:32:56.429Z",
      "propertiesWithHistory": {
        "key_0": [
          {
            "sourceType": "string",
            "timestamp": "1987-05-13T17:57:47.531Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 3818
          },
          {
            "sourceType": "string",
            "timestamp": "2016-11-15T16:54:33.001Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 4112
          }
        ],
        "key_1": [
          {
            "sourceType": "string",
            "timestamp": "1955-03-07T16:22:10.979Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 9854
          },
          {
            "sourceType": "string",
            "timestamp": "1946-04-26T10:25:29.385Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 5542
          }
        ]
      },
      "objectWriteTraceId": "string"
    }
  ],
  "startedAt": "<dateTime>",
  "status": "COMPLETE",
  "requestedAt": "<dateTime>",
  "links": {
    "key_0": "<string>"
  }
}
```

---

### Update a batch of subscriptions by internal ID, or unique property values

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/subscriptions/batch/update`

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
        "key_1": "<string>"
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
      "createdAt": "1959-06-29T00:14:24.661Z",
      "id": "string",
      "properties": {
        "key_0": "string",
        "key_1": "string",
        "key_2": "string"
      },
      "updatedAt": "2019-08-28T11:09:41.388Z",
      "archived": false,
      "archivedAt": "2024-03-24T18:57:44.957Z",
      "propertiesWithHistory": {
        "key_0": [
          {
            "sourceType": "string",
            "timestamp": "1979-03-26T16:37:50.059Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 2948
          },
          {
            "sourceType": "string",
            "timestamp": "2002-06-19T21:37:59.623Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 5860
          }
        ],
        "key_1": [
          {
            "sourceType": "string",
            "timestamp": "1999-02-13T23:28:29.954Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 5011
          },
          {
            "sourceType": "string",
            "timestamp": "2010-09-30T22:12:44.719Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 3492
          }
        ],
        "key_2": [
          {
            "sourceType": "string",
            "timestamp": "2021-03-20T11:57:18.123Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 4809
          },
          {
            "sourceType": "string",
            "timestamp": "1963-12-09T20:18:40.922Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 9774
          }
        ],
        "key_3": [
          {
            "sourceType": "string",
            "timestamp": "2025-07-11T06:13:51.821Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 8542
          },
          {
            "sourceType": "string",
            "timestamp": "1980-09-07T10:47:59.822Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 7736
          }
        ]
      },
      "objectWriteTraceId": "string"
    },
    {
      "createdAt": "1988-02-19T14:09:14.068Z",
      "id": "string",
      "properties": {
        "key_0": "string",
        "key_1": "string"
      },
      "updatedAt": "1960-03-04T23:42:44.513Z",
      "archived": false,
      "archivedAt": "2014-12-01T07:32:56.429Z",
      "propertiesWithHistory": {
        "key_0": [
          {
            "sourceType": "string",
            "timestamp": "1987-05-13T17:57:47.531Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 3818
          },
          {
            "sourceType": "string",
            "timestamp": "2016-11-15T16:54:33.001Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 4112
          }
        ],
        "key_1": [
          {
            "sourceType": "string",
            "timestamp": "1955-03-07T16:22:10.979Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 9854
          },
          {
            "sourceType": "string",
            "timestamp": "1946-04-26T10:25:29.385Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 5542
          }
        ]
      },
      "objectWriteTraceId": "string"
    }
  ],
  "startedAt": "<dateTime>",
  "status": "COMPLETE",
  "requestedAt": "<dateTime>",
  "links": {
    "key_0": "<string>"
  }
}
```

---

### Create

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/subscriptions`

**Description:** Create a subscription with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard subscriptions is provided.

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "properties": {
    "key_0": "<string>"
  },
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
          "associationCategory": "INTEGRATOR_DEFINED",
          "associationTypeId": "<integer>"
        }
      ]
    }
  ]
}
```

**Success Response (201):**

```json
{
  "createdAt": "2000-08-12T02:49:02.966Z",
  "id": "string",
  "properties": {
    "key_0": "string",
    "key_1": "string"
  },
  "updatedAt": "2012-04-21T17:38:38.936Z",
  "archived": true,
  "archivedAt": "1990-03-24T02:27:46.428Z",
  "propertiesWithHistory": {
    "key_0": [
      {
        "sourceType": "string",
        "timestamp": "1963-10-21T11:00:27.670Z",
        "value": "string",
        "sourceId": "string",
        "sourceLabel": "string",
        "updatedByUserId": 3161
      },
      {
        "sourceType": "string",
        "timestamp": "1975-01-29T05:25:54.603Z",
        "value": "string",
        "sourceId": "string",
        "sourceLabel": "string",
        "updatedByUserId": 5316
      }
    ]
  },
  "objectWriteTraceId": "string"
}
```

---

### Create or update a batch of subscriptions by unique property values

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/subscriptions/batch/upsert`

**Description:** Create or update records identified by a unique property value as specified by the `idProperty` query param. `idProperty` query param refers to a property whose values are unique for the object.

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
      "createdAt": "<dateTime>",
      "id": "<string>",
      "new": "<boolean>",
      "properties": {
        "key_0": "<string>",
        "key_1": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archived": "<boolean>",
      "archivedAt": "<dateTime>",
      "propertiesWithHistory": {
        "key_0": [
          {
            "sourceType": "string",
            "timestamp": "1985-09-20T06:19:23.405Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 7816
          },
          {
            "sourceType": "string",
            "timestamp": "1964-02-22T14:33:59.736Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 8171
          }
        ]
      },
      "objectWriteTraceId": "<string>"
    },
    {
      "createdAt": "<dateTime>",
      "id": "<string>",
      "new": "<boolean>",
      "properties": {
        "key_0": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archived": "<boolean>",
      "archivedAt": "<dateTime>",
      "propertiesWithHistory": {
        "key_0": [
          {
            "sourceType": "string",
            "timestamp": "1983-04-05T07:49:59.804Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 7202
          },
          {
            "sourceType": "string",
            "timestamp": "1958-04-27T10:51:21.522Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 8566
          }
        ],
        "key_1": [
          {
            "sourceType": "string",
            "timestamp": "2017-09-26T07:52:21.875Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 5678
          },
          {
            "sourceType": "string",
            "timestamp": "2017-03-20T03:16:52.308Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 8159
          }
        ],
        "key_2": [
          {
            "sourceType": "string",
            "timestamp": "1962-02-24T07:54:26.433Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 1750
          },
          {
            "sourceType": "string",
            "timestamp": "2001-10-12T08:58:34.480Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 8065
          }
        ],
        "key_3": [
          {
            "sourceType": "string",
            "timestamp": "2003-05-24T03:28:58.816Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 4340
          },
          {
            "sourceType": "string",
            "timestamp": "1977-07-26T12:11:27.777Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 9091
          }
        ],
        "key_4": [
          {
            "sourceType": "string",
            "timestamp": "1966-03-11T09:59:39.604Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 84
          },
          {
            "sourceType": "string",
            "timestamp": "2018-10-13T23:27:03.085Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 7847
          }
        ]
      },
      "objectWriteTraceId": "<string>"
    }
  ],
  "startedAt": "<dateTime>",
  "status": "CANCELED",
  "requestedAt": "<dateTime>",
  "links": {
    "key_0": "<string>",
    "key_1": "<string>",
    "key_2": "<string>"
  }
}
```

---

