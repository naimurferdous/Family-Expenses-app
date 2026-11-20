Family Expenses — Version 2.5.0 (Daily Life Master OS)
Build By: Naimur Rahman Ferdous | Dedicated to: Ihan

== ১. ZIP এর ভেতরে যা আছে (সবই GitHub এ তুলতে হবে) ==
www/index.html ............ পুরো অ্যাপ
www/logo.png .............. লোগো (আইকনও এখান থেকে বানানো হয়)
.github/workflows/android.yml .. বিল্ডের নির্দেশ (আইকন, সাইনিং, নিরাপত্তা, Release সব এখানে)
native/ApkInstallerPlugin.java .. অ্যাপের ভেতরে আপডেট ইনস্টলের ছোট প্লাগইন
package.json .............. এখানকার version বাড়ালেই নতুন Release হয়
RELEASE_NOTES.md .......... Release-এর বিবরণ
capacitor.config.json, .gitignore
debug.keystore ............ শুধু ব্যাকআপ কী: GitHub Secrets না থাকলে ব্যবহার হয়। Secrets বসানো থাকলে লাগে না।
(SIGNING-SETUP.txt ও .jks ফাইল এই ZIP-এ নেই এবং GitHub-এ তুলবেন না।)

== ২. প্রথমবার APK বানানো ==
1. GitHub এ repository খুলুন। অ্যাপের ভেতরে আপডেট চাইলে Public, না চাইলে Private রাখুন।
2. Settings → Secrets and variables → Actions-এ ৪টি secret দিন:
   KEYSTORE_BASE64, KEYSTORE_PASSWORD, KEY_ALIAS, KEY_PASSWORD (মান SIGNING-SETUP.txt-এ)।
3. ZIP আনজিপ করে সব ফাইল ও ফোল্ডার (.github সহ) একবারে আপলোড → Commit।
4. Actions → "Build APK" সবুজ টিক এলে Releases পাতা বা Artifacts থেকে APK নামিয়ে ইনস্টল করুন।

== ৩. নতুন আপডেট দেওয়ার নিয়ম ==
1. package.json-এ "version" বাড়ান (আগের version আবার দিলে Release হয় না)।
2. RELEASE_NOTES.md-এ কী বদলেছে লিখুন।
3. সব ফাইল একসাথে (বা package.json সবার শেষে) আপলোড করে main-এ Commit করুন।
4. সবুজ টিকের পর Releases-এ নতুন version আসে। ফোনে: সেটিংস → আপডেট (Public repo) অথবা APK হাতে ইনস্টল।
5. আপডেটের আগে "আরও" থেকে JSON ব্যাকআপ নিন। একই কী দিয়ে সই হওয়ায় ডেটা থাকে।

== ৪. প্রথমবার ব্যবহার ==
1. "বাজেট" (পরিকল্পনা ট্যাব) এ আয় ও খাতভিত্তিক সীমা বসান।
2. "আরও → নিরাপত্তা" থেকে পাসওয়ার্ড দিয়ে এনক্রিপশন চালু করুন। পাসওয়ার্ড ভুললে ডেটা ফেরানোর উপায় নেই।
3. ➕ বা হোমের খাতে চেপে খরচ লিখুন।

== ৫. ফিচার ==
হোম (হাতে বাকি, পরামর্শ, বিল, সাম্প্রতিক লেনদেন, বিশ্লেষণ) | লেনদেন (তারিখ ধরে, সার্চ, Undo)
পরিকল্পনা (বাজেট, নিয়মিত বিল, সঞ্চয়, প্রজেক্টর, ইউটিলিটি) | আরও (ক্যালকুলেটর, নোট, শীট, ধার খাতা)
Excel/CSV/রিপোর্ট/JSON এক্সপোর্ট ও রিস্টোর | অ্যাপের ভেতরে আপডেট

