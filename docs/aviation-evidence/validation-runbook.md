---
title: "Aviation Evidence — validation and local runbook"
doc_type: "Handbook"
version: "0.3.3"
continuity_id: "aviation-evidence-layer"
source_revision: "aviation-evidence-layer@0.3.3"
date: "2026-10-04"
owner: "Engineering and independent evaluator"
---
# Validation and local runbook

[Joined revision 0.3.3](prd-tad-adr-mvp-gtm.md) adds source drilldown/input ownership fixes and a synthetic volume candidate. **75/75 tests and budgets passed; bounded browser readback passed; publication is pending**. All eleven acceptance conditions remain unchanged. iPhone Safari is **SKIP/KIV by user decision**, never passed.

## Local operation

1. Use the admitted checkout and supported Node ≥22. If installation is needed, use the lockfile with `npm ci --ignore-scripts --no-audit --no-fund`.
2. Run `npm run dev` and visibly open its exact printed loopback URL. Do not expose another process or guess its port.
3. In Evidence, choose **Load Singapore flight observations**, **Load synthetic example**, or **Import evidence bundle or pack**. The real sample has 117 facts/1 source, entity `76b452`, observed 2026-10-03T10:37:19.240Z–10:52:12.830Z and 5 explicit unknowns. The synthetic control has 13 facts/2 sources, entity `synthetic-flight-01`, on 2026-01-01. Confirm classification, attribution, profile/algorithm, identity and gaps. Invalid pasted/imported data retains accepted state.
4. Inspect a fact's original source: verify rights, retrieved time, original media type/text/SHA and resolved reference. Source text must be inert text, including hostile markup; source URLs are not fetched. Reopened packs must resolve to the same record. Choose entity/UTC and **Replay moment**, or Previous/Next recorded moment; compare repeated canonical results and inspect missing/conflict/stale labels.
5. **Prepare verifiable export → Save evidence pack**, then reimport the actual saved file. Copy-export JSON is a fallback; verify bytes and both identities. A prepared link or DOM-extracted pack is not completed primary-download evidence. Primary save/timing remains unverified.
6. Save evidence before **Prepare offline**. It checks worker updates and waits for activation; reload after success to use that revision. Unsaved session data is not persisted. Provisioning is not offline first installation.
7. Reset/remove clears only the selected session. Keep permitted files; stop only the dev process owned by this checkout.

For the lazy volume workspace, load its **labelled example** or a compatible local volume bundle/pack; choose entity/UTC and **Project at UTC**. Inspect datum, floor/ceiling, validity, schematic and original-fact table. The authored example is synthetic, not a notice or official airspace. Invalid data or mismatched datum must retain the accepted view. **Prepare export** and reimport verify original identity. Desktop and390px layout, datum-retention and numeric render readbacks passed below. Primary save and physical-phone checks remain unverified/KIV.

Separate Flight demo: **Flight Sim demo → Load native workspace** selects authored Graph4213 and `docs/workspace-seeds/agentic-graph-game-flight-sim-demo.md`; verify document/HUD then close. Source editing and Graph assets/offline proof retain their owner.

The shared `app/tools.mjs` declaration owns read-only module/CLI/MCP/WebMCP invocation and aliases. Existing `aviation.inspect({bundle})` / `aviation.replay({bundle,flightId,atUtc})` accept original JSON text. `aviation.source({bundle,factId})` and `volume.project({bundle,entityId,atUtc})` use aliases `/aviation.source @evidence #fact` and `/volume.project @evidence #volume`; module/alias/CLI/stdio parity passed and the volume browser tool matched the visible command result; no adapter-specific semantics. CLI: `node mcp.mjs --invoke` (or `npm run --silent evidence`), one serialized stdin JSON object with name/arguments. Never interpolate source text into shell. `npm run mcp` uses stdio protocol2024-11-05; unsupported revisions fail.

## Complete acceptance register

