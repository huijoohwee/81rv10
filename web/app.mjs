const $ = id => document.getElementById(id), roles = ['prd','tad','adr','mvp','gtm'];
let config, run, busy = false, activeAction = '', tab = 'evidence', offline = !navigator.onLine;
const text = (tag, value, className) => Object.assign(document.createElement(tag), { textContent: value, className: className || '' });
const notify = message => $('notice').textContent = message;
const cache = () => { try { localStorage.setItem('lc-draft-v1', JSON.stringify({ run, requirement: $('requirement').value, slug: $('slug').value, repo: $('repo').value })); } catch { notify('Browser storage is full. Download your proposal to preserve it.'); } };
async function api(action, body = {}) {
  if (!config || offline) throw Error('Offline review: reconnect to refresh evidence or publish.');
  const response = await fetch(`/api/${action}`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-lc-token': config.token }, body: JSON.stringify(body) });
  const result = await response.json(); if (!response.ok) throw Error(result.error); return result;
}
async function act(action, body = {}) {
  if (busy) return; busy = true; activeAction = action; controls(); notify(action === 'ground' ? 'Reading the selected source and explaining real relationships…' : action === 'compose' ? 'Drafting five joined documents through Graph’s OpenAI connection…' : 'Checking the proposal…');
  try { run = await api(action, { id: run?.id, ...body }); cache(); render(); notify(action === 'export' ? `Five exact files exported to ${run.export.directory}` : run.handoff ? `${run.handoff.phase}${run.handoff.pr ? ` · ${run.handoff.pr}` : ''}` : run.status === 'review' ? 'Review all five documents. Existing references are checked; their meaning still needs your judgment.' : run.status === 'cancelled' ? 'Proposal cancelled. No new handoff will be started.' : 'Evidence is ready. Inspect the source before shaping the proposal.'); }
  catch (error) { notify(error.message); } finally { busy = false; controls(); }
}
function controls() {
  $('connection').textContent = offline ? 'Offline · draft saved' : config ? 'Local workspace' : 'Host unavailable';
  for (const id of ['ground','compose','outline','approve','export','cancel','readback']) $(id).disabled = busy || offline || !config || (id !== 'ground' && (!run || run.status === 'cancelled'));
  $('approve').disabled ||= !$('reviewed').checked || !run?.reviewHash;
  $('abort').hidden = !busy || activeAction === 'approve'; $('compose').hidden = Boolean(run?.handoff?.attempted); $('outline').hidden = Boolean(run?.handoff?.attempted);
}
function render() {
  $('empty').hidden = !!run; $('result').hidden = !run; if (!run) return controls();
  $('status').textContent = run.handoff?.phase || run.status; $('view-title').textContent = run.title;
  $('step1').className = run ? 'active' : ''; $('step2').className = run.docs ? 'active' : ''; $('step3').className = run.handoff ? 'active' : '';
  $('metrics').replaceChildren(...[[run.evidence.nodes.length,'source nodes'],[run.evidence.edges.length,'explained relations'],[run.docs ? '5 / 5' : '—','proposal documents']].map(([value,label]) => { const el = document.createElement('div'); el.append(text('b',value),text('span',label)); return el; }));
  $('evidence-view').replaceChildren(text('p', `${run.evidence.repo} · source ${run.evidence.head.slice(0,9)} · bounded to ${run.evidence.include.length} files`, 'small muted'));
  $('evidence-view').append(text('p',`Search: ${run.evidence.terms || run.evidence.query} · ${run.evidence.metrics?.elapsedMs ?? 'unmeasured'} ms · 0 model calls`,'small muted'));
  for (const n of run.evidence.nodes) { const el = text('details','','source'); el.append(text('summary',`EXISTING · ${n.label}`),text('p',`${n.owner}/${n.path}${n.line ? `:${n.line}` : " · span unavailable"}`,'path'),text('pre',n.excerpt),text('p',`SHA-256 ${n.sha256}`,'small muted'),text('p',n.id,'small muted')); $('evidence-view').append(el); }
  for (const e of run.evidence.edges) { const el = text('details','','source'); el.append(text('summary',`EXISTING relation · ${e.edge.label}`),text('pre',JSON.stringify(e,null,2))); $('evidence-view').append(el); }
  const completeness = text('details','','source'); completeness.append(text('summary','Coverage, bounds & open gaps'),text('pre',JSON.stringify(run.evidence.completeness,null,2)),text('p',run.evidence.gaps.join(' '),'small')); $('evidence-view').append(completeness);
  $('documents-view').replaceChildren();
  for (const role of roles) {
    const doc = text('details','','doc'); doc.open = role === 'prd'; doc.append(text('summary',`${role.toUpperCase()} · ${run.revision}`));
    if (run.docs) { const preview = text('pre',run.docs[role]); const label = text('label','Revise this section’s business summary'); const edit = Object.assign(document.createElement('textarea'), { value: run.payload.sections[role].summary, maxLength: 4000, ariaLabel: `${role.toUpperCase()} summary` }); edit.disabled = Boolean(run.handoff?.attempted); edit.oninput = () => { run.payload.sections[role].summary = edit.value; run.reviewHash = null; $('reviewed').checked = false; cache(); controls(); }; doc.append(preview,label,edit); }
    else doc.append(text('p','Draft with OpenAI or create a clearly labelled evidence outline.','small muted')); $('documents-view').append(doc);
  }
  if (run.docs && !run.handoff?.attempted) { const save = text('button','Save revisions & refresh review digest','secondary'); save.onclick = () => act('revise',{ payload: run.payload }); $('documents-view').append(save); }
  $('approval').hidden = !run.docs; $('reviewed').checked = false;
  $('manifest').textContent = run.docs ? `${run.manifest.map(m => `${m.path}\n${m.sha256}`).join('\n\n')}\n\nReview: ${run.reviewHash || 'unsaved changes'}` : '';
  $('model-note').textContent = run.metrics ? `${run.metrics.model} · ${run.metrics.calls} call(s) · ${(run.metrics.elapsedMs/1000).toFixed(1)}s · cost unpriced` : `OpenAI via Graph${config ? ` · ${config.model}` : ''}. Evidence outlines use no model and require further authoring.`;
  selectTab(tab); controls();
}
async function selectTab(next) {
  tab = next; for (const t of ['evidence','documents','canvas']) { $(`${t}-view`).hidden = t !== next; $(`${t}-tab`).setAttribute('aria-selected',String(t === next)); }
  if (next === 'canvas' && run) { try { const { renderCanvas } = await import('/canvas/canvas.js'); renderCanvas($('canvas-view'), run); } catch { $('canvas-view').replaceChildren(text('p','Graph’s RichMediaPanel could not load. Source and document review remain available. Canvas verification is incomplete.','canvas-error')); } }
}
function outline() {
  const claims = run.evidence.nodes.slice(0,4).map((n,i) => ({ id:`C${i+1}`,text:`The selected source contains ${n.type} “${n.label}”. Review its excerpt before relying on behavior.`,ref:n.id }));
  claims.push({ id:`C${claims.length+1}`,text:'Implement the customer outcome after reviewing source capability, scope and acceptance checks.',ref:'new',owner:'Launch Copilot product owner',check:'Define and run the selected product’s complete buyer loop, including cancellation and receipt readback.' });
  const summaries = ['Evidence outline — buyer pain, willingness to pay and acceptance are unvalidated.','Evidence outline — inspect the listed source owners before choosing implementation changes.','Evidence outline — compare reuse with new work; reject options that exceed authority, scope or budget.','Evidence outline — specify the smallest build, its checks, recovery path and release gate.','Evidence outline — define a priced offer hypothesis and permissioned buyer experiment before claiming demand.'];
  act('revise',{ payload:{ claims, sections:Object.fromEntries(roles.map((r,i) => [r,{summary:`${summaries[i]}\n\nBusiness ask: ${run.requirement}`,claimIds:claims.map(c=>c.id)}])), questions:['Who is the first buyer, and what outcome will they pay for?','Which acceptance checks and release owner make this slice safe to launch?'] } });
}
$('intake').onsubmit = e => { e.preventDefault(); act('ground',{requirement:$('requirement').value,slug:$('slug').value,repo:$('repo').value}); };
$('example').onclick = () => { $('requirement').value = 'Help me launch one sellable agent-assisted service with reviewed checkout, downloadable delivery and a receipt.'; cache(); };
for (const id of ['requirement','slug','repo']) $(id).addEventListener('input',cache);
for (const t of ['evidence','documents','canvas']) $(`${t}-tab`).onclick = () => selectTab(t);
$('compose').onclick = () => act('compose'); $('outline').onclick = outline;
$('abort').onclick = async () => { try { await api('abort'); notify('Cancellation requested. Published effects, if any, require readback.'); } catch(e) { notify(e.message); } };
$('reviewed').onchange = controls; $('approve').onclick = () => act('approve',{reviewHash:run.reviewHash}); $('cancel').onclick = () => act('cancel'); $('readback').onclick = () => act('readback');
$('export').onclick = () => act('export',{reviewHash:run.reviewHash});
$('download').onclick = () => { const a = document.createElement('a'), url = URL.createObjectURL(new Blob([JSON.stringify(run,null,2)],{type:'application/json'})); a.href=url; a.download=`${run.slug}-proposal.json`; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000); };
$('clear').onclick = () => { localStorage.removeItem('lc-draft-v1'); run=null; $('requirement').value=''; render(); notify('Local draft cleared. Server proposals and provider effects are retained.'); };
async function connect() { try { const response = await fetch('/api/config'); config = await response.json(); offline = false; const prior=$('repo').value; $('repo').replaceChildren(...config.repos.map(r=>Object.assign(document.createElement('option'),{value:r.id,textContent:r.label}))); if(prior) $('repo').value=prior; } catch { offline=true; } controls(); }
await connect();
try { const saved=JSON.parse(localStorage.getItem('lc-draft-v1')||'null'); if(saved){ run=saved.run; $('requirement').value=saved.requirement; $('slug').value=saved.slug; $('repo').value=saved.repo; } } catch { notify('Saved draft could not be read. Server proposals are retained.'); }
render(); window.addEventListener('offline',()=>{offline=true;controls();}); window.addEventListener('online',connect);
if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(()=>notify('Offline cache unavailable. Download your proposal before closing this page.'));
