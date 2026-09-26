---
title: "Reference implementation — Drone Dashboard MVP, release and handoff"
doc_type: "PRD-TAD-ADR-MVP-GTM"
version: "0.2.1"
revision: "0.2.1"
date: "2026-09-27"
lang: "en-US"
owner: "Drone Dashboard delivery function"
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
worktree_id: "agent/device-0232231d4a19/drone-dashboard-layout"
agent_id: "codex-root"
---
# Reference implementation — MVP, release and handoff

Consumes [PRD and ADR](prd-tad-adr-mvp-gtm.md) and [TAD](tad-reuse.md) at `agentic-drone-dashboard@0.2.1`. Product acceptance is pending. This file records implementation order and evidence required; no checklist tick means a product feature was implemented in this session.

## Reference implementation — demonstration skeleton

| Beat / bound | Operator-visible story | Reuse / proof / fallback |
|---|---|---|
| Hook / 20 s | One upper tier was missed during a scouting round | P1 hypothesis, visibly hypothetical rack fixture; no fabricated farm incident |
| Setup / 40 s | Open Source Files → `agent-mission.manifest.json` → Dashboard; inspect source revision and unknown evidence | C2 native mission renderer; sample metadata proves no live grant |
| Build / 60 s | Open the same program in Python/Block/JSON; insert a native block through FloatingPanel Block Library; validate | C3/C4, VCC-02; existing lesson then a proposed farm scenario; edits invalidate prior trace |
| Reveal / 60 s | Run deterministic simulation; watch takeoff/travel/landing in the Dashboard XR card and compare the final pose | C5/C6, VCC-03; the XR card is planned integration, not present today; fallback native scene/source link is labelled |
| Proof / 40 s | Import the original path in GameXR, review, explicitly run simulated receiver, read exact final acknowledgment | C7, VCC-04/05; if receiver unavailable, report “simulation only”; never fake acknowledgment |
| Close / 20 s | Export six-point coverage/evidence dossier and choose whether a priced feasibility review is useful | C8, VCC-06; fixture images labelled synthetic; ask is hypothetical until outreach authorized |

Total: 240 seconds, within the five-minute value target. Provisioning/certificate setup is measured separately and included in total buyer effort. The requested XR-in-Dashboard reveal must actually work to pass VCC-03; an open-in-owner link alone does not satisfy it.

Existing starter for rehearsal is GL's `learningLessons.ts` drone solution: take off to 2 m, hover 60 ticks, execute two 120-tick forward legs at 1 m/s, land. Its nominal nine-second path is a kinematic lesson, not a physical prescription. Preserve its source/scene identity; author farm coordinates only after validating a new scene and route. Default mission is finite; no open-ended “sense, decide, act” loop is used to navigate farm racks.

## Reference implementation — acceptance procedures

These procedures become native automated checks or recorded walkthroughs in their owning repositories after implementation. They are named so outcomes are falsifiable; none is reported passed here.

| Check | Procedure / required result | Evidence surface and owner |
|---|---|---|
| E1 integration walkthrough | Fresh workspace; one six-point fixture; inspect mission/source; Python→Block→JSON roundtrip; edit invalidates trace; validate/run; match XR first/final pose; transfer original bytes; compare receiver final acknowledgment; export/reopen dossier with labels and all six points | Local authoring, product integration suite/video/log; VCC-01,02,03,04,06; Engineering |
| E2 contract and authority faults | Valid v1/v2; reject unknown/oversized/malformed/discontinuous paths; verify byte/digest preservation and errors; wrong origin/channel; stale document; repeated request; duplicate/out-of-order sequence; two writers; expiry; cancellation; import without Run; reject manual/physical endpoints | Native owner suites plus new adapter tests; VCC-02,04,05,07; Engineering |
| E3 mobile/offline/accessibility/budgets | 390×844 and 1280×800; 200% zoom/keyboard/reduced motion; provision once, disable WAN; ≤8 steps/≤5 min over 5 clean-profile runs; measure bytes/fps/memory; close card and hide tab; receiver unavailable; storage full; certificate and actual phone check separate from emulation | Browser recordings, asset report, physical phone observations; VCC-03,05,08; QA |
| E4 buyer/value experiment | Three qualified interviews; five comparable handoffs; include setup/review/support; present S$99 dossier only with commercial authorization; record offers/acceptance/delivery/recognized revenue/cash separately; follow up one subsequent cycle | Restricted customer records and redacted receipt references; VCC-09; Commercial |
| E5 physical gate and trial | Identify exact board/airframe and licensed controller; verify calibrated localization/control/failsafes with independent instrumentation; measure clearance and imaging; inject fault cases in a contained non-crop test; then 20 single-tier sorties with zero contact/escape/restart and ≥90% usable scheduled views | Device/site exact revision, environmental conditions and test evidence; VCC-10; Device safety owner |

