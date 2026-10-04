import { MAX_BYTES, newDossier, readDossier, summary, digest, inspectPath, ownerLinks, replayUrl } from './contracts.mjs';
import { invokeCommand, registerBrowserTools } from './tools.mjs';
const $ = id => document.getElementById(id);
let dossier = newDossier(), selected = 0, surface = 'program', pathBytes = null, revision = 0;
let config = { graph: $('graph-url').value, game: '', program: $('program-path').value, mission: '' };
let exportUrl = null;
const previews = new Map();
function notice(message, error = false) { $('notice').textContent = message; $('notice').classList.toggle('error', error); }
function guard(action) { return async event => { try { await action(event); } catch (error) { notice(error.message, true); } }; }
function releasePreviews() { for (const url of previews.values()) URL.revokeObjectURL(url); previews.clear(); }
function selectConsole(name, focus = false) {
  document.querySelectorAll('[data-console]').forEach(button => {
    const active = button.dataset.console === name;
    button.setAttribute('aria-selected', String(active)); button.tabIndex = active ? 0 : -1;
    $(button.getAttribute('aria-controls')).hidden = !active;
    if (active && focus) button.focus();
  });
}
const consoleTabs = [...document.querySelectorAll('[data-console]')];
consoleTabs.forEach((button, index) => {
  button.onclick = () => selectConsole(button.dataset.console);
  button.onkeydown = event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % consoleTabs.length;
    else if (event.key === 'ArrowLeft') next = (index + consoleTabs.length - 1) % consoleTabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = consoleTabs.length - 1;
    else return;
    event.preventDefault(); selectConsole(consoleTabs[next].dataset.console, true);
  };
});
function save(bytes, type, filename) {
  if (exportUrl) URL.revokeObjectURL(exportUrl);
  exportUrl = URL.createObjectURL(new Blob([bytes], { type }));
  $('export-link').href = exportUrl; $('export-link').download = filename; $('export-link').textContent = `Save ${filename}`;
  $('export-json').value = typeof bytes === 'string' ? bytes : new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  $('prepared-export').hidden = false; selectConsole('dossier');
  $('prepared-export').scrollIntoView({ block: 'nearest' });
  notice(`Prepared ${filename}. Use its Save link in Dossier.`);
}
function markChanged() { $('dossier-status').textContent = 'Unsaved changes · export to keep this dossier.'; }
function render() {
  const total = summary(dossier); $('review-count').textContent = `${total.reviewed} / 6`;
  $('follow-count').textContent = `${total.followUp} flagged`;
  $('points').replaceChildren(...dossier.points.map((point, index) => {
    const button = document.createElement('button'); button.className = `point${index === selected ? ' active' : ''}`;
    button.setAttribute('aria-pressed', String(index === selected));
    const num = document.createElement('span'); num.className = 'num'; num.textContent = point.pointId;
    const label = document.createElement('span'); label.textContent = `Rack ${point.rackId} · Tier ${point.tierId}`;
    const status = document.createElement('small'); status.textContent = point.capture ? point.reviewState : 'Awaiting evidence';
    label.append(status); button.append(num, label); button.onclick = () => { selected = index; render(); };
    return button;
  }));
  const point = dossier.points[selected]; $('point-title').textContent = `${point.pointId} · Rack ${point.rackId} / Tier ${point.tierId}`;
  $('review-state').value = point.reviewState; $('review-state').disabled = !point.capture;
  $('review-note').value = point.reviewNote; $('capture-file').value = '';
  $('provenance').value = point.capture?.provenance || 'operator-import; capture-unverified';
  const preview = previews.get(point.pointId); $('capture-preview').replaceChildren();
  if (preview) { const img = document.createElement('img'); img.src = preview; img.alt = `Imported capture for ${point.pointId}`; $('capture-preview').append(img); }
  else $('capture-preview').textContent = point.capture ? 'Reference retained · reattach the original image to view' : 'No image attached';
  $('capture-identity').textContent = point.capture
    ? `${point.capture.provenance} · ${point.capture.name}\nSHA-256 ${point.capture.sha256}` : 'No camera capture or diagnosis is inferred.';
  $('path-identity').textContent = dossier.path
    ? `SHA-256 ${dossier.path.sha256}\nSource ${dossier.path.sourceDigest}\nScene ${dossier.path.sceneDigest}\n${dossier.path.sampleCount} samples · metadata inspected; owner admission required${pathBytes ? '' : ' · original bytes not loaded'}`
    : 'No path imported. Source and scene identities are unknown.';
  $('path-download').disabled = !pathBytes;
}
function updateLinks() {
  const links = ownerLinks(config.graph, config.game, config.program);
  $('graph-open').href = links.graph;
  if (links.game) { $('game-open').href = links.game; $('game-open').removeAttribute('aria-disabled'); }
  else { $('game-open').removeAttribute('href'); $('game-open').setAttribute('aria-disabled', 'true'); }
}
function mountNativeFrame(url, title, host) {
  closeSurface();
  const frame = document.createElement('iframe'); frame.title = title;
  frame.referrerPolicy = 'no-referrer'; frame.allow = 'fullscreen; xr-spatial-tracking';
  frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-downloads allow-pointer-lock');
  frame.src = url; host.replaceChildren(frame);
}
function closeSurface(message = 'Closed · native rendering stopped') {
  $('native-frame').replaceChildren(); const empty = document.createElement('div'); empty.className = 'empty';
  const title = document.createElement('h3'); title.textContent = 'Ready when you are.';
  const text = document.createElement('p'); text.textContent = 'Load the selected native surface to continue.';
  empty.append(title, text); $('native-frame').append(empty); $('close-surface').disabled = true;
  $('frame-status').textContent = message;
}
const help = {
  program: "Open the native program, then use Graph's Python, Block and JSON panes. Its FloatingPanel owns the Block library.",
  mission: 'Open the exact mission manifest, then choose 2D Renderer → Dashboard in Graph. A workflow manifest is not flight authority.',
  xr: 'In the native Graph toolbar choose Surface Mode → XR. Browser and device support determine available XR features.',
  replay: 'Paste the Canvas snapshot link from Graph Results, then load the owner’s recorded 3D replay. Replay is not XR-mode parity.',
};
document.querySelectorAll('[data-surface]').forEach(button => button.onclick = () => {
  surface = button.dataset.surface; closeSurface('Selection changed · click Load to open');
  document.querySelectorAll('[data-surface]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  $('surface-help').textContent = help[surface];
});
$('load-surface').onclick = guard(() => {
  const path = surface === 'mission' ? config.mission : config.program;
  if (surface === 'mission' && !path) throw new Error('Set the exact mission manifest path in Owner connections first.');
  const url = surface === 'replay' ? replayUrl($('replay-url').value, config.graph) : ownerLinks(config.graph, null, path).graph;
  mountNativeFrame(url, surface === 'replay' ? 'Native Graph flight replay' : 'Native Graph workspace', $('native-frame')); $('close-surface').disabled = false;
  $('frame-status').textContent = 'Owner frame requested · verify its visible status';
  $('graph-open').href = url;
});
$('close-surface').onclick = () => closeSurface();
document.addEventListener('visibilitychange', () => { if (document.hidden && !$('close-surface').disabled) closeSurface('Tab hidden · load again to resume'); });
$('settings-open').onclick = () => $('settings').showModal();
$('save-settings').onclick = guard(event => {
  event.preventDefault();
  const next = { graph: $('graph-url').value, game: $('game-url').value, program: $('program-path').value, mission: $('mission-path').value };
  ownerLinks(next.graph, next.game, next.program);
  if (next.mission) ownerLinks(next.graph, null, next.mission);
  config = next; closeSurface(); updateLinks(); $('settings').close(); notice('Owner connections applied to this tab.');
});
$('capture-file').onchange = guard(async () => {
  const file = $('capture-file').files[0]; if (!file) return;
  if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type) || !file.size || file.size > MAX_BYTES) throw new Error('Choose a PNG, JPEG or WebP smaller than 500 kB.');
  const token = ++revision, point = dossier.points[selected], provenance = $('provenance').value;
  const bytes = new Uint8Array(await file.arrayBuffer());
  const sha256 = await digest(bytes);
  const bitmap = await createImageBitmap(file); bitmap.close();
  if (token !== revision) return;
  const prior = previews.get(point.pointId); if (prior) URL.revokeObjectURL(prior);
  previews.set(point.pointId, URL.createObjectURL(file));
  point.capture = { name: file.name.slice(0, 160), byteLength: file.size, mediaType: file.type, sha256, provenance };
  point.reviewState = 'unreviewed'; point.reviewNote = ''; markChanged(); render(); notice('Image attached. Review applies only to this imported image.');
});
$('provenance').onchange = () => {
  const point = dossier.points[selected]; if (!point.capture) return;
  point.capture.provenance = $('provenance').value; point.reviewState = 'unreviewed'; markChanged(); render();
};
$('review-state').onchange = () => { const point = dossier.points[selected]; if (!point.capture) return; point.reviewState = $('review-state').value; markChanged(); render(); };
$('review-note').oninput = () => { dossier.points[selected].reviewNote = $('review-note').value; markChanged(); };
$('path-file').onchange = guard(async () => {
  const file = $('path-file').files[0]; if (!file) return;
  // Invalidate the previous identity before attempting another import.
  const token = ++revision; pathBytes = null; dossier.path = null; markChanged(); render();
  if (file.size > MAX_BYTES) throw new Error('Path must be smaller than 500 kB.');
  const bytes = new Uint8Array(await file.arrayBuffer()), identity = await inspectPath(bytes);
  if (token !== revision) return;
  dossier.path = identity; pathBytes = bytes; render(); notice('Original path retained byte for byte. Open GameXR to review and run its simulation.');
});
$('path-download').onclick = () => { if (pathBytes) save(pathBytes, 'application/json', 'graph-flight-path.json'); };
$('export-dossier').onclick = guard(() => {
  const text = JSON.stringify(dossier, null, 2); readDossier(text); save(text, 'application/json', 'rack-scout-dossier.json');
  $('dossier-status').textContent = 'Dossier prepared below. Save it and keep the original images and flight path alongside it.';
});
$('copy-export').onclick = guard(async () => { await navigator.clipboard.writeText($('export-json').value); notice('Prepared JSON copied.'); });
$('dossier-file').onchange = guard(async () => {
  const file = $('dossier-file').files[0]; if (!file) return;
  if (file.size > MAX_BYTES) throw new Error('Dossier must be smaller than 500 kB.');
  const token = ++revision, restored = readDossier(await file.text());
  if (token !== revision) return;
  releasePreviews(); dossier = restored; pathBytes = null; selected = 0; render();
  $('dossier-status').textContent = 'Imported references are self-reported. Reattach originals to inspect their bytes.';
  notice('Dossier reopened. Image bytes and original path remain separate files.');
});
$('command-form').onsubmit = guard(async event => {
  event.preventDefault(); $('command-result').textContent = JSON.stringify(await invokeCommand($('command').value, dossier), null, 2);
});
function toolStatus(value) { $('webmcp-status').textContent = value; }
async function registerWebMcp() {
  return registerBrowserTools(document.modelContext || navigator.modelContext, {
    report: toolStatus,
    resolveArgs(name, args) {
      if (name === 'drone_dashboard.inspect' && args?.dossier === undefined) return { ...args, dossier: JSON.stringify(dossier) };
      return args;
    },
  });
}
$('offline-enable').onclick = guard(async () => {
  if (!('serviceWorker' in navigator)) throw new Error('Offline shell unsupported in this browser.');
  const registration = await navigator.serviceWorker.register('./sw.mjs', { type: 'module' });
  await registration.update();
  const pending = registration.installing || registration.waiting || registration.active;
  if (pending && pending.state !== 'activated') await new Promise((resolve, reject) => {
    const timer = setTimeout(() => { pending.removeEventListener('statechange', check); reject(new Error('Offline preparation timed out. Keep the server available and retry.')); }, 15000);
    function check() {
      if (!['activated', 'redundant'].includes(pending.state)) return;
      clearTimeout(timer); pending.removeEventListener('statechange', check);
      if (pending.state === 'activated') resolve(); else reject(new Error('Offline shell installation failed.'));
    }
    pending.addEventListener('statechange', check); check();
  });
  await navigator.serviceWorker.ready;
  $('offline-status').textContent = 'Dashboard shell cached. External native owners need their own offline setup.';
  notice('Offline shell prepared. Save your dossier, then reload to use the prepared revision.');
});
$('offline-remove').onclick = guard(async () => {
  if (!('serviceWorker' in navigator) || !('caches' in window)) throw new Error('Offline storage unsupported.');
  const registration = await navigator.serviceWorker.getRegistration('./');
  if (registration && new URL(registration.active?.scriptURL || registration.waiting?.scriptURL || registration.installing?.scriptURL).pathname === '/sw.mjs') await registration.unregister();
  for (const key of await caches.keys()) if (key.startsWith('drone-dashboard-shell-')) await caches.delete(key);
  $('offline-status').textContent = 'Offline cache removed. The current dossier remains in this tab.';
  notice('Offline assets removed. Reload from the local server before preparing offline again.');
});
window.addEventListener('pagehide', () => { releasePreviews(); if (exportUrl) URL.revokeObjectURL(exportUrl); });
render(); updateLinks(); void registerWebMcp();
if (navigator.serviceWorker?.controller) $('offline-status').textContent = 'Using the provisioned dashboard shell. Save dossier files separately.';
