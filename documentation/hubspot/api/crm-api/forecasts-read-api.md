# Forecasts Read API

Total endpoints: 2

---

### Retrieve a list of all custom forecast types available.

**Method:** `GET`

**URL:** `https://api.hubapi.com/forecasting-settings/v3/forecast-types`

**Description:** Retrieve a list of all custom forecast types available (excludes the default forecast type of 0).

**Headers:**


**Success Response (200):**

```json
{
  "amountOrDatePropertyRestrictedForUser": "<boolean>",
  "amountProperty": "<string>",
  "createdAt": "<dateTime>",
  "createdAtTimestamp": "<long>",
  "createdBy": "<integer>",
  "dateProperty": "<string>",
  "defaultType": "<boolean>",
  "forecastName": "<string>",
  "forecastTypeId": "<long>",
  "id": "<string>",
  "objectTypeId": "<string>",
  "updatedAt": "<dateTime>",
  "updatedBy": "<integer>",
  "updatedTimestamp": "<long>",
  "amountInHomeCurrencyProperty": "<string>",
  "dealSplitProperties": {
    "dealCustomAmountProperty": "<string>",
    "dealCustomAmountPropertyInHomeCurrency": "<string>",
    "dealCustomDateProperty": "<string>",
    "dealSplitCustomAmountProperty": "<string>",
    "dealSplitCustomAmountPropertyInHomeCurrency": "<string>",
    "dealSplitWeightedCustomAmountProperty": "<string>",
    "dealSplitWeightedCustomAmountPropertyInHomeCurrency": "<string>"
  },
  "weightedAmountInHomeCurrencyProperty": "<string>",
  "weightedAmountProperty": "<string>"
}
```

---

### Retrieve details for a specific custom forecast type using its unique identifier.

**Method:** `GET`

**URL:** `https://api.hubapi.com/forecasting-settings/v3/forecast-types/:forecastTypeId`

**Description:** Retrieve details for a specific custom forecast type using its unique identifier.

**Path Variables:**

- `forecastTypeId`: The unique identifier for the forecast type.

**Headers:**


**Success Response (200):**

```json
{
  "amountOrDatePropertyRestrictedForUser": "<boolean>",
  "amountProperty": "<string>",
  "createdAt": "<dateTime>",
  "createdAtTimestamp": "<long>",
  "createdBy": "<integer>",
  "dateProperty": "<string>",
  "defaultType": "<boolean>",
  "forecastName": "<string>",
  "forecastTypeId": "<long>",
  "id": "<string>",
  "objectTypeId": "<string>",
  "updatedAt": "<dateTime>",
  "updatedBy": "<integer>",
  "updatedTimestamp": "<long>",
  "amountInHomeCurrencyProperty": "<string>",
  "dealSplitProperties": {
    "dealCustomAmountProperty": "<string>",
    "dealCustomAmountPropertyInHomeCurrency": "<string>",
    "dealCustomDateProperty": "<string>",
    "dealSplitCustomAmountProperty": "<string>",
    "dealSplitCustomAmountPropertyInHomeCurrency": "<string>",
    "dealSplitWeightedCustomAmountProperty": "<string>",
    "dealSplitWeightedCustomAmountPropertyInHomeCurrency": "<string>"
  },
  "weightedAmountInHomeCurrencyProperty": "<string>",
  "weightedAmountProperty": "<string>"
}
```

---

