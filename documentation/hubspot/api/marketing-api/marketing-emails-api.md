# Marketing Emails API

Total endpoints: 19

---

### Get aggregated statistics

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/emails/statistics/list?startTimestamp=<string>&endTimestamp=<string>&emailIds=<long>&emailIds=<long>&property=<string>`

**Description:** Use this endpoint to get aggregated statistics of emails sent in a specified time span. It also returns the list of emails that were sent during the time span.

**Authentication:** apikey

**Query Parameters:**

- `startTimestamp`: The start timestamp of the time span, in ISO8601 representation.
- `endTimestamp`: The end timestamp of the time span, in ISO8601 representation.
- `emailIds`: Filter by email IDs. Only include statistics of emails with these IDs.
- `emailIds`: Filter by email IDs. Only include statistics of emails with these IDs.
- `property`: Specifies which email properties should be returned. All properties will be returned by default.

**Headers:**


**Success Response (200):**

```json
{
  "emails": [
    "<long>",
    "<long>"
  ],
  "campaignAggregations": {
    "iruree6": {
      "counters": {
        "officiabde": "<long>"
      },
      "deviceBreakdown": {
        "ut_ed": {
          "aute_f": "<long>",
          "in4": "<long>"
        },
        "consectetur39": {
          "Duis_b2": "<long>",
          "do_2": "<long>"
        }
      },
      "qualifierStats": {
        "adipisicing299": {
          "laboris_01": "<long>"
        },
        "dolora": {
          "non12": "<long>"
        }
      },
      "ratios": {
        "Duis5": "<number>",
        "enim_bd": "<number>"
      }
    },
    "minimd2": {
      "counters": {
        "estf": "<long>",
        "esse46": "<long>",
        "dolor_ba1": "<long>"
      },
      "deviceBreakdown": {
        "officia_c6": {
          "officia03": "<long>",
          "tempor_373": "<long>",
          "anim_eb5": "<long>",
          "ex_a": "<long>"
        }
      },
      "qualifierStats": {
        "laboris_e": {
          "aliquip3": "<long>",
          "ea1bb": "<long>"
        },
        "cupidatat5b": {
          "sint_44e": "<long>",
          "minim_b": "<long>"
        },
        "consectetur_2a3": {
          "sunt_c7f": "<long>",
          "sed_8": "<long>"
        }
      },
      "ratios": {
        "essea": "<number>",
        "eu_fd4": "<number>",
        "Excepteurf7a": "<number>",
        "Lorem9fb": "<number>"
      }
    },
    "ut_0": {
      "counters": {
        "consectetur6": "<long>",
        "irurecd6": "<long>"
      },
      "deviceBreakdown": {
        "aliquip_5_6": {
          "ut_1": "<long>",
          "Duisd49": "<long>"
        },
        "cupidatat_b": {
          "dolor27": "<long>",
          "deseruntb": "<long>"
        }
      },
      "qualifierStats": {
        "irure_a9b": {
          "cupidatatc3_": "<long>"
        },
        "reprehenderit_7": {
          "eub": "<long>"
        }
      },
      "ratios": {
        "officia_b": "<number>",
        "velit_2e": "<number>"
      }
    }
  },
  "aggregate": {
    "counters": {
      "velite9": "<long>",
      "consequat5f": "<long>",
      "nisi_f": "<long>"
    },
    "deviceBreakdown": {
      "sunt641": {
        "animae": "<long>",
        "etf6": "<long>"
      },
      "in_26_": {
        "in_c1a": "<long>",
        "officia_97": "<long>",
        "Duis7": "<long>"
      }
    },
    "qualifierStats": {
      "culpa_1": {
        "esse_5": "<long>",
        "qui_63": "<long>"
      }
    },
    "ratios": {
      "sit2c": "<number>",
      "exfa": "<number>",
      "Ut__b4": "<number>"
    }
  }
}
```

---

### Get aggregated statistic intervals

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/emails/statistics/histogram?interval=YEAR&startTimestamp=<string>&endTimestamp=<string>&emailIds=<long>&emailIds=<long>`

**Description:** Get aggregated statistics in intervals for a specified time span. Each interval contains aggregated statistics of the emails that were sent in that time.

**Authentication:** apikey

**Query Parameters:**

- `interval`: The interval to aggregate statistics for.
- `startTimestamp`: The start timestamp of the time span, in ISO8601 representation.
- `endTimestamp`: The end timestamp of the time span, in ISO8601 representation.
- `emailIds`: Filter by email IDs. Only include statistics of emails with these IDs.
- `emailIds`: Filter by email IDs. Only include statistics of emails with these IDs.

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "aggregations": {
        "counters": {
          "nostrudf": "<long>"
        },
        "deviceBreakdown": {
          "enim__1": {
            "ea_d": "<long>",
            "consectetur_bfa": "<long>",
            "nisid5": "<long>"
          },
          "proident52": {
            "tempor_0": "<long>",
            "laborum_2": "<long>",
            "tempor387": "<long>"
          },
          "eiusmod_3": {
            "Excepteur0": "<long>"
          }
        },
        "qualifierStats": {
          "ea_58d": {
            "deseruntb7": "<long>"
          },
          "incididunt6": {
            "Excepteurc": "<long>",
            "adipisicing_58": "<long>"
          },
          "ex_cf": {
            "Lorem_7": "<long>",
            "utf_": "<long>"
          }
        },
        "ratios": {
          "cupidatatb01": "<number>"
        }
      },
      "interval": {
        "end": "<dateTime>",
        "start": "<dateTime>"
      }
    },
    {
      "aggregations": {
        "counters": {
          "voluptate2c6": "<long>",
          "ea_447": "<long>"
        },
        "deviceBreakdown": {
          "in_752": {
            "minim25": "<long>",
            "Duisbd0": "<long>"
          }
        },
        "qualifierStats": {
          "Duis_09": {
            "anim0": "<long>",
            "veniam_52c": "<long>",
            "aute_a5": "<long>",
            "eiusmod_2": "<long>"
          }
        },
        "ratios": {
          "deserunt_1": "<number>",
          "irureece": "<number>"
        }
      },
      "interval": {
        "end": "<dateTime>",
        "start": "<dateTime>"
      }
    }
  ],
  "total": "<integer>"
}
```

---

### Get the variation of a an A/B marketing email

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/emails/:emailId/ab-test/get-variation?archived=<boolean>&includedProperties=<string>&includeStats=<boolean>&marketingCampaignNames=<boolean>&workflowNames=<boolean>`

**Description:** This endpoint lets you obtain the variation of an A/B marketing email. If the email is variation A (master) it will return variation B (variant) and vice versa.

**Authentication:** apikey

**Path Variables:**

- `emailId`: No description

**Query Parameters:**

- `archived`: Boolean variable to request archived email
- `includedProperties`: List of properties to be returned in the API response
- `includeStats`: Boolean variable to request stats to be returned in response
- `marketingCampaignNames`: Boolean variable to request name of the campaign in response
- `workflowNames`: Boolean variable to request name of the associated workflows in response

**Headers:**


**Success Response (200):**

```json
{
  "content": {
    "templatePath": "<string>",
    "plainTextVersion": "<string>",
    "widgets": {
      "Excepteur_8": {},
      "in15": {},
      "tempor_0": {}
    },
    "widgetContainers": {
      "fugiat_f8": {},
      "labore9": {},
      "in74c": {}
    },
    "flexAreas": {
      "commodoed3": {},
      "laborea8": {},
      "ut_5": {}
    },
    "styleSettings": {},
    "smartFields": {
      "culpaf3": {},
      "proident2f": {}
    },
    "themeSettingsValues": {
      "commodo2aa": {}
    }
  },
  "from": {
    "fromName": "<string>",
    "replyTo": "<string>",
    "customReplyTo": "<string>"
  },
  "id": "<string>",
  "name": "<string>",
  "sendOnPublish": "<boolean>",
  "state": "RSS_TO_EMAIL_DRAFT",
  "subcategory": "<string>",
  "subject": "<string>",
  "to": {
    "contactLists": {
      "include": [
        "<long>",
        "<long>"
      ],
      "exclude": [
        "<long>",
        "<long>"
      ]
    },
    "contactIds": {
      "include": [
        "<long>",
        "<long>"
      ],
      "exclude": [
        "<long>",
        "<long>"
      ]
    },
    "limitSendFrequency": "<boolean>",
    "suppressGraymail": "<boolean>"
  },
  "createdById": "<integer>",
  "type": "RESUBSCRIBE_EMAIL",
  "activeDomain": "<string>",
  "archived": "<boolean>",
  "folderId": "<long>",
  "feedbackSurveyId": "<integer>",
  "stats": {
    "counters": {
      "occaecat_35": "<long>",
      "esse_dae": "<long>",
      "aliquip_9b": "<long>"
    },
    "deviceBreakdown": {
      "ad_9": {
        "ea586": "<long>",
        "amet_cce": "<long>"
      },
      "exercitation_2f": {
        "ut_2": "<long>",
        "eiusmod_d1": "<long>"
      }
    },
    "qualifierStats": {
      "Duis_4": {
        "qui_e3": "<long>",
        "laborisf": "<long>"
      },
      "Ut_2": {
        "doloref": "<long>"
      },
      "sunt_3": {
        "qui045": "<long>",
        "nostrud1": "<long>"
      }
    },
    "ratios": {
      "eiusmode34": "<number>",
      "fugiat_41": "<number>"
    }
  },
  "testing": {
    "testId": "<long>",
    "hoursToWait": "<integer>",
    "abSuccessMetric": "OPENS_BY_DELIVERED",
    "abSampleSizeDefault": "variant",
    "abStatus": "automated_master",
    "abTestPercentage": "<integer>",
    "abSamplingDefault": "master"
  },
  "subscriptionDetails": {
    "subscriptionId": "<long>",
    "preferencesGroupId": "<long>",
    "officeLocationId": "<string>"
  },
  "updatedById": "<integer>",
  "publishedById": "<integer>",
  "language": "bo-in",
  "campaign": "<string>",
  "webversion": {
    "slug": "<string>",
    "domain": "<string>",
    "title": "<string>",
    "metaDescription": "<string>",
    "redirectToUrl": "<string>",
    "redirectToPageId": "<long>",
    "expiresAt": "<dateTime>"
  },
  "rssData": {
    "maxEntries": "<integer>",
    "timing": {
      "laborisfe_": {},
      "ipsum2": {}
    },
    "url": "<string>",
    "hubspotBlogId": "<long>",
    "blogEmailType": "<string>",
    "blogImageMaxWidth": "<integer>",
    "rssEntryTemplate": "<string>",
    "useHeadlineAsSubject": "<boolean>",
    "blogLayout": "<string>"
  },
  "isTransactional": "<boolean>",
  "isPublished": "<boolean>",
  "publishDate": "<dateTime>",
  "updatedAt": "<dateTime>",
  "createdAt": "<dateTime>",
  "deletedAt": "<dateTime>",
  "publishedAt": "<dateTime>",
  "isAb": "<boolean>"
}
```

---

### Reset the draft version

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/emails/:emailId/draft/reset`

**Description:** Resets the draft back to a copy of the live object.

**Authentication:** apikey

**Path Variables:**

- `emailId`: No description

**Headers:**


---

### Restore a revision of a marketing email to DRAFT state

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/emails/:emailId/revisions/:revisionId/restore-to-draft`

**Description:** Restores a previous revision of a marketing email to DRAFT state. If there is currently something in the draft for that object, it is overwritten. 

**Authentication:** apikey

**Path Variables:**

- `emailId`: No description
- `revisionId`: No description

**Headers:**


**Success Response (200):**

```json
{
  "content": {
    "templatePath": "<string>",
    "plainTextVersion": "<string>",
    "widgets": {
      "Excepteur_8": {},
      "in15": {},
      "tempor_0": {}
    },
    "widgetContainers": {
      "fugiat_f8": {},
      "labore9": {},
      "in74c": {}
    },
    "flexAreas": {
      "commodoed3": {},
      "laborea8": {},
      "ut_5": {}
    },
    "styleSettings": {},
    "smartFields": {
      "culpaf3": {},
      "proident2f": {}
    },
    "themeSettingsValues": {
      "commodo2aa": {}
    }
  },
  "from": {
    "fromName": "<string>",
    "replyTo": "<string>",
    "customReplyTo": "<string>"
  },
  "id": "<string>",
  "name": "<string>",
  "sendOnPublish": "<boolean>",
  "state": "RSS_TO_EMAIL_DRAFT",
  "subcategory": "<string>",
  "subject": "<string>",
  "to": {
    "contactLists": {
      "include": [
        "<long>",
        "<long>"
      ],
      "exclude": [
        "<long>",
        "<long>"
      ]
    },
    "contactIds": {
      "include": [
        "<long>",
        "<long>"
      ],
      "exclude": [
        "<long>",
        "<long>"
      ]
    },
    "limitSendFrequency": "<boolean>",
    "suppressGraymail": "<boolean>"
  },
  "createdById": "<integer>",
  "type": "RESUBSCRIBE_EMAIL",
  "activeDomain": "<string>",
  "archived": "<boolean>",
  "folderId": "<long>",
  "feedbackSurveyId": "<integer>",
  "stats": {
    "counters": {
      "occaecat_35": "<long>",
      "esse_dae": "<long>",
      "aliquip_9b": "<long>"
    },
    "deviceBreakdown": {
      "ad_9": {
        "ea586": "<long>",
        "amet_cce": "<long>"
      },
      "exercitation_2f": {
        "ut_2": "<long>",
        "eiusmod_d1": "<long>"
      }
    },
    "qualifierStats": {
      "Duis_4": {
        "qui_e3": "<long>",
        "laborisf": "<long>"
      },
      "Ut_2": {
        "doloref": "<long>"
      },
      "sunt_3": {
        "qui045": "<long>",
        "nostrud1": "<long>"
      }
    },
    "ratios": {
      "eiusmode34": "<number>",
      "fugiat_41": "<number>"
    }
  },
  "testing": {
    "testId": "<long>",
    "hoursToWait": "<integer>",
    "abSuccessMetric": "OPENS_BY_DELIVERED",
    "abSampleSizeDefault": "variant",
    "abStatus": "automated_master",
    "abTestPercentage": "<integer>",
    "abSamplingDefault": "master"
  },
  "subscriptionDetails": {
    "subscriptionId": "<long>",
    "preferencesGroupId": "<long>",
    "officeLocationId": "<string>"
  },
  "updatedById": "<integer>",
  "publishedById": "<integer>",
  "language": "bo-in",
  "campaign": "<string>",
  "webversion": {
    "slug": "<string>",
    "domain": "<string>",
    "title": "<string>",
    "metaDescription": "<string>",
    "redirectToUrl": "<string>",
    "redirectToPageId": "<long>",
    "expiresAt": "<dateTime>"
  },
  "rssData": {
    "maxEntries": "<integer>",
    "timing": {
      "laborisfe_": {},
      "ipsum2": {}
    },
    "url": "<string>",
    "hubspotBlogId": "<long>",
    "blogEmailType": "<string>",
    "blogImageMaxWidth": "<integer>",
    "rssEntryTemplate": "<string>",
    "useHeadlineAsSubject": "<boolean>",
    "blogLayout": "<string>"
  },
  "isTransactional": "<boolean>",
  "isPublished": "<boolean>",
  "publishDate": "<dateTime>",
  "updatedAt": "<dateTime>",
  "createdAt": "<dateTime>",
  "deletedAt": "<dateTime>",
  "publishedAt": "<dateTime>",
  "isAb": "<boolean>"
}
```

