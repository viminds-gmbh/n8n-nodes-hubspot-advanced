# Objects Library API

Total endpoints: 2

---

### Fetch object type enablement status

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/object-library/enablement`

**Description:** For all object types supporting enablement, returns whether they're enabled or disabled

**Authentication:** oauth2

**Headers:**


**Success Response (200):**

```json
{
  "enablementByObjectTypeId": {
    "key_0": "<boolean>"
  }
}
```

---

### Is object type is enabled

**Method:** `GET`

**URL:** `https://api.hubapi.com/crm/v3/object-library/enablement/:objectTypeId`

**Description:** Fetch whether object type is enabled

**Authentication:** oauth2

**Path Variables:**

- `objectTypeId`: objectTypeId for the object type in question

**Headers:**


**Success Response (200):**

```json
{
  "enablement": "<boolean>"
}
```

---

