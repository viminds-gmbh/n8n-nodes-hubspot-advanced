# Changelog Guidelines

Guidelines for maintaining the version history in VERSIONS.md.

## When to Use

Apply these guidelines when:
- Publishing a new version via `/publish` workflow
- Updating VERSIONS.md with new changes
- Reviewing changelog entries before release

## Categorization Rules

### Added
Use for new features, capabilities, or nodes:
- New operations in existing nodes
- New nodes entirely
- New parameters or options
- New API support

**Examples**:
- "Batch operations for HubSpot CRM node"
- "HubDB node for table and row operations"
- "Support for multiple association labels"

### Changed
Use for modifications to existing functionality:
- Performance improvements
- Refactoring that affects user experience
- Changes to default values
- API version updates

**Examples**:
- "Improved filter operator handling"
- "Optimized PropertyCache loading"
- "Updated limit defaults to 100"

### Fixed
Use for bug fixes and corrections:
- Error handling improvements
- Fixes to broken functionality
- Corrections to documentation

**Examples**:
- "Fixed array support for IN/NOT_IN operators"
- "Corrected error message format"
- "Added missing README.md to npm package"

### Removed
Use for deprecated or removed features:
- Removed operations
- Deprecated parameters
- Removed dependencies

**Examples**:
- "Removed legacy v1 API support"
- "Deprecated old batch operation format"

### Security
Use for security-related changes:
- Security patches
- Vulnerability fixes
- Authentication improvements

**Examples**:
- "Fixed XSS vulnerability in form submissions"
- "Updated dependencies with security patches"

## Writing Style

### Do ✅
- Write in user-focused language
- Start with action verbs (Added, Fixed, Improved, etc.)
- Be specific about what changed
- Mention the affected node/feature
- Keep entries concise (1-2 lines max)

### Don't ❌
- Use technical jargon or internal terms
- Copy commit messages verbatim
- Include implementation details
- Reference internal ticket numbers
- Use passive voice

## Examples

### Good Entries ✅
```markdown
### Added
- Automatic batching for IN/NOT_IN filters with more than 100 values
- HubDB node for table and row operations
- Support for multiple association labels in create operations

### Changed
- Improved filter operator handling with conditional display logic
- Optimized bulk operations to use HubSpot's batch APIs

### Fixed
- Array support for IN/NOT_IN filter operators
- PropertyCache imports for better performance
```

### Bad Entries ❌
```markdown
### Added
- feat: add batching (too technical, not descriptive)
- Implemented new feature for filters (vague, passive voice)
- JIRA-123: Fixed bug (internal reference)

### Changed
- Refactored code in crmOperations.ts (implementation detail)
- Updated stuff (not specific)
```

## AI Workflow Integration

When AI processes commits for changelog:

1. **Read commits**: `git log $(git describe --tags --abbrev=0)..HEAD --oneline`
2. **Categorize**: Analyze commit messages and code changes
3. **Rewrite**: Transform technical commits into user-friendly descriptions
4. **Deduplicate**: Combine similar changes into single entries
5. **Validate**: Ensure entries follow these guidelines

## Unreleased Section

Always maintain an `[Unreleased]` section at the top of VERSIONS.md:

```markdown
## [Unreleased]

### Added
- Features currently in development

### Changed
- Improvements not yet released
```

When publishing a new version:
1. Create new version section with current date
2. Move items from [Unreleased] to new version
3. Clear [Unreleased] or keep items still in development

## Version Links

Always update the comparison links at the bottom:

```markdown
[Unreleased]: https://github.com/vimindsentwickler/n8n_viminds_nodes/compare/v0.1.11...HEAD
[0.1.11]: https://github.com/vimindsentwickler/n8n_viminds_nodes/compare/v0.1.10...v0.1.11
```

## Commit Message Best Practices

To make AI categorization easier, use conventional commit format:

- `feat:` → Added
- `fix:` → Fixed
- `refactor:` → Changed
- `perf:` → Changed
- `docs:` → Changed (if user-facing)
- `chore:` → Usually omitted from changelog
- `security:` → Security

**Example**: `feat: add HubDB node for table operations`
