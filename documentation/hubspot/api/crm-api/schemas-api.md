# Schemas API

Total endpoints: 7

---

### get-/crm-object-schemas/v3/schemas get All

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm-object-schemas/v3/schemas?archived=false`

**Authentication:** oauth2

**Query Parameters:**

- `archived`: Whether to return only results that have been archived.

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "associations": [
        {
          "fromObjectTypeId": "<string>",
          "id": "<string>",
          "toObjectTypeId": "<string>",
          "createdAt": "<dateTime>",
          "name": "<string>",
          "updatedAt": "<dateTime>"
        },
        {
          "fromObjectTypeId": "<string>",
          "id": "<string>",
          "toObjectTypeId": "<string>",
          "createdAt": "<dateTime>",
          "name": "<string>",
          "updatedAt": "<dateTime>"
        }
      ],
      "id": "<string>",
      "labels": {
        "plural": "<string>",
        "singular": "<string>"
      },
      "name": "<string>",
      "properties": [
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
              "description": "<string>",
              "displayOrder": "<integer>"
            },
            {
              "hidden": "<boolean>",
              "label": "<string>",
              "value": "<string>",
              "description": "<string>",
              "displayOrder": "<integer>"
            }
          ],
          "type": "<string>",
          "archived": "<boolean>",
          "archivedAt": "<dateTime>",
          "calculated": "<boolean>",
          "calculationFormula": "<string>",
          "createdAt": "<dateTime>",
          "createdUserId": "<string>",
          "dataSensitivity": "non_sensitive",
          "displayOrder": "<integer>",
          "externalOptions": "<boolean>",
          "formField": "<boolean>",
          "hasUniqueValue": "<boolean>",
          "hidden": "<boolean>",
          "hubspotDefined": "<boolean>",
          "modificationMetadata": {
            "archivable": "<boolean>",
            "readOnlyDefinition": "<boolean>",
            "readOnlyValue": "<boolean>",
            "readOnlyOptions": "<boolean>"
          },
          "referencedObjectType": "<string>",
          "sensitiveDataCategories": [
            "<string>",
            "<string>"
          ],
          "showCurrencySymbol": "<boolean>",
          "updatedAt": "<dateTime>",
          "updatedUserId": "<string>"
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
              "description": "<string>",
              "displayOrder": "<integer>"
            },
            {
              "hidden": "<boolean>",
              "label": "<string>",
              "value": "<string>",
              "description": "<string>",
              "displayOrder": "<integer>"
            }
          ],
          "type": "<string>",
          "archived": "<boolean>",
          "archivedAt": "<dateTime>",
          "calculated": "<boolean>",
          "calculationFormula": "<string>",
          "createdAt": "<dateTime>",
          "createdUserId": "<string>",
          "dataSensitivity": "sensitive",
          "displayOrder": "<integer>",
          "externalOptions": "<boolean>",
          "formField": "<boolean>",
          "hasUniqueValue": "<boolean>",
          "hidden": "<boolean>",
          "hubspotDefined": "<boolean>",
          "modificationMetadata": {
            "archivable": "<boolean>",
            "readOnlyDefinition": "<boolean>",
            "readOnlyValue": "<boolean>",
            "readOnlyOptions": "<boolean>"
          },
          "referencedObjectType": "<string>",
          "sensitiveDataCategories": [
            "<string>",
            "<string>"
          ],
          "showCurrencySymbol": "<boolean>",
          "updatedAt": "<dateTime>",
          "updatedUserId": "<string>"
        }
      ],
      "requiredProperties": [
        "<string>",
        "<string>"
      ],
      "archived": "<boolean>",
      "createdAt": "<dateTime>",
      "createdByUserId": "<integer>",
      "description": "<string>",
      "fullyQualifiedName": "<string>",
      "objectTypeId": "<string>",
      "primaryDisplayProperty": "<string>",
      "searchableProperties": [
        "<string>",
        "<string>"
      ],
      "secondaryDisplayProperties": [
        "<string>",
        "<string>"
      ],
      "updatedAt": "<dateTime>",
      "updatedByUserId": "<integer>"
    },
    {
      "associations": [
        {
          "fromObjectTypeId": "<string>",
          "id": "<string>",
          "toObjectTypeId": "<string>",
          "createdAt": "<dateTime>",
          "name": "<string>",
          "updatedAt": "<dateTime>"
        },
        {
          "fromObjectTypeId": "<string>",
          "id": "<string>",
          "toObjectTypeId": "<string>",
          "createdAt": "<dateTime>",
          "name": "<string>",
          "updatedAt": "<dateTime>"
        }
      ],
      "id": "<string>",
      "labels": {
        "plural": "<string>",
        "singular": "<string>"
      },
      "name": "<string>",
      "properties": [
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
              "description": "<string>",
              "displayOrder": "<integer>"
            },
            {
              "hidden": "<boolean>",
              "label": "<string>",
              "value": "<string>",
              "description": "<string>",
              "displayOrder": "<integer>"
            }
          ],
          "type": "<string>",
          "archived": "<boolean>",
          "archivedAt": "<dateTime>",
          "calculated": "<boolean>",
          "calculationFormula": "<string>",
          "createdAt": "<dateTime>",
          "createdUserId": "<string>",
          "dataSensitivity": "non_sensitive",
          "displayOrder": "<integer>",
          "externalOptions": "<boolean>",
          "formField": "<boolean>",
          "hasUniqueValue": "<boolean>",
          "hidden": "<boolean>",
          "hubspotDefined": "<boolean>",
          "modificationMetadata": {
            "archivable": "<boolean>",
            "readOnlyDefinition": "<boolean>",
            "readOnlyValue": "<boolean>",
            "readOnlyOptions": "<boolean>"
          },
          "referencedObjectType": "<string>",
          "sensitiveDataCategories": [
            "<string>",
            "<string>"
          ],
          "showCurrencySymbol": "<boolean>",
          "updatedAt": "<dateTime>",
          "updatedUserId": "<string>"
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
              "description": "<string>",
              "displayOrder": "<integer>"
            },
            {
              "hidden": "<boolean>",
              "label": "<string>",
              "value": "<string>",
              "description": "<string>",
              "displayOrder": "<integer>"
            }
          ],
          "type": "<string>",
          "archived": "<boolean>",
          "archivedAt": "<dateTime>",
          "calculated": "<boolean>",
          "calculationFormula": "<string>",
          "createdAt": "<dateTime>",
          "createdUserId": "<string>",
          "dataSensitivity": "highly_sensitive",
          "displayOrder": "<integer>",
          "externalOptions": "<boolean>",
          "formField": "<boolean>",
          "hasUniqueValue": "<boolean>",
          "hidden": "<boolean>",
          "hubspotDefined": "<boolean>",
          "modificationMetadata": {
            "archivable": "<boolean>",
            "readOnlyDefinition": "<boolean>",
            "readOnlyValue": "<boolean>",
            "readOnlyOptions": "<boolean>"
          },
          "referencedObjectType": "<string>",
          "sensitiveDataCategories": [
            "<string>",
            "<string>"
          ],
          "showCurrencySymbol": "<boolean>",
          "updatedAt": "<dateTime>",
          "updatedUserId": "<string>"
        }
      ],
      "requiredProperties": [
        "<string>",
        "<string>"
      ],
      "archived": "<boolean>",
      "createdAt": "<dateTime>",
      "createdByUserId": "<integer>",
      "description": "<string>",
      "fullyQualifiedName": "<string>",
      "objectTypeId": "<string>",
      "primaryDisplayProperty": "<string>",
      "searchableProperties": [
        "<string>",
        "<string>"
      ],
      "secondaryDisplayProperties": [
        "<string>",
        "<string>"
      ],
      "updatedAt": "<dateTime>",
      "updatedByUserId": "<integer>"
    }
  ]
}
```

