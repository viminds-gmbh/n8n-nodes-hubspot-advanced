# Pipelines API

Total endpoints: 14

---

### Return a pipeline by ID

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/pipelines/:objectType/:pipelineId`

**Description:** Return a single pipeline object identified by its unique `{pipelineId}`.

**Authentication:** oauth2

**Path Variables:**

- `objectType`: (Required) 
- `pipelineId`: (Required) 

**Headers:**


**Success Response (200):**

```json
{
  "archived": "<boolean>",
  "createdAt": "<dateTime>",
  "displayOrder": "<integer>",
  "id": "<string>",
  "label": "<string>",
  "stages": [
    {
      "archived": "<boolean>",
      "createdAt": "<dateTime>",
      "displayOrder": "<integer>",
      "id": "<string>",
      "label": "<string>",
      "metadata": {
        "Loremb3_": "<string>",
        "Duisf4": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archivedAt": "<dateTime>",
      "writePermissions": "INTERNAL_ONLY"
    },
    {
      "archived": "<boolean>",
      "createdAt": "<dateTime>",
      "displayOrder": "<integer>",
      "id": "<string>",
      "label": "<string>",
      "metadata": {
        "ea__63": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archivedAt": "<dateTime>",
      "writePermissions": "INTERNAL_ONLY"
    }
  ],
  "updatedAt": "<dateTime>",
  "archivedAt": "<dateTime>"
}
```

---

### Replace a pipeline

**Method:** `PUT`

**URL:** `https://api.hubapi.com/crm/v3/pipelines/:objectType/:pipelineId?validateReferencesBeforeDelete=false&validateDealStageUsagesBeforeDelete=false`

**Description:** Replace all the properties of an existing pipeline with the values provided. This will overwrite any existing pipeline stages. The updated pipeline will be returned in the response.

**Authentication:** apikey

**Path Variables:**

- `objectType`: (Required) 
- `pipelineId`: (Required) 

**Query Parameters:**

- `validateReferencesBeforeDelete`: No description
- `validateDealStageUsagesBeforeDelete`: No description

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "displayOrder": "<integer>",
  "label": "<string>",
  "stages": [
    {
      "displayOrder": "<integer>",
      "label": "<string>",
      "metadata": {
        "sint_0b": "<string>",
        "ea12": "<string>"
      }
    },
    {
      "displayOrder": "<integer>",
      "label": "<string>",
      "metadata": {
        "nulla3": "<string>",
        "Lorem_0fd": "<string>",
        "laboris8": "<string>"
      }
    }
  ]
}
```

**Success Response (200):**

```json
{
  "archived": "<boolean>",
  "createdAt": "<dateTime>",
  "displayOrder": "<integer>",
  "id": "<string>",
  "label": "<string>",
  "stages": [
    {
      "archived": "<boolean>",
      "createdAt": "<dateTime>",
      "displayOrder": "<integer>",
      "id": "<string>",
      "label": "<string>",
      "metadata": {
        "Loremb3_": "<string>",
        "Duisf4": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archivedAt": "<dateTime>",
      "writePermissions": "INTERNAL_ONLY"
    },
    {
      "archived": "<boolean>",
      "createdAt": "<dateTime>",
      "displayOrder": "<integer>",
      "id": "<string>",
      "label": "<string>",
      "metadata": {
        "ea__63": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archivedAt": "<dateTime>",
      "writePermissions": "INTERNAL_ONLY"
    }
  ],
  "updatedAt": "<dateTime>",
  "archivedAt": "<dateTime>"
}
```

---

### Delete a pipeline

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/crm/v3/pipelines/:objectType/:pipelineId?validateReferencesBeforeDelete=false&validateDealStageUsagesBeforeDelete=false`

**Description:** Delete the pipeline identified by `{pipelineId}`.

**Authentication:** apikey

**Path Variables:**

- `objectType`: (Required) 
- `pipelineId`: (Required) 

**Query Parameters:**

- `validateReferencesBeforeDelete`: No description
- `validateDealStageUsagesBeforeDelete`: No description

**Headers:**


---

### Perform a partial update of the pipeline identified by pipelineId.

**Method:** `PATCH`

**URL:** `https://api.hubapi.com/crm/v3/pipelines/:objectType/:pipelineId?validateReferencesBeforeDelete=false&validateDealStageUsagesBeforeDelete=false`

**Description:** Perform a partial update of the pipeline identified by `{pipelineId}`. The updated pipeline will be returned in the response.

**Authentication:** apikey

**Path Variables:**

- `objectType`: (Required) 
- `pipelineId`: (Required) 

**Query Parameters:**

- `validateReferencesBeforeDelete`: No description
- `validateDealStageUsagesBeforeDelete`: No description

**Headers:**

- `Content-Type`: application/json

**Success Response (200):**

```json
{
  "archived": "<boolean>",
  "createdAt": "<dateTime>",
  "displayOrder": "<integer>",
  "id": "<string>",
  "label": "<string>",
  "stages": [
    {
      "archived": "<boolean>",
      "createdAt": "<dateTime>",
      "displayOrder": "<integer>",
      "id": "<string>",
      "label": "<string>",
      "metadata": {
        "Loremb3_": "<string>",
        "Duisf4": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archivedAt": "<dateTime>",
      "writePermissions": "INTERNAL_ONLY"
    },
    {
      "archived": "<boolean>",
      "createdAt": "<dateTime>",
      "displayOrder": "<integer>",
      "id": "<string>",
      "label": "<string>",
      "metadata": {
        "ea__63": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archivedAt": "<dateTime>",
      "writePermissions": "INTERNAL_ONLY"
    }
  ],
  "updatedAt": "<dateTime>",
  "archivedAt": "<dateTime>"
}
```

---

### Retrieve all pipelines

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/pipelines/:objectType`

**Description:** Return all pipelines for the object type specified by `{objectType}`.

**Authentication:** oauth2

**Path Variables:**

- `objectType`: (Required) 

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "archived": "<boolean>",
      "createdAt": "<dateTime>",
      "displayOrder": "<integer>",
      "id": "<string>",
      "label": "<string>",
      "stages": [
        {
          "archived": "<boolean>",
          "createdAt": "<dateTime>",
          "displayOrder": "<integer>",
          "id": "<string>",
          "label": "<string>",
          "metadata": {
            "sunt_c7a": "<string>",
            "aute0a": "<string>",
            "ipsumc9": "<string>"
          },
          "updatedAt": "<dateTime>",
          "archivedAt": "<dateTime>",
          "writePermissions": "READ_ONLY"
        },
        {
          "archived": "<boolean>",
          "createdAt": "<dateTime>",
          "displayOrder": "<integer>",
          "id": "<string>",
          "label": "<string>",
          "metadata": {
            "laboris5": "<string>"
          },
          "updatedAt": "<dateTime>",
          "archivedAt": "<dateTime>",
          "writePermissions": "READ_ONLY"
        }
      ],
      "updatedAt": "<dateTime>",
      "archivedAt": "<dateTime>"
    },
    {
      "archived": "<boolean>",
      "createdAt": "<dateTime>",
      "displayOrder": "<integer>",
      "id": "<string>",
      "label": "<string>",
      "stages": [
        {
          "archived": "<boolean>",
          "createdAt": "<dateTime>",
          "displayOrder": "<integer>",
          "id": "<string>",
          "label": "<string>",
          "metadata": {
            "aliqua_8": "<string>"
          },
          "updatedAt": "<dateTime>",
          "archivedAt": "<dateTime>",
          "writePermissions": "CRM_PERMISSIONS_ENFORCEMENT"
        },
        {
          "archived": "<boolean>",
          "createdAt": "<dateTime>",
          "displayOrder": "<integer>",
          "id": "<string>",
          "label": "<string>",
          "metadata": {
            "qui41": "<string>",
            "nisi_a": "<string>"
          },
          "updatedAt": "<dateTime>",
          "archivedAt": "<dateTime>",
          "writePermissions": "CRM_PERMISSIONS_ENFORCEMENT"
        }
      ],
      "updatedAt": "<dateTime>",
      "archivedAt": "<dateTime>"
    }
  ]
}
```

---

### Create a pipeline

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/pipelines/:objectType`

**Description:** Create a new pipeline with the provided property values. The entire pipeline object, including its unique ID, will be returned in the response.

**Authentication:** apikey

**Path Variables:**

- `objectType`: (Required) 

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "displayOrder": "<integer>",
  "label": "<string>",
  "stages": [
    {
      "displayOrder": "<integer>",
      "label": "<string>",
      "metadata": {
        "sint_0b": "<string>",
        "ea12": "<string>"
      }
    },
    {
      "displayOrder": "<integer>",
      "label": "<string>",
      "metadata": {
        "nulla3": "<string>",
        "Lorem_0fd": "<string>",
        "laboris8": "<string>"
      }
    }
  ]
}
```

**Success Response (201):**

```json
{
  "archived": "<boolean>",
  "createdAt": "<dateTime>",
  "displayOrder": "<integer>",
  "id": "<string>",
  "label": "<string>",
  "stages": [
    {
      "archived": "<boolean>",
      "createdAt": "<dateTime>",
      "displayOrder": "<integer>",
      "id": "<string>",
      "label": "<string>",
      "metadata": {
        "Loremb3_": "<string>",
        "Duisf4": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archivedAt": "<dateTime>",
      "writePermissions": "INTERNAL_ONLY"
    },
    {
      "archived": "<boolean>",
      "createdAt": "<dateTime>",
      "displayOrder": "<integer>",
      "id": "<string>",
      "label": "<string>",
      "metadata": {
        "ea__63": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archivedAt": "<dateTime>",
      "writePermissions": "INTERNAL_ONLY"
    }
  ],
  "updatedAt": "<dateTime>",
  "archivedAt": "<dateTime>"
}
```

---

### Return an audit of all changes to the pipeline

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/pipelines/:objectType/:pipelineId/audit`

**Description:** Return a reverse chronological list of all mutations that have occurred on the pipeline identified by `{pipelineId}`.

**Authentication:** oauth2

**Path Variables:**

- `objectType`: (Required) 
- `pipelineId`: (Required) 

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "action": "<string>",
      "identifier": "<string>",
      "portalId": "<integer>",
      "rawObject": {},
      "fromUserId": "<integer>",
      "message": "<string>",
      "timestamp": "<dateTime>"
    },
    {
      "action": "<string>",
      "identifier": "<string>",
      "portalId": "<integer>",
      "rawObject": {},
      "fromUserId": "<integer>",
      "message": "<string>",
      "timestamp": "<dateTime>"
    }
  ]
}
```

---

### Return all stages of a pipeline

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/pipelines/:objectType/:pipelineId/stages`

**Description:** Return all the stages associated with the pipeline identified by `{pipelineId}`.

**Authentication:** oauth2

**Path Variables:**

- `objectType`: (Required) 
- `pipelineId`: (Required) 

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "archived": "<boolean>",
      "createdAt": "<dateTime>",
      "displayOrder": "<integer>",
      "id": "<string>",
      "label": "<string>",
      "metadata": {
        "pariaturc8": "<string>",
        "Lorem__3": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archivedAt": "<dateTime>",
      "writePermissions": "CRM_PERMISSIONS_ENFORCEMENT"
    },
    {
      "archived": "<boolean>",
      "createdAt": "<dateTime>",
      "displayOrder": "<integer>",
      "id": "<string>",
      "label": "<string>",
      "metadata": {
        "autea0f": "<string>",
        "fugiat_7a": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archivedAt": "<dateTime>",
      "writePermissions": "READ_ONLY"
    }
  ]
}
```

---

### Create a pipeline stage

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/pipelines/:objectType/:pipelineId/stages`

**Description:** Create a new stage associated with the pipeline identified by `{pipelineId}`. The entire stage object, including its unique ID, will be returned in the response.

**Authentication:** apikey

**Path Variables:**

- `objectType`: (Required) 
- `pipelineId`: (Required) 

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "displayOrder": "<integer>",
  "label": "<string>",
  "metadata": {
    "cupidatat7f2": "<string>",
    "esse4_6": "<string>"
  }
}
```

**Success Response (201):**

```json
{
  "archived": "<boolean>",
  "createdAt": "<dateTime>",
  "displayOrder": "<integer>",
  "id": "<string>",
  "label": "<string>",
  "metadata": {
    "mollit9f": "<string>"
  },
  "updatedAt": "<dateTime>",
  "archivedAt": "<dateTime>",
  "writePermissions": "READ_ONLY"
}
```

---

### Return a pipeline stage by ID

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/pipelines/:objectType/:pipelineId/stages/:stageId`

**Description:** Return the stage identified by `{stageId}` associated with the pipeline identified by `{pipelineId}`.

**Authentication:** oauth2

**Path Variables:**

- `objectType`: (Required) 
- `pipelineId`: (Required) 
- `stageId`: (Required) 

**Headers:**


**Success Response (200):**

```json
{
  "archived": "<boolean>",
  "createdAt": "<dateTime>",
  "displayOrder": "<integer>",
  "id": "<string>",
  "label": "<string>",
  "metadata": {
    "mollit9f": "<string>"
  },
  "updatedAt": "<dateTime>",
  "archivedAt": "<dateTime>",
  "writePermissions": "READ_ONLY"
}
```

---

### Replace a pipeline stage

**Method:** `PUT`

**URL:** `https://api.hubapi.com/crm/v3/pipelines/:objectType/:pipelineId/stages/:stageId`

**Description:** Replace all the properties of an existing pipeline stage with the values provided. The updated stage will be returned in the response.

**Authentication:** apikey

**Path Variables:**

- `objectType`: (Required) 
- `pipelineId`: (Required) 
- `stageId`: (Required) 

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "displayOrder": "<integer>",
  "label": "<string>",
  "metadata": {
    "cupidatat7f2": "<string>",
    "esse4_6": "<string>"
  }
}
```

**Success Response (200):**

```json
{
  "archived": "<boolean>",
  "createdAt": "<dateTime>",
  "displayOrder": "<integer>",
  "id": "<string>",
  "label": "<string>",
  "metadata": {
    "mollit9f": "<string>"
  },
  "updatedAt": "<dateTime>",
  "archivedAt": "<dateTime>",
  "writePermissions": "READ_ONLY"
}
```

---

### Delete a pipeline stage

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/crm/v3/pipelines/:objectType/:pipelineId/stages/:stageId`

**Description:** Delete the pipeline stage identified by `{stageId}` associated with the pipeline identified by `{pipelineId}`.

**Authentication:** apikey

**Path Variables:**

- `objectType`: (Required) 
- `pipelineId`: (Required) 
- `stageId`: (Required) 

**Headers:**


---

### Update specific properties of an existing pipeline stage.

**Method:** `PATCH`

**URL:** `https://api.hubapi.com/crm/v3/pipelines/:objectType/:pipelineId/stages/:stageId`

**Description:** Perform a partial update of the pipeline stage identified by `{stageId}` associated with the pipeline identified by `{pipelineId}`. Any properties not included in this update will keep their existing values. The updated stage will be returned in the response.

**Authentication:** apikey

**Path Variables:**

- `objectType`: (Required) 
- `pipelineId`: (Required) 
- `stageId`: (Required) 

**Headers:**

- `Content-Type`: application/json

**Success Response (200):**

```json
{
  "archived": "<boolean>",
  "createdAt": "<dateTime>",
  "displayOrder": "<integer>",
  "id": "<string>",
  "label": "<string>",
  "metadata": {
    "mollit9f": "<string>"
  },
  "updatedAt": "<dateTime>",
  "archivedAt": "<dateTime>",
  "writePermissions": "READ_ONLY"
}
```

---

### Retrieve a reverse chronological list of all changes made to a specific pipeline stage.

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/pipelines/:objectType/:pipelineId/stages/:stageId/audit`

**Description:** Return a reverse chronological list of all mutations that have occurred on the pipeline stage identified by `{stageId}`.

**Authentication:** oauth2

**Path Variables:**

- `objectType`: (Required) 
- `pipelineId`: (Required) 
- `stageId`: (Required) 

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "action": "sunt eiusmod ipsum sed",
      "identifier": "sit culpa voluptate",
      "portalId": -67693291,
      "rawObject": {},
      "fromUserId": 81978954,
      "message": "eiusmod pariatu",
      "timestamp": "1992-05-23T04:37:35.967Z"
    },
    {
      "action": "amet dolore sunt laborum nisi",
      "identifier": "in amet sint Ut labore",
      "portalId": 96814393,
      "rawObject": {},
      "fromUserId": -30236487,
      "message": "magna ex",
      "timestamp": "2016-07-21T15:14:29.846Z"
    }
  ]
}
```

---

