# Properties API

Total endpoints: 13

---

### Archive a batch of properties

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/properties/:objectType/batch/archive`

**Description:** Archive a provided list of properties. This method will return a 204 No Content response on success regardless of the initial state of the property (e.g. active, already archived, non-existent).

**Authentication:** apikey

**Path Variables:**

- `objectType`: (Required) 

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    {
      "name": "<string>"
    },
    {
      "name": "<string>"
    }
  ]
}
```

---

### Read a batch of properties

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/properties/:objectType/batch/read?locale=<string>`

**Description:** Read a provided list of properties.

**Authentication:** apikey

**Path Variables:**

- `objectType`: (Required) 

**Query Parameters:**

- `locale`: No description

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "archived": "<boolean>",
  "inputs": [
    {
      "name": "<string>"
    },
    {
      "name": "<string>"
    }
  ],
  "dataSensitivity": "non_sensitive"
}
```

**Success Response (200):**

```json
{
  "completedAt": "<dateTime>",
  "results": [
    {
      "description": "<string>",
      "fieldType": "<string>",
      "groupName": "<string>",
      "label": "<string>",
      "name": "<string>",
      "options": [
        {
          "hidden": "<boolean>",
          "label": "<string>",
          "value": "<string>",
          "displayOrder": "<integer>",
          "description": "<string>"
        },
        {
          "hidden": "<boolean>",
          "label": "<string>",
          "value": "<string>",
          "displayOrder": "<integer>",
          "description": "<string>"
        }
      ],
      "type": "<string>",
      "createdUserId": "<string>",
      "hidden": "<boolean>",
      "modificationMetadata": {
        "archivable": "<boolean>",
        "readOnlyDefinition": "<boolean>",
        "readOnlyValue": "<boolean>",
        "readOnlyOptions": "<boolean>"
      },
      "displayOrder": "<integer>",
      "showCurrencySymbol": "<boolean>",
      "hubspotDefined": "<boolean>",
      "formField": "<boolean>",
      "createdAt": "<dateTime>",
      "archivedAt": "<dateTime>",
      "archived": "<boolean>",
      "referencedObjectType": "<string>",
      "calculationFormula": "<string>",
      "hasUniqueValue": "<boolean>",
      "updatedUserId": "<string>",
      "calculated": "<boolean>",
      "externalOptions": "<boolean>",
      "updatedAt": "<dateTime>"
    },
    {
      "description": "<string>",
      "fieldType": "<string>",
      "groupName": "<string>",
      "label": "<string>",
      "name": "<string>",
      "options": [
        {
          "hidden": "<boolean>",
          "label": "<string>",
          "value": "<string>",
          "displayOrder": "<integer>",
          "description": "<string>"
        },
        {
          "hidden": "<boolean>",
          "label": "<string>",
          "value": "<string>",
          "displayOrder": "<integer>",
          "description": "<string>"
        }
      ],
      "type": "<string>",
      "createdUserId": "<string>",
      "hidden": "<boolean>",
      "modificationMetadata": {
        "archivable": "<boolean>",
        "readOnlyDefinition": "<boolean>",
        "readOnlyValue": "<boolean>",
        "readOnlyOptions": "<boolean>"
      },
      "displayOrder": "<integer>",
      "showCurrencySymbol": "<boolean>",
      "hubspotDefined": "<boolean>",
      "formField": "<boolean>",
      "createdAt": "<dateTime>",
      "archivedAt": "<dateTime>",
      "archived": "<boolean>",
      "referencedObjectType": "<string>",
      "calculationFormula": "<string>",
      "hasUniqueValue": "<boolean>",
      "updatedUserId": "<string>",
      "calculated": "<boolean>",
      "externalOptions": "<boolean>",
      "updatedAt": "<dateTime>"
    }
  ],
  "startedAt": "<dateTime>",
  "status": "PROCESSING",
  "requestedAt": "<dateTime>",
  "links": {
    "nisi64": "<string>"
  }
}
```

---

