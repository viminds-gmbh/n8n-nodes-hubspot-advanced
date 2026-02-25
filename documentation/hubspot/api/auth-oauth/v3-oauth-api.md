# v3 OAuth API

Total endpoints: 2

---

### OAuth token endpoint

**Method:** `POST`

**URL:** `https://api.hubapi.com/oauth/v3/token`

**Description:** Authenticates a client and returns access and refresh tokens.

**Headers:**

- `Content-Type`: application/x-www-form-urlencoded

---

### Token introspection endpoint

**Method:** `POST`

**URL:** `https://api.hubapi.com/oauth/v3/token/introspect`

**Description:** Returns validity and metadata for access and refresh tokens.

**Headers:**

- `Content-Type`: application/x-www-form-urlencoded

**Success Response (200):**

```json
{
  "active": "<boolean>"
}
```

---