E2 can reuse the existing GL `canvas/src/__tests__/pythonLearningFlightPath.test.ts`, `pythonLearning.test.ts`, `pythonLearningLifecycle.test.ts`, `pythonLearningOffline.test.ts`, `dashboardWidgetCommands.test.ts`, `dashboardWidgetConfiguration.test.ts`; X `tests/drone-flight-path.test.ts`, `tests/drone-flight-transfer.test.ts`, `tests/drone-protocol.test.ts`, `tests/drone-bridge.test.ts`. Source existence is verified in grounding. Historical descriptions of passing tests are not fresh test runs. New farm-card/annotation acceptance has no existing test yet.

For an admitted X change, the current source test command is `node --test tests/drone-flight-path.test.ts tests/drone-flight-transfer.test.ts tests/drone-protocol.test.ts tests/drone-bridge.test.ts` from X. For GL use its selected native validation runner; inspect package scripts before invoking because the worktree/pins may change. Browser test `npm run test:drone-browser` requires explicit local gateway/fixture setup; do not execute it against an unknown physical endpoint.

Bidirectional traceability: 10/10 PRD stories map to TAD owners/ADRs and E1–E5; C1–C10 all map back to PRD. These are specification links. **0/10 product VCCs satisfied in this session.** OS visibility, agent discovery and gateway federation dimensions are each `spec-complete` locally and `undocumented` delivered; native discovery/source observations do not prove the new product's invocation coverage.

Agent-experience assessment: core functionality, theme/innovation, technical integration and usefulness are all **unassessed** for the composed product. Environment is source inspection only; source owners exist but the integrated journey and priced buyer result do not. Product function rechecks with E1–E4; no numerical maturity rating is invented.

## Reference implementation — product-owned roadmap

All bounds are active-work estimates, not delivery guarantees. External dependencies use an unblock condition/recheck event, never a predicted completion date. Every increment preserves zero paid service spend, <600 lines per new file and <500,000 bytes per emitted chunk. Runtime source edits require separate admitted owner scopes. Maximum one writer per capability; no subagents/lane fan-out required.

| Phase / rank / buyer outcome | Reuse / smallest delta / owner | Prerequisite / exit | Active bounds / wait / stop and recovery |
|---|---|---|---|
| R0 discovery: ground P1/P2 and preserve source truth | Existing documentation/source checks; this joined plan; Product | User scope and read-only access → dated package, evidence gaps and recovery | Initial 20 min estimate, refreshed to ≤35 min ceiling; ≤10 deliverable files / 250 kB; one author; observed token count unavailable; no new runtime load; stop on blocked admission, continue draft externally |
| R1 contract spike: avoid integration waste before coding | C2–C7 native owners; export/license/pin map only; Architecture | Trusted target admission + owner references → source contracts demonstrably consumable or explicit unsupported list | 90 min / ≤4 source/doc modules / 40 kB / 16k model tokens ceiling / $0; wait for rights/export facts, recheck when supplied; no package extraction by default |
| R2 local demo: visible repeatable route | C2–C7, new C1 composition/C5 card seam/C8 annotations/C9 adapters; Engineering | R1 plus scoped owner lanes → VCC-01–08, E1–E3 | 2×4 h / ≤12 touched modules total / 120 kB added source / 50k model tokens / $0; lazy additions only; stop if >2 owner seams require redesign; revert adapter/card registration, retain artifacts |
| R3 paid discovery: decide whether P1 creates WTP | R2 dossier and native exports; Commercial | E1–E3 and outreach/payment authority → E4 real offer/delivery/payment or documented pivot | ≤4 h active / 14-day observation window / 3 qualified accounts / ≤2 docs / 10k tokens / $0 outreach spend; customer response has no ETA; recheck on reply/window end; 0 accepted offers → revise segment/offer once then stop |
| R4 physical feasibility: test actual gap access | Existing diagnostics observations only; C10 new/verified controller and calibration; Device owner | Exact S3 board/airframe, site, licensed control stack and explicit trial authority → E5 preconditions | First feasibility analysis ≤4 h / ≤4 modules / 60 kB / 20k tokens / $0; no flight-development ETA before measurements; recheck on hardware/site facts; containment/clearance failure stops flight plan |
| R5 repeatable field service | Qualified R4 controller + C8 evidence; Operations | VCC-10, site/contract/license clearance → ≥25% total labour reduction over 10 paired rounds + second paid cycle | Pilot planning ≤4 h / ≤3 docs / 30 kB / 12k tokens / $0 incremental tools; farm schedule and crop cycle are external waits; failure of safety/utility stops trial; restore last verified controller and retain logs |