### Create a batch of properties

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/properties/:objectType/batch/create`

**Description:** Create a batch of properties using the same rules as when creating an individual property.

**Authentication:** apikey

**Path Variables:**

- `objectType`: (Required) 

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    {
      "fieldType": "select",
      "groupName": "<string>",
      "label": "<string>",
      "name": "<string>",
      "type": "date",
      "hidden": "<boolean>",
      "displayOrder": "<integer>",
      "description": "<string>",
      "formField": "<boolean>",
      "referencedObjectType": "<string>",
      "options": [
        {
          "hidden": "<boolean>",
          "label": "<string>",
          "value": "<string>",
          "displayOrder": "<integer>",
          "description": "<string>"
        },
        {
          "hidden": "<boolean>",
          "label": "<string>",
          "value": "<string>",
          "displayOrder": "<integer>",
          "description": "<string>"
        }
      ],
      "calculationFormula": "<string>",
      "hasUniqueValue": "<boolean>",
      "externalOptions": "<boolean>"
    },
    {
      "fieldType": "file",
      "groupName": "<string>",
      "label": "<string>",
      "name": "<string>",
      "type": "number",
      "hidden": "<boolean>",
      "displayOrder": "<integer>",
      "description": "<string>",
      "formField": "<boolean>",
      "referencedObjectType": "<string>",
      "options": [
        {
          "hidden": "<boolean>",
          "label": "<string>",
          "value": "<string>",
          "displayOrder": "<integer>",
          "description": "<string>"
        },
        {
          "hidden": "<boolean>",
          "label": "<string>",
          "value": "<string>",
          "displayOrder": "<integer>",
          "description": "<string>"
        }
      ],
      "calculationFormula": "<string>",
      "hasUniqueValue": "<boolean>",
      "externalOptions": "<boolean>"
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
      "description": "<string>",
      "fieldType": "<string>",
      "groupName": "<string>",
      "label": "<string>",
      "name": "<string>",
      "options": [
        {
          "hidden": "<boolean>",
          "label": "<string>",
          "value": "<string>",
          "displayOrder": "<integer>",
          "description": "<string>"
        },
        {
          "hidden": "<boolean>",
          "label": "<string>",
          "value": "<string>",
          "displayOrder": "<integer>",
          "description": "<string>"
        }
      ],
      "type": "<string>",
      "createdUserId": "<string>",
      "hidden": "<boolean>",
      "modificationMetadata": {
        "archivable": "<boolean>",
        "readOnlyDefinition": "<boolean>",
        "readOnlyValue": "<boolean>",
        "readOnlyOptions": "<boolean>"
      },
      "displayOrder": "<integer>",
      "showCurrencySymbol": "<boolean>",
      "hubspotDefined": "<boolean>",
      "formField": "<boolean>",
      "createdAt": "<dateTime>",
      "archivedAt": "<dateTime>",
      "archived": "<boolean>",
      "referencedObjectType": "<string>",
      "calculationFormula": "<string>",
      "hasUniqueValue": "<boolean>",
      "updatedUserId": "<string>",
      "calculated": "<boolean>",
      "externalOptions": "<boolean>",
      "updatedAt": "<dateTime>"
    },
    {
      "description": "<string>",
      "fieldType": "<string>",
      "groupName": "<string>",
      "label": "<string>",
      "name": "<string>",
      "options": [
        {
          "hidden": "<boolean>",
          "label": "<string>",
          "value": "<string>",
          "displayOrder": "<integer>",
          "description": "<string>"
        },
        {
          "hidden": "<boolean>",
          "label": "<string>",
          "value": "<string>",
          "displayOrder": "<integer>",
          "description": "<string>"
        }
      ],
      "type": "<string>",
      "createdUserId": "<string>",
      "hidden": "<boolean>",
      "modificationMetadata": {
        "archivable": "<boolean>",
        "readOnlyDefinition": "<boolean>",
        "readOnlyValue": "<boolean>",
        "readOnlyOptions": "<boolean>"
      },
      "displayOrder": "<integer>",
      "showCurrencySymbol": "<boolean>",
      "hubspotDefined": "<boolean>",
      "formField": "<boolean>",
      "createdAt": "<dateTime>",
      "archivedAt": "<dateTime>",
      "archived": "<boolean>",
      "referencedObjectType": "<string>",
      "calculationFormula": "<string>",
      "hasUniqueValue": "<boolean>",
      "updatedUserId": "<string>",
      "calculated": "<boolean>",
      "externalOptions": "<boolean>",
      "updatedAt": "<dateTime>"
    }
  ],
  "startedAt": "<dateTime>",
  "status": "PROCESSING",
  "requestedAt": "<dateTime>",
  "links": {
    "nisi64": "<string>"
  }
}
```

