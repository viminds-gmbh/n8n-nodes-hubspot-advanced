# Property Validations API

Total endpoints: 4

---

### Read all property validation rules for an object

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/property-validations/:objectTypeId`

**Description:** Read all properties with validation rules for a given object.

**Authentication:** apikey

**Path Variables:**

- `objectTypeId`: (Required) 

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "propertyName": "<string>",
      "propertyValidationRules": [
        {
          "ruleArguments": [
            "<string>",
            "<string>"
          ],
          "ruleType": "START_DATE"
        },
        {
          "ruleArguments": [
            "<string>",
            "<string>"
          ],
          "ruleType": "AFTER_DATETIME_DURATION"
        }
      ]
    },
    {
      "propertyName": "<string>",
      "propertyValidationRules": [
        {
          "ruleArguments": [
            "<string>",
            "<string>"
          ],
          "ruleType": "EMAIL_ALLOWED_DOMAINS"
        },
        {
          "ruleArguments": [
            "<string>",
            "<string>"
          ],
          "ruleType": "BEFORE_DURATION"
        }
      ]
    }
  ]
}
```

---

### Read validation rules for a property

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/property-validations/:objectTypeId/:propertyName`

**Description:** Read a property's validation rules identified by {propertyName}.

**Authentication:** apikey

**Path Variables:**

- `objectTypeId`: (Required) 
- `propertyName`: (Required) 

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "ruleArguments": [
        "<string>",
        "<string>"
      ],
      "ruleType": "EMAIL"
    },
    {
      "ruleArguments": [
        "<string>",
        "<string>"
      ],
      "ruleType": "END_DATETIME"
    }
  ]
}
```

---

### Retrieve a validation rule for a specific property and rule type, providing details on how property values should be formatted.

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/property-validations/:objectTypeId/:propertyName/rule-type/:ruleType`

**Description:** Retrieve a specific validation rule for a property identified by its name and rule type.

**Authentication:** oauth2

**Path Variables:**

- `objectTypeId`: (Required) The ID of the object type to which the property belongs.
- `propertyName`: (Required) The name of the property for which the validation rule is being retrieved.
- `ruleType`: (Required) The type of validation rule being retrieved, such as FORMAT, ALPHANUMERIC, or MAX_LENGTH. (This can only be one of AFTER_DATETIME_DURATION,AFTER_DURATION,ALPHANUMERIC,BEFORE_DATETIME_DURATION,BEFORE_DURATION,DAYS_OF_WEEK,DECIMAL,DOMAIN,EMAIL,EMAIL_ALLOWED_DOMAINS,EMAIL_BLOCKED_DOMAINS,END_DATE,END_DATETIME,FORMAT,MAX_LENGTH,MAX_NUMBER,MIN_LENGTH,MIN_NUMBER,PHONE_NUMBER_WITH_EXPLICIT_COUNTRY_CODE,REGEX,SPECIAL_CHARACTERS,START_DATE,START_DATETIME,URL,URL_ALLOWED_DOMAINS,URL_BLOCKED_DOMAINS,WHITESPACE)

**Headers:**


**Success Response (200):**

```json
{
  "ruleArguments": [
    "string",
    "string"
  ],
  "ruleType": "REGEX",
  "shouldApplyNormalization": true
}
```

---

### Update a validation rule for a specific property and rule type, allowing customization of property value constraints.

**Method:** `PUT`

**URL:** `https://api.hubapi.com/crm/v3/property-validations/:objectTypeId/:propertyName/rule-type/:ruleType`

**Description:** Update a specific validation rule for a property identified by its name and rule type.

**Authentication:** oauth2

**Path Variables:**

- `objectTypeId`: (Required) The ID of the object type to which the property belongs.
- `propertyName`: (Required) The name of the property for which the validation rule is being updated.
- `ruleType`: (Required) The type of validation rule being updated, such as FORMAT, ALPHANUMERIC, or MAX_LENGTH. (This can only be one of AFTER_DATETIME_DURATION,AFTER_DURATION,ALPHANUMERIC,BEFORE_DATETIME_DURATION,BEFORE_DURATION,DAYS_OF_WEEK,DECIMAL,DOMAIN,EMAIL,EMAIL_ALLOWED_DOMAINS,EMAIL_BLOCKED_DOMAINS,END_DATE,END_DATETIME,FORMAT,MAX_LENGTH,MAX_NUMBER,MIN_LENGTH,MIN_NUMBER,PHONE_NUMBER_WITH_EXPLICIT_COUNTRY_CODE,REGEX,SPECIAL_CHARACTERS,START_DATE,START_DATETIME,URL,URL_ALLOWED_DOMAINS,URL_BLOCKED_DOMAINS,WHITESPACE)

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "ruleArguments": [
    "<string>",
    "<string>"
  ],
  "shouldApplyNormalization": "<boolean>"
}
```

---

