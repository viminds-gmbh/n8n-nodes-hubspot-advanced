# Associations V4 Schema API

Total endpoints: 9

---

### get-/crm/associations/v4/definitions/configurations/all get All

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/associations/v4/definitions/configurations/all`

**Authentication:** oauth2

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "category": "USER_DEFINED",
      "typeId": "<integer>",
      "label": "<string>",
      "userEnforcedMaxToObjectIds": "<integer>"
    },
    {
      "category": "USER_DEFINED",
      "typeId": "<integer>",
      "label": "<string>",
      "userEnforcedMaxToObjectIds": "<integer>"
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

### get-/crm/associations/v4/definitions/configurations/{from Object Type}/{to Object Type} get All Between Two Object Types

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/associations/v4/definitions/configurations/:fromObjectType/:toObjectType`

**Authentication:** oauth2

**Path Variables:**

- `fromObjectType`: (Required) 
- `toObjectType`: (Required) 

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "category": "USER_DEFINED",
      "typeId": "<integer>",
      "label": "<string>",
      "userEnforcedMaxToObjectIds": "<integer>"
    },
    {
      "category": "USER_DEFINED",
      "typeId": "<integer>",
      "label": "<string>",
      "userEnforcedMaxToObjectIds": "<integer>"
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

### post-/crm/associations/v4/definitions/configurations/{from Object Type}/{to Object Type}/batch/create batch Create

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/associations/v4/definitions/configurations/:fromObjectType/:toObjectType/batch/create`

**Authentication:** oauth2

**Path Variables:**

- `fromObjectType`: (Required) 
- `toObjectType`: (Required) 

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    {
      "category": "HUBSPOT_DEFINED",
      "maxToObjectIds": "<integer>",
      "typeId": "<integer>"
    },
    {
      "category": "HUBSPOT_DEFINED",
      "maxToObjectIds": "<integer>",
      "typeId": "<integer>"
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
      "category": "USER_DEFINED",
      "typeId": "<integer>",
      "label": "<string>",
      "userEnforcedMaxToObjectIds": "<integer>"
    },
    {
      "category": "HUBSPOT_DEFINED",
      "typeId": "<integer>",
      "label": "<string>",
      "userEnforcedMaxToObjectIds": "<integer>"
    }
  ],
  "startedAt": "<dateTime>",
  "status": "PENDING",
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
    "key_1": "<string>",
    "key_2": "<string>"
  },
  "numErrors": "<integer>",
  "requestedAt": "<dateTime>"
}
```

---

### post-/crm/associations/v4/definitions/configurations/{from Object Type}/{to Object Type}/batch/purge batch Remove

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/associations/v4/definitions/configurations/:fromObjectType/:toObjectType/batch/purge`

**Authentication:** oauth2

**Path Variables:**

- `fromObjectType`: (Required) 
- `toObjectType`: (Required) 

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    {
      "category": "<string>",
      "typeId": "<integer>"
    },
    {
      "category": "<string>",
      "typeId": "<integer>"
    }
  ]
}
```

**Success Response (200):**

```json
{
  "completedAt": "<dateTime>",
  "results": [
    "",
    ""
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
        ],
        "key_4": [
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

### post-/crm/associations/v4/definitions/configurations/{from Object Type}/{to Object Type}/batch/update batch Update

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/associations/v4/definitions/configurations/:fromObjectType/:toObjectType/batch/update`

**Authentication:** oauth2

**Path Variables:**

- `fromObjectType`: (Required) 
- `toObjectType`: (Required) 

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    {
      "category": "HUBSPOT_DEFINED",
      "maxToObjectIds": "<integer>",
      "typeId": "<integer>"
    },
    {
      "category": "HUBSPOT_DEFINED",
      "maxToObjectIds": "<integer>",
      "typeId": "<integer>"
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
      "category": "USER_DEFINED",
      "typeId": "<integer>",
      "userEnforcedMaxToObjectIds": "<integer>"
    },
    {
      "category": "HUBSPOT_DEFINED",
      "typeId": "<integer>",
      "userEnforcedMaxToObjectIds": "<integer>"
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
    "key_0": "<string>"
  },
  "numErrors": "<integer>",
  "requestedAt": "<dateTime>"
}
```

---

### get-/crm/associations/v4/{from Object Type}/{to Object Type}/labels get All

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/associations/v4/:fromObjectType/:toObjectType/labels`

**Authentication:** oauth2

**Path Variables:**

- `fromObjectType`: (Required) 
- `toObjectType`: (Required) 

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "category": "INTEGRATOR_DEFINED",
      "typeId": "<integer>",
      "label": "<string>"
    },
    {
      "category": "INTEGRATOR_DEFINED",
      "typeId": "<integer>",
      "label": "<string>"
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

### put-/crm/associations/v4/{from Object Type}/{to Object Type}/labels update

**Method:** `PUT`

**URL:** `https://api.hubapi.com/crm/associations/v4/:fromObjectType/:toObjectType/labels`

**Authentication:** oauth2

**Path Variables:**

- `fromObjectType`: (Required) 
- `toObjectType`: (Required) 

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "associationTypeId": "<integer>",
  "label": "<string>",
  "inverseLabel": "<string>"
}
```

---

### post-/crm/associations/v4/{from Object Type}/{to Object Type}/labels create

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/associations/v4/:fromObjectType/:toObjectType/labels`

**Authentication:** oauth2

**Path Variables:**

- `fromObjectType`: (Required) 
- `toObjectType`: (Required) 

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "label": "<string>",
  "name": "<string>",
  "inverseLabel": "<string>"
}
```

**Success Response (200):**

```json
{
  "results": [
    {
      "category": "INTEGRATOR_DEFINED",
      "typeId": "<integer>",
      "label": "<string>"
    },
    {
      "category": "INTEGRATOR_DEFINED",
      "typeId": "<integer>",
      "label": "<string>"
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

### delete-/crm/associations/v4/{from Object Type}/{to Object Type}/labels/{association Type Id} remove

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/crm/associations/v4/:fromObjectType/:toObjectType/labels/:associationTypeId`

**Authentication:** oauth2

**Path Variables:**

- `fromObjectType`: (Required) 
- `toObjectType`: (Required) 
- `associationTypeId`: (Required) 

**Headers:**


---

