# Account Info API

Total endpoints: 2

---

### Get the daily API usage and limits for a HubSpot account.

**Method:** `GET`

**URL:** `https://api.hubapi.com/account-info/v3/api-usage/daily`

**Description:** Get daily API usage

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "collectedAt": "<dateTime>",
      "currentUsage": "<integer>",
      "fetchStatus": "SUCCESS",
      "name": "<string>",
      "usageLimit": "<integer>",
      "resetsAt": "<dateTime>"
    },
    {
      "collectedAt": "<dateTime>",
      "currentUsage": "<integer>",
      "fetchStatus": "SUCCESS",
      "name": "<string>",
      "usageLimit": "<integer>",
      "resetsAt": "<dateTime>"
    }
  ]
}
```

---

### Get account details for a HubSpot account.

**Method:** `GET`

**URL:** `https://api.hubapi.com/account-info/v3/details`

**Description:** Get account details

**Authentication:** apikey

**Headers:**


**Success Response (200):**

```json
{
  "accountType": "SANDBOX",
  "additionalCurrencies": [
    "<string>",
    "<string>"
  ],
  "companyCurrency": "<string>",
  "dataHostingLocation": "<string>",
  "portalId": "<integer>",
  "timeZone": "<string>",
  "uiDomain": "<string>",
  "utcOffset": "<string>",
  "utcOffsetMilliseconds": "<long>"
}
```

---

