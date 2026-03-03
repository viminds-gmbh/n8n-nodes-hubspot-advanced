# HubSpot HubDB API

HubDB is a relational data store that presents data as rows, columns, and cells in a table, much like a spreadsheet. HubDB tables can be added or modified within your HubSpot account or via the API.

## Overview

HubDB tables support draft and published versions, allowing you to update data for testing or manual approval without affecting live pages.

**Public Access:** If a table is set to allow public access, you can access the published version without authentication by specifying your HubSpot account ID via the `portalId` query parameter.

**CORS Support:** GET endpoints support CORS for client-side JavaScript requests using your account ID. Other methods require authentication and do not support CORS.

## Base URL

```
https://api.hubapi.com/cms/v3/hubdb
```

## Authentication

Most endpoints require authentication using a private app access token or API key.

**Header:**
```
private-app-legacy: YOUR_API_KEY
```

## Rate Limits

- **Unauthenticated GET requests:** Limited to 10 requests per second (not counted towards daily limit)
- **Authenticated requests:** Follow standard HubSpot API rate limits

---

# Tables

## Export a Draft Table

Exports the draft version of a table to CSV/EXCEL format.

**Endpoint:** `GET /cms/v3/hubdb/tables/:tableIdOrName/draft/export`

**Path Parameters:**
- `tableIdOrName` (string, required) - Table ID or name

**Query Parameters:**
- `format` (string) - File format to export: `CSV`, `XLSX`, or `XLS`

**Example Request:**
```bash
curl --location 'https://api.hubapi.com/cms/v3/hubdb/tables/:tableIdOrName/draft/export?format=CSV' \
  --header 'Accept: application/vnd.ms-excel' \
  --header 'private-app-legacy: YOUR_API_KEY'
```

**Response:**
- **200 OK** - Returns the exported file

---

## Get All Draft Tables

Returns the details for each draft table in the account, including column definitions.

**Endpoint:** `GET /cms/v3/hubdb/tables/draft`

**Query Parameters:**
- `sort` (string, repeatable) - Fields to sort by: `name`, `createdAt`, `updatedAt`, `createdBy`, `updatedBy` (default: `createdAt`)
- `after` (string) - Cursor token for pagination
- `limit` (integer) - Maximum results to return (default: 1000)
- `createdAt` (dateTime) - Filter by exact creation time
- `createdAfter` (dateTime) - Filter by creation time after
- `createdBefore` (dateTime) - Filter by creation time before
- `updatedAt` (dateTime) - Filter by exact update time
- `updatedAfter` (dateTime) - Filter by update time after
- `updatedBefore` (dateTime) - Filter by update time before
- `archived` (boolean) - Include archived tables (default: false)
- `contentType` (string) - Filter by content type

**Example Request:**
```bash
curl --location 'https://api.hubapi.com/cms/v3/hubdb/tables/draft?limit=100' \
  --header 'Accept: application/json' \
  --header 'private-app-legacy: YOUR_API_KEY'
```

**Response:**
- **200 OK** - Returns array of draft tables

**Response Body:**
```json
{
  "results": [
    {
      "label": "string",
      "name": "string",
      "id": "string",
      "columns": [],
      "published": false,
      "deleted": false,
      "columnCount": 0,
      "rowCount": 0,
      "createdBy": {},
      "updatedBy": {},
      "useForPages": false,
      "allowChildTables": false,
      "enableChildTablePages": false,
      "isOrderedManually": false,
      "dynamicMetaTags": {},
      "allowPublicApiAccess": false,
      "createdAt": "dateTime",
      "publishedAt": "dateTime",
      "updatedAt": "dateTime"
    }
  ],
  "total": 0,
  "paging": {
    "next": {
      "after": "string",
      "link": "string"
    }
  }
}
```

---

## Reset a Draft Table

Replaces the data in the draft version with values from the published version. Unpublished changes will be lost.

**Endpoint:** `POST /cms/v3/hubdb/tables/:tableIdOrName/draft/reset`

**Path Parameters:**
- `tableIdOrName` (string, required) - Table ID or name

**Query Parameters:**
- `includeForeignIds` (boolean) - Populate foreign ID values in response