---

### Get draft version of a marketing email

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/emails/:emailId/draft`

**Description:** Get the draft version of an email (if it exists). If no draft version exists, the published email is returned.

**Authentication:** apikey

**Path Variables:**

- `emailId`: No description

**Headers:**


**Success Response (200):**

```json
{
  "content": {
    "templatePath": "<string>",
    "plainTextVersion": "<string>",
    "widgets": {
      "Excepteur_8": {},
      "in15": {},
      "tempor_0": {}
    },
    "widgetContainers": {
      "fugiat_f8": {},
      "labore9": {},
      "in74c": {}
    },
    "flexAreas": {
      "commodoed3": {},
      "laborea8": {},
      "ut_5": {}
    },
    "styleSettings": {},
    "smartFields": {
      "culpaf3": {},
      "proident2f": {}
    },
    "themeSettingsValues": {
      "commodo2aa": {}
    }
  },
  "from": {
    "fromName": "<string>",
    "replyTo": "<string>",
    "customReplyTo": "<string>"
  },
  "id": "<string>",
  "name": "<string>",
  "sendOnPublish": "<boolean>",
  "state": "RSS_TO_EMAIL_DRAFT",
  "subcategory": "<string>",
  "subject": "<string>",
  "to": {
    "contactLists": {
      "include": [
        "<long>",
        "<long>"
      ],
      "exclude": [
        "<long>",
        "<long>"
      ]
    },
    "contactIds": {
      "include": [
        "<long>",
        "<long>"
      ],
      "exclude": [
        "<long>",
        "<long>"
      ]
    },
    "limitSendFrequency": "<boolean>",
    "suppressGraymail": "<boolean>"
  },
  "createdById": "<integer>",
  "type": "RESUBSCRIBE_EMAIL",
  "activeDomain": "<string>",
  "archived": "<boolean>",
  "folderId": "<long>",
  "feedbackSurveyId": "<integer>",
  "stats": {
    "counters": {
      "occaecat_35": "<long>",
      "esse_dae": "<long>",
      "aliquip_9b": "<long>"
    },
    "deviceBreakdown": {
      "ad_9": {
        "ea586": "<long>",
        "amet_cce": "<long>"
      },
      "exercitation_2f": {
        "ut_2": "<long>",
        "eiusmod_d1": "<long>"
      }
    },
    "qualifierStats": {
      "Duis_4": {
        "qui_e3": "<long>",
        "laborisf": "<long>"
      },
      "Ut_2": {
        "doloref": "<long>"
      },
      "sunt_3": {
        "qui045": "<long>",
        "nostrud1": "<long>"
      }
    },
    "ratios": {
      "eiusmode34": "<number>",
      "fugiat_41": "<number>"
    }
  },
  "testing": {
    "testId": "<long>",
    "hoursToWait": "<integer>",
    "abSuccessMetric": "OPENS_BY_DELIVERED",
    "abSampleSizeDefault": "variant",
    "abStatus": "automated_master",
    "abTestPercentage": "<integer>",
    "abSamplingDefault": "master"
  },
  "subscriptionDetails": {
    "subscriptionId": "<long>",
    "preferencesGroupId": "<long>",
    "officeLocationId": "<string>"
  },
  "updatedById": "<integer>",
  "publishedById": "<integer>",
  "language": "bo-in",
  "campaign": "<string>",
  "webversion": {
    "slug": "<string>",
    "domain": "<string>",
    "title": "<string>",
    "metaDescription": "<string>",
    "redirectToUrl": "<string>",
    "redirectToPageId": "<long>",
    "expiresAt": "<dateTime>"
  },
  "rssData": {
    "maxEntries": "<integer>",
    "timing": {
      "laborisfe_": {},
      "ipsum2": {}
    },
    "url": "<string>",
    "hubspotBlogId": "<long>",
    "blogEmailType": "<string>",
    "blogImageMaxWidth": "<integer>",
    "rssEntryTemplate": "<string>",
    "useHeadlineAsSubject": "<boolean>",
    "blogLayout": "<string>"
  },
  "isTransactional": "<boolean>",
  "isPublished": "<boolean>",
  "publishDate": "<dateTime>",
  "updatedAt": "<dateTime>",
  "createdAt": "<dateTime>",
  "deletedAt": "<dateTime>",
  "publishedAt": "<dateTime>",
  "isAb": "<boolean>"
}
```

---

### Create or update draft version

**Method:** `PATCH`

**URL:** `https://api.hubapi.com/marketing/v3/emails/:emailId/draft`

**Description:** Create or update the draft version of a marketing email. If no draft exists, the system creates a draft from the current “live” email then applies the request body to that draft. The draft version only lives on the buffer—the email is not cloned.

**Authentication:** apikey

**Path Variables:**

- `emailId`: No description

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "content": {
    "templatePath": "<string>",
    "plainTextVersion": "<string>",
    "widgets": {
      "Excepteur_8": {},
      "in15": {},
      "tempor_0": {}
    },
    "widgetContainers": {
      "fugiat_f8": {},
      "labore9": {},
      "in74c": {}
    },
    "flexAreas": {
      "commodoed3": {},
      "laborea8": {},
      "ut_5": {}
    },
    "styleSettings": {},
    "smartFields": {
      "culpaf3": {},
      "proident2f": {}
    },
    "themeSettingsValues": {
      "commodo2aa": {}
    }
  },
  "from": {
    "fromName": "<string>",
    "replyTo": "<string>",
    "customReplyTo": "<string>"
  },
  "id": "<string>",
  "name": "<string>",
  "sendOnPublish": "<boolean>",
  "state": "RSS_TO_EMAIL_DRAFT",
  "subcategory": "membership_registration_follow_up",
  "subject": "<string>",
  "to": {
    "contactLists": {
      "include": [
        "<long>",
        "<long>"
      ],
      "exclude": [
        "<long>",
        "<long>"
      ]
    },
    "contactIds": {
      "include": [
        "<long>",
        "<long>"
      ],
      "exclude": [
        "<long>",
        "<long>"
      ]
    },
    "limitSendFrequency": "<boolean>",
    "suppressGraymail": "<boolean>"
  },
  "createdById": "<integer>",
  "type": "RESUBSCRIBE_EMAIL",
  "activeDomain": "<string>",
  "archived": "<boolean>",
  "folderId": "<long>",
  "feedbackSurveyId": "<integer>",
  "stats": {
    "counters": {
      "occaecat_35": "<long>",
      "esse_dae": "<long>",
      "aliquip_9b": "<long>"
    },
    "deviceBreakdown": {
      "ad_9": {
        "ea586": "<long>",
        "amet_cce": "<long>"
      },
      "exercitation_2f": {
        "ut_2": "<long>",
        "eiusmod_d1": "<long>"
      }
    },
    "qualifierStats": {
      "Duis_4": {
        "qui_e3": "<long>",
        "laborisf": "<long>"
      },
      "Ut_2": {
        "doloref": "<long>"
      },
      "sunt_3": {
        "qui045": "<long>",
        "nostrud1": "<long>"
      }
    },
    "ratios": {
      "eiusmode34": "<number>",
      "fugiat_41": "<number>"
    }
  },
  "testing": {
    "testId": "<long>",
    "hoursToWait": "<integer>",
    "abSuccessMetric": "OPENS_BY_DELIVERED",
    "abSampleSizeDefault": "variant",
    "abStatus": "automated_master",
    "abTestPercentage": "<integer>",
    "abSamplingDefault": "master"
  },
  "subscriptionDetails": {
    "subscriptionId": "<long>",
    "preferencesGroupId": "<long>",
    "officeLocationId": "<string>"
  },
  "updatedById": "<integer>",
  "publishedById": "<integer>",
  "language": "bo-in",
  "campaign": "<string>",
  "webversion": {
    "slug": "<string>",
    "domain": "<string>",
    "title": "<string>",
    "metaDescription": "<string>",
    "redirectToUrl": "<string>",
    "redirectToPageId": "<long>",
    "expiresAt": "<dateTime>"
  },
  "rssData": {
    "maxEntries": "<integer>",
    "timing": {
      "laborisfe_": {},
      "ipsum2": {}
    },
    "url": "<string>",
    "hubspotBlogId": "<long>",
    "blogEmailType": "<string>",
    "blogImageMaxWidth": "<integer>",
    "rssEntryTemplate": "<string>",
    "useHeadlineAsSubject": "<boolean>",
    "blogLayout": "<string>"
  },
  "isTransactional": "<boolean>",
  "isPublished": "<boolean>",
  "publishDate": "<dateTime>",
  "updatedAt": "<dateTime>",
  "createdAt": "<dateTime>",
  "deletedAt": "<dateTime>",
  "publishedAt": "<dateTime>"
}
```

**Success Response (200):**

```json
{
  "content": {
    "templatePath": "<string>",
    "plainTextVersion": "<string>",
    "widgets": {
      "Excepteur_8": {},
      "in15": {},
      "tempor_0": {}
    },
    "widgetContainers": {
      "fugiat_f8": {},
      "labore9": {},
      "in74c": {}
    },
    "flexAreas": {
      "commodoed3": {},
      "laborea8": {},
      "ut_5": {}
    },
    "styleSettings": {},
    "smartFields": {
      "culpaf3": {},
      "proident2f": {}
    },
    "themeSettingsValues": {
      "commodo2aa": {}
    }
  },
  "from": {
    "fromName": "<string>",
    "replyTo": "<string>",
    "customReplyTo": "<string>"
  },
  "id": "<string>",
  "name": "<string>",
  "sendOnPublish": "<boolean>",
  "state": "RSS_TO_EMAIL_DRAFT",
  "subcategory": "<string>",
  "subject": "<string>",
  "to": {
    "contactLists": {
      "include": [
        "<long>",
        "<long>"
      ],
      "exclude": [
        "<long>",
        "<long>"
      ]
    },
    "contactIds": {
      "include": [
        "<long>",
        "<long>"
      ],
      "exclude": [
        "<long>",
        "<long>"
      ]
    },
    "limitSendFrequency": "<boolean>",
    "suppressGraymail": "<boolean>"
  },
  "createdById": "<integer>",
  "type": "RESUBSCRIBE_EMAIL",
  "activeDomain": "<string>",
  "archived": "<boolean>",
  "folderId": "<long>",
  "feedbackSurveyId": "<integer>",
  "stats": {
    "counters": {
      "occaecat_35": "<long>",
      "esse_dae": "<long>",
      "aliquip_9b": "<long>"
    },
    "deviceBreakdown": {
      "ad_9": {
        "ea586": "<long>",
        "amet_cce": "<long>"
      },
      "exercitation_2f": {
        "ut_2": "<long>",
        "eiusmod_d1": "<long>"
      }
    },
    "qualifierStats": {
      "Duis_4": {
        "qui_e3": "<long>",
        "laborisf": "<long>"
      },
      "Ut_2": {
        "doloref": "<long>"
      },
      "sunt_3": {
        "qui045": "<long>",
        "nostrud1": "<long>"
      }
    },
    "ratios": {
      "eiusmode34": "<number>",
      "fugiat_41": "<number>"
    }
  },
  "testing": {
    "testId": "<long>",
    "hoursToWait": "<integer>",
    "abSuccessMetric": "OPENS_BY_DELIVERED",
    "abSampleSizeDefault": "variant",
    "abStatus": "automated_master",
    "abTestPercentage": "<integer>",
    "abSamplingDefault": "master"
  },
  "subscriptionDetails": {
    "subscriptionId": "<long>",
    "preferencesGroupId": "<long>",
    "officeLocationId": "<string>"
  },
  "updatedById": "<integer>",
  "publishedById": "<integer>",
  "language": "bo-in",
  "campaign": "<string>",
  "webversion": {
    "slug": "<string>",
    "domain": "<string>",
    "title": "<string>",
    "metaDescription": "<string>",
    "redirectToUrl": "<string>",
    "redirectToPageId": "<long>",
    "expiresAt": "<dateTime>"
  },
  "rssData": {
    "maxEntries": "<integer>",
    "timing": {
      "laborisfe_": {},
      "ipsum2": {}
    },
    "url": "<string>",
    "hubspotBlogId": "<long>",
    "blogEmailType": "<string>",
    "blogImageMaxWidth": "<integer>",
    "rssEntryTemplate": "<string>",
    "useHeadlineAsSubject": "<boolean>",
    "blogLayout": "<string>"
  },
  "isTransactional": "<boolean>",
  "isPublished": "<boolean>",
  "publishDate": "<dateTime>",
  "updatedAt": "<dateTime>",
  "createdAt": "<dateTime>",
  "deletedAt": "<dateTime>",
  "publishedAt": "<dateTime>",
  "isAb": "<boolean>"
}
```

---

### Get revisions of a marketing email

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/emails/:emailId/revisions?after=<string>&before=<string>&limit=<integer>`

**Description:** Get a list of all versions of a marketing email, with each entry including the full state of that particular version. The current revision has the ID -1.

**Authentication:** apikey

**Path Variables:**

- `emailId`: No description

**Query Parameters:**