---

### post-/crm-object-schemas/v3/schemas create

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm-object-schemas/v3/schemas`

**Authentication:** oauth2

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "associatedObjects": [
    "<string>",
    "<string>"
  ],
  "labels": {
    "plural": "<string>",
    "singular": "<string>"
  },
  "name": "<string>",
  "properties": [
    {
      "fieldType": "<string>",
      "label": "<string>",
      "name": "<string>",
      "type": "number",
      "description": "<string>",
      "displayOrder": "<integer>",
      "formField": "<boolean>",
      "groupName": "<string>",
      "hasUniqueValue": "<boolean>",
      "hidden": "<boolean>",
      "numberDisplayHint": "unformatted",
      "optionSortStrategy": "DISPLAY_ORDER",
      "options": [
        {
          "displayOrder": "<integer>",
          "hidden": "<boolean>",
          "label": "<string>",
          "value": "<string>",
          "description": "<string>"
        },
        {
          "displayOrder": "<integer>",
          "hidden": "<boolean>",
          "label": "<string>",
          "value": "<string>",
          "description": "<string>"
        }
      ],
      "referencedObjectType": "<string>",
      "searchableInGlobalSearch": "<boolean>",
      "showCurrencySymbol": "<boolean>",
      "textDisplayHint": "postal_code"
    },
    {
      "fieldType": "<string>",
      "label": "<string>",
      "name": "<string>",
      "type": "date",
      "description": "<string>",
      "displayOrder": "<integer>",
      "formField": "<boolean>",
      "groupName": "<string>",
      "hasUniqueValue": "<boolean>",
      "hidden": "<boolean>",
      "numberDisplayHint": "unformatted",
      "optionSortStrategy": "ALPHABETICAL",
      "options": [
        {
          "displayOrder": "<integer>",
          "hidden": "<boolean>",
          "label": "<string>",
          "value": "<string>",
          "description": "<string>"
        },
        {
          "displayOrder": "<integer>",
          "hidden": "<boolean>",
          "label": "<string>",
          "value": "<string>",
          "description": "<string>"
        }
      ],
      "referencedObjectType": "<string>",
      "searchableInGlobalSearch": "<boolean>",
      "showCurrencySymbol": "<boolean>",
      "textDisplayHint": "email"
    }
  ],
  "requiredProperties": [
    "<string>",
    "<string>"
  ],
  "description": "<string>",
  "primaryDisplayProperty": "<string>",
  "searchableProperties": [
    "<string>",
    "<string>"
  ],
  "secondaryDisplayProperties": [
    "<string>",
    "<string>"
  ]
}
```

