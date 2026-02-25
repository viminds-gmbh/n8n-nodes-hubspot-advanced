# Webhooks V3 API

Total endpoints: 9

---

### Read webhook settings

**Method:** `GET`

**URL:** `https://api.hubapi.com/webhooks/v3/:appId/settings`

**Authentication:** apikey

**Path Variables:**

- `appId`: No description

**Headers:**


**Success Response (200):**

```json
{
  "createdAt": "<dateTime>",
  "targetUrl": "<string>",
  "throttling": {
    "maxConcurrentRequests": "<integer>",
    "period": "ROLLING_MINUTE"
  },
  "updatedAt": "<dateTime>"
}
```

---

### Update webhook settings

**Method:** `PUT`

**URL:** `https://api.hubapi.com/webhooks/v3/:appId/settings`

**Authentication:** apikey

**Path Variables:**

- `appId`: No description

**Headers:**

- `Content-Type`: application/json

**Success Response (200):**

```json
{
  "createdAt": "<dateTime>",
  "targetUrl": "<string>",
  "throttling": {
    "maxConcurrentRequests": "<integer>",
    "period": "ROLLING_MINUTE"
  },
  "updatedAt": "<dateTime>"
}
```

---

### Delete webhook settings

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/webhooks/v3/:appId/settings`

**Authentication:** apikey

**Path Variables:**

- `appId`: No description

**Headers:**


---

### Read an event subscription

**Method:** `GET`

**URL:** `https://api.hubapi.com/webhooks/v3/:appId/subscriptions/:subscriptionId`

**Authentication:** apikey

**Path Variables:**

- `appId`: No description
- `subscriptionId`: No description

**Headers:**


**Success Response (200):**

```json
{
  "active": "<boolean>",
  "createdAt": "<dateTime>",
  "eventType": "deal.propertyChange",
  "id": "<string>",
  "propertyName": "<string>",
  "updatedAt": "<dateTime>"
}
```

---

### Delete event subscription

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/webhooks/v3/:appId/subscriptions/:subscriptionId`

**Authentication:** apikey

**Path Variables:**

- `appId`: No description
- `subscriptionId`: No description

**Headers:**


---

### Update an event subscription

**Method:** `PATCH`

**URL:** `https://api.hubapi.com/webhooks/v3/:appId/subscriptions/:subscriptionId`

**Authentication:** apikey

**Path Variables:**

- `appId`: No description
- `subscriptionId`: No description

**Headers:**

- `Content-Type`: application/json

**Success Response (200):**

```json
{
  "active": "<boolean>",
  "createdAt": "<dateTime>",
  "eventType": "deal.propertyChange",
  "id": "<string>",
  "propertyName": "<string>",
  "updatedAt": "<dateTime>"
}
```

---

### Read event subscriptions

**Method:** `GET`

**URL:** `https://api.hubapi.com/webhooks/v3/:appId/subscriptions`

**Authentication:** apikey

**Path Variables:**

- `appId`: No description

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "active": "<boolean>",
      "createdAt": "<dateTime>",
      "eventType": "deal.restore",
      "id": "<string>",
      "propertyName": "<string>",
      "updatedAt": "<dateTime>"
    },
    {
      "active": "<boolean>",
      "createdAt": "<dateTime>",
      "eventType": "line_item.restore",
      "id": "<string>",
      "propertyName": "<string>",
      "updatedAt": "<dateTime>"
    }
  ]
}
```

---

### Create an event subscription

**Method:** `POST`

**URL:** `https://api.hubapi.com/webhooks/v3/:appId/subscriptions`

**Authentication:** apikey

**Path Variables:**

- `appId`: No description

**Headers:**

- `Content-Type`: application/json

**Success Response (201):**

```json
{
  "active": "<boolean>",
  "createdAt": "<dateTime>",
  "eventType": "deal.propertyChange",
  "id": "<string>",
  "propertyName": "<string>",
  "updatedAt": "<dateTime>"
}
```

---

### Batch create event subscriptions

**Method:** `POST`

**URL:** `https://api.hubapi.com/webhooks/v3/:appId/subscriptions/batch/update`

**Authentication:** apikey

**Path Variables:**

- `appId`: No description

**Headers:**

- `Content-Type`: application/json

**Success Response (200):**

```json
{
  "completedAt": "<dateTime>",
  "results": [
    {
      "active": "<boolean>",
      "createdAt": "<dateTime>",
      "eventType": "conversation.privacyDeletion",
      "id": "<string>",
      "propertyName": "<string>",
      "updatedAt": "<dateTime>"
    },
    {
      "active": "<boolean>",
      "createdAt": "<dateTime>",
      "eventType": "ticket.creation",
      "id": "<string>",
      "propertyName": "<string>",
      "updatedAt": "<dateTime>"
    }
  ],
  "startedAt": "<dateTime>",
  "status": "PROCESSING",
  "requestedAt": "<dateTime>",
  "links": {
    "in_4ae": "<string>",
    "voluptate_e": "<string>",
    "id4": "<string>"
  }
}
```

---

