# Cold Outreach CRM backend - one-time setup

1. Open the Google Sheet **Cold Outreach CRM v1**.
2. Extensions → Apps Script.
3. Replace the starter code with `backend/Code.gs`.
4. In Apps Script → Project Settings → Script Properties, add:
   - Property: `CRM_WORKSPACE_KEY`
   - Value: a long private passphrase of your choice.
5. Deploy → New deployment → Web app.
   - Execute as: Me
   - Who has access: Anyone
6. Copy the Web App URL.
7. Open the Cold Outreach tool → **CRM connection**.
8. Paste the Web App URL and the same workspace key, then tap **Test**.

The web app is deliberately hard-wired to the dedicated Cold Outreach CRM spreadsheet and its Drive folder. It does not browse the rest of Drive.

Current supported actions include:
- health, saveProspect, addEvidence, listProspects and getProspectOutput
- updateDraft for original and stage-specific Conversation History types
- markAction for confirmed comment, connection acceptance/request and separate personal/UW DM sends
- recordReply (new in v1.3.0) for confirmed replies and full-history handoff creation
- addHistory, screenshot upload and follow-up date updates

## Updating the existing Apps Script web app
The GitHub source under `backend/Code.gs` is **not automatically deployed**. The configured browser URL and workspace key belong to the existing sandbox Apps Script. To activate v1.3.0, update the code in the existing script project (retain its Script Properties and access to the existing Sheet/Drive), then **Deploy → Manage deployments → Edit the existing web app deployment → Version: New version → Deploy**. Keep the original deployment URL if possible. Never commit the workspace key or deploy to a different CRM accidentally.

Verify CRM health, then use a controlled test prospect to check retrieval of a personal draft, first-personal-DM sent confirmation, the `recordReply` handoff and a second retrieval of the new follow-up. Repeating the same reply event ID should not duplicate history. Do not use a real prospect as a smoke test. If verification fails, roll back the Apps Script deployment version before using the new Companion UI.

