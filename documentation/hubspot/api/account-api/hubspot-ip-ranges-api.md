# HubSpot IP Ranges API

Total endpoints: 2

---

### Get IP Ranges (JSON)

**Method:** `GET`

**URL:** `https://api.hubapi.com/meta/network-origins/2025-09/ip-ranges`

**Description:** Retrieves active HubSpot IP addresses in JSON format with detailed information.

**Response Properties:**
- `cidr` (String): The range of IP addresses used for a specific purpose in HubSpot
- `direction` (String): Direction of IP traffic. Values: "INGRESS", "EGRESS"
- `service` (String): Nature of the service. Values: "EMAIL", "API", "DNS", "WEB_SCRAPING"
- `description` (String): Details about the purpose of the set of IP addresses

**Headers:**


**Success Response (200):**

```json
{
  "results": [
    {
      "cidr": "3.127.29.218/32",
      "direction": "EGRESS",
      "service": "WEB_SCRAPING",
      "description": "Web crawling and user-generated traffic"
    },
    {
      "cidr": "18.159.155.92/32",
      "direction": "EGRESS",
      "service": "WEB_SCRAPING",
      "description": "Web crawling and user-generated traffic"
    },
    {
      "cidr": "3.125.129.244/32",
      "direction": "EGRESS",
      "service": "WEB_SCRAPING",
      "description": "Web crawling and user-generated traffic"
    },
    {
      "cidr": "54.174.53.218/32",
      "direction": "EGRESS",
      "service": "DNS",
      "description": "External DNS"
    }
  ]
}
```

---

### Get IP Ranges (Plaintext)

**Method:** `GET`

**URL:** `https://api.hubapi.com/meta/network-origins/2025-09/ip-ranges/simple`

**Description:** Retrieves HubSpot's IP address data in plaintext format. This returns just the IP address ranges themselves without additional properties like service, direction, or description.

**Required Header:**
- `Accept: text/plain` - Must be included to receive plaintext response

**Headers:**


**Success Response (200):**

```json
3.127.29.218/32
141.193.185.128/25
18.159.155.92/32
141.193.184.128/25
3.127.84.21/32
18.158.38.39/32
158.247.16.0/20
54.174.53.6/31
18.157.238.182/32
3.93.157.0/24
```

---

