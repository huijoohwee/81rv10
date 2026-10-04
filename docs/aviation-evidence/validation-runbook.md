---
title: "Aviation Evidence — validation and local runbook"
doc_type: "Handbook"
version: "0.3.1"
continuity_id: "aviation-evidence-layer"
source_revision: "aviation-evidence-layer@0.3.1"
date: "2026-10-04"
owner: "Engineering and independent evaluator"
---
# Validation and local runbook

This bounded [joined-plan](prd-tad-adr-mvp-gtm.md) section retains the predecessor46-test history. Reproduced byte-aliasing and UTC/decimal comparison failures supersede its broad5/6-Must claim. Successor54 tests and bounded v2 browser checks cover the repairs; VCC-5 remains partial. No full product/runtime acceptance is claimed.

## Local operation

1. Work in the native admitted checkout. Install the lockfile dependencies using the repository's supported Node ≥22 environment; use `npm ci --ignore-scripts --no-audit --no-fund` when installation is required.
2. Run `npm run dev`; open the exact loopback URL printed by the server. Use the aviation page supplied by the implementation. Do not guess another process's port or expose the server externally.
3. In Evidence workspace, choose **Load synthetic example** or **Import evidence bundle or pack**. The authored fixture has13 facts, two synthetic sources and entity `synthetic-flight-01`, covering `2026-01-01T12:00:00.000Z`–`2026-01-01T12:02:30.000Z`. Confirm its synthetic label, profile/revision, original digest and explicit gaps. **Paste JSON instead → Inspect pasted JSON** rejects invalid Unicode without changing accepted data.
4. Choose the entity and **Replay time (UTC)**, then **Replay moment**; **Recorded moment**, **Previous moment** and **Next moment** select authored times. Inspect source/time/unit labels, conflict/missing indicators and stale status. Equal query inputs must yield the same canonical result.
5. Choose **Prepare verifiable export → Save evidence pack**, save locally and reimport through the same file input. If direct download is unavailable, expand **Copy export JSON → Copy portable pack**, save that exact JSON as `evidence-pack.json`, then choose the file. Compare original-byte and derived identities. The clipboard→saved file→actual file chooser→CLI path is verified; direct in-app download observation timed out. A prepared link is not completed download evidence.
6. Save current evidence before preparing the offline shell. Preparation explicitly checks for a worker update and waits for activation; after success, save any remaining changes and reload to use that revision. Cache success does not persist unsaved session data or establish offline first installation.
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
| AEL-SOURCE | Commit/tree, clean-state observation, profile/fixture SHA-256, tool declaration revision, dependency lock, resource inventory | Predecessor209483a/treeb807272 published; successor v2 manifest bound below, publication pending |
| AEL-CONTRACT | VCC-1/2/8; exact command and actual stdout/exit/time; deterministic and rejection cases | Historical46/46 missed reproduced defects; successor54/54 includes immutable originals, UTC/decimal comparisons and pack-version controls |
| AEL-PARITY | VCC-11; same fixture/query across each supported adapter; actual MCP initialize/call and visible fallback | Successor UI/WebMCP v2 equality and54-test adapter checks passed; exact fixtures bound below |
| AEL-DEVICE | VCC-5; browser/version/OS, desktop/mobile widths, keyboard/touch/zoom/preferences, screenshots/readback, elapsed/actions | Partial; clean predecessor install and fresh-origin provision observed; full setup/primary export timing, phone/touch/full zoom pending |
| AEL-OFFLINE | Provision online → disconnect/block network → reload → import/replay/export/reimport; all requests and cache status recorded | Successor11/11 worker responses/0 external; v2 cache activation, reload and recovery observed |
| AEL-EFFECTS | VCC-6; zero runtime model/billed API paths, blocked unexpected network, source/config scan, emitted bytes/module count | Successor serving calls0; JS67,987B, added44,965B, repair adds0 modules; budgets passed |
| AEL-RECOVERY | Corrupt/stale input recovery; selected-session reset; originals restored with equal identity; exact shell predecessor recovery | Successor Buffer/pack/update-race tests and v2 round trip passed; no production rollback |
| AEL-RELEASE | Native check:plan/check receipts, exact publication/PR and protected integration; deployment separate | Predecessor209483a/PR6 published, synthetic-merge CI green; no protected merge/deploy; successor pending |

Focused entry points: `node --test test/evidence-core.test.mjs` and `node --test test/evidence-tools.test.mjs test/contracts.test.mjs`; successor `npm run check` executed54 tests and budgets. Core exports are `admit(bytes,profile)`, `inspect(handle)`, `exportPack(handle)`, `originalBytes(handle)` (copy), `canonicalJson(value)`, `createSession(profile)` with read/import/clear, and `replay(handle,entityId,atUtc)`; adapters await admission/export rather than making a competing parser.

