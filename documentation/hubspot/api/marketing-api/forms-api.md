# Forms API

Total endpoints: 6

---

### Get a form definition

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/forms/:formId?archived=<boolean>`

**Description:** Returns a form based on the form ID provided.

**Authentication:** apikey

**Path Variables:**

- `formId`: (Required) The unique identifier of the form

**Query Parameters:**

- `archived`: Whether to return only results that have been archived.

**Headers:**


**Success Response (200):**

```json
{
  "archived": "<boolean>",
  "configuration": {
    "allowLinkToResetKnownValues": "<boolean>",
    "archivable": "<boolean>",
    "cloneable": "<boolean>",
    "createNewContactForNewEmail": "<boolean>",
    "editable": "<boolean>",
    "language": "af",
    "notifyContactOwner": "<boolean>",
    "notifyRecipients": [
      "<string>",
      "<string>"
    ],
    "postSubmitAction": {
      "type": "thank_you",
      "value": "<string>"
    },
    "prePopulateKnownValues": "<boolean>",
    "recaptchaEnabled": "<boolean>",
    "lifecycleStages": [
      {
        "objectTypeId": "<string>",
        "value": "<string>"
      },
      {
        "objectTypeId": "<string>",
        "value": "<string>"
      }
    ]
  },
  "createdAt": "<dateTime>",
  "displayOptions": {
    "renderRawHtml": "<boolean>",
    "style": {
      "backgroundWidth": "<string>",
      "fontFamily": "<string>",
      "helpTextColor": "<string>",
      "helpTextSize": "<string>",
      "labelTextColor": "<string>",
      "labelTextSize": "<string>",
      "legalConsentTextColor": "<string>",
      "legalConsentTextSize": "<string>",
      "submitAlignment": "right",
      "submitColor": "<string>",
      "submitFontColor": "<string>",
      "submitSize": "<string>"
    },
    "submitButtonText": "<string>",
    "theme": "linear",
    "cssClass": "<string>"
  },
  "fieldGroups": [
    {
      "fields": [
        {
          "dependentFields": [
            {
              "dependentCondition": {
                "operator": "doesnt_contain",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            },
            {
              "dependentCondition": {
                "operator": "not_between",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            }
          ],
          "fieldType": "email",
          "hidden": "<boolean>",
          "label": "<string>",
          "name": "<string>",
          "objectTypeId": "<string>",
          "required": "<boolean>",
          "validation": {
            "blockedEmailDomains": [
              "<string>",
              "<string>"
            ],
            "useDefaultBlockList": "<boolean>"
          },
          "defaultValue": "<string>",
          "description": "<string>",
          "placeholder": "<string>"
        },
        {
          "dependentFields": [
            {
              "dependentCondition": {
                "operator": "set_not_all",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            },
            {
              "dependentCondition": {
                "operator": "set_eq",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            }
          ],
          "fieldType": "email",
          "hidden": "<boolean>",
          "label": "<string>",
          "name": "<string>",
          "objectTypeId": "<string>",
          "required": "<boolean>",
          "validation": {
            "blockedEmailDomains": [
              "<string>",
              "<string>"
            ],
            "useDefaultBlockList": "<boolean>"
          },
          "defaultValue": "<string>",
          "description": "<string>",
          "placeholder": "<string>"
        }
      ],
      "groupType": "progressive",
      "richTextType": "text",
      "richText": "<string>"
    },
    {
      "fields": [
        {
          "dependentFields": [
            {
              "dependentCondition": {
                "operator": "between",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            },
            {
              "dependentCondition": {
                "operator": "set_not_any",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            }
          ],
          "fieldType": "email",
          "hidden": "<boolean>",
          "label": "<string>",
          "name": "<string>",
          "objectTypeId": "<string>",
          "required": "<boolean>",
          "validation": {
            "blockedEmailDomains": [
              "<string>",
              "<string>"
            ],
            "useDefaultBlockList": "<boolean>"
          },
          "defaultValue": "<string>",
          "description": "<string>",
          "placeholder": "<string>"
        },
        {
          "dependentFields": [
            {
              "dependentCondition": {
                "operator": "set_not_any",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            },
            {
              "dependentCondition": {
                "operator": "set_any",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            }
          ],
          "fieldType": "email",
          "hidden": "<boolean>",
          "label": "<string>",
          "name": "<string>",
          "objectTypeId": "<string>",
          "required": "<boolean>",
          "validation": {
            "blockedEmailDomains": [
              "<string>",
              "<string>"
            ],
            "useDefaultBlockList": "<boolean>"
          },
          "defaultValue": "<string>",
          "description": "<string>",
          "placeholder": "<string>"
        }
      ],
      "groupType": "progressive",
      "richTextType": "image",
      "richText": "<string>"
    }
  ],
  "formType": "hubspot",
  "id": "<string>",
  "legalConsentOptions": {
    "type": "none"
  },
  "name": "<string>",
  "updatedAt": "<dateTime>",
  "archivedAt": "<dateTime>"
}
```

---

### Update a form definition

**Method:** `PUT`

**URL:** `https://api.hubapi.com/marketing/v3/forms/:formId`

**Description:** Update all fields of a hubspot form definition.

**Authentication:** apikey

**Path Variables:**

- `formId`: (Required) 

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "archived": "<boolean>",
  "configuration": {
    "allowLinkToResetKnownValues": "<boolean>",
    "archivable": "<boolean>",
    "cloneable": "<boolean>",
    "createNewContactForNewEmail": "<boolean>",
    "editable": "<boolean>",
    "language": "af",
    "notifyContactOwner": "<boolean>",
    "notifyRecipients": [
      "<string>",
      "<string>"
    ],
    "postSubmitAction": {
      "type": "thank_you",
      "value": "<string>"
    },
    "prePopulateKnownValues": "<boolean>",
    "recaptchaEnabled": "<boolean>",
    "lifecycleStages": [
      {
        "objectTypeId": "<string>",
        "value": "<string>"
      },
      {
        "objectTypeId": "<string>",
        "value": "<string>"
      }
    ]
  },
  "createdAt": "<dateTime>",
  "displayOptions": {
    "renderRawHtml": "<boolean>",
    "style": {
      "backgroundWidth": "<string>",
      "fontFamily": "<string>",
      "helpTextColor": "<string>",
      "helpTextSize": "<string>",
      "labelTextColor": "<string>",
      "labelTextSize": "<string>",
      "legalConsentTextColor": "<string>",
      "legalConsentTextSize": "<string>",
      "submitAlignment": "right",
      "submitColor": "<string>",
      "submitFontColor": "<string>",
      "submitSize": "<string>"
    },
    "submitButtonText": "<string>",
    "theme": "linear",
    "cssClass": "<string>"
  },
  "fieldGroups": [
    {
      "fields": [
        {
          "dependentFields": [
            {
              "dependentCondition": {
                "operator": "doesnt_contain",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            },
            {
              "dependentCondition": {
                "operator": "not_between",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            }
          ],
          "fieldType": "email",
          "hidden": "<boolean>",
          "label": "<string>",
          "name": "<string>",
          "objectTypeId": "<string>",
          "required": "<boolean>",
          "validation": {
            "blockedEmailDomains": [
              "<string>",
              "<string>"
            ],
            "useDefaultBlockList": "<boolean>"
          },
          "defaultValue": "<string>",
          "description": "<string>",
          "placeholder": "<string>"
        },
        {
          "dependentFields": [
            {
              "dependentCondition": {
                "operator": "set_not_all",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            },
            {
              "dependentCondition": {
                "operator": "set_eq",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            }
          ],
          "fieldType": "email",
          "hidden": "<boolean>",
          "label": "<string>",
          "name": "<string>",
          "objectTypeId": "<string>",
          "required": "<boolean>",
          "validation": {
            "blockedEmailDomains": [
              "<string>",
              "<string>"
            ],
            "useDefaultBlockList": "<boolean>"
          },
          "defaultValue": "<string>",
          "description": "<string>",
          "placeholder": "<string>"
        }
      ],
      "groupType": "progressive",
      "richTextType": "text",
      "richText": "<string>"
    },
    {
      "fields": [
        {
          "dependentFields": [
            {
              "dependentCondition": {
                "operator": "between",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            },
            {
              "dependentCondition": {
                "operator": "set_not_any",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            }
          ],
          "fieldType": "email",
          "hidden": "<boolean>",
          "label": "<string>",
          "name": "<string>",
          "objectTypeId": "<string>",
          "required": "<boolean>",
          "validation": {
            "blockedEmailDomains": [
              "<string>",
              "<string>"
            ],
            "useDefaultBlockList": "<boolean>"
          },
          "defaultValue": "<string>",
          "description": "<string>",
          "placeholder": "<string>"
        },
        {
          "dependentFields": [
            {
              "dependentCondition": {
                "operator": "set_not_any",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            },
            {
              "dependentCondition": {
                "operator": "set_any",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            }
          ],
          "fieldType": "email",
          "hidden": "<boolean>",
          "label": "<string>",
          "name": "<string>",
          "objectTypeId": "<string>",
          "required": "<boolean>",
          "validation": {
            "blockedEmailDomains": [
              "<string>",
              "<string>"
            ],
            "useDefaultBlockList": "<boolean>"
          },
          "defaultValue": "<string>",
          "description": "<string>",
          "placeholder": "<string>"
        }
      ],
      "groupType": "progressive",
      "richTextType": "image",
      "richText": "<string>"
    }
  ],
  "formType": "hubspot",
  "id": "<string>",
  "legalConsentOptions": {
    "type": "none"
  },
  "name": "<string>",
  "updatedAt": "<dateTime>",
  "archivedAt": "<dateTime>"
}
```

**Success Response (200):**

```json
{
  "archived": "<boolean>",
  "configuration": {
    "allowLinkToResetKnownValues": "<boolean>",
    "archivable": "<boolean>",
    "cloneable": "<boolean>",
    "createNewContactForNewEmail": "<boolean>",
    "editable": "<boolean>",
    "language": "af",
    "notifyContactOwner": "<boolean>",
    "notifyRecipients": [
      "<string>",
      "<string>"
    ],
    "postSubmitAction": {
      "type": "thank_you",
      "value": "<string>"
    },
    "prePopulateKnownValues": "<boolean>",
    "recaptchaEnabled": "<boolean>",
    "lifecycleStages": [
      {
        "objectTypeId": "<string>",
        "value": "<string>"
      },
      {
        "objectTypeId": "<string>",
        "value": "<string>"
      }
    ]
  },
  "createdAt": "<dateTime>",
  "displayOptions": {
    "renderRawHtml": "<boolean>",
    "style": {
      "backgroundWidth": "<string>",
      "fontFamily": "<string>",
      "helpTextColor": "<string>",
      "helpTextSize": "<string>",
      "labelTextColor": "<string>",
      "labelTextSize": "<string>",
      "legalConsentTextColor": "<string>",
      "legalConsentTextSize": "<string>",
      "submitAlignment": "right",
      "submitColor": "<string>",
      "submitFontColor": "<string>",
      "submitSize": "<string>"
    },
    "submitButtonText": "<string>",
    "theme": "linear",
    "cssClass": "<string>"
  },
  "fieldGroups": [
    {
      "fields": [
        {
          "dependentFields": [
            {
              "dependentCondition": {
                "operator": "doesnt_contain",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            },
            {
              "dependentCondition": {
                "operator": "not_between",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            }
          ],
          "fieldType": "email",
          "hidden": "<boolean>",
          "label": "<string>",
          "name": "<string>",
          "objectTypeId": "<string>",
          "required": "<boolean>",
          "validation": {
            "blockedEmailDomains": [
              "<string>",
              "<string>"
            ],
            "useDefaultBlockList": "<boolean>"
          },
          "defaultValue": "<string>",
          "description": "<string>",
          "placeholder": "<string>"
        },
        {
          "dependentFields": [
            {
              "dependentCondition": {
                "operator": "set_not_all",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            },
            {
              "dependentCondition": {
                "operator": "set_eq",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            }
          ],
          "fieldType": "email",
          "hidden": "<boolean>",
          "label": "<string>",
          "name": "<string>",
          "objectTypeId": "<string>",
          "required": "<boolean>",
          "validation": {
            "blockedEmailDomains": [
              "<string>",
              "<string>"
            ],
            "useDefaultBlockList": "<boolean>"
          },
          "defaultValue": "<string>",
          "description": "<string>",
          "placeholder": "<string>"
        }
      ],
      "groupType": "progressive",
      "richTextType": "text",
      "richText": "<string>"
    },
    {
      "fields": [
        {
          "dependentFields": [
            {
              "dependentCondition": {
                "operator": "between",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            },
            {
              "dependentCondition": {
                "operator": "set_not_any",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            }
          ],
          "fieldType": "email",
          "hidden": "<boolean>",
          "label": "<string>",
          "name": "<string>",
          "objectTypeId": "<string>",
          "required": "<boolean>",
          "validation": {
            "blockedEmailDomains": [
              "<string>",
              "<string>"
            ],
            "useDefaultBlockList": "<boolean>"
          },
          "defaultValue": "<string>",
          "description": "<string>",
          "placeholder": "<string>"
        },
        {
          "dependentFields": [
            {
              "dependentCondition": {
                "operator": "set_not_any",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            },
            {
              "dependentCondition": {
                "operator": "set_any",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            }
          ],
          "fieldType": "email",
          "hidden": "<boolean>",
          "label": "<string>",
          "name": "<string>",
          "objectTypeId": "<string>",
          "required": "<boolean>",
          "validation": {
            "blockedEmailDomains": [
              "<string>",
              "<string>"
            ],
            "useDefaultBlockList": "<boolean>"
          },
          "defaultValue": "<string>",
          "description": "<string>",
          "placeholder": "<string>"
        }
      ],
      "groupType": "progressive",
      "richTextType": "image",
      "richText": "<string>"
    }
  ],
  "formType": "hubspot",
  "id": "<string>",
  "legalConsentOptions": {
    "type": "none"
  },
  "name": "<string>",
  "updatedAt": "<dateTime>",
  "archivedAt": "<dateTime>"
}
```

---

### Archive a form definition

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/marketing/v3/forms/:formId`

**Description:** Archive a form definition. New submissions will not be accepted and the form definition will be permanently deleted after 3 months.

**Authentication:** apikey

**Path Variables:**

- `formId`: (Required) The ID of the form to archive.

**Headers:**


**Success Response (204):**

```json
{
  "example": {}
}
```

---

### Partially update a form definition

**Method:** `PATCH`

**URL:** `https://api.hubapi.com/marketing/v3/forms/:formId`

**Description:** Update some of the form definition components

**Authentication:** apikey

**Path Variables:**

- `formId`: (Required) The ID of the form to update.

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "fieldGroups": [
    {
      "fields": [
        {
          "dependentFields": [
            {
              "dependentCondition": {
                "operator": "set_all",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            },
            {
              "dependentCondition": {
                "operator": "set_not_all",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            }
          ],
          "fieldType": "email",
          "hidden": "<boolean>",
          "label": "<string>",
          "name": "<string>",
          "objectTypeId": "<string>",
          "required": "<boolean>",
          "validation": {
            "blockedEmailDomains": [
              "<string>",
              "<string>"
            ],
            "useDefaultBlockList": "<boolean>"
          },
          "defaultValue": "<string>",
          "description": "<string>",
          "placeholder": "<string>"
        },
        {
          "dependentFields": [
            {
              "dependentCondition": {
                "operator": "contains",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            },
            {
              "dependentCondition": {
                "operator": "gte",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            }
          ],
          "fieldType": "email",
          "hidden": "<boolean>",
          "label": "<string>",
          "name": "<string>",
          "objectTypeId": "<string>",
          "required": "<boolean>",
          "validation": {
            "blockedEmailDomains": [
              "<string>",
              "<string>"
            ],
            "useDefaultBlockList": "<boolean>"
          },
          "defaultValue": "<string>",
          "description": "<string>",
          "placeholder": "<string>"
        }
      ],
      "groupType": "default_group",
      "richTextType": "image",
      "richText": "<string>"
    },
    {
      "fields": [
        {
          "dependentFields": [
            {
              "dependentCondition": {
                "operator": "within_time",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            },
            {
              "dependentCondition": {
                "operator": "set_any",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            }
          ],
          "fieldType": "email",
          "hidden": "<boolean>",
          "label": "<string>",
          "name": "<string>",
          "objectTypeId": "<string>",
          "required": "<boolean>",
          "validation": {
            "blockedEmailDomains": [
              "<string>",
              "<string>"
            ],
            "useDefaultBlockList": "<boolean>"
          },
          "defaultValue": "<string>",
          "description": "<string>",
          "placeholder": "<string>"
        },
        {
          "dependentFields": [
            {
              "dependentCondition": {
                "operator": "within_time",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            },
            {
              "dependentCondition": {
                "operator": "gt",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            }
          ],
          "fieldType": "email",
          "hidden": "<boolean>",
          "label": "<string>",
          "name": "<string>",
          "objectTypeId": "<string>",
          "required": "<boolean>",
          "validation": {
            "blockedEmailDomains": [
              "<string>",
              "<string>"
            ],
            "useDefaultBlockList": "<boolean>"
          },
          "defaultValue": "<string>",
          "description": "<string>",
          "placeholder": "<string>"
        }
      ],
      "groupType": "progressive",
      "richTextType": "text",
      "richText": "<string>"
    }
  ],
  "archived": "<boolean>",
  "configuration": {
    "allowLinkToResetKnownValues": "<boolean>",
    "archivable": "<boolean>",
    "cloneable": "<boolean>",
    "createNewContactForNewEmail": "<boolean>",
    "editable": "<boolean>",
    "language": "id",
    "notifyContactOwner": "<boolean>",
    "notifyRecipients": [
      "<string>",
      "<string>"
    ],
    "postSubmitAction": {
      "type": "redirect_url",
      "value": "<string>"
    },
    "prePopulateKnownValues": "<boolean>",
    "recaptchaEnabled": "<boolean>",
    "lifecycleStages": [
      {
        "objectTypeId": "<string>",
        "value": "<string>"
      },
      {
        "objectTypeId": "<string>",
        "value": "<string>"
      }
    ]
  },
  "name": "<string>",
  "legalConsentOptions": {
    "type": "none"
  },
  "displayOptions": {
    "renderRawHtml": "<boolean>",
    "style": {
      "backgroundWidth": "<string>",
      "fontFamily": "<string>",
      "helpTextColor": "<string>",
      "helpTextSize": "<string>",
      "labelTextColor": "<string>",
      "labelTextSize": "<string>",
      "legalConsentTextColor": "<string>",
      "legalConsentTextSize": "<string>",
      "submitAlignment": "center",
      "submitColor": "<string>",
      "submitFontColor": "<string>",
      "submitSize": "<string>"
    },
    "submitButtonText": "<string>",
    "theme": "canvas",
    "cssClass": "<string>"
  }
}
```

**Success Response (200):**

```json
{
  "archived": "<boolean>",
  "configuration": {
    "allowLinkToResetKnownValues": "<boolean>",
    "archivable": "<boolean>",
    "cloneable": "<boolean>",
    "createNewContactForNewEmail": "<boolean>",
    "editable": "<boolean>",
    "language": "af",
    "notifyContactOwner": "<boolean>",
    "notifyRecipients": [
      "<string>",
      "<string>"
    ],
    "postSubmitAction": {
      "type": "thank_you",
      "value": "<string>"
    },
    "prePopulateKnownValues": "<boolean>",
    "recaptchaEnabled": "<boolean>",
    "lifecycleStages": [
      {
        "objectTypeId": "<string>",
        "value": "<string>"
      },
      {
        "objectTypeId": "<string>",
        "value": "<string>"
      }
    ]
  },
  "createdAt": "<dateTime>",
  "displayOptions": {
    "renderRawHtml": "<boolean>",
    "style": {
      "backgroundWidth": "<string>",
      "fontFamily": "<string>",
      "helpTextColor": "<string>",
      "helpTextSize": "<string>",
      "labelTextColor": "<string>",
      "labelTextSize": "<string>",
      "legalConsentTextColor": "<string>",
      "legalConsentTextSize": "<string>",
      "submitAlignment": "right",
      "submitColor": "<string>",
      "submitFontColor": "<string>",
      "submitSize": "<string>"
    },
    "submitButtonText": "<string>",
    "theme": "linear",
    "cssClass": "<string>"
  },
  "fieldGroups": [
    {
      "fields": [
        {
          "dependentFields": [
            {
              "dependentCondition": {
                "operator": "doesnt_contain",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            },
            {
              "dependentCondition": {
                "operator": "not_between",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            }
          ],
          "fieldType": "email",
          "hidden": "<boolean>",
          "label": "<string>",
          "name": "<string>",
          "objectTypeId": "<string>",
          "required": "<boolean>",
          "validation": {
            "blockedEmailDomains": [
              "<string>",
              "<string>"
            ],
            "useDefaultBlockList": "<boolean>"
          },
          "defaultValue": "<string>",
          "description": "<string>",
          "placeholder": "<string>"
        },
        {
          "dependentFields": [
            {
              "dependentCondition": {
                "operator": "set_not_all",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            },
            {
              "dependentCondition": {
                "operator": "set_eq",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            }
          ],
          "fieldType": "email",
          "hidden": "<boolean>",
          "label": "<string>",
          "name": "<string>",
          "objectTypeId": "<string>",
          "required": "<boolean>",
          "validation": {
            "blockedEmailDomains": [
              "<string>",
              "<string>"
            ],
            "useDefaultBlockList": "<boolean>"
          },
          "defaultValue": "<string>",
          "description": "<string>",
          "placeholder": "<string>"
        }
      ],
      "groupType": "progressive",
      "richTextType": "text",
      "richText": "<string>"
    },
    {
      "fields": [
        {
          "dependentFields": [
            {
              "dependentCondition": {
                "operator": "between",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            },
            {
              "dependentCondition": {
                "operator": "set_not_any",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            }
          ],
          "fieldType": "email",
          "hidden": "<boolean>",
          "label": "<string>",
          "name": "<string>",
          "objectTypeId": "<string>",
          "required": "<boolean>",
          "validation": {
            "blockedEmailDomains": [
              "<string>",
              "<string>"
            ],
            "useDefaultBlockList": "<boolean>"
          },
          "defaultValue": "<string>",
          "description": "<string>",
          "placeholder": "<string>"
        },
        {
          "dependentFields": [
            {
              "dependentCondition": {
                "operator": "set_not_any",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            },
            {
              "dependentCondition": {
                "operator": "set_any",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            }
          ],
          "fieldType": "email",
          "hidden": "<boolean>",
          "label": "<string>",
          "name": "<string>",
          "objectTypeId": "<string>",
          "required": "<boolean>",
          "validation": {
            "blockedEmailDomains": [
              "<string>",
              "<string>"
            ],
            "useDefaultBlockList": "<boolean>"
          },
          "defaultValue": "<string>",
          "description": "<string>",
          "placeholder": "<string>"
        }
      ],
      "groupType": "progressive",
      "richTextType": "image",
      "richText": "<string>"
    }
  ],
  "formType": "hubspot",
  "id": "<string>",
  "legalConsentOptions": {
    "type": "none"
  },
  "name": "<string>",
  "updatedAt": "<dateTime>",
  "archivedAt": "<dateTime>"
}
```

---

### Get a list of forms

**Method:** `GET`

**URL:** `https://api.hubapi.com/marketing/v3/forms/?after=<string>&limit=<integer>&archived=<boolean>&formTypes=captured&formTypes=all`

**Description:** Returns a list of forms based on the search filters. By default, it returns the first 20 `hubspot` forms

**Authentication:** apikey

**Query Parameters:**

- `after`: The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
- `limit`: The maximum number of results to display per page.
- `archived`: Whether to return only results that have been archived.
- `formTypes`: The form types to be included in the results.
- `formTypes`: The form types to be included in the results.

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "archived": "<boolean>",
      "configuration": {
        "allowLinkToResetKnownValues": "<boolean>",
        "archivable": "<boolean>",
        "cloneable": "<boolean>",
        "createNewContactForNewEmail": "<boolean>",
        "editable": "<boolean>",
        "language": "sk",
        "notifyContactOwner": "<boolean>",
        "notifyRecipients": [
          "<string>",
          "<string>"
        ],
        "postSubmitAction": {
          "type": "thank_you",
          "value": "<string>"
        },
        "prePopulateKnownValues": "<boolean>",
        "recaptchaEnabled": "<boolean>",
        "lifecycleStages": [
          {
            "objectTypeId": "<string>",
            "value": "<string>"
          },
          {
            "objectTypeId": "<string>",
            "value": "<string>"
          }
        ]
      },
      "createdAt": "<dateTime>",
      "displayOptions": {
        "renderRawHtml": "<boolean>",
        "style": {
          "backgroundWidth": "<string>",
          "fontFamily": "<string>",
          "helpTextColor": "<string>",
          "helpTextSize": "<string>",
          "labelTextColor": "<string>",
          "labelTextSize": "<string>",
          "legalConsentTextColor": "<string>",
          "legalConsentTextSize": "<string>",
          "submitAlignment": "center",
          "submitColor": "<string>",
          "submitFontColor": "<string>",
          "submitSize": "<string>"
        },
        "submitButtonText": "<string>",
        "theme": "sharp",
        "cssClass": "<string>"
      },
      "fieldGroups": [
        {
          "fields": [
            {
              "dependentFields": [
                {
                  "dependentCondition": {
                    "operator": "within_time_reverse",
                    "rangeEnd": "<string>",
                    "rangeStart": "<string>",
                    "value": "<string>",
                    "values": [
                      "<string>",
                      "<string>"
                    ]
                  },
                  "dependentField": {
                    "value": "<Circular reference to #/components/schemas/EmailField detected>"
                  }
                },
                {
                  "dependentCondition": {
                    "operator": "contains",
                    "rangeEnd": "<string>",
                    "rangeStart": "<string>",
                    "value": "<string>",
                    "values": [
                      "<string>",
                      "<string>"
                    ]
                  },
                  "dependentField": {
                    "value": "<Circular reference to #/components/schemas/EmailField detected>"
                  }
                }
              ],
              "fieldType": "email",
              "hidden": "<boolean>",
              "label": "<string>",
              "name": "<string>",
              "objectTypeId": "<string>",
              "required": "<boolean>",
              "validation": {
                "blockedEmailDomains": [
                  "<string>",
                  "<string>"
                ],
                "useDefaultBlockList": "<boolean>"
              },
              "defaultValue": "<string>",
              "description": "<string>",
              "placeholder": "<string>"
            },
            {
              "dependentFields": [
                {
                  "dependentCondition": {
                    "operator": "set_all",
                    "rangeEnd": "<string>",
                    "rangeStart": "<string>",
                    "value": "<string>",
                    "values": [
                      "<string>",
                      "<string>"
                    ]
                  },
                  "dependentField": {
                    "value": "<Circular reference to #/components/schemas/EmailField detected>"
                  }
                },
                {
                  "dependentCondition": {
                    "operator": "within_time",
                    "rangeEnd": "<string>",
                    "rangeStart": "<string>",
                    "value": "<string>",
                    "values": [
                      "<string>",
                      "<string>"
                    ]
                  },
                  "dependentField": {
                    "value": "<Circular reference to #/components/schemas/EmailField detected>"
                  }
                }
              ],
              "fieldType": "email",
              "hidden": "<boolean>",
              "label": "<string>",
              "name": "<string>",
              "objectTypeId": "<string>",
              "required": "<boolean>",
              "validation": {
                "blockedEmailDomains": [
                  "<string>",
                  "<string>"
                ],
                "useDefaultBlockList": "<boolean>"
              },
              "defaultValue": "<string>",
              "description": "<string>",
              "placeholder": "<string>"
            }
          ],
          "groupType": "progressive",
          "richTextType": "image",
          "richText": "<string>"
        },
        {
          "fields": [
            {
              "dependentFields": [
                {
                  "dependentCondition": {
                    "operator": "set_neq",
                    "rangeEnd": "<string>",
                    "rangeStart": "<string>",
                    "value": "<string>",
                    "values": [
                      "<string>",
                      "<string>"
                    ]
                  },
                  "dependentField": {
                    "value": "<Circular reference to #/components/schemas/EmailField detected>"
                  }
                },
                {
                  "dependentCondition": {
                    "operator": "neq",
                    "rangeEnd": "<string>",
                    "rangeStart": "<string>",
                    "value": "<string>",
                    "values": [
                      "<string>",
                      "<string>"
                    ]
                  },
                  "dependentField": {
                    "value": "<Circular reference to #/components/schemas/EmailField detected>"
                  }
                }
              ],
              "fieldType": "email",
              "hidden": "<boolean>",
              "label": "<string>",
              "name": "<string>",
              "objectTypeId": "<string>",
              "required": "<boolean>",
              "validation": {
                "blockedEmailDomains": [
                  "<string>",
                  "<string>"
                ],
                "useDefaultBlockList": "<boolean>"
              },
              "defaultValue": "<string>",
              "description": "<string>",
              "placeholder": "<string>"
            },
            {
              "dependentFields": [
                {
                  "dependentCondition": {
                    "operator": "within_time_reverse",
                    "rangeEnd": "<string>",
                    "rangeStart": "<string>",
                    "value": "<string>",
                    "values": [
                      "<string>",
                      "<string>"
                    ]
                  },
                  "dependentField": {
                    "value": "<Circular reference to #/components/schemas/EmailField detected>"
                  }
                },
                {
                  "dependentCondition": {
                    "operator": "not_between",
                    "rangeEnd": "<string>",
                    "rangeStart": "<string>",
                    "value": "<string>",
                    "values": [
                      "<string>",
                      "<string>"
                    ]
                  },
                  "dependentField": {
                    "value": "<Circular reference to #/components/schemas/EmailField detected>"
                  }
                }
              ],
              "fieldType": "email",
              "hidden": "<boolean>",
              "label": "<string>",
              "name": "<string>",
              "objectTypeId": "<string>",
              "required": "<boolean>",
              "validation": {
                "blockedEmailDomains": [
                  "<string>",
                  "<string>"
                ],
                "useDefaultBlockList": "<boolean>"
              },
              "defaultValue": "<string>",
              "description": "<string>",
              "placeholder": "<string>"
            }
          ],
          "groupType": "default_group",
          "richTextType": "text",
          "richText": "<string>"
        }
      ],
      "formType": "hubspot",
      "id": "<string>",
      "legalConsentOptions": {
        "type": "none"
      },
      "name": "<string>",
      "updatedAt": "<dateTime>",
      "archivedAt": "<dateTime>"
    },
    {
      "archived": "<boolean>",
      "configuration": {
        "allowLinkToResetKnownValues": "<boolean>",
        "archivable": "<boolean>",
        "cloneable": "<boolean>",
        "createNewContactForNewEmail": "<boolean>",
        "editable": "<boolean>",
        "language": "nl",
        "notifyContactOwner": "<boolean>",
        "notifyRecipients": [
          "<string>",
          "<string>"
        ],
        "postSubmitAction": {
          "type": "thank_you",
          "value": "<string>"
        },
        "prePopulateKnownValues": "<boolean>",
        "recaptchaEnabled": "<boolean>",
        "lifecycleStages": [
          {
            "objectTypeId": "<string>",
            "value": "<string>"
          },
          {
            "objectTypeId": "<string>",
            "value": "<string>"
          }
        ]
      },
      "createdAt": "<dateTime>",
      "displayOptions": {
        "renderRawHtml": "<boolean>",
        "style": {
          "backgroundWidth": "<string>",
          "fontFamily": "<string>",
          "helpTextColor": "<string>",
          "helpTextSize": "<string>",
          "labelTextColor": "<string>",
          "labelTextSize": "<string>",
          "legalConsentTextColor": "<string>",
          "legalConsentTextSize": "<string>",
          "submitAlignment": "center",
          "submitColor": "<string>",
          "submitFontColor": "<string>",
          "submitSize": "<string>"
        },
        "submitButtonText": "<string>",
        "theme": "legacy",
        "cssClass": "<string>"
      },
      "fieldGroups": [
        {
          "fields": [
            {
              "dependentFields": [
                {
                  "dependentCondition": {
                    "operator": "set_all",
                    "rangeEnd": "<string>",
                    "rangeStart": "<string>",
                    "value": "<string>",
                    "values": [
                      "<string>",
                      "<string>"
                    ]
                  },
                  "dependentField": {
                    "value": "<Circular reference to #/components/schemas/EmailField detected>"
                  }
                },
                {
                  "dependentCondition": {
                    "operator": "set_eq",
                    "rangeEnd": "<string>",
                    "rangeStart": "<string>",
                    "value": "<string>",
                    "values": [
                      "<string>",
                      "<string>"
                    ]
                  },
                  "dependentField": {
                    "value": "<Circular reference to #/components/schemas/EmailField detected>"
                  }
                }
              ],
              "fieldType": "email",
              "hidden": "<boolean>",
              "label": "<string>",
              "name": "<string>",
              "objectTypeId": "<string>",
              "required": "<boolean>",
              "validation": {
                "blockedEmailDomains": [
                  "<string>",
                  "<string>"
                ],
                "useDefaultBlockList": "<boolean>"
              },
              "defaultValue": "<string>",
              "description": "<string>",
              "placeholder": "<string>"
            },
            {
              "dependentFields": [
                {
                  "dependentCondition": {
                    "operator": "is_not_empty",
                    "rangeEnd": "<string>",
                    "rangeStart": "<string>",
                    "value": "<string>",
                    "values": [
                      "<string>",
                      "<string>"
                    ]
                  },
                  "dependentField": {
                    "value": "<Circular reference to #/components/schemas/EmailField detected>"
                  }
                },
                {
                  "dependentCondition": {
                    "operator": "lt",
                    "rangeEnd": "<string>",
                    "rangeStart": "<string>",
                    "value": "<string>",
                    "values": [
                      "<string>",
                      "<string>"
                    ]
                  },
                  "dependentField": {
                    "value": "<Circular reference to #/components/schemas/EmailField detected>"
                  }
                }
              ],
              "fieldType": "email",
              "hidden": "<boolean>",
              "label": "<string>",
              "name": "<string>",
              "objectTypeId": "<string>",
              "required": "<boolean>",
              "validation": {
                "blockedEmailDomains": [
                  "<string>",
                  "<string>"
                ],
                "useDefaultBlockList": "<boolean>"
              },
              "defaultValue": "<string>",
              "description": "<string>",
              "placeholder": "<string>"
            }
          ],
          "groupType": "queued",
          "richTextType": "text",
          "richText": "<string>"
        },
        {
          "fields": [
            {
              "dependentFields": [
                {
                  "dependentCondition": {
                    "operator": "set_all",
                    "rangeEnd": "<string>",
                    "rangeStart": "<string>",
                    "value": "<string>",
                    "values": [
                      "<string>",
                      "<string>"
                    ]
                  },
                  "dependentField": {
                    "value": "<Circular reference to #/components/schemas/EmailField detected>"
                  }
                },
                {
                  "dependentCondition": {
                    "operator": "not_between",
                    "rangeEnd": "<string>",
                    "rangeStart": "<string>",
                    "value": "<string>",
                    "values": [
                      "<string>",
                      "<string>"
                    ]
                  },
                  "dependentField": {
                    "value": "<Circular reference to #/components/schemas/EmailField detected>"
                  }
                }
              ],
              "fieldType": "email",
              "hidden": "<boolean>",
              "label": "<string>",
              "name": "<string>",
              "objectTypeId": "<string>",
              "required": "<boolean>",
              "validation": {
                "blockedEmailDomains": [
                  "<string>",
                  "<string>"
                ],
                "useDefaultBlockList": "<boolean>"
              },
              "defaultValue": "<string>",
              "description": "<string>",
              "placeholder": "<string>"
            },
            {
              "dependentFields": [
                {
                  "dependentCondition": {
                    "operator": "doesnt_contain",
                    "rangeEnd": "<string>",
                    "rangeStart": "<string>",
                    "value": "<string>",
                    "values": [
                      "<string>",
                      "<string>"
                    ]
                  },
                  "dependentField": {
                    "value": "<Circular reference to #/components/schemas/EmailField detected>"
                  }
                },
                {
                  "dependentCondition": {
                    "operator": "gte",
                    "rangeEnd": "<string>",
                    "rangeStart": "<string>",
                    "value": "<string>",
                    "values": [
                      "<string>",
                      "<string>"
                    ]
                  },
                  "dependentField": {
                    "value": "<Circular reference to #/components/schemas/EmailField detected>"
                  }
                }
              ],
              "fieldType": "email",
              "hidden": "<boolean>",
              "label": "<string>",
              "name": "<string>",
              "objectTypeId": "<string>",
              "required": "<boolean>",
              "validation": {
                "blockedEmailDomains": [
                  "<string>",
                  "<string>"
                ],
                "useDefaultBlockList": "<boolean>"
              },
              "defaultValue": "<string>",
              "description": "<string>",
              "placeholder": "<string>"
            }
          ],
          "groupType": "queued",
          "richTextType": "text",
          "richText": "<string>"
        }
      ],
      "formType": "hubspot",
      "id": "<string>",
      "legalConsentOptions": {
        "type": "none"
      },
      "name": "<string>",
      "updatedAt": "<dateTime>",
      "archivedAt": "<dateTime>"
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

### Create a form

**Method:** `POST`

**URL:** `https://api.hubapi.com/marketing/v3/forms/`

**Description:** Add a new `hubspot` form

**Authentication:** apikey

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "archived": "<boolean>",
  "configuration": {
    "allowLinkToResetKnownValues": "<boolean>",
    "archivable": "<boolean>",
    "cloneable": "<boolean>",
    "createNewContactForNewEmail": "<boolean>",
    "editable": "<boolean>",
    "language": "fr",
    "notifyContactOwner": "<boolean>",
    "notifyRecipients": [
      "<string>",
      "<string>"
    ],
    "postSubmitAction": {
      "type": "redirect_url",
      "value": "<string>"
    },
    "prePopulateKnownValues": "<boolean>",
    "recaptchaEnabled": "<boolean>",
    "lifecycleStages": [
      {
        "objectTypeId": "<string>",
        "value": "<string>"
      },
      {
        "objectTypeId": "<string>",
        "value": "<string>"
      }
    ]
  },
  "createdAt": "<dateTime>",
  "displayOptions": {
    "renderRawHtml": "<boolean>",
    "style": {
      "backgroundWidth": "<string>",
      "fontFamily": "<string>",
      "helpTextColor": "<string>",
      "helpTextSize": "<string>",
      "labelTextColor": "<string>",
      "labelTextSize": "<string>",
      "legalConsentTextColor": "<string>",
      "legalConsentTextSize": "<string>",
      "submitAlignment": "center",
      "submitColor": "<string>",
      "submitFontColor": "<string>",
      "submitSize": "<string>"
    },
    "submitButtonText": "<string>",
    "theme": "legacy",
    "cssClass": "<string>"
  },
  "fieldGroups": [
    {
      "fields": [
        {
          "dependentFields": [
            {
              "dependentCondition": {
                "operator": "set_any",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            },
            {
              "dependentCondition": {
                "operator": "between",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            }
          ],
          "fieldType": "email",
          "hidden": "<boolean>",
          "label": "<string>",
          "name": "<string>",
          "objectTypeId": "<string>",
          "required": "<boolean>",
          "validation": {
            "blockedEmailDomains": [
              "<string>",
              "<string>"
            ],
            "useDefaultBlockList": "<boolean>"
          },
          "defaultValue": "<string>",
          "description": "<string>",
          "placeholder": "<string>"
        },
        {
          "dependentFields": [
            {
              "dependentCondition": {
                "operator": "lt",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            },
            {
              "dependentCondition": {
                "operator": "neq",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            }
          ],
          "fieldType": "email",
          "hidden": "<boolean>",
          "label": "<string>",
          "name": "<string>",
          "objectTypeId": "<string>",
          "required": "<boolean>",
          "validation": {
            "blockedEmailDomains": [
              "<string>",
              "<string>"
            ],
            "useDefaultBlockList": "<boolean>"
          },
          "defaultValue": "<string>",
          "description": "<string>",
          "placeholder": "<string>"
        }
      ],
      "groupType": "default_group",
      "richTextType": "image",
      "richText": "<string>"
    },
    {
      "fields": [
        {
          "dependentFields": [
            {
              "dependentCondition": {
                "operator": "str_ends_with",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            },
            {
              "dependentCondition": {
                "operator": "set_not_all",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            }
          ],
          "fieldType": "email",
          "hidden": "<boolean>",
          "label": "<string>",
          "name": "<string>",
          "objectTypeId": "<string>",
          "required": "<boolean>",
          "validation": {
            "blockedEmailDomains": [
              "<string>",
              "<string>"
            ],
            "useDefaultBlockList": "<boolean>"
          },
          "defaultValue": "<string>",
          "description": "<string>",
          "placeholder": "<string>"
        },
        {
          "dependentFields": [
            {
              "dependentCondition": {
                "operator": "gte",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            },
            {
              "dependentCondition": {
                "operator": "gte",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            }
          ],
          "fieldType": "email",
          "hidden": "<boolean>",
          "label": "<string>",
          "name": "<string>",
          "objectTypeId": "<string>",
          "required": "<boolean>",
          "validation": {
            "blockedEmailDomains": [
              "<string>",
              "<string>"
            ],
            "useDefaultBlockList": "<boolean>"
          },
          "defaultValue": "<string>",
          "description": "<string>",
          "placeholder": "<string>"
        }
      ],
      "groupType": "default_group",
      "richTextType": "image",
      "richText": "<string>"
    }
  ],
  "formType": "hubspot",
  "legalConsentOptions": {
    "type": "none"
  },
  "name": "<string>",
  "updatedAt": "<dateTime>",
  "archivedAt": "<dateTime>"
}
```

**Success Response (201):**

```json
{
  "archived": "<boolean>",
  "configuration": {
    "allowLinkToResetKnownValues": "<boolean>",
    "archivable": "<boolean>",
    "cloneable": "<boolean>",
    "createNewContactForNewEmail": "<boolean>",
    "editable": "<boolean>",
    "language": "af",
    "notifyContactOwner": "<boolean>",
    "notifyRecipients": [
      "<string>",
      "<string>"
    ],
    "postSubmitAction": {
      "type": "thank_you",
      "value": "<string>"
    },
    "prePopulateKnownValues": "<boolean>",
    "recaptchaEnabled": "<boolean>",
    "lifecycleStages": [
      {
        "objectTypeId": "<string>",
        "value": "<string>"
      },
      {
        "objectTypeId": "<string>",
        "value": "<string>"
      }
    ]
  },
  "createdAt": "<dateTime>",
  "displayOptions": {
    "renderRawHtml": "<boolean>",
    "style": {
      "backgroundWidth": "<string>",
      "fontFamily": "<string>",
      "helpTextColor": "<string>",
      "helpTextSize": "<string>",
      "labelTextColor": "<string>",
      "labelTextSize": "<string>",
      "legalConsentTextColor": "<string>",
      "legalConsentTextSize": "<string>",
      "submitAlignment": "right",
      "submitColor": "<string>",
      "submitFontColor": "<string>",
      "submitSize": "<string>"
    },
    "submitButtonText": "<string>",
    "theme": "linear",
    "cssClass": "<string>"
  },
  "fieldGroups": [
    {
      "fields": [
        {
          "dependentFields": [
            {
              "dependentCondition": {
                "operator": "doesnt_contain",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            },
            {
              "dependentCondition": {
                "operator": "not_between",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            }
          ],
          "fieldType": "email",
          "hidden": "<boolean>",
          "label": "<string>",
          "name": "<string>",
          "objectTypeId": "<string>",
          "required": "<boolean>",
          "validation": {
            "blockedEmailDomains": [
              "<string>",
              "<string>"
            ],
            "useDefaultBlockList": "<boolean>"
          },
          "defaultValue": "<string>",
          "description": "<string>",
          "placeholder": "<string>"
        },
        {
          "dependentFields": [
            {
              "dependentCondition": {
                "operator": "set_not_all",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            },
            {
              "dependentCondition": {
                "operator": "set_eq",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            }
          ],
          "fieldType": "email",
          "hidden": "<boolean>",
          "label": "<string>",
          "name": "<string>",
          "objectTypeId": "<string>",
          "required": "<boolean>",
          "validation": {
            "blockedEmailDomains": [
              "<string>",
              "<string>"
            ],
            "useDefaultBlockList": "<boolean>"
          },
          "defaultValue": "<string>",
          "description": "<string>",
          "placeholder": "<string>"
        }
      ],
      "groupType": "progressive",
      "richTextType": "text",
      "richText": "<string>"
    },
    {
      "fields": [
        {
          "dependentFields": [
            {
              "dependentCondition": {
                "operator": "between",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            },
            {
              "dependentCondition": {
                "operator": "set_not_any",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            }
          ],
          "fieldType": "email",
          "hidden": "<boolean>",
          "label": "<string>",
          "name": "<string>",
          "objectTypeId": "<string>",
          "required": "<boolean>",
          "validation": {
            "blockedEmailDomains": [
              "<string>",
              "<string>"
            ],
            "useDefaultBlockList": "<boolean>"
          },
          "defaultValue": "<string>",
          "description": "<string>",
          "placeholder": "<string>"
        },
        {
          "dependentFields": [
            {
              "dependentCondition": {
                "operator": "set_not_any",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            },
            {
              "dependentCondition": {
                "operator": "set_any",
                "rangeEnd": "<string>",
                "rangeStart": "<string>",
                "value": "<string>",
                "values": [
                  "<string>",
                  "<string>"
                ]
              },
              "dependentField": {
                "value": "<Circular reference to #/components/schemas/EmailField detected>"
              }
            }
          ],
          "fieldType": "email",
          "hidden": "<boolean>",
          "label": "<string>",
          "name": "<string>",
          "objectTypeId": "<string>",
          "required": "<boolean>",
          "validation": {
            "blockedEmailDomains": [
              "<string>",
              "<string>"
            ],
            "useDefaultBlockList": "<boolean>"
          },
          "defaultValue": "<string>",
          "description": "<string>",
          "placeholder": "<string>"
        }
      ],
      "groupType": "progressive",
      "richTextType": "image",
      "richText": "<string>"
    }
  ],
  "formType": "hubspot",
  "id": "<string>",
  "legalConsentOptions": {
    "type": "none"
  },
  "name": "<string>",
  "updatedAt": "<dateTime>",
  "archivedAt": "<dateTime>"
}
```

---