**Example Request:**
```bash
curl --location --request POST 'https://api.hubapi.com/cms/v3/hubdb/tables/:tableIdOrName/draft/reset' \
  --header 'Accept: application/json' \
  --header 'private-app-legacy: YOUR_API_KEY'
```

**Response:**
- **200 OK** - Returns the reset table

---

## Export a Published Table

Exports the published version of a table to CSV/EXCEL format.

**Endpoint:** `GET /cms/v3/hubdb/tables/:tableIdOrName/export`

**Path Parameters:**
- `tableIdOrName` (string, required) - Table ID or name

**Query Parameters:**
- `format` (string) - File format: `CSV`, `XLSX`, or `XLS`

**Example Request:**
```bash
curl --location 'https://api.hubapi.com/cms/v3/hubdb/tables/:tableIdOrName/export?format=CSV' \
  --header 'Accept: application/vnd.ms-excel' \
  --header 'private-app-legacy: YOUR_API_KEY'
```

**Response:**
- **200 OK** - Returns the exported file

---

## Clone a Table

Clones an existing HubDB table. The cloned table is created as a draft.

**Endpoint:** `POST /cms/v3/hubdb/tables/:tableIdOrName/draft/clone`

**Path Parameters:**
- `tableIdOrName` (string, required) - Table ID or name to clone

**Request Body:**
```json
{
  "copyRows": false,
  "newName": "string",
  "newLabel": "string",
  "isHubspotDefined": false
}
```

**Request Fields:**
- `copyRows` (boolean) - Whether to copy rows from the original table
- `newName` (string, required) - Name for the new table
- `newLabel` (string, required) - Label for the new table
- `isHubspotDefined` (boolean) - Whether this is a HubSpot-defined table

**Example Request:**
```bash
curl --location 'https://api.hubapi.com/cms/v3/hubdb/tables/:tableIdOrName/draft/clone' \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'private-app-legacy: YOUR_API_KEY' \
  --data '{
    "copyRows": true,
    "newName": "cloned_table",
    "newLabel": "Cloned Table"
  }'
```

**Response:**
- **200 OK** - Returns the cloned table

---

## Import Data into Draft Table

Imports CSV file contents into an existing HubDB table draft version.

**Endpoint:** `POST /cms/v3/hubdb/tables/:tableIdOrName/draft/import`

**Path Parameters:**
- `tableIdOrName` (string, required) - Table ID or name

**Request Body (multipart/form-data):**
- `config` (string) - JSON configuration for the import
- `file` (file) - The CSV file to import

**Example Request:**
```bash
curl --location 'https://api.hubapi.com/cms/v3/hubdb/tables/:tableIdOrName/draft/import' \
  --header 'Content-Type: multipart/form-data' \
  --header 'Accept: application/json' \
  --header 'private-app-legacy: YOUR_API_KEY' \
  --form 'config="{}"' \
  --form 'file=@"/path/to/file.csv"'
```

**Response:**
- **200 OK** - Returns import results

**Response Body:**
```json
{
  "duplicateRows": 0,
  "errors": [],
  "rowLimitExceeded": false,
  "rowsImported": 0
}
```

---

## Get Published Table Details

Returns details for the published version of a table, including column definitions and row count.

**Note:** This endpoint can be accessed without authentication if the table allows public access.

**Endpoint:** `GET /cms/v3/hubdb/tables/:tableIdOrName`

**Path Parameters:**
- `tableIdOrName` (string, required) - Table ID or name

**Query Parameters:**
- `includeForeignIds` (boolean) - Populate foreign ID values
- `archived` (boolean) - Return archived table (default: false)
- `isGetLocalizedSchema` (boolean) - Get localized schema

**Example Request:**
```bash
curl --location 'https://api.hubapi.com/cms/v3/hubdb/tables/:tableIdOrName' \
  --header 'Accept: application/json' \
  --header 'private-app-legacy: YOUR_API_KEY'
```

**Response:**
- **200 OK** - Returns table details

---

## Archive a Table

Archives (soft deletes) an existing HubDB table. Archives both published and draft versions.

**Endpoint:** `DELETE /cms/v3/hubdb/tables/:tableIdOrName`

