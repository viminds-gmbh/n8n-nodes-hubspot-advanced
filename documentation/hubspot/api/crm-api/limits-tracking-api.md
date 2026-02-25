# Limits Tracking API

Total endpoints: 9

---

### Read association label limits

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/limits/associations/labels?fromObjectTypeId=<string>&toObjectTypeId=<string>`

**Description:** Returns limits and usage for custom association labels

**Authentication:** apikey

**Query Parameters:**

- `fromObjectTypeId`: No description
- `toObjectTypeId`: No description

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "allLabels": [
        "<string>",
        "<string>"
      ],
      "fromObjectType": {
        "objectTypeId": "<string>",
        "pluralLabel": "<string>",
        "singularLabel": "<string>"
      },
      "limit": "<integer>",
      "percentage": "<number>",
      "toObjectType": {
        "objectTypeId": "<string>",
        "pluralLabel": "<string>",
        "singularLabel": "<string>"
      },
      "usage": "<integer>"
    },
    {
      "allLabels": [
        "<string>",
        "<string>"
      ],
      "fromObjectType": {
        "objectTypeId": "<string>",
        "pluralLabel": "<string>",
        "singularLabel": "<string>"
      },
      "limit": "<integer>",
      "percentage": "<number>",
      "toObjectType": {
        "objectTypeId": "<string>",
        "pluralLabel": "<string>",
        "singularLabel": "<string>"
      },
      "usage": "<integer>"
    }
  ]
}
```

---

### Read record association limits between two objects

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/limits/associations/records/:fromObjectTypeId/:toObjectTypeId`

**Description:** Returns records approaching or at association limits between two objects

**Authentication:** apikey

**Path Variables:**

- `fromObjectTypeId`: (Required) 
- `toObjectTypeId`: (Required) 

**Headers:**


**Success Response (200):**

```json
{
  "atLimitFromRecordSamples": [
    {
      "label": "<string>",
      "objectId": "<integer>"
    },
    {
      "label": "<string>",
      "objectId": "<integer>"
    }
  ],
  "limit": "<long>",
  "nearLimitFromRecordSamples": [
    {
      "label": "<string>",
      "objectId": "<integer>",
      "percentage": "<number>",
      "usage": "<integer>"
    },
    {
      "label": "<string>",
      "objectId": "<integer>",
      "percentage": "<number>",
      "usage": "<integer>"
    }
  ],
  "totalRecordsAtLimit": "<integer>",
  "totalRecordsNearLimit": "<integer>"
}
```

---

### Read record association limits from an object

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/limits/associations/records/:fromObjectTypeId/to`

**Description:** Returns objects for which the from object has records approaching or at association limits

**Authentication:** apikey

**Path Variables:**

- `fromObjectTypeId`: (Required) 

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "hasRecordsAtLimit": "<boolean>",
      "hasRecordsNearLimit": "<boolean>",
      "objectTypeId": "<string>",
      "pluralLabel": "<string>",
      "singularLabel": "<string>"
    },
    {
      "hasRecordsAtLimit": "<boolean>",
      "hasRecordsNearLimit": "<boolean>",
      "objectTypeId": "<string>",
      "pluralLabel": "<string>",
      "singularLabel": "<string>"
    }
  ]
}
```

---

### Read custom object limits

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/limits/custom-object-types`

**Description:** Returns limits and usage for custom object schemas

**Authentication:** apikey

**Headers:**


**Success Response (200):**

```json
{
  "limit": "<long>",
  "percentage": "<number>",
  "usage": "<long>"
}
```

---

### Read custom property limits

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/limits/custom-properties`

**Description:** Returns limits and usage per object for custom properties

**Authentication:** apikey

**Headers:**


**Success Response (200):**

```json
{
  "byObjectType": [
    {
      "limit": "<integer>",
      "objectTypeId": "<string>",
      "percentage": "<number>",
      "pluralLabel": "<string>",
      "singularLabel": "<string>",
      "usage": "<integer>"
    },
    {
      "limit": "<integer>",
      "objectTypeId": "<string>",
      "percentage": "<number>",
      "pluralLabel": "<string>",
      "singularLabel": "<string>",
      "usage": "<integer>"
    }
  ],
  "overallLimit": "<long>",
  "overallPercentage": "<number>",
  "overallUsage": "<long>"
}
```

---

### Read record association limits

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/limits/associations/records/from`

