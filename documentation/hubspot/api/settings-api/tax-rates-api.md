# Tax Rates API

Total endpoints: 2

---

### Get all tax rates

**Method:** `GET`

**URL:** `https://api.hubapi.com/tax-rates/v1/tax-rates?active=<boolean>&after=<string>&limit=<integer>`

**Description:** Retrieve a paginated list of all tax rates set up in the account tax rate library

**Authentication:** oauth2

**Query Parameters:**

- `active`: Include inactive rates.
- `after`: The paging cursor token of the last successfully read resource will be returned as the paging.next.after JSON property of a paged response containing more results.
- `limit`: The maximum number of results to display per page.

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "active": "<boolean>",
      "createdAt": "<dateTime>",
      "id": "<string>",
      "label": "<string>",
      "name": "<string>",
      "percentageRate": "<number>",
      "updatedAt": "<dateTime>"
    },
    {
      "active": "<boolean>",
      "createdAt": "<dateTime>",
      "id": "<string>",
      "label": "<string>",
      "name": "<string>",
      "percentageRate": "<number>",
      "updatedAt": "<dateTime>"
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

### Get a specific tax rate

**Method:** `GET`

**URL:** `https://api.hubapi.com/tax-rates/v1/tax-rates/:taxRateGroupId`

**Description:** Retrieve a specific tax rate by its `taxRateGroupId`.

**Authentication:** oauth2

**Path Variables:**

- `taxRateGroupId`: The ID of the tax rate to retrieve.

**Headers:**


**Success Response (200):**

```json
{
  "active": "<boolean>",
  "createdAt": "<dateTime>",
  "id": "<string>",
  "label": "<string>",
  "name": "<string>",
  "percentageRate": "<number>",
  "updatedAt": "<dateTime>"
}
```

---

