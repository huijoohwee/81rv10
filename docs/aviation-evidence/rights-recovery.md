---
title: "Aviation Evidence — rights, operations and recovery"
doc_type: "Handbook"
version: "0.3.3"
continuity_id: "aviation-evidence-layer"
source_revision: "aviation-evidence-layer@0.3.3"
date: "2026-10-04"
owner: "Operator and release owner"
---
# Rights, operations and recovery

This [joined-plan](prd-tad-adr-mvp-gtm.md) section is an operational preparation record, not legal advice or a completed permission review.

## Source and data admission

| Item | Present evidence / use | Condition before broader use |
|---|---|---|
| 81rv10 code | MIT at inspected438038865fd25c9d2a07ff50fcb75e2666e08b7c; use its existing shell/server/tools | Preserve license/notices; recheck added dependencies and exact distributed bytes |
| Authored synthetic fixture | Authored flight control and Singapore volume exercise carry synthetic labels and no real-person/customer identifiers | Record author, profile/fixture hashes, creation date and allowed demo/export use; do not represent it as observation |
| Operator-supplied file | Not automatically permitted because import succeeds | Source owner, access authority, purpose, retention, redistribution/export and confidentiality terms recorded |
| Other live/provider/airport/weather/airspace data | Not adopted by this increment | Exact source/version/terms, coverage, quota, allowed derivation, attribution, offline/cache, export and termination conditions |
| Private native surfaces | No source/assets bundled for this aviation page | A link/frame or local access does not grant redistribution; retain each owner's separate contract |
| Open-source dependency | Repository lock/pin and license inventory are inspectable | Source license and dataset rights are distinct; free service availability does not establish FOSS/no-overage eligibility |

