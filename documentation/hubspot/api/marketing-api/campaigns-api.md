# Campaigns API

Total endpoints: 23

---

### Create a campaign

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/campaigns/`

**Description:** Create a campaign with the given properties and return the campaign object, including the campaignGuid and created properties. 

**Authentication:** oauth2

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "properties": {
    "enim_fee": "<string>",
    "aliquip1": "<string>"
  }
}
```

**Success Response (201):**

```json
{
  "createdAt": "<dateTime>",
  "id": "<string>",
  "properties": {
    "nostrudb": "<string>",
    "animc23": "<string>"
  },
  "updatedAt": "<dateTime>",
  "businessUnits": [
    {
      "id": "<integer>"
    },
    {
      "id": "<integer>"
    }
  ]
}
```

---

### Read a campaign

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/campaigns/:campaignGuid?startDate=<string>&endDate=<string>&properties=<string>&properties=<string>`

**Description:** Get a campaign identified by a specific campaignGuid with the given properties. Along with the campaign information, it also returns information about assets. Depending on the query parameters used, this can also be used to return information about the corresponding assets' metrics. Metrics are available only if startDate and endDate are provided.

**Authentication:** oauth2

**Path Variables:**

- `campaignGuid`: (Required) Unique identifier for the campaign, formatted as a UUID.

**Query Parameters:**

- `startDate`: Start date to fetch asset metrics, formatted as YYYY-MM-DD. This date is used to fetch the metrics associated with the assets for a specified period.
If not provided, no asset metrics will be fetched.
- `endDate`:  End date to fetch asset metrics, formatted as YYYY-MM-DD. This date is used to fetch the metrics associated with the assets for a specified period.
If not provided, no asset metrics will be fetched.
- `properties`: A comma-separated list of the properties to be returned in the response. If any of the specified properties has empty value on the requested object, they will be ignored and not returned in response. If this parameter is empty, the response will include an empty properties map.
- `properties`: A comma-separated list of the properties to be returned in the response. If any of the specified properties has empty value on the requested object, they will be ignored and not returned in response. If this parameter is empty, the response will include an empty properties map.

**Headers:**


**Success Response (200):**

```json
{
  "assets": {
    "irurea": {
      "results": [
        {
          "id": "<string>",
          "metrics": {
            "culpa9": "<number>",
            "incididunt_7": "<number>",
            "irurebf": "<number>"
          },
          "name": "<string>"
        },
        {
          "id": "<string>",
          "metrics": {
            "non__": "<number>"
          },
          "name": "<string>"
        }
      ],
      "paging": {
        "next": {
          "after": "<string>",
          "link": "<string>"
        },
        "prev": {
          "before": "<string>",
          "link": "<string>"
        }
      }
    }
  },
  "createdAt": "<dateTime>",
  "id": "<string>",
  "properties": {
    "do49": "<string>"
  },
  "updatedAt": "<dateTime>",
  "businessUnits": [
    {
      "id": "<integer>"
    },
    {
      "id": "<integer>"
    }
  ]
}
```

---

### Delete campaign 

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/marketing/v3/campaigns/:campaignGuid`

**Description:** Delete a specified campaign from the system.
This call will return a 204 No Content response regardless of whether the campaignGuid provided corresponds to an existing campaign or not.

**Authentication:** oauth2

**Path Variables:**

- `campaignGuid`: (Required) Unique identifier for the campaign, formatted as a UUID.

**Headers:**


---

### Update campaign

**Method:** `PATCH`

**URL:** `https://api.hubapi.com/marketing/v3/campaigns/:campaignGuid`

**Description:** Perform a partial update of a campaign identified by the specified campaignGuid. Provided property values will be overwritten. Read-only and non-existent properties will cause 400 error.
If an empty string is passed for any property in the Batch Update, it will reset that property's value.


**Authentication:** oauth2

**Path Variables:**

- `campaignGuid`: (Required) Unique identifier for the campaign, formatted as a UUID.


**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "properties": {
    "enim_fee": "<string>",
    "aliquip1": "<string>"
  }
}
```

**Success Response (200):**

```json
{
  "createdAt": "<dateTime>",
  "id": "<string>",
  "properties": {
    "nostrudb": "<string>",
    "animc23": "<string>"
  },
  "updatedAt": "<dateTime>",
  "businessUnits": [
    {
      "id": "<integer>"
    },
    {
      "id": "<integer>"
    }
  ]
}
```

---

### Campaign search

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/campaigns/?sort=<string>&after=<string>&limit=<integer>&name=<string>&properties=<string>&properties=<string>`

