# Cold Outreach - standalone PWA development instructions

This repository is the **independent** Cold Outreach application published at `https://aqcroft.github.io/Cold_Outreach/`, not a child of Appointment Companion. Keep manifest `id` at `/Cold_Outreach/`, start URL, and service worker scope for this independent PWA stable after installation.

- Every UI, code or behaviour change must increment the in-app semantic version, append `CHANGELOG.md` and update the service-worker cache version.
- Maintain existing `acOutreachBackendUrl` and `acOutreachBackendKey` browser localStorage keys and the current Google Apps Script CRM/Drive and ChatGPT handoff contracts.
- `backend/Code.gs` mirrors a separately deployed Google sandbox Apps Script. Do not change production backend deployments as a side effect of changing the PWA.
- Preserve the existing CRM spreadsheet, screenshot files, handoffs, and prospect history; do not delete or migrate user data as part of this repo split.
- Never check in `.clasp.json`, `.clasprc.json`, OAuth tokens, workspace secrets, CRM responses, or prospect screenshots.
- Never cache personal prospect data, screenshots or credentials in the PWA service worker. Maintain the separate ice-cube + UW branding.
- Keep a rollback route to the original PWA until the Android install is independently verified.

## Relationship-first outreach policy (v1.3.0 and later)
- **Default:** public supportive comment (when relevant), normal LinkedIn connection without a note, then a genuinely personal first DM. Do not automatically propose a Utility Warehouse DM.
- First messages should be based on evidence-backed shared interests, lived experiences or sincere observations; no CV recitation, invented common ground or thinly disguised prospecting.
- After Adrian confirms a prospect reply, append it to the same CRM prospect and generate a fresh handoff with their actual response and full conversation history. Recommend continued conversation, further discovery, permission-based UW introduction, or no UW as appropriate.
- Direct UW first messages are permitted ONLY with a clear reason such as an explicit UW enquiry, an existing UW conversation, or clear interest in additional income. Preserve Gold Standard 1: UW alongside work, family and job search, not a replacement for career goals. An easy no is mandatory.
- CRM types: `Suggested first personal DM - Draft`, `Suggested follow-up response - Draft`, `Potential UW introduction - Draft`, `Suggested first UW DM - Draft`, plus original `Suggested first DM - Draft` as a backwards-compatible alias for the first personal message. Never overwrite/delete historic entries. Older untyped first DM entries are LEGACY and must not be assumed to be personal or already sent.
- Sent statuses are separate: `First personal DM sent`, `First UW DM sent`, `Last prospect reply`. Only change these on explicit user confirmation or reply submission. Never mark drafts as sent.
- New CRM fields are append-only, added via ensureProspectHeaders. Never create a second prospect for a recorded reply; match by capture ID then saved LinkedIn profile/name.
- Keep screenshot-only evidence policy and do not browse LinkedIn links from handoff files.
- Test all changed flows in `tests/relationship-first.test.cjs`, especially the Allen Cook esports / Discovery Trust regression, typed draft retrieval and idempotent reply recording.
- **Deployment boundary:** GitHub Pages serves the frontend; `backend/Code.gs` is a repository copy, NOT the deployed Apps Script. A release is end-to-end only after the existing Google Apps Script deployment is updated separately and tested against the real CRM. Do not expose or commit credentials.
