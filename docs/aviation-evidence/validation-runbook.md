---
title: "Aviation Evidence — validation and local runbook"
doc_type: "Handbook"
version: "0.3.2"
continuity_id: "aviation-evidence-layer"
source_revision: "aviation-evidence-layer@0.3.2"
date: "2026-10-04"
owner: "Engineering and independent evaluator"
---
# Validation and local runbook

This [joined-plan](prd-tad-adr-mvp-gtm.md) section preserves published0.3.1 repair proof without treating it as0.3.2 corpus acceptance. Seven adapter tests and bounded real-corpus browser checks passed; 61 tests and budgets passed; publication pending. VCC-5 remains partial; all11 conditions and deferred thresholds are unchanged.

## Local operation

1. Work in the native admitted checkout. Install the lockfile dependencies using the repository's supported Node ≥22 environment; use `npm ci --ignore-scripts --no-audit --no-fund` when installation is required.
2. Run `npm run dev`; open the exact loopback URL printed by the server. Use the aviation page supplied by the implementation. Do not guess another process's port or expose the server externally.
3. In Evidence workspace choose **Load Singapore flight observations**, **Load synthetic example**, or **Import evidence bundle or pack**. The real sample has117 facts/1 source, entity `76b452`, observed `2026-10-03T10:37:19.240Z`–`10:52:12.830Z`;5 fields remain unknown. The synthetic control has13 facts/2 sources and entity `synthetic-flight-01` at `2026-01-01T12:00:00Z`–`12:02:30Z`. Confirm classification, attribution, profile/revision, original digest and gaps. **Paste JSON instead → Inspect pasted JSON** rejects invalid Unicode without changing accepted data.
4. Choose the entity and **Replay time (UTC)**, then **Replay moment**; **Recorded moment**, **Previous moment** and **Next moment** select authored times. Inspect source/time/unit labels, conflict/missing indicators and stale status. Equal query inputs must yield the same canonical result.
5. Choose **Prepare verifiable export → Save evidence pack**, save locally and reimport through the same file input. If direct download is unavailable, expand **Copy export JSON → Copy portable pack**, save that exact JSON as `evidence-pack.json`, then choose the file. Compare original-byte and derived identities. The published0.3.1 synthetic clipboard/file/chooser path was verified;0.3.2 actual-chooser round trip was observed, and direct in-app download observation previously timed out. A prepared link is not completed download evidence.
6. Save current evidence before preparing the offline shell. Preparation explicitly checks for a worker update and waits for activation; after success, save any remaining changes and reload to use that revision. Cache success does not persist unsaved session data or establish offline first installation.
7. Reset/delete clears the selected session. Keep only the local files that the operator is entitled to retain. Stop only the dev process started for this checkout.

Shared declarations in `app/tools.mjs` own `aviation.inspect({bundle})` and `aviation.replay({bundle,flightId,atUtc})`; `bundle` is a UTF-8 JSON string. Aliases `/aviation.inspect @evidence #flight` and `/aviation.replay @evidence #flight` share typed context. CLI: `node mcp.mjs --invoke` or `npm run --silent evidence`, one stdin JSON object `{"name":"aviation.inspect","arguments":{"bundle":"<original JSON string>"}}`; serialize JSON, never interpolate untrusted text into shell. Replay adds flightId/atUtc. `npm run mcp` uses stdio protocol2024-11-05; unsupported revisions fail.

For the separate demo select **Flight Sim demo → Load native workspace**. Authored `workspaces.json` supplies Graph4213 and `kgDoc=docs/workspace-seeds/agentic-graph-game-flight-sim-demo.md`, `kgPreview=1&kgLiveHero=1`. Verify the document/HUD, then **Close native workspace**. **Open source workspace** uses plain kgDoc. Graph's source, simulation and external assets remain separate from aviation/offline proof.

## Six Must verification conditions

The predecessor's VCC identities are retained. Commands are implementation-owned; the table defines checks, not fictitious executable names.

| VCC | Required observation | Minimum meaningful negative/control |
|---|---|---|
| VCC-1 record | All accepted facts expose source, time and units; null/gaps/conflicts remain explicit | Malformed UTF-8/JSON/schema, byte/fact/flight/time bound, duplicate ID, bad UTC, nonfinite/out-of-range coordinate, unknown unit or incompatible datum rejected before replacement |
| VCC-2 replay | Two offline executions of equal accepted bytes/profile/algorithm/query yield equal canonical bytes; declared ordering survives shuffled facts/ties | Future facts excluded; before-first query empty/explicit; gaps and staleness visible; no interpolation/clock/random/network; changed revision changes identity |
| VCC-5 device/offline | Clean setup ≤60min; provisioned record ≤15min/3 main actions; desktop and 360–430px mobile complete readable keyboard/touch replay/export offline | Offline reload, cache failure and storage failure stated; no external tiles; zoom/reduced-motion/focus/non-colour status observed; distinguish actual device from emulation |
| VCC-6 zero-spend/bounds | Import/inspect/replay/export invoke zero models and billed APIs; record runtime network/counters and exact resource sizes | Fail a deliberately unexpected transport/config path; new modules and emitted resources below caps; authoring cost excluded from serving claim |
| VCC-8 pack/concurrency | Original bytes/digest survive export/reimport; derived digest binds accepted content/profile/algorithm | Tampered originals or claimed digest fail; malformed replacement preserves accepted state; earlier delayed selection cannot overwrite newer accepted state |
| VCC-11 parity | Module/UI/CLI/MCP and available WebMCP return equivalent typed inspection/replay for equal inputs; unavailable WebMCP has visible fallback | Unsupported protocol/tool/extra argument/mutation rejected; no writes/spawn/network; distinguish adapter parity from arbitrary external clients |