**Description:** This endpoint allows users to search for and return a page of campaigns based on various query parameters. Users can filter by name, sort, and paginate through the campaigns, as well as control which properties are returned in the response.

**Authentication:** oauth2

**Query Parameters:**

- `sort`: The field by which to sort the results. Allowed values are hs_name, createdAt, updatedAt. An optional '-' before the property name can denote descending order
Default: hs_name
- `after`: A cursor for pagination. If provided, the results will start after the given cursor.
Example: NTI1Cg%3D%3D
- `limit`: The maximum number of results to return. Allowed values range from 1 to 100
Default: 50
- `name`: A filter to return campaigns whose names contain the specified substring. This allows partial matching of campaign names, returning all campaigns that include the given substring in their name. If this parameter is not provided, the search will return all campaigns
- `properties`: A comma-separated list of the properties to be returned in the response. If any of the specified properties has empty value on the requested object(s), they will be ignored and not returned in response. If this parameter is empty, the response will include an empty properties map
- `properties`: A comma-separated list of the properties to be returned in the response. If any of the specified properties has empty value on the requested object(s), they will be ignored and not returned in response. If this parameter is empty, the response will include an empty properties map

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "mollit_a54": "<string>"
      },
      "updatedAt": "<dateTime>",
      "businessUnits": [
        {
          "id": "<integer>"
        },
        {
          "id": "<integer>"
        }
      ]
    },
    {
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "Lorem_9": "<string>",
        "exercitation_e4": "<string>",
        "ipsume": "<string>"
      },
      "updatedAt": "<dateTime>",
      "businessUnits": [
        {
          "id": "<integer>"
        },
        {
          "id": "<integer>"
        }
      ]
    }
  ],
  "total": "<integer>",
  "paging": {
    "next": {
      "after": "<string>",
      "link": "<string>"
    }
  }
}
```

---

### Read a batch of campaigns

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/campaigns/batch/read?startDate=<string>&endDate=<string>&properties=<string>&properties=<string>`

**Description:** This endpoint reads a batch of campaigns based on the provided input data and returns the campaigns along with their associated assets. 
The maximum number of items in a batch request is 50.
The campaigns in the response are not guaranteed to be in the same order as they were provided in the request.
If duplicate campaign IDs are provided in the request, duplicates will be ignored. The response will include only unique IDs and will be returned without duplicates.


**Authentication:** oauth2

**Query Parameters:**

- `startDate`: Start date to fetch asset metrics, formatted as YYYY-MM-DD. This date is used to fetch the metrics associated with the assets for a specified period. If not provided, no asset metrics will be fetched.

