---
title: "Aviation Evidence Layer — local file MVP"
doc_type: "PRD-TAD-ADR-MVP-GTM"
version: "0.3.3"
revision: "0.3.3"
date: "2026-10-04"
lang: "en-US"
continuity_id: "aviation-evidence-layer"
prd_revision: "0.3.3"
tad_revision: "0.3.3"
adr_revision: "0.3.3"
mvp_revision: "0.3.3"
gtm_revision: "0.3.3"
owner: "Aviation Evidence product function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: false
worktree_id: "agent/device-0232231d4a19/aviation-evidence-layer"
agent_id: "codex-root"
load_policy: "on-demand"
guideline_revision: "3.4.0"
---

# Aviation Evidence Layer

The joined package **aviation-evidence-layer@0.3.3** owns this increment and five bounded projections: [validation](validation-runbook.md), [rights/recovery](rights-recovery.md), [discovery/pilot](discovery-pilot.md), [financial model](financial-model.md), and [venture projections](venture-projections.md). They share one product authority.

Published predecessor **0.3.2** is [PR #8](https://github.com/huijoohwee/81rv10/pull/8), source `5ef1a432e8360a7b1b0a1b77cc4fcec9303025da`, tree `e76eae30c7f3e1d69e6b08d484c3a6113fa4ebc7`; [CI 37167132324](https://github.com/huijoohwee/81rv10/actions/runs/37167132324) passed on synthetic merge `68392d93d4cafb4fa581618af6f10d967bbb6d76`. Its 61 tests, browser evidence and earlier normalization history are immutable predecessor proof. **Current 0.3.3 passed 75 tests and budgets; publication is pending.** Protected integration, deployment and customer outcomes remain separate.

## Context, scope and authority

The user selected MIT 81rv10 and authorized ETA/advisory, structured-notice, route-benchmark and volume software, retaining real acceptance gates. Missing labels/demand do not prohibit independently testable implementation. ETA/notice/benchmark remain unimplemented; volume/source drilldown passed bounded source, browser and tool checks below. iPhone Safari is **SKIP/KIV by user decision**; do not infer a pass or re-request access.

Native successor `aviation-source-inspection` continues the published source in its admitted checkout. Existing Drone Dashboard @0.2.1, Launch Copilot and native Graph owners remain unchanged. Runtime semantics are universal and consume authored profiles/configuration; geography, mission/scenario and sample labels belong to data. Local implementation/checks/preview are covered; each publication, integration or deployment effect requires its native receipt. Simulation closes no aviation VCC.

## PRD

### Outcome and buyer hypothesis

An analyst imports a bounded permitted case, sees the exact source behind each fact, reproduces chronology offline, and shares unchanged originals plus verifiable derived records. The hypothesized buyer is an operations, safety or analytics team lead; frequency, value and willingness to pay remain unvalidated. Initial observed evidence is one Singapore–Riau segment selected within a Singapore/Johor/Riau study window, not evidence of Johor coverage or regional demand.

| Pain / priority | Hook → break → fix → close | Scope / evidence |
|---|---|---|
| P2 reconciliation / 1 | Disputed fact → missing/conflicting provenance → inspect exact source record and gaps → distinguish known from unknown | Existing admission/source accessor/UI; EXP-1 validates frequency and cost |
| P3 chronology / 2 | Manual joins lose ordering → explicit UTC replay → reproduce the same evidence | Existing deterministic replay/export; EXP-2/4 test technical/value outcomes |
| P1 prediction / authorized next | Uncertain arrival → truth/model absent → build bounded ETA/advisory evaluator → test held-out errors and lead | Software pending; VCC-3/4 require qualified real labels |
| P4 restrictions / authorized next | Geometry/time/datum ambiguity → structured admission → preserve unresolved fields | Parser pending; VCC-7 requires 100 independently labelled notices |
| P5 efficiency / authorized next | Alternatives lack a reproducible comparison → model-bound counterfactual/error band | Benchmark pending; VCC-9 retains model/rights conditions |
| Vertical interpretation / current candidate | Compatible floor/ceiling → inspect bounded volume schematic and original facts | Synthetic technical VCC-10 check passed within the stated polygon/datum subset |

J1 permitted file → J2 atomic import → J3 fact/source drilldown → J4 UTC replay → J5 export/reimport verification → J6 pilot decision. No account, mandatory external map or cloud upload. Invalid/superseded work retains the accepted session.

| Story | Observable outcome | Trace / current state |
|---|---|---|
| PRD-E1-S1 Must | Every accepted fact exposes source/time/units; nulls/conflicts remain explicit; drilldown includes unchanged source text and its referenced record | CONTRACT/SHELL/VIEW; ADR-001/002; VCC-1/5/6/11; source/UI exact-text readback passed |
| PRD-E1-S2 Must | Equal bundle/profile/algorithm/UTC gives byte-identical ordered replay with gaps | REPLAY; ADR-001/003; VCC-2/5/6/11; predecessor evidence retained |
| PRD-E5-S1 Must | Export/reimport preserves original-byte hashes and revision-bound derived identity or fails explicitly | CONTRACT/SHELL; ADR-003/006; VCC-8/5/6/11; new input-ownership regressions added |
| PRD-E2-S1 Should | Prediction backtest and advisory lead meet unchanged real-label thresholds | ETA/ALERT; VCC-3/4; authorized implementation pending |
| PRD-E4-S1 Should | Structured geometry/time/altitude agrees with independent labels | AIRSPACE; VCC-7; authorized parser pending |
| PRD-E3-S1 Should | Same model/inputs/constraints reproduce a cited counterfactual and error band | BENCH; VCC-9; authorized implementation pending |
| PRD-E6-S1 Could | Compatible-datum volumes render within 1 m of admitted bounds | AIRSPACE/VIEW; VCC-10; implemented and verified within the stated synthetic subset |

All eleven original thresholds are retained verbatim in the [acceptance register](validation-runbook.md#complete-acceptance-register). Technical synthetic tests cannot become touchdown truth, independently labelled notices or licensed operational airspace. Operational ATC/dispatch/navigation, aircraft control, clearance interpretation, passenger/crew processing and safety certification are outside scope.

| Metric | Target | Evidence / limit |
|---|---|---|
| Setup / first record | Clean setup ≤60 min; provisioned record ≤15 min / 3 actions | Predecessor bounded timing only; full setup remains open |
| Replay/export | ≤5 min / 3 main actions after accepted import | Actual primary save/timing unverified |
| Serving effects | 0 models, 0 billed APIs, 0 required external requests | Current bounded volume path: 15/15 worker responses; 0 external requests |
| Data bounds | Original <500,000 B; ≤10 entities, ≤5,000 facts, ≤24 h; profile may tighten limits | Volume profile uses ≤680 facts; shared admission remains owner |
| Code bounds | <600 lines/file; emitted resources <500,000 B; initial added JS ≤75,000 B | Original slice: 2 core +1 UI modules. Authorized increment adds 2 lazy volume modules; 94,193 B served JS total; +71,171 B versus baseline; 5 product modules |
| Device | Desktop and 360–430 CSS px; keyboard/touch/readable table/focus/reduced motion/200% zoom | Physical iPhone Safari SKIP/KIV; desktop/emulation is not phone acceptance |
| Value/retention | ≥10 min saved and weekly accepted use for 4 weeks | EXP-4 unrun |

## TAD

### Owners and dependency direction

CONTRACT (`app/evidence-kernel.mjs`) owns strict admission, profile validation, immutable originals/identity and `sourceEvidence(handle,factId)`. REPLAY (`app/evidence-replay.mjs`) owns explicit-UTC selection. VIEW (`app/evidence-view.mjs`) owns local intake/replay/source inspection/export. TOOLS (`app/tools.mjs`, `mcp.mjs`) owns the single shared typed declaration/dispatcher. PROFILE/FIXTURE own domain/geography. Offline preparation (`scripts/import-readsb.mjs`) maps bounded retained source bytes using authored selection; no provider fetch. Existing server/cache owners retain provisioned offline delivery.

New `app/volume-project.mjs` is a headless pure projection owner; `app/volume-view.mjs` is a lazy UI consumer. `app/profiles/volume-v1.json` and `volume-view.json` author field roles, datum, geometry/projection bounds and labels. `app/fixtures/volume-singapore-synthetic-v1.json` is a synthetic Singapore study exercise, separate from observed aircraft facts. No rendering package, external tiles, terrain data or operational airspace dependency is added. Shared admission → replay/projection → tools/views stays acyclic; no competing parser or tool registry.

### Source inspection and ownership

`sourceEvidence(handle,factId)` returns frozen `evidence-source/v1`: identity, profile identity, fact, full validated source (id/origin/rights/retrieved_at/original media_type/text/sha256), reference and referencedRecord resolved by the existing JSON pointer validator. Unknown fact IDs fail. The source text is unchanged; hashes establish integrity, not authenticity. UI and read-only tool consumers use this owner; source URLs remain inert evidence strings.

Direct session import copies caller Uint8Array/Buffer bytes before its first await. The readsb adapter validates and deeply snapshots authored selection before yielding, preserving key order and the existing fixture identity. Mutating caller labels or nested filters cannot change an in-flight admission. Existing latest-intent fences continue to prevent stale import completion from replacing accepted data. Profile v1 and `evidence-order/v2` are unchanged; no new migration.

### Observed corpus and native scenario

The unchanged real sample selects latitude 0.5–2.6, longitude 102.7–105.1 and 2026-10-03 10:37–10:53 UTC. This is an analyst filter, never an official FIR/sovereignty boundary. It contains 56 non-stale `adsb_icao` positions, paired altitudes and 5 unknown fields: 117 facts, entity `76b452`, actual span 10:37:19.240–10:52:12.830Z. Untimed registration/operator metadata, weather, schedule and restrictions are not inferred. The 276,932 B bundle preserves all 708 upstream rows / 146,788 B and mapping pointers. Numeric altitude stays feet; readsb bit 8 means geometric, otherwise pressure; ground/null never imply touchdown. [Rights](rights-recovery.md) and immutable predecessor proof bind the data and schema.

Authored `workspaces.json` owns observed/synthetic choices and the separate Graph4213 connection to `docs/workspace-seeds/agentic-graph-game-flight-sim-demo.md` with `kgPreview=1&kgLiveHero=1`. Plain kgDoc opens source. Graph `061df9dc9df465f9b54281d576fc9c81f1b092da` retains its renderer/assets/offline requirements; frame availability is not document parity, and simulation never populates evidence.

### Volume semantics and limits

Projection requires one snapshot, one closed simple polygon (4–64 vertices), one validity interval ≤24 h and compatible floor/ceiling. Configuration owns roles, metre output, origin and bounds. The AMSL example refuses pressure/geometric/AGL mismatch. Null/competing scalars, compound/polar/wide/antimeridian geometry, duplicate/degenerate/self-intersecting corners and reversed bounds fail. This subset is not full notice support.

Validity is `[validFrom,validTo)`; a query outside the interval is visibly inactive. Exact declared unit normalization feeds world floor/ceiling coordinates and an affine SVG schematic; `altitudeFromScreen` supports render readback. Local equirectangular horizontal placement makes no geodetic/terrain accuracy claim. The numeric table, datum/time/source labels and original facts remain inspectable independently of SVG. Failed imports/queries retain accepted state. Actual SVG inverse-transform readback of 10 floor/ceiling points differed by at most 1.60e-12 m, including 1,000 ft →304.8 m; ceiling609.6 m. The live mismatched-datum import retained the accepted record. This bounds VCC-10 to the authored synthetic case; it does not close VCC-7.

### Evidence semantics and flows

Original bytes are authoritative. Strict UTF-8/JSON/revisions/bounds and explicit source/time/units/datum precede replacement. Unknowns require reasons. Canonical identity sorts object keys and facts by observed UTC/source ID/fact ID; replay retains latest eligible source/kind ties. Equivalent UTC instants and exact decimal compatible-unit products compare without epsilon while originals remain unchanged. Staleness/gaps use authored thresholds; no interpolation, clock, randomness, network or simulation enrichment.

Six original diagrams remain unchanged in the authoritative predecessor. Flows: import→inspect/replay→export; admission→revision-fenced commit; originals→projections; shared dispatcher→pure query; local files↔browser/stdio/cache. Read-only WebMCP is feature-detected with visible fallback; no feed, write-back or payment endpoint.

## ADR

| ID | Decision / alternative | Consequence / recovery |
|---|---|---|
| ADR-001 | Record/replay is the base; now implement authorized ETA/advisory/benchmark software with explicit evaluation gates | No predictive claim until real thresholds pass; retain reconstruction fallback |
| ADR-002 | Local permitted files, authored profiles and offline readsb mapping; live feeds deferred | Preserve upstream bytes/ODbL; synthetic volumes remain visibly synthetic; missing rights block only dependent data use |
| ADR-003 | Immutable originals and rebuildable memory; database/sync deferred | Snapshot caller bytes/config before awaits; reject old v1 packs with explicit raw-original reimport; no silent migration |
| ADR-004 | Existing MIT shell plus two lazy generic volume modules; external 3D/map packages excluded | Bounded SVG schematic and readable table; no terrain or official-airspace assertion; verify byte/device budgets |
| ADR-005 | One read-only tool owner across adapters | Unknown/extra/mutation inputs fail; no independent schemas; remote gateway still deferred |
| ADR-006 | Byte hashes and revision-bound identity; signing/notarization deferred | Source drilldown proves inspectability/integrity, not authenticity or legal custody |

## MVP and verification

This increment adds exact source drilldown, import/query ownership fixes and generic lazy volume inspection. Native validation passed75/75 tests and budgets. Browser proof covers exact source text/reference, volume UI/WebMCP equality, datum rejection/retention, half-open expiry, 390px layout, and offline projection/export preparation. The18 cached resources match source bytes. No whole-product acceptance follows. VCC-5 remains partial: physical iPhone Safari SKIP/KIV, primary save and complete clean setup unverified. ETA/advisory/notice/benchmark remain next authorized work with VCC-3/4/7/9 gates intact.

Use the [180-second demo](validation-runbook.md#180-second-demo) for record/replay, adding the explicitly synthetic volume exercise only as a separately timed technical segment. EXP-1/3/4 still require real buyer, payment and usage evidence.

## GTM and venture record

The unsent offer remains one permitted historical reconstruction for a qualified team reviewing Singapore and surrounding airspace. Geography is a demonstration choice, not demand proof. Alternatives are manual reconciliation, source tools, in-house analytics or no action. No new predictive/notice/volume promise is added to the pilot offer.

Discovery owns consent/interview/offer outcomes; finance owns assumptions A01–A16, DM-A/B/C, linked statements and scenarios; venture projections remain unpresented internal drafts. Price/currency, opening cash, value, TCO and market size remain unknown. Order, fulfilment, recognized revenue, cash, refunds and repeat use stay separate. No outreach, funds or external audience handoff is implied by implementation.

## Coverage and planning


| Domain | Disposition / owner / next evidence |
|---|---|
| C01 Pain | Covered / Product / EXP-1 |
| C02 Market | Deferred / Commercial / reconcile two sourced sizing methods |
| C03 Offer | Covered / Founder / terms and EXP-3 |
| C04 Journeys | Covered / Product / VCC-1/2/5/8 |
| C05 Architecture | Covered / Architecture / source/parity |
| C06 Quality/rights | Covered / Engineering / negative/offline/rights checks |
| C07 Decisions | Covered / Architecture / ADR-001–006 triggers |
| C08 MVP | Covered / Product / six Must receipts |
| C09 Learning | Covered / Product / actual experiments |
| C10 Operations | Covered / Operations / timed recovery/support |
| C11 Obligations | Covered / Operator / data and commercial decisions |
| C12 Finance | Covered / Finance / actuals/reconciled statements |
| C13 Capital | Covered / Founder / cash/capacity |
| C14 ADLC | Covered / Release owner / exact effect receipts |
| C15 Projections | Covered / Product / audience review |
| C16 Successor | Covered / Product / actual versus target |

16/16 dispositioned: 15 covered, one deferred, none inapplicable. Disposition is not acceptance.

| PRD-TAD-ADR-MVP-GTM | CID | RAO | Updated Date |
|---|---|---|---|
| aviation-evidence-layer@0.3.3 | C: published PR8 observed corpus; reproduced ownership races; user authorized remaining modules. I: inspect exact evidence and implement bounded generic volume geometry. D: source accessor/race fixes plus lazy projection/UI and authored synthetic data; remaining ETA/notice/benchmark software pending. | R: Engineering. A: implement within admitted owners and preserve original identities. O: source drilldown and volume candidate. check: VCC-1/2/5/6/8/10/11; 75 tests/budgets and bounded browser proof passed; publication pending. | 2026-10-04 |
| aviation-evidence-layer@0.3.3 | C: no commercial outcomes; iPhone Safari explicitly SKIP/KIV. I: retain honest acceptance and learning records. D: separate software readiness, real-data gates and user-deferred device work. | R: Product. A: synchronize six projections without changing thresholds. O: reviewable scope and evidence gaps. check: eleven VCCs, joins and EXP-1/3/4; no phone pass. | 2026-10-04 |

## ADLC and handover

Baseline MIT shell `438038865fd25c9d2a07ff50fcb75e2666e08b7c`; Agentic OS pin `e0ef770860905830157e64c455f0a342084b6d25`. Preserve Drone Dashboard @0.2.1 joins. Current increment: native admitted successor; 75 tests/budgets passed; publication pending; no protected integration/deployment receipt.

R1 cap ≤8 active hours /3 iterations, refresh after 2 no-progress attempts; bounded increment checks first. Docs cap: 12 active minutes for this update, 6 aviation files, target ≤70 KiB (hard cap75 KiB), <600 lines/file. Two new volume modules lazy-load beyond the original three; served JS total94,193 B (+71,171 B); no volume modules requested until workspace/tool invocation. UI adapter9,823 B refreshes the9kB cap to10kB to retain the visible command fallback; pure projector11,974 B stays≤12kB. Total added-JS cap75,000 B is unchanged. Serving spend/model cap0; authoring token/cost telemetry unknown. External waits identify input/recheck rather than ETA.

Native START→check:plan→check→RELEASE; immutable published candidates need successor. Integration/DEPLOY require exact separate authority/receipts and retained predecessor. Recovery distinguishes session/source/shell/delivery; local preview is not production.
