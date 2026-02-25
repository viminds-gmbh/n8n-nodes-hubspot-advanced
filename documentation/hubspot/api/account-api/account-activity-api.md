# Account Activity API

Total endpoints: 3

---

### Retrieve login activity

**Method:** `GET`

**URL:** `https://api.hubapi.com/account-info/v3/activity/login?after=<string>&limit=<integer>&userId=<integer>`

**Description:** Get login activity.

**Authentication:** oauth2

**Query Parameters:**

- `after`: The cursor token value to get the next set of results. You can get this from the `paging.next.after` JSON property of a paged response containing more results.
- `limit`: The maximum number of results to display per page. Max value of limit is 200.
- `userId`: Identifier of user to retrieve activities for

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "id": "<string>",
      "loginAt": "<dateTime>",
      "loginSucceeded": "<boolean>",
      "regionCode": "<string>",
      "countryCode": "<string>",
      "ipAddress": "<string>",
      "location": "<string>",
      "userAgent": "<string>",
      "userId": "<integer>",
      "email": "<string>"
    },
    {
      "id": "<string>",
      "loginAt": "<dateTime>",
      "loginSucceeded": "<boolean>",
      "regionCode": "<string>",
      "countryCode": "<string>",
      "ipAddress": "<string>",
      "location": "<string>",
      "userAgent": "<string>",
      "userId": "<integer>",
      "email": "<string>"
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

### Retrieve audit logs

**Method:** `GET`

**URL:** `https://api.hubapi.com/account-info/v3/activity/audit-logs?after=<string>&limit=<integer>&actingUserId=<integer>&actingUserId=<integer>&occurredAfter=<dateTime>&occurredBefore=<dateTime>&sort=<string>&sort=<string>`

**Authentication:** oauth2

**Query Parameters:**

- `after`: The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
- `limit`: The maximum number of results to display per page.
- `actingUserId`: No description
- `actingUserId`: No description
- `occurredAfter`: No description
- `occurredBefore`: No description
- `sort`: No description
- `sort`: No description

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "actingUser": {
        "userId": "<integer>",
        "userEmail": "<string>"
      },
      "action": "<string>",
      "category": "<string>",
      "id": "<string>",
      "occurredAt": "<dateTime>",
      "subCategory": "<string>",
      "targetObjectId": "<string>"
    },
    {
      "actingUser": {
        "userId": "<integer>",
        "userEmail": "<string>"
      },
      "action": "<string>",
      "category": "<string>",
      "id": "<string>",
      "occurredAt": "<dateTime>",
      "subCategory": "<string>",
      "targetObjectId": "<string>"
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

### Retrieve security history

**Method:** `GET`

**URL:** `https://api.hubapi.com/account-info/v3/activity/security?after=<string>&limit=<integer>&userId=<integer>&fromTimestamp=<long>&toTimestamp=<long>`

**Description:** Get security activity

**Authentication:** oauth2

**Query Parameters:**

- `after`: The cursor token value to get the next set of results. You can get this from the `paging.next.after` JSON property of a paged response containing more results.
- `limit`: The maximum number of results to display per page. Max value of limit is 200.
- `userId`: Identifier of user to retrieve activities for
- `fromTimestamp`: Limit to activities created after this epoch timestamp.
- `toTimestamp`: No description

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "createdAt": "<dateTime>",
      "id": "<string>",
      "type": "<string>",
      "userId": "<integer>",
      "actingUser": "<string>",
      "regionCode": "<string>",
      "infoUrl": "<string>",
      "countryCode": "<string>",
      "ipAddress": "<string>",
      "location": "<string>",
      "objectId": "<string>"
    },
    {
      "createdAt": "<dateTime>",
      "id": "<string>",
      "type": "<string>",
      "userId": "<integer>",
      "actingUser": "<string>",
      "regionCode": "<string>",
      "infoUrl": "<string>",
      "countryCode": "<string>",
      "ipAddress": "<string>",
      "location": "<string>",
      "objectId": "<string>"
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

