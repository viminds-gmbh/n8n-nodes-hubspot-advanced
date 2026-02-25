# Business Unit API

Total endpoints: 1

---

### Get Business Units for a user

**Method:** `GET`

**URL:** `https://api.hubapi.com/business-units/v3/business-units/user/:userId?properties=<string>&properties=<string>&name=<string>&name=<string>`

**Description:** Get Business Units identified by `userId`. The `userId` refers to the user’s ID.

**Authentication:** apikey

**Path Variables:**

- `userId`: No description

**Query Parameters:**

- `properties`: The names of properties to optionally include in the response body. The only valid value is `logoMetadata`.
- `properties`: The names of properties to optionally include in the response body. The only valid value is `logoMetadata`.
- `name`: The names of Business Units to retrieve. If empty or not provided, then all associated Business Units will be returned.
- `name`: The names of Business Units to retrieve. If empty or not provided, then all associated Business Units will be returned.

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "id": "<string>",
      "name": "<string>",
      "logoMetadata": {
        "logoUrl": "<string>",
        "logoAltText": "<string>",
        "resizedUrl": "<string>"
      }
    },
    {
      "id": "<string>",
      "name": "<string>",
      "logoMetadata": {
        "logoUrl": "<string>",
        "logoAltText": "<string>",
        "resizedUrl": "<string>"
      }
    }
  ]
}
```

---