---

### Read a property group

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/properties/:objectType/groups/:groupName?locale=<string>`

**Description:** Read a property group identified by {groupName}.

**Authentication:** apikey

**Path Variables:**

- `objectType`: (Required) 
- `groupName`: (Required) 

**Query Parameters:**

- `locale`: No description

**Headers:**


**Success Response (200):**

```json
{
  "archived": "<boolean>",
  "displayOrder": "<integer>",
  "label": "<string>",
  "name": "<string>"
}
```

---

### Archive a property group

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/crm/v3/properties/:objectType/groups/:groupName`

**Description:** Move a property group identified by {groupName} to the recycling bin.

**Authentication:** apikey

**Path Variables:**

- `objectType`: (Required) 
- `groupName`: (Required) 

**Headers:**


---

### Update a property group

**Method:** `PATCH`

**URL:** `https://api.hubapi.com/crm/v3/properties/:objectType/groups/:groupName`

**Description:** Perform a partial update of a property group identified by {groupName}. Provided fields will be overwritten.

**Authentication:** apikey

**Path Variables:**

- `objectType`: (Required) 
- `groupName`: (Required) 

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "displayOrder": "<integer>",
  "label": "<string>"
}
```

**Success Response (200):**

```json
{
  "archived": "<boolean>",
  "displayOrder": "<integer>",
  "label": "<string>",
  "name": "<string>"
}
```

---

### Read all property groups

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/properties/:objectType/groups?locale=<string>`

**Description:** Read all existing property groups for the specified object type and HubSpot account.

**Authentication:** apikey

**Path Variables:**

- `objectType`: (Required) 

**Query Parameters:**

- `locale`: No description

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "archived": "<boolean>",
      "displayOrder": "<integer>",
      "label": "<string>",
      "name": "<string>"
    },
    {
      "archived": "<boolean>",
      "displayOrder": "<integer>",
      "label": "<string>",
      "name": "<string>"
    }
  ]
}
```

---

### Create a property group

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/properties/:objectType/groups`

**Description:** Create and return a copy of a new property group.

**Authentication:** apikey

**Path Variables:**

- `objectType`: (Required) 

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "label": "<string>",
  "name": "<string>",
  "displayOrder": "<integer>"
}
```

**Success Response (201):**

```json
{
  "archived": "<boolean>",
  "displayOrder": "<integer>",
  "label": "<string>",
  "name": "<string>"
}
```

---

### Read a property

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/properties/:objectType/:propertyName?archived=false&properties=<string>&dataSensitivity=non_sensitive&locale=<string>`

**Description:** Read a property identified by {propertyName}.

**Authentication:** apikey

**Path Variables:**

- `objectType`: (Required) 
- `propertyName`: (Required) 

**Query Parameters:**

- `archived`: Whether to return only results that have been archived.
- `properties`: No description
- `dataSensitivity`: No description
- `locale`: No description

**Headers:**


**Success Response (200):**

```json
{
  "description": "<string>",
  "fieldType": "<string>",
  "groupName": "<string>",
  "label": "<string>",
  "name": "<string>",
  "options": [
    {
      "hidden": "<boolean>",
      "label": "<string>",
      "value": "<string>",
      "displayOrder": "<integer>",
      "description": "<string>"
    },
    {
      "hidden": "<boolean>",
      "label": "<string>",
      "value": "<string>",
      "displayOrder": "<integer>",
      "description": "<string>"
    }
  ],
  "type": "<string>",
  "createdUserId": "<string>",
  "hidden": "<boolean>",
  "modificationMetadata": {
    "archivable": "<boolean>",
    "readOnlyDefinition": "<boolean>",
    "readOnlyValue": "<boolean>",
    "readOnlyOptions": "<boolean>"
  },
  "displayOrder": "<integer>",
  "showCurrencySymbol": "<boolean>",
  "hubspotDefined": "<boolean>",
  "formField": "<boolean>",
  "createdAt": "<dateTime>",
  "archivedAt": "<dateTime>",
  "archived": "<boolean>",
  "referencedObjectType": "<string>",
  "calculationFormula": "<string>",
  "hasUniqueValue": "<boolean>",
  "updatedUserId": "<string>",
  "calculated": "<boolean>",
  "externalOptions": "<boolean>",
  "updatedAt": "<dateTime>"
}
```