== ৬. ১.৩.৪ — বিদ্যুৎ বিলের অনুমান (বাংলাদেশ) ==
- নতুন বিদ্যুৎ মিটারে BERC আবাসিক রেট (জুন ২০২৬) আগে থেকে বসানো: ০–৭৫ ৳৫.২৬, ৭৬–২০০ ৳৮.৫০, ২০১–৩০০ ৳৯.১০,
  ৩০১–৪০০ ৳৯.৬২, ৪০১–৬০০ ৳১৫.০১, ৬০০+ ৳১৭.৩৫; VAT ৫%; ডিমান্ড চার্জ ৳৪২ × অনুমোদিত কিলোওয়াট;
  লাইফলাইন: মাসে ৫০ ইউনিট বা কম হলে সব ইউনিট ৳৪.৬৩।
- BPDB ডিজিটাল (প্রিপেইড) মিটার: মিটার যোগ করার সময় বা পুরনো মিটারের "রেট" স্ক্রিনে টিক দিন।
  তখন এনার্জি চার্জে ০.৫% রিবেট এবং মাসিক মিটার ভাড়া (সিঙ্গেল-ফেজ ৪০, থ্রি-ফেজ ২৫০) ধরা হয়।
- "দ্রুত বিলের হিসাব" বক্সে ইউনিট লিখলেই আনুমানিক বিল দেখায়। দুটি রিডিং দিলে ব্যবহার ও বিল রিডিং তালিকায় আসে।
- "রেট" স্ক্রিনে "🇧🇩 বাংলাদেশ রেট বসান ও সেভ করুন" বাটনে পুরনো মিটারেও রেট বসে। আগে অনুমোদিত লোড (kW) লিখুন।
- গ্যাস ও পানির সরকারি রেট আগে থেকে বসানো নেই; নিজের বিল দেখে দিন।
- এটি আনুমানিক হিসাব: বকেয়া, নির্ধারিত সময়ে পরিশোধের রিবেট, রাউন্ডিং ধরা নেই, আসল বিল সামান্য আলাদা হতে পারে।
  সরকার রেট বদলালে "রেট" স্ক্রিনে নিজে ঠিক করুন।

== ৭. নিরাপত্তা (বিল্ডে নিজে প্রয়োগ হয়) ==
ইন্টারনেট শুধু লাইভ মুদ্রার রেট, আপডেট দেখা এবং (আপনি সংযুক্ত করলে) Google Drive ব্যাকআপের জন্য (HTTPS) | অ্যাপ ব্যাকআপ বন্ধ | ডিবাগ বন্ধ | স্ক্রিনশট/রিসেন্ট প্রিভিউ বন্ধ
AES-256 এনক্রিপশন (পাসওয়ার্ড দিলে) | ভুল পাসওয়ার্ডে ক্রমবর্ধমান অপেক্ষা
Excel/CSV/রিপোর্ট ফাইল এনক্রিপ্টেড নয়; কাজ শেষে মুছে দিন।
IN_APP_INSTALL: android.yml-এ "false" করলে অ্যাপ শুধু Release পাতা খোলে (ইনস্টল প্লাগইন ও REQUEST_INSTALL_PACKAGES বাদ)।

== ৮. ১.৪.১ — Google Drive ব্যাকআপ (Google দিয়ে সাইন-ইন) ==
- "আরও → ব্যাকআপ ও সিঙ্ক" এ Google Drive কার্ড: পাসওয়ার্ড দিয়ে "Google দিয়ে সংযুক্ত করুন" চাপলে Google অ্যাকাউন্ট বেছে অনুমতি দেওয়া যায়। অ্যাপে কোনো Client ID/Secret বসে না।
- একবারের নিবন্ধন (আপনি ডেভেলপার হিসেবে): Google Cloud-এ প্রজেক্ট → Drive API চালু → OAuth consent screen (Publish app) → OAuth client ID, ধরন Android, Package name com.family.budget, SHA-1 = বিল্ডের "Verify the APK signature" ধাপের লগে সার্টিফিকেটের SHA-1। সাইনিং কী বদলালে SHA-1 আবার দিতে হবে।
- "এখনই ব্যাকআপ": Drive-এর আগের ব্যাকআপ নামিয়ে ফোনের ডেটার সাথে মার্জ করে নতুনটি আপলোড করে; আগের কপি আলাদা ফাইলে থাকে।
- অটো: অ্যাপ খোলা থাকলে দিনে একবার। অ্যাপ বন্ধ থাকলে চলে না। Google আবার অনুমতি চাইলে অ্যাপ খুলে হাতে ব্যাকআপ দিন।
- শুধু অ্যাপের লুকানো ফোল্ডারে (drive.appdata) যায়; ফাইল পাসওয়ার্ডে এনক্রিপ্টেড। রিসিটের ছবি ও ভল্ট এতে নেই — ওগুলোর জন্য "ব্যাকআপ তৈরি ও শেয়ার"।
- ১.৪.২: পাসওয়ার্ড ঐচ্ছিক। ফাঁকা রাখলে ফাইল এনক্রিপ্ট হয় না (শুধু অ্যাকাউন্টের লুকানো ফোল্ডারে থাকে)। যে কেউ নিজের Gmail দিয়ে সংযুক্ত করতে পারে — এজন্য Google Cloud-এ অ্যাপটি অবশ্যই "Publish app" (In production) করা থাকতে হবে, নইলে শুধু Test user-রা পারবে।
- ১.৪.৩: Drive কার্ডে এখন একটাই বাটন; পাসওয়ার্ড "উন্নত" অংশে লুকানো, ফাঁকা থাকলে এনক্রিপশন ছাড়া।