These are verbatim inherited conditions, including historical NEW/deferred labels. They are requirement IDs, not claims that named executables exist. ETA/advisory/notice/benchmark software is now authorized but pending; volume software is a current candidate. Real labels/rights and each observable threshold still govern acceptance. Synthetic tests cannot substitute for real truth. The six Must criteria are VCC-1/2/5/6/8/11.

| VCC / story → TAD / ADR | Observable condition, stated check and constraint |
|---|---|
| VCC-1 / PRD-E1-S1 → CONTRACT / 002 | `check-aviation-record` (NEW): 100% accepted facts carry explicit source/time/units; null/gaps preserved; malformed/duplicate/oversized/non-finite/conflicting-datum cases fail before replacing accepted state. No external enrichment. |
| VCC-2 / PRD-E1-S2 → REPLAY / 001,003 | `check-aviation-replay` (NEW): two offline runs with equal bundle/algorithm/query inputs give byte-identical canonical output and original positions; shuffled input/tied times resolve by declared ordering. No Date.now/random/interpolation/network. |
| VCC-3 / PRD-E2-S1 → ETA / 001 | `check-eta-backtest` (NEW, deferred): ≥200 arrivals with permitted touchdown truth, UTC seconds; freeze baseline (scheduled arrival and constant-groundspeed track estimate, report each), sample 30 min before truth, chronological train/test separation. Median absolute error improves on each stated applicable baseline; 90% prediction interval has ≥85% empirical coverage. Missing truth excluded with counts; no simulated truth passed as real. |
| VCC-4 / PRD-E2-S1 → ALERT / 005 | `check-alert-lead` (NEW, deferred): on held-out plan-late arrivals >10 min, ≥70% advisory lead ≥20 min; report precision and coverage denominators. Requires permitted plan and actual-arrival data; no operational instructions. |
| VCC-5 / PRD-E1-S1, PRD-E1-S2, PRD-E5-S1 → SHELL/VIEW / 004 | `check-aviation-device-offline` (NEW): clean setup ≤60 min; provisioned shell + fixture record ≤15 min/3 steps; 360–430 px phone and desktop complete keyboard/touch/readable-table replay/export offline. Record device/browser/storage errors and network requests; no external tiles. |
| VCC-6 / PRD-E1-S1, PRD-E1-S2, PRD-E5-S1 → TOOLS/SHELL / 001 | `check-aviation-zero-spend` (NEW): import/read/replay/export tool paths invoke 0 models/0 billed APIs, obey byte/module limits; scan network/config and runtime counters; zero provider effects. Build assistant usage excluded from serving claim. |
| VCC-7 / PRD-E4-S1 → AIRSPACE / 002 | `check-notice-parse` (NEW, deferred): ≥98% geometry/time/altitude agreement on 100 independently labelled structured notices; incompatible/missing datum unresolved; never silently parse free text into operational clearance. |
| VCC-8 / PRD-E5-S1 → CONTRACT/SHELL / 006 | `check-aviation-pack` (NEW): originals match input byte hashes; equal accepted bundle/revision gives equal derived digest; export/reimport equivalent; tampered bytes fail; delayed prior import cannot overwrite newer accepted session. No origin/non-repudiation claim. |
| VCC-9 / PRD-E3-S1 → BENCH / 001 | `check-route-benchmark` (NEW, deferred): same inputs/model/constraints produce identical result with cited counterfactual and error band; record excluded regions and unsupported types. |
| VCC-10 / PRD-E6-S1 → AIRSPACE/VIEW / 004 | `check-volume-render` (NEW, deferred): compatible-datum test volumes rendered within 1 m of admitted floor/ceiling and unit conversion; pressure/geometric/AGL mismatches fail; no map-data rights assumed. |
| VCC-11 / PRD-E1-S1, PRD-E1-S2, PRD-E5-S1 → TOOLS / 005 | `check-aviation-invocation-parity` (NEW): UI/local module/CLI/MCP return same typed inspection/replay result for equal inputs; unsupported WebMCP has visible fallback, unknown/mutation tool rejected, no writes/spawn/network. Protocol compatibility tested for supported revisions only. |

