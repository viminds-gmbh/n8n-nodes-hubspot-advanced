# Subscription Preferences V4 API

Total endpoints: 10

---

### Retrieve all subscription status definitions

**Method:** `GET`

**URL:** `https://api.hubapi.com/communication-preferences/v4/definitions?businessUnitId=<long>&includeTranslations=<boolean>`

**Description:** Get a list of subscription status definitions from the account.

**Authentication:** oauth2

**Query Parameters:**

- `businessUnitId`: If you have the [business unit add-on](https://developers.hubspot.com/beta-docs/guides/api/settings/business-units-api), include this parameter to filter results by business unit ID. The default Account business unit will always use `0`.
- `includeTranslations`: Set to `true` to return subscription translations associated with each definition.

**Headers:**


**Success Response (200):**

```json
{
  "completedAt": "<dateTime>",
  "results": [
    {
      "createdAt": "<dateTime>",
      "description": "<string>",
      "id": "<string>",
      "isActive": "<boolean>",
      "isDefault": "<boolean>",
      "isInternal": "<boolean>",
      "name": "<string>",
      "updatedAt": "<dateTime>",
      "businessUnitId": "<long>",
      "communicationMethod": "<string>",
      "purpose": "<string>",
      "subscriptionTranslations": [
        {
          "createdAt": "<integer>",
          "description": "<string>",
          "languageCode": "<string>",
          "name": "<string>",
          "subscriptionId": "<integer>",
          "updatedAt": "<integer>"
        },
        {
          "createdAt": "<integer>",
          "description": "<string>",
          "languageCode": "<string>",
          "name": "<string>",
          "subscriptionId": "<integer>",
          "updatedAt": "<integer>"
        }
      ]
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
      "businessUnitId": "<long>",
      "communicationMethod": "<string>",
      "purpose": "<string>",
      "subscriptionTranslations": [
        {
          "createdAt": "<integer>",
          "description": "<string>",
          "languageCode": "<string>",
          "name": "<string>",
          "subscriptionId": "<integer>",
          "updatedAt": "<integer>"
        },
        {
          "createdAt": "<integer>",
          "description": "<string>",
          "languageCode": "<string>",
          "name": "<string>",
          "subscriptionId": "<integer>",
          "updatedAt": "<integer>"
        }
      ]
    }
  ],
  "startedAt": "<dateTime>",
  "status": "PENDING",
  "errors": [
    {
      "category": "<string>",
      "context": {
        "key_0": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ],
            "key_1": [
              "<string>",
              "<string>"
            ],
            "key_2": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        },
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        }
      ],
      "links": {
        "key_0": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "id": "<string>",
      "subCategory": {}
    },
    {
      "category": "<string>",
      "context": {
        "key_0": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ],
            "key_1": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        },
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ],
            "key_1": [
              "<string>",
              "<string>"
            ],
            "key_2": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        }
      ],
      "links": {
        "key_0": "<string>",
        "key_1": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "id": "<string>",
      "subCategory": {}
    }
  ],
  "links": {
    "key_0": "<string>"
  },
  "numErrors": "<integer>",
  "requestedAt": "<dateTime>"
}
```

---

### post-/communication-preferences/v4/links/generate_/communication-preferences/v4/links/generate

**Method:** `POST`

**URL:** `https://api.hubapi.com/communication-preferences/v4/links/generate?channel=EMAIL&businessUnitId=0`

**Authentication:** oauth2

**Query Parameters:**

- `channel`: No description
- `businessUnitId`: No description

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "subscriberIdString": "<string>",
  "language": "<string>",
  "subscriptionId": "<long>"
}
```

**Success Response (200):**

```json
{
  "managePreferencesUrl": "<string>",
  "subscriberIdString": "<string>",
  "unsubscribeAllUrl": "<string>",
  "unsubscribeSingleUrl": "<string>"
}
```

---

### Batch retrieve subscription statuses

**Method:** `POST`

**URL:** `https://api.hubapi.com/communication-preferences/v4/statuses/batch/read?channel=EMAIL&businessUnitId=<long>`

