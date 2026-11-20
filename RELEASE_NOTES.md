# Family Expenses v2.5.5

- Fixes the Capacitor 6 CLI template extraction incompatibility with patched `tar` v7.
- CI applies a narrowly-scoped compatibility patch (`tar.extract`/default export call to `tar.x`) after dependency installation and before Android platform generation.
- Added regression checks for recognized extractor forms and fail-closed behavior for unknown CLI templates.
- Retains patched `tar` dependency and the security audit workflow; does not downgrade to vulnerable tar versions.

**Validation:** Compatibility script syntax, regression tests, existing source tests, and ZIP integrity were checked locally. A remote GitHub Actions APK build remains required to confirm the full Android build.
