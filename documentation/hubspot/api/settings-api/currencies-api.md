# Currencies API

Total endpoints: 15

---

### Get exchange rates

**Method:** `GET`

**URL:** `https://api.hubapi.com/settings/v3/currencies/exchange-rates?limit=100&after=<string>&fromCurrencyCode=CZK&toCurrencyCode=CZK`

**Authentication:** apikey

**Query Parameters:**

- `limit`: The maximum number of results to display per page.
- `after`: The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
- `fromCurrencyCode`: No description
- `toCurrencyCode`: No description

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "conversionRate": "<number>",
      "createdAt": "<dateTime>",
      "effectiveAt": "<dateTime>",
      "fromCurrencyCode": "SVC",
      "id": "<string>",
      "toCurrencyCode": "HTG",
      "updatedAt": "<dateTime>",
      "visibleInUI": "<boolean>"
    },
    {
      "conversionRate": "<number>",
      "createdAt": "<dateTime>",
      "effectiveAt": "<dateTime>",
      "fromCurrencyCode": "XPT",
      "id": "<string>",
      "toCurrencyCode": "TTD",
      "updatedAt": "<dateTime>",
      "visibleInUI": "<boolean>"
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

### Add a new exchange rate

**Method:** `POST`

**URL:** `https://api.hubapi.com/settings/v3/currencies/exchange-rates`

**Authentication:** apikey

**Headers:**

- `Content-Type`: application/json

**Success Response (200):**

```json
{
  "conversionRate": "<number>",
  "createdAt": "<dateTime>",
  "effectiveAt": "<dateTime>",
  "fromCurrencyCode": "XPF",
  "id": "<string>",
  "toCurrencyCode": "BOB",
  "updatedAt": "<dateTime>",
  "visibleInUI": "<boolean>"
}
```

---

### Get all currency codes

**Method:** `GET`

**URL:** `https://api.hubapi.com/settings/v3/currencies/codes`

**Authentication:** apikey

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "currencyCode": "<string>",
      "currencyName": "<string>"
    },
    {
      "currencyCode": "<string>",
      "currencyName": "<string>"
    }
  ]
}
```

---

### Get the company currency

**Method:** `GET`

**URL:** `https://api.hubapi.com/settings/v3/currencies/company-currency`

**Authentication:** apikey

**Headers:**


**Success Response (200):**

```json
{
  "createdAt": "<dateTime>",
  "id": "<string>"
}
```

---

### Set or update the company currency.

**Method:** `PUT`

**URL:** `https://api.hubapi.com/settings/v3/currencies/company-currency`

**Authentication:** apikey

**Headers:**

- `Content-Type`: application/json

**Success Response (200):**

```json
{
  "createdAt": "<dateTime>",
  "id": "<string>"
}
```

---

### Update multiple exchange rates

**Method:** `POST`

**URL:** `https://api.hubapi.com/settings/v3/currencies/exchange-rates/batch/update`

**Authentication:** apikey

**Headers:**

- `Content-Type`: application/json

**Success Response (200):**

```json
{
  "completedAt": "<dateTime>",
  "results": [
    {
      "conversionRate": "<number>",
      "createdAt": "<dateTime>",
      "effectiveAt": "<dateTime>",
      "fromCurrencyCode": "NZD",
      "id": "<string>",
      "toCurrencyCode": "AOA",
      "updatedAt": "<dateTime>",
      "visibleInUI": "<boolean>"
    },
    {
      "conversionRate": "<number>",
      "createdAt": "<dateTime>",
      "effectiveAt": "<dateTime>",
      "fromCurrencyCode": "KRW",
      "id": "<string>",
      "toCurrencyCode": "BOV",
      "updatedAt": "<dateTime>",
      "visibleInUI": "<boolean>"
    }
  ],
  "startedAt": "<dateTime>",
  "status": "PROCESSING",
  "requestedAt": "<dateTime>",
  "links": {
    "reprehenderitc4_": "<string>"
  }
}
```

---

### Get all current exchange rates

**Method:** `GET`

**URL:** `https://api.hubapi.com/settings/v3/currencies/exchange-rates/current`

**Authentication:** apikey

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "conversionRate": "<number>",
      "createdAt": "<dateTime>",
      "effectiveAt": "<dateTime>",
      "fromCurrencyCode": "GIP",
      "id": "<string>",
      "toCurrencyCode": "GBP",
      "updatedAt": "<dateTime>",
      "visibleInUI": "<boolean>"
    },
    {
      "conversionRate": "<number>",
      "createdAt": "<dateTime>",
      "effectiveAt": "<dateTime>",
      "fromCurrencyCode": "QAR",
      "id": "<string>",
      "toCurrencyCode": "MZN",
      "updatedAt": "<dateTime>",
      "visibleInUI": "<boolean>"
    }
  ]
}
```

---

### Change the visibility of a specific currency pairs

**Method:** `POST`

**URL:** `https://api.hubapi.com/settings/v3/currencies/exchange-rates/update-visibility`

**Authentication:** apikey

**Headers:**

- `Content-Type`: application/json

---

### Get the details for a specific exchange rate

**Method:** `GET`

**URL:** `https://api.hubapi.com/settings/v3/currencies/exchange-rates/:exchangeRateId`