**Description:** Batch retrieve subscription statuses for a set of contacts.

**Authentication:** oauth2

**Query Parameters:**

- `channel`: The channel type for the subscription type. Currently, the only supported channel type is `EMAIL`.
- `businessUnitId`: If you have the [business unit add-on](https://developers.hubspot.com/beta-docs/guides/api/settings/business-units-api), include this parameter to filter results by business unit ID. The default Account business unit will always use `0`.

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    "<string>",
    "<string>"
  ]
}
```

**Success Response (200):**

```json
{
  "completedAt": "<dateTime>",
  "results": [
    {
      "statuses": [
        {
          "channel": "EMAIL",
          "source": "<string>",
          "status": "NOT_SPECIFIED",
          "subscriberIdString": "<string>",
          "subscriptionId": "<integer>",
          "timestamp": "<dateTime>",
          "businessUnitId": "<long>",
          "legalBasis": "CONSENT_WITH_NOTICE",
          "legalBasisExplanation": "<string>",
          "setStatusSuccessReason": "NO_STATUS_CHANGE",
          "subscriptionName": "<string>"
        },
        {
          "channel": "EMAIL",
          "source": "<string>",
          "status": "SUBSCRIBED",
          "subscriberIdString": "<string>",
          "subscriptionId": "<integer>",
          "timestamp": "<dateTime>",
          "businessUnitId": "<long>",
          "legalBasis": "LEGITIMATE_INTEREST_CLIENT",
          "legalBasisExplanation": "<string>",
          "setStatusSuccessReason": "NO_STATUS_CHANGE",
          "subscriptionName": "<string>"
        }
      ],
      "subscriberIdString": "<string>"
    },
    {
      "statuses": [
        {
          "channel": "EMAIL",
          "source": "<string>",
          "status": "SUBSCRIBED",
          "subscriberIdString": "<string>",
          "subscriptionId": "<integer>",
          "timestamp": "<dateTime>",
          "businessUnitId": "<long>",
          "legalBasis": "PERFORMANCE_OF_CONTRACT",
          "legalBasisExplanation": "<string>",
          "setStatusSuccessReason": "REQUESTED_CHANGE_OCCURRED",
          "subscriptionName": "<string>"
        },
        {
          "channel": "EMAIL",
          "source": "<string>",
          "status": "UNSUBSCRIBED",
          "subscriberIdString": "<string>",
          "subscriptionId": "<integer>",
          "timestamp": "<dateTime>",
          "businessUnitId": "<long>",
          "legalBasis": "PERFORMANCE_OF_CONTRACT",
          "legalBasisExplanation": "<string>",
          "setStatusSuccessReason": "RESUBSCRIBE_OCCURRED",
          "subscriptionName": "<string>"
        }
      ],
      "subscriberIdString": "<string>"
    }
  ],
  "startedAt": "<dateTime>",
  "status": "PROCESSING",
  "links": {
    "key_0": "<string>"
  },
  "requestedAt": "<dateTime>"
}
```

---

### Batch unsubscribe contacts from all subscriptions

**Method:** `POST`

**URL:** `https://api.hubapi.com/communication-preferences/v4/statuses/batch/unsubscribe-all?channel=EMAIL&businessUnitId=<long>&verbose=false`

**Description:** Unsubscribe a set of contacts from all email subscriptions.

**Authentication:** oauth2

**Query Parameters:**