**Path Parameters:**
- `tableIdOrName` (string, required) - Table ID or name

**Example Request:**
```bash
curl --location --request DELETE 'https://api.hubapi.com/cms/v3/hubdb/tables/:tableIdOrName' \
  --header 'private-app-legacy: YOUR_API_KEY'
```

**Response:**
- **204 No Content** - Table archived successfully

---

## Get All Published Tables

Returns details for the published version of each table in the account.

**Endpoint:** `GET /cms/v3/hubdb/tables`

**Query Parameters:**
- `sort` (string, repeatable) - Fields to sort by
- `after` (string) - Cursor token for pagination
- `limit` (integer) - Maximum results (default: 1000)
- `createdAt`, `createdAfter`, `createdBefore` (dateTime) - Creation time filters
- `updatedAt`, `updatedAfter`, `updatedBefore` (dateTime) - Update time filters
- `archived` (boolean) - Include archived tables
- `contentType` (string) - Filter by content type

**Example Request:**
```bash
curl --location 'https://api.hubapi.com/cms/v3/hubdb/tables' \
  --header 'Accept: application/json' \
  --header 'private-app-legacy: YOUR_API_KEY'
```

**Response:**
- **200 OK** - Returns array of published tables

---

## Create a New Table

Creates a new draft HubDB table with the specified schema. Table name and label must be unique.

**Endpoint:** `POST /cms/v3/hubdb/tables`

**Request Body:**
```json
{
  "label": "string",
  "name": "string",
  "useForPages": false,
  "allowPublicApiAccess": false,
  "allowChildTables": false,
  "enableChildTablePages": false,
  "columns": [
    {
      "id": 0,
      "label": "string",
      "name": "string",
      "type": "TEXT",
      "options": [],
      "foreignTableId": 0,
      "foreignColumnId": 0
    }
  ],
  "dynamicMetaTags": {}
}
```

**Column Types:**
- `TEXT`, `NUMBER`, `DATE`, `DATETIME`, `URL`, `IMAGE`, `FILE`, `VIDEO`, `BOOLEAN`, `SELECT`, `MULTISELECT`, `RICHTEXT`, `LOCATION`, `CTA`, `FOREIGN_ID`, `NULL`

**Example Request:**
```bash
curl --location 'https://api.hubapi.com/cms/v3/hubdb/tables' \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'private-app-legacy: YOUR_API_KEY' \
  --data '{
    "label": "My Table",
    "name": "my_table",
    "useForPages": false,
    "allowPublicApiAccess": true,
    "columns": [
      {
        "label": "Name",
        "name": "name",
        "type": "TEXT"
      }
    ]
  }'
```

**Response:**
- **201 Created** - Returns the created table

---

## Unpublish a Table

Unpublishes the table. Website pages using data from the table will not render any data.

**Endpoint:** `POST /cms/v3/hubdb/tables/:tableIdOrName/unpublish`

**Path Parameters:**
- `tableIdOrName` (string, required) - Table ID or name

**Query Parameters:**
- `includeForeignIds` (boolean) - Populate foreign ID values

**Example Request:**
```bash
curl --location --request POST 'https://api.hubapi.com/cms/v3/hubdb/tables/:tableIdOrName/unpublish' \
  --header 'Accept: application/json' \
  --header 'private-app-legacy: YOUR_API_KEY'
```

**Response:**
- **200 OK** - Returns the unpublished table

---

## Get Draft Table Details

Gets details for the draft version of a specific table, including column definitions and row count.

**Endpoint:** `GET /cms/v3/hubdb/tables/:tableIdOrName/draft`

**Path Parameters:**
- `tableIdOrName` (string, required) - Table ID or name

**Query Parameters:**
- `includeForeignIds` (boolean) - Populate foreign ID values
- `archived` (boolean) - Return archived table (default: false)
- `isGetLocalizedSchema` (boolean) - Get localized schema

**Example Request:**
```bash
curl --location 'https://api.hubapi.com/cms/v3/hubdb/tables/:tableIdOrName/draft' \
  --header 'Accept: application/json' \
  --header 'private-app-legacy: YOUR_API_KEY'
```

