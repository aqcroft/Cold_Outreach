# Cold Outreach Companion - Release notes

## v1.3.0 - 29th Oct 2026
- Made supportive comments, standard connection requests and genuinely personal first DMs the default cold/semi-cold sequence. UW is introduced only on evidence-backed relevance or an explicit enquiry.
- Replaced the actual backend-generated ChatGPT handoff instructions and included full existing conversation history and screenshots for new/revised prospect analysis.
- Added a clear **They replied!** workflow: record the actual response, protect the existing CRM identity, and create a fresh handoff for the next human conversation.
- Added separately typed draft retrieval for personal first DM, follow-up response, potential UW introduction and justified direct-UW exception. Retained **Suggested first DM - Draft** for backwards compatibility.
- Separated user-confirmed personal DM sent, first UW DM sent and prospect replied states, with idempotent reply handling and explicit sent-action confirmation.
- Added Allen Cook personal-first regression, CRM draft retrieval and no-duplicate reply tests; updated persistent development rules and offline cache version.
- **Deployment dependency:** the live Google Apps Script web app must be separately updated from the version-controlled backend for new reply and typed draft actions to work. GitHub Pages alone cannot activate those CRM changes.


## v1.2.2 - 14th Oct 2026
- Added real 192px and 512px PNG installation icons, rendered from the original ice-cube/UW vector artwork.
- Updated the independent PWA manifest and Apple touch icon to use PNGs, with an SVG fallback.
- Updated the app version, About text and service-worker cache without changing any CRM or sandbox Google backend data.

## v1.2.1 - 14th Oct 2026
- Migrated the working PWA into an independent GitHub repository and standalone GitHub Pages address.
- Changed the installation identity to `/Cold_Outreach/`, outside Appointment Companion's scope.
- Preserved Google CRM, screenshots, sandbox Apps Script deployment and existing browser connection keys without any Google data migration.
- Planned v1.3.0 prospect-record changes remain a separate upgrade and are not yet live.

## v1.2.0 - 14th Oct 2026
- Added a native installation button that appears only when Chrome offers the app's own install prompt, as a potential workaround for Chrome's overlapping-app installation menu.
- Added explicit 192px and 512px SVG icon variants to improve installability. (PNG fallbacks still advisable for broad compatibility.)
- Kept the app manifest identity, scope, CRM, cloud handoff and on-device settings unchanged.

## v1.1.0 - 14th Oct 2026
- Made Cold Outreach a distinct, installable standalone PWA with its own stable manifest identity, scoped service worker and home-screen icon (ice cube + UW badge).
- Added a dedicated app title, branding and About / release details.
- Cached only the static page shell for basic offline access; CRM saving and prospect retrieval still require an internet connection.
- Preserved existing CRM spreadsheet, Apps Script web app, Google Drive screenshot and ChatGPT handoff connections, and on-device saved connection settings.
- Kept the current `PWA/outreach/` URL so existing links and CRM handoffs continue to work.

## v1.0.0 - Pilot
- Relationship follow-up workflow: capture, CRM pipeline, follow-ups, screenshot uploads and ChatGPT handoff.