- `channel`: The channel type for the subscription type. Currently, the only supported channel type is `EMAIL`.
- `businessUnitId`: If you have the [business unit add-on](https://developers.hubspot.com/beta-docs/guides/api/settings/business-units-api), include this parameter to filter results by business unit ID. The default Account business unit will always use `0`.
- `verbose`: Set to `true` to include the details of the updated subscription statuses in the response. Not including this parameter will result in an empty response.

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    "<string>",
    "<string>"
  ]
}
```

**Success Response (200):**

```json
{
  "completedAt": "<dateTime>",
  "results": [
    {
      "subscriberIdString": "<string>",
      "statuses": [
        {
          "channel": "EMAIL",
          "source": "<string>",
          "status": "NOT_SPECIFIED",
          "subscriberIdString": "<string>",
          "subscriptionId": "<integer>",
          "timestamp": "<dateTime>",
          "businessUnitId": "<long>",
          "legalBasis": "CONSENT_WITH_NOTICE",
          "legalBasisExplanation": "<string>",
          "setStatusSuccessReason": "NO_STATUS_CHANGE",
          "subscriptionName": "<string>"
        },
        {
          "channel": "EMAIL",
          "source": "<string>",
          "status": "UNSUBSCRIBED",
          "subscriberIdString": "<string>",
          "subscriptionId": "<integer>",
          "timestamp": "<dateTime>",
          "businessUnitId": "<long>",
          "legalBasis": "LEGITIMATE_INTEREST_PQL",
          "legalBasisExplanation": "<string>",
          "setStatusSuccessReason": "RESUBSCRIBE_OCCURRED",
          "subscriptionName": "<string>"
        }
      ]
    },
    {
      "subscriberIdString": "<string>",
      "statuses": [
        {
          "channel": "EMAIL",
          "source": "<string>",
          "status": "NOT_SPECIFIED",
          "subscriberIdString": "<string>",
          "subscriptionId": "<integer>",
          "timestamp": "<dateTime>",
          "businessUnitId": "<long>",
          "legalBasis": "NON_GDPR",
          "legalBasisExplanation": "<string>",
          "setStatusSuccessReason": "REQUESTED_CHANGE_OCCURRED",
          "subscriptionName": "<string>"
        },
        {
          "channel": "EMAIL",
          "source": "<string>",
          "status": "NOT_SPECIFIED",
          "subscriberIdString": "<string>",
          "subscriptionId": "<integer>",
          "timestamp": "<dateTime>",
          "businessUnitId": "<long>",
          "legalBasis": "PERFORMANCE_OF_CONTRACT",
          "legalBasisExplanation": "<string>",
          "setStatusSuccessReason": "RESUBSCRIBE_OCCURRED",
          "subscriptionName": "<string>"
        }
      ]
    }
  ],
  "startedAt": "<dateTime>",
  "status": "CANCELED",
  "errors": [
    {
      "category": "<string>",
      "context": {
        "key_0": [
          "<string>",
          "<string>"
        ],
        "key_1": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ],
            "key_1": [
              "<string>",
              "<string>"
            ],
            "key_2": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        },
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        }
      ],
      "links": {
        "key_0": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "id": "<string>",
      "subCategory": {}
    },
    {
      "category": "<string>",
      "context": {
        "key_0": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        },
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ],
            "key_1": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        }
      ],
      "links": {
        "key_0": "<string>",
        "key_1": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "id": "<string>",
      "subCategory": {}
    }
  ],
  "links": {
    "key_0": "<string>",
    "key_1": "<string>",
    "key_2": "<string>"
  },
  "numErrors": "<integer>",
  "requestedAt": "<dateTime>"
}
```

---

### Batch retrieve contacts who have opted out of all communications

**Method:** `POST`

**URL:** `https://api.hubapi.com/communication-preferences/v4/statuses/batch/unsubscribe-all/read?channel=EMAIL&businessUnitId=<long>`

**Description:** Checks whether a set of contacts have opted out of all communications.

**Authentication:** oauth2

**Query Parameters:**