---

### Archive a property

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/crm/v3/properties/:objectType/:propertyName`

**Description:** Move a property identified by {propertyName} to the recycling bin.

**Authentication:** apikey

**Path Variables:**

- `objectType`: (Required) 
- `propertyName`: (Required) 

**Headers:**


---

### Update a property

**Method:** `PATCH`

**URL:** `https://api.hubapi.com/crm/v3/properties/:objectType/:propertyName`

**Description:** Perform a partial update of a property identified by {propertyName}. Provided fields will be overwritten.

**Authentication:** apikey

**Path Variables:**

- `objectType`: (Required) 
- `propertyName`: (Required) 

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "groupName": "<string>",
  "hidden": "<boolean>",
  "options": [
    {
      "hidden": "<boolean>",
      "label": "<string>",
      "value": "<string>",
      "displayOrder": "<integer>",
      "description": "<string>"
    },
    {
      "hidden": "<boolean>",
      "label": "<string>",
      "value": "<string>",
      "displayOrder": "<integer>",
      "description": "<string>"
    }
  ],
  "displayOrder": "<integer>",
  "description": "<string>",
  "calculationFormula": "<string>",
  "label": "<string>",
  "type": "bool",
  "fieldType": "textarea",
  "formField": "<boolean>"
}
```

**Success Response (200):**

```json
{
  "description": "<string>",
  "fieldType": "<string>",
  "groupName": "<string>",
  "label": "<string>",
  "name": "<string>",
  "options": [
    {
      "hidden": "<boolean>",
      "label": "<string>",
      "value": "<string>",
      "displayOrder": "<integer>",
      "description": "<string>"
    },
    {
      "hidden": "<boolean>",
      "label": "<string>",
      "value": "<string>",
      "displayOrder": "<integer>",
      "description": "<string>"
    }
  ],
  "type": "<string>",
  "createdUserId": "<string>",
  "hidden": "<boolean>",
  "modificationMetadata": {
    "archivable": "<boolean>",
    "readOnlyDefinition": "<boolean>",
    "readOnlyValue": "<boolean>",
    "readOnlyOptions": "<boolean>"
  },
  "displayOrder": "<integer>",
  "showCurrencySymbol": "<boolean>",
  "hubspotDefined": "<boolean>",
  "formField": "<boolean>",
  "createdAt": "<dateTime>",
  "archivedAt": "<dateTime>",
  "archived": "<boolean>",
  "referencedObjectType": "<string>",
  "calculationFormula": "<string>",
  "hasUniqueValue": "<boolean>",
  "updatedUserId": "<string>",
  "calculated": "<boolean>",
  "externalOptions": "<boolean>",
  "updatedAt": "<dateTime>"
}
```

---

### Read all properties

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/properties/:objectType?archived=false&properties=<string>&dataSensitivity=non_sensitive&locale=<string>`

**Description:** Read all existing properties for the specified object type and HubSpot account.

**Authentication:** apikey

**Path Variables:**

- `objectType`: (Required) 

**Query Parameters:**

