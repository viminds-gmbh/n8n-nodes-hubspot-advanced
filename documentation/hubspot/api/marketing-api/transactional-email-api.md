# Transactional Email API

Total endpoints: 6

---

### Query a single token by ID.

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/transactional/smtp-tokens/:tokenId`

**Description:** Query a single token by ID.

**Authentication:** oauth2

**Path Variables:**

- `tokenId`: No description

**Headers:**


**Success Response (200):**

```json
{
  "campaignName": "<string>",
  "createContact": "<boolean>",
  "createdAt": "<dateTime>",
  "createdBy": "<string>",
  "emailCampaignId": "<string>",
  "id": "<string>",
  "password": "<string>"
}
```

---

### Delete a single token by ID.

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/marketing/v3/transactional/smtp-tokens/:tokenId`

**Description:** Delete a single token by ID.

**Authentication:** oauth2

**Path Variables:**

- `tokenId`: No description

**Headers:**


---

### Query SMTP API tokens by campaign name or an emailCampaignId.

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/transactional/smtp-tokens?campaignName=<string>&emailCampaignId=<string>&after=<string>&limit=<integer>`

**Description:** Query multiple SMTP API tokens by campaign name or a single token by emailCampaignId.

**Authentication:** oauth2

**Query Parameters:**

- `campaignName`: A name for the campaign tied to the SMTP API token.
- `emailCampaignId`: Identifier assigned to the campaign provided during the token creation.
- `after`: Starting point to get the next set of results.
- `limit`: Maximum number of tokens to return.

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "campaignName": "<string>",
      "createContact": "<boolean>",
      "createdAt": "<dateTime>",
      "createdBy": "<string>",
      "emailCampaignId": "<string>",
      "id": "<string>",
      "password": "<string>"
    },
    {
      "campaignName": "<string>",
      "createContact": "<boolean>",
      "createdAt": "<dateTime>",
      "createdBy": "<string>",
      "emailCampaignId": "<string>",
      "id": "<string>",
      "password": "<string>"
    }
  ],
  "paging": {
    "next": {
      "after": "<string>",
      "link": "<string>"
    }
  }
}
```

---

### Create a SMTP API token.

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/transactional/smtp-tokens`

**Description:** Create a SMTP API token.

**Authentication:** oauth2

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "campaignName": "<string>",
  "createContact": "<boolean>"
}
```

**Success Response (201):**

```json
{
  "campaignName": "<string>",
  "createContact": "<boolean>",
  "createdAt": "<dateTime>",
  "createdBy": "<string>",
  "emailCampaignId": "<string>",
  "id": "<string>",
  "password": "<string>"
}
```

---

### Reset the password of an existing token.

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/transactional/smtp-tokens/:tokenId/password-reset`

**Description:** Allows the creation of a replacement password for a given token. Once the password is successfully reset, the old password for the token will be invalid.

**Authentication:** oauth2

**Path Variables:**

- `tokenId`: No description

**Headers:**


**Success Response (200):**

```json
{
  "campaignName": "<string>",
  "createContact": "<boolean>",
  "createdAt": "<dateTime>",
  "createdBy": "<string>",
  "emailCampaignId": "<string>",
  "id": "<string>",
  "password": "<string>"
}
```

---

### Send a single send transactional email asynchronously.

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/transactional/single-email/send`

**Description:** Asynchronously send a transactional email. Returns the status of the email send with a statusId that can be used to continuously query for the status using the Email Send Status API.

**Authentication:** oauth2

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "emailId": "<long>",
  "message": {
    "to": "<string>",
    "from": "<string>",
    "sendId": "<string>",
    "replyTo": [
      "<string>",
      "<string>"
    ],
    "cc": [
      "<string>",
      "<string>"
    ],
    "bcc": [
      "<string>",
      "<string>"
    ]
  },
  "contactProperties": {
    "proident3ed": "<string>",
    "tempor_7d": "<string>",
    "dolor713": "<string>"
  },
  "customProperties": {
    "id_ff": {},
    "in45": {},
    "sed3": {},
    "suntd_": {},
    "qui0f5": {}
  }
}
```

**Success Response (200):**

```json
{
  "status": "PROCESSING",
  "statusId": "<string>",
  "sendResult": "GRAYMAIL_SUPPRESSED",
  "requestedAt": "<dateTime>",
  "startedAt": "<dateTime>",
  "completedAt": "<dateTime>",
  "eventId": {
    "created": "<dateTime>",
    "id": "<uuid>"
  }
}
```

---

