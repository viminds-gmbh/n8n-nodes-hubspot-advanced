# Subscription Preferences V3 API

Total endpoints: 4

---

### Subscribe a contact

**Method:** `POST`

**URL:** `https://api.hubapi.com/communication-preferences/v3/subscribe`

**Description:** Subscribes a contact to the given subscription type. This API is not valid to use for subscribing a contact at a brand or portal level and will return an error.

**Authentication:** oauth2

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "emailAddress": "<string>",
  "subscriptionId": "<string>",
  "legalBasis": "CONSENT_WITH_NOTICE",
  "legalBasisExplanation": "<string>"
}
```

**Success Response (200):**

```json
{
  "description": "<string>",
  "id": "<string>",
  "name": "<string>",
  "sourceOfStatus": "PORTAL_WIDE_STATUS",
  "status": "NOT_SUBSCRIBED",
  "brandId": "<long>",
  "preferenceGroupName": "<string>",
  "legalBasis": "LEGITIMATE_INTEREST_PQL",
  "legalBasisExplanation": "<string>"
}
```

---

### Unsubscribe a contact

**Method:** `POST`

**URL:** `https://api.hubapi.com/communication-preferences/v3/unsubscribe`

**Description:** Unsubscribes a contact from the given subscription type. This API is not valid to use for unsubscribing a contact at a brand or portal level and will return an error.

**Authentication:** oauth2

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "emailAddress": "<string>",
  "subscriptionId": "<string>",
  "legalBasis": "CONSENT_WITH_NOTICE",
  "legalBasisExplanation": "<string>"
}
```

**Success Response (200):**

```json
{
  "description": "<string>",
  "id": "<string>",
  "name": "<string>",
  "sourceOfStatus": "PORTAL_WIDE_STATUS",
  "status": "NOT_SUBSCRIBED",
  "brandId": "<long>",
  "preferenceGroupName": "<string>",
  "legalBasis": "LEGITIMATE_INTEREST_PQL",
  "legalBasisExplanation": "<string>"
}
```

---

### Get subscription statuses for a contact

**Method:** `GET`

**URL:** `https://api.hubapi.com/communication-preferences/v3/status/email/:emailAddress`

**Description:** Returns a list of subscriptions and their status for a given contact.

**Authentication:** apikey

**Path Variables:**

- `emailAddress`: No description

**Headers:**


**Success Response (200):**

```json
{
  "recipient": "<string>",
  "subscriptionStatuses": [
    {
      "description": "<string>",
      "id": "<string>",
      "name": "<string>",
      "sourceOfStatus": "PORTAL_WIDE_STATUS",
      "status": "NOT_SUBSCRIBED",
      "brandId": "<long>",
      "preferenceGroupName": "<string>",
      "legalBasis": "LEGITIMATE_INTEREST_OTHER",
      "legalBasisExplanation": "<string>"
    },
    {
      "description": "<string>",
      "id": "<string>",
      "name": "<string>",
      "sourceOfStatus": "BRAND_WIDE_STATUS",
      "status": "NOT_SUBSCRIBED",
      "brandId": "<long>",
      "preferenceGroupName": "<string>",
      "legalBasis": "NON_GDPR",
      "legalBasisExplanation": "<string>"
    }
  ]
}
```

---

### Get subscription definitions

**Method:** `GET`

**URL:** `https://api.hubapi.com/communication-preferences/v3/definitions`

**Description:** Get a list of all subscription definitions for the portal

**Authentication:** apikey

**Headers:**


**Success Response (200):**

```json
{
  "subscriptionDefinitions": [
    {
      "createdAt": "<dateTime>",
      "description": "<string>",
      "id": "<string>",
      "isActive": "<boolean>",
      "isDefault": "<boolean>",
      "isInternal": "<boolean>",
      "name": "<string>",
      "updatedAt": "<dateTime>",
      "purpose": "<string>",
      "communicationMethod": "<string>"
    },
    {
      "createdAt": "<dateTime>",
      "description": "<string>",
      "id": "<string>",
      "isActive": "<boolean>",
      "isDefault": "<boolean>",
      "isInternal": "<boolean>",
      "name": "<string>",
      "updatedAt": "<dateTime>",
      "purpose": "<string>",
      "communicationMethod": "<string>"
    }
  ]
}
```

---

