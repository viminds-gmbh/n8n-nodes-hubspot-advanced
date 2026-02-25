# Conversations Visitor Identification API

Total endpoints: 1

---

### Generate an identification token for a verified website visitor.

**Method:** `POST`

**URL:** `https://api.hubapi.com/visitor-identification/v3/tokens/create`

**Description:** This endpoint generates an identification token for a website visitor who has been authenticated using your own system. An identification token returned from this API can be used to pass information about your already-authenticated visitor to the chat widget, so that it treats the visitor as a known contact. This allows support agents to recognize and assist the visitor more effectively.

**Authentication:** oauth2

**Headers:**

- `Content-Type`: application/json

**Request Body:**

```json
{
  "email": "<string>",
  "firstName": "<string>",
  "lastName": "<string>"
}
```

**Success Response (200):**

```json
{
  "token": "<string>"
}
```

---