- `archived`: Whether to return only results that have been archived.
- `properties`: No description
- `dataSensitivity`: No description
- `locale`: No description

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "description": "<string>",
      "fieldType": "<string>",
      "groupName": "<string>",
      "label": "<string>",
      "name": "<string>",
      "options": [
        {
          "hidden": "<boolean>",
          "label": "<string>",
          "value": "<string>",
          "displayOrder": "<integer>",
          "description": "<string>"
        },
        {
          "hidden": "<boolean>",
          "label": "<string>",
          "value": "<string>",
          "displayOrder": "<integer>",
          "description": "<string>"
        }
      ],
      "type": "<string>",
      "createdUserId": "<string>",
      "hidden": "<boolean>",
      "modificationMetadata": {
        "archivable": "<boolean>",
        "readOnlyDefinition": "<boolean>",
        "readOnlyValue": "<boolean>",
        "readOnlyOptions": "<boolean>"
      },
      "displayOrder": "<integer>",
      "showCurrencySymbol": "<boolean>",
      "hubspotDefined": "<boolean>",
      "formField": "<boolean>",
      "createdAt": "<dateTime>",
      "archivedAt": "<dateTime>",
      "archived": "<boolean>",
      "referencedObjectType": "<string>",
      "calculationFormula": "<string>",
      "hasUniqueValue": "<boolean>",
      "updatedUserId": "<string>",
      "calculated": "<boolean>",
      "externalOptions": "<boolean>",
      "updatedAt": "<dateTime>"
    },
    {
      "description": "<string>",
      "fieldType": "<string>",
      "groupName": "<string>",
      "label": "<string>",
      "name": "<string>",
      "options": [
        {
          "hidden": "<boolean>",
          "label": "<string>",
          "value": "<string>",
          "displayOrder": "<integer>",
          "description": "<string>"
        },
        {
          "hidden": "<boolean>",
          "label": "<string>",
          "value": "<string>",
          "displayOrder": "<integer>",
          "description": "<string>"
        }
      ],
      "type": "<string>",
      "createdUserId": "<string>",
      "hidden": "<boolean>",
      "modificationMetadata": {
        "archivable": "<boolean>",
        "readOnlyDefinition": "<boolean>",
        "readOnlyValue": "<boolean>",
        "readOnlyOptions": "<boolean>"
      },
      "displayOrder": "<integer>",
      "showCurrencySymbol": "<boolean>",
      "hubspotDefined": "<boolean>",
      "formField": "<boolean>",
      "createdAt": "<dateTime>",
      "archivedAt": "<dateTime>",
      "archived": "<boolean>",
      "referencedObjectType": "<string>",
      "calculationFormula": "<string>",
      "hasUniqueValue": "<boolean>",
      "updatedUserId": "<string>",
      "calculated": "<boolean>",
      "externalOptions": "<boolean>",
      "updatedAt": "<dateTime>"
    }
  ]
}
```

---

### Create a property

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/properties/:objectType`

**Description:** Create and return a copy of a new property for the specified object type.

**Authentication:** apikey

**Path Variables:**

- `objectType`: (Required) 

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "fieldType": "checkbox",
  "groupName": "<string>",
  "label": "<string>",
  "name": "<string>",
  "type": "datetime",
  "hidden": "<boolean>",
  "displayOrder": "<integer>",
  "description": "<string>",
  "formField": "<boolean>",
  "referencedObjectType": "<string>",
  "options": [
    {
      "hidden": "<boolean>",
      "label": "<string>",
      "value": "<string>",
      "displayOrder": "<integer>",
      "description": "<string>"
    },
    {
      "hidden": "<boolean>",
      "label": "<string>",
      "value": "<string>",
      "displayOrder": "<integer>",
      "description": "<string>"
    }
  ],
  "calculationFormula": "<string>",
  "hasUniqueValue": "<boolean>",
  "externalOptions": "<boolean>"
}
```

**Success Response (201):**

```json
{
  "description": "<string>",
  "fieldType": "<string>",
  "groupName": "<string>",
  "label": "<string>",
  "name": "<string>",
  "options": [
    {
      "hidden": "<boolean>",
      "label": "<string>",
      "value": "<string>",
      "displayOrder": "<integer>",
      "description": "<string>"
    },
    {
      "hidden": "<boolean>",
      "label": "<string>",
      "value": "<string>",
      "displayOrder": "<integer>",
      "description": "<string>"
    }
  ],
  "type": "<string>",
  "createdUserId": "<string>",
  "hidden": "<boolean>",
  "modificationMetadata": {
    "archivable": "<boolean>",
    "readOnlyDefinition": "<boolean>",
    "readOnlyValue": "<boolean>",
    "readOnlyOptions": "<boolean>"
  },
  "displayOrder": "<integer>",
  "showCurrencySymbol": "<boolean>",
  "hubspotDefined": "<boolean>",
  "formField": "<boolean>",
  "createdAt": "<dateTime>",
  "archivedAt": "<dateTime>",
  "archived": "<boolean>",
  "referencedObjectType": "<string>",
  "calculationFormula": "<string>",
  "hasUniqueValue": "<boolean>",
  "updatedUserId": "<string>",
  "calculated": "<boolean>",
  "externalOptions": "<boolean>",
  "updatedAt": "<dateTime>"
}
```

---

