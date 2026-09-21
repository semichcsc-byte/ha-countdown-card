# PROJECT_CONTEXT

Project: HACountdown
Goal: Develop and maintain the `ha-countdown-card` custom Lovelace card for Home Assistant (countdown + timer + Waze travel time).
Repository: https://github.com/semichcsc-byte/ha-countdown-card
Preferred MCPs: personal.github
Daily-only actions: read/search/list/summarize repo, build (`npm run build`), local test via `test.html`
Elevated actions allowed: commit and push to own repo (with explicit confirmation phrase), publish releases (with explicit confirmation phrase)
Forbidden actions: force-push, delete branches/tags, rewrite published history, install dependencies globally
Environment: dev (local) + distributed via HACS to Home Assistant users
Notes:
- Single-file build output in `dist/` produced by Rollup (`rollup.config.mjs`).
- Source lives under `src/`; `countdown-card.js` at repo root is the legacy/entry artifact.
- HACS metadata in `hacs.json`.
- Not tied to any specific personal HA instance (HASerge / HAMario / HABruno); changes here do not require touching those workspaces.