- `endDate`: End date to fetch asset metrics, formatted as YYYY-MM-DD. This date is used to fetch the metrics associated with the assets for a specified period. If not provided, no asset metrics will be fetched.
- `properties`: A comma-separated list of the properties to be returned in the response. If any of the specified properties has empty value on the requested object(s), they will be ignored and not returned in response. If this parameter is empty, the response will include an empty properties map.
- `properties`: A comma-separated list of the properties to be returned in the response. If any of the specified properties has empty value on the requested object(s), they will be ignored and not returned in response. If this parameter is empty, the response will include an empty properties map.

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    {
      "id": "<string>"
    },
    {
      "id": "<string>"
    }
  ]
}
```

**Success Response (200):**

```json
{
  "completedAt": "<dateTime>",
  "results": [
    {
      "assets": {
        "dolor_ef8": {
          "results": [
            {
              "id": "<string>",
              "metrics": {
                "ipsum_85": "<number>",
                "nullad4": "<number>",
                "elitf0": "<number>",
                "culpa9e": "<number>"
              },
              "name": "<string>"
            },
            {
              "id": "<string>",
              "metrics": {
                "incididunt_fc7": "<number>",
                "quis_ef": "<number>",
                "occaecat_000": "<number>",
                "ullamcob": "<number>",
                "sint66e": "<number>"
              },
              "name": "<string>"
            }
          ],
          "paging": {
            "next": {
              "after": "<string>",
              "link": "<string>"
            },
            "prev": {
              "before": "<string>",
              "link": "<string>"
            }
          }
        }
      },
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "voluptate_1": "<string>"
      },
      "updatedAt": "<dateTime>",
      "businessUnits": [
        {
          "id": "<integer>"
        },
        {
          "id": "<integer>"
        }
      ]
    },
    {
      "assets": {
        "ex23": {
          "results": [
            {
              "id": "<string>",
              "metrics": {
                "adipisicing_7": "<number>"
              },
              "name": "<string>"
            },
            {
              "id": "<string>",
              "metrics": {
                "magnacec": "<number>"
              },
              "name": "<string>"
            }
          ],
          "paging": {
            "next": {
              "after": "<string>",
              "link": "<string>"
            },
            "prev": {
              "before": "<string>",
              "link": "<string>"
            }
          }
        },
        "labore357": {
          "results": [
            {
              "id": "<string>",
              "metrics": {
                "inec2": "<number>"
              },
              "name": "<string>"
            },
            {
              "id": "<string>",
              "metrics": {
                "ut7d_": "<number>",
                "in_a": "<number>"
              },
              "name": "<string>"
            }
          ],
          "paging": {
            "next": {
              "after": "<string>",
              "link": "<string>"
            },
            "prev": {
              "before": "<string>",
              "link": "<string>"
            }
          }
        },
        "mollit_130": {
          "results": [
            {
              "id": "<string>",
              "metrics": {
                "sit_9": "<number>"
              },
              "name": "<string>"
            },
            {
              "id": "<string>",
              "metrics": {
                "aliqua_1c7": "<number>",
                "anim_d33": "<number>"
              },
              "name": "<string>"
            }
          ],
          "paging": {
            "next": {
              "after": "<string>",
              "link": "<string>"
            },
            "prev": {
              "before": "<string>",
              "link": "<string>"
            }
          }
        }
      },
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "Ut2f9": "<string>",
        "tempor158": "<string>",
        "aliquaf9": "<string>"
      },
      "updatedAt": "<dateTime>",
      "businessUnits": [
        {
          "id": "<integer>"
        },
        {
          "id": "<integer>"
        }
      ]
    }
  ],
  "startedAt": "<dateTime>",
  "status": "COMPLETE",
  "requestedAt": "<dateTime>",
  "links": {
    "pariatur74": "<string>"
  }
}
```

---

### Update a batch of campaigns

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/campaigns/batch/update`

**Description:** This endpoint updates a batch of campaigns based on the provided input data.
The maximum number of items in a batch request is 50.
If an empty string ("") is passed for any property in the Batch Update, it will reset that property's value.

**Authentication:** oauth2

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    {
      "id": "<string>",
      "properties": {
        "sed766": "<string>",
        "ea364": "<string>"
      }
    },
    {
      "id": "<string>",
      "properties": {
        "aliquip_d4d": "<string>",
        "veniam_21": "<string>",
        "occaecatd91": "<string>",
        "elit_c": "<string>",
        "proident_c3c": "<string>"
      }
    }
  ]
}
```

**Success Response (200):**

```json
{
  "completedAt": "<dateTime>",
  "results": [
    {
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "occaecat_2de": "<string>",
        "deserunt_9c": "<string>"
      },
      "updatedAt": "<dateTime>",
      "businessUnits": [
        {
          "id": "<integer>"
        },
        {
          "id": "<integer>"
        }
      ]
    },
    {
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "nisi4": "<string>",
        "cupidatatdfa": "<string>"
      },
      "updatedAt": "<dateTime>",
      "businessUnits": [
        {
          "id": "<integer>"
        },
        {
          "id": "<integer>"
        }
      ]
    }
  ],
  "startedAt": "<dateTime>",
  "status": "PENDING",
  "requestedAt": "<dateTime>",
  "links": {
    "aliqua_c7": "<string>"
  }
}
```

---

### Delete a batch of campaigns

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/campaigns/batch/archive`

**Description:** This endpoint deletes a batch of campaigns. 
The maximum number of items in a batch request is 50.
The response will always be 204 No Content, regardless of whether the campaigns exist or not, whether they were successfully deleted or not, or if only some of the campaigns in the batch were deleted.

**Authentication:** oauth2

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    {
      "id": "<string>"
    },
    {
      "id": "<string>"
    }
  ]
}
```

---

### Create a batch of campaigns

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/campaigns/batch/create`