- `after`: The cursor token value to get the next set of results. You can get this from the `paging.next.after` JSON property of a paged response containing more results.
- `before`: The cursor token value to get the previous set of results. You can get this from the `paging.prev.before` JSON property of a paged response containing more results.
- `limit`: The maximum number of results to return. Default is 100.

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "id": "<string>",
      "object": {
        "abHoursToWait": "<integer>",
        "abStatus": "mab_variant",
        "abTestId": "<string>",
        "archivedAt": "<dateTime>",
        "archivedInDashboard": "<boolean>",
        "attachedStylesheets": [
          {
            "magna_d6": {}
          },
          {
            "velitd": {},
            "sunt_2_8": {}
          }
        ],
        "authorName": "<string>",
        "blogEmailType": "<string>",
        "campaign": "<string>",
        "categoryId": "<integer>",
        "contentGroupId": "<string>",
        "contentTypeCategory": "6",
        "createPage": "<boolean>",
        "created": "<dateTime>",
        "createdById": "<string>",
        "currentState": "AUTOMATED_AB_VARIANT",
        "currentlyPublished": "<boolean>",
        "customReplyTo": "<string>",
        "customReplyToEnabled": "<boolean>",
        "domain": "<string>",
        "dynamicPageDataSourceId": "<string>",
        "dynamicPageDataSourceType": "<integer>",
        "dynamicPageHubDbTableId": "<string>",
        "emailType": "MEMBERSHIP_PASSWORD_RESET_EMAIL",
        "enableDomainStylesheets": "<boolean>",
        "enableLayoutStylesheets": "<boolean>",
        "featuredImage": "<string>",
        "featuredImageAltText": "<string>",
        "folderId": "<long>",
        "footerHtml": "<string>",
        "fromName": "<string>",
        "headHtml": "<string>",
        "htmlTitle": "<string>",
        "id": "<string>",
        "includeDefaultCustomCss": "<boolean>",
        "isGraymailSuppressionEnabled": "<boolean>",
        "language": "ar-iq",
        "layoutSections": {
          "irure2": {
            "cells": [
              {
                "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
              },
              {
                "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
              }
            ],
            "cssClass": "<string>",
            "cssId": "<string>",
            "cssStyle": "<string>",
            "label": "<string>",
            "name": "<string>",
            "params": {
              "reprehenderit_a_6": {},
              "sit1d": {},
              "ex_c": {}
            },
            "rowMetaData": [
              {
                "cssClass": "<string>",
                "styles": {
                  "backgroundColor": {
                    "a": "<number>",
                    "b": "<integer>",
                    "g": "<integer>",
                    "r": "<integer>"
                  },
                  "backgroundGradient": {
                    "angle": {
                      "units": "<string>",
                      "value": "<number>"
                    },
                    "colors": [
                      {
                        "color": {
                          "a": "<number>",
                          "b": "<integer>",
                          "g": "<integer>",
                          "r": "<integer>"
                        }
                      },
                      {
                        "color": {
                          "a": "<number>",
                          "b": "<integer>",
                          "g": "<integer>",
                          "r": "<integer>"
                        }
                      }
                    ],
                    "sideOrCorner": {
                      "horizontalSide": "<string>",
                      "verticalSide": "<string>"
                    }
                  },
                  "backgroundImage": {
                    "backgroundPosition": "<string>",
                    "backgroundSize": "<string>",
                    "imageUrl": "<string>"
                  },
                  "flexboxPositioning": "<string>",
                  "forceFullWidthSection": "<boolean>",
                  "maxWidthSectionCentering": "<integer>",
                  "verticalAlignment": "<string>"
                }
              },
              {
                "cssClass": "<string>",
                "styles": {
                  "backgroundColor": {
                    "a": "<number>",
                    "b": "<integer>",
                    "g": "<integer>",
                    "r": "<integer>"
                  },
                  "backgroundGradient": {
                    "angle": {
                      "units": "<string>",
                      "value": "<number>"
                    },
                    "colors": [
                      {
                        "color": {
                          "a": "<number>",
                          "b": "<integer>",
                          "g": "<integer>",
                          "r": "<integer>"
                        }
                      },
                      {
                        "color": {
                          "a": "<number>",
                          "b": "<integer>",
                          "g": "<integer>",
                          "r": "<integer>"
                        }
                      }
                    ],
                    "sideOrCorner": {
                      "horizontalSide": "<string>",
                      "verticalSide": "<string>"
                    }
                  },
                  "backgroundImage": {
                    "backgroundPosition": "<string>",
                    "backgroundSize": "<string>",
                    "imageUrl": "<string>"
                  },
                  "flexboxPositioning": "<string>",
                  "forceFullWidthSection": "<boolean>",
                  "maxWidthSectionCentering": "<integer>",
                  "verticalAlignment": "<string>"
                }
              }
            ],
            "rows": [
              {
                "ex__e8": {
                  "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
                }
              },
              {
                "magna8d": {
                  "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
                },
                "in3": {
                  "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
                },
                "id_04": {
                  "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
                }
              }
            ],
            "styles": {
              "backgroundColor": {
                "a": "<number>",
                "b": "<integer>",
                "g": "<integer>",
                "r": "<integer>"
              },
              "backgroundGradient": {
                "angle": {
                  "units": "<string>",
                  "value": "<number>"
                },
                "colors": [
                  {
                    "color": {
                      "a": "<number>",
                      "b": "<integer>",
                      "g": "<integer>",
                      "r": "<integer>"
                    }
                  },
                  {
                    "color": {
                      "a": "<number>",
                      "b": "<integer>",
                      "g": "<integer>",
                      "r": "<integer>"
                    }
                  }
                ],
                "sideOrCorner": {
                  "horizontalSide": "<string>",
                  "verticalSide": "<string>"
                }
              },
              "backgroundImage": {
                "backgroundPosition": "<string>",
                "backgroundSize": "<string>",
                "imageUrl": "<string>"
              },
              "flexboxPositioning": "<string>",
              "forceFullWidthSection": "<boolean>",
              "maxWidthSectionCentering": "<integer>",
              "verticalAlignment": "<string>"
            },
            "type": "<string>",
            "w": "<integer>",
            "x": "<integer>"
          },
          "Ut_d4b": {
            "cells": [
              {
                "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
              },
              {
                "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
              }
            ],
            "cssClass": "<string>",
            "cssId": "<string>",
            "cssStyle": "<string>",
            "label": "<string>",
            "name": "<string>",
            "params": {
              "id2": {}
            },
            "rowMetaData": [
              {
                "cssClass": "<string>",
                "styles": {
                  "backgroundColor": {
                    "a": "<number>",
                    "b": "<integer>",
                    "g": "<integer>",
                    "r": "<integer>"
                  },
                  "backgroundGradient": {
                    "angle": {
                      "units": "<string>",
                      "value": "<number>"
                    },
                    "colors": [
                      {
                        "color": {
                          "a": "<number>",
                          "b": "<integer>",
                          "g": "<integer>",
                          "r": "<integer>"
                        }
                      },
                      {
                        "color": {
                          "a": "<number>",
                          "b": "<integer>",
                          "g": "<integer>",
                          "r": "<integer>"
                        }
                      }
                    ],
                    "sideOrCorner": {
                      "horizontalSide": "<string>",
                      "verticalSide": "<string>"
                    }
                  },
                  "backgroundImage": {
                    "backgroundPosition": "<string>",
                    "backgroundSize": "<string>",
                    "imageUrl": "<string>"
                  },
                  "flexboxPositioning": "<string>",
                  "forceFullWidthSection": "<boolean>",
                  "maxWidthSectionCentering": "<integer>",
                  "verticalAlignment": "<string>"
                }
              },
              {
                "cssClass": "<string>",
                "styles": {
                  "backgroundColor": {
                    "a": "<number>",
                    "b": "<integer>",
                    "g": "<integer>",
                    "r": "<integer>"
                  },
                  "backgroundGradient": {
                    "angle": {
                      "units": "<string>",
                      "value": "<number>"
                    },
                    "colors": [
                      {
                        "color": {
                          "a": "<number>",
                          "b": "<integer>",
                          "g": "<integer>",
                          "r": "<integer>"
                        }
                      },
                      {
                        "color": {
                          "a": "<number>",
                          "b": "<integer>",
                          "g": "<integer>",
                          "r": "<integer>"
                        }
                      }
                    ],
                    "sideOrCorner": {
                      "horizontalSide": "<string>",
                      "verticalSide": "<string>"
                    }
                  },
                  "backgroundImage": {
                    "backgroundPosition": "<string>",
                    "backgroundSize": "<string>",
                    "imageUrl": "<string>"
                  },
                  "flexboxPositioning": "<string>",
                  "forceFullWidthSection": "<boolean>",
                  "maxWidthSectionCentering": "<integer>",
                  "verticalAlignment": "<string>"
                }
              }
            ],
            "rows": [
              {
                "nulla_c8a": {
                  "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
                },
                "cupidatat_8": {
                  "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
                }
              },
              {
                "culpa1_4": {
                  "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
                },
                "ut_dd0": {
                  "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
                },
                "Duis_9": {
                  "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
                }
              }
            ],
            "styles": {
              "backgroundColor": {
                "a": "<number>",
                "b": "<integer>",
                "g": "<integer>",
                "r": "<integer>"
              },
              "backgroundGradient": {
                "angle": {
                  "units": "<string>",
                  "value": "<number>"
                },
                "colors": [
                  {
                    "color": {
                      "a": "<number>",
                      "b": "<integer>",
                      "g": "<integer>",
                      "r": "<integer>"
                    }
                  },
                  {
                    "color": {
                      "a": "<number>",
                      "b": "<integer>",
                      "g": "<integer>",
                      "r": "<integer>"
                    }
                  }
                ],
                "sideOrCorner": {
                  "horizontalSide": "<string>",
                  "verticalSide": "<string>"
                }
              },
              "backgroundImage": {
                "backgroundPosition": "<string>",
                "backgroundSize": "<string>",
                "imageUrl": "<string>"
              },
              "flexboxPositioning": "<string>",
              "forceFullWidthSection": "<boolean>",
              "maxWidthSectionCentering": "<integer>",
              "verticalAlignment": "<string>"
            },
            "type": "<string>",
            "w": "<integer>",
            "x": "<integer>"
          },
          "fugiat182": {
            "cells": [
              {
                "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
              },
              {
                "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
              }
            ],
            "cssClass": "<string>",
            "cssId": "<string>",
            "cssStyle": "<string>",
            "label": "<string>",
            "name": "<string>",
            "params": {
              "deserunt_91": {}
            },
            "rowMetaData": [
              {
                "cssClass": "<string>",
                "styles": {
                  "backgroundColor": {
                    "a": "<number>",
                    "b": "<integer>",
                    "g": "<integer>",
                    "r": "<integer>"
                  },
                  "backgroundGradient": {
                    "angle": {
                      "units": "<string>",
                      "value": "<number>"
                    },
                    "colors": [
                      {
                        "color": {
                          "a": "<number>",
                          "b": "<integer>",
                          "g": "<integer>",
                          "r": "<integer>"
                        }
                      },
                      {
                        "color": {
                          "a": "<number>",
                          "b": "<integer>",
                          "g": "<integer>",
                          "r": "<integer>"
                        }
                      }
                    ],
                    "sideOrCorner": {
                      "horizontalSide": "<string>",
                      "verticalSide": "<string>"
                    }
                  },
                  "backgroundImage": {
                    "backgroundPosition": "<string>",
                    "backgroundSize": "<string>",
                    "imageUrl": "<string>"
                  },
                  "flexboxPositioning": "<string>",
                  "forceFullWidthSection": "<boolean>",
                  "maxWidthSectionCentering": "<integer>",
                  "verticalAlignment": "<string>"
                }
              },
              {
                "cssClass": "<string>",
                "styles": {
                  "backgroundColor": {
                    "a": "<number>",
                    "b": "<integer>",
                    "g": "<integer>",
                    "r": "<integer>"
                  },
                  "backgroundGradient": {
                    "angle": {
                      "units": "<string>",
                      "value": "<number>"
                    },
                    "colors": [
                      {
                        "color": {
                          "a": "<number>",
                          "b": "<integer>",
                          "g": "<integer>",
                          "r": "<integer>"
                        }
                      },
                      {
                        "color": {
                          "a": "<number>",
                          "b": "<integer>",
                          "g": "<integer>",
                          "r": "<integer>"
                        }
                      }
                    ],
                    "sideOrCorner": {
                      "horizontalSide": "<string>",
                      "verticalSide": "<string>"
                    }
                  },
                  "backgroundImage": {
                    "backgroundPosition": "<string>",
                    "backgroundSize": "<string>",
                    "imageUrl": "<string>"
                  },
                  "flexboxPositioning": "<string>",
                  "forceFullWidthSection": "<boolean>",
                  "maxWidthSectionCentering": "<integer>",
                  "verticalAlignment": "<string>"
                }
              }
            ],
            "rows": [
              {
                "Lorem_35c": {
                  "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
                },
                "cillum__e9": {
                  "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
                }
              },
              {
                "ullamco90_": {
                  "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
                }
              }
            ],
            "styles": {
              "backgroundColor": {
                "a": "<number>",
                "b": "<integer>",
                "g": "<integer>",
                "r": "<integer>"
              },
              "backgroundGradient": {
                "angle": {
                  "units": "<string>",
                  "value": "<number>"
                },
                "colors": [
                  {
                    "color": {
                      "a": "<number>",
                      "b": "<integer>",
                      "g": "<integer>",
                      "r": "<integer>"
                    }
                  },
                  {
                    "color": {
                      "a": "<number>",
                      "b": "<integer>",
                      "g": "<integer>",
                      "r": "<integer>"
                    }
                  }
                ],
                "sideOrCorner": {
                  "horizontalSide": "<string>",
                  "verticalSide": "<string>"
                }
              },
              "backgroundImage": {
                "backgroundPosition": "<string>",
                "backgroundSize": "<string>",
                "imageUrl": "<string>"
              },
              "flexboxPositioning": "<string>",
              "forceFullWidthSection": "<boolean>",
              "maxWidthSectionCentering": "<integer>",
              "verticalAlignment": "<string>"
            },
            "type": "<string>",
            "w": "<integer>",
            "x": "<integer>"
          },
          "doloree": {
            "cells": [
              {
                "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
              },
              {
                "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
              }
            ],
            "cssClass": "<string>",
            "cssId": "<string>",
            "cssStyle": "<string>",
            "label": "<string>",
            "name": "<string>",
            "params": {
              "doloreeee": {}
            },
            "rowMetaData": [
              {
                "cssClass": "<string>",
                "styles": {
                  "backgroundColor": {
                    "a": "<number>",
                    "b": "<integer>",
                    "g": "<integer>",
                    "r": "<integer>"
                  },
                  "backgroundGradient": {
                    "angle": {
                      "units": "<string>",
                      "value": "<number>"
                    },
                    "colors": [
                      {
                        "color": {
                          "a": "<number>",
                          "b": "<integer>",
                          "g": "<integer>",
                          "r": "<integer>"
                        }
                      },
                      {
                        "color": {
                          "a": "<number>",
                          "b": "<integer>",
                          "g": "<integer>",
                          "r": "<integer>"
                        }
                      }
                    ],
                    "sideOrCorner": {
                      "horizontalSide": "<string>",
                      "verticalSide": "<string>"
                    }
                  },
                  "backgroundImage": {
                    "backgroundPosition": "<string>",
                    "backgroundSize": "<string>",
                    "imageUrl": "<string>"
                  },
                  "flexboxPositioning": "<string>",
                  "forceFullWidthSection": "<boolean>",
                  "maxWidthSectionCentering": "<integer>",
                  "verticalAlignment": "<string>"
                }
              },
              {
                "cssClass": "<string>",
                "styles": {
                  "backgroundColor": {
                    "a": "<number>",
                    "b": "<integer>",
                    "g": "<integer>",
                    "r": "<integer>"
                  },
                  "backgroundGradient": {
                    "angle": {
                      "units": "<string>",
                      "value": "<number>"
                    },
                    "colors": [
                      {
                        "color": {
                          "a": "<number>",
                          "b": "<integer>",
                          "g": "<integer>",
                          "r": "<integer>"
                        }
                      },
                      {
                        "color": {
                          "a": "<number>",
                          "b": "<integer>",
                          "g": "<integer>",
                          "r": "<integer>"
                        }
                      }
                    ],
                    "sideOrCorner": {
                      "horizontalSide": "<string>",
                      "verticalSide": "<string>"
                    }
                  },
                  "backgroundImage": {
                    "backgroundPosition": "<string>",
                    "backgroundSize": "<string>",
                    "imageUrl": "<string>"
                  },
                  "flexboxPositioning": "<string>",
                  "forceFullWidthSection": "<boolean>",
                  "maxWidthSectionCentering": "<integer>",
                  "verticalAlignment": "<string>"
                }
              }
            ],
            "rows": [
              {
                "Excepteurba": {
                  "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
                },
                "deserunt_69d": {
                  "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
                }
              },
              {
                "mollit_4f": {
                  "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
                }
              }
            ],
            "styles": {
              "backgroundColor": {
                "a": "<number>",
                "b": "<integer>",
                "g": "<integer>",
                "r": "<integer>"
              },
              "backgroundGradient": {
                "angle": {
                  "units": "<string>",
                  "value": "<number>"
                },
                "colors": [
                  {
                    "color": {
                      "a": "<number>",
                      "b": "<integer>",
                      "g": "<integer>",
                      "r": "<integer>"
                    }
                  },
                  {
                    "color": {
                      "a": "<number>",
                      "b": "<integer>",
                      "g": "<integer>",
                      "r": "<integer>"
                    }
                  }
                ],
                "sideOrCorner": {
                  "horizontalSide": "<string>",
                  "verticalSide": "<string>"
                }
              },
              "backgroundImage": {
                "backgroundPosition": "<string>",
                "backgroundSize": "<string>",
                "imageUrl": "<string>"
              },
              "flexboxPositioning": "<string>",
              "forceFullWidthSection": "<boolean>",
              "maxWidthSectionCentering": "<integer>",
              "verticalAlignment": "<string>"
            },
            "type": "<string>",
            "w": "<integer>",
            "x": "<integer>"
          },
          "aliqua506": {
            "cells": [
              {
                "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
              },
              {
                "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
              }
            ],
            "cssClass": "<string>",
            "cssId": "<string>",
            "cssStyle": "<string>",
            "label": "<string>",
            "name": "<string>",
            "params": {
              "tempor_92": {},
              "doc": {}
            },
            "rowMetaData": [
              {
                "cssClass": "<string>",
                "styles": {
                  "backgroundColor": {
                    "a": "<number>",
                    "b": "<integer>",
                    "g": "<integer>",
                    "r": "<integer>"
                  },
                  "backgroundGradient": {
                    "angle": {
                      "units": "<string>",
                      "value": "<number>"
                    },
                    "colors": [
                      {
                        "color": {
                          "a": "<number>",
                          "b": "<integer>",
                          "g": "<integer>",
                          "r": "<integer>"
                        }
                      },
                      {
                        "color": {
                          "a": "<number>",
                          "b": "<integer>",
                          "g": "<integer>",
                          "r": "<integer>"
                        }
                      }
                    ],
                    "sideOrCorner": {
                      "horizontalSide": "<string>",
                      "verticalSide": "<string>"
                    }
                  },
                  "backgroundImage": {
                    "backgroundPosition": "<string>",
                    "backgroundSize": "<string>",
                    "imageUrl": "<string>"
                  },
                  "flexboxPositioning": "<string>",
                  "forceFullWidthSection": "<boolean>",
                  "maxWidthSectionCentering": "<integer>",
                  "verticalAlignment": "<string>"
                }
              },
              {
                "cssClass": "<string>",
                "styles": {
                  "backgroundColor": {
                    "a": "<number>",
                    "b": "<integer>",
                    "g": "<integer>",
                    "r": "<integer>"
                  },
                  "backgroundGradient": {
                    "angle": {
                      "units": "<string>",
                      "value": "<number>"
                    },
                    "colors": [
                      {
                        "color": {
                          "a": "<number>",
                          "b": "<integer>",
                          "g": "<integer>",
                          "r": "<integer>"
                        }
                      },
                      {
                        "color": {
                          "a": "<number>",
                          "b": "<integer>",
                          "g": "<integer>",
                          "r": "<integer>"
                        }
                      }
                    ],
                    "sideOrCorner": {
                      "horizontalSide": "<string>",
                      "verticalSide": "<string>"
                    }
                  },
                  "backgroundImage": {
                    "backgroundPosition": "<string>",
                    "backgroundSize": "<string>",
                    "imageUrl": "<string>"
                  },
                  "flexboxPositioning": "<string>",
                  "forceFullWidthSection": "<boolean>",
                  "maxWidthSectionCentering": "<integer>",
                  "verticalAlignment": "<string>"
                }
              }
            ],
            "rows": [
              {
                "aute_5": {
                  "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
                },
                "deserunt66": {
                  "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
                }
              },
              {
                "ex_56": {
                  "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
                },
                "ullamco_7ba": {
                  "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
                }
              }
            ],
            "styles": {
              "backgroundColor": {
                "a": "<number>",
                "b": "<integer>",
                "g": "<integer>",
                "r": "<integer>"
              },
              "backgroundGradient": {
                "angle": {
                  "units": "<string>",
                  "value": "<number>"
                },
                "colors": [
                  {
                    "color": {
                      "a": "<number>",
                      "b": "<integer>",
                      "g": "<integer>",
                      "r": "<integer>"
                    }
                  },
                  {
                    "color": {
                      "a": "<number>",
                      "b": "<integer>",
                      "g": "<integer>",
                      "r": "<integer>"
                    }
                  }
                ],
                "sideOrCorner": {
                  "horizontalSide": "<string>",
                  "verticalSide": "<string>"
                }
              },
              "backgroundImage": {
                "backgroundPosition": "<string>",
                "backgroundSize": "<string>",
                "imageUrl": "<string>"
              },
              "flexboxPositioning": "<string>",
              "forceFullWidthSection": "<boolean>",
              "maxWidthSectionCentering": "<integer>",
              "verticalAlignment": "<string>"
            },
            "type": "<string>",
            "w": "<integer>",
            "x": "<integer>"
          }
        },
        "linkRelCanonicalUrl": "<string>",
        "mabExperimentId": "<string>",
        "mailingListsExcluded": [
          "<integer>",
          "<integer>"
        ],
        "mailingListsIncluded": [
          "<integer>",
          "<integer>"
        ],
        "maxRssEntries": "<integer>",
        "metaDescription": "<string>",
        "name": "<string>",
        "pageExpiryDate": "<long>",
        "pageExpiryEnabled": "<boolean>",
        "pageExpiryRedirectId": "<long>",
        "pageExpiryRedirectUrl": "<string>",
        "pageRedirected": "<boolean>",
        "password": "<string>",
        "publicAccessRulesEnabled": "<boolean>",
        "publishDate": "<dateTime>",
        "publishImmediately": "<boolean>",
        "replyTo": "<string>",
        "rssEmailAuthorLineTemplate": "<string>",
        "rssEmailBlogImageMaxWidth": "<integer>",
        "rssEmailByText": "<string>",
        "rssEmailClickThroughText": "<string>",
        "rssEmailCommentText": "<string>",
        "rssEmailEntryTemplate": "<string>",
        "rssEmailEntryTemplateEnabled": "<boolean>",
        "rssEmailId": "<long>",
        "rssEmailUrl": "<string>",
        "rssToEmailTiming": {
          "Excepteur_8ba": {},
          "cupidatat_d37": {},
          "voluptate94": {},
          "nostrud_b59": {}
        },
        "slug": "<string>",
        "state": "AUTOMATED_LOSER_ABVARIANT",
        "stats": {
          "counters": {
            "proident_2c5": "<long>"
          },
          "deviceBreakdown": {
            "laboris_6": {
              "pariatur_2": "<long>"
            },
            "sit_c6": {
              "id348": "<long>",
              "reprehenderitb97": "<long>"
            },
            "velit_9e": {
              "quis7": "<long>",
              "fugiat_66": "<long>"
            }
          },
          "qualifierStats": {
            "aliquipc4c": {
              "elit86": "<long>",
              "eiusmod_1": "<long>",
              "aliquad37": "<long>"
            },
            "ullamcoe0c": {
              "proident_5": "<long>",
              "enimae9": "<long>"
            }
          },
          "ratios": {
            "enimc3": "<number>",
            "id498": "<number>"
          }
        },
        "subcategory": "<string>",
        "subject": "<string>",
        "subscription": "<long>",
        "subscriptionBlogId": "<long>",
        "subscriptionName": "<string>",
        "templatePath": "<string>",
        "themeSettingsValues": {
          "reprehenderit_7f": {},
          "commodo2": {},
          "cupidatat_64": {}
        },
        "transactional": "<boolean>",
        "translatedFromId": "<string>",
        "translations": {
          "fugiat_a": {
            "archivedInDashboard": "<boolean>",
            "authorName": "<string>",
            "campaign": "<string>",
            "created": "<dateTime>",
            "id": "<long>",
            "name": "<string>",
            "password": "<string>",
            "publicAccessRules": [],
            "publicAccessRulesEnabled": "<boolean>",
            "publishDate": "<dateTime>",
            "slug": "<string>",
            "state": "<string>",
            "updated": "<dateTime>",
            "tagIds": [
              "<long>",
              "<long>"
            ]
          },
          "pariatur__c": {
            "archivedInDashboard": "<boolean>",
            "authorName": "<string>",
            "campaign": "<string>",
            "created": "<dateTime>",
            "id": "<long>",
            "name": "<string>",
            "password": "<string>",
            "publicAccessRules": [],
            "publicAccessRulesEnabled": "<boolean>",
            "publishDate": "<dateTime>",
            "slug": "<string>",
            "state": "<string>",
            "updated": "<dateTime>",
            "tagIds": [
              "<long>",
              "<long>"
            ]
          },
          "elit_4d9": {
            "archivedInDashboard": "<boolean>",
            "authorName": "<string>",
            "campaign": "<string>",
            "created": "<dateTime>",
            "id": "<long>",
            "name": "<string>",
            "password": "<string>",
            "publicAccessRules": [],
            "publicAccessRulesEnabled": "<boolean>",
            "publishDate": "<dateTime>",
            "slug": "<string>",
            "state": "<string>",
            "updated": "<dateTime>",
            "tagIds": [
              "<long>",
              "<long>"
            ]
          }
        },
        "updated": "<dateTime>",
        "updatedById": "<string>",
        "url": "<string>",
        "useFeaturedImage": "<boolean>",
        "useRssHeadlineAsSubject": "<boolean>",
        "vidsExcluded": [
          "<long>",
          "<long>"
        ],
        "vidsIncluded": [
          "<long>",
          "<long>"
        ],
        "widgetContainers": {
          "Excepteur_86": {},
          "cupidatat_1": {}
        },
        "widgets": {
          "qui2ee": {},
          "consectetur_f": {},
          "proident_fe": {},
          "laboris_3f4": {}
        },
        "workflowNames": [
          "<string>",
          "<string>"
        ],
        "isRecipientFatigueSuppressionEnabled": "<boolean>",
        "smartEmailFields": {
          "ametad5": {}
        },
        "feedbackSurveyId": "<integer>",
        "content": {
          "smartFields": {
            "consecteturef": {},
            "mollit_0d3": {}
          },
          "themeSettingsValues": {
            "elit63": {},
            "laborum_7": {}
          },
          "flexAreas": {
            "suntf": {}
          },
          "widgets": {
            "ea_3": {}
          },
          "plainTextVersion": "<string>",
          "templatePath": "<string>",
          "widgetContainers": {
            "incididunt_0c3": {},
            "sint_35e": {}
          },
          "styleSettings": {
            "emailBodyPadding": "<string>",
            "colorPickerFavorite5": "<string>",
            "bodyColor": "<string>",
            "colorPickerFavorite6": "<string>",
            "backgroundImage": "<string>",
            "emailBodyWidth": "<string>",
            "secondaryFont": "<string>",
            "primaryAccentColor": "<string>",
            "colorPickerFavorite3": "<string>",
            "primaryFontLineHeight": "<string>",
            "colorPickerFavorite4": "<string>",
            "secondaryFontColor": "<string>",
            "colorPickerFavorite1": "<string>",
            "colorPickerFavorite2": "<string>",
            "bodyBorderColor": "<string>",
            "bodyBorderWidth": "<number>",
            "linksFont": {
              "size": "<integer>",
              "color": "<string>",
              "underline": "<boolean>",
              "bold": "<boolean>",
              "italic": "<boolean>",
              "font": "<string>"
            },
            "backgroundColor": "<string>",
            "backgroundImageType": "<string>",
            "dividerStyleSettings": {
              "color": {},
              "lineType": "<string>",
              "height": "<integer>"
            },
            "secondaryAccentColor": "<string>",
            "secondaryFontLineHeight": "<string>",
            "primaryFontSize": "<number>",
            "secondaryFontSize": "<number>",
            "primaryFontColor": "<string>",
            "headingOneFont": {
              "size": "<integer>",
              "color": "<string>",
              "underline": "<boolean>",
              "bold": "<boolean>",
              "italic": "<boolean>",
              "font": "<string>"
            },
            "primaryFont": "<string>",
            "headingTwoFont": {
              "size": "<integer>",
              "color": "<string>",
              "underline": "<boolean>",
              "bold": "<boolean>",
              "italic": "<boolean>",
              "font": "<string>"
            },
            "buttonStyleSettings": {
              "backgroundColor": {},
              "fontStyle": {
                "size": "<integer>",
                "color": "<string>",
                "underline": "<boolean>",
                "bold": "<boolean>",
                "italic": "<boolean>",
                "font": "<string>"
              },
              "cornerRadius": "<integer>"
            },
            "bodyBorderColorChoice": "<string>"
          }
        },
        "from": {
          "customReplyTo": "<string>",
          "fromName": "<string>",
          "replyTo": "<string>"
        },
        "sendOnPublish": "<boolean>",
        "to": {
          "limitSendFrequency": "<boolean>",
          "suppressGraymail": "<boolean>",
          "contactIds": {
            "include": [
              "<string>",
              "<string>"
            ],
            "exclude": [
              "<string>",
              "<string>"
            ]
          },
          "contactLists": {
            "include": [
              "<string>",
              "<string>"
            ],
            "exclude": [
              "<string>",
              "<string>"
            ]
          }
        },
        "isAb": "<boolean>"
      },
      "user": {
        "email": "<string>",
        "fullName": "<string>",
        "id": "<string>"
      },
      "updatedAt": "<dateTime>"
    },
    {
      "id": "<string>",
      "object": {
        "abHoursToWait": "<integer>",
        "abStatus": "automated_master",
        "abTestId": "<string>",
        "archivedAt": "<dateTime>",
        "archivedInDashboard": "<boolean>",
        "attachedStylesheets": [
          {
            "ea_5": {},
            "aliqua_058": {}
          },
          {
            "sed_f_2": {}
          }
        ],
        "authorName": "<string>",
        "blogEmailType": "<string>",
        "campaign": "<string>",
        "categoryId": "<integer>",
        "contentGroupId": "<string>",
        "contentTypeCategory": "5",
        "createPage": "<boolean>",
        "created": "<dateTime>",
        "createdById": "<string>",
        "currentState": "PROCESSING",
        "currentlyPublished": "<boolean>",
        "customReplyTo": "<string>",
        "customReplyToEnabled": "<boolean>",
        "domain": "<string>",
        "dynamicPageDataSourceId": "<string>",
        "dynamicPageDataSourceType": "<integer>",
        "dynamicPageHubDbTableId": "<string>",
        "emailType": "BLOG_EMAIL",
        "enableDomainStylesheets": "<boolean>",
        "enableLayoutStylesheets": "<boolean>",
        "featuredImage": "<string>",
        "featuredImageAltText": "<string>",
        "folderId": "<long>",
        "footerHtml": "<string>",
        "fromName": "<string>",
        "headHtml": "<string>",
        "htmlTitle": "<string>",
        "id": "<string>",
        "includeDefaultCustomCss": "<boolean>",
        "isGraymailSuppressionEnabled": "<boolean>",
        "language": "en-il",
        "layoutSections": {
          "ad_72d": {
            "cells": [
              {
                "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
              },
              {
                "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
              }
            ],
            "cssClass": "<string>",
            "cssId": "<string>",
            "cssStyle": "<string>",
            "label": "<string>",
            "name": "<string>",
            "params": {
              "nisi_6": {},
              "sunt5ef": {}
            },
            "rowMetaData": [
              {
                "cssClass": "<string>",
                "styles": {
                  "backgroundColor": {
                    "a": "<number>",
                    "b": "<integer>",
                    "g": "<integer>",
                    "r": "<integer>"
                  },
                  "backgroundGradient": {
                    "angle": {
                      "units": "<string>",
                      "value": "<number>"
                    },
                    "colors": [
                      {
                        "color": {
                          "a": "<number>",
                          "b": "<integer>",
                          "g": "<integer>",
                          "r": "<integer>"
                        }
                      },
                      {
                        "color": {
                          "a": "<number>",
                          "b": "<integer>",
                          "g": "<integer>",
                          "r": "<integer>"
                        }
                      }
                    ],
                    "sideOrCorner": {
                      "horizontalSide": "<string>",
                      "verticalSide": "<string>"
                    }
                  },
                  "backgroundImage": {
                    "backgroundPosition": "<string>",
                    "backgroundSize": "<string>",
                    "imageUrl": "<string>"
                  },
                  "flexboxPositioning": "<string>",
                  "forceFullWidthSection": "<boolean>",
                  "maxWidthSectionCentering": "<integer>",
                  "verticalAlignment": "<string>"
                }
              },
              {
                "cssClass": "<string>",
                "styles": {
                  "backgroundColor": {
                    "a": "<number>",
                    "b": "<integer>",
                    "g": "<integer>",
                    "r": "<integer>"
                  },
                  "backgroundGradient": {
                    "angle": {
                      "units": "<string>",
                      "value": "<number>"
                    },
                    "colors": [
                      {
                        "color": {
                          "a": "<number>",
                          "b": "<integer>",
                          "g": "<integer>",
                          "r": "<integer>"
                        }
                      },
                      {
                        "color": {
                          "a": "<number>",
                          "b": "<integer>",
                          "g": "<integer>",
                          "r": "<integer>"
                        }
                      }
                    ],
                    "sideOrCorner": {
                      "horizontalSide": "<string>",
                      "verticalSide": "<string>"
                    }
                  },
                  "backgroundImage": {
                    "backgroundPosition": "<string>",
                    "backgroundSize": "<string>",
                    "imageUrl": "<string>"
                  },
                  "flexboxPositioning": "<string>",
                  "forceFullWidthSection": "<boolean>",
                  "maxWidthSectionCentering": "<integer>",
                  "verticalAlignment": "<string>"
                }
              }
            ],
            "rows": [
              {
                "ex_0": {
                  "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
                },
                "reprehenderit_a8c": {
                  "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
                }
              },
              {
                "magna821": {
                  "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
                }
              }
            ],
            "styles": {
              "backgroundColor": {
                "a": "<number>",
                "b": "<integer>",
                "g": "<integer>",
                "r": "<integer>"
              },
              "backgroundGradient": {
                "angle": {
                  "units": "<string>",
                  "value": "<number>"
                },
                "colors": [
                  {
                    "color": {
                      "a": "<number>",
                      "b": "<integer>",
                      "g": "<integer>",
                      "r": "<integer>"
                    }
                  },
                  {
                    "color": {
                      "a": "<number>",
                      "b": "<integer>",
                      "g": "<integer>",
                      "r": "<integer>"
                    }
                  }
                ],
                "sideOrCorner": {
                  "horizontalSide": "<string>",
                  "verticalSide": "<string>"
                }
              },
              "backgroundImage": {
                "backgroundPosition": "<string>",
                "backgroundSize": "<string>",
                "imageUrl": "<string>"
              },
              "flexboxPositioning": "<string>",
              "forceFullWidthSection": "<boolean>",
              "maxWidthSectionCentering": "<integer>",
              "verticalAlignment": "<string>"
            },
            "type": "<string>",
            "w": "<integer>",
            "x": "<integer>"
          },
          "do2ac": {
            "cells": [
              {
                "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
              },
              {
                "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
              }
            ],
            "cssClass": "<string>",
            "cssId": "<string>",
            "cssStyle": "<string>",
            "label": "<string>",
            "name": "<string>",
            "params": {
              "Uta5e": {},
              "Duis_8": {}
            },
            "rowMetaData": [
              {
                "cssClass": "<string>",
                "styles": {
                  "backgroundColor": {
                    "a": "<number>",
                    "b": "<integer>",
                    "g": "<integer>",
                    "r": "<integer>"
                  },
                  "backgroundGradient": {
                    "angle": {
                      "units": "<string>",
                      "value": "<number>"
                    },
                    "colors": [
                      {
                        "color": {
                          "a": "<number>",
                          "b": "<integer>",
                          "g": "<integer>",
                          "r": "<integer>"
                        }
                      },
                      {
                        "color": {
                          "a": "<number>",
                          "b": "<integer>",
                          "g": "<integer>",
                          "r": "<integer>"
                        }
                      }
                    ],
                    "sideOrCorner": {
                      "horizontalSide": "<string>",
                      "verticalSide": "<string>"
                    }
                  },
                  "backgroundImage": {
                    "backgroundPosition": "<string>",
                    "backgroundSize": "<string>",
                    "imageUrl": "<string>"
                  },
                  "flexboxPositioning": "<string>",
                  "forceFullWidthSection": "<boolean>",
                  "maxWidthSectionCentering": "<integer>",
                  "verticalAlignment": "<string>"
                }
              },
              {
                "cssClass": "<string>",
                "styles": {
                  "backgroundColor": {
                    "a": "<number>",
                    "b": "<integer>",
                    "g": "<integer>",
                    "r": "<integer>"
                  },
                  "backgroundGradient": {
                    "angle": {
                      "units": "<string>",
                      "value": "<number>"
                    },
                    "colors": [
                      {
                        "color": {
                          "a": "<number>",
                          "b": "<integer>",
                          "g": "<integer>",
                          "r": "<integer>"
                        }
                      },
                      {
                        "color": {
                          "a": "<number>",
                          "b": "<integer>",
                          "g": "<integer>",
                          "r": "<integer>"
                        }
                      }
                    ],
                    "sideOrCorner": {
                      "horizontalSide": "<string>",
                      "verticalSide": "<string>"
                    }
                  },
                  "backgroundImage": {
                    "backgroundPosition": "<string>",
                    "backgroundSize": "<string>",
                    "imageUrl": "<string>"
                  },
                  "flexboxPositioning": "<string>",
                  "forceFullWidthSection": "<boolean>",
                  "maxWidthSectionCentering": "<integer>",
                  "verticalAlignment": "<string>"
                }
              }
            ],
            "rows": [
              {
                "sed5cd": {
                  "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
                },
                "aliqua1": {
                  "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
                }
              },
              {
                "elite9": {
                  "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
                },
                "magnac5": {
                  "value": "<Circular reference to #/components/schemas/LayoutSection detected>"
                }
              }
            ],
            "styles": {
              "backgroundColor": {
                "a": "<number>",
                "b": "<integer>",
                "g": "<integer>",
                "r": "<integer>"
              },
              "backgroundGradient": {
                "angle": {
                  "units": "<string>",
                  "value": "<number>"
                },
                "colors": [
                  {
                    "color": {
                      "a": "<number>",
                      "b": "<integer>",
                      "g": "<integer>",
                      "r": "<integer>"
                    }
                  },
                  {
                    "color": {
                      "a": "<number>",
                      "b": "<integer>",
                      "g": "<integer>",
                      "r": "<integer>"
                    }
                  }
                ],
                "sideOrCorner": {
                  "horizontalSide": "<string>",
                  "verticalSide": "<string>"
                }
              },
              "backgroundImage": {
                "backgroundPosition": "<string>",
                "backgroundSize": "<string>",
                "imageUrl": "<string>"
              },
              "flexboxPositioning": "<string>",
              "forceFullWidthSection": "<boolean>",
              "maxWidthSectionCentering": "<integer>",
              "verticalAlignment": "<string>"
            },
            "type": "<string>",
            "w": "<integer>",
            "x": "<integer>"
          }
        },
        "linkRelCanonicalUrl": "<string>",
        "mabExperimentId": "<string>",
        "mailingListsExcluded": [
          "<integer>",
          "<integer>"
        ],
        "mailingListsIncluded": [
          "<integer>",
          "<integer>"
        ],
        "maxRssEntries": "<integer>",
        "metaDescription": "<string>",
        "name": "<string>",
        "pageExpiryDate": "<long>",
        "pageExpiryEnabled": "<boolean>",
        "pageExpiryRedirectId": "<long>",
        "pageExpiryRedirectUrl": "<string>",
        "pageRedirected": "<boolean>",
        "password": "<string>",
        "publicAccessRulesEnabled": "<boolean>",
        "publishDate": "<dateTime>",
        "publishImmediately": "<boolean>",
        "replyTo": "<string>",
        "rssEmailAuthorLineTemplate": "<string>",
        "rssEmailBlogImageMaxWidth": "<integer>",
        "rssEmailByText": "<string>",
        "rssEmailClickThroughText": "<string>",
        "rssEmailCommentText": "<string>",
        "rssEmailEntryTemplate": "<string>",
        "rssEmailEntryTemplateEnabled": "<boolean>",
        "rssEmailId": "<long>",
        "rssEmailUrl": "<string>",
        "rssToEmailTiming": {
          "ex_03": {}
        },
        "slug": "<string>",
        "state": "PAGE_STUB",
        "stats": {
          "counters": {
            "dolor_f": "<long>"
          },
          "deviceBreakdown": {
            "labore_5ce": {
              "sint_036": "<long>",
              "laborum6a8": "<long>"
            },
            "Loremae": {
              "veniam_2": "<long>",
              "pariaturf": "<long>"
            }
          },
          "qualifierStats": {
            "eab96": {
              "occaecatc": "<long>",
              "aliquip5": "<long>",
              "eiusmod_1e": "<long>"
            },
            "nisi95": {
              "sit_18": "<long>"
            }
          },
          "ratios": {
            "qui_57": "<number>"
          }
        },
        "subcategory": "<string>",
        "subject": "<string>",
        "subscription": "<long>",
        "subscriptionBlogId": "<long>",
        "subscriptionName": "<string>",
        "templatePath": "<string>",
        "themeSettingsValues": {
          "est_96": {},
          "amet_56": {}
        },
        "transactional": "<boolean>",
        "translatedFromId": "<string>",
        "translations": {
          "irure_a21": {
            "archivedInDashboard": "<boolean>",
            "authorName": "<string>",
            "campaign": "<string>",
            "created": "<dateTime>",
            "id": "<long>",
            "name": "<string>",
            "password": "<string>",
            "publicAccessRules": [],
            "publicAccessRulesEnabled": "<boolean>",
            "publishDate": "<dateTime>",
            "slug": "<string>",
            "state": "<string>",
            "updated": "<dateTime>",
            "tagIds": [
              "<long>",
              "<long>"
            ]
          },
          "sit__c": {
            "archivedInDashboard": "<boolean>",
            "authorName": "<string>",
            "campaign": "<string>",
            "created": "<dateTime>",
            "id": "<long>",
            "name": "<string>",
            "password": "<string>",
            "publicAccessRules": [],
            "publicAccessRulesEnabled": "<boolean>",
            "publishDate": "<dateTime>",
            "slug": "<string>",
            "state": "<string>",
            "updated": "<dateTime>",
            "tagIds": [
              "<long>",
              "<long>"
            ]
          }
        },
        "updated": "<dateTime>",
        "updatedById": "<string>",
        "url": "<string>",
        "useFeaturedImage": "<boolean>",
        "useRssHeadlineAsSubject": "<boolean>",
        "vidsExcluded": [
          "<long>",
          "<long>"
        ],
        "vidsIncluded": [
          "<long>",
          "<long>"
        ],
        "widgetContainers": {
          "do4b6": {},
          "eucf": {},
          "dolor_8f": {},
          "eu_b": {}
        },
        "widgets": {
          "dolore91": {},
          "pariatur_2": {}
        },
        "workflowNames": [
          "<string>",
          "<string>"
        ],
        "isRecipientFatigueSuppressionEnabled": "<boolean>",
        "smartEmailFields": {
          "consequat_87": {},
          "in2e": {},
          "aliqua01": {}
        },
        "feedbackSurveyId": "<integer>",
        "content": {
          "smartFields": {
            "aliquip73e": {},
            "consectetur7e": {}
          },
          "themeSettingsValues": {
            "reprehenderit_f6": {},
            "nullab": {}
          },
          "flexAreas": {
            "sunt_f": {}
          },
          "widgets": {
            "adipisicing_71e": {},
            "id97": {}
          },
          "plainTextVersion": "<string>",
          "templatePath": "<string>",
          "widgetContainers": {
            "pariatur00": {},
            "ullamcobf": {},
            "cupidatat455": {},
            "commodo5fb": {}
          },
          "styleSettings": {
            "emailBodyPadding": "<string>",
            "colorPickerFavorite5": "<string>",
            "bodyColor": "<string>",
            "colorPickerFavorite6": "<string>",
            "backgroundImage": "<string>",
            "emailBodyWidth": "<string>",
            "secondaryFont": "<string>",
            "primaryAccentColor": "<string>",
            "colorPickerFavorite3": "<string>",
            "primaryFontLineHeight": "<string>",
            "colorPickerFavorite4": "<string>",
            "secondaryFontColor": "<string>",
            "colorPickerFavorite1": "<string>",
            "colorPickerFavorite2": "<string>",
            "bodyBorderColor": "<string>",
            "bodyBorderWidth": "<number>",
            "linksFont": {
              "size": "<integer>",
              "color": "<string>",
              "underline": "<boolean>",
              "bold": "<boolean>",
              "italic": "<boolean>",
              "font": "<string>"
            },
            "backgroundColor": "<string>",
            "backgroundImageType": "<string>",
            "dividerStyleSettings": {
              "color": {},
              "lineType": "<string>",
              "height": "<integer>"
            },
            "secondaryAccentColor": "<string>",
            "secondaryFontLineHeight": "<string>",
            "primaryFontSize": "<number>",
            "secondaryFontSize": "<number>",
            "primaryFontColor": "<string>",
            "headingOneFont": {
              "size": "<integer>",
              "color": "<string>",
              "underline": "<boolean>",
              "bold": "<boolean>",
              "italic": "<boolean>",
              "font": "<string>"
            },
            "primaryFont": "<string>",
            "headingTwoFont": {
              "size": "<integer>",
              "color": "<string>",
              "underline": "<boolean>",
              "bold": "<boolean>",
              "italic": "<boolean>",
              "font": "<string>"
            },
            "buttonStyleSettings": {
              "backgroundColor": {},
              "fontStyle": {
                "size": "<integer>",
                "color": "<string>",
                "underline": "<boolean>",
                "bold": "<boolean>",
                "italic": "<boolean>",
                "font": "<string>"
              },
              "cornerRadius": "<integer>"
            },
            "bodyBorderColorChoice": "<string>"
          }
        },
        "from": {
          "customReplyTo": "<string>",
          "fromName": "<string>",
          "replyTo": "<string>"
        },
        "sendOnPublish": "<boolean>",
        "to": {
          "limitSendFrequency": "<boolean>",
          "suppressGraymail": "<boolean>",
          "contactIds": {
            "include": [
              "<string>",
              "<string>"
            ],
            "exclude": [
              "<string>",
              "<string>"
            ]
          },
          "contactLists": {
            "include": [
              "<string>",
              "<string>"
            ],
            "exclude": [
              "<string>",
              "<string>"
            ]
          }
        },
        "isAb": "<boolean>"
      },
      "user": {
        "email": "<string>",
        "fullName": "<string>",
        "id": "<string>"
      },
      "updatedAt": "<dateTime>"
    }
  ],
  "total": "<integer>",
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
```

---

### Get a revision of a marketing email

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/emails/:emailId/revisions/:revisionId`