== ২.১.০-এ যা বদলেছে ==
ফিক্স: অ্যাপ আপডেট চেক — (১) package.json-এর version না বাড়ালে GitHub Release তৈরি হয় না, এখন Actions-এ স্পষ্ট warning আসে; সাইন-কী secret না থাকলেও warning আসে।
       (২) ৪-অংশের ভার্সন (যেমন 2.0.0.1) এখন তুলনা হয়; অ্যাপ সামনে এলেও আপডেট চেক হয়। নিয়ম: প্রতিবার নতুন বিল্ডে version বাড়ান (যেমন 2.1.1)।
ফিক্স: "আরও" মেনুর দৈনিক জীবন ও পরিবার হাব, হোমের ওয়ালেট স্ট্রিপ ও ক্যালেন্ডার এক্সট্রা দেখাচ্ছিল না — ঠিক করা হয়েছে।
ফিক্স: ট্রান্সফার ফি ওয়ালেট ব্যালেন্সে দুইবার কাটছিল; ট্রান্সফার মুছলে ফি-র খরচও মুছে যায়।
ফিক্স: ফোকাস টাইমার স্ক্রিন বন্ধ করলে থেমে যেত — এখন ঘড়ির সময় ধরে চলে ও অ্যাপের বাইরেও অ্যালার্ম বাজে।
নতুন: "আরও → দৈনিক জীবন ও পরিবার হাব"-এ প্রতিটি অপশনের আলাদা সারি; ডাক্তার ভিজিট ও প্রেসক্রিপশন ছবি; শিশুর গ্রোথ কার্ভ (WHO রেফারেন্সসহ);
      BP/সুগার ট্রেন্ড; ওয়ালেট ব্যালেন্স ফ্লো; মাসিক রিপোর্টে ওয়ালেট/স্টাফ/ধার; বাজার ও কাজের WhatsApp/কপি কার্ড; ওষুধ, মেয়াদ, সার্ভিসিং, অনুষ্ঠান ও ফলো-আপের নোটিফিকেশন।

