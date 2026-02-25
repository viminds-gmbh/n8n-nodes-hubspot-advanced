# Invoices API

Total endpoints: 11

---

### Read a batch of invoices by internal ID, or unique property values

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/invoices/batch/read?archived=false`

**Authentication:** oauth2

**Query Parameters:**

- `archived`: Whether to return only results that have been archived.

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
  ],
  "properties": [
    "<string>",
    "<string>"
  ],
  "propertiesWithHistory": [
    "<string>",
    "<string>"
  ],
  "idProperty": "<string>"
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
        "ut7ad": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archived": "<boolean>",
      "archivedAt": "<dateTime>",
      "propertiesWithHistory": {
        "ada2_": [
          {
            "sourceType": "<string>",
            "timestamp": "<dateTime>",
            "value": "<string>",
            "sourceId": "<string>",
            "sourceLabel": "<string>",
            "updatedByUserId": "<integer>"
          },
          {
            "sourceType": "<string>",
            "timestamp": "<dateTime>",
            "value": "<string>",
            "sourceId": "<string>",
            "sourceLabel": "<string>",
            "updatedByUserId": "<integer>"
          }
        ],
        "voluptate_1": [
          {
            "sourceType": "<string>",
            "timestamp": "<dateTime>",
            "value": "<string>",
            "sourceId": "<string>",
            "sourceLabel": "<string>",
            "updatedByUserId": "<integer>"
          },
          {
            "sourceType": "<string>",
            "timestamp": "<dateTime>",
            "value": "<string>",
            "sourceId": "<string>",
            "sourceLabel": "<string>",
            "updatedByUserId": "<integer>"
          }
        ],
        "proident04": [
          {
            "sourceType": "<string>",
            "timestamp": "<dateTime>",
            "value": "<string>",
            "sourceId": "<string>",
            "sourceLabel": "<string>",
            "updatedByUserId": "<integer>"
          },
          {
            "sourceType": "<string>",
            "timestamp": "<dateTime>",
            "value": "<string>",
            "sourceId": "<string>",
            "sourceLabel": "<string>",
            "updatedByUserId": "<integer>"
          }
        ],
        "Ut_d": [
          {
            "sourceType": "<string>",
            "timestamp": "<dateTime>",
            "value": "<string>",
            "sourceId": "<string>",
            "sourceLabel": "<string>",
            "updatedByUserId": "<integer>"
          },
          {
            "sourceType": "<string>",
            "timestamp": "<dateTime>",
            "value": "<string>",
            "sourceId": "<string>",
            "sourceLabel": "<string>",
            "updatedByUserId": "<integer>"
          }
        ],
        "Ut_6": [
          {
            "sourceType": "<string>",
            "timestamp": "<dateTime>",
            "value": "<string>",
            "sourceId": "<string>",
            "sourceLabel": "<string>",
            "updatedByUserId": "<integer>"
          },
          {
            "sourceType": "<string>",
            "timestamp": "<dateTime>",
            "value": "<string>",
            "sourceId": "<string>",
            "sourceLabel": "<string>",
            "updatedByUserId": "<integer>"
          }
        ]
      }
    },
    {
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "sit698": "<string>",
        "laboris0": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archived": "<boolean>",
      "archivedAt": "<dateTime>",
      "propertiesWithHistory": {
        "magna4e": [
          {
            "sourceType": "<string>",
            "timestamp": "<dateTime>",
            "value": "<string>",
            "sourceId": "<string>",
            "sourceLabel": "<string>",
            "updatedByUserId": "<integer>"
          },
          {
            "sourceType": "<string>",
            "timestamp": "<dateTime>",
            "value": "<string>",
            "sourceId": "<string>",
            "sourceLabel": "<string>",
            "updatedByUserId": "<integer>"
          }
        ]
      }
    }
  ],
  "startedAt": "<dateTime>",
  "status": "COMPLETE",
  "requestedAt": "<dateTime>",
  "links": {
    "culpa_8": "<string>",
    "ea69": "<string>"
  }
}
```

