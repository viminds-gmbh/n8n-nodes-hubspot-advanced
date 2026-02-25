# Users API

Total endpoints: 11

---

### Read a batch of users by internal ID, or unique property values

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/users/batch/read?archived=false`

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
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "Ut_e9": "<string>",
        "commodo_d2_": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archived": "<boolean>",
      "archivedAt": "<dateTime>",
      "propertiesWithHistory": {
        "velit_a8": [
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
        "fugiat_2": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archived": "<boolean>",
      "archivedAt": "<dateTime>",
      "propertiesWithHistory": {
        "magna_273": [
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
        "sunt_3": [
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
  "startedAt": "<dateTime>",
  "status": "PENDING",
  "requestedAt": "<dateTime>",
  "links": {
    "commodo_c": "<string>",
    "mollit__8a": "<string>"
  }
}
```

---

### Read

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/objects/users/:userId?properties=<string>&properties=<string>&propertiesWithHistory=<string>&propertiesWithHistory=<string>&associations=<string>&associations=<string>&archived=false&idProperty=<string>`

**Description:** Read an Object identified by `{userId}`. `{userId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.

**Authentication:** oauth2

**Path Variables:**

- `userId`: (Required) 

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
    "aliqua_2": "<string>",
    "voluptate57f": "<string>",
    "est_96": "<string>"
  },
  "updatedAt": "<dateTime>",
  "associations": {
    "sed_59": {
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
    "enim_4e": {
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
    "pariatur7": [
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
    "tempord": [
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
    "qui_b": [
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

**URL:** `https://api.hubapi.com/crm/v3/objects/users?limit=10&after=<string>&properties=<string>&properties=<string>&propertiesWithHistory=<string>&propertiesWithHistory=<string>&associations=<string>&associations=<string>&archived=false`

**Description:** Read a page of users. Control what is returned via the `properties` query param.

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
        "dolor_8": "<string>"
      },
      "updatedAt": "<dateTime>",
      "associations": {
        "Loremf6": {
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
        "sed_1": {
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
        "anim_ed0": {
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
        "laboris_88": {
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
        "sint6": {
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
        "tempor7f7": [
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
        "laborum2b": [
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
        "deserunt0_f": [
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
        "et79": "<string>",
        "est5": "<string>",
        "cillum81": "<string>"
      },
      "updatedAt": "<dateTime>",
      "associations": {
        "magnaf": {
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
        "officia_f2": {
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
        "sit235": [
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
        "quib17": [
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

### post-/crm/v3/objects/users/search

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/users/search`

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
          "operator": "GT",
          "propertyName": "<string>",
          "highValue": "<string>",
          "values": [
            "<string>",
            "<string>"
          ],
          "value": "<string>"
        },
        {
          "operator": "BETWEEN",
          "propertyName": "<string>",
          "highValue": "<string>",
          "values": [
            "<string>",
            "<string>"
          ],
          "value": "<string>"
        }
      ]
    },
    {
      "filters": [
        {
          "operator": "LTE",
          "propertyName": "<string>",
          "highValue": "<string>",
          "values": [
            "<string>",
            "<string>"
          ],
          "value": "<string>"
        },
        {
          "operator": "EQ",
          "propertyName": "<string>",
          "highValue": "<string>",
          "values": [
            "<string>",
            "<string>"
          ],
          "value": "<string>"
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
        "enime": "<string>",
        "ipsumb": "<string>",
        "Ut_55": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archived": "<boolean>",
      "archivedAt": "<dateTime>",
      "propertiesWithHistory": {
        "amet_93f": [
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
        "amet_6": "<string>",
        "adipisicing767": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archived": "<boolean>",
      "archivedAt": "<dateTime>",
      "propertiesWithHistory": {
        "irure39c": [
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

### Create

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/users`

**Description:** Create a user with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard users is provided.

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
          "associationCategory": "HUBSPOT_DEFINED",
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
    "createdAt": "2022-11-30T09:16:59.138Z",
    "id": "string",
    "properties": {
      "key_0": "string",
      "key_1": "string",
      "key_2": "string",
      "key_3": "string"
    },
    "updatedAt": "2024-05-17T10:45:04.199Z",
    "archivedAt": "1992-08-20T04:30:58.293Z",
    "objectWriteTraceId": "string",
    "propertiesWithHistory": {
      "key_0": [
        {
          "sourceType": "string",
          "timestamp": "2024-12-13T07:25:45.108Z",
          "value": "string",
          "sourceId": "string",
          "sourceLabel": "string",
          "updatedByUserId": 5444
        },
        {
          "sourceType": "string",
          "timestamp": "1968-05-30T06:56:33.697Z",
          "value": "string",
          "sourceId": "string",
          "sourceLabel": "string",
          "updatedByUserId": 1063
        }
      ],
      "key_1": [
        {
          "sourceType": "string",
          "timestamp": "1996-09-18T20:28:23.515Z",
          "value": "string",
          "sourceId": "string",
          "sourceLabel": "string",
          "updatedByUserId": 1378
        },
        {
          "sourceType": "string",
          "timestamp": "1995-07-24T15:21:52.305Z",
          "value": "string",
          "sourceId": "string",
          "sourceLabel": "string",
          "updatedByUserId": 3631
        }
      ]
    }
  },
  "location": "<string>"
}
```

---

### Archive a batch of users by ID

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/users/batch/archive`

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

### Create a batch of users

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/users/batch/create`

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
        "key_0": "<string>"
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
  "completedAt": "1976-08-21T03:07:11.122Z",
  "results": [
    {
      "archived": true,
      "createdAt": "2007-02-07T04:29:39.766Z",
      "id": "string",
      "properties": {
        "key_0": "string",
        "key_1": "string"
      },
      "updatedAt": "2024-02-18T02:27:43.593Z",
      "archivedAt": "2017-01-16T19:07:08.379Z",
      "objectWriteTraceId": "string",
      "propertiesWithHistory": {
        "key_0": [
          {
            "sourceType": "string",
            "timestamp": "1990-08-02T10:04:15.056Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 9169
          },
          {
            "sourceType": "string",
            "timestamp": "1985-08-20T21:41:28.007Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 9268
          }
        ],
        "key_1": [
          {
            "sourceType": "string",
            "timestamp": "1965-06-28T05:24:46.194Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 1510
          },
          {
            "sourceType": "string",
            "timestamp": "1993-03-10T17:48:31.668Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 1872
          }
        ]
      }
    },
    {
      "archived": false,
      "createdAt": "1965-11-20T20:00:12.335Z",
      "id": "string",
      "properties": {
        "key_0": "string",
        "key_1": "string",
        "key_2": "string",
        "key_3": "string"
      },
      "updatedAt": "2018-04-22T17:49:22.684Z",
      "archivedAt": "2020-04-30T00:13:10.984Z",
      "objectWriteTraceId": "string",
      "propertiesWithHistory": {
        "key_0": [
          {
            "sourceType": "string",
            "timestamp": "1992-06-07T22:35:23.228Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 416
          },
          {
            "sourceType": "string",
            "timestamp": "1999-08-29T15:55:03.975Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 4482
          }
        ],
        "key_1": [
          {
            "sourceType": "string",
            "timestamp": "1949-10-10T22:17:43.480Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 802
          },
          {
            "sourceType": "string",
            "timestamp": "2004-06-11T16:02:19.237Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 6318
          }
        ]
      }
    }
  ],
  "startedAt": "2022-06-15T16:10:58.719Z",
  "status": "CANCELED",
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
        "key_1": "string",
        "key_2": "string",
        "key_3": "string"
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
    "key_0": "string",
    "key_1": "string"
  },
  "numErrors": 2000,
  "requestedAt": "1950-02-07T08:10:25.199Z"
}
```

---

### Update a batch of users by internal ID, or unique property values

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/users/batch/update`

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
        "key_2": "<string>"
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
  "completedAt": "1976-08-21T03:07:11.122Z",
  "results": [
    {
      "archived": true,
      "createdAt": "2007-02-07T04:29:39.766Z",
      "id": "string",
      "properties": {
        "key_0": "string",
        "key_1": "string"
      },
      "updatedAt": "2024-02-18T02:27:43.593Z",
      "archivedAt": "2017-01-16T19:07:08.379Z",
      "objectWriteTraceId": "string",
      "propertiesWithHistory": {
        "key_0": [
          {
            "sourceType": "string",
            "timestamp": "1990-08-02T10:04:15.056Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 9169
          },
          {
            "sourceType": "string",
            "timestamp": "1985-08-20T21:41:28.007Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 9268
          }
        ],
        "key_1": [
          {
            "sourceType": "string",
            "timestamp": "1965-06-28T05:24:46.194Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 1510
          },
          {
            "sourceType": "string",
            "timestamp": "1993-03-10T17:48:31.668Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 1872
          }
        ]
      }
    },
    {
      "archived": false,
      "createdAt": "1965-11-20T20:00:12.335Z",
      "id": "string",
      "properties": {
        "key_0": "string",
        "key_1": "string",
        "key_2": "string",
        "key_3": "string"
      },
      "updatedAt": "2018-04-22T17:49:22.684Z",
      "archivedAt": "2020-04-30T00:13:10.984Z",
      "objectWriteTraceId": "string",
      "propertiesWithHistory": {
        "key_0": [
          {
            "sourceType": "string",
            "timestamp": "1992-06-07T22:35:23.228Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 416
          },
          {
            "sourceType": "string",
            "timestamp": "1999-08-29T15:55:03.975Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 4482
          }
        ],
        "key_1": [
          {
            "sourceType": "string",
            "timestamp": "1949-10-10T22:17:43.480Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 802
          },
          {
            "sourceType": "string",
            "timestamp": "2004-06-11T16:02:19.237Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 6318
          }
        ]
      }
    }
  ],
  "startedAt": "2022-06-15T16:10:58.719Z",
  "status": "CANCELED",
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
        "key_1": "string",
        "key_2": "string",
        "key_3": "string"
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
    "key_0": "string",
    "key_1": "string"
  },
  "numErrors": 2000,
  "requestedAt": "1950-02-07T08:10:25.199Z"
}
```

---

### Create or update a batch of users by unique property values

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/users/batch/upsert`

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
        "key_0": "<string>",
        "key_1": "<string>",
        "key_2": "<string>",
        "key_3": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archivedAt": "<dateTime>",
      "objectWriteTraceId": "<string>",
      "propertiesWithHistory": {
        "key_0": [
          {
            "sourceType": "string",
            "timestamp": "1980-04-16T15:33:29.733Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 2815
          },
          {
            "sourceType": "string",
            "timestamp": "1987-05-19T10:07:42.032Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 6870
          }
        ],
        "key_1": [
          {
            "sourceType": "string",
            "timestamp": "1987-10-21T23:28:10.145Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 5262
          },
          {
            "sourceType": "string",
            "timestamp": "1976-03-26T08:33:50.043Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 8280
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
            "timestamp": "2007-11-17T08:39:18.776Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 5906
          },
          {
            "sourceType": "string",
            "timestamp": "1998-01-12T21:55:06.387Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 9091
          }
        ],
        "key_1": [
          {
            "sourceType": "string",
            "timestamp": "2000-05-23T07:02:05.729Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 4232
          },
          {
            "sourceType": "string",
            "timestamp": "1993-02-16T04:08:22.797Z",
            "value": "string",
            "sourceId": "string",
            "sourceLabel": "string",
            "updatedByUserId": 62
          }
        ]
      }
    }
  ],
  "startedAt": "<dateTime>",
  "status": "PENDING",
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
            ],
            "key_2": [
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
    "key_0": "<string>"
  },
  "numErrors": "<integer>",
  "requestedAt": "<dateTime>"
}
```

---

### Archive

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/crm/v3/objects/users/:userId`

**Description:** Move an Object identified by `{userId}` to the recycling bin.

**Authentication:** oauth2

**Path Variables:**

- `userId`: (Required) 

**Headers:**


---

### Update

**Method:** `PATCH`

**URL:** `https://api.hubapi.com/crm/v3/objects/users/:userId?idProperty=<string>`

**Description:** Perform a partial update of an Object identified by `{userId}`or optionally a unique property value as specified by the `idProperty` query param. `{userId}` refers to the internal object ID by default, and the `idProperty` query param refers to a property whose values are unique for the object. Provided property values will be overwritten. Read-only and non-existent properties will result in an error. Properties values can be cleared by passing an empty string.

**Authentication:** oauth2

**Path Variables:**

- `userId`: (Required) 

**Query Parameters:**

- `idProperty`: The name of a property whose values are unique for this object

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "properties": {
    "key_0": "<string>",
    "key_1": "<string>",
    "key_2": "<string>"
  }
}
```

**Success Response (200):**

```json
{
  "archived": true,
  "createdAt": "2019-06-28T02:51:31.064Z",
  "id": "string",
  "properties": {
    "key_0": "string"
  },
  "updatedAt": "1998-09-28T23:39:28.571Z",
  "archivedAt": "1973-02-27T09:34:16.721Z",
  "objectWriteTraceId": "string",
  "propertiesWithHistory": {
    "key_0": [
      {
        "sourceType": "string",
        "timestamp": "1956-02-01T13:08:34.396Z",
        "value": "string",
        "sourceId": "string",
        "sourceLabel": "string",
        "updatedByUserId": 9182
      },
      {
        "sourceType": "string",
        "timestamp": "2022-06-04T00:57:39.398Z",
        "value": "string",
        "sourceId": "string",
        "sourceLabel": "string",
        "updatedByUserId": 2073
      }
    ],
    "key_1": [
      {
        "sourceType": "string",
        "timestamp": "1999-05-18T03:50:16.118Z",
        "value": "string",
        "sourceId": "string",
        "sourceLabel": "string",
        "updatedByUserId": 6957
      },
      {
        "sourceType": "string",
        "timestamp": "1970-12-12T05:03:01.101Z",
        "value": "string",
        "sourceId": "string",
        "sourceLabel": "string",
        "updatedByUserId": 6798
      }
    ],
    "key_2": [
      {
        "sourceType": "string",
        "timestamp": "1994-05-12T07:11:21.100Z",
        "value": "string",
        "sourceId": "string",
        "sourceLabel": "string",
        "updatedByUserId": 339
      },
      {
        "sourceType": "string",
        "timestamp": "2009-05-02T09:18:34.455Z",
        "value": "string",
        "sourceId": "string",
        "sourceLabel": "string",
        "updatedByUserId": 6500
      }
    ]
  }
}
```

---

