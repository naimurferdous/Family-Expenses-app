# Family Expenses v2.5.3 — CI Upload and Audit Workflow Fix

- Added a repository completeness preflight so missing nested scripts/tests are reported clearly.
- Full dependency audit is informational for build-tool findings; production dependency high/critical audit remains blocking.
- Explicitly separates install from audits to avoid npm install audit failure masking the build.
- README renamed to GitHub-rendered `README.md`.
- Preserves existing app features and source tests.

**Validation:** Source checks and archive integrity were run locally. npm registry access was unavailable here, so dependency audit resolution and the remote GitHub Actions build cannot be verified from this environment.