**Success Response (201):**

```json
{
  "associations": [
    {
      "fromObjectTypeId": "<string>",
      "id": "<string>",
      "toObjectTypeId": "<string>",
      "createdAt": "<dateTime>",
      "name": "<string>",
      "updatedAt": "<dateTime>"
    },
    {
      "fromObjectTypeId": "<string>",
      "id": "<string>",
      "toObjectTypeId": "<string>",
      "createdAt": "<dateTime>",
      "name": "<string>",
      "updatedAt": "<dateTime>"
    }
  ],
  "id": "<string>",
  "labels": {
    "plural": "<string>",
    "singular": "<string>"
  },
  "name": "<string>",
  "properties": [
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
          "description": "<string>",
          "displayOrder": "<integer>"
        },
        {
          "hidden": "<boolean>",
          "label": "<string>",
          "value": "<string>",
          "description": "<string>",
          "displayOrder": "<integer>"
        }
      ],
      "type": "<string>",
      "archived": "<boolean>",
      "archivedAt": "<dateTime>",
      "calculated": "<boolean>",
      "calculationFormula": "<string>",
      "createdAt": "<dateTime>",
      "createdUserId": "<string>",
      "dataSensitivity": "non_sensitive",
      "displayOrder": "<integer>",
      "externalOptions": "<boolean>",
      "formField": "<boolean>",
      "hasUniqueValue": "<boolean>",
      "hidden": "<boolean>",
      "hubspotDefined": "<boolean>",
      "modificationMetadata": {
        "archivable": "<boolean>",
        "readOnlyDefinition": "<boolean>",
        "readOnlyValue": "<boolean>",
        "readOnlyOptions": "<boolean>"
      },
      "referencedObjectType": "<string>",
      "sensitiveDataCategories": [
        "<string>",
        "<string>"
      ],
      "showCurrencySymbol": "<boolean>",
      "updatedAt": "<dateTime>",
      "updatedUserId": "<string>"
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
          "description": "<string>",
          "displayOrder": "<integer>"
        },
        {
          "hidden": "<boolean>",
          "label": "<string>",
          "value": "<string>",
          "description": "<string>",
          "displayOrder": "<integer>"
        }
      ],
      "type": "<string>",
      "archived": "<boolean>",
      "archivedAt": "<dateTime>",
      "calculated": "<boolean>",
      "calculationFormula": "<string>",
      "createdAt": "<dateTime>",
      "createdUserId": "<string>",
      "dataSensitivity": "highly_sensitive",
      "displayOrder": "<integer>",
      "externalOptions": "<boolean>",
      "formField": "<boolean>",
      "hasUniqueValue": "<boolean>",
      "hidden": "<boolean>",
      "hubspotDefined": "<boolean>",
      "modificationMetadata": {
        "archivable": "<boolean>",
        "readOnlyDefinition": "<boolean>",
        "readOnlyValue": "<boolean>",
        "readOnlyOptions": "<boolean>"
      },
      "referencedObjectType": "<string>",
      "sensitiveDataCategories": [
        "<string>",
        "<string>"
      ],
      "showCurrencySymbol": "<boolean>",
      "updatedAt": "<dateTime>",
      "updatedUserId": "<string>"
    }
  ],
  "requiredProperties": [
    "<string>",
    "<string>"
  ],
  "archived": "<boolean>",
  "createdAt": "<dateTime>",
  "createdByUserId": "<integer>",
  "description": "<string>",
  "fullyQualifiedName": "<string>",
  "objectTypeId": "<string>",
  "primaryDisplayProperty": "<string>",
  "searchableProperties": [
    "<string>",
    "<string>"
  ],
  "secondaryDisplayProperties": [
    "<string>",
    "<string>"
  ],
  "updatedAt": "<dateTime>",
  "updatedByUserId": "<integer>"
}
```

