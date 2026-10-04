---
title: "Aviation Evidence Layer — local file MVP"
doc_type: "PRD-TAD-ADR-MVP-GTM"
version: "0.3.2"
revision: "0.3.2"
date: "2026-10-04"
lang: "en-US"
continuity_id: "aviation-evidence-layer"
prd_revision: "0.3.2"
tad_revision: "0.3.2"
adr_revision: "0.3.2"
mvp_revision: "0.3.2"
gtm_revision: "0.3.2"
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

This joined package is the implementation successor **aviation-evidence-layer@0.3.2**. Its bounded sections are [validation and runbook](validation-runbook.md), [rights and recovery](rights-recovery.md), [discovery and pilot](discovery-pilot.md), [financial model](financial-model.md), and [venture projections](venture-projections.md). They consume this revision; they do not introduce independent product ownership.

Published **0.3.1**: `00de702300d6369e304bd7d39a9e04d8ceb71a92`, tree `2d44626b3d02ed2bcb79498603dbf32d6b25111c`, [PR #7](https://github.com/huijoohwee/81rv10/pull/7), green synthetic-merge CI. Successor `aviation-singapore-corpus` adds observed data and offline preparation: seven adapter tests/bounded browser checks passed; 61 tests/budgets passed; publication pending. The original @0.2.0 specification retains historical diagrams/findings; no protected integration, deployment, demand or operational authority follows.

## Context, scope and authority

The user selected the FOSS shell; native START admitted baseline438038865fd25c9d2a07ff50fcb75e2666e08b7c. Drone Dashboard/Launch Copilot retain their owners. Aviation specifics live in authored data; runtime remains generic. No external renderer is required.

Covered work includes implementation, checks and local preview. Publication, integration and deployment need separate native receipts. Customer/contact/payment/production outcomes are absent. Flight simulation proof closes no aviation VCC.

## PRD

### Outcome and buyer hypothesis

Enable an analyst to import a bounded permitted bundle, inspect the source and age of every fact, reproduce its chronology offline, and hand another reviewer the unchanged original plus a verifiable derived record. Buyer: an operations, safety or analytics team lead; user: the analyst reconstructing one disputed flight. Both segment fit and WTP remain hypotheses. The first real demonstration follows one Singapore–Riau observation segment within an authored Singapore/Johor/Riau study window; the selected points do not establish a Johor flight or a regional market.

| Pain / priority | Hook → break → fix → close | Reuse/build and evidence |
|---|---|---|
| P2 reconciliation / 1 | Disputed fact → sources disagree or omit metadata → source-labelled record with explicit gaps → reviewer identifies what is known and missing | Reuse file shell and digest primitives; build bounded generic admission plus authored aviation profile. Pain unvalidated; EXP-1 supplies quotes and frequency. |
| P3 chronology / 2 | Reviewer needs the same sequence → screenshots/manual joins lose ordering → deterministic UTC replay → equal-input outputs can be compared | Build pure generic replay; no model, simulation enrichment or live dependency. Value unvalidated; EXP-2/4. |
| P1 prediction / deferred | Uncertain arrival → no permitted truth/backtest → retain historical evidence first → reconsider only after paying need and data access | ETA/advisory are not implemented or silently represented by replay. |
| P4/P5 restrictions/efficiency / deferred | Need applicable constraints or alternatives → data/model rights absent → preserve unknowns → seek separately bounded evidence | Notice parsing, route benchmarking and 3D volumes stay outside this MVP. |

### User loop and acceptance

J1 obtain a permitted file → J2 import with atomic admission → J3 inspect conflicts/missing values/source age → J4 choose UTC and replay → J5 export/reimport and verify → J6 decide whether another case merits a pilot. Invalid or superseded work retains the most recent accepted session. No account, cloud upload or mandatory external map is required.

| Story | Given / when / observable outcome | Trace |
|---|---|---|
| PRD-E1-S1 Must | Given permitted or synthetic bytes, import; every accepted fact exposes source/time/units and missing/conflicting values remain visible | CONTRACT, SHELL, VIEW; ADR-001/002; VCC-1/5/6/11 |
| PRD-E1-S2 Must | Given the same accepted bundle, algorithm revision and UTC query, replay; ordered output is byte-identical across runs and gaps remain explicit | REPLAY; ADR-001/003; VCC-2/5/6/11 |
| PRD-E5-S1 Must | Given an accepted bundle, export and reimport; original-byte hashes and version-bound derived identity match, or failure is explicit | CONTRACT, SHELL; ADR-003/006; VCC-8/5/6/11 |
| PRD-E2-S1 Should, deferred | Permitted prediction backtest and advisory lead-time evidence | ETA/ALERT; predecessor VCC-3/4; paying need and independently observed truth required |
| PRD-E4-S1 Should, deferred | Structured notice geometry/time/altitude independently agrees | AIRSPACE; predecessor VCC-7; permitted labelled notices required |
| PRD-E3-S1 Should, deferred | Reproducible route counterfactual with stated model and error band | BENCH; predecessor VCC-9; model/rights/benchmark admission required |
| PRD-E6-S1 Could, deferred | Compatible vertical-reference volume geometry within specified tolerance | AIRSPACE/VIEW; predecessor VCC-10; source/datum/render rights required |

The deferred criteria retain the exact predecessor thresholds; omission from this implementation is not satisfaction. No operational ATC/dispatch/navigation, aircraft actuation, free-text clearance, write-back, passenger/crew processing, global completeness, diagnosis or safety certification is offered.

| Metric | Target and basis | Current disposition |
|---|---|---|
| Clean setup | ≤60 minutes on the documented supported environment | Predecessor clean archive installed in1.443673792s on Node22.22.3/npm10.9.8/macOS27; fresh origin53350 had0 workers/caches before provision succeeded. Full setup timing pending |
| First useful record | ≤15 minutes / 3 main actions after provisioned shell and fixture | Published0.3.1 synthetic record375ms/1action;0.3.2 real-corpus timing pending; neither measures buyer value |
| Replay and export | ≤5 minutes after accepted import / 3 main actions | Historical Previous+Prepare638ms/2actions; actual primary save unverified, so target remains open |
| Local serving effects | 0 models, 0 billed APIs, 0 required external requests | Published0.3.1 synthetic path verified;0.3.2 real sample observed0 external requests; native workspace is separate |
| Bounds | Original UTF-8 JSON <500,000 B; ≤10 flights, ≤5,000 facts, ≤24-hour window | Published0.3.1 passed54 tests;0.3.2 passed61 tests/budgets; publication pending |
| New product code | ≤2 generic core modules +1 generic UI module; <600 lines/file; each emitted resource <500,000 B; initial added JS ≤75,000 B |Current JS68,402B (+415B;45,380B vs baseline); offline adapter7,324B/1 preparation module, not served; native budgets passed |
| Device reach | Desktop and 360–430 CSS px mobile; keyboard/touch, readable table, focus, reduced motion, 200% zoom | Emulated widths/keyboard/sample contrast/reduced motion/page scale observed; physical touch/full text zoom/clean new-device setup untested |
| Value / retention | ≥10 minutes saved on a comparable task and weekly use for four weeks | EXP-4 unrun; cannot be inferred from synthetic tests |

Impact, reach, labour valuation and support costs remain unknown. [ROI/TCO formulas](financial-model.md) prevent unknown inputs becoming zero. Technical feasibility is authorized; the commercial baseline and dependent audience decisions remain explicitly unvalidated.

## TAD

### Owners and dependency direction

| Owner | Responsibility | Existing seam / smallest change |
|---|---|---|
| CONTRACT | Bounded UTF-8 admission, authored-profile validation, original bytes and digests, typed errors | Reuse repository conventions; generic core module consumes profile rather than aviation constants |
| REPLAY | Stable ordering, latest accepted fact at UTC, canonical derived identity and read queries | Generic pure core module; no clock/random/network |
| SHELL / VIEW | Local intake, accepted-session revision fence, accessible records/replay/export and status | One generic UI adapter in the existing FOSS shell; no new renderer |
| TOOLS | One declared schema/dispatcher for module, CLI, MCP, browser and aliases | Existing tool/stdio owners extend asynchronously; transport adapters do not duplicate semantics |
| PROFILE / FIXTURE | Fields, units/datum policy, sample labels, study selection and real/synthetic examples | Authored JSON; generic runtime has no mission, vendor or geographic rule |
| OFFLINE PREPARATION | Bounded provider-format mapping with preserved upstream bytes and mapping pointers | `scripts/import-readsb.mjs` consumes a source and authored selection; no browser feed or provider fetch |
| STATIC / CACHE | Read-only local service and explicit provisioned shell cache | Existing server/service-worker owners; bundle files are separately authoritative |

Bindings: CONTRACT `app/evidence-kernel.mjs`; REPLAY `app/evidence-replay.mjs`; VIEW `app/evidence-view.mjs`; `app/profiles/aviation-v1.json`; synthetic/observed examples in `app/fixtures`; declaration `app/tools.mjs`; CLI/MCP `mcp.mjs`. Input schema `aviation-evidence-bundle/v1` <500,000B; pack `evidence-pack/v1` ≤2,000,000B including originals/metadata, with bounded outer escaping. Input limits waive no emitted-resource budget.

### Singapore–Riau observed corpus

`app/profiles/singapore-region.json` authors the WGS84 study extent latitude **0.5–2.6**, longitude **102.7–105.1**, and UTC selection **2026-10-03 10:37–10:53**. This is an analyst filter, never an official FIR, sovereignty boundary or clearance zone. The actual selected span is **10:37:19.240–10:52:12.830Z**:56 non-stale `adsb_icao` positions from aircraft hex `76b452`, each paired with an altitude fact, plus5 explicit unknowns (registration, operator, weather, schedule, restrictions):117 facts. Preserved source metadata is not promoted into time-aligned facts. No interpolation, flight-leg/touchdown inference or route enrichment occurs.

The276,932B bundle retains all708 upstream rows/146,788B inside `sources[0].original.text` → parsed `upstream.text`, plus selection/row indices/fact pointers. Exact bundle, envelope, upstream and derived hashes are in the runbook/config. Altitude follows readsb bit8: geometric, otherwise pressure; feet stay feet. Ground/null never imply numeric altitude or touchdown. [Rights](rights-recovery.md#source-and-data-admission) binds pinned terms/schema.

`app/profiles/workspaces.json` owns real/synthetic choices; the generic view renders them. Cache0.3.2 provisions both examples. Aviation profile v1 and algorithm `evidence-order/v2` are unchanged, so existing v2 packs remain compatible. The adapter is offline preparation, not a live runtime source. The corpus is one crowdsourced segment, not a30-minute predictive benchmark, independent truth or regional coverage claim.

The authored `workspaces.json` also selects Graph4213 with exact `docs/workspace-seeds/agentic-graph-game-flight-sim-demo.md` and native `kgPreview=1&kgLiveHero=1`; the plain kgDoc link opens source editing. Existing frame ownership remains. Graph061df9dc9df465f9b54281d576fc9c81f1b092da retains separate renderer/source/license/offline requirements. Frame load alone is not document parity; simulation never populates evidence.

Source → CONTRACT → REPLAY → TOOLS and VIEW is the acyclic dependency direction. PROFILE is data admitted by CONTRACT; VIEW never becomes the schema owner. No database, generic package extraction, second tool registry, background feed or remote API is introduced.

### Admission and evidence semantics

Original bytes are authoritative. Strict UTF-8, bounds and exact revisions are checked before state replacement; malformed times/coordinates/units/IDs/datum fail. Hashes identify bytes, not authenticity.

Every fact has stable fact/flight/source identity, observed and retrieved UTC, declared units/reference and evidence linkage. Unknown registration/operator/weather/schedule/restrictions retain an explicit reason. WGS84 coordinate and altitude interpretation belongs to the authored aviation profile. Do not equate pressure, geometric, AMSL, AGL or flight level; only declared compatible unit conversion is allowed.

Successor algorithm `evidence-order/v2` binds canonical JSON (sorted object keys, finite JSON values, original array order), stable observed-UTC/source-ID/fact-ID ordering and replay rules. Replay selects the latest fact per source/kind at or before explicit UTC, retaining all exact-time ties. Disagreement compares UTC instants and authored compatible decimal unit values while detached original bytes remain unchanged. Comparison multiplies the canonical number spellings as integer coefficients and powers of ten, with no epsilon; display numbers round once from that exact product. Source values are never rewritten. Any selected source age beyond the profile's60-second threshold marks the field stale; gaps cover eligible source/kind intervals and latest observation→query, without inventing a leading interval before the first known fact. No implicit interpolation, clock, randomness, simulation substitution or remote enrichment enters output.

Invalid import keeps the accepted state. An earlier asynchronous read cannot overwrite a later accepted selection; commit binds the same admission revision. Text is rendered as text. Source URLs are evidence strings, never automatically fetched. Delete/reset clears the selected session; exported files remain under their owner's control.

### Five flows

The six predecessor diagrams remain historical @0.2.0 notation. Current flows, without a new rendered-diagram claim:

| Flow | Ordered boundary / alternate |
|---|---|
| Journey | Local import → source/gap inspection → UTC replay → export → reviewer reimport → pilot decision |
| Workflow | Bounded admission → current-revision commit → read/export; invalid or stale completion retains accepted state |
| Data | Original bytes + revisions → rebuildable projections and identity; originals never overwritten |
| Harness | UI/CLI/MCP/WebMCP/alias → shared typed dispatcher → pure query; unsupported/mutation inputs fail |
| Topology | Operator files ↔ browser; optional loopback/stdio share contracts; explicit cache includes examples; no runtime provider call |

### Invocation and trust

Inspection/replay are read-only; export prepares an operator file. CLI/stdio accept only supplied bytes and typed inputs. WebMCP is feature-detected with visible fallback. Unknown names/fields/revisions/mutations fail. The shared declaration and [runbook](validation-runbook.md) own invocation, not adapter-specific schemas.

Evidence queries execute once with no dynamic code, scheduler, payment, aircraft command or token issuer. The explicit native connection is separate; evidence URLs are never fetched. Export stays operator-controlled.

## ADR

These choices concern bounded local-file reconstruction. The observed sample has an explicit database licence; missing rights or labels still block their dependent source or benchmark adoption.

| ID | Decision / alternatives | Consequence / cost / recovery |
|---|---|---|
| ADR-001 | Deterministic record/replay first; defer predictive models and free-text agents | No model/paid dependency or predictive promise. Revisit on paid P1 demand plus permitted truth; fall back to record/replay. |
| ADR-002 | Local permitted files; offline readsb mapper plus authored Singapore selection; live adapters deferred | ADSB.lol database attribution/ODbL travel with the real sample; synthetic remains separately labelled. Preserve full upstream bytes and mapping; no live completeness claim. |
| ADR-003 | Portable originals + rebuildable memory; database/sync deferred | Detach caller-owned byte views. Algorithm v2 rejects v1-derived packs; explicit original-byte reimport creates a new derived identity. Container schema stays evidence-pack/v1; no silent migration. |
| ADR-004 | User-selected 81rv10 MIT shell at 4380388; existing server/cache/tools reused. Private Graph wrapper and new renderer excluded | Small inspected source delta and FOSS distribution basis for this repository's own code. No Graph assets or host chunk waiver. Measure every new emitted resource and offline dependency. |
| ADR-005 | One read-only declared tool owner, shared across adapters; write-back/gateway deferred | Add no independent schemas or external authority. Unsupported WebMCP falls back visibly. Revisit remote gateway only for two authorized consumers. |
| ADR-006 | Original-byte hashes plus revision-bound derived digest; signing/notarization deferred | Integrity comparison, not authenticity/legal evidence. Retain exact originals and disclose this limit; signing requires a separate custody/recovery design. |

Constraint screen: existing MIT shell/no-paid design fits this local slice; exact current size/offline checks remain required. Additional sources need rights/coverage review. Hosted/live variants and a new renderer are outside this minimum-change scope. DM-A/B/C costs stay separate; host choice is not an economic winner claim.

## MVP and verification

The implemented slice remains PRD-E1-S1/E1-S2/E5-S1. Published0.3.1 repaired byte aliasing, equivalent UTC strings and decimal-converted false conflicts, superseding the earlier broad5/6-Must claim. Its54 tests/budgets and bounded v2 browser receipts remain in the [runbook](validation-runbook.md) and immutable published predecessor. This0.3.2 increment has seven passing adapter tests and bounded browser/offline proof:117 facts,390px table,11/11 worker responses/0 external, UI pack read via DOM and actual-chooser identity-preserving reimport. Clipboard bridge failed; direct save remains unverified. 61 native tests and budgets passed; exact publication remains pending. VCC-5 remains partial: primary-download timing, physical iPhone/touch, full200% browser zoom and complete clean setup remain open. All11 VCC conditions and deferred VCC-3/4/7/9/10 thresholds remain unchanged. Local rung is spec-complete; delivered rung undocumented; no full-product acceptance follows.

Use the 180-second [demo](validation-runbook.md#180-second-demo). Its Reveal is repeatable canonical output plus original-byte export/reimport, not a simulation. Rehearsal can prove a bounded technical workflow; only EXP-1/3/4 can supply buyer and usage evidence.

## GTM and venture record

Offer hypothesis: one analyst team reviewing Singapore and surrounding airspace receives a portable reconstruction walkthrough for one permitted case, with provenance/gaps and independent reproduction. Geography selects the initial demonstration; it does not qualify a buyer or establish regional demand. Alternatives are manual reconciliation, source tools, in-house analytics and doing nothing. No validated advantage or customer reference exists.

[Discovery and pilot](discovery-pilot.md) supplies consent, interview, offer and experiment records. Price/currency are deliberately unset pending an authorized real offer; a literal first dollar is collection evidence only, not sustainable WTP. Order, fulfilment, recognized revenue, cash, refunds and repeat use are separate events.

[Financial model](financial-model.md) owns dated assumptions A01–A16, three deployment variants, linked statement formulas and Base/Downside/Upside drivers. [Venture projections](venture-projections.md) is an internal compact deck/business plan, with claim statuses and no public distribution. No funding ask or payment integration is authorized.

## Coverage and planning

| Domain | Disposition / owner / remaining check |
|---|---|
| C01 Pain | Covered hypothesis / Product / EXP-1 interviews |
| C02 Market | Deferred sizing / Commercial / two independent source-based methods and reconciliation |
| C03 Offer | Covered draft / Founder / declare terms and observe EXP-3 |
| C04 Journeys | Covered specification / Product / VCC-1/2/5/8 |
| C05 Architecture | Covered host/owner selection / Architecture / source and parity checks |
| C06 Quality/rights | Covered controls / Engineering / negative, offline, rights checks |
| C07 Decisions | Covered ADR-001–006 / Architecture / revisit changed constraints |
| C08 MVP | Covered bounded loop / Product / six Must VCC receipts |
| C09 GTM/learning | Covered experiment protocol / Product / real outcomes pending |
| C10 Operations | Covered runbook / Operations / timed recovery/support observation |
| C11 Obligations | Covered rights/contract checklist / Operator / real-data and commercial decisions unresolved |
| C12 Finance | Covered executable formulas / Finance / input actuals and reconciled numeric statements unknown |
| C13 Capital | Covered bootstrap/no-spend bound / Founder / opening cash/capacity unknown |
| C14 ADLC | Covered admitted implementation / Release owner / exact checks, publication/integration/deploy receipts |
| C15 Projections | Covered internal drafts / Product / audience-ready evidence/review pending |
| C16 Successor | Covered decisions / Product / actual-versus-target and next experiment |

16/16 dispositioned; 15/16 covered, one deferred, none inapplicable. Coverage is a record disposition, not acceptance.

| PRD-TAD-ADR-MVP-GTM | CID | RAO | Updated Date |
|---|---|---|---|
| aviation-evidence-layer@0.3.2 | C: published00de/PR7; selected Singapore–Riau real sample and synthetic control. I: ground reproducible local review in observed data. D: admit bounded offline mapping and authored study selection; validate exact successor. | R: Engineering. A: implement generic contracts/replay/UI with authored profile and shared adapters. O: bounded local import/replay/export with exact-source VCC evidence. check: VCC-1/2/5/6/8/11. | 2026-10-04 |
| aviation-evidence-layer@0.3.2 | C: source-specific ODbL admission; no customer or payment outcomes. I: prepare an honest paid learning loop. D: prepare consent/interview/offer/model records without sending or collecting. | R: Product. A: prepare bounded experiment and venture materials. O: usable drafts with pending inputs and effect boundaries. check: package joins, formulas, claim/source labels; outcomes require EXP-1/3/4. | 2026-10-04 |

## ADLC and handover

Source inspection baseline: 81rv10 `438038865fd25c9d2a07ff50fcb75e2666e08b7c`; repository MIT license; Agentic OS package `e0ef770860905830157e64c455f0a342084b6d25`. Preserve the original Drone Dashboard @0.2.1 joins. Published0.3.1 release is bound above;0.3.2 passed61 tests/budgets; publication pending; bounded browser proof is in the runbook. No protected integration or deployment is claimed.

R1: ≤8 active hours/3 iterations; refresh after2 no-progress attempts; first cycle≤90min. Runtime: ≤3 new product modules, limits above. Docs: ≤20 active minutes,6 files/75KiB total,<600 lines each. Paid/model serving cap0; authoring token/cost telemetry unknown. External waits state missing input/recheck, not ETA.

Native START → check:plan → check → RELEASE publication; immutable candidates require successor. Integration and DEPLOY need separate authority/receipts, selected target/controller and retained predecessor. Local preview is not production. [Recovery](rights-recovery.md) distinguishes session/source/shell/delivery; handover states exact checks, unresolved acceptance and next owner action.