**Description:** Get a specific revision of a marketing email.

**Authentication:** apikey

**Path Variables:**

- `emailId`: No description
- `revisionId`: No description

**Headers:**


**Success Response (200):**

```json
{
  "id": "<string>",
  "object": {
    "content": {
      "templatePath": "<string>",
      "plainTextVersion": "<string>",
      "widgets": {
        "Duis__a4": {},
        "ad_af9": {},
        "occaecat_a": {}
      },
      "widgetContainers": {
        "eiusmod0": {},
        "pariatur10f": {}
      },
      "flexAreas": {
        "velit1a4": {}
      },
      "styleSettings": {},
      "smartFields": {
        "culpadd": {},
        "dolor_d95": {}
      },
      "themeSettingsValues": {
        "amet_74": {}
      }
    },
    "from": {
      "fromName": "<string>",
      "replyTo": "<string>",
      "customReplyTo": "<string>"
    },
    "id": "<string>",
    "name": "<string>",
    "sendOnPublish": "<boolean>",
    "state": "AUTOMATED_FOR_FORM_LEGACY",
    "subcategory": "<string>",
    "subject": "<string>",
    "to": {
      "contactLists": {
        "include": [
          "<long>",
          "<long>"
        ],
        "exclude": [
          "<long>",
          "<long>"
        ]
      },
      "contactIds": {
        "include": [
          "<long>",
          "<long>"
        ],
        "exclude": [
          "<long>",
          "<long>"
        ]
      },
      "limitSendFrequency": "<boolean>",
      "suppressGraymail": "<boolean>"
    },
    "createdById": "<integer>",
    "type": "MEMBERSHIP_REGISTRATION_EMAIL",
    "activeDomain": "<string>",
    "archived": "<boolean>",
    "folderId": "<long>",
    "feedbackSurveyId": "<integer>",
    "stats": {
      "counters": {
        "adipisicingfb": "<long>"
      },
      "deviceBreakdown": {
        "dolor0": {
          "pariatur8": "<long>"
        },
        "officia9": {
          "cupidatat774": "<long>"
        }
      },
      "qualifierStats": {
        "cupidatat95": {
          "aliqua_f_": "<long>",
          "in_a": "<long>"
        }
      },
      "ratios": {
        "dolore3": "<number>",
        "Lorem_9": "<number>"
      }
    },
    "testing": {
      "testId": "<long>",
      "hoursToWait": "<integer>",
      "abSuccessMetric": "CLICKS_BY_OPENS",
      "abSampleSizeDefault": "automated_loser_variant",
      "abStatus": "automated_variant",
      "abTestPercentage": "<integer>",
      "abSamplingDefault": "master"
    },
    "subscriptionDetails": {
      "subscriptionId": "<long>",
      "preferencesGroupId": "<long>",
      "officeLocationId": "<string>"
    },
    "updatedById": "<integer>",
    "publishedById": "<integer>",
    "language": "jmc",
    "campaign": "<string>",
    "webversion": {
      "slug": "<string>",
      "domain": "<string>",
      "title": "<string>",
      "metaDescription": "<string>",
      "redirectToUrl": "<string>",
      "redirectToPageId": "<long>",
      "expiresAt": "<dateTime>"
    },
    "rssData": {
      "maxEntries": "<integer>",
      "timing": {
        "voluptate0e5": {}
      },
      "url": "<string>",
      "hubspotBlogId": "<long>",
      "blogEmailType": "<string>",
      "blogImageMaxWidth": "<integer>",
      "rssEntryTemplate": "<string>",
      "useHeadlineAsSubject": "<boolean>",
      "blogLayout": "<string>"
    },
    "isTransactional": "<boolean>",
    "isPublished": "<boolean>",
    "publishDate": "<dateTime>",
    "updatedAt": "<dateTime>",
    "createdAt": "<dateTime>",
    "deletedAt": "<dateTime>",
    "publishedAt": "<dateTime>",
    "isAb": "<boolean>"
  },
  "updatedAt": "<dateTime>",
  "user": {
    "email": "<string>",
    "fullName": "<string>",
    "id": "<string>"
  }
}
```