**Response:**
- **200 OK** - Returns draft table details

---

## Update an Existing Table

Updates an existing HubDB table. Only modifies the draft version. Use publish endpoint to push changes to published version.

**Important:** You must include all columns in the request. Columns not included will be deleted.

**Endpoint:** `PATCH /cms/v3/hubdb/tables/:tableIdOrName/draft`

**Path Parameters:**
- `tableIdOrName` (string, required) - Table ID or name

**Query Parameters:**
- `includeForeignIds` (boolean) - Populate foreign ID values
- `archived` (boolean) - Restore archived table by setting to false
- `isGetLocalizedSchema` (boolean) - Get localized schema

**Request Body:**
```json
{
  "label": "string",
  "name": "string",
  "useForPages": false,
  "allowPublicApiAccess": false,
  "allowChildTables": false,
  "enableChildTablePages": false,
  "columns": [],
  "dynamicMetaTags": {}
}
```

**Example Request:**
```bash
curl --location --request PATCH 'https://api.hubapi.com/cms/v3/hubdb/tables/:tableIdOrName/draft' \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'private-app-legacy: YOUR_API_KEY' \
  --data '{
    "label": "Updated Table",
    "columns": [...]
  }'
```

**Response:**
- **200 OK** - Returns the updated table

---

## Publish a Table from Draft

Publishes the table by copying data and schema changes from draft to published version. Website pages using the table will be updated.

**Endpoint:** `POST /cms/v3/hubdb/tables/:tableIdOrName/draft/publish`

**Path Parameters:**
- `tableIdOrName` (string, required) - Table ID or name

**Query Parameters:**
- `includeForeignIds` (boolean) - Populate foreign ID values

**Example Request:**
```bash
curl --location --request POST 'https://api.hubapi.com/cms/v3/hubdb/tables/:tableIdOrName/draft/publish' \
  --header 'Accept: application/json' \
  --header 'private-app-legacy: YOUR_API_KEY'
```

**Response:**
- **200 OK** - Returns the published table

---

# Rows

## Get Rows from Draft Table

Returns rows in the draft version of the table. Results can be filtered and sorted.

**Endpoint:** `GET /cms/v3/hubdb/tables/:tableIdOrName/rows/draft`

**Path Parameters:**
- `tableIdOrName` (string, required) - Table ID or name

**Query Parameters:**
- `sort` (string, repeatable) - Column names to sort by
- `after` (string) - Cursor token for pagination
- `limit` (integer) - Maximum results (default: 1000)
- `properties` (string, repeatable) - Column names to include in results
- `offset` (integer) - Offset for pagination
- `archived` (boolean) - Include archived rows

**Filtering:** Use query parameters like `column1__gt=5` for filtering (greater than 5)

**Sorting:** Use `-column1` for descending order

**Example Request:**
```bash
curl --location 'https://api.hubapi.com/cms/v3/hubdb/tables/:tableIdOrName/rows/draft?limit=100' \
  --header 'Accept: application/json' \
  --header 'private-app-legacy: YOUR_API_KEY'
```

**Response:**
- **200 OK** - Returns array of rows

**Response Body:**
```json
{
  "results": [
    {
      "values": {},
      "id": "string",
      "path": "string",
      "name": "string",
      "childTableId": "string",
      "createdAt": "dateTime",
      "updatedAt": "dateTime",
      "publishedAt": "dateTime"
    }
  ],
  "total": 0,
  "paging": {
    "next": {
      "after": "string",
      "link": "string",
      "offset": 0
    }
  },
  "type": "RANDOM_ACCESS"
}
```

---

## Get a Published Table Row

Gets a single row by ID from the published version.

**Note:** Can be accessed without authentication if table allows public access.

**Endpoint:** `GET /cms/v3/hubdb/tables/:tableIdOrName/rows/:rowId`

**Path Parameters:**
- `tableIdOrName` (string, required) - Table ID or name
- `rowId` (string, required) - Row ID

**Query Parameters:**
- `archived` (boolean) - Include archived rows

