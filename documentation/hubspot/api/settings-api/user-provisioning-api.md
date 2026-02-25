# User Provisioning API

Total endpoints: 7

---

### See details about this account's teams

**Method:** `GET`

**URL:** `https://api.hubapi.com/settings/v3/users/teams`

**Description:** View teams for this account

**Authentication:** oauth2

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "id": "<string>",
      "name": "<string>",
      "secondaryUserIds": [
        "<string>",
        "<string>"
      ],
      "userIds": [
        "<string>",
        "<string>"
      ]
    },
    {
      "id": "<string>",
      "name": "<string>",
      "secondaryUserIds": [
        "<string>",
        "<string>"
      ],
      "userIds": [
        "<string>",
        "<string>"
      ]
    }
  ]
}
```

---

### Retrieves the roles on an account

**Method:** `GET`

**URL:** `https://api.hubapi.com/settings/v3/users/roles`

**Description:** Retrieves the roles on an account

**Authentication:** apikey

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "id": "<string>",
      "name": "<string>",
      "requiresBillingWrite": "<boolean>"
    },
    {
      "id": "<string>",
      "name": "<string>",
      "requiresBillingWrite": "<boolean>"
    }
  ]
}
```

---

### Retrieves a list of users from an account

**Method:** `GET`

**URL:** `https://api.hubapi.com/settings/v3/users/?limit=<integer>&after=<string>`

**Description:** Retrieves a list of users from an account

**Authentication:** apikey

**Query Parameters:**

- `limit`: The number of users to retrieve
- `after`: Results will display maximum 100 users per page. Additional results will be on the next page.

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "email": "<string>",
      "id": "<string>",
      "primaryTeamId": "<string>",
      "roleIds": [
        "<string>",
        "<string>"
      ],
      "sendWelcomeEmail": "<boolean>",
      "roleId": "<string>",
      "secondaryTeamIds": [
        "<string>",
        "<string>"
      ],
      "superAdmin": "<boolean>"
    },
    {
      "email": "<string>",
      "id": "<string>",
      "primaryTeamId": "<string>",
      "roleIds": [
        "<string>",
        "<string>"
      ],
      "sendWelcomeEmail": "<boolean>",
      "roleId": "<string>",
      "secondaryTeamIds": [
        "<string>",
        "<string>"
      ],
      "superAdmin": "<boolean>"
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

### Adds a user

**Method:** `POST`

**URL:** `https://api.hubapi.com/settings/v3/users/`

**Description:** New users will only have minimal permissions, which is contacts-base. A welcome email will prompt them to set a password and log in to HubSpot.

**Authentication:** apikey

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "email": "<string>",
  "primaryTeamId": "<string>",
  "sendWelcomeEmail": "<boolean>",
  "roleId": "<string>",
  "secondaryTeamIds": [
    "<string>",
    "<string>"
  ]
}
```

**Success Response (201):**

```json
{
  "email": "<string>",
  "id": "<string>",
  "primaryTeamId": "<string>",
  "roleIds": [
    "<string>",
    "<string>"
  ],
  "sendWelcomeEmail": "<boolean>",
  "roleId": "<string>",
  "secondaryTeamIds": [
    "<string>",
    "<string>"
  ],
  "superAdmin": "<boolean>"
}
```

---

### Retrieves a user

**Method:** `GET`

**URL:** `https://api.hubapi.com/settings/v3/users/:userId?idProperty=<string>`

**Description:** Retrieves a user identified by `userId`. `userId` refers to the user's ID by default, or optionally email as specified by the `IdProperty` query param.

**Authentication:** apikey

**Path Variables:**

- `userId`: No description

**Query Parameters:**

- `idProperty`: The name of a property with unique user values. Valid values are `USER_ID`(default) or `EMAIL`

**Headers:**


**Success Response (200):**

```json
{
  "email": "<string>",
  "id": "<string>",
  "primaryTeamId": "<string>",
  "roleIds": [
    "<string>",
    "<string>"
  ],
  "sendWelcomeEmail": "<boolean>",
  "roleId": "<string>",
  "secondaryTeamIds": [
    "<string>",
    "<string>"
  ],
  "superAdmin": "<boolean>"
}
```

---

### Modifies a user

**Method:** `PUT`

**URL:** `https://api.hubapi.com/settings/v3/users/:userId?idProperty=<string>`

**Description:** Modifies a user identified by `userId`. `userId` refers to the user's ID by default, or optionally email as specified by the `IdProperty` query param.

**Authentication:** apikey

**Path Variables:**

- `userId`: No description

**Query Parameters:**

- `idProperty`: The name of a property with unique user values. Valid values are `USER_ID`(default) or `EMAIL`

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "primaryTeamId": "<string>",
  "roleId": "<string>",
  "secondaryTeamIds": [
    "<string>",
    "<string>"
  ]
}
```

**Success Response (200):**

```json
{
  "email": "<string>",
  "id": "<string>",
  "primaryTeamId": "<string>",
  "roleIds": [
    "<string>",
    "<string>"
  ],
  "sendWelcomeEmail": "<boolean>",
  "roleId": "<string>",
  "secondaryTeamIds": [
    "<string>",
    "<string>"
  ],
  "superAdmin": "<boolean>"
}
```

---

### Removes a user

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/settings/v3/users/:userId?idProperty=<string>`

**Description:** Removes a user identified by `userId`. `userId` refers to the user's ID by default, or optionally email as specified by the `IdProperty` query param.

**Authentication:** apikey

**Path Variables:**

- `userId`: No description

**Query Parameters:**

- `idProperty`: The name of a property with unique user values. Valid values are `USER_ID`(default) or `EMAIL`

**Headers:**


---