---

### Get all marketing emails

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/emails/?createdAt=<dateTime>&createdAfter=<dateTime>&createdBefore=<dateTime>&updatedAt=<dateTime>&updatedAfter=<dateTime>&updatedBefore=<dateTime>&sort=<string>&sort=<string>&after=<string>&limit=<integer>&includeStats=<boolean>&type=OPTIN_EMAIL&isPublished=<boolean>&includedProperties=<string>&includedProperties=<string>&archived=<boolean>&marketingCampaignNames=<boolean>&workflowNames=<boolean>&campaign=<string>&publishedAfter=<dateTime>&publishedAt=<dateTime>&publishedBefore=<dateTime>`

**Description:** The results can be filtered, allowing you to find a specific set of emails. See the table below for a full list of filtering options.

**Authentication:** apikey

**Query Parameters:**

- `createdAt`: Only return emails created at exactly the specified time.
- `createdAfter`: Only return emails created after the specified time.
- `createdBefore`: Only return emails created before the specified time.
- `updatedAt`: Only return emails last updated at exactly the specified time.
- `updatedAfter`: Only return emails last updated after the specified time.
- `updatedBefore`: Only return emails last updated before the specified time.
- `sort`: Specifies which fields to use for sorting results. Valid fields are `name`, `createdAt`, `updatedAt`, `createdBy`, `updatedBy`. `createdAt` will be used by default.
- `sort`: Specifies which fields to use for sorting results. Valid fields are `name`, `createdAt`, `updatedAt`, `createdBy`, `updatedBy`. `createdAt` will be used by default.
- `after`: The cursor token value to get the next set of results. You can get this from the `paging.next.after` JSON property of a paged response containing more results.
- `limit`: The maximum number of results to return. Default is 100.
- `includeStats`: Include statistics with emails.
- `type`: Email types to be filtered by. Multiple types can be included. All emails will be returned if not present.
- `isPublished`: Filter by published/draft emails. All emails will be returned if not present.
- `includedProperties`: No description
- `includedProperties`: No description
- `archived`: Specifies whether to return archived emails. Defaults to `false`.
- `marketingCampaignNames`: No description
- `workflowNames`: No description
- `campaign`: Filter by campaign GUID. All emails will be returned if not present.
- `publishedAfter`: No description
- `publishedAt`: No description
- `publishedBefore`: No description

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "content": {
        "templatePath": "<string>",
        "plainTextVersion": "<string>",
        "widgets": {
          "ad_d84": {}
        },
        "widgetContainers": {
          "irure_34": {},
          "sed_9": {},
          "fugiat2": {},
          "et_7c0": {},
          "sunt_acc": {}
        },
        "flexAreas": {
          "magna726": {},
          "sintebe": {},
          "tempor_4a": {},
          "occaecatf15": {}
        },
        "styleSettings": {},
        "smartFields": {
          "adipisicing_d4": {},
          "enim1_": {},
          "culpac6": {}
        },
        "themeSettingsValues": {
          "elit0": {},
          "occaecatb": {},
          "anim_e5": {},
          "cupidatat3": {}
        }
      },
      "from": {
        "fromName": "<string>",
        "replyTo": "<string>",
        "customReplyTo": "<string>"
      },
      "id": "<string>",
      "name": "<string>",
      "sendOnPublish": "<boolean>",
      "state": "SCHEDULED_AB",
      "subcategory": "<string>",
      "subject": "<string>",
      "to": {
        "contactLists": {
          "include": [
            "<long>",
            "<long>"
          ],
          "exclude": [
            "<long>",
            "<long>"
          ]
        },
        "contactIds": {
          "include": [
            "<long>",
            "<long>"
          ],
          "exclude": [
            "<long>",
            "<long>"
          ]
        },
        "limitSendFrequency": "<boolean>",
        "suppressGraymail": "<boolean>"
      },
      "createdById": "<integer>",
      "type": "MEMBERSHIP_REGISTRATION_EMAIL",
      "activeDomain": "<string>",
      "archived": "<boolean>",
      "folderId": "<long>",
      "feedbackSurveyId": "<integer>",
      "stats": {
        "counters": {
          "mollit_9d7": "<long>",
          "utd": "<long>",
          "excd7": "<long>"
        },
        "deviceBreakdown": {
          "inb33": {
            "tempor_b52": "<long>"
          },
          "adb7c": {
            "quis_0": "<long>"
          }
        },
        "qualifierStats": {
          "dolore47": {
            "est7": "<long>"
          }
        },
        "ratios": {
          "dolord55": "<number>"
        }
      },
      "testing": {
        "testId": "<long>",
        "hoursToWait": "<integer>",
        "abSuccessMetric": "OPENS_BY_DELIVERED",
        "abSampleSizeDefault": "automated_loser_variant",
        "abStatus": "mab_variant",
        "abTestPercentage": "<integer>",
        "abSamplingDefault": "automated_loser_variant"
      },
      "subscriptionDetails": {
        "subscriptionId": "<long>",
        "preferencesGroupId": "<long>",
        "officeLocationId": "<string>"
      },
      "updatedById": "<integer>",
      "publishedById": "<integer>",
      "language": "ff",
      "campaign": "<string>",
      "webversion": {
        "slug": "<string>",
        "domain": "<string>",
        "title": "<string>",
        "metaDescription": "<string>",
        "redirectToUrl": "<string>",
        "redirectToPageId": "<long>",
        "expiresAt": "<dateTime>"
      },
      "rssData": {
        "maxEntries": "<integer>",
        "timing": {
          "deseruntc34": {},
          "Duis_772": {},
          "nulla_328": {},
          "idfd2": {}
        },
        "url": "<string>",
        "hubspotBlogId": "<long>",
        "blogEmailType": "<string>",
        "blogImageMaxWidth": "<integer>",
        "rssEntryTemplate": "<string>",
        "useHeadlineAsSubject": "<boolean>",
        "blogLayout": "<string>"
      },
      "isTransactional": "<boolean>",
      "isPublished": "<boolean>",
      "publishDate": "<dateTime>",
      "updatedAt": "<dateTime>",
      "createdAt": "<dateTime>",
      "deletedAt": "<dateTime>",
      "publishedAt": "<dateTime>",
      "isAb": "<boolean>"
    },
    {
      "content": {
        "templatePath": "<string>",
        "plainTextVersion": "<string>",
        "widgets": {
          "dolore6": {},
          "veniamcf": {}
        },
        "widgetContainers": {
          "cillumb3": {},
          "consequat_e": {}
        },
        "flexAreas": {
          "pariaturcd6": {},
          "sitf": {}
        },
        "styleSettings": {},
        "smartFields": {
          "tempor_8e3": {}
        },
        "themeSettingsValues": {
          "esse_c47": {},
          "dolore_0f": {}
        }
      },
      "from": {
        "fromName": "<string>",
        "replyTo": "<string>",
        "customReplyTo": "<string>"
      },
      "id": "<string>",
      "name": "<string>",
      "sendOnPublish": "<boolean>",
      "state": "AUTOMATED_DRAFT_ABVARIANT",
      "subcategory": "<string>",
      "subject": "<string>",
      "to": {
        "contactLists": {
          "include": [
            "<long>",
            "<long>"
          ],
          "exclude": [
            "<long>",
            "<long>"
          ]
        },
        "contactIds": {
          "include": [
            "<long>",
            "<long>"
          ],
          "exclude": [
            "<long>",
            "<long>"
          ]
        },
        "limitSendFrequency": "<boolean>",
        "suppressGraymail": "<boolean>"
      },
      "createdById": "<integer>",
      "type": "OPTIN_EMAIL",
      "activeDomain": "<string>",
      "archived": "<boolean>",
      "folderId": "<long>",
      "feedbackSurveyId": "<integer>",
      "stats": {
        "counters": {
          "magna8": "<long>"
        },
        "deviceBreakdown": {
          "nona0d": {
            "culpa6f2": "<long>"
          },
          "ea_11": {
            "velit8b": "<long>",
            "aute___": "<long>"
          }
        },
        "qualifierStats": {
          "et634": {
            "sedec": "<long>"
          }
        },
        "ratios": {
          "dolor_0a": "<number>",
          "amet_a2": "<number>",
          "enime": "<number>"
        }
      },
      "testing": {
        "testId": "<long>",
        "hoursToWait": "<integer>",
        "abSuccessMetric": "CLICKS_BY_DELIVERED",
        "abSampleSizeDefault": "mab_master",
        "abStatus": "automated_variant",
        "abTestPercentage": "<integer>",
        "abSamplingDefault": "loser_variant"
      },
      "subscriptionDetails": {
        "subscriptionId": "<long>",
        "preferencesGroupId": "<long>",
        "officeLocationId": "<string>"
      },
      "updatedById": "<integer>",
      "publishedById": "<integer>",
      "language": "sq-mk",
      "campaign": "<string>",
      "webversion": {
        "slug": "<string>",
        "domain": "<string>",
        "title": "<string>",
        "metaDescription": "<string>",
        "redirectToUrl": "<string>",
        "redirectToPageId": "<long>",
        "expiresAt": "<dateTime>"
      },
      "rssData": {
        "maxEntries": "<integer>",
        "timing": {
          "dolore_e_": {}
        },
        "url": "<string>",
        "hubspotBlogId": "<long>",
        "blogEmailType": "<string>",
        "blogImageMaxWidth": "<integer>",
        "rssEntryTemplate": "<string>",
        "useHeadlineAsSubject": "<boolean>",
        "blogLayout": "<string>"
      },
      "isTransactional": "<boolean>",
      "isPublished": "<boolean>",
      "publishDate": "<dateTime>",
      "updatedAt": "<dateTime>",
      "createdAt": "<dateTime>",
      "deletedAt": "<dateTime>",
      "publishedAt": "<dateTime>",
      "isAb": "<boolean>"
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

### Create a new marketing email

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/emails/`