**Example Request:**
```bash
curl --location 'https://api.hubapi.com/cms/v3/hubdb/tables/:tableIdOrName/rows/123' \
  --header 'Accept: application/json' \
  --header 'private-app-legacy: YOUR_API_KEY'
```

**Response:**
- **200 OK** - Returns the row

---

## Clone a Row

Clones a single row in the draft version of the table.

**Endpoint:** `POST /cms/v3/hubdb/tables/:tableIdOrName/rows/:rowId/draft/clone`

**Path Parameters:**
- `tableIdOrName` (string, required) - Table ID or name
- `rowId` (string, required) - Row ID to clone

**Query Parameters:**
- `name` (string) - Name for the cloned row

**Example Request:**
```bash
curl --location --request POST 'https://api.hubapi.com/cms/v3/hubdb/tables/:tableIdOrName/rows/123/draft/clone' \
  --header 'Accept: application/json' \
  --header 'private-app-legacy: YOUR_API_KEY'
```

**Response:**
- **200 OK** - Returns the cloned row

---

## Get a Draft Table Row

Gets a single row by ID from the draft version.

**Endpoint:** `GET /cms/v3/hubdb/tables/:tableIdOrName/rows/:rowId/draft`

**Path Parameters:**
- `tableIdOrName` (string, required) - Table ID or name
- `rowId` (string, required) - Row ID

**Query Parameters:**
- `archived` (boolean) - Include archived rows

**Example Request:**
```bash
curl --location 'https://api.hubapi.com/cms/v3/hubdb/tables/:tableIdOrName/rows/123/draft' \
  --header 'Accept: application/json' \
  --header 'private-app-legacy: YOUR_API_KEY'
```

**Response:**
- **200 OK** - Returns the row

---

## Replace an Existing Row

Replaces a single row in the draft version. All column values must be specified. Unspecified values will be deleted.

**Endpoint:** `PUT /cms/v3/hubdb/tables/:tableIdOrName/rows/:rowId/draft`

**Path Parameters:**
- `tableIdOrName` (string, required) - Table ID or name
- `rowId` (string, required) - Row ID

**Request Body:**
```json
{
  "values": {
    "column_name": "value"
  },
  "path": "string",
  "name": "string",
  "childTableId": 0,
  "displayIndex": 0
}
```

**Example Request:**
```bash
curl --location --request PUT 'https://api.hubapi.com/cms/v3/hubdb/tables/:tableIdOrName/rows/123/draft' \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'private-app-legacy: YOUR_API_KEY' \
  --data '{
    "values": {
      "name": "New Value"
    }
  }'
```

**Response:**
- **200 OK** - Returns the updated row

---

## Delete a Row

Permanently deletes a row from the draft version.

**Endpoint:** `DELETE /cms/v3/hubdb/tables/:tableIdOrName/rows/:rowId/draft`

**Path Parameters:**
- `tableIdOrName` (string, required) - Table ID or name
- `rowId` (string, required) - Row ID

**Example Request:**
```bash
curl --location --request DELETE 'https://api.hubapi.com/cms/v3/hubdb/tables/:tableIdOrName/rows/123/draft' \
  --header 'private-app-legacy: YOUR_API_KEY'
```

**Response:**
- **204 No Content** - Row deleted successfully

---

## Update an Existing Row

Sparse updates a single row in the draft version. Only specified columns/fields are modified.

**Endpoint:** `PATCH /cms/v3/hubdb/tables/:tableIdOrName/rows/:rowId/draft`

**Path Parameters:**
- `tableIdOrName` (string, required) - Table ID or name
- `rowId` (string, required) - Row ID

**Request Body:**
```json
{
  "values": {
    "column_name": "value"
  },
  "path": "string",
  "name": "string",
  "childTableId": 0,
  "displayIndex": 0
}
```

**Example Request:**
```bash
curl --location --request PATCH 'https://api.hubapi.com/cms/v3/hubdb/tables/:tableIdOrName/rows/123/draft' \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'private-app-legacy: YOUR_API_KEY' \
  --data '{
    "values": {
      "name": "Updated Value"
    }
  }'
```

**Response:**
- **200 OK** - Returns the updated row

---

## Get Published Table Rows

Returns rows in the published version of the table. Results can be filtered and sorted.