- `channel`: The channel type for the subscription type. Currently, the only supported channel type is `EMAIL`.
- `businessUnitId`: If you have the [business unit add-on](https://developers.hubspot.com/beta-docs/guides/api/settings/business-units-api), include this parameter to filter results by business unit ID. The default Account business unit will always use `0`.

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    "<string>",
    "<string>"
  ]
}
```

**Success Response (200):**

```json
{
  "completedAt": "<dateTime>",
  "results": [
    {
      "subscriberIdString": "<string>",
      "wideStatuses": [
        {
          "channel": "EMAIL",
          "status": "NOT_SPECIFIED",
          "subscriberIdString": "<string>",
          "timestamp": "<dateTime>",
          "wideStatusType": "PORTAL_WIDE",
          "businessUnitId": "<long>"
        },
        {
          "channel": "EMAIL",
          "status": "NOT_SPECIFIED",
          "subscriberIdString": "<string>",
          "timestamp": "<dateTime>",
          "wideStatusType": "PORTAL_WIDE",
          "businessUnitId": "<long>"
        }
      ]
    },
    {
      "subscriberIdString": "<string>",
      "wideStatuses": [
        {
          "channel": "EMAIL",
          "status": "SUBSCRIBED",
          "subscriberIdString": "<string>",
          "timestamp": "<dateTime>",
          "wideStatusType": "BUSINESS_UNIT_WIDE",
          "businessUnitId": "<long>"
        },
        {
          "channel": "EMAIL",
          "status": "UNSUBSCRIBED",
          "subscriberIdString": "<string>",
          "timestamp": "<dateTime>",
          "wideStatusType": "PORTAL_WIDE",
          "businessUnitId": "<long>"
        }
      ]
    }
  ],
  "startedAt": "<dateTime>",
  "status": "COMPLETE",
  "links": {
    "key_0": "<string>",
    "key_1": "<string>",
    "key_2": "<string>"
  },
  "requestedAt": "<dateTime>"
}
```

---

### Batch update subscription status

**Method:** `POST`

**URL:** `https://api.hubapi.com/communication-preferences/v4/statuses/batch/write`

**Description:** Update the subscription status for a set of contacts.

**Authentication:** oauth2

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    {
      "channel": "EMAIL",
      "statusState": "NOT_SPECIFIED",
      "subscriberIdString": "<string>",
      "subscriptionId": "<integer>",
      "legalBasis": "LEGITIMATE_INTEREST_CLIENT",
      "legalBasisExplanation": "<string>"
    },
    {
      "channel": "EMAIL",
      "statusState": "UNSUBSCRIBED",
      "subscriberIdString": "<string>",
      "subscriptionId": "<integer>",
      "legalBasis": "NON_GDPR",
      "legalBasisExplanation": "<string>"
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
      "channel": "EMAIL",
      "source": "<string>",
      "status": "NOT_SPECIFIED",
      "subscriberIdString": "<string>",
      "subscriptionId": "<integer>",
      "timestamp": "<dateTime>",
      "businessUnitId": "<long>",
      "legalBasis": "LEGITIMATE_INTEREST_CLIENT",
      "legalBasisExplanation": "<string>",
      "setStatusSuccessReason": "UNSUBSCRIBE_FROM_ALL_OCCURRED",
      "subscriptionName": "<string>"
    },
    {
      "channel": "EMAIL",
      "source": "<string>",
      "status": "UNSUBSCRIBED",
      "subscriberIdString": "<string>",
      "subscriptionId": "<integer>",
      "timestamp": "<dateTime>",
      "businessUnitId": "<long>",
      "legalBasis": "LEGITIMATE_INTEREST_CLIENT",
      "legalBasisExplanation": "<string>",
      "setStatusSuccessReason": "UNSUBSCRIBE_FROM_ALL_OCCURRED",
      "subscriptionName": "<string>"
    }
  ],
  "startedAt": "<dateTime>",
  "status": "COMPLETE",
  "errors": [
    {
      "category": "<string>",
      "context": {
        "key_0": [
          "<string>",
          "<string>"
        ],
        "key_1": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ],
            "key_1": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        },
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ],
            "key_1": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        }
      ],
      "links": {
        "key_0": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "id": "<string>",
      "subCategory": {}
    },
    {
      "category": "<string>",
      "context": {
        "key_0": [
          "<string>",
          "<string>"
        ],
        "key_1": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ],
            "key_1": [
              "<string>",
              "<string>"
            ],
            "key_2": [
              "<string>",
              "<string>"
            ],
            "key_3": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        },
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ],
            "key_1": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        }
      ],
      "links": {
        "key_0": "<string>",
        "key_1": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "id": "<string>",
      "subCategory": {}
    }
  ],
  "links": {
    "key_0": "<string>"
  },
  "numErrors": "<integer>",
  "requestedAt": "<dateTime>"
}
```

---

### Get subscription preferences for a specific contact

**Method:** `GET`

**URL:** `https://api.hubapi.com/communication-preferences/v4/statuses/:subscriberIdString?channel=EMAIL&businessUnitId=<long>`