**Description:** Use this endpoint to create a new marketing email.

**Authentication:** apikey

**Headers:**

- `Content-Type`: application/json

**Success Response (201):**

```json
{
  "content": {
    "templatePath": "<string>",
    "plainTextVersion": "<string>",
    "widgets": {
      "Excepteur_8": {},
      "in15": {},
      "tempor_0": {}
    },
    "widgetContainers": {
      "fugiat_f8": {},
      "labore9": {},
      "in74c": {}
    },
    "flexAreas": {
      "commodoed3": {},
      "laborea8": {},
      "ut_5": {}
    },
    "styleSettings": {},
    "smartFields": {
      "culpaf3": {},
      "proident2f": {}
    },
    "themeSettingsValues": {
      "commodo2aa": {}
    }
  },
  "from": {
    "fromName": "<string>",
    "replyTo": "<string>",
    "customReplyTo": "<string>"
  },
  "id": "<string>",
  "name": "<string>",
  "sendOnPublish": "<boolean>",
  "state": "RSS_TO_EMAIL_DRAFT",
  "subcategory": "<string>",
  "subject": "<string>",
  "to": {
    "contactLists": {
      "include": [
        "<long>",
        "<long>"
      ],
      "exclude": [
        "<long>",
        "<long>"
      ]
    },
    "contactIds": {
      "include": [
        "<long>",
        "<long>"
      ],
      "exclude": [
        "<long>",
        "<long>"
      ]
    },
    "limitSendFrequency": "<boolean>",
    "suppressGraymail": "<boolean>"
  },
  "createdById": "<integer>",
  "type": "RESUBSCRIBE_EMAIL",
  "activeDomain": "<string>",
  "archived": "<boolean>",
  "folderId": "<long>",
  "feedbackSurveyId": "<integer>",
  "stats": {
    "counters": {
      "occaecat_35": "<long>",
      "esse_dae": "<long>",
      "aliquip_9b": "<long>"
    },
    "deviceBreakdown": {
      "ad_9": {
        "ea586": "<long>",
        "amet_cce": "<long>"
      },
      "exercitation_2f": {
        "ut_2": "<long>",
        "eiusmod_d1": "<long>"
      }
    },
    "qualifierStats": {
      "Duis_4": {
        "qui_e3": "<long>",
        "laborisf": "<long>"
      },
      "Ut_2": {
        "doloref": "<long>"
      },
      "sunt_3": {
        "qui045": "<long>",
        "nostrud1": "<long>"
      }
    },
    "ratios": {
      "eiusmode34": "<number>",
      "fugiat_41": "<number>"
    }
  },
  "testing": {
    "testId": "<long>",
    "hoursToWait": "<integer>",
    "abSuccessMetric": "OPENS_BY_DELIVERED",
    "abSampleSizeDefault": "variant",
    "abStatus": "automated_master",
    "abTestPercentage": "<integer>",
    "abSamplingDefault": "master"
  },
  "subscriptionDetails": {
    "subscriptionId": "<long>",
    "preferencesGroupId": "<long>",
    "officeLocationId": "<string>"
  },
  "updatedById": "<integer>",
  "publishedById": "<integer>",
  "language": "bo-in",
  "campaign": "<string>",
  "webversion": {
    "slug": "<string>",
    "domain": "<string>",
    "title": "<string>",
    "metaDescription": "<string>",
    "redirectToUrl": "<string>",
    "redirectToPageId": "<long>",
    "expiresAt": "<dateTime>"
  },
  "rssData": {
    "maxEntries": "<integer>",
    "timing": {
      "laborisfe_": {},
      "ipsum2": {}
    },
    "url": "<string>",
    "hubspotBlogId": "<long>",
    "blogEmailType": "<string>",
    "blogImageMaxWidth": "<integer>",
    "rssEntryTemplate": "<string>",
    "useHeadlineAsSubject": "<boolean>",
    "blogLayout": "<string>"
  },
  "isTransactional": "<boolean>",
  "isPublished": "<boolean>",
  "publishDate": "<dateTime>",
  "updatedAt": "<dateTime>",
  "createdAt": "<dateTime>",
  "deletedAt": "<dateTime>",
  "publishedAt": "<dateTime>",
  "isAb": "<boolean>"
}
```

