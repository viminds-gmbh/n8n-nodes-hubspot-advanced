# Version History

Detailed changelog following [Keep a Changelog](https://keepachangelog.com/) format.

All notable changes to this project will be documented in this file.

## [Unreleased]

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

