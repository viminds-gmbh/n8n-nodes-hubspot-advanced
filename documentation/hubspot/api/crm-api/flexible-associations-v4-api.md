# Flexible Associations V4 API

Total endpoints: 9

---

### Delete Specific Labels

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v4/associations/:fromObjectType/:toObjectType/batch/labels/archive`

**Description:** Batch delete specific association labels for objects. Deleting an unlabeled association will also delete all labeled associations between those two objects

**Authentication:** oauth2

**Path Variables:**

- `fromObjectType`: No description
- `toObjectType`: No description

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    {
      "from": {
        "id": "<string>"
      },
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
      "from": {
        "id": "<string>"
      },
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
  ]
}
```

---

### Read

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v4/associations/:fromObjectType/:toObjectType/batch/read`

**Description:** Batch read associations for objects to specific object type. The 'after' field in a returned paging object  can be added alongside the 'id' to retrieve the next page of associations from that objectId. The 'link' field is deprecated and should be ignored. 

**Authentication:** oauth2

**Path Variables:**

- `fromObjectType`: No description
- `toObjectType`: No description

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    {
      "id": "<string>",
      "after": "<string>"
    },
    {
      "id": "<string>",
      "after": "<string>"
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
      "from": {
        "id": "<string>"
      },
      "to": [
        {
          "associationTypes": [
            {
              "category": "USER_DEFINED",
              "typeId": "<integer>",
              "label": "<string>"
            },
            {
              "category": "USER_DEFINED",
              "typeId": "<integer>",
              "label": "<string>"
            }
          ],
          "toObjectId": "<integer>"
        },
        {
          "associationTypes": [
            {
              "category": "INTEGRATOR_DEFINED",
              "typeId": "<integer>",
              "label": "<string>"
            },
            {
              "category": "USER_DEFINED",
              "typeId": "<integer>",
              "label": "<string>"
            }
          ],
          "toObjectId": "<integer>"
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
    {
      "from": {
        "id": "<string>"
      },
      "to": [
        {
          "associationTypes": [
            {
              "category": "USER_DEFINED",
              "typeId": "<integer>",
              "label": "<string>"
            },
            {
              "category": "HUBSPOT_DEFINED",
              "typeId": "<integer>",
              "label": "<string>"
            }
          ],
          "toObjectId": "<integer>"
        },
        {
          "associationTypes": [
            {
              "category": "INTEGRATOR_DEFINED",
              "typeId": "<integer>",
              "label": "<string>"
            },
            {
              "category": "USER_DEFINED",
              "typeId": "<integer>",
              "label": "<string>"
            }
          ],
          "toObjectId": "<integer>"
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
  ],
  "startedAt": "<dateTime>",
  "status": "CANCELED",
  "requestedAt": "<dateTime>",
  "links": {
    "sita": "<string>"
  }
}
```

---

### Create

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v4/associations/:fromObjectType/:toObjectType/batch/create`

**Description:** Batch create associations for objects

**Authentication:** oauth2

**Path Variables:**

- `fromObjectType`: No description
- `toObjectType`: No description

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    {
      "from": {
        "id": "<string>"
      },
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
      "from": {
        "id": "<string>"
      },
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
  ]
}
```

**Success Response (201):**

```json
{
  "completedAt": "<dateTime>",
  "results": [
    {
      "fromObjectId": "<integer>",
      "fromObjectTypeId": "<string>",
      "labels": [
        "<string>",
        "<string>"
      ],
      "toObjectId": "<integer>",
      "toObjectTypeId": "<string>"
    },
    {
      "fromObjectId": "<integer>",
      "fromObjectTypeId": "<string>",
      "labels": [
        "<string>",
        "<string>"
      ],
      "toObjectId": "<integer>",
      "toObjectTypeId": "<string>"
    }
  ],
  "startedAt": "<dateTime>",
  "status": "PROCESSING",
  "requestedAt": "<dateTime>",
  "links": {
    "ad_99": "<string>",
    "enim_9": "<string>",
    "Ut_2": "<string>"
  }
}
```

---