**Note:** Can be accessed without authentication if table allows public access.

**Endpoint:** `GET /cms/v3/hubdb/tables/:tableIdOrName/rows`

**Path Parameters:**
- `tableIdOrName` (string, required) - Table ID or name

**Query Parameters:**
- `sort` (string, repeatable) - Column names to sort by
- `after` (string) - Cursor token for pagination
- `limit` (integer) - Maximum results (default: 1000)
- `properties` (string, repeatable) - Column names to include
- `offset` (integer) - Offset for pagination
- `archived` (boolean) - Include archived rows

**Example Request:**
```bash
curl --location 'https://api.hubapi.com/cms/v3/hubdb/tables/:tableIdOrName/rows' \
  --header 'Accept: application/json' \
  --header 'private-app-legacy: YOUR_API_KEY'
```

**Response:**
- **200 OK** - Returns array of rows

---

## Add a New Row

Adds a new row to the draft version of the table. Use publish endpoint to push to published version.

**Endpoint:** `POST /cms/v3/hubdb/tables/:tableIdOrName/rows`

**Path Parameters:**
- `tableIdOrName` (string, required) - Table ID or name

**Request Body:**
```json
{
  "values": {
    "column_name": "value"
  },
  "path": "string",
  "name": "string",
  "childTableId": 0,
  "displayIndex": 0
}
```

**Example Request:**
```bash
curl --location 'https://api.hubapi.com/cms/v3/hubdb/tables/:tableIdOrName/rows' \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'private-app-legacy: YOUR_API_KEY' \
  --data '{
    "values": {
      "name": "New Row"
    }
  }'
```

**Response:**
- **201 Created** - Returns the created row

---

# Rows Batch Operations

## Replace Rows in Batch (Draft)

Replaces multiple rows in the draft version. Maximum 100 rows per call.

**Endpoint:** `POST /cms/v3/hubdb/tables/:tableIdOrName/rows/draft/batch/replace`

**Path Parameters:**
- `tableIdOrName` (string, required) - Table ID or name

**Request Body:**
```json
{
  "inputs": [
    {
      "id": "string",
      "values": {},
      "path": "string",
      "name": "string",
      "childTableId": 0,
      "displayIndex": 0
    }
  ]
}
```

**Example Request:**
```bash
curl --location 'https://api.hubapi.com/cms/v3/hubdb/tables/:tableIdOrName/rows/draft/batch/replace' \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'private-app-legacy: YOUR_API_KEY' \
  --data '{
    "inputs": [...]
  }'
```

**Response:**
- **200 OK** - Returns batch operation results

**Response Body:**
```json
{
  "status": "PENDING",
  "results": [],
  "requestedAt": "dateTime",
  "startedAt": "dateTime",
  "completedAt": "dateTime",
  "links": {}
}
```

---

## Delete Rows in Batch (Draft)

Permanently deletes rows from the draft version. Maximum 100 row IDs per call.

**Endpoint:** `POST /cms/v3/hubdb/tables/:tableIdOrName/rows/draft/batch/purge`

**Path Parameters:**
- `tableIdOrName` (string, required) - Table ID or name

**Request Body:**
```json
{
  "inputs": ["rowId1", "rowId2"]
}
```

**Example Request:**
```bash
curl --location 'https://api.hubapi.com/cms/v3/hubdb/tables/:tableIdOrName/rows/draft/batch/purge' \
  --header 'Content-Type: application/json' \
  --header 'private-app-legacy: YOUR_API_KEY' \
  --data '{
    "inputs": ["123", "456"]
  }'
```

**Response:**
- **204 No Content** - Rows deleted successfully

---

## Get Rows in Batch (Published)

Returns rows in the published version, given a set of row IDs.

**Note:** Can be accessed without authentication if table allows public access.

**Endpoint:** `POST /cms/v3/hubdb/tables/:tableIdOrName/rows/batch/read`

**Path Parameters:**
- `tableIdOrName` (string, required) - Table ID or name

**Request Body:**
```json
{
  "inputs": ["rowId1", "rowId2"]
}
```

