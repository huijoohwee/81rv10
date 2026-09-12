# Launch Copilot

A local workspace for turning one customer requirement into a source-grounded PRD, TAD, ADR, MVP scope and GTM proposal. Product code lives here; Graph owns parsing/rendering/OpenAI transport and agentic-os owns generation and protected publication.

**Implemented:** scoped Graph ingestion/query/explanation; five-role composition through Graph’s OpenAI Responses proxy; deterministic claim checks; review digests; reused RichMediaPanel; editable cached review; verified five-file exports; guarded OS handoff/readback. **Not established:** live model output, an admitted production target, protected proposal publication, deployed buyer/payment loop, or paid demand.

## Run locally

Requires Node 24+, Git, existing configured `agentic-graph` and `agentic-os` checkouts, and Graph’s already-installed dependencies. No package installation is needed in this repository. Owner revisions are in [integration-contract.json](integration-contract.json); startup refuses a different revision until its integration checks are rerun and the contract is deliberately updated.

Start Graph’s existing web runtime using its normal documented command and server-managed OpenAI connection. Launch Copilot calls `http://127.0.0.1:5173/__chat_proxy/v1/responses` with `x-kg-chat-provider: openai`. It neither reads nor stores API keys. The model defaults to the first entry in Graph’s OpenAI model catalog; `LC_MODEL` can override it. A missing connection is an explicit error. “Create an evidence outline” uses no model and labels the result as an outline.

From this repository, with the owner checkouts alongside it:

```sh
LC_GRAPH_ROOT=../agentic-graph LC_OS_ROOT=../agentic-os npm start
```

For an isolated worktree, supply absolute owner and canonical target paths:

```sh
export LC_GRAPH_ROOT=/absolute/path/to/agentic-graph
export LC_OS_ROOT=/absolute/path/to/agentic-os
export LC_TARGET=/absolute/path/to/81rv10
export LC_REPOS='[{"id":"commerce","label":"Commerce checkout","root":"/absolute/path/to/agentic-commerce-os","include":["src/local-first/*.ts","src/core/checkout*.ts"]}]'
npm start
```

Open `http://127.0.0.1:4317`. Optional settings: `PORT`, `LC_GRAPH_URL` (explicit IPv4 loopback origin only), `LC_MODEL`, `LC_STATE`. Without `LC_REPOS`, only the target’s tracked README and `src/**/*.mjs` are selected. There is no sibling discovery or arbitrary browser-supplied root.

The local state directory defaults to `~/.local/state/launch-copilot`. Graph caches, proposal receipts and exports are outside the source repository. One host owns one state directory. Stop with Ctrl-C. After a crash, inspect the PID in `server.lock`; remove only that lock after confirming its process is gone. Proposal files must be retained for uncertain handoffs. Do not run multiple hosts against the same state directory.

## Review and handoff

1. Enter a business ask, repository and lowercase proposal name. Inspect real source nodes, source spans/hashes, explained edges and completeness limits. Unknown spans remain unknown. Selected tracked files are bounded to 200 files / 2 MB; hidden/credential paths and aliases are excluded or refused.
2. Draft through the existing OpenAI proxy, or create a clearly labelled evidence outline. Review five sections and their structured technical claims. Revise summaries and save to refresh the shared revision and approval digest. Citation membership is checked; semantic entailment and commercial truth require human review.
3. Canvas loads Graph’s original RichMediaPanel on demand. Solid source relationships come from `explainEdge`; dashed NEW work is a separate proposal overlay. This is a bounded projection, not the full Graph editor. MapLibre/geospatial UI is outside this slice and is not bundled or callable here. The canonical document export keeps edge evidence on nodes because the upstream serializer strips edge properties.
4. **Export five files** writes `docs/proposals/<slug>/{prd,tad,adr,mvp,gtm}.md` beneath the local export receipt directory and verifies their hashes. **Download proposal** saves a portable JSON envelope containing all five exact document strings, the manifest and evidence. It works offline. Neither action publishes to GitHub.
5. After reviewing exact content, **Approve & open proposal PR** checks freshness and the existing OS doctor, admits one docs-only lane, verifies the written files, runs target checks and invokes OS `land --message` with an argument array. The target must already have the profile integrated, local trust/setup established, and the matching protected-PR policy. The included bootstrap profile alone is not trust or provider authority.
6. **Read back** observes GitHub and verifies all five files at the reported Git revision. `pr-open`, `pr-closed` and `integrated` are distinct. A duplicate approval observes the same lane instead of creating another. After an uncertain admission/publication response, inspect the retained OS lane and finish recovery with the existing OS workflow; the app does not blindly retry publication or auto-merge. Cancellation is available before handoff begins.

The host listens only on loopback, checks Host/Origin and a session token for mutations, and invokes no model-selected command or path. Source content is untrusted. A phone’s localhost cannot reach this desktop: mobile layout and offline cached review are supported, while remote-device transport is out of scope. The service worker caches UI assets; API effects are never queued offline. Cached private source remains on this browser until “Clear local draft.” Server receipts and exports are retained separately.

## Verify

```sh
npm run budgets
LC_GRAPH_ROOT=/absolute/path/to/agentic-graph LC_OS_ROOT=/absolute/path/to/agentic-os npm run check
```

`check` runs contract/provider tests with a local HTTP fixture and integration tests against the actual owner Graph/generation code in temporary Git repositories. The positive lifecycle test substitutes the OS/provider command boundary; document writes and Git byte readback remain real. It verifies duplicate submission, lost admission response, stale source, aliases, cancellation, invalid paths/claims, missing authority, exact exports and provider content mismatch. It does not claim a live GitHub or OpenAI run. CI executes budgets and portable tests; owner integration tests explicitly skip when those checkouts are absent. Local owner integration checks are required before integration.

Budget: six product modules, zero new runtime/development packages, fewer than 900 implementation/check lines and 600 lines per file. The service worker is platform cache glue. No Launch Copilot code is added to sibling startup paths. Graph runtime runs at grounding; the panel bundle is built and requested only for Canvas. Its transitive assets inherit Graph’s size; they are not claimed to be small or a new standalone renderer.

The proposal MVP corresponds to LC-01–LC-05 in the authoring draft. LC-06 release/recovery and LC-07 real customer/revenue evidence are later work. CopilotKit’s starter web template is not required and is not adopted. No payment, cloud deployment or outreach is performed by this application.
