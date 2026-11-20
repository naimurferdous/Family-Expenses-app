# Security & Privacy Notes — Family Expenses v2.5.0

## Current protections
- Main app data encryption uses AES-256-GCM with PBKDF2-HMAC-SHA-256 (400,000 iterations) when the user enables it.
- Document vault and Financial Assets Vault encrypt stored file/data payloads with AES-GCM.
- New main-encryption, document-vault, financial-assets-vault and cloud-backup passwords require at least 12 characters.
- Financial Assets Vault has a local progressive lockout after repeated failed unlocks and a one-minute auto-lock.
- Document vault has a progressive lockout and auto-lock.
- App screen capture is disabled by Android FLAG_SECURE in the generated Android app.
- Android backup is disabled by the build workflow; cleartext network traffic is disabled.
- Public debug signing key removed. Release signing must use repository Actions secrets; debug builds use runner-generated keys and are not published as releases.
- Cloud backup now requires encryption with a passphrase before upload. Legacy unencrypted Drive data can be migrated by reconnecting with a passphrase; do not assume this migration has occurred until a successful backup is shown.

## User responsibilities
- Enable the app's main encryption feature; it is not automatically enabled to avoid locking out existing data.
- Use unique, long passphrases and keep a safe offline copy. Password recovery is not available.
- Keep the Android OS and phone lock up to date.
- Exported CSV/Excel/PDF files and files exported from vaults are plaintext; securely remove them after use and do not share them unintentionally.
- Never put personal data, backups, signing keys, OAuth secrets or APKs into the public repository.
- Only install APKs from the project's trusted release workflow.

## Limitations / threat model
This project has not undergone independent penetration testing, a full mobile threat-model review, or runtime testing on physical devices. JavaScript-based encryption is vulnerable if the device, app runtime, or browser storage is compromised. Rate-limit metadata stored on-device can be tampered with by an attacker with local access. The app cannot protect data while the phone is unlocked and compromised. The public source code is not itself a leak of local records, but a malicious commit, compromised dependency, or fake APK can attack users.

## Reporting vulnerabilities
Please do not open a public issue containing sensitive exploit details. Use GitHub's private vulnerability reporting feature if enabled for this repository, or contact the project maintainer privately.


## CI dependency audits
The CI workflow blocks on high/critical vulnerabilities in production dependencies. Vulnerabilities in development/build dependencies are reported as warnings and a JSON report is retained in the workflow workspace; these still require remediation and should not be ignored.