**Example Request:**
```bash
curl --location 'https://api.hubapi.com/cms/v3/hubdb/tables/:tableIdOrName/rows/batch/read' \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'private-app-legacy: YOUR_API_KEY' \
  --data '{
    "inputs": ["123", "456"]
  }'
```

**Response:**
- **200 OK** - Returns batch operation results

---

## Create Rows in Batch (Draft)

Creates rows in the draft version. Maximum 100 row objects per call.

**Endpoint:** `POST /cms/v3/hubdb/tables/:tableIdOrName/rows/draft/batch/create`

**Path Parameters:**
- `tableIdOrName` (string, required) - Table ID or name

**Request Body:**
```json
{
  "inputs": [
    {
      "values": {},
      "path": "string",
      "name": "string",
      "childTableId": 0,
      "displayIndex": 0
    }
  ]
}
```

**Example Request:**
```bash
curl --location 'https://api.hubapi.com/cms/v3/hubdb/tables/:tableIdOrName/rows/draft/batch/create' \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'private-app-legacy: YOUR_API_KEY' \
  --data '{
    "inputs": [...]
  }'
```

**Response:**
- **201 Created** - Returns batch operation results

---

## Get Rows in Batch (Draft)

Returns rows in the draft version, given a set of row IDs.

**Endpoint:** `POST /cms/v3/hubdb/tables/:tableIdOrName/rows/draft/batch/read`

**Path Parameters:**
- `tableIdOrName` (string, required) - Table ID or name

**Request Body:**
```json
{
  "inputs": ["rowId1", "rowId2"]
}
```

**Example Request:**
```bash
curl --location 'https://api.hubapi.com/cms/v3/hubdb/tables/:tableIdOrName/rows/draft/batch/read' \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'private-app-legacy: YOUR_API_KEY' \
  --data '{
    "inputs": ["123", "456"]
  }'
```

**Response:**
- **200 OK** - Returns batch operation results

---

## Clone Rows in Batch (Draft)

Clones rows in the draft version. Maximum 100 row IDs per call.

**Endpoint:** `POST /cms/v3/hubdb/tables/:tableIdOrName/rows/draft/batch/clone`

**Path Parameters:**
- `tableIdOrName` (string, required) - Table ID or name

**Request Body:**
```json
{
  "inputs": [
    {
      "id": "string",
      "name": "string"
    }
  ]
}
```

**Example Request:**
```bash
curl --location 'https://api.hubapi.com/cms/v3/hubdb/tables/:tableIdOrName/rows/draft/batch/clone' \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'private-app-legacy: YOUR_API_KEY' \
  --data '{
    "inputs": [{"id": "123", "name": "cloned_row"}]
  }'
```

**Response:**
- **200 OK** - Returns batch operation results

---

## Update Rows in Batch (Draft)

Updates multiple rows in the draft version. Maximum 100 rows per call.

**Endpoint:** `POST /cms/v3/hubdb/tables/:tableIdOrName/rows/draft/batch/update`

**Path Parameters:**
- `tableIdOrName` (string, required) - Table ID or name

**Request Body:**
```json
{
  "inputs": [
    {
      "id": "string",
      "values": {},
      "path": "string",
      "name": "string",
      "childTableId": 0,
      "displayIndex": 0
    }
  ]
}
```

**Example Request:**
```bash
curl --location 'https://api.hubapi.com/cms/v3/hubdb/tables/:tableIdOrName/rows/draft/batch/update' \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'private-app-legacy: YOUR_API_KEY' \
  --data '{
    "inputs": [...]
  }'
```

**Response:**
- **200 OK** - Returns batch operation results

---

## Best Practices

1. **Draft vs Published:** Always work with draft versions and publish when ready
2. **Batch Operations:** Use batch endpoints for bulk operations (max 100 items)
3. **Filtering:** Use query parameters for efficient filtering and sorting
4. **Public Access:** Enable public API access for tables that need client-side access
5. **Column Updates:** When updating tables, include all columns to avoid deletion
6. **Row Updates:** Use PATCH for partial updates, PUT for complete replacement
7. **Pagination:** Use the `after` cursor for efficient pagination
8. **Rate Limits:** Be mindful of rate limits, especially for unauthenticated requests