Current VCC-10 evaluation must compare actual SVG floor/ceiling coordinates through its declared transform to admitted metric bounds within 1 m, including feet conversion. Test rejected pressure/geometric/AGL mismatches, nulls, duplicate scalars, malformed/self-intersecting rings and invalid time. Pure module checks alone do not establish browser rendering. The schematic's horizontal projection has no terrain/geodetic accuracy promise. VCC-7's 100-label corpus remains independent of synthetic volume geometry.

## Evidence register

| Evidence ID | Required scope | Current disposition |
|---|---|---|
| AEL-SOURCE | Exact source/tree, profile/fixture hashes, lock/declaration revision and resource inventory | PR8 predecessor below; current final identities pending |
| AEL-CONTRACT | VCC-1/2/8 deterministic/rejection/concurrency stdout and inputs | 75/75 tests and budgets passed, including source/ownership and9 projection cases |
| AEL-VOLUME | VCC-10 projection/negative controls and actual SVG bound readback | 10 SVG points: max1.60e-12m error; datum mismatch retained record |
| AEL-PARITY | VCC-11 equal inputs/output across supported adapters and visible fallback | Source/volume module/alias/CLI/MCP parity passed; volume UI/WebMCP equal |
| AEL-DEVICE | Setup/actions/readability/keyboard/touch/zoom/preferences and environment | Partial; physical iPhone Safari SKIP/KIV; primary save, full setup and native zoom not passed |
| AEL-OFFLINE | Provision→network block→reload→import/replay/export/reimport, request/cache evidence | Current15/15 worker responses;0 external;18/18 cached-resource hashes match source |
| AEL-EFFECTS | Zero models/billed APIs/provider effects and exact source/initial-load sizes | Current served JS94,193 B; added71,171 B;5 product modules,2 lazy |
| AEL-RECOVERY | Corrupt/stale input retains state; originals reimport; exact predecessor recovery | Ownership/invalid input/pack cases passed; datum rejection retained visible volume |
| AEL-RELEASE | Native check:plan/check and exact publication/provider receipts | Current publication pending; no protected merge/deploy claim |