### Delete

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v4/associations/:fromObjectType/:toObjectType/batch/archive`

**Description:** Batch delete associations for objects

**Authentication:** oauth2

**Path Variables:**

- `fromObjectType`: No description
- `toObjectType`: No description

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    {
      "from": {
        "id": "<string>"
      },
      "to": [
        {
          "id": "<string>"
        },
        {
          "id": "<string>"
        }
      ]
    },
    {
      "from": {
        "id": "<string>"
      },
      "to": [
        {
          "id": "<string>"
        },
        {
          "id": "<string>"
        }
      ]
    }
  ]
}
```

---

###  Create Default Associations

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v4/associations/:fromObjectType/:toObjectType/batch/associate/default`

**Description:** Create the default (most generic) association type between two object types

**Authentication:** oauth2

**Path Variables:**

- `fromObjectType`: No description
- `toObjectType`: No description

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    {
      "from": {
        "id": "<string>"
      },
      "to": {
        "id": "<string>"
      }
    },
    {
      "from": {
        "id": "<string>"
      },
      "to": {
        "id": "<string>"
      }
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
      "associationSpec": {
        "associationCategory": "INTEGRATOR_DEFINED",
        "associationTypeId": "<integer>"
      },
      "from": {
        "id": "<string>"
      },
      "to": {
        "id": "<string>"
      }
    },
    {
      "associationSpec": {
        "associationCategory": "USER_DEFINED",
        "associationTypeId": "<integer>"
      },
      "from": {
        "id": "<string>"
      },
      "to": {
        "id": "<string>"
      }
    }
  ],
  "startedAt": "<dateTime>",
  "status": "CANCELED",
  "numErrors": "<integer>",
  "errors": [
    {
      "category": "<string>",
      "context": {
        "velitff": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "in": "<string>",
          "code": "<string>",
          "subCategory": "<string>",
          "context": {
            "consectetur_c7": [
              "<string>",
              "<string>"
            ],
            "ipsum_23": [
              "<string>",
              "<string>"
            ],
            "essed": [
              "<string>",
              "<string>"
            ]
          }
        },
        {
          "message": "<string>",
          "in": "<string>",
          "code": "<string>",
          "subCategory": "<string>",
          "context": {
            "in_25": [
              "<string>",
              "<string>"
            ],
            "Duis_ce": [
              "<string>",
              "<string>"
            ]
          }
        }
      ],
      "links": {
        "dolor_58": "<string>",
        "commodo_1": "<string>",
        "ex8": "<string>",
        "qui_fa": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "id": "<string>",
      "subCategory": {}
    },
    {
      "category": "<string>",
      "context": {
        "in0": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "in": "<string>",
          "code": "<string>",
          "subCategory": "<string>",
          "context": {
            "deserunt_d": [
              "<string>",
              "<string>"
            ],
            "proident_8e0": [
              "<string>",
              "<string>"
            ]
          }
        },
        {
          "message": "<string>",
          "in": "<string>",
          "code": "<string>",
          "subCategory": "<string>",
          "context": {
            "cillumd7": [
              "<string>",
              "<string>"
            ]
          }
        }
      ],
      "links": {
        "enima": "<string>",
        "pariatur_0e2": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "id": "<string>",
      "subCategory": {}
    }
  ],
  "requestedAt": "<dateTime>",
  "links": {
    "aliqua_537": "<string>"
  }
}
```

---

### Create

**Method:** `PUT`

**URL:** `https://api.hubapi.com/crm/v4/objects/:objectType/:objectId/associations/:toObjectType/:toObjectId`

**Description:** Set association labels between two records.

**Authentication:** oauth2

**Path Variables:**

- `objectType`: No description
- `objectId`: No description
- `toObjectType`: No description
- `toObjectId`: No description

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
[
  {
    "associationCategory": "USER_DEFINED",
    "associationTypeId": "<integer>"
  },
  {
    "associationCategory": "HUBSPOT_DEFINED",
    "associationTypeId": "<integer>"
  }
]
```

**Success Response (201):**

```json
{
  "fromObjectId": "<long>",
  "fromObjectTypeId": "<string>",
  "labels": [
    "<string>",
    "<string>"
  ],
  "toObjectId": "<long>",
  "toObjectTypeId": "<string>"
}
```

---

### Delete

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/crm/v4/objects/:objectType/:objectId/associations/:toObjectType/:toObjectId`

