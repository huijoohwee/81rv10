---
title: "Reference implementation — Drone Dashboard package guide"
doc_type: "Handoff"
version: "0.2.0"
date: "2026-09-27"
lang: "en-US"
owner: "Drone Dashboard product function"
continuity_id: "agentic-drone-dashboard"
revision: "0.2.0"
---
# Reference implementation — Agentic Drone Dashboard

Start with the [joined PRD/TAD/ADR/MVP/GTM](prd-tad-adr-mvp-gtm.md).

| File | Use |
|---|---|
| [Main plan](prd-tad-adr-mvp-gtm.md) | Buyer pain, scope, 10 VCCs, decisions, C01–C16 coverage |
| [TAD and reuse](tad-reuse.md) | Five requested surfaces, owner/export gaps, MCP/WebMCP/invocation register, five diagrams, physical boundary |
| [MVP and release](mvp-release.md) | Four-minute demo, checks, bounded roadmap, lifecycle blocker and recovery |
| [GTM and venture](gtm-venture.md) | Priced discovery experiment, market uncertainty, operations, risks and textual pitch |
| [Financial scenarios](financial-scenarios.csv) | 36 illustrative monthly scenario rows, linked statements and separate imputed cost |
| [Source grounding](source-grounding.json) | 66 exact source artifacts across six source contexts; hashes and claim limits |
| [Validation](validation.md) | Actual check results and remaining limitations |
| [Verifier](verify-package.py) | Reproducible bounded structure, link, source-hash and model checks |

Intended repository destination: `/Users/huijoohwee/Documents/GitHub/81rv10/docs/agentic-drone-dashboard/`.
This staged package is not installed there: the native agentic-os doctor, START and RELEASE all refused the target's missing repository trust anchor. The existing Launch Copilot README remains unchanged. Import through an admitted owner lane after enrollment/bootstrap; do not bypass the failed admission by editing canonical main.

The supplied reuse intent is preserved. Current source proves a simulated path workflow; actual S3 flight control is absent. An XR Dashboard card and the product composition require owner extensions. Graph's inspected license registry has private/no-reuse implementation classes, so FOSS-compatible exports/rights must be established before distributing reused code. This planning package grants no production, flight, outreach or payment authority.

Run `python3 verify-package.py` from this directory for portable document/math checks. Add `--sources` on the inspected host to verify exact Git-object hashes. A passing verifier is not product acceptance, a FOSS grant, or proof of a physical flight.

Current implementation: [runtime, invocation, checks and rollback](runtime.md). The source join is 0.2.0; the initial nine-file counts below describe R0 only.
