# Associations V3 API

Total endpoints: 3

---

### Create multiple associations between specified object types in a batch operation.

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/associations/:fromObjectType/:toObjectType/batch/create`

**Description:** Associate all pairs of objects identified in the request body.

**Authentication:** oauth2

**Path Variables:**

- `fromObjectType`: (Required) 
- `toObjectType`: (Required) 

**Headers:**

- `Content-Type`: application/json

**Success Response (201):**

```json
{
  "completedAt": "<dateTime>",
  "results": [
    {
      "from": {
        "id": "<string>"
      },
      "to": {
        "id": "<string>"
      },
      "type": "<string>"
    },
    {
      "from": {
        "id": "<string>"
      },
      "to": {
        "id": "<string>"
      },
      "type": "<string>"
    }
  ],
  "startedAt": "<dateTime>",
  "status": "PROCESSING",
  "requestedAt": "<dateTime>",
  "links": {
    "eu_5": "<string>",
    "nulla21c": "<string>"
  }
}
```

---

### Retrieve multiple associations between specified object types in a batch operation.

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/associations/:fromObjectType/:toObjectType/batch/read`

**Description:** Get the IDs of all `{toObjectType}` objects associated with those specified in the request body.

**Authentication:** oauth2

**Path Variables:**

- `fromObjectType`: (Required) 
- `toObjectType`: (Required) 

**Headers:**

- `Content-Type`: application/json

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
    {
      "from": {
        "id": "<string>"
      },
      "to": [
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
  ],
  "startedAt": "<dateTime>",
  "status": "PROCESSING",
  "requestedAt": "<dateTime>",
  "links": {
    "tempor_3b": "<string>",
    "proident_71b": "<string>"
  }
}
```

---

### Archive multiple associations between specified object types in a batch operation.

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/associations/:fromObjectType/:toObjectType/batch/archive`

**Description:** Remove the associations between all pairs of objects identified in the request body.

**Authentication:** oauth2

**Path Variables:**

- `fromObjectType`: (Required) 
- `toObjectType`: (Required) 

**Headers:**

- `Content-Type`: application/json

---

