# Associations V3 Schema API

Total endpoints: 1

---

### get-/crm/v3/associations/{from Object Type}/{to Object Type}/types get All

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/associations/:fromObjectType/:toObjectType/types`

**Description:** List all the valid association types available between two object types

**Authentication:** oauth2

**Path Variables:**

- `fromObjectType`: No description
- `toObjectType`: No description

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "id": "<string>",
      "name": "<string>"
    },
    {
      "id": "<string>",
      "name": "<string>"
    }
  ]
}
```

---

