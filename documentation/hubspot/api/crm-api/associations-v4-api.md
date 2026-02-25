# Associations V4 API

Total endpoints: 10

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
    "dolor_3d": "<string>",
    "ad_9d": "<string>"
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
  "status": "COMPLETE",
  "requestedAt": "<dateTime>",
  "links": {
    "elit_0": "<string>",
    "eiusmod0": "<string>"
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
        "associationCategory": "HUBSPOT_DEFINED",
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
        "associationCategory": "INTEGRATOR_DEFINED",
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
  "requestedAt": "<dateTime>",
  "links": {
    "aute8": "<string>",
    "Ut_bfe": "<string>"
  },
  "errors": [
    {
      "category": "<string>",
      "context": {
        "cillum_8c": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "subCategory": "<string>",
          "code": "<string>",
          "in": "<string>",
          "context": {
            "magnab": [
              "<string>",
              "<string>"
            ]
          }
        },
        {
          "message": "<string>",
          "subCategory": "<string>",
          "code": "<string>",
          "in": "<string>",
          "context": {
            "ad__": [
              "<string>",
              "<string>"
            ],
            "tempor_2": [
              "<string>",
              "<string>"
            ]
          }
        }
      ],
      "links": {
        "mollit_4": "<string>",
        "adipisicing_6": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "subCategory": {},
      "id": "<string>"
    },
    {
      "category": "<string>",
      "context": {
        "dolor9": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "subCategory": "<string>",
          "code": "<string>",
          "in": "<string>",
          "context": {
            "laboris6b": [
              "<string>",
              "<string>"
            ],
            "eu_2d": [
              "<string>",
              "<string>"
            ]
          }
        },
        {
          "message": "<string>",
          "subCategory": "<string>",
          "code": "<string>",
          "in": "<string>",
          "context": {
            "mollit_6e": [
              "<string>",
              "<string>"
            ]
          }
        }
      ],
      "links": {
        "eac_": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "subCategory": {},
      "id": "<string>"
    }
  ]
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
    "associationCategory": "HUBSPOT_DEFINED",
    "associationTypeId": "<integer>"
  },
  {
    "associationCategory": "USER_DEFINED",
    "associationTypeId": "<integer>"
  }
]
```

**Success Response (201):**

```json
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
        "associationCategory": "HUBSPOT_DEFINED",
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
        "associationCategory": "INTEGRATOR_DEFINED",
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
  "requestedAt": "<dateTime>",
  "links": {
    "aute8": "<string>",
    "Ut_bfe": "<string>"
  },
  "errors": [
    {
      "category": "<string>",
      "context": {
        "cillum_8c": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "subCategory": "<string>",
          "code": "<string>",
          "in": "<string>",
          "context": {
            "magnab": [
              "<string>",
              "<string>"
            ]
          }
        },
        {
          "message": "<string>",
          "subCategory": "<string>",
          "code": "<string>",
          "in": "<string>",
          "context": {
            "ad__": [
              "<string>",
              "<string>"
            ],
            "tempor_2": [
              "<string>",
              "<string>"
            ]
          }
        }
      ],
      "links": {
        "mollit_4": "<string>",
        "adipisicing_6": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "subCategory": {},
      "id": "<string>"
    },
    {
      "category": "<string>",
      "context": {
        "dolor9": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "subCategory": "<string>",
          "code": "<string>",
          "in": "<string>",
          "context": {
            "laboris6b": [
              "<string>",
              "<string>"
            ],
            "eu_2d": [
              "<string>",
              "<string>"
            ]
          }
        },
        {
          "message": "<string>",
          "subCategory": "<string>",
          "code": "<string>",
          "in": "<string>",
          "context": {
            "mollit_6e": [
              "<string>",
              "<string>"
            ]
          }
        }
      ],
      "links": {
        "eac_": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "subCategory": {},
      "id": "<string>"
    }
  ]
}
```

---

### List

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v4/objects/:objectType/:objectId/associations/:toObjectType?after=<string>&limit=500`

**Description:** List all associations of an object by object type. Limit 500 per call.

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
    }
  }
}
```

---

### Report

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v4/associations/usage/high-usage-report/:userId`

**Description:** Requests a report of all objects in the portal which have a high usage of associations

**Authentication:** apikey

**Path Variables:**

- `userId`: (Required) 

**Headers:**


**Success Response (200):**

```json
{
  "enqueueTime": {
    "dateOnly": "<boolean>",
    "timeZoneShift": "<integer>",
    "value": "<integer>"
  },
  "userEmail": "<string>",
  "userId": "<integer>"
}
```

---