Published **0.3.2**: [PR8](https://github.com/huijoohwee/81rv10/pull/8), source `5ef1a432e8360a7b1b0a1b77cc4fcec9303025da`, tree `e76eae30c7f3e1d69e6b08d484c3a6113fa4ebc7`. [CI37167132324](https://github.com/huijoohwee/81rv10/actions/runs/37167132324) passed on synthetic merge `68392d93d4cafb4fa581618af6f10d967bbb6d76`. The [immutable runbook](https://github.com/huijoohwee/81rv10/blob/5ef1a432e8360a7b1b0a1b77cc4fcec9303025da/docs/aviation-evidence/validation-runbook.md) preserves all 0.3.1/0.3.2 raw receipt references, failures and limitations. Its local 61 tests/budgets, 390px real-corpus browser, offline and UI/WebMCP observations remain predecessor evidence; they do not validate edited source.

Predecessor export: clipboard failed; a DOM-read 354,029 B pack was saved externally and chooser-reimported with equal identities. Primary download/copy-save/three-action proof remains absent. Cache evidence covered 13 requests/entries, 12 unique resources; current inventory requires remeasurement.

Unchanged corpus: 276,932 B, SHA-256 `e88ad4100e1ac1d164087e17c87d55190ccc13dd8fbf9e120c3a0ec2ec7b8926`; derived `4913a0c5fb4a3d3155f967807552f07435c3f0152a23555b341b2eef90b531e4`; envelope `82ee633949cb9bcff6215eeb128af6a9f7c09a49268d0fb529d068833fa47055`. Offline regeneration: `node scripts/import-readsb.mjs <retained-source.json> app/profiles/singapore-region.json <new-bundle.json>`; destination must not exist. Compare exact bytes, 56 selected row pairs, 5 unknowns and retained upstream SHA from the authored selection. Reject altered SHA, empty/oversized selection and malformed rows. No fetch required.

Focused owner tests live in `test/evidence-core.test.mjs`, `test/evidence-readsb.test.mjs` and the actual tool/volume test owners. Core APIs include `admit`, `inspect`, `sourceEvidence`, `exportPack`, `originalBytes` (copy), `canonicalJson`, `createSession` and `replay`. `sourceEvidence` returns frozen exact source/reference/resolved-record data; unknown fact IDs fail. The volume owner exports `projectVolume` and `altitudeFromScreen`; profile/config remain authored data. Record actual declarations/commands at final verification, not invented test names.

Receipts bind time, source/tree/inputs, environment, command/exit, assertions/controls, limits, evaluator and artifacts. Retain raw stdout and structured browser readback; hashes prove integrity, not truth.

## 180-second demo

| Beat | Seconds | Action / evidence |
|---|---:|---|
| Hook | 20 | Name Singapore–Riau historical segment and ODbL limitations |
| Probe | 40 | Show real unknowns and exact fact/source reference; synthetic control separately labelled; VCC-1 |
| Reveal | 40 | Repeat equal-input UTC replay and compare canonical result; VCC-2 |
| Reproduce | 60 | Export/reimport; reject corrupt replacement while retaining accepted state; VCC-8 |
| Close | 20 | State remaining uncertainty and authorized next-case decision |
| Total | 180 | Target, not measured completion time |

The synthetic volume walkthrough is a separate timed segment; do not silently expand this demo or represent volume geometry as real notice data. Log setup, import, useful replay, verified export, actions and interruptions separately. Buyer task value requires independent consented observation.

## Browser and accessibility record

**iPhone Safari: SKIP/KIV by explicit user decision.** Do not re-request access or label emulation as a pass. If the user later resumes this test, record physical model/iOS/Safari, an authorized secure origin, clean setup, Save-to-Files/reimport, touch, native200% zoom and provisioned offline reload with exact hashes/requests. Loopback desktop access does not establish phone access. Platform capability is not device proof.

Current browser verification should identify desktop environment and 360–430px emulation, table readability, accessible names, keyboard/focus, 44px targets, reduced motion, non-colour status and composited contrast. Test offline after provisioning and record storage/API failures. Avoid clearing unrelated origins. Full WCAG certification is not claimed.

## Check and release procedure

Run actual `npm run check:plan`, affected tests, then required `npm run check`; native policy owns the final selected checks. Earlier receipts become historical when source changes unless native reuse is explicitly granted. Parent release owner runs `npm run release:common -- publish --message="<reviewable change>"`; this handbook grants no independent publication. PR/green CI/protected merge/local preview/deployment remain separate outcomes. [Recovery](rights-recovery.md) owns rollback prerequisites.


## Current 0.3.3 bounded proof

Artifacts are under `output/aviation-volume-source-20261004/` outside the lane. `browser-receipt.json` SHA-256 `aa99da6e9146012bf7757d07e0ca0264e3aefae221046ca33f2ff4930623722d` binds the actual204,589-byte Singapore source envelope readback to its original hash and fact pointer, volume command/WebMCP canonical equality,10 SVG points (max1.5916157281026244e-12m vertical readback error),304.8m/609.6m AMSL, live AGL-mismatch rejection with unchanged identity,390px/scrollWidth390, and15/15 service-worker responses/0 external. `browser-cache-manifest.json` hashes18 cached resources against current source. `volume-desktop.png` and `volume-mobile-layout.png` are screenshots. The first offline attempt toggled network before activation and was discarded; the confirmed-activation fresh-tab run passed. A later offline Blob readback failed; this is export-preparation evidence, not primary download or current browser roundtrip proof. Kernel volume pack roundtrip is tested separately.

`validation-receipt.json` SHA-256 `0c518ebc19d22d4d4511b112f05a36e5bed2ce9bb8dcb342f9f8f8932f21596c` records75/75 tests plus budgets. The initial run had one old tool-count expectation; the six-tool contract was corrected and rechecked. Native publication rebinds final source and required checks; exact commit/tree/provider identity must be read from its receipt. Aviation profile v1, evidence-order/v2 and the real Singapore fixture bytes remain unchanged.
