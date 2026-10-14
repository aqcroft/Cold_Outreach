# Cold Outreach - standalone PWA development instructions

This repository is the **independent** Cold Outreach application published at `https://aqcroft.github.io/Cold_Outreach/`, not a child of Appointment Companion. Keep manifest `id` at `/Cold_Outreach/`, start URL, and service worker scope for this independent PWA stable after installation.

- Every UI, code or behaviour change must increment the in-app semantic version, append `CHANGELOG.md` and update the service-worker cache version.
- Maintain existing `acOutreachBackendUrl` and `acOutreachBackendKey` browser localStorage keys and the current Google Apps Script CRM/Drive and ChatGPT handoff contracts.
- `backend/Code.gs` mirrors a separately deployed Google sandbox Apps Script. Do not change production backend deployments as a side effect of changing the PWA.
- Preserve the existing CRM spreadsheet, screenshot files, handoffs, and prospect history; do not delete or migrate user data as part of this repo split.
- Never check in `.clasp.json`, `.clasprc.json`, OAuth tokens, workspace secrets, CRM responses, or prospect screenshots.
- Never cache personal prospect data, screenshots or credentials in the PWA service worker. Maintain the separate ice-cube + UW branding.
- Keep a rollback route to the original PWA until the Android install is independently verified.