---

### Restore a revision of a marketing email

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/emails/:emailId/revisions/:revisionId/restore`

**Description:** Restores a previous revision of a marketing email. The current revision becomes old, and the restored revision is given a new version number.

**Authentication:** apikey

**Path Variables:**

- `emailId`: No description
- `revisionId`: No description

**Headers:**


---

### Get the details of a specified marketing email

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/emails/:emailId?includeStats=<boolean>&includedProperties=<string>&includedProperties=<string>&archived=<boolean>&marketingCampaignNames=<boolean>&workflowNames=<boolean>`

**Description:** Get the details for a marketing email.

**Authentication:** apikey

**Path Variables:**

- `emailId`: No description

**Query Parameters:**

- `includeStats`: Include statistics with email
- `includedProperties`: No description
- `includedProperties`: No description
- `archived`: Whether to return only results that have been archived.
- `marketingCampaignNames`: No description
- `workflowNames`: No description

**Headers:**


**Success Response (200):**

```json
{
  "content": {
    "templatePath": "<string>",
    "plainTextVersion": "<string>",
    "widgets": {
      "Excepteur_8": {},
      "in15": {},
      "tempor_0": {}
    },
    "widgetContainers": {
      "fugiat_f8": {},
      "labore9": {},
      "in74c": {}
    },
    "flexAreas": {
      "commodoed3": {},
      "laborea8": {},
      "ut_5": {}
    },
    "styleSettings": {},
    "smartFields": {
      "culpaf3": {},
      "proident2f": {}
    },
    "themeSettingsValues": {
      "commodo2aa": {}
    }
  },
  "from": {
    "fromName": "<string>",
    "replyTo": "<string>",
    "customReplyTo": "<string>"
  },
  "id": "<string>",
  "name": "<string>",
  "sendOnPublish": "<boolean>",
  "state": "RSS_TO_EMAIL_DRAFT",
  "subcategory": "<string>",
  "subject": "<string>",
  "to": {
    "contactLists": {
      "include": [
        "<long>",
        "<long>"
      ],
      "exclude": [
        "<long>",
        "<long>"
      ]
    },
    "contactIds": {
      "include": [
        "<long>",
        "<long>"
      ],
      "exclude": [
        "<long>",
        "<long>"
      ]
    },
    "limitSendFrequency": "<boolean>",
    "suppressGraymail": "<boolean>"
  },
  "createdById": "<integer>",
  "type": "RESUBSCRIBE_EMAIL",
  "activeDomain": "<string>",
  "archived": "<boolean>",
  "folderId": "<long>",
  "feedbackSurveyId": "<integer>",
  "stats": {
    "counters": {
      "occaecat_35": "<long>",
      "esse_dae": "<long>",
      "aliquip_9b": "<long>"
    },
    "deviceBreakdown": {
      "ad_9": {
        "ea586": "<long>",
        "amet_cce": "<long>"
      },
      "exercitation_2f": {
        "ut_2": "<long>",
        "eiusmod_d1": "<long>"
      }
    },
    "qualifierStats": {
      "Duis_4": {
        "qui_e3": "<long>",
        "laborisf": "<long>"
      },
      "Ut_2": {
        "doloref": "<long>"
      },
      "sunt_3": {
        "qui045": "<long>",
        "nostrud1": "<long>"
      }
    },
    "ratios": {
      "eiusmode34": "<number>",
      "fugiat_41": "<number>"
    }
  },
  "testing": {
    "testId": "<long>",
    "hoursToWait": "<integer>",
    "abSuccessMetric": "OPENS_BY_DELIVERED",
    "abSampleSizeDefault": "variant",
    "abStatus": "automated_master",
    "abTestPercentage": "<integer>",
    "abSamplingDefault": "master"
  },
  "subscriptionDetails": {
    "subscriptionId": "<long>",
    "preferencesGroupId": "<long>",
    "officeLocationId": "<string>"
  },
  "updatedById": "<integer>",
  "publishedById": "<integer>",
  "language": "bo-in",
  "campaign": "<string>",
  "webversion": {
    "slug": "<string>",
    "domain": "<string>",
    "title": "<string>",
    "metaDescription": "<string>",
    "redirectToUrl": "<string>",
    "redirectToPageId": "<long>",
    "expiresAt": "<dateTime>"
  },
  "rssData": {
    "maxEntries": "<integer>",
    "timing": {
      "laborisfe_": {},
      "ipsum2": {}
    },
    "url": "<string>",
    "hubspotBlogId": "<long>",
    "blogEmailType": "<string>",
    "blogImageMaxWidth": "<integer>",
    "rssEntryTemplate": "<string>",
    "useHeadlineAsSubject": "<boolean>",
    "blogLayout": "<string>"
  },
  "isTransactional": "<boolean>",
  "isPublished": "<boolean>",
  "publishDate": "<dateTime>",
  "updatedAt": "<dateTime>",
  "createdAt": "<dateTime>",
  "deletedAt": "<dateTime>",
  "publishedAt": "<dateTime>",
  "isAb": "<boolean>"
}
```

---

### Delete a marketing email

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/marketing/v3/emails/:emailId?archived=<boolean>`

**Authentication:** apikey

**Path Variables:**

- `emailId`: No description

**Query Parameters:**

- `archived`: Whether to return only results that have been archived.

**Headers:**


---

### Update a marketing email

**Method:** `PATCH`

**URL:** `https://api.hubapi.com/marketing/v3/emails/:emailId?archived=<boolean>`

**Description:** Change properties of a marketing email.

**Authentication:** apikey

**Path Variables:**

- `emailId`: No description

**Query Parameters:**

- `archived`: Whether to return only results that have been archived.

**Headers:**

- `Content-Type`: application/json

**Success Response (200):**

```json
{
  "content": {
    "templatePath": "<string>",
    "plainTextVersion": "<string>",
    "widgets": {
      "Excepteur_8": {},
      "in15": {},
      "tempor_0": {}
    },
    "widgetContainers": {
      "fugiat_f8": {},
      "labore9": {},
      "in74c": {}
    },
    "flexAreas": {
      "commodoed3": {},
      "laborea8": {},
      "ut_5": {}
    },
    "styleSettings": {},
    "smartFields": {
      "culpaf3": {},
      "proident2f": {}
    },
    "themeSettingsValues": {
      "commodo2aa": {}
    }
  },
  "from": {
    "fromName": "<string>",
    "replyTo": "<string>",
    "customReplyTo": "<string>"
  },
  "id": "<string>",
  "name": "<string>",
  "sendOnPublish": "<boolean>",
  "state": "RSS_TO_EMAIL_DRAFT",
  "subcategory": "<string>",
  "subject": "<string>",
  "to": {
    "contactLists": {
      "include": [
        "<long>",
        "<long>"
      ],
      "exclude": [
        "<long>",
        "<long>"
      ]
    },
    "contactIds": {
      "include": [
        "<long>",
        "<long>"
      ],
      "exclude": [
        "<long>",
        "<long>"
      ]
    },
    "limitSendFrequency": "<boolean>",
    "suppressGraymail": "<boolean>"
  },
  "createdById": "<integer>",
  "type": "RESUBSCRIBE_EMAIL",
  "activeDomain": "<string>",
  "archived": "<boolean>",
  "folderId": "<long>",
  "feedbackSurveyId": "<integer>",
  "stats": {
    "counters": {
      "occaecat_35": "<long>",
      "esse_dae": "<long>",
      "aliquip_9b": "<long>"
    },
    "deviceBreakdown": {
      "ad_9": {
        "ea586": "<long>",
        "amet_cce": "<long>"
      },
      "exercitation_2f": {
        "ut_2": "<long>",
        "eiusmod_d1": "<long>"
      }
    },
    "qualifierStats": {
      "Duis_4": {
        "qui_e3": "<long>",
        "laborisf": "<long>"
      },
      "Ut_2": {
        "doloref": "<long>"
      },
      "sunt_3": {
        "qui045": "<long>",
        "nostrud1": "<long>"
      }
    },
    "ratios": {
      "eiusmode34": "<number>",
      "fugiat_41": "<number>"
    }
  },
  "testing": {
    "testId": "<long>",
    "hoursToWait": "<integer>",
    "abSuccessMetric": "OPENS_BY_DELIVERED",
    "abSampleSizeDefault": "variant",
    "abStatus": "automated_master",
    "abTestPercentage": "<integer>",
    "abSamplingDefault": "master"
  },
  "subscriptionDetails": {
    "subscriptionId": "<long>",
    "preferencesGroupId": "<long>",
    "officeLocationId": "<string>"
  },
  "updatedById": "<integer>",
  "publishedById": "<integer>",
  "language": "bo-in",
  "campaign": "<string>",
  "webversion": {
    "slug": "<string>",
    "domain": "<string>",
    "title": "<string>",
    "metaDescription": "<string>",
    "redirectToUrl": "<string>",
    "redirectToPageId": "<long>",
    "expiresAt": "<dateTime>"
  },
  "rssData": {
    "maxEntries": "<integer>",
    "timing": {
      "laborisfe_": {},
      "ipsum2": {}
    },
    "url": "<string>",
    "hubspotBlogId": "<long>",
    "blogEmailType": "<string>",
    "blogImageMaxWidth": "<integer>",
    "rssEntryTemplate": "<string>",
    "useHeadlineAsSubject": "<boolean>",
    "blogLayout": "<string>"
  },
  "isTransactional": "<boolean>",
  "isPublished": "<boolean>",
  "publishDate": "<dateTime>",
  "updatedAt": "<dateTime>",
  "createdAt": "<dateTime>",
  "deletedAt": "<dateTime>",
  "publishedAt": "<dateTime>",
  "isAb": "<boolean>"
}
```

---