**Description:** This endpoint creates a batch of campaigns. The maximum number of items in a batch request is 50.
The campaigns in the response are not guaranteed to be in the same order as they were provided in the request.

**Authentication:** oauth2

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    {
      "properties": {
        "veniam_2": "<string>",
        "et_6": "<string>"
      }
    },
    {
      "properties": {
        "incb": "<string>"
      }
    }
  ]
}
```

**Success Response (201):**

```json
{
  "completedAt": "<dateTime>",
  "results": [
    {
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "occaecat_2de": "<string>",
        "deserunt_9c": "<string>"
      },
      "updatedAt": "<dateTime>",
      "businessUnits": [
        {
          "id": "<integer>"
        },
        {
          "id": "<integer>"
        }
      ]
    },
    {
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "nisi4": "<string>",
        "cupidatatdfa": "<string>"
      },
      "updatedAt": "<dateTime>",
      "businessUnits": [
        {
          "id": "<integer>"
        },
        {
          "id": "<integer>"
        }
      ]
    }
  ],
  "startedAt": "<dateTime>",
  "status": "PENDING",
  "requestedAt": "<dateTime>",
  "links": {
    "aliqua_c7": "<string>"
  }
}
```

---

### Get Campaign Metrics


**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/campaigns/:campaignGuid/reports/metrics?startDate=<string>&endDate=<string>`

**Description:** This endpoint retrieves key attribution metrics for a specified campaign, such as sessions, new contacts, and influenced contacts.

**Authentication:** oauth2

**Path Variables:**

- `campaignGuid`: (Required) Unique identifier for the campaign, formatted as a UUID.

**Query Parameters:**

- `startDate`: The start date for the report data, formatted as YYYY-MM-DD.
Default value: 2006-01-01
- `endDate`: End date for the report data, formatted as YYYY-MM-DD.
Default value: Current date

**Headers:**


**Success Response (200):**

```json
{
  "influencedContacts": "<integer>",
  "newContactsFirstTouch": "<integer>",
  "newContactsLastTouch": "<integer>",
  "sessions": "<integer>"
}
```

---

### Fetch revenue

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/campaigns/:campaignGuid/reports/revenue?attributionModel=<string>&startDate=<string>&endDate=<string>`

**Description:** Fetch revenue attribution report data for a specified campaign


**Authentication:** apikey

**Path Variables:**

- `campaignGuid`: (Required) Unique identifier for the campaign, formatted as a UUID.

**Query Parameters:**

- `attributionModel`: Allowed values: LINEAR, FIRST_INTERACTION, LAST_INTERACTION, FULL_PATH, U_SHAPED, W_SHAPED, TIME_DECAY, J_SHAPED, INVERSE_J_SHAPED
Default value: LINEAR
- `startDate`: The start date for the report data, formatted as YYYY-MM-DD.
Default value: 2006-01-01
- `endDate`: End date for the report data, formatted as YYYY-MM-DD.
Default value: Current date

**Headers:**


**Success Response (200):**

```json
{
  "contactsNumber": "<integer>",
  "dealAmount": "<number>",
  "dealsNumber": "<integer>",
  "revenueAmount": "<number>",
  "currencyCode": "LYD"
}
```

---

### Fetch contact IDs

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/campaigns/:campaignGuid/reports/contacts/:contactType?startDate=<string>&endDate=<string>&limit=<integer>&after=<string>`

**Description:** Fetch the list of contact IDs for the specified campaign and contact type

**Authentication:** oauth2

**Path Variables:**

- `campaignGuid`: (Required) Unique identifier for the campaign, formatted as a UUID.
- `contactType`: (Required) The type of metric to filter the influenced contacts. Allowed values: contactFirstTouch, contactLastTouch, influencedContacts

**Query Parameters:**