The real Singapore–Riau sample uses [ADSB.lol history terms](https://github.com/adsblol/globe_history_2026/blob/fa2cfaa721eb8360f481bbf1f1f0a7c63a605131/README.md), pinned `fa2cfaa721eb8360f481bbf1f1f0a7c63a605131`: the **database is ODbL-1.0**; contributors' CC0 statements do not make the database CC0. Retain “ADSB.lol contributors — https://www.adsb.lol — ODbL-1.0” and license distributed adapted databases accordingly. Full terms ship in `app/fixtures/ADSBLOL-LICENSE-ODbL.txt`, SHA-256 `d93f996262c15e7cf9d6b54f9f48e3f9d8b9c3a47fa2308dc8ef1f0f5cb88611`; source-code MIT terms are separate. The bundle retains this rights statement and exact upstream text. Its `operator-attested` status records the admission decision, not legal certification or source authenticity.

Source: [2026-10-03 trace76b452](https://adsb.lol/globe_history/2026/10/03/traces/52/trace_full_76b452.json), retrieved2026-10-04T00:58:26.294Z. Mapping follows [readsb trace schema](https://github.com/wiedehopf/readsb/blob/094720939c01943de82b14df6f42f67fff1cd514/README-json.md#trace-jsons), pin `094720939c01943de82b14df6f42f67fff1cd514`. The retained receipt binds HTTP/source/schema/licence bytes. Selection is56 non-stale `adsb_icao` points within the authored Singapore/Johor/Riau window; observed points are Singapore–Riau, not proof of Johor coverage. It is historical crowdsourced observation, without independent accuracy, touchdown, schedule, restriction or clearance truth.

OneMap restriction geometry remains conditional: [CAAS](https://www.caas.gov.sg/unmanned-aircraft/no-fly-zones-and-ua-flying-areas/) points to its [Theme API](https://www.onemap.gov.sg/apidocs/themes) under [data terms](https://www.onemap.gov.sg/legal/opendatalicence.html). No token, selected layer or actual geometry is admitted; no official FIR/notice/clearance, independent label or VCC-10 acceptance follows. Other regional sources need separate rights review.

The volume exercise is independently authored synthetic geometry, not a derived CAAS/OneMap notice or operational boundary. Its AMSL declaration is a test condition, not measured terrain/airspace truth. Source inspection displays full original source text locally; hashes do not prove authenticity or authorize redistribution. Preserve the existing ODbL statement with the real observed sample.

### Per-source rights record

Use one record before real-data admission; missing authority is a block for that source.

| Field | Value to collect |
|---|---|
| source_id / exact version or URL | Unknown until supplied |
| provider / rights holder / accountable operator | Unknown |
| access basis and effective/expiry dates | Unknown; retain actual permission/terms reference |
| use / derived output / redistribution / offline storage | Each explicitly allowed, prohibited or unknown |
| attribution / confidentiality / personal-data status | Exact obligations and owner |
| geography / coverage / timestamps / datum / known gaps | Source documentation and independently observed limitations |
| quotas / fees / overage switch | Zero-cost eligibility required; unknown cost blocks activation |
| retention / purge / agreement-end handling | Exact periods and responsible operator, including exported copies |
| decision / reviewer / recheck trigger | Admit only covered purposes; disable on material drift |

Do not embed access tokens or restricted contract text in public fixtures, screenshots, logs or PRs. A digest is not anonymization. No passenger/crew fields are needed. Research notes use pseudonymous participant IDs and separate consent custody.

## One-pilot operating procedure

One operator supports one pilot at a time during agreed pilot hours. Before onboarding, verify exact software/profile/fixture identity, rights, declared scope, local hardware/browser/storage and recovery file location. Explain missing/contradictory evidence and hashes' limits. Onboarding target30min and recovery target60min are hypotheses until timed.

On a data or product problem, retain the input file and error/identity locally, stop using the affected result, reproduce with a synthetic minimal case, and disable only the affected source or feature. Do not silently repair originals or upload restricted evidence. Record support minutes, severity, impacted version, reproduction, resolution and customer-approved disclosure.

Incident record: case ID; discovered UTC; source/runtime/profile identity; permitted evidence reference; effect; affected users/data; containment; decision owner; recovery result; support minutes; next check. There is no24/7 SLA or safety response promise.

## Recovery and rollback

| Failure | Immediate recovery | Evidence of recovery / limit |
|---|---|---|
| Invalid/corrupt import | Retain accepted state; show reason; choose a valid file explicitly | Accepted revision and digest unchanged; failed bytes never committed |
| Delayed read or caller mutation | Snapshot direct bytes and nested authored selection before awaits; discard stale completions | Accepted data reflects the submitted snapshot; later accepted selection remains |
| Invalid volume/datum | Keep accepted view and show typed failure; supply compatible explicit facts | No pressure/geometric/AGL inference, hidden geometry repair or original rewriting |
| Existing algorithm-v2 pack | Reimport using its matching unchanged profile and algorithm v2 | Source inspection does not change identity; aviation and volume profiles remain distinct; current final compatibility checks pending |
| Prior algorithm-v1 pack | Keep the pack; extract `original.text` as UTF-8, verify against `original.sha256`, explicitly import those raw originals into v2 | Old derived identity is rejected; new profile/algorithm-bound identity is explicit. Retain the old pack and never silently relabel it |
| Tab crash / session reset | Reopen shell and reimport saved originals with matching profile/algorithm | Recomputed identity matches; unsaved session can be lost |
| Export uncertainty | Keep current session; use inspectable/copyable original data fallback if implemented | A prepared link is not completed download; verify actual saved bytes |
| Cache/storage unavailable | Report failure; keep current page/session where possible; export before leaving | No offline claim until a provisioned reload succeeds |
| Defective local shell | Export permitted files; stop only this checkout's process; run a separately retained verified predecessor | Exact predecessor identity and import/replay checks; no reset of shared/uncommitted work |
| Published source regression | Native successor/revert PR with checks and protected integration | Published candidate immutable; source rollback is not deployed rollback |
| Deployed regression | Owner selects authorized retained source/config/schema/cache predecessor and controller | Separate rollback effect plus live readback; no deployment controller is selected here |
| Rights withdrawal / expiry | Disable source, purge covered local copies under actual agreement | Log scope/completion; exported copies require their own recipients/terms and cannot be assumed recalled |

Recovery inputs are originals, exact profile/algorithm, compatible shell and an identified owner. No database migration is introduced. Never delete other worktrees, caches or processes as a generic cleanup action. Cleanup follows exact eligible-target receipts.

## Delivery boundaries

B1 source→published candidate needs admitted scope, exact commit and native checks/publication. B1 protected integration needs the provider's exact merged-candidate receipt. B2 delivery needs integrated source, selected environment/controller, observed baseline, retained predecessor, free/FOSS eligibility and authorized effect. B3 customer delivery additionally needs consent/agreement/data/security and real operator acceptance.

This increment supplies local source and preview preparation. It establishes no public URL, paid hosting, remote production, customer instance or aircraft effect. Record an explicit owner-approved no-deploy disposition if changed source has no selected deployment; do not infer it from “documentation” or “local”.

## Commercial obligations checklist

Before a live offer, the accountable operator resolves entity/contracting capacity, jurisdiction, price/currency/tax, deliverable acceptance, refunds/cancellation, confidentiality, data responsibility, permitted export, retention and support hours. Obtain appropriate qualified review where actual obligations require it. These are uncovered commercial decisions, not extra technical approval gates. The [offer draft](discovery-pilot.md) remains unsent until those fields and the intended external action are authorized.