---

### Read

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/objects/invoices/:invoiceId?properties=<string>&properties=<string>&propertiesWithHistory=<string>&propertiesWithHistory=<string>&associations=<string>&associations=<string>&archived=false&idProperty=<string>`

**Description:** Read an Object identified by `{invoiceId}`. `{invoiceId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.

**Authentication:** oauth2

**Path Variables:**

- `invoiceId`: (Required) 

**Query Parameters:**

- `properties`: A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
- `properties`: A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
- `propertiesWithHistory`: A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.
- `propertiesWithHistory`: A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.
- `associations`: A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
- `associations`: A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
- `archived`: Whether to return only results that have been archived.
- `idProperty`: The name of a property whose values are unique for this object type

**Headers:**


**Success Response (200):**

```json
{
  "createdAt": "<dateTime>",
  "id": "<string>",
  "properties": {
    "aute_504": "<string>",
    "amet65": "<string>"
  },
  "updatedAt": "<dateTime>",
  "associations": {
    "mollit7_": {
      "results": [
        {
          "id": "<string>",
          "type": "<string>"
        },
        {
          "id": "<string>",
          "type": "<string>"
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
  "archived": "<boolean>",
  "archivedAt": "<dateTime>",
  "propertiesWithHistory": {
    "commodo_f": [
      {
        "sourceType": "<string>",
        "timestamp": "<dateTime>",
        "value": "<string>",
        "sourceId": "<string>",
        "sourceLabel": "<string>",
        "updatedByUserId": "<integer>"
      },
      {
        "sourceType": "<string>",
        "timestamp": "<dateTime>",
        "value": "<string>",
        "sourceId": "<string>",
        "sourceLabel": "<string>",
        "updatedByUserId": "<integer>"
      }
    ]
  }
}
```

---

### List

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/objects/invoices?limit=10&after=<string>&properties=<string>&properties=<string>&propertiesWithHistory=<string>&propertiesWithHistory=<string>&associations=<string>&associations=<string>&archived=false`

**Description:** Read a page of invoices. Control what is returned via the `properties` query param.

**Authentication:** oauth2

**Query Parameters:**

- `limit`: The maximum number of results to display per page.
- `after`: The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
- `properties`: A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
- `properties`: A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
- `propertiesWithHistory`: A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.
- `propertiesWithHistory`: A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.
- `associations`: A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
- `associations`: A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
- `archived`: Whether to return only results that have been archived.

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "culpa_2": "<string>",
        "ea39": "<string>"
      },
      "updatedAt": "<dateTime>",
      "associations": {
        "irure57": {
          "results": [
            {
              "id": "<string>",
              "type": "<string>"
            },
            {
              "id": "<string>",
              "type": "<string>"
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
      "archived": "<boolean>",
      "archivedAt": "<dateTime>",
      "propertiesWithHistory": {
        "in_44e": [
          {
            "sourceType": "<string>",
            "timestamp": "<dateTime>",
            "value": "<string>",
            "sourceId": "<string>",
            "sourceLabel": "<string>",
            "updatedByUserId": "<integer>"
          },
          {
            "sourceType": "<string>",
            "timestamp": "<dateTime>",
            "value": "<string>",
            "sourceId": "<string>",
            "sourceLabel": "<string>",
            "updatedByUserId": "<integer>"
          }
        ],
        "nisi_c8": [
          {
            "sourceType": "<string>",
            "timestamp": "<dateTime>",
            "value": "<string>",
            "sourceId": "<string>",
            "sourceLabel": "<string>",
            "updatedByUserId": "<integer>"
          },
          {
            "sourceType": "<string>",
            "timestamp": "<dateTime>",
            "value": "<string>",
            "sourceId": "<string>",
            "sourceLabel": "<string>",
            "updatedByUserId": "<integer>"
          }
        ]
      }
    },
    {
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "Duise00": "<string>",
        "fugiat_7a": "<string>",
        "ut69": "<string>"
      },
      "updatedAt": "<dateTime>",
      "associations": {
        "Lorem_7": {
          "results": [
            {
              "id": "<string>",
              "type": "<string>"
            },
            {
              "id": "<string>",
              "type": "<string>"
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
      "archived": "<boolean>",
      "archivedAt": "<dateTime>",
      "propertiesWithHistory": {
        "minim3": [
          {
            "sourceType": "<string>",
            "timestamp": "<dateTime>",
            "value": "<string>",
            "sourceId": "<string>",
            "sourceLabel": "<string>",
            "updatedByUserId": "<integer>"
          },
          {
            "sourceType": "<string>",
            "timestamp": "<dateTime>",
            "value": "<string>",
            "sourceId": "<string>",
            "sourceLabel": "<string>",
            "updatedByUserId": "<integer>"
          }
        ]
      }
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

### post-/crm/v3/objects/invoices/search do Search

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/invoices/search`

**Authentication:** oauth2

**Headers:**

- `Content-Type`: application/json

**Success Response (200):**

```json
{
  "results": [
    {
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "in_388": "<string>",
        "aute166": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archived": "<boolean>",
      "archivedAt": "<dateTime>",
      "propertiesWithHistory": {
        "reprehenderit7": [
          {
            "sourceType": "<string>",
            "timestamp": "<dateTime>",
            "value": "<string>",
            "sourceId": "<string>",
            "sourceLabel": "<string>",
            "updatedByUserId": "<integer>"
          },
          {
            "sourceType": "<string>",
            "timestamp": "<dateTime>",
            "value": "<string>",
            "sourceId": "<string>",
            "sourceLabel": "<string>",
            "updatedByUserId": "<integer>"
          }
        ]
      }
    },
    {
      "createdAt": "<dateTime>",
      "id": "<string>",
      "properties": {
        "cupidatat244": "<string>",
        "aute_f": "<string>",
        "consequat_f": "<string>",
        "ipsumb9": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archived": "<boolean>",
      "archivedAt": "<dateTime>",
      "propertiesWithHistory": {
        "consectetur_2": [
          {
            "sourceType": "<string>",
            "timestamp": "<dateTime>",
            "value": "<string>",
            "sourceId": "<string>",
            "sourceLabel": "<string>",
            "updatedByUserId": "<integer>"
          },
          {
            "sourceType": "<string>",
            "timestamp": "<dateTime>",
            "value": "<string>",
            "sourceId": "<string>",
            "sourceLabel": "<string>",
            "updatedByUserId": "<integer>"
          }
        ],
        "ut_69f": [
          {
            "sourceType": "<string>",
            "timestamp": "<dateTime>",
            "value": "<string>",
            "sourceId": "<string>",
            "sourceLabel": "<string>",
            "updatedByUserId": "<integer>"
          },
          {
            "sourceType": "<string>",
            "timestamp": "<dateTime>",
            "value": "<string>",
            "sourceId": "<string>",
            "sourceLabel": "<string>",
            "updatedByUserId": "<integer>"
          }
        ]
      }
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

### Archive

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/crm/v3/objects/invoices/:invoiceId`

**Description:** Move an Object identified by `{invoiceId}` to the recycling bin.

**Path Variables:**

- `invoiceId`: (Required) 

**Headers:**


---

### Update

**Method:** `PATCH`

**URL:** `https://api.hubapi.com/crm/v3/objects/invoices/:invoiceId?idProperty=<string>`

**Description:** Perform a partial update of an Object identified by `{invoiceId}`. `{invoiceId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param. Provided property values will be overwritten. Read-only and non-existent properties will be ignored. Properties values can be cleared by passing an empty string.

**Path Variables:**

- `invoiceId`: (Required) 

**Query Parameters:**

- `idProperty`: The name of a property whose values are unique for this object type

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "properties": {
    "Ut26": "<string>"
  },
  "objectWriteTraceId": "<string>"
}
```

**Success Response (200):**

```json
{
  "createdAt": "1984-10-01T04:45:27.537Z",
  "id": "ex nostrud",
  "properties": {
    "mollit70": "amet labore nulla aliquip",
    "sedc3a": "laborum",
    "doloree05": "cupidatat sit dolore dolore eu",
    "Ut_86": "aliqua"
  },
  "updatedAt": "1957-08-13T03:09:43.927Z",
  "archived": true,
  "archivedAt": "2000-05-23T17:59:13.228Z",
  "propertiesWithHistory": {
    "reprehenderitd": [
      {
        "sourceType": "reprehenderit",
        "timestamp": "1989-06-16T22:00:03.340Z",
        "value": "officia eu labore",
        "sourceId": "occaecat mollit veniam exercitation ",
        "sourceLabel": "dolore Lorem sit ipsum culpa",
        "updatedByUserId": -83540352
      },
      {
        "sourceType": "fugiat",
        "timestamp": "1970-08-17T09:45:50.563Z",
        "value": "in minim dolore",
        "sourceId": "culpa",
        "sourceLabel": "proident in",
        "updatedByUserId": -20394806
      }
    ],
    "do72": [
      {
        "sourceType": "ut reprehenderit amet eu",
        "timestamp": "1969-11-22T13:53:12.836Z",
        "value": "mollit reprehenderit ex",
        "sourceId": "consectetur",
        "sourceLabel": "ipsum a",
        "updatedByUserId": -22832863
      },
      {
        "sourceType": "labore",
        "timestamp": "1957-12-25T12:34:04.252Z",
        "value": "nulla aute enim labore",
        "sourceId": "velit dolor culpa sed enim",
        "sourceLabel": "sit in Lorem",
        "updatedByUserId": -267773
      }
    ],
    "in60": [
      {
        "sourceType": "in",
        "timestamp": "2011-01-09T21:09:10.987Z",
        "value": "nisi laboris",
        "sourceId": "mollit aute Ut",
        "sourceLabel": "ad cillum exercitation sint mollit",
        "updatedByUserId": 18206430
      },
      {
        "sourceType": "pariatur irure non et",
        "timestamp": "1967-08-15T03:02:34.588Z",
        "value": "tempor aute ea",
        "sourceId": "enim aliqua in",
        "sourceLabel": "in Duis nisi",
        "updatedByUserId": 49658634
      }
    ],
    "et_d": [
      {
        "sourceType": "sed",
        "timestamp": "1992-07-27T10:42:10.852Z",
        "value": "aliquip venia",
        "sourceId": "dolor Lorem",
        "sourceLabel": "voluptate fugiat Duis commod",
        "updatedByUserId": 37734724
      },
      {
        "sourceType": "quis est",
        "timestamp": "1986-08-29T16:31:48.324Z",
        "value": "dolore ullamco minim velit",
        "sourceId": "ullamco aliquip officia",
        "sourceLabel": "velit dolor sunt exercitation",
        "updatedByUserId": 33081443
      }
    ]
  }
}
```

---

### Archive a batch of invoices by ID

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/invoices/batch/archive`

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    {
      "id": "fugiat consequat"
    },
    {
      "id": "sit officia occaecat"
    }
  ]
}
```

---

### Create a batch of invoices

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/invoices/batch/create`

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    {
      "associations": [
        {
          "to": {
            "id": "<string>"
          },
          "types": [
            {
              "associationCategory": "INTEGRATOR_DEFINED",
              "associationTypeId": "<integer>"
            },
            {
              "associationCategory": "HUBSPOT_DEFINED",
              "associationTypeId": "<integer>"
            }
          ]
        },
        {
          "to": {
            "id": "<string>"
          },
          "types": [
            {
              "associationCategory": "INTEGRATOR_DEFINED",
              "associationTypeId": "<integer>"
            },
            {
              "associationCategory": "HUBSPOT_DEFINED",
              "associationTypeId": "<integer>"
            }
          ]
        }
      ],
      "properties": {
        "consectetur_155": "<string>",
        "velit5": "<string>"
      },
      "objectWriteTraceId": "<string>"
    },
    {
      "associations": [
        {
          "to": {
            "id": "<string>"
          },
          "types": [
            {
              "associationCategory": "USER_DEFINED",
              "associationTypeId": "<integer>"
            },
            {
              "associationCategory": "INTEGRATOR_DEFINED",
              "associationTypeId": "<integer>"
            }
          ]
        },
        {
          "to": {
            "id": "<string>"
          },
          "types": [
            {
              "associationCategory": "USER_DEFINED",
              "associationTypeId": "<integer>"
            },
            {
              "associationCategory": "USER_DEFINED",
              "associationTypeId": "<integer>"
            }
          ]
        }
      ],
      "properties": {
        "eu_026": "<string>"
      },
      "objectWriteTraceId": "<string>"
    }
  ]
}
```

**Success Response (201):**

```json
{
  "completedAt": "2021-08-03T05:01:14.022Z",
  "results": [
    {
      "createdAt": "1957-03-22T21:42:04.988Z",
      "id": "enim irure es",
      "properties": {
        "dolorec0": "cupidatat sunt aute"
      },
      "updatedAt": "2009-11-27T07:17:59.350Z",
      "archived": true,
      "archivedAt": "1982-06-05T13:40:36.717Z",
      "propertiesWithHistory": {
        "animba": [
          {
            "sourceType": "id cillum magna qui",
            "timestamp": "1948-03-07T00:51:27.382Z",
            "value": "aliquip occaecat et ut",
            "sourceId": "in laboris enim laborum labore",
            "sourceLabel": "cupidatat esse eiusmod dolor consequat",
            "updatedByUserId": -79005761
          },
          {
            "sourceType": "ea",
            "timestamp": "1963-07-17T15:08:33.388Z",
            "value": "laborum ea elit cillum",
            "sourceId": "aliquip",
            "sourceLabel": "eiusmod",
            "updatedByUserId": 96178446
          }
        ],
        "Excepteur_77": [
          {
            "sourceType": "exercitation occaecat cupidatat amet",
            "timestamp": "1947-02-09T07:24:31.852Z",
            "value": "dolore minim cillum sed",
            "sourceId": "est reprehenderit sunt nulla",
            "sourceLabel": "enim ",
            "updatedByUserId": -99715049
          },
          {
            "sourceType": "ex tempor dolor",
            "timestamp": "1999-11-08T21:33:40.678Z",
            "value": "adipisicing nisi cillum",
            "sourceId": "amet ex Excepteur ea",
            "sourceLabel": "cillum ad",
            "updatedByUserId": 5087880
          }
        ]
      }
    },
    {
      "createdAt": "1983-08-30T02:58:35.031Z",
      "id": "fugiat mollit",
      "properties": {
        "cupidatat_7": "aliquip laborum eiusmod nostrud",
        "ut_687": "reprehenderit"
      },
      "updatedAt": "1946-09-12T11:06:46.798Z",
      "archived": false,
      "archivedAt": "1962-10-18T10:29:34.153Z",
      "propertiesWithHistory": {
        "irure_67_": [
          {
            "sourceType": "nulla veniam amet quis",
            "timestamp": "1978-08-25T04:12:10.077Z",
            "value": "ut ex",
            "sourceId": "id",
            "sourceLabel": "aute fugiat",
            "updatedByUserId": -14858253
          },
          {
            "sourceType": "nisi",
            "timestamp": "1979-05-31T09:40:21.283Z",
            "value": "anim occaecat veniam",
            "sourceId": "voluptate in sunt ea laborum",
            "sourceLabel": "amet cupidatat",
            "updatedByUserId": 59978911
          }
        ],
        "anim_3": [
          {
            "sourceType": "in",
            "timestamp": "1961-06-01T00:41:17.768Z",
            "value": "pariatur cupidatat officia voluptate",
            "sourceId": "dolore ea Lorem proident paria",
            "sourceLabel": "sint nostrud et",
            "updatedByUserId": 22750256
          },
          {
            "sourceType": "i",
            "timestamp": "2000-11-05T22:09:25.335Z",
            "value": "sit reprehenderit sunt veniam",
            "sourceId": "laboris mollit",
            "sourceLabel": "aliqu",
            "updatedByUserId": -22942412
          }
        ]
      }
    }
  ],
  "startedAt": "1992-02-09T20:13:38.978Z",
  "status": "COMPLETE",
  "requestedAt": "2013-02-07T17:17:26.108Z",
  "links": {
    "ut585": "anim qui nisi et",
    "amet_58": "ex velit voluptate officia"
  }
}
```

---

### Update a batch of invoices by internal ID, or unique property values

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/invoices/batch/update`

**Headers:**

- `Content-Type`: application/json

**Success Response (200):**

```json
{
  "completedAt": "2021-08-03T05:01:14.022Z",
  "results": [
    {
      "createdAt": "1957-03-22T21:42:04.988Z",
      "id": "enim irure es",
      "properties": {
        "dolorec0": "cupidatat sunt aute"
      },
      "updatedAt": "2009-11-27T07:17:59.350Z",
      "archived": true,
      "archivedAt": "1982-06-05T13:40:36.717Z",
      "propertiesWithHistory": {
        "animba": [
          {
            "sourceType": "id cillum magna qui",
            "timestamp": "1948-03-07T00:51:27.382Z",
            "value": "aliquip occaecat et ut",
            "sourceId": "in laboris enim laborum labore",
            "sourceLabel": "cupidatat esse eiusmod dolor consequat",
            "updatedByUserId": -79005761
          },
          {
            "sourceType": "ea",
            "timestamp": "1963-07-17T15:08:33.388Z",
            "value": "laborum ea elit cillum",
            "sourceId": "aliquip",
            "sourceLabel": "eiusmod",
            "updatedByUserId": 96178446
          }
        ],
        "Excepteur_77": [
          {
            "sourceType": "exercitation occaecat cupidatat amet",
            "timestamp": "1947-02-09T07:24:31.852Z",
            "value": "dolore minim cillum sed",
            "sourceId": "est reprehenderit sunt nulla",
            "sourceLabel": "enim ",
            "updatedByUserId": -99715049
          },
          {
            "sourceType": "ex tempor dolor",
            "timestamp": "1999-11-08T21:33:40.678Z",
            "value": "adipisicing nisi cillum",
            "sourceId": "amet ex Excepteur ea",
            "sourceLabel": "cillum ad",
            "updatedByUserId": 5087880
          }
        ]
      }
    },
    {
      "createdAt": "1983-08-30T02:58:35.031Z",
      "id": "fugiat mollit",
      "properties": {
        "cupidatat_7": "aliquip laborum eiusmod nostrud",
        "ut_687": "reprehenderit"
      },
      "updatedAt": "1946-09-12T11:06:46.798Z",
      "archived": false,
      "archivedAt": "1962-10-18T10:29:34.153Z",
      "propertiesWithHistory": {
        "irure_67_": [
          {
            "sourceType": "nulla veniam amet quis",
            "timestamp": "1978-08-25T04:12:10.077Z",
            "value": "ut ex",
            "sourceId": "id",
            "sourceLabel": "aute fugiat",
            "updatedByUserId": -14858253
          },
          {
            "sourceType": "nisi",
            "timestamp": "1979-05-31T09:40:21.283Z",
            "value": "anim occaecat veniam",
            "sourceId": "voluptate in sunt ea laborum",
            "sourceLabel": "amet cupidatat",
            "updatedByUserId": 59978911
          }
        ],
        "anim_3": [
          {
            "sourceType": "in",
            "timestamp": "1961-06-01T00:41:17.768Z",
            "value": "pariatur cupidatat officia voluptate",
            "sourceId": "dolore ea Lorem proident paria",
            "sourceLabel": "sint nostrud et",
            "updatedByUserId": 22750256
          },
          {
            "sourceType": "i",
            "timestamp": "2000-11-05T22:09:25.335Z",
            "value": "sit reprehenderit sunt veniam",
            "sourceId": "laboris mollit",
            "sourceLabel": "aliqu",
            "updatedByUserId": -22942412
          }
        ]
      }
    }
  ],
  "startedAt": "1992-02-09T20:13:38.978Z",
  "status": "COMPLETE",
  "requestedAt": "2013-02-07T17:17:26.108Z",
  "links": {
    "ut585": "anim qui nisi et",
    "amet_58": "ex velit voluptate officia"
  }
}
```

---

### Create

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/invoices`

**Description:** Create a invoice with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard invoices is provided.

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "associations": [
    {
      "to": {
        "id": "<string>"
      },
      "types": [
        {
          "associationCategory": "USER_DEFINED",
          "associationTypeId": "<integer>"
        },
        {
          "associationCategory": "HUBSPOT_DEFINED",
          "associationTypeId": "<integer>"
        }
      ]
    },
    {
      "to": {
        "id": "<string>"
      },
      "types": [
        {
          "associationCategory": "USER_DEFINED",
          "associationTypeId": "<integer>"
        },
        {
          "associationCategory": "INTEGRATOR_DEFINED",
          "associationTypeId": "<integer>"
        }
      ]
    }
  ],
  "properties": {
    "sed_e8b": "<string>",
    "cillum977": "<string>"
  },
  "objectWriteTraceId": "<string>"
}
```

**Success Response (201):**

```json
{
  "createdAt": "1984-10-01T04:45:27.537Z",
  "id": "ex nostrud",
  "properties": {
    "mollit70": "amet labore nulla aliquip",
    "sedc3a": "laborum",
    "doloree05": "cupidatat sit dolore dolore eu",
    "Ut_86": "aliqua"
  },
  "updatedAt": "1957-08-13T03:09:43.927Z",
  "archived": true,
  "archivedAt": "2000-05-23T17:59:13.228Z",
  "propertiesWithHistory": {
    "reprehenderitd": [
      {
        "sourceType": "reprehenderit",
        "timestamp": "1989-06-16T22:00:03.340Z",
        "value": "officia eu labore",
        "sourceId": "occaecat mollit veniam exercitation ",
        "sourceLabel": "dolore Lorem sit ipsum culpa",
        "updatedByUserId": -83540352
      },
      {
        "sourceType": "fugiat",
        "timestamp": "1970-08-17T09:45:50.563Z",
        "value": "in minim dolore",
        "sourceId": "culpa",
        "sourceLabel": "proident in",
        "updatedByUserId": -20394806
      }
    ],
    "do72": [
      {
        "sourceType": "ut reprehenderit amet eu",
        "timestamp": "1969-11-22T13:53:12.836Z",
        "value": "mollit reprehenderit ex",
        "sourceId": "consectetur",
        "sourceLabel": "ipsum a",
        "updatedByUserId": -22832863
      },
      {
        "sourceType": "labore",
        "timestamp": "1957-12-25T12:34:04.252Z",
        "value": "nulla aute enim labore",
        "sourceId": "velit dolor culpa sed enim",
        "sourceLabel": "sit in Lorem",
        "updatedByUserId": -267773
      }
    ],
    "in60": [
      {
        "sourceType": "in",
        "timestamp": "2011-01-09T21:09:10.987Z",
        "value": "nisi laboris",
        "sourceId": "mollit aute Ut",
        "sourceLabel": "ad cillum exercitation sint mollit",
        "updatedByUserId": 18206430
      },
      {
        "sourceType": "pariatur irure non et",
        "timestamp": "1967-08-15T03:02:34.588Z",
        "value": "tempor aute ea",
        "sourceId": "enim aliqua in",
        "sourceLabel": "in Duis nisi",
        "updatedByUserId": 49658634
      }
    ],
    "et_d": [
      {
        "sourceType": "sed",
        "timestamp": "1992-07-27T10:42:10.852Z",
        "value": "aliquip venia",
        "sourceId": "dolor Lorem",
        "sourceLabel": "voluptate fugiat Duis commod",
        "updatedByUserId": 37734724
      },
      {
        "sourceType": "quis est",
        "timestamp": "1986-08-29T16:31:48.324Z",
        "value": "dolore ullamco minim velit",
        "sourceId": "ullamco aliquip officia",
        "sourceLabel": "velit dolor sunt exercitation",
        "updatedByUserId": 33081443
      }
    ]
  }
}
```

---

### Create or update a batch of invoices by unique property values

**Method:** `POST`

**URL:** `https://api.hubapi.com/crm/v3/objects/invoices/batch/upsert`

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "inputs": [
    {
      "id": "<string>",
      "properties": {
        "quis_2": "<string>",
        "ut_59": "<string>"
      },
      "idProperty": "<string>",
      "objectWriteTraceId": "<string>"
    },
    {
      "id": "<string>",
      "properties": {
        "cillum_2_c": "<string>",
        "ut_99c": "<string>"
      },
      "idProperty": "<string>",
      "objectWriteTraceId": "<string>"
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
      "new": "<boolean>",
      "properties": {
        "fugiatb98": "<string>",
        "eae": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archived": "<boolean>",
      "archivedAt": "<dateTime>",
      "propertiesWithHistory": {
        "sed216": [
          {
            "sourceType": "Excepteur",
            "timestamp": "1954-07-13T06:37:50.732Z",
            "value": "tempor mollit aliquip",
            "sourceId": "ad sunt ipsum exercitation do",
            "sourceLabel": "Excepteur",
            "updatedByUserId": -72734141
          },
          {
            "sourceType": "aliqui",
            "timestamp": "2003-10-02T03:18:41.131Z",
            "value": "officia labore incididunt au",
            "sourceId": "minim consectetur",
            "sourceLabel": "pariatur anim",
            "updatedByUserId": 90728803
          }
        ],
        "non_0": [
          {
            "sourceType": "sint dolore do quis",
            "timestamp": "2015-08-18T14:06:21.655Z",
            "value": "dolore amet ad",
            "sourceId": "veniam nulla amet elit ea",
            "sourceLabel": "adipisicing ipsum reprehenderit velit Ut",
            "updatedByUserId": 94429617
          },
          {
            "sourceType": "Duis",
            "timestamp": "1948-12-01T23:23:06.631Z",
            "value": "sint magna",
            "sourceId": "pariatur sint labori",
            "sourceLabel": "nulla dolore in incididunt",
            "updatedByUserId": 28233548
          }
        ]
      }
    },
    {
      "createdAt": "<dateTime>",
      "id": "<string>",
      "new": "<boolean>",
      "properties": {
        "ullamco55": "<string>",
        "aliquip_7": "<string>"
      },
      "updatedAt": "<dateTime>",
      "archived": "<boolean>",
      "archivedAt": "<dateTime>",
      "propertiesWithHistory": {
        "aliquip_5ed": [
          {
            "sourceType": "aliquip",
            "timestamp": "1996-01-12T20:15:36.075Z",
            "value": "laborum in eu",
            "sourceId": "amet id",
            "sourceLabel": "eu anim incididunt",
            "updatedByUserId": 40934998
          },
          {
            "sourceType": "elit fugiat",
            "timestamp": "1975-01-20T15:40:22.551Z",
            "value": "irure",
            "sourceId": "ullamco in",
            "sourceLabel": "et cupidatat laboris",
            "updatedByUserId": -29422852
          }
        ]
      }
    }
  ],
  "startedAt": "<dateTime>",
  "status": "PENDING",
  "requestedAt": "<dateTime>",
  "links": {
    "et0f0": "<string>",
    "temporf": "<string>"
  }
}
```

---