VCC-3/4/7/9/10 remain deferred under the joined plan; neither a synthetic test nor this single observed segment closes their independent-label or qualified-corpus conditions.

## Independent evidence register

Implementer supplies the reproducible command and inputs. A separate evaluator mechanism checks the produced result; implementer assertion is not independent acceptance. Record negative results as well as successes.

| Evidence ID | Scope / exact inputs required | Status |
|---|---|---|
| AEL-SOURCE | Commit/tree, clean-state observation, profile/fixture SHA-256, tool declaration revision, dependency lock, resource inventory | Published00de702/tree2d44626/PR7;0.3.2 source/corpus identities below, exact publication pending |
| AEL-CONTRACT | VCC-1/2/8; exact command and actual stdout/exit/time; deterministic and rejection cases | Published0.3.1:54/54 repair checks;0.3.2 seven adapter tests passed; 61 tests/budgets passed |
| AEL-PARITY | VCC-11; same fixture/query across each supported adapter; actual MCP initialize/call and visible fallback | Published0.3.1 v2 synthetic parity passed;0.3.2 UI/WebMCP canonical equality at10:48:27.060Z; 61 native tests passed |
| AEL-DEVICE | VCC-5; browser/version/OS, desktop/mobile widths, keyboard/touch/zoom/preferences, screenshots/readback, elapsed/actions | Partial; clean predecessor install and fresh-origin provision observed; full setup/primary export timing, phone/touch/full zoom pending |
| AEL-OFFLINE | Provision online → disconnect/block network → reload → import/replay/export/reimport; all requests and cache status recorded | Published0.3.1:11/11 worker responses/0 external;0.3.2:11/11 worker responses/0 external; real-sample reimport observed |
| AEL-EFFECTS | VCC-6; zero runtime model/billed API paths, blocked unexpected network, source/config scan, emitted bytes/module count | Published0.3.1 serving calls0/JS67,987B;0.3.2 observed0 external requests; JS68,402B (+415B), offline adapter7,324B; native budgets passed |
| AEL-RECOVERY | Corrupt/stale input recovery; selected-session reset; originals restored with equal identity; exact shell predecessor recovery | Published0.3.1 repair controls passed;0.3.2 old-v2-pack identity verified; corrupt-source tests passed |
| AEL-RELEASE | Native check:plan/check receipts, exact publication/PR and protected integration; deployment separate | Published00de702/PR7 with green synthetic-merge CI;0.3.2 pending; no protected merge/deploy |

Focused entry points: `node --test test/evidence-core.test.mjs` and `node --test test/evidence-tools.test.mjs test/contracts.test.mjs`; published0.3.1 `npm run check` executed54 tests and budgets. Seven focused adapter tests now pass; 61 successor tests and budgets passed. Core exports are `admit(bytes,profile)`, `inspect(handle)`, `exportPack(handle)`, `originalBytes(handle)` (copy), `canonicalJson(value)`, `createSession(profile)` with read/import/clear, and `replay(handle,entityId,atUtc)`; adapters await admission/export rather than making a competing parser.

