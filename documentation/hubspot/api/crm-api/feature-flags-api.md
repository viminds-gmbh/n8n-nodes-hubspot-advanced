# Feature Flags API

Total endpoints: 9

---

### Batch set account flag state

**Method:** `POST`

**URL:** `https://api.hubapi.com/feature-flags/v3/:appId/flags/:flagName/portals/batch/upsert`

**Authentication:** apikey

**Path Variables:**

- `appId`: (Required) 
- `flagName`: (Required) 

**Headers:**

- `Content-Type`: application/json

**Success Response (200):**

```json
{
  "portalFlagStates": [
    {
      "appId": "<integer>",
      "flagName": "<string>",
      "flagState": "OFF",
      "portalId": "<integer>"
    },
    {
      "appId": "<integer>",
      "flagName": "<string>",
      "flagState": "ABSENT",
      "portalId": "<integer>"
    }
  ]
}
```

---

### Batch delete account flag state

**Method:** `POST`

**URL:** `https://api.hubapi.com/feature-flags/v3/:appId/flags/:flagName/portals/batch/delete`

**Authentication:** apikey

**Path Variables:**

- `appId`: (Required) 
- `flagName`: (Required) 

**Headers:**

- `Content-Type`: application/json

**Success Response (200):**

```json
{
  "portalFlagStates": [
    {
      "appId": "<integer>",
      "flagName": "<string>",
      "flagState": "OFF",
      "portalId": "<integer>"
    },
    {
      "appId": "<integer>",
      "flagName": "<string>",
      "flagState": "ABSENT",
      "portalId": "<integer>"
    }
  ]
}
```

---

### Retrieve account flag state

**Method:** `GET`

**URL:** `https://api.hubapi.com/feature-flags/v3/:appId/flags/:flagName/portals/:portalId`

**Authentication:** apikey

**Path Variables:**

- `appId`: (Required) 
- `flagName`: (Required) 
- `portalId`: (Required) 

**Headers:**


**Success Response (200):**

```json
{
  "appId": "<integer>",
  "flagName": "<string>",
  "flagState": "ABSENT",
  "portalId": "<integer>"
}
```

---

### Set an account flag state

**Method:** `PUT`

**URL:** `https://api.hubapi.com/feature-flags/v3/:appId/flags/:flagName/portals/:portalId`

**Authentication:** apikey

**Path Variables:**

- `appId`: (Required) 
- `flagName`: (Required) 
- `portalId`: (Required) 

**Headers:**

- `Content-Type`: application/json

**Success Response (200):**

```json
{
  "appId": "<integer>",
  "flagName": "<string>",
  "flagState": "ABSENT",
  "portalId": "<integer>"
}
```

---

### Delete an account flag state

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/feature-flags/v3/:appId/flags/:flagName/portals/:portalId`

**Authentication:** apikey

**Path Variables:**

- `appId`: (Required) 
- `flagName`: (Required) 
- `portalId`: (Required) 

**Headers:**


**Success Response (200):**

```json
{
  "appId": "<integer>",
  "flagName": "<string>",
  "flagState": "ABSENT",
  "portalId": "<integer>"
}
```

---

### Retrieve accounts with a set flag state

**Method:** `GET`

**URL:** `https://api.hubapi.com/feature-flags/v3/:appId/flags/:flagName/portals?startPortalId=<integer>&limit=<integer>`

**Authentication:** apikey

**Path Variables:**

- `appId`: (Required) 
- `flagName`: (Required) 

**Query Parameters:**

- `startPortalId`: No description
- `limit`: No description

**Headers:**


**Success Response (200):**

```json
{
  "portalFlagStates": [
    {
      "appId": "<integer>",
      "flagName": "<string>",
      "flagState": "OFF",
      "portalId": "<integer>"
    },
    {
      "appId": "<integer>",
      "flagName": "<string>",
      "flagState": "ABSENT",
      "portalId": "<integer>"
    }
  ]
}
```

---

### Retrieve an app's feature flags

**Method:** `GET`

**URL:** `https://api.hubapi.com/feature-flags/v3/:appId/flags/:flagName`

**Authentication:** apikey

**Path Variables:**

- `appId`: (Required) 
- `flagName`: (Required) 

**Headers:**


**Success Response (200):**

```json
{
  "appId": "<integer>",
  "defaultState": "OFF",
  "flagName": "<string>",
  "overrideState": "ABSENT"
}
```

---

### Set an app's feature flag

**Method:** `PUT`

**URL:** `https://api.hubapi.com/feature-flags/v3/:appId/flags/:flagName`

**Authentication:** apikey

**Path Variables:**

- `appId`: (Required) 
- `flagName`: (Required) 

**Headers:**

- `Content-Type`: application/json

**Success Response (200):**

```json
{
  "appId": "<integer>",
  "defaultState": "OFF",
  "flagName": "<string>",
  "overrideState": "ABSENT"
}
```

---

### Delete an app's feature flag

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/feature-flags/v3/:appId/flags/:flagName`

**Authentication:** apikey

**Path Variables:**

- `appId`: (Required) 
- `flagName`: (Required) 

**Headers:**


**Success Response (200):**

```json
{
  "appId": "<integer>",
  "defaultState": "OFF",
  "flagName": "<string>",
  "overrideState": "ABSENT"
}
```

---

