---
title: "Aviation Evidence Layer — local file MVP"
doc_type: "PRD-TAD-ADR-MVP-GTM"
version: "0.3.1"
revision: "0.3.1"
date: "2026-10-04"
lang: "en-US"
continuity_id: "aviation-evidence-layer"
prd_revision: "0.3.1"
tad_revision: "0.3.1"
adr_revision: "0.3.1"
mvp_revision: "0.3.1"
gtm_revision: "0.3.1"
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

This joined package is the implementation successor **aviation-evidence-layer@0.3.1**. Its bounded sections are [validation and runbook](validation-runbook.md), [rights and recovery](rights-recovery.md), [discovery and pilot](discovery-pilot.md), [financial model](financial-model.md), and [venture projections](venture-projections.md). They consume this revision; they do not introduce independent product ownership.

Published predecessor0.3.0 is `209483a5fc777ace22d8acca1e9d6fe9a6921418`, tree `b807272b4915a8347aa434cd6b2de895a53464bc`, [PR6](https://github.com/huijoohwee/81rv10/pull/6). Its green synthetic-merge CI is not protected integration. Native successor `aviation-normalization-proof` admits this repair; its54-test/browser repair proof is recorded below; publication is pending. The historical specification is @0.2.0, SHA-256 `817d6af75e5d8e327560dbf6408291c1e0bd0f3fce9b5095501d2e24b1d185d9`. Its historical sources, diagrams, findings and evidence remain preserved in that record and its immutable sidecars. This increment changes the real-data feasibility host to the user-selected **81rv10 FOSS shell**, and implements the three Must stories using an explicitly synthetic local bundle. It does not claim observed flight data, validated demand or operational aviation authority.

## Context, scope and authority

The user selected the existing FOSS shell and authorized implementation. Native START admitted the 81rv10 lane on `438038865fd25c9d2a07ff50fcb75e2666e08b7c`. The existing Drone Dashboard and Launch Copilot reference remain owned by their existing records. The aviation page has its own authored profile and fixture; a universal runtime consumes them. There is no Graph/GameXR source incorporation or external renderer requirement.

Implementation, independent checks and local preview are covered work. Exact publication, protected integration and deployment each require their native receipts. Customer contact, consent, restricted-data ingestion, contracts, payment and production promotion have no completed evidence here. Existing native Flight simulation proof does not satisfy any aviation VCC.

## PRD

### Outcome and buyer hypothesis

Enable an analyst to import a bounded permitted bundle, inspect the source and age of every fact, reproduce its chronology offline, and hand another reviewer the unchanged original plus a verifiable derived record. Buyer: an operations, safety or analytics team lead; user: the analyst reconstructing one disputed flight. Both segment fit and WTP remain hypotheses.

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
| First useful record | ≤15 minutes / 3 main actions after provisioned shell and fixture | Algorithm-v2 provisioned offline record375ms/1action; predecessor fresh-origin record391ms/1action. Synthetic, not buyer value |
| Replay and export | ≤5 minutes after accepted import / 3 main actions | Published209483a Previous+Prepare638ms/2actions; actual save unverified, so target remains open |
| Local serving effects | 0 models, 0 billed APIs, 0 required external requests | Verified for bounded fixture read paths; native workspace remains a separate explicit external connection |
| Bounds | Original UTF-8 JSON <500,000 B; ≤10 flights, ≤5,000 facts, ≤24-hour window | Successor54-test validation passed; exact candidate publication pending |
| New product code | ≤2 generic core modules +1 generic UI module; <600 lines/file; each emitted resource <500,000 B; initial added JS ≤75,000 B |3 original modules/0 added by repair; served JS67,987B versus23,022B baseline, added44,965B; largest kernel22,197B/306lines; budgets passed |
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
| PROFILE / FIXTURE | Domain fields, constraints, units/datum policy, sample labels, scenario and synthetic facts | Authored JSON; no mission, vendor or geographic rule hardcoded into generic runtime |
| STATIC / CACHE | Read-only local service and explicit provisioned shell cache | Existing server/service-worker owners; bundle files are separately authoritative |

Source bindings: CONTRACT `app/evidence-kernel.mjs`; REPLAY `app/evidence-replay.mjs`; VIEW `app/evidence-view.mjs`; profile `app/profiles/aviation-v1.json`; fixture `app/fixtures/aviation-synthetic-v1.json`; shared declaration `app/tools.mjs`; CLI/MCP `mcp.mjs`. Source bundle schema is `aviation-evidence-bundle/v1`; portable pack is `evidence-pack/v1`. Original input limit499,999B remains; pack limit2,000,000B accounts for preserved JSON bytes/metadata, with bounded outer escaped transport framing. These data-input limits are not emitted-resource budget waivers.

Latest user-directed connection: authored `app/profiles/workspaces.json` selects Graph at `http://127.0.0.1:4213/` and exact `docs/workspace-seeds/agentic-graph-game-flight-sim-demo.md`. The frame combines the existing `kgDoc` link with authored `kgPreview=1&kgLiveHero=1`, matching the native preview contract; Open source workspace retains plain `kgDoc`. The existing generic frame owner handles load/close. Graph remains at unchanged061df9dc9df465f9b54281d576fc9c81f1b092da, with separate source/renderer, availability, license, bytes and offline requirements. A frame loading does not prove selected-document parity; simulation never populates the aviation evidence bundle.

Source → CONTRACT → REPLAY → TOOLS and VIEW is the acyclic dependency direction. PROFILE is data admitted by CONTRACT; VIEW never becomes the schema owner. No database, generic package extraction, second tool registry, background feed or remote API is introduced.

### Admission and evidence semantics

The original byte sequence is authoritative. Decode strict UTF-8, enforce byte/count/time bounds, validate the exact profile revision and reject malformed timestamps, nonfinite coordinates, unknown units, duplicate IDs or incompatible datum before replacement. Profile/schema/algorithm revisions bind derived identity. A digest identifies bytes; it proves neither truthful origin nor legal non-repudiation.

Every fact has stable fact/flight/source identity, observed and retrieved UTC, declared units/reference and evidence linkage. Unknown registration/operator/weather/schedule/restrictions retain an explicit reason. WGS84 coordinate and altitude interpretation belongs to the authored aviation profile. Do not equate pressure, geometric, AMSL, AGL or flight level; only declared compatible unit conversion is allowed.

Successor algorithm `evidence-order/v2` binds canonical JSON (sorted object keys, finite JSON values, original array order), stable observed-UTC/source-ID/fact-ID ordering and replay rules. Replay selects the latest fact per source/kind at or before explicit UTC, retaining all exact-time ties. Disagreement compares UTC instants and authored compatible decimal unit values while detached original bytes remain unchanged. Comparison multiplies the canonical number spellings as integer coefficients and powers of ten, with no epsilon; display numbers round once from that exact product. Source values are never rewritten. Any selected source age beyond the profile's60-second threshold marks the field stale; gaps cover eligible source/kind intervals and latest observation→query, without inventing a leading interval before the first known fact. No implicit interpolation, clock, randomness, simulation substitution or remote enrichment enters output.

Invalid import keeps the accepted state. An earlier asynchronous read cannot overwrite a later accepted selection; commit binds the same admission revision. Text is rendered as text. Source URLs are evidence strings, never automatically fetched. Delete/reset clears the selected session; exported files remain under their owner's control.

### Five flows

The predecessor's six diagrams remain historical @0.2.0 notation. This revision's operative flow inventory below replaces the host-specific proposed topology without claiming a new rendered diagram check.

| Flow | Ordered boundary / alternate |
|---|---|
| Journey | Analyst file → local import → source/gap inspection → UTC replay → portable export → reviewer reimport → pilot decision |
| Workflow | Select bytes → bounded admit → current revision commit → inspect/replay/export; invalid/stale result → typed rejection and retained accepted state |
| Data | Original bytes + profile revision → accepted session → rebuildable ordered projections → original export + canonical identity; originals are never overwritten by projections |
| Harness | UI/CLI/MCP/WebMCP/alias → one typed declaration/dispatcher → one pure query → typed bounded result; unknown/mutation names fail; no model, retry loop or external effect |
| Topology | Operator files ↔ local browser; optional loopback static server and stdio process consume the same contracts. Provisioned cache stores shell resources, not evidence or customer authority. External providers are absent. |

### Invocation and trust

Inspection and replay are read-only; local export prepares a user-controlled file, not publication. CLI/stdio arguments refer only to explicitly supplied local bytes and typed query inputs. WebMCP is feature-detected; an unavailable API must retain visible UI/command fallback. Unknown tool names, extra fields, unsupported revisions and mutation requests fail loudly. All route names and argument fields are bound to the implementation's single capability declaration, with actual invocation examples maintained in the [runbook](validation-runbook.md).

One invocation is the maximum evidence-query loop. No dynamic code execution, arbitrary shell, ingestion scheduler, payment, aircraft command or token issuer is an evidence capability. The explicit native workspace connection is separate from data reads; evidence URLs are never auto-fetched. Original/evidence export may disclose the supplied bundle, so the UI states its local-file boundary.

## ADR

All choices below concern one local synthetic-file feasibility slice. Unknown data/provider rights block their dependent adoption, not local inspection or authored fixtures.

| ID | Decision / alternatives | Consequence / cost / recovery |
|---|---|---|
| ADR-001 | Deterministic record/replay first; defer predictive models and free-text agents | No model/paid dependency or predictive promise. Revisit on paid P1 demand plus permitted truth; fall back to record/replay. |
| ADR-002 | Local synthetic/permitted file input first; live aggregator/receiver adapter deferred | Synthetic authoring resolves this fixture's source provenance without granting real-data rights. No live completeness; disable a drifted source and retain originals. |
| ADR-003 | Portable originals + rebuildable memory; database/sync deferred | Detach caller-owned byte views. Algorithm v2 rejects v1-derived packs; explicit original-byte reimport creates a new derived identity. Container schema stays evidence-pack/v1; no silent migration. |
| ADR-004 | User-selected 81rv10 MIT shell at 4380388; existing server/cache/tools reused. Private Graph wrapper and new renderer excluded | Small inspected source delta and FOSS distribution basis for this repository's own code. No Graph assets or host chunk waiver. Measure every new emitted resource and offline dependency. |
| ADR-005 | One read-only declared tool owner, shared across adapters; write-back/gateway deferred | Add no independent schemas or external authority. Unsupported WebMCP falls back visibly. Revisit remote gateway only for two authorized consumers. |
| ADR-006 | Original-byte hashes plus revision-bound derived digest; signing/notarization deferred | Integrity comparison, not authenticity/legal evidence. Retain exact originals and disclose this limit; signing requires a separate custody/recovery design. |

Constraint screen: selected local shell passes the inspected MIT source/no-paid-dependency design constraints; emitted size/offline/runtime constraints need new proof. Operational sources fail until rights/coverage are checked. Mandatory hosted/live variants fail this local/offline slice. A new renderer fails minimum-change scope. No unsupported economic winner is claimed: user selection establishes host choice, while DM-A/B/C costs stay separate.

## MVP and verification

The implemented slice remains PRD-E1-S1/E1-S2/E5-S1. New counterexamples invalidate the predecessor's broad5/6-Must claim: caller Buffer mutation changed admitted originals; equivalent UTC strings and decimal-converted units produced false conflicts. Successor54 tests and v2 browser checks now exercise those corrections and offline update-race recovery; prior46-test receipts remain historical. [Validation](validation-runbook.md) retains history. VCC-5 remains partial, including primary-download timing, phone/touch and full200% browser zoom. Deferred VCC-3/4/7/9/10 and their thresholds are unchanged; no full-product acceptance follows.

Historical0.3.0 browser evaluation SHA-256 `813c9c36ee149fe44fc3bb05f85e0639364ff93676e4a29b86a0041849fea8a4` records UI/WebMCP inspection and replay equality; copied13,734B pack→saved file→actual file-chooser reimport→CLI agreement;13/13 service-worker responses and0 external/model/billed-API calls. Original identity `4750f8d966fc1ebbe690343a1c44ed2d60241d5035844b55642be96fb93438fd`; derived `5707401b826894efc2cf53c362aa13e26453461debbcc2cdfdbf8d25a37f1e95`. Direct in-app download events timed out; the verified clipboard/file fallback is explicit. Actual adapter-unavailable/rejection and worker storage-failure handler tests passed in final validation.

The historical0.3.0 browser recheck after shared registration refactoring retained UI/WebMCP equality (`browser-parity-final.json`, SHA-256 `53067df4d49834649f907cfce2a932adc9a0d93debbb52c98ec37d7d76c7d353`) and recorded11/11 service-worker responses in the newest cache reload (`offline-network-exact.json`, `034c8db08822540c1c4d1490a9ac7405d757464230981692a834ebc6c77a013f`). Earlier counts remain historical. Mixed-timestamp selection, cleared hidden data and corrupt-pack identity retention were observed; the exact external Flight document was Ready in the native embed. Local rung stays spec-complete, delivered rung undocumented because VCC-5 is incomplete.

Historical0.3.0 native validation receipt `final-validation/receipt.json`, SHA-256 `f3868e08790da6bf338d59a23e5450f5cbd54cf42b322d35ffffd73e90ddd270`, passed46/46 tests and budgets across24 changed paths at sourceDigest `5f4135dd246f6e3e87d76b5435d09c3c8d363206dd5e655af9419aaee11f71bc`. It includes actual adapter/worker negatives. Predecessor publication binds209483a/PR6 with green synthetic-merge CI; no protected merge/deploy follows. Successor54-test/budget receipt and browser artifacts are in the runbook; this documentation update follows that receipt. Native publication must bind its resulting exact candidate.

Use the 180-second [demo](validation-runbook.md#180-second-demo). Its Reveal is repeatable canonical output plus original-byte export/reimport, not a simulation. Rehearsal can prove a bounded technical workflow; only EXP-1/3/4 can supply buyer and usage evidence.

## GTM and venture record

Offer hypothesis: one team receives a portable reconstruction walkthrough for one permitted case, with provenance/gaps and independent reproduction. Alternatives are manual reconciliation, source tools, in-house analytics and doing nothing. No validated advantage or customer reference exists.

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
| aviation-evidence-layer@0.3.1 | C: permitted synthetic-file MVP selected; predecessor817d and native host4380388. I: deliver reproducible local evidence review. D: implement and independently test three Must stories in the admitted owner. | R: Engineering. A: implement generic contracts/replay/UI with authored profile and shared adapters. O: bounded local import/replay/export with exact-source VCC evidence. check: VCC-1/2/5/6/8/11. | 2026-10-04 |
| aviation-evidence-layer@0.3.1 | C: no customer, rights or payment outcomes. I: prepare an honest paid learning loop. D: prepare consent/interview/offer/model records without sending or collecting. | R: Product. A: prepare bounded experiment and venture materials. O: usable drafts with pending inputs and effect boundaries. check: package joins, formulas, claim/source labels; outcomes require EXP-1/3/4. | 2026-10-04 |

## ADLC and handover

Source inspection baseline: 81rv10 `438038865fd25c9d2a07ff50fcb75e2666e08b7c`; repository MIT license; Agentic OS package `e0ef770860905830157e64c455f0a342084b6d25`. Preserve the original Drone Dashboard @0.2.1 joins. Predecessor release and successor working-tree proof are bound above; successor publication remains pending.

R1 cap: ≤8 active hours, ≤3 iterations and stop/refresh after two no-progress attempts; first cycle≤90 active minutes; ≤3 new product modules, source limits above. Documentation cap refreshed after the full model/consent/projection and workspace-connection scope: ≤20 active minutes, six new documents, ≤75 KiB, <600 lines/file. Paid/model serving spend cap0; authoring token/cost actuals remain unknown unless telemetry supplies them. External waits name the missing input and recheck on response, not an ETA.

Follow native START → check:plan → check → RELEASE publication; immutable candidates use successor. Protected integration is separate. Local preview is not production; DEPLOY needs selected controller/target, integrated source, predecessor and effect authorization. [Recovery](rights-recovery.md) distinguishes session, shell, source and delivery recovery. Final handover must state exact code/checks, remaining acceptance, rights/commercial gaps and the next owner action.
