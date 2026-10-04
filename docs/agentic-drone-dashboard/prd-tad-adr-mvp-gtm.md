---
title: "Reference implementation — Agentic Drone Dashboard"
doc_type: "PRD-TAD-ADR-MVP-GTM"
version: "0.2.1"
revision: "0.2.1"
date: "2026-09-27"
lang: "en-US"
owner: "Drone Dashboard product function"
continuity_id: "agentic-drone-dashboard"
prd_revision: "0.2.1"
tad_revision: "0.2.1"
adr_revision: "0.2.1"
mvp_revision: "0.2.1"
gtm_revision: "0.2.1"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: false
frontmatter_contract: "required"
worktree_id: "agent/device-0232231d4a19/drone-dashboard-layout"
agent_id: "codex-root"
load_policy: "on-demand"
guideline_revision: "3.3.0"
---
# Reference implementation — Agentic Drone Dashboard

**Decision:** compose an indoor crop-scouting dashboard from existing owners, beginning with a fixed-route simulation and reviewable scouting evidence. Physical flight is a later, separately verified increment. The product is designed to run from `/Users/huijoohwee/Documents/GitHub/81rv10`; this package does not claim that runtime exists today.

This joined artifact is the product SSOT at **agentic-drone-dashboard@0.2.1**. [TAD and reuse](tad-reuse.md), [MVP and execution](mvp-release.md), and [GTM and venture projections](gtm-venture.md) are bounded sections of this same artifact, not competing plans. [Source grounding](source-grounding.json) pins inspected bytes. [Validation](validation.md) separates document checks from unperformed product checks.

**Context / intent / directive.** The user requests five REUSE surfaces and a non-autonomous, pre-programmed indoor Wi-Fi drone with no human manual piloting. Produce a source-grounded plan joining buyer pain, native contracts, acceptance criteria and the shortest credible paid learning loop. Product function specifies one bounded composition; the observable output is this five-role package. Document checking is separate from product acceptance.

