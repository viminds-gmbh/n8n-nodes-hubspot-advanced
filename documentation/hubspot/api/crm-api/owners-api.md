# Owners API

Total endpoints: 2

---

### Retrieve a paginated list of owners available in the account.

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/owners/?email=<string>&after=<string>&limit=100&archived=false`

**Authentication:** apikey

**Query Parameters:**

- `email`: Filter by email address (optional)
- `after`: The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
- `limit`: The maximum number of results to display per page.
- `archived`: Whether to return only results that have been archived.

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "archived": "<boolean>",
      "createdAt": "<dateTime>",
      "id": "<string>",
      "updatedAt": "<dateTime>",
      "email": "<string>",
      "firstName": "<string>",
      "lastName": "<string>",
      "userId": "<integer>",
      "teams": [
        {
          "id": "<string>",
          "name": "<string>",
          "primary": "<boolean>"
        },
        {
          "id": "<string>",
          "name": "<string>",
          "primary": "<boolean>"
        }
      ],
      "type": "QUEUE"
    },
    {
      "archived": "<boolean>",
      "createdAt": "<dateTime>",
      "id": "<string>",
      "updatedAt": "<dateTime>",
      "email": "<string>",
      "firstName": "<string>",
      "lastName": "<string>",
      "userId": "<integer>",
      "teams": [
        {
          "id": "<string>",
          "name": "<string>",
          "primary": "<boolean>"
        },
        {
          "id": "<string>",
          "name": "<string>",
          "primary": "<boolean>"
        }
      ],
      "type": "QUEUE"
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

### Retrieve a paginated list of owners available in the account.

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/owners/:ownerId?idProperty=id&archived=false`

**Authentication:** apikey

**Path Variables:**

- `ownerId`: No description

**Query Parameters:**

- `idProperty`: No description
- `archived`: Whether to return only results that have been archived.

**Headers:**


**Success Response (200):**

```json
{
  "archived": "<boolean>",
  "createdAt": "<dateTime>",
  "id": "<string>",
  "updatedAt": "<dateTime>",
  "email": "<string>",
  "firstName": "<string>",
  "lastName": "<string>",
  "userId": "<integer>",
  "teams": [
    {
      "id": "<string>",
      "name": "<string>",
      "primary": "<boolean>"
    },
    {
      "id": "<string>",
      "name": "<string>",
      "primary": "<boolean>"
    }
  ],
  "type": "PERSON"
}
```

---