**Authentication:** apikey

**Path Variables:**

- `exchangeRateId`: (Required) 

**Headers:**


**Success Response (200):**

```json
{
  "conversionRate": "<number>",
  "createdAt": "<dateTime>",
  "effectiveAt": "<dateTime>",
  "fromCurrencyCode": "XPF",
  "id": "<string>",
  "toCurrencyCode": "BOB",
  "updatedAt": "<dateTime>",
  "visibleInUI": "<boolean>"
}
```

---

### Update a conversion rate

**Method:** `PATCH`

**URL:** `https://api.hubapi.com/settings/v3/currencies/exchange-rates/:exchangeRateId`

**Authentication:** apikey

**Path Variables:**

- `exchangeRateId`: (Required) 

**Headers:**

- `Content-Type`: application/json

**Success Response (200):**

```json
{
  "conversionRate": "<number>",
  "createdAt": "<dateTime>",
  "effectiveAt": "<dateTime>",
  "fromCurrencyCode": "XPF",
  "id": "<string>",
  "toCurrencyCode": "BOB",
  "updatedAt": "<dateTime>",
  "visibleInUI": "<boolean>"
}
```

---

### Create multiple exchange rates

**Method:** `POST`

**URL:** `https://api.hubapi.com/settings/v3/currencies/exchange-rates/batch/create`

**Authentication:** apikey

**Headers:**

- `Content-Type`: application/json

**Success Response (201):**

```json
{
  "completedAt": "<dateTime>",
  "results": [
    {
      "conversionRate": "<number>",
      "createdAt": "<dateTime>",
      "effectiveAt": "<dateTime>",
      "fromCurrencyCode": "NZD",
      "id": "<string>",
      "toCurrencyCode": "AOA",
      "updatedAt": "<dateTime>",
      "visibleInUI": "<boolean>"
    },
    {
      "conversionRate": "<number>",
      "createdAt": "<dateTime>",
      "effectiveAt": "<dateTime>",
      "fromCurrencyCode": "KRW",
      "id": "<string>",
      "toCurrencyCode": "BOV",
      "updatedAt": "<dateTime>",
      "visibleInUI": "<boolean>"
    }
  ],
  "startedAt": "<dateTime>",
  "status": "PROCESSING",
  "requestedAt": "<dateTime>",
  "links": {
    "reprehenderitc4_": "<string>"
  }
}
```

---

### Retrieve multiple rates

**Method:** `POST`

**URL:** `https://api.hubapi.com/settings/v3/currencies/exchange-rates/batch/read`

**Authentication:** apikey

**Headers:**

- `Content-Type`: application/json

**Success Response (200):**

```json
{
  "completedAt": "<dateTime>",
  "results": [
    {
      "conversionRate": "<number>",
      "createdAt": "<dateTime>",
      "effectiveAt": "<dateTime>",
      "fromCurrencyCode": "NZD",
      "id": "<string>",
      "toCurrencyCode": "AOA",
      "updatedAt": "<dateTime>",
      "visibleInUI": "<boolean>"
    },
    {
      "conversionRate": "<number>",
      "createdAt": "<dateTime>",
      "effectiveAt": "<dateTime>",
      "fromCurrencyCode": "KRW",
      "id": "<string>",
      "toCurrencyCode": "BOV",
      "updatedAt": "<dateTime>",
      "visibleInUI": "<boolean>"
    }
  ],
  "startedAt": "<dateTime>",
  "status": "PROCESSING",
  "requestedAt": "<dateTime>",
  "links": {
    "reprehenderitc4_": "<string>"
  }
}
```

---

### Add a new currency with central exchange rates.

**Method:** `POST`

**URL:** `https://api.hubapi.com/settings/v3/currencies/central-fx-rates/add-currency`

**Description:** Create a new currency with central exchange rates in the portal. Unsupported currencies cannot be added here.

**Authentication:** oauth2

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "currencyCode": "ARS"
}
```

**Success Response (200):**

```json
{
  "conversionRate": 3172.2645560792384,
  "createdAt": "1959-12-27T13:01:15.344Z",
  "effectiveAt": "1955-10-06T14:58:51.038Z",
  "fromCurrencyCode": "SEK",
  "id": "string",
  "toCurrencyCode": "SAR",
  "updatedAt": "1963-04-11T20:19:18.689Z",
  "visibleInUI": true
}
```

---

### Retrieve information about the central exchange rates feature.

**Method:** `GET`

**URL:** `https://api.hubapi.com/settings/v3/currencies/central-fx-rates/information`

**Description:** Retrieve details on whether the central exchange rates feature is enabled for the portal.

**Authentication:** oauth2

**Headers:**


**Success Response (200):**

```json
{
  "centralExchangeRatesEnabled": "<boolean>"
}
```

---

### Retrieve currencies not supported by central exchange rates.

**Method:** `GET`

**URL:** `https://api.hubapi.com/settings/v3/currencies/central-fx-rates/unsupported-currencies`

**Description:** Retrieve a list of currency codes that are not supported by the central exchange rates. Unsupported currencies will need to be manually updated.

**Authentication:** oauth2

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "currencyCode": "string",
      "currencyName": "string"
    },
    {
      "currencyCode": "string",
      "currencyName": "string"
    }
  ]
}
```

---