**Authority and current state.** Documentation and read-only research are authorized. The target repository contains a Launch Copilot reference README, not a Drone Dashboard application. Native lifecycle preflight, START and RELEASE each returned `blocked-repository-trust-missing`. This package is staged outside canonical repositories; admission, implementation, publication, deployment, hardware actuation and outreach have no receipts here. Preserve the existing README/product reference. See [execution recovery](mvp-release.md#reference-implementation--execution-and-release).

## PRD

### Purpose, customer and pain

Enable a farm operations lead to specify a repeatable scouting route, understand exactly what was simulated or observed, and compare review effort with manual inspection. The buyer is an indoor leafy-greens farm operator; the daily user is a scouting technician; the beneficiary is the crop/quality team. The integrator connects existing source, visualization and receiver owners. One operator initially fulfils and supports the service.

| Pain | Evidence and present workaround | Economic impact | Priority / falsification |
|---|---|---|---|
| P1: upper-tier leaf inspection consumes time and misses coverage | User hypothesis: walking, ladders and rack sensors; no timed farm study supplied | Labour hours and unobserved canopy area; both unknown | 1. Validate 3 current workflows; stop if tier access is not a top-three pain |
| P2: an anomalous leaf is noticed too late | User hypothesis; no labelled incidents or crop-loss baseline | Avoidable crop loss may dominate WTP; attribution unknown | 2. Obtain retrospective incidents and agronomist review; no diagnosis claim |
| P3: source → simulation → receiver handoff loses identity | Five supplied browser annotations and source contracts confirm separate surfaces; no failure-rate baseline | Setup and repeated action time, support minutes | 3. Reuse existing exports and receipts; compare 5 timed handoffs |

No validated buyer pain or WTP currently outranks these hypotheses. P1/P2 govern discovery; P3 is the nearest existing technical slice that makes the P1 experiment reviewable. This is the rationale for simulation-first work, not proof of farm PMF.

### Reference implementation — corrections to the supplied market and hardware premise

- Singapore's current policy is Singapore Food Story 2: by 2035 build capacity for 20% of fibre and 30% of protein consumption. Treat “30 by 30” as historical context. [SFA, 8 May 2026](https://www.sfa.gov.sg/news-publications/newsroom/singapore-food-statistics-2025).
- Sustenir, Archisen and ComCrop are user-supplied prospect examples, not customers. Current websites substantiate only limited business descriptions; rack count, 2.5 m height, aisle clearance, procurement eligibility and current need remain site-specific unknowns. [Archisen](https://www.archisen.com/), [Sustenir](https://sustenir.com/). Do not treat a rooftop operator as an indoor-rack fit without qualification.
- “No incumbent” is unverified. Published indoor agricultural drone work already exists; it neither proves a direct commercial rival in Singapore nor permits an exclusivity claim. [Indoor farming feasibility study](https://edepot.wur.nl/549192), [indoor vertical-farm aerial manipulation research](https://arxiv.org/abs/2410.05738).
- User hardware designation `ESP32-WROOM-S3` needs exact module/board identification. The likely family is ESP32-S3-WROOM, but inspected GameXR diagnostics explicitly target ESP32-D0WDQ6 and lack motor PWM, arming and validated stabilization. Board pin maps are not portable. [Manufacturer module reference](https://www.espressif.com/en/module/esp32-s3-wroom-1-en).

### Operating meaning and exclusions

“Agentic” describes bounded software assistance with discovery, authoring, validation and evidence. The aircraft follows a pre-approved finite route. It does not use an LLM for actuation, choose its own route, pursue detected pests, or accept manual stick/tilt/throttle control in this product.

Automatic stabilization, localization, route tracking and deterministic failsafes are necessary control functions even for pre-programmed flight. If “non-autonomous” were intended to prohibit those too, physical unpiloted flight is infeasible; the product remains a simulator. An operator may authorize a mission, inspect evidence and trigger an emergency abort without manually piloting. No hidden manual takeover is an acceptance dependency.

**Won't this increment:** physical actuation/firmware port, autonomous replanning or exploration, multi-drone fleets, outdoor flight, spraying, harvesting, pest/disease diagnosis, guaranteed loss avoidance, cloud-dependent operation, paid models, paid hosting, new cross-repository source imports, public release, customer outreach or payment collection. Optional camera footage on a phone is not evidence from a drone camera.

### Journeys and experience

Farm lead's goal: decide whether a route and resulting scouting evidence could reduce effort. Trigger: missed upper-tier inspection → open mission → select a fixed route → inspect source and limits → validate → watch XR card → review labelled capture/coverage → export dossier → return for a comparable second mission. Friction moves from uncertain coverage to inspectable evidence; claimed benefit awaits measurement.

Integrator's goal: reproduce a reviewed mission. Discover owner/version → import source in the native workspace → inspect supported routes → validate and simulate → transfer the original path → inspect receiver acceptance → export provenance → diagnose a typed failure. One product registry projection resolves identities; an unsupported transport reports that fact.

Mobile layout: single column of cards, route status/abort first, native source panes selected by tabs, Block Library in the existing sheet, XR preview with inline non-immersive fallback, evidence list last. Desktop: status row, editor and XR side by side, receiver/evidence below. Use native settings, tokens, code fonts and icons. Keyboard access, visible focus, labelled controls, non-colour status, reduced motion, 44 CSS px touch targets and 200% zoom are acceptance targets. Never label missing telemetry as zero or healthy.

### Requirements and verifiable completion conditions

All VCCs below are proposed product acceptance checks, currently unperformed. E1–E5 are defined in the MVP companion; they are not invented passing test commands. Every condition preserves no manual piloting, no motor output in MVP and zero model calls on read paths.

| Story / priority / pain | Given → when → then: measurable end state | VCC / stated check / constraint | TAD owner / ADR |
|---|---|---|---|
| PRD-01 Must / P3: as a lead I want one mission view | Given a native mission file, when opened, show its identity, source revision, evidence age and unevaluated states without treating an imported manifest as live authority | VCC-01: E1 shows exact source identity on every relevant card, unknown values stay unknown | C1,C2 / A1 |
| PRD-02 Must / P3: as an author I want equivalent source views | Given the same program, edit an allowed Block statement, then Python/Block/JSON preserve owner-defined semantics and source binding; invalid input fails visibly | VCC-02: E1 round trip + E2 invalid/stale identities; no second parser/runtime | C3,C4 / A1,A3 |
| PRD-03 Must / P1: as a lead I want route replay in a card | Given a validated completed route, select Replay, then a Dashboard XR card animates takeoff, travel and landing using the existing surface; unsupported immersive mode retains inline replay | VCC-03: E1 compares first/final poses and source digest; E3 shows XR unload and fallback | C5 / A2 |
| PRD-04 Must / P3: as an integrator I want faithful transfer | Given a collision-free landed export, import into receiver review, then explicit Run produces ordered receiver-accepted poses ending at the exact final sample | VCC-04: E2 checks accepted/rejected contract and E1 receiver readback; import/preview never Run | C6,C7 / A3 |
| PRD-05 Must / P1: as a lead I want an honest safety state | Given invalid/stale identity, second writer, hidden browser or lost link, execution becomes inhibited/stopped with a reason; fresh action is required to restart | VCC-05: E2 fault cases + E3 focus loss; no manual axis route or resumed queued commands | C7,C9 / A4 |
| PRD-06 Must / P1,P2: as a scout I want traceable observations | Given demo images or explicit local imports, join them to rack/tier/time and mission reference, then export a dossier showing planned vs sampled vs observed coverage and reviewer notes | VCC-06: E1 checks 6 inspection points, labelled synthetic fixtures and missing views; no automatic disease verdict | C8 / A5 |
| PRD-07 Must / P3: as an integrator I want interoperable access | Given browser/API/agent entry, inspection resolves one capability owner; unsupported routes return an explicit result and never fall through to unrelated game controls | VCC-07: E2 surface matrix asserts read/prepare/effect distinctions, request replay and malformed invocation rejection | C9 / A3 |
| PRD-08 Must / P1: as a mobile user I want local operation | Given cached assets and disabled WAN, open/edit/validate/replay/export the fixture within 8 steps and 5 minutes; LAN receiver is separately labelled unavailable when absent | VCC-08: E3 clean-profile run at 390×844 and 1280×800, keyboard/zoom; no WAN/model dependency | C1–C9 / A1,A2 |
| PRD-09 Should / P1,P2: as a buyer I want a credible comparison | Given three interviews and five comparable timed replays, record baseline, all setup/review time, offer response and reasons | VCC-09: E4 reports all denominators and ≥1 accepted paid dossier offer or a documented pivot | C8 / A5 |
| PRD-10 Won't this increment / P1: as a farm operator I want actual scouting | Given identified hardware/site and validated control stack, complete 20 fixed-route sorties at one tier with zero contact, containment exit or uncommanded restart, plus ≥90% agronomist-usable scheduled views | VCC-10: E5 independent physical evidence; no simulator substitution; all fault and clearance checks also required | C10 / A4 |

### Success, ROI and bounds

| Metric | Baseline | Target / observation window |
|---|---|---|
| First useful route review | Unmeasured | ≤8 user actions, ≤5 minutes after local assets provisioned; 5 fresh-profile trials |
| Reuse integration/setup time and repeated actions | Unmeasured; five existing surfaces inspected, no duplicate code count established | Record per handoff before/after; ≥30% median reduction target over 5 matched runs |
| Scouting labour | Unknown | Future pilot ≥25% reduction including setup, sanitation, batteries, review and exceptions over 10 paired sessions |
| Earlier anomaly discovery / avoided crop loss | Unknown | Measure lead time against independent manual review; no savings booked until attributable |
| Captured views / planned viewpoints | Unknown | Simulation reports sample coverage only; future ≥90% usable image target, 20 sorties |
| Serving tokens / spend | No runtime yet | 0 per inspection/replay; $0 incremental software/service spend ceiling |
| Runtime payload | No integrated build | Every emitted chunk <500,000 bytes; ≤8 mounted cards; one active XR scene; lazy-load editor/XR/receiver |
| Product readiness local / delivered | spec-complete / undocumented | Re-derive per VCC after independent receipts; documentation checks confer no flight rung |

ROI score is **unmeasured** for each tier because hours saved, crop-loss incidence, WTP and build effort are not validated. Must prioritizes testable P1/P3 learning at minimum delta; Should measures value; Could later adds optional local image triage after labelled data; Won't preserves the deferred hardware/full-autonomy scope. Do not invent a weighted numeric score.

## TAD

[TAD and reuse](tad-reuse.md) specifies the C1–C10 inventory, five flows, invocation register, trust boundaries and data lifecycle. Portable contracts → domain owners → adapters → views is the dependency direction. The product owns a composition manifest and farm-specific annotations; existing owners retain their parsers, renderer, runtime, storage and protocol. No generic package extraction is authorized by this planning task.

## ADR

Each decision applies to this planning revision; implementation acceptance remains pending. Zero cash means no new paid plan, addon or overage, not zero operator/hardware opportunity cost. Alternatives are screened before comparing them. Unknown licensing fails distribution eligibility until resolved.

| ID / decision | Alternatives and constraint screen | Reason, consequence and TCO | Recovery / revisit |
|---|---|---|---|
| A1: compose a thin product host | Direct code reuse: fail-unresolved-export-license; contract-only adapter design: pass, dependent code shipment still blocked; retaining native surface semantics: pass for inspection; copied standalone app: fail-duplicate-owner; new shared package: fail-unjustified-extraction | Fewer owners and minimal integration delta; existing export seams may need owner work. Browser/local software cash cap $0, serving tokens 0; developer/support time unknown | Keep native open-in-owner fallback. Revisit after export/license audit; no copying to bypass a missing export |
| A2: add one lazy XR card at its owner | Existing Dashboard templates alone: fail XR-card requirement; owner extension: pass-design, fail-unresolved-license for distribution; full Graph iframe: retain fallback only, not equivalent to a composable XR card; new 3D engine: fail duplicate-owner/cost | Reuse surface lifecycle, asset loading and pose playback. Dashboard schema currently lacks XR. Static/inline fallback; GPU/bytes measured later; $0 cash | Remove new card registration and restore prior config; keep source/path data readable; reconsider if chunk/memory target fails |
| A3: versioned data/protocol seams | Direct native package exports where present: pass; thin version-negotiating adapters: pass; sibling source imports: fail modularity; replacing all validators: fail intentional-boundary preservation | Preserve v1/v2 path bytes and receiver revalidation. Browser and native MCP do not imply equal side effects. No new runtime tokens or mandatory service | Pin prior compatible versions; invalidate run grant on digest change; retain v1 read support until known callers migrate |
| A4: separate simulation from physical control | Current simulated bridge: pass demo; diagnostic firmware as flight controller: fail hardware/control; open-loop timed motors: fail containment; browser as stabilization loop: fail timing; future verified device controller: defer | No manual piloting; pre-programmed route with deterministic control/failsafes. Physical sensing, mass, power, sanitation and control costs unknown; no purchase or flash now | Any physical fault stops trials and retains logs. Device-specific recovery image/controller rollback only after identity and authorization |
| A5: sell a bounded feasibility dossier before flight claims | Paid route/evidence review: pass-design for demand test; recurring scouting service: defer VCC-10; disease-detection SaaS: fail evidence/model scope; grant-dependent business: fail unproven eligibility | First genuine customer dollar buys an honest deliverable; S$99 illustrative price, not WTP. No paid software procurement. Farm operations may value the evidence or reject it | Stop/pivot after E4 thresholds. Refund/non-delivery terms set before an offer; do not disguise a donation/test transfer as revenue |

**Non-compensatory selection:** an option failing cost, control, source ownership or license cannot outrank a passing one on speed. A1 direct export reuse and contract-only adapters remain incomparable until exact export availability and FOSS-compatible licensing are established; choose per boundary. A2 owner extension dominates a new renderer on duplication/near-built cost but has no performance proof. No contested argument is self-declared resolved; unresolved export/licensing choices block only their dependent integration. One comparison cycle, maximum three refinements; stop after two cycles without reduced findings.

## MVP

Smallest valuable slice: one farm scenario, one fixed route, six planned observation points, native Python/Block/JSON authoring, native Block Library, Dashboard XR replay card, GameXR simulated path readback and an exported provenance/coverage dossier. Seed the existing nine-second lesson first; farm geometry is a new versioned scenario and cannot be claimed present. See [MVP, demo and roadmap](mvp-release.md).

“0” is the grounded composition opportunity with unvalidated farm pain and incomplete hardware. Technical “1” is VCC-01–08 demonstrated in five bounded local trials. Commercial “1” is one accepted dossier with net customer cash ≥S$1 and delivery evidence. Repeat demand is a second separately evidenced paid/use cycle. None has been observed here.

## GTM

Nearest offer: a fixed-route feasibility and scouting-evidence dossier for an indoor operator, priced initially at S$99 as a test assumption. It includes a route rehearsal, clearance/data gaps and a baseline measurement sheet, and promises no physical flight or disease diagnosis. After physical acceptance, test a one-aisle scouting pilot; consider recurring service only after repeat use. [GTM and venture projections](gtm-venture.md) owns experiments, alternatives, market-size uncertainty, operating/legal questions, financial assumptions and audience claims at this same revision.

## From 0 to 1 coverage

Coverage means the planning decision is recorded, not the outcome verified. All rows join revision 0.1.0. **16/16 dispositioned; 14/16 applicable domains covered; 2 deferred; 0 not applicable.** C11 and C12 remain dependent commercial gaps. Technical Writer maintains this table; each functional owner below closes its evidence gap at discovery, baseline, MVP acceptance and audience handoff.

| ID | Decision / source | Accountable owner | Evidence gap / next check |
|---|---|---|---|
| C01 | Covered: PRD purpose/pain | Product | 3 interviews; E4 |
| C02 | Covered: GTM market/timing | Commercial | Qualified site counts unknown; market registry audit |
| C03 | Covered: GTM offer; A5 | Commercial | WTP unvalidated; E4 |
| C04 | Covered: PRD journeys/VCCs | Product | Integrated UI absent; E1,E3 |
| C05 | Covered: TAD inventory/flows | Architecture | Export/pin gaps; E2 |
| C06 | Covered: TAD failure/data/license | Engineering | Product/physical tests absent; E2,E5 |
| C07 | Covered: ADR A1–A5 | Architecture | Revisit concrete exports and license |
| C08 | Covered: MVP scope/demo | Product | E1–E3 unperformed |
| C09 | Covered: GTM funnel/retention | Commercial | No offer, payment or repeat-use receipts; E4 |
| C10 | Covered: GTM operations | Operations | Capacity assumptions need timed delivery |
| C11 | Deferred: GTM obligations | Operations | Entity, IP and site-operation review required before distribution/contract/flight; no waiver |
| C12 | Deferred: financial discovery projection | Finance | Model scenarios illustrative; opening balances/taxes/actual costs unknown; recheck before priced commitment |
| C13 | Covered: bootstrap/no funding ask | Founder | Capital position unknown; no spending authority |
| C14 | Covered: execution/release record | Repository maintainer | Native trust anchor missing; recheck after owner enrollment |
| C15 | Covered: GTM slide/claim/business projections | Product | Text projections only; no external audience handoff yet |
| C16 | Covered: roadmap/stop thresholds | Product | Learning observations outstanding; update successor revision |

## Session checkpoint

Authored all five roles, source reuse and explicit extension gaps, physical-control boundary, phased VCCs and a first-dollar hypothesis. No runtime modules changed. Native execution is blocked before lane admission; no source release or deployment receipt exists. Document validation and measured bytes are in [validation.md](validation.md). Next bounded action: repository maintainer resolves trust/admission and imports this exact package; architecture owner then verifies consumable exports and license in a 90-minute source-only spike. Recheck on changed source SHA, grant, hardware identity or buyer evidence.

## Reference implementation — implementing checkpoint, 2026-09-27

The follow-up directive is **IMPLEMENT recommendations**. A dependency-free local composition candidate now runs at `http://127.0.0.1:4199/`, staged in the task's `outputs/agentic-drone-dashboard-implementation`. It implements six-point image review with explicit provenance, unchanged original-path retention and SHA-256 identity, portable dossier preparation/reopen, lazy external native Graph frames, owner-link resolution, read-only stdio MCP and live WebMCP inspection, `/drone.inspect @dashboard #mission`, and opt-in offline shell caching. These are target-owned adapters; no Graph/GameXR code was copied. The native Graph program is visibly mounted in the candidate card. The fixture is uncalibrated and is not a six-point aircraft route.

Ten local contract tests passed. A 390×844 browser check observed document width and scroll width both 390; native frame close disabled its Close control; keyboard point selection worked; live WebMCP returned six planned points, zero evidence and an unobserved receiver. A valid synthetic PNG enabled review; a corrupt PNG failed loudly. Setting synthetic provenance and follow-up showed one reviewed/flagged image. Browser download observation timed out, so export was improved to a visible Save link and inspect/copy JSON fallback; this remains subject to final readback. No actual phone, receiver acknowledgment, calibrated route, true integrated XR card, customer or physical-flight acceptance is claimed. Full VCC-01–10 acceptance remains open.

The maintainer explicitly authorized the proposed **initial 81rv10 enrollment** in this follow-up turn: isolated bootstrap PR, exact MIT Agentic OS package pin, matching protected checks, native setup, then normal lane admission. The native fork-only exception does not cover this existing non-fork, so this specific maintainer decision is retained as the bootstrap authority; it never waives normal subsequent admission. An isolated bootstrap branch is preparing the profile, validation policy, planning reference and CI. No setup/trust/merge or production receipt exists yet at this checkpoint. Existing Launch Copilot bytes remain unchanged.

Current source/release state: staged runnable candidate; initial enrollment in progress. Existing R0 admission failures and 0/10 VCC records above are historical planning evidence, not evidence that this candidate has been integrated. Budget: first composition slice ≤12 modules /120 kB added runtime/test source; measured first check 10 modules/49,414 bytes. Separate authorized bootstrap ≤8 configuration/test modules and ≤45 active minutes; GitHub results are an external dependency with recheck on completion. Incremental paid services $0; model token/cash telemetry unknown.

## Reference implementation — admitted implementation checkpoint, 0.2.0

Bootstrap [PR #3](https://github.com/huijoohwee/81rv10/pull/3) merged at `d1c1caa6d2a59ba2ffecf02b9acb34512215a342` with `test` and `budgets` green. Matching strict branch protection is active, including administrators. Native setup and doctor succeeded, and normal START admitted `agent/device-0232231d4a19/drone-dashboard` at that exact base. The earlier trust blocker is resolved. The running preview now uses the admitted target checkout. The joined roles/projections advance together to 0.2.0; normalized CSV line endings remove the initial CRLF diff-check warning without changing the illustrative figures.

Implemented baseline and current checks are in [runtime.md](runtime.md). New C1/C8/C9 code is a dependency-free target host plus contract-only native owner links/frames, image-review annotations, original-path metadata/digest retention, dossier export/copy/reopen, read-only MCP/WebMCP and opt-in offline shell. Python/Block/JSON and Block Library remain native Graph UI. Browser observations confirm the native editor mounts inside the host card; no shared owner code is copied. Live WebMCP worked in the current in-app browser. Test coverage includes 10 adapter contract tests and 3 native bootstrap identity tests; the native repository validator passed both selected checks before publication. Final candidate checks are retained in the Git-private validation receipt, not fabricated here.

The actual copied empty dossier reopened with six points. Synthetic image review and both tested widths behaved as described in the handbook. A cached shell reloaded while its local server was stopped. Blob download completion could not be observed through this browser; a visible Save link plus verified inspect/copy JSON fallback replaces any false download-success claim. Re-preparing offline assets waits for activation before reporting success.

Remaining acceptance: true native XR widget extraction/synchronization, source/editor round-trip trace freshness, the actual six-point scene/route/capture mapping, GameXR final acknowledgment/fault injection, measured mobile performance/accessibility, customer and physical trials. The host's six points are an uncalibrated review fixture, not a proven farm route. **0/10 whole-product VCCs fully closed**; useful subcriteria now have local evidence. C5 is still an owner export/license seam; C7 receiver connection is not emulated; C10 remains absent. No inference from UI availability changes that verdict.

Publication scope: this first local baseline, native bootstrap already integrated. Source publication is the next selected effect; it does not grant remote deployment, physical actuation, cleanup or sales. Preserve the serving checkout for user review. Initial paid service spend remains $0; no model API, paid add-on, cache upload or hosted artifact allocation was enabled. Graph runtime observed at `2dfd97fbd4f346c797b0d5f677c9b39dba03f97f`, clean, through the operator's existing server; historical source hashes remain pinned in grounding and are not silently refreshed.


## Reference implementation — visual workspace checkpoint, 0.2.1

The maintainer requested a compact spatial-workspace layout. Native `successor drone-dashboard-layout` admitted the continuation from published source `36e48aab64af595fa6343b2a886e7f1f192d727e`, preserving the same checkout and limiting writes to `app` and this joined documentation. The original source publication remains immutable. This increment advances all five joined roles and projections together to 0.2.1; commercial assumptions and historical grounding hashes are unchanged.

PRD delta: replace the large introductory section with a slim mission bar, left inspection explorer, dominant native canvas, right evidence inspector and bottom mission console. The console exposes Path handoff, Dossier and Agent access through keyboard-operable tabs. On phones, the explorer becomes a two-column point list and the panels stack. Selected point, evidence review, native owner links/frames, original path retention, dossier and read-only tools keep their existing owners and contracts. The initial rack drawing is an original inline schematic explicitly labeled an uncalibrated fixture; it is neither telemetry nor a measured flight path.

TAD/ADR delta: plain HTML/CSS plus a small console controller reuse the existing runtime. No new package, font, image fetch, renderer or copied third-party implementation is introduced. Four existing UI files change; the service-worker shell cache receives a new identity so offline preparation can install the revised assets. Console tabs use selected states, roving tab stops, arrow keys, Home/End and linked panels; prepared exports automatically reveal Dossier. Existing native surfaces remain lazy and externally configured. Visual composition does not establish XR parity or device authority.

MVP delta: validate desktop/phone layout, point selection, console keyboard actions, visible export JSON and native-frame load/close; run the existing native contract/budget checks and joined-document verifier. Browser results are recorded in the runtime handbook. The earlier whole-product acceptance gaps and 0/10 fully closed VCC verdict remain unchanged. GTM delta: this is an operator demo presentation improvement, with no new buyer, price, revenue, paid service or physical-flight claim.

Sprint cap: 30 active minutes, four UI modules, less than 60 kB added UI source; per-file ceilings remain 600 lines and 500 kB. The screenshot review and source publication are the selected effects. Protected integration and deployment remain separate effects. Keep the serving checkout for review; use a native successor for further source changes after publication. Source rollback and offline-cache recovery remain in the runtime handbook.

## Reference implementation — aviation owner binding, 2026-10-04

The user selected this MIT shell for an aviation file-evidence MVP. Native START admitted `agent/device-0232231d4a19/aviation-evidence-layer` at `438038865fd25c9d2a07ff50fcb75e2666e08b7c`. [Aviation Evidence Layer@0.3.0](../aviation-evidence/prd-tad-adr-mvp-gtm.md) owns its generic contract/replay/UI, authored profile/fixture, shared read adapters, validation and commercial preparation. Its predecessor specification SHA-256 is `817d6af75e5d8e327560dbf6408291c1e0bd0f3fce9b5095501d2e24b1d185d9`.

The Drone Dashboard continuity and all0.2.1 joins remain unchanged. Existing dossier/owner routes and Launch Copilot reference are retained. The latest user steering also requests the existing native Flight demo through an authored workspace connection; Graph retains its code, renderer, file and simulation ownership. Its external availability/offline limits are separate from the pure aviation evidence slice. Exact-source aviation checks and release receipts remain pending; no farm VCC, physical-flight, buyer or production claim follows.

## Aviation evidence normalization successor · 2026-10-04

Native successor `aviation-normalization-proof` continues published209483a/PR6; its green synthetic-merge CI is separate from protected integration. [Aviation Evidence Layer@0.3.1](../aviation-evidence/prd-tad-adr-mvp-gtm.md) advances all six aviation joins for detached original bytes and UTC/decimal normalization. Reproduced failures supersede broad prior acceptance; 54 successor tests/budgets and bounded v2 browser proof are recorded; publication remains pending. Drone Dashboard0.2.1 and its ownership stay unchanged.