**Description:** Returns objects with records approaching or at association limits

**Authentication:** apikey

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "hasRecordsAtLimit": "<boolean>",
      "hasRecordsNearLimit": "<boolean>",
      "objectTypeId": "<string>",
      "pluralLabel": "<string>",
      "singularLabel": "<string>"
    },
    {
      "hasRecordsAtLimit": "<boolean>",
      "hasRecordsNearLimit": "<boolean>",
      "objectTypeId": "<string>",
      "pluralLabel": "<string>",
      "singularLabel": "<string>"
    }
  ]
}
```

---

### Read record limits

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/limits/records`

**Description:** Returns limits and usage per object for records

**Authentication:** apikey

**Headers:**


**Success Response (200):**

```json
{
  "customObjectTypes": {
    "byObjectType": [
      {
        "objectTypeId": "<string>",
        "pluralLabel": "<string>",
        "singularLabel": "<string>",
        "usage": "<integer>"
      },
      {
        "objectTypeId": "<string>",
        "pluralLabel": "<string>",
        "singularLabel": "<string>",
        "usage": "<integer>"
      }
    ],
    "overallLimit": "<integer>",
    "overallPercentage": "<number>",
    "overallUsage": "<integer>"
  },
  "hubspotDefinedObjectTypes": [
    {
      "limit": "<integer>",
      "objectTypeId": "<string>",
      "percentage": "<number>",
      "pluralLabel": "<string>",
      "singularLabel": "<string>",
      "usage": "<integer>"
    },
    {
      "limit": "<integer>",
      "objectTypeId": "<string>",
      "percentage": "<number>",
      "pluralLabel": "<string>",
      "singularLabel": "<string>",
      "usage": "<integer>"
    }
  ]
}
```

---

### Read pipeline limits

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/limits/pipelines`

**Description:** Returns limits and usage per object for pipelines

**Authentication:** apikey

**Headers:**


**Success Response (200):**

```json
{
  "customObjectTypes": {
    "byObjectType": [
      {
        "objectTypeId": "<string>",
        "pluralLabel": "<string>",
        "singularLabel": "<string>",
        "usage": "<integer>"
      },
      {
        "objectTypeId": "<string>",
        "pluralLabel": "<string>",
        "singularLabel": "<string>",
        "usage": "<integer>"
      }
    ],
    "overallLimit": "<integer>",
    "overallPercentage": "<number>",
    "overallUsage": "<integer>"
  },
  "hubspotDefinedObjectTypes": [
    {
      "limit": "<integer>",
      "objectTypeId": "<string>",
      "percentage": "<number>",
      "pluralLabel": "<string>",
      "singularLabel": "<string>",
      "usage": "<integer>"
    },
    {
      "limit": "<integer>",
      "objectTypeId": "<string>",
      "percentage": "<number>",
      "pluralLabel": "<string>",
      "singularLabel": "<string>",
      "usage": "<integer>"
    }
  ]
}
```

---

### Read calculation property limits

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/limits/calculated-properties`

**Description:** Returns overall limit and per object usage for calculated properties

**Authentication:** apikey

**Headers:**


**Success Response (200):**

```json
{
  "byObjectType": [
    {
      "objectTypeId": "<string>",
      "pluralLabel": "<string>",
      "singularLabel": "<string>",
      "usage": "<integer>"
    },
    {
      "objectTypeId": "<string>",
      "pluralLabel": "<string>",
      "singularLabel": "<string>",
      "usage": "<integer>"
    }
  ],
  "overallLimit": "<long>",
  "overallPercentage": "<number>",
  "overallUsage": "<long>"
}
```

---