**Published predecessor proof:** [00de702 runbook](https://github.com/huijoohwee/81rv10/blob/00de702300d6369e304bd7d39a9e04d8ceb71a92/docs/aviation-evidence/validation-runbook.md) preserves54-test/browser receipts and all older failures. `output/aviation-completion-audit-20261004/publication-binding.json`, SHA-256 `39757f9600106c775cdbeab9555b44bce3915c2166edd90780e8f194e8700b63`, binds16 product files. [CI37166071733](https://github.com/huijoohwee/81rv10/actions/runs/37166071733) passed test/budgets at2026-10-04T00:48:39Z/00:49:13Z on synthetic merge `a9d4789d39cf5625d8ceabff58237f54b55da101`. No protected merge/deploy or complete phone setup/primary save follows.

**Current0.3.2 source checkpoint:** real bundle276,932B SHA-256 `e88ad4100e1ac1d164087e17c87d55190ccc13dd8fbf9e120c3a0ec2ec7b8926`, derived `4913a0c5fb4a3d3155f967807552f07435c3f0152a23555b341b2eef90b531e4`; source envelope digest `82ee633949cb9bcff6215eeb128af6a9f7c09a49268d0fb529d068833fa47055`. Raw upstream bytes/selection/rights are bound in the joined plan and `output/aviation-singapore-corpus-20261004/receipt.json` outside this source lane. 61 native tests/budgets passed; receipt `validation-receipt.json`, SHA-256 `b8ec097d986126033eff3160347dc620ebc379d1bc7ee3d38b1a9388ea5aaa91`; exact publication pending. Reproduce offline using `node scripts/import-readsb.mjs <retained-source.json> app/profiles/singapore-region.json <new-bundle.json>`; output must not exist. Compare exact bundle digest,117 facts,56 selected row pairs/5 unknowns and raw upstream hash. Reject altered SHA, stale/empty/oversized selection and malformed rows; no adapter fetch is required.

**0.3.2 browser checkpoint:** `output/aviation-singapore-corpus-20261004/browser-receipt.json` SHA-256 `0a3b2dc1a2dc1d5c835ac8eb77683e7edb7f3836152093edc941db6637a3a68d` records117 facts, Previous UTC10:48:27.060Z,390px/scrollWidth390, and UI-generated354,029B pack → actual file chooser → identical identities. Pack SHA-256 `f95ccd450d0e0f77841d47c3fb28a57982756c303f6324c490ee298842578073`; `browser-network.json` `4d94abac855ede5b4a94b9228830a04e18f12275453e5398762bee8c7db8709a` records11/11 worker responses/0 external. Screenshots: `singapore-desktop.png`, `singapore-mobile.png`. `browser-tool-parity.json` records canonical UI/WebMCP equality at10:48:27.060Z; `browser-cache-manifest.json` binds13/13 cached-resource hashes to source. Clipboard bridge failed; complete pack was read from DOM chunks and saved externally before chooser reimport. This is not primary download, copy-save or three-action export proof. Physical iPhone, native200% zoom and completed clean setup remain open.

Each receipt records schema/version, evidence ID, timestamp, source commit/tree, input hashes, environment, executed command, exit, assertions, negative controls, limitations, evaluator identity and artifact hashes. Do not use edited receipts as raw stdout. Hashes bind bytes, not truth. Browser screenshots accompany structured readbacks.

## 180-second demo

Rehearse with **Load Singapore flight observations**; name its2026-10-03 crowdsourced source, authored study bounds and observation limits. Keep **Load synthetic example** as a separately labelled conflict/rejection control. Keep unexpected failures visible and retain the previously accepted record.

| Beat | Seconds | Action / Reveal / acceptance |
|---|---:|---|
| Hook | 20 | State the Singapore–Riau historical segment, ODbL attribution and what observations cannot establish |
| Probe | 40 | Import real observations; show5 explicit unknown fields; use labelled synthetic control for conflicts; VCC-1 |
| Reveal | 40 | Run an equal-input replay twice and compare canonical identity; VCC-2 |
| Scrub and reproduce | 60 | Choose UTC, export/reimport, then reject a corrupt replacement while retaining accepted state; VCC-8 |
| Close | 20 | State what remains unknown and invite an authorized future case; no customer/prediction claim |
| Total | 180 | Time-box target, not an observed completion time |

For TTV, log start, setup completion, first accepted record, first useful replay, export verification, actions and interruptions separately. A rehearsed demonstration is not the clean-environment measurement. A participant success needs independent observation and consent.

## Browser and accessibility record

User target: **iPhone Safari**; physical device/iOS version and a phone-accessible secure URL remain unavailable. The server binds loopback only. Record version and a cleared test origin; time setup, provision/cache activation, first accepted real record, replay and actual Save-to-Files/reimport; count primary actions and OS chooser actions separately. Test physical touch, native200% zoom, keyboard/focus/reduced motion, then disconnect and reopen/replay/export/reimport; retain exact file hashes and network evidence. Desktop emulation cannot close these checks. Detailed steps remain in `output/aviation-singapore-corpus-20261004/region-safari-notes.md`; its proposed study extent is superseded by the authored0.3.2 config. [Safari17.2](https://webkit.org/blog/14787/webkit-features-in-safari-17-2/) supports JSON import attributes; [Safari26](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/) allows Home Screen web apps. [Storage may be evicted](https://webkit.org/blog/14403/updates-to-storage-policy/); retain exported files. These platform capabilities are not device proof.

Record device/viewport, table readability, accessible names/headings, keyboard/focus,44px targets,200% native zoom, reduced motion and non-colour status. Measure composited contrast; bounded checks do not establish WCAG certification. Provision before offline reload; identify whether data is cached or operator-provided. Exercise unavailable API/storage failure honestly; never clear unrelated origins.

## Check and release procedure

Run the repository's actual `npm run check:plan` and `npm run check` after affected tests; the repository validator owns required checks. Retain exact command outputs and predecessor failures. Once source changes, earlier receipts are historical unless a native mechanism explicitly grants reuse.

Publication is `npm run release:common -- publish --message="<reviewable change>"` through the parent release owner. This handbook authorizes no independent publication. An open PR, green checks, protected merge, local preview and production readback are separate outcomes. [Rights/recovery](rights-recovery.md) owns rollback prerequisites.