- `startDate`: The start date for the report data, formatted as YYYY-MM-DD.
Default value: 2006-01-01
- `endDate`: End date for the report data, formatted as YYYY-MM-DD.
Default value: Current date
- `limit`: Limit for the number of contacts to fetch
Default: 100
- `after`: A cursor for pagination. If provided, the results will start after the given cursor.
Example: NTI1Cg%3D%3D

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "id": "<string>"
    },
    {
      "id": "<string>"
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

### List assets

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/campaigns/:campaignGuid/assets/:assetType?after=<string>&limit=<string>&startDate=<string>&endDate=<string>`

**Description:** This endpoint lists all assets of the campaign by asset type. The assetType parameter is required, and each request can only fetch assets of a single type.
Asset metrics can also be fetched along with the assets; they are available only if start and end dates are provided.

**Authentication:** oauth2

**Path Variables:**

- `campaignGuid`: (Required) Unique identifier for the campaign, formatted as a UUID.
- `assetType`: (Required) The type of asset to fetch.

**Query Parameters:**

- `after`: A cursor for pagination. If provided, the results will start after the given cursor.
Example: NTI1Cg%3D%3D
- `limit`: The maximum number of results to return.
Default: 10
- `startDate`: Start date to fetch asset metrics, formatted as YYYY-MM-DD. This date is used to fetch the metrics associated with the assets for a specified period.
If not provided, no asset metrics will be fetched.

- `endDate`: End date to fetch asset metrics, formatted as YYYY-MM-DD. This date is used to fetch the metrics associated with the assets for a specified period.
If not provided, no asset metrics will be fetched.

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "id": "<string>",
      "metrics": {
        "amet1": "<number>",
        "labore5b": "<number>",
        "pariatur92": "<number>",
        "ullamcob": "<number>"
      },
      "name": "<string>"
    },
    {
      "id": "<string>",
      "metrics": {
        "sunt_4": "<number>",
        "esse859": "<number>"
      },
      "name": "<string>"
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

### Add asset association

**Method:** `PUT`

**URL:** `https://api.hubapi.com/marketing/v3/campaigns/:campaignGuid/assets/:assetType/:assetId`

**Description:** Associate a specified asset with a campaign.
Important: Currently, only the following asset types can be associated and disassociated via the API: Forms, Static lists, External website pages

**Authentication:** oauth2

**Path Variables:**

- `campaignGuid`: (Required) Unique identifier for the campaign, formatted as a UUID
- `assetType`: (Required) The type of asset
Important: Currently, only the following asset types are available for association via the API: FORM, OBJECT_LIST, EXTERNAL_WEB_URL
- `assetId`: (Required) Id of the asset

**Headers:**


---

### Remove asset association

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/marketing/v3/campaigns/:campaignGuid/assets/:assetType/:assetId`

**Description:** Disassociate a specified asset from a campaign.
Important: Currently, only the following asset types can be associated and disassociated via the API: Forms, Static lists, External website pages

**Authentication:** oauth2

**Path Variables:**

- `campaignGuid`: (Required) Unique identifier for the campaign, formatted as a UUID.
- `assetType`: (Required) The type of asset
Important: Currently, only the following asset types are available for disassociation via the API: FORM, OBJECT_LIST, EXTERNAL_WEB_URL
- `assetId`: (Required) Id of the asset

**Headers:**


---

### Read budget

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/campaigns/:campaignGuid/budget/totals`

**Description:** Retrieve detailed information about the budget and spend items for a specified campaign, including the total budget, total spend, and remaining budget.
Budget and Spend items may be returned in any order, but the order field specifies their sequence based on the creation date. The item with order 0 is the oldest, and items with higher order values are newer

**Authentication:** oauth2

**Path Variables:**

- `campaignGuid`: (Required) Unique identifier for the campaign, formatted as a UUID.

**Headers:**


**Success Response (200):**

```json
{
  "budgetItems": [
    {
      "amount": "<number>",
      "createdAt": "<long>",
      "id": "<string>",
      "name": "<string>",
      "order": "<integer>",
      "updatedAt": "<long>",
      "description": "<string>"
    },
    {
      "amount": "<number>",
      "createdAt": "<long>",
      "id": "<string>",
      "name": "<string>",
      "order": "<integer>",
      "updatedAt": "<long>",
      "description": "<string>"
    }
  ],
  "currencyCode": "BDT",
  "spendItems": [
    {
      "amount": "<number>",
      "createdAt": "<long>",
      "id": "<string>",
      "name": "<string>",
      "order": "<integer>",
      "updatedAt": "<long>",
      "description": "<string>"
    },
    {
      "amount": "<number>",
      "createdAt": "<long>",
      "id": "<string>",
      "name": "<string>",
      "order": "<integer>",
      "updatedAt": "<long>",
      "description": "<string>"
    }
  ],
  "budgetTotal": "<number>",
  "remainingBudget": "<number>",
  "spendTotal": "<number>"
}
```

---

### Read campaign spend item

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/campaigns/:campaignGuid/spend/:spendId`

**Description:** Read a campaign spend item by its spendId

**Authentication:** oauth2

**Path Variables:**

- `campaignGuid`: (Required) Unique identifier for the campaign.
- `spendId`: (Required) Unique identifier for the spend item.

**Headers:**


**Success Response (200):**

```json
{
  "amount": 90895982.7889086,
  "createdAt": -48441740,
  "id": "Duis commodo magna",
  "name": "consectetur",
  "order": 32099002,
  "updatedAt": 3783041,
  "description": "elit"
}
```

---

### Update campaign spend item

**Method:** `PUT`

**URL:** `https://api.hubapi.com/marketing/v3/campaigns/:campaignGuid/spend/:spendId`

**Description:** Update a specific campaign spend item by ID

**Authentication:** apikey

**Path Variables:**

- `campaignGuid`: (Required) Unique identifier for the campaign.
- `spendId`: (Required) Unique identifier for the spend item.

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "amount": "<number>",
  "name": "<string>",
  "order": "<integer>",
  "description": "<string>"
}
```

**Success Response (200):**

```json
{
  "amount": 90895982.7889086,
  "createdAt": -48441740,
  "id": "Duis commodo magna",
  "name": "consectetur",
  "order": 32099002,
  "updatedAt": 3783041,
  "description": "elit"
}
```

---

### Delete campaign spend item

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/marketing/v3/campaigns/:campaignGuid/spend/:spendId`

