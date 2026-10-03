---
title: "Aviation Evidence — validation and local runbook"
doc_type: "Handbook"
version: "0.3.0"
continuity_id: "aviation-evidence-layer"
source_revision: "aviation-evidence-layer@0.3.0"
date: "2026-10-04"
owner: "Engineering and independent evaluator"
---
# Validation and local runbook

This is a bounded section of the [joined plan](prd-tad-adr-mvp-gtm.md). VCC-1/2/6/8/11 pass bounded synthetic-fixture technical verification with46/46 tests and budgets; VCC-5 remains partial. Publication adds its exact committed identity/receipt separately. Full product/runtime acceptance is not claimed.

## Local operation

1. Work in the native admitted checkout. Install the lockfile dependencies using the repository's supported Node ≥22 environment; use `npm ci --ignore-scripts --no-audit --no-fund` when installation is required.
2. Run `npm run dev`; open the exact loopback URL printed by the server. Use the aviation page supplied by the implementation. Do not guess another process's port or expose the server externally.
3. In Evidence workspace, choose **Load synthetic example** or **Import evidence bundle or pack**. The authored fixture has13 facts, two synthetic sources and entity `synthetic-flight-01`, covering `2026-01-01T12:00:00.000Z`–`2026-01-01T12:02:30.000Z`. Confirm its synthetic label, profile/revision, original digest and explicit gaps. **Paste JSON instead → Inspect pasted JSON** rejects invalid Unicode without changing accepted data.
4. Choose the entity and **Replay time (UTC)**, then **Replay moment**; **Recorded moment**, **Previous moment** and **Next moment** select authored times. Inspect source/time/unit labels, conflict/missing indicators and stale status. Equal query inputs must yield the same canonical result.
5. Choose **Prepare verifiable export → Save evidence pack**, save locally and reimport through the same file input. If direct download is unavailable, expand **Copy export JSON → Copy portable pack**, save that exact JSON as `evidence-pack.json`, then choose the file. Compare original-byte and derived identities. The clipboard→saved file→actual file chooser→CLI path is verified; direct in-app download observation timed out. A prepared link is not completed download evidence.
6. Before going offline, explicitly provision the shell and confirm service-worker activation. Record and export the bundle separately. Cache success does not persist unsaved session data or establish offline first installation.
7. Reset/delete clears the selected session. Keep only the local files that the operator is entitled to retain. Stop only the dev process started for this checkout.

The existing root UI hosts the generic evidence view. Shared tools are `aviation.inspect({bundle})` and `aviation.replay({bundle, flightId, atUtc})`; bundle is a UTF-8 JSON string. Aliases are `/aviation.inspect @evidence #flight` and `/aviation.replay @evidence #flight`, consuming the same typed context. The single declaration in `app/tools.mjs` owns exact arguments.

For machine-readable CLI output, use `node mcp.mjs --invoke` or `npm run --silent evidence`, supplying one stdin JSON object `{"name":"aviation.inspect","arguments":{"bundle":"<original JSON string>"}}`. Generate the outer JSON with a JSON serializer, not shell interpolation of untrusted bundle text. Replay also supplies exact flightId and atUtc. `npm run mcp` starts stdio MCP; supported protocol is2024-11-05, with other revisions rejected. Plain npm invocation may print a banner; use the silent/direct form for canonical stdout.

For the separately requested demo, select **Flight Sim demo → Load native workspace**. The authored connection requests Graph4213 with `kgDoc=docs/workspace-seeds/agentic-graph-game-flight-sim-demo.md` and `kgPreview=1&kgLiveHero=1`; URL encoding is handled by the existing link owner. **Open source workspace** uses the plain `kgDoc` route for editing. Verify the selected document and native HUD, then **Close native workspace**. The host requests the native preview; it neither copies Graph nor authorizes aircraft effects. The external owner is not included in aviation shell offline proof.

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

VCC-3/4/7/9/10 remain deferred under the joined plan; no local synthetic test closes their real-data or independent-label conditions.

## Independent evidence register

Implementer supplies the reproducible command and inputs. A separate evaluator mechanism checks the produced result; implementer assertion is not independent acceptance. Record negative results as well as successes.

