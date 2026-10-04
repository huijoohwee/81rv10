import profile from './profiles/aviation-v1.json' with { type: 'json' };
import workspaceConnections from './profiles/workspaces.json' with { type: 'json' };
import { createSession, inspect, exportPack, originalBytes } from './evidence-kernel.mjs';
import { replay } from './evidence-replay.mjs';
import { capabilities, invokeCommand } from './tools.mjs';

// This view consumes an authored profile; no mission, geographic or aviation rules live here.
const $ = id => document.getElementById(id);
const session = createSession(profile);
let page = 0, moments = [], exportUrl = null, importIntent = 0;
const encoder = new TextEncoder(), decoder = new TextDecoder('utf-8', { fatal: true });
const PAGE_SIZE = 50;
const describe = value => typeof value === 'string' ? value : JSON.stringify(value);
const valueText = fact => fact.value === null ? `Unknown — ${fact.null_reason}` : describe(fact.value);
function text(tag, value, className) {
  const el = document.createElement(tag); el.textContent = value;
  if (className) el.className = className;
  return el;
}
function status(message, error = false) {
  $('evidence-status').textContent = message;
  $('evidence-status').classList.toggle('error', error);
}
function guard(fn) {
  return async event => { try { await fn(event); } catch (error) { status(`Not accepted: ${error.message} Your current record is retained.`, true); } };
}
function discardExport() {
  if (exportUrl) URL.revokeObjectURL(exportUrl);
  exportUrl = null; $('evidence-download').hidden = true; $('evidence-export-identity').textContent = '';
  $('evidence-export-fallback').hidden = true; $('evidence-export-json').value = '';
}
function renderFacts(record) {
  const maxPage = Math.max(0, Math.ceil(record.facts.length / PAGE_SIZE) - 1);
  page = Math.min(page, maxPage);
  $('evidence-facts').replaceChildren(...record.facts.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE).map(fact => {
    const row = document.createElement('tr');
    const time = text('td', fact.observed_at); time.append(text('small', `Retrieved ${fact.retrieved_at}`));
    const id = text('td', `${fact.entity_id} · ${fact.kind}`); id.append(text('small', fact.id));
    const value = text('td', valueText(fact)); value.append(text('small', `${fact.unit} · ${fact.datum}`));
    const source = text('td', fact.source_id); source.append(text('small', fact.evidence_ref));
    row.append(time, id, value, source); return row;
  }));
  $('evidence-page').textContent = `Page ${page + 1} of ${maxPage + 1} · ${PAGE_SIZE} facts per page`;
  $('evidence-page-back').disabled = page === 0; $('evidence-page-next').disabled = page === maxPage;
}
function query() {
  const accepted = session.read(); if (!accepted) return;
  const result = replay(accepted, $('evidence-entity').value, $('evidence-time').value);
  const priorIndex = moments.findLastIndex(moment => Date.parse(moment) <= Date.parse(result.atUtc));
  $('evidence-timeline').value = String(Math.max(0, priorIndex));
  $('evidence-previous').disabled = !moments.some(moment => Date.parse(moment) < Date.parse(result.atUtc));
  $('evidence-next').disabled = !moments.some(moment => Date.parse(moment) > Date.parse(result.atUtc));
  $('evidence-replay-result').hidden = false;
  $('evidence-replay-summary').textContent = `${result.entity.label || result.entity.id} at ${result.atUtc} · ${result.gaps.length} recorded gaps · no interpolation`;
  $('evidence-replay-values').replaceChildren(...result.fields.map(field => {
    const card = text('article', '', 'evidence-value');
    card.append(text('strong', field.label || field.kind));
    card.append(text('p', [field.missing ? 'Missing' : 'Observed', field.stale ? 'Stale' : '', field.conflict ? 'Conflicting evidence' : ''].filter(Boolean).join(' · ')));
    for (const fact of field.facts) card.append(text('p', `${valueText(fact)} · ${fact.unit} · ${fact.datum} · ${fact.source_id} · ${fact.observed_at}`));
    return card;
  }));
  for (const gap of result.gaps) {
    const card = text('article', '', 'evidence-value');
    card.append(text('strong', `Gap · ${gap.kind}`), text('p', `${gap.fromUtc} → ${gap.toUtc}`), text('p', `${gap.durationSeconds} seconds · ${gap.sourceId}`));
    $('evidence-replay-values').append(card);
  }
  $('evidence-replay-json').textContent = JSON.stringify(result, null, 2);
  return result;
}
function setMoment(index) {
  if (!moments.length) return;
  const next = Math.max(0, Math.min(moments.length - 1, index));
  $('evidence-timeline').value = String(next); $('evidence-time').value = moments[next];
  $('evidence-previous').disabled = next === 0; $('evidence-next').disabled = next === moments.length - 1;
  query();
}
function render() {
  const accepted = session.read();
  for (const id of ['evidence-clear', 'evidence-entity', 'evidence-time', 'evidence-replay', 'evidence-export', 'evidence-command-run', 'evidence-timeline']) $(id).disabled = !accepted;
  $('evidence-results').hidden = !accepted; $('evidence-replay-result').hidden = true;
  if (!accepted) {
    $('evidence-identity').textContent = 'No file admitted.'; $('evidence-entity').replaceChildren();
    $('evidence-time').value = ''; $('evidence-previous').disabled = true; $('evidence-next').disabled = true;
    for (const id of ['evidence-command-result', 'evidence-facts', 'evidence-sources', 'evidence-summary', 'evidence-dataset', 'evidence-count', 'evidence-page', 'evidence-replay-values', 'evidence-replay-summary', 'evidence-replay-json']) $(id).replaceChildren();
    $('evidence-timeline').value = '0'; $('evidence-timeline').max = '0'; moments = []; return;
  }
  const record = inspect(accepted);
  $('evidence-dataset').textContent = `${record.dataset.title} · ${record.dataset.classification} · ${record.dataset.id}`;
  $('evidence-count').textContent = `${record.stats.entityCount} entities · ${record.stats.factCount} facts · ${record.stats.sourceCount} sources`;
  $('evidence-identity').textContent = `Original SHA-256 ${record.identity.originalSha256}\nDerived SHA-256 ${record.identity.derivedSha256}\nProfile ${record.profile.id}@${record.profile.version}\nProfile SHA-256 ${record.profile.sha256}\nAlgorithm ${record.algorithm}`;
  $('evidence-summary').replaceChildren(...[
    ['Time span', `${record.stats.startUtc} → ${record.stats.endUtc}`],
    ['Missing values', `${record.facts.filter(fact => fact.value === null).length} explicitly labelled unknown`],
    ['Serving calls', `${record.cost.modelCalls} model · ${record.cost.billedApiCalls} billed API`],
  ].map(([label, value]) => { const card = text('div', '', 'evidence-value'); card.append(text('strong', label), text('p', value)); return card; }));
  $('evidence-entity').replaceChildren(...record.entities.map(entity => { const option = text('option', entity.label); option.value = entity.id; return option; }));
  moments = [...new Set(record.facts.map(fact => Date.parse(fact.observed_at)))].sort((a, b) => a - b).map(value => new Date(value).toISOString());
  $('evidence-timeline').max = String(moments.length - 1);
  $('evidence-sources').replaceChildren(...record.sources.map(source => {
    const article = document.createElement('article'); article.append(text('h3', source.id),
      text('p', `Origin: ${source.origin}`), text('p', `Declared rights: ${describe(source.rights)}`),
      text('p', `Retrieved: ${source.retrieved_at}`), text('p', `${source.byteLength} bytes · SHA-256 ${source.sha256}`, 'identity'));
    return article;
  }));
  renderFacts(record); setMoment(moments.length - 1);
}
async function importEvidence(input) {
  const intent = ++importIntent;
  try {
    await session.import(input);
    if (intent !== importIntent) return;
    discardExport(); page = 0; render();
    const record = inspect(session.read());
    status(`Accepted ${record.dataset.classification} evidence. Originals and derived identity verified; ${record.stats.factCount} facts available.`);
  } catch (error) {
    if (intent === importIntent) status(`Not accepted: ${error.message} Your current record is retained.`, true);
  }
}
export function evidenceContext() {
  const accepted = session.read();
  if (!accepted) throw new Error('Import evidence first.');
  return { bundle: decoder.decode(originalBytes(accepted)), flightId: $('evidence-entity').value, atUtc: $('evidence-time').value };
}
export function mountEvidence() {
  $('evidence-title').textContent = profile.ui?.title || 'Evidence workspace';
  $('evidence-description').textContent = profile.ui?.description || 'Inspect a record, replay a moment, keep a verifiable copy.';
  $('evidence-entity-label').textContent = profile.ui?.entityLabel || 'Entity';
  $('evidence-limits').textContent = `UTF-8 JSON · original at most ${profile.limits.maxBytes.toLocaleString()} bytes · pack at most ${profile.limits.maxPackBytes.toLocaleString()} bytes. Source declarations are retained as supplied.`;
  $('evidence-command').value = capabilities.find(tool => tool.inputSchema.properties.bundle && !tool.inputSchema.properties.flightId).command;
  $('evidence-file').onchange = guard(() => {
    const file = $('evidence-file').files[0]; if (!file) return;
    return importEvidence(file.size > profile.limits.maxPackBytes ? Promise.reject(new Error('File exceeds the profile admission limit.')) : file.arrayBuffer().then(bytes => new Uint8Array(bytes)));
  });
  $('evidence-input').maxLength = profile.limits.maxPackBytes;
  $('evidence-admit').onclick = () => {
    const raw = $('evidence-input').value, bytes = encoder.encode(raw);
    return importEvidence(decoder.decode(bytes) === raw ? bytes : Promise.reject(new Error('Text contains invalid Unicode.')));
  };
  $('evidence-examples').replaceChildren(...workspaceConnections.evidence.examples.map(example => {
    const button = text('button', example.label); button.id = example.id; button.type = 'button';
    button.onclick = guard(() => importEvidence(fetch(example.path).then(async response => {
      if (!response.ok) throw new Error('Example is unavailable. Import a saved file or prepare the offline shell.');
      return new Uint8Array(await response.arrayBuffer());
    })));
    return button;
  }));
  $('evidence-examples-description').textContent = workspaceConnections.evidence.description;
  $('evidence-clear').onclick = () => {
    ++importIntent; session.clear(); discardExport(); $('evidence-input').value = ''; $('evidence-file').value = '';
    render(); status('Imported evidence removed from this tab. Previously saved files remain on your device.');
  };
  $('evidence-query').onsubmit = guard(event => { event.preventDefault(); query(); });
  $('evidence-entity').onchange = guard(query);
  $('evidence-timeline').oninput = guard(() => setMoment(Number($('evidence-timeline').value)));
  $('evidence-previous').onclick = guard(() => setMoment(moments.findLastIndex(moment => Date.parse(moment) < Date.parse($('evidence-time').value))));
  $('evidence-next').onclick = guard(() => setMoment(moments.findIndex(moment => Date.parse(moment) > Date.parse($('evidence-time').value))));
  $('evidence-page-back').onclick = () => { page--; renderFacts(inspect(session.read())); };
  $('evidence-page-next').onclick = () => { page++; renderFacts(inspect(session.read())); };
  $('evidence-export').onclick = guard(async () => {
    const accepted = session.read(); if (!accepted) return;
    const bytes = await exportPack(accepted); if (session.read() !== accepted) return;
    discardExport(); exportUrl = URL.createObjectURL(new Blob([bytes], { type: 'application/json' }));
    $('evidence-export-json').value = decoder.decode(bytes); $('evidence-export-fallback').hidden = false;
    $('evidence-download').href = exportUrl; $('evidence-download').download = 'evidence-pack.json'; $('evidence-download').hidden = false;
    $('evidence-export-identity').textContent = `${bytes.byteLength} bytes · originals plus profile and derived identities. Reopen this pack to verify.`;
    status('Export ready. Save the evidence pack to keep this record.');
  });
  $('evidence-copy-export').onclick = guard(async () => {
    await navigator.clipboard.writeText($('evidence-export-json').value);
    status('Portable pack copied. Save the exact JSON as evidence-pack.json, then reimport to verify.');
  });
  $('evidence-command-form').onsubmit = guard(async event => {
    event.preventDefault(); const accepted = session.read();
    const result = await invokeCommand($('evidence-command').value, evidenceContext());
    if (session.read() === accepted) { $('evidence-command-result').textContent = JSON.stringify(result, null, 2); status('Read-only command completed against the accepted original bytes.'); }
  });
  window.addEventListener('pagehide', discardExport);
  render(); status('Ready. Import a permitted file or choose a labelled example.');
}
