---
title: "Reference implementation — Agentic Drone Dashboard runtime"
doc_type: "Handbook"
version: "0.2.0"
date: "2026-09-27"
lang: "en-US"
owner: "Engineering"
continuity_id: "agentic-drone-dashboard"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: true
worktree_id: "agent/device-0232231d4a19/drone-dashboard"
agent_id: "codex-root"
---
# Reference implementation — local runtime

Run `npm ci --ignore-scripts --no-audit --no-fund` once, then `npm run dev` from the admitted checkout. Open the printed `http://127.0.0.1:4199/`. `DRONE_DASHBOARD_PORT` changes the port. The server binds loopback and serves only `app/`; it has no write or device endpoints. This source increment is a local composition baseline, not full PRD acceptance.

## Reference implementation — use

1. Open **Owner connections**. Graph defaults to the existing local `http://127.0.0.1:4198/`; set the actual owner address if different. The default native document is `docs/python-lessons/04-drone-flight-and-landing.py`. Set the exact Source Files mission manifest path and the real GameXR gateway URL when available. The historical malformed port-54842 URL is deliberately not guessed or reused.
2. **Load native Graph** mounts the owner's existing workspace. Choose its Python/Block/JSON panes, FloatingPanel Block Library, 2D Dashboard renderer or Surface Mode → XR with native controls. The host's tabs select the composition context; they do not claim to change unsupported owner modes remotely. Close removes the frame. Hiding the host tab closes it and requires a fresh explicit Load.
3. Finish/land in Graph and export the original JSON flight path. Import it into **Path handoff**. The dashboard checks only the portable metadata envelope and hashes the original UTF-8 bytes; Graph/GameXR own sample validation, simulation and execution. Save the unchanged file and explicitly import/review it in GameXR. There is no background receiver connection or Run call.
4. For recorded 3D preview, use Graph Results' native Canvas snapshot link in **Flight replay**. It must match the configured Graph origin/base and bounded `kgLearningCanvas=drone#flight=...` contract. Graph owns replay admission and rendering. This standalone 3D preview is not proof of an integrated native XR widget or headset support.
5. Select each of the six fixture inspection points, attach a PNG/JPEG/WebP below 500 kB, label operator import or synthetic provenance, and review the image. These are reference annotations, not route coverage, calibrated pose or automated diagnosis. The current fixture has no measured positions, timestamps or camera-trigger mapping. Receiver position remains unobserved.
6. **Export dossier** prepares a visible Save link and inspect/copy JSON fallback. Reopen the JSON to recover point reviews and digest references. Keep images and the original path alongside it: they are not embedded. Imported claims remain self-reported; reattach originals to inspect their bytes. Changes are held in the tab until exported. A malformed import preserves the existing dossier; a new path import clears its previous path identity before validation.
7. **Prepare offline shell** caches only this host. Graph/GameXR require their own provisioning and availability. First installation still needs the host server. File exports remain the persistence boundary; shell caching does not persist dossier edits.

## Reference implementation — invocation

`npm run mcp` starts a newline-delimited JSON-RPC stdio MCP server. It exposes `drone_dashboard.inspect` and `drone_dashboard.resolve_owners`; no arbitrary browser, shell, file, receiver, axis or arm command is accepted. MCP inspects a caller-supplied dossier or an empty fixture, never another browser's hidden state. Initialization negotiates the server's supported `2024-11-05` protocol version.

The browser registers the same schemas through available `document.modelContext` or the earlier `navigator.modelContext` surface. The inspect default reads this visible local dossier. Registration failure/unavailability is shown. `/drone.inspect @dashboard #mission` uses that same read-only function in the visible invocation field; `/drone.owners @dashboard #reuse` is the discovery label for the structured resolver, not an implemented free-text resolver command. Native Graph and GameXR tool schemas are not falsely forwarded across origins.

Standards consulted: [current WebMCP draft](https://webmachinelearning.github.io/webmcp/) and [MCP transport documentation](https://modelcontextprotocol.io/specification/2024-11-05/basic/transports). Cross-browser WebMCP support is not inferred from one browser registration.

## Reference implementation — source, release and rollback

The maintainer-approved bootstrap PR [#3](https://github.com/huijoohwee/81rv10/pull/3) merged as `d1c1caa6d2a59ba2ffecf02b9acb34512215a342` after exact `test` and `budgets` success. `main` now requires those strict checks, PR integration and enforced administrator protection; force push/deletion are disabled. Native setup created clone-local trust and hooks, and doctor observed the selected provider facts. Normal START then admitted `agent/device-0232231d4a19/drone-dashboard` on that base. No hand-authored private trust record was used.

Publication uses `npm run check:plan`, `npm run check`, then `npm run release:common -- publish --message="feat: add local drone scouting dashboard"`. Exact provider merge and native completion remain separate effects. An open PR is not source integration or public deployment. Hosted jobs use standard Ubuntu runners in the public repository, with no artifact/cache uploads; [GitHub's billing rules](https://docs.github.com/en/billing/concepts/product-billing/github-actions) state those standard public-repository minutes are free. Billing configuration and paid services are unchanged.

Local rollback: export the dossier, close the native frame, stop only this dashboard's Node process, and restart the prior verified source if one exists. This is the first dashboard increment; there is no previously deployed dashboard. Source rollback uses a new protected revert PR. Disable/revoke only this app's service worker through browser site controls if removing its cache is desired. Native owners and stored source programs retain their independent state. Do not remove worktrees while their dev process is running; cleanup is a separately receipted action.

No remote deployment controller or device firmware is part of this increment. Nothing flashes, arms, pilots, diagnoses a crop, contacts a buyer or collects money. Current Graph source/build licenses block distributed bundling; the host frames separately configured native surfaces without incorporating their code. New host source is MIT; external owners retain their licenses. Real S3 hardware/controller/localization/clearance and farm evidence remain prerequisite work.

## Reference implementation — checks and limits

Automated: the native repository validation owner runs bootstrap identity/pin/plan tests plus 10 consumer contract tests covering malformed evidence, false physical/receiver claims, UTF-8 byte identity, owner/replay URL boundaries, unsupported mutations, actual stdio initialization, and HTTP root/write restrictions. Per-file budgets enforce <600 lines and <500 kB. These checks do not validate Graph/GameXR runtime parity or real flight.

Browser observations: native Graph editor mounted; native close and keyboard point selection worked; 390×844 and 1280×800 document/scroll widths matched; corrupt PNG rejected; valid synthetic PNG enabled a follow-up review; live WebMCP inspection returned the expected fixture state; prepared dossier JSON was read back, copied and reopened; the cached shell reloaded while its local server was stopped. The browser's blob-download observation timed out, so native file-save completion is unverified in this browser; the tested JSON copy/reopen route is available. Real-phone, zoom/screen-reader, memory/fps and receiver tests remain open.