---

### get-/crm-object-schemas/v3/schemas/{object Type} get By Id

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm-object-schemas/v3/schemas/:objectType`

**Authentication:** oauth2

**Path Variables:**

- `objectType`: Fully qualified name or object type ID of your schema.

**Headers:**


**Success Response (200):**

```json
{
  "associations": [
    {
      "fromObjectTypeId": "<string>",
      "id": "<string>",
      "toObjectTypeId": "<string>",
      "createdAt": "<dateTime>",
      "name": "<string>",
      "updatedAt": "<dateTime>"
    },
    {
      "fromObjectTypeId": "<string>",
      "id": "<string>",
      "toObjectTypeId": "<string>",
      "createdAt": "<dateTime>",
      "name": "<string>",
      "updatedAt": "<dateTime>"
    }
  ],
  "id": "<string>",
  "labels": {
    "plural": "<string>",
    "singular": "<string>"
  },
  "name": "<string>",
  "properties": [
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
          "description": "<string>",
          "displayOrder": "<integer>"
        },
        {
          "hidden": "<boolean>",
          "label": "<string>",
          "value": "<string>",
          "description": "<string>",
          "displayOrder": "<integer>"
        }
      ],
      "type": "<string>",
      "archived": "<boolean>",
      "archivedAt": "<dateTime>",
      "calculated": "<boolean>",
      "calculationFormula": "<string>",
      "createdAt": "<dateTime>",
      "createdUserId": "<string>",
      "dataSensitivity": "non_sensitive",
      "displayOrder": "<integer>",
      "externalOptions": "<boolean>",
      "formField": "<boolean>",
      "hasUniqueValue": "<boolean>",
      "hidden": "<boolean>",
      "hubspotDefined": "<boolean>",
      "modificationMetadata": {
        "archivable": "<boolean>",
        "readOnlyDefinition": "<boolean>",
        "readOnlyValue": "<boolean>",
        "readOnlyOptions": "<boolean>"
      },
      "referencedObjectType": "<string>",
      "sensitiveDataCategories": [
        "<string>",
        "<string>"
      ],
      "showCurrencySymbol": "<boolean>",
      "updatedAt": "<dateTime>",
      "updatedUserId": "<string>"
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
          "description": "<string>",
          "displayOrder": "<integer>"
        },
        {
          "hidden": "<boolean>",
          "label": "<string>",
          "value": "<string>",
          "description": "<string>",
          "displayOrder": "<integer>"
        }
      ],
      "type": "<string>",
      "archived": "<boolean>",
      "archivedAt": "<dateTime>",
      "calculated": "<boolean>",
      "calculationFormula": "<string>",
      "createdAt": "<dateTime>",
      "createdUserId": "<string>",
      "dataSensitivity": "highly_sensitive",
      "displayOrder": "<integer>",
      "externalOptions": "<boolean>",
      "formField": "<boolean>",
      "hasUniqueValue": "<boolean>",
      "hidden": "<boolean>",
      "hubspotDefined": "<boolean>",
      "modificationMetadata": {
        "archivable": "<boolean>",
        "readOnlyDefinition": "<boolean>",
        "readOnlyValue": "<boolean>",
        "readOnlyOptions": "<boolean>"
      },
      "referencedObjectType": "<string>",
      "sensitiveDataCategories": [
        "<string>",
        "<string>"
      ],
      "showCurrencySymbol": "<boolean>",
      "updatedAt": "<dateTime>",
      "updatedUserId": "<string>"
    }
  ],
  "requiredProperties": [
    "<string>",
    "<string>"
  ],
  "archived": "<boolean>",
  "createdAt": "<dateTime>",
  "createdByUserId": "<integer>",
  "description": "<string>",
  "fullyQualifiedName": "<string>",
  "objectTypeId": "<string>",
  "primaryDisplayProperty": "<string>",
  "searchableProperties": [
    "<string>",
    "<string>"
  ],
  "secondaryDisplayProperties": [
    "<string>",
    "<string>"
  ],
  "updatedAt": "<dateTime>",
  "updatedByUserId": "<integer>"
}
```

---

### delete-/crm-object-schemas/v3/schemas/{object Type} archive

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/crm-object-schemas/v3/schemas/:objectType?archived=false`

