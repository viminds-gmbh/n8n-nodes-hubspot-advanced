# Contacts API

Total endpoints: 13

---

### Archive a batch of contacts

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/contacts/batch/archive`

**Authentication:** oauth2

**Headers:**

- `Content-Type`: application/json

---

### Update a batch of contacts

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/contacts/batch/update`

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
        "proidentc1": "<string>",
        "dolore81": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "non0": [
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
        "adipisicing2e": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "do5_3": [
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
  "status": "COMPLETE",
  "requestedAt": "<dateTime>",
  "links": {
    "incididunt_dd1": "<string>",
    "qui_9": "<string>"
  }
}
```

---

### Create a batch of contacts

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/contacts/batch/create`

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
      ],
      "properties": {
        "Duis_0": "<string>",
        "commodo36": "<string>",
        "utdf": "<string>"
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
              "associationCategory": "USER_DEFINED",
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
        "ullamcof24": "<string>"
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
        "proidentc1": "<string>",
        "dolore81": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "non0": [
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
        "adipisicing2e": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "do5_3": [
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
  "status": "COMPLETE",
  "requestedAt": "<dateTime>",
  "links": {
    "incididunt_dd1": "<string>",
    "qui_9": "<string>"
  }
}
```

---

### Retrieve a batch of contacts

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/contacts/batch/read?archived=false`

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
        "proidentc1": "<string>",
        "dolore81": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "non0": [
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
        "adipisicing2e": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "do5_3": [
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
  "status": "COMPLETE",
  "requestedAt": "<dateTime>",
  "links": {
    "incididunt_dd1": "<string>",
    "qui_9": "<string>"
  }
}
```

---

### Retrieve contacts

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/objects/contacts?limit=10&after=<string>&properties=<string>&properties=<string>&propertiesWithHistory=<string>&propertiesWithHistory=<string>&associations=<string>&associations=<string>&archived=false`

**Description:** Read a page of contacts. Control what is returned via the `properties` query param.

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
        "Utc": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "veniam_24": [
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
        "ullamco0": {
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
        "voluptateb": {
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
        "reprehenderita8e": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "proident_7e1": [
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
        "consequat2d": [
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
        "nullaa4a": {
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
        "culpa30": {
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

### Create a contact

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/contacts`

**Description:** Create a contact with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard contacts is provided.

**Authentication:** oauth2

**Headers:**

- `Content-Type`: application/json

**Success Response (201):**

```json
{
  "createdAt": "<dateTime>",
  "id": "<string>",
  "properties": {
    "dolor60": "<string>",
    "occaecat_aa": "<string>"
  },
  "updatedAt": "<dateTime>",
  "propertiesWithHistory": {
    "sed96": [
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
    "sita5f": [
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

### Retrieve a contact

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/objects/contacts/:contactId?properties=<string>&properties=<string>&propertiesWithHistory=<string>&propertiesWithHistory=<string>&associations=<string>&associations=<string>&archived=false&idProperty=<string>`

**Description:** Read an Object identified by `{contactId}`. `{contactId}` refers to the internal object ID.  Control what is returned via the `properties` query param.

**Authentication:** oauth2

**Path Variables:**

- `contactId`: No description

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
    "qui_8": "<string>"
  },
  "updatedAt": "<dateTime>",
  "propertiesWithHistory": {
    "proident_f": [
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
    "etc": {
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

### Archive a contact

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/crm/v3/objects/contacts/:contactId`

**Description:** Move an Object identified by `{contactId}` to the recycling bin.

**Authentication:** oauth2

**Path Variables:**

- `contactId`: No description

**Headers:**


---

### Update a contact

**Method:** `PATCH`

**URL:** `https://api.hubapi.com/crm/v3/objects/contacts/:contactId?idProperty=<string>`

**Description:** Perform a partial update of an Object identified by `{contactId}`. `{contactId}` refers to the internal object ID. Provided property values will be overwritten. Read-only and non-existent properties will be ignored. Properties values can be cleared by passing an empty string.

**Authentication:** oauth2

**Path Variables:**

- `contactId`: No description

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
    "dolor60": "<string>",
    "occaecat_aa": "<string>"
  },
  "updatedAt": "<dateTime>",
  "propertiesWithHistory": {
    "sed96": [
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
    "sita5f": [
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

### Search for contacts

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/contacts/search`

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
        "adipisicing3a": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "dolor163": [
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
        "Duis_eb3": "<string>",
        "esse_4": "<string>",
        "cillum_d": "<string>"
      },
      "updatedAt": "<dateTime>",
      "propertiesWithHistory": {
        "laboris_7": [
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
        "reprehenderit3": [
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

### Create or update a batch of contacts

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/contacts/batch/upsert`

**Description:** Create or update records identified by a unique property value as specified by the `idProperty` query param. `idProperty` query param refers to a property whose values are unique for the object.

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
      "new": "<boolean>",
      "properties": {
        "dolore7c": "<string>",
        "voluptate_69": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archived": "<boolean>",
      "archivedAt": "<dateTime>",
      "propertiesWithHistory": {
        "temporc82": [
          {
            "sourceType": "voluptate velit fugiat enim",
            "timestamp": "1973-04-22T10:14:50.399Z",
            "value": "eu elit mollit dolore",
            "sourceId": "officia aute qui non ex",
            "sourceLabel": "cons",
            "updatedByUserId": 92559225
          },
          {
            "sourceType": "dolore occaecat reprehenderit",
            "timestamp": "1964-09-03T09:26:32.629Z",
            "value": "elit cillum",
            "sourceId": "aliquip sunt in",
            "sourceLabel": "eu",
            "updatedByUserId": -19945934
          }
        ],
        "quis_6": [
          {
            "sourceType": "sint Ut",
            "timestamp": "1952-07-18T17:48:57.990Z",
            "value": "quis nostrud laboris",
            "sourceId": "ad labor",
            "sourceLabel": "sit tempor in",
            "updatedByUserId": -15442249
          },
          {
            "sourceType": "dolore dolor culpa",
            "timestamp": "1978-09-19T05:01:41.518Z",
            "value": "veniam nisi dolor do",
            "sourceId": "ea sint cu",
            "sourceLabel": "pariatur nostrud nulla",
            "updatedByUserId": -90970341
          }
        ],
        "voluptate_4e6": [
          {
            "sourceType": "enim voluptate eu ",
            "timestamp": "1989-05-31T18:01:37.497Z",
            "value": "ex in ut velit te",
            "sourceId": "tempor ut",
            "sourceLabel": "quis aute Ut",
            "updatedByUserId": 54570308
          },
          {
            "sourceType": "quis adipisicing nisi",
            "timestamp": "2007-01-02T23:21:49.154Z",
            "value": "pariat",
            "sourceId": "sit commodo e",
            "sourceLabel": "consequat eiusmod est ad",
            "updatedByUserId": -68124366
          }
        ],
        "sunt1": [
          {
            "sourceType": "eiusmod dolore incidid",
            "timestamp": "2020-05-30T10:50:58.292Z",
            "value": "tempor ",
            "sourceId": "cillum dolore ullamco id",
            "sourceLabel": "commodo labore",
            "updatedByUserId": -54971555
          },
          {
            "sourceType": "ex nostrud sit",
            "timestamp": "1996-05-21T14:20:14.493Z",
            "value": "reprehenderit dolore ut deserunt",
            "sourceId": "Excepteur dolore in aute",
            "sourceLabel": "mollit",
            "updatedByUserId": -55154396
          }
        ],
        "adipisicing0": [
          {
            "sourceType": "Excepteur eu in",
            "timestamp": "2022-12-18T15:13:42.165Z",
            "value": "cillum consectetur",
            "sourceId": "in magna amet",
            "sourceLabel": "ad tempor sunt voluptate",
            "updatedByUserId": 32219700
          },
          {
            "sourceType": "culpa dolore mollit irure",
            "timestamp": "1947-06-16T15:38:48.046Z",
            "value": "dolore dolor ut incididunt veniam",
            "sourceId": "laborum adipisicing d",
            "sourceLabel": "irure eiusmod Duis",
            "updatedByUserId": -94971010
          }
        ]
      }
    },
    {
      "createdAt": "<dateTime>",
      "id": "<string>",
      "new": "<boolean>",
      "properties": {
        "commodo_12f": "<string>",
        "consectetur_8_5": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archived": "<boolean>",
      "archivedAt": "<dateTime>",
      "propertiesWithHistory": {
        "proident_4e": [
          {
            "sourceType": "Lorem dolor dolor incididunt ullamco",
            "timestamp": "2011-10-28T03:30:16.189Z",
            "value": "ut dolor aute",
            "sourceId": "mollit Ut ",
            "sourceLabel": "quis cillum cupidatat aute",
            "updatedByUserId": -48743563
          },
          {
            "sourceType": "aute",
            "timestamp": "1964-12-23T06:37:31.070Z",
            "value": "officia",
            "sourceId": "veniam dolor Excepteur",
            "sourceLabel": "est commodo",
            "updatedByUserId": -17142723
          }
        ],
        "dolore_5f7": [
          {
            "sourceType": "reprehenderit Excepteur ut et",
            "timestamp": "1989-10-27T15:22:34.628Z",
            "value": "exercitation officia dolor",
            "sourceId": "ut consectetur minim proident culpa",
            "sourceLabel": "qui non reprehenderit c",
            "updatedByUserId": -76130178
          },
          {
            "sourceType": "cillum",
            "timestamp": "1988-12-11T03:42:54.930Z",
            "value": "incididunt a",
            "sourceId": "cillum elit dolor",
            "sourceLabel": "anim deserunt labore ut ad",
            "updatedByUserId": -52565147
          }
        ],
        "aliquip_9ac": [
          {
            "sourceType": "sint quis dolor",
            "timestamp": "1947-02-20T05:10:52.699Z",
            "value": "ex mollit Lorem",
            "sourceId": "o",
            "sourceLabel": "id in ut ex",
            "updatedByUserId": 43402611
          },
          {
            "sourceType": "eu deserunt",
            "timestamp": "2010-11-22T11:51:05.431Z",
            "value": "laborum",
            "sourceId": "sed incididunt",
            "sourceLabel": "cupidatat pariat",
            "updatedByUserId": 62968261
          }
        ],
        "aute_4": [
          {
            "sourceType": "qui",
            "timestamp": "1995-06-30T22:20:59.888Z",
            "value": "laborum cupidatat conseq",
            "sourceId": "ea voluptate",
            "sourceLabel": "quis minim elit dolor ea",
            "updatedByUserId": -5111887
          },
          {
            "sourceType": "incididunt eiusmod pariatur qui in",
            "timestamp": "2008-03-14T04:56:20.494Z",
            "value": "sint deserunt",
            "sourceId": "nisi ",
            "sourceLabel": "Excepteur in",
            "updatedByUserId": -25202986
          }
        ]
      }
    }
  ],
  "startedAt": "<dateTime>",
  "status": "PENDING",
  "requestedAt": "<dateTime>",
  "links": {
    "consectetur4": "<string>",
    "Duis_594": "<string>",
    "dolorea35": "<string>",
    "veniam_bc8": "<string>"
  }
}
```

---

### Merge two contacts

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/contacts/merge`

**Description:** Merge two contact records. Learn more about [merging records](https://knowledge.hubspot.com/records/merge-records). 

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
  "createdAt": "2022-10-07T12:15:22.375Z",
  "id": "amet veniam reprehenderit aute",
  "properties": {
    "incididuntcf": "dolore",
    "laboris_7": "culpa voluptate"
  },
  "updatedAt": "2016-01-01T19:31:06.695Z",
  "archived": true,
  "archivedAt": "1952-11-06T10:23:27.468Z",
  "propertiesWithHistory": {
    "irure_e2": [
      {
        "sourceType": "adipisicing tempor velit",
        "timestamp": "1978-08-11T06:43:48.641Z",
        "value": "qui do",
        "sourceId": "Excepteur ut fugiat",
        "sourceLabel": "nostrud nulla sed dolor",
        "updatedByUserId": 39472930
      },
      {
        "sourceType": "ex",
        "timestamp": "2002-07-05T18:37:59.807Z",
        "value": "dolor amet adipi",
        "sourceId": "velit minim mollit nulla",
        "sourceLabel": "velit quis nostrud incididu",
        "updatedByUserId": 67901673
      }
    ]
  },
  "objectWriteTraceId": "deserunt in aliqua"
}
```

---

### Permanently delete a contact (GDPR-compliant)

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/contacts/gdpr-delete`

**Description:** Permanently delete a contact and all associated content to follow GDPR. Use optional property `idProperty` set to `email` to identify contact by email address. If email address is not found, the email address will be added to a blocklist and prevent it from being used in the future. Learn more about [permanently deleting contacts](https://knowledge.hubspot.com/privacy-and-consent/how-do-i-perform-a-gdpr-delete-in-hubspot).

**Authentication:** oauth2

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "objectId": "<string>",
  "idProperty": "<string>"
}
```

---

