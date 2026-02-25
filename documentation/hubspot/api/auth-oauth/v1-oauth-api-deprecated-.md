# v1 OAuth API [deprecated]

Total endpoints: 4

---

### Retrieve OAuth token metadata

**Method:** `GET`

**URL:** `https://api.hubapi.com/oauth/v1/access-tokens/:token`

**Path Variables:**

- `token`: (Required) 

**Headers:**


**Success Response (200):**

```json
{
  "app_id": "<integer>",
  "expires_in": "<integer>",
  "hub_id": "<integer>",
  "scopes": [
    "<string>",
    "<string>"
  ],
  "token": "<string>",
  "token_type": "<string>",
  "user_id": "<integer>",
  "user": "<string>",
  "hub_domain": "<string>"
}
```

---

### Retrieve refresh token metadata

**Method:** `GET`

**URL:** `https://api.hubapi.com/oauth/v1/refresh-tokens/:token`

**Path Variables:**

- `token`: (Required) 

**Headers:**


**Success Response (200):**

```json
{
  "client_id": "<string>",
  "hub_id": "<integer>",
  "scopes": [
    "<string>",
    "<string>"
  ],
  "token": "<string>",
  "token_type": "<string>",
  "user_id": "<integer>",
  "user": "<string>",
  "hub_domain": "<string>"
}
```

---

### Delete a refresh token

**Method:** `DELETE`

**URL:** `https://api.hubapi.com/oauth/v1/refresh-tokens/:token`

**Path Variables:**

- `token`: (Required) 

**Headers:**


---

### Refresh an access token

**Method:** `POST`

**URL:** `https://api.hubapi.com/oauth/v1/token?client_secret=<string>&refresh_token=<string>`

**Query Parameters:**

- `client_secret`: A confidential credential known only to the application and the authorization server, used to authenticate the client's identity when making token requests.
- `refresh_token`: A long-lived credential issued alongside an access token that can be exchanged for a new access token alongside client credentials when the current access_token expires, allowing continued API access without requiring the user to re-authenticate.

**Headers:**

- `Content-Type`: application/x-www-form-urlencoded

**Success Response (200):**

```json
{
  "access_token": "<string>",
  "expires_in": "<integer>",
  "refresh_token": "<string>",
  "token_type": "<string>",
  "id_token": "<string>"
}
```

---

