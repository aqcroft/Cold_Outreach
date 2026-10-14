# Cold Outreach - independent UW Partner PWA

**New PWA address:** https://aqcroft.github.io/Cold_Outreach/

This is Cold Outreach's own GitHub repository, separate from Appointment Companion. It has an independent manifest, ice-cube UW icon, installation identity, scoped service worker, source control and release process.

## Publish on GitHub Pages
1. Open [Settings - Pages](https://github.com/aqcroft/Cold_Outreach/settings/pages).
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Select **main** and **/(root)**, then **Save**.
4. When GitHub shows the published URL, open https://aqcroft.github.io/Cold_Outreach/ in Chrome on Android.
5. Use **Install app** and check that the **Cold Outreach** ice-cube home-screen app appears independently of Appointment Companion. This version provides Android-compatible 192px and 512px PNG icons.
6. Open the installed app, test **CRM connection**, **Pipeline**, a prospect, and a handoff. Keep the previous install until this is working.

## CRM and settings
- Existing `Cold Outreach CRM v1` Sheet, Google Drive screenshots and sandbox account Apps Script backend remain unchanged and in their original locations.
- Same browser storage keys: `acOutreachBackendUrl` and `acOutreachBackendKey`. The old and new GitHub Pages sites share origin `aqcroft.github.io`, so settings may carry across within the same browser/profile. Verify before assuming.
- No CRM records are moved or deleted. A user on a different browser/device may need to re-enter their CRM backend URL and workspace key.
- Never commit OAuth tokens, workspace keys, screenshot evidence, or prospect personal data into GitHub.

## Release and upgrade process
- Current stable standalone install baseline: **v1.2.2** (14 Oct 2026).
- Prospect record v1.3.0 and the sandbox Apps Script deployment workflow are being preserved as **separate proposed changes**. The v1.3.0 backend is *not* deployed by moving the PWA.
- `backend/Code.gs` is a version-controlled copy. The live Google Apps Script is a separate deployment and must be deliberately authorised and updated.
- Update the app version, `CHANGELOG.md` and service worker cache together for any behaviour, UI or identity change.
- Keep the previous Appointment Companion-hosted PWA available until the new install has been tested end-to-end.

## Development
See `AGENTS.md` for guardrails and `backend/SETUP.md` for Google CRM setup.
