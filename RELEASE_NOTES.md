# Family Expenses v2.5.6

- Fixed: the **Today dashboard** crashed when opened (undefined bazaar list). It now shows today's bazaar items.
- Fixed: **Daily life** and **Private assets** were only visible after expanding "Daily life & family hub". They are now independent sections placed right under Alerts, always visible, in English and Bangla.
- Fixed: Home, Transactions, More hub, Calculator and Calendar skipped some later-added features when opened through navigation (the screen table pointed at older function versions). It now points at the final versions.
- Checked: all 36 screens in both languages with empty and sample data, add/edit/delete of a transaction, inline handler and element-id references, syntax and unit tests. No other errors found.

**Validation:** Static checks, a jsdom smoke test of every screen, and the existing unit tests were run locally. A GitHub Actions APK build and a test on a real phone are still required.

# Family Expenses v2.5.5 (previous)

- Fixes the Capacitor 6 CLI template extraction incompatibility with patched `tar` v7.
- CI applies a narrowly-scoped compatibility patch (`tar.extract`/default export call to `tar.x`) after dependency installation and before Android platform generation.
- Added regression checks for recognized extractor forms and fail-closed behavior for unknown CLI templates.
- Retains patched `tar` dependency and the security audit workflow; does not downgrade to vulnerable tar versions.

**Validation:** Compatibility script syntax, regression tests, existing source tests, and ZIP integrity were checked locally. A remote GitHub Actions APK build remains required to confirm the full Android build.