| Evidence ID | Scope / exact inputs required | Status |
|---|---|---|
| AEL-SOURCE | Commit/tree, clean-state observation, profile/fixture SHA-256, tool declaration revision, dependency lock, resource inventory | Pending root source freeze |
| AEL-CONTRACT | VCC-1/2/8; exact command and actual stdout/exit/time; deterministic and rejection cases | Final46/46-test validation plus observed fixture record/replay/pack passed |
| AEL-PARITY | VCC-11; same fixture/query across each supported adapter; actual MCP initialize/call and visible fallback | Browser UI/WebMCP and saved-pack CLI equality; actual adapter unavailable/rejection/async tests passed |
| AEL-DEVICE | VCC-5; browser/version/OS, desktop/mobile widths, keyboard/touch/zoom/preferences, screenshots/readback, elapsed/actions | Partial; emulation/keyboard/sample contrasts/page scale observed, physical touch/full text zoom/clean setup untested |
| AEL-OFFLINE | Provision online → disconnect/block network → reload → import/replay/export/reimport; all requests and cache status recorded | Latest11/11 service-worker responses/0 external; synthetic workflow observed; actual failure-handler tests passed |
| AEL-EFFECTS | VCC-6; zero runtime model/billed API paths, blocked unexpected network, source/config scan, emitted bytes/module count | Fixture counters/external requests0;3 new modules, added JS43,188B, largest20,535B/280lines; budgets passed |
| AEL-RECOVERY | Corrupt/stale input recovery; selected-session reset; originals restored with equal identity; exact shell predecessor recovery | Pack/original identity, corrupt-input retention, clearing and worker storage-failure checks passed; production predecessor recovery not executed |
| AEL-RELEASE | Native check:plan/check receipts, exact publication/PR and protected integration; deployment separate | Pending |

Focused entry points: `node --test test/evidence-core.test.mjs` and `node --test test/evidence-tools.test.mjs test/contracts.test.mjs`; final `npm run check` executed the repository's full46-test set and budgets. Core exports are `admit(bytes,profile)`, `inspect(handle)`, `exportPack(handle)`, `originalBytes(handle)` (copy), `canonicalJson(value)`, `createSession(profile)` with read/import/clear, and `replay(handle,entityId,atUtc)`; adapters await admission/export rather than making a competing parser.

**Initial source check, historical:** native `npm run check` passed budgets and39/39 tests across24 changed paths on dirty base4380388, sourceDigest `7d95296b0a13cd1ca655a4593c50683b274a5e8cb11d72cd4e8b42e38c680b31`. Immutable initial receipt SHA-256 `ac86ba44d428957e28559f943ff450de075563e31e4b1526487ad560b8a617f4`; budget stdout `785abe47b6f73019a4da22cf6c9acc1b64c54820bcb89d4cb060973bfa3ea5c3`; test stdout `52d7e05e40e7f5dfbb7df598d5728ad5164525beebcbc900b57cfcf782ec7309`. Copies are in `output/aviation-implementation-20261004/initial-validation/` in the shared workspace. Later pasted-Unicode rejection, authored native-preview parameters and documentation changes are outside that receipt. Final exact-source revalidation is required.

**Browser evaluation:** immutable `browser-evaluation-813c9c36ee149fe44fc3bb05f85e0639364ff93676e4a29b86a0041849fea8a4.json` under `output/aviation-implementation-20261004/` binds six raw artifacts. UI/WebMCP inspect and replay agree; the UI clipboard's13,734B pack was saved, reimported via actual file chooser and compared with CLI output. Original SHA-256 `4750f8d966fc1ebbe690343a1c44ed2d60241d5035844b55642be96fb93438fd`; derived `5707401b826894efc2cf53c362aa13e26453461debbcc2cdfdbf8d25a37f1e95`. Offline13/13 responses came from the service worker with0 external requests/model/billed API calls. This is fixture evidence, not live data or new-device acceptance.

Observed widths360/390/430 had no page overflow; keyboard Enter/visible focus worked. Sampled composited contrast was6.28–13.90, core sampled controls44CSSpx, reduced motion enabled and visual scale2×. These samples do not certify every consumer. Touch dispatch was unsupported; page scale is not full browser text zoom. Live unavailable-WebMCP/storage-failure injection was unsupported; the actual adapter/worker handlers instead passed their unit checks. VCC-5 remains partial. The observed clipboard/mobile file flow took14.731seconds of the instrumented interaction; it is neither clean new-device setup nor a three-action primary-download claim.

