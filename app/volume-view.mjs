import profile from './profiles/volume-v1.json' with { type: 'json' };
import config from './profiles/volume-view.json' with { type: 'json' };
import { admit, inspect, originalBytes, exportPack } from './evidence-kernel.mjs';
import { projectVolume } from './volume-project.mjs';
import { capabilities, invokeCommand } from './tools.mjs';

let current = null, queryState = null, intent = 0, exportUrl = null;
const decoder = new TextDecoder('utf-8', { fatal: true });
const node = (tag, value = '', css = '') => {
  const element = document.createElement(tag); element.textContent = value;
  if (css) element.className = css;
  return element;
};
export function volumeContext() {
  if (!current) throw new Error('Import structured evidence first.');
  return { bundle: decoder.decode(originalBytes(current)), ...queryState };
}
export function mountVolumes(panel) {
  const make = (tag, id, value = '', css = '') => {
    const element = node(tag, value, css); element.id = 'volume-' + id; return element;
  };
  const field = (label, element) => { const wrapper = node('label', label); wrapper.append(element); return wrapper; };
  const button = (id, label) => { const element = make('button', id, label); element.type = 'button'; return element; };
  panel.classList.add('evidence-workspace');
  const heading = node('div', '', 'evidence-heading'), title = make('h1', 'title', config.ui.title);
  heading.append(title); panel.setAttribute('aria-labelledby', title.id);
  const status = make('p', 'status', 'Ready to import or open an example.', 'evidence-notice');
  status.setAttribute('role', 'status'); status.setAttribute('aria-live', 'polite');
  const report = (message, error = false) => { status.textContent = message; status.classList.toggle('error', error); };
  const guard = fn => async event => { try { await fn(event); } catch (error) { report(`Not accepted: ${error.message} Current record retained.`, true); } };
  const card = node('section', '', 'evidence-card'), file = make('input', 'file');
  file.type = 'file'; file.accept = 'application/json,.json';
  const example = button('example', 'Load labelled example'), clear = button('clear', 'Remove record');
  const actions = node('div', '', 'evidence-actions'); actions.append(example, clear);
  card.append(node('h2', 'Structured evidence'), field('Bundle or portable pack', file), actions);
  const form = make('form', 'query'), entity = make('select', 'entity'), time = make('input', 'time');
  time.type = 'text'; time.required = true; time.value = config.ui.defaultAtUtc; time.placeholder = 'YYYY-MM-DDTHH:mm:ss.sssZ';
  const project = make('button', 'project', 'Project at UTC'); project.type = 'submit';
  form.append(field('Entity', entity), field('Query time (UTC)', time), project); card.append(form);
  const save = button('export', 'Prepare export'), download = make('a', 'download', 'Save evidence pack', 'evidence-download');
  download.hidden = true; card.append(save, download);
  const result = make('section', 'result', '', 'evidence-card'), sources = make('section', 'sources', '', 'evidence-card');
  panel.replaceChildren(heading, node('p', config.ui.description), status, card, result, sources);
  const resetExport = () => { panel.querySelector('#volume-command-result')?.replaceChildren(); if (exportUrl) URL.revokeObjectURL(exportUrl); exportUrl = null; download.hidden = true; };
  const availability = () => { for (const control of [entity, project, clear, save]) control.disabled = !current; result.hidden = sources.hidden = !current; };
  function render(view, record) {
    const summary = node('dl', '', 'evidence-summary');
    for (const [label, value] of [['Floor', `${view.floorMetres} m`], ['Ceiling', `${view.ceilingMetres} m`], ['Vertical datum', view.datum], ['Time status', view.active ? 'Within interval' : 'Outside interval'], ['Valid from', view.validFromUtc], ['Valid to', view.validToUtc]]) {
      const item = node('div', '', 'evidence-value'); item.append(node('dt', label), node('dd', value)); summary.append(item);
    }
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${view.size.width} ${view.size.height}`); svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Volume schematic. Coordinates and bounds in the following table.'); svg.classList.add('volume-projection');
    const shape = (tag, attributes) => { const item = document.createElementNS(svg.namespaceURI, tag); for (const [key, value] of Object.entries(attributes)) item.setAttribute(key, String(value)); svg.append(item); return item; };
    for (const face of view.screen.sides) shape('polygon', { points: face.map(point => point.join(',')).join(' '), class: 'volume-side' });
    for (const level of ['floor', 'ceiling']) {
      shape('polyline', { points: view.screen[level].map(point => point.join(',')).join(' '), class: `volume-${level}` });
      view.screen[level].forEach((point, index) => shape('circle', { cx: point[0], cy: point[1], r: 3, 'data-z-metres': view.world[level][index][2], class: `volume-${level}` }));
    }
    const table = node('table'), caption = node('caption', 'Original facts and source references'), head = node('thead'), row = node('tr');
    for (const label of ['Fact', 'Value', 'Unit / datum', 'Observed UTC', 'Source / reference']) { const cell = node('th', label); cell.scope = 'col'; row.append(cell); } head.append(row);
    const body = node('tbody');
    for (const fact of record.facts.filter(item => item.entity_id === view.entity.id)) {
      const row = node('tr');
      for (const value of [fact.kind, fact.value === null ? `Unknown: ${fact.null_reason}` : JSON.stringify(fact.value), `${fact.unit} / ${fact.datum}`, fact.observed_at, `${fact.source_id} / ${fact.evidence_ref}`]) row.append(node('td', value));
      body.append(row);
    }
    table.append(caption, head, body); const wrap = node('div', '', 'evidence-table-wrap'); wrap.tabIndex = 0; wrap.setAttribute('role', 'region'); wrap.setAttribute('aria-label', 'Structured evidence facts'); wrap.append(table);
    const identity = node('p', `Original ${record.identity.originalSha256}\nDerived ${record.identity.derivedSha256}\n${record.profile.id}@${record.profile.version}`, 'identity');
    result.replaceChildren(node('h2', view.entity.label), node('p', `${record.dataset.title} · ${record.dataset.classification} · query ${view.atUtc}`), summary, svg, wrap, identity);
    sources.replaceChildren(node('h2', 'Original sources'));
    for (const source of record.sources) sources.append(node('h3', source.id), node('pre', JSON.stringify(source, null, 2)));
  }
  async function load(input) {
    const token = ++intent, atUtc = time.value;
    try {
      const bytes = await input; if (token !== intent) return;
      const candidate = await admit(bytes, profile); if (token !== intent) return;
      const record = inspect(candidate), entityId = record.entities[0].id;
      const views = record.entities.map(item => projectVolume(candidate, item.id, atUtc, config));
      const options = record.entities.map(item => { const option = node('option', item.label); option.value = item.id; return option; });
      render(views[0], record); current = candidate; queryState = { entityId, atUtc };
      entity.replaceChildren(...options); resetExport(); availability(); report('Original identities and view validated.');
    } catch (error) { if (token === intent) report(`Not accepted: ${error.message} Current record retained.`, true); }
  }
  example.onclick = () => load(fetch(config.ui.fixturePath).then(async response => { if (!response.ok) throw new Error('Example unavailable. Import a file or prepare offline.'); return new Uint8Array(await response.arrayBuffer()); }));
  file.onchange = () => { const selected = file.files[0]; if (selected) return load(selected.size > profile.limits.maxPackBytes ? Promise.reject(new Error('File exceeds the profile limit.')) : selected.arrayBuffer().then(bytes => new Uint8Array(bytes))); };
  form.onsubmit = guard(event => { event.preventDefault(); const next = { entityId: entity.value, atUtc: time.value }; const view = projectVolume(current, next.entityId, next.atUtc, config); render(view, inspect(current)); queryState = next; report('Projection updated.'); });
  clear.onclick = () => { ++intent; current = queryState = null; resetExport(); entity.replaceChildren(); result.replaceChildren(); sources.replaceChildren(); file.value = ''; availability(); report('Record removed. Saved files remain on your device.'); };
  save.onclick = guard(async () => { const accepted = current, bytes = await exportPack(accepted); if (current !== accepted) return; resetExport(); exportUrl = URL.createObjectURL(new Blob([bytes], { type: 'application/json' })); download.href = exportUrl; download.download = 'volume-evidence-pack.json'; download.hidden = false; report('Save the pack and reimport to verify.'); });
  const commands = node('section', '', 'evidence-card'), commandForm = make('form', 'command-form');
  const command = make('input', 'command'); command.value = capabilities.find(tool => tool.name === 'volume.project').command;
  const run = make('button', 'command-run', 'Run read-only command'), output = make('pre', 'command-result'); run.type = 'submit';
  commandForm.append(field('Volume command', command), run); commands.append(node('h2', 'Read-only tools'), commandForm, output); panel.append(commands);
  commandForm.onsubmit = guard(async event => { event.preventDefault(); const accepted = current, query = queryState; const result = await invokeCommand(command.value, volumeContext()); if (current === accepted && queryState === query) output.textContent = JSON.stringify(result, null, 2); });
  window.addEventListener('pagehide', resetExport); availability();
}
