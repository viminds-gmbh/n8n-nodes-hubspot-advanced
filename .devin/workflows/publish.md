---
description: Publishing workflow for new versions
---

# Publishing Workflow

Follow these steps to publish a new version of n8n-nodes-hubspot-advanced.

## Pre-Release Checklist

### 1. Analyze commits since last version

// turbo
Run the following command to see all commits since the last version:

```bash
git log $(git describe --tags --abbrev=0)..HEAD --oneline
```

AI will analyze these commits and categorize them into:
- **Added**: New features and capabilities
- **Changed**: Changes in existing functionality
- **Fixed**: Bug fixes
- **Removed**: Removed features
- **Security**: Security-related changes

### 2. Update VERSIONS.md

AI will:
- Add a new version section with today's date
- Move relevant items from [Unreleased] to the new version section
- Categorize all changes based on commit analysis
- Use clear, user-focused language (not technical commit messages)
- Ensure no duplicate entries

**Important**: Review the generated changelog entries for accuracy before proceeding.

### 3. Update README.md

Summarize core features in the Features section if needed.

**Guidelines**:
- Don't add redundant features
- Don't change feature wordings just for the sake of it
- Focus on clarity and usefulness
- Update roadmap checkboxes if applicable

### 4. Verify changes

// turbo
Run tests and build to ensure everything works:

```bash
npm test && npm run build && npm run lint
```

## Publishing

After completing the checklist above, publish the package:

// turbo
```bash
npm version patch && npm publish --access public
```

**Note**: Use `npm version minor` for new features or `npm version major` for breaking changes.

## Post-Release

1. Verify package on npm: https://www.npmjs.com/package/n8n-nodes-hubspot-advanced
2. Create GitHub release with VERSIONS.md content for this version
3. Update any external documentation if needed

## Backup current n8n Test Workflows

After publishing, backup the current n8n test workflows:

// turbo
```bash
npm run backup
```

## AI Workflow Notes

When AI processes this workflow:
1. It reads git commits between last tag and HEAD
2. It intelligently categorizes changes based on commit content
3. It rewrites technical commit messages into user-friendly descriptions
4. It deduplicates similar changes
5. It updates both VERSIONS.md and README.md consistently