### Publish or send a marketing email

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/emails/:emailId/publish`

**Description:** If you have a Marketing Hub Enterprise account or the transactional email add-on, you can use this endpoint to publish an automated email or send/schedule a regular email.

**Authentication:** oauth2

**Path Variables:**

- `emailId`: (Required) 

**Headers:**


---

### Create an A/B test variation of a marketing email

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/emails/ab-test/create-variation`

**Description:** Create a variation of a marketing email for an A/B test. The new variation will be created as a draft. If an active variation already exists, a new one won't be created.

**Authentication:** apikey

**Headers:**

- `Content-Type`: application/json

**Success Response (201):**

```json
{
  "content": {
    "smartFields": {
      "dolor4de": {}
    },
    "themeSettingsValues": {
      "dolore_3a9": {}
    },
    "flexAreas": {
      "irure5": {}
    },
    "widgets": {
      "ad50b": {}
    },
    "plainTextVersion": "Lorem quis sint",
    "templatePath": "ipsum officia in",
    "widgetContainers": {
      "id_0": {}
    },
    "styleSettings": {
      "emailBodyPadding": "Excepteur proident",
      "colorPickerFavorite5": "in ipsum veniam magna",
      "bodyColor": "in Excepteur",
      "colorPickerFavorite6": "sed voluptate",
      "backgroundImage": "deserunt est",
      "emailBodyWidth": "commodo dolore",
      "secondaryFont": "magna sed commodo enim",
      "primaryAccentColor": "amet mollit",
      "colorPickerFavorite3": "aliquip esse",
      "primaryFontLineHeight": "quis nostrud",
      "colorPickerFavorite4": "aliqua sed labore ullamco laboris",
      "secondaryFontColor": "dolore enim sint nulla",
      "colorPickerFavorite1": "cillum elit id",
      "colorPickerFavorite2": "ad in reprehenderit",
      "bodyBorderColor": "consequat adipisicing labore consectetur",
      "bodyBorderWidth": -2897480,
      "linksFont": {
        "size": -21850777,
        "color": "minim officia fugiat laborum",
        "underline": true,
        "bold": false,
        "italic": true,
        "font": "sint tempor ad nostrud"
      },
      "backgroundColor": "elit laboris",
      "backgroundImageType": "id ",
      "dividerStyleSettings": {
        "color": {},
        "lineType": "reprehenderit in id",
        "height": 37893315
      },
      "secondaryAccentColor": "proident do veniam voluptate",
      "secondaryFontLineHeight": "Duis",
      "primaryFontSize": 69367268,
      "secondaryFontSize": 89866613,
      "primaryFontColor": "proident anim adipisicing ea",
      "headingOneFont": {
        "size": -56364228,
        "color": "dolore laborum sunt do ut",
        "underline": false,
        "bold": true,
        "italic": false,
        "font": "in magna sint esse"
      },
      "primaryFont": "sunt elit",
      "headingTwoFont": {
        "size": 27320681,
        "color": "ad",
        "underline": false,
        "bold": false,
        "italic": false,
        "font": "est nostrud do Lorem"
      },
      "buttonStyleSettings": {
        "backgroundColor": {},
        "fontStyle": {
          "size": -26290660,
          "color": "esse voluptate",
          "underline": true,
          "bold": false,
          "italic": true,
          "font": "sint consequat nisi"
        },
        "cornerRadius": -78024490
      },
      "bodyBorderColorChoice": "sunt est voluptate"
    }
  },
  "from": {
    "customReplyTo": "laborum sunt",
    "fromName": "Excepteur",
    "replyTo": "consectetur nisi ullamco officia Ut"
  },
  "id": "ullamco ut",
  "name": "aliqua occae",
  "sendOnPublish": false,
  "state": "DRAFT",
  "subcategory": "dolore cupidatat dolor",
  "subject": "enim in quis",
  "to": {
    "limitSendFrequency": false,
    "suppressGraymail": true,
    "contactIds": {
      "include": [
        "id deserunt fugiat veniam",
        "voluptate consequat"
      ],
      "exclude": [
        "et eiusmod",
        "quis Duis"
      ]
    },
    "contactLists": {
      "include": [
        "laborum nulla",
        "magna sunt ipsum deserunt cupidatat"
      ],
      "exclude": [
        "consectetur velit dolor cupidatat Duis",
        "eiusmod"
      ]
    }
  },
  "feedbackSurveyId": "culpa in ut aliquip dolor",
  "publishDate": "1956-08-19T04:42:41.747Z",
  "isTransactional": false,
  "language": "lkt-us",
  "type": "OPTIN_FOLLOWUP_EMAIL",
  "businessUnitId": "do eiusmod nostrud",
  "webversion": {
    "domain": "ullamco dolore in id nostrud",
    "redirectToPageId": "esse non qui voluptate",
    "redirectToUrl": "magna dolore",
    "title": "laborum nisi",
    "metaDescription": "reprehenderit ex eu",
    "slug": "sed amet Ut",
    "expiresAt": "2023-07-22T08:47:36.366Z"
  },
  "workflowNames": [
    "quis esse",
    "ad in incididunt et"
  ],
  "archived": false,
  "createdAt": "1991-06-24T08:04:13.834Z",
  "stats": {
    "counters": {
      "Excepteur3f7": 34246249
    },
    "deviceBreakdown": {
      "ipsuma7": {
        "Lorem_d": 87380802,
        "velit_26f": 41299676
      },
      "ullamco_5": {
        "sint73b": -1454320,
        "dolor_4a": 16658635
      }
    },
    "qualifierStats": {
      "non_7de": {
        "dolor_9": -19347437,
        "non_109": 90928796,
        "consectetur_6d": -63325910,
        "incididuntd": 68574952
      },
      "aute_57": {
        "labore4cc": 52749655,
        "ut_f": 11717357,
        "aliquipa_": 84287081
      },
      "cillume5": {
        "incididunt10": -92781785
      },
      "elit0e1": {
        "veniam_4": 74597948
      }
    },
    "ratios": {
      "quicc": -9498520.397970632,
      "sit6": -25074633.92610587,
      "mollited6": 99210944.7586346
    }
  },
  "createdById": "in in",
  "updatedAt": "1958-08-29T16:49:43.082Z",
  "rssData": {
    "blogImageMaxWidth": -12492327,
    "blogEmailType": "occaecat eiusmod",
    "hubspotBlogId": "occaecat q",
    "rssEntryTemplate": "deserunt incididunt",
    "timing": {
      "Excepteuraf": {},
      "reprehenderit032": {}
    },
    "maxEntries": -89194318,
    "useHeadlineAsSubject": true,
    "blogLayout": "nisi in id",
    "url": "Excepteur culpa dolore veniam"
  },
  "publishedAt": "1984-01-01T22:52:10.410Z",
  "publishedById": "id sunt ipsum sint com",
  "isPublished": true,
  "testing": {
    "abSamplingDefault": "master",
    "abSampleSizeDefault": "automated_master",
    "abStatus": "master",
    "abTestPercentage": 38774587,
    "hoursToWait": 6305454,
    "testId": "sint non anim",
    "abSuccessMetric": "CLICKS_BY_DELIVERED"
  },
  "updatedById": "nostrud sit ipsum ut",
  "folderId": -67722642,
  "subscriptionDetails": {
    "officeLocationId": "do enim",
    "preferencesGroupId": "adipisicing non deserunt",
    "subscriptionId": "minim amet ut velit"
  },
  "deletedAt": "1993-12-16T22:48:26.981Z",
  "activeDomain": "exercitation et",
  "campaign": "laboris",
  "campaignName": "dolor sunt sint laborum laboris",
  "isAb": "<boolean>"
}
```

---

### Unpublish or cancel a marketing email

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/emails/:emailId/unpublish`

**Description:** If you have a Marketing Hub Enterprise account or the transactional email add-on, you can use this endpoint to unpublish an automated email or cancel a regular email. If the email is already in the process of being sent, canceling might not be possible.

**Authentication:** oauth2

**Path Variables:**

- `emailId`: (Required) 

**Headers:**


---

### Clone a marketing email

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/emails/clone`

**Description:** This will create a duplicate email with the same properties as the original, with the exception of a unique ID.

**Authentication:** apikey

**Headers:**

- `Content-Type`: application/json

**Success Response (200):**

```json
{
  "content": {
    "smartFields": {
      "dolor4de": {}
    },
    "themeSettingsValues": {
      "dolore_3a9": {}
    },
    "flexAreas": {
      "irure5": {}
    },
    "widgets": {
      "ad50b": {}
    },
    "plainTextVersion": "Lorem quis sint",
    "templatePath": "ipsum officia in",
    "widgetContainers": {
      "id_0": {}
    },
    "styleSettings": {
      "emailBodyPadding": "Excepteur proident",
      "colorPickerFavorite5": "in ipsum veniam magna",
      "bodyColor": "in Excepteur",
      "colorPickerFavorite6": "sed voluptate",
      "backgroundImage": "deserunt est",
      "emailBodyWidth": "commodo dolore",
      "secondaryFont": "magna sed commodo enim",
      "primaryAccentColor": "amet mollit",
      "colorPickerFavorite3": "aliquip esse",
      "primaryFontLineHeight": "quis nostrud",
      "colorPickerFavorite4": "aliqua sed labore ullamco laboris",
      "secondaryFontColor": "dolore enim sint nulla",
      "colorPickerFavorite1": "cillum elit id",
      "colorPickerFavorite2": "ad in reprehenderit",
      "bodyBorderColor": "consequat adipisicing labore consectetur",
      "bodyBorderWidth": -2897480,
      "linksFont": {
        "size": -21850777,
        "color": "minim officia fugiat laborum",
        "underline": true,
        "bold": false,
        "italic": true,
        "font": "sint tempor ad nostrud"
      },
      "backgroundColor": "elit laboris",
      "backgroundImageType": "id ",
      "dividerStyleSettings": {
        "color": {},
        "lineType": "reprehenderit in id",
        "height": 37893315
      },
      "secondaryAccentColor": "proident do veniam voluptate",
      "secondaryFontLineHeight": "Duis",
      "primaryFontSize": 69367268,
      "secondaryFontSize": 89866613,
      "primaryFontColor": "proident anim adipisicing ea",
      "headingOneFont": {
        "size": -56364228,
        "color": "dolore laborum sunt do ut",
        "underline": false,
        "bold": true,
        "italic": false,
        "font": "in magna sint esse"
      },
      "primaryFont": "sunt elit",
      "headingTwoFont": {
        "size": 27320681,
        "color": "ad",
        "underline": false,
        "bold": false,
        "italic": false,
        "font": "est nostrud do Lorem"
      },
      "buttonStyleSettings": {
        "backgroundColor": {},
        "fontStyle": {
          "size": -26290660,
          "color": "esse voluptate",
          "underline": true,
          "bold": false,
          "italic": true,
          "font": "sint consequat nisi"
        },
        "cornerRadius": -78024490
      },
      "bodyBorderColorChoice": "sunt est voluptate"
    }
  },
  "from": {
    "customReplyTo": "laborum sunt",
    "fromName": "Excepteur",
    "replyTo": "consectetur nisi ullamco officia Ut"
  },
  "id": "ullamco ut",
  "name": "aliqua occae",
  "sendOnPublish": false,
  "state": "DRAFT",
  "subcategory": "dolore cupidatat dolor",
  "subject": "enim in quis",
  "to": {
    "limitSendFrequency": false,
    "suppressGraymail": true,
    "contactIds": {
      "include": [
        "id deserunt fugiat veniam",
        "voluptate consequat"
      ],
      "exclude": [
        "et eiusmod",
        "quis Duis"
      ]
    },
    "contactLists": {
      "include": [
        "laborum nulla",
        "magna sunt ipsum deserunt cupidatat"
      ],
      "exclude": [
        "consectetur velit dolor cupidatat Duis",
        "eiusmod"
      ]
    }
  },
  "feedbackSurveyId": "culpa in ut aliquip dolor",
  "publishDate": "1956-08-19T04:42:41.747Z",
  "isTransactional": false,
  "language": "lkt-us",
  "type": "OPTIN_FOLLOWUP_EMAIL",
  "businessUnitId": "do eiusmod nostrud",
  "webversion": {
    "domain": "ullamco dolore in id nostrud",
    "redirectToPageId": "esse non qui voluptate",
    "redirectToUrl": "magna dolore",
    "title": "laborum nisi",
    "metaDescription": "reprehenderit ex eu",
    "slug": "sed amet Ut",
    "expiresAt": "2023-07-22T08:47:36.366Z"
  },
  "workflowNames": [
    "quis esse",
    "ad in incididunt et"
  ],
  "archived": false,
  "createdAt": "1991-06-24T08:04:13.834Z",
  "stats": {
    "counters": {
      "Excepteur3f7": 34246249
    },
    "deviceBreakdown": {
      "ipsuma7": {
        "Lorem_d": 87380802,
        "velit_26f": 41299676
      },
      "ullamco_5": {
        "sint73b": -1454320,
        "dolor_4a": 16658635
      }
    },
    "qualifierStats": {
      "non_7de": {
        "dolor_9": -19347437,
        "non_109": 90928796,
        "consectetur_6d": -63325910,
        "incididuntd": 68574952
      },
      "aute_57": {
        "labore4cc": 52749655,
        "ut_f": 11717357,
        "aliquipa_": 84287081
      },
      "cillume5": {
        "incididunt10": -92781785
      },
      "elit0e1": {
        "veniam_4": 74597948
      }
    },
    "ratios": {
      "quicc": -9498520.397970632,
      "sit6": -25074633.92610587,
      "mollited6": 99210944.7586346
    }
  },
  "createdById": "in in",
  "updatedAt": "1958-08-29T16:49:43.082Z",
  "rssData": {
    "blogImageMaxWidth": -12492327,
    "blogEmailType": "occaecat eiusmod",
    "hubspotBlogId": "occaecat q",
    "rssEntryTemplate": "deserunt incididunt",
    "timing": {
      "Excepteuraf": {},
      "reprehenderit032": {}
    },
    "maxEntries": -89194318,
    "useHeadlineAsSubject": true,
    "blogLayout": "nisi in id",
    "url": "Excepteur culpa dolore veniam"
  },
  "publishedAt": "1984-01-01T22:52:10.410Z",
  "publishedById": "id sunt ipsum sint com",
  "isPublished": true,
  "testing": {
    "abSamplingDefault": "master",
    "abSampleSizeDefault": "automated_master",
    "abStatus": "master",
    "abTestPercentage": 38774587,
    "hoursToWait": 6305454,
    "testId": "sint non anim",
    "abSuccessMetric": "CLICKS_BY_DELIVERED"
  },
  "updatedById": "nostrud sit ipsum ut",
  "folderId": -67722642,
  "subscriptionDetails": {
    "officeLocationId": "do enim",
    "preferencesGroupId": "adipisicing non deserunt",
    "subscriptionId": "minim amet ut velit"
  },
  "deletedAt": "1993-12-16T22:48:26.981Z",
  "activeDomain": "exercitation et",
  "campaign": "laboris",
  "campaignName": "dolor sunt sint laborum laboris",
  "isAb": "<boolean>"
}
```

---