**Authentication:** oauth2

**Path Variables:**

- `objectType`: Fully qualified name or object type ID of your schema.

**Query Parameters:**

- `archived`: Whether to return only results that have been archived.

**Headers:**


---

### patch-/crm-object-schemas/v3/schemas/{object Type} update

**Method:** `PATCH`

**URL:** `https://api.hubapi.com/crm-object-schemas/v3/schemas/:objectType`

**Authentication:** oauth2

**Path Variables:**

- `objectType`: Fully qualified name or object type ID of your schema.

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "clearDescription": "<boolean>",
  "description": "<string>",
  "labels": {
    "plural": "<string>",
    "singular": "<string>"
  },
  "primaryDisplayProperty": "<string>",
  "requiredProperties": [
    "<string>",
    "<string>"
  ],
  "restorable": "<boolean>",
  "searchableProperties": [
    "<string>",
    "<string>"
  ],
  "secondaryDisplayProperties": [
    "<string>",
    "<string>"
  ]
}
```

**Success Response (200):**

```json
{
  "id": "<string>",
  "labels": {
    "plural": "<string>",
    "singular": "<string>"
  },
  "name": "<string>",
  "requiredProperties": [
    "<string>",
    "<string>"
  ],
  "archived": "<boolean>",
  "createdAt": "<dateTime>",
  "description": "<string>",
  "fullyQualifiedName": "<string>",
  "objectTypeId": "<string>",
  "portalId": "<integer>",
  "primaryDisplayProperty": "<string>",
  "searchableProperties": [
    "<string>",
    "<string>"
  ],
  "secondaryDisplayProperties": [
    "<string>",
    "<string>"
  ],
  "updatedAt": "<dateTime>"
}
```

---

### post-/crm-object-schemas/v3/schemas/{object Type}/associations create Association

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm-object-schemas/v3/schemas/:objectType/associations`

**Authentication:** oauth2

**Path Variables:**

- `objectType`: Fully qualified name or object type ID of your schema.

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "fromObjectTypeId": "<string>",
  "toObjectTypeId": "<string>",
  "name": "<string>"
}
```

**Success Response (201):**

```json
{
  "fromObjectTypeId": "<string>",
  "id": "<string>",
  "toObjectTypeId": "<string>",
  "createdAt": "<dateTime>",
  "name": "<string>",
  "updatedAt": "<dateTime>"
}
```

---

### delete-/crm-object-schemas/v3/schemas/{object Type}/associations/{association Identifier} archive Association

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/crm-object-schemas/v3/schemas/:objectType/associations/:associationIdentifier`

**Authentication:** oauth2

**Path Variables:**

- `objectType`: Fully qualified name or object type ID of your schema.
- `associationIdentifier`: Unique ID of the association to remove.

**Headers:**


---

