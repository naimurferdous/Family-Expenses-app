# Family Expenses v2.3.0

## UI and dashboard
- Removed decorative blue/yellow circle effects from monthly summary cards.
- Enlarged and restyled More/back controls across screens.
- Added Bangladesh/International news compact strip below the home routine area, with tab switching, manual refresh, daily cache and update time. News loads from RSS headlines through a public RSS-to-JSON service; it requires internet and may be unavailable if that service is rate-limited.

## Transactions
- Credit and debit totals are shown at the top of the Transactions screen and respond to the current month, search and category filter.

## Financial Assets Vault
- Added an independently locked vault in More.
- PIN/passcode setup and unlock is separate from the app's unlocked state.
- AES-GCM encrypted data at rest, with PBKDF2 key derivation.
- Optional native biometric unlock where the installed Android plugin/device supports it.
- Asset categories: Banks (DBBL, IBBL), MFS (Bkash, Rocket, Nagad, Upay), Cash, Investment, Lend.
- Add/edit/delete entries, amounts, notes and Green/Safe, Yellow/Cautious, Red/Risky statuses.
- Category and total asset summaries.
- Vault ciphertext is included in encrypted app backups and restored from them.
- Vault auto-locks after 60 seconds and when the app goes to background.

## Themes and tools
- Expanded predefined palettes (Forest, Midnight, Rose) and added custom primary/accent color controls.
- Added one-tap Advanced Calculator mode, keeping Basic calculator separate.
- Advanced tools include scientific functions, matrix operations, age and date difference, unit/temperature conversion, currency conversion, and weather lookup.

## Notes
- Daily news and live rates/weather require network access.
- The app is a local-first app; daily headlines refresh while the app is opened, not as a guaranteed background job when Android has closed the app.