**Historical0.3.0 proof:** complete records remain in published209483a and `output/aviation-implementation-20261004/`. The46-test/budget receipt SHA-256 `f3868e08790da6bf338d59a23e5450f5cbd54cf42b322d35ffffd73e90ddd270` and browser evaluation `813c9c36ee149fe44fc3bb05f85e0639364ff93676e4a29b86a0041849fea8a4` cover their exercised cases, not the newly reproduced defects. UI/WebMCP/CLI fixture equality, clipboard/file round trip,11/11 final worker responses, widths360/390/430, keyboard focus, sampled contrast6.28–13.90 and reduced motion were observed. Direct download timed out; touch and live API/storage fault injection were unsupported, page scale was not native zoom, and14.731s clipboard flow was not three-action download. Old derived identities and predecessor browser observations are not v2 proof.

**Continuation measurements on predecessor209483a:** clean archive install1.443673792s (Node22.22.3, npm10.9.8, macOS27; existing toolchain/package cache). Fresh origin53350 had0 workers/caches before successful provision and offline reload. Record accepted13facts/2sources in391ms/1action; Previous+Prepare took638ms/2actions, but actual save remains unverified. Native zoom shortcut produced no measured change; no phone/touch proof. These do not certify complete setup, three-action download or algorithm v2. Immutable artifacts under `output/aviation-completion-audit-20261004/`: `clean-install.json` SHA-256 `8fe818cf2453b77b3eda4020f0873a67a765047f080a073309e76ab6f1ac4fe6`; `clean-origin-evidence.json` `e5651c33010cc2fc1f2086fdeac6a85433157f79841461d28239f57c4ce59a52`; `clean-origin-network.json` `09272e85bdddf3b1d57c754653c225af348e04fd95b2afc30daddb60a2ae1189`.

**Successor0.3.1 working-tree proof:** native54/54 tests and budgets passed; `validation-final-receipt.json` SHA-256 `894d5acdcfeb759c19f2744131806831e24fb58e3cbef2bdb0a7c9be2b518c20`, sourceDigest `d0fcb586f9cc8d1f85385103166d7e0d29a7badb896ea7d2288276fef3ee68b2`. This includes immutable Buffer/view ownership, UTC/decimal equivalence and real differences, old-pack rejection/raw-original reimport, plus four actual preparation-handler tests covering update/activation races and failures. Earlier50-test receipt `6c719e33ba6fe94f2ebba67bd1e2e8d5ce04f04fd6239fd502bae8ddaf4f2cce` predates the offline fix. No new module; source/tests+9,514B. This documentation update follows the54-test receipt; native publication revalidates its candidate.

Current artifacts in the same audit directory: `v2-comparison-browser.json` SHA-256 `eec55dac82cf2c70b0b56dc111f4a86ade5c544c75b81dcd50385e2adb00930d` binds UI/WebMCP equality,0.9144m=3ft and equal UTC spellings without false conflicts, original retention and old-pack rejection retaining accepted v2 state. `v2-offline-browser.json` `e47016328542a8e6ce431adb607f0cb641141864b3c85e9be78d6da65f595411` records activated0.3.1 cache/save-reload notice,375ms/1-action record,390px/no overflow/four table headings and clipboard→saved file→actual chooser round trip. `v2-offline-network.json` `98f7066ee4f72d29a264e05eb01094a7b84bc050af26b9f7319760fccbb23d9c` binds11/11 worker responses/0 external. `v2-source-manifest.json` `6fdc1bf7aba9266723aa00510e7fe8d6a3257df88b93ba2060ec3dca763a0acb` binds observed product bytes. Primary three-action download, physical phone/touch and full browser zoom remain unverified. VCC-5 stays partial; successor publication pending.

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

User target: **iPhone Safari**; device/iOS version and an accessible secure URL are unknown. The server binds loopback only. Check actual import, touch,200% zoom, offline reload and file save/reimport on that phone. [Safari17.2](https://webkit.org/blog/14787/webkit-features-in-safari-17-2/) supports JSON import attributes; [Safari26](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/) allows Home Screen web apps. [Storage may be evicted](https://webkit.org/blog/14403/updates-to-storage-policy/); retain exported files. These platform capabilities are not device proof.

Record exact viewport and device class; text/table remains available without a map. Check accessible control names, programmatic table headings, keyboard-only operation, visible focus, 44px touch targets where specified, 200% zoom, reduced motion and no colour-only error/status. Measure final composited contrast rather than reading token source values. Record failures and affected consumers; do not write a WCAG certification claim from these bounded checks.

For offline evidence, preserve the profile and fixture within admitted shell resources if that is the implementation design, and test it. If only the shell is cached, identify where the bundle comes from. Test API-unavailable and cache-storage rejection paths without simulating success. Never clear unrelated origins or a user's existing caches.

## Check and release procedure

Run the repository's actual `npm run check:plan` and `npm run check` after affected tests; the repository validator owns required checks. Retain exact command outputs and predecessor failures. Once source changes, earlier receipts are historical unless a native mechanism explicitly grants reuse.

Publication is `npm run release:common -- publish --message="<reviewable change>"` through the parent release owner. This handbook authorizes no independent publication. An open PR, green checks, protected merge, local preview and production readback are separate outcomes. [Rights/recovery](rights-recovery.md) owns rollback prerequisites.