Priority is hypotheses about buyer pain → minimum existing-owner delta → real first dollar. No “cheap XR polish” increment precedes the route/evidence experiment. Every named excluded idea remains Won't this increment in PRD. Do not broaden R4 to autonomous flight, hardware procurement or a new farm management platform without a successor scope decision.

## Reference implementation — execution and release

Loaded agentic-os `docs/START-WORKFLOW.md`, `docs/adlc-guidelines.md`, `docs/RELEASE-WORKFLOW.md` and the exact current runtime SSOT. The supplied `templates/SYSTEM-PROMPT-RUNTIME.md` path is absent in inspected repositories; current agentic-os `AGENTS.md` identifies `guides/SYSTEM-PROMPT-RUNTIME.md`, which was read and pinned. This is a recorded path reconciliation, not a newly created competing prompt.

Observed in target T (`81rv10`, clean `main`, `99144fe144889a9d5b5c1cbf92b4e4dd51268782`):

```text
node /Users/huijoohwee/Documents/GitHub/agentic-os/bin/agentic-os.mjs doctor
exit 1: agentic-os: blocked-repository-trust-missing: repository trust anchor is missing

node /Users/huijoohwee/Documents/GitHub/agentic-os/bin/agentic-os.mjs release-common start drone-dashboard-spec --write=docs/agentic-drone-dashboard --plan=docs/agentic-drone-dashboard/prd-tad-adr-mvp-gtm.md --checkout-limit=1
exit 1: agentic-os: blocked-repository-trust-missing: repository trust anchor is missing

node /Users/huijoohwee/Documents/GitHub/agentic-os/bin/agentic-os.mjs release-common publish --message=docs:drone-dashboard-spec
exit 1: agentic-os: blocked-repository-trust-missing: repository trust anchor is missing
```

The workflow's `npm run release:common` wrapper cannot run in target because there is no package.json. Invoking the native CLI directly made the trust blocker concrete without inventing a wrapper or granting local trust. No lane/mission/integration receipt was produced. Do not set up a parallel manual branch/worktree to evade this refusal.

**Recovery:** repository maintainer uses the existing OS enrollment/bootstrap owner to establish target repository trust/profile and the initial committed planning reference; do not fabricate a committed plan revision or trust anchor. The generated draft can be its review input. Then admit `docs/agentic-drone-dashboard` with one checkout; use the returned checkout, import these bytes, recheck source drift and documentation, and run native publication. Bootstrap itself has no verified recipe in the empty target; resolve that prerequisite through OS ownership before retrying START. Recheck on enrollment/initial-plan receipt, not on a polling timer.

**Proposed repository placement:** all package contents under `81rv10/docs/agentic-drone-dashboard/`, preserving relative links. No target README replacement is needed. This staging directory is the only editable authoring copy until admitted transfer; record the checksum manifest at transfer and cease editing the old revision after publication. Future runtime lives in that target by composition, while shared modifications stay in their existing source repositories.

| Lane / boundary | Entry and proof | Current state / rollback |
|---|---|---|
| Authoring → source release | Current joined artifact, admitted path scope, exact candidate, affected green checks and protected integration receipt | Closed by missing trust; no candidate. Discard/revise staged documentation without runtime effect |
| Source → mirror | Exact protected source SHA plus consumer release controller and scoped instruction | Closed; no mirror selected, no sync. Revert exact source commit through protected process |
| Mirror/source → delivery | Explicit operator promotion, source/build identity, E1–E3 on actual deployed URL, rollback predecessor | Closed; no deployment. Atomic rollback to previously verified artifact/pins; cancel active sessions; old source remains readable |
| Delivery → physical device | Exact board/image/calibration/site identity plus VCC-10, legal/site authority and device recovery evidence | Closed; no flash/actuation. Device-specific verified backup/controller recovery only |
| Documentation → customer effect | Exact offer, permitted outreach recipient/channel, contract/payment authority | Closed; no messages or money effects |

Every boundary needs authority, green evidence, effect identity and its own receipt. Integration does not imply retirement, cleanup, deployment or commercial authority. This task made no source/worktree/dev-server changes; final readback detected another writer advancing GL to `ea93888c30aa6dc1b4790aa2870b9e8358ba301e` plus dirty lesson-bootstrap evidence paths. Preserve that work and re-ground before integration; see validation. Target now has an unrelated untracked `.DS_Store`, also preserved. No cleanup/archival is required for this external draft.

## Reference implementation — bounded planning records

Record key for this draft: `drone-dashboard-spec-20260927`; successor key: `drone-dashboard-export-audit-20260927`. They are not inserted into a shared task system or presented as an OS execution receipt.

