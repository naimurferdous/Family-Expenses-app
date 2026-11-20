# Family Expenses v2.4.0

## Daily-life additions
- Offline Karachi-method prayer calculator (Fajr/Isha 18°), Hanafi Asr, adjustable district correction, next-prayer countdown, Sehri/Iftar estimate, Qibla compass.
- Today dashboard with prayer, weather, bills, tasks, bazaar and reminders.
- Open-Meteo forecast, selected-time rain alerts, AQI/PM2.5/PM10.
- Search across transactions, notes, tasks, bazaar, documents, events and reminders.
- Ramadan fast tracking, countdown and editable fitra Live Facts amount.
- Important dates with Bangla/Hijri estimates and gift budget.
- Emergency phone list and consent-based SOS SMS with location link.
- Offline text reminder parser, optional speech input and local notifications.
- Camera capture and local PDF export.
- DAM Live Facts collector workflow.

## Existing features retained
The v2.3.0 assets vault, calculator, custom themes, news strip, transaction totals, bazaar planner, bills, calendar, existing task planner, document vault, backup/export and existing app updates remain.

## Known limitations / validation notes
- Prayer reference used for regression: https://moazzin.com/bd/dhaka (20 Nov 2026 online calculated table). Official Islamic Foundation timetable links: https://islamicfoundation.gov.bd. Prayer times were regression-checked against an online Karachi/Hanafi Dhaka reference for 20 Nov 2026 within 1 minute. Minute-by-minute verification against an official Islamic Foundation printed timetable was not possible in this environment; follow local mosque/official printed times. Sehri is a 4-minute precaution before calculated Fajr; Iftar follows calculated Maghrib.
- Weather/AQI and market facts require internet. Weather alerts are scheduled after forecast fetch and user opens/refreshes; there is no guaranteed always-on background fetch.
- DAM public source: https://market.dam.gov.bd/?L=E. The package includes a web-verified DAM public-summary snapshot for 20 Nov 2026 (units are not included in the extracted summary). The collector is fixture-tested, but the live collector was not run from this environment and no sample district/market report was supplied; district/market-specific parser work remains pending.
- SOS opens the SMS composer and does not send silently.
- Camera scan is image capture + local PDF assembly, not OCR or automatic perspective correction.
- Full APK install/runtime test was not possible here; source syntax, parser fixture, prayer regression and archive checks are run.


# Family Expenses v2.5.0 — Security hardening

- Removed public debug keystore from repository package; debug builds use generated keys and are not published as trusted releases.
- New main encryption/document vault passwords require 12+ characters.
- New Financial Assets Vault uses 400,000 PBKDF2 iterations; legacy data remains compatible with legacy iteration count.
- Added progressive failed-attempt lockout to Financial Assets Vault.
- Google Drive backup now requires main app encryption and a 12+ character backup passphrase. Unencrypted legacy Drive backups are blocked from automatic syncing until reconnected and migrated.
- Main encryption changes migrate encrypted Google Drive settings when available; disabling main encryption removes local Drive connection/key settings (remote backup remains encrypted).
- Added repository security-policy tests, npm audit CI gate, Dependabot configuration and SECURITY.md.
- Added ignore rules for signing material, APKs, exports and local financial data.

Security checks passed locally: inline JavaScript syntax, security-policy test, DAM parser, prayer reference test, reminder parser, HTML parse, workflow YAML parse, and ZIP integrity. Android build/runtime and npm audit were not run in this environment; CI will run npm audit and Android build. This release has not undergone independent penetration testing.