== ২.২.০-এ যা বদলেছে ==
আরও: মাল্টি-ওয়ালেট হাব আলাদা সেকশন; "দৈনিক জীবন ও পরিবার হাব" নামে ট্যাপ করলে খোলে/বন্ধ হয়; "সতর্কতা ও পরামর্শ" আলাদা স্ক্রিন।
হোম: সতর্কতা ও পরামর্শ কার্ড সরানো হয়েছে (আরও ট্যাবে লাল সংখ্যা দেখায়); "এক ট্যাপে খরচ" সম্পূর্ণ বাদ; আজকের সেরা ৩ কাজ ওয়ালেটের ঠিক নিচে; আয়/খরচ/সঞ্চয় কার্ড ছোট।
ব্যাক: পেছনের বাটন বড়; ফোনের ব্যাক চাপলে আগের স্ক্রিনে ফেরে (হোমে দুইবার চাপলে বের হয়)। এর জন্য package.json-এ @capacitor/app যোগ হয়েছে।
দ্রুত লিখুন: "ডিম ১০০", "রিকশা ৫০", "napa ২০" লিখলেই নিজে খাত বেছে খরচ যোগ হয়; একসাথে অনেক আইটেম দিলে বাজারের জিনিস বাজারে, বাকি খাতভেদে আলাদা খরচ। ➕ ডায়ালগে নোট লিখলেও খাত সাজেস্ট করে।
লেনদেন: তালিকার ওপরে ক্রেডিট (আয়ের এন্ট্রি) ও ডেবিট (খরচ) মোট।
শিশুর মাপ: ✎ এডিট ও 🗑 মুছুন।
ওয়ালেট লোগো: bKash/Nagad/Rocket/Upay ব্র্যান্ড-রঙের ব্যাজ; অফিসিয়াল লোগো দিতে www/logos/ ফোল্ডারের README দেখুন।


VERSION 2.3.0 FEATURE UPDATE
- Financial Assets Vault in More with separate PIN/passcode, encrypted storage, optional biometric unlock, categories, editable assets and risk colors.
- Transactions now show credit/debit totals.
- Compact Bangladesh/international daily headlines strip on Home.
- Custom theme colors and Advanced Calculator mode (scientific, matrices, age/date, unit, currency and weather tools).
- Monthly summary decorative circles removed; More/back controls enlarged.
See RELEASE_NOTES.md for details and limitations.


== ২.৪.০ — Daily Life Toolkit ==
- অফলাইন Prayer times: Karachi Fajr/Isha 18°, Hanafi Asr, district correction, next prayer countdown, Sehri/Iftar estimates; GPS/manual coordinates and Qibla sensor. (Printed Islamic Foundation table verification pending; local mosque timings should be followed.)
- Today dashboard: next prayer, weather, bills, tasks, bazaar and reminders in one place.
- Open-Meteo weather, rain-probability warning at user-selected commute/bazaar time, current air quality, GPS/manual coordinates. Internet required; weather notification is scheduled after a successful fetch and app use.
- Cross-app search for transactions, notes, tasks, bazaar entries, document titles, events and reminders.
- Ramadan fast tracker, start-date countdown and user-entered Live Facts fitra amount.
- Birthdays/anniversaries with annual countdown, Bangla/Hijri date estimates and gift budgets.
- Emergency call list (999, 102, 333, 109, 1098, 1090, 106, 105, 16430, 16263, 16123) and SOS SMS composer with location link; sending remains user-confirmed.
- Offline natural-language reminder parsing (typed); voice transcription depends on device speech service. Android local notifications supported where permission is granted.
- Camera/document capture to local multi-page PDF; images are processed on-device.
- DAM market Live Facts collector and daily GitHub Actions job (08:00 Bangladesh time). Parser covers the DAM public commodity summary only; specific district/market report parsing needs a sample report and is not guaranteed. The ZIP starts with a web-verified 20 Nov 2026 public-summary snapshot; unit details are not in the extracted snapshot.


SECURITY HARDENING — VERSION 2.5.0
- Main encryption and document vault require 12+ character passphrases for new setup.
- Financial Assets Vault upgraded to 400,000 PBKDF2 iterations for new vaults; legacy vaults remain readable using stored/default legacy iteration settings.
- Asset Vault has progressive failed-attempt lockout.
- Google Drive backup requires main app encryption plus a 12+ character backup passphrase; legacy plaintext backups pause until reconnection/migration.
- Removed the repository debug signing keystore. Release APKs require signing secrets; debug builds use ephemeral runner keys and are not released.
- Added security policy tests, npm audit CI gate, Dependabot and SECURITY.md.
- Review SECURITY.md for limitations and safe-use recommendations.


DEPENDENCY SECURITY UPDATE (v2.5.1)
The package manifest adds overrides for glob, minimatch, rimraf and tar to address the audit output without forcing a Capacitor CLI major-version upgrade. The CI audit is intentionally retained as a gate. Registry resolution/audit was not available in the editing environment; the first GitHub Actions run is required to confirm the override versions.