**Description:** Retrieve a contact's current email subscription preferences.

**Authentication:** oauth2

**Path Variables:**

- `subscriberIdString`: The contact's email address.

**Query Parameters:**

- `channel`: The channel type for the subscription type. Currently, the only supported channel type is `EMAIL`.
- `businessUnitId`: If you have the [business unit add-on](https://developers.hubspot.com/beta-docs/guides/api/settings/business-units-api), include this parameter to filter results by business unit ID. The default Account business unit will always use `0`.

**Headers:**


**Success Response (200):**

```json
{
  "completedAt": "<dateTime>",
  "results": [
    {
      "channel": "EMAIL",
      "source": "<string>",
      "status": "SUBSCRIBED",
      "subscriberIdString": "<string>",
      "subscriptionId": "<integer>",
      "timestamp": "<dateTime>",
      "businessUnitId": "<long>",
      "legalBasis": "CONSENT_WITH_NOTICE",
      "legalBasisExplanation": "<string>",
      "setStatusSuccessReason": "UNSUBSCRIBE_FROM_ALL_OCCURRED",
      "subscriptionName": "<string>"
    },
    {
      "channel": "EMAIL",
      "source": "<string>",
      "status": "SUBSCRIBED",
      "subscriberIdString": "<string>",
      "subscriptionId": "<integer>",
      "timestamp": "<dateTime>",
      "businessUnitId": "<long>",
      "legalBasis": "CONSENT_WITH_NOTICE",
      "legalBasisExplanation": "<string>",
      "setStatusSuccessReason": "NO_STATUS_CHANGE",
      "subscriptionName": "<string>"
    }
  ],
  "startedAt": "<dateTime>",
  "status": "COMPLETE",
  "errors": [
    {
      "category": "<string>",
      "context": {
        "key_0": [
          "<string>",
          "<string>"
        ],
        "key_1": [
          "<string>",
          "<string>"
        ],
        "key_2": [
          "<string>",
          "<string>"
        ],
        "key_3": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ],
            "key_1": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        },
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ],
            "key_1": [
              "<string>",
              "<string>"
            ],
            "key_2": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        }
      ],
      "links": {
        "key_0": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "id": "<string>",
      "subCategory": {}
    },
    {
      "category": "<string>",
      "context": {
        "key_0": [
          "<string>",
          "<string>"
        ],
        "key_1": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        },
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        }
      ],
      "links": {
        "key_0": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "id": "<string>",
      "subCategory": {}
    }
  ],
  "links": {
    "key_0": "<string>",
    "key_1": "<string>"
  },
  "numErrors": "<integer>",
  "requestedAt": "<dateTime>"
}
```

---

### Update a contact's subscription status

**Method:** `POST`

**URL:** `https://api.hubapi.com/communication-preferences/v4/statuses/:subscriberIdString`

**Description:** Set the subscription status of a specific contact.

**Authentication:** oauth2

**Path Variables:**

- `subscriberIdString`: The contact's email address.

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "channel": "EMAIL",
  "statusState": "NOT_SPECIFIED",
  "subscriptionId": "<long>",
  "legalBasis": "LEGITIMATE_INTEREST_OTHER",
  "legalBasisExplanation": "<string>"
}
```

**Success Response (200):**

```json
{
  "completedAt": "<dateTime>",
  "results": [
    {
      "channel": "EMAIL",
      "source": "<string>",
      "status": "SUBSCRIBED",
      "subscriberIdString": "<string>",
      "subscriptionId": "<integer>",
      "timestamp": "<dateTime>",
      "businessUnitId": "<long>",
      "legalBasis": "CONSENT_WITH_NOTICE",
      "legalBasisExplanation": "<string>",
      "setStatusSuccessReason": "UNSUBSCRIBE_FROM_ALL_OCCURRED",
      "subscriptionName": "<string>"
    },
    {
      "channel": "EMAIL",
      "source": "<string>",
      "status": "SUBSCRIBED",
      "subscriberIdString": "<string>",
      "subscriptionId": "<integer>",
      "timestamp": "<dateTime>",
      "businessUnitId": "<long>",
      "legalBasis": "CONSENT_WITH_NOTICE",
      "legalBasisExplanation": "<string>",
      "setStatusSuccessReason": "NO_STATUS_CHANGE",
      "subscriptionName": "<string>"
    }
  ],
  "startedAt": "<dateTime>",
  "status": "COMPLETE",
  "errors": [
    {
      "category": "<string>",
      "context": {
        "key_0": [
          "<string>",
          "<string>"
        ],
        "key_1": [
          "<string>",
          "<string>"
        ],
        "key_2": [
          "<string>",
          "<string>"
        ],
        "key_3": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ],
            "key_1": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        },
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ],
            "key_1": [
              "<string>",
              "<string>"
            ],
            "key_2": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        }
      ],
      "links": {
        "key_0": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "id": "<string>",
      "subCategory": {}
    },
    {
      "category": "<string>",
      "context": {
        "key_0": [
          "<string>",
          "<string>"
        ],
        "key_1": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        },
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        }
      ],
      "links": {
        "key_0": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "id": "<string>",
      "subCategory": {}
    }
  ],
  "links": {
    "key_0": "<string>",
    "key_1": "<string>"
  },
  "numErrors": "<integer>",
  "requestedAt": "<dateTime>"
}
```

---

### Retrieve a contact's unsubscribed status

**Method:** `GET`

**URL:** `https://api.hubapi.com/communication-preferences/v4/statuses/:subscriberIdString/unsubscribe-all?channel=EMAIL&businessUnitId=<long>&verbose=false`

