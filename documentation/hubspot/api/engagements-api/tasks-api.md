# Tasks API

Total endpoints: 11

---

### Archive a batch of tasks by ID

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/tasks/batch/archive`

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

### Create a batch of tasks

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/tasks/batch/create`

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
        "magna_07": "<string>"
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
        "aliqua_8": "<string>"
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
        "do_21": "<string>",
        "deserunt_753": "<string>",
        "ina1": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "adipisicing_d1a": [
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
        "laborum_09": [
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
        "cupidatat2": [
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
        "dolore__ea": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "ullamcoaa": [
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
  "status": "PENDING",
  "requestedAt": "<dateTime>",
  "links": {
    "officia_64": "<string>",
    "eud": "<string>"
  }
}
```

---

### Update a batch of tasks by internal ID, or unique property values

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/tasks/batch/update`

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
        "do_21": "<string>",
        "deserunt_753": "<string>",
        "ina1": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "adipisicing_d1a": [
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
        "laborum_09": [
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
        "cupidatat2": [
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
        "dolore__ea": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "ullamcoaa": [
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
  "status": "PENDING",
  "requestedAt": "<dateTime>",
  "links": {
    "officia_64": "<string>",
    "eud": "<string>"
  }
}
```

---

### Read a batch of tasks by internal ID, or unique property values

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/tasks/batch/read?archived=false`

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
        "do_21": "<string>",
        "deserunt_753": "<string>",
        "ina1": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "adipisicing_d1a": [
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
        "laborum_09": [
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
        "cupidatat2": [
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
        "dolore__ea": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "ullamcoaa": [
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
  "status": "PENDING",
  "requestedAt": "<dateTime>",
  "links": {
    "officia_64": "<string>",
    "eud": "<string>"
  }
}
```

---

### Read

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/objects/tasks/:taskId?properties=<string>&properties=<string>&propertiesWithHistory=<string>&propertiesWithHistory=<string>&associations=<string>&associations=<string>&archived=false&idProperty=<string>`

**Description:** Read an Object identified by `{taskId}`. `{taskId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.

**Authentication:** oauth2

**Path Variables:**

- `taskId`: No description

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
    "aliquip_0b4": "<string>",
    "dolore_8ed": "<string>",
    "amet51e": "<string>",
    "in_7": "<string>",
    "ea9": "<string>"
  },
  "updatedAt": "<dateTime>",
  "propertiesWithHistory": {
    "dolor_00": [
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
    "mollit_f": [
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
    "laborum_d_": {
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
    "Duis_3": {
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
    "consectetur_05d": {
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

**URL:** `https://api.hubapi.com/crm/v3/objects/tasks/:taskId`

**Description:** Move an Object identified by `{taskId}` to the recycling bin.

**Authentication:** oauth2

**Path Variables:**

- `taskId`: No description

**Headers:**


---

### Update

**Method:** `PATCH`

**URL:** `https://api.hubapi.com/crm/v3/objects/tasks/:taskId?idProperty=<string>`

**Description:** Perform a partial update of an Object identified by `{taskId}`. `{taskId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param. Provided property values will be overwritten. Read-only and non-existent properties will be ignored. Properties values can be cleared by passing an empty string.

**Authentication:** oauth2

**Path Variables:**

- `taskId`: No description

**Query Parameters:**

- `idProperty`: The name of a property whose values are unique for this object type

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "properties": {
    "laborisab5": "<string>",
    "aliquip8": "<string>"
  }
}
```

**Success Response (200):**

```json
{
  "createdAt": "<dateTime>",
  "id": "<string>",
  "properties": {
    "nulla_13": "<string>",
    "consectetur_333": "<string>",
    "ullamco_63": "<string>"
  },
  "updatedAt": "<dateTime>",
  "propertiesWithHistory": {
    "consectetur__": [
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
    "eiusmode07": [
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
    "commodo_75f": [
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

**URL:** `https://api.hubapi.com/crm/v3/objects/tasks?limit=10&after=<string>&properties=<string>&properties=<string>&propertiesWithHistory=<string>&propertiesWithHistory=<string>&associations=<string>&associations=<string>&archived=false`

**Description:** Read a page of tasks. Control what is returned via the `properties` query param.

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
        "sintf9": "<string>",
        "culpabef": "<string>",
        "incididunt_e": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "mollit7ea": [
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
        "culpa_1": [
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
        "labore_a": {
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
        "quis_21": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "velit_8": [
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
        "consequat_7": {
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
        "id_5": {
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

**URL:** `https://api.hubapi.com/crm/v3/objects/tasks`

**Description:** Create a task with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard tasks is provided.

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
          "associationCategory": "INTEGRATOR_DEFINED",
          "associationTypeId": "<integer>"
        }
      ]
    }
  ],
  "properties": {
    "sit__57": "<string>",
    "eiusmod_3c_": "<string>",
    "cillum_f": "<string>"
  }
}
```

**Success Response (201):**

```json
{
  "createdAt": "<dateTime>",
  "id": "<string>",
  "properties": {
    "nulla_13": "<string>",
    "consectetur_333": "<string>",
    "ullamco_63": "<string>"
  },
  "updatedAt": "<dateTime>",
  "propertiesWithHistory": {
    "consectetur__": [
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
    "eiusmode07": [
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
    "commodo_75f": [
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

### post-/crm/v3/objects/tasks/search do Search

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/tasks/search`

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
        "Ut_": "<string>",
        "nostrud_3b9": "<string>",
        "in__d": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "nullaa": [
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
        "dolore_3": [
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
        "ametb": "<string>",
        "cupidatat6f": "<string>",
        "amet_": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "consequat_44": [
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
        "adf": [
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
        "proident_b": [
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
        "veniam_1": [
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
        "doloref4c": [
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

### Create or update a batch of tasks by unique property values

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/tasks/batch/upsert`

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
  "status": "COMPLETE",
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
        "key_1": "<string>",
        "key_2": "<string>",
        "key_3": "<string>"
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