| PRD-TAD-ADR-MVP-GTM | CID | RAO | Updated Date |
|---|---|---|---|
| agentic-drone-dashboard@0.2.1 | C: source-grounding pins + five user annotations. I: a reviewable reuse-first proposal. D: Generate the joined specification with exact source claims, explicit gaps and bounded checks. | R: Product author. A: Author transforms inspected evidence into the joined artifact. O: Five-role package with checkable acceptance and source records; check: named document validators in validation.md. | 2026-09-27 |
| agentic-drone-dashboard@0.2.1 | C: C1–C9 and missing target trust. I: an implementable composition without copied owners. D: Audit consumable exports and licenses after native admission, recording exact compatibility evidence. | R: Architecture owner. A: Architect transforms admitted source references into a compatibility report. O: Owner/export/pin/error matrix with unresolved rows; check: E2 contract fixtures and source/license inspection. | 2026-09-27 |

## Reference implementation — findings and risk handoff

These are tracked planning/conformance gaps, not invented runtime failures. Full rule text is the linked guideline at S pin; anchor+ordinal preserves that exact revision. The six-field finding record uses the supplied vocabulary. Operational trust/hardware dependencies remain separately recorded above; no fabricated authority finding type is introduced.

| Finding Type | Severity | Rule anchor / rule text | Artifact reference | Evidence excerpt | Remediation |
|---|---|---|---|---|---|
| unimplemented-guideline | major | `validation-checklist#1`: require current continuity before baseline sign-off | Whole join / E1–E5 | “0/10 product VCCs satisfied” | Locally reproducible E1–E3 checks after implementation; owner Engineering, R2 |
| market-size-single-method | major | Venture `business-plan#1`: size market with two cited independent methods and reconcile | GTM market | “Qualified SAM is unknown” | Documentation change with qualified population/interview evidence; owner Commercial, before audience market-size claim |
| scenario-set-incomplete | major | Venture `financial-model#5`: produce linked statements with opening balances; discovery deferrals incomplete | GTM model | “Opening balances are illustrative” | Documentation change with actual opening balances/tax basis and cost allocation; owner Finance, before commercial commitment |
| render-proof-absent | major | `dual-target-portability#5`: verify static render and projection | TAD D1–D5 | “Static visual rendering not performed” | Locally reproducible static render/visual inspection; owner Architecture, R1 |

No `runtime-ready` or production claim is made, and no dependent effect is opened. All other enumerated finding types have zero **observed findings in this bounded review**; this is not an exhaustive guideline certification. Rule coverage is reported in validation, with unassessed obligations disclosed. A previous product conformance run does not exist; this is the initial comparison baseline.

## Reference implementation — checkpoint and resource ledger

Development: specification only, source unchanged. Production Release: not admitted/published/integrated. Runtime: no composed dashboard, physical test or deployed observation. Commercial: no interviews, offers sent, revenue, collections or repeat-demand receipts observed. Missing telemetry remains unknown rather than zero.

| Event ID | Source / class / unit | Actual or estimate / attribution |
|---|---|---|
| DOC-01 | This authoring session / development / active minutes | Active vs tool-wait split unavailable; ≤35 min refreshed work ceiling; allocation once to R0 |
| OS-01 | Doctor failure / development / CLI invocation | 1 observed failing invocation; no provider execution; latency ~0.115 s |
| OS-02 | START failure / development / CLI invocation | 1 observed failing invocation; latency ~0.145 s; no lane receipt |
| OS-03 | RELEASE failure / development / CLI invocation | 1 observed failing invocation; latency ~0.126 s; no publication receipt |
| DOC-02 | Validation commands / development / time, counts | Results and observed file sizes in validation.md; no product run |
| COST-01 | Model/tool telemetry / development tokens and cash | Actual token usage/cost unavailable; user-approved incremental paid service spend $0; existing account cost not asserted zero |
| COST-02 | Runtime serving / forecast tokens | Target 0 tokens per read/simulation; no deployed usage measured |
| COST-03 | Operator opportunity cost / economic minutes | Unknown actual; separate from cash model and never double-counted as recovery |

Next owner action and recheck trigger are in execution recovery. Update this same joined artifact before the next implementing session ends; if published, use an authorized successor version. Record implemented criteria, exact source/receipt links, affected checks, remaining uncertainty and measured resources every time.


## Reference implementation — visual successor, 0.2.1

A native successor of published `36e48aab64af595fa6343b2a886e7f1f192d727e` carries the four-file presentation increment. Acceptance for this slice is desktop/mobile layout, console keyboard selection, unchanged point/review controls, discoverable prepared export, and native owner frame load/close. Run native check planning/validation and the joined-document verifier before publication. An open protected PR remains a handoff, not integration or deployment. This slice does not close any additional whole-product VCC; route calibration, capture mapping, native XR synchronization, receiver acknowledgment and farm trials remain open.
