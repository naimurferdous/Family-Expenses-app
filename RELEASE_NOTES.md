# Family Expenses v2.6.0

- **News** now loads through the phone's native HTTP (no browser CORS limit) with fallback sources (The Daily Star, Dhaka Tribune, Google News BD, BBC Bangla / BBC World, Al Jazeera). The thin bar sits right under the routine card; Bangladesh and International tabs, once-a-day auto update and a Refresh button.
- **Calculator**: Standard / Advanced switch is back - scientific, converters (length, weight, temperature/weather units, area incl. katha & bigha, gold vori, data, speed), age & dates, 2x2 / 3x3 matrices, percentage, discount/VAT, EMI, BMI, bill split.
- **Themes**: 8 more themes and a real custom colour picker (backgrounds, cards and text are generated from one colour, light and dark).
- **Prayer & Qibla** redesigned. The Qibla bearing formula had the Kaaba's latitude/longitude swapped (about 30 degrees off in Dhaka) - fixed and covered by a test. The compass now uses the absolute heading sensor with tilt compensation and smoothing, shows a rotating dial with the Kaaba marker, distance, turn-left/right hint and a green lock + vibration when aligned.
- **Prayer times** are editable: tap a time to enter your local mosque time (stored as a minute adjustment), or use - / +. Method (Karachi, MWL, ISNA, Egypt, custom angles), Hanafi/Standard Asr, 12h/24h, district presets, GPS, Sehri margin.
- **More**: "Daily life" and "Daily life & family hub" are merged into one block with a Today / Faith / Family / Home picker (all features kept). Private assets now sits near the bottom, above the App group. "About the app" is a normal row with a trailing arrow like the others. The More tab in the bottom bar has the same colours as Home/Plan.
- Back buttons in Calculator, Notes and Sheets use the same big pill as every other screen.

**Validation:** syntax, jsdom/browser smoke tests of all screens and the unit tests were run locally. A GitHub Actions APK build and a test on a real phone (compass sensor, live news) are still required.

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