**Description:** deletes all associations between two records.

**Authentication:** oauth2

**Path Variables:**

- `objectType`: No description
- `objectId`: No description
- `toObjectType`: No description
- `toObjectId`: No description

**Headers:**


---

### Create Default

**Method:** `PUT`

**URL:** `https://api.hubapi.com/crm/v4/objects/:fromObjectType/:fromObjectId/associations/default/:toObjectType/:toObjectId`

**Description:** Create the default (most generic) association type between two object types

**Authentication:** oauth2

**Path Variables:**

- `fromObjectType`: No description
- `fromObjectId`: No description
- `toObjectType`: No description
- `toObjectId`: No description

**Headers:**


**Success Response (200):**

```json
{
  "completedAt": "<dateTime>",
  "results": [
    {
      "associationSpec": {
        "associationCategory": "INTEGRATOR_DEFINED",
        "associationTypeId": "<integer>"
      },
      "from": {
        "id": "<string>"
      },
      "to": {
        "id": "<string>"
      }
    },
    {
      "associationSpec": {
        "associationCategory": "USER_DEFINED",
        "associationTypeId": "<integer>"
      },
      "from": {
        "id": "<string>"
      },
      "to": {
        "id": "<string>"
      }
    }
  ],
  "startedAt": "<dateTime>",
  "status": "CANCELED",
  "numErrors": "<integer>",
  "errors": [
    {
      "category": "<string>",
      "context": {
        "velitff": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "in": "<string>",
          "code": "<string>",
          "subCategory": "<string>",
          "context": {
            "consectetur_c7": [
              "<string>",
              "<string>"
            ],
            "ipsum_23": [
              "<string>",
              "<string>"
            ],
            "essed": [
              "<string>",
              "<string>"
            ]
          }
        },
        {
          "message": "<string>",
          "in": "<string>",
          "code": "<string>",
          "subCategory": "<string>",
          "context": {
            "in_25": [
              "<string>",
              "<string>"
            ],
            "Duis_ce": [
              "<string>",
              "<string>"
            ]
          }
        }
      ],
      "links": {
        "dolor_58": "<string>",
        "commodo_1": "<string>",
        "ex8": "<string>",
        "qui_fa": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "id": "<string>",
      "subCategory": {}
    },
    {
      "category": "<string>",
      "context": {
        "in0": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "in": "<string>",
          "code": "<string>",
          "subCategory": "<string>",
          "context": {
            "deserunt_d": [
              "<string>",
              "<string>"
            ],
            "proident_8e0": [
              "<string>",
              "<string>"
            ]
          }
        },
        {
          "message": "<string>",
          "in": "<string>",
          "code": "<string>",
          "subCategory": "<string>",
          "context": {
            "cillumd7": [
              "<string>",
              "<string>"
            ]
          }
        }
      ],
      "links": {
        "enima": "<string>",
        "pariatur_0e2": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "id": "<string>",
      "subCategory": {}
    }
  ],
  "requestedAt": "<dateTime>",
  "links": {
    "aliqua_537": "<string>"
  }
}
```

---

### List

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v4/objects/:objectType/:objectId/associations/:toObjectType?after=<string>&limit=500`

**Description:** List all associations of an object by object type. Limit 1000 per call.

**Authentication:** oauth2

**Path Variables:**

- `objectType`: No description
- `objectId`: No description
- `toObjectType`: No description

**Query Parameters:**

- `after`: The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
- `limit`: The maximum number of results to display per page.

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "associationTypes": [
        {
          "category": "HUBSPOT_DEFINED",
          "typeId": "<integer>",
          "label": "<string>"
        },
        {
          "category": "INTEGRATOR_DEFINED",
          "typeId": "<integer>",
          "label": "<string>"
        }
      ],
      "toObjectId": "<integer>"
    },
    {
      "associationTypes": [
        {
          "category": "HUBSPOT_DEFINED",
          "typeId": "<integer>",
          "label": "<string>"
        },
        {
          "category": "USER_DEFINED",
          "typeId": "<integer>",
          "label": "<string>"
        }
      ],
      "toObjectId": "<integer>"
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