**Description:** Check whether a contact has unsubscribed from all email subscriptions. If a contact has not opted out of all communications, the response `results` array will be empty.

**Authentication:** oauth2

**Path Variables:**

- `subscriberIdString`: The contact's email address.

**Query Parameters:**

- `channel`: The channel type for the subscription type. Currently, the only supported channel type is `EMAIL`.
- `businessUnitId`: If you have the [business unit add-on](https://developers.hubspot.com/beta-docs/guides/api/settings/business-units-api), include this parameter to filter results by business unit ID. The default Account business unit will always use `0`.
- `verbose`: Set to `true` to include the details of the updated subscription statuses in the response. Not including this parameter will result in an empty response.

**Headers:**


**Success Response (200):**

```json
{
  "completedAt": "<dateTime>",
  "results": [
    {
      "channel": "EMAIL",
      "status": "UNSUBSCRIBED",
      "subscriberIdString": "<string>",
      "timestamp": "<dateTime>",
      "wideStatusType": "BUSINESS_UNIT_WIDE",
      "businessUnitId": "<long>"
    },
    {
      "channel": "EMAIL",
      "status": "NOT_SPECIFIED",
      "subscriberIdString": "<string>",
      "timestamp": "<dateTime>",
      "wideStatusType": "BUSINESS_UNIT_WIDE",
      "businessUnitId": "<long>"
    }
  ],
  "startedAt": "<dateTime>",
  "status": "PENDING",
  "errors": [
    {
      "category": "<string>",
      "context": {
        "key_0": [
          "<string>",
          "<string>"
        ],
        "key_1": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ],
            "key_1": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        },
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ],
            "key_1": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        }
      ],
      "links": {
        "key_0": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "id": "<string>",
      "subCategory": {}
    },
    {
      "category": "<string>",
      "context": {
        "key_0": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ],
            "key_1": [
              "<string>",
              "<string>"
            ],
            "key_2": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        },
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ],
            "key_1": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        }
      ],
      "links": {
        "key_0": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "id": "<string>",
      "subCategory": {}
    }
  ],
  "links": {
    "key_0": "<string>"
  },
  "numErrors": "<integer>",
  "requestedAt": "<dateTime>"
}
```

---

### Unsubscribe a contact from all subscriptions

**Method:** `POST`

**URL:** `https://api.hubapi.com/communication-preferences/v4/statuses/:subscriberIdString/unsubscribe-all?channel=EMAIL&businessUnitId=<long>&verbose=false`

**Description:** Unsubscribe a contact from all email subscriptions.

**Authentication:** oauth2

**Path Variables:**

- `subscriberIdString`: The contact's email address.

**Query Parameters:**

- `channel`: The channel type for the subscription type. Currently, the only supported channel type is `EMAIL`.
- `businessUnitId`: If you have the [business unit add-on](https://developers.hubspot.com/beta-docs/guides/api/settings/business-units-api), include this parameter to filter results by business unit ID. The default Account business unit will always use `0`.
- `verbose`: Set to `true` to include the details of the updated subscription statuses in the response. Not including this parameter will result in an empty response.

**Headers:**


**Success Response (200):**

```json
{
  "completedAt": "<dateTime>",
  "results": [
    {
      "channel": "EMAIL",
      "source": "<string>",
      "status": "SUBSCRIBED",
      "subscriberIdString": "<string>",
      "subscriptionId": "<integer>",
      "timestamp": "<dateTime>",
      "businessUnitId": "<long>",
      "legalBasis": "CONSENT_WITH_NOTICE",
      "legalBasisExplanation": "<string>",
      "setStatusSuccessReason": "UNSUBSCRIBE_FROM_ALL_OCCURRED",
      "subscriptionName": "<string>"
    },
    {
      "channel": "EMAIL",
      "source": "<string>",
      "status": "SUBSCRIBED",
      "subscriberIdString": "<string>",
      "subscriptionId": "<integer>",
      "timestamp": "<dateTime>",
      "businessUnitId": "<long>",
      "legalBasis": "CONSENT_WITH_NOTICE",
      "legalBasisExplanation": "<string>",
      "setStatusSuccessReason": "NO_STATUS_CHANGE",
      "subscriptionName": "<string>"
    }
  ],
  "startedAt": "<dateTime>",
  "status": "COMPLETE",
  "errors": [
    {
      "category": "<string>",
      "context": {
        "key_0": [
          "<string>",
          "<string>"
        ],
        "key_1": [
          "<string>",
          "<string>"
        ],
        "key_2": [
          "<string>",
          "<string>"
        ],
        "key_3": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ],
            "key_1": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        },
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ],
            "key_1": [
              "<string>",
              "<string>"
            ],
            "key_2": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        }
      ],
      "links": {
        "key_0": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "id": "<string>",
      "subCategory": {}
    },
    {
      "category": "<string>",
      "context": {
        "key_0": [
          "<string>",
          "<string>"
        ],
        "key_1": [
          "<string>",
          "<string>"
        ]
      },
      "errors": [
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        },
        {
          "message": "<string>",
          "code": "<string>",
          "context": {
            "key_0": [
              "<string>",
              "<string>"
            ]
          },
          "in": "<string>",
          "subCategory": "<string>"
        }
      ],
      "links": {
        "key_0": "<string>"
      },
      "message": "<string>",
      "status": "<string>",
      "id": "<string>",
      "subCategory": {}
    }
  ],
  "links": {
    "key_0": "<string>",
    "key_1": "<string>"
  },
  "numErrors": "<integer>",
  "requestedAt": "<dateTime>"
}
```

---

