# Single-Send API

Total endpoints: 1

---

### Send an email

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v4/email/single-send`

**Authentication:** oauth2

**Headers:**

- `Content-Type`: application/json

**Success Response (200):**

```json
{
  "status": "PROCESSING",
  "statusId": "<string>",
  "eventId": {
    "created": "<dateTime>",
    "id": "<uuid>"
  },
  "completedAt": "<dateTime>",
  "sendResult": "PREVIOUSLY_BOUNCED",
  "requestedAt": "<dateTime>",
  "startedAt": "<dateTime>"
}
```

---

