# Version History

Detailed changelog following [Keep a Changelog](https://keepachangelog.com/) format.

All notable changes to this project will be documented in this file.

## [Unreleased]

## [0.5.1] - 2026-06-22

### Added
- idProperty parameter to getObject and getManyObjects operations in HubSpot CRM node for flexible object identification

### Changed
- Upgraded Node.js from version 20 to 22 in GitHub Actions workflows and .nvmrc
- Removed npm publish step from release workflow

## [0.5.0] - 2026-06-17

### Added
- HubSpot CMS Blog node for managing blog posts and blog tags (get, get all, create, update, delete, clone, schedule, reset draft, get draft, get revisions, restore revision, batch delete)
- HubSpot CMS Pages node for managing site pages and landing pages (get, get all, create, update, delete, clone, publish, schedule, batch delete)
- Dynamic page, template, and domain dropdowns in CMS Pages node with automatic pagination
- Blog author and tag dropdowns in CMS Blog node with caching

### Changed
- HubDB Rows getAll operation now supports structured filtering, sorting, and column selection
- CRM search filter UI now conditionally shows `value` or `values` fields based on the selected operator, reducing visual noise
- CMS Pages: name and templatePath are now required fields for page creation

### Fixed
- Rate limiting error handling now correctly processes rate limit responses from HubSpot API
- Error items passed through error output now include node context for easier debugging

## [0.4.1] - 2026-05-28

### Added
- HubSpot Site Search node for searching content across HubSpot-hosted sites and retrieving indexed data for specific assets
- Search operation with query, content type filtering, domain/language filters, pagination, and content boosting
- Get Indexed Data operation to retrieve indexed search data for a specific content asset by ID
- Blog and HubDB table dropdowns with automatic pagination for large accounts

### Changed
- Query parameter arrays now use repeat format (type=A&type=B) instead of indices (type[0]=A&type[1]=B) for HubSpot API compatibility

## [0.4.0] - 2026-05-22

### Added
- HubSpot CMS Redirects node for managing URL redirects with search, get, create, update, and delete operations
- Search operation with filters for route prefix, destination, redirect style, date ranges, and sorting
- Return All support for automatic pagination of redirect search results
- Batch operations pattern documentation in NODE_DEVELOPMENT_GUIDE.md

## [0.3.0] - 2026-05-22

### Added
- Get Lists operation: fetch multiple lists by ILS list ID from input items with optional includeFilters parameter
- Search Lists operation: search lists by name with offset-based pagination, optional processing type filtering, and Return All support

## [0.2.2] - 2026-05-22

### Fixed
- Marketing Events: Create operation now uses POST endpoint instead of upsert for proper event creation
- CRM: Marketing events are now filtered out from the Object Type dropdown since they have their own dedicated node

## [0.2.1] - 2026-05-22

### Added
- Folder management operations in Lists node: Create Folder, Get Folders, Delete Folder
- Parent folder selection dropdown when creating a folder (populated from existing folders)
- Folder selection dropdown for Delete Folder operation
- Folder assignment when creating a list (optional Folder field with dropdown)

### Fixed
- Object Type field is now correctly hidden for all folder operations (Create Folder, Get Folders, Delete Folder)
- Root folder (ID 0) is now shown as "Root" in folder dropdowns instead of a numeric value
- Nested folders are displayed with full path (e.g. "Parent / Child") in all folder dropdowns
- Pagination loop in list loading now protected against infinite loops when API returns unchanged offset

## [0.1.16] - 2026-05-22

### Added
- List association operations (getAssociatedLists, associateList, disassociateList) for Marketing Events node

### Changed
- Enhanced error output when continueOnFail is enabled: errors now include HTTP status code and full HubSpot error details (message, correlationId, category)
- Lists node now uses nested value accessor for ID field extraction
- Added requiresDataPath attribute to idField in Lists node for improved autocomplete support

## [0.1.15] - 2026-05-19

### Fixed
- Static list creation now uses correct type value (MANUAL instead of SNAPSHOT) and properly extracts list object from create response

### Changed
- Updated repository and bugs URLs to point to GitHub

## [0.1.14] - 2025-05-12

### Added
- Batch upsert operation for CRM node to create or update multiple objects efficiently
- Duplicate validation options for file upload and importUrl operations
- idProperty parameter to update and batchUpdate operations for flexible object identification
- Dot notation support for nested field access across all nodes
- requiresDataPath property to field mapping inputs for improved autocomplete support

### Changed
- idProperty moved from query parameter to request body in batchUpdate operation for better API compatibility
- Field descriptions and hints simplified across CRM, HubDb, and Lists nodes

## [0.1.13] - 2025-04-27

### Added
- Association label filtering for hydrateAssociations and batchHydrateAssociations operations with AND/OR modes

## [0.1.12] - 2025-04-27

### Added
- HubDB node for table and row operations with comprehensive CRUD support
- Get operation for retrieving single HubDB table by ID or name
- Publication status display in HubDB table dropdown labels
- Association label filtering with AND/OR modes for getAssociations and batchGetAssociations operations
- Support for multiple association labels in create/delete operations with backwards compatibility
- GetAssociationLabelDefinitions operation to retrieve association label schema between object types
- Comprehensive field validation with helpful error messages and hints across CRM, HubDb, and Files nodes
- Automatic batching for IN/NOT_IN filters with more than 100 values
- Filter value deduplication for improved performance

### Changed
- HubDB table list now uses draft endpoint for better table management

## [0.1.11] - 2025-04-20

### Added
- Automatic batching for IN/NOT_IN filters with more than 100 values
- Support for multiple association labels in create and delete operations
- UI fields for 'values' (IN/NOT_IN operators) and 'highValue' (BETWEEN operator)
- Filter value deduplication for improved performance

### Changed
- Improved filter operator handling with conditional display logic
- Simplified values field to support both semicolon-separated strings and array expressions

### Fixed
- Array support for IN/NOT_IN filter operators

## [0.1.10] - 2025-04-20

### Added
- New search filter operators: IN, NOT_IN, HAS_PROPERTY, NOT_HAS_PROPERTY
- Support for arrays and semicolon-separated values in filter operations
- Enhanced filtering capabilities for complex search queries

## [0.1.9] - 2025-01-30

### Added
- Batch create, update, and delete operations for HubSpot CRM node
- Field-name mapping for batch operations with dropdown selection
- Association label selection for delete operations
- Batch operation error handling improvements

### Changed
- Optimized bulk operations to use HubSpot's batch APIs (up to 100 items per call)

## [0.1.8] - 2025-01-29

### Fixed
- Added README.md to npm package files for better documentation visibility

### Changed
- Added .npmrc to .gitignore

## [0.1.7] - 2025-01-25

### Added
- Pagination support for HubSpot Files, Lists, and Forms nodes
- `returnAll` parameter for search operations across all nodes
- Association support during object creation in CRM node
- Association label support in Associations node
- Form submissions pagination with automatic retrieval

### Changed
- Updated limit defaults to 100 and maximum to 10,000
- Improved submission retrieval logic in Forms node
- Optimized search operations to return individual items instead of wrapped arrays
- Changed properties field default from empty string to empty array

### Fixed
- PropertyCache imports moved to top level for better performance
- Simplified file replace request handling
- Removed redundant response.data unwrapping

## [0.1.6] - 2025-01-09

### Added
- Batch operations for Associations: `batchGetAssociations` and `batchHydrateAssociations`
- TypeScript type annotations across all HubSpot nodes
- Modular structure with separated field descriptions and operations
- Object schema retrieval operation
- List filtering by object type

### Changed
- Improved type safety by replacing 74% of `any` types with specific interfaces and IDataObject
- Separated field descriptions and operations into dedicated directories
- Renamed `getObjectTypes` to `getCustomObjectTypes` for clarity
- Updated subtitle logic to display operation-specific information

### Fixed
- Error message format to match test expectations

## [0.1.5] - 2025-01-08

### Added
- HubSpot Marketing Events node with full event lifecycle management
- Event operations: get, create/update (upsert), search, update, delete
- Participant operations: get participants, register contacts, mark attended, cancel registration
- Participant state filtering (registered, attended, cancelled)
- Custom property management for events
- Linting integration in build process

### Changed
- Refactored HubSpotMarketingEvents node to extract field descriptions and operation handlers into separate modules

---

## Older Versions

<details>
<summary>Click to expand older versions (0.1.0 - 0.1.4)</summary>

## [0.1.4] - 2025-01-04

### Added
- Forms API v3 support with objectTypeId-based fields
- GDPR consent and subscription management in form submissions
- Dedicated form submission request handler (rate-limit isolated)
- Multi-object field support (contacts, companies, deals, custom objects)

### Changed
- Refactored HubSpotForms submitForm operation to use new Forms API v3 format

## [0.1.3] - 2025-01-03

### Added
- File search with folder path and extension filter parameters
- Dynamic property selection with loading dependencies
- Enhanced property selection in HubSpotCrm node with dynamic options loading

### Changed
- Improved file search capabilities with advanced filtering
- Updated README with new features and nodes

## [0.1.2] - 2024-12-31

### Fixed
- Associated objects property selection in HubSpot Associations node

## [0.1.1] - 2024-12-30

### Added
- Improved branding across all nodes
- Comprehensive field descriptions and placeholders to all node parameters
- Codex metadata with categories, aliases, and documentation links

### Fixed
- Type definitions and TypeScript compilation issues
- Unterminating tests in test suite
- Removed broken test badge from README

### Changed
- Removed repository URL from package.json

## [0.1.0] - 2024-02-25

### Added
- Initial release of n8n-nodes-hubspot-advanced
- HubSpot CRM node with search, get, create, update, delete operations
- HubSpot Associations node with hydration support
- HubSpot Forms node (v1 submissions, v3 forms, v3-legacy submit)
- HubSpot Object Schema node for metadata retrieval
- HubSpot Files node for file management operations
- HubSpot Lists node for list member retrieval
- Intelligent rate limiting with tier detection
- Batch API support for efficient bulk operations
- Auto-pagination for large result sets
- Comprehensive test suite with 23 tests
- CI/CD pipeline with GitHub Actions
- Response-based rate limiting with globalThis singleton
- 429 handling with exponential backoff and jitter
- Retry-After header support

</details>

