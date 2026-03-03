# HubSpot Files API (CMS Source Code)

The Files API allows you to manage files in HubSpot's CMS source code system. You can download, create, update, and delete files in both draft and published environments.

## Base URL

```
https://api.hubapi.com/cms/v3/source-code
```

## Authentication

All endpoints require authentication using a private app access token or API key.

**Header:**
```
private-app-legacy: YOUR_API_KEY
```

---

## Endpoints

### Download a File

Downloads the byte contents of a file at the specified path in the specified environment.

**Endpoint:** `GET /cms/v3/source-code/:environment/content/:path`

**Path Parameters:**
- `environment` (string, required) - The environment of the file: `"draft"` or `"published"`
- `path` (string, required) - The file system location of the file

**Example Request:**
```bash
curl --location 'https://api.hubapi.com/cms/v3/source-code/:environment/content/:path' \
  --header 'Accept: */*' \
  --header 'private-app-legacy: YOUR_API_KEY'
```

**Response:**
- **200 OK** - Returns the file contents
- **500 Internal Server Error** - Error occurred

**Error Response Example:**
```json
{
  "category": "string",
  "correlationId": "uuid",
  "message": "string",
  "subCategory": "string",
  "context": {},
  "links": {},
  "errors": []
}
```

---

### Create or Update a File

Upserts a file at the specified path in the specified environment. Accepts `multipart/form-data` content type.

**Endpoint:** `PUT /cms/v3/source-code/:environment/content/:path`

**Path Parameters:**
- `environment` (string, required) - The environment of the file: `"draft"` or `"published"`
- `path` (string, required) - The file system location of the file

**Request Body (multipart/form-data):**
- `file` (file, required) - The file to upload

**Example Request:**
```bash
curl --location --request PUT 'https://api.hubapi.com/cms/v3/source-code/:environment/content/:path' \
  --header 'Content-Type: multipart/form-data' \
  --header 'Accept: application/json' \
  --header 'private-app-legacy: YOUR_API_KEY' \
  --form 'file=@"/path/to/your/file"'
```

**Response:**
- **200 OK** - File created or updated successfully

**Response Body:**
```json
{
  "createdAt": 1234567890,
  "folder": false,
  "id": "string",
  "name": "string",
  "updatedAt": 1234567890,
  "archivedAt": 1234567890,
  "children": [],
  "hash": "string"
}
```

**Response Fields:**
- `createdAt` (long) - Timestamp when the file was created
- `folder` (boolean) - Whether this is a folder
- `id` (string) - Unique identifier for the file
- `name` (string) - Name of the file
- `updatedAt` (long) - Timestamp when the file was last updated
- `archivedAt` (long) - Timestamp when the file was archived (if applicable)
- `children` (array) - List of child files/folders
- `hash` (string) - Hash of the file content

---

### Create a File

Creates a file at the specified path in the specified environment. Accepts `multipart/form-data` content type. Throws an error if a file already exists at the specified path.

**Endpoint:** `POST /cms/v3/source-code/:environment/content/:path`

**Path Parameters:**
- `environment` (string, required) - The environment of the file: `"draft"` or `"published"`
- `path` (string, required) - The file system location of the file

**Request Body (multipart/form-data):**
- `file` (file, required) - The file to upload

**Example Request:**
```bash
curl --location 'https://api.hubapi.com/cms/v3/source-code/:environment/content/:path' \
  --header 'Content-Type: multipart/form-data' \
  --header 'Accept: application/json' \
  --header 'private-app-legacy: YOUR_API_KEY' \
  --form 'file=@"/path/to/your/file"'
```

**Response:**
- **200 OK** - File created successfully

**Response Body:**
```json
{
  "createdAt": 1234567890,
  "folder": false,
  "id": "string",
  "name": "string",
  "updatedAt": 1234567890,
  "archivedAt": 1234567890,
  "children": [],
  "hash": "string"
}
```

---

### Delete a File

Deletes the file at the specified path in the specified environment.

**Endpoint:** `DELETE /cms/v3/source-code/:environment/content/:path`

**Path Parameters:**
- `environment` (string, required) - The environment of the file: `"draft"` or `"published"`
- `path` (string, required) - The file system location of the file

**Example Request:**
```bash
curl --location --request DELETE 'https://api.hubapi.com/cms/v3/source-code/:environment/content/:path' \
  --header 'private-app-legacy: YOUR_API_KEY'
```

**Response:**
- **204 No Content** - File deleted successfully (no response body)

---

## Notes

- All file operations support both draft and published environments
- Use `multipart/form-data` for file uploads
- The `PUT` endpoint will create a new file or update an existing one
- The `POST` endpoint will only create a new file and will fail if the file already exists
- File paths should be relative to the CMS source code root
