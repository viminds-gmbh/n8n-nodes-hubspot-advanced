# Goals API

Total endpoints: 11

---

### Read a batch of goal targets by internal ID, or unique property values

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/goal_targets/batch/read?archived=false`

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
        "sed_3": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "nulla_b": [
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
        "amet7ac": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "nisi2": [
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
        "et82": [
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
    "mollita7_": "<string>",
    "id_3ac": "<string>"
  }
}
```

---

### Read

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/objects/goal_targets/:goalTargetId?properties=<string>&properties=<string>&propertiesWithHistory=<string>&propertiesWithHistory=<string>&associations=<string>&associations=<string>&archived=false&idProperty=<string>`

**Description:** Read an Object identified by `{goalTargetId}`. `{goalTargetId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.

**Path Variables:**

- `goalTargetId`: No description

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
    "Duis2": "<string>"
  },
  "updatedAt": "<dateTime>",
  "propertiesWithHistory": {
    "exercitation72d": [
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
    "culpa_60": {
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
    "Lorem_6": {
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
    "minim__2": {
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

### Get a page of goal targets

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/objects/goal_targets?limit=10&after=<string>&properties=<string>&properties=<string>&propertiesWithHistory=<string>&propertiesWithHistory=<string>&associations=<string>&associations=<string>&archived=false`

**Description:** Read a page of goal targets. Control what is returned via the `properties` query param.

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
        "mollit3b": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "in4e2": [
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
        "mollit534": {
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
        "officiada": "<string>",
        "consequat6a_": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "ad_c92": [
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
        "nostrud48f": [
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
        "esse_51": [
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
        "quis_fa": {
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
        "aliquip_0": {
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

### Perform a search for goal targets based on various filters and criteria.

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/goal_targets/search`

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
        "enim_7": "<string>",
        "laborum__d_": "<string>",
        "euf": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "sint21": [
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
        "et_ad7": [
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
        "reprehenderit_2": [
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
        "incididunt_1d": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "dolor4df": [
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
        "exercitation_9": [
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
        "ad08a": [
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

### Create

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/goal_targets`

**Description:** Create a goal target with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard goal targets is provided.

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
    "key_0": "<string>"
  }
}
```

**Success Response (200):**

```json
{
  "createdResourceId": "<string>",
  "entity": {
    "archived": true,
    "createdAt": "2005-01-31T07:13:53.583Z",
    "id": "string",
    "properties": {
      "key_0": "string"
    },
    "updatedAt": "2024-02-12T12:00:28.696Z",
    "archivedAt": "1981-04-04T19:49:32.514Z",
    "objectWriteTraceId": "string",
    "propertiesWithHistory": {
      "key_0": [
        {
          "sourceType": "string",
          "timestamp": "2008-07-15T06:02:42.306Z",
          "value": "string",
          "sourceId": "string",
          "sourceLabel": "string",
          "updatedByUserId": 3083
        },
        {
          "sourceType": "string",
          "timestamp": "1960-04-02T00:58:48.923Z",
          "value": "string",
          "sourceId": "string",
          "sourceLabel": "string",
          "updatedByUserId": 9016
        }
      ],
      "key_1": [
        {
          "sourceType": "string",
          "timestamp": "1983-10-22T22:45:18.265Z",
          "value": "string",
          "sourceId": "string",
          "sourceLabel": "string",
          "updatedByUserId": 4067
        },
        {
          "sourceType": "string",
          "timestamp": "1966-09-19T03:54:11.604Z",
          "value": "string",
          "sourceId": "string",
          "sourceLabel": "string",
          "updatedByUserId": 430
        }
      ],
      "key_2": [
        {
          "sourceType": "string",
          "timestamp": "1948-12-31T02:21:02.422Z",
          "value": "string",
          "sourceId": "string",
          "sourceLabel": "string",
          "updatedByUserId": 5235
        },
        {
          "sourceType": "string",
          "timestamp": "1958-06-18T09:58:46.623Z",
          "value": "string",
          "sourceId": "string",
          "sourceLabel": "string",
          "updatedByUserId": 3505
        }
      ]
    }
  },
  "location": "<string>"
}
```

---

### Archive a batch of goal targets by ID

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/goal_targets/batch/archive`

**Description:** Archive multiple goal targets in a single batch operation using their IDs.

**Authentication:** oauth2

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    {
      "id": "string"
    },
    {
      "id": "string"
    }
  ]
}
```

---

### Create a batch of goal targets

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/goal_targets/batch/create`

**Description:** Create multiple goal targets in a single batch operation.

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
              "associationCategory": "USER_DEFINED",
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
        "key_0": "<string>"
      },
      "objectWriteTraceId": "<string>"
    }
  ]
}
```

**Success Response (200):**

```json
{
  "completedAt": "1993-11-21T19:15:34.613Z",
  "results": [
    {
      "archived": false,
      "createdAt": "1970-04-19T13:11:47.043Z",
      "id": "string",
      "properties": {
        "key_0": "string",
        "key_1": "string",
        "key_2": "string",
        "key_3": "string"
      },
      "updatedAt": "1967-06-16T07:08:09.505Z",
      "archivedAt": "2010-03-22T16:50:34.273Z",
      "objectWriteTraceId": "string",
      "propertiesWithHistory": {
        "key_0": [
          {
            "sourceType": "string",
            "timestamp": "2025-01-28T12:18:55.823Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 2934
          },
          {
            "sourceType": "string",
            "timestamp": "2024-04-13T21:34:12.610Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 1477
          }
        ],
        "key_1": [
          {
            "sourceType": "string",
            "timestamp": "2019-05-25T01:20:00.029Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 791
          },
          {
            "sourceType": "string",
            "timestamp": "1947-11-23T17:07:20.548Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 4126
          }
        ]
      }
    },
    {
      "archived": false,
      "createdAt": "1970-03-28T19:14:19.663Z",
      "id": "string",
      "properties": {
        "key_0": "string"
      },
      "updatedAt": "2019-07-29T07:31:01.229Z",
      "archivedAt": "2018-04-26T00:27:58.298Z",
      "objectWriteTraceId": "string",
      "propertiesWithHistory": {
        "key_0": [
          {
            "sourceType": "string",
            "timestamp": "1992-07-12T22:01:49.257Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 1803
          },
          {
            "sourceType": "string",
            "timestamp": "1968-11-25T19:37:35.117Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 7855
          }
        ],
        "key_1": [
          {
            "sourceType": "string",
            "timestamp": "1980-12-02T06:28:55.571Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 6024
          },
          {
            "sourceType": "string",
            "timestamp": "1980-11-06T09:25:14.093Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 2538
          }
        ],
        "key_2": [
          {
            "sourceType": "string",
            "timestamp": "2022-12-06T21:06:11.447Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 3072
          },
          {
            "sourceType": "string",
            "timestamp": "2020-11-25T15:24:16.373Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 9295
          }
        ]
      }
    }
  ],
  "startedAt": "1956-06-12T07:44:31.293Z",
  "status": "PROCESSING",
  "errors": [
    {
      "category": "string",
      "context": {
        "key_0": [
          "string",
          "string"
        ]
      },
      "errors": [
        {
          "message": "string",
          "code": "string",
          "context": {
            "key_0": [
              "string",
              "string"
            ],
            "key_1": [
              "string",
              "string"
            ],
            "key_2": [
              "string",
              "string"
            ]
          },
          "in": "string",
          "subCategory": "string"
        },
        {
          "message": "string",
          "code": "string",
          "context": {
            "key_0": [
              "string",
              "string"
            ]
          },
          "in": "string",
          "subCategory": "string"
        }
      ],
      "links": {
        "key_0": "string",
        "key_1": "string",
        "key_2": "string",
        "key_3": "string",
        "key_4": "string"
      },
      "message": "string",
      "status": "string",
      "id": "string",
      "subCategory": {}
    },
    {
      "category": "string",
      "context": {
        "key_0": [
          "string",
          "string"
        ],
        "key_1": [
          "string",
          "string"
        ]
      },
      "errors": [
        {
          "message": "string",
          "code": "string",
          "context": {
            "key_0": [
              "string",
              "string"
            ],
            "key_1": [
              "string",
              "string"
            ]
          },
          "in": "string",
          "subCategory": "string"
        },
        {
          "message": "string",
          "code": "string",
          "context": {
            "key_0": [
              "string",
              "string"
            ]
          },
          "in": "string",
          "subCategory": "string"
        }
      ],
      "links": {
        "key_0": "string",
        "key_1": "string",
        "key_2": "string"
      },
      "message": "string",
      "status": "string",
      "id": "string",
      "subCategory": {}
    }
  ],
  "links": {
    "key_0": "string"
  },
  "numErrors": 1611,
  "requestedAt": "2002-03-30T15:47:58.385Z"
}
```

---

### Update a batch of goal targets by internal ID, or unique property values

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/goal_targets/batch/update`

**Description:** Update multiple goal targets in a single batch operation using their internal IDs or unique property values.

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
        "key_1": "<string>"
      },
      "idProperty": "<string>",
      "objectWriteTraceId": "<string>"
    },
    {
      "id": "<string>",
      "properties": {
        "key_0": "<string>",
        "key_1": "<string>"
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
  "completedAt": "1993-11-21T19:15:34.613Z",
  "results": [
    {
      "archived": false,
      "createdAt": "1970-04-19T13:11:47.043Z",
      "id": "string",
      "properties": {
        "key_0": "string",
        "key_1": "string",
        "key_2": "string",
        "key_3": "string"
      },
      "updatedAt": "1967-06-16T07:08:09.505Z",
      "archivedAt": "2010-03-22T16:50:34.273Z",
      "objectWriteTraceId": "string",
      "propertiesWithHistory": {
        "key_0": [
          {
            "sourceType": "string",
            "timestamp": "2025-01-28T12:18:55.823Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 2934
          },
          {
            "sourceType": "string",
            "timestamp": "2024-04-13T21:34:12.610Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 1477
          }
        ],
        "key_1": [
          {
            "sourceType": "string",
            "timestamp": "2019-05-25T01:20:00.029Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 791
          },
          {
            "sourceType": "string",
            "timestamp": "1947-11-23T17:07:20.548Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 4126
          }
        ]
      }
    },
    {
      "archived": false,
      "createdAt": "1970-03-28T19:14:19.663Z",
      "id": "string",
      "properties": {
        "key_0": "string"
      },
      "updatedAt": "2019-07-29T07:31:01.229Z",
      "archivedAt": "2018-04-26T00:27:58.298Z",
      "objectWriteTraceId": "string",
      "propertiesWithHistory": {
        "key_0": [
          {
            "sourceType": "string",
            "timestamp": "1992-07-12T22:01:49.257Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 1803
          },
          {
            "sourceType": "string",
            "timestamp": "1968-11-25T19:37:35.117Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 7855
          }
        ],
        "key_1": [
          {
            "sourceType": "string",
            "timestamp": "1980-12-02T06:28:55.571Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 6024
          },
          {
            "sourceType": "string",
            "timestamp": "1980-11-06T09:25:14.093Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 2538
          }
        ],
        "key_2": [
          {
            "sourceType": "string",
            "timestamp": "2022-12-06T21:06:11.447Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 3072
          },
          {
            "sourceType": "string",
            "timestamp": "2020-11-25T15:24:16.373Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 9295
          }
        ]
      }
    }
  ],
  "startedAt": "1956-06-12T07:44:31.293Z",
  "status": "PROCESSING",
  "errors": [
    {
      "category": "string",
      "context": {
        "key_0": [
          "string",
          "string"
        ]
      },
      "errors": [
        {
          "message": "string",
          "code": "string",
          "context": {
            "key_0": [
              "string",
              "string"
            ],
            "key_1": [
              "string",
              "string"
            ],
            "key_2": [
              "string",
              "string"
            ]
          },
          "in": "string",
          "subCategory": "string"
        },
        {
          "message": "string",
          "code": "string",
          "context": {
            "key_0": [
              "string",
              "string"
            ]
          },
          "in": "string",
          "subCategory": "string"
        }
      ],
      "links": {
        "key_0": "string",
        "key_1": "string",
        "key_2": "string",
        "key_3": "string",
        "key_4": "string"
      },
      "message": "string",
      "status": "string",
      "id": "string",
      "subCategory": {}
    },
    {
      "category": "string",
      "context": {
        "key_0": [
          "string",
          "string"
        ],
        "key_1": [
          "string",
          "string"
        ]
      },
      "errors": [
        {
          "message": "string",
          "code": "string",
          "context": {
            "key_0": [
              "string",
              "string"
            ],
            "key_1": [
              "string",
              "string"
            ]
          },
          "in": "string",
          "subCategory": "string"
        },
        {
          "message": "string",
          "code": "string",
          "context": {
            "key_0": [
              "string",
              "string"
            ]
          },
          "in": "string",
          "subCategory": "string"
        }
      ],
      "links": {
        "key_0": "string",
        "key_1": "string",
        "key_2": "string"
      },
      "message": "string",
      "status": "string",
      "id": "string",
      "subCategory": {}
    }
  ],
  "links": {
    "key_0": "string"
  },
  "numErrors": 1611,
  "requestedAt": "2002-03-30T15:47:58.385Z"
}
```

---

### Create or update a batch of goal targets by unique property values

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/goal_targets/batch/upsert`

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
            "sourceType": "string",
            "timestamp": "2002-03-22T21:13:15.737Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 923
          },
          {
            "sourceType": "string",
            "timestamp": "2020-08-08T08:41:45.054Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 6810
          }
        ]
      }
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
            "sourceType": "string",
            "timestamp": "1984-05-30T18:01:58.244Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 8542
          },
          {
            "sourceType": "string",
            "timestamp": "1965-02-25T18:24:37.203Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 3904
          }
        ],
        "key_1": [
          {
            "sourceType": "string",
            "timestamp": "1983-04-23T04:39:20.558Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 7554
          },
          {
            "sourceType": "string",
            "timestamp": "1967-04-03T10:26:01.592Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 7186
          }
        ]
      }
    }
  ],
  "startedAt": "<dateTime>",
  "status": "COMPLETE",
  "errors": [
    {
      "category": "string",
      "context": {
        "key_0": [
          "string",
          "string"
        ],
        "key_1": [
          "string",
          "string"
        ],
        "key_2": [
          "string",
          "string"
        ],
        "key_3": [
          "string",
          "string"
        ]
      },
      "errors": [
        {
          "message": "string",
          "code": "string",
          "context": {
            "key_0": [
              "string",
              "string"
            ],
            "key_1": [
              "string",
              "string"
            ],
            "key_2": [
              "string",
              "string"
            ]
          },
          "in": "string",
          "subCategory": "string"
        },
        {
          "message": "string",
          "code": "string",
          "context": {
            "key_0": [
              "string",
              "string"
            ],
            "key_1": [
              "string",
              "string"
            ]
          },
          "in": "string",
          "subCategory": "string"
        }
      ],
      "links": {
        "key_0": "string",
        "key_1": "string"
      },
      "message": "string",
      "status": "string",
      "id": "string",
      "subCategory": {}
    },
    {
      "category": "string",
      "context": {
        "key_0": [
          "string",
          "string"
        ]
      },
      "errors": [
        {
          "message": "string",
          "code": "string",
          "context": {
            "key_0": [
              "string",
              "string"
            ],
            "key_1": [
              "string",
              "string"
            ]
          },
          "in": "string",
          "subCategory": "string"
        },
        {
          "message": "string",
          "code": "string",
          "context": {
            "key_0": [
              "string",
              "string"
            ]
          },
          "in": "string",
          "subCategory": "string"
        }
      ],
      "links": {
        "key_0": "string"
      },
      "message": "string",
      "status": "string",
      "id": "string",
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

### Delete a goal target by ID

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/crm/v3/objects/goal_targets/:goalTargetId`

**Description:** Delete a goal target by `{goalTargetId}` to the recycling bin.

**Authentication:** oauth2

**Path Variables:**

- `goalTargetId`: (Required) 

**Headers:**


---

### Update

**Method:** `PATCH`

**URL:** `https://api.hubapi.com/crm/v3/objects/goal_targets/:goalTargetId?idProperty=<string>`

**Description:** Perform a partial update of an Object identified by `{goalTargetId}`or optionally a unique property value as specified by the `idProperty` query param. `{goalTargetId}` refers to the internal object ID by default, and the `idProperty` query param refers to a property whose values are unique for the object. Provided property values will be overwritten. Read-only and non-existent properties will result in an error. Properties values can be cleared by passing an empty string.

**Authentication:** oauth2

**Path Variables:**

- `goalTargetId`: (Required) 

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
  "archived": false,
  "createdAt": "1952-03-08T18:39:31.743Z",
  "id": "string",
  "properties": {
    "key_0": "string",
    "key_1": "string",
    "key_2": "string"
  },
  "updatedAt": "1970-02-01T23:53:50.150Z",
  "archivedAt": "2009-10-05T09:50:03.874Z",
  "objectWriteTraceId": "string",
  "propertiesWithHistory": {
    "key_0": [
      {
        "sourceType": "string",
        "timestamp": "1980-04-30T20:33:30.710Z",
        "value": "string",
        "sourceId": "string",
        "sourceLabel": "string",
        "updatedByUserId": 9111
      },
      {
        "sourceType": "string",
        "timestamp": "1973-05-29T15:16:19.364Z",
        "value": "string",
        "sourceId": "string",
        "sourceLabel": "string",
        "updatedByUserId": 2035
      }
    ]
  }
}
```

---