**Latest product-frozen browser checkpoint:** after the shared `registerBrowserTools` refactor, `browser-parity-final.json` SHA-256 `53067df4d49834649f907cfce2a932adc9a0d93debbb52c98ec37d7d76c7d353` confirms inspection/replay equality. The newer `offline-network-exact.json` SHA-256 `034c8db08822540c1c4d1490a9ac7405d757464230981692a834ebc6c77a013f` records11/11 responses from the provisioned service worker; the earlier13-response run is historical. Actual mixed-timestamp UI observation advanced Home12:00:00.000→Next12:00:00.001; removal cleared hidden data and corrupt-pack admission retained the accepted identity. The selected native Flight document was Ready in the external embed at unchanged Graph061df9.

**Final working-tree validation:** `final-validation/receipt.json` SHA-256 `f3868e08790da6bf338d59a23e5450f5cbd54cf42b322d35ffffd73e90ddd270` binds sourceDigest `5f4135dd246f6e3e87d76b5435d09c3c8d363206dd5e655af9419aaee11f71bc`: budgets exit0 and46 tests/46pass/0fail/0skip,24 changed paths. Test elapsed1,475.793ms; budgets393.051ms. Actual adapter unavailable/rejection/async parity and worker failure tests are included. Served JavaScript66,210B minus baseline23,022B =43,188B added; three new modules; largest kernel20,535B/280lines. This final documentation update is subsequent; native publication rechecks its candidate. No new-device or production acceptance is inferred.

Each receipt records schema/version, evidence ID, timestamp, source commit/tree, input hashes, environment, executed command, exit, assertions, negative controls, limitations, evaluator identity and artifact hashes. Do not use edited receipts as raw stdout. Hashes bind bytes, not truth. Browser screenshots accompany structured readbacks.

## 180-second demo

Rehearse with the bundled synthetic file. Announce that it is synthetic before showing results. Keep unexpected failures visible and retain the previously accepted record.

| Beat | Seconds | Action / Reveal / acceptance |
|---|---:|---|
| Hook | 20 | State one disputed chronology and distinguish this synthetic case from observed aviation |
| Probe | 40 | Import; show a source conflict or missing fact and its explicit reason; VCC-1 |
| Reveal | 40 | Run an equal-input replay twice and compare canonical identity; VCC-2 |
| Scrub and reproduce | 60 | Choose UTC, export/reimport, then reject a corrupt replacement while retaining accepted state; VCC-8 |
| Close | 20 | State what remains unknown and invite an authorized future case; no customer/prediction claim |
| Total | 180 | Time-box target, not an observed completion time |

For TTV, log start, setup completion, first accepted record, first useful replay, export verification, actions and interruptions separately. A rehearsed demonstration is not the clean-environment measurement. A participant success needs independent observation and consent.

## Browser and accessibility record

Record exact viewport and device class; text/table remains available without a map. Check accessible control names, programmatic table headings, keyboard-only operation, visible focus, 44px touch targets where specified, 200% zoom, reduced motion and no colour-only error/status. Measure final composited contrast rather than reading token source values. Record failures and affected consumers; do not write a WCAG certification claim from these bounded checks.

For offline evidence, preserve the profile and fixture within admitted shell resources if that is the implementation design, and test it. If only the shell is cached, identify where the bundle comes from. Test API-unavailable and cache-storage rejection paths without simulating success. Never clear unrelated origins or a user's existing caches.

## Check and release procedure

Run the repository's actual `npm run check:plan` and `npm run check` after affected tests; the repository validator owns required checks. Retain exact command outputs and predecessor failures. Once source changes, earlier receipts are historical unless a native mechanism explicitly grants reuse.

Publication is `npm run release:common -- publish --message="<reviewable change>"` through the parent release owner. This handbook authorizes no independent publication. An open PR, green checks, protected merge, local preview and production readback are separate outcomes. [Rights/recovery](rights-recovery.md) owns rollback prerequisites.
