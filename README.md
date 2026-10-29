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
- Standalone PWA source version: **v1.3.0** (29 Oct 2026), with relationship-first personal messaging and separate reply/UW stages.
- The v1.3.0 backend source is implemented here, but **not deployed by a GitHub change**. Update the existing Google Apps Script web-app deployment deliberately before treating the reply workflow as live. The app reports unknown actions if the backend is older.
- `backend/Code.gs` is a version-controlled copy. The live Google Apps Script is a separate deployment and must be deliberately authorised and updated.
- Update the app version, `CHANGELOG.md` and service worker cache together for any behaviour, UI or identity change.
- Keep the previous Appointment Companion-hosted PWA available until the new install has been tested end-to-end.

## Development
See `AGENTS.md` for guardrails and `backend/SETUP.md` for Google CRM setup.

## v1.3.0 relationship-first workflow
1. Capture the prospect and saved screenshot evidence (do not browse LinkedIn URLs).
2. Read the ChatGPT handoff: supportive comment when relevant, standard connection request without a note, and an authentic first **personal** DM when appropriate.
3. Only mark the comment, connection or DM as sent when you actually did it. The labels distinguish personal DMs and UW DMs.
4. If the person replies, open their Pipeline card and select **💬 They replied!**. Paste the actual response, confirm, and copy the resulting fresh handoff prompt. The handoff contains the full saved relationship history.
5. Retrieve the stage-specific ChatGPT response. Only consider a UW introduction when the conversation provides a legitimate reason. Historical/untyped DM entries are labelled legacy rather than silently treated as personal-first.

The original `Suggested first DM - Draft` Conversation History type is preserved for old clients; new personal-first handoffs append it alongside `Suggested first personal DM - Draft`. The backend retrieves the typed draft preferentially, but falls back to older entries. No existing prospect or sent-action history is migrated or deleted.

Run `node --test tests/*.test.cjs` as the automated non-destructive regression suite. Deploy the Apps Script source separately using `backend/SETUP.md` and check a dummy/test prospect before using the reply actions on real people.