**Description:** Delete a specific campaign spend item by ID

**Authentication:** apikey

**Path Variables:**

- `campaignGuid`: (Required) Unique identifier for the campaign.
- `spendId`: (Required) Unique identifier for the spend item.

**Headers:**


---

### Update budget item

**Method:** `PUT`

**URL:** `https://api.hubapi.com/marketing/v3/campaigns/:campaignGuid/budget/:budgetId`

**Description:** Update a specific budget item by ID

**Authentication:** apikey

**Path Variables:**

- `campaignGuid`: (Required) Unique identifier for the campaign.
- `budgetId`: (Required) Unique identifier for the budget item.

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "amount": "<number>",
  "name": "<string>",
  "order": "<integer>",
  "description": "<string>"
}
```

**Success Response (200):**

```json
{
  "amount": 90895982.7889086,
  "createdAt": -48441740,
  "id": "Duis commodo magna",
  "name": "consectetur",
  "order": 32099002,
  "updatedAt": 3783041,
  "description": "elit"
}
```

---

### Delete budget item

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/marketing/v3/campaigns/:campaignGuid/budget/:budgetId`

**Description:** Delete a specific budget item by ID

**Authentication:** apikey

**Path Variables:**

- `campaignGuid`: (Required) Unique identifier for the campaign.
- `budgetId`: (Required) Unique identifier for the budget item.

**Headers:**


---

### Add budget item

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/campaigns/:campaignGuid/budget`

**Description:** Add a new budget item to the campaign

**Authentication:** apikey

**Path Variables:**

- `campaignGuid`: (Required) Unique identifier for the campaign.

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "amount": "<number>",
  "name": "<string>",
  "order": "<integer>",
  "description": "<string>"
}
```

**Success Response (201):**

```json
{
  "amount": 90895982.7889086,
  "createdAt": -48441740,
  "id": "Duis commodo magna",
  "name": "consectetur",
  "order": 32099002,
  "updatedAt": 3783041,
  "description": "elit"
}
```

---

### Create campaign spend item

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/campaigns/:campaignGuid/spend`

**Description:** Create a new campaign spend item

**Authentication:** apikey

**Path Variables:**

- `campaignGuid`: (Required) Unique identifier for the campaign.

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "amount": "<number>",
  "name": "<string>",
  "order": "<integer>",
  "description": "<string>"
}
```

**Success Response (201):**

```json
{
  "amount": 90895982.7889086,
  "createdAt": -48441740,
  "id": "Duis commodo magna",
  "name": "consectetur",
  "order": 32099002,
  "updatedAt": 3783041,
  "description": "elit"
}
```

---

